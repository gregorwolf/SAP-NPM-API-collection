# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## Version 9.6.0 - 2025-12-16

### Added

- `cds add console` adds dependency to the CAP console plugin.

### Changed

- `cds import` no longer generates a first parameter typed as `$self` to bound actions, as this parameter is implicit.
- `cds add` sets `relativePaths: true` for generated UI5 apps to avoid deployment issues if UI5 data sources start with a "/".
- `cds up` automatically detects the preferred platform.
- Added deprecation notices for the following commands in favor of using `cds add kyma`:
    - `cds add containerize`
    - `cds add helm`
    - `cds add helm-unified-runtime`

### Fixed

- `cds build --ws-pack` now checks folder depth of up to 5.
- `cds import --config param1=true,param2=0` now writes boolean and number values correctly to `package.json`.
- `cds add sample` sets the correct UI component in _\_appconfig/fioriSandboxConfig.json_.
- `cds add xsuaa` correctly adds the authentication binding to the application deployer if executed afterwards.
- `cds env` prints coloured output by default again.
- `cds add java` will preserve existing _package.json_ settings.
- `cds add multitenancy` now correctly adds a `devDependencies` section when missing.
- `cds add mta` adds fixes an issue where a faulty XSUAA instance was added with `messaging: true` configured.
- `cds add sqlite --for production` correctly activates SQLite for production, not just development.
- `cds up -2 k8s` correctly runs `before_all` before the checksum calculation to calculate against the correct artifact.

## Version 9.5.0 - 2025-12-01

### Added

- `cds import` now accepts `--into-namespace <string>` to override the namespace entities are imported to, when importing OpenAPI definitions.

### Changed

- `cds add portal` adds the correct service key configuration to the _mta.yaml_.
- `cds add sample` creates sample files aligned with recent versions of bookshop and bookstore in https://github.com/capire.
- `cds add sample` uses a matching ID in generated `manifest.json` and UI5 components.
- `cds build` uses `hdblogicalschema` and `hdblogicalschemaconfig` plugins in its default `.hdiconfig`.
- `cds add cloud-logging` adds required dependencies to _pom.xml_ for Java projects.
- `cds add kyma` is now the only suggested Kyma facet in `cds add help`.
- `cds add helm-unified-runtime` option is now deprecated; use `cds add kyma --unified-runtime` instead.
- `cds up --to k8s` now saves the checksum of buildpack images to determine if a rebuild is necessary.
- `cds up --to k8s` will interactively ask for registry credentials if they don't exist on the remote cluster.
- `cds build` automatically adds `contentLocalizedEdmx=true` to the java build task configuration if OData V2 is set.
- `cds add github-actions` has out-of-the-box support for Java projects.
- `cds add html5-repo` and `cds add app-frontend` do not create a separate _ui5-deploy.yaml_ but use the default _ui5.yaml_.
- `cds add` plugins allow merging into non-existing files with `cds.add.merge(<object>).into(<yaml-path>)`.
- `cds build` tasks that produce `csn.json` now emit the `compile.for.runtime` event, in alignment with other runtime CSN producers like `cds serve`. Plugins can use such events to hook into CSN creation.
- `cds add xsuaa` sets `credential-types: [ "binding-secret", "x509" ]` for XSUAA instances.
- `cds add hana` does not create an explicit `.hdiconfig` file any more as `cds build` provides defaults.
- `cds import` generates the on condition for a composition when the corresponding OData navigation property targets a collection, is contained (`$ContainsTarget` in OData EDM) and has a backlink (`$Partner` in OData EDM).
- `cds import` now considers OData contained navigation properties as compositions instead of associations.

### Fixed

- `cds add ias` will always add a binding to the MTX sidecar or approuter if required.
- `cds add ias` has improved support for multitenancy scenarios on Kyma.
- `cds lint` no longer fails with error code 1 and no message when loading the config fails.
- `cds version` no longer prints an `undefined` value for `@sap/cds-dk`.
- `cds compile --flavor files` no longer crashes with a `TypeError`.
- `cds add workzone` does not add superfluous `destinations` configuration to the `srv-api` import.

## Version 9.4.3 - 2025-10-29

### Added

### Changed

- `cds add github-actions` will use the `cap-js/cf-setup` action from GitHub marketplace instead of creating a local copy.
- `cds add containerize` omits the Unix-based `before_all` scripts in `containerize.yaml` in favor of a cross-platform compatible `cds up --to k8s` integration.
- `cds up --to k8s` now uses built-in containerization, eliminating the hard dependency on the `ctz` library.
- `cds up --to k8s` will interactively ask for a domain if it can't be determined from the current Kubernetes configuration.
- `cds build --for hana` no longer requires `.hdbgrants` and `.hdbrevokes` to be specified as a plugin in the `.hdiconfig` file.
- `cds import` no longer emits usage info when invoked with the dry option.

### Fixed

- `cds add data` fixes an issue where randomly generated `Decimal` and `Integer` values could exceed their defined precision or scale.
- `cds add pipeline` does not add UI5 template files in some cases.
- `cds add ias` does not write to the `mta.yaml` for non-MTA projects.
- `cds add ias` automatically adds the `authenticationType` to `xs-app.json` if required.
- `cds add ias` adds a binding to the approuter component if required.
- `cds import --from ...` yields a better error message for unknown import kinds.

## Version 9.4.2 - 2025-10-23

### Changed

- `cds add containerize` does not add app module installations scripts to its `containerize.yaml`. Use `cds up --to k8s` instead.
- `cds add` is less eager with respect to changing unaffected configuration.
- `cds add ias` adds less unnecessary configuration in combination with the HTML5 repository.
- `cds add test` includes the service name in the test suite description.

### Fixed

- `cds add ams` followed by `cds add mta` correctly generates the AMS deployer module.
- `cds add hana` does not fail if there's no `.cdsrc.json`.
- `cds up` doesn't try to create a symlink to the monorepo _package-lock.json_ if a submodule-local one already exists.
- `cds add test` creates correct OData URLs with unqualified entity names in service paths.
- `cds add http` skips contained composition targets.
- `cds add sample` no longer comes with an error when creating a Book through Fiori.
- `cds build` now places the `i18n` folder in the generated output root directory instead of nested locations.

## Version 9.4.1 - 2025-10-09

### Added

- `cds add app-frontend` is supported as an alias to `cds add app-front`.
- `cds add attachments` is supported for Java projects.

### Fixed

- `cds import` adds latest version 4 of `@sap-cloud-sdk` packages.
- `cds add sample` now uses Integer IDs for Books and Authors again, instead of UUIDs.

## Version 9.4.0 - 2025-10-02

### Added

- `cds add app-front` adds configuration for the new SAP BTP Application Frontend service.
- `cds add ias` has improved support for XSUAA hybrid projects.
- `cds add multitenancy` automatically adds upgrade hooks for Node.js projects.
- `cds deploy` support the generic `--resolve-bindings` option to resolve all bound services. This is helpful for use cases with multiple `hana`-tagged service bindings.

### Changed

- `cds add typescript` and `cds add typer` will now add a `path` entry in the project's _tsconfig.json_ or _jsconfig.json_ respectively, which will mitigate resolution problems with `@cap-js/cds-types`.
- `cds add multitenancy` adds the `with-mtx` profile to Java apps by default, simplifying local development.
- `cds import` for EDMX files now maps `Edm.String` types to `cds.String` (before: `cds.LargeString`). Background is that some databases don't support the resulting `NCLOB` type in key fields.
- `cds build` will now remove dev dependencies starting with `workspace:`, `file:`, as well as the entire `workspace:` block therein, and regenerate the _package-lock.json_ if needed.
- `cds import` for EDMX correctly imports multiline strings in `DefaultValue`.
- `cds import` now writes annotations from EDMX files in a flat, i.e. non-structured manner, so that they can be processed by the application runtime.
- `cds bind` does not fail when setting the profile via `CDS_ENV`.
- `cds version` is more robust with respect to Java versions.

### Fixed

- `cds add html5-repo` avoids some superfluous configuration combination with `cds add portal`.
- `cds add handler` ignores external services.
- `cds add audit-logging` correctly adds the dependency in the _Chart.yaml_ for Helm deployments.
- `cds deploy --to hana` works with user-provided HANA services.
- `cds bind` doesn't add the `custom-service:` prefix for Node.js any more.

## Version 9.3.2 - 2025-09-16

### Fixed

- `cds add html5-repo` avoids some superfluous configuration combination with `cds add portal`.
- `cds import` correctly imports OData v2 EDMX files with `Edm.Time` properties having a precision.

## Version 9.3.1 - 2025-09-08

### Fixed

- `cds add ias` correctly sets the `subscription-manager` dependencies endpoint for Node.js.
- `cds add data --records` respects the max length of a string field when it is annotated with `@Communication.IsEmailAddress`
- `cds add data --records --format csv` correctly escaping complex properties nested within structs.
- `cds add data --records` correctly generates values for structs in cases when the entity and the struct, used by the entity, have both a property with the same name.
- `cds add html5-repo` also binds the `html5-repo-host` service to the approuter.
- `cds up` has improved support for setups with multiple microservices.
- `cds add mta` will add no `role-collections` parameters if there are some specified in `xs-security.json`.
- `cds add github-actions` correctly generates a release workflow.
- `cds add github-actions` uses a simplified and more resilient Kyma setup script.
- `cds import` now correctly imports EDMX files with empty NavigationPropertyPath tags.
- `cds import` now correctly imports OData v2 EDMX files with `Edm.Time` properties, which have a precision.

## Version 9.3.0 - 2025-09-01

### Added

- `cds bind -a` is now also supported for Kyma, where the app prefix can be passed for `-a`, e.g. `bookshop-srv`.
- `cds build --for hana` now trims leading and trailing whitespaces in csv-Files if build option `trimCsvWhitespaces` is set.
- `cds add github-actions` sets required `permissions`.
- `cds up` supports a deployment layout where approuter or portal service configuration is in a top-level `.deploy` folder.
- `cds add ias` sets the `access-token-format` to `jwt` by default.

### Changed

- `cds add sample` provides more i18n translations.
- `cds add ias` sets the `xsuaa-cross-consumption` field to `true` by default.

### Fixed

- `cds add workzone` with missing `sap.app` config in `manifest.json` does not throw a `TypeError`.
- `cds add ias` adds a subdomain-less application URL in `redirect_uris`.

## Version 9.2.1 - 2025-08-22

### Changed

- `cds add github-actions` adds `if: always()` to the scripts retrieving Cloud Foundry logs.
- `cds up` uses a default timeout of 10 minutes for Helm upgrades.
- `cds bind` works out-of-the-box for PostgreSQL databases.
- `cds bind -a` gives warning if no services are bound to the targeted app.

### Fixed

- `cds add github-actions` won't try to merge a `cf-info` action if there's an existing `mta.yaml`.
- `cds add workzone` with missing `sap.app` config in `manifest.json` does not throw a `TypeError`.
- `cds compile --to xsuaa` generates roles for `@requires` in bound actions.
- `cds add lint` now adds proper configuration to enable linting of JavaScript and TypeScript files in VS Code.
- `cds add mta` does no longer adds services in `mta.yaml` for plugins coming from `devDependencies`.

## Version 9.2.0 - 2025-07-31

### Added

- `cds add xsuaa` now also creates a default `role-collections` field in the `mta.yaml`.
- `cds add github-actions` (shortcut `gha`) adds pipeline configuration for GitHub Actions.
- `cds add kyma` as a shortcut for `cds add helm,containerize`.
- `cds add multitenancy` creates a `package-lock.json` in `mtx/sidecar` for Java projects if not existing.
- `cds build` provides more defaults in its standard `.hdiconfig`.

### Changed

- `cds up` auto-creates `package-lock.json` if required for `app/router`, `app/portal`, and `app/html5-deployer`.
- `cds up` does not do retries when not running in CI/CD (`CI` environment variable is not set).
- `cds add html5-repo` uses a folder `app/html5-deployer` instead of `ui-resources` for Kyma.
- `cds add http` now generates auth headers with `:` separators again, as this is the only separator supporting empty passwords with the RestClient extension in VS Code. (For use with IntelliJ, separate username and password with a blank.)
- `cds add html5-repo` will add the destinations to the application content deployer instead of the service instance.
- `cds add helm` exposes the `srv` module by default in Kyma scenarios.
- `cds add multitenancy` with Helm exposes the sidecar URL for consumption by Java.
- `cds add ias` will use the `production` profile by default, if no other profile is specified.
- `cds add http` now uses the proper service name in the generated requests.
- `cds build` error messages for build plugins are improved.

### Fixed

- `cds add multitenancy` for Kyma with IAS correctly adds the `subscription-manager` service.
- `cds watch/run myapp/` now outputs correct error locations like `myapp/srv/broken.cds` instead of `srv/broken.cds`.  These locations can be opened from shells as they are relative to the working folder, not to the project folder.
- `cds add data --records` now correctly generates decimals within the range of the specified precision and scale.

## Version 9.1.3 - 2025-07-24

### Fixed

- Fix installation issues with version 9.1.2.

## Version 9.1.2 - 2025-07-24

### Fixed

- CVE-2025-7783: vulnerability with `form-data` versions <4.0.4.
- `cds build --for hana` no longer excludes external entities when not in mocking mode.

## Version 9.1.1 - 2025-07-10

### Added

- shipping an `index.d.ts` file containing a subset of the dk types now.

### Changed

- `cds add http` now generates auth headers with `:` separators again, as this is the only separator supporting empty passwords with the RestClient extension in VS Code. (For use with IntelliJ, separate username and password with a blank.)

### Fixed

- `cds deploy --to hana --no-build` now works correctly
- fixed bug in call from SAP Business Application Studio wizard

## Version 9.1.0 - 2025-07-02

### Added

- `cds add test` to generate test files for CDS services [experimental]
- `cds debug --no-devtools` allows to skip opening the developer tools.

### Changed

- `cds add helm` doesn't route the subscription callbacks through the app router any longer.
- `cds lint` now uses local copy of `eslint` help content.
- `cds add cloud-logging` will correctly add the Helm dependency to `Chart.yaml`.

### Fixed

- `cds add hana` for Java correctly adds the HANA dependencies to `chart/Chart.yaml`.
- `cds add xsuaa` for Java doesn't throw an error when the `.cdsrc.json` is not existing.
- `cds build --for fiori` stores EDMX files again relative if `dataSources.mainService.settings.localUri` in UI5's `manifest.json` is a relative path.
- `cds add ams/ias` add the `repository` in combination with `cds add helm-unified-runtime`.
- `cds add xsuaa` adds a wildcard prefix to the domain name to allow for multitenancy use cases.
- `cds add portal` for Java binds the HTML5 repo runtime and portal service to the Java server instead of the MTX sidecar, to allow for CAP Java built-in dependencies resolution.
- `cds repl --run` can now run again w/o `@cap-js/cds-test` installed.
- `cds push` and other commands now handle request errors more robustly
- `cds debug` now also honors the `--host` parameter when it starts `cds watch`.

## Version 9.0.6 - 2025-06-18

### Changed

- `cds build` now adds an `engines.node = ">=20"` entry to the effective _package.json_ iff it is missing from the project's _package.json_ to avoid engine confusion when deploying to Cloud Foundry
- `cds add` without any flag now shows the help (`cds add --help`) instead of throwing an error

## Version 9.0.5 - 2025-06-06

### Changed

- `cds init` uses latest Maven Java archetype version 4.0.2 for creating Java projects.

### Fixed

- `cds build` for extensions now filters built-in entities such as `cds.outbox.Messages` to fix the extension upload with `cds push`.
- `cds add data` now correctly works for nested structured properties.
- `cds add data/http` no longer create decimal numbers with too many precision places

## Version 9.0.4 - 2025-05-28

### Changed

- `cds add typescript` adds a `tsx` dependency. It no longer adds a `watch` script pointing to `cds-tsx` because `cds watch` will run `tsx` automatically.

### Fixed

- Bring shrinkwrap back.
- `cds import --from edmx` no longer produces invalid CSN for function imports with return types of the same name.
- `cds watch` no longer shows the outbox model for empty projects.

## Version 9.0.3 - 2025-05-26

### Changed

- `DEBUG=build cds build` does not log the CDS env any more.
- `cds init --java:mvn` does not prefix the `-D` to options any more to allow for options not starting with `-D`.
- `cds add html5-repo` for Helm does not add XSUAA configuration for IAS-only projects.
- `cds add html5-repo` for Helm has improved support for IAS.
- `cds watch` with `tsx` will no longer be print notifications to `console.log` without environment variable `DEBUG` set.
- `cds add html5-repo` will add missing `requires` for its `build-parameters` setting, even if ran with a preexisting `requires` key.
- `cds unknown-command valid-file.cds` now fails due to the unknown command instead of compiling the cds file.

### Fixed

- `cds up -2 k8s` fails for errors in `ctz` instead of only logging the messages.
- `cds add helm` now correctly prompts for the registry server.

## Version 9.0.2 - 2025-05-09

### Fixed

- `cds add multitenancy` adds the `@sap/cds-mtxs` to `devDependencies` in for Java projects.
- `cds add ias` rewrites the `url: ~{srv-url}` to `url: ~{srv-cert-url}` if required.
- `cds add ias` adds `forwardAuthCertificates` and `strictSSL` settings to the app router if required.

## Version 9.0.1 - 2025-05-08

### Added

- `cds debug --force` automatically enables SSH for Cloud Foundry application instances.
- Faster table deployments on SAP HANA using HDI param `com.sap.hana.di.table/try_fast_table_migration=true` in `cds build --for hana`, `cds deploy --to hana`, `cds add hana`.

### Changed

- Change license from SAP DEVELOPER LICENSE AGREEMENT '3.1' to '3.2 CAP'. See https://cap.cloud.sap/resources/license/developer-license-3_2_CAP.txt.
- The `CHANGELOG.md` file now only contains changes from 8.0.0 onwards.
- cds-dk now requires `@sap/cds` version 8.3.0 or higher. An error is raised for older versions.
- cds-dk now requires `@sap/cds-mtxs` version 2 or higher.
- `cds add multitenancy` and `cds add xsuaa` use the `production` profile by default.
- `cds add helm` uses a default for the Docker secret name (`docker-registry`), instead of asking for it in interactive mode.
- `cds add helm` uses the pre-configured domain name for your Kyma cluster as a default, instead of asking for it.
- `cds add workzone` uses the backend destination `srv-api` instead of `{{appName}}-srv-api` on Cloud Foundry.
- `cds add approuter` in combination with `xsuaa` adds a `redirect-uris` to `mta.yaml` for Cloud Foundry projects.
- `cds build --ws-pack` now recursively packs dependencies from workspaces. If the `workspaces` definition in the project root contains glob patterns with braces `{…}`, Node.js 22 or later will be required.
- `cds add xsuaa` adds a `redirect_urls` to the `mta.yaml` for Cloud Foundry projects.
- `cds deploy --to hana` throws an error if an unsupported option is passed.
- The Node version in `gen/db/package.json` file generated by `cds build` is now `>=18`, matching to what `@sap/hdi-deploy` specifies.
- `cds watch` only auto-resolves bindings if either `CDS_ENV` or `--profile` are set.
- `cds compile --help` no longer mentions the `hdbcds` format.
- `cds add pipeline` also creates UI5 resources if required.
- `cds add hana` does not add `native_hana_associations` configuration any more.
- `cds up` supports embedded multitenancy scenarios with no sidecar.
- `cds lint` requires projects to install `eslint` locally (or system-wide), as `cds-dk` will no longer include `eslint` internally.
- `cds add telemetry` adds limits the version of added `@opentelemetry` dependencies to `<0.200`.
- `cds add cf-manifest` uses a 1 GB disk quota instead of 512 MB for Java apps.

### Removed

- `cds build --clean` is removed.
- `cds build` no longer supports configuration with `cds.data` and `cds.service` in package.json.
- `cds watch` still allows options `--include` and `--exclude`, but CDS configuration is ignored.
- `cds deploy --to hana --store-credentials` is removed.

### Fixed

- `cds up` has improved support for monorepos.
- `cds add html5-repo` works in combination with multitenancy when no app router or Work Zone is set up.
- `cds add dynatrace` sets the `environment_name` property according to the specification.
- `cds deploy --to hana` now supports `--with-mocks`.
- `cds bind` gives better error messages if the Cloud Foundry org or space are not found.
- `cds add enterprise-messaging` with xsuaa now adds `processed-after` in the `mta.yaml`.
- `cds deploy --to hana` correctly hands over `--profile` to `cds build` when deploying.
- `cds import` adds `@mandatory` annotations to properties marked as `required` in the schema.
- `cds add ams` for Java adds a custom builder to the `mta.yaml` to circumvent the missing `srv/src/gen/policies`.
- `cds add multitenancy` requires the `srv-api` instead of the `mtx-api` for Java projects.


## Version 8.9.12 - 2025-12-16

### Fixed

- `cds import` generates the on condition for a composition when the corresponding OData navigation property targets a collection, is contained (`$ContainsTarget` in OData EDM) and has a backlink (`$Partner` in OData EDM).
- `cds import` now considers OData contained navigation properties as compositions instead of associations.
- Support for `hdb` v2.

## Version 8.9.11 - 2025-11-21

### Fixed

- Bump dependencies in shrinkwrap.

## Version 8.9.10 - 2025-09-19

### Fixed

- Updated shrinkwrap to include `@sap/cds-compiler` version 5.9.12.

## Version 8.9.9 - 2025-09-16

### Fixed

- CVE-2025-58754: vulnerability with `axios` versions <1.12.0.

## Version 8.9.8 - 2025-07-24

### Fixed

- CVE-2025-7783: vulnerability with `form-data` versions <4.0.4.

## Version 8.9.7 - 2025-07-17

### Fixed

- Bump dependencies in shrinkwrap.

## Version 8.9.6 - 2025-06-05

### Fixed

- Bump dependencies in shrinkwrap.

## Version 8.9.5 - 2025-06-05

### Fixed

- Bump `tar-fs` to address CVE-2024-12905.
- `cds add data` now correctly works for nested structured properties.
- Help text of `cds debug`.

## Version 8.9.4 - 2025-05-26

### Changed

- `cds init` uses latest Maven Java archetype version 3.10.1 for creating Java projects.

## Version 8.9.3 - 2025-04-24

### Fixed

- `cds add workzone` uses the backend destination `srv-api` instead of `{{appName}}-srv-api` on Cloud Foundry.
- `cds init` uses latest Maven Java archetype version 3.9.1 for creating Java projects.

### Changed

- `cds add pipeline` also creates UI5 resources if required.

## Version 8.9.2 - 2025-04-16

### Fixed

- `cds bind` gives better error messages if the Cloud Foundry org or space are not found.
- `cds add html5-repo` works in combination with multitenancy when no app router or Work Zone is set up.

### Changed

- The Node version in `gen/db/package.json` file generated by `cds build` is now `>=18`, matching to what `@sap/hdi-deploy` specifies.
- `cds` commands now fail if used in combination with the upcoming `@sap/cds` version 9.

## Version 8.9.1 - 2025-04-04

### Fixed

- `cds build` restores compatibility with `@sap/cds` 7, no more crashing there with `TypeError: Cannot read properties of undefined (reading 'enabled')`.
- `cds add containerize` works if run before `cds add helm`.
- `cds add http` no longer writes headers starting with a placeholder (IntelliJ compatibility)
- `cds init --force` overwrites existing files.

## Version 8.9.0 - 2025-03-31

### Added

- `cds import` now adds Cloud SDK dependencies to package.json if an OData service is imported.
- `cds deploy --to hana --on k8s` is now supported.
- `cds up` automates freezing dependencies, building, and deploying your application.
- `cds pull` includes existing extensions if the server is configured accordingly.

### Changed

- `cds build` logging is simplified.
- `cds add html5-repo` ignores folders in `app/` starting with `.`

### Fixed

- `cds add telemetry` is order-independent with other `cds add` commands for Java.
- Build task `mtx-extension` now fails with exit code 1 in case of build errors.

### Removed

- Removed `before:cds-watch` script.

## Version 8.8.2 - 2025-03-21

### Fixed

- Bump axios to 1.8.4, fixing CVE-2025-27152

## Version 8.8.1 - 2025-03-11

### Fixed

- `cds init` uses latest Maven Java archetype version 3.8.0 for creating Java projects.
- `cds init --add lint` writes complete eslint.config.mjs.
- `cds import` no longer fails with an `EXDEV` error in `docker` containers.
- `cds import` json schema now contains correct references.

## Version 8.8.0 - 2025-03-03

### Added

- `cds add xsuaa` lets you pass a `--plan` option, e.g. for `cds add xsuaa --plan broker`.
- `cds add workzone` and `cds add workzone-standard` support for Kyma.
- `cds add typer` now adds a `before:cds-watch` script to run cds-typer before starting `cds watch`.
- `cds watch` supports a `before:cds-watch` npm script in your `package.json`, executed once before the initial `cds watch` startup.

### Changed

- Running `cds deploy` in dry mode with an output file specified will now only produce a warning in stderr and will not exit with an error code.
- `cds deploy --out …` will not generate the specified output file if it would end up empty.
- `cds add workzone` adds a transpilation task for UI5 deployment descriptors in TypeScript projects.
- `cds add workzone` does not use the deprecated `webide-extension-task-updateManifestJson` task any more.

### Fixed

- `cds add approuter` doesn't create entries for `app` and `appconfig` local directories any more.
- `cds add telemetry` for Java doesn't erroneously add `cds` configuration or `dependencies` to the `package.json`.
- `cds add sample` adds the workzone-specific configuration if `cds.requires.workzone` is `true`.
- `cds compile -o` uses the correct file suffix if explicitly specified in the file name.
- `cds bind` caches the promise of its `cf -v` call to prevent race conditions.
- `cds import --out <folder>` does not fail if executed in a folder with a `.`.
- `cds add workzone` has improved support for multitenancy.

## Version 8.7.3 - 2025-02-19

### Fixed

- `cds compile -o` fixes the output file name in `-o <service>.json`.
- `cds lint` won't stumble over scalar config objects anymore.
- `cds init` uses latest Maven Java archetype version 3.7.2 for creating Java projects.
- `cds deploy --to hana --dry` doesn't exit with a `TypeError` if there are no models.
- `cds add ias` fixes a few scenarios in combination with multitenancy.

## Version 8.7.2 - 2025-02-14

### Fixed

- `cds compile -o` with a file name such as `cds c srv/cat-service.cds -o srv/cat-service.json`.
- `cds compile` without `-o` doesn't print the file name header for single services any more.
- `cds add workzone` in combination with multitenancy doesn't throw an error any more.
- `cds import --from rfc` stores the input file again in `srv/external/<destination>/...` instead of `srv/external/...`.
- `cds import --name` no longer crashes with a `TypeError`.
- `cds import --out <filename>` no longer crashes with a `Error: EEXIST`.
- `BuildError` no longer cuts off its stack.
- `cds bind -a` doesn't concurrently try to check the Cloud Foundry version or OAuth token.
- `cds import` now resolves target of association/composition correctly for multiple schema files.

## Version 8.7.1 - 2025-02-04

### Fixed

- `cds add mta` now sets `parameters.instances` explicitly to `1` in Java projects, same as for Node.js projects.
- `cds add mta` does not add the `readiness-health-check-type` and `readiness-health-check-http-endpoint` properties to the `mta.yaml` any more.
- `cds add -p` correctly parses plugin-contributed options.
- `cds watch` correctly escapes its default ignored directories on Windows.
- `cds compile` correctly uses `--service=all` as its default.
- `cds add ias` correctly writes MTX sidecar config in combination with `cds add multitenancy`.

## Version 8.7.0 - 2025-01-28

### Added

- `cds watch` supports `--exclude` and `--include` options to specify additional paths to include or exclude. Alternatively, set `cds.watch.[include|exclude]` in your CDS config.
- `cds import` now updates configuration for Java projects (in `application.yaml` etc.)
- `cds import --config` now also accepts a string with flat key-value pairs (like `--config "credentials.destination=foo"`), which is easier to write than the current JSON string (`--config "{\"credentials\": {\"destination\": \"foo\"}}"`).
- `cds debug` now supports Java applications, both local and remote.
- `cds import` can now import an odata-V4 file with external dependencies(odata-V4 file). Dependencies has to be provided with -d/--dependencies option and must not have any external dependencies.

### Changed

- `cds add mta` sets backend and MTX `parameters.instances` to a default of `1` for improved discoverability.
- `cds add sample` generates sample .ts files if the project is a TypeScript project
- `cds import` now doesn't need beta flag to populate default value for optional action and function parameters as compiler now supports default value for @Core.OptionalParameters.
- `cds add portal` now uses a more generic sample translated title instead of "Bookshop".

### Fixed

- `cds add mta` in combination with `cds add ias` correctly adds all routes to the backend module.
- `cds add mta` adds the DB deployer module without prior installation of `@cap-js/hana`.
- `cds add mta` adds the npm-ci builder for nodejs modules to use fixed package-lock versions for dependency vendoring.
- `cds build --ws` will no longer require a `db/` folder in the root directory of the project.
- `cds import` doesn't throw error while importing odata-V4 file with com.sap.vocabularies.

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
