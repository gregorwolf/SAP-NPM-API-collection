# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.6.6] - 2022-04-09

### Changed

- Add LICENSE file

## [2.6.0] - 2021-01-27

### Changed

- Update node.js version
- Update "@sap/hana-client" to "2.6.58"
- Update "@sap/hdbext" to "7.0.1"
- Update "@sap/logging" to "6.0.0"

## [2.5.4] - 2019-04-04

### Changed

- Bump logging version to 4.1.0

## [2.5.3] - 2019-02-19

### Removed

- Remove activation id from message text

## [2.5.2] - 2019-02-05

### Changed

- Modify error handling for task execution
- Update npm-shrinkwrap.json

## [2.5.1] - 2019-01-29

### Changed

- Remove module "lodash"

## [2.5.0] - 2019-01-24

### Changed

- Update module "@sap/hdbext" from "5.0.0" to "5.1.0"
- Update module "express" from "4.16.3" to "4.16.4"
- Update module "lodash" from "4.17.4" to "4.17.11"

## [2.4.3] - 2019-01-02

### Fixed

- Removed devDependencies from npm-shrinkwrap.json

## [2.4.2] - 2018-12-21

### Changed

- Replace module "hdb" with "@sap/hdbext"

## [2.4.1] - 2018-11-05

### Added

- Set application name while opening db connection.

## [2.4.0] - 2018-09-14

### Changed

- Check url-api version of DWF runtime / DWF Task Orchestration Engine
- Update checking service credentials of db service /helpers/dbClient
- Fix callback handling of module /hanaNative/tasks/getMsgTableNames
- Switch from ESLint to StandardJS
- Fix NDSO getOperationInfo calls
- Replace module "@sap/hdbext" by "hdb"
- Correct typos in texts in /i18n/toe.properties
- Update versions of used modules

## [2.3.3] - 2018-03-05

### Changed

- Remove default value of message table for task type execute procedure
- Update versions of used modules and npm-shrinkwrap.json
- Support value help button for ndso names
- Limit ndso SQL result to 50
- Set Certificate Authority for tasktype load from url

## [2.3.2] - 2018-01-22

### Changed

- Update versions of used @sap modules and npm-shrinkwrap.json.

## [2.3.1] - 2018-01-19

### Changed

- Update npm-shrinkwrap.json.
- Allow empty path parameters for value help services.
- Correct names of value help placeholders of registered task types.
- Update versions of used @sap modules.

## [2.3.0] - 2018-01-12

### Added

- Initial version for Data Warehousing Foundation 2.0 SP03: Adjust the parameter models of the task types
to new features provided by the parameter form control.
