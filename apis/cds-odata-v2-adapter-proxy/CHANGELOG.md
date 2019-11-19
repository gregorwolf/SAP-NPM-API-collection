# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- New version information is automatically added after line 8 -->
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
