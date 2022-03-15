# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).




## [1.6.4] - 2022-03-08

### Fixed

- Add new `FsUtil` api methods.

## [1.6.3] - 2022-02-28

- Technical release.

## [1.6.2] - 2022-02-28

### Changed
- Update `yeoman-generator` dependency.

## [1.6.1] - 2022-02-04

### Fixed
- Various bug fixes

## [1.6.0] - 2021-09-20

### Changed
- Consume latest version of `@sap-devx/yeoman-ui-types`.
- Consume latest version of `yeoman-generator`.

### Added
- New log label `[cds]` for log output.


## [1.5.4] - 2021-07-19

### Fixed
- Destination root handling in `SAP Business Application Studio`.


## [1.5.2] - 2021-06-28

### Changed
- Internal refactorings


## [1.5.1] - 2021-06-22

### Changed
- Use `cds env` to determine path to `@sap/cds-dk`.


## [1.5.0] - 2021-05-04

### Changed
- Update dependencies


## [1.4.3] - 2021-04-29

### Changed
- Internal updates for `@sap/cds-dk`support.


## [1.4.2] - 2021-01-29

### Changed
- Consume latest version of `@sap-devx/yeoman-ui-types`.
- Improved node modules lookup handling in `SAP Business Application Studio`.


## [1.4.1] - 2021-01-05

### Fixed
- Fix look up path bug in `SAP Business Application Studio` for node modules.


## [1.4.0] - 2020-10-15

### Changed
- Better support for `SAP Business Application Studio` via UI enhancements and logging.


## [1.3.0] - 2020-10-06

### Changed
- All file operations (write, copy, ...) commit directly after execution.


## [1.2.1] - 2020-09-22

### Fixed
- For `Java` projects also copy dot files, e.g. `.cdsrc.json`.

### Changed
- Internal refactorings, now requiring `@sap/cds-dk` version `>=1.7.0`.


## [1.2.0] - 2020-09-01

### Changed
- Update `yeoman-generator` dependency.
- Project names must not contain an underscore to ensure compatibility with Maven.
- Added human readable display name.


## [1.1.3] - 2020-07-16

### Fixed
- Internal refactorings.
- Internal bug fixes.


## [1.1.2] - 2020-07-02

### Fixed
- Internal bug fixes.


## [1.1.1] - 2020-06-08

### Fixed
- Internal refactorings.


## [1.1.0]

### Fixed
- Bug in folder name validation fixed when folder name is not in parameter list on command line.

### Features
- Using `yeoman-generator` library version `4.10.1`.

## [1.0.7]

### Fixed
- Only allow word characters, numbers and '-' as folder name characters.

## [1.0.6]

### Fixed
- Generator sets project folder correctly when finished.
- Changed initial label to `Project Details` for better readability.
- Improved error messages.

## [1.0.5]

### Features
- Add mandatory prompt for project name.

## [1.0.4]

### Features
- Discovery of `@sap/cds-dk` now also uses `cds -v` to get the home folder of cds.

## [1.0.3]

### Fixed
- Fix error handling

### Features
- Add parser for generic generator options.
