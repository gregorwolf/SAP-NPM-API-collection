# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

## [1.0.30] - 2020-05-19

### Fixed
   * Added fix to link enum Types to property in entity sets for V4.

## [1.0.29] - 2020-05-08

## [1.0.27] - 2020-05-07

## [1.0.26] - 2020-05-05

### Fixed
   * Added fix for several missing entity sets which 
     are stemming from the same entity For Mock Server Use Case V4.

### Added
- support for node.js version 12

### Removed
- support for node.js versions 6 and 8 due to their end of life

## [1.0.21] - 2019-09-17

### Fixed
   * Added fix for entities having more than one navigation property.
     Now all navigation property bindings are rendered correctly
     in OData V4 output (before only the last was added to the output).

## [2.0.0] - 2019-09-13

### Added
   * CSN Generation For Mock Server Use Case V2.

## [1.0.3] - 2019-03-29

### Fixed
* CSN Generation Fixes For Mock Server Use Case V4.

## [1.0.1] - 2019-03-21

## [1.0.0] - 2019-03-08

### Added
   * EDMXV4 to EDMV4 JSON Converter
   * EDMV4 JSON to CSN Converter
   * EDMXV2 to EDMV4 JSON Converter
   * EDMXV2 to CSN Converter

## [0.0.18] - 2019-03-07

- # Test Release. Not for productive usage

## [0.0.17] - 2019-03-06

- # Test Release. Not for productive usage

## [0.0.16] - 2019-03-06

### Added
- Add new -t,--target option to produce OData Node.js csdl json custom format

### Changed
- Remove Temporal vocabulary from autoloading
- Improve error message if XML elements can't be resolved
- Change generated $Collection = 'true' to true boolean for functions generated from function imports
- $Nullable is not set on NavigationProperty collections anymore.
- Improve error message if XML elements can't be resolved
- Change generated $Collection = 'true' to true boolean for functions generated from function imports

## [0.0.15] - 2018-12-12

### Added
- OData V2-XML to OData V4-JSON converter - Add $Collection to EntitySets

## [0.0.14] - 2018-11-30

## [0.0.13] - 2018-11-30

- # Test Release. Not for productive usage

## [0.0.12] - 2018-11-29

### Added
- Autoloading for oasis default vocabularies
Add following changes:
- Remove $Kind from EntityContainer EntitySets,Singletons and add $Collection to EntitySets
    - See OASIS Issue: https://issues.oasis-open.org/browse/ODATA-1231

- V4 Converter
    - Now a missing referenced document does not break the processing
    - On execution end there is a new callback parameter providing all missing referenced documents and corresponding uris

### Removed
- Change output conversion of Constant Expressions (will be provided later):
    - See OASIS Issue: https://issues.oasis-open.org/browse/ODATA-1221

## [0.0.11] - 2018-11-06

## [0.0.10] - 2018-11-06

## [0.0.9] - 2018-11-06

### Changed
- Change output conversion of Constant Expressions
    - See OASIS Issue: https://issues.oasis-open.org/browse/ODATA-1221
- Remove $Kind from EntityContainer entities
    - See OASIS Issue: https://issues.oasis-open.org/browse/ODATA-1231

## [0.0.8] - 2018-10-18

## [0.0.7] - 2018-10-16

## [0.0.6] - 2018-10-16

## [0.0.5] - 2018-09-27

## [0.0.4] - 2018-09-25

## [0.0.3] - 2018-09-13

## [0.0.2] - 2018-08-22

### Added

* Release version 0.0.1 (alpha version)
