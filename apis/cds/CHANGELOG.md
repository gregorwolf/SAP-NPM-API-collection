# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](http://keepachangelog.com/).
- This project adheres to [Semantic Versioning](http://semver.org/).

# Version 3.34.2 - 2020-05-30

## Changed

- Use `cds.hana.deploy-format`=`hdbtable` instead of `cds.hana.syntax` to switch deployment from `hdbcds` to `hdbtable` for SAP HANA Cloud.
- `cds run` now supports relative `dataSource` URLs in SAP UI5 manifests again, so that UI5 apps can be served w/o approuter.  This support is only active in development mode.
- `cds deploy --to hana` changes kind to `hana` only if it is not already `sql`

## Fixed

- The `UI.Identification` annotation for `sap.common.CodeList` got a correct value, pointing to its `name` element.
- Configuration `requires.<foo>.credentials.destination` is now preserved again when running with `VCAP_SERVICES`.  In version 3.34.1 it was cleared.
- Entities annotated with `@cds.persistence.skip:if-unused` (like `sap.common.Languages`) now again are skipped when compiling to HANA output.  This got broken in previous versions when using the new compiler APIs.
- `sql_mapping` is again written to `csn.json` as it's required by classic Java runtime.
- `default-env.json` is now read even in production, which is in line with the behavior of other modules that honor this file.  Real prod environments like CF will still overwrite these defaults.

# Version 3.34.0 - 2020-04-27

## Added

- `cds version` option `-ls` prints an `npm ls` subtree.
- `cds serve` / `run` now also accept package names as arguments, e.g. `cds serve --project @capire/bookshop`.
- `cds compile` option `--parse` provides minimal, parsed-only CSN output.
- New Node.js method `cds.compile.cdl()` allows compiling CDS sources in-process.
- `cds build` now supports cds configuration `requires.db.kind:"sql"` which allows seamless production deployments using HANA db and development deployments using sqlite db.
- Default maximum query size limit of 1000 (overridable via `@cds.query.limit.max`).
- Improved error message during `cds deploy` on Windows when `SAP CommonCryptoLib` is missing.
- `cds build` now checks that `entity-whitelist` and `service-whitelist` have been defined for SaaS applications - a warning is reported otherwise. `cds build` will fail if invalid entries exist.
- Parameter `--vcap-file` lets `cds deploy --to hana` use an existing `default-env.json` file for the deployment credentials, instead of always creating new credentials from Cloud Foundry. Note that this is a beta feature.
- `cds build --log-level` allows to choose which messages to see, default log level is `warn`.
- Labels of `@sap/cds/common` texts are now available in many languages

## Changed

- Node.js method `cds.parse()` has been changed to now truely return parsed-only models, with extensions not applied yet.
**Note:** If you'need the former (erroneous) behaviour, please use `cds.compile.cdl` for that from now on.
- Node.js method `cds.get()` now returns parsed-only models; same as `cds.parse()`.
- `cds serve` / `run` / `watch` now reduce logging of details for the bound DB on connect, leading to less clutter.
- Precision for `validTo` and `validFrom` defined in the `temporal` aspect in `@sap/cds/common` changed from `DateTime` to `Timestamp`.
- Some administrative fields of SAP Fiori draft documents are now hidden on the UI.  The rest got labels.
- Renamed cds configuration setting `features.messageLevel` to `log-level` to be consistent with command line option, e.g. `cds build --log-level`.

## Fixed
- `cds build` - improvements in the area of error handling and error reporting.
- `cds env` and Node.js runtime now properly complete configuration like `requires.db.kind.sql` with VCAP_SERVICES, so that in `production` an SAP HANA service is bound.
- `cds build` now localizes edmx files properly if `cds.env.features.snapi` is turned on.
- `cds deploy --to hana` no longer crashes if called with `NODE_ENV=production`.

## Removed

# Version 3.33.1 - 2020-03-24

## Fixed
- `cds build` now correctly supports options.model definitions of type string
- Details navigation in Fiori preview works again since it's pinned to SAP UI5 1.73.  Actual cause still needs to be investigated.
- `cds deploy` now adds `@sap/hana-client` to package.json instead of `hdb`.
- `cds deploy` adds kind `sql` to requires section.

# Version 3.33.0 - 2020-03-19

## Added
- `cds deploy` uses information from existing `default-env.json`.

- `cds version` now also lists all dependencies of your local package.json and has an updated CLI commend help, documenting option `--all`.
- `cds compile` option `--docs` preserve contents of `/** ... */` doc comments in CSN output as well as in EDMX outputs (as _Core.Description_ annotations).
- `cds compile` option `--clean` tells the compiler to not add any derived information, but return a CSN which reflects only what was actually found in a `.cds` source.
- `cds serve` option `--watch` starts the specific serve command in nodemon watch mode
- Node.js: `cds.env` now supports camel case env variables as well as dot-notated keys in `.env`

## Changed

- Labels for the `createdAt` and `changedAt` in the `@sap/cds/common#managed` entity have been adjusted to reflect the SAP Fiori design guidelines.
- `cds build` now delegates to the modular build system by default (known as `cds build/all`). The modular build system is compatible, but supports additional features, e.g. staging build, SAP HANA Cloud Edition support, populating initial data from .csv by generating .hdbtabledata files, etc. The legacy build is still available as a fallback in case of issues - use setting `cds.features.build.legacy: true` or ENV variable `CDS_FEATURES_BUILD_LEGACY=true`.

## Fixed

- `cds build` now correctly logs warnings returned by cds compiler. The message log level can be customized using cds configuration setting `cds.features.messageLevel` - default is `warn`.
- `cds.env.roots` now properly picks up a changed value of `cds.env.folders`
- `hdbtabledata` is no longer generated for entities that are marked with `@cds.persistence.skip`

## Removed


# Version 3.32.0 - 2020-03-06

## Fixed
- An issue where all Node.js runtime sessions where disconnected when one tenant offboarded.


# Version 3.31.2 - 2020-03-05

## Fixed
- `cds deploy` does not crash if _texts.csv is provided for skipped entities
- `cds serve foo.cds` does no longer load same model twice
- `cds compile --to edmx` no longer creates files with csn instead of edmx content in case no language bundles are found
- Both `cds env` and `cds compile` no longer write terminal escape sequences if only stdout is redirected, but not stderr.
- No longer enforce Node.js version 8 in `db/package.json`.  Cloud Foundry environment does not support it anymore, as this version is out of maintenance.


# Version 3.31.1 - 2020-02-26


## Fixed

- Removed `npm-shrinkwrap.json`


# Version 3.31.0 - 2020-02-25

## Added

Generation of `hdbtabledata` files now reports if CSV file names don't match entity names, and if header names don't match element names in an entity.  Watch out for such logs in case CSV files are not deployed to SAP HANA.

## Fixed

- `cds compile --to hdbtabledata` no longer crashes with `_texts.csv` files referring to a non-`localized` entity
- `cds build/all` adds `app` folder to the list of model folders for hana database builds. Draft tables are missing if the corresponding annotation model is missing.


# Version 3.30.0 - 2020-02-10

## Added

  - `cds compile --log-level` allows to choose which messages to see
  - `cds deploy --dry` prints DDL statements to stdout instead of executing them
  - `cds deploy --with-mocks` also adds tables for required services
  - `cds serve --mocked` allows mocking individual required services
  - ( &rarr; learn more about these things using `cds help ...` )
  - `cds.env` now also loads from `.env` files in properties format
  - [`cds.resolve/load('*')`](https://cap.cloud.sap/docs/node.js/api#cds-load) resolves or loads all models in a project including those for required services. It ist controlled and configurable through `cds.env.folders` and `.roots￼``. Try this in `cds repl` launched from your project root to see that in action:
    ```js
    cds.env.folders         // = folders db, srv, app by default
    cds.env.roots           // + schema and services in cwd
    cds.resolve('*',false)  // + models in cds.env.requires
    cds.resolve('*')        // > the resolved existing files
    ```

  - Added `cds.debug(<id>)` as a convenient helper for debug output controlled by `process.env.DEBUG`. For example, use it as follows:
    ```js
    const DEBUG = cds.debug('my-module')
    DEBUG && DEBUG ('my debug info:', foo, ...)
    ```
    ```sh
    > DEBUG=my-module cds run
    ```

  - Added `cds.error(<msg>)` as a convenient helper for throwing errors whose stack traces start from the actual point of invocation. For example, use it as follows:
    ```js
    const {error} = cds
    if (...) throw error `Something's wrong with ${whatever}`
    const foo = bar || error `Bar is missing!` // short circuit exits
    ```

## Changed

  This version brings a major refactoring and streamlining of service runtime implementations,
  which stays fully compatible regarding all documented APIs but in case you used internal
  not documented (non-)APIs, you should know these:

Removed undocumented features

  - Annotation `@source` from models loaded for runtime
  - Property `cds.serve.app` &rarr; use `cds.app` instead
  - Property `source` from CSN entity/view definition objects

> It's very unlikely that you ever used these undocumented internal features at all.
> In case you did, this should never have been done and you should fix that asap.


Deprecated features (&rarr; might get removed in upcoming versions)

  - Property `cds.session` &rarr; use `cds.db` instead
  - Property `cds.options` &rarr; use `cds.db.options` instead
  - Property `cds.unfold` &rarr; use `cds.compile` instead
  - Property `cds.config` &rarr; use `cds.env` instead

> These properties actually where duplicates to the mentioned alternatives.


`cds run` and `cds watch` have been re-implemented as convenience shortcuts to `cds serve`, which acts as the central orchestrator for bootstrapping now.   (&rarr; see `cds run ?` or `cds watch ?` to learn more)

`cds serve` now optionally bootstraps from project-local `./server.js` or  `./srv/server.js`, if exist, thus giving more control while still benefitting from `cds serve`'s intrinsic support for options like `--in-memory` or `--with-mocks`.

`cds serve` now uses `cds.load('*')` to load a single effective model once, assigned to `cds.model`, and reused for db as well as all provided and required services . As that avoids loading models redundantly, it drastically improves both, bootstrapping performance as well as memory consumption.

`cds deploy` does not (have to) register the default models to `package.json` anymore. For example, unlike before, `cds deploy -2 sqlite` will merely add an entry: `db:{kind:'sqlite'}`, without an additional `model` property anymore.

`cds deploy --to hana` does not create `connection.properties` file any longer, but only modify existing one

`modifiedAt` and `modifiedBy` from `@sap/cds/common`
   - Are now mutable for OData, i.e. no longer carry the `@Core.Immutable: true` annotation.
   - Are set by the Node.js runtime whenever the respective row was modified, i.e. also during `CREATE` operations.

Support for `cds init` is now moved to `@sap/cds-dk`.

## Fixed

 - There was a bug in that caused a service names `FooBarV2` to erroneously be mapped to mount point `/foo-barv2` instead of `/foo-bar-v2` as intended and was the case before. &rarr; in case you started a project in this interims phase and had a service name with that pattern you may encounter this fix as an incompatible change, but it's actually reverting to the former compatible way.

 - `cds.env` erroneously overrode profiled entries depending on properties order

 - Fiori preview now uses latest version of SAP UI5 again

 - `cds deploy` verifies returned service key to ensure target service is not of type `managed`.




# Version 3.21.3 - 2020-02-05
## Fixed
- Fiori preview no longer catches service URLs with an arbitrary prefix (e.g. `/foo/browse` instead of just `/browse`).


# Version 3.21.1 - 2020-01-07
## Fixed
- Fiori preview no longer crashes since it's pinned to SAP UI5 1.72.3.  Actual cause still needs to be investigated.

## Version 3.21.0 - 2019-12-11

- `cds add`, `import`, and `watch` now print installation hints if `@sap/cds-dk` is not installed

- Experimental option `hana.syntax=hdi` to create `hdbtable` files instead of `hdbcds`.  May still change!


## Changed

- In development mode, the `mock` authorization strategy is automatically activated with two fake users `alice` and `bob`, which allows for out-of-the-box testing of `@requires` annotations. This means that, unlike before, the `JWT` authorization strategy needs to be activated explicitly (through `{auth: { passport: { strategy: 'mock' }}}`.  In production, no change is required.

- You might see a `MODULE_NOT_FOUND` error for `@sap/xsenv` in case you use the `JWT` strategy but have not bound any xsuaa service.  In this case either bind such a service instance, add the `@sap/xsenv` dependency, or use a different strategy like `mock`.  The trigger of this error is `@sap/xssec` 2.2.4 no longer requiring `@sap/xsenv`.

- Renovated and streamlined `cds init`. It prints a hint now if it's called with old-style parameters, as well as that it wants to be used from `@sap/cds-dk`. Check out `cds help init` for more.

- Removed the experimental `--args` parameter of `cds compile`.  This turned out to be cumbersome to use in shells. Replacement is the standard configuration mechanism, e.g. use an environment variable `CDS_FOO_BAR` to activate option `cds.foo.bar`.

## Fixed
- `SELECT.one/distinct(Fool,[...])` failed when passing an array for columns as argument two



# Version 3.20.1 - 2019-11-26
## Fixed
- Fix 'duplicate versions' errors by loading `@sap/cds` again from the current project if possible.

# Version 3.20.0 - 2019-11-19

## Added
- Mention xsuaa in help of `cds compile`

## Fixed
- Typings for `UPDATE` function no longer contain duplicates.

## Also see
- Changes of `@sap/cds-compiler` 1.20.3
- Changes of `@sap/cds-ql` 1.21.0
- Changes of `@sap/cds-services` 1.21.0
- Changes of `@sap/cds-messaging` 1.4.0
- Changes of `@sap/generator-cds` 2.10.2



# Version 3.18.4 - 2019-11-15

## Fixed
- `.cfignore` files now get created by `cds build/all` to improve the overall deployment turnaround
  of `cf push`.  Also, this avoids failures of CF node.js buildpack trying to rebuild sqlite binaries.
- Generated `manifest.yaml` files for Cloud Foundry now contain a `path` attribute that allows
  pushing from an outside folder.  Also, they specify reduced memory requirements.
- Generated `manifest.yaml` for HDI deployer does not create a route, and specifies a valid `health-check-type`.
- `cds deploy --to hana` now also includes models in the `srv` folder.
- `cds deploy` no longer writes model folders to `package.json` that do not exist.


# Version 3.19.0 - 2019-10-31

## Added
- Deployments for sqlite and SAP HANA now find CSV files in the form `_texts_LOCALE.csv`,
  like `Books_texts_fr.csv`.  This file layout allows splitting translated texts into one file
  per language.
- Deployment for sqlite now also imports initial data from JSON files
- `cds version` has learned about `@sap/cds-dk`

## Fixed
- `cds watch --help` works again, if used from `@sap/cds-dk`


# Version 3.18.3 - 2019-10-28
## Fixed
- Fixed a crash in `cds run --watch` with changing directories.
- `cds watch` is now also found if called from an NPM script.
- `cds watch` now uses the same lookup paths for models as `cds run`


# Version 3.18.1 - 2019-10-17
## Fixed
- Fixed a crash during sqlite deployment if there were csv files that did not match an entity name
- `cds deploy --to hana` now does a build for SAP HANA even if no matching build task is available.
- `cds deploy` now tries to add `.gitignore` entries only once
- In `@source` annotations of csn.json files generated for cloud deployments,
  now posix file paths (with `/`) are written, and no Windows paths.
- `cds serve` and `run` now shuts down gracefully in case of `SIGHUP` signals emitted by
  e.g. the VS Code terminal.
- `cds watch` now is found even if `@sap/cds-dk` is not installed locally.

## Also see
- Changes of `@sap/cds-ql` 1.19.2
- Changes of `@sap/cds-services` 1.19.1
- Changes of `@sap/cds-messaging` 1.2.1


# Version 3.18.0 - 2019-10-09

## Added
- Compiler options for SAP HANA backend can now be set in configuration in the `cdsc.toHana` block
  (e.g. `cds.cdsc.toHana.joins`)
- `service.tx()` as a shortcut for `service.transaction()`

## Fixed
- `cds deploy --to hana` now adds the tunnel address to the JDBC URL
- Boolean and number values from `default-env.json` now are accepted in configuration (`cds env`)
- For applications deployed to Cloud Foundry, custom handlers are now properly resolved using their names.
- `cds serve`/`run` now properly log `$batch` requests of OData

## Also see
- Changes of `@sap/cds-compiler` 1.19.1
- Changes of `@sap/cds-messaging` 1.2.0
- Changes of `@sap/cds-ql` 1.19.1
- Changes of `@sap/cds-reflect` 2.8.0
- Changes of `@sap/cds-rest` 1.2.0
- Changes of `@sap/cds-services` 1.19.0
- Changes of `@sap/generator-cds` 2.9.0


# Version 3.17.8 - 2019-09-25

## Fixed

- `UPDATE(entity, key)` statement


# Version 3.17.7 - 2019-09-24

## Fixed

- `cds deploy`


# Version 3.17.6 - 2019-09-23

## Changed

- Improved `cds env`


# Version 3.17.5 - 2019-09-20

## Fixed

- `cds deploy` did not work properly


# Version 3.17.4 - 2019-09-19

## Also see
- Changes of `@sap/cds-rest` 1.1.2


# Version 3.17.3 - 2019-09-19

## Fixed

- `cds deploy --to hana`


# Version 3.17.2 - 2019-09-19

## Also see
- Changes of `@sap/cds-services` 1.18.2
- Changes of `@sap/generator-cds` 2.8.2


# Version 3.17.1 - 2019-09-18

## Also see
- Changes of `@sap/cds-compiler` 1.18.2
- Changes of `@sap/cds-ql` 1.18.2
- Changes of `@sap/cds-services` 1.18.1


# Version 3.17.0 - 2019-09-10

## Added
- `cds run` has learned a new `--watch` option, which provides automatic restarts of the server on file changes.  [nodemon](https://www.npmjs.com/package/nodemon) package is required for this to work.

## Fixed
- `cds deploy` now writes `true` and `false` values in csv files as boolean to sqlite
- Console output of `cds run` now waits until the server is really up and running before it declares success.
- `cds deploy` and `build/all` do not write `hdbtabledata` files if some are already present.

## Also see
- Changes of `@sap/cds-compiler` 1.18.1
- Changes of `@sap/cds-ql` 1.18.1
- Changes of `@sap/cds-reflect` 2.7.1
- Changes of `@sap/cds-services` 1.18.0
- Changes of `@sap/generator-cds` 2.8.1



# Version 3.16.2 - 2019-08-27

## Also see
- Changes of `@sap/cds-compiler` 1.17.1



# Version 3.16.0 - 2019-08-22

## Added
- `cds run` has learned a new `--in-memory` option, which connects and deploys to an SQLite in-memory database. There is no need to call `cds deploy` before.
- `cds deploy --to hana` now can also be executed in Java projects
- `cds run`'s index.html got a favicon, to give a visual clue in browsers.
- `cds.requires.<datasource>.model` configuration can now also point to a node.js module, e.g. `@my/module`.
  Previously, only a relative file path was supported.
- Improved logging of query objects
- `cds compile` now understands `--to edmx-v2` and `--to edmx-v4` to produce OData metadata of versions 2 or 4, respectively.

## Changed
- Fiori preview in `cds run` now is only added if OData services are being served.
  For other protocols like `rest`, no Fiori preview is provided.  Same holds true for the `$metadata` link.
- `cds compile` now behaves better in non-TTY scenarios (e.g. when piping to files).  It writes a proper JSON
  string instead of a Javascript object.  Previously, one had to enforce JSON using the `--to json` processor.  Compare e.g. the output of `cds compile model.cds` to `cds compile model.cds > model.json`.

## Fixed
- Fiori preview in `cds run` now also works for services with namespaces
- In services of CF marketplace, `cds deploy --to hana` now only accepts services with plan `hdi-shared`.
  Previously, it could get confused with services of type `hana` but of other (non-HDI) plans.
- Localized edmx files are now produced also for i18n.json files.

## Also see
- Changes of `@sap/cds-compiler` 1.17.0
- Changes of `@sap/cds-ql` 1.17.0
- Changes of `@sap/cds-services` 1.17.0
- Changes of `@sap/generator-cds` 2.7.0



# Version 3.15.0 - 2019-07-26

## Added
- `hdbtabledata` files are now generated automatically as part of `cds deploy --to hana` for given set of CSV files.  CSV file names must follow the pattern `<namespace>-entity.csv` (same as for SQLite deployment) and be located in `db/csv` or `db/data`.
- For Node.js, multiple configuration profiles can now be activated at the same time, e.g. by setting both `NODE_ENV` and `CDS_ENV`, or by setting a multi-value list: `CDS_ENV=profile1,profile2`.
- New labels for `sap.common.*.code` and `sap.common.Currencies.symbol` (part of `@sap/cds/common`).
- Better message for `Duplicate definition` errors, where the same `cds` file is referenced from different locations.
  To fix this, check all dependencies to `@sap/cds` in your package.json and those of reused packages and ensure they allow deduped use of `@sap/cds`.

## Also see
- Changes of `@sap/cds-compiler` 1.16.1
- Changes of `@sap/cds-ql` 1.16.0
- Changes of `@sap/cds-services` 1.16.0
- Changes of `@sap/generator-cds` 2.6.1


# Version 3.14.0 - 2019-07-11

## Added
- Support for `SELECT.distinct.from(Foo)` and `SELECT.one.from(Foo)` queries in Node.js
- [Beta] `cds deploy --to hana` deploys to SAP HANA on Cloud Foundry
- For Node.js, `cds env` now activates the `development` profile automatically,
  unless `CDS_ENV` or `NODE_ENV` are set.  This is in line with `NODE_ENV` defaulting to `development`.

## Also see
- Changes of `@sap/cds-ql` 1.15.0
- Changes of `@sap/cds-services` 1.15.0
- Changes of `@sap/generator-cds` 2.5.0


# Version 3.13.0 - 2019-06-26

## Added
- `cds serve` now provides a preview of the services in a list page of SAP Fiori Elements

## Changed
- `cds serve` now yields an error if there are no services defined in the model

## Also see
- Changes of `@sap/cds-compiler` 1.15.0
- Changes of `@sap/cds-ql` 1.14.0
- Changes of `@sap/cds-services` 1.14.0
- Changes of `@sap/generator-cds` 2.4.11



# Version 3.12.0 - 2019-06-17

## Added
- On request, `cds build/all` now generates OData EDMX files for node.js services
- Performance optimizations for `cds build/all`

## Fixed
- `cds deploy` no longer fails if `data` dir is not present
- `cds build/all` no longer prints a message if `mta.yaml` does not exist


## Also see
- Changes of `@sap/cds-compiler` 1.14.1
- Changes of `@sap/cds-ql` 1.13.0
- Changes of `@sap/cds-services` 1.13.0


# Version 3.11.1 - 2019-06-03

## Fixed
- `cds deploy` honors saved datasource configuration again
- localization works again for sqlite datasources defined in `package.json`


# Version 3.11.0 - 2019-06-03

## Added

- `cds deploy` now also finds `.csv` files in imported reuse packages
- Better error messages for various `cds` CLI calls

## Changed
- `cds build/all` for Node.js projects generates proper CSN in `gen/csn.json`.
   A warning is emitted if `cds serve` is run with the previous format.  Rebuild the project if you see this warning.

## Also see
- Changes of `@sap/cds-compiler` 1.14.0
- Changes of `@sap/cds-ql` 1.12.0
- Changes of `@sap/cds-services` 1.12.0
- Changes of `@sap/generator-cds` 2.4.10

# Version 3.10.0 - 2019-05-21

## Added
- Tables and view for localized entities are created by default now, both for HANA and SQLite.
- Internal errors are now marked as such in all CLI commands, with a request to report them.

## Changed
- `cds compile --service all` no longer fails in case no services are found.
  This better matches higher level commands like `cds build` that should not fail in this instance.
  Note that `--service Foo` fails as before in case `Foo` is not found.
- `cds run` and `cds serve` now serve the generic index page at `/`, while previously this was `/$index`.
- `cds build/all` now auto-creates build tasks from `mta.yaml` definition if no build tasks have been
  defined in `.cdsrc.json`. If no `mta.yaml` file exists, cds configuration data respectively defaults
  are used for build task configuration.

## Fixed
- CLI now shows compilation warnings in all commands, e.g. in `build`, `deploy`, or `compile`.
  Previously warnings were only shown in case of compilation errors.
- `cds help` no longer inserts terminal escape sequences if stdout is redirected to a file.
- Errors in custom handlers are no longer shadowed in `cds serve` or `cds run`.

## Also see
- Changes of `@sap/cds-compiler` 1.13.4
- Changes of `@sap/cds-ql` 1.11.1
- Changes of `@sap/cds-reflect` 2.5.0
- Changes of `@sap/cds-services` 1.11.1
- Changes of `@sap/generator-cds` 2.4.8



# Version 3.9.0 - 2019-05-08

## Added
- `cds.serve` now reads passport for services from `auth.passport` configuration property

## Fixed
- `cds.compile` now really skips entities marked with `if-unused`
- Build tasks are now listed with `cds env`
- `cds serve` now supports the `--at`, `--to`, and `--with` arguments as specified.
- `cds deploy --to sqlite` now better handles csv files with empty values

## Also see
- Changes of `@sap/cds-compiler` 1.12.0
- Changes of `@sap/cds-ql` 1.10.2
- Changes of `@sap/cds-reflect` 2.5.0
- Changes of `@sap/cds-services` 1.10.2
- Changes of `@sap/generator-cds` 2.4.6



# Version 3.8.1 - 2019-04-30

## Fixed
- Texts in deep annotations, e.g. `@UI.Facet`, are now properly localized in OData metadata


# Version 3.8.0 - 2019-04-09

## Fixed
- Make tests run on Windows again
- Various fixes in `cds build/all`
- Adjustments to latest compiler for localizing models
- `.hdbcds` and `.hdbtabledata` files are now copied over in `cds build/all`

## Also see
- Changes of `@sap/cds-compiler` 1.11.0
- Changes of `@sap/cds-ql` 1.8.1
- Changes of `@sap/cds-services` 1.8.1
- Changes of `@sap/generator-cds` 2.4.4



# Version 3.7.1 - 2019-03-25

## Fixed
- `cds serve` now honors `newCsn` configuration when serving from precompiled csn.json files.
- `cds init` creates samples correctly when project already contains files.
- `cds build` for node.js projects will now show up compilation errors.  Formatting has been improved as well.
- Better support for finding `cds` executable in VSCode.


## Also see
- Changes of `@sap/cds-compiler` 1.10.0
- Changes of `@sap/cds-ql` 1.7.1
- Changes of `@sap/cds-services` 1.7.2
- Changes of `@sap/generator-cds` 2.4.4



# Version 3.6.0 - 2019-02-27

## Added
- In `cds init`:
  - Add modules via `cds init --modules` to an existing project.
  - Do not allow project creation via `cds init` outside of current working folder, e.g. init ../../some/where/else is not allowed.
  - No output at all (not even error messages) when using `cds init --quiet`.
  - Create a module folder using `cds init --modules...` even if it is empty based on the supplied options.
  - Parameter `--modules` only supports one folder of each type.
- Alpha support for `@cds.odata.valuelist`: Adding `@cds.odata.valuelist` to `@cds.autoexposed` entities will automatically equip all associations referring to such entities with a corresponding `@Common.ValueList.entity`

## Changed
- Simplified code lists: removed superfluous types `LanguageCode`, `CountryCode`, and `CurrencyCode` from `@sap/cds/common`
- `cds build/all` now does `--clean` by default and is less verbose in its output

## Fixed
- `cds.load` no longer fails if reading in a CSN file in version `0.1.0`

## Also see
- Changes of `@sap/cds-compiler` 1.9.0
- Changes of `@sap/cds-reflect` 2.4.0
- Changes of `@sap/cds-ql` 1.6.0
- Changes of `@sap/cds-services` 1.6.0
- Changes of `@sap/generator-cds` 2.4.0



# Version 3.5.2 - 2019-02-20

## Fixed
- Node.js projects created with `cds init` now
  - Bind the service module to an HDI service in `mta.yaml`.
  - Invoke CDS build when building the database module.
  - No longer create old-style `service` configuration in `package.json`.
- For datasources with kind `hana` we now also find `hanatrial` services in trial landscapes by matching their tag `hana`.



# Version 3.5.1 - 2019-02-14

## Fixed
- In `cds serve` service providers where added twice to the express app.  This is fixed.
- In the logs of `cds serve` false warnings on fiori requests are now gone.
- `cds serve` no longer fails on localization for unbound actions.
- The project template was fixed to properly wire up the connection to SAP HANA.

## Also see
- Changes of `@sap/cds-compiler` 1.8.1
- Changes of `@sap/cds-ql` 1.5.1
- Changes of `@sap/cds-services` 1.5.2
- Changes of `@sap/generator-cds` 2.3.7



# Version 3.5.0 - 2019-02-07

## Added
- `cds compile -2 xsuaa` now generates default values for `xsappname` and `tenant-mode`
- All commands now can be called with `--help`, where previously only `cds help <command>` was allowed.

## Changed
- The minimum required Node.js version is now set more specifically to _8.9_ LTS.  Previously, just Node.js 8 was mentioned.
- The `cds build/all` (experimental build command for Node.js) emits a warning for existing projects to add build task configuration.  Watch out for such a warning in the console and follow its instructions.

## Fixed
- Service handlers are now also found on CF if CDS models are served from a `csn.json` file instead as from `.cds` sources.
- An issue where projects w/o `db` dir could not be built using `cds build`.
- Unclear documentation of `cds deploy` on where it looks up the data source.
- `cds env` to load configuration profiles in lower-prio files (`.cdsrc.json`) with higher precedence than default configuration in higher-prio files (`package.json`).

## Also see
- Changes of `@sap/cds-compiler` 1.8.0
- Changes of `@sap/cds-reflect` 2.3.0
- Changes of `@sap/cds-ql` 1.5.0
- Changes of `@sap/cds-services` 1.5.0
- Changes of `@sap/generator-cds` 2.3.6


# Version 3.4.1 - 2019-01-24

## Fixed

- Restore cds-compiler `.version`

## Also see
- Changes of `@sap/cds-compiler` 1.7.1
- Changes of `@sap/cds-reflect` 2.2.1
- Changes of `@sap/cds-ql` 1.4.0
- Changes of `@sap/cds-services` 1.4.0
- Changes of `@sap/generator-cds` 2.2.0


# Version 3.4.0 - 2019-01-22

## Added

- `cds.env` supports loading from `default-env.json`
- Support base models for `cds compile -2 xsuaa`

## Also see
- Changes of `@sap/cds-compiler` 1.7.0
- Changes of `@sap/cds-reflect` 2.2.0
- Changes of `@sap/cds-ql` 1.4.0
- Changes of `@sap/cds-services` 1.4.0
- Changes of `@sap/generator-cds` 2.2.0


# Version 3.3.0 - 2019-01-11

## Also see
- Changes of `@sap/cds-compiler` 1.6.0
- Changes of `@sap/cds-reflect` 2.1.0
- Changes of `@sap/cds-ql` 1.3.0
- Changes of `@sap/cds-services` 1.3.0
- Changes of `@sap/generator-cds` 2.2.0


# Version 3.2.0 - 2018-12-21
## Changed
- cdsc 2sql output may also contain .types
- Add labels to CodeLists in common.cds
- Improved cds error messages

## Also see
- Changes of `@sap/cds-compiler` 1.6.0
- Changes of `@sap/cds-reflect` 2.1.0
- Changes of `@sap/cds-ql` 1.2.0
- Changes of `@sap/cds-services` 1.2.0
- Changes of `@sap/generator-cds` 2.2.0


# Version 3.1.1 - 2018-12-13
## Changed
- Better console output from cds compile

## Fixed
- cds.compile ignored configured odata.version

## Also see
- Changes of `@sap/cds-compiler` 1.6.0
- Changes of `@sap/cds-reflect` 2.1.0
- Changes of `@sap/cds-ql` 1.1.0
- Changes of `@sap/cds-services` 1.1.0
- Changes of `@sap/generator-cds` 2.2.0


# Version 3.0.0
## Changed
- Reworked configuration options to center around required 'data sources'.
  - As an example see the snippted that e.g. `cds deploy --to sqlite:my.db` generates into `package.json`.
  - The former `cds` options from `package.json` are deprectated but still supported.
- Clean up of many Node.js APIs, mainly for `cds.serve` and `cds.connect`.  See the [Javacript APIs documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/a131984aefe94ff884e6b6819ee76bd9.html) for details.
- Node.js 8 is now the minimum required runtime version.
- Simplified `cds init`.  By default it creates a plain project suitable for local CDS development.

## Added
- `cds env` allows for inspecting the effective configuration

## Also see
- Changes of `@sap/cds-compiler` 1.5.0
- Changes of `@sap/cds-reflect` 2.0.0
- Changes of `@sap/cds-ql` 1.0.0
- Changes of `@sap/cds-services` 1.0.0
- Changes of `@sap/generator-cds` 2.0.0


# Version 2.11.2
## Fixes
- During `cds init/new` only install `@sap/generator-cds` 1.x


# Version 2.11.0
## Added
- Reuse aspect `cuid` to `@sap/cds/common`
- Support for smart to-many Associations finding backlinks automatically (&rarr;not for production!)
- Support to fill DBs with initial data from CSV files (fetched from folder `db/csv/`)
- New CLI command `cds run` - today a mere wrapper for `cds serve all` but meant to serve microservice test scenarios
- `cds deploy` can be configured not to modify `package.json` through the `--no-save` option.

## Also see
- Changes of `@sap/cds-compiler` 1.2.0
- Changes of `@sap/cds-reflect` 1.8.0
- Changes of `@sap/cds-ql` 0.12.0
- Changes of `@sap/cds-services` 0.12.0


# Version 2.10.3
## Fixes
- During `cds init/new` only install `@sap/generator-cds` 1.x


# Version 2.10.0
## Added
- Support for Fiori Draft

## Fixes
- Enhanced server.js to also include links to entities

## Also see
- Changes of `@sap/cds-compiler` 1.1.3
- Changes of `@sap/cds-reflect` 1.7.0
- Changes of `@sap/cds-ql` 0.11.0
- Changes of `@sap/cds-services` 0.11.0


# Version 2.9.1
## Fixes
- `cds build` no longer blocks if running inside a Maven build.


# Version 2.9.0
## Added
- `common.cds` model got annotations for title, description, and value lists.
- `cds` executable now can read from stdin, e.g. `echo 'entity Foo {ID:UUID;}' | cds -2 sql`
- `cds -2 sql` now outputs plain (non-HANA) SQL.  Use `-2 hana` for HANA SQL.
- `cds config` shows the current CDS configuration.  Use `cds help config` to learn more.

## Fixes
- Entities from `common.cds` like `Languages`, `Countries`, and `Currencies` are now only persisted to the database if they are actually used.

## Also see
- Changes of `@sap/cds-compiler` 1.1.2
- Changes of `@sap/cds-reflect` 1.6.0
- Changes of `@sap/cds-ql` 0.10.0
- Changes of `@sap/cds-services` 0.10.1


# Version 2.8.0
## Added
- Support was added to build node.js service modules
- `cds init` has been reimplemented with a better commandline experience, along with updated templates.  Plugin `@sap/generator-cds`, which is required for `cds init`, is now automatically installed when `init` is called for the first time.  `cds new` is still available and is now just a synonym for `init`.

## Also see
- Changes of `@sap/cds-compiler` 1.1.1
- Changes of `@sap/cds-services` 0.9.0
- Changes of `@sap/cds-ql` 0.9.0


# Version 2.7.0
## Also see
- Changes of `@sap/cds-compiler` 1.0.32
- Changes of `@sap/cds-services` 0.8.1
- Changes of `@sap/cds-ql` 0.8.1


# Version 2.6.0
## Also see
- Changes of `@sap/cds-compiler` 1.0.31
- Changes of `@sap/cds-services` 0.7.0
- Changes of `@sap/cds-ql` 0.7.0


# Version 2.5.1
## Also see
- Changes of `@sap/cds-services` 0.6.0
- Changes of `@sap/cds-ql` 0.6.0


# Version 2.5.0
## Added
- Instead of compiling each `.cds` service file separately, `cds build` now combines all those files from the same folder, creating only one `csn.json` file for them.

## Fixes
- Shortcuts of `cds init` work again

## Also see
- Changes of `@sap/cds-compiler` 1.0.30
- Changes of `@sap/cds-services` 0.5.0
- Changes of `@sap/cds-ql` 0.5.0


# Version 2.4.2
Same as version 2.3.2, but including the generic service provider for Node.js (`@sap/cds-services` and `@sap/cds-ql`).


# Version 2.3.2
## Changed
- The default for SQL name mapping is changed to `plain`.  This means that
  - The name of a table/view in the database catalog is obtained from the name of the corresponding entity in the CDS model in the following way:
    - replace all "." by "_"
    - convert everything to upper case
  - The name of a table/view column in the database catalog is obtained from the name of the corresponding entity element in the csn in the following way:
    - convert everything to upper case

  Note that this is a breaking change for appliations that rely on the previous value of `quoted`.  In order to get this value back, add the following to `package.json`: `"cds": { "data": { "sql_mapping" : "quoted" } }`

## Fixes
- Special output formatting in CLI is only done for `cds eval` and `cds repl`, but not for programmatic usage.
- Links to external documentation are now point to correct help documents.

## Also see
- Changes of `@sap/cds-compiler` 1.0.30



# Version 2.3.0
## Added
- SQL names can now be configured with `{ data: {sql_mapping: "plain/quoted"} }`.  Default is `quoted`, but will be changed to `plain` soon.  If you need to stay with `quoted` in the futute, e.g. due to data compatibility reasons, you can configure this mode already now.

## Fixes
- The `csn.json` file produced by `cds build` now contains the properly unfolded model for OData.  Previously this was the normalized model, which led to runtime errors in the Java service provider.
- Invalid configuration data in `package.json` now leads to a build error again.
- Console output of `cds build` now presents files paths sorted.

## Also see
- Changes of CDS compiler 1.0.27



# Version 2.2.0
## Added
- CDS configuration in `package.json` can now be omitted if you follow the standard project layout, i.e. if you place your model files in `db/`, `srv/`, and `app/` folders.

## Changed
- Previously data models needed to include import statements to the service models (e.g. `using from '../srv'`), so that the Java runtime could use these service views on the DB to execute queries.  The views are now included automatically, so that you can remove the explict `using` clauses.
- Calling just `cds` on the command line now prints its help.  The previously started REPL is now available with `cds repl` (or just `cds r`).

## Fixes
- Some cds commands failed on Windows.  This is fixed.

## Also see
- Changes of CDS compiler 1.0.24



# Version 2.1.0
## Added
- Service edmx files are now written to UI app folders if their manifest.json contains a reference to the service.  This allows Web IDE's annotation modeler to work on up to date service files.
- The results of `cds.compile.to...` commands are now automatically formatted if called in `cds -e...` or cds repl.  You don't need to append `console.log` to the call chain.

## Fixes
- Language properties are now found in all folders, also ones that are outside of the current module
- csn.json is written with line breaks and indentation

## Also see
- Changes of CDS compiler 1.0.21


# Version 2.0.0
## Added
- All-new command-line interface.  See `cds help` for information on the available commands.
- `cds compile` exposes CDS model transformations with various options.
- `cds build` automatically writes localized edmx files.
- `cds build` now writes the version to the build log.
- `cds version` does the usual thing.
- `cds init` scaffolds CDS projects.
- CDS repl (read-eval-print-loop): just type `cds` and play with CDS API.

## Fixes
Too many to mention :)

## Also see
- Changes of CDS compiler 1.0.19
