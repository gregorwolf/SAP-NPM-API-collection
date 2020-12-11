# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 2.7.8 - 2020-12-10

### Fixed

- Null pointer exception when using `$expand`, `$filter`, and `contains` in the same HTTP request

## Version 2.7.7 - 2020-12-08

### Fixed

- In `hdb` driver, stored procedures without OUT parameters can now return values
- Service consumption when using `.get('/')`

## Version 2.7.6 - 2020-12-07

### Fixed

- Validate pool clients before use
- Improved default pool configuration
- Remove `req.run` deprecation warning

## Version 2.7.5 - 2020-12-04

### Fixed

- Messaging incompatibility in combination with `@sap/cds@4.4.3`

## Version 2.7.4 - 2020-12-02

### Fixed

- `filter-node-package` has to be a dev dependency

## Version 2.7.3 - 2020-12-01

### Added

- Deprecation warning for private function `req.run`, which will be removed
- Custom aggregates in `$apply` (beta)
- Support for string keys with dots in value (e. g. `a.b.c`) when using keys as segments
- `$filter`, `$groupby` and `$orderby` works with path navigation to key for managed association to-one on sqlite

### Changed

- Logging is now done using `cds.log`
- CREATE and UPDATE requests that are not allowed due to `@restrict.where` are rejected with `403` instead of `404`
- No usage of private `req._model` in generic handlers
- Service consumption: Print Cloud SDK logs only in debug mode
- Generated API for actions and functions on `ApplicationService` as now done on `Service`

### Fixed

- No integrity check for events
- Race condition in data listener of messaging
- External entities are now always automatically resolved
- Skip integrity checks for virtual entities
- Usage of foreignKeyPropagations w/o on condition
- `tx.model` in REST requests
- Expand to association with projection `as select from where`

### Removed

- `req.statements` is not available anymore

## Version 2.7.2 - 2020-11-20

### Added

- Support for tracing database statements with Dynatrace when using `@sap/hana-client` driver

### Fixed

- Problem with navigations that have `null` as value in payload

## Version 2.7.1 - 2020-11-18

### Changed

- Transaction state handling moved to core

### Fixed

- Response in case of failed changesets in `$batch` requests
- UPDATE/INSERT via navigation with foreign key in child

### Removed

- Private function `_ensureOpen` of `cds.DatabaseService`

## Version 2.7.0 - 2020-11-18

### Added

- `@assert.range enum { ... }` for decimals
- Draft: Lock active entity on edit action to prevent duplicate drafts
- Set batch response header Content-Transfer-Encoding

### Changed

- Correlation ID at `req.headers['x-correlation-id']` in subrequests

### Fixed

- Resolving custom DELETE CQNs
- Non-nullable values cannot be set to `null` in UPDATE requests
- Delete active entity with DELETE restriction	
- Calculation of HasDraftEntity does not involve secure annotations
- POST/PATCH on composition of aspect did not insert keys correctly
- Check for different navigation properties with $expand
- Streaming from non-draft entity in draft context
- REST Adapter: `PUT` requests on collections are forbidden
- affected rows in CREATE caused error with hdb
- Navigating to composition of aspect with association as key caused error
- Wrongly returned value for key calculation in expand caused for loop to break
- TypeError by not connected database
- Multiple messages in batch change set

### Removed

- Support for defaultLocale on service level

## Version 2.6.9 - 2020-11-26

### Added

- Internal (for mtx) parameter `poolOnly` to `HanaDatabase.disconnect()` for clearing generic pool entry in case of credentials update

## Version 2.6.8 - 2020-11-16

### Added

- Support for tracing database statements with Dynatrace when using `hdb` driver

### Changed

- No separate logging of error message and stack in OData server
- Not extended tenants reuse default OData service instance

### Fixed

- Fix for metadata document exceeding cache limit

## Version 2.6.7 - 2020-11-11

### Fixed

- Previous fix broke service consumption of other systems

## Version 2.6.6 - 2020-11-10

### Fixed

- Check `req.path` during DoS prevention
- Headers handling in service consumption for S4 On-Premise systems

## Version 2.6.5 - 2020-11-09

### Fixed

- Default sorting in combination with `$apply`

## Version 2.6.4 - 2020-11-06

### Fixed

- i18n tests executed in cds-test

## Version 2.6.3 - 2020-11-05

### Fixed

- Url and headers handling in service consumption

## Version 2.6.2 - 2020-11-04

### Fixed

- Augment read after write data with returned values of virtual properties on draft activate

## Version 2.6.1 - 2020-11-04

### Fixed

- Skip forbidden view check if association to view with foreign key in target

## Version 2.6.0 - 2020-11-03

### Added

- Support for `$expand` on managed Composition and Association to-one in structured types
- Support for CQN partials in `SELECT.orderBy()`
- `messages_<locale>.properties` files looked for in all i18n folders (not just the first)
- Structured types as key
- Support for localization in custom handlers
- `InsertResult` (beta):
  + iterator that returns the keys of the created entries, for example:
    - Example: `[...result]` -> `[{ ID: 1 }, { ID: 2 }, ...]`
    - in case of `INSERT...as(SELECT...)`, the iterator returns `{}` for each row
  + `affectedRows`: the number inserted (root) entries or the number of affectedRows in case of INSERT into SELECT
  + `valueOf()`: returns `affectedRows` such that comparisons like `result > 0` can be used
    - Note: `===` cannot be used as it also compares the type
- Authentication strategy `xsuaa` (only with `@sap/xssec^3`) that additionally provides access to saml attributes via `req.user.attr` (for example, `req.user.attr.familyName`)

### Changed

- SQL queries do not use placeholders for rows of LIMIT clause
- Replaced `@sap/odata-server` dependency by own copy
- On `PATCH` and `PUT`, an `UPDATE` event is followed by a `CREATE` event if there was no matching entity
- On `PUT`, not provided properties are defaulted/ nulled
- On HTTP requests, `req.data` is a copy to preserve the original payload
- Additional properties in payload are preserved for entities with `@cds.persistence.skip` when served to `rest`
- RemoteService: Ignore where clause of view definition during INSERT|UPDATE|DELETE instead of throwing error
- Do not use SQL placeholders for numbers
- Service-level `@requires` are checked in protocol adapter instead of ApplicationService (excluding metadata requests)
- Additional translatable messages

### Fixed

- Streamlined debugging output for SQL statements
- Integrity check for Associations in structured types
- DateTime conversion for SAP HANA
- Ensure `req.method` and `req.headers`
- DatabaseService: Ignore where clause of view definition during INSERT|UPDATE|DELETE
- Activate draft with UPDATE restriction
- Add the correct backlink to composition tree in case of additional association from child to parent
- `falsy` default values were not inserted to the database
- Always prepare for temporal data
- Internal server error on views with parameters and join
- Secure annotation in draft union scenario
- Augment read after write data with returned values of virtual properties
- `@restrict` with association paths and `$user.<attr>` in where
- Result of deep insert
- `UPDATE` statements in custom handlers on Application Service setting only falsy values or using only expressions like `{stock: {'-=': 1}}`

## Version 2.5.6 - 2020-10-22

### Fixed

- Messaging: add data listener only once queue was put

## Version 2.5.5 - 2020-10-19

### Fixed

- `$user.id` in `restrict.where` always treated as string

## Version 2.5.4 - 2020-10-19

### Fixed

- Certificate issue when consuming remote services

## Version 2.5.3 - 2020-10-16

### Fixed

- Do not fail in `cds deploy --to sqlite` if `sqlite3` is not installed

## Version 2.5.2 - 2020-10-09

### Fixed

- Do not fail in `cds deploy --dry` if `sqlite3` is not installed

## Version 2.5.1 - 2020-10-07

### Fixed

- Set temporal session contexts on HANA
- Multiple invokations of `req.on('failed', () => { ... })`

## Version 2.5.0 - 2020-10-02

### Added

- Messaging: Transaction-coupled events will only be sent for successful requests 
  (can be disabled by setting outbox=false)
- Support for @assert.notNull: false
- Messaging: Support for non-normalized input in handler registration
- Messaging: automatically generate headers.id
- Support for navigating to association to-one in structured
- Initial support for `cds.odata.flavors = { v2, v4, w4, x4 }`
- Support custom timezone offset
- Support for assertions in structured data
- Support for annotation `@Capabilities.Readable`
- Input validation for actions and functions
- Support language-dependent sorting order for HANA

### Changed

- Input processing: Performance improvements through templating mechanism used in single handler per layer
- Input processing: Key propagation only on DB layer
- Format of file-based messaging

### Fixed

- Outbound REST/OData errors in CQN translation
- View resolution for views with static values
- Skip transition by view annotated with @cds.persistence.table:true
- Reading structured types via navigation
- Filter on elements having the same name as in DraftAdministrativeData
- Draft union scenario with filter on elements from DraftAdministrativeData
- Resolving views for deep deletes
- Key generation in some UPDATE queries
- HANA: cds.DateTime convert to UTC in draft case
- Combining `$filter` query option and `$apply` using only filter transformation
- Join with draft tables
- Determine name of primary key of draft enabled entity in subselect
- Improved error message for direct use of auto exposed entity
- Empty structured types are now null
- Structured properties with the same name as CQN properties failed to execute
- Association as key caused wrongly generated SQL statement
- Deep update with structured type caused wrongly generated SQL statement

## Version 2.4.0 - 2020-09-11

### Added

- Structured types in $orderby, $filter, $select
- Limited support for Association to-one in structured types

### Changed

- Messaging: The `queue` and `queueConfig` options are now a single object: `{ name, ...queueConfig }`
- Messaging: The `file` option is now moved to top level
- Messaging: The `prefix` option is removed

### Fixed

- Diff calculates the difference on database level
- `sap-messages` header now uses unicode characters for special characters
- `req.target` for bound operations
- `INSERT.into(...).as(SELECT.from(...)` inside custom handlers
- Integrity check for DELETE requests
- `Serialization Error` for entities with composition of aspects in `containment` mode
- Expand on entity with a backlink as a key

## Version 2.3.1 - 2020-09-17

### Fixed

- Expand on entity with a backlink as a key

## Version 2.3.0 - 2020-08-31

### Added

- Support for Continuation Local Storage (CLS)
- Support for access of structured property values in Odata
- Support for expand for external OData service in REST

### Fixed

- HTTP Status Code for `GET` requests on `navigation-to-many` in combination with `$filter`

## Version 2.2.0 - 2020-08-26

### Added

- Path navigations with keys for managed to-one association in orderby work on SQLite e.g. `$orderby=author/id`
- Support for `cds.PrivilegedUser`
- Implicit sorting for OData singletons 

### Fixed

- Deep update could potentially insert wrong data
- Deep insert was also done on empty composition-to-many
- POST via multiple navigations with OData containment activated
- localized view with parameters
- implicit sorting order
- Custom SELECT CQN with join/union in draft enabled service failed for non-draft entities
- `req.user.attr` access during @restrict processing with @sap/xssec^3

## Version 2.1.9 - 2020-08-26

### Fixed

- hdb reconnect on idle timeout

## Version 2.1.7 - 2020-08-17

### Added

- Composite-Messaging
- Support for Message Queuing
- Support for `@sap/xssec^3`
- `@Common.numericSeverity` in error response
- Support expand with '*' in QL API
- Headers can be set with tx.emit on remote HTTP services
- Propagate @cds.localized:false during deep reads
- HANA: support for service manager credentials

### Changed

- Messaging: The configuration is moved to top-level (before it was in credentials)
- Messaging: The payload type is now 'application/json'

### Fixed

- Messaging: Messages are only acknowledged if successful
- Race conditions with messaging management
- `orderBy` as an empty array
- Join transaction during local API call
- Support duplicate names of bound and unbound actions and functions in local API
- Test read for UPSERT was not tenant aware
- Prefer `cds.env.requires.uaa.credentials`
- Error while activate with missing mandatory fields
- Restore `req._.req.authInfo` for compatibility
- OData V4 single property access in combination with mode `odata=structured`
- empty string in functions like tolower, toupper

## Version 2.1.6 - 2020-08-06

### Fixed

- Removal of key properties of contained entity
- Flattening of to-one association if key is also a to-one association
- No localization with `SELECT.forUpdate()`
- Multi-level expand with composition backlink as key
- Ignore association keys in select for deletion integrity check
- POST via multiple navigations
- `req.user.id = <clientId>` with JWT strategy and `client_credentials` flow
- Transaction handling with integrity check and changesets in JSON batch

## Version 2.1.5 - 2020-08-03

### Added

- Support for `@Capabilities.NavigationRestrictions`
- Support queries to a model with nested projections to an external service

### Fixed

- `req._.req` in `SAVE` handler
- Insert duplicate data during deep update
- HANA: prefer `this.options.credentials`
- `$orderBy` in case of `DRAFT` with `Union`

## Version 2.1.4 - 2020-07-31

### Added

- Support for structured OData
- Support for arrayed elements

### Fixed

- Large numbers of expands (>26)
- Reference integrity check for `DELETE`
- Localized in combination with draft
- Propagate @cds.localized:false during deep reads (currently limited to one expand)
- Fetch specific credentials from multiple xsuaa bindings via `requires.uaa.vcap`
- Static values in custom backlinks of compositions

## Version 2.1.3 - 2020-07-28

### Added

- Synchronous API for streaming
- Support calling HANA stored procedures

### Fixed

- Streaming of null values and not found entities
- Temporal session contexts on HANA

## Version 2.1.2 - 2020-07-24

### Fixed

- HANA credentials handling

## Version 2.1.1 - 2020-07-24

### Fixed

- HANA pooling with instance manager

### Removed

- `req.isDraftChange`, `req.draft` and `req.draftMetadata` in draft-related handlers

## Version 2.1.0 - 2020-07-22

### Added

- `req.warn(code, msg, target, args)`
- `req.data` returns an array in case of bulk operations
- All services as subclasses of new `cds.Service`
- Differentiation between "Application Service" (e.g., providing OData) and "Persistence Service" (e.g., database, remote)

### Fixed

- Retrieve performance information via `sap-statistics` header in case of batch requests
- Direct user authentication challenges in case of /$batch
- HTTP error codes from custom handlers are not filtered anymore if in 300...500 range
- following projection with undefined name in target entity
- Lists and null values in where with fluent expressions

### Changed

- Streamlined `req.reject/error/info(code, msg, target, args)`: takes four individual params (number, string, string, array) or one object
- Changed behavior by handler registration: 
-- Handlers registered with entity = '*' are not called by unbound events anymore.
-- Handlers registered without entity are not called by bound events anymore.
-- Special case: Handlers registered in form .before/on/after(\'\*\', handler) are called by bound and unbound events.
- Expanding association from draft-enabled entity to draft enabled entities always provides active version of the expanded entity. 
- If you export a function in an `init.js` file, it will be called with the primary database and its result is awaited.
- REST: Since the service is now based on the `cds.Service` base class, all convenience functions (`create`, `post`, etc.) are streamlined.
- Messaging: Only one queue per app is created, as opposed to one queue per app and external service.
- Messaging: You can now directly connect to the (technical) messaging service through `await cds.connect.to('messaging')`, no topic names will be generated here.
- Messaging: If you want to link your own or external services to messaging you need to model your events in CDS.
- Messaging: If you want to provide custom topics for modeled events, you need to add the `@topic` annotation to the event.
- Messaging: The `prefix` option in the service's credentials is prepended to events that have a `@topic` annotation.
- Messaging: The syntax to emit events with headers changed:
  ```js
  srv.emit({ event: 'yourEvent',
             data: { some: 'data' },
             headers: { some: 'headers' }})
  ```
- Messaging: The default file for `file-based-messaging` is `~/.cds-msg-box`.
- Streamlined handler registration: `srv.before/on/after(<event>, <entity>?, <handler>)`
  - Event and handler are mandatory, entity must be omitted if unbound action/function (CREATE, READ, UPDATE, DELETE are considered to be bound)
  - Event and entity may be arrayed
  - `srv.before/on/after(*, <handler>)` matches all as shorthand
- `INSERT` statements return an object or array of objects (in case of bulk) with the number of affected rows as result of `valueOf()`, as well as the keys of the inserted entities:
  ```js
  const res = await srv.run(INSERT.into('Books').entries([{ ID: 1, title: 'one' }, { ID: 2, title: 'two' }]))
  res > 1 // > true
  res.keys // > [{ ID: 1 }, { ID: 2 }]
  ```

### Removed

- Support for run block (`tx.run(() => {})`)

## Version 2.0.3 - 2020-06-19

### Added

- Custom translatable error messages
- Support for containment in CRUD
- Support for static values in custom on conditions for associations

### Changed

- on() function for joins does not support the simple conditions like on(x, =, y) anymore. Only fluent expressions and object predicates are supported.

### Fixed

- Enterprise Messaging: Received messages are correctly decoded 
- Reading single properties of draft enabled entities via navigations e. g. `/E0(ID=<uuid>,IsActiveEntity=false)/e1(ID=<uuid>,IsActiveEntity=false)/property`
- not supported transformation in groupby throws cryptic error
- etag check only if odata request
- Statements if path expression contains keys of type `cds.Timestamp`, `cds.DateTime` or `cds.Time`
- `$filter` lambda `any` operator if no argument is provided
- User attributes in `req.user.attr` merge `info.userInfo` and `info.userAttributes` (authentication strategy `JWT`)
- User authentication challenges

### Removed

- Support for nested user attributes in `@restrict.where`, e.g., `$user.name.familyName`

## Version 2.0.2 - 2020-06-10

### Added

- Support for XSUAA's user attribute value `$UNRESTRICTED`
- Default to combination `[...];IEEE754Compatible=true;ExponentialDecimals=true` if IEEE754Compatible or ExponentialDecimals is omitted
- Use custom authenticate middleware via `cds.env.requires.auth.impl`
- Authentication strategy `dummy` (`cds.env.requires.auth.strategy = 'dummy'`) that creates super users (i.e., pass all authorization checks)
- Support relative destination path in rest-client

### Changed

- CQN returned for req.query changed — for requests with path expressions the returned CQN of req.query is changed to a simplified format. For `GET /Authors(150)/books` the CQN contains the path in `.from` instead of an `exists` clause in `.where`.
```
{ SELECT:  {  from: { "ref": [
        {
          "id": "AdminService.Authors",
          "where": [ { "val": 150 } ]
        },
      "books"
      ] } } }
```
- Authorizations as whitelist: if any restrictions exist for the target, all not explicitly allowed operations are forbidden (e.g., `@restrict: [{ grant: 'READ', ... }]` -> everything but `READ` is forbidden for all, including bound actions and functions)
- Applicable `@requires` and `@restrict` definitions concatinated by AND
- Reference to undefined XSUAA user attribute in `@restrict.where` results in forbidden
- `req.event` for unbound actions and functions is provided without service prefix
- Increased logging in production (temporarily until revised logging concept is implemented)
- `cds.serve(..., { passport: [...] }` -> `cds.serve(..., { auth: [...] }`

### Fixed

- `INSERT.into.as(SELECT.from...)` with `SELECT` containing placeholders
- Requests on a navigation to many with key provided returns 404 if the resource does not exist
- POST/PATCH requests on `Composition of many` with backlink association as key
- Path expressions on HANA are now flat and not structured anymore
- `$expand` on `Composition of many` with backlink association as key
- Roles from scopes including "."
- Ignore unknown arrayed column during input validation
- Too early client release
- Pool configurations with default values can be set to `0`

### Removed

- Support for annotation `@cds.persistence.name`
- Deprecated SQL dialect `hdbcds`

## Version 2.0.1 - 2020-05-20

### Changed

- Passport strategy whitelist: `mock` and `JWT`
- Authentication not needed for calls to a service's root or metadata endpoints
- Support for "public" entities and actions (i.e., no restrictions) in services without `@requires` but other entities and/or actions with `@restrict`

### Fixed

- `target` added to assert errors

## Version 2.0.0 - 2020-05-20

### Changed

- Update major version number

## Version 1.2.0 - 2020-05-19

### Added

- The timeout of the exclusive lock of drafts can now be configured using `cds.drafts.cancellationTimeout`
- `req.params`: iterable with key-value pairs for the key predicates of the addressed resource

### Changed

- Slightly improved performance for `$expand`
- Return key values (single key only) of created entries instead of number of affected rows
- Annotations `@cds.onInsert` and `@cds.onUpdate` ignore values from the request (see [Managed Data](https://github.wdf.sap.corp/pages/cap/guides/providing-services#managed-data))
- Processing of read-only values moved to initial before handler
- Aligned handling of virtual, computed, read-only, immutable with java runtime
- Allow deep insert on to one association with non-key property, the non-key property is silently ignored 

### Fixed

- Resolved some performance issues with `@sap/hana-client`
- `$filter=false or ...` is now possible
- Custom handler registration in multi-tenant scenario
- Alias in associations was not processed correctly in post-processing
- `$search` is now applied on the query result of `$apply` as specified in OData V4 spec
- `evictionRunIntervalMillisForPools` is now treated properly
- Searching for `_` or `%` in `$filter` queries with `contains`/`startswith`/`endswith`
- Insert of to-one associations with structured elements

## Version 1.1.1 - 2020-04-28

### Added

- Support for `orderBy` in rest client

### Changed

- `limit` in CQN is translated to placeholders in SQL
- QL API: .where() is changed: 
-- Where with two parameters like .where('x', 1) is not allowed and should be replaced with .where('x', '=', 1).
-- Combinations with partial CQNs like .where({ref: ['x']}, '=', 1) are not allowed. Use arrays of partial CQNs like .where([ {ref: ['x']}, '=', {val: 1} ]) instead.
-- Fluent expressions work as strictly alternating string/value lists (as documented). Partial CQN can be used here as value.
- Per default, results are now ordered by keys of the entity

### Fixed

- `$filter=false or ...` is now possible
- CREATE now returns `context.data` if not all non-UUID keys are provided
  and no error is thrown in the database client
- CANCEL and PATCH drafts now support multiple fields in where clauses
- Handler registration for draft events in multi-tenancy scenario
- Localize expanded entities
- Composition and Association to one with expand in draft case
- Disable local default pagination via `@cds.query.limit.default: 0`
- Brackets in object predicates in where

## Version 1.1.0 - 2020-04-23

### Added

- Support for CREATE operations with delegated key generation
- `@cds.persistence.skip` annotated entities return HTTP code 501 in generic handlers
- Introduced `@cds.localized:false` on entity-level for switching off automatic redirection to localized views
- Server-side pagination on global, service, and entity-level via `@cds.query.limit`
- Omitted key predicates of nested composition items are augmented, if possible
- The exclusive lock of a draft automatically times out after 15 minutes
- Static where annotations for RUD
- Associations to one annotated with `@assert.integrity: false` are ignored on integrity checks
- Support input validation annotations in ODATA

### Changed

- Object notation in `.where` of statements does not allow functions anymore
- `context.diff()` ignores `@cds.persistence.skip` annotated entities
- Always try to read from localized views (also by draft enabled entities)
- In multitenant scenario, the CSN model is now always loaded from `@sap/cds-mtx`. Previously, it was only loaded if it was extended.
- Use open source version of `@sap-cloud-sdk/core`
- If a column or column alias is used multiple times in a SELECT query, the query is from now on rejected. Example: `SELECT.from(Foo).columns(['c1', 'c1'])`

### Fixed

- Reference integrity checks for foreign entities without stored keys
- Calculation of `HasActiveEntity`
- Update and Delete with where annotations
- Aliases by navigation with complex where annotation
- `req._.res` is express' ServerResponse
- SQL Error in case of `$filter` using `ne` operator in combination with `$search`
- Deep update with immutable fields in child entities
- Draft union scenario in case of DraftAdministrativeData navigation
- Transaction handling inside $batch requests
- Multiple aliases in `SELECT.columns`
- Use `hdb` if in direct dependencies of app (and `@sap/hana-client` is not)
- Mapping over a result will propagate `$count`
- Don't ignore rows with `null` column values in negated `$search` queries

# Changelog History

The CDS Runtime module is the successor of `@sap/cds-services`, `@sap/cds-messaging`, `@sap/cds-rest`, `@sap/cds-hana`, `@sap/cds-sqlite` and `@sap/cds-sql`. The changelogs of these components can be found here:
* [CHANGELOG cds-services](changelogs/CHANGELOG_cds-services.md)
* [CHANGELOG cds-messaging](changelogs/CHANGELOG_cds-messaging.md)
* [CHANGELOG cds-rest](changelogs/CHANGELOG_cds-rest.md)
* [CHANGELOG cds-hana](changelogs/CHANGELOG_cds-hana.md)
* [CHANGELOG cds-sqlite](changelogs/CHANGELOG_cds-sqlite.md)
* [CHANGELOG cds-sql](changelogs/CHANGELOG_cds-sql.md)
