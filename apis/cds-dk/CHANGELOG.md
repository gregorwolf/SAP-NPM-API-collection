# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 4.9.7 - 2022-06-08

### Changed

- Update `@sap/xsenv` to 3.3.1

## Version 4.9.6 - 2022-06-08

### Changed

- Include `@sap/cds` 5.9.6

### Fixed

- `cds login` (and `cds extend`, `cds activate` if previously logged in) now properly renew token URL
- Improved logging during those commands

## Version 4.9.5 - 2022-05-17

### Changed

- Include `@sap/cds` 5.9.5
- Include `@sap/cds-compiler` 2.15.2

### Fixed

- `cds init` uses latest Maven Java archetype version 1.24.0 for creating Java projects.

## Version 4.9.4 - 2022-05-09

### Changed

- Include `@sap/cds` 5.9.4
- Bump `axios` to latest (CVE-2022-1214)

## Version 4.9.3 - 2022-04-27

### Changed

- `cds init` uses latest Maven Java archetype version 1.23.1 for creating Java projects.
- Include `@sap/cds` 5.9.3

### Fixed

- `cds add cf-manifest` now uses the correct `application` plan for the `xsuaa` service
- `cds login`, `cds activate`: correctly include response in auth errors
- The SAP HANA and MTA options in the project wizard in BAS now work again

## Version 4.9.2 - 2022-04-11

### Changed

- Include `moment` 2.29.2, fixing CVE-2022-24785
- Include `@sap/cds` 5.9.2
- Include `@sap/eslint-plugin` 2.3.5

## Version 4.9.1 - 2022-04-01

### Changed

- `cds init` uses latest Maven Java archetype version 1.23.0 for creating Java projects.
- Include `@sap/cds` 5.9.1
- Include `@sap/cds-compiler` 2.13.8
- Include `@sap/eslint-plugin` 2.3.4

## Version 4.9.0 - 2022-03-28

### Added

- `cds parse` as convenient shortcut to `cds compile --flavor parsed`.
- `cds compile --to openapi` uses value of annotation `@Common.Label` on entities, actions, and functions for operation tags, diagram includes non-primitive action and function import parameters.
- `cds add` now accepts `--for <profile>` argument to create Node,js project configuration for a given profile
- `cds add approuter` allows for serving your application’s UI using SAP approuter.
- `cds add kibana-logging` adds Kibana-friendly logging in a more convenient way than having to manually alter the package.json.

### Changed

- `cds init` does not create `VS Code` file exclusions anymore, so that `.vscode/` and `.gitignore` are visible by default, allowing easier editing of these files.
- `cds init` reports Maven archetype version in console if called with `--add java`.
- `cds init` uses latest Maven Java archetype version 1.22.2 for creating Java projects.
- `cds import` modified documentation for namespace option.
- `cds import` does not create bound function imports key parameters in CSN for OData V2.
- `cds import` now when `--keep-namespace` option is not given validates the file name and then converts it to complier supported format as service name .
- add new methods from `FsUtil` to typescript interface.

### Fixed
- `cds compile --to openapi` now correctly treats `null` and the empty string as function parameters.
- `cds bind --exec` no command output (STDOUT) displayed on Windows.
- `cds watch` now gracefully shuts down the live reload server before exiting
- `cds import` now generates correct csn for both OData V2 and V4 EDMX files where the EntityType has a BaseType entry.
- `cds import` now throws an error in case of missing Association Sets.
- `cds import` bug fixed for `--force` flag. Now overwrites the correct file content.
- `cds import` fix will no longer capture unwanted annotations in the CSN for OData V4.
- `cds import` now support annotations for properties of type `Type Definition`
- `cds import` fix for supporting valid datatypes in unbounded function imports for OData V4.
- `cds import` bug fixed for missing data imports for parameters with entity type not mapped to an entity set.
- `cds import` now supports properties with complex type for OData V4.
- `cds import` fix will now throw error if the key property of an entity is of type `Collection` for both OData V2 and V4 edmx.
- `cds bind --to hana` provides more comprehensive error message in case Cloud Foundry `org` or `space` are not set.

## Version 4.8.2 - 2022-03-07

### Fixed

- `cds import` can now capture the data for any given `EntityContainer Name` for OData V4. Earlier it only worked when the name was `EntityContainer`.

### Changed

- `cds init` uses latest Maven Java archetype version 1.22.1 for creating Java projects.

## Version 4.8.1 - 2022-02-15

### Changed

- `cds init` uses latest Maven Java archetype version `1.22.0` for creating Java projects.

### Fixed

- Bump `follow-redirects` package to 1.14.8 (CVE-2022-0536)
- `cds bind --exec` no command output (STDOUT) displayed on Windows.

## Version 4.8.0 - 2022-01-28

### Added

- `cds import` now reflects the entity set and entity container level annotations in the csn.
- `cds activate --sync` allows to use the synchronous server API for extension upload.

### Changed

- The forked package `@mendix/sqlite3` is now used instead of `sqlite3` to overcome CVE-2021-32804.  No code changes in applications are needed, as the new package installed by `npm` with the same name `sqlite3`.
- [beta] The templating for `cds init` and `cds add` has been rewritten from scratch. This will allow for some new, more complex commands, such as `cds add mtx` or `cds add xsuaa`.
- Use `cds bind` during `cds deploy` to store connection information in file `.cdsrc-private.json`.

### Fixed

- `cds import` now omits function imports with `put/delete` kind.
- `cds import` has fixed the entity type to entity set mapping in OData V2.
- `cds import` now supports collection type.
- `cds watch` now picks a free livereload port if the standard port 35729 is already bound
- `cds extend`, `cds activate`, `cds login`, and `cds logout` now prioritize command-line options over saved settings
- MTX client now logs fewer characters of secrets in debug output
- MTX client now handles incomplete error responses better

## Version 4.7.3 - 2022-01-14

### Changed

- Bump `follow-redirects` package to 1.14.7 (CVE-2022-0155)

## Version 4.7.2 - 2021-12-15

### Fixed

- `cds add lint` uses JSONC parser to read ESLint config files of type `.eslintrc[.js,.cjs,.json]`.

### Changed

- `cds init` uses latest Maven Java archetype version `1.21.0` for creating Java projects.

## Version 4.7.1 - 2021-12-06

### Fixed

- `cds activate` authentication no longer fails
- `cds.compile.to.openapi` does no longer crash if `cds.compile` was already initialized

## Version 4.7.0 - 2021-12-06

### Added

- `cds add data --for` can be passed a regular expression, allowing more flexible name filters.  For example `--for '^Supplier$'` would only match entity `Supplier`, but not `SupplierAddress`.  Note that as before, `--for Supplier` is interpreted as `--for '^Supplier.*'`, i.e. matches both entities.
- `cds init --add hana` and `cds add hana` now add a `undeploy.json` file containing wildcards. This ensures that SAP HANA artefacts are automatically cleaned-up in case views, unique keys or constraint definitions of associations have been changed in CDS model.

### Changed

- `cds import` now adds annotations for missing ON conditions in associations instead of appending it in `doc`.
- `cds import` has updated mapping for OData V2 and V4
- `cds add lint` now configures `csv` files in `.vscode/settings.json`
- `cds add hana` for Java projects now adds an `engines.node` version of `^16` to the generated `db/package.json`, to pin the Node.js version.  This will help in the future when runtime environments change their default to some version higher than the one supported by `@sap/hdi-deploy`.
- `cds add mta` for Node.js projects now adds `npm ci` commands instead of `npm install`.  This makes use of `package-lock.json` to enforce reproducible builds.
- `cds watch` now ignores folders named `target`, to avoid restarts when Maven's build output changes

### Fixed

- `cds import` throws warning messages for unsupported data types.
- `cds watch` allows the explicit `--with-mocks` option, although this is anyways included by default
- `cds watch` no longer runs into multiple restarts if many files are changed at once, like in git branch changes

## Version 4.6.4 - 2021-11-24

### Fixed

- `cds import` fix for TypeError issue during OData V2 EDMX conversion to CSN.
- `cds import <file_name>` fix now updates the service name in the `package.json` with only the file name. Earlier, the service name sometimes used to be of the form `A.B`, with `A` being file name and `B` being a part of the schema namespace value in the EDMX file

### Changed

- `cds init` uses latest Maven Java archetype version `1.20.3` for creating Java projects.

## Version 4.6.3 - 2021-11-16

### Fixed

- `cds watch` recovers again from compilation errors and properly prints these
- `cds import` fix for omitting empty `doc` components.
- `cds add lint` no longer duplicates initial contents in `package.json`
- `cds add data` no longer ignores imported services for which credentials are stored in the project

## Version 4.6.2 - 2021-11-09

### Fixed

- `cds add lint` now correctly detects missing local `eslint`
- `cds add lint` no longer removes parts of `package.json`
- `cds add lint` no longer creates duplicate configuration entries

## Version 4.6.1 - 2021-11-08

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.20.0` for creating Java projects.
- `cds watch` now resolves local node modules like `hdb` even though `@sap/cds` is not installed locally.  This is useful during development where `@sap/cds` shall only be installed in a 'central' location, while extra modules shall still be found in the app's dir.

### Fixed

- `cds repl` now finds modules like `hdb` that are installed locally in the app folder
- `cds repl` now enables the `await` statement also on Windows
- `cds lint` now limits all file extensions to those allowed by the @sap/eslint-plugin-cds ESLint configuration

## Version 4.6.0 - 2021-11-02
### Added

- `cds bind` binds the given service to a hana instance by storing the credentials in `.cdsrc.json` in your user home directory [beta].
- `cds import` introduced option `--include-namespaces` which imports the custom defined namespaces.
- `cds import` preserve documentation in CSN file for actions and functions from OData V4 EDMX file.
- `cds import` now supports reading values of the `as` option from cds.env

### Fixed

- `cds import` fix for reflecting only supported datatypes in csn for actions and functions for OData V4.
- `cds import` fix for TypeError issue (#9868) during OData V4 EDMX conversion to CSN.
- `cds watch` no longer omits starting some services every other time it is restarting the process
- `cds-ts watch` now honors a local `tsconfig.json` file
- `cds import` fix for TypeError issue (#9950) during OData V2 EDMX conversion to CSN.
- `cds import` fix to generate the csn (#9950) during OData V2 EDMX conversion to CSN.
- `cds import` fix to replace the aliases with original schema namespace value.
- `cds import` adds `@cds.persistence.skip` back to imported models.  Its accidental removal in 4.5.0 caused wrong DB deployments of imported entities.

## Version 4.5.4 - 2021-10-07

### Fixed

- `cds watch` no longer fails if started with `--ext`, `--livereload`, or `--open` arguments

## Version 4.5.3 - 2021-10-05

### Fixed

- `cds import` fix for `--dry` shortcut `-`
- `cds import` fix for missing type properties in csn for unbounded action and function in OData V4.
- A  bug with `cds init` when called in BAS project wizard

## Version 4.5.2 - 2021-09-30

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.19.0` for creating Java projects.

### Fixed

- `cds deploy --to sqlite` now writes `credentials.database` again to `package.json`

## Version 4.5.1 - 2021-09-29

### Added

- `cds import` introduced option `--as` which converts EDMX file to different file formats such as cds, csn and json.
- `cds import` introduced flag `--f` which forcefully overwrite the content of existing cds file when specified with `--as` option.

### Changed

- Marked `cds lint` as beta again to further investigate issues from 'extends' via prettier plugin.

## Version 4.5.0 - 2021-09-23

### Added

- `cds import` supports import of functions, action, functionimport and actionimport from both OData V2 and V4 EDMX files.

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.18.1` for creating Java projects.

### Fixed

- `cds watch` additional CLI args were not passed to launched process, for example, `--odata x4`.
- `cds import` fix for TypeError issue during OData V4 EDMX conversion to CSN.
- `cds import` fix for multi-line documentation text in OData V2 EDMX file.
- `cds import` fix for V4 CSN generation when non standard OData vocabularies are referred.
- `cds add data`
    + no longer fails for entities without keys
    + no longer creates csv files for synthetic draft entities
    + no longer creates entries for virtual fields
    + no longer skips over entities marked with `@cds.persistence.skip`, which is true for 'external' entities created by `cds import`.
- `cds init --add` handles comma list correctly.
- `cds import` fix for multi-line documentation text in OData V4 EDMX file.
- `cds import` fix preserves the missing entities in csn for OData V2 EDMX file.


## Version 4.4.2 - 2021-09-03

### Fixed

- Use latest `cds-sidecar-client` to fix file upload in `cds activate`

## Version 3.5.3 - 2021-08-31

### Fixed

- Use latest `cds-sidecar-client` to fix file upload in `cds activate`

## Version 4.4.1 - 2021-08-03

### Fixed

- Use `@sap/eslint-plugin-cds@2.0.4`

## Version 4.4.0 - 2021-08-02

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.17.0` for creating Java projects.

### Fixed

- Fixed bug when logging in Business Application Studio during `New Project from Template` wizard.
- `cds import` fix for <documentation> tag in Odata V2 for EntityType and ComplexType.
- `cds help` does not crash with `this.load is not a function` in exotic installations

## Version 4.3.3 - 2021-07-26

### Fixed

- Removed internal links in `npm-shrinkwrap.json`

## Version 4.3.2 - 2021-07-26

### Changed

- Bumped version of `@sap/cds` to 5.3.2

## Version 3.5.2 - 2021-07-21

### Changed

- Bump to latest versions
- Use latest `cds-sidecar-client` to fix CVE-2021-33502

## Version 4.3.1 - 2021-07-12

### Changed

- New version of `@sap/eslint-plugin-cds`

## Version 4.3.0 - 2021-07-08

### Changed

- `cds init` uses latest `Maven Java archetype` version `1.16.3` for creating Java projects.
- `cds init` generates dependency entry for `hdb` instead of `@sap/hana-client`.
- Reworked templates for cds linter.

### Added

- `cds import` now supports OData V4 edmx files.
- `cds-ts` executable starts `cds` CLI with [`ts-node`](https://www.npmjs.com/package/ts-node) to allow JIT compilation of Typescript
- `cds` CLI will give you a best guess if a command cannot be found, e.g. in case of a typing mistake.
- `cds.import` as API alternative to `cds import` command to convert edmx files to csn [beta]
- `cds.compile.to.openapi` as API alternative to `cds compile --to openapi` to convert CDS models to OpenAPI definitions

### Fixed

- `cds import` fix for <documentation> tag in Odata V2 and <Annotation> tag in Odata v4
- `cds import` now sets the `kind` attribute in package.json to the correct `odata-v2` value for OData v2 services.
- `cds import` now maps edm.DateTime to cds.DateTime for Odata V2.
- `cds compile --to edmx-v2/edmx-v4` now uses correct file naming when compiling a single CDS service.

## Version 4.2.1 - 2021-06-09

### Fixed

- `cds deploy` w/o any file arguments now works again and no longer fails with `No cds models found at/in ''`.


## Version 4.2.0 - 2021-06-07

### Added

- `cds add data` creates csv files with basic header lines for the entities in the project.  `--for` option allows for selecting individual entities or namespaces.

### Fixed

- `cds deploy` called with multiple sources ignored all but the first one
- `cdd add mta` now sets a buildpack for the server modules (Node.js or Java).  This improves deploy performance and avoids issues with buildpack priorities, leading to potentially wrong buildpacks selected.
- On drag and drop of an edmx file, `cds watch` now imports it in the proper working dir
- `cds import` now moves the edmx file again to `srv/external` instead of copying it.

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
