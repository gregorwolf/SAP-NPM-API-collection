# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- New version information is automatically added after line 8 -->

## Version 1.7.9 - 2021-08-06

### Fixed

- Add metadata type of inline return type for actions and functions
- Proxy option 'messageTargetDefault' to specify default message target, if undefined
- Empty proxy option 'messageTargetDefault' leaves message target untouched

## Version 1.7.8 - 2021-07-28

### Fixed

- Support for verb tunneling, i.e., 'POST' with 'X-HTTP-Method' header

## Version 1.7.7 - 2021-07-27

### Fixed

- Support inline return type for actions and functions
- Default undefined message target to '/#TRANSIENT#'
- Return 404 for unknown service name during model compilation
- Enhance logging to contain service name for service lookup from request

## Version 1.7.6 - 2021-07-01

### Fixed

- Prevent exception on handling entities without keys

## Version 1.7.5 - 2021-06-21

### Fixed

- Prevent unnecessary expensive 'isExtended' call per request using metadata cache

## Version 1.7.4 - 2021-06-18

### Fixed

- Support annotation '@odata.Type' for non-UUID CDS types
- Set header 'x-cds-odata-version: v2' to indicate target OData version to CDS runtime
- Explain usage of response compression in README

## Version 1.7.3 - 2021-06-11

### Fixed

- Change OData V4 'continue-on-error' default to 'false'
- Proxy option 'continueOnError: true' available to activate 'continue-on-error'

## Version 1.7.2 - 2021-06-10

### Fixed

- Fix content type normalization to preserve charset

## Version 1.7.1 - 2021-05-28

### Fixed

- Fix return type determination for external services definitions

## Version 1.7.0 - 2021-05-27

### Fixed

- Change action/function return type value representation for complex and primitive types
- Introduce proxy options 'returnComplexNested' and 'returnPrimitivePlain' to keep previous action/function return value representation

## Version 1.6.3 - 2021-05-26

### Fixed

- Convert additional targets of response messages
- Transform leading part of locale to lower-case
- Fix local entity name determination for scoped entities, e.g. '.texts'

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
- Support 'content-disposition' header in media entity upload
- Introduction of element annotation '@cov2ap.headerDecode' to decode header values

## Version 1.5.10 - 2021-03-18

### Fixed

- Fix crash for bound action without return type
- Consider bound action binding parameter for messages targets

## Version 1.5.9 - 2021-03-02

### Fixed

- Improve TypeScript typings

## Version 1.5.8 - 2021-02-25

### Fixed

- Update @sap/logging dependency

## Version 1.5.7 - 2021-02-19

### Fixed

- Restore backwards compatibility with CDS 3

## Version 1.5.6 - 2021-02-12

### Fixed

- Convert response message targets

## Version 1.5.5 - 2021-01-27

### Fixed

- Align determination of locale including sub tags (e.g. zh-TW)

## Version 1.5.4 - 2021-01-26

### Fixed

- Support action/function array parameter types
- Introduce proxy option 'bodyParserLimit' for body parser size limit

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

- Fix that file upload error message does not return with 500 status code

## Version 1.4.61 - 2020-12-11

### Fixed

- Fix accept header for binary data retrieval to include 'application/json'

## Version 1.4.60 - 2020-12-07

### Fixed

- Respect offset for Edm.DateTimeOffset, and default to UTC offset (+0000)
- Fix ticks and offset calculation for type DateTimeOffset to handle offset as minutes
- Update README for custom bootstrap to give proxy() priority over cds.serve (as with cds run)
- Make authorization header parsing more robust
- Provide \_\_metadata type information for function/action result
- Data format of type cds.Time (Edm.Time) is switchable to ISO 8601 with proxy option 'isoTime' or entity annotation '@cov2ap.isoTime'
- Data format of type cds.Date (Edm.DateTime) is switchable to ISO 8601 with proxy option 'isoDate' or entity annotation '@cov2ap.isoDate'
- Data format of type cds.DateTime / Edm.DateTimeOffset is switchable to ISO 8601 with proxy option 'isoDateTime' or entity annotation '@cov2ap.isoDateTime'
- Data format of type cds.Timestamp / Edm.DateTimeOffset is switchable to ISO 8601 with proxy option 'isoTimestamp' or entity annotation '@cov2ap.isoTimestamp'
- Process DateTimeOffset always as UTC information (with 'Z')

## Version 1.4.59 - 2020-12-02

### Fixed

- Change accept header to 'application/json', if accept 'xml' is requested
- Fix single service support bound to root url
- Data format of type Edm.DateTimeOffset (cds.DateTime, cds.Timestamp) is switchable to ISO 8601 with proxy option 'isoDateTimeOffset' or entity annotation '@cov2ap.isoDateTimeOffset'

## Version 1.4.58 - 2020-11-26

### Fixed

- Support boolean header value in media entity
- Prevent escaping of quotes in url for batch requests
- Add 'media_src' and 'content-type' in \_\_metadata for media entities

## Version 1.4.57 - 2020-11-24

### Fixed

- Match headers case-insensitive for custom body in media entity
- Parse header string values for non-string types in media entity

## Version 1.4.56 - 2020-11-12

### Fixed

- Enable OData V4 'continue-on-error' per default
- Add proxy option to deactivate 'continue-on-error'

## Version 1.4.55 - 2020-11-10

### Fixed

- Fix host port in response links
- Handle duplication of link tokens

## Version 1.4.54 - 2020-11-05

### Fixed

- Support mapping of \_\_next annotation
- Forward file upload headers to media entity POST call
- Explain annotation '@Core.ContentDisposition.Filename' in README
- Update README on OData API flavors
- Fix links for navigation collections and query options

## Version 1.4.53 - 2020-10-30

### Fixed

- Support custom body for binary media upload via POST
- Set 'Accept' header for \$batch proxy request to "multipart/mixed"
- Set missing response header 'Content-Transfer-Encoding: binary'

## Version 1.4.52 - 2020-10-27

### Fixed

- Log warning for change set order violation, instead returning an error response

## Version 1.4.51 - 2020-10-27

### Fixed

- Support OData V2 binary media upload via POST
- Support OData V2 multipart/form-data media upload via POST
- Update README on logging layers

## Version 1.4.50 - 2020-10-22

### Fixed

- Rewrite batch success status code from 200 to 202
- Remove OData V4 header 'odata-entityid'
- Propagate 'Content-ID' in response to HTTP request headers
- Remove artificially added 'Content-ID' header from batch response
- Fix 'Content-ID' order check for deviations between request and response

## Version 1.4.49 - 2020-10-19

### Fixed

- Fix entity uris with "x-forwarded-path" headers for OData batch calls
- Support of 'odata-entityid' header rewrite

## Version 1.4.48 - 2020-10-16

### Fixed

- Fix entity uris with "x-forwarded-path" headers
- Forward x-request-id, x-correlationid for metadata request

## Version 1.4.47 - 2020-10-08

### Fixed

- Respect 'Content-ID' in HTTP request headers
- Update on peer dependencies
- Update README on OData V2 Adapter for CAP Java
- Update README on mission statement

## Version 1.4.46 - 2020-09-29

### Fixed

- Update README on option `cds.env.odata.v2proxy.urlpath`
- Delta response annotation `@cov2ap.deltaResponse: 'timestamp'`

## Version 1.4.45 - 2020-09-17

### Fixed

- Prepare 'Delta Responses' support in proxy (not yet supported by CDS)
- Remove metadata information in request payload deeply
- Update README on CDS modelling restrictions

## Version 1.4.44 - 2020-09-03

### Fixed

- Rename proxy option 'standalone' to 'mtxRemote'
- Allow proxy option 'mtxEndpoint' to be absolute http url
- Support for 'cds.env' for proxy options under section 'cds.cov2ap'
- Update README and JSDoc documentation

## Version 1.4.43 - 2020-09-01

### Fixed

- Fix \$filter function conversion
- Fix remote CSN fetch for standalone proxy
- Fix '@sap.aggregation.role' annotation detection
- Annotation '@cov2ap.analytics: false' to suppress analytical conversion
- Update README documentation

## Version 1.4.42 - 2020-08-05

### Fixed

- Add missing 'Content-ID' header for batch changeset

## Version 1.4.41 - 2020-08-03

### Fixed

- CDS 4 compatibility
- Improve logging layers
- Update README documentation
- Improve JWT tenant processing

## Version 1.4.40 - 2020-07-20

### Fixed

- Fix aggregation grouping on filtered elements
- Support 'sap:' analytical annotations

## Version 1.4.39 - 2020-07-10

### Fixed

- Move annotation ContentDisposition.Filename to data element
- Improve stability of content disposition

## Version 1.4.38 - 2020-07-06

### Fixed

- Fix 'base' proxy option (follow-up)

## Version 1.4.37 - 2020-06-26

### Fixed

- Replace 'pathRewrite' option by 'targetPath' option
- Fix 'base' proxy option
- Respect OData annotation '@odata.Type'
- Alternative annotation @Common.ContentDisposition.Filename

## Version 1.4.36 - 2020-06-24

### Fixed

- Fix escaping of quote for function parameters
- SAP Fiori Elements v2 sample app

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
- Allow HANA SYSUUID as UUID

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

- Fix \$filter in analytics query
- Fix count for empty analytics result
- Fix result projection for analytics query
- Fix analytics "null" result values
- Only add root error, if no details messages

## Version 1.4.27 - 2020-04-21

### Fixed

- Add root error as first detail message
- Error code including "transition", marks transition message

## Version 1.4.26 - 2020-04-20

### Fixed

- Fix \$filter for navigation elements
- Fix OData annotations conversion for Java backends
- Add request authorization parsing for logging

## Version 1.4.25 - 2020-04-08

### Fixed

- Add additional messages as details

## Version 1.4.24 - 2020-04-07

### Fixed

- Fix for metadata transfer-encoding chunked
- Filter '@' attributes

## Version 1.4.23 - 2020-04-01

### Fixed

- Fix type conversion for "le" operator

## Version 1.4.22 - 2020-03-27

### Fixed

- Fix entity uri path behind app router
- Update dependencies

## Version 1.4.21 - 2020-03-02

### Fixed

- Improve \$metadata logging
- Fix \$metadata call headers

## Version 1.4.20 - 2020-02-27

### Fixed

- Fix CDS backwards compatibility

## Version 1.4.19 - 2020-02-25

### Fixed

- Fix ETag Support (Concurrency Control)
- Support streaming from URL media
- Adding custom path rewrite
- Custom server.js support
- Fix for rendering aggregation of integers
- Fix time duration parsing
- Misc fixes and improvements
- General housekeeping
- Moving from axios to node-fetch

## Version 1.4.18 - 2020-02-03

### Fixed

- Improve \$value handling for streaming
- Fix stream filename retrieval
- Optimize edmx localization
- Improve logging and tracing handling
- Fix for external services (e.g. Java backend) support
- Re-add "services" configuration for external service mapping
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
- Pin Axios library

## Version 1.4.15 - 2019-12-20

### Fixed

- Fix authentication prompt for \$metadata
- Improve trace handling

## Version 1.4.14 - 2019-12-19

### Fixed

- Protect \$metadata call
- Fix \$filter parentheses nesting
- Fix "all" model loading from app, srv
- Improve \$filter handling, incl. data type and negative tests

## Version 1.4.13 - 2019-12-12

### Fixed

- Remove "services" configuration, as it is obsolete
- Fix nested functions in \$filter

## Version 1.4.12 - 2019-12-06

### Fixed

- Fix service and CSN model detection

## Version 1.4.9 - 2019-12-05

### Fixed

- Allow CSN JSON object as model option
- Raise error, if service not found based on path
- Fix service paths with hyphen
- Fix cds.Date, cds.Time data type mappings

## Version 1.4.8 - 2019-11-14

### Fixed

- Increased body size limit
- Fix engine config, to allow Node >= 8
- Map cds.DateTime and cds.Timestamp to Edm.DateTimeOffset

## Version 1.4.6 - 2019-11-07

### Fixed

- Update on README documentation
- Minor fixes

## Version 1.4.5 - 2019-10-25

### Fixed

- \_\_count is now of type String
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
- Propagate x-request-id, x-correlationid

## Version 1.4.0 - 2019-09-09

### Fixed

- Raise error message for not supported aggregation function (e.g. #FORMULA)
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
