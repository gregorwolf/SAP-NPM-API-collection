# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

## [1.0.3] - 2018-08-20
### Fixed
Modified open source dependency to a specific version.

## [1.0.2] - 2018-08-13
### Fixed
Converts inherited complex types and entities from the OData model to CSN equivalent.

## [1.0.1] - 2018-05-30

### Added
The annotation @cds.persistence.skip:true is added for all entities in the converted CSN file.

## [1.0.0] - 2018-05-02
 
### Added
- Performs basic OData V2 metadata validation
- Converts OData V2 entities/properties to CSN entities/elements
- Converts OData V2 complex types to CSN structures
- Converts OData V2 entity navigations to CSN associations
