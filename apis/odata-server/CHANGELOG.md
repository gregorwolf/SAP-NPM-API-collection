# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [1.8.3] - 2020-09-23

## [1.8.2] - 2020-06-17

### Fixed
- added license file to "files" in package.json

## [1.8.1] - 2020-06-17

### Added
- license file: developer-license-3.1.txt

## [1.8.0] - 2020-05-29

### Added
- support for server-driven paging and next links in expanded navigation properties
- support for $count option in $expand
- allow doublequotes around * in If-Match and If-None-Match headers

### Changed
- log stacktrace for server errors with level error (#107)

### Fixed
- status code 200 OK instead of 304 Not Modified for GET requests without If-None-Match header (#106)
- $expand with complex-property path

## [1.7.1] - 2020-04-21

### Fixed
- ETags are never required for transient entities from $apply queries

## [1.7.0] - 2020-04-16

### Added
- support for navigation properties in complex properties

### Fixed
- context URL in some edge cases with keys

## [1.6.1] - 2020-03-31

### Fixed
- support for JSON content in type-definition properties with underlying type Edm.Stream (#97)

## [1.6.0] - 2020-03-25

### Added
- limited support for JSON content in stream properties as described in OASIS issue 1177

## [1.5.5] - 2020-03-11

### Added
- If-Match and If-None-Match headers are allowed with value * on POST requests (#86)

## [1.5.4] - 2020-03-06

### Fixed
- stricter determination of related entity set

## [1.5.3] - 2020-03-04

### Added
- If-Match and If-None-Match headers are allowed with value * on non-conditional DELETE requests (#86)

## [1.5.2] - 2020-02-21

### Fixed
- handling of Path for navigation-property binding and EntitySetPath for bound actions and functions (#84)

## [1.5.1] - 2020-02-12

### Fixed
- ensure fixed version numbers of dependencies (#79)

## [1.5.0] - 2020-02-11

### Added
- support for node.js version 12
- complete support of specified Unicode range in URI parsing of identifiers
- URI parsing of search words according to OData 4.01 CS02

### Fixed
- ensure non-null field `code` in error responses

### Removed
- support for node.js version 8 due to its end of life

## [1.4.1] - 2020-01-31

### Fixed
- If-Match and If-None-Match headers are allowed with value * on non-conditional PUT/PATCH requests (for upsert) (#50)
- If-Match header with value * is allowed for all GET requests
- allow annotations `@odata.type` in requests if they match the types specified in the metadata

## [1.4.0] - 2020-01-14

### Added
- support for EDM singletons

### Fixed
- documentation: actions and functions are supported (#68)

## [1.3.9] - 2019-10-28

### Fixed
- removed @odata.metadataEtag annotation in JSON responses (with exception of the service-document)
- additional notice regarding IEEE754Compatible content-type parameter in error messages if necessary

## [1.3.8] - 2019-10-01

### Added
- support for annotations `@odata.mediaEditLink` and `@odata.mediaReadLink` in entity serialization

## [1.3.7] - 2019-09-19

### Fixed
- npm-shrinkwrap.json remains unchanged during xmake build

## [1.3.6] - 2019-09-18

### Fixed
- result type of $apply with aliases for custom aggregates (#49)

## [1.3.5] - 2019-09-02

### Fixed
- serialization of navigation properties for concat transformations in $apply
- HEAD requests with valid if-none-match header on the ServiceDocument return 304 Not Modified

## [1.3.4] - 2019-06-18

## [1.3.3] - 2019-05-08

### Added
- support in URI resource-path parsing for key-as-segment convention

## [1.3.2] - 2019-04-26

## [1.3.1] - 2019-04-23

## [1.3.0] - 2019-04-23

### Added
- preliminary optional switch to use non-validating serializer (not yet stable API)

### Fixed
- context URL for $select with same property more than once

## [1.2.1] - 2019-04-12

### Added
- support for batch requests and responses in JSON format as defined in OData version 4.01
- parallel processing of batch requests
- encoder for primitive values used in serializing made a component that can be overridden

### Fixed
- improved serializing performance

## [1.2.0] - 2019-03-29

### Added
- advertisement for operations

## [1.1.0] - 2019-03-15

### Added
- Deserialization of delta payloads and deep updates
- Adaption of Oasis Issue 1221: If Oasis CSDL JSON Specification version 4.01-CS02 is found,
  all annotations expressions based on string values will lead to an error

## [1.0.1] - 2019-01-21

## [1.0.0] - 2019-01-15

- first release version of the new odata-server module
- CSDL provider to provide your OData EDM model via the JSON format
- annotations in metadata
- basic cross service referencing
- content negotiation
- support for request Prefer header and response Preference-Applied header
- support for request Accept-Charset header
- URI resource-path parser
- parsers for the system query options $filter, $orderby,
  $expand (also in combination with query options for expanded entities), $select,
  $search, $format, and $apply
- dispatching of requests to handler methods
- support for metadata requests with automatic metadata ETag and the possibility to
  use a custom metadata handler for locale-specific metadata
- read scenarios like read EntityCollection, read Entity, read navigation between entities
  (including containment navigation), read EntitySet(Key)/property
  (primitive property, complex property, and their collections), read function imports,
  and read bound functions
- CRUD entity and property requests (primitive, complex, and collection properties),
  including linking with existing entities via bind operations and deep inserts
- upsert requests (PUT/PATCH on entity set with key and navigation to many with key)
- server-driven paging
- CRUD operations for references (also for references reached via navigation)
- ActionImports and bound actions
- $batch requests (including retrying requests for ChangeSets)
- HEAD requests on the service document
- conditional request handling with ETags
- $apply support for simple aggregate, groupby, filter, compute, identity,
  concat, bottomcount, topcount, orderby, skip, and top transformations
- JSON serialization and deserialization of entities, entity collections, and properties,
  including support for JSON format parameters IEEE754Compatible and ExponentialDecimals,
  built-in Context URI Builder, and automatic odata.metadataEtag annotation
- metadata/annotations in data structure
- instance annotations in JSON serializer
- serialization of primitive-property raw values
- node.js 8.x and 10.x support
- debug view in JSON and HTML formats
- logging/tracing facade
