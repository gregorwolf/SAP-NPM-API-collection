# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] - 2018-02-06
## Added
- Promise support by all tasks (just omit callback to use it)
- storeCSV now supports NDSOs with binary types (`VARBINARY` and `BLOB`). To
  utilize this, provide data as hexadecimal strings, data is inserted via
  `HEXTOBIN` SQL function

## Changed
- **Incompatible:** queryOption 'ord' now array as order is relevant and object
  property order is unspecified
- queryOption 'flt' now supports multiple values. Refer to [README](./README.md)
  for details
- deleteWithFilter now writes `where` instead of `sWhere` into operationDetails
- Slight performance improvement overall by caching repeatedly retrieved
  metadata
- Complete refactoring of smokeTest, increasing coverage and significantly
  improving performance
- getDatastoreFeature now checks for existence of NDSO meta model instead of a
  runtime environment variable. It also returns the meta model version
- getMetadata now returns `defaultValue`s for inbound queue fields

## Deleted
- setConfig option `earlyCallback`

## [1.3.1] - 2017-12-18
### Changed
- Fix timeout issue in smokeTest

## [1.3.0] - 2017-12-15
### Changed
- **Incompatible**: Remove custom format `YYYYMMDDHH24MISS` for timestamps,
  now ISO 8601 UTC strings (`YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"`)
  are sent and expected for filtering
- **Incompatible**: Rewrite task getRequestInfo:
  - now takes generic query options instead of multiple query parameters
  - returns flat array as result instead of splitting loads and activations
  - fix typo in `dependentRequests` property
  - significant performance improvement by pushing whole logic to HANA

### Deprecated
- setConfig option `earlyCallback` shall not be used anymore and will be removed
  soon.

## [1.2.0] - 2017-12-12
### Added
- Add new task getMonitoringOverview that fetches all NDSOs of the provided
  schema and provides information relevant for monitoring, like the last
  operation and stats like table sizes and row count.

  Note that the latter requires access to the monitoring views `SYS.M_CS_TABLE`
  and `SYS.M_RS_TABLE`.
- Add queryOptions to task getDataStores which support filtering, sorting and
  paging. Refer to [README](./README.md) for details
- Add support for drawing request IDs from sequence.

  To do so the sequence must be named as annotation
  `@DataStore.sequence: 'name with namespace'`. When introducing a sequence for
  existing NDSOs, you should define `RESET BY` according to the maximum value
  in the `idGenerator` table. Note that that table will continue to be updated
  even if IDs are drawn by sequence.

### Changed
- Fix crash in getOperationsForRequest if no operation found (may happen during
  deleteAll)
- Fix message logging for failed operations. It used to throw an error like
  'statement.execBatch undefined'
- Provide detail message with modified rows after operations activate and
  rollback also for alternative client `@sap/hana-client`
- Write application user into metadata tables, if available (falls back to the
  technical `CURRENT_USER` if not)

## [1.1.1] - 2017-11-20
### Changed
- Fix getRequestsForActivation to return multiple requests again
- Fix activation for multiple inbound queues
- Fix logging of activation procedure parameters (was missing change log
  info)

## [1.1.0] - 2017-11-07
### Added
- Support for alternative HANA client `@sap/hana-client`

### Changed
- Follow-up fix of error handling if operation cannot be started
- Fix rollback error if previous rollback failed
- Improve log for activate/rollback: procedure result is now added as proper
  log messages, not technical JSON (only for `node-hdb` client)
- Use most recent version of `async`

## [1.0.5] - 2017-10-24
### Changed
- Fix smokeTest status polling which exited too early because smokeTest uses
  the same DB connections for all operations and therefore sees status
  'FINISHED' before it is committed. Now it polls for an internal indicator
  instead
- Fix error handling if operation cannot be started (e.g. called with not
  existing NDSO name)
- Fix repairRunningOperations. It used to check the runningOperations entity
  but with introduction of startOperation that is written in the first commit
  without locking again. The repair operation now checks the operationHistory
  instead because the status update is the first update after the first commit.
- operation status of checkMetadataConsistency now reflects consistency result,
  i.e., if there is an error the operation status will be FAILED
- getRowcountWithFilter can now be called without the superfluous second DB
  client, i.e., with `tracer, client, schema, ndso, whereClause, callback`.
  The signature stays compatible though, the second client is just optional

## [1.0.4] - 2017-10-13
### Changed
- Close database connections for operations when `earlyCallback` is active
- Improve README.md

## [1.0.3] - 2017-10-12
### Changed
- Fix task smokeTest to also support `earlyCallback` option. It used to return
  immediately, so the still running operations could interfere with test
  clean-up procedures

## [1.0.2] - 2017-10-11
### Changed
- Fix number of written lines in various operation success messages
- Fix list of deletable load requests (task getRequestsForDeletion); used to
  return also activated and already deleted load requests
- Fix list of requests for rollback (task getRequestsForRollback); used to
  return also requests that the change log has meanwhile been cleared for
  (resulted in technical error during rollback: 'Unique constraint violation')

## [1.0.1] - 2017-10-06
### Added
- Add CHANGELOG.md (this file) and publishable README.md
- Add new task `setConfig` that allows to set options by a key-value object.

  Currently, only option `earlyCallback` is supported which makes operations
  call the main callback function already after drawing IDs and writing the
  operation into the history. This fixes various timeout issues when executing
  operations in the HRTT Manage UI.

### Changed
- Fix side-effect of disabling autocommit. In case of errors also the
  affectedRequests entity was rolled back which resulted in an inconsistency and,
  for example, failing load or activation requests were not shown on the UI.
- Fix checksum calculation for LargeBinary (BLOB) fields as casting to VARCHAR
  is invalid. As a result such NDSOs could not be activated.

## [1.0.0] - 2017-09-29
### Added
- First release of this package; based on code from @sap/dwf-dws-client and
  the Database Explorer (HANA Runtime Tools, HRTT)

### Changed
- Exclude internal helpers from the `tasks` folder which now only contains
  real tasks to be invoked by a consumer
- Fix checksum handling in task CheckMetadataConsistency. It now works like the
  check on Activate.
