# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- New version information is automatically added after line 8 -->
## Version 1.4.16 - 2020-01-14

### Fixed
- Enforce IEEE754 compatibility
- Pin Axios library

## Version 1.4.15 - 2019-12-20

### Fixed
- Fix authentication prompt for $metadata
- Improve trace handling

## Version 1.4.14 - 2019-12-19

### Fixed
- Protect $metadata call
- Fix $filter parentheses nesting
- Fix "all" model loading from app, srv
- Improve $filter handling, incl. data type and negative tests

## Version 1.4.13 - 2019-12-12

### Fixed
- Remove "services" configuration, as it is obsolete
- Fix nested functions in $filter 

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
- __count is now of type String
- Aggregation values are converted according to dynamic type
- Search support
- Fix for converting warning messages 

## Version 1.4.4 - 2019-10-07

### Fixed
- Filter data type conversions

## Version 1.4.3 - 2019-10-01

### Fixed
- Check CDS multitenancy/extensibility (mtx) with flag `cds.env.requires.db.multiTenant`, see https://github.wdf.sap.corp/cap/issues/issues/2032
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
- Localization
- Tracing
