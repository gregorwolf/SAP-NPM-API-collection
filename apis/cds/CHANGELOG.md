# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](https://keepachangelog.com/).
- This project adheres to [Semantic Versioning](https://semver.org/).

## Version 8.8.2 - 2025-03-13

### Fixed

- Consuming REST actions returning anonymous structures
- `i18n.labels/messages` were occasionally missing

## Version 8.8.1 - 2025-03-07

### Fixed

- Requests violating `cds.odata.max_batch_header_size` are terminated with `431 Request Header Fields Too Large` instead of `400 - Bad Request`
- `cds.parse.<x>` writing directly to `stdout`
- Instance-based authorization for programmatic action invocations
- Implicit function parameter calls with Array or Object values
- OData: Throw an error by `POST` with payload that contains array of entity representation
- `cds.validate` filters out annotations according to OData V4 spec
- Crash for requests with invalid time data format
- Add missing 'and' between conditions in object notation of QL
- Multiline payloads in `$batch` sub requests
- Instance-based authorization for modeling like `$user.<property> is null`
- Respect `cds.odata.contextAbsoluteUrl` in new OData adapter 
- `cds.odata.context_with_columns` also applies to singletons

## Version 8.8.0 - 2025-03-03

### Added

- `cds.ql` method `SELECT.hints()` which passes hints to the database query optimizer that can influence the execution plan
- Schema updates for MTX configuration
- Deprecate `cds.requires.db.database` in JSON schema
- Service level restrictions for application service calls can be enforced with `cds.features.service_level_restrictions=true`
  + With `@sap/cds^9`, this becomes the new default.
- Support implicit function parameters calls with @prefix
- `cds.test` now uses package `@cap-js/cds-test` if installed, otherwise prints a hint to install it. With cds 9, this package will be required.
- Operation response streaming
  + OData: Operations returning `cds.LargeBinary` annotated with `@Core.MediaType` may send stream responses. 
  + REST: Operations may send stream responses. 
  + Annotations `@Core.MediaType`, `@Core.ContentDisposition.Filename` and `@Core.ContentDisposition.Type` on operation return types will be considered. 

### Changed

- The default index page now shows links to CDS functions with their parameter names but no default values anymore.

### Fixed

- Order by virtual fields in draft-related requests
- Erroneous cleansing when draft activation is invoked programmatically
- Skip validation for mandatory fields in update scenarios for entities in draft activation
- Simplified default configuration: `cds.requires.messaging = true`
- `cds.connect` called with options erroneously filled in `cds.services`
- Mocked users won't have a tenant in single-tenant mode
- Allow usage of latest versions of `chai` and `chai-as-promised` on Node >= 23 with the built-in test runner and `mocha`. The `jest` runner is not able though to load these ESM modules.
- Reject navigations in expand
- Activation of drafts for entities using `@cds.api.ignore`
- Prevent uncaught type error during validation of composition entries

## Version 8.7.2 - 2025-02-14

### Fixed

- Strip `Z` suffix of values of `cds.Timestamp` with OData type `Edm.DateTime`
- Skip validation for mandatory fields in update scenarios for entities in draft activation
- `cds.compile.to.yaml` escapes strings including colons if necessary

## Version 8.7.1 - 2025-02-04

### Fixed

- Loading of CAP Plugins implemented in Typescript
- `Location` header if read after write returns empty result due to missing read authentication
- Enable accessing `req.params` when handling requests on parameterized views
- `cds.connect.to(class {...})` did not call the `init` function
- Generic Paging/Sorting was run twice for non-draft requests
- Service implementation loaded from `node_modules`

## Version 8.7.0 - 2025-01-28

### Added

- Allow usage of tar library (https://www.npmjs.com/package/tar) as a workaround to solve remaining issues by extension build on Windows. The tar library should be installed by app developers.
- `cds.ql` supports limit with an optional offset, e.g. `limit(10, 5)`
- Basic support for new built-in type `cds.Map`
- Normalization of DateTime and Timestamp payloads in new OData adapter

### Changed

- Cleanse immutable values in draft modifications
- Do not use compatibility mode of @sap/xssec 4, can be reverted with `cds.env.features.xssec_compat = true`
- `cds.Float` is now correctly deprecated in `cds.builtin.types`.
- Input provided via protocol adapter for elements annotated with `@cds.api.ignore` are rejected. Previously, they were ignored.

### Fixed

- Narrowed down peer dependency version of `express` to `^4`
- OData, REST: Responses are only written in case that the response object is not already closed, which allows responding to requests directly in custom handlers.
  + Note: Responses sent directly are not transactionally safe! Further, subsequent errors can no longer be communicated to the client!
  + Note: Only respond directly in non-`$batch` requests!

## Version 8.6.2 - 2025-01-27

### Fixed

- Crash during requests to actions with parameter `array of <type>`
- Instance based restriction using `is null`
- Filtering of grouped result on default aggregate
- Multipart batch response for failed changesets
- Handling of invalid parentheses in OData property access
- Resolve view: Mixins are not in elements of projection target
- Input provided via protocol adapter for elements annotated with `@cds.api.ignore` can be rejected with `cds.features.reject_ignored: true`.

## Version 8.6.1 - 2025-01-10

### Fixed

- find draft root in authorization checks when entity has recursive compositions
- `default-env.json` was not loaded anymore when in production mode.
- i18n texts like `1` or `true` were returned as numbers, or booleans instead of strings
- CSN files produced by `cds build` now again contain information to resolve handler files. That was broken in case of reflected/linked models set by e.g. plugins.
- `average` aggregation used with draft enabled entities

## Version 8.6.0 - 2024-12-17

### Added

- `SELECT.from` now supports full-query tagged template literals, e.g.: ``` SELECT.from`Books where ID=${201}` ```
- `cds.ql` enhanced by functions to facilitate construction of CQN objects.
- `cds.ql` became a function to turn CQN objects, CQL strings, or tagged template literals into instances of the respective `cds.ql` class.
- New `cds` events to allow multitenant plugins: `compile.for.runtime`, `compile.to.dbx`, `compile.to.edmx`.
- `cds.env` now supports `.cdsrc.js` and `.cdsrc.yaml` files, also in plugins.
- `cds.env` now supports profile-specific `.env` files, e.g. `.hybrid.env` or `.attic.env`.
- Experimental OData parsing for hierarchy requests (`descendants`, `ancestors`, `TopLevels`)
- The new OData adapter now supports `cds.odata.containment`. Contained entities can only be accessed via their parents and do not show up as EntitySets in $metadata and the service document.

### Changed

- `CDL`, `CQL`, and `CXL` globals are deprecated => use respective functions from `cds.ql` instead.
- `CREATE`, and `DROP` globals are deprecated => use respective functions from `cds.ql` instead.
- Zulu time zone information is stripped from `cds.DateTime` properties when querying Odata V2 remote services
- Processing of `@restrict.where` was aligned with CAP Java:
  + Instance-based authorization on app service calls does not consider custom `WHERE` clauses of `UPDATE`/`DELETE` queries
    + Until `@sap/cds^9`, this change can be deactivated via `cds.env.features.compat_restrict_where = true`
  + Simple static clauses (e.g., `$user.level > 5`) are no longer evaluated by the server but added to the respective SQL regardless. As a result, requests may receive a response of `2xx` with an empty body instead of a `403`.
    + Until `@sap/cds^9`, this change can be deactivated via `cds.env.features.compat_static_auth = true`
  + Read restrictions on the entity are no longer taken into consideration when evaluating restrictions on bound actions/ functions
    + Until `@sap/cds^9`, this change can be deactivated via `cds.env.features.compat_restrict_bound = true`

### Fixed

- ETag calculation if column was provided as Javascript Date
- Forwarding of `/$count` queries while mocking the external service
- Resolving of implicit function parameters (e.g `GET .../test.foo?x='bar'`)
- Arrayed elements are not part of response unless explicitly selected with `$select`
- In case of nonexistent user attributes (`$user.X`), only the subclause gets substituted with `false`
- `@odata.context` in new OData adapter:
  + Fixed crash for requests to actions/functions when `cds.env.odata.context_with_columns` is enabled
  + Aggregation functions with `$apply` are now returned when `cds.env.odata.context_with_columns` is enabled
  + `@odata.context` is now the first property in the response values of `concat` requests
  + Binary key values are now properly encoded and formatted
  + Fixed keys appearing as `(undefined)` for updates via navigation to-one
  + Fixed key value pairs being returned as `undefined=undefined` for property access of aspects
  + Backlinks no longer appear as keys for property access of aspects
  + Non-anonymous structured types are now prefixed with the service name
  + Structured types no longer end with `/$entity`

## Version 8.5.1 - 2024-12-06

### Fixed

- `cds deploy --dry --model-only` no longer tries to load a SQLite database
- Requests with HTTP methods other than `POST` to the `/$batch` endpoint are now rejected when using the new OData adapter

## Version 8.5.0 - 2024-11-25

### Added

- New `cds.i18n` module used consistently for both, UI labels and runtime messages.
- Enhanced `cds.validate` to support open intervals for: `@assert.range:[(0),(Infinity)]` -> `0 < x < ∞`
- `package.json` validation and suggestions for messaging services.
- `cds.log()`: Detect binding to SAP Cloud Logging via user provided service. The user provided service must have tag `cloud-logging`.
- Support for function parameters via query component (example: `GET /foo?bar=baz` instead of `GET /foo(bar='baz')`)
- Experimental support for programmatic draft actions `srv.new(MyEntity, data)`, `srv.cancel(MyEntity.drafts, keys)`, `srv.edit(MyEntity, data)` and `srv.save(MyEntity.drafts, keys)`

### Changed

- `cds-deploy` script has a non-zero exit code on deployment failure
- Properties of type `cds.Binary` in URLs as well as request payload are converted to `Buffer`s.
  Properties of type `cds.LargeBinary` in request payload are converted to `Readable`s.
  Previously, both were provided as Base64-encoded strings.
  This change can be deactivated via `cds.env.features.base64_binaries = true`, which is set by default for profile `attic`.

### Fixed

- `cds.validate` should not delete readonly keys from `req.data`
- `cds.validate` should not reject imported associations
- Readonly fields must not be set when creating draft entities
- Validation of mandatory properties caused streams to be rejected for new OData adapter
- `cds.log` with null parameters and JSON format
- `cds.compile.to.sql` proper replacement for sqlite session variables in java projects
- `cds.compile.to.serviceinfo` ignores only the `endpoints` property for unknown protocols
- `Preference-Applied` header is returned in OData adapter if requested
- No location header is returned on OData update requests if `minimal` preference is set
- Handling of invalid requests for views with parameters

## Version 8.4.2 - 2024-11-13

### Fixed

- `cds.compile.to.edmx` if using the new builtin type `cds.Map`

## Version 8.4.1 - 2024-11-07

### Fixed

- Validate request method for operations
- Correctly generate CQN for lambda expressions in new OData adapter
- `req.diff()` on old database with property transitions

## Version 8.4.0 - 2024-10-29

### Added

- Set the maximum allowed size of HTTP headers in bytes for `$batch` subrequests via flag `cds.env.odata.max_batch_header_size` (default: 64 KiB)
- New OData flag `cds.env.odata.context_with_columns` that adds selected and expanded columns to `@odata.context`. Default is `false`
- New experimental option `--workers` to `cds watch/run/serve` that allows running a `cds.server` cluster
  (process env variable `WORKERS` or `CDS_WORKERS` can be used alternatively)

### Changed

- Internal API `srv.endpoints` now always is an array of endpoint objects, an empty one if the service is not served to any protocol.
- Property `.cmd` of `cds.ql.Query` (and subclasses thereof) is deprecated → use `.kind` instead
- For remote service calls to OData v2 services, less conversions are performed on the returned data

### Fixed

- Commands like `cds deploy` now fail with a clear error message if called with an invalid value for `cds.features.assert_integrity` (like `true`)
- Authentication validation errors (e.g., expired token, wrong audience) are logged as warning
- Requests using `$apply` will always apply implicit sorting on best effort mechanism
- Properly handle empty content-type in new OData adapter
- Error/crash with `cds.features.odata_new_parser` for requests containing `$expand=*` and `$select`, which selects individual columns and star, e.g. `$select=ID,*`
- Referencing new entities in `$batch` with new OData adapter did not work properly when using non integer content IDs in multipart/mixed
- `cds.compile.to.serviceinfo` to ignore unknown protocols
- New OData adapter and `cds.spawn` did not crash on programming errors (for example TypeError)

## Version 8.3.1 - 2024-10-08

### Fixed

- Erroneous caching in `cds.validate`
- Precedence of request headers for `cds.context.id`
- For `quoted` names, overwrite `@cds.persistence.name` for drafts and localized views properly
- Do not use hana error code as http status code

## Version 8.3.0 - 2024-09-30

### Added

- `cds.deploy` can now also write its DDL statements to a separate log
- Symlinks are followed in `cds test`

### Changed

- Unknown protocols in `@protocol` annotations formerly prevented server starts; they are merely ignored now with a warning in the logs.
- Deprecated configuration flag `cds.env.features.keys_in_data_compat` because of incompatibility with data validation in new OData adapter.
- `@cds.api.ignore` doesn't suppress an association, the annotation is propagated to the (generated) foreign keys.
- Where clauses of restrictions for bound actions and functions defined by `@restrict` are now enforced and no longer ignored.
- `@cap-js/telemetry` is now loaded before other plugins to allow better instrumentation.

### Fixed

- When modifying active children of of draft-enabled entities directly (`bypass_draft`), the error message was misleading.
- Cleaning up drafts calls `CANCEL` handlers
- Allow to call `CANCEL` on draft entities programmatically
- Encoding of `@odata.nextLink` path
- Computed fields are ignored in projections
- Consider `id` in a `ref` step for mapping of service elements to their name on the db.
- Feature toggles with new OData adapter.
- Target entity was incorrectly calculated for some actions in new OData adapter.
- `req.diff()` does not manipulate existing queries anymore.
- New OData adapter: normalize on commit error in `/$batch`

### Removed

- Alpha support for SAP Event Broker-based messaging (kind `event-broker`). Use CDS plugin `@cap-js/event-broker` instead.

## Version 8.2.3 - 2024-09-20

### Changed

- All annotations in input data are skipped and removed from the input by `cds.validate()` - as we did in legacy OData adapter

### Fixed

- Unmanaged associations are excluded from `@mandatory` checks
- Properly reject direct requests to `DraftAdministrativeData`
- Virtual elements annotated with `@Core.MediaType`
- OData Requests targeting a specific instance and custom handler returns empty array
- `cds-serve` and `cds-deploy` now set `cds.cli` information

## Version 8.2.2 - 2024-09-13

### Fixed

- Erroneous caching in `cds.validate`
- Properly check `$filter` element types across navigations

## Version 8.2.1 - 2024-09-04

### Fixed

- Date validation of legacy OData protocol adapter
- Content-Length headers in multipart batch request body
- Streaming requests with virtual properties
- Bring back support for `x-correlationid`
- Validation of inlined elements
- multipart `$batch` parsing with _--_ as part of payload

## Version 8.2.0 - 2024-08-30

### Added

- Allow `cds.connect.to (SomeService)` where `SomeService` is a class
- Lean draft: support CDS orderBy in `list status: all`
- Support where not in as object in `cds.ql` expressions like: `where({ID:{not:{in:[...]}}})`
- Unbound CDS functions now show up in the server's index page along with an exemplary call signature
- `cds.log`'s JSON formatter:
  + Field `w3c_traceparent` is filled based on request header `traceparent` (cf. W3C Trace Context) for improved correlation
  + Custom fields `cds.env.log.cls_custom_fields` are filled if bound to an instance of SAP Cloud Logging
  + Default `cds.env.log.als_custom_fields` enhanced by `{ reason: 3 }` (project config takes precedence)
- Support for `cds.hana` types like `cds.hana.ST_POINT` in `cds.builtin`
- Internal `cds.debug()` API now always returns a logger instance, which allows switching on debugging subsequently, e.g. by the like of `cds.log('sql','debug')`
- New config flag `cds.server.shutdown_on_uncaught_errors` allows to control whether the server should shut down on uncaught errors. Default is `true`

### Changed

- Revert workaround from 8.1.0 for server startup message `WARNING: Package '@sap/cds' was loaded from different installations`. This is now addressed in `@sap/cds-mtxs` 2.0.5.
- When parsing CSV files, `cds.deploy` no longer doubles a literal `\` character (backslash) with a second backslash (`\\`), but retains it as-is.  This caused unwanted data changes.
- Optimized handling of large binaries (BLOBs) in case of drafts. Unchanged BLOBs are not copied into the draft entity. If those BLOBs from draft entities are requested, the unchanged BLOBs will be fetched from the corresponding active entity. Note that this change may require adjustment of custom logic, if large binaries from draft entities are requested (for example, using `ql.SELECT` statement). To restore previous behavior use `cds.features.binary_draft_compat`.

### Fixed

- Resolving views with path expression renamings
- Set content-type-header in batch for actions with 204 No Content
- URI encoding of `@odata.nextLink` in OData response
- Requests reading media data streams did not provide `req.params`
- `cds.compile.to.hana` for legacy hana service with `@cap-js/sqlite` as dev dependency
- Better redaction of debug output
- Instance-based authorization using functions
- Fixed flaws in `cds.connect.to()` that lead to deadlocks in case of errors due to invalid service configurations or initializations.
- Navigation with backlink as key can now omit backlink keys for new OData adapter

### Removed

- Array methods `forEach`, `filter`, `find`, `map`, `some`, `every` from [`LinkedDefinitions`](https://cap.cloud.sap/docs/node.js/cds-reflect#iterable). Convert linked definitions into arrays before using these methods, for example:

   ```js
   [...linked.definitions].map(d => d.name)
   ```

## Version 8.1.1 - 2024-08-08

### Fixed

- For `accept-language`, ignore additional options
- Global `describe`, `before`, `beforeAll`, `afterAll` hooks are now writable again. They were accidentally made read-only in 8.0.0.
- Expand to `DraftAdministrativeData` for active instances of draft-enabled entities over drafts
- Deduplication of columns for certain on conditions for the legacy database driver
- For legacy-sqlite/-hana: Add keys to expands with only non-key elements to ensure not returning null for expand.
- New parser was too restrictive regarding an empty line at the end of batch body.
- Error target for operations with complex parameters
- Remote services: JWT gets found in authorization header
- Search with invalid characters
- Invoke `srv.on('error')` for each failing batch subrequest

## Version 8.1.0 - 2024-07-26

### Added

- Streaming of data with content type 'application/json'
- Service annotation `@cds.server.body_parser.limit` and global config option `cds.server.body_parser.limit` allow to configure the maximum request body size in bytes. The default value by express' body parser middleware is 100 kb. See [express docs](https://expressjs.com/en/resources/middleware/body-parser.html) for details.
- Translations for new languages: bg (Bulgarian), el (Greek), he (Hebrew), hr (Croatian), kk (Kazakh), sk (Slovak), sl (Slovenian), sr (Serbian), uk (Ukrainian)

### Changed

- Event Broker: Standardize behaviour for cloud events and header propagation

### Fixed

- Erroneous authentication of `enterprise-messaging`
- `@odata.context` for actions/functions returning an array of <type>
- `cds-deploy` script terminates if deployment fails
- Allow backslashes, quotation marks and ampersands in search terms
- Search compatibility for new parser and old db
- The server startup no longer yields the `WARNING: Package '@sap/cds' was loaded from different installations:` message in PNPM setups with `--global-bin-dir` on. This happened in BAS, for example on `cds watch/serve` etc.

## Version 8.0.4 - 2024-07-19

### Fixed

- Localized views like `localized_de_Books` where accidentially generated for new sqlite service.
- Atomicity group handling in `$batch`
- `$batch` im combination with `commit` hooks
- `continue-on-error` preference for JSON `$batch`

## Version 8.0.3 - 2024-07-12

### Added

- Translations for the technical SAP language `1Q` used in support scenarios, for example for translation issues.  See https://sapui5.hana.ondemand.com/sdk/#/topic/91f21f176f4d1014b6dd926db0e91070 for more.

### Fixed

- Empty feature set by switched off feature toggles
- Allow programmatic operations on draft-enabled entities (`NEW`, `CREATE`, `UPDATE`, `DELETE`)

### Removed

- Allow deviating response types for `$batch`, e. g. input `multipart` and output `json`

## Version 8.0.2 - 2024-07-09

### Added

- `express` is now an optional peer dependency, to indicate to applications to install it as part of their dependencies.  It is needed for all runtime scenarios, but can be omitted for pure designtime cases like `cds compile` calls.

### Changed

- Creation via draft by association is forbidden with `403` response.
- New OData adapter captures input of `$search` as plain val without applying OData grammar.
- ´not null´ is not validated for action/function params. Use `@mandatory` instead.
- REST adapter rejects unknown input if not annotated with `@open`. Previously, it removed the unknown elements from the payload.

### Fixed

- `cds.log(…, 0)` now properly changes log level to `SILENT` if called after the respective logger had already been created.
- `cds.test` recommends version 7 of `chai-as-promised`.  Version 8 is ESM-only and does not work with `cds.test` at the moment.
- Loading of `cds.plugins` now respects the (internal!) property `cds.env.plugins` again.
- Proper error handling for invalid draft requests in combination with `$apply`
- Usage of `Date` values in `cds.ql` expressions
- Error in `enterprise-messaging` deploy script
- Error handling for bad navigation properties (like in `$orderby=prop1/prop2`) in new OData adapter
- Properly forward path expression infront of lamda functions for `odata-v2` remote services

### Removed

- Type information is no longer shipped as part of `@sap/cds`. Instead, the `@cap-js/cds-types` package has to be explicitly installed as devDependency for projects requiring type support. Installing the package is sufficient to add type support back in.
- Invalid annotations `@Common.FieldControl.Mandatory` and `@FieldControl.Mandatory` → use `@Common.FieldControl: #Mandatory` instead
- Invalid annotations `@Common.FieldControl.ReadOnly` and `@FieldControl.ReadOnly` → use `@Common.FieldControl: #ReadOnly` instead

## Version 8.0.1 - 2024-06-20

### Fixed

- always enforce `attic` profile

## Version 8.0.0 - 2024-06-19

### Added

- Profile `[attic]` to quickly test with deprecated features like so `CDS_ENV=attic cds watch` or `CDS_ENV=attic jest`.
- New OData Adapter: Default location header for actions that return an entity (custom handler must set the response status code to 201)
- New `cds.utils` methods `.stack()` and `.location()` to get the stack trace and location of the caller (not publicly released yet).
- Protected the methods inherited from `LinkedDefinitions` prototype against accidental and undetected interpretation and usage as CSN element: An error is thrown, when trying to access one of the usual CSN properties, like `.name`, `.kind`, `.type`, ... on them.
- Escaping single quotes with doubled ones `''` in `.properties` files
- Support for `@sap/xssec^4`
- New OData and REST adapter pass error to next such that a custom error middleware added to `cds.middlewares.after` is called
  + Note: The custom middleware must preceed the default error middleware (if it remains), e.g., by adding via `unshift()`
- Support for extensibility scenarios in RESTful protocol adapters
- The built-in CORS middleware can be enabled explicitly with `cds.server.cors = true`.  By default, this is `false` if in production.
- Remote Service: `useCache` destination option is enabled by default
- New model processor `cds.compile.to.hana` to generate `.hdbtable`, `.hdbview` files including migration table support.
- Added `cds.requires.connectivity` indicating whether SAP BTP Connectivity service is required.
- Support inline where conditions in `@restrict` like `where: (prop = $user.id)`.

### Changed

- Meant for tests only: `cds.User.default` points to a singleton instance of `cds.User` instead of a class now.
- Never public: `express.Request.user` or `.tenant` must not be used anywhere
  > NOTE: that was never public nor guaranteed to exist at all!
  > Always only use `cds.Request.user/tenant` or `cds.context.user/tenant`.
- Never public: `cds.Request.protocol` was 'odata-v4' and is now 'odata'.
- Errors sent to clients now include a stack trace in the `stack` property during development and in tests
  > NEVER test with `.toEqual()` but always only with `.toMatchObject()`.
- Node.js 18 is now the minimum required Node.js version. Version 16 is no longer supported.
- `cds.fiori.draft_deletion_timeout` is enabled with default value `30d`
- `srv.on('error')` is only invoked for errors during `srv.dispatch()`, i.e., for errors that occur while the respective request is being processed by a service instance
  + Specifically, `srv.on('error')` is no longer invoked for an error that occurs in the protocol adapter. Instead, use a custom middleware added to the beginning of `cds.middlewares.after`.
  + This change does not affect the legacy OData adapter.
- In `bypass_draft`, direct active modifications now have event `CREATE` instead of `NEW`.
- `cds compile --to serviceinfo` returns the correct URL path for Java applications.
- The default index page is no longer served if `NODE_ENV` is set to `production`. Set `cds.server.index = true` to restore previous behavior.
- Delete deprecated cds build stub.
- Multiple entries in `cds.requires.<name>.vcap` are now ANDed instead of ORed, so that e.g. multiple bound services of the same kind can be filtered more easily.  For example, `{ "vcap": { "label": "xsuaa", "tag": "broker" }}` can be used to only bind an XSUAA instance (out of many) with the `xsuaa` label AND the `broker` tag.
- Role `cds.Subscriber` removed from predefined mock users.
- REST adapter uses managed transactions
- The default index page got a new design.
- Syntax error in batch body is handled as bad request

### Fixed

- Failing logins with internal pre-release versions from git main branches.
- Prevent inconsistent ordering when selecting messages from outbox
- Creating child-nodes with `@Core.Immutable` fields
- ETag handling in draft cancel
- `if-none-match` with asterisk in update handler
- `odata.mediaContentType` for empty stream is always `null`
- `$select/$expand` large binaries by draft edit and activate does not return large binaries
- Error message for actions/functions with wrong path
- Direct `READ` of entities that are `@cds.autoexposed` when the `cds.env.features.odata_new_adapter` flag is set to `true`
- Reject `PATCH` requests where foreign keys cannot be determined statically or where multiple entities need to be updated
- actions / functions bound to a collection of entities in case `cds.features.odata_new_parser` is enabled
- `cds.compile.to.hana` generates `afterImage` only if migration tables exist.

### Removed

- Legacy leftovers for old middlewares: `ExtensedModel:middleware4` (in combination with extensibility)
- Legacy request header `x-correlationid` which was ajways just a misspelled variant of `x-correlation-id`.
- Legacy configuration option `cds.requires.middlewares = false`
- Legacy configuration option `cds.features.serve_on_root = true`
- Legacy draft implementation `cds.fiori.lean_draft = false`
- Legacy API `req.user.locale`. Use `req.locale` instead.
- Legacy API `req.user.tenant`. Use `req.tenant` instead.
- Legacy configuration `cds.drafts.cancellationTimeout`. Use `cds.fiori.draft_lock_timeout` instead.
- Legacy annotation `@assert.enum`. Use `@assert.range` instead.
- Legacy properties of `cds.Request`: `req.tokenInfo`, `req._.shared`, and `req.attr`
- Legacy type facade files from `@sap/cds/apis/...`. Use `@sap/cds` as only type import.
- Legacy quirks mode. From now on, `cds.ql` generates spec compliant `ref` paths in INSERT/UPDATE/DELETE CQNs. The database services expect the same.
  + Use `{ INSERT: { into: { ref: ['Authors']}}}` instead of `{ INSERT: { into: 'Authors' }}`
  + Use `{ UPDATE: { entity: { ref: ['Authors']}}}` instead of `{ UPDATE: { entity: 'Authors' }}`
  + Use `{ DELETE: { from: { ref: ['Authors']}}}` instead of `{ DELETE: { from: 'Authors' }}`
- Deprecated csn entity proxy `<entity>_texts`. Use `<entity>.texts` instead.
- Deprecated built-in `cds.compile.to.gql` and `cds.compile.to.graphql` compile targets. These are provided by `@cap-js/graphql` plugin versions >= 0.9.0.
- Deprecated API `srv.stream`. Use `SELECT` with a single `cds.LargeBinary` column instead.

## Version 7.9.4 - 2024-07-18

### Fixed

- View resolving for `cds.features.lean_draft`
- Error in `enterprise-messaging` deploy script
- Properly forward path expression infront of lamda functions for `odata-v2` remote services
- OData queries selecting the same column with `$count=true`
- Closed higher end of version range for dependency on `cds-types`

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
  + Possible values are `/^([0-9]+)(h|hrs|min)$/` or a number in milliseconds.
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
