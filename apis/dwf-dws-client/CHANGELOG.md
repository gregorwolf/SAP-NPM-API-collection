# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
