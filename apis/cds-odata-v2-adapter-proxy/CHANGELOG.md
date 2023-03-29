# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- New version information is automatically added after line 8 -->

## Version 1.9.21 - 2023-04-24

### Fixed

- Proxy is open source at https://github.com/cap-js-community/odata-v2-adapter
- The new proxy library is fully compatible and can be used as drop-in replacement
- This library is now deprecated and will no longer receive updates

## Version 1.9.20 - 2023-03-09

### Fixed

- Cache invalidation for Streamlined MTX (extensibility enabled) with CDS 6.6.1
- Use named parameters for mtxs actions to protect against incompatible changes
- Allow status code 304 (not modified) when reading OData V4 metadata (as success)

## Version 1.9.19 - 2023-02-15

### Fixed

- Provide subdomain information to logs
- Use correct correlation-id for logging (setup CDS context correctly)
- React to incompatible change of mtxs getEdmx, to provide (internal) model parameter
- Enhance example app to show usage of bound/unbound OData V2 actions in Fiori UI via annotation

## Version 1.9.18 - 2023-01-18

### Fixed

- Unicode encode messages header

## Version 1.9.17 - 2023-01-09

### Fixed

- Fix special replacement pattern in $filter conversion

## Version 1.9.16 - 2022-12-20

### Fixed

- Reject proxy processing of non OData services
- Use stream pipeline for result streaming
- Proxy does not end request to target anymore after writing body
- Document that managed compositions will not work correctly in Fiori Elements V2

## Version 1.9.15 - 2022-11-11

### Fixed

- Keep `ID__` parameter as query option for bound action/function on analytical entities
- Remove introduced query option `select` for bound action calls on analytical entities again

## Version 1.9.14 - 2022-11-07

### Fixed

- Provide `value` section of `ID__` aggregation key as query option `select` to bound action handler
- Accept aggregation annotations in lowercase and uppercase writing
- Support `@Aggregation.ReferenceElement` and `@Aggregation.Reference` annotations to perform aggregation on different element
- Only a single aggregation reference element is supported, specified as array with single element, e.g. `['element']`
- Cast aggregation values of `#COUNT_DISTINCT` to `Integer` type to be represented as number (not as string), if typed accordingly
- Map default aggregation `#COUNT` to virtual property `$count` of `$apply`
- Remove unneeded temporary aggregation `$COUNT`. Use `#COUNT` instead.

## Version 1.9.13 - 2022-11-03

### Fixed

- Escape entity key value for bound action key parameter mapping
- Support action parameters that overload bound entity key names
- Support action/function on analytical entities via `ID__` aggregation key

## Version 1.9.12 - 2022-11-02

### Fixed

- Fix `$metadata` lookup with query options

## Version 1.9.11 - 2022-11-02

### Fixed

- Support new CDS integer types
- Fallback target `auto` to `default` target until dynamic `target/port` assignment is available
- Prevent loading OData V4 `$metadata` when OData V2 `$metadata` is requested
- Fix draft requests re-write for `$filter`
- Proxy option to disable `x-forwarded` header processing (`processForwardedHeaders: false`)

## Version 1.9.10 - 2022-10-04

### Fixed

- Atom format fixes
- Trim spaces for filter function parameter transformations
- Allow passing proxy options as command line env (`camelCase` to `snake_case`, escape `_` by doubling)

## Version 1.9.9 - 2022-09-21

### Fixed

- Fix logging layers and debug trace activation
- Connect `cds.log` with `http-proxy-middleware`

## Version 1.9.8 - 2022-09-20

### Fixed

- Fix data type conversion for single attribute value responses (incl. $value)
- Fix response mapping of parameters for `Parameters` entity
- Respect `$format=json` for service root document
- Introduce proxy options to specify OData default format (default is `json`)
- `Atom (XML)` format support

## Version 1.9.7 - 2022-09-14

### Fixed

- Respect `$select` filter for `deferreds` structure
- Fix definition lookup for service entities with scoped name
- Fix definition lookup for unbound service operations (actions, functions) with scoped name
- Improve Kibana logging even more
- Use project specific logger
- Document that option `fileUploadSizeLimit` only applies to uploads via `POST` using `multipart/form-data` requests

## Version 1.9.6 - 2022-09-01

### Fixed

- Improve Kibana logging
- Improve error and warning logging messages
- Make log level of `Changeset order deviation` configurable via `changesetDeviationLogLevel`. Default is now `'info'`.

## Version 1.9.5 - 2022-08-30

### Fixed

- Fix media upload via associations/compositions using POST
- Fix duplication of streaming request data for media entity (chunked)
- Fix result structure for parameterized entities entry addressed by key (object or not found)
- Update README on sample apps

## Version 1.9.4 - 2022-08-01

### Fixed

- Remove logging library `@sap/logging`. Use `cds.log` instead.
- Remove obsolete proxy option `disableNetworkLog`
- Proxy option `fixDraftRequests` suppresses unsupported draft expand to `SiblingEntity` and injects `SiblingEntity: null`

## Version 1.9.3 - 2022-07-21

### Fixed

- Fix batch handling of parameterized entities

## Version 1.9.2 - 2022-07-18

### Fixed

- Check on `cds.mtx.eventEmitter` before access
- Restructure README

## Version 1.9.1 - 2022-07-15

### Fixed

- Compile CSN for Node.js when loaded from CDS MTX services
- Check on `cds.requires.multitenancy` instead of deprecated `cds.requires.db.multiTenant` (compatible)
- Support `$count` with parameterized entities
- Make decoding of JWT token body more robust (error log in case of invalid JWT)
- Synchronize parallel loading of CSN and EDMX
- First (alpha) support for CDS Streamlined MTX (no extensibility support yet)
- Move `@types/express` to devDependencies

## Version 1.9.0 - 2022-07-04

### Fixed

- CDS 6 compatible version
- Enhance proxy option `target` with mode `auto` to handle dynamic target/port assignment (e.g. for unit-tests)
- Represent time component of `cds.Date/Edm.DateTime` with second precision (i.e. `00:00:00`)

## Version 1.8.21 - 2022-06-22

### Fixed

- Add `Type` suffix to fix `__metadata.type` for parameterized entities (datajs did skip date type conversion)
- Fix parameterized entities navigation links
- Enhance Fiori Elements example apps

## Version 1.8.20 - 2022-06-13

### Fixed

- Change README on Approuter compression flag `compressResponseMixedTypeContent`
- Fill and process surrogate key `ID__` correctly in case of analytical queries
- Add an example Fiori Elements applications showcasing hierarchical `TreeTable` usage
- Rework UI application examples (basic, draft and hierarchy apps)

## Version 1.8.19 - 2022-05-18

### Fixed

- Don't propagate `host` header to forwarded calls.

## Version 1.8.18 - 2022-05-13

### Fixed

- Propagate all headers to forwarded calls.

## Version 1.8.17 - 2022-05-12

### Fixed

- Filter out annotation elements in response data starting with `odata.` or including `@odata.`.
- Elements starting with `@` are excluded as before.
- Propagate special headers to forwarded calls (i.e. starting with `dwc`).

## Version 1.8.16 - 2022-04-28

### Fixed

- Fix if elements are annotated with `@cds.api.ignore`
- Abort file upload when limit is reached

## Version 1.8.15 - 2022-04-25

### Fixed

- Remove internal repository reference
- Document that Singletons are not available in OData V2
- Ignore omitted elements annotated with `@cds.api.ignore`
- Support validated for absolute context urls via `cds.odata.contextAbsoluteUrl`.
- Skip aggregation for measures with aggregation `#NONE` and `#NOP`
- Support `$count` aggregations for measures with aggregation `#COUNT`
- Changed OData type mapping for `Edm.Byte` to `cds.Integer`

## Version 1.8.14 - 2022-04-08

### Fixed

- Upgrade `@sap/logging` to fix vulnerability

## Version 1.8.13 - 2022-04-07

### Fixed

- Remove peer dependency to prevent workspace failures

## Version 1.8.12 - 2022-04-01

### Fixed

- Refactorings to support universal CSN
- Refactorings to support metadata prototype layering
- Include `search` in `$apply` aggregations

## Version 1.8.11 - 2022-03-11

### Fixed

- Fix for `falsy` values during data type conversion for functions and actions
- Add OData V2 links via link providers to HTML index page

## Version 1.8.10 - 2022-03-01

### Fixed

- Refactor locale determination from CDS
- Serialize body to string in case of type `object` before calculating content length
- Support `AnalyticalContext` annotations in addition to deprecated `Analytics` annotations

## Version 1.8.9 - 2022-02-09

### Fixed

- Stabilization fixes

## Version 1.8.8 - 2022-02-08

### Fixed

- Proxy option `calcContentDisposition` to calculate `content-disposition` header even if already available

## Version 1.8.7 - 2022-02-03

### Fixed

- Proxy option `fixDraftRequests` to convert unsupported draft request to a working version (default: false)

## Version 1.8.6 - 2022-02-01

### Fixed

- Fix README for combined custom backend bootstrap
- Allow annotation `@odata.type` in lower case format
- Allow type prefix `datetime` in addition to `datetimeoffset`
- Add peer dependency @types/express

## Version 1.8.5 - 2022-01-17

### Fixed

- Prevent additional call to fill `content-disposition`, in case header is already provided with stream
- Support OData V2 `binary` media upload via POST for entities with element of type `Binary` and without `@Core.MediaType` annotations
- Return server error as response, if OData V4 server does not support media upload without `@Core.MediaType` annotation
  - e.g. `No payload deserializer available for resource kind 'PRIMITIVE' and mime type 'image/png'`

## Version 1.8.4 - 2021-12-06

### Fixed

- Unquote action/function parameter of types `cds.UUID`, `cds.Binary`, `cds.LargeBinary`, `cds.Date`, `cds.Time`, `cds.DateTime`, `cds.Timestamp`

## Version 1.8.3 - 2021-12-06

### Fixed

- Prevent parsing body for HEAD requests against $batch
- Fix single quotes of URL parameters for request body conversion respecting line breaks
- Introduce proxy option `quoteSearch` to control search expression quoting. Default is `true`
- Fix bound action call to entity key having association type
- Fix action/function parameter of types date, time, datetime

## Version 1.8.2 - 2021-12-01

### Fixed

- Catch and handle unexpected errors during proxy request processing
- Validate request body and content-type in request
- Switch of internal NPM repository (Nexus -> Artifactory)

## Version 1.8.1 - 2021-11-19

### Fixed

- Change action/function return type value representation for primitive types to include nesting to conform to OData standard
- Introduce proxy options `returnPrimitiveNested: false` to keep previous action/function return value representation for primitive types
- Introduce proxy option `returnCollectionNested` to control collection of entity type nesting into a `results` section. Default is `true`
- Fill standardized `x-correlation-id` request header in addition to `x-correlationid` for proxy requests

## Version 1.8.0 - 2021-11-17

### Fixed

- Add README documentation for annotation `@Core.ContentDisposition.Type`
- Change `content-disposition` header default from `inline` to `attachment`
- Proxy option `contentDisposition` to specify default content disposition for media streams (inline, attachment)
- Unescape single quotes of action URL parameters for request body conversion
- Fix action/function return type representation for `cds.LargeString`
- Improve formatting of README and CHANGELOG
- Adjust repository url

## Version 1.7.16 - 2021-11-10

### Fixed

- `Content-Disposition` header filename is now url encoded
- Annotation `@Core.ContentDisposition.Type` to specify content disposition type (e.g. inline, attachment (default), etc.)

## Version 1.7.15 - 2021-11-08

### Fixed

- Quote key parts of type `cds.LargeString` for uri generation

## Version 1.7.14 - 2021-11-03

### Fixed

- Decode url key values before conversion

## Version 1.7.13 - 2021-10-18

### Fixed

- Escape quotes in search string before quoting

## Version 1.7.12 - 2021-10-07

### Fixed

- Proxy option `propagateMessageToDetails` to always propagate root error or message to details section
- Support for fetching Edmx metadata locally via `cds.mtx.getEdmx`
- Support for fetching Edmx metadata remotely via MTX service url

## Version 1.7.11 - 2021-09-09

### Fixed

- Convert ContentID for warning messages and error body and propagate to details
- Fix batch boundary parsing from content type with charset definition
- Functions `startswith` and `endswith` respect proxy option `caseInsensitive`

## Version 1.7.10 - 2021-08-31

### Fixed

- Fix query options not part of action parameters
- Proxy option `caseInsensitive` to transform search function e.g. `substringof` to case-insensitive variant

## Version 1.7.9 - 2021-08-06

### Fixed

- Add metadata type of inline return type for actions and functions
- Proxy option `messageTargetDefault` to specify default message target, if undefined
- Empty proxy option `messageTargetDefault` leaves message target untouched

## Version 1.7.8 - 2021-07-28

### Fixed

- Support for verb tunneling, i.e., `POST` with `X-HTTP-Method` header

## Version 1.7.7 - 2021-07-27

### Fixed

- Support inline return type for actions and functions
- Default undefined message target to `/#TRANSIENT#`
- Return 404 for unknown service name during model compilation
- Enhance logging to contain service name for service lookup from request

## Version 1.7.6 - 2021-07-01

### Fixed

- Prevent exception on handling entities without keys

## Version 1.7.5 - 2021-06-21

### Fixed

- Prevent unnecessary expensive `isExtended` call per request using metadata cache

## Version 1.7.4 - 2021-06-18

### Fixed

- Support annotation `@odata.Type` for non-UUID CDS types
- Set header `x-cds-odata-version: v2` to indicate target OData version to CDS runtime
- Explain usage of response compression in README

## Version 1.7.3 - 2021-06-11

### Fixed

- Change OData V4 `continue-on-error` default to `false`
- Proxy option `continueOnError: true` available to activate `continue-on-error`

## Version 1.7.2 - 2021-06-10

### Fixed

- Fix content type normalization to preserve charset

## Version 1.7.1 - 2021-05-28

### Fixed

- Fix return type determination for external services definitions

## Version 1.7.0 - 2021-05-27

### Fixed

- Change action/function return type value representation for complex and primitive types
- Introduce proxy options `returnComplexNested` and `returnPrimitivePlain` to keep previous action/function return value representation

## Version 1.6.3 - 2021-05-26

### Fixed

- Convert additional targets of response messages
- Transform leading part of locale to lower-case
- Fix local entity name determination for scoped entities, e.g. `.texts`

## Version 1.6.2 - 2021-04-29

### Fixed

- Merge headers and body of POST and PUT media entity upload calls
- Handle error case in PUT media entity upload call

## Version 1.6.1 - 2021-04-12

### Fixed

- Handle authorization header correctly in media upload

## Version 1.6.0 - 2021-04-06

### Fixed

- Final CDS 5 compatibility version

## Version 1.5.11 - 2021-03-26

### Fixed

- CDS 5 compatibility (>= 1.6.0 needed for CDS 5)
- Support `content-disposition` header in media entity upload
- Introduction of element annotation `@cov2ap.headerDecode` to decode header values

## Version 1.5.10 - 2021-03-18

### Fixed

- Fix crash for bound action without return type
- Consider bound action binding parameter for messages targets

## Version 1.5.9 - 2021-03-02

### Fixed

- Improve TypeScript typings

## Version 1.5.8 - 2021-02-25

### Fixed

- Update `@sap/logging` dependency

## Version 1.5.7 - 2021-02-19

### Fixed

- Restore backwards compatibility with CDS 3

## Version 1.5.6 - 2021-02-12

### Fixed

- Convert response message targets

## Version 1.5.5 - 2021-01-27

### Fixed

- Align determination of locale including sub tags (e.g. `zh-TW`)

## Version 1.5.4 - 2021-01-26

### Fixed

- Support action/function array parameter types
- Introduce proxy option `bodyParserLimit` for body parser size limit

## Version 1.5.3 - 2021-01-12

### Fixed

- Improve TypeScript typings

## Version 1.5.2 - 2021-01-11

### Fixed

- Add TypeScript typings for proxy constructor

## Version 1.5.1 - 2020-12-21

### Fixed

- Normalize service root path in service root xml to include trailing slash

## Version 1.5.0 - 2020-12-16

### Fixed

- Update minor version

## Version 1.4.63 - 2020-12-15

### Fixed

- Fix that file upload error message does not return with `500` status code

## Version 1.4.61 - 2020-12-11

### Fixed

- Fix accept header for binary data retrieval to include `application/json`

## Version 1.4.60 - 2020-12-07

### Fixed

- Respect offset for `Edm.DateTimeOffset`, and default to UTC offset (+0000)
- Fix ticks and offset calculation for type `DateTimeOffset` to handle offset as minutes
- Update README for custom bootstrap to give `proxy()` priority over `cds.serve` (as with `cds run`)
- Make authorization header parsing more robust
- Provide `__metadata` type information for function/action result
- Data format of type `cds.Time (Edm.Time)` is switchable to ISO 8601 with proxy option `isoTime` or entity annotation `@cov2ap.isoTime`
- Data format of type `cds.Date (Edm.DateTime)` is switchable to ISO 8601 with proxy option `isoDate` or entity annotation `@cov2ap.isoDate`
- Data format of type `cds.DateTime / Edm.DateTimeOffset` is switchable to ISO 8601 with proxy option `isoDateTime` or entity annotation `@cov2ap.isoDateTime`
- Data format of type `cds.Timestamp / Edm.DateTimeOffset` is switchable to ISO 8601 with proxy option `isoTimestamp` or entity annotation `@cov2ap.isoTimestamp`
- Process DateTimeOffset always as UTC information (with `Z`)

## Version 1.4.59 - 2020-12-02

### Fixed

- Change accept header to `application/json`, if accept `xml` is requested
- Fix single service support bound to root url
- Data format of type `Edm.DateTimeOffset` (`cds.DateTime`, `cds.Timestamp`) is switchable to ISO 8601 with proxy option `isoDateTimeOffset` or entity annotation `@cov2ap.isoDateTimeOffset`

## Version 1.4.58 - 2020-11-26

### Fixed

- Support boolean header value in media entity
- Prevent escaping of quotes in url for batch requests
- Add `media_src` and `content-type` in `__metadata` for media entities

## Version 1.4.57 - 2020-11-24

### Fixed

- Match headers case-insensitive for custom body in media entity
- Parse header string values for non-string types in media entity

## Version 1.4.56 - 2020-11-12

### Fixed

- Enable OData V4 `continue-on-error` per default
- Add proxy option to deactivate `continue-on-error`

## Version 1.4.55 - 2020-11-10

### Fixed

- Fix host port in response links
- Handle duplication of link tokens

## Version 1.4.54 - 2020-11-05

### Fixed

- Support mapping of `__next` annotation
- Forward file upload headers to media entity POST call
- Explain annotation `@Core.ContentDisposition.Filename` in README
- Update README on OData API flavors
- Fix links for navigation collections and query options

## Version 1.4.53 - 2020-10-30

### Fixed

- Support custom body for binary media upload via POST
- Set `Accept` header for `$batch` proxy request to `multipart/mixed`
- Set missing response header `Content-Transfer-Encoding: binary`

## Version 1.4.52 - 2020-10-27

### Fixed

- Log warning for change set order violation, instead returning an error response

## Version 1.4.51 - 2020-10-27

### Fixed

- Support OData V2 `binary` media upload via POST
- Support OData V2 `multipart/form-data media` upload via POST
- Update README on logging layers

## Version 1.4.50 - 2020-10-22

### Fixed

- Rewrite batch success status code from `200` to `202`
- Remove OData V4 header `odata-entityid`
- Propagate `Content-ID` in response to HTTP request headers
- Remove artificially added `Content-ID` header from batch response
- Fix `Content-ID` order check for deviations between request and response

## Version 1.4.49 - 2020-10-19

### Fixed

- Fix entity uris with `x-forwarded-path` headers for OData batch calls
- Support of `odata-entityid` header rewrite

## Version 1.4.48 - 2020-10-16

### Fixed

- Fix entity uris with `x-forwarded-path` headers
- Forward `x-request-id`, `x-correlationid` for metadata request

## Version 1.4.47 - 2020-10-08

### Fixed

- Respect `Content-ID` in HTTP request headers
- Update on peer dependencies
- Update README on OData V2 Adapter for CAP Java
- Update README on mission statement

## Version 1.4.46 - 2020-09-29

### Fixed

- Update README on option `cds.env.odata.v2proxy.urlpath`
- Delta response annotation `@cov2ap.deltaResponse: 'timestamp'`

## Version 1.4.45 - 2020-09-17

### Fixed

- Prepare `Delta Responses` support in proxy (not yet supported by CDS)
- Remove metadata information in request payload deeply
- Update README on CDS modelling restrictions

## Version 1.4.44 - 2020-09-03

### Fixed

- Rename proxy option `standalone` to `mtxRemote`
- Allow proxy option `mtxEndpoint` to be absolute http url
- Support for `cds.env` for proxy options under section `cds.cov2ap`
- Update README and JSDoc documentation

## Version 1.4.43 - 2020-09-01

### Fixed

- Fix `$filter` function conversion
- Fix remote CSN fetch for standalone proxy
- Fix `@sap.aggregation.role` annotation detection
- Annotation `@cov2ap.analytics: false` to suppress analytical conversion
- Update README documentation

## Version 1.4.42 - 2020-08-05

### Fixed

- Add missing `Content-ID` header for batch changeset

## Version 1.4.41 - 2020-08-03

### Fixed

- CDS 4 compatibility
- Improve logging layers
- Update README documentation
- Improve JWT tenant processing

## Version 1.4.40 - 2020-07-20

### Fixed

- Fix aggregation grouping on filtered elements
- Support `sap:` analytical annotations

## Version 1.4.39 - 2020-07-10

### Fixed

- Move annotation `ContentDisposition.Filename` to data element
- Improve stability of content disposition

## Version 1.4.38 - 2020-07-06

### Fixed

- Fix `base` proxy option (follow-up)

## Version 1.4.37 - 2020-06-26

### Fixed

- Replace `pathRewrite` option by `targetPath` option
- Fix `base` proxy option
- Respect OData annotation `@odata.Type`
- Alternative annotation `@Common.ContentDisposition.Filename`

## Version 1.4.36 - 2020-06-24

### Fixed

- Fix escaping of quote for function parameters
- SAP Fiori Elements V2 sample app

## Version 1.4.35 - 2020-06-23

### Fixed

- Fix reserved uri characters (follow-up)

## Version 1.4.34 - 2020-06-17

### Fixed

- Fix entity key with (encoded) reserved uri characters

## Version 1.4.33 - 2020-05-29

### Fixed

- Service Document in XML format (default)
- Update dependencies
- Disable network log per default

## Version 1.4.32 - 2020-05-27

### Fixed

- Update dependencies
- Update README on localization
- Toggle switch for network logging
- Allow HANA `SYSUUID` as UUID

## Version 1.4.31 - 2020-05-25

### Fixed

- Align model resolving
- Fix data types conversion for numbers
- Fix data types recognition in functions
- Support response compression
- Prevent unnecessary data serialization for tracing
- Performance optimization for entity key/uri calculation
- General performance optimizations
- Update dependencies

## Version 1.4.30 - 2020-05-01

### Fixed

- Make function call with request body more robust
- Fallback severity for detail messages to error
- Keep request body for action call
- Update README on CF deployment

## Version 1.4.29 - 2020-04-28

### Fixed

- Fix analytics default value for all OData types
- Fix long running data type conversion for filter elements

## Version 1.4.28 - 2020-04-27

### Fixed

- Fix `$filter` in analytics query
- Fix count for empty analytics result
- Fix result projection for analytics query
- Fix analytics `null` result values
- Only add root error, if no details messages

## Version 1.4.27 - 2020-04-21

### Fixed

- Add root error as first detail message
- Error code including `transition` marks transition message

## Version 1.4.26 - 2020-04-20

### Fixed

- Fix `$filter` for navigation elements
- Fix OData annotations conversion for Java backends
- Add request authorization parsing for logging

## Version 1.4.25 - 2020-04-08

### Fixed

- Add additional messages as details

## Version 1.4.24 - 2020-04-07

### Fixed

- Fix for metadata transfer-encoding chunked
- Filter `@` attributes

## Version 1.4.23 - 2020-04-01

### Fixed

- Fix type conversion for `le` operator

## Version 1.4.22 - 2020-03-27

### Fixed

- Fix entity uri path behind app router
- Update dependencies

## Version 1.4.21 - 2020-03-02

### Fixed

- Improve `$metadata` logging
- Fix `$metadata` call headers

## Version 1.4.20 - 2020-02-27

### Fixed

- Fix CDS backwards compatibility

## Version 1.4.19 - 2020-02-25

### Fixed

- Fix ETag Support (Concurrency Control)
- Support streaming from URL media
- Adding custom path rewrite
- Custom `server.js` support
- Fix for rendering aggregation of integers
- Fix time duration parsing
- Misc fixes and improvements
- General housekeeping
- Moving from `axios` to `node-fetch`

## Version 1.4.18 - 2020-02-03

### Fixed

- Improve `$value` handling for streaming
- Fix stream filename retrieval
- Optimize edmx localization
- Improve logging and tracing handling
- Fix for external services (e.g. Java backend) support
- Re-add `services` configuration for external service mapping
- Fix for search phrase

## Version 1.4.17 - 2020-01-20

### Fixed

- Support for virtual hosts (e.g. Cloud Connector)
- Fix decode URI for path name
- Fix IEEE754 compatibility for single requests
- Add IEEE754 compatibility option switch

## Version 1.4.16 - 2020-01-14

### Fixed

- Enforce IEEE754 compatibility
- Pin `axios` library

## Version 1.4.15 - 2019-12-20

### Fixed

- Fix authentication prompt for `$metadata`
- Improve trace handling

## Version 1.4.14 - 2019-12-19

### Fixed

- Protect `$metadata` call
- Fix `$filter` parentheses nesting
- Fix `all` model loading from app, srv
- Improve `$filter` handling, incl. data type and negative tests

## Version 1.4.13 - 2019-12-12

### Fixed

- Remove `services` configuration, as it is obsolete
- Fix nested functions in `$filter`

## Version 1.4.12 - 2019-12-06

### Fixed

- Fix service and CSN model detection

## Version 1.4.9 - 2019-12-05

### Fixed

- Allow CSN JSON object as model option
- Raise error, if service not found based on path
- Fix service paths with hyphen
- Fix `cds.Date`, `cds.Time` data type mappings

## Version 1.4.8 - 2019-11-14

### Fixed

- Increased body size limit
- Fix engine config, to allow Node >= 8
- Map `cds.DateTime` and `cds.Timestamp` to `Edm.DateTimeOffset`

## Version 1.4.6 - 2019-11-07

### Fixed

- Update on README documentation
- Minor fixes

## Version 1.4.5 - 2019-10-25

### Fixed

- `__count` is now of type String
- Aggregation values are converted according to dynamic type
- Search support
- Fix for converting warning messages

## Version 1.4.4 - 2019-10-07

### Fixed

- Filter data type conversions

## Version 1.4.3 - 2019-10-01

### Fixed

- Check CDS multitenancy/extensibility (mtx)
- Allow options that are falsy for Javascript

## Version 1.4.2 - 2019-09-24

### Fixed

- Looser declaration or peer dependency to be compatible with snapshots

## Version 1.4.1 - 2019-09-11

### Fixed

- Fixed compatibility to CDS 3.17.0
- Propagate `x-request-id`, `x-correlationid`

## Version 1.4.0 - 2019-09-09

### Fixed

- Raise error message for not supported aggregation function (e.g. `#FORMULA`)
- Fixed entity key calculation for key associations
- Fixed DateTime representation in entity key structure

## Version 1.3.0 - 2019-08-30

### Fixed

- Passing through responses in XML (just for errors)
- Data-type mapping on aggregation values works for non-strings

## Version 1.2.0 - 2019-08-08

### Added

- External Release

## Version 1.0.0 - 2019-05-21

### Added

- Internal Release
