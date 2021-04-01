"use strict";

// OData v2/v4 Delta: http://docs.oasis-open.org/odata/new-in-odata/v4.0/cn01/new-in-odata-v4.0-cn01.html

const URL = require("url");
const express = require("express");
const axios = require("axios");
const proxy = require("http-proxy-middleware");
const cds = require("@sap/cds");
const logging = require("@sap/logging");
const { promisify } = require("util");

const SeverityMap = {
  1: "success",
  2: "info",
  3: "warning",
  4: "error"
};

const UUIDRegex = /guid'([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})'/gi;
// https://www.w3.org/TR/xmlschema11-2/#nt-duDTFrag
const DurationRegex = /^PT(?:(\d{1,2})H)?(?:(\d{2})M)?(?:(\d{2}(?:\.\d+)?)S)?$/i;

const DataTypeMap = {
  "cds.UUID": { v2: `guid'$1'`, v4: UUIDRegex },
  "cds.Binary": { v2: `binary'$1'`, v4: /X'(?:[0-9a-f][0-9a-f])+?'/gi },
  "cds.LargeBinary": { v2: `binary'$1'`, v4: /X'(?:[0-9a-f][0-9a-f])+?'/gi },
  "cds.Time": { v2: `time'$1'`, v4: /time'(.+?)'/gi },
  "cds.Date": { v2: `datetime'$1'`, v4: /datetime'(.+?)'/gi },
  "cds.DateTime": { v2: `datetimeoffset'$1'`, v4: /datetimeoffset'(.+?)'/gi },
  "cds.Timestamp": { v2: `datetimeoffset'$1'`, v4: /datetimeoffset'(.+?)'/gi },
  "cds.Double": { v2: `$1d`, v4: /([-]?[0-9]+?\.[0-9]+?(?:E[+-]?[0-9]+?)?)d/gi },
  "cds.Decimal": { v2: `$1m`, v4: /([-]?[0-9]+?\.[0-9]+?)m/gi },
  "cds.DecimalFloat": { v2: `$1f`, v4: /([-]?[0-9]+?\.[0-9]+?)f/gi },
  "cds.Integer64": { v2: `$1L`, v4: /([-]?[0-9]+?)L/gi },
  "cds.String": { v2: `'$1'`, v4: /(.*)/gi }
};

const AggregationMap = {
  SUM: "sum",
  MIN: "min",
  MAX: "max",
  AVG: "average",
  COUNT: "countdistinct",
  COUNT_DISTINCT: "countdistinct"
};

const FilterFunctions = {
  "substringof($,$)": "contains($2,$1)",
  "gettotaloffsetminutes($)": "totaloffsetminutes($1)"
};

const BodyParserLimit = "100mb";
const DefaultTenant = "00000000-0000-0000-0000-000000000000";
const AggregationPrefix = "__AGGREGATION__";

/**
 * Instantiates an CDS OData v2 Adapter Proxy Express Router for a CDS based OData v4 Server.
 * @param options CDS OData v2 Adapter Proxy options.
 * @param [options.base] Base path, under which the service is reachable. Default is ''.
 * @param [options.path] Path, under which the proxy is reachable. Default is 'v2'.
 * @param [options.model] CDS service model (path or CSN). Default is 'all'.
 * @param [options.port] Target port, which points to OData v4 backend port. Default is '4004'.
 * @param [options.target] Target, which points to OData v4 backend host/port. Default is 'http://localhost:4004'.
 * @param [options.standalone] Indication, that OData v2 Adapter proxy is a standalone process. Default is 'false'.
 * @param [options.mtxEndpoint] Endpoint to retrieve MTX metadata. Default is '/mtx/v1'
 * @returns {Router}
 */
module.exports = (options = undefined) => {
  const optionWithFallback = (name, fallback) =>
    options && !Object.prototype.hasOwnProperty.call(options, name) ? fallback : options[name];

  const proxyCache = {};
  const appContext = logging.createAppContext();
  const router = express.Router();
  const base = optionWithFallback("base", "");
  const path = optionWithFallback("path", "v2");
  const sourcePath = `${base ? "/" + base : ""}/${path}`;
  const targetPath = base ? "/" + base : "";
  const pathRewrite = { [`^${sourcePath}`]: targetPath };
  const port = optionWithFallback("port", "4004");
  const target = optionWithFallback("target", `http://localhost:${port}`);
  const standalone = optionWithFallback("standalone", false);
  const mtxEndpoint = optionWithFallback("mtxEndpoint", "/mtx/v1");

  let model = optionWithFallback("model", "all");
  if (model === "all" || (Array.isArray(model) && model[0] === "all")) {
    model = [[cds.env.folders.app, cds.env.folders.srv], "services", "."].find(m => cds.resolve(m));
  }

  if (cds.mtx && cds.mtx.eventEmitter && cds.env.requires && cds.env.requires.db && cds.env.requires.db.multiTenant) {
    cds.mtx.eventEmitter.on(cds.mtx.events.TENANT_UPDATED, tenantId => {
      delete proxyCache[tenantId];
    });
  }

  router.use(`/${path}/*`, logging.middleware({ appContext: appContext, logNetwork: true }));

  router.get(`/${path}/*/\\$metadata`, async (req, res) => {
    try {
      const result = await Promise.all([
        // HEAD: cap/issues/3480
        axios.get(getV4RequestUrl(req), {
          headers: req.headers,
          validateStatus: null
        }),
        (async () => {
          const { csn } = await getMetadata(req);
          req.csn = csn;
          const service = serviceFromRequest(req);
          const { edmx } = await getMetadata(req, service.name);
          return edmx;
        })()
      ]);
      const [metadataResponse, edmx] = result;
      const headers = convertBasicHeaders(metadataResponse.headers);
      let body;
      if (metadataResponse.status === 200) {
        body = edmx;
      } else {
        const contentType = headers["content-type"];
        if (isApplicationJSON(contentType)) {
          body = JSON.stringify(metadataResponse.data);
        } else {
          body = metadataResponse.data;
        }
      }
      headers["content-length"] = Buffer.byteLength(body);
      respond(req, res, metadataResponse.status, headers, body);
    } catch (err) {
      // Error
      traceError(req, "Error", err.stack || err.message);
      res.status(500).send("Internal Server Error");
    }
  });

  router.use(
    `/${path}/*`,

    // Body Parsers
    (req, res, next) => {
      const contentType = req.header("content-type");
      if (!contentType) {
        return next();
      }

      if (contentType.startsWith("application/json")) {
        express.json({ limit: BodyParserLimit })(req, res, next);
      } else if (contentType.startsWith("multipart/mixed")) {
        express.text({ type: "multipart/mixed", limit: BodyParserLimit })(req, res, next);
      } else {
        next();
      }
    },

    // Inject Context
    async (req, res, next) => {
      try {
        const { csn } = await getMetadata(req);
        req.csn = csn;
      } catch (err) {
        // Error
        traceError(req, "Error", err.stack || err.message);
        res.status(500).send("Internal Server Error");
        return;
      }
      const service = serviceFromRequest(req);
      req.base = base;
      req.service = service.name;
      req.servicePath = service.path;
      req.context = {};
      req.contexts = [];
      req.contentId = {};
      next();
    },

    // Proxy Middleware
    proxy({
      target,
      changeOrigin: true,
      selfHandleResponse: true,
      pathRewrite,
      onProxyReq: (proxyReq, req, res) => {
        convertProxyRequest(proxyReq, req, res);
      },
      onProxyRes: (proxyRes, req, res) => {
        convertProxyResponse(proxyRes, req, res);
      }
    })
  );

  function serviceFromRequest(req) {
    const requestPath = req.params["0"].replace(/^\/?(.*?)\/?$/g, "$1");
    let servicePath = requestPath.split("/").shift();
    let serviceName = Object.keys(cds.services).find(service => {
      const path = cds.services[service].path;
      if (path) {
        return (
          path.toLowerCase() === servicePath.toLowerCase() || path.toLowerCase() === `/${servicePath.toLowerCase()}`
        );
      }
      return false;
    });
    if (!serviceName) {
      serviceName = Object.keys(cds.services).find(service => {
        const path = cds.services[service].path;
        return path === "/";
      });
      servicePath = "";
    }
    if (!serviceName || !req.csn.definitions[serviceName]) {
      traceWarning(req, "Service", `Service definition not found for request path '${requestPath}'`);
    }
    return {
      name: serviceName,
      path: servicePath
    };
  }

  async function getMetadata(req, service) {
    let metadata;
    if (standalone && mtxEndpoint) {
      metadata = await getTenantMetadataRemote(req, service);
    } else if (cds.mtx && cds.env.requires && cds.env.requires.db && cds.env.requires.db.multiTenant) {
      metadata = await getTenantMetadataLocal(req, service);
    }
    if (!metadata) {
      metadata = await getDefaultMetadata(req, service);
    }
    return metadata;
  }

  async function getTenantId(req) {
    if (cds.env.requires && cds.env.requires.xsuaa && req.headers.authorization) {
      const xssec = require("@sap/xssec");
      const jwtToken = req.headers.authorization.substr("bearer ".length);
      const securityContext = await promisify(xssec.createSecurityContext)(
        jwtToken,
        cds.env.requires.xsuaa.credentials
      );
      return securityContext.getSubaccountId();
    }
  }

  async function getTenantMetadataRemote(req, service) {
    const tenantId = await getTenantId(req);
    if (tenantId) {
      return await compileService(
        determineLocale(req),
        tenantId,
        async () => {
          const response = await axios.get(getBaseUrl(req) + mtxEndpoint + `/metadata/csn/${tenantId}`, {
            headers: req.headers
          });
          return response && response.data;
        },
        service
      );
    }
  }

  async function getTenantMetadataLocal(req, service) {
    const tenantId = await getTenantId(req);
    if (tenantId && (await cds.mtx.isExtended(tenantId))) {
      return await compileService(
        determineLocale(req),
        tenantId,
        async () => {
          return await cds.mtx.getCsn(tenantId);
        },
        service
      );
    }
  }

  async function getDefaultMetadata(req, service) {
    return await compileService(
      determineLocale(req),
      DefaultTenant,
      async () => {
        if (cds.model && cds.env.features.snapi) {
          return cds.model;
        }
        if (typeof model === "object" && !Array.isArray(model)) {
          return model;
        }
        return await cds.load(model);
      },
      service
    );
  }

  async function compileService(locale, tenantId, loadCsn, service) {
    if (!proxyCache[tenantId]) {
      const csnRaw = await loadCsn();
      const csn = cds.linked(cds.compile.for.odata(csnRaw, { version: "v2" }));
      proxyCache[tenantId] = {
        csnRaw,
        csn,
        edmx: {}
      };
    }
    if (service) {
      proxyCache[tenantId].edmx[service] = proxyCache[tenantId].edmx[service] || {};
      if (!(proxyCache[tenantId].edmx[service] && proxyCache[tenantId].edmx[service][locale])) {
        const csnLocalized = cds.localize(proxyCache[tenantId].csnRaw, locale);
        proxyCache[tenantId].edmx[service][locale] = await cds.compile.to.edmx(csnLocalized, {
          service,
          version: "v2"
        });
      }
    }
    return {
      csn: proxyCache[tenantId].csn,
      edmx: service && proxyCache[tenantId].edmx[service][locale]
    };
  }

  function lookupDefinition(name, req) {
    const definitionName = name.startsWith(`${req.service}.`) ? name : `${req.service}.${name}`;
    return req.csn.definitions[definitionName];
  }

  function lookupBoundDefinition(name, req) {
    let boundAction;
    Object.keys(req.csn.definitions).find(definitionName => {
      const definition = req.csn.definitions[definitionName];
      return Object.keys(definition.actions || {}).find(actionName => {
        if (name.endsWith(`_${actionName}`)) {
          const entityName = name.substr(0, name.length - `_${actionName}`.length);
          const entityDefinition = lookupDefinition(entityName, req);
          if (entityDefinition === definition) {
            boundAction = definition.actions[actionName];
            boundAction.name = actionName;
            boundAction.parent = definition;
            return true;
          }
        }
        return false;
      });
    });
    return boundAction;
  }

  /**
   * Convert Proxy Request (v2 -> v4)
   * @param proxyReq Proxy Request
   * @param req Request
   * @param res Response
   */
  async function convertProxyRequest(proxyReq, req, res) {
    // Trace
    traceRequest(req, "Request", req.method, req.originalUrl, req.headers, req.body);

    const headers = req.headers;
    if (req.loggingContext) {
      headers["x-request-id"] = req.loggingContext.id;
      headers["x-correlationid"] = req.loggingContext.correlationId;
    }
    let body = req.body;
    const contentType = req.header("content-type");

    if (isMultipart(contentType)) {
      // Multipart
      body = processMultipart(
        req,
        req.body,
        contentType,
        ({ method, url, contentId }) => {
          return {
            method: method === "MERGE" ? "PATCH" : method,
            url: convertUrl(url, contentId, req)
          };
        },
        ({ contentType, body, headers, url }) => {
          delete headers.dataserviceversion;
          delete headers.DataServiceVersion;
          delete headers.maxdataserviceversion;
          delete headers.MaxDataServiceVersion;
          if (isApplicationJSON(contentType)) {
            body = convertRequestBody(body, headers, url, req);
          }
          return { body, headers };
        }
      );
    } else {
      // Single
      proxyReq.path = convertUrl(proxyReq.path, undefined, req);
      if (isApplicationJSON(contentType)) {
        body = convertRequestBody(req.body, req.headers, proxyReq.path, req);
      }
    }

    Object.entries(headers).forEach(([name, value]) => {
      if (
        name === "dataserviceversion" ||
        name === "DataServiceVersion" ||
        name === "maxdataserviceversion" ||
        name === "MaxDataServiceVersion"
      ) {
        delete headers[name];
        proxyReq.removeHeader(name);
      }
    });

    if (req.body) {
      delete req.body;
    }
    if (contentType) {
      if (body !== undefined) {
        if(isApplicationJSON(contentType)) {
          proxyReq.setHeader("content-type", "application/json;charset=UTF-8;IEEE754Compatible=true");
        }
        proxyReq.setHeader("content-length", Buffer.byteLength(body));
        proxyReq.write(body);
        proxyReq.end();
      } else if (req.header("transfer-encoding") === "chunked") {
        proxyReq.setHeader("content-type", contentType);
        req.pipe(proxyReq);
      }
    }
    proxyReq.method = proxyReq.method === "MERGE" ? "PATCH" : proxyReq.method;

    // Trace
    traceRequest(req, "Proxy Request", proxyReq.method, proxyReq.path, headers, body);
  }

  function convertUrl(urlPath, contentId, req) {
    let url = parseURL(urlPath, req);
    const definition = contextFromUrl(url, req);
    enrichRequest(definition, url, contentId, req);

    // Order is important
    convertUrlDataTypes(url, req);
    convertUrlCount(url, req);
    convertDraft(url, req);
    convertActionFunction(url, req);
    convertExpandSelect(url, req);
    convertFilter(url, req);
    convertSearch(url, req);
    convertAnalytics(url, req);
    convertValue(url, req);

    delete url.search;
    url.pathname = url.basePath + url.servicePath + url.contextPath;
    url.pathname = encodeURI(url.pathname);
    return URL.format(url);
  }

  function parseURL(urlPath, req) {
    const url = URL.parse(decodeURISafe(urlPath), true);
    url.pathname = decodeURISafe(url.pathname);
    url.basePath = "";
    url.servicePath = "";
    url.contextPath = url.pathname;
    if (req.base && url.contextPath.startsWith(`/${req.base}`)) {
      url.basePath = `/${req.base}`;
      url.contextPath = url.contextPath.substr(url.basePath.length);
    }
    if (url.contextPath.startsWith(`/${req.servicePath}`)) {
      url.servicePath = `/${req.servicePath}`;
      url.contextPath = url.contextPath.substr(url.servicePath.length);
    }
    if (url.contextPath.startsWith("/")) {
      url.servicePath += "/";
      url.contextPath = url.contextPath.substr(1);
    }
    // Normalize query parameters (no array)
    Object.keys(url.query || {}).forEach(name => {
      if (Array.isArray(url.query[name])) {
        url.query[name] = url.query[name][0] || "";
      }
    });
    return url;
  }

  function contextFromUrl(url, req) {
    let stop = false;
    return url.contextPath.split("/").reduce((context, part) => {
      if (stop) {
        return context;
      }
      const keyStart = part.indexOf("(");
      if (keyStart !== -1) {
        part = part.substr(0, keyStart);
      }
      context = lookupContext(part, context, req);
      if (!context) {
        stop = true;
      }
      return context;
    }, undefined);
  }

  function lookupContext(name, context, req) {
    if (!name) {
      return context;
    }
    if (!context) {
      if (name.startsWith("$") && req.contentId[name]) {
        return contextFromUrl(req.contentId[name], req);
      } else {
        context = lookupDefinition(name, req);
        if (!context) {
          context = lookupBoundDefinition(name, req);
        }
        if (!context) {
          traceWarning(req, "Context", `Definition '${name}' not found`);
        }
        return context;
      }
    } else {
      if (name.startsWith("$")) {
        return context;
      }
      if (context.kind === "function" || context.kind === "action") {
        req.context.operation = context;
        const returns = (context.returns && context.returns.items && context.returns.items) || context.returns;
        context = lookupDefinition(returns.type, req);
      }
      const element = context && context.elements && context.elements[name];
      if (element) {
        if (element.type === "cds.Composition" || element.type === "cds.Association") {
          // Navigation
          return element._target;
        } else {
          // Element
          return context;
        }
      }
      if (context && context.params && name === "Set") {
        return context;
      }
      traceWarning(req, "Context", `Definition '${name}' not found`);
    }
  }

  function enrichRequest(definition, url, contentId, req) {
    req.context = {
      url: url,
      serviceRoot: url.contextPath.length === 0,
      definition: definition,
      operation: null,
      bodyParameters: {},
      $value: false,
      $apply: null,
      aggregationKey: false
    };
    req.contexts.push(req.context);
    if (contentId) {
      req.contentId[`$${contentId}`] = url;
    }
  }

  function convertUrlDataTypes(url, req) {
    // Keys & Parameters
    let context;
    let stop = false;
    url.contextPath = url.contextPath
      .split("/")
      .map(part => {
        if (stop) {
          return part;
        }
        let keyPart = "";
        const keyStart = part.indexOf("(");
        const keyEnd = part.lastIndexOf(")");
        if (keyStart !== -1 && keyEnd === part.length - 1) {
          keyPart = part.substring(keyStart + 1, keyEnd);
          part = part.substr(0, keyStart);
        }
        keyPart = decodeURIKey(keyPart);
        context = lookupContext(part, context, req);
        if (!context) {
          stop = true;
        }
        if (context && context.elements && keyPart) {
          let aggregationMatch = keyPart.match(/^aggregation'(.*)'$/i);
          let aggregationKey = aggregationMatch && aggregationMatch.pop();
          if (aggregationKey) {
            // Aggregation Key
            try {
              const aggregation = JSON.parse(aggregationKey);
              url.query["$select"] = Object.keys(aggregation.key)
                .concat(aggregation.value)
                .join(",");
              url.query["$filter"] = Object.keys(aggregation.key)
                .map(name => {
                  return `${name} eq ${aggregation.key[name]}`;
                })
                .join(" and ");
              req.context.aggregationKey = true;
              return part;
            } catch (err) {
              // Error
              traceError(req, "Error", err.stack || err.message);
            }
          } else {
            const keys = keyPart.split(",");
            return `${part}(${keys.map(key => {
              const [name, value] = key.split("=");
              let type;
              if (name && value) {
                if (context.params && context.params[name]) {
                  type = context.params[name].type;
                }
                if (!type) {
                  type = context.elements[name] && context.elements[name].type;
                }
                return `${name}=${
                  DataTypeMap[type] ? convertDataTypeToV4(value.replace(DataTypeMap[type].v4, "$1"), type) : value
                }`;
              } else if (name && context.keys) {
                const key = Object.keys(context.keys).find(key => {
                  return context.keys[key].type !== "cds.Composition" && context.keys[key].type !== "cds.Association";
                });
                type = key && context.elements[key] && context.elements[key].type;
                return (
                  type &&
                  `${DataTypeMap[type] ? convertDataTypeToV4(name.replace(DataTypeMap[type].v4, "$1"), type) : name}`
                );
              }
            })})`;
          }
        } else {
          return part;
        }
      })
      .join("/");

    // Query
    Object.keys(url.query).forEach(name => {
      if (name === "$filter") {
        url.query[name] = convertUrlFilter(url.query[name], context);
      } else if (!name.startsWith("$")) {
        if (context && context.elements && context.elements[name]) {
          const element = context.elements[name];
          if (DataTypeMap[element.type]) {
            url.query[name] = convertDataTypeToV4(
              url.query[name].replace(DataTypeMap[element.type].v4, "$1"),
              element.type
            );
          }
        }
        if (context && (context.kind === "function" || context.kind === "action")) {
          if (context.params && context.params[name]) {
            const element = context.params[name];
            if (DataTypeMap[element.type]) {
              url.query[name] = convertDataTypeToV4(
                url.query[name].replace(DataTypeMap[element.type].v4, "$1"),
                element.type
              );
            }
          }
          if (context.parent && context.parent.kind === "entity") {
            if (context.parent && context.parent.elements && context.parent.elements[name]) {
              const element = context.parent.elements[name];
              if (DataTypeMap[element.type]) {
                url.query[name] = convertDataTypeToV4(
                  url.query[name].replace(DataTypeMap[element.type].v4, "$1"),
                  element.type
                );
              }
            }
          }
        }
      }
    });
  }

  function buildQuoteParts(input) {
    let quote = false;
    let quoteEscape = false;
    let quoteTypeStart = false;
    let part = "";
    const parts = [];
    input.split("").forEach((char, index) => {
      part += char;
      if (char === "'") {
        if (quote) {
          if (quoteEscape) {
            quoteEscape = false;
            return;
          }
          const nextChar = input.substr(index + 1, 1);
          if (nextChar === "'") {
            quoteEscape = true;
            return;
          }
        }
        const typeStart = !!Object.keys(DataTypeMap)
          .filter(type => type !== "cds.String")
          .find(type => {
            const v2Pattern = DataTypeMap[type].v2;
            return v2Pattern.includes("'") && part.endsWith(v2Pattern.split("'").shift() + "'");
          });
        if (!typeStart && !quoteTypeStart) {
          if (part.length > 0) {
            parts.push({
              content: part,
              quote: quote
            });
            part = "";
          }
          quote = !quote;
        }
        quoteTypeStart = typeStart;
      }
    });
    if (part.length > 0) {
      parts.push({
        content: part,
        quote: quote
      });
    }
    return parts;
  }

  function convertUrlFilter(filter, context) {
    return buildQuoteParts(filter)
      .map(part => {
        if (!part.quote) {
          if (context && context.elements) {
            Object.keys(context.elements).forEach(name => {
              const element = context.elements[name];
              if (element.type !== "cds.Composition" && element.type !== "cds.Association") {
                if (DataTypeMap[element.type]) {
                  const v4Regex = RegExp(
                    `(${element.name})(\\s+?(?:eq|ne|gt|ge|lt|le])\\s+?)${DataTypeMap[element.type].v4.source}`,
                    DataTypeMap[element.type].v4.flags
                  );
                  part.content = part.content.replace(v4Regex, (_, name, op, value) => {
                    return `${name}${op}${convertDataTypeToV4(value, element.type)}`;
                  });
                }
              }
            });
          }
          part.content = part.content
            .split(UUIDRegex)
            .map((part, index) => {
              if (index % 2 === 0) {
                if (part.length > 0) {
                  Object.keys(DataTypeMap).forEach(type => {
                    const v4Regex = RegExp("([ ,(=])" + DataTypeMap[type].v4.source, DataTypeMap[type].v4.flags);
                    part = part.replace(v4Regex, "$1$2");
                  });
                }
                return part;
              } else {
                return part.replace(DataTypeMap["cds.UUID"].v4, "$1");
              }
            })
            .join("");
        }
        return part.content;
      })
      .join("");
  }

  function convertUrlCount(url, req) {
    if (url.query["$inlinecount"]) {
      url.query["$count"] = url.query["$inlinecount"] === "allpages";
      delete url.query["$inlinecount"];
    }
    return url;
  }

  function convertDraft(url, req) {
    if (
      req.context &&
      req.context.definition &&
      req.context.definition.kind === "action" &&
      req.context.definition.params &&
      req.context.definition.params.SideEffectsQualifier
    ) {
      url.query.SideEffectsQualifier = url.query.SideEffectsQualifier || "";
    }
  }

  function convertActionFunction(url, req) {
    const definition = req.context && (req.context.operation || req.context.definition);
    if (!(definition && (definition.kind === "function" || definition.kind === "action"))) {
      return;
    }
    const operationLocalName = definition.name.split(".").pop();
    let reqContextPathSuffix = "";
    if (url.contextPath.startsWith(operationLocalName)) {
      reqContextPathSuffix = url.contextPath.substr(operationLocalName.length);
      url.contextPath = url.contextPath.substr(0, operationLocalName.length);
    }
    // Key Parameters
    if (definition.parent && definition.parent.kind === "entity") {
      url.contextPath = definition.parent.name.split(".").pop();
      url.contextPath += `(${Object.keys(definition.parent.keys)
        .reduce((result, name) => {
          const element = definition.parent.elements && definition.parent.elements[name];
          const value = url.query[name] || "";
          result.push(`${name}=${quoteParameter(element, value, req)}`);
          delete url.query[name];
          return result;
        }, [])
        .join(",")})`;
      url.contextPath += `/${req.service}.${definition.name}`;
    }
    // Function Parameters
    if (definition.kind === "function") {
      url.contextPath += `(${Object.keys(url.query)
        .reduce((result, name) => {
          if (!name.startsWith("$")) {
            const element = definition.params && definition.params[name];
            if (element) {
              const value = url.query[name] || "";
              result.push(`${name}=${quoteParameter(element, value, req)}`);
              delete url.query[name];
            }
          }
          return result;
        }, [])
        .join(",")})`;
    }
    url.contextPath += reqContextPathSuffix;
    // Action Body
    if (definition.kind === "action") {
      Object.keys(url.query).forEach(name => {
        if (!name.startsWith("$")) {
          const element = definition.params && definition.params[name];
          let value = url.query[name] || "";
          value = unquoteParameter(element, value, req);
          value = parseParameter(element, value, req);
          url.query[name] = value;
        }
      });
      req.context.bodyParameters = url.query || {};
      url.query = {};
    }
  }

  function quoteParameter(element, value, req) {
    if (!element || ["cds.String", "cds.LargeString"].includes(element.type)) {
      return `'${value.replace(/^["'](.*)["']$/, "$1")}'`;
    }
    return value;
  }

  function unquoteParameter(element, value, req) {
    if (
      !element ||
      ["cds.Date", "cds.Time", "cds.DateTime", "cds.Timestamp", "cds.String", "cds.LargeString"].includes(element.type)
    ) {
      return value.replace(/^["'](.*)["']$/, "$1");
    }
    return value;
  }

  function parseParameter(element, value, req) {
    if (element) {
      if (["cds.Boolean"].includes(element.type)) {
        return value === "true";
      } else if (["cds.Integer"].includes(element.type)) {
        return parseInt(value);
      }
    }
    return value;
  }

  function convertExpandSelect(url, req) {
    const definition = req.context && req.context.definition;
    if (definition) {
      const context = { select: {}, expand: {} };
      if (url.query["$expand"]) {
        const expands = url.query["$expand"].split(",");
        expands.forEach(expand => {
          let current = context.expand;
          expand.split("/").forEach(part => {
            current[part] = current[part] || { select: {}, expand: {} };
            current = current[part].expand;
          });
        });
      }
      if (url.query["$select"]) {
        const selects = url.query["$select"].split(",");
        selects.forEach(select => {
          let current = context;
          let currentDefinition = definition;
          select.split("/").forEach(part => {
            if (!current) {
              return;
            }
            const element = currentDefinition.elements && currentDefinition.elements[part];
            if (element) {
              if (element.type === "cds.Composition" || element.type === "cds.Association") {
                current = current && current.expand[part];
                currentDefinition = element._target;
              } else if (current && current.select) {
                current.select[part] = true;
              }
            }
          });
        });
        if (Object.keys(context.select).length > 0) {
          url.query["$select"] = Object.keys(context.select).join(",");
        } else {
          delete url.query["$select"];
        }
      }
      if (url.query["$expand"]) {
        const serializeExpand = expand => {
          return Object.keys(expand || {})
            .map(name => {
              let value = expand[name];
              let result = name;
              const selects = Object.keys(value.select);
              const expands = Object.keys(value.expand);
              if (selects.length > 0 || expands.length > 0) {
                result += "(";
                if (selects.length > 0) {
                  result += `$select=${selects.join(",")}`;
                }
                if (expands.length > 0) {
                  if (selects.length > 0) {
                    result += ";";
                  }
                  result += `$expand=${serializeExpand(value.expand)}`;
                }
                result += ")";
              }
              return result;
            })
            .join(",");
        };
        if (Object.keys(context.expand).length > 0) {
          url.query["$expand"] = serializeExpand(context.expand);
        } else {
          delete url.query["$expand"];
        }
      }
    }
  }

  function convertFilter(url, req) {
    const _ = "§§";

    let filter = url.query["$filter"];
    if (filter) {
      let quote = false;
      let lookBehind = "";
      let bracket = 0;
      let brackets = [];
      let bracketMax = 0;

      filter = filter
        .split("")
        .map(char => {
          if (char === "'") {
            quote = !quote;
          }
          if (!quote) {
            if (char === "(") {
              bracket++;
              const filterFunctionStart = !!Object.keys(FilterFunctions).find(name => {
                return lookBehind.endsWith(name.split("(").shift());
              });
              if (filterFunctionStart) {
                brackets.push(bracket - 1);
                bracketMax = Math.max(bracketMax, brackets.length);
                return `${_}(${brackets.length}${_}`;
              }
            } else if (char === ")") {
              bracket--;
              const [mark] = brackets.slice(-1);
              if (mark === bracket) {
                brackets.pop();
                return `${_})${brackets.length + 1}${_}`;
              }
            } else if (char === ",") {
              if (bracket > 0) {
                return `${_},${brackets.length}${_}`;
              }
            }
            lookBehind += char;
          } else {
            lookBehind = "";
          }
          return char;
        })
        .join("");

      if (bracketMax > 0) {
        for (let i = 1; i <= bracketMax; i++) {
          Object.keys(FilterFunctions).forEach(name => {
            let pattern = name
              .replace(/([()])/g, `${_}\\$1${i}${_}`)
              .replace(/([,])/g, `${_}$1${i}${_}`)
              .replace(/[$]/g, "(.*?)");
            filter = filter.replace(new RegExp(pattern, "gi"), FilterFunctions[name]);
          });
          filter = filter.replace(new RegExp(`${_}([(),])${i}${_}`, "g"), "$1");
        }
        url.query["$filter"] = filter;
      }
    }
  }

  function convertSearch(url, req) {
    if (url.query.search) {
      url.query["$search"] = url.query.search;
      delete url.query.search;
    }
  }

  function convertAnalytics(url, req) {
    const definition = req.context && req.context.definition;
    if (
      !(
        definition &&
        definition.kind === "entity" &&
        url.query["$select"] &&
        (definition["@Analytics"] ||
          definition["@Analytics.query"] ||
          definition["@Aggregation.ApplySupported.PropertyRestrictions"])
      )
    ) {
      return;
    }
    const measures = [];
    const dimensions = [];
    const selects = url.query["$select"].split(",");
    if (url.query["$filter"]) {
      Object.keys(definition.elements || {}).forEach(name => {
        const element = definition.elements[name];
        if (!(element.type === "cds.Composition" || element.type === "cds.Association")) {
          if (new RegExp(`${name}[^a-zA-Z1-9_-]`).test(url.query["$filter"]) && !selects.includes(name)) {
            selects.push(name);
          }
        }
      });
    }
    selects.forEach(select => {
      const element = definition.elements && definition.elements[select];
      if (element) {
        if (element["@Analytics.Measure"]) {
          measures.push(element);
        } else {
          dimensions.push(element);
        }
      }
    });

    if (dimensions.length > 0 || measures.length > 0) {
      url.query["$apply"] = "";
      if (dimensions.length) {
        url.query["$apply"] = "groupby(";
        url.query["$apply"] += `(${dimensions
          .map(dimension => {
            return dimension.name;
          })
          .join(",")})`;
      }
      if (measures.length > 0) {
        if (url.query["$apply"]) {
          url.query["$apply"] += ",";
        }
        url.query["$apply"] += `aggregate(${measures
          .map(measure => {
            const aggregation = measure["@Aggregation.default"] || measure["@DefaultAggregation"];
            const aggregationName = aggregation ? aggregation["#"] || aggregation : "sum";
            const aggregationFunction = aggregationName ? AggregationMap[aggregationName.toUpperCase()] : undefined;
            if (!aggregationFunction) {
              throw new Error(`Aggregation '${aggregationName}' is not supported`);
            }
            return `${measure.name} with ${aggregationFunction} as ${AggregationPrefix}${measure.name}`;
          })
          .join(",")})`;
      }
      if (dimensions.length) {
        url.query["$apply"] += ")";
      }

      if (url.query["$filter"]) {
        url.query["$apply"] = `filter(${url.query["$filter"]})/` + url.query["$apply"];
      }

      if (url.query["$orderby"]) {
        url.query["$orderby"] = url.query["$orderby"]
          .split(",")
          .map(orderBy => {
            let [name, order] = orderBy.split(" ");
            const element = definition.elements && definition.elements[name];
            if (element && element["@Analytics.Measure"]) {
              name = `${AggregationPrefix}${element.name}`;
            }
            return name + (order ? ` ${order}` : "");
          })
          .join(",");
      }

      delete url.query["$filter"];
      delete url.query["$select"];
      delete url.query["$expand"];

      req.context.$apply = {
        key: dimensions,
        value: measures
      };
    }
  }

  function convertValue(url, req) {
    if (url.contextPath.endsWith("/$value")) {
      url.contextPath = url.contextPath.substr(0, url.contextPath.length - "/$value".length);
      const mediaTypeElementName =
        req.context && req.context.definition && findElementByAnnotation(req.context.definition, "@Core.MediaType");
      if (mediaTypeElementName && !url.contextPath.endsWith(`/${mediaTypeElementName}`)) {
        url.contextPath += `/${mediaTypeElementName}`;
      } else {
        req.context.$value = true;
      }
    }
  }

  function convertRequestBody(body, headers, url, req) {
    let definition = req.context && req.context.definition;
    if (definition) {
      if (definition.kind === "action") {
        body = req.context.bodyParameters || {};
        definition = {
          elements: definition.params || {}
        };
      }
      convertRequestData(body, headers, definition, req);
    }
    delete body.__metadata;
    delete body.__count;
    return JSON.stringify(body);
  }

  function convertRequestData(data, headers, definition, req) {
    if (!Array.isArray(data)) {
      return convertRequestData([data], headers, definition, req);
    }
    // Modify Payload
    data.forEach(data => {
      convertDataTypesToV4(data, headers, definition, data, req);
    });
    // Recursion
    data.forEach(data => {
      Object.keys(data).forEach(key => {
        let element = definition.elements[key];
        if (element && (element.type === "cds.Composition" || element.type === "cds.Association")) {
          if (data[key] && data[key].__deferred) {
            delete data[key];
          } else {
            if (data[key] !== null) {
              if (Array.isArray(data[key].results)) {
                data[key] = data[key].results;
              }
              convertRequestData(data[key], headers, element._target, req);
            } else {
              delete data[key];
            }
          }
        }
      });
    });
  }

  function convertDataTypesToV4(data, headers, definition, body, req) {
    Object.keys(data || {}).forEach(key => {
      if (data[key] === null) {
        return;
      }
      const element = definition.elements && definition.elements[key];
      if (element) {
        data[key] = convertDataTypeToV4(data[key], element.type, headers);
      }
    });
  }

  function convertDataTypeToV4(value, type, headers = {}) {
    const contentType = headers["content-type"];
    const ieee754Compatible = contentType && contentType.includes("IEEE754Compatible=true");
    if (["cds.Decimal"].includes(type)) {
      value = value;
    } else if (["cds.DecimalFloat", "cds.Integer64"].includes(type)) {
      value = ieee754Compatible ? `${value}` : parseFloat(value);
    } else if (["cds.Double"].includes(type)) {
      value = parseFloat(value);
    } else if (["cds.DateTime", "cds.Timestamp"].includes(type)) {
      const match = value.match(/\/Date\((.*)\)\//);
      const milliseconds = match && match.pop();
      if (milliseconds) {
        value = new Date(parseFloat(milliseconds)).toISOString();
      }
      if (["cds.DateTime"].includes(type)) {
        value = value.slice(0, 19) + "Z";
      }
    } else if (["cds.Date"].includes(type)) {
      const match = value.match(/\/Date\((.*)\)\//);
      const milliseconds = match && match.pop();
      if (milliseconds) {
        value = new Date(parseFloat(milliseconds)).toISOString();
      }
      value = value.slice(0, 10);
    } else if (["cds.Time"].includes(type)) {
      const match = value.match(DurationRegex);
      if (match) {
        value = `${match[1] || "00"}:${match[2] || "00"}:${match[3] || "00"}`;
      }
    }
    return value;
  }

  /**
   * Convert Proxy Response (v4 -> v2)
   * @param proxyRes Proxy Request
   * @param req Request
   * @param res Response
   */
  async function convertProxyResponse(proxyRes, req, res) {
    try {
      req.context = {};
      const headers = proxyRes.headers;
      normalizeContentType(headers);

      // Pipe Binary Stream
      const contentType = headers["content-type"];
      const transferEncoding = headers["transfer-encoding"];
      if (transferEncoding === "chunked" && !isApplicationJSON(contentType) && !isMultipart(contentType)) {
        return await processStreamResponse(proxyRes, req, res, headers);
      }

      let body = await parseProxyResponseBody(proxyRes, headers, req);
      // Trace
      traceResponse(req, "Proxy Response", proxyRes.statusCode, proxyRes.statusMessage, headers, body);

      convertBasicHeaders(headers);
      if (body && proxyRes.statusCode < 400) {
        if (isMultipart(contentType)) {
          // Multipart
          body = processMultipart(req, body, contentType, null, ({ index, statusCode, contentType, body, headers }) => {
            if (statusCode < 400) {
              convertHeaders(body, headers, req);
              if (body && isApplicationJSON(contentType)) {
                body = convertResponseBody(Object.assign({}, body), headers, req, index);
              }
            } else {
              convertHeaders(body, headers, req);
              body = convertResponseError(body, headers);
            }
            return { body, headers };
          });
        } else {
          // Single
          convertHeaders(body, headers, req);
          if (isApplicationJSON(contentType)) {
            body = convertResponseBody(Object.assign({}, body), headers, req);
          }
        }
        if (body && headers["transfer-encoding"] !== "chunked" && proxyRes.statusCode !== 204) {
          headers["content-length"] = Buffer.byteLength(body);
        }
      } else {
        convertHeaders(body, headers, req);
        body = convertResponseError(body, headers);
      }
      respond(req, res, proxyRes.statusCode, headers, body);
    } catch (err) {
      // Error
      traceError(req, "Error", err.stack || err.message);
      respond(req, res, proxyRes.statusCode, proxyRes.headers, convertResponseError(proxyRes.body, proxyRes.headers));
    }
  }

  async function processStreamResponse(proxyRes, req, res, headers) {
    // Trace
    traceResponse(req, "Proxy Response", proxyRes.statusCode, proxyRes.statusMessage, headers, {});

    convertBasicHeaders(headers);
    const context = req.contexts && req.contexts[0];
    if (context && context.definition && context.definition.elements) {
      const contentDispositionFilenameElement = findElementByAnnotation(
        context.definition,
        "@Core.ContentDisposition.Filename"
      );
      const mediaTypeElement = findElementByAnnotation(context.definition, "@Core.MediaType");
      if (contentDispositionFilenameElement && mediaTypeElement) {
        const parts = getV2RequestUrl(req).split("/");
        if (parts[parts.length - 1] === "$value") {
          parts.pop();
        }
        if (parts[parts.length - 1] === mediaTypeElement) {
          parts.pop();
        }
        const response = await axios.get(parts.join("/"), {
          headers: req.headers
        });
        const filename =
          response && response.data && response.data.d && response.data.d[contentDispositionFilenameElement];
        if (filename) {
          headers["content-disposition"] = `inline; filename="${filename}"`;
        }
      }
    }
    Object.entries(headers).forEach(([name, value]) => {
      res.setHeader(name, value);
    });
    proxyRes.pipe(res);

    // Trace
    traceResponse(req, "Response", res.statusCode, res.statusMessage, headers, {});
  }

  async function parseProxyResponseBody(proxyRes, headers, req) {
    const contentType = headers["content-type"];
    let bodyParser;
    if (req.method === "HEAD") {
      bodyParser = null;
    } else if (isApplicationJSON(contentType)) {
      bodyParser = express.json({ limit: BodyParserLimit });
    } else if (isPlainText(contentType) || isXML(contentType)) {
      bodyParser = express.text({ type: () => true, limit: BodyParserLimit });
    } else if (isMultipart(contentType)) {
      bodyParser = express.text({ type: "multipart/mixed", limit: BodyParserLimit });
    }
    if (bodyParser) {
      await promisify(bodyParser)(proxyRes, null);
      return proxyRes.body;
    }
  }

  function convertBasicHeaders(headers) {
    delete headers["odata-version"];
    headers.dataserviceversion = "2.0";
    return headers;
  }

  function convertHeaders(body, headers, req) {
    convertBasicHeaders(headers);
    const definition = contextFromBody(body, req);
    if (definition && definition.kind === "entity") {
      convertLocation(body, headers, definition, req);
    }
    convertMessages(body, headers, definition, req);
    return headers;
  }

  function convertLocation(body, headers, entity, req) {
    if (headers.location && entity) {
      headers.location = entityUri(body, entity, req);
    }
  }

  function convertMessages(body, headers, entity, req) {
    if (headers["sap-messages"]) {
      const messages = JSON.parse(headers["sap-messages"]);
      if (messages && messages.length > 0) {
        const message = messages[0];
        message.severity = SeverityMap[message["@Common.numericSeverity"] || message.numericSeverity];
        delete message.numericSeverity;
        delete message["@Common.numericSeverity"];
        headers["sap-message"] = JSON.stringify(message);
      }
      delete headers["sap-messages"];
    }
  }

  function convertResponseError(body, headers) {
    if (!body) {
      return body;
    }
    if (body.error) {
      if (body.error.message) {
        body.error.message = {
          lang: headers["content-language"] || "en",
          value: body.error.message
        };
      }
      if (body.error["@Common.numericSeverity"] || body.error["numericSeverity"]) {
        body.error.severity = SeverityMap[body.error["@Common.numericSeverity"] || body.error["numericSeverity"]];
        delete body.error.numericSeverity;
        delete body.error["@Common.numericSeverity"];
      }
      body.error.innererror = body.error.innererror || {};
      body.error.innererror.errordetails = body.error.innererror.errordetails || [];
      if (body.error.details) {
        body.error.innererror.errordetails.push(...body.error.details);
        body.error.innererror.errordetails.forEach(detail => {
          detail.severity =
            detail.severity || SeverityMap[detail["@Common.numericSeverity"] || detail["numericSeverity"]] || "error";
          delete detail.numericSeverity;
          delete detail["@Common.numericSeverity"];
        });
      }
      delete body.error.details;
    }
    if (typeof body === "object") {
      body = JSON.stringify(body);
    }
    body = `${body}`;
    headers["content-length"] = Buffer.byteLength(body);
    return body;
  }

  function convertResponseBody(proxyBody, headers, req, index = 0) {
    const body = {
      d: {}
    };
    req.context = req.contexts[index] || {};

    if (req.context.serviceRoot && proxyBody.value) {
      // Service Root
      body.d.EntitySets = proxyBody.value.map(entry => {
        return entry.name;
      });
    } else {
      // Context from Body
      const definition = contextFromBody(proxyBody, req);
      if (definition) {
        req.context.definition = definition;
        const definitionElement = contextElementFromBody(proxyBody, req);
        if (definitionElement) {
          body.d[definitionElement.name] = proxyBody.value;
          convertResponseElementData(body, headers, definition, proxyBody, req);
          if (req.context.$value) {
            headers["content-type"] = "text/plain";
            return `${body.d[definitionElement.name]}`;
          }
        } else {
          const data = convertResponseList(body, proxyBody, req);
          convertResponseData(data, headers, definition, proxyBody, req);
        }
      } else {
        // Context from Request
        let definition = req.context.definition;
        const data = convertResponseList(body, proxyBody, req);
        if (definition && (definition.kind === "function" || definition.kind === "action")) {
          const returns =
            (definition.returns && definition.returns.items && definition.returns.items) || definition.returns;
          definition = lookupDefinition(returns.type, req) || {
            elements: {
              value: returns
            }
          };
          req.context.definition = definition;
          convertResponseData(data, headers, definition, proxyBody, req);
        } else {
          convertResponseData(data, headers, definition, proxyBody, req);
        }
      }
    }

    return JSON.stringify(body);
  }

  function convertResponseList(body, proxyBody, req) {
    if (Array.isArray(proxyBody.value)) {
      if (req.context.aggregationKey) {
        proxyBody = proxyBody.value[0] || {};
      } else {
        body.d.results = proxyBody.value || [];
        if (proxyBody["@odata.count"] !== undefined) {
          body.d.__count = String(proxyBody["@odata.count"]);
        }
        body.d.results = body.d.results.map(entry => {
          return typeof entry == "object" ? entry : { value: entry };
        });
        return body.d.results;
      }
    }
    body.d = proxyBody;
    return [body.d];
  }

  function convertResponseData(data, headers, definition, proxyBody, req) {
    if (data === null) {
      return;
    }
    if (!Array.isArray(data)) {
      return convertResponseData([data], headers, definition, proxyBody, req);
    }
    if (!definition) {
      return;
    }
    // Recursion
    data.forEach(data => {
      Object.keys(data).forEach(key => {
        let element = definition.elements && definition.elements[key];
        if (!element) {
          return;
        }
        if (element.type === "cds.Composition" || element.type === "cds.Association") {
          convertResponseData(data[key], headers, element._target, proxyBody, req);
        }
      });
    });
    // Structural Changes
    data.forEach(data => {
      addResultsNesting(data, headers, definition, proxyBody, req);
    });
    // Deferreds
    data.forEach(data => {
      addDeferreds(data, headers, definition, proxyBody, req);
    });
    // Modify Payload
    data.forEach(data => {
      removeMetadata(data, headers, definition, proxyBody, req);
      addMetadata(data, headers, definition, proxyBody, req);
      convertDataTypesToV2(data, headers, definition, proxyBody, req);
      convertAggregation(data, headers, definition, proxyBody, req);
    });
  }

  function convertResponseElementData(data, headers, definition, proxyBody, req) {
    if (!definition) {
      return;
    }
    // Modify Payload
    convertDataTypesToV2(data, headers, definition, proxyBody, req);
  }

  function contextFromBody(body, req) {
    let context = body && body["@odata.context"];
    if (!context) {
      return null;
    }
    context = context.substr(context.indexOf("#") + 1);
    if (context.startsWith("Collection(")) {
      context = context.substring("Collection(".length, context.indexOf(")"));
    } else {
      if (context.indexOf("(") !== -1) {
        context = context.substr(0, context.indexOf("("));
      }
    }
    if (context.indexOf("/") !== -1) {
      context = context.substr(0, context.indexOf("/"));
    }
    if (context) {
      return lookupDefinition(context, req);
    }
  }

  function contextElementFromBody(body, req) {
    let context = body["@odata.context"];
    const definition = contextFromBody(body, req);
    if (!(context && definition)) {
      return null;
    }
    if (context.lastIndexOf("/") !== -1) {
      const name = context.substr(context.lastIndexOf("/") + 1);
      if (name && !name.startsWith("$")) {
        const element = definition.elements && definition.elements[name];
        if (element) {
          return element;
        }
      }
    }
  }

  function removeMetadata(data, headers, definition, root, req) {
    Object.keys(data).forEach(key => {
      if (key.startsWith("@")) {
        delete data[key];
      }
    });
  }

  function addMetadata(data, headers, definition, root, req) {
    if (definition.kind !== "entity") {
      return;
    }
    data.__metadata = {
      uri: entityUri(data, definition, req),
      type: definition.name
    };
    if (root["@odata.metadataEtag"]) {
      data.__metadata.etag = root["@odata.metadataEtag"];
    }
  }

  function convertAggregation(data, headers, definition, body, req) {
    if (!req.context.$apply) {
      return;
    }
    Object.keys(data).forEach(key => {
      if (key.startsWith(AggregationPrefix)) {
        if (!key.endsWith("@odata.type")) {
          const type = (data[`${key}@odata.type`] || "#Decimal").replace("#", "cds.");
          data[key.substr(AggregationPrefix.length)] = convertDataTypeToV2(data[key], type);
          delete data[key];
        }
      }
    });
    Object.keys(data).forEach(key => {
      if (key.startsWith(AggregationPrefix) && key.endsWith("@odata.type")) {
        delete data[key];
      }
    });
    const aggregationKey = {
      key: req.context.$apply.key.reduce((result, keyElement) => {
        let value = data[keyElement.name];
        if (value !== undefined && value !== null && DataTypeMap[keyElement.type]) {
          value = convertDataTypeToV2Uri(String(value), keyElement.type).replace(
            /(.*)/,
            DataTypeMap[keyElement.type].v2
          );
        }
        result[keyElement.name] = value;
        return result;
      }, {}),
      value: req.context.$apply.value.map(valueElement => {
        return valueElement.name;
      })
    };
    data.__metadata.uri = entityUriKey(`aggregation'${JSON.stringify(aggregationKey)}'`, definition, req);
    delete data.__metadata.etag;
  }

  function convertDataTypesToV2(data, headers, definition, body, req) {
    Object.keys(data).forEach(key => {
      if (data[key] === null) {
        return;
      }
      const element = definition.elements && definition.elements[key];
      if (!element) {
        return;
      }
      data[key] = convertDataTypeToV2(data[key], element.type);
    });
  }

  function convertDataTypeToV2(value, type) {
    if (["cds.Decimal", "cds.DecimalFloat", "cds.Double", "cds.Integer64"].includes(type)) {
      value = `${value}`;
    } else if (["cds.Date", "cds.DateTime", "cds.Timestamp"].includes(type)) {
      value = `/Date(${new Date(value).getTime()})/`;
    } else if (["cds.Time"].includes(type)) {
      value = convertToDayTimeDuration(value);
    }
    return value;
  }

  function convertDataTypeToV2Uri(value, type) {
    if (["cds.Date"].includes(type)) {
      value = `${value}T00:00`;
    } else if (["cds.Time"].includes(type)) {
      value = convertToDayTimeDuration(value);
    }
    return value;
  }

  function convertToDayTimeDuration(value) {
    const timeParts = value.split(":");
    return `PT${timeParts[0] || "00"}H${timeParts[1] || "00"}M${timeParts[2] || "00"}S`;
  }

  function addResultsNesting(data, headers, definition, root, req) {
    Object.keys(data).forEach(key => {
      if (!(definition.elements && definition.elements[key])) {
        return;
      }
      if (definition.elements[key].cardinality && definition.elements[key].cardinality.max === "*") {
        data[key] = {
          results: data[key]
        };
      }
    });
  }

  function addDeferreds(data, headers, definition, root, req) {
    if (definition.kind !== "entity" || req.context.$apply) {
      return;
    }
    Object.keys(definition.elements || {}).forEach(key => {
      let element = definition.elements[key];
      if (element && (element.type === "cds.Composition" || element.type === "cds.Association")) {
        if (data[key] === undefined) {
          data[key] = {
            __deferred: {
              uri: `${entityUri(data, definition, req)}/${key}`
            }
          };
        }
      }
    });
  }

  function entityUri(data, entity, req) {
    return entityUriKey(entityKey(data, entity), entity, req);
  }

  function entityUriKey(key, entity, req) {
    const protocol = req.header("x-forwarded-proto") || req.protocol || "http";
    const host = req.header("x-forwarded-host") || req.hostname || "localhost";
    const port = req.header("x-forwarded-host") ? "" : `:${req.socket.address().port}`;
    return `${protocol}://${host}${port}${sourcePath}/${req.servicePath}/${entity.name.split(".").pop()}(${encodeURIKey(
      key
    )})`;
  }

  function entityKey(data, entity) {
    let keyElements = Object.keys(entity.elements)
      .filter(key => {
        return !(entity.elements[key].type === "cds.Composition" || entity.elements[key].type === "cds.Association");
      })
      .filter(key => {
        return entity.elements[key].key;
      })
      .map(key => {
        return entity.elements[key];
      });
    return keyElements
      .map(keyElement => {
        let value = data[keyElement.name];
        if (value !== undefined && value !== null && DataTypeMap[keyElement.type]) {
          value = convertDataTypeToV2Uri(String(value), keyElement.type).replace(
            /(.*)/,
            DataTypeMap[keyElement.type].v2
          );
        }
        if (keyElements.length === 1) {
          return `${value}`;
        } else {
          return `${keyElement.name}=${value}`;
        }
      })
      .join(",");
  }

  function respond(req, res, statusCode, headers, body) {
    if (!res.headersSent) {
      Object.entries(headers).forEach(([name, value]) => {
        res.setHeader(name, value);
      });
      res.status(statusCode);
      if (body && statusCode !== 204) {
        res.write(body);
      }
      res.end();

      // Trace
      traceResponse(req, "Response", res.statusCode, res.statusMessage, headers, body);
    }
  }

  function normalizeContentType(headers) {
    let contentType = headers["content-type"];
    if (contentType) {
      contentType = contentType.trim();
      if (contentType.startsWith("application/json")) {
        contentType = contentType.replace(/(application\/json).*/gi, "$1").trim();
      }
      headers["content-type"] = contentType;
    }
    return contentType;
  }

  function isApplicationJSON(contentType) {
    return contentType && contentType.startsWith("application/json");
  }

  function isPlainText(contentType) {
    return contentType && contentType.startsWith("text/plain");
  }

  function isXML(contentType) {
    return contentType && (contentType.startsWith("application/xml") || contentType.startsWith("text/xml"));
  }

  function isMultipart(contentType) {
    return contentType && contentType.replace(/\s/g, "").startsWith("multipart/mixed;boundary=");
  }

  function encodeURIKey(key) {
    return key.replace(/[ ]/g, "%20").replace(/[/]/g, "%2F");
  }

  function decodeURIKey(key) {
    return key.replace(/%20/g, " ").replace(/%2F/g, "/");
  }

  function getV2RequestUrl(req) {
    return getBaseUrl(req) + req.originalUrl;
  }

  function getV4RequestUrl(req) {
    let path = req.originalUrl;
    Object.entries(pathRewrite).forEach(([key, value]) => {
      path = path.replace(new RegExp(key, "g"), value);
    });
    return getBaseUrl(req) + path;
  }

  function getBaseUrl(req) {
    return req.protocol + "://" + req.get("host");
  }

  function findElementByAnnotation(definition, annotation) {
    return (
      definition &&
      definition.elements &&
      Object.keys(definition.elements)
        .filter(key => {
          return !(
            definition.elements[key].type === "cds.Composition" && definition.elements[key].type === "cds.Association"
          );
        })
        .find(key => {
          const element = definition.elements[key];
          return element && !!element[annotation];
        })
    );
  }

  function determineLocale(req) {
    return (
      req.query["sap-language"] ||
      req.headers["x-sap-request-language"] ||
      req.headers["accept-language"] ||
      (cds.config.i18n && cds.config.i18n.default_language) ||
      "en"
    );
  }

  function processMultipart(req, multiPartBody, contentType, urlProcessor, bodyHeadersProcessor) {
    const match = contentType.replace(/\s/g, "").match(/^multipart\/mixed;boundary=(.*)$/i);
    let boundary = match && match.pop();
    if (!boundary) {
      return multiPartBody;
    }
    let boundaryChangeSet = "";
    let urlAfterBlank = false;
    let bodyAfterBlank = false;
    let previousLineIsBlank = false;
    let index = 0;
    let statusCode;
    let contentId;
    let body = "";
    let headers = {};
    let method = "";
    let url = "";
    let parts = multiPartBody.split("\r\n");
    const newParts = [];
    parts.forEach(part => {
      const match = part.replace(/\s/g, "").match(/^content-type:multipart\/mixed;boundary=(.*)$/i);
      if (match) {
        boundaryChangeSet = match.pop();
      }
      if (part.startsWith(`--${boundary}`) || (boundaryChangeSet && part.startsWith(`--${boundaryChangeSet}`))) {
        // Body & Headers
        if (bodyAfterBlank) {
          if (bodyHeadersProcessor) {
            try {
              const contentType = normalizeContentType(headers);
              if (isApplicationJSON(contentType)) {
                body = (body && JSON.parse(body)) || {};
              }
              const result = bodyHeadersProcessor({
                index,
                statusCode,
                contentType,
                body,
                headers,
                method,
                url,
                contentId
              });
              body = (result && result.body) || body;
              headers = (result && result.headers) || headers;
            } catch (err) {
              // Error
              traceError(req, "Error", err.stack || err.message);
            }
          }
          Object.entries(headers).forEach(([name, value]) => {
            newParts.splice(-1, 0, `${name}: ${value}`);
          });
          newParts.push(body);
          statusCode = undefined;
          contentId = undefined;
          body = "";
          headers = {};
          url = "";
          index++;
        }
        urlAfterBlank = true;
        bodyAfterBlank = false;
        newParts.push(part);
        if (boundaryChangeSet && part === `--${boundaryChangeSet}--`) {
          boundaryChangeSet = "";
        }
      } else if (urlAfterBlank && previousLineIsBlank) {
        urlAfterBlank = false;
        bodyAfterBlank = true;
        // Url
        const urlParts = part.split(" ");
        let partMethod = urlParts[0];
        let partUrl = urlParts.slice(1, -1).join(" ");
        let partProtocol = urlParts.pop();
        if (urlProcessor) {
          const result = urlProcessor({ method: partMethod, url: partUrl, contentId });
          if (result) {
            partMethod = result.method;
            partUrl = result.url;
            part = [partMethod, partUrl, partProtocol].join(" ");
          }
        }
        method = partMethod;
        url = partUrl;

        newParts.push(part);
        if (part.startsWith("HTTP/")) {
          const statusCodeMatch = part.match(/^HTTP\/[\d.]+\s+(\d{3})\s.*$/i);
          if (statusCodeMatch) {
            statusCode = parseInt(statusCodeMatch.pop());
          }
        }
      } else if (bodyAfterBlank && (previousLineIsBlank || body !== "")) {
        body = body ? `${body}\r\n${part}` : part;
      } else if (part !== "") {
        if (!bodyAfterBlank) {
          if (part.toLowerCase().startsWith("content-id:")) {
            let colonIndex = part.indexOf(":");
            if (colonIndex !== -1) {
              contentId = part.substr(colonIndex + 1).trim();
            }
          }
          newParts.push(part);
        } else {
          let colonIndex = part.indexOf(":");
          if (colonIndex !== -1) {
            headers[part.substr(0, colonIndex).toLowerCase()] = part.substr(colonIndex + 1).trim();
          }
        }
      } else {
        newParts.push(part);
      }
      previousLineIsBlank = part === "";
    });
    return newParts.join("\r\n");
  }

  function decodeURISafe(text) {
    try {
      return decodeURI(text);
    } catch (e) {
      console.log(e);
    }
    return text;
  }

  function traceRequest(req, name, method, url, headers, body) {
    const _url = decodeURISafe(url) || "";
    const _headers = decodeURISafe(JSON.stringify(headers || {}));
    const _body = typeof body === "string" ? decodeURISafe(body) : body ? decodeURISafe(JSON.stringify(body)) : "";
    trace(req, name, `${method} ${_url}`, _headers, _body);
  }

  function traceResponse(req, name, statusCode, statusMessage, headers, body) {
    const _headers = decodeURISafe(JSON.stringify(headers || {}));
    const _body = typeof body === "string" ? decodeURISafe(body) : body ? decodeURISafe(JSON.stringify(body)) : "";
    trace(req, name, `${statusCode || ""} ${statusMessage || ""}`, _headers, _body);
  }

  function trace(req, name, ...messages) {
    const message = messages.filter(message => message !== null && message !== undefined).join("\n");
    req.loggingContext.getTracer(name).debug(message);
  }

  function traceError(req, name, ...messages) {
    const message = messages.filter(message => message !== null && message !== undefined).join("\n");
    req.loggingContext.getTracer(name).error(message);
  }

  function traceWarning(req, name, ...messages) {
    const message = messages.filter(message => message !== null && message !== undefined).join("\n");
    req.loggingContext.getTracer(name).warning(message);
  }

  return router;
};
