# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.2.2 - 2020-05-27

### Changed

- Updated version for internal release

## Version 1.2.1 - 2020-05-20

### Added

- The timeout of the exclusive lock of drafts can now be configured using `cds.drafts.cancellationTimeout`
- `req.params`: iterable with key value pairs for the key predicates of the addressed resource

### Fixed

- Custom handler registration in multi tenant scenario
- alias in associations was not processed correctly in post processing
- `$search` is now applied on the query result of `$apply` as specified in OData V4 spec
- `evictionRunIntervalMillisForPools` is now treated properly
- POST/PATCH requests on `Composition of many` with backlink association as key

## Version 1.1.1 - 2020-04-28

### Added

- Support for `orderBy` in rest client

### Changed

- `limit` in CQN is translated to placeholders in SQL
- Per default, results are now ordered by keys of the entity

### Fixed

- CREATE now returns `context.data` if not all non-UUID keys are provided
  and no error is thrown in the database client
- CANCEL and PATCH drafts now supports multiple fields in where clauses
- Handler registration for draft events in multi tenancy scenario
- Localize expanded entities
- Composition and Association to one with expand in draft case
- Disable local default pagination via `@cds.query.limit.default: 0`

## Version 1.1.0 - 2020-04-23

### Added

- Support for CREATE operations with delegated key generation
- `@cds.persistence.skip` annotated entities return HTTP code 501 in generic handlers
- Introduced `@cds.localized:false` on entity level for switching off automatic redirection to localized views
- Server-side pagination on global, service, and entity level via `@cds.query.limit`
- Omitted key predicates of nested composition items are augmented, if possible
- The exclusive lock of a draft automatically times out after 15 minutes
- Static where annotations for RUD
- Associations to one annotated with `@assert.integrity: false` are ignored on integrity checks
- Support input validation annotations in ODATA

### Changed

- Object notation in `.where` of statements does not allow functions anymore
- `context.diff()` ignores `@cds.persistence.skip` annotated entities
- Always try to read from localized view (also by draft enabled entities)
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
