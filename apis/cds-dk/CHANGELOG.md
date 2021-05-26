# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 4.1.5 - 2021-05-21

### Fixed

- An issue with opening URLs on Windows
- `cds` CLI no longer adds `cds.compile.to.openapi` generically into all commands.  This turned out to load cds configuration from wrong folders, introducing subtle side effects.  Now, only the `cds compile` command adds `cds.compile.to.openapi`.  If you use `cds.compile.to.openapi` in other flows, like at runtime, please use `cds compile --to openapi` instead.
- Include `@sap/cds` 5.1.5
- Include `@sap/cds-runtime` 3.1.1
- Include `@sap/cds-compiler` 2.2.8
- Include `@sap/eslint-plugin-cds` 1.1.4

## Version 4.1.4 - 2021-05-12

### Fixed

- Include `@sap/cds` 5.1.4
- Include `@sap/cds-compiler` 2.2.6
- Include `@sap/eslint-plugin-cds` 1.1.3

## Version 4.1.3 - 2021-05-12

### Fixed

- Include `@sap/cds` 5.1.3

## Version 4.1.2 - 2021-05-12

### Fixed

- Include `@sap/cds` 5.1.2

## Version 4.1.1 - 2021-05-07

### Fixed

- Include `@sap/cds` 5.1.1

## Version 4.1.0 - 2021-05-06

### Added

- `cds watch --open` opens the app in the browser with a given URL (part)

### Changed

- If `cds watch` encounters a port that is already in use, it now just runs on an arbitrary port instead of a trying to search the next port available.
- `cds init` uses latest `Maven Java archetype` version `1.15.3` for creating Java projects.

### Fixed

- `cds compile --to hdbtable, hdbcds` no longer creates duplicate file extensions.

## Version 4.0.7 - 2021-04-16

### Changed

- Bumped versions of `@sap/cds`, `@sap/cds-compiler`

### Fixed

- Lookup for `eslint` during `cds add lint`

## Version 4.0.6 - 2021-04-15

### Changed

- Bumped versions of `@sap/cds`, `@sap/cds-runtime`, `@sap/cds-compiler`


## Version 4.0.5 - 2021-04-12

### Changed

- Bumped version of `@sap/eslint-plugin-cds`

## Version 4.0.4 - 2021-04-12

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.15.0` for creating Java projects.


## Version 4.0.3 - 2021-04-07

### Changed

- `cds compile --to xsuaa`, `edmx-v2`, and `edmx-v4` have moved from `@sap/cds` to `@sap/cds-dk`.

### Fixed

- `cds init` now works if started in file paths with spaces

## Version 4.0.2 - 2021-04-01

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.14.3` for creating Java projects.
- `npm-shrinkwrap.json` format version 2 is now used, produced by `npm` 7
- `npm-shrinkwrap.json` now contains integrity hashes

### Fixed

- Allow blanks in cds-dk installation path when running `cds init`.

## Version 4.0.1 - 2021-03-24

### Fixed

- Many things in linter

## Version 4.0.0 - 2021-03-19

### Added

- `cds watch` is now a [live reload](https://www.npmjs.com/package/livereload-js) server, allowing for automatic page refreshes in browsers whenever a file has changed.

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.14.0` for creating Java projects.
- `cds watch` has dropped its fallback support for `nodemon` through the `CDS_USE_NODEMON` configuration.
- `cds add hana` now sets `hdbtable` as deployment format for SAP HANA

### Fixed

- `cds watch` no longer runs in an endless restart loop if started in the user's home dir.

## Version 3.5.1 - 2021-03-12

### Changed

- Bump version of `@sap/cds` to 4.6.5

## Version 3.5.0 - 2021-03-01

### Changed
- `cds init` creates projects with latest version of `sqlite3` again.
- `cds add mta` now creates a mta.yaml file that correctly handles spring boot .jar and .war archives.

### Fixed

- `cds env` does not longer fail with an exception for unknown commands

## Version 3.4.2 - 2021-02-19

### Fixes

- `cds init` now refers to the latest HDI deployer which supports Node.js 14

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.13.1` for creating Java projects.
- Bump version of `@sap/cds` to 4.5.3

## Version 3.4.1 - 2021-02-17

### Changed

- Bump version of `@sap/cds` to 4.5.2
- Bump version of `@sap/cds-runtime` to 2.8.6
- Bump version of `@sap/cds-compiler` to 1.49.2

### Fixed

- `cds watch` now shuts down its child process properly, so that `EADDRINUSE` errors in Business Application Studio are gone

## Version 3.4.0 - 2021-02-02
### Changed
- `cds init` uses latest `Maven Java archetype` version `1.12.1` for creating Java projects.
- `cds init` allows `_` in project name and leaves conversion to `Maven Java archetype`.
- `cds init --add notebook` and `cds add notebook` now use a Python venv and offer a default Jupyter Notebook viewer.
- [beta] Multi-target Node.js applications can now be initialized with multitenancy support by running `cds init --add mta,mtx`.

## Version 3.3.5 - 2021-01-20

### Changed

- Bump versions of `@sap/cds`

## Version 3.3.4 - 2021-01-12

### Changed

- Bump versions of `@sap/cds` and `axios`

## Version 3.3.3 - 2020-12-18

### Changed

- Bump versions of `@sap/cds`, `@sap/cds-runtime`, and `@sap/cds-sidecar-client`

## Version 3.3.2 - 2020-12-07

### Changed

- Bump version of `@sap/cds` to 4.4.5

## Version 3.3.1 - 2020-12-04

### Changed

- Bump version of `@sap/cds` to 4.4.4 and `@sap/cds-runtime` to `2.7.5`

## Version 3.3.0 - 2020-12-02

### Added

- `cds init` and `cds add` now support the feature `notebook` to create a Jupyter Notebook in a project.
- `cds compile --to openapi` adds support for OpenAPI 3 to `cds compile`.
- If the server port is in use, `cds watch` offers to restart the server with a new port.
- `cds init` uses latest `Maven Java archetype` version `1.11.0` for creating Java projects.
- `cds init --add pipeline` and `cds add pipeline` will now use the general purpose pipeline of project "Piper".
- `cds login`, `cds extend` and `cds activate` now also support clientid/clientsecret as parameters. This is needed when extending multitenant
applications provided as as reusable services
(see [CP documentation](https://controlcenter.ondemand.com/index.html#/knowledge_center/articles/2316430f7d804820934910db736cefbf)).
- `cds init --add mta` and `cds add mta` now always set the `cloud` Spring profile for Java apps. Before, it was only set if a binding to an SAP HANA service was present.

### Changed

- `cds add cf-manifest` now adds a dependency to the `java_buildpack`.
- `sqlite3` is now an optional dependency to `cds-dk`.  This means that an installation failure of `sqlite3`, e.g. in environments w/o Internet connectivity, no longer leads to an overall installation error.  This behavior suits Java applications, as these usually don't need an SQLite database.  Node.js applications still require a proper installation of `sqlite3` if they use this database.

### Fixed

- `cds add cf-manifest` now only adds db-deployer module if HANA service binding exists.
- `cds init --add hana` now adds `requires.db.kind: "sql"` to cds configuration for Node.js and Java
- `cds watch` no longer fails in SAP Business Application Studio when trying to find `sqlite3`.  `cds deploy --to sqlite` still has that issue, which is to be solved in a future version.
- `cds deploy --to hana` now prefers to use an app-local install of `@sap/cds`, much like other `cds` commands

## Version 3.2.1 - 2020-11-20

### Fixed

- `cds import` no longer creates `.csn` files with invalid `kind:ComplexType` fields

## Version 3.2.0 - 2020-11-03

### Added

- `cds watch` now allows to set the `--in-memory` flag that is passed to `serve`.

### Changed

- `@sap/cds-dk` is again shrinkwrapped, so that builds get reproducible again
- All `cds` commands now prefer a local installation of `@sap/cds`.  This enables applications better control over the version of `@sap/cds`.
- `cds add cf-manifest` generates the service application with the `random-route: true` flag, which avoids route clashes on CF during development.

### Fixed

- `cds run` finds its `express` module again in the case where no `express` is installed in the application.
- `cds env` now also displays properties that have a value `false` or `''`.
- Leading flags in `cds` CLI work again, like `cds --to sql my.cds`
- `cds compile --to` w/o an argument now fails with a better message

### Removed


## Version 3.1.4 - 2020-10-27

### Fixed

- `cds run` finds the `sqlite3` module again if `cds` is used from a globally installed `@sap/cds-dk`.


## Version 3.1.3 - 2020-10-26

### Fixed

- `cds run` finds the `express` package again in the case where no `express` is installed in the application's `node_modules`.


## Version 3.1.2 - 2020-10-16

### Changed
- `cds init` uses latest `Maven Java archetype` version `1.10.0` for creating Java projects.

### Fixed
- `cds deploy --to sqlite` finds the `sqlite3` module again if `cds` is used from a globally installed `@sap/cds-dk`.


## Version 3.1.1 - 2020-10-07

### Added
- `cds compile --locations` preserves `$location` properties in CSN outputs.

### Changed
- `cds compile` prints a better legible JSON output to terminals
- `cds compile -p` is no longer a shortcut for `--parse`, to allow `--parse ...more-args` to work.
- `cds compile -f` is no longer a shortcut for `--from` (which is not implemented), but for `--flavor`.

### Fixed
- `cds deploy --to sqlite` now writes `requires.db.model` in `package.json` such that `cds.connect.to.('db')` works w/o further `model` options.
- `cds deploy --to sqlite` with `@sap/cds` 4.2 no longer crashes due to a wrong import

## Version 3.1.0 - 2020-09-30

### Added
- `cds compile` now supports option `flavor` with values: `files` | `sources` | `parsed` | `xtended` | `inferred`.
  + `cds compile --files` maps to `--flavor files`.
  + `cds compile --sources` maps to `--flavor sources`.
  + `cds compile --parse` maps to `--flavor parsed`.
  + `cds compile` maps to `--flavor inferred`.
- `cds add cf-manifest` creates manifest.yml and services-manifest.yml allowing for Cloud Foundry native deployment.
- `cds init` now supports type `nodejs` to create a Node.js based project. This is the default and can be omitted.
- `cds watch`: enter `debug` or `debug-brk` to restart process in debug mode.  Other commands are `ps` and `rs`.

### Changed
- `@sap/cds-dk` is no longer shrinkwrapped, so that new versions from underlying `@sap` packages (like `@sap/cds`) are available w/o a new cds-dk version
- `cds init` uses latest `Maven Java archetype` version `1.9.0` for creating Java projects.

### Fixed
- `cds watch` now passes all environment variables to the spawned sub processes, enabling for example, `cds watch --production`
- `cds init` modifies artifact id and Java package name for Java projects to be standard conform.
- `cds` fails with a better error message for misspelled commands


## Version 3.0.0 - 2020-08-31

### Changed
- `cds watch` now uses version 5 of `sqlite3`
- `cds watch` does not use `nodemon` anymore.
  > You can continue using `cds watch` with `nodemon` by installing `nodemon` globally and setting env variable `CDS_USE_NODEMON` to true.
- `cds add mta` for Java applications now determines app details like name, version etc. based on `pom.xml` and no longer from `package.json`.

### Fixed
- `cds add mta` now configures the Service Manager for SaaS applications. The Instance Manager is no longer used.
- `cds import` no longer writes an empty file if the source and the target edmx files are the same
- `cds import` yields better error messages if the input file does not exists or is invalid
- `cds import` no longer writes a Windows-specific path to `package.json`
- `cds init --add java` shows better error message if Maven is not installed.

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
- Fixing bug in `cds init` and `cds add` when using multiple features separated by comma.
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
- `cds add mta` now supports cds configuration `requires.db.kind:"sql"` which allows seamless production deployments using HANA db while keeping sqlite for local development scenario.

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
