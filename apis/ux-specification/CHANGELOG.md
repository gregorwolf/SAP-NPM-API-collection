# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

# Prerequisites

[NodeJS](https://nodejs.org/en/download/) Version `18.18.0` or higher

## [1.120.0] - 2023-11-16

### Added

- OData V4: 
  - Added support for TreeTable

### Changed
  
### Removed

### Deprecated

### Fixed

- Fixed an exception "Cannot read properties of undefined (reading 'includes')" when generating the app schemas

- OData V4:
  - If multiple facets refer to target annotations without an ID but with identical labels, only one of the facets was shown in the page editor
  - An error message was added to the logger if the ID was missing for a reference facet. This was wrong, the ID is optional for reference facets. Instead, the error message is now added for missing IDs of collection facets
  - Building blocks:
    - The number of new lines that get created from the description of building block properties was decreased
    - Missing 'enum' for multiple building block properties

### Quality

- Update transitive dependencies

Upgrades

- eslint to 8.53.0
- axios to 1.6.0
- @sap-ux/fe-fpm-writer to v0.24.1
- @types/jquery to v3.5.27
- @types/semver to v7.5.5
- @types/d3 to v7.4.3
- @types/mem-fs-editor to v7.0.6
- @sapui5/ts-types-esm to 1.120.1
