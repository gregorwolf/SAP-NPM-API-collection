# cds-odata-v2-adapter-proxy

OData v2 Adapter Proxy for CDS OData v4 Services

## Build Status
[![Build Status](https://gkecdxodata.jaas-gcp.cloud.sap.corp/buildStatus/icon?job=cds-community%2Fcds-odata-v2-adapter-proxy%2Fmaster)](https://gkecdxodata.jaas-gcp.cloud.sap.corp/job/cds-community/job/cds-odata-v2-adapter-proxy/job/master/)

## Getting Started

- Install: `npm install`
- Unit Tests: `npm test`
- Test Server: `npm start`
    - Service: `http://localhost:4004/v2/main`
    - Metadata: `http://localhost:4004/v2/main/$metadata`
    - Data: `http://localhost:4004/v2/main/Header?$expand=Items`

## Usage

### CDS combined backend (Node.js)

In your existing `@sap/cds` project:
- Run `npm install @sap/cds-odata-v2-adapter-proxy`
    - Internal NPM Registry: `http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.releases.npm/`
    - External NPM Registry: `https://npm.sap.com`
- Create new file e.g. `index.js` in the service folder `srv` of your project:

```
"use strict";

const express = require("express");
const cds = require("@sap/cds");
const proxy = require("@sap/cds-odata-v2-adapter-proxy");

const host = "0.0.0.0";
const port = process.env.PORT || 4004;

(async () => {
  const app = express();

  // serve odata v4
  await cds
    .connect("db") // ensure database is connected!
    .serve("all")
    .in(app);

  // serve odata v2
  process.env.XS_APP_LOG_LEVEL = "warning";
  app.use(proxy({
    path: "v2",
    port: port
  }));

  // start server
  const server = app.listen(port, host, () => console.info(`app is listing at ${host}:${port}`));
  server.on("error", error => console.error(error.stack));
})();
```

- Run `node srv/index` from the project root to start the server:
    - OData v2 service will be available at http://localhost:4004/v2/<service-path>
    - OData v4 service will be available at http://localhost:4004/<service-path>

Note that `@sap/cds` and `express` are peer dependency and needs to be available as module as well.

### CDS standalone backend (e.g. Java)

In a new Node.js project:
- Run `npm install @sap/cds`
- Run `npm install @sap/cds-odata-v2-adapter-proxy`
    - Internal NPM Registry: `http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.releases.npm/`
    - External NPM Registry: `https://npm.sap.com`
- Place CDS models in `db` and `srv` model folders
- Create new file e.g. `index.js` in the service folder `srv` of the project:

```
"use strict";

const express = require("express");
const http = require("http");

const odatav2proxy = "@sap/cds-odata-v2-adapter-proxy"

const host = "0.0.0.0";
const port = process.env.PORT || 4004;

(async () => {
  const app = express();

  // serve odata v2
  process.env.XS_APP_LOG_LEVEL = "warning";
  app.use(odatav2proxy({
    path: "v2",
    port: 8080, // target port
    services: {
      "<odata-v4-service-path>": "<qualified.ServiceName>"
    }
  }));

  // start server
  const server = app.listen(port, host, () => console.info(`app is listing at ${host}:${port}`));
  server.on("error", error => console.error(error.stack));
})();
```

- Run `node srv/index` from the project root to start the server:
    - OData v2 service will be available at http://localhost:4004/v2/<odata-v4-service-path>
    - OData v4 service shall be available at http://localhost:8080/<odata-v4-service-path>

Note that `@sap/cds` and `express` are peer dependency and needs to be available as module as well.

## Documentation

Instantiates an CDS OData v2 Adapter Proxy Express Router for a CDS based OData v4 Server
- **options:** CDS OData v2 Adapter Proxy options
  - **[options.base]** Base path, under which the service is reachable. Default is ''.
  - **[options.path]:** Path, under which the proxy is reachable. Default is 'v2'.
  - **[options.model]:** CDS service model path. Default is 'all'.
  - **[options.port]:** Target port, which points to OData v4 backend port. Default is '4004'.
  - **[options.target]:** Target, which points to OData v4 backend host/port. Default is 'http://localhost:4004'.
  - **[options.services]:** Service mapping, from url path name to service name. If omitted local CDS defaults apply.
  - **[options.standalone]** Indication, that OData v2 Adapter proxy is a standalone process. Default is 'false'.
  - **[options.mtxEndpoint]** Endpoint to retrieve MTX metadata for standalone proxy. Default is '/mtx/v1'
  - **[options.ieee754Compatible]** Edm.Decimal and Edm.Int64 are serialized IEEE754 compatible. Default is 'true'.

Logging is controlled with XSA environment variable `XS_APP_LOG_LEVEL`.
Details can be found at [xs2/node-logging](https://github.wdf.sap.corp/xs2).

## Features

- GET, POST, PUT/PATCH, DELETE
- Batch support
- Actions, Functions
- Analytical Annotations
- Deep Expands/Selects
- JSON format
- Deep Structures
- Data Type Mapping (incl. Date Time)
- IEEE754Compatible
- Messages/Error Handling
- Location Header
- $inlinecount / $count / $value
- Entity with Parameters
- Octet Stream, Content Disposition
- Multitenancy, Extensibility (proxy in same process only)
- Content-ID
- Draft Support
- Search Support
- Localization
- Tracing
- Logging Correlation

## OData v2/v4 Delta
 
 http://docs.oasis-open.org/odata/new-in-odata/v4.0/cn01/new-in-odata-v4.0-cn01.html

**Open:**
- $links -> $ref
- KEY(...) -> $root
- years, months, days, minutes, seconds
- Function Parameters as Query Options
