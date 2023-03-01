# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 1.7.43 - 2023-01-13

### Added

- Dependency updates


## 1.7.42 - 2022-10-10

### Added

- Dependency updates

## 1.7.40 - 2022-08-25

### Added

- Dependency updates

## 1.7.30 - 2022-05-11

### Added

- Resolve issue with request dependency

## 1.7.20 - 2022-05-06

### Added

- Removed deprecated npm module request
- Dependency updates

## 1.7.0 - 2022-04-26

### Added

- Support for node.js versions 12, 14 and 16

## 1.6.3 - 2021-10-19

### Added

- Support for token fetching via mTLS if certificates are present in the jobscheduler binding credentials
- Dependency update

## 1.6.1 - 2020-10-29

### Added

- Dependency upgrade: "request": "2.88.2"

## 1.6.0 - 2020-10-22

### Added

- Support for Node 14
- Dependency update

## 1.5.3 - 2020-06-17

### Added

- license file: developer-license-3.1.txt

## 1.5.2 - 2020-05-08

### Added

- Dependency update

## 1.5.1 - 2020-02-13

### Fixed

- Missing changelog

## 1.5.0 - 2020-02-10

### Added

- Support for node 10 and node 12

## 1.4.1 - 2019-12-10

### Fixed

- Integrate npm-shrinkwrap.json file without integrity checksums.

## 1.4.0 - 2019-11-19

### Added

- Fetch OAuth token from XSUAA or username/password from environment if not passed in constructor.
- Retrieve baseURL from environment if not passed in constructor.

## 1.3.6 - 2018-12-11

### Added

- Added optional query parameters for fetchAllJobs method.
- Added multitenancy support

## 1.3.4 - 2018-08-14

### Fixed

- Update request package to v2.88.0

## 1.3.3 - 2018-08-08

### Fixed

- Update request package to v2.87.0

## 1.3.2 - 2018-05-18

### Fixed

- Update request package to v2.86.0

## 1.3.1 - 2018-04-05

### Fixed

- Update npm-shrikwrap.json

## 1.3.0 - 2018-01-19

### Added

- npm-shrikwrap.json

### Fixed

- Update _request_ to 2.83.0

## 1.2.0 - 2017-11-16

### Added

- Node.js 8 support
- Improvements in the input validation messages
- Support for `page_size` and `offset` parameters in `getRunLogs`

## 1.1.1 - 2017-05-30

### Fixed

- Dependencies updates

## 1.1.0 - 2017-03-30

### Added

- Delete Job
- Bulk schedule activation/deactivation
- Get active/inactive job count
- Get job/schedule action logs
- Bulk schedule deletion
- Fetch all jobs
- Search API
