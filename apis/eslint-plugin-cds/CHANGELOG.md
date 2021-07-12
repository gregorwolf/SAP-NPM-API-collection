# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).


## [2.0.4] - 2021-07-12

### Added

- Plugin also considers 'outsider' files which are not part of a model
### Changed

- Custom formatter now prints projectPath for triggered env rule checks

## [2.0.3] - 20210-07-09

### Changed

- Removed `npm-shrinkwrap.json` file from package

## [2.0.2] - 2021-07-07


### Changed

- Fixed bug that always triggers csn-compile-err on type

## [2.0.1] - 2021-07-06


### Added

- Re-added model rule 'csn-compile-err' to pass csn compile errors to eslint for readability

### Changed

- Formatter ignores all lint reports for other file extensions except for those in plugin overrides files

## [2.0.0] - 2021-07-02


### Added

- New API: split exports into 'impl' (for eslint) and 'api' (for user)
- CDS parser now ingests eslint-disable comments to turn off rules

### Changed

- API: getRuleTester now erquires relative path from ruleTester location to project root

## [1.1.7] - 2021-06-22


### Changed

- Load/Update model must be in sync with every 'on-type' event

## [1.1.6] - 2021-06-21


### Changed

- Formatter no longer has explicit dependencies, only reslies on 'stylish' output
- Formatter behaves like eslint and does not print anything on success (no warning/error messages)
- Formatter prints warnings/errors of 'uncategorized' rules separately
- On glob file expressions, gets multiple models in series and reports on all warnings/errors

## [1.1.5] - 2021-05-26


- Naming convention rules changed to severity 'warning'
- Rules of type 'suggestion' must return 'fix' for appliable multipass fixes
- Split model generation into load and update to be able to work on all files

## [1.1.4] - 2021-05-20


### Changed

- Formatter does not show any (env/other) lint messages on model error
- Rule lower-camelcase-elements reverted to also check type keys
- Rule lower-camelcase-elements is not triggered by element 'ID' (see Bookshop in CAP samples)


## [1.1.3] - 2021-05-12



### Changed

- Changed rule type for naming convention rules to "suggestion"
- Do not rely on namespaces/contexts to extract entity names
- Added extra layer to also support ruleTester "environment" checks

## [1.1.2] - 2021-05-05


### Changed

- Updated all rules to ingest args: (cds, context)
- Use context's sourcecode to get correct range indices for fixers

## [1.1.1] - 2021-05-04


### Changed

- Removed bulky headers from custom formatter
- Removed latest-cds-version rule from recommended rules
- Fixed min-node-version rule to always find cds.home
- If no model files are found, do not fail but only do env checks
- Fixed formatter to also print any other ESLint messages received

## [1.1.0] - 2021-04-29


### Added

- Custom cds formatter for separate reporting of env and model checks

### Changed

- Fixed version of model rule 'sql-cast-suggestion'


## [1.0.8] - 2021-04-12


### Added

- Proxy for cds object replaces fragile object clone from before
- Added proper typings and ignore where options should remain invisible to the (cds) api
- Added docstrings and header to each file to explain ESLint context
- Added model rule 'sql-cast-suggestion'

## [1.0.7] - 2021-04-01

### Fixed

- Do not crash if `parserServices.cds` is not available

## [1.0.6] - 2021-04-01

### Added

- peer dependency to `eslint`
- error handling without throw to avoid editor pop-up hell
- simplified api, cds instead of parserServices

## [1.0.4] - 2021-03-24

### Changed

- Added sync model load from cds to generate fully resolved models
- Simplified model rules with cds.reflect
- Added model rules 'lower-camelcase-elements', 'upper-camelcase-entities'
- Removed model rule 'no-entity-moo' and use as sample custom rule in docs
- Refactored and added more parserServices


## [1.0.3] - 2021-01-22

### Changed

- Fixed rule min-node-version to check if cds dependency is installed
- Updated README glob statement to double asterisk for check nested dirs


## [1.0.2] - 2021-01-21

### Changed

- Fixed rules to work in concert and allow for globs
- Improved README for better readability


## [1.0.1] - 2021-01-19

### Added

- Rule `assocs-card-flaw` in category *Model validation*

### Changed

- Refactoring of ruleFactory and parser code


## [1.0.0] - 2020-12-07

- Initial release 1.0.0