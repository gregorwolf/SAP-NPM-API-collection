# Change Log

- All notable changes to this project are documented in this file.
- The format is based on [Keep a Changelog](https://keepachangelog.com/).
- This project adheres to [Semantic Versioning](https://semver.org/).

## Version 10.0.5 - 2026-07-28

### Fixed

- Messaging management requests to SAP Event Mesh or Event Mesh in SAP Integration Suite (EMIS) now always send a (possibly empty) body for `PUT`/`POST` requests, as required by EMIS (and compatible with SAP Event Mesh)
- Only convert `@Common.Text` to `@cds.search` for service entities

## Version 10.0.4 - 2026-07-21

### Fixed

- Default language fallbacks for incomplete `i18n` bundles in Java projects
- `srv.on/before('READ',...)` handlers registered with a cds-typer singular entity proxy were erroneously rewritten to event `each`
- Asynchronous plugins (exporting a Promise) were not awaited in ESM projects
- Fixed context propagation for local app and remote service calls 

## Version 10.0.3 - 2026-07-02

### Fixed

- Suppress "connect to" log for internal scheduling service

## Version 10.0.2 - 2026-06-29

### Added

- Event Queues: Support for 6-field cron (with seconds)

### Fixed

- `cds.env` omits default values from plugins if requested
- `$filter=<nav> eq/ne/gt/lt/ge/le <value>` on collection-valued navigation properties now returns 400 instead of crashing with 500
- `$filter=<nav> gt/lt/ge/le <value>` on single-valued navigation properties now returns 400 instead of crashing with 500
- If `cds.env.query.limit.max` is increased beyond the default of 1000 and no explicit `cds.env.query.limit.default` is set, the default page size now follows `max` instead of staying capped at 1000.
- Propagate `DraftUUID` et al. to nested children on deep PATCH
- Missing `username`/`password` on `BasicAuthentication` destinations in the native-fetch remote client now default to empty strings

## Version 10.0.1 - 2026-06-19

### Added

- Support for SAP Integration Suite Event Mesh (EMIS) via messaging kinds `event-mesh` and `event-mesh-shared` (beta)
  + In contrast to SAP Event Mesh, multitenancy is out of scope!

### Fixed

- Do not crash for app configurations or tests setting `cds.requires` to a nullish value.
- A custom `cds.env.protocols.odata-v4.path` is now correctly applied to services using the `odata` protocol shortcut (or no explicit `@protocol` annotation).
- `$count` is not allowed on service root or single instances
- `$batch` URLs with sub-sequent segments will now be parsed as usual URLs
- Gaps in CSRF token handling of native-fetch client
- `srv.schedule()` always creates singleton tasks
- Initial timestamp of scheduled task with cron expression

## Version 10.0.0 - 2026-06-01

### Added

- New annotation `@cds.minify: false` allows to avoid minification of definitions that would otherwise be removed from the model. For example, that would happen to types which are not used anywhere in the model.
- UCL: Support for integration update operations (`add`, `remove`, `modify`, `rotate`) for tenant mapping notifications.
- UCL: Accept mTLS certificate from `x-forwarded-client-cert` (XFCC) header for Kubernetes/Istio/Envoy environments, in addition to the existing Cloud Foundry HAProxy headers.
- Compatibility flag `cds.env.features.compat_srv_getters` (default: `false`) to opt into the deprecated function-call API for `srv.entities`, `srv.events`, `srv.types`, and `srv.actions`. This flag will be removed with cds^11.
- Mark all CSN `val`s with `param: false`
- For `CREATE`, `UPDATE`, `UPSERT`, and `DELETE` requests, the generic CRUD handler now consistently returns arrays carrying an `.affected` property with the number of affected rows (instead of `req.data`, or — for `DELETE` — the affected count itself).
  + Opt-out via `cds.env.features.legacy_srv_results: true`. This flag will be removed with cds^11.
- `redis-messaging`: Support for credentials in GCP-based regions (adds private CA)

### Changed

- Node.js 22 is now the minimum required Node.js version. Version 20 is no longer supported.
- `cds.features.compat_texts_entities` is changed to _false_ and will be removed in an upcoming version.
- `cds.features.ieee754compatible` is changed to _true_ to return strings for Decimal/Int64 for all db services.
- `cds.i18n.fatjson` is changed to _false_ and will be removed in an upcoming version.
- Advanced Event Queue Scheduling via Scheduling Service on by default (if both `db` and `queue` are available)
- `cds.fiori.direct_crud` is split into the two feature flags `cds.fiori.bypass_draft` and `cds.fiori.draft_new_action`
  +  `cds.fiori.bypass_draft` allows the modification of active instances. It is now enabled by default
  +  `cds.fiori.draft_new_action` introduces the `draftNew` action to create new drafts. It is still disabled by default (as before)
- REST adapter: bulk `POST` of multiple entries is now dispatched as a single `INSERT` instead of one dispatch per entry.
  + Set `cds.env.features.bulk_inserts_via_rest: false` to revert to the legacy per-entry dispatch. This flag will be removed with cds^11.
- `req.query` is deprecated for bound actions/ functions and will be removed in cds^11. Use `req.subject` instead.
- Generic Handlers: Static `handle_*` methods that registered preflight handlers were replaced by non-static `handle_*` functions that are called before `handle`
  + Fully backwards-compatible: In case of a custom static `handle_*` method that overrides a built-in one, the respective `handle_*` function is not called
- Updated default configuration for `persistent-queue`:
  + `legacyLocking` default changed from `true` to `false`
  + `maxAttempts` default reduced from `20` to `10`
  + `storeLastError` option removed (now always `true` implicitly)
- Protocol adapters are now real classes, The `.router` contains now the protocol router (previously it was returned from the constructor itself).
- `cds.validate` now return the error code in `.code` instead of `.message`.
- Errors are now logged in default language instead of the plain developer texts.
- OData parser accepts `/^[0-9a-z-]{1,36}$/i` as UUID
- Flows: `@from` is checked in parallel to any other before handler
- RemoteService: Clearing keys from payload (`req.data`) is now done in generic `on` handler instead of an extra `before` handler
- Undocumented `srv.reject(event, path)` registers a standard `before` handler
- **[internal]** Refactored core service implementation (`srv-dispatch`, `srv-handlers`, `cds.Service`) for improved code clarity and maintainability

### Fixed

- The prebuilt edmx were erroneously bypassed and recompiled at runtime in multitenant apps
- Sending a plain object instead of an array for a `Composition of many` now correctly returns 400
- Adding clauses on `cds.clone`d queries behaved inconsistently.
  For example:

  ```js
  let q1 = SELECT.from`Books`.where`ID>1`.orderBy`genre.name`
  let q2 = cds.ql.clone(q1).where`stock>9`.orderBy`title`
  ```

  Before, the `where` clause was appended, but `orderBy` was overridden instead of appended.
  With the fix, both `where` and `orderBy` are appended, so that q2 is effectively:

  ```sql
  SELECT from Books where ID>1 and stock>9 order by genre.name, title
  ```
  Set `cds.features.compat_clone_appends = true` to revert to the erroneous former behavior. Note though this will be removed in a future release.
- `$expand=*` with query options (e.g. `$expand=*($expand=...)`) no longer crashes the server but returns 400
- `compile.for.nodejs` did not consistently ignore `@Common.Text` annotations with expression values when deriving `@cds.search` fields
- `cds.utils.inspect` respects custom options again
- Erroneously prefixed paths being applied to database service handlers during handler registration
- `.texts` entities incorrectly appearing in `cds.entities` / `srv.entities` when `compat_texts_entities` is not enabled
- Race condition between async and sync handlers rejecting errors simultaneously under `Promise.all` — sync handlers are now consistently wrapped as async during registration
- Query options for bound actions/ functions (e.g., `$select`) are validated against the return type of said bound action/ function

### Removed

- `cds.compile.to.hdbcds()` — use `cds.compile.to.hdbtable()` instead
- `cds.context.http.req.authInfo` - use `cds.context.user.authInfo` instead
- Legacy compat option `cds.compile.to.hdbcds()` — use `cds.compile.to.hdbtable()` instead.
- Legacy compat option `cds.User.tokenInfo` - Use `cds.User.authInfo.token` instead.
- Legacy compat flag for `ASSERT_NOT_NULL` error code of `@mandatory` validation - use `ASSERT_MANDATORY` ass `code` instead.
- Legacy compat flag `cds.features.compat_save_drafts` -> use `['CREATE', 'UPDATE', 'UPSERT']` instead of the `SAVE` event for `.drafts`
- Legacy compat flag `cds.features.consistent_params=false` is now finally removed - adapt the implementation instead.
- Legacy compat flag `cds.features.odata_metadata_compat` is now finally removed - adapt the implementation instead.
- Legacy compat flag `cds.sql.transitive_localized_views` is now finally removed - no action necessary.
- Legacy compat flag `async_handler_compat` feature flag and the associated compat wrapping logic from `srv-handlers`; sync handlers are now always wrapped unconditionally.
- `DISCARD` event as a special-cased branch — it is now mapped to `CANCEL` via the standard events alias table
- Internal function `getDBTable` used by old cds-dbs versions
- Internal `_initial` phase
- Removed support for `async activate()` functions returned from `cds-plugin.js` modules, which was never documented, and deprecated since Oct 2023. If you need to run async code during plugin loading, just return a promise as default export.

## Version 9.9.1 - 2026-04-29

### Fixed

- `cds.features.compat_texts_entities` erroneously influenced the OData service document
- Newly introduced `EXPAND_MAX_LEVELS_EXCEEDED` errors did not have a default message
- Incorrect resolving of parameter aliases for OData functions
- OData Batch: Call error middlewares during error serialization
- `cds.features.count_as_string` in lean draft

## Version 9.9.0 - 2026-04-22

### Added

- Event Queue Scheduling:
  + Support for `srv.schedule.task(event, data)` to create so-called "singleton tasks" that exist only once as well as `srv.unschedule.task(event)` to remove them again
  + Support for cron expressions as argument for `.every()`, e.g., `.every('*/5 * * * 2')` for "Every 5 minutes, only on Tuesday"
  + Support for `cds.appid` for isolating microservices in shared HDI scenarios
    + The experimental option `targetPrefix` is temporarily kept to allow flushing tasks that rely on it, but will be removed soon
  + Streamlined aggregation of `queued` service effective configuration
- Advanced Event Queue Scheduling via Scheduling Service (Beta; enable via `cds.requires.scheduling = true`)
  + Efficient leftover processing by maintaining a schedule in `t0` (requires `@sap/cds-mtxs^3.9`)
  + Revised event processing (ongoing)
  + Only applicable with queue kind `persistent-queue` (which is the default)
- In addition to `.csv` files, and `.json` files, initial data can now also be provided via `.yaml` files
  + Limitation: Only supported in Node.js runtimes, so far, not yet by `cds build` for Java, and for production deployments to HANA
- Support `$select` and `$expand` from draft actions: `draftNew`, `draftPrepare`, `draftActivate`, and `draftEdit`
- Enable referencing action request responses in `dependsOn` of subsequent requests in the same batch
- Import files the ESM way in ESM projects, e.g. to support mocking in Vitest
- Node.js-native `fetch`-based HTTP client for remote service consumption (beta)
  + Used automatically when `@sap-cloud-sdk/http-client` is not installed or forced via `cds.remote.native_fetch = true`
  + Known limitations:
    + Resolving destinations via the BTP Destination Service is not supported
    + Only basic authentication is supported
- `cds.infer.elements` now also supports SQL-style casts, wildcard overrides and `excluding` clauses
- Support for restricting the levels of `$expand` (beta)
  + `@Capabilities.ExpandRestrictions.MaxLevels` defines the maximum allowed depth of an `$expand` starting from the annotated entity
  + Additionally, `@Capabilities.ExpandRestrictions.Expandable: false` is interpreted as `@Capabilities.ExpandRestrictions.MaxLevels: 0`
  + Finally, there is global config option `cds.query.restrictions.expand.maxLevels`
- Kafka: `cds.requires.messaging.config = { ... }` allows custom Kafka client config for development scenarios

### Changed

- I18n keys in `@assert` error messages are now used as error codes. The generic `ASSERT` error key is no longer used if the `message` is not an i18n key.
- New opt-in flag `cds.features.deploy_via_upserts` allows `cds.deploy()` to use `UPSERT` instead of `INSERT` for CSV data, which enables updating existing entries with new values.

### Fixed

- Calculation of `nextLink` based on `$skipToken` for requests with `$top` and/or `$skip`
- Stale entries in `.cds-services.json` are removed reliably, so that `cds mock/watch` no longer try to connect to dead servers
- Configuration shortcuts like `cds.requires[service] = true` always preserve object configuration from other sources
- `cds-serve --project <dir> --service <name>` now honors the explicit service instead of defaulting to `all`
- Handle expression values for `@Core.MediaType`, like `@Core.MediaType: (mimeType)`
- Will not add a default target to `MULTIPLE_ERRORS`-type error
- Enabled creating active composition children using `direct_crud` requests via navigation
- Removed artifacts of draft metadata from active entity data
- Prevent type error when encountering an unexpected symbol key in `cds.ApplicationService`
- Reject requests with `$filter` on operations with primitive return types

## Version 9.8.5 - 2026-04-08

### Fixed

- `compile.for.direct_crud` is resilient against draft-enablement on non-service entities
- Requests targeting a view with parameters are now correctly send to remote OData services
- `TypeError` due to unchecked access when handling `PUT` on collection via navigation
- Null value sorting in draft-enabled scenarios now matches database behavior (NULLS FIRST for ASC, NULLS LAST for DESC)

## Version 9.8.4 - 2026-03-26

### Fixed

- `res.statusCode` of batch sub-requests did not consider potential modifications during `srv.on('error')`
- Restore login challenge for late `401` with mocked authentication in `$batch`
- Batched request fails when depended upon atomicity group fails

## Version 9.8.3 - 2026-03-12

### Fixed

- OData batch parallel processing: Drain remaining queue when aborting

## Version 9.8.2 - 2026-03-10

### Fixed

- Compatibility with `@eslint/js^10`

## Version 9.8.1 - 2026-03-09

### Fixed

- OData batch parallel processing: Preserve request sequence for OData v2
- In inbound messaging, only load the extended model if there is a tenant
- Ensure `cds.fiori.direct_crud` is considered during `cds build`

## Version 9.8.0 - 2026-03-06

### Added

- Calculated elements are now properly calculated in draft state. So far, the elements have been treated as regular elements ignoring the calculation.
  + In case this causes issues, you can opt-out with `cds.fiori.calc_elements = false` until cds10
- $compute supports decimal constants
- Support `/$metadata` requests in OData batch
- Support for `@odata.bind` parameters in collection bound actions
- Support for renaming of foreign keys of managed associations while resolving views
- Support for `Prefer: return=minimal` header in generic draft actions
- OData batch: Parallel processing of atomicity groups via `cds.odata.max_batch_parallelization=<number>` (default: `1`)
  - Only applicable if `$batch` request exclusively contains `GET` requests
  - Note: Parallel processing of atomicity groups is in conflict with OData specification for `multipart/mixed`!
  - Additional experimental feature: Bundle independent `GET` requests into single transaction via `cds.odata.group_parallel_gets=true`
- `hcql`: request raw stream via http header `Accept: application/octet-stream`

### Changed

- Destination caching is no longer modified at runtime. Caching configuration is now managed by the Cloud SDK.
- `cds.env` now supports for credentials lookup Kubernetes secrets with a structure like `${SERVICE_BINDING_ROOT}/${SERVICE}/${INSTANCE}/${BINDING}`. Previously only one level between the root and the binding was possible.
- Allow using ESlint 10 by opening version range `^9 || ^10` for `@eslint/js`
- Outbound `hcql` requests always via `POST`

### Fixed

- OData JSON batch:
  + Response value formatting and escaping for non `application/json` responses
  + Setting correct `content-type` header value for all content types
- `content-length` is now set for OData multipart/mixed batch subrequest responses
- Connection issues when a Kafka cluster has been created with public endpoints
- Fix duplicated columns in case of `$expand=*`
- Unhandled promise rejection in `cds.spawn` if extended model could not be loaded
- Set `msg.tenant` & `msg.event` of messages received from Kafka, based on the stringified header values
- `$expand=*` expands only the exposed associations
- Broken `odata-v2` formatting for values used in `beween- and`, `in` and `lambda` type expressions
- Appending `/$value` to an entity that is not a media entity returns `400 Bad Request`
- In Jest test runs in ESM projects, files are now loaded properly
- Correctly resolve dependencies in workspace setups where the CAP project is not at the root

## Version 9.7.1 - 2026-02-06

### Fixed

- `DELETE` requests nulling a `@mandatory` property
- Correctly call remote collection bound action for `odata-v4` services
- Flow annotation validation at compile time strictly follows the documentation: only enum status values are allowed
  + Status value validation can be disabled via `cds.features.skip_flows_validation=true`

## Version 9.7.0 - 2026-02-02

### Added

- Support for express 5 (in addition to express 4)
- New config option `cds.requires.db.data` to configure source folders for initial data and test data CSV files
- Enterprise Messaging now caches access tokens to support high-throughput message processing from Event Mesh
- Automatically add `@Common.DraftRoot.NewAction` for each draft-enabled entity during `compile.for.odata` via `cds.fiori.direct_crud=true`
- Support for `null` value in `@odata.bind`
- Validation of flow annotations at compile step

### Changed

- Colors are enabled by default in GitHub Actions workflows
- `queue`: Manually update `lastAttemptTimestamp` of outbox messages (instead of relying on `@cds.on.update: $now`)
- `express` is no longer a peer dependency of `@sap/cds` but a regular one. Applications that want to pin it or require it in their custom code, should declare the dependency on their own.
- `hcql` response format: `{ data: [], errors: [] }`

### Fixed

- Correctly respond with status `404` when `@cds.api.ignore` annotated action is requested
- Ensure plugin debug emitted with `DEBUG=all`
- Prevent app crash when `JSON.parse` of operation parameters fails
- Generate correct UI annotations for Status Transition Flows when building and compiling
- Remote services: Prefer `cds.context.user?.authInfo?.token?.jwt` over JWT in HTTP header of incoming request
- References to child elements in `@Common.Text` annotations will now be checked. The reference will not be included in `@cds.search`, in case ...
  * ... the reference can not be found in the annotated entity's associations
  * ... the referenced entity is annotated with `@cds.persistence.skip`
  * ... the referenced field does not exist in the referenced entity
  * References to children of children will be ignored.
- OData parser: Ignore superfluous brackets
- Prevent app crash in case of `req.reject()` during draft activate triggered via OData batch
- `cds minify` no longer removes services if their actions are kept
- Better error when subquery can't be resolved for the current service
- Flows: Record transition to default value on `INSERT`/ `UPSERT`
- Error response properties of OData batch subrequests are now formatted identically to properties in single OData error responses
- Prevent `@Common.numericSeverity` from appearing in persistent draft messages (in addition to the correct property `numericSeverity`)

### Removed

- `@cds.on.update: $now` from `cds.outbox.Messages.lastAttemptTimestamp`

## Version 9.6.4 - 2026-01-20

### Fixed

- `queue`: Too eager removal of control data from deserialized task
- Stop overriding existing `cds.requires.[service].credentials` configurations using values from `.cds-services.json`

## Version 9.6.3 - 2026-01-14

### Fixed

- `queue`: Exactly-once guarantee only with `legacyLocking: false`

## Version 9.6.2 - 2026-01-08

### Fixed

- Consider `@mandatory.message` for the error message, when a mandatory action / function parameter is not provided
- Respond with error code `400` when receiving requests that use `any()` / `all()` filters on an association to one
- Error message of unknown property check will no longer include `undefined` to identify structs without a name
- `enterprise-messaging`: Type error in check for unofficial XSUAA fallback
- Status Transition Flows: Exclusions for multiple projections

## Version 9.6.1 - 2025-12-18

### Fixed

- Status check in case of non-existing subject
- Gracefully handle bad value when calculating `@Core.OperationAvailable` from `@from`

## Version 9.6.0 - 2025-12-16

### Added

- New config entry `cds.folders.apps = 'app/*'` to fetch and load all .cds files from subfolders of `./app` automatically. This eliminates the need for an `./app/index.cds` file with respective `using` directives. Can be disabled by setting `cds.folders.apps` to `false`.
- Support for direct CRUD on draft-enabled entities (beta)
  + Enable via `cds.fiori.direct_crud` (replacing `cds.features.new_draft_via_action`)
  + In such requests, `IsActiveEntity` is defaulted to `true`
- Columns `task` and `appid` to `cds.outbox.Messages`
- `cds.env` getter for `appid`

### Changed

- Improved Event Queue Processing
  + For db-only message processors, the guarantee is now "exactly once" instead of "at least once".
  + Use default target `queue` unless specified (formerly it was the name of the service). In effect, all services with the default queue config are processed together.
- Cleaned-up Model Reflection APIs
  + `cds.entities` and `model.entities` provide access to all entities, not just the ones matching the first sources' namespace
    + Function usage `cds.entities()` without passing a namespace no longer offers unqualified access to the entities of the first sources' namespace
  + `srv.entities` returns `LinkedDefinitions` for that service
  + Undocumented function usages `srv.entities()`, `srv.types()`, `srv.events()`, and `srv.actions()` are officially deprecated and will be removed with `cds^10`.
    + For `srv.entities()`, use `cds.entities()` instead. The others have no replacement. Simply use `srv.types`, `srv.events`, and `srv.actions`.
  + All `.entities` variants only provide `.texts` entities if `cds.features.compat_texts_entities = true` (default until `cds^10`). Use `.texts` property of the respective entity instead (i.e., `CatalogService.Books.texts` instead of `CatalogService['Books.texts']`).

### Fixed

- Actions rejected with `415` for requests with empty body
- `cds.parse.expr` with template literals using "param" as parameter name
- Kafka messaging won't listen for messages without registered on handlers
- Single quote escaping in remote OData requests
- Lambda prefix within function calls in remote OData requests
- Hierarchy requests with `$top` in combination with `$filter`
- Response format of `ASSERT_DATA_TYPE` errors with draft messages
- Deletion of `@assert` draft messages on SAVE
- Check for `process.env.VCAP_SERVICES_FILE_PATH` in logging aspects enterprise messaging tasks
- Remove control data from deserialized task
- Hierarchy draft requests with $filter

## Version 9.5.2 - 2025-12-09

### Fixed

- Usage of associations in `@assert`
- Usage of `@assert` on child entities
- Mocking of remote services using `srv.post('<url>')`

## Version 9.5.1 - 2025-12-01

### Fixed

- Draft child creation in case `cds.features.new_draft_via_action` is enabled
- Draft messages of declarative constraints
- Persisted draft messages in case of on-commit errors
- Async UCL tenant mapping for UCL SPII v2
- Quoting in `cds.compile.to.yaml`

## Version 9.5.0 - 2025-11-26

### Added

- Support for Declarative Constraints (`@assert`; beta)
- Status Transition Flows (`@flow`; beta):
  + Aspect `sap.common.FlowHistory` automatically appended to entities with a `@to: $flow.previous`
    + Deactivate via `cds.features.history_for_flows=false`
    + Experimental: Via `cds.features.history_for_flows='all'`, all entities with a flow definition get appended
    + Note: FlowHistory is not maintained within drafts
  + Support for `@flow.status: <element name>` on entity level
  + UI annotation generation adds action to UI automatically (Object Page and List Report) but hidden in draft mode
  + Experimental support for CRUD flows:
    + Pseudo bound actions `CREATE` and `UPDATE` events can be flow-annotated
      + Note: The `CREATE` event cannot have a `@from` condition
    + Pseudo bound actions for drafts `NEW`, `EDIT`, `PATCH`, `DISCARD`, and `SAVE` can be flow-annotated
      + Note: Flow annotations inside drafts (`@from`, `@to`) are processed as in standard flow transitions, with the following exceptions:
        + The `NEW` event cannot have a `@from` condition
        + The `DISCARD` event cannot have a `@to` condition
- Support for pseudo protocols
- Support for Async UCL tenant mapping notification flow
- `flush` on a queued service returns a Promise that resolves when immediate work (i.e., not scheduled for future) is processed
- Support for `@Common.DraftRoot.NewAction` annotation with feature flag `cds.features.new_draft_via_action`
  + Generic collection bound action `draftNew` will be added to draft enabled entities
  + The action specified in the annotation will be rewritten into a draft `NEW` event
  + Active instances of draft enabled entities can be created directly via `POST`
- Limited support for `$compute` query option: computed properties are only supported in `$select` at the root level, not in expanded entries or other query options. Only numeric operands and operators `add`, `sub`, `-`, `mul` and `div` are supported
- `ias-auth`: configurable name for XSUAA fallback's `cds.requires` entry
- `enterprise-messaging`: Support for scenario `ias-auth` with XSUAA fallback
- Service configuration through `VCAP_SERVICES` can now be supplied with `VCAP_SERVICES_FILE_PATH`. Note that this is an experimental CF feature.

### Changed

- Internal service `UCLService` moved into non-extensible namespace `cds.core`
- Status Transition Flows (`@flow`; beta):
  + UI annotation generation is on by default. Switch off via `cds.features.annotate_for_flows=false`.
  + Feature flag `cds.features.compile_for_flows` renamed to `cds.features.annotate_for_flows`
- `DELETE` requests during draft edit, that do not use containment will cause persisted draft messages to be cleared

### Fixed

- Correctly format values in a where clause send to an external OData service, when the expression order is: value, operator, reference
- cds.ql: tolerate extra spaces after in; parse RHS arrays of values as list
- CRUD-style API: `cds.read()` et al. used without `await` do not throw if there is no database connected
- Unnecessary compilation of model for edmx generation in multitenancy cases
- Using `req.notify`, `req.warn` and `req.info` in custom draft handlers by collecting validation errors in a dedicated collection
- `cds.auth` factory: passed options take precedence
- `cds deploy --dry` no longer produces broken SQL for DB functions like `days_between`.
- Read-after-write for create events during draft choreography will no longer include messages targeting siblings
- `before` and `after` handlers now really run in parallel. If that causes trouble, you can restore the previous behavior with `cds.features.async_handler_compat=true` until `@sap/cds@10`.
- Escaping of JSON escape sequences during localization
- Persisted draft messages in case of on-commit errors

## Version 9.4.5 - 2025-11-07

### Fixed

- Custom error message for `@assert.range`
- For hierarchy requests with `$filter`, properly remove inner `where` clause
- Calling a parameterless function with parameter
- Aligned error handling for path navigation and `$expand`
- Input validation immediately rejects for `@mandatory`

## Version 9.4.4 - 2025-10-23

### Fixed

- Input validation of action parameters in action calls on draft state of draft enabled entities
- Input validation on `NEW` event of draft choreography
- Ignore outbox model on Windows
- `enterprise-messaging-shared`: preserve error listener during reconnect

## Version 9.4.3 - 2025-10-10

### Fixed

- Don't continue validation user input if data type is wrong
- UI annotation generation for status transition flows for Java
- Increased minimium version of `@sap/cds-compiler` to 6.3.x
- Undefined error message for early access checks

## Version 9.4.2 - 2025-10-08

### Fixed

- `DISCARD` as a synonym for `CANCEL`
- `cds.load()` called twice

## Version 9.4.1 - 2025-10-06

### Fixed

- Default `kind` for unknown required service to `hcql`
- Consider and allow aliases from nesting during OData query validation

## Version 9.4.0 - 2025-09-30

### Added

- Status Transition Flows (`@flow`; alpha):
  + Resolve enum references in `@from`/`@to` values
  + Support for `@to: $flow.previous` (transition to the previous status in a flow)
    + Use `cds.env.features.flows_history_stack=true` to switch from history (default) to stack-based behavior
    + Requires adding aspect `sap.common.FlowHistory` to the respective entity
- `i18n` translations for `@assert` messages
- `SELECT ... .stream ()` returns the data from the database as a raw stream
- `cds.validate` treats `@insertonly` elements as immutable
- Vietnamese translations for texts from `@sap/cds/common`
- `ias`/`jwt`/`xsuaa`-auth: Add token payload (as `token_payload`) to warning log in case of an invalid token
  + Note: Some invalid tokens are (for performance reasons) not fully validated and, hence, the payload may not be trusted!

### Changed

- `SAVE` handlers for drafts are triggered when a draft is activated
  + Opt-out until cds^10 with `cds.features.compat_save_drafts=true`
- Improved default error messages for input validation.
- Renamed error key for validation errors of `@mandatory` from `ASSERT_NOT_NULL` to `ASSERT_MANDATORY`
  + For i18n message lookup, an automatic fallback is implemented.
  + Opt-out until cds^10 with `cds.features.compat_assert_not_null=true`
- Errors are collected for `_initial` (internal!) and `before` phase

### Fixed

- Duplicate reconnects in AMQP
- `ASSERT_FORMAT` errors return correct regexp in message
- Crash by draft validation with (custom) error w/o target
- Fixed issue where `' $'` in payloads of batch requests would be prefixed with `'/'`
- Broken link `cds.auth`
- Persist original error message in draft validation messages
- Escaping of `\t` and `\f` in edmx during localization

## Version 9.3.1 - 2025-09-03

### Fixed

- In messaging services, propagated headers (e.g. `x-correlation-id`) will not be automatically propagated for `format: 'cloudevents'`
- Avoid deprecation warning for `cds.context.user.tokenInfo`
- Consider `@Capabilities.ExpandRestrictions.NonExpandableProperties` annotation and ignore fields referenced by the annotation, when rewriting asterisk expand into columns

## Version 9.3.0 - 2025-08-29

### Added

- New method `collect()` has been added to `LinkedCSN`, which can be used like that:
  ```js
  const federated_entities = cds.linked(csn).collect (d => d.is_entity && d['@federated'])
  ```
- Remote services can now be configured without `kind`, for example:
  ```json
  { "cds": { "requires": { "SomeService": true }}}
  ```
- Automatic protocol selection is applied if a required service is configured as above
  and the remote services is served via multiple protocols. For example, if the above
  service would be declared like that, the best protocol would be chosen automatically
  (`hcql` in this case):
  ```cds
  @hcql @rest @odata service SomeService {...}
  ```
- Method `cds.connect.to()` now allows to connect to remote services with just an http url.
  For example use that from `cds repl` like that:
  ```js
  srv = await cds.connect.to ('http://localhost:4004/hcql/books')
  await srv.read `ID, title, author.name from Books`
  ```
- Property `cds.User.authInfo` as generic container for authentication-related information
  + For `@sap/xssec`-based authentication strategies, `cds.context.user.authInfo` is an instance of `@sap/xssec`'s `SecurityContext`
- Support for status transition flows (`@flow`; alpha):
  + Generic handlers for validating entry (`@from`) and exit (`@to`) states
  + Automatic addition of necessary annotations for Fiori UIs (`@Common.SideEffects` and `@Core.OperationAvailable`) during compile to EDMX with feature flag `cds.features.compile_for_flows = true`
- Experimental support for consuming remote HCQL services (`cds.requires.<remote>.kind = 'hcql'`)
- Infrastructure for implementing the tenant mapping notification of Unified Customer Landscape's (UCL) Service Provider Integration Interface (SPII) API
  + Bootstrap the `UCLService` via `cds.requires.ucl = true` and implement the assign and unassign operations like so:
    ```js
    // custom server.js
    cds.on('served', async () => {
      const ucl = await cds.connect.to('ucl')
      ucl.on('assign', async function(req) { ... })
      ucl.on('unassign', async function(req) { ... })
    })
    ```
  + Currently, only the synchronous interaction pattern is supported!
- The targets of `@Common.Text` are added to the default search targets
- Patch Level Validations are enabled by default. Opt-out with `cds.fiori.draft_messages=false`
- Enable custom aggregations for currency codes and units of measure

### Changed

- `UCLService` only pushes the application template to UCL if `cds.requires.ucl.applicationTemplate` is present
- `cds.User.tokenInfo` is deprecated. Use `cds.context.user.authInfo.token` instead.
- Undocumented compat `cds.context.http.req.authInfo` is deprecated. Use `cds.context.user.authInfo` instead.
- Delete all persisted draft messages, when the first request targeting a draft child without containment is handled.
- cds build now trims leading or trailing whitespace characters for all values in CSV files deployed to SAP HANA.

### Fixed

- Errors when reading complementary drafts
- Apply configurations in case `cds.env` was loaded before `cds.log` is initialized.
- `req.diff` resolves correctly deleted nested composition by deep update
- `cds-deploy` did not terminate correctly even though deployment was successful
- Requests to an unimplemented unbound action/ function are rejected
- Custom app-service implementations configured through `cds.requires.app-service.impl` is now correctly resolved (again)
- Validation of UUID format for navigation by key

### Removed

- Internal property `cds.services._pending` was removed => use `cds.services` instead.
- Internal property `srv._is_dark` was removed => use `!srv.endpoints?.length` instead.
- Internal method `cds.env.requires._resolved` was removed => use `cds.requires` instead.

## Version 9.2.1 - 2025-08-15

### Fixed

- Check whether token validation was configured
- `UPDATE(Foo).with`foo=${'bar'}` erroneously constructed the equivalent of `UPDATE(Foo).with`foo=bar` instead of `UPDATE(Foo).with`foo='bar'`
- Errors in emits for file-based messaging are thrown
- Queue: Ensure `method`, `path`, `entity` and `params` are correctly taken over when creating tasks
- Reject navigations in `$expand` without parsing the navigation path

## Version 9.2.0 - 2025-07-29

### Added

- `srv.schedule` allows to specify the time in a more readable way, e.g. `srv.schedule(...).after('1min')`
- Support for `jwt`/`xsuaa`-auth on XSA
- Enable `@sap/xssec`'s caching mechanisms (requires `@sap/xssec^4.8`)
  + The signature cache can be configured via `cds.requires.auth.config`, which is passed to `@sap/xssec`'s authentication services
  + The token decode cache can be configured programmatically via `require('@sap/xssec').Token.enableDecodeCache(config?)` and deactivated via `require('@sap/xssec').Token.decodeCache = false`
- `cds.requires` correctly resolve service credentials on Kyma when its merged env configuration is only `true` and the service is found via its property name.
- `ias`-auth: Support for fallback XSUAA-based authentication meant to ease migration to IAS
  + The fallback is automatically enabled if XSUAA credentials are available. To enable the credentials look-up, simply add `cds.requires.xsuaa = true` to your env.
  + In case you need a custom config for the fallback (passed through to `@sap/xssec` as is!), configure it via `cds.requires.xsuaa = { config: { ... } }`
- Better error message if `cds.xt.Extensions` table is missing in extensibility scenarios.

### Changed

- Upgrade to Peggy 5 version
- Enabled conversion of `not exists where not` to OData `all`, integrating the inverse of the policy applied by the OData parser.
- Numeric values in `.csv` files are now returned as numbers instead of strings, e.g. `1` instead of `'1'`;
  when pre-padded with zeros, e.g., `0123`, they are returned as strings, e.g. `'0123'` instead of `123`.

### Fixed

- Runtime error in transaction handling in messaging services when used with outbox
- Always use `cds.context` middleware for `enterprise-messaging` endpoints
- Crash during Location header generation caused by custom response not matching the entity definition.
- Support for logging of correct error locations with `cds watch` and `cds run`.
- Double-unescaping of values in double quotes during OData URL parsing
- Throw explicit error if the result of a media data query is not an instance of `Readable`, rather than responding with `No Content`
- When loading `.csv` files quoted strings containing the separator (comma or semicolon) where erroneously
  parsed as two separate values instead of one.

## Version 9.1.0 - 2025-06-30

### Added

- CDS config schema validations for `cds.requires.auth.tenants`, `cds.cdsc`, `cds.query`, `cds.log`, `cds.server`
- Queue option `targetPrefix` to prefix `target` value of `cds.outbox.Messages` entries for microservice isolation
- Basic support for CRUD for hierarchy entities

### Changed

- Reduced the amount of SELECT nesting the OData adapter does for `$apply` queries.
- Better error messages for unresolved parent associations in hierarchy requests.
- Enabled updated behavior of `draftActivate` to move updates to fields of draft enabled entities with type `cds.LargeBinary` from draft to active table on the database level, with feature flag `cds.env.fiori.move_media_data_in_db`.

### Fixed

- Copies of `cds.context` with `locale`
- Support for relative paths in `@odata.bind`
- `cds build` on Windows OS - fixed cli tar usage for resources.tgz
- Actions and functions with scalar return types use same `@odata.context` calculation as other return types, fixing e.g. `cds.odata.contextAbsoluteUrl` not being respected
- Improve content-type and content-length handling in OData adapter
- Parsing incorrect function parameters
- `cds deploy --dry` no longer tries to load a DB adapter, so that it works w/o one installed.
- Fix `@mandatory` for actions and functions

## Version 9.0.4 - 2025-06-18

### Fixed

- In some cases, the app crashed if an element was named like a reserved CSN key.
- Locale detection does not enforce `<http-req>.query` to be present. Some protocol adapters do not set it.
- `between` operator for remote OData requests
- `cds serve/watch` and `cds.test()` no longer try to connect to an SQLite database if none is configured.
- `cds.connect.to` for required queueable services if no persistence is configured
- Persistent queue is not enabled if no persistence is configured

## Version 9.0.3 - 2025-06-04

### Fixed

- Handling of bad timestamps in URL ($filter and temporals)
- View metadata for requests with $apply
- Server crash for some URLs

## Version 9.0.2 - 2025-05-28

### Changed

- REVERT: For drafts, read-only fields must be set in `CREATE` handlers (calculated values set in `NEW` handlers are cleansed). If children are added in draft `CREATE` handlers, the field `DraftAdministrativeData_DraftUUID` must be set.

### Fixed

- `cds.load()` ignores the outbox model if it's the only model source, helping `watch` to suppress it as well.

## Version 9.0.1 - 2025-05-26

### Changed

- Lean draft handler is registered in a service only if a draft-enabled service entity exists
- Add back in server version on CAP server launch info log record

### Fixed

- `cqn2odata`: value formatting in OData v4 lambda expressions
- Processing in `filed-based-messaging` must be async
- `Location` response header for REST protocol
- `cds.log` is unwired from `cds.env` now, which allows to use `cds.log` in plugins, without risk of loading `cds.env` too early.
- Elements from `mixin` are now being considered by `minify`
- Lean draft: Insert.entries on draft enabled entity
- Remote call of action/function always forwards passed headers
- `cds serve` no longer fails with an duplicate install error if the shell's working directory differs in case (like `C:` vs `c:` on Windows).
- Erroneously skipped input validation for local service calls

## Version 9.0.0 - 2025-05-07

### Added

- CAP-native task queues (beta; replacing generic outbox -- see section Changed for additional details)
  + Events and requests to a "queued service" are written to the database in the current transaction (with default kind `persistent-queue`) and processed as asynchronous tasks
    + Programmatically queue or unqueue any service via `cds.queued(srv)`/ `cds.unqueued(srv)`
    + Statically queue instances of `cds.MessagingService` or `AuditLogService` via config `cds.requires.<srv>.queued = true`
    + Disable the persistent task queue via `cds.requires.queue = false`
  + Tasks are processed in dedicated transactions (except on SQLite, where there are no concurrent transactions)
  + Tasks are retried until processed succesfully or the max. retry count is reached, i.e., adding resiliency to the respective service
    + Tasks that cause unrecoverable or programming errors will remain in the database table but will not be retried
  + Experimental task scheduling API `<srv>.schedule()` as variant of `<srv>.send()` with fluent API options `.after(<ms>)` and `.every(<ms>)`
  + Experimental task callback API `<srv>.after('<event>/#succeeded', (results, req))`/ `<srv>.after('<event>/#failed', (error, req))`
  + Experimental task trigger API `<srv>.flush()`
  + Experimental application-level task status management to avoid long-lasting database locks
    + Enable via `cds.requires.queue.legacyLocking = false`
    + Caution: Application-level task status management only works if all active app deployments are on cds^9!
- Inbox: Inbound messages can be accepted as asynchronous tasks via config `cds.requires.messaging.inboxed = true`
- Not null validiations for actions and functions
- `cds.auth`: Provide custom configuration to `@sap/xssec`-based authentication via `cds.requires.auth.config`
- IAS: Token validation for requests to the app's "cert url" (with `.cert` segment in the domain)
- Support refs with longer path expressions like `ref: ['root', 'child', 'subchild', 'ID']` when resolving queries to the target entity
- `PATCH` as synonym for `UPDATE` during event handler registration
- `UPSERT` semantics for `PUT` requests can be deactivated via flag `cds.runtime.put_as_upsert=false`

### Changed

- Evolution of the generic outbox to CAP-native task queues:
  + `cds.queued()`/ `cds.unqueued()` replace `cds.outboxed()`/ `cds.unboxed()` (temporary compat in place)
  + Global configuration `cds.requires.queue` replaces `cds.requires.outbox` (temporary compat in place)
  + New default `cds.requires.queue = true`. This change requires a database deployment (for table `cds.outbox.Messages`) if `cds.requires.outbox` was not manually set to `true` before.
  + Default `chunkSize` reduced from `100` to `10`. If parallel processing is disabled (`parallel = false`), the `chunkSize` config is ignored and the effective `chunkSize` is `1`.
- Support for `@sap/cds-mtxs` version 1 is dropped
- Service level restrictions for application service calls are enforced by default
  + Opt out with `cds.features.service_level_restrictions=false` until next major version
- `req.diff` uses a deep expand to fetch data for deep update comparison. Previously, it read each composition layer sequentially.
- `cds.test` now requires module `@cap-js/cds-test` to be installed. Test dependencies like `axios`, `chai`, `chai-as-promised`, and `chai-subset` can be usually removed in favor of `@cap-js/cds-test`.
- `cds.context.locale` is only set if initiated from an HTTP client specifying a locale
- Only new major version 4 of SAP Cloud SDK is supported from now on . Please make sure to upgrade. Detailed changes are documented in the [migration guide](https://github.com/SAP/cloud-sdk-js/blob/main/V4-Upgrade-Guide.md).
- `cds-serve` now fails if `@sap/cds` would be loaded from different installation paths to prevent inconsistent server state. Such situations are always a setup issue, often caused by plugins that require diverging versions. Disable with `cds.server.exit_on_multi_install: false`.
- For drafts, read-only fields must be set in `CREATE` handlers (calculated values set in `NEW` handlers are cleansed). If children are added in draft `CREATE` handlers, the field `DraftAdministrativeData_DraftUUID` must be set.
- `hdbtabledata` files created by `cds compile/build` now instruct SAP HANA to decode base64 values in CSV files for `LargeBinary` elements. This aligns the behavior with SQLite and H2, avoiding manual base64 decoding. It can be disabled with `cds.hana.table_data.column_mapping.LargeBinary=false`.
- `PATCH` requests no longer create the target resource if it doesn't exist (`UPSERT` semantics)
  + Re-enable via flag `cds.runtime.patch_as_upsert=true`
- `PUT` requests no longer set unprovided properties to their default values (`REPLACE` semantics)
  + Re-enable via flag `cds.runtime.put_as_replace=true`
  + If enabled, the defaulting is now done in the protocol adapter
- `req.params` is an array of objects (instead of plain values for single-keyed entities with key `ID`)
  + Opt out with `cds.features.consistent_params=false` until next major version

### Fixed

- Webhook creation in `enterprise-messaging` is more resilient in case of multiple instances
- `cdsjsonschema` protocol in lower case for cds json schema
- In `CREATE` handlers for drafts, the original path is preserved
- `@sap/cds-mtxs` is now loaded before other plugins so that they can register handlers for mtx services.
- The default index page respects now `cds.odata.containment`
- Remove incorrect `Type` suffix from `@odata.context` for views with parameters
- Support where clauses in refs

### Removed

- Legacy OData adapter which was enabled with compat `cds.features.odata_new_adapter=false`
- Legacy Database services which were enabled with `@sap/cds-hana` or `sqlite3`
- `@cds.default.order` and `@odata.default.order` for implicit sorting
- `cds.auth`: Support for `@sap/xssec^3` (incl. compatibility mode of `@sap/xssec^4`)
- Undocumented compat flag `cds.features.odata_v2_result_conversion`
- Undocumented util `cds.utils.pool`
- Undocumented method `INSERT.as`. Use `INSERT.from` instead to insert sub `SELECT` queries.
- Undocumented method `req._queryOptions` of `cds.Request` belonging to the new OData adapter
- Undocumented method `_reset` of the `cds.ql` API
- Undocumented property `cmd` of the `cds.ql` `Query` class. Please use method `kind` instead.
- Undocumented method `protocol4` of the `Protocol` class. Please use property `def.protocols` instead.
- Undocumented methods `impl` and `with` of the `ApplicationService` class. Please use `prepend` instead.
- Undocumented compat flag `cds.features.rest_error_handler`
- Deprecated compat flags `cds.features.compat_restrict_bound` and `cds.env.features.compat_restrict_where`
- Deprecated compat flag `cds.features.stream_compat`
- Deprecated feature flag `cds.log.kibana_custom_fields`. Please use `cds.log.als_custom_fields` instead`.
- Deprecated compat flag `cds.features.keys_in_data_compat`
- Deprecated element-level annotation `@Search.defaultSearchElement`. Please use annotation `@cds.search` instead.
- Deprecated stripping of unnecessary topic prefix `topic:` in messaging
- Deprecated messaging `Outbox` class. Please use config or `cds.outboxed(srv)` to outbox your service.
