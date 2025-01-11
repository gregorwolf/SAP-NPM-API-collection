
# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## Version 8.6.1 - 2024-12-18

### Fixed

- `cds add ams` now creates correct dependencies for Java projects.

## Version 8.6.0 - 2024-12-17

### Added

- `cds repl` got new option `--run` to run a server; also available through `.run` command within the REPL.
- `cds repl` got new option `--use` to make the features of a `cds` available as globals.
- `cds repl` got new builtin `.inspect` command to inspect object with configurable depth, e.g. `.inspect cds .depth=1`.
- `cds watch` now detects a TypeScript project and tries to run with `tsx` if this is installed locally or globally. Otherwise a warning message is emitted.  `CDS_TYPESCRIPT=false` can be used to opt out of this behavior.
- `cds import --group` to allow RFC importer to organize imported modules under a logical name.
- `cds init/add` for Java projects automatically create a `package-lock.json`.
- `cds add ias` adds IAS configuration (beta).
- `cds add ams` adds AMS configuration (beta).

### Changed

- Running `cds init` in the user's home dir w/o a project name now fails. This is to prevent creation of configuration that would act as global (user) configuration leading to follow-up problems with later projects.

### Fixed

- `cds add html5-repo` adds an `index.html` as `welcomePage` to the `xs-app.json`, if available.
- `cds bind` fixes the recursive call to `mergeCredentials`.
- `cds add` won't add a duplicated `SUBSCRIPTION_URL` if it doesn't match the template specification.
- `cds watch` gives a better error message for TypeScript projects started with if `tsx` isn't installed.
- `cds build` no longer throws an undefined error when processing build plugin messages.

## Version 8.5.1 - 2024-12-05

### Fixed

- `cds build` now logs existing plugin build messages if a BuildError is thrown.

## Version 8.5.0 - 2024-11-26

### Changed

-  `cds import` now generates generic action/function in case of bound action/function collision and unbound function collision with @cds.validate = false.
- `cds add typescript` creates projects with `cds-tsx` to run apps instead of former `cds-ts`.
- `cds deploy` writes error output to `stderr`.
- `cds add http` now evaluates mocks users when creating `Authorization` headers

### Added

- `cds debug` lets you debug Node.js applications running locally or in Cloud Foundry.
- `cds watch --inspect` and `cds watch --inspect-brk` activate the debugger in the same way as the standard Node.js CLI options, i.e. they accept a `host:port` combination and `0` as values.
- The existing `cds watch --debug` is now an alias to `cds watch --inspect`.
- `cds add cloud-logging` adds cloud-logging as an alternative for application logging in Kyma.
- `cds add cloud-logging --with-telemetry` or `cds add telemetry` adds cloud-logging as well as support for `cap-js/telemetry` plugin in Kyma.
- `cds add handler` now also works for Node.js projects. It creates an implementation file for each service with event handlers for all entities and actions.
- `cds add esm` creates ESM-compatible Node.js projects. Sample code added by `add sample` and `add handler` will respect this setting if added afterwards. Existing code will not be adjusted by `cds add esm`, though.

### Fixed

- `cds import` throws proper error message if Annotation element doesn't have Term attribute.
- `cds add approuter` no longer enforces Node.js 22, which is not supporter by current `@sap/approuter` version 17. The previous Node.js version 20 is used again.
- `cds add -p` with custom options now works if the entry was not in the `package.json` beforehand.
- `cds add http` works for actions without parameters.
- `cds add workzone` includes the `updateManifestJson` task on initial generation.
- `cds build --ws` no longer creates migration tables in shared database or wrong workspace.

## Version 8.4.2 - 2024-11-19

### Changed

- `cds init` uses latest Maven Java archetype version 3.4.1 for creating Java projects.

### Fixed

- `cds add -p/--package` correctly parse plugin-contributed options.
- `cds add side-by-side-extensibility` does not throw an error.
- fix method name in `cds bind` credential handling.
- `cds add --help` no longer has missing line breaks in help text.
- `cds` commands no longer fail with an error `cds.extend is not a function` with very old versions of `@sap/cds`.
- `cds add hana` adds the `requires.db` entry to `.cdsrc.json` for Java projects.
- `cds add data` creates decimal values with correct scale `0` if only precision is given, like in `Decimal(15)`.

## Version 8.4.1 - 2024-11-08

### Added

- `cds deploy --no-build` lets you skip the implicit `cds build`.
- `cds add data/http` supports new type `cds.Map`.

### Fixed

- `cds compile --to <unknown>` shows a cleaner error message.
- `cds add data` handles composition of one correctly.
- `cds add http` creates payloads for unbound actions in services.
- `cds compile --to xsuaa` can now handle annotation expressions in `where` clauses.
- `cds add http` produces requests for all expected data and no longer relies on existing data on the side.
- `cds add typer` creates `tsconfig.json` that works with `cds-tsx`.

## Version 8.4.0 - 2024-10-29

### Added

- `cds add application-logging` for Java also executes the `cds:add` goal with feature `APPLICATION_LOGGING`.
- Added support for `import` and `export` for auto-completion in `package.json` and `.cdsrc.json`.
- `cds add side-by-side-extensibility` adds configuration for logic extensibility via extension points (Java).
- `cds init --java` can be used as an alias to `cds init --add java`.
- Add cds schema for `helm` build plugin.

### Changed

- `cds init` does not put comments in JSON files within `.vscode/`.
- `cds import --from asyncapi` now uses CloudEvents type in `@topic` annotation.
- `cds deploy` does not fall back to the deprecated `hanatrial` service plan any more.

### Fixed

- `cds env` now colors is output honoring settings like `FORCE_COLOR`.
- `cds add` commands correctly detect Java/Node in Microsoft PowerShell.
- `cds add hana` doesn't add `dependencies` to `.cdsrc.json` any more.
- `cds add cf-manifest` uses the new `sap_java_buildpack_jakarta` buildpack.
- `cds build --production` now correctly formats console log output.
- `cds add` correctly handles entries like `cds.requires.auth` if the following configuration is scoped in a profile.
- `cds add` plugins can use a shortcut for their options.
- `cds import` fix for no entity schema in OData V2.

## Version 8.3.0 - 2024-09-30

### Added

- `cds add mta`, `cds add helm` and `cds add cf-manifest` execute the `mvn cds:add -Dfeature CF/K8S` under the hood for Java projects.
- `cds compile --to mermaid` now supports `mta.yaml` to generate a visualization of your deployment descriptor.
- `cds add data` now also generates data for models imported with `cds import`.
- `cds add data` now also supports structured types.
- `cds deploy` now can also write its DDL statements to a separate log file with the `--out <file>` parameter.
- `cds add dynatrace` is now supported for Kyma.
- `cds import --name ...` to be used in RFC importer (`@sap/cds-rfc`).
- `cds add cloud-logging --with-telemetry` and `cds add dynatrace` are added to the `production` profile by default and respect the `for` option.

### Changed

- `cds add sample` now uses `@ui5/cli` version 4.
- `cds import` now throws a warning for OpenAPI files containing recursive data types.

### Fixed

- `cds add workzone`-created apps can now directly be added via Content Manager in SAP Build Work Zone.
- Less obtrusive warning about `cds` instead of `cds-ts` in Typescript projects.

## Version 8.2.3 - 2024-09-25

### Fixed

- In `cds.cli.command`, commands now show up in the correct case.
- `cds add` plugins don't throw a `TypeError` if `cds.cli.options` is `undefined`.
- `cds watch` no longer ignores `*git/` folders, but only `.git/`.
- `cds import` updates `package.json` file in `srv` folder if existing. The `srv` folder name is determined by `cds.env.folders.srv` config or parameter `--out`.
- `cds import` doesn't change existing service configuration data. Now, `destination` credentials are only saved for the `production` profile.

## Version 8.2.2 - 2024-09-17

### Fixed

- BDSA-2024-6188: vulnerability with express.js 4.19.2
- `cds import --out` copies the given metadata file to the correct output folder. CLI options are propagated to the `cds.import` API.
- `cds add sample` no longer creates a irregular whitespace in `admin-service.js`.
- `cds login` now correctly fetches tokens again with client credentials (or hints at invalid credentials).
- `cds add handler` can now also be called from the `srv` dir.

## Version 8.2.1 - 2024-09-05

### Fixed

- Update `@sap/hdi-deploy` to fix CVE-2024-4067 with `micromatch` 4.0.7
- `cds add` plugins now correctly parse flags (options with `type: 'boolean'`) if not used as the last argument.

## Version 8.2.0 - 2024-09-02

### Added

- `cds add dynatrace` adds configuration for Dynatrace.
- `cds add cloud-logging` adds configuration for SAP Cloud Logging. Option `--with-telemetry` allows for configuration with telemetry.
- `cds version` shows version information for `@cap-js/db-service`.
- `cds add portal` now adds SAP Cloud Portal configuration for Kyma.
- `cds add handler` allows to create handler stubs (for Java only, beta)
- `cds init --add java --no-db` lets you create a Java project without persistent database.
- `cds import` supports plugins.
- `cds add containerize` now supports unified-runtime.
- `cds add helm` now supports templating in the mountPath in the additionalVolumes.
- Experimental support for `tsx` through `cds-tsx`.
- `cds bind --to-app-services` now uses `vcap.name` to resolve multiple services with same type. A warning is issued in case of ambiguities.
- `cds compile --to ord -o <name>` supports `.json` file extension.
- `cds import --destination` applies destination credentials to existing service configurations.

### Changed

- `cds add hana` writes configuration for `cds build/compile` to no longer produce native SAP HANA associations. This improves deployment performance, but has a one-time performance penalty (in the next deployment).
- `cds login` prints shorter messages about refresh tokens.
- `cds init` uses latest Maven Java archetype version 3.2.0 for creating Java projects.

### Fixed

- `cds import` fix for single entity schema in OData V2.
- `cds add portal` correctly sets the `appId` in its `CommonDataModel.json` from the `manifest.json` app ID.
- `cds add html5-repo` adds the SAP BTP Destination service as a hard dependency again for Kyma projects.
- `cds build --ws-pack` correctly creates tarball archives for workspaces with nested `node_modules` folders.
- `cds import` now shows proper error message in case of bound action collision.
- `cds deploy --to hana` now runs an existing `hana` build task configuration instead of a default one.

### Removed

- Removed `build` and `build:ts` npm scripts that were generated into `package.json` when adding the `typescript` facet.

## Version 8.1.2 - 2024-08-17

### Fixed

- Dependency update for `axios` to fix CVE-2024-39338
- `cds login` now fetches the passcode URL for the subscriber tenant if the subdomain is given.
- `cds build` now correctly generates migration tables for `CodeList` entities.

## Version 8.1.1 - 2024-08-07

### Added

- Add more features to CAP project creation wizard in SAP Business Application Studio.
- `cds.add.merge` now you specify a `key` in its `deletions` semantics.

### Changed

- `cds init` uses latest Maven Java archetype version 3.1.0 for creating Java projects.

### Fixed

- `cds import` now gives proper error message for OData import in case of invalid OData version or invalid encoding.
- `cds import` now able to ignore invalid escape sequence in the description of properties for OData V2.
- `cds add mta` does not error when the `app/router` folder was deleted.
- `cds version -i` does not show a globally installed version when none is installed or linked.
- `cds compile --to openapi` no longer fails with `Error: Unknown protocol: graphql`.
- `cds add data` can now correctly handle circular dependencies in entities that point to themselves via associations and compositions.
- `cds add` returns correct suggestions for shell completion.
- `cds version` reports correct `@sap/cds-compiler` version.
- `cds deploy` falls back correctly to `@sap/hana-client` when `HDI_DEPLOY_OPTIONS='{"use_hdb":false}'` is set.

## Version 8.1.0 - 2024-07-26

### Added

- `cds compile --to mermaid` can be configured with a layout direction like `LR`.
- `cds deploy --to hana` now shows the `hdi-deploy` version when running.

### Changed

- Better generation of http files with `cds add http`, especially for draft requests.

### Fixed

- `cds add` recognizes `hasCfManifest` as inactive unless a `manifest.yml` file exists.
- `cds add` help and suggestions are only shown when the `help` method is implemented.
- `cds add sample` does not include the deprecated `synchronizationMode` property in `manifest.json` files any more.
- `cds compile --to mermaid` no longer produces empty `namespace` blocks that would lead to rendering errors.
- `cds compile --to mermaid` no longer fails for complex queries like joins.
- `cds build --for mtx-sidecar` now correctly supports different `srv` folder name.
- `cds add audit-log` in combination with `cds add multitenancy` correctly adds the audit-log dependency to the MTX sidecar.
- `cds build` adds the correct hdbtabledata file paths to the HANA result set.
- `cds add` plugins can now correctly interpret `cds.cli` properties.
- `cds deploy --to hana --dry` now shows correct files with their content.
- `cds version` now reports the correct version of `@sap/cds` if this one is installed locally along with a local `@sap/cds-dk` installation.
- Shell completion now works correctly for `cds init --add`.
- `cds build --for mtx-sidecar` no longer fails if the severity of a compilation error has been downgraded from `Error` to `Warning`.

## Version 8.0.3 - 2024-07-20

### Fixed

- `cds build --ws` no longer creates migration tables in shared db if already existing in a workspace.
- `cds add destination` adds the destination service as an MTX SaaS dependency.
- `cds add html5-repo` adds the HTML5 repo runtime as an MTX SaaS dependency.
- `cds add html5-repo` does not add a destination service any more if not required by other services.
- `cds add workzone` runs `cds add destination` as a dependent facet.
- `cds add` plugins don't fail if custom options are provided via the `options` API.
- `cds add data` can now correctly handle circular associations. The maximum depth of associations is increased to 5.
- `cds add redis` is separated from `cds add redis-messaging` to allow for separate consumption.
- `cds add redis` uses the `standard` service plan by default.
- `cds watch` no longer leads to a warning `'@sap/cds' was loaded from different installations` when local project dependencies are installed.
- `cds init` uses latest Maven Java archetype version 3.0.0 for creating Java projects.


## Version 8.0.2 - 2024-07-12

### Added

- `cds add malware-scanner` adds configurations for `SAP Malware Scanning service`.

### Changed

- `cds add http` stores `http` files in a folder `test/http/` by default. Previously, this was `http/`.
- `cds add helm` removed `saasRegistryParameters` key and moved parameters to `saas-registry`.
- `cds init` no longer creates a `.cdsrc.json` for Node.js projects.
- `cds build` configuration cleanup for `data.model` and `service.model` to only support configuration of a single model folder.
- `cds build` now fully supports default model definitions for custom build plugins.

## Version 8.0.1 - 2024-07-09

### Added

- `cds add hana` and `cds build` now support the HANA artifact type `.hdbeshconfig` required for enterprise search integration.
- `cds init` adds simplistic `eslint.config.mjs` file to newly created projects.
- Running any `cds` command in a TypeScript project will print a hint to `cds-ts`.
- The `cds.build.Plugin` class now supports a `baseModel()` method that returns a CSN that doesn't include features when feature toggles are enabled.
- `cds add workzone` adds support for SAP BTP Work Zone, Standard Edition.
- `cds add helm` now supports using external destinations in `backendDestinations` key.
- `cds add` supports the `--java:mvn` option.

### Changed

- `cds add multitenancy` now adds the `java` profile in the MTX sidecar config, in addition to `mtx-sidecar`.
- `cds init` uses Maven Java archetype version 2.10.1 for creating Java projects.
- `cds init --add java` and other `cds add` commands use Java 21 by default.
- `cds add helm` now adds env variables directly in _values.yaml_ file instead of mtxs-configmap ref.
- `cds init` for a Node.js project adds `@cap-js/cds-types` to its `devDependencies`.
- `cds login` now informs about command-line options ignored when fetching a token.
- `cds login` now exits with an error in case of clashing parameters.
- cds shell completion now suggests files/folders when called directly after cds command, e.g. `cds pac<tab>` will return files/folders starting with `pac`.

### Fixed

- `cds add` is failing if one of the `canRun` conditions in the plugin isn't satisfied.
- `cds version` and other CLI commands no longer color their output if e.g. stdout is redirected.
- `CHANGELOG.md` is part of npm package.
- `cds build` determines the correct feature names if a `.cds` file path contains the name `fts`.
- `cds watch` now ignores `.git/**`

## Version 8.0.0 - 2024-06-20

### Added

- `cds init --add` now also allows the shortcut `cds init -a`.
- `cds add audit-logging` adds configuration for `@cap-js/audit-logging`.
- `cds add typescript` initializes a bare CDS project with TypeScript nature.
- `cds add containerize` generates `containerize.yaml` file with configuration required to build the container images by `ctz` CLI.
- Setting `FORCE_COLOR=1` will now force colored log output.
- `cds add --package/-p` allows you to specify remote packages (in `npm add` format).
- `cds add helm` asks prompts to fill in data at first execution.
- `cds add http` can now generate requests for entities annotated with `odata.draft.enabled`.
- `cds import` will now support references in `requestBody` for openapi files.
- Multitenancy-related commands now always print the HTTP status on request errors.
- `cds add helm` added `HorizontalPodAutoscaler` which can be enabled by `srv.hpa.enabled`.
- `cds add attachments` adds configurations for `@cap-js/attachments`.
- Shell completion now supports `fish` shell.
- `cds add portal` creates configuration for the SAP Cloud Portal service.
- `compile --to mermaid` exports a CDS model as a mermaid diagram.

### Fixed

- `cds add mta` correctly adds the logging service with `@sap/cds >= 7.5`, if not explicitly disabled.
- `cds add` doesn't fail for Java projects if `srv/pom.xml` doesn't exist.
- `cds login` now prints the App URL, reports HTTP 404 errors correctly and gives better mitigation hints.
- `cds deploy` consistently resolves configured service models, where previously the db model had priority.
- `cds build` checks for the existence of a package.json file in the root folder of Node.js projects.
- `cds add` sets `cds.cli` before plugins are loaded.
- `cds add http` supports custom keys, including composite keys.
- `cds add approuter` will not create a `router` subfolder if an `xs-app.json` is found in the `app` directory.

### Changed

- `cds deploy --to hana` uses `@sap/hdi-deploy` version 5.
- `cds deploy` resolves existing binding for deployment.
- `cds import` will not generate `ON condition` for association or composition.
- `cds import` will not add the `@cds.ambiguous` annotation for association or composition.
- `cds import` now supports OData V2 EDMX file with empty or missing `EntityContainer`.
- `cds init` will now initialize a cds 8 project.
- `cds add approuter` will not add XSUAA under the hood any longer.
- `cds add hana` and `cds build` use `@sap/hdi-deploy` version 5.
- `cds add hana` now uses `@cap/js-hana`.
- `cds add multitenancy` uses `@sap/cds-mtxs` version 2.
- `cds add multitenancy` does not add the `UIFlexDeveloper` role any more.
- `cds add helm` doesn't expose srv and sidecar workload in multi tenant mode if approuter is present.
- `cds add helm` changed `values.yaml` structure.
- `cds add helm` command doesn't generate static files (subcharts and templates) when `cds add` is executed. Instead, it generates the `chart` folder containing all the static data in the `gen` folder when `cds build` is executed.
- `cds add xsuaa` now uses `@sap/xssec` version 4.
- `cds add tiny-sample` uses the same `schema.cds` file name as `cds add sample`.
- `cds add html5-repo` now adds the `deploy_mode: html5-repo` parameter to the _mta.yaml_.
- `cds add html5-repo` uses `gen` (Node.js) or `.` (Java) for the app deployer `path`.
- `cds add mta` now creates an _mta.yaml_ with schema version 3.3.0.
- `cds login` no longer falls back to a legacy URL or a GET request for tokens.
- `cds login` now enforces HTTPS when contacting remote URLs.
- `cds login` no longer saves Refresh Tokens by default for security reasons. (Use `--save-refresh-token` to enable this feature.)
- `cds build` cleanup of build task property `use`.
- `cds add helm` default value of `xsappname` will contain Release Namespace as well.
- `cds build` allows custom plugins to be executed after the built-in plugins.
- `cds login` eagerly fetches the passcode URL (if supported by `@sap/cds-mtxs`) and prints it on prompt.
- `cds extend` and `cds activate` have been deprecated and are now removed. (You can still migrate and download projects, see `cds migrate --help` and `cds extend --help`.)
- Remove obsolete classic MTX checks and enforce `@sap/cds` >= 7.
- `cds build` uses `cds.compile.to.hana` API with `@sap/cds` 8.
- `cds bind` and `cds deploy` use direct http requests instead of `cf curl`.
- `cds build --for java` no longer generates localized EDMX files by default. It can be enabled using `contentLocalizedEdmx` build task option.
- `@cap-js/sqlite`/`better-sqlite3` is used in dependencies instead of `sqlite3`.
- `cds add sample` now generates comma-separated CSV files, instead of semicolon-separated, in order to be more consistent with `cds add data`.
- `cds build` no longer supports the deprecated register API for custom plugins.
- `cds init` no longer adds `devDependencies` for `eslint` and `@sap/eslint-plugin-cds` when creating a new project.
- `cds init` now creates `eslint.config.mjs` file with reference to `@sap/cds/eslint.config.mjs`.

### Removed

- `cds add notebook` is removed.  CAP Jupyter Notebooks have been replaced by custom CAP Notebooks for VS Code which are now part of the CDS Editor.  See https://cap.cloud.sap/docs/tools/#add-cds-editor for more.

## Version 7.9.8 - 2024-09-17

### Fixed

- BDSA-2024-6188: vulnerability with express.js 4.19.2

## Version 7.9.7 - 2024-08-22

### Fixed

- Dependency update for `axios` to fix CVE-2024-39338
- `cds build --for mtx-sidecar` now correctly supports different `srv` folder name.
- `cds build --ws-pack` correctly creates tarball archives for workspaces with nested `node_modules` folders.
- `cds version` now reports the correct version of `@sap/cds` if this one is installed locally along with a local `@sap/cds-dk` installation.
- `cds version -i` does not show a globally installed version when none is installed or linked.
- `cds version` reports correct `@sap/cds-compiler` version.
- `cds version` can skip over check for Java version

## Version 7.9.6 - 2024-07-19

### Fixed

- `cds add data` can now correctly handle circular associations. The maximum depth of associations is increased to 5.

## Version 7.9.5 - 2024-07-12

### Added

- `cds add hana` and `cds build` now support the HANA artifact type `.hdbeshconfig` required for enterprise search integration.

### Fixed

- `cds add` is failing if one of the `canRun` conditions in the plugin isn't satisfied.
- `cds watch` now ignores `.git/**`

## Version 7.9.4 - 2024-06-19

### Fixed

- Dependency update to fix CVE-2024-37890

### Changed

- `cds init` uses latest Maven Java archetype version 2.10.1 for creating Java projects.
- `cds bind` and `cds deploy` use direct http requests instead of `cf curl`.

## Version 7.9.3 - 2024-06-07

### Fixed

- `cds add data` now has a more precise foreign key type conversion from CSV data, covering edge cases.

## Version 7.9.2 - 2024-05-15

### Fixed

- `cds add data` now uses the correct JSON type for foreign keys from CSV data, e.g. number instead of string
- `cds bind` now calls resolve in sequence to avoid file access exceptions

## Version 7.9.1 - 2024-05-02

### Fixed

- `eslint` 9 doesn't crash anymore if called in a project created with `cds init`

### Changed

- `cds add mta` will now use the new `sap_java_buildpack_jakarta` buildpack configuration in the `mta.yaml`.

## Version 7.9.0 - 2024-04-30

### Added

- Shell completion in Linux, macOS, Windows for cds commands and parameters (beta)
- `cds bind` supports shared service instances. Service keys are created in the space where a service instance was shared from.
- `cds add data` now can generate actual data (not only a header line), both as `csv` and `json` structure.
- `cds subscribe` now allows to pass tenant metadata and HDI parameters using parameter `--body <json>`.
- `cds add http` has a `--dry` flag to write the generated http requests to stdout.
- `cds add hana` and `cds build` support undeploy of calculation views by default.
- `cds bind` supports custom credentials to overwrite cloud service credentials.
- Better support for `profiles` in cds schema for `package.json` and `.cdsrc.json`.
- `cds bind` supports custom credentials to overwrite cloud credentials of multiple services.

### Fixed

- Revert json schema for cds schemas to `draft-07` to prevent VS Code warnings about unsupported schema features.
- `cds add` doesn't fail for projects with a minimal `package.json` w/o `name` and `version` fields
- `cds add data` can be executed in projects w/o `package.json` and `.cdsrc.json` files.
- `cds add sample` does not fail if the `srv` folder doesn't exist.
- `cds add helm` fixed XSUAA tenant-mode not updating on adding `multitenancy`
- `cds watched` cannot be called from command line anymore.
- `cds login` now correctly handles the case of an expired refresh token and gives more information about token-request errors.
- `cds login` now refreshes the token URL if it had previously reverted to a legacy URL.
- Command retrieval during cds bootstrap is now more robust.
- `cds watch` now ignores all `gen`-folder content to allow tenant subscription in hybrid mode.
- `cds build` doesn't copy `.cdsrc-private.json` file into the deployment folder.

### Changed

- `cds deploy --to hana` warns about using custom service name, e.g `--to hana:myService` and `--vcap-file` at the same time.
- `cds compile` to `openapi` now throws an error when `@protocol : 'none'` is given.
- `--data:for` of `cds add data` is now deprecated in favor of `--filter`.
- `cds add data` sorts columns with own elements first, assuming they are more significant than the inherited/included elements.
- `cds add http --filter` accepts a service/entity/action name or a regex instead of a path.
- `cds deploy` and `cds bind` both use Cloud Foundry client for backend communication.
- Changes in the `package-lock.json` file don't restart the server e.g. during `cds watch`
- `cds init --add java` uses the currently installed Java version for the `pom.xml`.
- `cds add mta` derives the JDK version from the `pom.xml` version.
- `cds add helm` update default gateway to `kyma-system/kyma-gateway`
- `cds lint` supports both legacy (`@eslint@^8`) and flat (`@eslint@^9`) ESLint configurations.
- `cds add lint` adds flat ESLint configurations with `@eslint@^9`, `@sap/eslint-plugin-cds@^3.0.0`.
- `cds add lint` now requires `ESLint` version 8 or above.

## Version 7.8.2 - 2024-04-15

### Added

- `cds compile` to `openapi` now maps `@ODM.oidReference.entityName` annotation to generate `x-sap-odm-oid-reference-entity-name`.

### Fixed

- `cds run/serve --resolve-bindings` correctly work with the new runtime authentication middleware.
- `cds add helm-unified-runtime` fixed backend destinations urls for deployments that aren't exposed.

### Changed

- New versions of `@sap/cds` and `@sap/eslint-plugin-cds`
- `cds add helm` moved `TENANT_HOST_PATTERN` key from configmap to `values.yaml`.
- `cds add helm` `web-application` subchart now supports controlling the health probe timings and updated default gateway to `kyma-system/kyma-gateway`

## Version 7.8.1 - 2024-04-02

### Added

- `cds add` plugins now support custom flags.
- `cds add kafka` is also enabled for Helm deployments.
- `cds add enterprise-messaging` and `cds add enterprise-messaging-shared` now support a `--cloudevents` flag which automatically adds `cds.requires.messaging.format = 'cloudevents'`.

### Fixed

- `cds build` does no longer add the model _@sap/cds-mtxs/srv/bootstrap_ for Java projects by mistake if the `--ws` option is set.

## Version 7.8.0 - 2024-03-27

### Added

- `cds add mta` configures readiness health checks via http to `/` for Java and `/health` for Node.js.
- `cds add` facets can now also be space-separated, e.g. `cds add mta mtx pipeline`.
- `cds add http` adds an `http` folder with `.http` files generated for all services.
- `cds add http --filter [path to dir or file]` generates `.http` files only for the specified file or directory. The shortcut is `-f`.
- `cds add http --for-app [app name]` uses the hostname and the auth of the specified deployed app.
- `cds add http --out` allows to specify the output folder for the http files. The shortcut is `-o`.
- `cds build` reclassifies compilation warnings as info messages for extension projects in case they are caused by the SaaS application base model. `cds build --log-level info` logs all messages. Reclassification of message IDs can be customized.
- `cds version` now also prints the version of the CAP Java SDK as well as the Java and Maven versions
- `cds build` now uses argument `--ws-pack` instead of `--ws` to enable tarball based packaging of npm workspace dependencies for Node.js apps (beta).
- `cds import` can now import the Action/Function with binding parameter type of different schema in the scope of a document.

### Changed

- `cds add helm` uses `/health` for liveness and readiness checks for Node.js.
- `cds pull` now uses an NPM workspace folder (default: .base) for the base model to enable committing it (link it to node_modules with `npm install`).

### Fixed

- `cds deploy` always included models from existing `fts/*` folders. Now, it only does so if `cds.requires.toggles` is switched on.
- `cds build` now adds the correct HANA tenant database artifacts for a multitenant application in case a second shared database exists.
- `cds bind --to-app-services` will throw a better error message if no app name is supplied.

## Version 7.7.2 - 2024-03-08

### Added

- `cds import` now has `beta` flag which can be used to import beta functionality in the CSN/CDS.

### Fixed

- `cds deploy --to hana` environment entries from `--vcap-file` option now overwrite environment entries.
- `cds add helm` `web-application` subchart now allows annotations to be added to the K8s services and `content-deployment` subchart now allows to set `imagePullPolicy`.

## Version 7.7.1 - 2024-03-01

### Fixed

- `cds build` now allows the SaaS application base model to be located in a subfolder of the mtx extension project using npm workspace setup. Before, such a scenario caused duplicate model definitions.
- `cds init` shows better error message if project name contains unsupported characters.

### Changed

- `cds init` uses latest Maven Java archetype version 2.7.0 for creating Java projects.

## Version 7.7.0 - 2024-02-26

### Added

- Schema support for declaring schema contributions in cds plugins.
- `cds import` now supports `ref` in schema properties for AsyncAPI files.
- `cds add html5-repo` is now supported for Cloud Foundry (beta).

### Changed

- `cds add mta` will add `npm ci` to its `before-all` build scripts to make `mbt build` more self-contained.

### Fixed

- `cds build` for MTX extensions no longer fails in case of duplicate model definitions.
- `cds version -i` now prints the same versions in MD form as `cds version`

## Version 7.6.1 - 2024-02-14

### Changed

- `cds login` now automatically discards invalid refresh tokens and retries instead of exiting with an error.
- `cds login` now saves the passcode URL received from a failing token request and prints it along with the error and any subsequent passcode prompt.
- `cds login` now hints at missing user role as the cause of an error, if applicable.

### Fixed

- `cds import` now fixed the `AnnotationPath` attribute value import for Annotation in OData V4 EDMX correctly in the CSN.
- `cds import` will now move the imported EDMX file to `srv/external` only if the import is successful.
- `cds import` now captures the annotations present within EntityContainer for OData V4 EDMX in the CSN.
- `cds deploy` allows usage of `SERVICE_REPLACEMENTS` without specifying `VCAP_SERVICES`.
- `cds deploy` gives an error if its service key corresponds to a Service Manager instance.

## Version 7.6.0 - 2024-01-31

### Added

- `cds add application-logging` is now supported for Java.
- `cds add` and `cds init` help shows a more complete list of available commands.
- `cds bind -2 <service-name>` automatically creates service key named `<service-name>-key` on Cloud Foundry.
- `cds bind --to-app-services <app-name>` binds to all services of a deployed app.
- `cds build` supports npm workspace setups (beta).

### Changed

- Json schemas for `build` and `deploy` moved here from `@sap/cds`.
- `cds build` plugins can provide additional json schemas, including root nodes (beta).
- `cds add helm` doesn't expose srv workload in single tenant mode if approuter is present.
- `cds add hana` also adds draft tables to the `undeploy.json`.
- `cds build` uses existing `.npmrc` file from project root for the MTX sidecar build, precedence has `.npmrc` in sidecar folder.
- `cds logout --clear-invalid` also deletes expired tokens.
- `cds build` requires feature toggles to be switched-on in order to get the corresponding features generated.

### Fixed

- `cds build` no longer throws `maximum call stack size exceeded` error when building SaaS extensions.
- `cds add approuter` no longer adds `SUBSCRIPTION_URL` configuration to Java projects in some scenarios.
- `cds add html5-repo` in combination with `cds add helm` or `cds add helm-unified-runtime` correctly adds HTML5 repo runtime configuration.

## Version 7.5.1 - 2024-01-09

### Changed

- Bump of dependencies
- MTXS commands will now use a request timeout to avoid hanging on invalid URLs.
- Error messages for invalid URLs have been improved.
- Reverting the fix from `7.5.0`: `cds compile` to `openapi` now adds correct schema `$ref` for patch operation.

## Version 7.5.0 - 2023-12-14

### Added

- `cds add` plugin support (beta).
- `cds compile` to `openapi` now creates readonly endpoints for entities annotated with `@cds.autoexpose(d)`.
- `cds compile` to `openapi` now supports deepInsert and deepUpdate incase of entity property containing a composition.
- `cds add liquibase` support for Java.

### Changed

- `cds add application-logging` can now be used in place of `cds add kibana`. `cds add kibana` is deprecated.
- `cds add application-logging` now uses the `standard` service plan in the `mta.yaml`, instead of `lite`.
- `cds add application-logging` doesn't add the `cds.features.kibana_formatter` flag any more.
- `cds v -i` will now insert a default placeholder if `repository` or `repository.url` is undefined in your `package.json`.
- Use supported node versions in SAP HANA database modules.
- `cds build` uses console.log to correctly format log output.
- Retrofit `cds build` plugin register API.
- `cds build` log output has been streamlined.


### Fixed

- `cds add postgres` for Java now uses the `default` profile when called without the `--for` option.
- `cds compile` to `openapi` now adds `title` and `description` from `@Core.Description` and `@Core.LongDescription` respectively to reduce duplicate descriptions.
- `cds build --production` now loads cds plugins from `devDependencies`.
- Less redundant messages on request errors.
- Avoid empty error message when `cds push` fails.
- Better type definitions for programmatic APIs provided by `cds-dk`.
- Better error message if old `@sap/cds` versions <= 5 are used.
- Calls from Yeoman generator are now handled correctly.
- `cds compile` to `openapi` now adds correct schema `$ref` for patch operation.

## Version 7.4.1 - 2023-11-30

### Fixed

- `semver` is bumped to version `^7` to mitigate [CVE-2022-25883](https://github.com/advisories/GHSA-c2qf-rxjj-qqgw)

### Changed

- `cds push` uses the synchronous server API by default again due to stability problems. Use `--async` for the asynchronous call.
- `cds add enterprise-messaging` will now correctly replace all `_` by `-`.

## Version 7.4.0 - 2023-11-14

### Changed

- `cds build` plugins can now require their APIs directly from `@sap/cds` (instead of `@sap/cds-dk`).
- `cds init` uses latest Maven Java archetype version 2.4.0 for creating Java projects.

### Added

- `cds init` for Node.js now has `@cds-models` for `@cap-js/cds-typer` in its `.gitignore`.
- `cds add local-messaging` is now supported for Node.js.
- `cds add postgres` is now supported for Java.
- `cds build` now supports the command line argument `--no-clean` (beta). Clients need to clean the output folder(s) manually for consistent build results.
- `cds build` now supports the build task option `flavorLocalizedEdmx` to generate localized instead of non-localized edmx files for Java apps - default is `false`.
- `cds subscribe`, `cds unsubscribe`, `cds upgrade` now also support the `--resolve-bindings` flag.
- `cds build` now supports the command line argument `--ws` to enable tarball based packaging of npm workspace dependencies for Node.js apps. (beta)
- `cds build` now supports SAP HANA schema evolution for draft tables.

### Fixed

- `cds deploy --to hana --dry` now prints out the SAP HANA SQL files which will be deployed if `--dry` is not specified.
- `cds build` no longer fails if multiple service protocols are configured in object notation.
- `cds build` now uses configured compiler options when building Node.js projects.
- `cds pull` when amending package.json applies the original indentation
- `cds watch --profile hybrid` no longer produces a value `hybrid,hybrid` for `process.env.CDS_ENV`
- `cds.schema` now loads lazily.
- `cds init` does not print `cd` hint if creating a project in current folder.

### Removed

- `cds repl` no longer loads `cds.plugins` on startup to keep `cds` lazy.

## Version 7.3.1 - 2023-10-19

### Changed

- `cds watch --livereload` now reload the client w/o a server restart, so that for e.g. an `.html` file, a reload event is sent, but the server is not restarted.  Previously, the two events were coupled.
- `cds build` now provides a programmatic plugin API instead of the former configuration based one.

### Added

- `cds build` supports the option `contentLocalizedEdmx` to enable/disable the generation of localized edmx files for Java apps - default is `true`.
- `cds repl` now loads `cds.plugins` on startup.
- `cds add enterprise-messaging-shared` also supports Kyma deployment.
- `cds add notifications` adds configurations for notifications plugin.

### Fixed

- `cds` commands will now respect the `NO_COLOR` environment variable.
- `cds init` no longer adds comments to file `.vscode/launch.json`
- `cds bind` prints correct command line recommendation to start spring-boot application
- `cds compile` to `openapi` now generates correct query options with `$` prefix.
- `cds build` no longer causes `duplicate assignment` compilation errors for specific feature toggle scenarios.
- `cds watch` now loads missing service bindings when called from a directory other than cwd.
- Multitenant `cds` commands now have any trailing slashes removed from app URLs, fixing certain request failures.
- Multitenant `cds` commands now handle request errors more robustly.
- `cds build` no longer fails for cds services supporting multiple protocols.
- `cds build` uses the correct deployment folder for CSV files.

## Version 7.3.0 - 2023-10-06

### Changed

- `cds login` now eagerly detects expired token and asks for a new passcode if applicable
- `cds login` now presents the passcode URL as early as possible
- `cds env` now requires `@sap/cds` >= 7.3 to resolve configuration contributed by cds plugins
- `cds add connectivity` does not add `connectivity: true` to your `package.json` any more.
- `cds watch` now ignores more files/folders: `app/(webapp|dist|target)`, `app/*/(webapp|dist|target)`, `tsconfig.json`, `*.tsbuildinfo`
- `cds build` now uses `compile.to.hdbtable` if no migration tables exist.
- `cds build` plugin API is refactored.

### Fixed

- `cds login` now prints shorter errors (set `DEBUG=req` in env to see all details again).
- Fixed issue when creating a CAP project in SAP Business Application Studio's template wizard.
- `cds import` now handles name collision within a Schema for OData V4 EDMX.
- `cds build` for mtx extension projects no longer creates CSN containing unresolved model associations.
- `cds build` no longer creates new migration versions by mistake after schema evolution changes have been manually resolved.
- `cds add approuter` creates the `xs-app.json` in the `app` folder again, instead of in `app/router`.
- `cds watch` no longer restarts itself in an endless loop (happened in some Typescript scenarios on Windows)

### Added

- `cds push` now uses the asynchronous server API by default. Use `--sync` for the synchronous one.
- `cds activate` and `cds push` now support the `-2` shortcut for the `--to` option.
- Improved error logging for failed HTTP requests.
- `cds build` support for custom build plugins.
- `cds compile` support for custom compile plugins.
- `cds build` creates non-localized edmx files for the nodejs apps. Translations will be applied at runtime.
- `cds.schema.overlay4` gets the cds default schema plus overlays from cds-dk.
- `cds build` creates non-localized edmx files for the java apps. Translations will be applied at runtime.
- `cds import` now introduces new option `--config` to add custom configuration data in the package.json.
- `cds add helm` now adds `html5-apps-repo-runtime` binding for `approuter` if `html5-repo` is present.
- (BETA) `cds add postgres` adds configuration for PostgreSQL. This requires `@cap-js/postgres` 1.3.0.

## Version 7.2.0 - 2023-09-04

### Fixed

- `cds build` adds feature toggles to existing custom build task model options.
- `cds import` adds the `kind` based on the type of the input file while updating the `package.json`.

### Added

- `cds add h2` adds H2 configuration for Java projects.
- `cds add sqlite` now has full support for Java projects.
- `cds gen` creates models or data using a descriptive prompt (beta)
- `cds bind` auto detects 'ias-auth' service bindings
- `cds compile` to `openapi` now introduces new option `--odata-version` to add the OData version functionality to generate the OpenAPI document.
- `cds add` comes with more templates/facets in the wizard of SAP Business Application Studio: approuter, XSUAA, Kibana logging, enterprise messaging, multinenancy, helm charts, and extended sample files.

### Changed

- `cds add approuter` creates the `xs-app.json` in a dedicated `app/router` folder, instead of in `app`.
- `cds add multitenancy` now sets up the `cds-feature-mt` dependency in your `pom.xml` for Java projects.
- `cds watch` ignores all frontend resources in `app/**/webapp/**`. Previously, only `app/**/(*.js|ts)` was ignored.

### Removed

- `cds add auditlog` facet.

## Version 7.1.1 - 2023-08-10

### Fixed

- When setting `CDS_CONFIG` from the command line, that value is no longer overridden by other env values. Setting `CDS_CONFIG` from the command line in combination with additional command line args, like `--odata`, is not supported at this point.
- Installing `@sap/cds-dk` now produces a shrinkwrapped layout again if used against NPM registries like Artifactory that don't serve the `_hasShrinkwrap` option.
- `cds import` for OData V4 EDMX imports `Edm.Decimal` data type considering `Precision` and `Scale` facet correctly.
- `cds import` for OData V4 EDMX imports `DefaultValue="0"` in CSN.

### Changed

- `cds init` uses latest Maven Java archetype version 2.1.0 for creating Java projects.
- `cds build` correctly logs build messages based on their severity.
- `cds build` creates OData EDMX for configured fiori build tasks.

## Version 7.1.0 - 2023-07-31

### Fixed

- Calls from Business Application Studio `New Project from Template` wizard are now handled correctly.
- `cds add cf-manifest` correctly generates the XSUAA instance name.
- `cds build` always uses the configured HANA build task when building the MTX sidecar.
- `cds import` OData V4 EDMX fix for Annotation Alias and Namespace value replacement.

### Changed

- `cds build` now fails if HANA schema evolution changes exist that need to be manually resolved.
- `cds build` now throws an error for Java apps using the mtx build task in combination with `@sap/cds-dk` version >= 7.
- `cds import` now supports OData V4 EDMX file with empty or missing `EntityContainer`.

## Version 7.0.3 - 2023-07-21

### Fixed

- `cds deploy` writes settings under profile `hybrid` as default in `.cdsrc-private.json`
- `cds add sample` uses default `/odata/v4/` service paths and data source paths in UI5 `manifest.json` files.
- When a request fails, shorter errors are printed and secret data is hidden. (Set `DEBUG=req` in env to see all details again.)
- Now shows all commands when a given command on the command line is not found
- `cds import --from edmx` fixes rendering of nested annotations in the CSN.

### Changed

- `cds add` adheres to existing indentation style when changing JSON files.
- `cds add typer` no longer adds `checkJs: true` to your configuration.
- `cds init` uses latest Maven Java archetype version 2.0.2 for creating Java projects.
- `cds build` now throws an error if MTX sidecar and application db configuration is inconsistent.
- `cds watch --open` now delays the opening of the URL by 1s to allow the server to start up. This is needed for plugins that register routes asynchronously.

## Version 7.0.2 - 2023-07-06

### Changed

- `cds add kibana-logging` is (compatibly) renamed to `cds add kibana`.

### Fixed

- `cds` commands do not swallow error stack traces in some cases any more.
- `cds watch` does not swallow compiler errors in some cases any more.
- `cds add sample` has modernized configuration for Fiori-related files in the `app` folder.
- `cds add sample` now also contains a read-only service for browsing books.
- `cds add kibana-logging` now also adds the logging service to the MTX sidecar and approuter, if available.
- `cds build` preferably creates i18n bundle at default location `_i18n` for custom i18n folder configurations.
- `cds watch` no longer fails if `@sap/cds-dk` is installed as dependency along with `cds-swagger-ui-express`.
- `cds build` ensures that `@sap/cds` version >= 6 is installed.

## Version 7.0.1 - 2023-06-30

### Changed

- `cds add` has a slightly revamped CLI UX.
- `cds init` and `cds add sqlite` add the new package `@cap-js/sqlite`, which uses `better-sqlite` instead of `sqlite3`.
- `cds add sample-tiny` is (compatibly) renamed to `cds add tiny-sample`.

### Fixed

- `cds import --from asyncapi` now maps `@topic` annotation to the event key.
- `cds build` now copies the contents of MTX sidecar subfolders to the deployment layout.
- `cds compile --to xsuaa` can be used again if `@sap/cds` 6 is installed.
- `cds env` output is again JSON in non-interactive terminals. This restores the behavior from `@sap/cds-dk` 6.

## Version 7.0.0 - 2023-06-22

### Added

- `cds add connectivity` now supports MTA-based deployment.
- `cds add destination` now supports MTA-based deployment.
- `cds add enterprise-messaging` creates scopes for `emcallback` and `emmanagement` in the `xs-security.json` if XSUAA is enabled.
- `cds add hana` adds the new package `@sap/cds-hana` instead of the direct `hdb` dependency.
- `cds add mta` writes an `event-mesh.json` if the Event Mesh is set up.
- `cds add typer` adds type generation support for projects using the Node runtime.
- `cds add sample` creates a bookshop application incl. Fiori UI.
- `cds add samples` is deprecated. Use `cds add tiny-sample` instead.
- `cds env` supports new options `--keys`, `--list`, `-json`, and `--raw`. See `cds env ?` for details.
- `cds import --from asyncapi` now adds `@topic` annotation for specifying the channel name for the event.
- `cds import --from asyncapi` now updates the `package.json` for multiple services.
- `cds init --add java` prints a more specific error message when not using Java 17 in SAP Business Application Studio.
- New property `cds.cli` allows reflecting on the CLI command and arguments.

### Changed

- `--production` as a global flag now sets `CDS_ENV` to `production` instead of `NODE_ENV`.
- `cds add typer` is now allowed to be used, even if the runtime considers the project to be of Java nature.
- `cds add typer` now generates to `@cds-models`, which will also be `.gitignore`d by the facet.
- `cds add typer` now properly handles TypeScript projects, if possible.
- `cds add connectivity` now supports MTA-based deployment.
- `cds add data --for` is dropped in favor of `--data:for`.
- `cds add destinations` is renamed to `cds add destination`.
- `cds add enterprise-messaging` changes the default for the `topicRules.publish-filter` to `${namespace}/*`.
- `cds add enterprise-messaging` uses a more unique default (`default/<app-name>/1`) as its `namespace`.
- `cds add hana` uses a plain `cds.requires.db = 'hana'`, also for multitenancy scenarios.
- `cds bind` parameter `--for` replaces `--profile` to specify the profile to store connection information in `.cdsrc-private.json`; `cds bind --exec` still uses `--profile`.
- `cds build` moved to `@sap/cds-dk`.
- `cds build` no longer supports `@sap/cds-mtx`. Migrate to `@sap/cds-mtxs`, see https://cap.cloud.sap/docs/guides/multitenancy/old-mtx-migration.
- `cds build` no longer supports the classic CAP Java runtime. Migrate to the current CAP Java runtime SDK, see https://cap.cloud.sap/docs/java/migration.
- `cds deploy` moved to `@sap/cds-dk`.
- `cds deploy` now supports `--for` to specify the profile to store connection information in `.cdsrc-private.json`.
- `cds deploy` parameter `--no-save` is default.
- `cds import --from asyncapi` now takes event name from key `name` in the message.
- `cds init` uses latest Maven Java archetype version `2.0.1` for creating Java projects. This also requires Java 17 or higher.
- `cds watch` and `cds run` don't display stack traces any more if no models are found.
- `cds login` (and other commands implicitly logging in) now use the POST method to transmit credentials to @sap/cds-mtxs.

### Fixed

- `cds add mta` now correctly generates the `mta.yaml` following a `cds add enterprise-messaging-shared`.
- `cds add typer` now correctly defaults to `…/cds-models`, instead of `…/cds-modules` as output path for generated types.
- `cds build` ignores invalid entries in an `undeploy.json` file.
- `cds build` now correctly copies CAP Node.js service handler implementations contained in different service modules. The service handlers will now be loaded correctly in local as well as in cloud deployment scenarios.
- `cds build` now correctly copies JavaScript files located in nested folders of a Node.js app into the deployment folder.
- `cds build` now correctly resolves model files of complex mtx extension projects.
- `cds build` now correctly supports shortcut options
- `cds-ts watch` no longer fails with strange compilation errors if called in combination w/ `ts-node`.
- `cds login` no longer echoes output from an NPM subprocess.
- `cds build` now creates the correct deployment layout for Node.js applications.

## Version 6.8.3 - 2023-06-15

### Fixed

- `@sap/cds` 6.8.4
- `@sap/cds-compiler` 3.9.4

## Version 6.8.2 - 2023-05-31

### Changed

- `cds compile` to `openapi` now uses `@Common.Label` annotation to generate `x-sap-shortText`.
- `cds import` now removes `x-` from elements in the `@AsyncAPI.Extensions` annotation while importing AsyncAPI documents.
- `cds compile` to `openapi` now sorts the `tags` and `paths` in alphabetical order.
- The livereload feature of `cds watch` can be disabled through `cds.livereload: false` in `package.json`.

### Fixed

- `@sap/cds-dk` 6.8.2
- `@sap/cds-mtxs` 1.8.2
- `cds add mta` adds configuration `enterprise-messaging-shared` if necessary

## Version 6.8.1 - 2023-05-10

### Fixed

- `cds-ts watch` no longer fails with strange compilation errors if called in combination w/ `ts-node`

## Version 6.8.0 - 2023-05-04

### Added

- `cds add file-based-messaging` adds configuration for file-based messaging (Node.js).
- `cds add redis-messaging` adds configuration for Redis messaging (Node.js).
- `cds add enterprise-messaging-shared` adds configuration for Event Mesh support with `kind = 'enterprise-messaging-shared'` (Node.js).
- `cds import` now supports OData V4 EDMX file containing multiple `Schemas` with single `EntityContainer`.
- `cds import` now supports importing of AsyncAPI documents.
- `cds login -m <clientid>[:<key>]` now supports X.509 (mTLS) credential-type in XSUAA binding of @sap/cds-mtxs.

### Changed

- `cds init` uses latest Maven Java archetype version 1.34.0 for creating Java projects.


### Fixed

- `cds-ts watch` now honors a `tsconfig.json` in the project
- launch script for `CAP projects` in VS Code fixed

## Version 6.7.2 - 2023-04-27

### Added

- Added option `--skip-verification` to command `cds migrate`. It skips the extension verification to save memory. Requires `@sap/cds-mtxs@1.7.3`.

### Fixed

- Swagger UI no longer fails with an error `Value of 'namespaceAndName' parameter must be in the following format: <namespace>.<name>`

## Version 6.7.1 - 2023-04-19

### Changed

- `cds init` uses latest Maven Java archetype version 1.33.1 for creating Java projects.
- Bump `@sap/cds` to 6.7.1
- Bump `@sap/cds-mtxs` to 1.7.2

### Fixed

- Compatibility with @sap/cds versions >= 4.5 and < 6.2: avoid runtime errors with debugging disabled.

## Version 6.7.0 - 2023-03-28

### Added

- `cds upgrade` enables upgrading a tenant subscribed to a multitenant SaaS app to the latest base model.

### Changed

- `cds env --for` is now used to specify profiles; before it specified project paths, but never worked correctly.
- `cds add data` now uses comma as CSV separator by default instead of semicolon. This allows using GitHub tabular display.
- `cds add approuter` doesn't create entries for `authenticationMethod` and `authenticationType` any more, but uses the equivalent `@sap/approuter` defaults.
- `cds add multitenancy` will now create a sidecar MTX project for Node.js as well.
- `cds subscribe` and `cds unsubscribe` no longer require a username in case @sap/cds-mtxs is configured with dummy auth.
- `cds subscribe` and `cds unsubscribe` now rely on @sap/cds-mtxs (version 1.7.0 or higher).

### Fixed

- `cds watch`'s livereload feature may now use a local IPv6 address (`::1`) instead of always `localhost`. This is usually the case on Node.js 17 or higher.
- In all but `cds compile` errors where not handled correctly, especially compiler errors not displayed in human readable format.
- `cds init` creates project sample files correctly.
- CLI commands w/ unknown arguments (`cds --foo`) clearly fail again with a proper error message
- Reduce console output in case of multitenancy-related command failures.

## Version 6.6.2 - 2023-03-22

### Fixed

- Bump `sqlite3` to 5.1.6
- Bump `@sap/cds` to 6.2.2
- `cds init` creates project sample files correctly.

## Version 6.6.1 - 2023-03-09

### Added

- `cds compile --to openapi` now adds extension validation keywords `x-sap-precision` and `x-sap-scale` for decimal values.

### Fixed

- `cds add helm` fixed html5 cloud service is now read properly.
- `cds import` now flattens the `@Capabilities` annotation in the CSN for OData V4 files.
- `cds import` for OData V4 files now captures the `EnumTypes` information in the CSN according to `UnderlyingType`.
- `cds import` now captures the `@Common.Text` annotation value properly in the CSN for OData V4 files.
- `cds init --add java` now uses local Java version when creating new Java project.
- `cds watch` terminates properly in case livereload websocket clients are connected
- `cds watch`'s livereload feature works again on Node.js >= 17, where local IPv6 addresses are the default (`::1` instead of `127.0.0.1`)

## Version 6.6.0 - 2023-02-28

### Added

- `cds compile` added a new target format `asyncapi` to convert CDS models to AsyncAPI documents.
- `cds pull` now hints at base-model name for `using` statement.

### Changed

- `cds env` now allows inspecting entries with optional `get` command. E.g. `cds env requires.db`.
- `cds add multitenancy` now uses async SaaS Provisioning Service onboarding by default.
- `cds add multitenancy` for Java will now add  `sqlite3` to `devDependencies` in the sidecar `package.json`.
- `cds add extensibility` now works for Java projects out-of-the-box.
- `cds import` now captures the Edm Primitive types without [CDS mapping](https://github.tools.sap/cap/cds-dk/blob/main/edm2cdsTypeMapping.md) with annotation `@odata.Type` and marks the type as `cds.String`.
- `cds add helm` connectivity service instance is no longer created.
- `cds init` uses latest Maven Java archetype version 1.32.0 for creating Java projects.

### Fixed

- `cds unsubscribe --from` flag now recognized
- `cds import` now adds `cds.Boolean` as dummy return type if `ReturnType` for `FunctionImport` is missing in the OData V2 edmx.
- `cds import` resolves the `$Cast` construct in the CSN for OData V4 files.
- `cds lint` now reports like ESLint in case of missing plugin `@sap/eslint-plugin-cds`

## Version 6.5.2 - 2023-02-10

### Changed

- New versions of `@sap/cds-mtxs` and `@sap/cds-compiler`
- `cds init` uses latest Maven Java archetype version 1.31.1 for creating Java projects.

### Fixed

- `cds migrate` no longer fails because of authorization error

## Version 6.5.1 - 2023-02-06

### Changed

- `cds init` uses latest Maven Java archetype version 1.31.0 for creating Java projects.

### Fixed

- `cds deploy` no longer fails to write to a `package.json` file that has no `cds` section

## Version 6.5.0 - 2023-01-27

### Added

- `cds run/serve/migrate --resolve-bindings` now pulls required service credentials if bound via `cds bind`. (beta)
- `cds add helm` now supports multitenancy.
- `cds bind` now supports binding of `user-provided service instances` from Cloud Foundry.

### Changed

- `cds push` now runs a build of the extension project to update the pushed extension archive (unless custom archive given).
- `cds init` and `cds bind` no longer use a spinner when performing long running operations.

### Fixed

- `cds import` now generates flattened value for `@Common.FieldControl` annotation in the CSN for OData V4 files.
- `cds import` now treates `CollectionKind` property attribute in OData V2 similar to `Collection(<data_type>)` in OData V4.

## Version 6.4.1 - 2022-01-17

### Fixed

- `cds deploy -2 sqlite` now preserves the `schema_evolution` setting in the `package.json`.
- `cds import` bug fix for OData V4 import crash.

### Changed

## Version 6.4.0 - 2022-12-15

### Added

- `cds add helm` now supports approuter.
- `cds subscribe --local` starts `@sap/cds-mtxs` locally instead of contacting a running instance via URL.
- `cds unsubscribe` removes the subscription of a tenant from a SaaS app.

### Changed

- `cds add multitenancy` will not compile internal roles into the `xs-security.json` any more.
- `cds add hana` does not create a `hdi-service-name: ${service-name}` for the database resource properties any more.
- MTX-related commands now print usage help in case of known errors.
- `cds import` now adds the annotation `@open` for all the Entities and ComplexTypes with attribute `Abstract` or `OpenType` and adds the same for those referred by the attribute `BaseType`.
- `cds import` now adds default value in the CSN for the optional parameters in action/function for OData V4 files.
- `cds init` uses latest Maven Java archetype version 1.30.0 for creating Java projects.

### Fixed

- `cds init` no longer creates `engines` entry in package.json to avoid `unsupported engine` warnings.
- `cds subscribe` correctly exits the process after deploying to a HANA database.
- `cds add multitenancy` doesn't create a duplicate `saas-registry` resource if there's one with `service-plan: service` any more.
- `cds bind` now correctly maps the `hana-mt` and `sql-mt` shortcuts to the `cds.requires.db` entry.
- `cds add mtx` no longer fails if the `mtx/sidecar` folder doesn't exist.
- `cds compile --to xsuaa` now rejects expressions leading to invalid XSUAA attributes like `$user.foo-bar`, `$user.foo/bar`, `$user.foo.bar`
- `cds compile --to xsuaa -o <file>` now sets `.json` as file ending instead of `.xsuaa`

## Version 6.3.2 - 2022-11-28

### Changed

- Include `@sap/cds` 6.3.2
- Include `@sap/cds-compiler` 3.4.4
- Include `@sap/cds-mtxs` 1.3.2

## Version 6.3.1 - 2022-11-04

### Changed

- `cds init` uses latest Maven Java archetype version 1.29.0 for creating Java projects.
- Use `@sap/cds` 6.3.1
- Use `@sap/cds-mtxs` 1.3.1

## Version 6.3.0 - 2022-11-02

### Added

- `cds deploy --to h2 --dry` to create drop/create DDL for H2. Full deployment (w/o `--dry`) is not yet supported, though.
- `cds push <file>|<URL>` to specify a custom extension archive by local path or download URL.

### Changed

- `cds add` support for classic Java projects is now removed.
- `cds import` now adds the annotation `@cds.external` for all the definitions in the CSN along with the service.
- `cds import` now adds `notNull` entry for all the parameters and properties in the CSN.
- MTX Client now trims a passcode entered via prompt for convenience when pasting

### Fixed

- MTX Client now ignores a username potentially saved for the current project, if a passcode is given
- MTX Client now treats keytar as optional unless explicitly running `cds login`
- `cds import` now captures the documentation properly for all the EntitySet referring to same EntityType.
- `cds deploy --to sql` now produces 'plain' SQL again, suitable for e.g. H2.  In 6.2 it produced 'sqlite' dialect, erroneously.
- `cds compile --to openapi` now fixes the duplication of fields in `required` section.
- `cds lint` now recognizes ESLint configurations from _package.json_.


## Version 6.2.3 - 2022-10-21

### Changed

- Use `@sap/cds` 6.2.3
- Use `@sap/hdi-deploy` 4.5.0, which brings support for Node 18

### Fixed

- `cds mock` now prefers a local `@sap/cds` installation, like other `cds` commands as well.

## Version 6.2.2 - 2022-10-13

### Added

- `cds deploy --to postgres --dry` to create drop/create DDL for PostgreSQL. Full deployment (w/o `--dry`) is not yet supported, though.

### Fixed

- `cds deploy --to sql` now honors the `cds.sql.dialect` configuration to specify SQL dialects like `postgres`.

### Removed
- `cds add notebook` removed in favor of custom notebooks in VS Code (now part of the CDS Editor)

## Version 6.2.1 - 2022-10-10

### Fixed

- Installation errors with unresolvable `@sap/hdi` 4.4.0 are fixed.

## Version 6.2.0 - 2022-10-07

### Added

- `cds import` now imports Singleton entities for OData V4 files.
- `cds deploy` now supports the new default`.sqlite` file ending
- `cds add mta` no longer creates a `before-all` custom build command for Java single and multi tenant applications. Custom build commands are defined for `db-deployer` and `mtx/sidecar` modules instead.
- `cds import` now supports enum types for OData V4
- `cds add enterprise-messaging` can be now be used to set up configuration and deployment descriptors for SAP Event Mesh.
- `cds add` now throws an error if no facet is passed.
- `cds watch` now also considers more files from SAP Fiori (`change,variant,ctrl_variant,ctrl_variant_change,ctrl_variant_management_change`)

### Changed

- `cds add data` no longer creates CSV headers in UPPERCASE, but keeps the original case of the declared element.  Both styles work, but the latter is preferred.
- `cds pull` requires `@sap/cds` 6.2 or higher

### Fixed

- `cds import` now imports csn for OData V2 file even if the `association set` is missing and throws error if the corresponding `association` is missing.
- `cds import` now adds the annotation `@odata.Precision` entry only if precision > 0 for Edm.DateTime and Edm.DateTimeOffset.
- `cds compile --to openapi` now has schema Objects for `-create` and `-update` to only advertise "deep" insert/update for _containment_ navigation properties. Non-containment navigation properties are no longer mentioned.
- `.sqlite` files are now git-ignored in new projects created with `cds init`
- `cds compile --to openapi` now fixes the issue of failing range assertions for an element having undefined maximum and minimum range values.
- `cds import` now for OData V2 files doesn't throw warning for `EntityType` being referred as type in complex types, functions and actions, provided it is present in the file.

## Version 6.1.5 - 2022-09-13

### Fixed

- `cds build` no longer erroneously warns about old `@sap/cds` versions.  Previously, it warned about `@sap/cds` 4 although a newer version was installed.

## Version 6.1.4 - 2022-09-09

### Fixed

- `cds build` now works again with `@sap/cds` version 4.  Previously, this silently failed with no output.  However, a warning is now emitted that strongly recommends an upgrade to version 6.

## Version 6.1.3 - 2022-09-06

### Fixed

- `cds import` now gives higher precedence to complex type in case of name collision with actions or functions.
- `cds extend` and other commands no longer fail with `TypeError: Class constructor CliError cannot be invoked without 'new'`

## Version 6.1.2 - 2022-08-25

### Changed
- `cds init` uses latest Maven Java archetype version 1.27.1 for creating Java projects.

### Fixed
- `cds add helm` fixed JSON Schema for `srv` property in values.yaml
- `cds add helm` fixed env property errors for `hana_deployer` and `html5_apps_deployer`
- `cds add data` now creates proper data file names for entities in a `context`, i.e. `sap.common-Countries.csv` instead of `sap-common-Countries.csv`
- `cds import` now captures the parameter/property of collection type differently and the associated annotations are pulled out of the `items` object of the parameter/property entry in the csn.
- Remove redundant `console.log()` statement in `cds lint`
- `cds push` now shows complete error messages from extension validation
- `cds push` and related commands now show properly formatted error messages and also fail with a non-zero exit code in error situations

## Version 6.1.1 - 2022-08-11

### Added

- `cds import` now supports OData and SAP annotations for OData V4 imports.
- `cds compile --to openapi` defines operation-specific HTTP error response status codes with descriptions via `ErrorResponses` property of certain annotations.
- `cds compile --to openapi` now supports `--openapi:servers` option.
- `cds add multitenancy` will add feature multitenancy-specific configuration, without extensibility.
- `cds add toggles` will add feature toggle-specific configuration.
- `cds add extensibility` will add configuration for project extensibility.
- `cds add helm` now supports resource configuration for HANA deployment job and HTML5 app deployment job.
- `cds add helm` added JSON Schema for values.yaml
- `cds pull` will download the current CDS model of an extended SaaS app running with @sap/cds-mtxs.
- `cds push` will upload an extension to a SaaS app running with @sap/cds-mtxs.

### Changed

- `cds add helm` updated default resource requirements for both `java` and `nodejs` projects.
- `cds add helm` uses servicebinding.io bindings for CAP Java services, HANA and HTML5 app deployment jobs.
- `cds compile --to openapi` creates only component schemas for schemas referenced in operations and in other schemas.
- `cds import` switch from `@openapi.schema` to `@JSON.Schema`.
- `cds add mtx` will now add configuration for streamlined MTX. It effectively acts as a shortcut for `cds add multitenancy,toggles,extensibility`
- `cds add mtx` no longer includes `hana` and `xsuaa`.  To achieve the same effect as before, run `cds add mtx && cds add hana,xsuaa --for production`.
- `cds bind -2 <xsuaa service instance>` binds the CDS `auth` service to the XSUAA instance. Previously `uaa` was used.  This requires `@sap/cds` 6 or higher.
- `cds add lint:dev` updated to adjust to new api structure of `@sap/eslint-plugin-cds` v2.5.0
- `cds init` uses latest Maven Java archetype version 1.27.0 for creating Java projects.
- `cds login localhost:<port> -u <username>` now saves username (and empty password, if applicable) with project settings for convenience.
- `cds add` error handling is improved and will give suggestions if you make a typo.

### Fixed

- `cds add helm:connectivity`: `connectivity.configMapName` was not used for the `connectivity-proxy-info`.
- `cds import` replaced occurrences of `\\` with `/` in the `package.json` for Linux platforms.
- `cds import` fixed `@Core.Description` and `doc` property duplication.
- `cds extend` and `cds activate` no longer save any data (this is reserved to `cds login`).
- Extensibility commands now add http (not https) to local app URLs without schema.
- Extensibility commands don't query CF any longer when run against local apps.

## Version 6.0.4 - 2022-08-02

### Changed

- `cds init` uses latest Maven Java archetype version 1.26.1 for creating Java projects.
- Use `@sap/cds` 6.0.4
- `cds bind` handles orgs and spaces containing commas correctly.

## Version 6.0.3 - 2022-07-14

### Changed

- `cds init` uses latest Maven Java archetype version 1.26.0 for creating Java projects.
- `cds init` now creates Node.js projects with version 6 of `@sap/cds`

### Fixed

- `--vap-file` parameter of `cds deploy` is available again (removed in 6.0.0)
- `cds add helm:connectivity`: `connectivity.configMapName` was not used for the `connectivity-proxy-info`.
- `--vcap-file` parameter of `cds deploy` is available again (removed in 6.0.0)
- `cds add helm:connectivity`: `connectivity.configMapName` was not used for the `connectivity-proxy-info`.
- `cds add helm:connectivity`: Environment variables added for connectivity service for Java.
- `cds add helm`: Generation of `xs-security.json` file works on Windows now (`cds compile srv -2 xsuaa` command failed).


## Version 6.0.2 - 2022-07-06

### Changed

- Use `@sap/cds` 6.0.2

## Version 6.0.1 - 2022-07-05

### Changed

- Deprecated the `--for <filterPattern>` parameter of `cds add data` in favor of the new `--data:for`.  The former is still supported, but will eventually be removed, as it collides with the general `--for <profile>` parameter of `cds add`.

### Fixed

- `cds bind` api endpoint regex for cli now ignores trailing version info in url

## Version 6.0.0 - 2022-07-01

### Added

- `cds import` now supports importing external openapi specification file into CSN.
- `cds import` now supports the `--from` option to specify the protocol for importing an external file.
- `cds import` can be programmatically accessed using APIs `cds.import()`, `cds.import.from.edmx()` and `cds.import.from.openapi()`.
- `cds compile --to openapi` allows describing custom headers and custom query options.
- `cds import` now supports `HasStream="true"` for both OData V4 and V2.
- `cds compile --to openapi` now adds properties with `@mandatory` to the required field.
- Added a link to VS Code CAP Notebooks documentation to `cds init --add notebooks` and `cds add notebooks`.

### Changed

- `cds import` now uses `@odata.Type` and `@odata.Precision` for edm to cds type mapping.
- `cds compile --to openapi` now has better description for `$expand` query option.
- The original package `sqlite3` is now used again in its latest version.
- `cds import` now deprecated `cds.DecimalFloat` type.
- `cds import` now allows OData version 4.01 edmx files and supports `Scale="floating"`.
- `cds import` now adds `@odata.Type` annotation for `Edm.Byte` and `Edm.SByte`.
- `cds import` now has improved tests to check `--as`option with `force` flag file overwriting.
- `cds init` uses latest Maven Java archetype version 1.25.0 for creating Java projects.
- `cds import` now imports edmx file without any entities containing only unbounded action/function.
- `cds import` API now supports includeNamespaces option.
- `cds compile --to openapi` now adds `format`, `multipleOf`, `maximum` and `minimum` to anyOf.
- `cds import` will now mark an association as a composition when `OnDelete Action="Cascade"` is present.
- `cds import` has deprecated `--into` option.
- `cds bind` reads Cloud Foundry file `config.json` to get org and space information.
- `cds deploy` now stores connection information without credentials by default in `.cdsrc-private.json`.
- `cds deploy` has a new option `--store-credentials` to enforce the former behavior of storing credentials in `default-env.json`.
- If a `@sap/cds` is installed locally in a project, it must be version 4 or higher for CLI commands to run.
- `cds import` now doesn't trim the bound action/function name in the csn if the format of the name is A_B.
- `@sap/cds` version 6 is now required in new projects added by `cds init` and `cds add`.

### Fixed

- `cds add html5-repo` and `cds add destinations` throw an error if applied for MTA deployments, for which they are currently unsupported.
- `cds compile --to openapi` fixes annotations on bound action overloads.
- `cds add cf-manifest` now uses the correct `application` plan for the `xsuaa` service
- A combination of `cds add approuter`, `cds add mtx`, and `cds add mta` will now use a safer approach to determine the subscription URL.
- `cds init` and `cds add` output the feature names correctly in case the names contain a dash
- `cds compile --to openapi` fix for type error when entity/action is not specified in the service definition.
- `cds import` API fix for race condition issue.
- `cds somecdsfile --profile ...` (without the `compile` command) no longer ignores the given profile
- `cds watch` got more robust against unlucky timing and no longer runs into port conflicts


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
- `cds import` fix for supporting valid data types in unbounded function imports for OData V4.
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

- `cds bind` binds the given service to a HANA instance by storing the credentials in `.cdsrc.json` in your user home directory [beta].
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
