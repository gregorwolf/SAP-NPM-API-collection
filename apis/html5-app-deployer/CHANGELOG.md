# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 7.1.0 - 2025-07-24

### Added
- xssec retry support

### Updated dependencies
- deps: form-data@4.0.4
- deps: xssec@4.8.0
- deps: xsenv@5.6.1
- deps: axios@1.10.0

## 7.0.2 - 2025-05-20

### Fixed
- change iasDependencyName to IASDependencyName as expected by Approuter

## 7.0.1 - 2025-03-18

### Updated dependencies
- deps: axios@1.8.3

## 7.0.0 - 2025-02-02

### Updated dependencies
- deps: axios@1.7.9
- deps: xsenv@5.4.0
- deps: file-type@19.6.0
- deps: read-chunk@5.0.0

### Added
- nodejs version ^14.0.0 and ^16.0.0 support removed
- nodejs version ^22.0.0 support added

### Fixed
- Service binding documentation

## 6.4.3 - 2024-08-15

### Updated dependencies
- deps: axios@1.7.4
- deps: jszip@3.8.0

## 6.4.2 - 2024-08-04

### Fixed
- Service name calculation in GACD client

## 6.4.1 - 2024-07-28

### Fixed
- Passing cdm.json in GACD client

## 6.4.0 - 2024-07-01

### Added
- Support for uploading credentials as a GACD client

## 6.3.1 - 2024-06-14

### Fixed
- Support for uploading application with a CDM file

### Updated dependencies
- deps: express@4.19.2

## 6.3.0 - 2024-06-09
### Added
- Support for uploading application with a CDM file

### Updated dependencies
- deps: axios@1.6.8

## 6.2.0 - 2024-03-19
### Added
- Services bindings can be created with certificate

## 6.1.0 - 2024-03-14

### Added
- App2App navigation support

## 6.0.0 - 2024-01-15

### Updated dependencies
- deps: xsenv@4.2.0
- deps: cf-nodejs-logging-support@7.2.1
- deps: xssec@3.6.1
- deps: axios@1.6.5

### Added
- nodejs version ^12.0.0 support removed
- nodejs version ^20.0.0 support added

## 5.0.2 - 2023-11-29

### Updated dependencies
- deps: xssec@3.6.0

## 5.0.1 - 2023-11-18

### Updated dependencies
- deps: xssec@3.5.0
- deps: axios@1.6.1

## 5.0.0 - 2023-02-12

### Updated dependencies
- deps: xssec@^3.2.17
- deps: axios@0.27.2

### Added
- nodejs version ^10.0.0 support removed
- nodejs version ^18.0.0 support added

## 4.2.4 - 2023-01-17

### Updated dependencies
- deps: @sap/xsenv: ^3.4.0
- deps: @sap/xssec: ^3.2.15

## 4.2.3 - 2023-01-08

### Updated dependencies
- deps: cf-nodejs-logging-support@^6.14.0

## 4.2.2 - 2022-11-16

### Updated dependencies
- deps: uuid@8.3.2

## 4.2.1 - 2022-11-15

### Updated dependencies
- deps: archiver@5.3.1
- deps: cf-nodejs-logging-support@6.13.2
- deps: file-type@12.4.2

## 4.2.0 - 2022-09-04

### Fixed
- Version sync with DockerHub

## 4.1.3 - 2022-09-01

### Fixed
- Convert shouldExitProcess value to boolean
- Axios request error handling 

## 4.1.2 - 2022-06-20

### Updated dependencies
- deps: xsenv@3.3.2


## 4.1.1 - 2022-06-14

### Updated dependencies
- deps: xsenv@3.3.1

## 4.1.0 - 2022-05-10

### Added
- Create business services destinations

### Updated dependencies
- deps: async@3.2.3

## 4.0.1 - 2022-03-08

### Fixed
- Vulnerability issues

## 4.0.0 - 2022-03-07

### Updated dependencies
- deps: xsenv@3.1.1
- deps: xssec@3.2.13
- deps: axios@0.26.0

### Added
- Switched from Request to Axios, used by request-utils
- nodejs versions ^6.0.0 and ^8.0.0 support removed
- nodejs version ^16.0.0 support added

### Fixed
- increased request options content and body length

## 3.2.0 - 2021-10-24

### Added
- Mutual Transport Layer Security (mTLS) handling

### Fixed
- html5-repo credentials handling

## 3.1.1 - 2021-07-20

### Fixed
- Add xsappname in generated destinations
- Add IAS domains in generated destinations

## 3.1.0 - 2021-05-25

### Added
- Enable process exit after upload

## 3.0.1 - 2021-05-09

### Fixed 
- Destination type set to HTTP when creating destination configuration

## 3.0.0 - 2021-03-11

### Added
- Asynchroneus upload support

## 2.3.1 - 2021-02-16

### Fixed
- Failure when trying to obtain xsuaa token in Kyma flows

## 2.3.0 - 2020-12-20

### Added
- Support the automatic creation of destinations that are pointing to xsuaa, app-host, ias service instances or backend applications

## 2.2.0 - 2020-12-1

### Added
- Support node version 14
- Use xsenv library to enable accessing credentials in Kyma

## 2.1.1 - 2020-09-06

### Updated dependencies
- deps: archiver@5.0.0
- deps: cf-nodejs-logging-support@6.4.3
- deps: request@2.88.2

## 2.1.0 - 2020-04-21

### Added
- Support node 8,10,12 versions

## 2.0.3 - 2019-03-13

### Fixed
- On failure deploy return the error written to the log
- Return correct error when deploy with empty resources folder
- Support deploy without npm install

## 2.0.2 - 2018-11-22

### Fixed
- Vulnerability issues


## 2.0.1 - 2018-06-07

### Fixed
- Validation of binding for app-host

## 2.0.0 - 2018-03-01

### Added
- Single Deployer to serve multiple applications

## 1.1.8 - 2018-02-14

### Added
- Initial release as NPM

## 1.1.0 - 2017-11-12

### Added
- Initial release
