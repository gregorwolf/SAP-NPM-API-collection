# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 2.0.8 - 2020-08-07

### Changed
- `cds init` uses latest `Maven Java archetype` version `1.8.1` for creating Java projects.

### Fixed

- Fixed `cds add mta` for java projects. The Spring Cloud Profile is set by default for Java apps in order to enable the SAP HANA service binding, otherwise the sqlite db would still be used at runtime.
  The environment variable JBP_CONFIG_RESOURCE_CONFIGURATION required by the classic Java runtime has been removed.

## Version 2.0.7 - 2020-08-04

### Added
- `cds init` supports adding `samples` via `--add samples`. See `cds help init` for more details.
- **Most CLI commands have moved to `@sap/cds-dk`** from `@sap/cds`.  Make sure to install the latest version with `npm i -g @sap/cds-dk`.
- `cds` commands now log a hint to update to the latest `@sap/cds` if this one is still of version 3.
- New command `cds login` added to simplify usage of `cds extend` and `cds activate` by providing them with automatic authentication and saving project settings.
  Refreshes expired authentication tokens automatically. Optionally uses CF command-line client to determine login URLs and subdomains.
  Saves authentication data in plain-text file or desktop keyring on Linux, macOS or Windows.
  The latter requires an optional Node.js module `keytar` to be installed.
- New command `cds logout` removes authentication data and optionally project settings.

### Changed
- `@sap/cdk` no longer warns about `@sap/cds` being globally installed next to it.  This was a temporary hint for the transition period to `@sap/cds-dk`.
- `cds init` generates dependency to `@sap/cds` version `4` for Nodejs projects.
- Use square brackets to pass array values for options to `cds init --java:mvn`.
- `cds init --add pipeline` and `cds add pipeline` now create file `config.yml` in `.pipeline` folder.
- Improved `launch.json` file which is created during `cds init`.
- `cds add mta` now creates a mta.yaml file that sets the production flag for cds build and npm install.
  This ensures that the HANA artefacts are created if `"kind": "sql"` or some `production` profile has been configured in package.json or .cdsrc.json.
  Requires `@sap/cds` version >=4.x.
- `cds init` uses latest `Maven Java archetype` version `1.7.0` for creating Java projects.
- `cds init` no longer adds `package-lock.json` to `.gitignore` file when creating a new project.
- `cds init --add hana` and `cds add hana` now use `Maven Java archetype` to create HANA related pom.xml entries.
- Consistent default naming scheme for applications and services deployed to CF across the following `cds` commands `build`, `deploy`, `init` and `add`. For an application named `myapp` the SAP HANA deployer app name is `myapp-db-deployer`, the SAP HANA DB service name is `myapp-db`.

### Fixed

- Fixed `cds import` to support imports from symlinked sources
- Fixing bug in `cds init` and `cds add` when using multiple features seperated by comma.
- Fixing missing log output bug in `cds init` and `cds add` when using feature `samples`.
- `cds add mta` does no longer crash if no package.json file exists.

## Version 1.8.6 - 2020-07-10
### Changed
- Service binding names have been adapted in mta.yaml created by `cds add mta` command.

### Fixes
- Simplified `cds env` calculation during `cds init` and `cds add`.

## Version 1.8.5 - 2020-06-05

### Changed
- `cds init` uses latest `Maven Java archetype` version `1.6.0` for creating Java projects.

## Version 1.8.4 - 2020-05-30

### Changed
- `cds init` uses latest `Maven Java archetype` version `1.5.2` for creating Java projects.

### Fixes
- An issue in `@sap/edm-converters` with missing entity sets


## Version 1.8.2 - 2020-05-08
### Fixes
- An issue in `@sap/edm-converters` with missing entity sets


## Version 1.8.1 - 2020-05-08
### Fixed
- An issue in `@sap/edm-converters` with missing entity sets

## Version 1.8.0 - 2020-04-27

### Added

- `cds watch` now also accepts package names as arguments, e.g. `cds w @capire/bookshop`.
- `cds add mta` now supports cds configuration `requires.db.kind:"sql"` which allows seamless production deployments using HANA db while keepping sqlite for local development scenario.

### Changed
- Parameter `verbose` in `cds init` and `cds add` is now deprecated. Use environment variable `DEBUG=true` to obtain detailed output.
- `cds init` uses latest `Java archetype` version `1.4.0` for creating Java projects.
- Consume new `@sap/cds-sidecar-client` due to API change.

### Fixed
- Fixing terminology in `cds init` and `cds add` console output.
- `cds init` is logging `cds env` output only in debug mode.
- Using `cds build` command in generated `mta.yaml` file.
- Fixing Hana dependency during `cds init --add hana` for project type `java`.
- Fixing bug in `cds init` when `cds-dk` is not installed globally.

## Version 1.7.0 - 2020-03-24

### Added
- `cds init --add java` supports `--java:mvn` to add additional parameter.
- Improvements when logging console output during `cds init`.
- Link to Maven archetype documentation shown in `cds help init`.

### Changed
- `cds add mta` now activates the `production` profile when creating the `mta.yaml`, which is consistent with what the MTA build does.  This way, configuration like `"[production]: {"kind": "hana"}` gets activated automatically.


## Version 1.6.3 - 2020-03-05

### Changed

### Fixed
- Proper `npm-shrinkwrap.json`
- `cds init` is a bit more relaxed when checking for existing project content


## Version 1.6.0 - 2020-02-25
### Added
- `cds init --add java` now also works with `--hana`

### Changed
- `cds add mta` now creates resources for SAP HANA with an explicit service type `hana`.  If deploying to trial landscapes, this needs to be changed manually to `hanatrial`.

### Fixed
- `cds add mta` now creates valid configuration for `uaa` and `auditlog` resources.


## Version 1.5.0 - 2020-02-10

### Changed
- `cds init` only supports new syntax. See `cds init help` for more info.
- `cds init` now supports adding template `hana` to Java projects.

### Fixed
- `cds add mta` fixes an issue in created mta.yaml for nodejs projects if used in xmake environment.
- `cds add mta` fixes an build order issue in created mta.yaml for java projects. Now service module is built before db module.
- `cds init` does not create `package.json` in db folder.

### Added
- `cds init` adds `private: true` and `license: "UNLICENSED"` to newly generated projects.
- `cds init` adds a default `.hdiconfig` file when using template `hana`.
- `cds init` supports Java package name via `--java:package` parameter.
- `cds init` generates dependency entry for `@sap/hana-client` when using template `hana`.
- `cds init` uses latest `Java archetype` version `1.3.0` for creating Java projects.
- `cds init` now creates a `.cdsrc.json` file.

## Version 1.4.0 - 2019-12-12

### Added
- Abort installation with a hint if `@sap/cds` is installed globally.
- New project generation using `cds init`. See `cds help init` for details.
- `cds init --add java` now creates Java projects with Spring Boot support.
- `cds watch` now also watches `.properties` files

### Fixed
- Find locally installed modules like `passport`, so that `cds watch` and `cds run` behave symmetrically.

## Version 1.3.0 - 2019-11-19

### Fixed
- `cds import` no longer fails due to Windows paths.

### Also see
- Changes of `@sap/cds` 3.20.0
- Changes of `@sap/cds-sidecar-client` 1.1.2

## Version 1.2.0 - 2019-10-31

### Added
- Experimental support for cds init


## Version 1.1.3 - 2019-10-28

### Fixed
- `cds watch` now uses the same lookup paths for models as `cds run`

### Also see
- Changes of `@sap/cds` 3.18.3


## Version 1.1.0 - 2019-10-08

### Added
- Added dependencies to `express` and `sqlite3` to ease development

### Changed
- Improved `cds watch`

### Also see
- Changes of `@sap/cds` 3.18.0
- Changes of `@sap/edm-converters` 1.0.19
- Changes of `@sap/generator-cds` 2.8.3
- Changes of `@sap/cds-sidecar-client` 1.1.1


## Version 1.0.6 - 2019-09-25

### Changed

- Updated version of `@sap/cds` to `3.17.8`


## Version 1.0.5 - 2019-09-24

### Changed

- Updated version of `@sap/cds` to `3.17.7`


## Version 1.0.4 - 2019-09-23

### Changed

- Updated version of `@sap/cds` to `3.17.6`


## Version 1.0.3 - 2019-09-21

### Changed

- Updated version of `@sap/cds` to `3.17.5`


## Version 1.0.2 - 2019-09-19

### Changed

- Updated version of `@sap/cds` to `3.17.4`


## Version 1.0.1 - 2019-09-18

### Changed

- Updated version of `@sap/cds` to `3.17.2`


## Version 1.0.0 - 2019-09-10

### Added

- Initial implementation
- cds watch
- cds import
