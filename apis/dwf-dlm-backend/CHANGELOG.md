# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.3.0 - 2018-03-02
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
