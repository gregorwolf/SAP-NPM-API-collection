# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.5.13] - 2024-05-13
Updated:
- support node 20 and update dwf-core to 2.2.12

## [2.5.12] - 2024-04-17
Updated:
- Update dwf-core to 2.2.11 to solve vulnerability issue

## [2.5.11] - 2023-11-08
Updated:
- Update dwf-core to 2.2.10 to solve vulnerability issue

## [2.5.10] - 2023-11-08
Updated:
- Update dwf-core to 2.2.9 to solve vulnerability issue

## [2.5.9] - 2022-06-06
Updated:
- Update dwf-core to 2.2.8

## [2.5.3] - 2022-04-09
Added:
- Add LICENSE file
- Add BOM json

Fixed:
- Release on NPMJS

## [2.5.1] - 2023-03-19
Added:
-

Fixed:
- Updates the used node dependencies

## [2.5.0] - 2020-12-23
Added:
-

Fixed:
- Updates the used node dependencies
- Requires engine ^10.0.0 || ^12.0.0

## [2.3.2] - 2019-03-22
###  Added: 
- Bumped version of dwf-core to 2.2.2

### Fixed:
- 

## [2.3.1] - 2018-09-13
### Added:
-

### Fixed:
- Schema Validation of dlmProfile :: global.node[0] datastore should have atleast 1 non empty key

## [2.3.0] - 2018-03-02
### Added:
- Released for DWF 2 SP03
- Content Validation for tableExtension, tableExternal, and tableInternal
- extension node

### Fixed:
- warning for empty keys for tableExternal, ExtentionNode type ROUNROBIN
- the content validation the dlm profiles: partition_level_1
- content validation - node[2]/../column/key - no key is accecpted, when (extension node and roundrobin) or table external
- npm-shrinkwrap
- Schema Validation of dlmProfile :: dlmprofile--> runtime--> node--> action--> view--> "pruningUnionNode" renamed as "pruning"

## [2.2.3] -2017-08-30
### Added:
-

### Fixed:
-

## [2.2.2] -2017-08-15

### Added:
-

### Fixed:
- dlm profile - content validation

## [2.2.1] -2017-08-11

### Added:
-

### Fixed:
- start script - exposes the main.js for successful start

## [2.2.0] -2017-08-11

### Added:
- dlm profile - schema validation (Semantics)
- dlm profile - content validation

### Fixed:
-
