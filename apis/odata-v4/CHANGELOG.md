# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

## [1.9.0] - 2019-01-16

### Please note: This library will not receive feature and bugfix releases in the future. Please use the successor `@sap/odata-server`

### Added
- Support for geo types and geo functions

### Changed
- Errors with status codes 4xx are logged with log level WARNING instead of ERROR
- Remove $Kind from EntitySets,Singletons, FunctionImports, ActionImports and add $Collection to EntitySets (Compatible change)
    - See OASIS Issue: https://issues.oasis-open.org/browse/ODATA-1231

## [1.8.0] - 2018-10-26
### Added
- Support for Upsert requests (PUT/PATCH on entity set with key and navigation to many with key)

### Fixed
- base64 encoding uses "URL and Filename Safe Alphabet" as required by the specification (#480)

## [1.7.0] - 2018-09-19
### Added
- Support for EDM type Edm.Stream
- It is now possible to create, update, and delete entities and references reached via navigation.

## [1.6.1] - 2018-08-07

### Changed
- an empty JSON object is allowed as input for a create operation

## [1.6.0] - 2018-08-02
### Added
- $apply support for accessing related entities in aggregation and grouping
- Implemented the odata.metadataEtag annotation
- Metadata-Etag changes, if the metadata document changes via a custom metadata handler
- Support for function imports and bound functions
- new method in ApplicationError to add an annotation 

### Changed
- Definition of search words for $search in anticipation of OData version 4.01
- Changed next() interface of ServiceHandler, MetadataHandler and localeNegotiator to behave like
  the other data handlers -> next (error, { value: data })

### Fixed
- Context URL in case of deep inserts
- the check which key properties can be omitted in case of referential constraints (#426)
- serialization of annotations in XML error messages

## [1.5.0] - 2018-06-13

### Added

- Retry Requests for ChangeSets
- Support for locale specific metadata-requests
- Support for $count as a pathsegment on expanded navigation properties
- Support for containment navigation
- Support for instance annotations in JSON serializer
- $apply support for orderby, skip, and top transformations
- Support for $expand=*, but not with the $levels option

### Changed

- Null property values can be omitted
- Updated dependencies

### Fixed
- Canonical URL and context URL in case of omitted key values due to referential constraints
- Context URL in case of bound actions that return an entityset
- Support for ETags in expanded entities
- Support for ETags in a Deep-Insert response

## [1.4.1] - 2018-05-03

### Fixed
- Corrected behaviour when debug mode is not activated but requested by client

## [1.4.0] - 2018-04-27
### Added

- Metadata serialization of EnumMember can use odata.type annotation if enum type is not available
- Support for HEAD requests on the service document

### Fixed

- Default status code set to 200 OK for responses to action requests
- Switched to more robust method of calling hasOwnProperty (#384)
- Added format-parameter odata.metadata to the content-type header of json responses (#351)

## [1.3.0] - 2018-04-04
### Added
- Support for request Prefer header and response Preference-Applied header


## [1.2.0] - 2018-03-19

### Added

- Support for Accept-Charset and the charset format-parameter in Accept and $format 

### Changed

### Fixed

## 1.1.1 - 2018-03-12 [Test]

## 1.1.0 - 2018-03-12 [Okra Release for productive usage on XSA CF]
### Added

- $apply support for concat transformation

### Changed

### Fixed

- Context-Url for expanded entities/entity sets #366

## 1.0.0 - 2018-03-01 [Okra Release for productive usage on XSA/CF]

### Added

- Enumeration types
- Enhanced Debug HTML View
- $apply support for simple aggregate, groupby, filter, compute, identity, bottomcount, and topcount transformations
- Server-driven paging
- Create/Update entity and link with existing entity via bind operations
- CRUD operations for references
- ActionImports and Bound Action support
- Deep insert support
- Metadata/Annotations in data structure
- Annotations in expanded entities (Etags)

### Changed

- Refactoring of `next(error, data, options)` interface. Data structure of `data` has changed

### Fixed

- Debug output for batch requests #337

## 0.5.0 - 2017-10-18 [First Okra Release for productive usage on XSA/CF]
### Added

- Basic Cross Service Referencing
- Node.js 6.X and 8.X support
- CRUD Entity Requests
- CUD Property Requests (Primitive-, Complex- and Collection Properties) 
- $batch requests
- EnumMemberExpression in metadata
- Conditional Request handling with ETAGs
- Logging Facade
- Documentation 

### Changed

- CRUD handlers have to be registered with service.on() instead of service.use()

## 0.0.1-alpha.4 - 2017-05-30 [Milestone]
### Added

- Create Entity Requests
- Adapt JSON CSDL provider to preliminary OASIS CSDL version
- Adapt samples to new CSDL format
- Performance Test Cases

## 0.0.1-alpha.3 - 2017-04-24 [Milestone]
### Added

- Read EntitySet(Key)/property (Primitive Property, Complex Property and their collections)
- Delete Entity requests
- New Dispatching architecture - Usage of handlers instead of processor interfaces
- OData Version 4.0 in request and response
- Annotations in metadata
- Context URI Builder
- Enhanced Debug View support
- Content Negotiation
- $filter parser
- $orderby parser
- $expand parser
- $select parser
- $search parser
- $format validation
- $expand in combination with query options for expanded entities
- support for JSON format parameters IEEE754Compatible and ExponentialDecimals
- standalone JSON serialization of properties
- serialization of primitive-property raw values
- JSON deserialization of entities and properties

## 0.0.1-alpha.1 - 2016-10-28 [Milestone]

### Added

- First milestone version of the OData V4 library, that can be used for PoC's.
- Library supports creating your OData EDM modell as well Read scenarios like
  read EntityCollection, read Entity and Navigation between entities like:
  - GET http://serviceRoot/EntitySet
  - GET http://serviceRoot/EntitySet(key)
  - GET http://serviceRoot/EntitySet(key)/NavigationProperty/..
- The library supports the json format only.
- CSDL providers to provide your OData EDM model via the sap-json format or programmatically
- JSON Serializers for Entity and EntityCollection Serialization
- Dispatching of request to processor methods
- node.js 6.X support
- debug view in json and html format
