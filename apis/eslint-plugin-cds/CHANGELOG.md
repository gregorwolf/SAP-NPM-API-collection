# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [3.0.4] - 2024-06-19

### Changed
- Internal refactorings

## [3.0.3] - 2024-05-08

### Fixed

- Disabling ESLint for the next line via `eslint-disable-next-line` now works properly in _cds_ files

## [3.0.2] - 2024-04-29

### Fixed

- Internal parser call now handles `ESLint` version 8 and 9

### Changed

- Requires `ESLint` version 8 or above

## [3.0.1] - 2024-04-25

### Fixed

- Add namespace `@sap/cds` to plugin configuration

## [3.0.0] - 2024-04-23

### Added

- Support ESLint flat configurations (`eslint@v9`) and make them available as *recommended*, *all*.

### Changed

- Plugin configurations (*recommended*, *all*) for `eslint@<v9` are now available with the `-legacy` suffix.

### Fixed

- In _latest-cds-version_, get output from `npm outdated` on exit code 1.

## [2.7.0] - 2024-04-12

### Added

- Add `getRootPath()` method to `context` object to get the project rootPath.

### Changed

- Rule option "show" now allows inferred rules to rerun/recompile instead of just running once (as is the CLI behavior).
- Removed `min-node-version` rule, as it is now covered by the cds CLI.

### Fixed

- In _no-db-keywords_, use `getRootPath()` instead of dirname, as wrong paths lead to missing db entries, disabling the rule.

## [2.6.7] - 2024-03-11

### Fixed

- Removed loading of previously removed rule.

## [2.6.6] - 2024-03-11

### Changed

- Removed `require-2many-oncond` rule, as it is now covered by the compiler.

## [2.6.5] - 2024-01-31

### Fixed

- Performance got improved significantly for projects with many non `.cds` files (like `.js` files)

## [2.6.4] - 2023-10-31

### Added

- New `auth-restrict-grant-service` rule that validates events on restricted services.

### Fixed

- In _no-join-on-draft_, do not run check if there is no valid query.
- In _auth-valid-restrict-where_, do not consider when missing expression references.

## [2.6.3] - 2023-02-13

### Changed

- Filter rule reports using *inferred* models on $location.

## [2.6.2] - 2023-02-13

### Changed

- Fixed rule reports using *inferred* models to always receive valid _file_ $locations.

## [2.6.1] - 2023-01-26

### Changed

- Fixed rule name in ESLint config:all to `@sap/cds/start-elements-lowercase`.
- Allow expensive rules to be reported when running from ESLint Cli.
- In _auth-valid-restrict-grant_, only suggest closely related user roles.
- In _auth-valid-restrict-to_, only suggest `*` if other entries apart from `*` exist.

## [2.6.0] - 2022-09-29

### Changed

- Renamed rule `no-join-on-draft-enabled-entities` to `no-join-on-draft`.
- Expanded list of reserved keywords to check for in rule `no-db-keywords`.

### Added

- New `extension-restrictions` rule that validates extension projects' models against restrictions set by the extended SaaS app.

### Fixed

- Errors from rules are shown again in the console output

## [2.5.0] - 2022-08-04

### Changed

- Model Validation rules use `parsed` flavor by default (`meta.model` property)
- Environment rules have { model: "none" }

### Added

- Flavor in `model` property on `meta` object of rule
- Context function `getNode()` returns Node with proper location

## [2.4.1] - 2022-06-17

### Added

- Authorization rules 'auth-*'.

### Changed

- Node.js 14 is now the minimum required Node.js version.  Version 12 is no longer supported.
- Default CSN flavor in rules is `parsed`.

## [2.4.0] - 2022-04-14

### Added

- Rule report recycling ensures that rules are created/run only once for the root model
### Changed

- Rule `no-dollar-prefixed-names` no longer acts on compiler warning messages

### Changed
## [2.3.5] - 2022-04-05

### Changed

- Catch root model compilation errors and do not try again on every file (-> long lint times for broken models)
- Add to lint reports with rules marked with '!'

## [2.3.4] - 2022-03-31

### Changed

- Only deduplicate model error messages when working within VS Code Editor
- Hide `no-dollar-prefixed-names` compiler warning message in VS Code Editor (already passed by lsp)

## [2.3.3] - 2022-03-24

### Added

- Added new rule `no-dollar-prefixed-names`
- Lint reports with rules marked with '!' notify of rule compile errors
- Lint reports of any thrown errors can be exposed by `--debug` (includes stack)

## [2.3.2] - 2022-01-24

### Changed

- Rule `require-2many-oncond` now also detect navigations of aaspects for flavor 'parsed'
- Removed duplicates from rule results of category 'Environment'

## [2.3.1] - 2021-12-10

### Changed

- Removed custom formatter as it is no longer used by `cds lint`.
- Deduplicate lint results from from rules of category environment.
- Removed 'unpeploy.json' from files as no lint rule requires it
- Fixed redundant triggers of model recompilations for non-model files and model files without changes

## [2.3.0] - 2021-12-03

### Added

- Added new rule 'valid-csv-header'

### Changed

- Fixed suggestion messages in editor option (and disabled auto-fix)
- Added rule properties 'docs.recommended', 'severity'

## [2.2.2] - 2021-11-08
### Added

- Added new rule 'no-join-on-draft-enabled-entities'

### Changed

- Compile 'model' files based on CSN flavor 'inferred'
- Compile 'outsider' files based on CSN flavor 'parsed'

## [2.2.1] - 2021-11-01
### Changed

- Optimized model loading and fixed bug in loading of 'outsider' files

## [2.2.0] - 2021-10-29
### Added

- Added typings to javascript for all exposed apis

### Changed

- Aligned rule creation and tester api with ESLint

## [2.1.2] - 2021-10-05
### Changed

- Allow not only *.js but also other file types (i.e. *.ts, etc) to bypass plugin rules

## [2.1.1] - 2021-10-04
### Changed

- Added preprocessor to avoid (other plugins) parsing errors on cds files

## [2.1.0] - 2021-09-23
### Changed

- Source code is now Javascript only
- Rule API simplified to only include report and cds
- Added new rules `no-db-keywords` and `require-2many-oncond`
- Filter out lint messages when run from command line with custom formatter

## [2.0.5] - 2021-07-18
### Added

- When used from within VS Code ESLint exnteion, do not show environment rules
### Changed

-  Rule 'min-node-version' reverted to use cds.resolve not cds.home

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
### Changed

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
### Changed

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
### Added
- Initial release 1.0.0
