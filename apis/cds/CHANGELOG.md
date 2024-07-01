# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](http://keepachangelog.com/).
- This project adheres to [Semantic Versioning](http://semver.org/).


## Version 7.9.3 - 2024-06-27

### Fixed

- `cds compile --to serviceinfo` returns the correct URL path for Java applications.
- Prevent HANA deadlocks when processing outbox table
- Invalid cache for `SiblingEntity` requests
- `cds.test` recommends version 7 of `chai-as-promised`.  Version 8 is ESM-only and does not work with `cds.test` at the moment.
- Loading of `cds.plugins` now respects the (internal!) property `cds.env.plugins` again.
- `req.data` and `req.INSERT.entries` were not pointing to same object if it contains more than one entry.

## Version 7.9.2 - 2024-05-22

### Fixed

- Server crash in case of certain errors in Cloud SDK
- Bug in restriction of entities modeled as composition of aspects
- `$search`: resolve an exception accessing `req.query.elements`
- Ignore flattened associations in projection on remote entities
- Falsy keys in `cds.ql` were ignored in usage like `SELECT.from(Books, 0)`

## Version 7.9.1 - 2024-05-13

### Fixed

- `cds.compile.to.sql` doesn't fail for older compiler versions if `postgres` keywords aren't defined
- `cds compile --to serviceinfo` no longer detects a Java project if there is a pom.xml file in a subfolder of `app/`
- `acquireTimeoutMillis` is ensured if custom pool config is provided

## Version 7.9.0 - 2024-04-30

### Added

- Option `cds.env.sql.transitive_localized_views: false` to skip generating transitive localized views for entities which don't have own localized elements, but only associations to such. Supported for Java and new database services in Node.js (ignored for old ones).
- Option `cds.env.sql.native_hana_associations: false` to skip generating native HANA associations.
- Running `cds compile --to sql` with `@cap-js/sqlite` installed now uses `session_context('$user.locale')` in generated DDL statements instead of generating static localized views for 'en', 'fr', and 'de' (same for `cds.deploy`).
- `api`: export reserved keywords for postgres via `cds.compiler.to.sql.keywords.postgres`
- Kind `legacy-hana` and profile `better-hana` for local testing scenarios.
- Support for PDF files (MIME type `application/pdf`) when the `cds.env.features.odata_new_adapter` flag is set to `true`
- Lean draft: Support for filtered compositions (remain in the document)
- Support for `COUNT_DISTINCT` as OData data aggregation default method
- Better support for `profiles` in cds schema for `package.json` and `.cdsrc.json`
- Performance improvement for generating `@odata.context` url if `cds.features.odata_new_parser` is enabled
- Alpha support for SAP Event Broker-based messaging (kind `event-broker`)

### Changed

- Deprecated *INSERT.into(...) **.as** (SELECT...)* → use *INSERT.into(...) **.entries** (SELECT...)* instead.
- Default value of `cds.env.log.mask_headers` changed to `['/authorization/i', '/cookie/i', '/cert/i', '/ssl/i']` (adding `'/cert/i'` and `'/ssl/i'`)
- Error messages for entities annotated with '@cds.autoexpose'
- For Java apps `cds.sql.transitive_localized_views` now defaults to `false` to create less database views.
- For Java apps `cdsc.betterSqliteSessionVariables` now defaults to `true` to enable session variables on H2 and SQLite by default.

### Fixed

- `cds.compile.to.yaml` produced invalid YAML for compacted lines
- Handling of If-None-Match header for non-existing entity
- Revert json schema for cds schemas to `draft-07` to prevent VS Code warnings about unsupported schema features.
- Remote services: JSON representation of error shall include `request` and `response`
- Aliasing of associated entity column in case of expand by CQN build with joins.
- `$apply` scenarios when used alongside `cds.env.features.odata_new_adapter = true` and the new database layer
- ETag handling combined with where restrictions
- `cds compile --to hdbtabledata` now correctly supports CSV files using format `.texts_<lang>.csv`. Before the `include_filter` wasn't set in the generated `.hdbtabledata` files.
- `cds` commands no longer crash when executed in the `@sap/cds` installation dir.
- `cds.infer`: exposed association of query is inferred as `cds.Association` and not as it's target

## Version 7.8.2 - 2024-04-22

### Fixed

- `.find` and `.filter` in `linked.entities()` now returns values instead of names
- `cds.app.serve.from(pkg,folder)` did not consider `pkg` for serving static resources

## Version 7.8.1 - 2024-04-11

### Fixed

- In some cases, `<entity>.drafts` erroneously pointed to a CSN entity stub.
- Feature vectors including falsy values like `{ ft1: true, ft2: true, ft3: false }`

## Version 7.8.0 - 2024-03-25

### Added

- Health check endpoint `/health` in default server
- Class `cds.service` now provides getters for `entities`, `types`, `events` and `operations`. These return iterable objects, which can be used in `for...of` loops.
- Class `cds.entity` getters for `keys`, `associations`, `operations` also return `Iterable` objects now
- Method `compile.to.serviceinfo()` now lists all Node.js service endpoints in cases where multiple protocols are configured. For Java, the list is still limited to the first endpoint. This will be fixed in a future release.
- More warnings for deprecated features, functions and annotations.

### Fixed

- Reverted `cds.Association` being derived from `cds.struct`; it's now derived from `cds.type` again.
- Entity definitions using joins were erroneously marked as `_unresolved`
- Consistent error messages for query options validation with new parser
- Validation for mandatory associations which target entities with defaulted keys
- Transaction handling for aborted streaming requests
- Create/Update over filtered managed compositions
- Templates are cached at the model (instead of the service)
- Deprecation warnings use `cds.log()` in production
- Single quote in a string in `.where` for remote service
- Escaped characters in double quoted search term when using `odata_new_parser`

## Version 7.7.3 - 2024-03-18

### Fixed

- `cds.log`: preserve message property of details through stringification (it's non-enumerable if the detail entry is an error)
- Auto-exposed child entities with multiple restrictions
- Calculation of read-only values in custom code during creation of new drafts

## Version 7.7.2 - 2024-03-11

### Fixed

- Requests to actions/functions on entities in draft state via navigation.
- PUT/PATCH with if-none-match: * forces insert

## Version 7.7.1 - 2024-03-06

### Fixed

- JWT authentication for Event Mesh endpoints
- `cds.log`'s json formatter: ensure `type` is set (required on kubernetes until CLS defaults this)
- Erroneously generated foreign keys in `req.data` for UPDATE using path expressions
- `INSERT.columns.rows` for multiple nested composition of aspects
- Paths passed to `tar` on Windows are now normalized to use forward slashes.

## Version 7.7.0 - 2024-02-26

### Added

- Improved trace output for bootstrap phase. For example try that:
   ```js
   DEBUG=trace cds w bookshop | grep trace
   ```
- Support for `@odata.draft.bypass` to allow direct modifications of active instances.
- `req.user.tokenInfo` for `@sap/xssec`-based authentication (`ias`, `jwt`, `xsuaa`)
- `cds.fiori.draft_lock_timeout` as successor of `cds.drafts.cancellationTimeout`.
  + Possible values are /^([0-9]+)(h|hrs|min)$/ or a number in milliseconds.
- There is a new `sap.common.Timezones` entity with a basic time zone definition. There will be accompanying data in package `@sap/cds-common-content`.
- Deprecation warnings for configuration options `cds.drafts.cancellationTimeout`, `cds.features.serve_on_root`, `cds.features.stream_compat`, `cds.fiori.lean_draft` and `cds.requires.middlewares`, as well as for the properties `req.user.locale` and `req.user.tenant`. The deprecation warnings can be turned off by setting `cds.features.deprecated` to `off`.

### Changed

- The index page now lists all service endpoints, which is important for services that are exposed through multiple protocols.
- `cds.deploy` improves error diagnostics with deeper `Query` object inspection.
- Slightly changed the default export for ESM compatibility. This fixed failing ESM imports in Vitest tests.

### Fixed

- Persistent outbox must not be used for `t0` tenant.
- Second `await cds.connect.to('X')`, where initialization of `X` results in an error, did not return.
- Support additional draft requests.
- `cds.log` with `null` as argument.

## Version 7.6.4 - 2024-02-21

### Fixed

- Emitting multiple message with an in-memory outbox
- Occasional crash for invalid draft requests
- On the index page, aditional links now show up again for non-OData services.
- Handling of thenables for queries

## Version 7.6.3 - 2024-02-13

### Fixed

- Event Mesh webhooks now add standard `before` middlewares in case of custom authorization
- `compile.to.serviceinfo` no longer fails for services marked with `@protocol:'none'`. Such internal services are not shown in the output.

## Version 7.6.2 - 2024-02-09

### Fixed

- Introduce i18n `BATCH_TOO_MANY_REQ` key for error message: "Batch request contains too many requests"
- Properly handle `$orderby` in lean draft
- View resolving in combination with `@cap-js/cds-db`
- Allow `cds.requires.someService.outbox` to be a string
- `cds.log`: errors, when not the first argument, were considered objects carrying custom fields
- `accept` header parsing for OData requests if quality factor `q` is included
- Broken links on index page if multiple protocols are configured

## Version 7.6.1 - 2024-01-30

### Fixed

- Garbage collection of draft is configured with `cds.fiori.draft_deletion_timeout`

## Version 7.6.0 - 2024-01-29

### Added

- `cds.upsert` as shortcut for `cds.db.upsert`
- Automatic deletion of stale drafts. Feature is enabled if `cds.env.fiori.deletionTimeout` is set to a value of `true`; `true` uses the default timeout of `30d` (30 days).
- Support for default exports (ESM/TS) in custom authentication
- Support for executing SAP HANA procedures from SYS schema
- Support for more complex on-conditions in case of READ requests
- Best effort mechanism for supporting lambda expressions targeting remote odata-v2 services
- Support for actions and functions which are bound to singletons

### Changed

- Draft: Standard Sorting Behavior for SAP Fiori List Report Floorplan
- Use new CDS schema for validation and code completion in `package.json` and `.cdsrc.json` files
- Media Data Streaming
  + OData: Large binaries without `@Core.MediaType` annotation were previously returned as base64-encoded buffer. Starting from this `@sap/cds` version also not-annotated large binaries are ignored by OData. It is strongly recommended to annotate all large binary properties with `@Core.MediaType` and use it according to streaming scenarios.
  + Custom Handlers: `SELECT` with explicitly listed `SELECT.columns` of type `cds.LargeBinary` returns them as Readable streams. Large binary columns requested implicitly by `SELECT` (for example, with `.columns('*')`) are ignored.
  + Streaming API: `cds.stream()` and `srv.stream()` are deprecated and will be removed with the next major release. Use `SELECT` with a single `cds.LargeBinary` column instead. The resulting object will contain the name of the column and a stream value. For example, `SELECT.one.from(E).columns(['image']).where(...)` returns `{ image: <media stream> }`.
  + Backward Compatibility: To restore previous behavior use `stream_compat`.

### Fixed

- `cds.minify` returned a shallow clone. When callers like 2sql `cds.linked` that subsequently, this left the passed-in csn in a broken, partially linked state. Now, `cds.minify` doesn't clone anymore, but modifies the passed in csn.
- Handling of read-only fields in drafts
- Event Mesh: Better error message for incoming messages without a topic
- `cds build` now logs a better error message if an incompatible `@sap/cds` version is used.
- Better error message for runtime requests to non-existing tenants in extensibility scenario.
- Do not generate UUIDs for association key during `CREATE` operation.
- OData aggregation with lean draft
- Sorting in new odata parser with nested select statements. The default sort order is now added to the outer select statement.
- Server crash in case of misformatted `groupby` transformation in `$apply`
- Switched EM webhook endpoints to also use new authentication implementation
- `odata_new_parser`: better error message and code for expand on non-existing elements

### Removed

- Experimental `STREAM` CQN is removed and cannot be used anymore

## Version 7.5.3 - 2024-01-23

### Fixed

- `cds.localize` and `cds build` produce `i18n.json` again with keys from all base languages
- `cds.compile.to.serviceinfo` now correctly parses SpringBoot config with nested objects, e.g. for `cds.odata-v4.endpoint.path`
- Recommend to use `chai` 4 for the time being, as `chai` 5 doesn't properly work yet (requires ESM, `chai-as-promised` not working)
- View resolving for entities using property names that are identical to entity names
- Direct modifications with `cds.fiori.bypass_draft` if `cds.fiori.draft_compat` is not enabled
- Draft: Field validation error message does not display the name of the field

## Version 7.5.2 - 2024-01-05

### Fixed

- Service-level ETag handling in legacy OData server
- Only provide model to ModelProvider if extensibility or feature toggles are active
- OData server driven paging when using feature flags `cds.env.features.odata_new_parser` and `cds.env.features.okra_skip_query_options`

## Version 7.5.1 - 2023-12-21

### Fixed

- Resolving custom authentication implementation pointer

## Version 7.5.0 - 2023-12-14

### Added

- Support for expressions in where clause of `@restrict` annotation.
  + Example: `@(restrict : [{ grant : ['*'], where : (NAME = $user) }])`
- Function `cds.unboxed(srv)` to get the non-outboxed variant of the service
- Service implementations can now be provided in .mjs modules.
- Remote services: advanced configurable `CSRF` token fetching HTTP method and the URL.
  For example, in the configuration of your remote services, you can now configure the HTTP method and URL as follows:
  ```json
  "cds": {
    "requires": {
      "API_BUSINESS_PARTNER": {
        "kind": "odata",
        "model": "srv/external/API_BUSINESS_PARTNER",
        "csrf": { // this configuration implies `csrf: true`
          "method": "get",
          "url": "..."
        }
      }
    }
  }
  ```
- `cds.log`'s built-in JSON formatter:
  + Extract custom fields (`cds.env.log.als_custom_fields`) and categories from args (not only error-like first objects)
    + Example: `LOG.info('foo', { query: 'SELECT * FROM DUMMY' }, 'bar', { categories: ['baz'] })`
  + `cds.env.log.mask_headers = [...]` allows to specify a list of matchers for which the header value shall be masked (i.e., printed as `***`)
    + Default: `['/authorization/i', '/cookie/i']`
- `cds.env.fiori.bypass_draft` feature flag, designed to enable direct modifications via `POST` and `PATCH` of
active instances in lean draft mode (`cds.env.fiori.lean_draft=true`). For example:

```http
POST /Orders
{
  "IsActiveEntity": true
}
```

- Auth kind `ias`: same SAML attr API as auth kind `xsuaa` for easier migration

### Changed

- Removed and integrated former `ctx-auth` middleware into `cds.auth` middleware
- `cds.log`:
  + `cds.env.log.format = 'plain'|'json'` allows to configure which built-in formatter is used. Defaults to `json` in production, `plain` otherwise.
  + If a built-in JSON formatter is used:
    + Field `tenant_subdomain` is filled if running on CF and information is available through authentication
    + Additional CF-related fields are filled if running on CF
    + Custom fields (`cds.env.log.als_custom_fields`) are filled if bound to an instance of Application Logging Service
    + Field `categories` is filled if bound to an instance of Application Logging Service
  + Config `cds.env.log.kibana_custom_fields` changed to `cds.env.log.als_custom_fields` (ALS = Application Logging Service) with compatibility until the next major
- Package `passport` is no longer required (if `cds.env.requires.middlewares` is not set to `false`)
- Type definitions for the APIs of this package are now maintained in package [`@cap-js/cds-types`](https://npmjs.com/package/@cap-js/cds-types).
  + If you used one of the types `CSN`, `Definitions`, `entity` of _@sap/cds/apis/reflect_, use the `Linked` counterparts instead.
  + If you used the type `CQNQuery` of _@sap/cds/apis/cqn_, use `SELECT` or a union type instead.
  + This also includes various fixes to Typings for
    + `req.subject` like `SELECT.from(req.subject)`
    + `SELECT.columns([...])`
    + `cds.db`
    + `cds.util`
    + `cds.context.features`
- The number of files logged on `cds serve` is now limited to 30 by default. You can run with `DEBUG=serve` to show all files.
- `express.static` is only mounted if the target folder (`cds.folders.app`) exists
- `cds.outbox.Messages` no longer uses aspect `cuid` to reduce model size impact in case `@sap/cds/common` is not used otherwise

### Fixed

- Messaging: Listen to `*`
- Drafts of `@readonly` entities cannot be deleted
- Made `srv.prepend()` robust by not allowing async callbacks and hence not being an async function itself anymore
- Formatting for stringified number-literal value
- Secrets are now masked with `DEBUG=cds.service.factory`
- The timestamp of cds.context is not propagated to new root contexts
- `cds.localize` uses less memory to create translation bundles
- `UPSERT` operation failed to fill DateTime/Timestamp fields
- Use original logic (based on `NODE_ENV`) to load cds plugins from `devDependencies`
- Property `tenant` also available on express' `req` object with basic and mocked auth
- Empty `req.data` in before `DELETE` handler in draft
- Loading `cds-plugins` now offers a hook to add a more flexible plugin loader, e.g., for corrupt `package.json` files.
- Ignore default values of associations for draft entities
- OData: client-side errors (4xx) logged as warnings instead of errors
- IAS authentication: use `tokenInfo.getClientId()` instead of `payload.azp` as it implements a fallback
- Deep updates with binary keys
- Allow `null` values in `cds.env` (example package.json excerpt: `{ "cds": { "features": { "foo": null } } }`)
- Collection-bound actions/functions called via navigation

### Removed

- Deprecated global configuration feature flag `cds.env.features.fetch_csrf`.
  Instead, please use `csrf` and `csrfInBatch` to configure your remote services.
  These options will allow to configure CSRF-token handling.
- Compat for deprecated `cds.env.auth.passport`. Use `cds.env.requires.auth` instead.

## Version 7.4.2 - 2023-11-30

### Fixed

- Typing for `DELETE.from(<e>.drafts)`
- UUID keys must not be generated for associations

## Version 7.4.1 - 2023-11-23

### Fixed

- Add dynamic properties to result when experimental feature `cds.env.features.okra_skip_query_options` is active
- Allow negative integers in new parser
- Allow deletion of instances outside the draft tree
- Tenant lookup in OData metadata requests
- `cds.parse.csv` and `cds deploy` correctly parse CSV files with Windows file endings (CRLF) and quoted values
- Typescript Typings

## Version 7.4.0 - 2023-11-13

### Added

- Any service is outboxable via `srv = cds.outboxed(srv)`
- Draft: support `HasActiveEntity eq false` by read
- Check if OData function/action params exist for complex types
- Remote services: destination option `jwt` set to `null` instructs that an incoming request's JWT shall not be passed to SAP Cloud SDK, e.g., when it shall use a fresh client credentials flow token
  + Example:
    ```json
    "requires": {
      "API_BUSINESS_PARTNER": {
        [...]
        "destinationOptions": {
          "jwt": null
        }
      }
    }
    ```
- Alpha feature flag `cds.env.fiori.wrap_multiple_errors` to toggle the following behaviour for OData errors meant to be consumed by SAP Fiori Elements:
  In cases where multiple errors occur and the flag is set to `false`, the first error is presented as the top-level error (replacing the generic "multiple errors" wrapper).
  The default value is `true`, but `false` will become the default value in cds^8.
- On CF, the default keep alive timeout of the server is set to 91s (to exceed the 90s of CF's gorouter)
- `cds deploy` now auto-fills the `ID_texts` field (which get created for entities marked with `@fiori.draft.enabled`) in csv and json data files with a stable UUID.  This way, it does not need to be manually added to data files.  Also, as the value is stable (a hash of the semantic key fields `ID` and `locale`), it works with `UPSERT` statements.

### Changed

- Default outbox configuration (overridable via `cds.env.requires.outbox = { ... }`):
  + `kind` changed to `persistent-outbox` (was `in-memory-outbox`)
  + `parallel` changed to `true` (i.e., messages are not emitted in sequence)
- Internal class `OutboxService` is deprecated and will be removed

### Fixed

- `req.subject` in lean-draft handlers
- `cds.odata.batch_limit` wasn't taken into account
- Enterprise-Messaging: Only set tenant information for multitenant apps
- Enterprise-Messaging: Race condition in `subscribe` event
- Draft: delete of active entity is forbidden, if draft exist
- Draft: sorting of draft entities in `list status: all`
- Draft: invalid delete draft request now rejects with error
- Draft: Enhance Draft Edit functionality with exclusive record lock
- Typings for `req.reject/error/info/warn`
- Deep delete with mixins on new db layer did not work
- Special strings like `'$now'`, `'$user'` and `'$uuid'` expanded automatically
- Only services that are served via OData are precompiled during startup
- Response status of not existing mocks returned 200 instead of 404
- Calculation of @Capabilities in case of complex $apply
- `test.data.reset()` did not delete drafts
- `resolveView` considers `list` for renamed columns
- `cds.schema` now loads lazily
- `odata_new_parser`: `$expand=` no longer throws an error with and is simply ignored
- `odata_new_parser`: Empty custom query params like `Foo?bar` are ignored
- `odata_new_parser`: generated wrong CQN for queries like `$filter=false or ref eq 5`

## Version 7.3.1 - 2023-10-23

### Fixed

- `cds-ts` no longer fails if configured with an ESM loader. It tries loading files w/ `import()` in this case.
- `cds deploy` for draft enabled entities

## Version 7.3.0 - 2023-10-04

### Added

- `cds.localized` now caches i18n bundles per locale and per model to speed up repeated usages of the same bundle at runtime, for example, in repeated calls to `cds.compile.for.edmx()`.
- Based on `cds.localized` with cached bundles, a new operation `cds.localized.lookup(i18n_key, locale)` is provided.
- If env variable `CDS_TEST_ENV_CHECK` is set, `cds.test.in()` detects if `cds.env` was loaded before from a different folder.
- `cds.test.log()` allows to capture and analyze any console log output. `cds.test.verbose()` is now deprecated.
- Typings for `cds.tx`
- Add method `cds.schema.default4(schemaId)` to retrieve json schema based on its id
- Support for pseudo role `internal-user` with authentication kind `ias`
- CSV files with multiline values, i.e. line breaks, are now supported with `cds deploy`

### Changed

- If omitted in the accept header, `ExponentialDecimals` no longer gets defaulted (to `true`), which violated the OData 4.0 specification.
  This change can _temporarily_ be overridden via `cds.env.odata.defaultExponentialDecimals = 'true/false'`.
- Make type signature of `extend.with` more general
- `cds.test.data.autoReset()` is deprecated in favor of explicit `cds.test.data.reset()` call, like `beforeEach (test.data.reset)`.
- `cds.utils.uuid()` now uses `randomUUID` function of node `crypto` module instead of `uuid` package
- `@Capabilities` restrictions defined on entity level are also applied if navigating to the entity. Restrictions defined directly on the navigation now override restrictions defined on the target entity.

### Fixed

- Draft: activate managed fields were miscalculated in some cases
- Error with `exists` predicate in `@restrict.where` when calling compositions
- `IsActiveEntity` in error target for lean draft
- Remote Service: OData v2 compliant representation of Edm.Decimal, Edm.Double, and Edm.Int64 in URL
- In draft activate managed fields were calculated wrongly in some cases
- On draft save, missing entries in `req.headers`

## Version 7.2.1 - 2023-09-21

### Fixed

- HTTP headers argument was not forwarded to remote services when using the `srv.send(...)` API.
- Not existing draft upon `SAVE` has own error code.
- Links to documentation in Typescript definitions.
- Remote service won't check for `credentials.url` in case of messaging.
- Lean draft: Implicitly added `limit` in some lean draft read scenarios.
- Lean draft: Association keys in lean draft.
- Remote service: Preserve namespaces in URLs that do not match the service's namespace.

## Version 7.2.0 - 2023-09-04

### Added

- Typescript definition for:
  - The `cds.exit()` method.
  - The `label` option parameter in the `cds.log()` API. For example: `cds.log('log message', { label: 'adapter' }`.
  - A variant of the `roles` property of the `cds.User` class.
- `@restrict` annotations can now prevent the creation of drafts ([see documentation](https://cap.cloud.sap/docs/guides/authorization#restrictions-and-draft-mode))
- JSON Schema validation for `cds.requires.multitenancy.jobs` settings.
- Managed associations to one with exactly one foreign key can now have a default value.
- Experimental feature flag `cds.env.features.okra_skip_query_options`. This feature allows you to bypass the parsing of query options by the legacy OData V4 Server (Okra). Please note that this feature can only be utilized in conjunction with the new OData parser, which is activated by setting the feature flag `cds.env.features.odata_new_parser = true`.
- Support for `@requires: 'any'` to make service public, i.e., no authenticated user is required

### Changed

- The built-in `java` profile sets `build.target` to `.` by default
- Decimals from query options (e.g., `$filter`) are represented as strings in CQN
- Improve error message for unsupported transformations with `$apply`
- For database dialect H2, specialized, localized views for languages `de` and `fr` are no longer generated.
- Authentication kinds `jwt`, `xsuaa`, and `ias` throw an error during bootstrapping if the necessary credentials are
unavailable.
  Previously, a warning was logged, and authentication was skipped.
  See `cds bind`/ Hybrid Testing in CAPire for how to combine local development and cloud resources.
- The Typescript definitions now make use of the default export.

### Fixed

- Trace middleware: Adapted usage of `performance.now()` for Node 20.
- Draft: Associations to non-draft enabled entities must never point to drafts
- Avoided type error in old db post-processing
- `<remote-srv>.run('/arbitrary-url')` now defaults to a get request and doesn't add request body
- `@cds.query.limit` is cached per projection
- Application crash for incorrect usage of REST-style API to run queries
- The `@requires` annotation on entity level didn't get applied to bound operations
- `cds.test` run with a profile parameter such as `cds.test('run', '--profile', 'integration-tests')` will use the
correct profile.
- `cds.env.requires.auth.restrict_all_services = false` in combination with `cds.env.requires.middlewares = true` (the default)

## Version 7.1.2 - 2023-08-11

### Fixed

- `req.tenant` is undefined when using the new OData parser
- Draft: Replace some occurrences of the `arr.push(...largeArray)` pattern when copying large arrays to prevent maximum
call stack size exceeded errors due to large deep update processing when saving the draft
- Keys are no longer added to the diff as they could be renamed, leading to SQL errors
- Custom-bound actions for draft-enabled entities don't trigger a READ request on application service anymore
- `cds.connect.to('db', options)`: add-hoc options for SAP HANA Database Service
- Reading key-less singleton with `$select` clause while using the new OData parser `cds.env.features.odata_new_parser`
- Avoided using colored logs if process.env.NO_COLOR is set or not logging to a terminal (i.e., `!process.stdout.isTTY || !process.stderr.isTTY`)

## Version 7.1.1 - 2023-08-01

### Fixed

- Lean draft: read actives via service on draft edit
- Only log the error in case of an unhandled rejection
- Resolve column name for experimental `STREAM` CQN queries that point to views

## Version 7.1.0 - 2023-07-28

### Added

- Enable PDF export via GET to collection with accept header `application/pdf`.
  Custom handler must return the following:
  ```
  {
    value: <instance of Readable>,
    $mediaContentType: <String>, // > optional, defaults to: application/pdf
    $mediaContentDispositionFilename: <String>, // > optional
    $mediaContentDispositionType: <String> // > optional, defaults to 'attachment' if $mediaContentDispositionFilename is set
  }
  ```
- Schema for `cds` entry in `package.json` now has a tooltip and default value
- `srv.endpoints`: Array containing the information for all endpoints at which the service is served.
  Example:
  ```
  [
    { kind: 'odata-v4', path: '/odata/v4/browse' },
    { kind: 'rest', path: '/rest/browse' }
  ]
  ```
- Service level support for @restrict. Limited to grant: '*' and all filter conditions in `where` are ignored.
  Example:
  ```
  @(restrict: [{
    grant: '*',
    to: ['authenticated-user']
  }])
  ```
- Support for resolving experimental `STREAM` CQN queries that point to views

### Fixed

- Multiple TypeScript fixes/improvements
- Proper handling for `expand=*` for OData URL to CQN parser (`cds.env.features.odata_new_parser`)
- Corrected the resolution of fully qualified operation names in the REST adapter.
- Log level for OData metadata cache was not handled correctly
- Protocol paths are normalized to always have a leading slash
- `@odata` shortcut for `odata-v4` protocol with custom configuration
- Set default protocol to `odata-v4`, independent of the order in `cds.env.protocols`
- Now data is correctly logged for `GET` and `DELETE` remote requests
- draft: deep update without change should not update the `modifiedAt` field
- Lean draft: do not propagate `@Capabilities.NavigationRestrictions.RestrictedProperties`
- Commit database transactions only once outbound streaming has ended
- Lean draft: deactivate legacy `drafts` getter
- Updated typings for `srv.send()`
- `$search`: exclude calculated fields/expressions from default search in projection of projections
- Immutable properties are always removed from payload during `UPDATE`
- `serviceinfo.urlPath` contains the first endpoint of the service (cf. `srv.endpoints`), which is the legacy path if
`cds.env.features.serve_on_root === true`

## Version 7.0.3 - 2023-07-19

### Fixed

- Compile for lean draft: do not add draft entity for external entities
- Rollback awaited in REST adapter
- `service.on('error')` handler invoked only once
- `SELECT.one.localized`
- `COPYFILE_DISABLE=1` is now set for building `tar` archives by default
- Actions of projection target are no longer accessible in linked models
- Batch executes model-less mass inputs when on `@sap/hana-client`
- Requests to `/<path>/webapp` return 404 for absolute `@path` specifications
- `cds compile --to serviceinfo` no longer returns paths w/ Windows `\` path characters

## Version 7.0.2 - 2023-07-06

### Fixed

- Glitch in `cds.deploy` if no change was applied
- Detection of `.cdsrc-private.json` during startup
- Respect capabilities annotation for draft events
- `cds compile --to serviceinfo` returns correct service paths again

## Version 7.0.1 - 2023-07-03

### Fixed

- Feature toggle detection in single-tenant mode
- Log output for OData $batch requests
- Avoid "catastrophic backtracking" issue in Okra's (OData V4 server) tokenizer
- Transaction marked as committed too early

## Version 7.0.0 - 2023-06-21

### Added

- Handling of expand with multiple `*` (e.g. `$expand=*,*`) in new parser. When using `*` in an `$expand`, the new OData
parser now removes all unneeded `*`.
- Tests run with `cds.test()` now also load `cds-plugins`

### Changed

- Result of `READ` events is now always an array. Previously, it could be `null/undefined` (now empty array), a single object (now array with one entry), or array.
- OData: `PUT`/`PATCH` requests resulting in a new entity (i.e., the `UPSERT` effectively was an `INSERT`) return status code 201
- Draft: Draft activate requests resulting in an `UPDATE` return status code 200
- ETags are validated via `WHERE EXISTS` clause attached to query on `GET`, `PUT`/`PATCH`, and `DELETE`
- OData: `PUT`/`PATCH` with `if-match` header prevents `UPSERT`, i.e., only an existing entity can be updated by such a request
- Runtime support for `@sap/instance-manager` is removed in favor of the `cds-mtxs` Service Manager client.
- In multitenant mode, the SAP HANA pool uses the `cds-mtxs` credentials cache
- Draft handlers are registered for all entities.
- Decimals in client input are validated in runtime's assert framework (previously OData adapter)
- `cds build` and `cds deploy --to hana` have moved to `@sap/cds-dk`. Upgrade `@sap/cds-dk` to version 7 to continue using these commands.
- Changed the behavior of `SELECT` queries for single entities to return `undefined` instead of `null` when no record is found.
- Fiori preview has moved to the new `@sap/cds-fiori` module.
- Numbers are now always used as placeholders in SQL, except for `SELECT 1 From...`, `LIMIT`, and the comparison of two numeric values (e.g., `1 eq 1`).
- Only new major version 3 of SAP Cloud SDK is from now on supported. Please make sure to upgrade. Version 2 is not maintained anymore.
- `@protocol` annotation can serve multiple protocols per service.
- Per default, services are served with a protocol-specific prefix (for example, '/odata/v4' for a service using the OData V4 protocol). To also serve without this prefix, as was the case in older `@sap/cds` versions, the flag `cds.env.features.serve_on_root` can be set to `true`. Alternatively, the `@path` annotation can be used to explicitly specify an absolute path (with a leading `/`).
- `cds.requires.middlewares` is enabled by default.
- The order of CSV files that `cds deploy --to sqlite` uses now reflects the dependency order of cds models.  This is needed if `UPSERT` is used to create a logically correct deployment.
- `cds.fiori.lean_draft` is activated by default. You can still set it to `false` as a fallback.

### Fixed

- UUID typed key properties are no longer automatically filled during UPSERT
- OData: When undefined in the payload, requests for actions with not nullable array-type parameters result in a client-side error
- Missing `GROUP BY` in request with `$apply` in combination with aggregate on restricted entity
- When `@sap/cds` was not installed underneath project root, cds-plugins were not found
- Support for multiline texts in `properties` files
- Error when reading auth-protected entities with infix filter in expand
- Glitch in transaction handling in case of concurrent async before handlers

### Removed

- Deprecated `req.run()` function, use `cds.run()` instead.
- Support for inofficial feature flag `cds.env.features.bigjs`
- Support for inofficial feature flag `cds.features.parameterized_numbers`
- Deprecated referential integrity checks at runtime
- Support for `cds-mtx`
- Support for Node 14
- Internal `req.getUriInfo()` and `req.getUrlObject()`
- `cds deploy --to hana` is now part of `@sap/cds-dk`.
- Deprecated compat mode `cds.env.features.cds_tx_protection = false`
- Beta `AuditLogService` and out-of-the-box audit logging. Use the plugin `@cap-js/audit-logging` instead.

## Version 6.8.4 - 2023-06-14

### Fixed

- `$metadata` requests for multitenant applications

## Version 6.8.3 - 2023-06-13

### Fixed

- `cds build` no longer reports CAP Java Classic runtime usage by mistake.
- `cds version` prints the local `@sap/cds` version, even if called from a different `@sap/cds` installation.
- User challenges handling in case of `cds.env.requires.auth.restrict_all_services: false`

## Version 6.8.2 - 2023-05-26

### Fixed

- EDMX texts for extended tenants based on `@sap/cds-mtx` now appear correctly again.
- `@assert.range` for DateTime/Date/Time/Timestamp
- Nested `$expand` OData query to the `texts` compiler-generated composition for entities with localized elements.
For example, similar OData requests `Entity?$expand=items($expand=item($expand=texts))` now should work as expected.
- `req.subject` would occasionally be incorrect when a query had been executed prior to it.
- cds plugins are also fetched from the development dependencies (`devDependencies`) section in `package.json`
- `cds build` now correctly resolves complex models of mtx extension projects

## Version 6.8.1 - 2023-05-04

### Fixed

- DROP statements for SQLite and PostgreSQL no longer miss a comma at the end

## Version 6.8.0 - 2023-05-02

### Added

- Global cds-dk version is now included in tabular output of `cds v -i`.
- Audit logging support for the OAuth2 Plan
- Feature flag to limit the maximum number of requests in an OData batch request. The max number can be specified with a number in `cds.odata.batch_limit`.
- Custom authentication in `enterprise-messaging`
- Requests with lambda expressions are rejected by remote services of kind `odata-v2`
- `cds build` ignores invalid entries in `undeploy.json`
- New `minorUnit` element in `sap.common.Currencies` for how many fractions the minor unit takes (e.g., `0` or `2`).  See https://www.npmjs.com/package/@sap/cds-common-content for matching content.
- Support for `$user.<attr> is null` and `$user.<attr> is not null` in `@restrict.where`. `is null` matches `null` and `[]`, `is not null` matches arrays with at least one entry as well as `!= null` if no array.
- Plugins are now also fetched from `devDependencies`, unless `NODE_ENV === 'production'`
- Plugins can now provide `cds` configurations in their package.json.
- Support in OData entities with special letters (like ó,â,ü) in names.

### Changed

- Texts for _Country_ are changed to _Country/Region_ in `@sap.common.Countries`
- Resolved an issue where selection strategies of destination options in multitenant applications were not working correctly, resulting in runtime errors.
The fix relies on the `@sap-cloud-sdk/connectivity` npm package to be installed.
- Precision of timestamp used in outbox message increased to 100 nanoseconds (`YYYY-MM-DD hh:mm:ss.nnnnnnn`)
- When another user locks a draft, the error message now includes the username of that user

### Fixed

- Fix exported types of the `cds` core API
- cds build uses the correct path if no project dir is given
- Read after write for updates on-to-one navigation
- Error in $orderBy in combination with @Core.MediaType property
- Fixes in lean-draft
- Fixed an issue where the combined `$search` and `$expand` query and localized data was returning empty results on SAP HANA
- Tests using `cds.test` no longer crash with a segmentation fault if `injectGlobals: false` is set in the Jest configuration.
- Handlers registered with `cds.on('shutdown')` are now called with an `err` argument if the shutdown happened in response to uncaught exceptions or unhandled rejected Promises.
- Log output on uncaught exceptions, or unhandled rejected Promises now is done via `cds.log` instead of `console`.
- New config option `cds.env.server.force_exit_timeout` allows to configure the timeout in ms, after which we force-exit the server (default: 1111) if it didn't do so as expected after a prior `server.close()`. Values `false` or `0` disable force-exit.
- Require custom auth relative to project root when using pluggable middlewares

## Version 6.7.2 - 2023-04-24

### Fixed

- Try to destroy nonexistent socket in case of custom streaming implementation
- Draft: Missing field `IsActiveEntity` in target path of error messages during `draftActivate`
- Minor fixes for `cds.fiori.lean_draft`
- Error in media type check when no `Content-Type` header is found

## Version 6.7.1 - 2023-04-14

### Changed

- Calling a parameterized view without params error now results in the status code 400 with an improved error message.

### Fixed

- cds build error CreateListFromArrayLike
- Disabling of arbitrary user config in mock auth config using `"users": { "*": false }`
- Various fixes for `cds.fiori.lean_draft`
- User attributes that look like numbers are quoted in SQL clause for `@restrict`

## Version 6.7.0 - 2023-03-28

### Added

- Config `cds.ql.quirks_mode` as a compatibility flag to still support behaviors which are undocumented or even against the specifications, for example, CQN:
   ```js
   let q = INSERT.into('Books')
   //> According to CQN spec should return:
   {SELECT:{from:{ref:['Books']}}}
   //> But today returns:
   {SELECT:{from:'Books'}}
   ```
   The default in cds6 is `true` → to be changed to `false` with cds7.
- `cds build` now checks extension point restrictions defined by the SaaS app provider. `cds build` fails if any restrictions are violated.
- Typings for `cds.spawn()`
- Typings for `entity.drafts`
- Typings for Winston logger
- Typings for `cds.context`
- Typings for `service.on`, `service.before`, and `service.after` for actions and CRUD events
- CLI command `cds env` now allows property paths with `/` instead of `.`, which allows usages like that:
```sh
cds env requires/cds.xt.ModelProviderService
```
- `cds.env` now allows to statically set/add profiles via `cds.profile` and `cds.profiles` in package.json.
- `cds.env` now also supports using profiles in preset definitions, i.e., in `cds.requires.kinds`.
- `cds deploy` prints a warning when using Cloud Foundry client version less than 8.
- `req.subject` to conveniently operate on the subjects targeted by the request. Example usage:
  SELECT.one.from(req.subject)   //> returns single
  SELECT.from(req.subject)      //> returns array
  UPDATE(req.subject)          //> updates one or many
  DELETE(req.subject)         //> deletes one or many
- `cds-serve` as a future replacement for `cds serve` in npm scripts. Applications can adopt this now to ease the transition to the next major version.

### Changed

- CQL types now attach additional functionality to entities where appropriate
- `cds.log().trace()` now logs stack traces in `DEBUG` level, before that was on `TRACE`/`SILLY` level only
- Plain SQL queries now have `req.event === undefined`. Formerly this had non-deterministic values.
- Plain SQL queries don't allow registering custom handlers, other than for event `'*'`.
- Plain SQL queries are only supported on database services, not on application services.
- CQN representation of `columns=*` is not allowed anymore, instead `columns=['*']` should be used. This also applies to expand.
- Only draft roots can be created via direct, non-navigation OData `POST` requests.
- Flag `cds.features.fiori_preview` changed to `cds.fiori.preview`. The old flag still works as well.
- Flag `cds.features.fiori_routes` changed to `cds.fiori.routes`. The old flag still works as well.

### Fixed

- Specifying a key in `SELECT.from(...)` is now typed to produce a single result instead of an array of results
- Proper handling of `IsActiveEntity` in error paths
- For cloud events using AMQP, the type is set to `application/cloudevents+json`
- Use `message` property in typings.
- Typings for `cds.on('bootstrap', app => {app.use(...)`
- Return types for `User` and `delete` in typescript
- Typings for connect options
- Typings for `req.error`
- Deployment in sidecar
- Error with restricting an entity and requesting it with `$apply` in combination with aggregate
- Combined usage of `$skiptoken` and `$skip`
- Error `package.json file is missing` in mtx extension builds
- CLI commands w/ unknown arguments (`cds --foo`) fail again with a proper error message

## Version 6.6.2 - 2023-03-17

### Fixed

- Exception during `cds deploy` without mtx
- Service name specified with `cds deploy --to hana:serviceName` takes precedence over environment variables.

## Version 6.6.1 - 2023-03-09

### Added

- `cds.xt.TENANT_UPDATED` event is emitted once a tenant is extended

### Fixed

- `TypeError` when using the query API with an unknown target in x4 flavor
- The setting for `cds.requires['cds.xt.DeploymentService'].lazyT0` is now recognized in the VS Code schema validation.
- The HDI deployment `stdout` logs are now only visible for `DEBUG` level if triggered via `cds-mtxs`. They are also streamed to `logs/<tenant>.log` in case you need the full deployment output, even without `DEBUG` enabled.
- `.forUpdate` when used for etags
- Prevent `TypeError` if an existing draft does not have admin data
- Outbound-streaming error handling

## Version 6.6.0 - 2023-02-27

### Added

- Improved error handling for `cds build` if the SaaS base model is missing in an extension project.
- Support for reliable paging using `$skiptoken`. Can be activated via `cds.query.limit.reliablePaging = true`
- Built-in models are now added to existing model options of custom build tasks.

### Changed

- `cds.serve(ServiceName)` (and `cds serve -s ServiceName`) now exactly serve services with the given names. Previously, all services that ended with the given name were served as well, e.g., `MyServiceName` and `ServiceName`, which might be problematic for applications that bootstrap services one by one.
- Optimize `@cds.persistence.journal` filtering for `last-dev` CSN file.

### Fixed

- `cds deploy --to hana` no longer calls `cds bind` when `VCAP_SERVICES` is provided, for example, via `default-env.json`.
- `$search` on an entity without String elements
- Only elements from type `cds.String` are searchable when combining `$apply` and `$search`
- Error message for missing database connection in draft case
- Extensibility with in-memory Sqlite
- OData adapter error messages
- Columns in navigation path are now added to the SELECT.columns in the new parser
- Application service calls on draft-enabled entities using aliases
- Custom mtxs build tasks now use the correct default `src` folder value.
- `cds build` adds a `.hdiconfig` file when creating SAP HANA migration tables if none exists.
- UPSERTs using reserved keywords
- Fix outbound-streaming error handling
- Rollback transaction if inbound streaming fails
- Custom database initialization in `db/init.js` now skips the `t0` tenant for multitenant apps.
- Concurrent etag calculation for UPDATE and DELETE
- Typings for `cds.delete()`
- CQN for `not` operator with OData functions
- Expand on composition of aspect for draft-enabled entities
- Better error messages are provided for errors with HTTP status codes `400`, `500`, and `501`

## Version 6.5.0 - 2023-01-27

### Added

- New aspect `sap.common.TextsAspect` in common.cds
- New syntax for collection-bound entities

### Changed

- Successive calls to `SELECT.where()` wraps existing clause in brackets if it contains `or`. E.g.
   ```js
   SELECT.from `X` .where `x` .or `y` .where `z`
   //> SELECT from X where (x or y) and z`
   ```
- `cds build` for SAP HANA now adds an `engines.node` version to the generated `db/package.json`. This will help in the future when runtime environments change their default to some version higher than the one supported by `@sap/hdi-deploy`.
- `cds build` checks the consistency of built-in models for Java projects. An error is logged if some model files cannot successfully be resolved, indicating that a required npm module might be missing.
- Status code of draft actions are set in respective handler instead of protocol adapter
- `cds deploy --dry` no longer loads the `sqlite3` module by mistake. This fixes a regression when building Java projects. As a side effect, a file with the name `undefined` was created in the project root folder.
- Internal representation of pseudo roles `internal-user` and `system-user`

### Fixed

- Resolve i18n folders from the root directory
- Types for `cds.test`
- Types for `srv.send`
- Optimized Search: Search queries for localized entities will now use default values if no localized data is found in the corresponding localized tables on SAP HANA. Correct aliasing by search queries with navigation.
- Resolution of `type of` references during minify in bootstrap
- Generation of odata-v2 URL in case of select=* in `urlify()`
- Build resets changed `cds.env` and `cds.root` when finished
- Expand error when using infix filters
- CDS configuration schema validation for `@sap/cds-mtxs`
- Typings for QL API
- Return types of asynchronous service API

## Version 6.4.1 - 2022-01-16

### Fixed

- `cds build` correctly creates a `resources.tgz` file for MTXS projects on Windows
- `cds.deploy` for SAP HANA now doesn't try to search for a globally installed `@sap/hdi-deploy` if there's no `npm` installed, e.g., on a Node.js server without `npm`
- Signature for `cds.ql.UPSERT`
- Signature for `<srv>.delete().where()`
- Signature for `SELECT.alias`
- `UPSERT` requests for SQLite if only keys are provided
- `cds.test` doesn't log database resets with `autoReset` enabled anymore
- The `cds.deploy` output for SAP HANA is now correctly formatted in Kibana
- SAP HANA stored procedures containing implicit selects
- Shorthand configuration for `graphql` in `cds.env.protocols`
- If `cds.env.protocols` is set, `cds.requires.middlewares` is automatically turned on
- `cds.context` middleware is split to initial handling of request correlation and user propagation
- Fix view resolving and managed data for UPSERT
- `cds.linked` supports polymorphic self links like in: `action foo( self: [many] $self, ...)`
- Error with `@odata.draft.enabled` and `@restrict`
- Skip mandatory check on navigation properties for write requests

## Version 6.4.0 - 2022-12-15

### Added

- Signatures for `ql.UPSERT`
- Runtime support for flat database UPSERTs
- `enterprise-messaging`: Support for `@sap/cds-mtxs`
- `persistent-outbox`: Support for parallel processing with option `parallel: true` as well as pluggable processor functions through `service.outbox.process` (beta)
- `cds version` now also lists packages with `@cap-js/` prefix from dependencies
- `cds.context.http` is now available for webhook-based requests
- `cds build` for SAP HANA migration tables now only saves model entities annotated with `@cds.persistence.journal` as `last-dev` version.
- `cds deploy` now uses the `VCAP_SERVICES` environment variable (if set), and skips `cf` operations in this case
- Support for timestamp precision greater than 3 digits of fractional seconds

### Changed

- Added several missing signatures in CQN types that are now in accordance with the current documentation.
- `.columns(…)` of both `cql.SELECT` and `cql.INSERT` give improved code completion when paired when appropriate type definitions are present
- Status code of error messages caused by empty `not null` fields is changed from `400` to `500` on database layer. As a result, the error message `Value is required` in production will be replaced by `Internal server error` in the HTTP response.
- Underscores in environment variables can now be escaped by two `__` to set keys in `cds.env`.  For example, use `CDS_FEATURES_WITH__MOCKS=...` to set `features.with_mocks`.  Note that previously, this ended up as  `features: { with_: { mocks:... }}`, so in rare cases, it might yield unexpected results.
- `persistent-outbox`: Only programming errors lead to `process.exit()`, unrecoverable ones are only logged, and their `attempts` are updated to `options.maxAttempts`
- Global configuration of CSRF-token handling for remote services `cds.env.features.fetch_csrf` is deprecated. Instead, please use `csrf: true/false` and `csrfInBatch: true/false` in the configuration of your remote services. These options will allow to configure CSRF-token handling for each remote service separately.
- `cds build` no longer creates `engines` entry in package.json in case none has been defined. The Node.js version matched the minimal supported version of the CDS runtime and might, therefore already be outdated.
- For streamlined MTX, `@sap/cds` now uses the custom SAP Service Manager client built into `@sap/cds-mtxs`
- Require new package `@cap-js/graphql` for `cds compile -2 graphql`

### Fixed

- Type `expr` of CQN can now describe function calls
- Added missing optional `options` parameter in signature of `cds.serve`
- `cds deploy` handles empty result from `cf` call correctly
- When using CQL projections with array types, the type of the projection variable will now be correctly inferred as a single element of that array
- `cds deploy` logs without label
- Localized draft requests with nested expand in the case of `to many` now return localized data
- Protected service root for REST adapter
- `cds build` logs tar error message
- Resolve view only with renamed fields in `orderBy` case
- In case of `$apply`, no default values for `top` or `skip` are set in subselects
- Environment variables like `cds.requires.<service>.kind...` now consistently override services set in, e.g. `package.json`
- Expand of composition backlink now accesses draft instance instead of active
- Performance of server bootstrap for services with lots of entities
- Error with virtual properties in expand combined with draft
- `req.tenant` is properly propagated by custom authentication in odata and rest
- Error with `SiblingEntity` in draft
- Quoting of keys typed as `cds.String` in error targets. Error targets are a relative resource path to correlate error
messages with the corresponding text input filed in the UI in an OData HTTP error response body for errors, warnings,
and info messages. For example:
- Error with `GET` on `actions`

```diff
HTTP/1.1 400 Bad Request
OData-Version: 4.0
content-type: application/json;odata.metadata=minimal
Connection: close
Content-Length: 145

{
  "error": {
    "code": "400",
    "message": "Value is required",
-    "target": "items(ID=string-key-1)/text",
+    "target": "items(ID='string-key-1')/text",
    "@Common.numericSeverity": 4
  }
}
```

- Application crash if batched Uri uses invalid percent-encoding
- `cds build` for SAP HANA no longer produces `hdbtabledata` for CSV files that refer to non-existing entities. This can be the case for imported content packages that bring CSV files for entities not used in the application model.
- `cds build` for SAP HANA now gives precedence for CSV files from application layer. This is important for imported content packages that bring CSV files that shall be overwritten in the application layer.
- `cds build` for Java no longer adds the service `cds.xt.MTXServices` to the application model.
- `cds build` no longer fails when creating large resource TAR archives for MTXS projects.

### Removed

- Removed `PreconditionFailedError` when sending a request with an `if-match` header on an entity without an ETag
- Check for forbidden deep operations for associations on database layer. All non-key fields for associations provided by request are ignored. Please check https://cap.cloud.sap/docs/guides/providing-services#associations-vs-compositions for more information. Note that this is a breaking change for applications that rely on checks for forbidden deep operations by runtime.

## Version 6.3.2 - 2022-11-21

### Fixed

- `cds deploy` reports errors correctly
- Reference resolution in QL API
- `cds.parse.path` to correctly handle special characters
- `cds build` issues on Windows: build with a large number of files and build on Git Bash.
- `odata` as default protocol for enabled middlewares feature

## Version 6.3.1 - 2022-11-04

### Fixed

- `cds build` no longer reports false positive validation errors for built-in MTX models like `@sap/cds/srv/mtx` or `@sap/cds-mtxs/srv/bootstrap`
- `cds deploy` handles empty result from `cf` call correctly
- `$search` fails on columns composed by a CQL expression that uses the SAP HANA `coalesce` predicate
- Draft ownership was erroneously checked for bound actions on active instances
- `cds watch/run/serve --with-mocks` no longer start randomly with missing mocked services.  This could happen if previous runs crashed with errors and left a bad state in the local service registry.

## Version 6.3.0 - 2022-10-28

### Added

- Additional type signatures for service methods in the query API
- In case of an error in a batch request, the @Core.ContentID is added to the details of the error message
- Extensibility: Use i18n files from extensions in edmx calculation
- In messaging, you can listen to all messages in a queue by subscribing to `'*'`
- Improved Log formatting for Cloud Foundry
- In remote services: Correct OData type conversion when using an imported csn
- Types for `SELECT.forUpdate({wait})`

- `cds.ql` now provides a dedicated method `.alias()` to choose table aliases, e.g.:
  ```js
  SELECT.from(Authors).alias(a)
  ```
  > Note: unfortunately we can't use method `.as()` instead of `.alias()` for compatibility reasons

- `cds.ql` now supports constructing queries with `where exists` clauses, e.g.:
  ```js
  SELECT.from(Authors).where({exists:'books'})
  SELECT.from(Authors).where({'not exists':'books'})
  SELECT.from(Authors).alias('a').where({ exists: // or 'not exists'
    SELECT.from(Books).where({author_ID:{ref:['a','ID']}})
  })
  ```
  > Note: last query is equivalent to first
- `cds compile` and `cds deploy` now also support dialect `h2`
- New (easier) `jwt` and `xsuaa` authentication middleware for pluggable middlewares

### Changed

- In `enterprise-messaging`, emitting CloudEvents messages sets the HTTP header `Content-Type: application/cloudevents+json`
- Added type definition for `cds.User`

### Fixed

- Change signature of cqn `SELECT.limit.offset` and `SELECT.limit.rows` to `val` instead of `number`
- Parsing of store procedure SQL calls, including the schema name. For example, `CALL "SCHEMA"."PROC"(?)` and `CALL SCHEMA.PROC(?)`
- Add property name in the error message on validation of the value
- Kibana and Cloud Foundry formatter: do not log cookie header value
- Missing SQL aliases for `$search` queries combined with `$orderBy` query option
- The return value of `cds.connect` is now correctly typed as a `Promise`
- `req.data` is no longer modified for remote services in the case of `odata-v2` inserts
- `cds.localize` no longer ignores i18n files defined within CDS model scope and outside project scope
- Don't modify query in `fioriGenericRead` handler

## Version 6.2.3 - 2022-10-21

### Fixed

- New continuation for incoming messages
- `cds.test` no longer fails if used in ESM modules with `mocha` (`ERR_REQUIRE_ESM` error)
- Collection-bound actions/functions don't need draft ownership check

## Version 6.2.2 - 2022-10-13

### Fixed

- Fix environment variable `OLD_MTX`, allowing `cds build` to create artifacts for classic `@sap/cds-mtx` library

## Version 6.2.1 - 2022-10-05

### Fixed

- In the CDS configuration, custom profiles now have precedence over the (implicit) default `[development]` profile, irrespective of insertion order.
- `cds test` is now compatible with new `axios` 1.x

## Version 6.2.0 - 2022-10-04

### Added

- Types for using tagged template variants of several CQL constructs
- Types for calling shortcut versions of CQL constructs (`SELECT(...)` in addition to `SELECT.from(...)`, etc.)
- Types for `cds.test`
- Types for `cds.log().setFormat()`
- Support for `redis-messaging` (beta)
- Log the cds version when starting the server
- Support for non-root entities as the main draft entity
- Support for IAS authentication using kind `ias-auth`
- Warning if multiple installations of `@sap/cds` were found when serving requests
- Wildcard expansion `('*')` of properties in QL is now typed
- Support for extended models in custom transactions and background processes
- `cds build` logs detailed error messages if required service models cannot be resolved or aren't defined in custom build tasks.
- Support for additional data types `cds.UInt8`, `cds.Int16`, `cds.Int32`, `cds.Int64`
- Typings for `cds.utils`, `req.entity`
- Optimized server startup for projects with large models and high numbers of services.
  Can be switched off by setting config `cds.features.precompile_edms = false` in case of problems.
- Set default header to `application/octet-stream` while sending binary to remote
- OData temporal query params `$at`, `$from`, `$to`, `$toInclusive` can be used in custom handlers
- Reserved keywords from compiler api available at `cds.compile.to.[cdl, sql.sqlite]`
- Improved `winston` integration in `cds.log`

### Changed

- `cds.debug()` now returns undefined instead of falsy if debug is switched off. This allows usages like that:
  ```js
  const DEBUG = cds.debug('whatever')
  DEBUG?.(...)
  ```
- All MTX-related modules have been refactored and moved to `@sap/cds-mtxs`.
  Ensure to also upgrade to the latest version of `@sap/cds-mtxs` when upgrading `@sap/cds` to avoid any breaking change effects.
- SQLite database file endings have been changed to `.sqlite`, so third-party tools (e.g. VS Code extensions) can deduce the file type.
- Method `disconnect()` in db services empties db pool w/o removing db services. In special cases (like tests), cleaning-up db service should be done manually while deleting `cds.services.db` and `cds.db`.
- Prefer HANA driver that is required in package.json of project root

### Fixed

- Queries like `SELECT.from(Foo).where({a:1}).or({b:2}).and({c:3})` erroneously resulted in `SELECT from Foo where (a=1 or b=2) and c=3`
- Signatures for QN `order_by` expressions are now in line with the capire doc
- Signatures for QL operations are now more specific
- `basic-auth` does not inherit users of `mocked-auth`
- `cds.localize` now ignores i18n files defined outside the project scope.
- Allow `@Capabilities.NavigationRestrictions.RestrictedProperties` to be specified in the format `{ InsertRestrictions: { Insertable: false } }`
- Bound actions/functions while calling remote service
- `$search`: Search on localized projections/views does not always return the localized data
- `cds push` now shows better output for failed extension validations
- Aliased parameters in REST parser
- `cds.deploy` now logs the correct filename for multitenant SQLite
- HDI configuration data (e.g., `./cfg`, `.hdiignore`) and HANA native artifacts have not always been copied into the `sdc` folder of an MTX sidecar module
- OData URL to CQN parser (`cds.env.features.odata_new_parser`) now supports functions with no arguments
- Runtime exception for `PATCH` HTTP request with an empty payload body and read-only field
- Streams in draft caused SQL error
- Better response state handling during `cds deploy` to Cloud Foundry.
- Draft: patch on draft-enabled entity with a composition of one
- Maximum stack trace exceeded in generic audit logging implementation
- The protocol adapter logs the decoded URI or the original one if it is invalid
- REST: reject action calls with round brackets (parentheses). For example, the request `/Books(1)/bookShelf.CatalogService.rate()` is now rejected.
- `cds deploy` and `cds run/serve/watch` no longer print terminal escape sequences (`x1b...`) if they run non-interactively.
- Some fields in entities like `path` generated invalid SQL

## Version 6.1.3 - 2022-09-13

### Added

- Configuration to change maximum body size in bytes for remote requests: `cds.env.remote.max_body_length: 1000` sets it to 1 MB

### Changed

- For structured input, foreign keys are generated as non-enumerable properties on application-service layer

### Fixed

- Deep insert/update/upsert requests where the key of an association is provided in a structured format will not be rejected anymore if the target has default or mandatory fields
- For some configurations, mtxs services were bootstrapped twice

## Version 6.1.2 - 2022-09-05

### Fixed

- Missing key insertion from where clauses in references for deep update statements
- Prevent duplicate entries for some `INSERT` statements
- Log details were not properly displayed in Kibana
- getCsn in model-provider if `cds.requires.toggles` is false
- HTTP calls in messaging have the correct content length
- Performance issue for OData <entity>/$count requests
- Typescript definition for SQL-native variant of `srv.run`, like `srv.run('SELECT * from Authors where name like ?',['%Poe%'])`
- Typescript definitions for `srv.run( [query] )` and `srv.send( {query, headers} )`
- Typescript definitions for `cds.log` are improved, and level indicators like `cds.log()._debug` added
- Typescript definitions for `tx` now carry additional service methods
- `cds login` now returns errors with better root cause messages
- `$expand` requests for to-one associations that do not select the foreign key
- `UPDATE` statement accepts empty objects: `UPDATE('Foo').with({ bar: {} })`
- URI encoding of parameters in remote service calls

## Version 6.1.1 - 2022-08-24

### Added
- The configuration schema now includes `cds.extends` and `new-fields` (in `cds.xt.ExtensibilityService`)
- Ability to run extension validations as part of `cds lint`
- The `/-/cds/login` endpoint now also supports client credentials authentication
- `srv.run(fn)` now accepts a function as first argument, which will be run in an active outer transaction, if any, or in a newly created one. This is in contrast to `srv.tx(fn)`, which always creates a new tx.
  ```js
  cds.run (tx => { // nested operations are guaranteed to run in a tx
    await INSERT.into (Foo, ...)
    await INSERT.into (Bar, ...)
  })
  ```

### Fixed

- Erroneous checks for `join` in `SELECT.from(SELECT.from('xxx'))`
- Virtual fields with default values in draft context
- View resolving without model information doesn't crash
- Unable to upload large attachments. Uploading a large attachment (base64 encoded) caused a runtime exception.
- `cds.Query.then()` is using `AsyncResource.runInAsyncScope` from now on. &rarr; this avoids callstacks being cut off, e.g. in debuggers.
- `cds.tx()` and `cds.context` have been fixed to avoid accidental fallbacks to auto-commit mode.
- HDI configuration data (e.g. `./cfg`, `.hdiignore`) is now included in the `resources.tgz` file which is required for Streamlined MTX.
- `cds deploy` accepts in addition to `VCAP_SERVICES` also `TARGET_CONTAINER` and `SERVICE_REPLACEMENTS` from vcap file when using `--vcap-file` parameter.
- `cds build` doesn't duplicate CSV files that are contained in `db/src/**`.
- Typescript issues in `apis/log.d.ts`
- `cds build` adds OS agnostic base model path to generated feature CSN.
- Unhandled promise rejection in `expand` handling
- `cds.context.model` middleware is not mounted for not extensible services
- `cds.context` continuation was sometimes not reset in REST adapter

## Version 6.1.0 - 2022-08-10

### Added

- Support for `@sap/cds-mtxs` in `enterprise-messaging`
- Detailed information about pool state: `borrowed`, `pending`, `size`, `available`, `max` to the timeout error
- Odata v2 payloads for `cds.Time` are converted from hh:mm:ss to PThhHmmMssS e.g. 12:34:56 to PT12H34M56S if provided in hh:mm:ss format
- Odata v2 payloads for `cds.Integer` are converted to String if not provided as String
- New OData parser supports aliased parameters e.g. `...function(ID=@p)?@p=5`
- Support for locale "en_US_x_saprigi"
- Parameter `rows` in ql API function `limit` can be omitted for remote services, e.g. `SELECT.limit(undefined, 5)`
- New OData parser supports $filter with "in" operator, e.g. `$filter=ID in (1,2,3)`
- `cds build` copies `package.json` and `.cdsrc.json` into _main folder of MTX sidecar app.
- New OData parser supports null parameter in function/action, e.g `/findBooks(author=1,title=null)`
- New environment variable `schemas` contains locations for json schemas validating `package.json`, `.cdsrc.json` and `.cdsrc-private.json` in VS Code
- `cds.test` can now listen on a fixed port by way of additional arguments '--port', '<PORT_NUMBER>
- `cds.requires.db.kind = 'sql-mt'` is introduced as a shorthand for
  ```js
  "db": {
    "kind": "sqlite",
    "[production]": {
      "kind": "hana-mt"
    }
  }
  ```
- `cds build` support for Streamlined MTX extension projects based on build task `mtx-extension`
- TS definitions for `SELECT.forSharedLock` and `SELECT.forUpdate`
- TS definitions for `log`
- Support for new cds build task option `deploy-format`. Java apps may use this option instead of the corresponding global CDS config option.
- The `ExtensibilityService` serves an endpoint to retrieve a subdomain-specific JWT, which is used by `cds login`
- The endpoint `/-/cds/extensibility/push` now checks restrictions for new extensions. The configuration is added to the `cds.xt.ExtensibilityService`
  ```js
  "requires": {
    "cds.xt.ExtensibilityService": {
      "element-prefix": ["Z_", "ZZ_"],
      "namespace-blocklist": ["com.sap.", "sap."],
      "extension-allowlist": [
        {
          "for": ["my.bookshop"],
          "kind": "entity",
          "new-fields": 2
        },
        {
          "for": ["CatalogService"],
          "new-entities": 2
        }
      ]
    }
  }
  ```
- `cds build` validates required service models `@sap/**` for MTX sidecar app and logs an ERROR if some couldn't be resolved.
- Configuration schema for many properties of the `cds` configuration block in `package.json` or `.cdsrc.json`, especially for `cds.requires...`

### Changed

- Streamlined calculation of the difference for `DELETE` queries using `req.diff()`
- Improved error messages for rest / new odata parser
- Adjust types for `SELECT.from` and `SELECT.one` to accept array classes as well
- No `"` added around search values in OData v2 e.g. Foo?search=name is passed through as is
- If an entity can not be read after write (e.g. insert only entity) no error is shown in the log
- Throw not supported error for pagination in `$expand`

### Fixed

- Wrong context in `tx.run(query)` when `query` is an array
- We now detect and ignore erroneous attempts to re-register framework-generated stubs as handlers for custom actions/functions.
- Emits with `persistent-outbox` also work with manual transactions
- You can now use `cds.ql` fluent API to query tables not in the model, but in database.
  For example, within `cap/samples/bookshop` this works now:
  ```sql
  await SELECT.from('sqlite_master')
  await cds.read('sqlite_master')
  ```
  Caveat: The following undocumented usage of unqualified names happened to work in the past.
  But this was very fragile and caused lots of issues, and therefore was removed:
  ```sql
  await SELECT.from('Books')
  await cds.read('Books')
  ```
  Always use qualified names or reflected definitions instead:
  ```sql
  const Books = 'sap.capire.bookshop.Books'
  await SELECT.from(Books)
  await cds.read(Books)
  ```
  ```sql
  const {Books} = cds.entities ('sap.capire.bookshop')
  await SELECT.from(Books)
  await cds.read(Books)
  ```
- Wrong results for expand to many without `orderBy`
- `cds deploy` api endpoint regex for cli now ignores trailing version info in url
- Default values no longer overwrite payload values on fields of new drafts
- Unmanaged to-one navigation caused malformed SQL statement in draft
- `cds.compile.to.serviceinfo` fix failure to detect Java services if `odataV4.endpoint.path` or `odataV2.endpoint.path` missing in `cds` configuration in `application.yaml`
- Data type conversion did not work in some expand cases
- Failed connection to SAP HANA with no or malformed credentials was leading to credentials being written to the log
- `cds build` no longer fails with an error `no such file` if one of the following files has been defined in some `srv` subfolder - `package.json, package-lock.json, .cdsrc.json, .npmrc`
- Tar issue on Windows: 'The command line is too long'.
- `$search`: Lifecycle issue that causes an empty search result when the `$search` and `$expand` query options were combined
- Operator `IN` with Tagged Template String Literals e.g.:
  ```sql
  SELECT.from(Object).where`userId IN ${aUserIDs}`
  ```
- `cds build` now uses a closed version range in the node engines version of the deployed application's `package.json`
- `cds build` no longer generates EDMX files for services that aren't odata protocol enabled
- `cds deploy` handles orgs and spaces containing commas correctly
- Incorrect decoding of special characters when reading data of type `cds.LargeString` from SAP HANA using `hdb@^0.19.5` driver
- The payload is added to the delete request in rest adapter as `req.data`

## Version 6.0.4 - 2022-07-20

### Fixed

- Local mocking of external services using `cds watch`

## Version 6.0.3 - 2022-07-14

### Changed

- On Business Application Studio, `@sap/cds` now rejects starting on Node 12, as it does locally.  This avoids cryptic follow-up errors.

### Fixed

- Generic handlers for draft-related operations will trigger a READ event afterwards
- `file-based-messaging` only watches the file when at least one handler is registered
- `--vap-file` parameter of `cds deploy` is available again
- `cds build` no longer throws an error if `@sap/cds-mtx` library (classic MTX) isn't installed locally.
- `cds.spawn` no longer tries to reuse a transaction
- Custom query parameter caused bad request on certain characters in REST adapter
- `cds-ts` no longer fails with an `ERR_UNKNOWN_FILE_EXTENSION` error
- Timeouts when sending string payloads to remote services
- `cds.context.http` for `$batch` using atomicity groups

## Version 6.0.2 - 2022-07-06

### Fixed

- Jest tests do not fail any longer because of logs during app shutdown
- `cds build` now uses the correct `mtx/sidecar` context. This avoids redundant `cds-mtxs` npm dependency for Java projects.

## Version 6.0.1 - 2022-07-05

### Added

- Config option `cds.env.server.port` allows to configure the port to use (in addition to `process.env.PORT` and CLI option `--port`)

### Changed

- Plugins cannot be loaded as ES modules, but need to remain CommonJS modules

### Fixed

- Removed debug log about shutdown from `cds serve`
- Hiding timeout error in production mode

## Version 6.0.0 - 2022-06-30

### Added

- Listeners for `commit` events on the request object are now awaited
- Experimental support for ECMAScript modules (ESM): You can now write your custom code, i.e.,
  service implementations, `server.js`, `db/init.js` using ES6 `import` statements.
  **Note though** that this is _experimental_ for now. Known limitation: _jest_ doesn't
  support dynamic imports, which are required for that.

- Improved `cds.error` to allow these using variants:
  ```js
  cds.error `Message with formatted: ${{foo:'bar'}}`
  cds.error ({ message, code, ... })
  cds.error (message, { code, ... })
  let e = new cds.error(...) //> will not throw
  ```
  > Calling `cds.error()` with `new` returns the newly created Error,
  > while calling it without `new` it throws immediately. The latter is
  > useful for usages like that:

- Improved `req.error` to always turn each recorded error into an instance of `Error` with its own stack trace.
  Multiple errors are finally thrown as an array of these errors with `.message = 'MULTIPLE_ERRORS'`
  and `.details = this` (the latter is for compatibility to former releases).

- Public API for `cds.User.roles`: For example, this allows to construct new instances of `cds.User` like so:
  ```js
  let user = new cds.User ({ id:'me', roles:['admin'] })
  user.is('admin') //> true
  ```

- Public API for `cds.context.tx`: This provides access to the current global root `tx`, if any.
  (This replaces the former undocumented `req._tx`)

- Public API `cds.User.anonymous` and `cds.User.privileged` which are sealed instances you can use directly
  instead of always passing `new cds.UserPrivileged`.

- Public API `cds.context.http` to reliably access inbound http `req` and `res` objects.

- Persistent outbox now contains last error and timestamp of last attempt
- Enable PUT requests for UPDATE queries with CQN for remote services
- Support for new major version 2 of SAP Cloud SDK
- Support for the `@assert.target` annotation for managed-to-one associations
- Support for `FOR SHARE LOCK` on SAP HANA to acquire shared locks on the queried records so that the locked records
stay intact until the transaction is committed or rolled back.
- Consistent error information for remote batch requests
- `cds.env` now supports expanding scalar `cds.requires` entries from `cds.requires.kinds` as follows:
  ```jsonc
  { "cds": {
    "requires": {
      "mtx-sidecar": true,
      "db": "sql",
      "kinds": {
        "sql": {/* detailed config for sql */},
        "mtx-sidecar": {/* detailed config */},
      }
    }
  }}
  ```
- Support for mTLS in `enterprise-messaging-shared` and `message-queuing`
- Allow empty publish and subscribe prefixes for SAP Event Mesh when using the format `cloudevents`
- Custom type `sap.common.Locale` in common.cds
- Ordering by aggregated value for draft-enabled active entity
- `cds build` support for model provider service-based resource deployment.
- Remote service:
  + Conversion of OData V2 (`"kind": "odata-v2"`) function and action results to OData V4 format
  + Conversion of binary data in CQN queries to `base64url` in URL and payload
  + Key predicate is omitted for single-key entities in resulting URL (e.g. `GET /Foo(1)` instead of `GET /Foo(ID=1)`)
  + Support of views with parameters
- Add `@odata.mediaContentType` if selecting stream property
- Kubernetes service bindings: Support for servicebinding.io and SAP BTP Service Operator based bindings
- `cds build` copies an existing `.npmrc` file located in the root or srv folder of your project into the deployment folder (usually `gen/srv`). This allows for dedicated npm configuration in cloud environments.  Can be switched off by cds build option `contentNpmrc`.
- `cds build` copies an existing `.cdsrc.json` file located in the root or srv folder of your project into the deployment folder (usually `gen/srv`). The effective CDS configuration is created from the `.cdsrc.json` and CDS configuration defined in the `package.json` file. Can be switched off by cds build option `contentCdsrcJson`.
- Beta OData URL to CQN parser (`cds.env.features.odata_new_parser = true`):
  + `@odata.context` is derived without using okra, not yet supported:
    + `$expand=*` query option
  + Support for actions and functions
  + Further `$apply` transformations supported
    + (nested) `concat` transformations
    + `orderBy` transformation
    + `top` & `skip` transformation
    + `identity` transformation
- Log `BEGIN`/`COMMIT`/`ROLLBACK` commands when using SAP HANA as the underlying database
- Binary data in payload is validated to be RFC-4648 and OData ABNF conformed
- Support multiple media (streaming) properties in one entity
- Support for annotation `@protocol:'none'` to mark services as internal
- New build task aliases `java` and `nodejs` deprecating `java-cf`and `node-cf`, which are still supported for compatibility reasons.
- New shutdown event sent by `cds serve` (beta)
- $filter in $expand for remote services
- Mapping of aliases in $expand for remote services

### Changed

- `@sap/cds` can now be loaded from different install locations like any other module, i.e. `@require('@sap/cds')` will no longer return the same singleton instance.
- SAP Cloud SDK is now only an optional dependency and must be installed manually
- Improved `cds.context` implementation to use `AsyncLocalStorage` instead of plain `async_hooks` (-> [see Node.js docs](https://nodejs.org/api/async_context.html)); APIs stay the same.
- Improved `cds.tx(tx=>{ ... })`: The new `tx` will be set as `cds.context.tx` for the function body's continuation,
  so all nested service or database operations will be executed within this transaction automatically.
- Node.js 14.15 is now the minimum required Node.js version.  Version 12 is no longer supported.
- Node.js 14.15 is now enforced on loading of `@sap/cds`, for example, on server startup.
- Improve error messages in messaging management
- `cds.env.requires` formerly inherited from `cds.env.requires.kinds`. This is not the case anymore; hence things like this worked before but don't anymore:
  ```js
  let sql = cds.requires.sql       //> is undefined now
  let sql = cds.requires.kinds.sql //> use this instead
  ```
  Alternatively you can add this to your cds config:
  ```json
  { "cds": { "requires": { "sql": true } }}
  ```
- Details of errors from remote services are now in property `reason` (before it was `innererror`)
- `innererror` is not removed from OData error response
- The `file` option of file-based messaging is now on top level (before it was in `credentials`)
- Optimized Search: `cds.env.features.optimized_search=true` is now the default behavior.
- `cds build` no longer generates CF manifest files for Nodejs and HANA db deployer modules.
- `cds build` no longer supports WebIDE Fullstack compatibility mode. Consequently, SAP HANA artifacts and service EDMX files for Fiori modules might no longer be correctly generated.
- Remote services: Batched `GET` requests will not fetch CSRF tokens
- CQN now uses `xpr` correctly instead of brackets in `where`
- `process.exit` is called again by `cds run/serve` and `watch`, to gain a reliable `exit` event for cleanup tasks.  Before, this would be spoiled by apps that do not shut down the event loop properly.
- `cds build` no longer filters `./` file dependencies from package.json in the build output.
- Fiori preview no longer supports URL pattern with `service` and `entity` query parameters, e.g. `$fiori-preview?service=...&entity=...`.  These URLs were created back in `@sap/cds` 3.x.
- `cds build` no longer copies the `node_modules` folder into the deployment folder (usually `gen/db/**` and `gen/srv/**`).
- Set default tenant to `undefined` in single-tenant mode
- Handle foreign keys of to-one associations which should be set to `null` on db layer
- `cds build` uses the native `fs` functions instead of `fs-extra`.
- `cds build` supports initial data in CSV files that are located in any 'csv' or 'data' subfolder of some CDS model file. This also implies CSV files stored in reuse modules. Now, this behaviour is consistent with SQLite deployment. If the location of some CSV file has changed, a deployment error might be returned. In that case previously deployed `hdbtabledata` files have to be undeployed.
- `cds deploy` reads Cloud Foundry file `config.json` to get org and space information.
- New REST adapter replaced old (limited) implementation
- Default behavior for runtime integrity checks. From now on no integrity checks will be done by default.
Note that this is a breaking change for applications that rely on automatic integrity checks by runtime. We recommend using `cds.env.features.assert_integrity`: `db` to switch on database integrity constraints. The value `app` can be used as fallback to previous behavior.
- `cds build` no longer copies `.env` or `default-env.json` files into the deployment folder.
- OData `POST`, `PATCH`, and `PUT` requests and draft-related `draftEdit` and `draftActivate` actions are now followed by an additional `READ` request to the application service. Consequently, affected functionality:
  + It is now sufficient to have a custom `READ` handler in order to adjust the response (e.g., to handle virtual properties) of the modification request.
  + A user is now required to be authorized to read updated data e.g. a user having a role restricted with "INSERT-only" annotation pattern will get empty results in response to `POST` request.
  + For compatibility reasons, `req._` of the modification request is uplinked to `req._` of the follow-up `READ` request so that one still can access original `req._.req/res` request objects of the modification request within the corresponding `READ` handlers.
  + Modification logs are now followed by corresponding access logs.
  + More details can be found in cds v6.0.0 release notes.
- Message for PreconditionFailedError is now configurable in messages.properties
- Remove circular references in Kibana logging
- Error sanitization in production is skipped for custom errors with HTTP code `5xx`. From now on, an app developer can return any error message to the client.
Note that this is a breaking change for applications that rely on error sanitization for custom errors in production. The behavior of errors thrown by CAP framework is unchanged.

### Fixed

- We don't rely on `global.cds` anymore -> allows to load and correctly work with multiple versions of `cds`
- Improved shutdown for AMQP connections and file listeners
- Using `CQL` with a tagged template string `SELECT from Foo { null as boo }` threw an exception.
- In case of `MULTIPLE_ERRORS` throw an `Error` instead of an object
- `cds build` ensures correct precedence of feature annotations. Fixes `Duplicate assignment` compilation errors.
- Compatibility with former support to find service `@impl: 'relative/to/cdw'`.
- Views on views with parameters where erroneously inherited params through `cds.linked()`.
- Authentication: Return HTTP `404 Not Found` rather than `204 No Content` status code for invalid requests.
For example, given the following request `/ReqAdmin(1)/toIntermediate/toa` and assuming that the `toIntermediate` instance does not exist,
the runtime returned an HTTP `204 No Content` success status response code indicating that the request has succeeded.
In such scenarios, now the HTTP `404 Not Found` status code is returned rather than `204 No Content`.
- Errors from HTTP requests sent via `cds.test.axios` now are the original Axios errors, i.e. including properties like `request` and `response`, with stack traces from caller.
- Errors constructed and thrown by `req.reject()` now have a stack starting at the code calling `req.reject()`.
- Auth annotations `@restrict` and `@requires` with empty array do not allow access anymore
- Delete on restricted singleton caused request to fail
- Add workaround of typescript not complete literal unions, specially when union strings.
- Accidental handling of non-proxy entities as they would have been proxies (`cds.env.odata.proxies`) in expands
- Boolean keys are properly parsed into JS boolean values
- Navigation path segments with aliased keys in structured mode (OData flavors `w4` and `x4`) when using beta OData URL to CQN parser (`cds.env.features.odata_new_parser`)
- All entities in `@sap/cds/common` have now proper CDS doc comments
- `cds build` uses `package.json` and `package-lock.json` files located in `srv` folder for deployment if existing. Before, `package.json` and `package-lock.json` files of the project root folder have always been taken.
- Pass options from `cds.parse.expr` to `cdsc.parse.expr`.
- Avoid error that is caused, e.g., in a streaming scenario when there is an issue while processing the stream. Trying to change/send the response object could cause a crash because the response was sent already.
- Correct URL generation for `Integer64` and `Decimal` for remote services
- Operation parameters from structured type and annotated with @open are not filtered from the input query
- Services are secured by default in production. Can be disabled via feature flag `cds.env.requires.auth.restrict_all_services: false` or by using `mocked-auth`.
- Optimized Search: Exception when searching on views using built-in SQL SAP HANA functions
- In some cases, custom error handlers were not called for rest
- `cds build` adds newline at EOF for `hdbmigrationtable` files
- Static values in on condition were ignored when inserting on navigation
- Removed entity key validation by POST request in rest
- `$count=false` returned count
- `odata_new_parser`: `format=json` allowed as query parameter, other formats not supported and returning 501, trailing `?` allowed e.g. `/Employees?`
- `odata_new_parser`: Piped use of same transformations is now supported, like `/Students?$apply=filter(BIRTHYEAR ge 2000)/groupby((UNIVERSITY),aggregate(SUBJECT with countdistinct as distinctSubjects))/filter(UNIVERSITY eq 'Hamburg')`
- `odata_new_parser`: Behavior of piped transformations while using `topcount` or `bottomcount` is now correct
- Better error message for missing `exists` predicate in `@restrict.where`
- Reading raw Binary data provided as a `base64` (standard or url-safe) string by means of a `$value` query option
- Selecting a navigation with `$select` ended up in database error
- `cds.compile` no longer fails for cds sources that contain the `file:` pattern
- $select=IsActiveEntity did not work on draft enabled entity, when requesting active data via navigation
- not equal operator `<>` treated the same way as `!=`
- `cds.localize` now respects custom i18n file names (which is not recommended though)
- `cds version` now handles array-valued entries for `folders.db`and `folders.srv` gracefully when looking for MTX sidecar
- OData access of entities named `get` and `set`
- missing brackets for OR condition in `.where()` when requesting by navigation
- `cds build` now correctly supports Node.js apps that do not have a service module defined. In these cases, the build task's _src_ folder has to be configured as "."
- `cds build <dir>` is now correctly executed if called by npm script or mta build.
- `cds deploy` now shows a better error message on INSERT errors (on SQLite).

### Removed

- Deprecated option to send synchronous requests via `srv.emit()` -> use `srv.send()` for that
- Deprecated feature flag `cds.env.features.implicit_sorting`
- Deprecated feature flag `cds.env.features.update_managed_properties`
- Deprecated feature flag `cds.env.features.resolve_views`
- Deprecated feature flag `cds.env.features.spaced_columns`
- Deprecated feature flag `cds.env.features.throw_diff_error`
- Deprecated feature flag `cds.env.features.delay_assert_deep_assoc`
- Deprecated feature flag `cds.env.features.auto_fetch_expand_keys`
- Deprecation warning for query parameters `sap-valid-from` and `sap-valid-to`
- Built-in graphql support &rarr; moved to new `@sap/cds-graphql`
- Deprecated feature flag `cds.env.features.extract_vals`
- Support for CQN `where in` syntax `{ val: [1, 2, 3] }` without `list`. Use `{ list: [{ val: 1 }, { val: 2 }, { val: 3 }] }` instead.
- Support for selects in restrict entries, e.g. `where : 'exists (select 1 from MyTable where a = b)'` is not allowed anymore
- Input validation for deep `INSERT`/`UPDATE` for associations in the service layer
- Support for `@odata.contained` annotation. Use Compositions instead.
- Support for `@odata.on.insert/update` annotation. Use `cds.on.insert/update` instead.
- Support for expressions in references, for example: `ref: ['foo as bar']`).
- Generic support of `$expand` and `$select` OData query options for custom actions and functions

## Version 5.9.8 - 2022-06-24

### Fixed

- Application model is now again properly updated after extension activation
- Avoid crashes during `cds version` when `folders.db` or `folders.srv` are array-valued instead of strings
- `cds build` correctly validates MTX extension allow lists and doesn't log false positive warning messages

## Version 5.9.7 - 2022-06-13

### Fixed

- Deleting a parent will delete all compositions, also texts
- Views with aliased elements in `orderBy`

## Version 5.9.6 - 2022-05-24

### Fixed

- Ignored requests in batch requests
- `pool` module for logger facade is separated from `hana` database logger. Timeout error by acquiring client from pool is now enhanced with `_poolState` providing current pool attibutes.
- Multiple errors did not have correct HTTP response status code
- `POST|PUT|PATCH` requests with `charset` directive in `Content-Type` header (e.g., `Content-Type: application/json; charset=utf-8`) no longer issues an error "Invalid content type" in REST adapters
- Call SAP HANA procedure:
  + accepted are any symbols in a procedure name if it is delimited with a double quotation (`"`)
  + fixed results for table output parameters when using `@sap/hana-client`; **limitation**: output parameters in a `CALL` statement must follow the same order used in a stored procedure definition
- `@odata.context` considers `cds.env.odata.contextAbsoluteUrl` when requesting an OData Service

## Version 5.9.5 - 2022-05-09

### Fixed

- `HDB_TCP_KEEP_ALIVE_IDLE` config
- A combination of `!=` operator and `or` in `where` clauses of `@restrict` annotations or when adjusting `req.query` in custom handlers (OData services only)
- Programmatic calls to bound actions/functions do have keys in `req.data` again if compat flag `cds.env.features.keys_in_data_compat` is set

## Version 5.9.4 - 2022-05-02

### Fixed

- Error messages are improved if no `passport` module was found or if no `xsuaa` service binding is available
- Issue fixed for `srv.get()`. It was returning `TypeError` in plain REST usage for external services, e.g. `srv.get('/some/arbitrary/path/111')`
- Allow unrestricted services to run unauthenticated, removing the `Unable to require required package/file "passport"` error. Totally not recommended in production.  Note that though this restores pre 5.9.0 behavior, this will come again starting in 6.0.
- Audit logging of sensitive data in a composition child if its parent is annotated with `@PersonalData.EntitySemantics: 'Other'` and has no data privacy annotations other than `@PersonalData.FieldSemantics: 'DataSubjectID'` annotating a corresponding composition, for example:
  ```js
    annotate Customers with @PersonalData : {
      DataSubjectRole : 'Address',
      EntitySemantics : 'Other'
    } {
      addresses @PersonalData.FieldSemantics: 'DataSubjectID';
    }
    annotate CustomerPostalAddress with @PersonalData : {
      DataSubjectRole : 'Address',
      EntitySemantics : 'DataSubject'
    } {
      ID @PersonalData.FieldSemantics : 'DataSubjectID';
      street @PersonalData.IsPotentiallyPersonal;
      town @PersonalData.IsPotentiallySensitive;
    }
  ```

## Version 5.9.3 - 2022-04-25

### Fixed

- Since 5.8.2 `req.target` for requests like `srv.put('/MyService.entity')` is defined, but `req.query` undefined (before `req.target` was also undefined). This was leading to accessing undefined, which has been fixed.
- Custom actions with names conflicting with methods from service base classes, e.g. `run()`, could lead to hard-to-detect errors. This is now detected and avoided with a warning.
- Typed methods for custom actions were erroneously applied to `cds.db` service, which led to server crashes, for example, when the action was named `deploy()`.
- Invalid batch requests were further processed after error response was already sent to client, leading to an InternalServerError
- Full support of `SELECT` queries with operator expressions (`xpr`)

## Version 5.9.2 - 2022-04-07

### Fixed

- i18n translation for errors did not work correctly in some cases
- Normalization in custom `getRestrictions`
- Throw exception by `INSERT` into HANA queries if number of provided rows deviates from number of affected rows returned by hdb to prevent data losses
- Handler detection for extended services
- Speed-up in localization handling
- Draft: navigation via an association to many from a non-draft enabled entity to a draft-enabled entity
- Limited support of `SELECT` queries with operator expressions (`xpr`)

## Version 5.9.1 - 2022-03-31

### Fixed

- Function arguments might be escaped too often
- URL encoding for remote services for CQN queries
- `cds serve` during development again redirects URLs for UI apps in a folder with the same name as a service, so `/foo/webapp` would redirect to `/foo` again.  This got broken in 5.8.3.
- Endless loop in localization handling
- Ensure service implementation while extending entity from the service
- Post-processing of custom draft queries
- `cds build` no longer omits unused CDS type definitions, leading to Java compiler errors

## Version 5.9.0 - 2022-03-25

### Added

- Enable custom audit logging implementation by subclassing or prepending `cds.AuditLogService`
- Log authentication/authorization traces, for example, authentication strategy and access control decisions to facilitate troubleshooting in debug mode.
- Bound functions and actions calls with odata-v2 from remote service
- Beta support for procedure calls with table output data (SAP HANA only)
  + Both hdb and `@sap/hana-client` currently do not support parameter metadata for table output. To provide the functionality anyways, CAP must fetch the metadata itself. As this is not CAP's expertise, the feature is only beta.
  + All parameters must be named or unnamed, that is `CALL EXAMPLE_PROC(PARAM_1 => ?,PARAM_2 => ?)` or `CALL EXAMPLE_PROC(?,?)`
- Alpha `cds.ApplicationService.getRestrictions(definition, event, user)`, which returns the applicable restrictions for the current request as follows:
  + `null`: unrestricted access
  + `[]`: no applicable restrictions -> no access
  + `[{ grant: '...', to: ['...'], where: '...' }, ...]`: applicable restrictions with grant normalized to strings
    + That is, `grant: ['CREATE', 'UPDATE']` in model becomes `[{ grant: 'CREATE' }, { grant: 'UPDATE' }]`
  + Promise resolving to any of the above (needed for CAS override)
- Internal model provider service can be used for obtaining dynamic csn, including features and key user extensions
- Support insert of SQL snippets for HANA migration tables using @sql.append and @sql.prepend annotations.
- Support for the `@odata.draft.enclosed` annotation on associations targeted via navigation — previously only supported for `$expand`
- Pseudo role `internal-user` for technical user tokens acquired from own XSUAA instance
- Include globally-installed cds-dk version in output of `cds version`.
- Include version of cds-mtx in output of `cds version`, if available.
- Feature toggle support in `cds build` for cloud deployments. Create language bundles and parsed CSN for all features.
- Support for `@Aggregation.default` in new OData parser (`cds.env.features.odata_new_parser = true`)

### Changed

- Cleaned up `cds.env.requires` towards a consistent usage:
  + Moved all entries of `cds.requires` to `cds.requires.kinds` → `cds.requires` is empty now by default, but has `cds.requires.kinds` as prototype, so e.g. `cds.requires.sql` will still return a match.
  + Added support for db-specific  `cds.requires.db.deploy-format` → deprecating `cds.hana.deploy-format` (which is still supported for compatibility)
  + Introduced `cds.requires.kinds.hana-cloud` as `{kind:hana, deploy-format:hdbtable}` → to be used by default for production
  + Changed `cds.requires.audit-log` to be consistent to all other; also got moved to `cds.requires.kinds.audit-log`, so it is no longer activated by default.
  + Added support for `cds.requires.foo: true` with `foo` being a preset/prototype entry in `cds.requires.kinds` → allows to more easily switch on pre-configured services.
- Update-managed properties (`@cds.on.update`) are always updated
  + Example: `UPDATE('Books').set({}).where({ ID: 1 })` leads to new modifiedAt and modifiedBy
  + Does not apply to nested entities that are only preserved by specifying their primary keys in the data
  + Deactivate during two month grace period via compact feature flag `cds.env.features.update_managed_properties = false`
- Response no longer contains keys neither technical draft properties (e.g. `HasDraftEntity` or `InProcessByUser`) in expanded data if they were not requested explicitly when using `cds.Service` API
  + Example:
    ```js
    > await srv.read('Authors', a => { a.name, a.books(b => { b.title }) }).where({ ID: 1 })
    // -> "old behaviour" result
    [{ name: 'Emily Brontë', books: [{ title: 'Wuthering Heights', ID: 201 }] }]
    // -> "new behaviour" result
    [{ name: 'Emily Brontë', books: [{ title: 'Wuthering Heights' }] }]
    ```
  + Technical draft properties are not automatically fetched also on a root level
  + Deactivate during two month grace period via compat feature flag `cds.env.features.auto_fetch_expand_keys = true`
- Access control is checked in generic handlers (rather than handlers materialized on app startup)
- Expand restriction check moved to pre-before phase
- The active state of an entity is read instead of the draft state when navigating from a draft entity to a draft-enabled entity via an association.
- Authentication middleware is always mounted (used to be only for restricted services)
- Fiori preview now uses the Horizon theme
- 'Preview' links in generic index.html page no longer get the word _preview_ appended automatically, allowing for more flexible naming.  Link providers should make sure to add the _preview_ word if necessary.
- Don't throw error in GraphQL adapter if update mutation filter does not match any entries (to be consistent with delete mutations)
- Remote call of unbound action/function returns octet-stream instead of string by default
- Default pool's behavior has been changed from `FIFO` (queue) to `LIFO` (stack). Can be changed in pool configuration.
- `cds run/serve` now gracefully shuts down the HTTP server before exiting.  Custom handlers for signals like `SIGTERM` or `SIGINT` can now be processed.
- `cds build` no longer creates `COMMENT` statements for HANA if doc comments are present in CDS models.  The statements caused superfluous table migrations during HANA deployments.

### Fixed

- Logging of failed requests to remote services was incompatible to Elasticsearch
- `cds serve --project <dir>` didn't serve static web resources from `<dir>`
- `cds serve -p <dir>` was meant to be a shortcut for `cds serve --project <dir>`
- Messaging: Use correct kind for logging
- Incorrect return values for update-managed properties (`@cds.on.update`) of child entities that were not changed in request
- `$filter` with navigation to-one eq null
- Calculation of `DraftIsProcessedByMe` when navigating to `DraftAdministrativeData`
- Inbound streaming with media type annotated as `@Core.Computed`
- Pass column expression into `SELECT()` (example: `SELECT('SUBSTRING(locale,0,2) as loc').from(<entity>)`)
- Annotation `@cds.api.ignore` ignores key in new parser
- Inconsistencies in actions and functions API
- Opening root transaction in `srv.run` if none exists
- Glitches in handling of `req.user.tenant` and `req.user.locale`
- Flattened keys in URL are resolved correctly if they are unique in new REST adapter
- Actions and functions in REST adapter
- Empty string as key does not work in new parser
- Requesting property of an entity caused error in new parser
- The SQLite CSV import now imports `"true"` and `"false"` as strings instead of Booleans
- Fixed loading mechanism for custom build task handlers
- `req.diff()` for `UPDATE` on a view with renamed property in `orderBy`
- `$user.<attr>` for managed properties (`@cds.on.insert`/`@cds.on.update`)
- GraphQL `__typename` meta field if it is the only selected field of an association/composition
- Command shortcuts like `cds c` are now handled properly if executed in an NPM script
- ETag is not included in expanded entities using `$select`, for example: `Books(1)?$expand=author($select=ID)`
- `cds.compile.to...` no longer crashes if called with a CSN that has a dangling ref
- Requests to remote services via navigation path without explicit `$select`, but having `$expand` query option
- `cds.compile` correctly supports reserved namespaces like `cds.foundation`.
- `cds.compile.to.serviceinfo` now uses the correct configuration for the base URL paths for Java services
- `cds deploy --to sqlite` correctly localizes texts in deployed views. Before not all localized texts have been correctly resolved.
- `cds deploy --to hana` reports missing org or space info with a better message.
- Using combinations of `.` and `_` in CSN definition names

### Removed

- Redundant locale implementation

## Version 5.8.4 - 2022-03-17

### Fixed

- `UPDATE` singleton entity does not require to provide singleton keys in a payload
- CQN queries with operator expressions (`xpr`) in ON-conditions of unmanaged associations and compositions

## Version 5.8.3 - 2022-03-01

### Fixed

- `queries` property for application-defined destinations of remote services
- `cds serve --watch` no longer fails if `@sap/cds-dk` is installed only globally
- `cds serve` during development longer redirects URLs with similar path segments from different services, like `/service/one` and `/service`
- `cds deploy --to sqlite` now ignores a `_texts.csv` file again if there is a language-specific file like `_texts_en.csv` present
- Using logical blocks (surrounded with `(` and `)`) in ON-conditions of unmanaged associations and compositions
- Skip "with parameters" clause if no order by clause or all columns in the order by clause are not strings when using parametrized views on SAP HANA
- Limited support for binary data in OData
  - Using of `base64` encoded string values in `WHERE IN` on SAP HANA
  - `base64url` values in `@odata.context` annotation
- `cds.context` is set in GraphQL adapter
- Using payloads with `@odata.type` annotating primitive properties no longer crashes the application. `#` in type value may be omitted. Example:

  ```json
  {
    "ID": 201,
    "title@odata.type": "#String",
    "title": "Wuthering Heights",
    "stock@odata.type": "Int32",
    "stock": 12
  }
  ```

- Unicode support for i18n bundles

## Version 5.8.2 - 2022-02-22

### Fixed

- Crash if error does not have a stack in Kibana logging
- Allow short names for bound operations in odata-server
- Performance issue during deep operations
- Resolving views with parameters
- Expanding association-to-many within draft union scenario
- Erroneous invalidation of deep `INSERT|UPDATE|DELETE` operations if root entity has managed to-one association to non-writable view
- Handling of falsy results when sending requests to remote services
- Resolving foreign key propagations for views with union

## Version 5.8.1 - 2022-02-11

### Fixed

- Use single transaction for update mutations in GraphQL adapter
- ODATA to CQN parser returned not selected keys in `@odata.context`
- Draft: `$expand` with special draft columns in `$orderBy` for active entities
- Reading distinct values of draft enabled entity
- Handling of LOB data on HANA
- Fix streaming draft by navigation
- Empty to-many arrays are not removed from req.data for inserts
- `$filter` query option in structured mode (OData flavors `w4` and `x4`)
  + Using JSON-stringified objects no longer occasionally crashes an application
  + Filtering on a structured element with `ne null` condition also selects data having some `null` properties within
- Rest: `Content-type` header is set to `text/plain` for primitive data types in response (except for `Boolean`)

## Version 5.8.0 - 2022-01-27

### Added

- Custom `server.js` don't have to export `cds.server` anymore -> we use that by default now.
- In `cds.requires`: Support to replace primitive values with objects
- Support filter functions on renamed properties from external service
- Results of database queries use `big.js` for values of type `cds.Decimal` and `cds.Integer64` if enabled via `cds.env.features.bigjs`
- Support lambda in `$filter` in `$expand`
- Support for `GET` requests on service root in REST adapter (old and new)
- Support for `HEAD` requests in REST adapter (old and new)
- New hook `req.before('commit')`
- Draft (Access control for bound actions): Only the user that is the owner of the draft can execute its bound actions.
- Check that all keys are provided in REST adapter
- Restrict access to all services via `cds.env.requires.auth.restrict_all_services = true`
  - That is, all unrestricted services (i.e., w/o own `@requires`) are treated as having `@requires: 'authenticated-user'`
- Threshold for automatically sending GET requests as `$batch` (beta, cf. @sap/cds@5.6.0) can be configured per remote service via `cds.env.requires.<srv>.max_get_url_length` (if not configured on service, the global config applies)
- Limited support for binary data in OData
  - In payloads, the binary data must be a base64 encoded string
  - In URLs, the binary data must have the following format: `binary'<url-safe base64 encoded>'`, e.g., `$filter=ID eq binary'Q0FQIE5vZGUuanM='`
  - The use of binary data in some advanced constructs like `$apply` and `/any()` may be limited
  - On SQLite, the base64 encoded string is stored in the database
  - It’s strongly discouraged to use binary data as keys. See "Primary Keys — Best Practices" in the documentation.
- Support for OData annotation `@Core.ContentDisposition.Type` with `attachment` as the default value
- Support for returning custom stream objects in custom handlers (beta):
  - Example:

    ```js
    return {
      value: instanceof Readable || null,
      $mediaContentType = 'image/jpeg',
      $mediaContentDispositionFilename = 'foo.bar', // > optional
      $mediaContentDispositionType = 'inline' // > optional
    }
    ```

### Changed

- `cds deploy --to hana` now uses `cf curl` instead of `cf` command natively
- Event Mesh: In multitenancy mode, messaging artifacts are also deployed for provider accounts (unless the service option `deployForProvider` is set to `false`)
- Status code in case of multiple errors (rules apply in order):
  + If all errors have the same status code, that status code is used
  + If there is at least one 5xx status code, the resulting status code is 500
  + If there is at least one 4xx status code, the resulting status code is 400
  + If none of the rules apply, the resulting status code is 500
- Ignore the `If-Match` HTTP request header for `UPDATE`/`DELETE` requests whose target entities are not annotated with the `@odata.etag` annotation.
- I18n template strings now are replaced in EDMX documents such that they can occur multiple times.  For example, the `{i18n>key1} - {i18n>key2}` template results in `value1 - value2`, while previously only the first string was replaced, leading to `value1 - {i18n>key2}`.  This is helpful for the [`Template` strings of `UI.ConnectedFields`](https://github.com/SAP/odata-vocabularies/blob/ac9fe832df9b8c8d35517c637dba7c0ac2753b0f/vocabularies/UI.xml#L168).

### Fixed

- At Node.js runtime, the `development` configuration profile is no longer active if `CDS_ENV` is set to `production` and `NODE_ENV` is undefined
- Enterprise Messaging: The user is now privileged for AMQP
- `cds.spawn` also works with synchronous functions
- Foreign keys in parent are set to `null` when deleting composition of one
- `cds version` now always prints the version of `@sap/cds-dk`, especially if `cds version` was called from within an npm script, i.e. not from `cds-dk`'s CLI.
- Better error message in case destination of Remote Service isn’t found
- Differentiate between draft already exists and entity locked
- OData adapter: roll back transaction before re-throwing standard error in case of atomicity group
- Results of actions/functions do not ignore custom data when using `$expand` query option
- `req.data` is available in custom error handler in case of deserialization error thrown by legacy OData server
- Joining entities with renamed foreign keys (limited to single-level projections)
- Requests with draft and `$expand=*` caused problems in some cases
- `cds serve` during development longer redirects URLs with similar path segments like `/browse/123/browse/` to e.g. `/browse/`
- Post-processing for renamed columns in expand
- Deploy to SAP HANA: passing of options to `hdi-deploy` via `HDI_DEPLOY_OPTIONS` now possible
- Keys as path segments in beta OData to CQN parser
- OData V2 Remote Service (`"kind": "odata-v2"`):
  + Request data properties of types `cds.Date`, `cds.DateTime`, and `cds.Timestamp` are converted accordingly to OData V2 specification
  + Response data properties of types `cds.Decimal`, `cds.DecimalFloat` (deprecated) and `cds.Integer64` are handled properly when using `Accept` header with `IEEE754Compatible=true/false` and `ExponentialDecimals=true/false` format parameters

## Version 5.7.6 - 2022-02-23

### Fixed

- `draftActivate` action does not return children if not requested

## Version 5.7.5 - 2022-01-14

### Fixed

- Instance-based restriction for activation of draft-enabled entities using `or` in restriction
- Messaging: Duplicate handler execution if application service registered events twice
- Post of a deeply nested sub-entity with structured parent keys
- Negating lambda expressions in OData using the `not` operator
- Event Mesh: Redelivery count when using AMQP
- OData requests using lambda expressions on localized data
- `cds.db.exists` wrongly generated a `SELECT * FROM ...` for OData flavor x4
- Return localized texts on draft activate
- Unicode characters in unquoted search terms in beta OData to CQN parser

## Version 5.7.4 - 2021-12-22

### Fixed

- Complex `@restrict.where: 'exists [...] or (... or ...) or ...'` in draft union scenario no longer crashes the application
- Sanitization of null values for `cds.RemoteService`
- Handling of boolean values in draft union scenario with `$expand` query option
- `_4odata` flag in CQN stays non-enumerable when forwarding to another application service
- Handling of type references on properties of associations in `cds.minify`

## Version 5.7.3 - 2021-12-16

### Fixed

- Message Queuing now accepts `amqp` options
- OData requests using lambda expressions with `contains` function
- Result of OData query option `$count=true` when using `$apply`
- `$filter` with navigation to-one equals value crashes
- `$skiptoken` query option allows using arbitrary symbols except of `&` with beta OData URL to CQN parser (`cds.env.features.odata_new_parser`). In this non-integer value case, the value won’t be parsed into CQN.
- Function names in `$filter` can now be case insensitive (as per OData 4.01)
- `$count` in `$expand` caused server to crash

## Version 5.7.2 - 2021-12-09

### Fixed

- Instance-based restriction for activation of draft-enabled entities
- `.columns('*')` on projections of remote services using renamed properties
- GraphQL filters on nested fields are now applied correctly
- Performance degradation during the processing of `where exists`
- Read drafts via navigation with complex filter expression

## Version 5.7.1 - 2021-12-06

### Fixed

- Draft (OData flavors `w4`, `x4`, and `v4` with structs): Flags `HasActiveEntity`, `HasDraftEntity`, and `IsActiveEntity` are now included in the HTTP response for GET requests.
- Instance-based restriction on entities using localized fields in draft
- Results of actions/functions do not ignore nested data if query options are present

## Version 5.7.0 - 2021-12-03

### Added

- Deferred emitting via persistent outbox, enabled through service `outbox` of kind `persistent-outbox`
- Support for compiler-generated referential constraints (beta)
  + Activate via `cds.env.features.assert_integrity: '<preset>'`
  + Available presets:
    + `off`: no database constraints and no runtime checks
    + `app`: runtime checks by default
    + `db`: database constraints by default
  + "by default": if not excluded, the runtime check or database constraint applies
  + "opt-in": if included, the runtime check or database constraint applies
  + Behavior can be overridden via `@assert.integrity: <true/false/'RT'/'DB'>` on property, entity, or service level (lowest applies)
- Allow `--with-mocks` in production via `cds.env.features.with_mocks = true`
- Set media type from content-type header while inbound streaming
- Support for navigations with `$count` in `$filter`, for example `GET Entity?$filter=toMany/$count gt 0`
- Draft: Generate UUIDs for request payloads to which extra data items are added (without the UUID keys) in a custom application handler.
- Generate GraphQL schema via `cds compile -2 gql` (alpha)
- Log requests to remote services if the respective log level is set to `debug`
- Beta OData URL to CQN parser (`cds.env.features.odata_new_parser`):
  + Support for `$skiptoken` query option
  + Limited support for `$apply` query option
    + Supported are the following transformations and their combinations: `aggregate`, `groupby`, `topcount`, `bottomcount`, `filter`, `search`
    + Not supported:
      + Transformations `topsum`, `bottomsum`, `toppercent`, `bottompercent`, `expand`, `concat`, `compute`, `identity`
      + `rollup` and `$all` in `groupby` transformation
      + Filter function `isdefined`
      + Custom aggregation methods, arithmetic operators (`add`, `sub`, `mul`, and so on), and keyword `from` in `aggregate` transformation
      + OData vocabulary for Data Aggregation, `@Aggregation.default` annotation
    + Out of scope:
      + Draft handling
- Out-of-the-box audit logging for draft enabled entities
- Support for `@sap/instance-manager`'s hybrid mode
  + Enable via `cds.env.features.hybrid_instance_manager`
  + Respective version of `@sap/instance-manager` required
- `cds.minify()` (alpha) as static method
- Annotation `@open` for actions in new Rest Adapter
- Audit logging (`cds.env.features.audit_personal_data`) supports annotation `@PersonalData.EntitySemantics: 'Other'` and allows an arbitrary composition of entities with respect to `@PersonalData.EntitySemantics` annotations

### Changed

- `if-match` and `if-none-match` headers are  ignored for entities without etags
- Improve response time of `SELECT` queries that check referential integrity by adding an upper bound `LIMIT 1`
- Leaner implementation for `sap-statistics`
- Leading and trailing whitespaces are allowed for `$search` query parameter
- Insert / Update of Composition of one with empty object is not allowed for non UUID keys
- Search behavior of whitespaces changed as follows:
  + Searches for plain whitespace, for example, `"$search= "` matches the complete data set.
  + Searches for whitespace surrounded by double-quotes, for example, `$search=" "` matches all entries containing whitespaces.
- In single-tenant mode, the default SQLite database is used, regardless of `context.tenant`
- `cds build` for Node.js projects now copies `package-lock.json` files into the staging folder (usually `gen/srv`). This allows the execution of `npm ci` there.
- Relaxed UUIDs in beta URL to CQN parser (`cds.env.features.odata_new_parser`)
- Authentication strategies `dummy` and `mock` no longer require `passport`
- In production, debug logs of `cds.DatabaseService` and `cds.RemoteService` have sanitized values
  + Deactivate via `cds.env.log.sanitize_values = false`

### Fixed

- Path resolution for references in sub-selects
- Where exists without infix filter, e.g., `@restrict.where: 'exists author'`
- `@restrict.where: 'exists [...]'` in draft union scenario
- Select query with path exists predicates, for example, `WHERE EXISTS books[year = 2000].pages[wordcount > 1000]`
- Proper registration of audit log event handlers
- Draft: Generate foreign keys for request payloads to which extra data items are added in a custom application handler.
- `cds build` correctly merges `hdbmigrationtable` files that have multiple new migration versions defined.
- `cds.test` converts response data of failed requests to JSON to prevent lost error details
- Instance-based restriction for draft enabled entities
- Delete requests for localized with compositions
- Ignore input for static and calculated fields during draft activate
- Clear extension map entry on error during CSN fetching
- Do not ignore errors during diff calculation
- Requests to mocked remote service when using custom service name with `.service` property
- Rollback on already backrolled or committed transactions are ignored
- Rollback handling in spawned background job
- `cds.spawn()` throws error if passed option is an instance of `cds.EventContext`
- Delete `timestamp` from options passed to `cds.spawn()` (transactions create their own timestamp)
- Type error during programmatic action/function call if no params defined
- Fully qualified bound actions/ functions in beta URL to CQN parser (`cds.env.features.odata_new_parser`)
- Draft handling: `GET` requests with navigation via `SiblingEntity` and expand to-one
- No audit log if sensitive data not selected
- Kibana formatter: do not log authorization header value
- Audit logging (`cds.env.features.audit_personal_data`) no longer crashes the application
  + when using the same entity as a composition child in different parent entities
  + when accessing a not existing entity

### Removed

- Deprecated feature flags `cds.env.runtime.skipWithParameters` and `cds.env.features.skip_with_parameters`. Use `cds.env.features.with_parameters` instead.

## Version 5.6.4 - 2021-11-23

### Fixed

- Preserve log level in Kibana formatter
- RFC 3986 compliant segment recognition in beta URL to CQN parser (`cds.env.features.odata_new_parser`)
- Support for `$skiptoken` OData query option when using beta URL to CQN parser (`cds.env.features.odata_new_parser`)
- OData requests with `$skip` and without `$top` query option to services with defined default limit (`cds.query.limit.default`)
- Creating entities with binary keys. Currently, the binary keys may be provided only as Node.js `Buffer` instances using a custom handler.
- Requests with a payload containing nested arrayed elements no longer crash the application

## Version 5.6.3 - 2021-11-15

### Fixed

- `cds run` does not fail if `cds.requires.multitenancy` is explicitly set to `false`
- Calculation of `DraftIsCreatedByMe` or `DraftIsProcessedByMe` when expanding or navigating to `DraftAdministrativeData`
- Nested `any` in `$filter` query option
- Crash on draft activate after draft edit for not existing composition of one if no explicit DB service is defined
- Typescript definition of `srv.delete` no longer leads to a duplication error

## Version 5.6.2 - 2021-11-08

### Fixed

- Handle arrayed elements using templating mechanism
- OData requests to `$count` endpoint of ETag enabled entity
- `cds.test` does no longer crash if executed in `cds repl` on a remote service call
- Crash on draft activate after draft edit for not existing composition of one
- Ensure request correlation (with default server)
- `<entity>.texts` points to real text entity
- Draft union with expand to to-one and to-many
- No columns in draft lock statement (i.e., use `SELECT 1`)

## Version 5.6.1 - 2021-11-02

### Fixed

- UAA credentials lookup
- Revert return type validation for `cds.String` for compatibility with older `@sap/cds-mtx` versions
- Messaging: Ill-defined incoming AMQP messages will not crash the app
- `cds compile -l` does no longer crash if called without `--to` option

## Version 5.6.0 - 2021-10-29

### Added

- New REST protocol adapter (beta)
  + Makes use of the beta OData URL to CQN parser. Hence, almost all OData requests are supported (see limitations below).
  + Activate via `cds.env.features.rest_new_adapter = true`
  + Out of scope (compared to OData protocol adapter):
    + OData query option `$apply`
    + Batch requests (with or without atomicity groups)
    + Draft handling
- New GraphQL protocol adapter (alpha)
  + Serves single endpoint for all services based on `served` event at `/graphql` (subject to change).
  + Activate via `cds.env.features.graphql = true`
  + Required additional dependencies: `@graphql-tools/schema`, `express-graphql`, and `graphql`
  + Not meant for productive use! For example, authentication and authorization are out of scope.
- Support of the following features when using beta OData URL to CQN parser (`cds.env.features.odata_new_parser`):
  + REST-style URLs (example: `GET /Foo/1`)
  + `$expand=*` query option on different nested expand levels (`$levels` isn’t yet supported)
  + Draft handling
  + Structured keys
  + Streaming
  + Navigation to primitive properties without `$value` query option
- Optimized Search: Support `$filter` query option in combination with optimize `$search` and localized data (when the environment variable `cds.env.features.optimized_search` is set to `true`)
- `GET` requests support static values in ON-conditions of composition parents when using unmanaged backlinks
- `destinationOptions` can be configured for Remote Services
  + Example:
    ```json
      {"cds":{"requires":{
        "S4": {
          "destinationOptions": {
            "selectionStrategy": "subscriberFirst",
            ...
          }
        }
      }}}
    ```
- `forwardAuthToken` can be configured for Remote Services
  + Example:
    ```json
      {"cds":{"requires":{
        "credentials": {
          "url": "...",
          "forwardAuthToken": true
          }
        }
      }}}
    ```
- File to store private project settings `.cdsrc-private.json` (shouldn’t be checked in source code management)
- Read additional configuration from JSON files or directory structures using `CDS_CONFIG` env variable
- Missing typescript definitions for services' `.send` shortcuts `get`, `put`, `post`, `patch`, and `delete`
- Build VCAP_SERVICES env variable dynamically for compatibility (`cds.env.features.emulate_vcap_services`)
- GET requests to Remote OData Service are automatically sent as `$batch` if the generated URL is too long
  + Can be configured via `cds.env.remote.max_get_url_length` (beta, default: 1028).
- Provide ETag in response headers in case of `prefer: return=minimal`
- Kibana formatter: log the user's id via `cds.env.log.user = true` (beta)
  + Consider the data privacy implications!
- Experimental support for uiflex running locally on sqlite by setting `cds.requires.extensibility.kind = uiflex`
- Minified `cds.model` (deactivate via `cds.env.features.skip_unused = false`)

### Changed

- Query API: Specified keys are now part of the target path, e.g. `SELECT.from('Books', 1)` will move the key condition into `SELECT.from.ref`.
  + Deactivate during two-month grace period via compat feature flag `cds.env.features.keys_into_where = true`
- Removed duplicate integrity checks
- Optimized search: Optimize queries for non-localized elements
- OData to CQN parsing changed to enable remote service consumption. As a side effect, application code in `srv.on('READ', handler)` custom handlers relaying on CQN might need to be adapted. The following has changed:
  - Previously, columns in `req.query.SELECT.columns` were always defined. Now, in case there is no `$select` and `$expand` query options in the OData query, `req.query.SELECT.columns` is `undefined`.
  - Previously, if the `$expand` query option was specified in the OData query, all elements of the expanded navigation property were listed explicitly in the CQN query. Now, an `*` (asterisk) is listed instead.
- Non-specified columns are resolved at database layer
- `cds deploy` no longer enforces the presence of SAP CommonCryptoLib (checked with env variable `SECUDIR`) on Windows since it uses now the built-in security libraries
- Target keys are not included in the body when sending `PATCH` requests to external services

### Fixed

- Audit logging of non-string values
- Query API compilation error when keys start with `{`
- Handling of wrong Edm.DateTimeOffset values
- Using UUIDs in search with beta OData URL to CQN parser (`cds.env.features.odata_new_parser`)
- Runtime exception for READ requests with deeply nested navigation and structured keys, for example:
`GET foo/Bar/b708ad6c-2dd4-40d5-91c0-2e3eacf306d2/Info/sales(a='1010',b='10',c='00')/functions(functionName='error')`
- The check for the minimum Node.js version now properly enforces version 12.18, i.e. aborts server startup.
- `cds.test` fails with a clearer error message if the server wasn't started at all
- Audit logging for modification of personal or sensitive data when using same entity as a composition child in different parent entities
- Deleting an entity defined with managed composition of one, whereas a dependent entity is defined as having an independent managed association to its composition parent no longer crashes the application
- Audit logging for entities having arrayed elements
- Filtering for `cds.Date` on Remote OData V2 services
- Crash when `rollup` function was used in groupBy in OData requests
- Or for $filter with IsActiveEntity=true for access to active entities
- Reading draft-enabled entity with `$expand` targeting non-draft associations
- Delete with sub-select
- Runtime exception when streaming property annotated with `@Core.MediaType: 'application/json'`
- Reading streams via navigation when entity containing large data is a part of a draft-enabled composition tree
- Read draft entity with nested exists restriction
- Activate draft of entity having `to-one` and `to-many` compositions
- Caching issue that causes the OData `omit-values` preference in `Prefer` HTTP headers to misbehaves
- Deletion of draft instances if multiple draft enabled entities are used within one service
- Queries with `contains` filter targeting a remote OData v2 service
- Schema evolution support for nested CDS entities in `cds build`
- I18n texts with quotes and other special characters get escaped correctly if they appear in XML and JSON documents
- Execution of plain SQL statements on SQLite
- `Content-Disposition` header is now URL encoded

### Removed

- Usage of `@sap/xsenv` is superseded with `cds.env` in node.js cds-runtime
- `@odata.on.insert/update` and `#user/now` are deprecated and will be removed in the next major version. Use `@cds.on.insert/update` and `$user/now` instead.

## Version 5.5.5 - 2021-10-20

### Fixed

- Action parameters set to null
- Restrictions with "where exists" clause and filter on ambiguous fields
- Nulled user attribute in restrictions with "where exists" clause
- Wait for all queries to settle during deep operation

## Version 5.5.4 - 2021-10-12

### Fixed

- Backwards compatibility for `cds.tx({ user: new User ({ tenant, locale }) })`
- Transaction API fix: `cds.tx ({ tenant }, tx => { ... })` instead of `cds.tx (tx => { ... }, { tenant })`
- Writable and reliable `query._target`
- `req.target` in REST with navigations in URL

## Version 5.5.3 - 2021-10-06

### Fixed

- Resolving of views for view definitions using aliases
- `cds.test` in `cds repl` no longer yields an error with the `beforeEach` function not found
- Aliasing in case of draft union when expanding more than one `to-one` association
- Resolving of views if intermediate views are defined in database namespace

## Version 5.5.2 - 2021-09-29

### Fixed

- `$expand` requests with virtual fields with the same name in root and child
- Requests expanding `DraftAdministrativeData` when compound keys are used
- `SELECT.columns` with an empty array as argument
- Queries with complex lambda filters

## Version 5.5.1 - 2021-09-24

### Added

- Support for casting SQL function input

### Fixed

- Typo in `DELETE` method of `cds.test`
- View resolving for intermediate queries
- Result post-processing for renamed expands
- Don't use placeholder values for `null`

## Version 5.5.0 - 2021-09-23

### Added

- Support for minified models
- Messaging: Support for string payloads
- Messaging: Webhooks use 'application/json' as the default content type
- Messaging: If senders don't use `data` as a property of the payload, then the whole payload is interpreted as `data`
- Messaging: Support for `$namespace` placeholer in queue name
- Support for deletable singletons with `@odata.singleton.nullable`
- Remote requests set the `accept-language` header according to the original request or the user's locale
- Support for choosing data source names different from names of respective service definitions.
  + Example:
    ```json
      {"cds":{"requires":{
        "S4": {
          "model": "...", "service": "API_BUSINESS_PARTNER"
        }
      }}}
    ```
- When calling `cds.tx()` to create new transactions, this now automatically inherits the current event context from `cds.context`. In case that creates issues set `cds.env.features.cds_tx_inheritance = false` to restore the former behaviour. You can still overwrite individual context settings, for example:
    ```js
    const tx = cds.tx() // inherits tenant and user
    const tx = cds.tx({ // inherits tenant
      user: new cds.User.Privileged
    })
    ```
- Method `cds.tx()` now allows to pass a function which will be executed within a new managed transaction, with `tx.commit/rollback()` handled automatically. For example:
    ```js
    await cds.tx (tx => {
      await tx.insert (...)
      await tx.read (...)
    })
    ```
    is equivalent to:
    ```js
    const tx = cds.tx ()
    try {
      await tx.insert (...)
      await tx.read (...)
      await tx.commit()
    } catch {
      await tx.rollback()
    }
    ```
- Method `cds.tx({user})` now allows specifying a user as a plain string, for example:
    ```js
    cds.tx ({ user:'me' })
    ```
    is equivalent to:
    ```js
    cds.tx ({ user: new cds.User('me') })
    ```
- Newly introduced method `cds.spawn()` allows correctly and conveniently spawning background jobs from within event handlers. Thereby ensuring a detached fully-managed ACID transaction set as `cds.context` for each execution of the background job, inheriting the current event context from the outer `cds.context` by default. Usage options:
    ```js
    cds.spawn (async ()=>{
      await INSERT.into ('Ticker') ...
    })
    ```
    ```js
    cds.spawn (async ()=>{
      await INSERT.into ('Ticker') ...
    },{ after: 111 /* ms */ })
    ```
    ```js
    let n=0, handle = cds.spawn (async ()=>{
      await INSERT.into ('Ticker') ...
      if (++n>9) clearTimeout (handle)
    },{ every: 111 /* ms */ })
    ```
    ```js
    cds.spawn (async ()=>{
      await INSERT.into ('Ticker') ...
    },{ // inherits tenant
      every: 111 /* ms */,
      user: new cds.User.Privileged
    })
    ```
- Default server is CORS-enabled for all origins if not in production
- Default lock acquire timeout for `SELECT FOR UPDATE` via `cds.env.sql.lock_acquire_timeout`
- Optimized search: Support `groupby` for localized data (when the environment variable `cds.env.features.optimized_search` is set to `true` on SAP HANA)
- Out-of-the-box audit logging for deep structures without own association to data subject
  + limited to one data subject per role per composition tree
- Support for reading streams via `GET /<Entity>(<ID>)/$value`
- Draft choreography: support of navigation with `SiblingEntity`
- Support for where exists with infix filters in `@restrict`
- Support annotation `@Capabilities.ExpandRestrictions.NonExpandableProperties`
- `@Core.ContentID` added to OData error responses if `content-id` header is specified
- New OData URL to CQN parser (`cds.env.features.odata_new_parser`):
  + support of navigation to primitive properties using `$value`
  + support of `not` operator with string functions (`contains`, `startswith`, `endswith`)
- Support for default values for virtual fields
- Payload for non-writable navigation targets removed from `req.data`
- `cds build` supports i18n message bundles for Java and Nodejs apps and a default CSN format option for Java
- View resolving considers renaming of foreign keys and `excluding` names when `columns` are explicitly provided in CQN
- Resilient acquire for SAP HANA via `cds.env.requires.db.connection_attempts = <number>` (alpha; hard max of 3 enforced)

### Changed

- Messaging: Webhooks will always generate tokens
- Messaging: In multitenancy mode, messaging artifacts are only deployed to subscribers (unless the service option `deployForProvider` is set to `true`)
- Messaging: Incoming messages without corresponding handlers aren’t acknowledged
- If a service executes a query targeting a projection on one of its entities, the query is resolved along with projections to an entity known by the executing service. The result is post-processed to reflect the expected result of the incoming query. The reason is that no handlers of the executing service were executed as they didn’t know the query target.
  + Deactivate during two-month grace period via compat feature flag `cds.env.features.resolve_views = false`
- Use `@sap/cds-compiler`'s `smartId` function to determine whether a reference needs to be quoted.
  + Allows the use of non-word characters in column names, for example `entity Foo { ![bar/bz]: String; }`.
  + Support for columns with spaces with feature flag `cds.env.features.spaced_columns`.
  + Note: Restrictions in other layers (example: OData's simple identifier schema) still apply.
  + Note: Expressions in references (example: `ref: ['foo as bar']`) currently works but were never intended to and will be removed in future versions.
- Clear draft data based on their draft UUID instead of via deep delete
- Support `@sap/cds-compiler`'s changes for DB constraints: managed and unmanaged compositions of one behave like associations. This means that only `$self`-managed composition of one gets `DELETE CASCADE` constraint. Since all other "2one" cases require extra `DELETE` handled by the runtime, that constraint is ignored.
- Value with regards to date and time functions aren’t converted to strings in the OData protocol adapter
- No placeholders for `LIMIT` to enable statement caching during pagination
- Arrayed elements stringified in DB layer
- Return values of handlers will have precedence over database reads
- Error of a failed request to a Remote Service contains now the response payload if available
- Configuring ad-hoc destinations via `credentials.url` is now allowed in `NODE_ENV=production`
- New OData URL to CQN parser (`cds.env.features.odata_new_parser`):
  + CQN for `$select` and `$expand` columns

### Fixed

- `SELECT.from (Foo, f => f.bar('*').where(...))` resulted in a runtime exception
- Preserved locales are now considered when accessing database tables
- Integrity checks for compositions by draft enabled entities
- Constant columns must not be quoted anymore, i.e. `{ val: "'myValue'", as: "myColumn"}` must be changed to `{ val: "myValue", as: "myColumn" }`
- Accidental `tx.run()` after prior `tx.commit/rollback()` lead to acquired connections not returned to pool. This is detected and disallowed now. In case that creates issues set `cds.env.features.cds_tx_protection = false` to restore the former behaviour.
- Structured keys are correctly resolved with pegjs-based parser
- Template processing for columns with spaces in their name
- Deep delete with recursions in composition tree (with limited recursion depth)
- Draft edit with recursions in composition tree (with limited recursion depth)
- `emit` for messaging services now also works in custom express middlewares
- `req.query` is a CQN object (previously array with one entry) in case of batch insert in REST adapter
- HasActiveEntity flag with expand
- `compile.to.serviceinfo` now honors default Java endpoint paths if none are configured in `application.yaml`
- `PATCH` request to a non-existent entity annotated with the `@PersonalData` annotation
- `req.diff()` while deep updating via composition
- Convert data type of elements in sub-entities (to one association) when forwarding responses to external services
- Update children of a composition of many (`INSERT > DELETE`) with `PATCH/PUT` having at the same time another association to one composition child respects foreign key constraints.
- Handling of virtual fields used in the `$filter` query option of navigation requests
- Copy texts in default language from active to draft table on draft edit
- Optimized search: Escape double quotation marks and backslashes (when the environment variable `cds.env.features.optimized_search` is set to `true`)
- Update for multiple rows
- Expand during draft union
- Validate content type for `$batch` requests
- Support for `SELECT` statements in `where` clauses when resolving views
- `INSERT.rows()` doesn’t silently fill in `INSERT.entries` anymore &rarr; use `INSERT.entries()` to do so instead.
- `UPDATE(Foo).with({foo:{'=':'bar'})` erroneously produced:
  ```js
  {UPDATE:{..., with:{foo:{ref:['bar']}}}} //> wrong
  ```
  instead of:
  ```js
  {UPDATE:{..., data:{foo:'bar'}}} // correct
  ```
  &rarr; to produce the ref, use one of:
  ```js
  UPDATE(Foo).with ({foo:{ref:['bar']}})
  UPDATE(Foo).with `foo=bar`
  ```
- `UPDATE.with` property stays undefined until actually filled with data
- Differentiate between require and initialize error of audit logging client
- The built-in model tree-shaking erroneously deleted explicitly modeled `.texts` entities
- Actions and functions with `Integer` response type in REST services
- Occasional drop of conditions in `WHERE` depending on the value when using structured types
- `PATCH` fixed for singletons and when having a keyless, for example, managed to-one navigation path
- Internal server error when forwarding a query to an external service whose target entity doesn’t contain keys
- Nested where exists in `@restrict` via navigation (CRUD-only; beta)
- Expand to one in draft union
- Patch to auto exposed entity through composition of aspect from SAP Fiori Elements
- Diff for delete in draft
- Streaming requests on views with joins no longer crash the application

### Removed

- Direct usage of body-parser
- Queries constructed from `cds.ql` do not have the _internal_ property `cqn` anymore
- Inofficial variant `SELECT({'expand(foo)':['a','b']})` is not supported anymore
  &rarr; use one of these official APIs for expands instead:
  ```js
  SELECT(x => { x.a, x.foo (f =>{ f.b, f.c }) })
  SELECT(['a',{ref:['foo'], expand:['b','c']}])
  ```
- Inofficial variant `SELECT.orderBy('foo','desc')` is not supported anymore
  &rarr; use one of these official APIs instead:
  ```js
  SELECT.from(Foo).orderBy({foo:'desc'})
  SELECT.from(Foo).orderBy('foo desc')
  ```
- Inofficial variant `SELECT.orderBy('foo, bar desc')` is not supported anymore
  &rarr; use one of these official APIs instead:
  ```js
  SELECT.from(Foo).orderBy({foo:1,bar:-1})
  SELECT.from(Foo).orderBy('foo','bar desc')
  SELECT.from(Foo).orderBy `foo, bar desc`
  ```
- Inofficial variant `SELECT.where({ or: [{ foo: 'bar' }, { foo: 'baz' }] })` is not supported anymore
  &rarr; use one of these official APIs instead:
  ```js
  SELECT.from(Foo).where({ foo: 'bar', or: { foo: 'baz' } })
  SELECT.from(Foo).where `foo='bar' or foo='baz'`
  ```
- Usage of SQL window functions during expand on SAP HANA
- Hidden symbol for where clause elements originating from `@restrict`
- Error masking gate keeper for `cds.env.log.levels.cli`

## Version 5.4.6 - 2021-09-18

### Added

- Support for nested where exists in `@restrict` (CRUD-only; beta)

### Fixed

- Inverse transition mapping calculation
- Skip empty structures during deep update

## Version 5.4.5 - 2021-09-15

### Fixed

- Processing of null elements during deep update
- Performance issue during template processing

## Version 5.4.4 - 2021-09-09

### Fixed

- For drafts, the query parameter `$top=0` in combination with `$count=true` now returns the correct `@odata.count` value
- Deep delete with composition of one with structured key in target
- Implicit delete of child with structured key
- Update of deeply nested entity with structured key
- Order by join column during draft union
- Skip calculated properties while following projections
- The `with parameters` clause is now correctly handled in sub-selects if the locale parameter exceeds three characters
- Statement already finalized error on SQLite

## Version 5.4.3 - 2021-08-16

### Fixed

- Skip calculated properties while following projections
- Unrestricted subclauses in `@restrict.where`
- Safe access to `cds.env.log.levels.cli`

## Version 5.4.2 - 2021-08-11

### Fixed

- Where condition in draft union in case of multiple keys
- Handling of nulled properties in Service Consumption
- Requests to Remote Services returning `text/html` result in an error
- View resolving is more robust for path expressions
- Skip foreign properties (e.g., mixins via associations) while following projections
- UPDATE entity with composition to aspect with structure type property

## Version 5.4.1 - 2021-08-03

### Fixed

- Erroneously added Brazilian Portuguese (`pt_BR`) removed from the list of normalized locales

## Version 5.4.0 - 2021-08-02

### Added

- Messaging: Support for format `cloudevents`
- Messaging: Support for `@topic`
- Messaging: Support for `subscribePrefix` and `publishPrefix`
- Support for `ReadByKeyRestrictions` annotations
- Support for OData `omit-values` preference in `Prefer` HTTP header
- Object variant of service methods
- Brazilian Portuguese (`pt_BR`) is now on the list of [normalized locales](https://cap.cloud.sap/docs/guides/i18n#normalized-locales)
- Support for actions and functions on Remote Service

### Changed

- In multitenant `enterprise-messaging`: If a tenant subscribes, the messaging artifact generation is awaited. In your provisioning service configuration, make sure to set `onSubscriptionAsync` to `true` and `callbackTimeoutMillis` to more than 10 minutes.
- In `enterprise-messaging`: Messages are sent via HTTP
- Computed values are preserved during draft activate
- Messaging: No more topic manipulation per default
- For consistency reasons `cds build` now determines the default model path using cds resolve
- Match XSUAA's user attribute value `$UNRESTRICTED` case insensitive
- CDS build now uses new CDS logging facade to allow for consistent logging behaviour across the different CDS modules

### Fixed

- Disable persistency check for requests without a target
- Expand at draft edit
- Remove restriction for `$search` queries not accepting brackets
- Select query with infix filter in custom handler
- Order by on same named properties of different associations in draft
- Allow to call bound actions and functions of read-only entities
- Writing draft-enabled entities with composition of aspects (a.k.a. managed compositions)
- Expand to autoexposed association/composition in draft case
- `cds.parse.xpr()` always returns an array
- Allow boolean options in `cds build` CLI
- Integrity check in case of bulk query execution

### Removed

- Messaging: The topic prefix `topic:` is deprecated
- Messaging: No default headers for format not equal to `cloudevents`

## Version 5.3.3 - 2021-07-28

### Fixed

- Validation of arrayed parameters of actions and functions
- Skip not-to-be-audited entities in composition tree
- In draft, `<entity>.texts` can be used without explicit exposure

## Version 5.3.2 - 2021-07-16

### Added

- `enterprise-messaging`: Experimental support to send messages via HTTP (`emitPerHTTP: true`)

### Changed

- Aligned Node.js and Java auditlog APIs
- `enterprise-messaging`: No topic manipulation for outbound events beginning with a different namespace

### Fixed

- Call `init()` and register custom handlers for every new `cds.ApplicationService` created in extensibility scenarios
- Structured keys for deep operations in OData flavor `x4`
- Wrong user in messaging requests coming from webhooks
- Improvements in log formatter for Kibana:
  + Remove redundant metadata information
  + Add information from `req.headers`
  + Treat error-like objects like errors
  + Custom fields (alpha)
- Minor fix for *optimized search* on SAP HANA

## Version 5.3.1 - 2021-07-12

### Changed

- Task `@sap/cds-runtime/lib/messaging/deploy.js` moved to `@sap/cds/tasks/enterprise-messaging-deploy.js` after module merge
- Parse OData lambda expression on collection of scalars with equals operator (i.e., `.../any(d:d = "<val>")`) to CQN with `contains` (pegjs-based parser only)

### Fixed

- Improved error message in case custom `server.js` doesn't export a function
- Kibana formatter: `stacktrace` as array of strings
- Bootstrapping for feature toggles
- Deep operations for certain composition constellations
- Aliasing on SQL layer for OData `ne` operator
- Fixed scope issues in manual deployment for messaging
- Projections with infix filters and cardinality changes are safely ignored during `CREATE`/`UPDATE`
- Resolving of views if underlying projection has explicit aliases

## Version 5.3.0 - 2021-07-07

### Added

- `cds serve` and `cds deploy` now also load `.ts` Typescript files if started with [`ts-node`](https://www.npmjs.com/package/ts-node)
- Log formatter for Kibana (beta) via `cds.env.features.kibana_formatter`
- First version of the `AuditLogService` (beta)
  + Supported events: `dataAccessLog`, `dataModificationLog`, `configChangeLog`, and `securityLog`
  + Usage: `const AuditLogService = await cds.connect.to('audit-log'); await AuditLogService.emit/send('<event>', <data>)`
  + Out-of-the-box audit logging for modification of personal data and access to sensitive personal data via `cds.env.features.audit_personal_data`
- Support for deep updates with compositions of one in `UPDATE(...).with(...)`
- Support for logical events in `composite-messaging`
- Initial support for generating OData V2 queries
- Preserve `DraftAdministrativeData_DraftUUID` if OData v2 client (indicated by `@sap/cds-odata-v2-adapter-proxy`)
- Use placeholder values for numbers with `cds.env.features.parameterized_numbers` (alpha)
- Support for argument-less SQL functions (e.g., `current_date`)
- Performance optimization: Resolve localized texts for `$search` queries at runtime (alternative to localized views resolution) to avoid the performance overhead of the SQL `coalesce` function in filter operations. To enable this *experimental feature* for SAP HANA, you can set the `cds.env.features.optimized_search` environment variable to `true`
- Performance optimization: Optimize `$search` queries using the `CONTAINS` predicate instead of the `LIKE` predicate in the `WHERE` clause of a `SELECT` statement. To enable this *experimental feature* for SAP HANA, you can set the `cds.env.features.optimized_search` environment variable to `true`
- OData lambda expressions in `$filter`:
  + Basic support of structured types (`cds.env.odata.flavor = x4`) on SAP HANA
  + Support of navigation paths on SAP HANA, for example, `GET /Books?$filter=author/books/all(d:d/stock gt 10)`

### Changed

- Custom build tasks are no longer restricted to `@SAP` namespace.
- CDS build tasks of type `fiori` are no longer copying files located in the UI module folder into the deployment staging folder.
- Leaner error messages for unsuccessful remote service calls
- Incoming messages now contain a privileged user
- `SELECT.where(...)` generates CQN with list of values for `in` operator
- Always use flag `u` during input validation via `@assert.format`
- Intermediate CQN format for lambda expressions with preceding navigation path
- Better error messages for draft enabled entities

### Fixed

- Projecting data works also for projections where one field maps to multiple entries
- `SELECT` queries without user-specified columns only modify draft columns if the entity is draft-enabled.
- Generated `index.html` erroneously showed entries for `contained` entities from managed compositions.
- Use OData simple identifier format for links to entity sets in generated `index.html`.
- `cds build` logged duplicate compilation errors for the identical `.cds` file, but with different relative path names.
- `cds serve` no longer tries to redirect Fiori URLs starting with `$` to service URLs.
- `cds build` now supports `HANA Table data properties files` in SaaS applications. These files haven’t been copied into the sidecar folder.
- `cds deploy --dry` generates DROP/CREATE DDL statements with an order that also H2 can handle, i.e. with dependant views dropped before basic views.
- `cds build` now correctly handles symbolic links for nodejs projects on Windows.
- `cds build` now correctly filters CDS source files when building SaaS applications.
- Deploy endpoint for messaging artifacts includes the needed roles
- Detection of mocked services and forced resolving of views
- `POST/PATCH/PUT` requests on `Composition of many` with association as key and custom `on` conditions
- `$expand` on entities with `.` in name
- Filter on external service when using `ne null`
- Primitive property access of Singletons defined without keys via URL like `/Singleton/name`
- Expand and navigation in draft-enabled entity with composition of aspects
- `@Core.ContentDisposition.Filename` instead of `@Core.ContentDisposition`
- Select query with `$count` with combination with `$search`
- Parsing of `Timestamp`, `DateTime` and `Date` values in OData request when using beta URL to CQN parser (`cds.env.features.odata_new_parser`)
- Reset temporal session contexts
- Caching of runtime aspects
- Handling of foreign keys as well as an input validation when using nested associations as keys
- Transaction handling in case of multiple changesets
- Hana procedure call with output parameter
- Skip foreign key propagation if target is annotated with `@cds.persistence.skip`
- Values misidentified as operators in `$search`
- Ensure UTC valus are written to DB
- Etag handling in case of action with `$select`
- Fix draft related issues in odata2cqn
- Where clause in `@restrict` gets duplicated if `$search` query option is used

## Version 5.2.0 - 2021-05-31

### Fixed

- Virtual fields are not filtered out before application service handlers
- Clarification: the minimum required Node.js version is 12.18.  Versions < 12.18 might not work.
- `cds build` supports validation of `extension-allowlist` which is replacing `entity-whitelist` or `service-whitelist` with cds-mtx 2.0. Warnings are no longer returned if neither entity-whitelist nor  service-whitelist is defined.
- `cds compile -2 sql/edmx` erroneously wrote excessive compiler output to stderr
- Resolve the correct `enterprise-messaging-shared` credentials from VCAP_SERVICES by default
- `cds compile --to sql` now completes the last SQL statement with a proper semicolon

## Version 5.1.5 - 2021-05-21

### Added

- `cds build` adds `engines.node` version to `package.json` if not present, in order to match the minimum required node version of CDS.
- Generate an invocation context identifier (`cds.context.id`) if none can be derived

### Changed

- Better support for UI tools to get metadata for projects with both a Node.js and Java server

### Fixed

- Match locales in all upper-case (for example `ZH-CN` instead of `zh-CN`)
- Key elements got lost in `cds.linked` when using type refs referring to other key elements
- Tree shaking erroneously removed types `Foo` when only referred to by type refs like `bar : Foo:bar`
- Fixed an error in transaction handling, that lead to db connections not released in rare cases
- SQL names option gets properly propagated
- No longer erroneously exclude entities explicitly marked with `cds.persistence:{table, skip:false}`, as in [cap/samples/suppliers](https://github.com/SAP-samples/cloud-cap-samples/blob/6b08826af51651f6b31fce8454fbadd23c634b85/suppliers/srv/mashup.cds#L46)

## Version 5.1.4 - 2021-05-12

### Fixed

- Error when using complex type references, as in:
```swift
entity Foo { bar: Tic:tac.toe; }
entity Tic { tac: Composition of { toe:String } }
```

## Version 5.1.3 - 2021-05-12

### Fixed

- `cds` does not check for the min. Node.js on BAS, for now

## Version 5.1.2 - 2021-05-12

### Fixed

- `cds compile --for odata` now honors the OData version again
- `cds compile --for odata` now honors the SQL naming mode (`sql.names`) again
- `cds serve` does not run in an infinite bootstrap loop if `cds.server()` is called in `server.js`

## Version 5.1.1 - 2021-05-07

### Fixed

- `cds build` is now always adding `.hdbview, .hdbtable, .hdbconstraint or .hdbindex` plugin mappings to `.hdiconfig` to avoid that deployment is failing in case such files exist in an already deployed container, but are no longer generated.
- `cds compile --dest <dir>` no longer crashes creating the destination folder

## Version 5.1.0 - 2021-05-05

### Added

- Custom error handler via `srv.on('error', function (err, req) { ... })` (beta)
  + Synchronous modification of passed error only
- `cds.log.format()` for custom log formatting

### Fixed

- `cds build` now correctly handles `message.properties` files used for Nodejs runtime messages if these files have been defined in an i18n content folder located at project root.
- Nodejs custom handlers are now correctly resolved if a dedicated destination folder has been configured for the build task.
- Now, the `.csv` file reader correctly closes open file descriptors to avoid memory leaks during `cds build`.

### Changed

- Clean up obsolete compiler option `snapi`.
- `cds build` is no longer validating Nodejs custom service handlers that have been registered using service `@impl` annotation.

## Version 4.6.6 - 2021-05-05

### Fixed

- Now, the `.csv` file reader correctly closes open file descriptors to avoid memory leaks during `cds build`.
- Fixed i18n handling causing `cds build` to fail with error message `bundle is not iterable`.
- Nodejs custom handlers are now correctly resolved if a dedicated destination folder has been configured for the build task.

## Version 5.0.7 - 2021-04-21

### Fixed

- Internal test stabilizations

## Version 5.0.6 - 2021-04-16

### Fixed

- `cds build` no longer fails with `TypeError: x.startsWith is not a function` in some situations

## Version 5.0.5 - 2021-04-15

### Changed

- Internal errors are no longer decorated with `Please report this`.  People interpreted the text as to only include the stack trace in error reports and to omit other valuable context information.

### Fixed

- `cds build` now correctly creates the deployment layout for multitenant applications (sdc folder contents) that have dedicated folder paths configured for db, srv, and app modules.
- `cds deploy --to sqlite` now ignores a `_texts.csv` file again if there is a language-specific file like `_texts_en.csv` present
- `cds env` no longer fails to parse `.env` files with JSON values containing `=` characters

## Version 5.0.4 - 2021-04-07

### Fixed

- `cds build` no longer fails with a `task.apply is not a function` error when used in an npm script.

## Version 5.0.3 - 2021-04-06

### Fixed

- `cds.compile` got thoroughly cleaned up and enhanced as the single API to compile models
- `cds.compile.to.cdl` was missing in 5.0.2
- `cds build` no longer uses reflected CSN which caused odata and EDMX transformation to fail.
  As a consequence language specific EDMX files were missing.

### Removed

The following undocumented, internal functions have been removed.
In case you spotted and used them, please replace as given below.

- `cds.compile.cdl` &rarr; use `cds.compile` instead
- `cds.compile.to.parsed.csn` &rarr; use `cds.parse` instead
- `cds.compile.to.xtended.csn` &rarr; use `cds.compile` instead
- `cds.compile.to.inferred.csn` &rarr; use `cds.compile` instead
- `cds.compile.to.hdi` &rarr; use `cds.compile.to.hdbtable` instead
- `cds.compile.to.hana` &rarr; use `cds.compile.to.hdbcds` instead
- `cds.compile.to.xsuaa` &rarr; still available in CLI thru `cds compile -2 xsuaa`
- `cds.compile.to.serviceinfo` &rarr; still available in CLI thru `cds compile -2 serviceinfo`
- `cds.compile.to['edmx-v2']` &rarr; still available in CLI thru `cds compile -2 edmx-v2`
- `cds.compile.to['edmx-v4']` &rarr; still available in CLI thru `cds compile -2 edmx-v4`
- `cds.compile.to['edmx-w4']` &rarr; still available in CLI thru `cds compile -2 edmx-w4`
- `cds.compile.to['edmx-x4']` &rarr; still available in CLI thru `cds compile -2 edmx-x4`


## Version 5.0.2 - 2021-03-30

### Added

- Ensure correlation id and set intermediate `cds.context` in default `server.js`

### Fixed

- `cds build` no longer aborts for CAP Java SDK based projects with `compiler version 2 not supported` message.

## Version 5.0.1 - 2021-03-25

### Added

- `cds.load.properties` and `cds.parse.properties` to load and parse content in .properties format
- `cds.load.csv` and `cds.parse.csv` to load and parse csv content
- `CDL`, `CQL`, and `CXL` as new global methods for tagged template strings generating [CSN], [CQN], or [CXN] objects
- Fluent API classes provided through `cds.ql` also support tagged template strings now in these methods: `SELECT`, `SELECT.from`, `SELECT.where`, `UPDATE`, `UPDATE.with`, `UPDATE.where`, `INSERT.into`, `DELETE.from`, `DELETE.where`

Example:
```js
let Authors = SELECT `ID` .from `Authors` .where `name like ${'%Brontë%'}`
let Books = SELECT `ID,title` .from `Books` .where `author_ID in ${Authors}`
await UPDATE`Books`.with`x = x-${amount}`.where`ID=${ID}`
```

### Changed

- Minimum required Node.js version is now 12.  Support for Node.js 10 is dropped.
- `req.timestamp` is a Date object now; was a UNIX epoch integer before, i.e., Date.now()

### Fixed

- Fixed race conditions in `cds.serve` leading to broken services
- Fixed typos in API type definitions
- Fixed `cds.reflect.forall` for CSN extensions
- Fixed orphaned `_texts` proxies, causing init from csv to fail with "no such table" errors

## Version 5.0.0 - 2021-03-19

### Added

- MTX APIs are now automatically served when `cds.requires.multitenancy` exists. This renders an application-level server start script for multitenancy unnecessary.
- Auto-connect to a live reload server started by `cds watch`
- `cds.parse` now offers tagged template strings. E.g. const {CDL,CQL,CXL} = cds.parse; CQL`SELECT from Books where stock > 111`.
- `cds.log` now supports config options for Loggers and log levels via `cds.env.log`
- `cds.entity.draft` as a stable way to read from draft data
- `cds.linked` now correctly links, events, action params and results, which were not linked before
- `cds.env.features.skip_unused = 'all'` removes all definitions from csn which are not reachable by defined services. Especially when using comprehensive reuse models, like ODM, this significantly reduces both, memory consumption as well as excess tables and views in databases

### Changed

- Upgraded major version of dependency `@sap/cds-compiler`
- `cds.requires.db.multiTenant` is deprecated. Multitenancy can now be enabled by adding a `cds.requires.multitenancy` configuration.
- `cds deploy --to hana` no longer adds a driver for SAP HANA to `package.json`.  This can be done with `cds add hana`.
- `cds deploy --to hana` no longer adds configuration for SAP HANA to `package.json`.  This can be done with `cds add hana`.
- `cds deploy --to hana` drops support for the classic CAP Java runtime, i.e. longer writes credentials for SAP HANA to `connection.properties`.
- Fiori preview now [loads and shows data initially](https://sapui5.hana.ondemand.com/1.84.0/#/topic/1cf5c7f5b81c4cb3ba98fd14314d4504) in its list page
- I18n template strings now are replaced in EDMX documents such that they retain their surrounding string.  For example, the `"{i18n>key1} - {i18n>key2}"` template results in `"value1 - value2"`, while previously the first match replaced the entire string, leading to `"value1"`.  This is helpful for the [`Template` strings of `UI.ConnectedFields`](https://github.com/SAP/odata-vocabularies/blob/ac9fe832df9b8c8d35517c637dba7c0ac2753b0f/vocabularies/UI.xml#L168).
- CDS drops compiler v2 support for classic CAP Java runtime projects. `cds build` returns an error if compiler version 2 is used. For further details regarding migration to CAP Java SDK runtime see https://cap.cloud.sap/docs/java/migration.

### Fixed

- `cds.connect.to` no longer returns `undefined` in concurrent cases where `connect` is called again while a datasource is about to be connected.
- `cds.log` formerly wrote log and debug output to stderr, now writes that to stdout
- `cds.server` now accepts port `0` as a number
- Race conditions in `cds.serve` and `cds.connect` lead to wrong Service instances to lost handler registrations

### Removed

- Compiler non-snapi support &rarr; see `cds.env.features.snapi` option
- In recent releases we added methods `cds.compile.to.hdbtabledata` and `cds.compile.to.hdbmigration`, intentionally undocumented, as they were meant to be private. Nobody should ever have used these methods, hence nobody should be affected by their removal.

## Version 4.6.5 - 2021-03-12

### Fixed

- `cds build` now correctly parses `.hdbtablemigration` files on Windows
- `compile --to serviceinfo` no longer crashes for Spring configuration in multi-root `yaml` files

## Version 4.6.4 - 2021-03-01

### Fixed

- Fix call to `to.hdi.migration` compiler API
- `cds build` for SAP HANA now correctly passes `sql_mapping` options to new hdimigration compiler API.

## Version 4.6.3 - 2021-02-26

### Added

- [beta] `cds build` for SAP HANA now provides schema evolution support for multitenant application extensions.

### Fixed

- `cds compile --to serviceinfo` returns better results for Java projects
- `cds.connect.to('srv-missing')` called twice with `srv-missing` not configured, would have failed with an error on the first call, but got stuck in the Promise chain for all subsequent calls.
- `.after` handlers are called with result based on request, e.g., array for collection and object for entity, instead of always array
  - Deactivate during two month grace period via compat feature flag `cds.env.features.arrayed_after = true`

## Version 4.6.1 - 2021-02-11

### Added

- [beta] `cds build` for SAP HANA now supports the generation of `hdbmigrationtable` design-time artifacts for big volume tables allowing for schema evolution capabilities. Model entities annotated with `@cds.persistence.journal` will be deployed as `hdbmigrationtable` artifacts instead of `hdbtable`.

## Version 4.5.3 - 2021-02-19

### Fixed

- `cds deploy` and `build` now refer to the latest HDI deployer which supports Node.js 14

## Version 4.5.2 - 2021-02-17

### Fixed

- `cds serve --with-mocks` now also works in `production` environment if `cds.features.mocked_bindings` is true.  Previously, mocks were always disabled in `production`.
- `cds serve` now only fires the `listening` event once
- `cds build` redacts cds configuration data in log messages

## Version 4.5.1 - 2021-02-01

### Fixed

- Update `@sap/cds-runtime` dependency

## Version 4.5.0 - 2021-02-01

### Added

- `cds.server` provides an option to switch off automatically generated `index.html` served at `/`:
  Do that in a custom `server.js`:
  ```js
  const cds = require('@sap/cds')
  // ...
  module.exports = (o) => cds.server({ ...o, index:false })
  ```
- The default `index.html` now honors the system's setting for dark mode.
- Former package `@sap/cds-reflect` is now embedded in `@sap/cds`

### Changed

- Fiori preview is now disabled if `NODE_ENV` is `production`, to avoid any runtime overhead there.  You can enable it with configuration `cds.features.fiori_preview: true`.

### Fixed

- `cds build` now correctly supports multitenant applications defining multiple database modules, e.g. one database for tenant related data and one for shared data.
- `cds deploy --to hana` does no longer fail with an invalid service name error if '.' is used in the MTA ID.

## Version 4.4.10 - 2021-01-18

### Changed

- `cds build` for SAP HANA now only filters csv files if it's needed, e.g. if they contain comment lines.

## Version 4.4.9 - 2021-01-12

### Fixed
- `cds build` for SAP HANA no longer fails sporadically with `ENOENT` when writing CSV files.


## Version 4.4.8 - 2021-01-07

### Fixed

- Add missing setter for `user.locale`

## Version 4.4.7 - 2020-12-18

### Fixed

- `cds build` for Java now also creates a default edmx file (the one w/o language suffix) if the `cds.i18n.languages` array is configured with a set of languages.  Runtime systems expect this file.
- `cds build` now skips empty lines in CSV files when preparing SAP HANA deployment.  This doesn’t happens if the build target folder is `.`, because there CSV files are sources that are not touched.
- `cds build` for SAP HANA now writes CSV files more reliably, avoiding sporadic `ENOENT` errors.

## Version 4.4.6 - 2020-12-08

### Fixed

- Compat `.emit()` for synchronous events with object as first parameter

## Version 4.4.5 - 2020-12-07

### Fixed

- Revert of _cds serve --at / now can overwrite the default /index.html route_, which caused problems in some applications

## Version 4.4.4 - 2020-12-04

### Added

- `cds.User.default` allows to override the default user, e.g. to be `cds.User.Privileged` in tests. By default this is `cds.User.Anonymous`.

### Changed

- `cds compile` and `build` now do a faster localization of edmx files.  If there are no text keys inside these files, the content is no longer duplicated in memory.
- `cds serve --at /` now can overwrite the default `/index.html` route


## Version 4.4.3 - 2020-12-03

### Fixed

- `srv.on` can now be used for async events w/o having to call `next` in each handler
- `srv.emit` constructs instances of `cds.Event` from given arguments, as intended
- `srv.send` constructs instances of `cds.Request` from given arguments
- Revert of: `cds build` filters `i18n` files for nodejs staging builds

## Version 4.4.2 - 2020-12-01

### Added

- `cds.context` always allows access to the current request context when running in Node v12.18 and higher. It uses Node.js' `async_hooks` API for so-called continuation-local storage, and supercedes the need for `srv.tx(req)` in custom handlers.
- Custom functions/actions can now be implemented with plain JavaScript methods in subclasses of `cds.Service`

### Changed

- `cds.unfold` was long-term deprecated, and removed now &rarr; use `cds.compile`
- `cds.config` was long-term deprecated, and removed now &rarr; use `cds.env`
- `cds.session` was long-term deprecated, and removed now &rarr; use `cds.db`

## Version 4.4.1 - 2020-11-27

### Fixed

- When two services `Foo` and `FooBar` were defined, with one services's name being a substring of the other service's name,
  it may have happened that the same EDMX, i.e. that of `FooBar`, was erroneously returned for both.
- On Windows, the index page now shows normalized links to embedded html pages, i.e. `foo/bar.html` instead of `foo\bar.html`.
- `cds build` now consistently uses build target folder `'.'` as default for Java projects - also if custom build tasks have been defined.
- Requests that contain `*` as `Accept-Language` header value do no longer fail.

## Version 4.4.0 - 2020-11-18

### Changed

- Propagate correlation id header to subrequests

### Fixed

- `cds.debug` now reacts on the `DEBUG` environment variable set in a `.env` file
- `cds build` filters `i18n` files for nodejs staging builds
- Language headers with values `en-US-x-[saptrc, sappsd]` are now mapped to user locale `en-US-[saptrc, sappsd]`.
- Messages are kept in their respective request (i.e., not propagated to the request's context, if exists)
- Log requests in atomicity groups
- `cds build` now creates correct custom handler path for nodejs projects in WebIDE fullstack.

## Version 4.3.2 - 2020-12-18

### Fixed

- use `@sap/cds-runtime~2.6`

## Version 4.3.1 - 2020-11-20

### Fixed

- `cds build` now creates correct custom handler path for nodejs projects in WebIDE fullstack.

## Version 4.3.0 - 2020-11-03

### Added

- Helper function `cds.utils.uuid` to generate a UUID
- Support `SELECT[...].limit(0, ...)`
- `hdbtabledata` generation can be disabled using `cds build` task option `skipHdbtabledataGeneration`.

### Changed

- Optimized `cds build` performance when creating OData EDMX output.

### Fixed

- `cds build` now classifies the severity of compile messages the same way as the low-level compiler. As a consequence, messages with severity _warning_ might now be classified as _error_.
- Now, cds CLI logs errors based on _log-level_ setting.
- `cds compile --to sql` no longer creates SQLite-specific views if in `hana` SQL dialect
- The `node-cf` build task of `cds build` now also filters `./` file dependencies from package.json in the build output.


# Version 4.2.8 - 2020-10-27

### Fixed

- `cds compile --to edmx --dest` creates files with `.xml` ending again.


# Version 4.2.7 - 2020-10-26

### Fixed

- SAP Fiori Elements preview finds the `express` package again in the case where no `express` is installed in the application's `node_modules`.


# Version 4.2.6 - 2020-10-26

### Fixed

- `cds run` finds the `express` package again in the case where no `express` is installed in the application's `node_modules`.


# Version 4.2.5 - 2020-10-23

### Fixed

- `cds compile --to edmx-v2` and `edmx-v4` now again write to the folder given with `--dest`.


# Version 4.2.4 - 2020-10-16

### Fixed

- `cds compile --to edmx-v2/4` no longer crashes
- `cds watch` no longer shows an error in absence of model files
- `cds build` no longer fails with an error about module './old/compile'
- Stack trace of some errors have been improved
- The `.hdiconfig` file created by `cds build` now includes SAP HANA artifact types from undeploy.json

# Version 4.2.3 - 2020-10-12

### Fixed

- Leading `#` comments in CSV files sporadically caused `cds build` to fail on Windows with error `EPERM: operation not permitted`.
- Method `req.user.is()` returns boolean

# Version 4.2.2 - 2020-10-07

## Added

- `cds.env.odata.containment` to use OData v4 Containment NavigationProperties feature
- `cds.env.odata.structs` to preserve struct elements as ComplexTypes in OData EDMX instead of flattening
- `cds.env.odata.refs` which uses NavigationProperties in OData EDMX instead of adding foreign keys
- `cds.env.odata.proxies` to add proxy EntityTypes for external Association targets
- `cds.env.odata.flavors` which contain presets for the afore-mentioned flags
- `cds.env.odata.flavor` to choose from the afore-mentioned presets
- `cds.load` option `plain` replacing former option `clean` (which still is silently supported for compatibility).
- `cds.get` now supports option `flavor` with values: `files` | `sources` | `parsed` | `resolved` | `compiled`.
- `sap.common.Currencies`, `Countries`, and `Languages` now have their `code` element annotated with `@Common.Text` pointing to the `name`.  In SAP Fiori's value list with fixed values, this will show the `name` rather than the code itself.  As before, this only has an effect if `@Common.TextArrangement` is set to `#TextOnly` on the entity the code list is used as `ValueList` for.

## Changed

- Replaced `cds.PrivilegedUser` with `cds.User.Privileged`
- `cuid` in `@sap/cds/common` is now defined as an `aspect` to align it with the other definitions.  The previous definition as `abstract entity` is equivalent and was only needed for historic reasons.
- `cds deploy --to sqlite` now skips columns from csv files if the header value is empty.  This allows for ad-hoc 'disabling' of columns.  For SAP HANA, the generated `hdbtabledata` files now also skip empty columns, restoring the behavior from cds 3.
- `cds deploy --to sqlite` has aligned its escaping rules for parsing csv data with SAP HANA's `hdbtabledata`.  A `"` character can be escaped by another `"` as before, but only if contained in a quoted string, i.e. `"A""B"` leads to `A"B`, while `A""B` stays `A""B`, and `""` results in an empty string.

## Fixed

- A `manifest.yml` file is now also generated for nodejs applications if a sqlite database is used.
- `cds build` did not correctly validate custom service handler implementations, warnings have been logged by mistake.
- The default memory size for nodejs applications has been increased in `manifest.yml` to avoid out-of-memory issues for cloud native deployments.
- `cds build` is now correctly creating external CSN output for Java multi-tenant applications.

# Version 4.1.10 - 2020-09-11

## Added

- Much like SQLite deployment, `cds deploy --to hana` and `cds build` can now cope with leading `#` comments in csv files, i.e. the comments get removed before deployment.
- `cds deploy` now can handle empty strings in CSV values (use `""`)

## Fixed
- `cds v` and `cds --version` now work again when called from `npm run` or `npx`.


# Version 4.1.9 - 2020-09-02

## Added

- `cds.PrivilegedUser`, e.g., for transactions with super user

# Version 4.1.8 - 2020-09-02

## Changed

- The `node-cf` build task of `cds build` now removes file dependencies in `package.json` in the build output.  These are anyways not resolvable on CF, but are handy at build time to [refer to other CDS modules](https://github.com/SAP-samples/cloud-cap-samples/blob/6fdd91b8c810d4367aa6dfc0a91e06dc467686ed/bookshop/package.json#L6).
- `cds deploy --to sqlite` can now cope with leading `#` comments in csv files
- `cds version --all` now includes `@sap/cds-sidecar-client`

## Fixed

- `cds.entities` w/o namespace parameter now works properly when running out of a compiled model (aka `csn.json` aka 'on Cloud Foundry').
- `cds deploy --to hana` now also handles SAP HANA Cloud services on trial, which are created by the `hana` broker (in contrast to the `hanatrial` broker which still provisions older SAP HANA instances).
- `cds deploy --to hana` no longer uses `cf marketplace`, which has changed its parameters in CF CLI v7.
- SAP Fiori Elements preview's html no longer provokes Javascript errors in the SAP Fiori client.
- For DB services of kind `sql` the service implementation is now set correctly in the cds configuration.  Previously, `sql` services got a `sqlite` implementation even if they were set to `hana` in production.
- Custom event handlers that do not register with a path (only with event and function) no longer crash the runtime
- In Typescript typings, the API declaration for `cds.load` and the `bootstrap` event is now fixed.

# Version 4.1.7 - 2020-08-17

## Added

- Shortcut to class `cds.ApplicationService` in cds facade
- Shortcut to class `cds.DatabaseService` in cds facade
- Shortcut to class `cds.RemoteService` in cds facade
- Shortcut to class `cds.MessagingService` in cds facade
- Shortcut to class `cds.Event` as new base class of `cds.Request`

## Fixed

- Race condition on two parallel `cds.connect` to same service
- **`cds deploy --no-save`** extends the list of files it does not modify to `package.json`, `default-env.json` and `connection.properties`
- **Add meaningful error message if hdi-deploy cannot be loaded** &mdash; during `cds deploy --to hana`.

# Version 4.1.6 - 2020-08-07

## Added

- `req.notify()` as a new varient besides `req.info()`, which should display as toaster notifications on Fiori elements or other UIs.

## Fixed

- `req.target` for unbound actions/functions is now `undefined` again, as documented
- Handlers registered with `srv.on(<CRUD>, 'Some/path', ...)` were never invoked
- Queries to remote services via `srv.on(..., ()=> other.read('Something'))` weren't sent to remote

# Version 4.1.5 - 2020-07-31

## Removed

The following changes affect undocumented internal implementations, and hence should not affect CAP-based projects.
Nevertheless, they are listed here for your reference.

- `db.disconnect()` &rarr; no replacement; no need to disconnect before shutdown.
- `db.run(()=>{})` &rarr; use `cds.run([...multiple queries])` instead.


## Changed

- **Most CLI commands have moved** to `@sap/cds-dk`.  Make sure to install the latest version with `npm i -g @sap/cds-dk`.

- **Default OData version** in `cds configuration` is now `v4`. For `Node.js` projects and `Java` projects using new stack the cds configuration of `odata.version = 'v4'` is no longer required. For `Java` projects using old Java stack, OData v2 will still be used.

- **Always do `await cds.connect.to()`** &mdash; in former versions `cds.connect.to()` returned some magic thenables, meant to ease the [_Promise Hell_](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513); now it always returns plain-standard Promises. Likely you never used this undocumented former behaviour, but in case: Just ensure to always call `cds.connect` with `await`.

- **Deprecated `cds.connect()`** &mdash; please prefer `cds.connect.to('db')` instead, which has the very same effect but is more in line with the notion of potentially working with multiple database services.

- **Deprecated `cds.hana.syntax` configuration**.  Use `cds.hana.deploy-format`=`hdbtable` instead to switch deployment from `hdbcds` to `hdbtable` for SAP HANA Cloud.

- **Faster generation of `hdbtabledata` files** from csv data.  It no longer tries to check the existence of element or column names.  Such checks are anyways done during SAP HANA deployment.  This behavior is now symmetrical to SQLite deployment.

- **Removed legacy cds build system** &mdash; the fallback using `cds.features.build.legacy` is no longer supported.

- **`cds deploy --to hana` changes kind** to `hana` only if it is not already `sql`.

- **Consistent default naming scheme for applications and services deployed to CF** across the following `cds` commands `build`, `deploy`, `init` and `add`. For an application named `myapp` the SAP HANA deployer app name is `myapp-db-deployer`, the SAP HANA DB service name is `myapp-db`. `cds build` now generates the application manifest file with a different name `manifest.yml`.

- **`cds build`** no longer creates service metadata for the UI service binding by default. For SAP Web IDE Full-Stack compatibility a corresponding metadata.xml is still generated.  A `fiori` build task has to be defined otherwise.

- **`cds build` creates `hana` build results only** if either a corresponding build task has been configured or if kind `hana` or kind `sql` has been defined. A `production` build is required for the latter. A fallback is used for Web IDE Fullstack and legacy build configs.

## Added

- **Common `cds.service.factory`** &mdash; `cds.serve` and `cds.connect` now use a common `cds.service.factory` to construct instances of `cds.Service`, as well as adding custom-provided handlers and implementations. This applies the same consistent ways to register new implementations via `cds.env.requires` options, model annotations `@impl` and `@kind`, or the well known `.cds`/`.js` sibling files mechanism.

- **Common `cds.Service` base class** &mdash; `cds.Service` is the newly introduced common base class for all connected or provided services &mdash; i.e. all service instances contructed thru `cds.service.factory`. It provides uniform consumption APIs, as well as event handling APIs and capabilities for all services.

- **Custom `cds.Service` subclasses** &mdash; besides providing `cds.service.impl` functions as of before, custom service implementations can now return subclasses of `cds.Service`, thereby plugging into the framework even more.

- **New `srv.after('each', row => ...)`** &mdash; the former technique to register per-row handlers `srv.after('READ', each => ...)` broke when code was minified. The new method using pseudo event `'each'` is minifier-safe.

- **New `srv.prepend(srv => ...)`** &mdash; use `srv.prepend(...)` to register event handlers to be executed _before_ the already reistered handlers. For example, extensions of reused implementations sometimes need to use this.

- **Reflect `srv.events`** &mdash; base class `cds.Service` provides a new getter `srv.events` to reflect on declared events in the service definition, similar to the already existing `srv.entities`, `srv.types` and `srv.operations`.

- **Experimental `cds.ql(req)`** &mdash; event handlers can now use the like of `const {SELECT} = cds.ql(req)` to ensure transaction-managed and tenant-isolated execution of queries, instead of `srv.tx(req)`. **Note** though, that this is an **experimental** feature, which might change or be removed in future versions.

- **Using `await` in `cds repl`** &mdash; we now support using `await` directly on `cds repl` prompt inputs. This feature is provided through [Node's _--experimental-repl-await_ option](https://nodejs.org/api/repl.html#repl_await_keyword).

- **CLI shortcut `--odata <v2|v4|x4>`** &mdash; the newly introduced general CLI option _**--odata** <v2/v4>_ acts as a shortcut to _--odata-version <v2/v4>_. In addition, _--odata **x4**_ acts as shortcut to _--odata-version v4 --odata-format structured  --odata-containement true_.

- **`cds build --production`** &mdash; builds the project using the `production` profile - same when `NODE_ENV` or `CDS_ENV` environment variable is set to `production`. This will create HANA deployment artifacts if `kind: "sql"` has been defined.

- **`cds build --for <hana|java-cf|node-cf|mtx> --opts <...>`** &mdash; now supports execution of auto-created or configured build tasks. Individual properties can be overwritten by passing corresponding CLI options, defaults are used otherwise. For example, `cds build --for hana --dest target --opts model=[data,srv,app]`. **Note:** The parameter `options-model` has been deprecated use `--opts model=[...]`instead.

- The set of languages that is honored for the `i18n.json` language pack can now be configured through `i18n.languages`.  Default is still `all`, which means the sum of language files found next to models.

## Fixed
- SAP Fiori Elements preview is now working again with the latest version of SAP UI5.

- **Use latest SAP CommonCryptoLib help** &mdash; when SAP CommonCryptoLib is missing during `cds deploy --to hana`.

- `sql_mapping` is only written to `csn.json` if the classic Java runtime and no default naming is used.

- SAP Fiori Elements dev support in `cds run` now also honors `/v2` URLs.  These are installed by default by the `@sap/cds-odata-v2-adapter-proxy`.

- npm scripts that wrap around cds-dk commands like `cds watch` now also work on Windows.  Previously they couldn't find the cds command.

- When extracting the base model of a multi-tenant application `cds build` now ensures that only files having project scope are copied, a warning is logged otherwise.

- `cds build` now no longer crashes if exactly one custom language is given in `options.lang` of the `java-cf` build task.

- `cds compile` now fails with a non-zero exit code in case of compilation errors.

# Version 3.35.0 - 2020-05-08

## Changed
- The new compiler implementation, a.k.a SNAPI, is now the default.  Can be disabled with `cds.features.snapi=false`.

# Version 3.34.3 - 2020-06-19

## Changed

- Faster generation of `hdbtabledata` files from csv data.  It no longer tries to check the existence of element or column names.  Such checks are anyways done during SAP HANA deployment.  This behavior is now symmetrical to SQLite deployment.

# Version 3.34.2 - 2020-05-30

## Changed

- Use `cds.hana.deploy-format`=`hdbtable` instead of `cds.hana.syntax` to switch deployment from `hdbcds` to `hdbtable` for SAP HANA Cloud.
- `cds run` now supports relative `dataSource` URLs in SAP UI5 manifests again, so that UI5 apps can be served w/o approuter.  This support is only active in development mode.
- `cds deploy --to hana` changes kind to `hana` only if it is not already `sql`

## Fixed

- The `UI.Identification` annotation for `sap.common.CodeList` got a correct value, pointing to its `name` element.
- Configuration `requires.<foo>.credentials.destination` is now preserved again when running with `VCAP_SERVICES`.  In version 3.34.1 it was cleared.
- Entities annotated with `@cds.persistence.skip:if-unused` (like `sap.common.Languages`) now again are skipped when compiling to SAP HANA output.  This got broken in previous versions when using the new compiler APIs.
- `sql_mapping` is again written to `csn.json` as it's required by classic Java runtime.
- `default-env.json` is now read even in production, which is in line with the behavior of other modules that honor this file.  Real prod environments like CF will still overwrite these defaults.
- `cds build` caused error `invalid option` &mdash; when passing command line options like `log-level`, `src` or `for`.

# Version 3.34.0 - 2020-04-27

## Added

- `cds version` option `-ls` prints an `npm ls` subtree.
- `cds serve` / `run` now also accept package names as arguments, e.g. `cds serve --project @capire/bookshop`.
- `cds compile` option `--parse` provides minimal, parsed-only CSN output.
- New Node.js method `cds.compile()` allows compiling CDS sources in-process.
- `cds build` now supports cds configuration `requires.db.kind:"sql"` which allows seamless production deployments using HANA db and development deployments using sqlite db.
- Default maximum query size limit of 1000 (overridable via `@cds.query.limit.max`).
- Improved error message during `cds deploy` on Windows when `SAP CommonCryptoLib` is missing.
- `cds build` now checks that `entity-whitelist` and `service-whitelist` have been defined for SaaS applications - a warning is reported otherwise. `cds build` will fail if invalid entries exist.
- Parameter `--vcap-file` lets `cds deploy --to hana` use an existing `default-env.json` file for the deployment credentials, instead of always creating new credentials from Cloud Foundry. Note that this is a beta feature.
- `cds build --log-level` allows to choose which messages to see, default log level is `warn`.
- Labels of `@sap/cds/common` texts are now available in many languages

## Changed

- Node.js method `cds.parse()` has been changed to now truely return parsed-only models, with extensions not applied yet.
**Note:** If you'need the former (erroneous) behaviour, please use `cds.compile` for that from now on.
- Node.js method `cds.get()` now returns parsed-only models; same as `cds.parse()`.
- `cds serve` / `run` / `watch` now reduce logging of details for the bound DB on connect, leading to less clutter.
- Precision for `validTo` and `validFrom` defined in the `temporal` aspect in `@sap/cds/common` changed from `DateTime` to `Timestamp`.
- Some administrative fields of SAP Fiori draft documents are now hidden on the UI.  The rest got labels.
- Renamed cds configuration setting `features.messageLevel` to `log-level` to be consistent with command line option, e.g. `cds build --log-level`.

- `cds extend` and `cds activate` commands have been moved to `@sap/cds-dk`. `cds disconnect` has been moved there under a different name.

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
- `cds build/all` adds `app` folder to the list of model folders for HANA database builds. Draft tables are missing if the corresponding annotation model is missing.


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
- SAP Fiori Elements preview no longer crashes since it's pinned to SAP UI5 1.72.3.  Actual cause still needs to be investigated.

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
- SAP Fiori Elements preview in `cds run` now is only added if OData services are being served.
  For other protocols like `rest`, no SAP Fiori Elements preview is provided. Same holds true for the `$metadata` link.
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
- Tables and view for localized entities are created by default now, both for SAP HANA and SQLite.
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
- In the logs of `cds serve` false warnings on SAP Fiori Elements requests are now gone.
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
- Previously data models needed to include import statements to the service models (e.g. `using from '../srv'`), so that the Java runtime could use these service views on the DB to execute queries.  The views are now included automatically, so that you can remove the explicit `using` clauses.
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
