# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.28.0 - 2020-04-23 (part of cds-runtime 1.1.0)

### Added

- Support for CREATE operations with delegated key generation
- `@cds.persistence.skip` annotated entities return HTTP code 501 in generic handlers
- introduced @cds.localized:false on entity level for switching off automatic redirection to localized views
- Server-side pagination on global, service, and entity level via `@cds.query.limit`
- Omitted key predicates of nested composition items are augmented, if possible
- The exclusive lock of a draft automatically times out after 15 minutes
- Static where annotations for RUD
- Associations to one annotated with `@assert.integrity: false` are ignored on integrity checks
- Support input validation annotations in ODATA

### Changed

- Per default, results are now ordered by keys
- object notation in .where of statements does not allow functions anymore
- context.diff() ignores `@cds.persistence.skip` annotated entities
- always try to read from localized view (also by draft enabled entities)
- In multitenant scenario, the CSN model is now always loaded from `@sap/cds-mtx`. Previously, it was only loaded if it was extended.

### Fixed

- Reference integrity checks for foreign entities without stored keys
- Calculation of HasActiveEntity
- Update and Delete with where annotations
- Aliases by navigation with complex where annotation
- `req._.res` is express' ServerResponse
- SQL Error in case of `$filter` using `ne` operator in combination with `$search`
- Deep update with immutable fields in child entities
- Draft union scenario in case of DraftAdministrativeData navigation
- Transaction handling inside $batch requests
- Multiple aliases in SELECT.columns
- `$filter` with `not` operator

## Version 1.27.1 - 2020-03-23

### Fixed

- Alias was added twice to CQN in case of a request including navigations on a draft enabled entity
- Duplicate entries in result in case of `expand-to-many`
- Deep Insert with backlinks as keys

## Version 1.27.0 - 2020-03-19

### Added

- Transaction uses one timestamp for all queries
- Pool acquire timeout is set by default and can be configured in pool options
- Ordered OData singletons (`... as select from <entity> order by <property>`)


### Changed

- $count=true triggers handlers only once now
- `draftPrepare` action can be called on the entity set of child nodes of the draft enabled entity
- Normalize user.id if an email address
- Allow functions and properties as 2nd param in contains, startswith, endswith

### Fixed

- Entity is now correctly resolved if there are conflicting names
- Where conditions from security annotations were appended twice when using $count=true
- `req._.req` always contains the incoming request - also in `$batch` requests
- Error in delete when fields are renamed in views
- Using view by draft & localized
- context.diff() returns changes also for `PATCH` of drafts
- OData requests using `/$count` on navigation-to-many
- Authentication-requirement detected if in multi tenant mode (i.e., `multiTenant: true`)
- Integrity check of atomicity group
- Where annotation in case of draft and navigations
- `/$count` on parameterized views
- Streaming from draft in case localized and where annotations
- @mandatory: empty strings (whitespaces only = empty) are not allowed

## Version 1.25.1 - 2020-02-26

### Fixed

- update of localized text entries replies with 403 if no changes are detected

### Removed

- `npm-shrinkwrap.json`

## Version 1.25.0 - 2020-02-25

### Added

- Support for OData singletons
- Streaming from draft
- Navigations in aggregate expressions

### Changed

- use odata-server 1.5.2

### Fixed

- handling of virtual field in column generation
- callstack exceeded in SELECT

## Version 1.24.1 - 2020-02-21

### Added

- Support draft for localized texts (to be enabled by @sap/cds and @sap/cds-compiler)

## Version 1.24.0 - 2020-02-20

### Added

- Support for OData `$apply` with `count distinct`

### Changed

- use odata-server 1.5.1

### Fixed

- Column generation for `SELECT.from()` queries without specifying `.columns()`
  - `HasDraftEntity` was not properly calculated
  - Virtual properties were not excluded
- Where secure annotations with localized entities
- Handling of `@cds.on.insert/update` annotated properties of draft-enabled entities
- Keys in root element were not correctly calculated for deep operations
- `@Core.MediaType` could not be used in entity annotated with `@cds.persistence.skip` 

### Removed

- Annotation `@Search.fuzzinessThreshold`

## Version 1.23.0 - 2020-02-05

### Added

- Support non-UUID field as ETags
- Support draft and ETags
- Support for complex where in annotations
- Additional argument `target` for `req.info`

### Changed

- Direct access to auto-exposed entities in draft case
- Errors normalized based on OData v4 standard
- Messages (i.e., header `sap-messages`) normalized based on Fiori standard
- Referential integrity checks are now executed before the commit
- Result of create and update queries is read from the data source to include computed values (update: root only, i.e., w/o compositons, etc.)

### Fixed

- Race condition when there are erros when saving draft
- Handling of where from @restrict annotation of draft enabled entity
- Saving a draft will not ignore readonly fields anymore
- Not having a connection for unauthorized users will not crash the server anymore
- In mocked authorization, users don't need the `ID` property
- Filtering using the `NE` operator handles null values properly
- For insertable-only entities default values are correctly handled now
- Immutable values are now ignored during PATCH or UPDATE requests
- Batch input via REST
- SELECT * by customer handlers will work also on Hana in case the columns are lowercase
- Support "userAttributes" by Mocked Authentication, "xs.user.attributes" is deprecated and will
be removed in the next releases
- Arbitrary users are allowed if fake user '*'= true exist by Mocked Authentication

## Version 1.22.0 - 2019-12-11

### Added

- @sap/cds-ql merged into @sap/cds-services
- Support for subselects and aliasing for remote service definitions
- Support for `@cds.persistence.table`.
- Actions/functions support $select and $expand query params in odata
- Support cds annotation on insert and update with # (e.g @cds.on.update: #user)

### Changed

- Improve error messages for return type validation of custom operations
- Draft removal is handled in `onDraftActivateEvent` instead of `onDraftActivate`

### Fixed

- Check whether service requires authentication
- Independent passport configs per service

## Version 1.21.2 - 2019-12-03

### Fixed

- Default values for patch

## Version 1.21.1 - 2019-11-29

### Added

- Authentication strategy debug messages and error messages for erroneous authentication configurations

### Fixed

- Transform redirect properties in post processing

## Version 1.21.0 - 2019-11-19

### Added

- Support for reading temporal data on HANA
- Support ETag at odata-v4

### Fixed

- Key generation in deep update
- Reading `DraftAdministrativeData` of an active entry without existing draft

## Version 1.20.1 - 2019-10-30

### Changed

- Updated version of @sap/cds-ql to 1.20.1

## Version 1.20.0 - 2019-10-29

### Added

- `req.method` property which contains the HTTP method
- Return type validation for custom operations in rest
- Support for redirected media properties using `@Core.IsURL`

### Fixed

- Requests to `$metadata`

### Removed

- `npm-shrinkwrap.json`
- `req._.isPatch`

## Version 1.19.1 - 2019-10-16

### Changed

- Improved error messages

### Fixed

- Empty user attributes in where conditions
- Queries in custom handler executed twice

## Version 1.19.0 - 2019-10-02

### Added

- Check of source for navigation-to-one in not Draft case
- log function in default logger

### Changed

- Improved error messages
- Use `@sap/odata-server@1.3.8`

### Fixed

- Draft service having column names from draft admin table
- POST and PUT on views with renaming and excluding
- Draft with custom `oncond` in backlink
- Batch with multitenancy

## Version 1.18.2 - 2019-09-19

### Changed

- Use `@sap/odata-server@1.3.7`

## Version 1.18.1 - 2019-09-18

### Added

- Support of authorization restrictions with simple static where clauses (e.g. `$user.level = 3`) for actions/functions

### Fixed

- Draft activation by multiple views
- Binary processing in rest adapter

## Version 1.18.0 - 2019-09-09

### Added

- Support for `@assert.enum` annotation
- Support for media content-type provided as property
- Support for binary encoding in rest

### Changed

- Use `@sap/odata-server@1.3.5`

### Fixed

- READ with `@cds.api.ignore` annotation
- Navigation on Entities with multiple keys did not work correctly
- UPDATE and UPSERT requests with `@cds.on.update` and `@cds.on.insert` annotations
- Logging of missing permissions if no authentication strategy is detected

## Version 1.17.0 - 2019-08-21

### Added

- Error handling for streaming
- Limited support for CREATE requests via navigations
- Method `.transaction` to local client

### Changed

- CREATE with WHERE restriction is supported only with static checks, otherwise rejected
- Extended error logs from custom handlers
- `next()` returns the result of the subsequent handler
- Use `@sap/cds-messaging` for sending/receiving events between services

### Fixed

- Expand entity with where restriction when clause references a user attribute with multiple values
- Navigations in `get` requests using `cds.String` as key type
- Deletion of active entries during draft activation
- Checking security annotations in service and in entities
- UUID generation for deep inserts/updates
- Combination of `localized data` and `$count=true` in OData requests
- `req.query` in case of bound actions and reached via navigation

## Version 1.16.0 - 2019-07-23

### Added

- Batch Update in REST Adapter using an Array as request body
- Content-Type for streaming using annotation
- `DELETE` requests on an entity property sets the property to `null`
- Integrity check for `DELETE` requests

### Changed

- Behaviour of mock authentication according to documentation
- `cds.env` is used by authentication if passport not provided in options

### Fixed

- Draft actions for localized entities
- Write localized data via deep update/insert

## Version 1.15.0 - 2019-07-09

### Added

- Support for views with parameters
- Support for `filter` transformation in `$apply`
- Support for `/$value` on primitive properties

### Changed

- Rest adapter accepts non-modelled data fields in the request payload and exposes them in `req.data`; the fields are
 ignored in the generic handlers
- Replaced `@sap/cds-ql` dependency with `uuid`

### Fixed

- Custom handlers by extended tenants
- Generic handler lookup if multiple services in one `.cds` file
- `$expand` with instance-based authorization
- `result` parameter in AfterHandler has correct format (not always an array)
  - `CREATE`: the created entity
  - `UPDATE`: the updated entity
  - `DELETE`: undefined
  - for `actions` and `functions` it is the defined return type
- `@cds.on.insert` and `@cds.on.update` could not be used at the same time
- `@cds.on.insert` and `@cds.on.update` in deep insert / update

## Version 1.14.0 - 2019-06-24

### Added

- Alternative mock strategy config
- Support for value ranges annotations for REST adapter
- Multiple authentication strategies

### Changed

- Handling of deep insert / update for associations
- Use `@sap/odata-server@1.3.4`

### Fixed

- Bound actions for draft-enabled entities
- Combination of `$apply` with other query parameters

### Removed

- Caching of metadata as odata already does it

## Version 1.13.0 - 2019-06-07

### Added

- Method `diff` to calculate the actual changes in a `CUD`request or while saving a draft
- Support authorization annotations for actions and functions
- Support for default sort order using `@cds.default.order` or `@odata.default.order`
- Support for writing binary stream through odata

## Version 1.12.0 - 2019-05-24

### Added

- Support for localized in generic handlers (no compositions / associations)
- Handler registration by path for autoexposed and redirected entities
- Support for Rest parametric functions and actions

### Changed

- Renamed `Service.with` to `Service.impl`

### Fixed

- `falsy` values as default value
- `req.info` in case of draft actions
- Scopes are checked before custom before handlers

## Version 1.11.1 - 2019-05-16

### Changed

- `service.options` is now a public property (previously private as `service._options`)

## Version 1.11.0 - 2019-05-15

### Added

- read-only field annotations validation
- Deactivate ResourceJsonSerializer in production
- Validation for content type in rest adapter
- Support for OData request path expressions à la `Authors/1`

### Changed

- Use `@sap/odata-server@1.3.3`

## Version 1.10.2 - 2019-05-08

### Added

- Support for @Capabilities annotations

### Changed

- Improved performance by reducing calls to process.nextTick()

### Fixed

- Unbound actions and functions in REST

## Version 1.10.1 - 2019-05-07

### Added

- error handling in case mtx errors

### Changed

- Handler registration using `.with` (as done in reuse scenarios)

### Fixed

- Using `$select=association` in odata-v4 adapter

## Version 1.10.0 - 2019-05-03

### Added

- Support for reading streams in `odata v4`
- Support for batch create in REST adapter
- Support for combination of scopes and instance based authorization checks
- Fiori Draft event `SAVE` as alias for `CREATE` and `UPDATE`

### Changed

- Improved performance

## Version 1.9.0 - 2019-04-16

### Added

- 'mock' strategy accepts any user credentials if none configured
- Support for pseudo role 'system-user'
- Additional cases at security annotations
- `sap-statistics=true` as query or header parameter will yield performance statistics
- $top and $skip at rest adapter

### Changed

- Handlers for `failed` events must only have the error object as an argument
- Handlers for `succeeded` and `done` events must have no argument at all
- used new function notation in generated CQN
- Reduction of round trips to data source by not using transactional blocks at reading requests

### Fixed

- Deep operations in REST adapter
- Draft edit in case one composition has no entries

## Version 1.8.1 - 2019-04-03

### Fixed

- Events are populated through `req.event`

## Version 1.8.0 - 2019-03-29

### Added

- after handlers using `each` or `row` also work with keyword `async`

### Changed

- Generic `onCommit` or `onRollback` handlers end the transaction of potentially multiple db sessions in the request
context
- Merged client adapter into service

### Fixed

- Errors not of type Error are not recognized
- `req.target` in case of a `READ` request of the `DraftAministrativeData` entity

## Version 1.7.2 - 2019-03-25

### Added

- Element/Field annotated with `@mandatory` or `@FieldControl.Mandatory` is treated as not null
- Added 'mock' strategy for passport
- Complex cases at security annotations
- When registering custom handlers for transactional draft events the target property of the `req` parameter now points to the draft

## Version 1.7.1 - 2019-03-20

### Fixed

- Passport is registered correctly in case of `cds.serve('all')`
- User is now set before it is needed

## Version 1.7.0 - 2019-03-19

### Added

- `req.event` contains the type or name of the incoming request
- Support for specifying a `target` in `req.error` and  `req.reject`
- `req.info` to collect info messages in odata-v4. Eventually, they result in the `sap-messages` header.
- Annotation `@Search.fuzzinessThreshold` to configure Fuzzy Search
- Support for Extensibility
- Event handlers for events `succeeded`, `failed` and `done` can be registered at the service event context
- Support for OData `Arithmetic Functions`, `Date and Time Functions`, `String Functions`

### Changed

- before handlers are executed in parallel
- `req.error` returns a generic error with all collected errors in `.details`
- passport method is extracted to the package interface

### Fixed

- No SQL error in case key is generated by DB like done with sequences

## Version 1.6.0 - 2019-02-25

### Added

- Support for `Lambda operators`

### Fixed

- CUD operation with association as key of entity

## Version 1.5.2 - 2019-02-13

### Added

 - Support for sql functions lower, upper, trim, length in $filter and $orderby

### Changed

- Sync functions at before and after handler are not wrapped in promise anymore
- req.reject does not throw anymore
- @sap/audit-logging only used in case the service is provided via VCAP_SERVICES
- Unknown query parameters are not longer rejected at REST adapter

### Fixed

- OData version for $metadata
- Multiple atomicity groups should not share same transaction block
- Brackets in $filter now work correctly

## Version 1.5.1 - 2019-02-12

### Changed

- @sap/audit-logging only used in case the service is provided via VCAP_SERVICES

### Fixed

- No integrity checks when running without db connection


## Version 1.5.0 - 2019-02-07

### Added

- Set foreign keys for POST via `navigation-to-many` and modeled with `$self`
- Support `content id` placeholders in odata v4 batch requests
- Support complex cases at security annotations

### Changed

- Referential integrity checks do not run for associations with specified on conditions
- Rest adapter now ignores query parameters
- Minimum node version 8.9.0
- `.data` and `.query` can be overwritten

### Fixed

- Insert with excluded properties having default values
- Delete active documents in a draft-enabled service without a draft
- Path segment `/$count` respects `$filter`

## Version 1.4.0 - 2019-01-22

### Added

- When registering service handlers, entities can be given as a list
- Support requests to /SiblingEntity in draft
- Annotation `@cds.integrity.skip` to disable reference integrity checks (experimental!)

### Changed

- Replaced @sap/odata-v4 by @sap/odata-server

## Version 1.3.0 - 2019-01-11

### Added

- Authorization filtering and user attributes as lists
- Referential integrity checks

### Fixed

- No fallback for user identifier in case the user object is empty
- Reading draft administrative data

## Version 1.2.0 - 2018-12-21

### Added

- Set default values in case of CREATE, UPSERT and adding a child in deep documents

### Changed

- `context.draftMetadata` contains draft metadata
- `context.isDraftChange` indicates only changes in drafts
- Error messages to be more consistent

### Fixed

- On handler registration for custom handlers in draft
- Draft children can be deleted without navigations
- Reading all draft-enabled documents takes into account only own drafts

### Removed

## Version 1.1.0 - 2018-12-12

### Added

- Deep Document Calls (deep insert, deep update and cascade delete)
- `context.draft` contains draftUUID in case of Create, Update or Delete
- filter and orderby with navigation

### Changed

- improved error messages

- Activating a draft now triggers the 'UPDATE' or 'CREATE' event

### Fixed

- Create Draft uses default values
- draftActivate uses correct keys for update
- $count in draft context now calculates correct result
- db view with select
- Support for navigation over draft with count
- .code property of Errors in Custom handlers will not be overwritten

## Version 1.0.0 - 2018-11-27

### Added

- Support for now function in $filter
- Support for authorization annotations CREATE, UPDATE, DELETE
- Conversion of cds.DateTime/Timestamp using UTC
- Entity definition at service as select view

### Changed

- Update entry makes insert if the entry doesn't exist
- Log messages are used directly instead of being wrapped
- Bound functions now have a query value
- Function next is implicitly executed in synchronous on-handlers
- Improved error handling
- Handler registration allows following variations:
    - Array of events: e.g. ['READ', 'UPDATE']
    - '*' wildcard for any entity event
- next() throws error if called twice in same handler
- Custom implementation must be provided via .with
- Renamed service.definition to service.model
- Renamed service.service to service.name
- updated odata-v4 version to 1.8.0
- Location header for draft actions is now relative

### Fixed

- POST on existing entity throws 'Bad Request'
- $search and $filter in combination with some read draft cases
- POST with navigation does not create a new key
- Access restriction on service level
- UPDATE sql statement generated wrong for entity with multiple keys
- Access to user's locale
- draftEdit action on entities without children
- CREATE with not nullable elements

## Version 0.12.0 - 2018-10-17

### Added

- Custom handlers can be registered and executed for bound functions and function imports
- Added BeforeCreate and BeforeCreateDraft handlers to generate needed UUIDs

### Changed

- Removed translator in the insert based on where by instanced based authorization
- Removed internal event rejections
- Not found error message generalized for reading through navigation
- Refactoring and changes due to updated dependencies

## Version 0.11.0 - 2018-10-04

### Added

- Generic support for Create, Update, Delete on draft-enabled entities
- Generic support for draftEdit, draftPrepare, draftActivate actions
- Logger is available in handlers via context.log

### Changed

- Log warning if database connection is missing

### Fixed

- Service requests now return promises instead of thenables

## Version 0.10.1 - 2018-09-18

### Added

- Generic support for Read on draft-enabled entities

### Fixed

- $user annotation works without authorization

## Version 0.10.0 - 2018-09-17

### Added

- Delete Draft
- Audit Logging of GDPR related events
- Auto lookup of to be used CF/XSA services from environmental VCAP_SERVICES
- OData to context.query for nested $filter, $orderby, $op and $skip at $expand
- Custom types on top of associations

### Changed

- Default for maxPageSize increased to 1000 from 100

### Fixed

- Values for annotated columns (user/now) are included in the response

## Version 0.9.2 - 2018-09-05

### Changed

- Improved npm-shrinkwrap

## Version 0.9.1 - 2018-09-03

### Added

- Create draft

### Removed

- implicit dependency to @sap/cds-sql

## Version 0.9.0 - 2018-08-28

### Added

- API to support the implementation of authorization restrictions
- Local service client
- Support for to-one-navigation in $filter
- Support for annotation @Search.defaultSearchElement to restrict searchable columns in $search
- Support for sap-language query parameter
- Support authorization annotations
- Hooks to add custom logic before and after rollback event
- Audit Logging of security events

### Fixed

- Pagination in case of $expand
- $select with managed associations as key

## Version 0.8.1 - 2018-08-09

### Added

- Authentication using passport (including user/attr proxy)

### Changed

- Require submodules on demand

## Version 0.8.0 - 2018-08-07

### Added

- OData Service: $search supports Unary and Binary Expressions without brackets
- Registration of global handler using star symbol like "this.on('*', () => {})"
- Registration of express middleware using this.use()
- Improved FeautureNotSupported error message
- context.reject supported for before, on and after handlers
<!-- Was never documented publicly: - Support of context.run().then.run() shortcut -->

### Changed

- Updated version of @sap/odata-v4 to ^1.6.0

### Fixed

- Localization in case language is changed
- Issue with not working $count when filtering active in custom hook

## Version 0.7.0 - 2018-07-11

### Added

- Localization support for $metadata
- Support for Compositions

### Fixed

- $search also considers foreign keys of managed associations, structured elements and complex types

## Version 0.6.0 - 2018-07-02

### Added

- Multi tenancy support

### Fixed

- Columns are only added once to CQN in case of $expand in combination with $select

## Version 0.5.0 - 2018-06-25

### Added

- Hooks
  - An any handler can be registered and will be executed for any but COMMIT events
  - Custom handlers can be registered for before COMMIT and after COMMIT events
  - "_" property added to cds handler argument, which can contain adapter specific data like a request object

- OData Service
  - $filter supports (not) contains, startsWith, endsWith
  - $filter supports combinations with and/or
  - $select within $expand
  - $apply supported with limited scope
  - $search supported with limited scope

### Changed

- Hooks
  - Undocumented OData specific properties removed from "cds" handler argument
  - cds.target contains the unreflected entity instead of the reflected entity
  - cds.error will collect errors and throw at the end of each block of .before, .on or .after handlers
  - Second call to next() at a on handler will be ignored and not break the sequence

### Fixed

- Support navigation over entities with multiple keys

### Removed

- In case of a SerializationError the details are only logged and not provided in the response anymore

## Version 0.4.1 - 2018-05-03

### Changed

- Updated version of @sap/cds-ql to 0.4.1

## Version 0.4.0 - 2018-05-02

### Added

- service factory
- cds used via injection

- Hooks
  - Support annotations @insertonly and @readonly
  - Support reject registration for CSN entities
  - Support reject registration with multiple entity parameters

### Changed

- default logger uses matching methods from console object instead of console.log
- packages are loaded on demand at Services.js and OData.js instead of required in any case
- adapted error message in case of 501

## Version 0.3.0 - 2018-04-16
### Added

- service factory
  - service.entities is set

- OData Service
  - Support for $expand=*
  - Support for $select=*

- Hooks
  - CSN entities can be used instead of strings to register a handler
  - .on can be registered with CQN instead of function as handler
  - .on supports registering N handlers
  - .on handlers can use a second argument next()
  - .on can be finished by returning a value
  - .after with convenience wrappers for each|row argument
  - .after can now work asynchronously


### Changed

- server side paging is enabled by default and set to 100, to disable it set maxPageSize to false.

- refactored service factory
  - removed option to compile CSN on the fly, only CSN accepted as input format
  - option to set the URL path is removed
  - Multi service CSN can be used

- refactored Service class
  - OData service instantiation is now split in constructor, createODataService and getMiddleWare

- OData Service
  - Renamed parameters in handler context object (target replaces entity and getEntity)
  - More expressive error messages
  - Crash Node.js instance on unhandled error

### Fixed

- limit property is only added to CQN if necessary
- .reply() is able to handle null values

## Version 0.2.0 - 2018-03-16
### Added

- option to enable debug mode for odata-v4
- default logger with option to register custom logger
- support for server side paging
- support for cds.serve, which is a Fluent API-style method to read service definitions from the given model(s) and construct services
- usage of npm-shrinkwrap

### Fixed

- $filter in combination with to many association
