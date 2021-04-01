# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [2.4.2] - 2020-06-17

### Added
- license file: developer-license-3.1.txt

## [2.4.1] - 2020-05-27

### Fixed
- handling of escaped backslashed and doublequotes in search phrases
- parsing of aliases in paths of expressions

## [2.4.0] - 2020-04-15

### Added
- support for navigation properties in complex properties

## [2.3.2] - 2020-03-06

### Fixed
- stricter determination of related entity set

## [2.3.1] - 2020-02-21

### Fixed
- handling of Path for navigation-property binding and EntitySetPath for bound actions and functions

## [2.3.0] - 2020-02-11

### Added
- support for node.js version 12
- complete support of specified Unicode range in URI parsing of identifiers
- URI parsing of search words according to OData 4.01 CS02

### Removed
- support for node.js version 8 due to its end of life

## [2.2.0] - 2020-01-14

### Added
- support for EDM singletons

## [2.1.3] - 2019-09-19

### Fixed
- npm-shrinkwrap.json remains unchanged during xmake build

## [2.1.2] - 2019-09-17

### Fixed
- result type of $apply with aliases for custom aggregates

## [2.1.1] - 2019-06-18

### Fixed
- URI parsing of identifiers starting with null, INF, NaN, true, false 

## [2.1.0] - 2019-05-08

### Added
- support in URI resource-path parsing for key-as-segment convention

## [2.0.1] - 2019-04-09

## [2.0.0] - 2019-03-15

### Changed
- PrimitiveValue(En|De)coder replace ValueText(S|Des)erializer and ValueConverter in API

## [1.2.0] - 2019-03-08

## [1.1.0] - 2019-02-25

### Changed
- Adapt to OASIS Issue 1221:
    - All $...Path Expressions except $Path are now wrapped with Csdl-/EdmUnkwownExpression
    - All string-based expressions are now Csdl-/EdmUnknownExpressions
    - All type-based ConstantExpressions are now treated as UnknownExpressions

## [1.0.5] - 2019-02-08

## [1.0.4] - 2019-01-18

## [1.0.3] - 2019-01-17

## [1.0.2] - 2019-01-17

## [1.0.1] - 2019-01-17

### Added
- OnDelete support for EdmNavigationProperty

## [1.0.0] - 2019-01-15

Initial delivery for @sap/odata-server module
