# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

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
