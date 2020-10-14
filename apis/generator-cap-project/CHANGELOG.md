# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

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