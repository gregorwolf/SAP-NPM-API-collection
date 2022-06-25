# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.102.0] - 2022-06-16

### Added
- Missing exposure of type definitions was added.

### Changed
OData V2:
- Custom column property "columnIndex". Schema enhancement by defining range using "minimum=0".

### Removed
OData V4:
- In case of List Report views, non-applicable table properties are removed.

### Deprecated

### Fixed
OData V4:
- In case of List Report views, custom columns with navigation property are considered for the correct view.
- Avoid creation of empty personalization object
OData V2:
- Custom column issue with Grid/Tree/Analytical table types - empty second custom column is added in xml files

### Quality

