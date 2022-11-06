# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2022-10-26

### Added
- Support Node.js version `16`
- Add CHANGELOG.md

### Changed
- Update version of `@sap/approuter` dependency to `^11.6.0`.

## [2.1.0] - 2021-08-02

### Added
- Support additional request headers configuration for environment variable destinations (e.g., `destinations=[{"name":"api","url":"https://api.sap.com/SRV","URL.headers.APIKey":"1234-5678-9012"}]`). 

### Changed
- Update version of `@sap/approuter` dependency to `^10.5.1`.

## [2.0.3] - 2021-07-07

### Added
- Support UI5 1.84.9+ in Fiori Launchpad Sandbox environment.

### Changed
- Update version of `@sap/approuter` dependency to `^10.4.2`.

### Fixed
- Use `sandbox.js` from correct version of UI5.
- Generate correct URLs for ClientSideTargetResolution adapter configuration.

## [2.0.2] - 2021-01-26

### Added
- Support Node.js versions `10`, `12` and `14`.

## [2.0.1] - 2021-01-04

### Added
- Allow to run HTML5 applications without XSUAA binding.

## [2.0.0] - 2020-12-07

### Changed
- New major release of `html5-repo-mock`. The code of the library rewritten from scratch, preserving same functionality.
