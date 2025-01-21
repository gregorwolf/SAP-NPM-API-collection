# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 6.4.0 - 2024-12-09
 
### Added
- Added nodejs v22 support for .x minor versions

### Removed
- Removed @sap/hdbext due to unsupported node 22

## 6.3.0 - 2024-11-28
 
### Added
- Added nodejs v22 support

## 6.2.0 - 2024-08-14

### Updated
- Override axios dependency to v1.7.4

## 6.1.0 - 2024-03-27

### Removed
- Removed shrinkwrap from preRelease

## 6.0.0 - 2024-02-08

### Removed
- Node.js 12.x, 14.x, 16.x support

## 5.8.4 - 2024-01-02

### Fixed
- Fix BaseMessage property

## 5.8.3 - 2024-01-02

### Updated
- Updated *xssec* to v3.6.1

## 5.8.2 - 2023-12-06

### Updated
- Updated *xssec* to v3.6.0

## 5.8.1 - 2023-11-16

### Updated
- Updated *xssec* to v3.5.0
- Updated *node-cache* to v5.1.2
- Updated *node-fetch* to v2.7.0

## 5.8.0 - 2023-11-08

### Added 
- Added nodejs v20 support

## 5.7.4 - 2023-11-01

### Fixed 
- Removed npm prune from prerelease script

## 5.7.3 - 2023-10-30

### Updated
- Updated *xssec* to 3.4.0

## 5.7.2 - 2023-10-05

### Updated
- Updated *xssec* to 3.3.5
- Updated *hdbext* to 8.0.0


## 5.7.1 - 2023-07-10

### Updated
- Updated *debug* to 4.3.4

## 5.7.0 - 2023-01-26

### Added
- Promisified functionality
- README file added promise based examples 

### Updated
- Updated xssec to v3.2.17
- Updated hdbext to v7.7.2
- README file changed with a clarifying note for clients

## 5.6.3 - 2023-01-10

### Updated
- Updated xssec to v3.2.15
- Updated hdbext to v7.7.1
  

## 5.6.2 - 2022-11-01

### Added
- Node.js 18.x support

## 5.5.7- 2022-10-21
- Set deprecated tag for V1 API methods.

### Updated
- Updated error handling for 404 HTML error.

## 5.5.6- 2022-10-10

### Updated
- Add middleware.js into package.json

## 5.5.5- 2022-08-15

### Updated
- README file changed with a clarifying note for clients

## 5.5.4- 2022-06-10

### Updated
- Updated devDep async to 3.2.4

## 5.5.3- 2022-04-06

### Changed
- changed istanbul test framework with c8

## 5.5.2 - 2022-03-22

### Updated
- Remove certificate forwarding to Auditlog service.

## 5.5.1 - 2022-03-01

### Fixed
- - Updated xssec to v3.2.13

## 5.5.0 - 2022-01-28

### Added
- Node.js 16.x support

### Fixed
- Updated *@sap/hdbext* to 7.6.0
- Updated *debug* to 4.3.3

## 5.4.0 - 2022-01-03

### Updated
- Documentation with new usage for tenant() when providing subdomain.

### Fixed
- $SUBSCRIBER option can now be properly used by providing a subdomain in tenant().

## 5.3.0 - 2021-11-22

### Added
- Added mTLS support.
- Custom Timestamp functionality via .at() method for messages.

### Updated
- Documentation with mTLS support guidelines.
- Documentation with custom timestamp usage.
- *@sap/xssec* library to v3.2.10.

## 5.2.0 - 2021-10-08

### Added
- Added express middleware functionality.

### Updated
- Documentation with express middleware usage steps.

## 5.1.0 - 2021-08-12

### Added
- Added support for OAuth2 plan
- Added support for SecurityContext with OAuth2 (and user token exchange)

## 5.0.0 - 2021-03-09

### Fixed
- Replaced *request* with *node-fetch* 2.6.1
- Replaced *requestretry* with *fetch-retry* 4.1.0

## 4.2.0 - 2021-02-22

### Added
- Node.js 14.x support

### Fixed
- Updated *@sap/hdbext* to 7.1.3
- Updated *lodash* to 4.17.21

## 4.1.0 - 2021-02-12

### Added
- Added support for passing HTTP(s) request agent options to the Service transport.
  This feature is experimental and is therefore not documented. It may be changed or removed anytime.

## 4.0.0 - 2021-02-09

### Fixed
- Update devdeps
- Update debug to 4.2.0
- Update requestretry to 4.1.1
- Allow empty strings in objectWithTypeAndId (utils.js) check

### Removed
- Node.js 6.x support

## 3.2.0 - 2020-08-10

### Added
- Add support for multiple data subjects in Data access messages, v2 API

## 3.1.1 - 2020-07-27

### Fixed
- Update dependencies

## 3.1.0 - 2019-12-06

### Added
- Node.js 12.x support
- Retry logic when accessing the auditlog

### Fixed
- Update dependencies

## 3.0.2 - 2019-07-16

### Fixed
- Update dev dependencies

## 3.0.1 - 2019-05-17

### Fixed
- Transactional messages: uuid and time fields are now updated for each log operation

## 3.0.0 - 2019-04-23

### Removed
- Node.js v0.12 support
- Node.js v4 support

## 2.3.0 - 2018-12-18

### Added
- Node.js version 10 support

### Fixed
- Update `lodash` to 4.17.11

## 2.2.4 - 2018-08-14

### Fixed
- Update dependencies.

## 2.2.3 - 2018-07-17

### Fixed
- Update request to v2.87.0.

## 2.2.2 - 2018-05-18

### Fixed
- Update request to v2.86.0.

## 2.2.1 - 2018-04-05

### Fixed
- Update dependencies.

## 2.2.0 - 2018-01-23

### Added
- npm-shrinkwrap.json.
- Audit log service v2 support.

### Fixed
- Documentation for data access messages.

## 2.1.1 - 2017-10-13

### Changed
- Dependencies' versions

## 2.1.0 - 2017-08-08

### Added
- Support for old and new values in data modification messages.
- Support for setting a tenant.
- Support for Node.js v8.
- Documentation improvements.

## 2.0.1 - 2017-05-30

### Fixed
- Improved debug messages.

## 2.0.0 - 2017-03-13

### Added
- The library requires the application to be bound to an instance of the **Audit log service**.
- Instantiating the library now requires a configuration object containing the `credentials` from the service binding to be provided (see README.md).
- `configurationChange` method is added to the API (see README.md).
- `updateConfigurationChange` method is added to the API (see README.md).

### Changed
- `read`, `update` and `securityMessage` methods have some changes to their argument lists (see README.md).

### Removed
- `delete` method is removed from the API.
- `create` method is removed from the API.
