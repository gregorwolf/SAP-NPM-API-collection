# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 3.2.2
- Internal refactorings.

## 3.2.1
- Bugfixes
- Using latest versions of libs `lodash`, `@sap/fibers`, `@sap/hdbext` and `@sap/xsjs`.

## 3.2.0
- Support for Node.js 14.

## 3.1.3
- Use `lodash` in version `4.17.15`.

## 3.1.2
- Internal restructuring.

## 3.1.1
- More bug fixes.

## 3.1.0

### Changed
- Using latest versions of libs `@sap/fibers`, `@sap/hdbext` and `@sap/xsjs`.

## 3.0.3 - 2019-02-14

### Changed
- use latest fibers

## 3.0.2 - 2019-02-13

### Changed
- use correct hdbext

## 3.0.1 - 2019-02-12

### Changed
- use latest hdbext and fibers

### Fixed
- npm-shrinkwrap.json cleansed

## 3.0.0 - 2018-10-12

### Changed
- use @sap/hana-client instead of node-hdb

## 2.0.15 - 2018-04-19

### Fixed
- use newer fibers to enable running on newer node.js runtimes

## 2.0.14 - 2018-01-18

### Changed
- cleaned integrity field from npm-shrinkwrap.json to avoid checksum errors on customer side

## 2.0.13 - 2018-01-15

### Changed
- use released version of hdbext
- added missing double quote for table names in createTestTable

## 2.0.12 - 2018-01-12

### Added
- CHANGELOG.md

## 2.0.11 - 2018-01-12

### Added
- Node 8 support.

### Fixed
- Update dependencies.

## 2.0.10 - 2018-01-09

### Added
- console output for test results

### Fixed
- jasmine.toEqualObject matches semantic equality
- correct decimal value of a column in a row in resultSet
- expect().toEqual(jasmine.any()) fixed
- Can't wait without a fiber bug
- set package parameter
- sqlExecutor.execQuery (when hdbConnection) returns correct ColumnType and ColumnTypeName
- execSingle works for update statement
