# Native DataStore Object (NDSO) Service Backend
This Node.js package contains service implementations (tasks) of the Native
DataStore Object. The NDSO backend is part of the SAP HANA Data Warehousing
Foundation product.

As such it is used, for example, by the DataStore Manage UI of the Database
Explorer or the Data Warehouse Scheduler.

[Change Log](./CHANGELOG.md)

**Be aware** that as this being a technical reuse package you are not supposed
to consume it directly in a custom application. It is used by the aforementioned
SAP products/tools though.

# NDSO Task Reference
NDSO tasks are exposed as simple asynchronous functions

<a name="activate"></a>

## activate(tracer, client1, client2, schema, ndso, loadIds, [callback]) ⇒ <code>Promise</code>
Moves data from inbound queue(s) to active data and change log.
Writing of active data and change log is done by the HANA core procedure
`SYS.DSO_ACTIVATE_CHANGES`.

This operation takes care of
- verifying the provided load IDs
- setting status of earlier, failed activations to 'DELETED'
- compiling procedure options like aggregation behavior and before-image
  handling
- calling the procedure
- deleting load data from inbound queue(s)

**Fulfills**: [<code>ActivationResult</code>](#ActivationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| loadIds | <code>Array.&lt;integer&gt;</code> | load requests to be activated |
| [callback] | <code>function</code> | callback function |

<a name="addSubscriber"></a>

## addSubscriber(tracer, client1, client2, schema, ndso, subscriberName, [description], [callback]) ⇒ <code>Promise</code>
Adds a new subscriber entry to the subscribers entity

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| subscriberName | <code>string</code> | name (and key) of the subscriber |
| [description] | <code>string</code> | optional description |
| [callback] | <code>function</code> | callback function |

<a name="checkMetadataConsistency"></a>

## checkMetadataConsistency(tracer, client1, client2, schema, ndso, [callback]) ⇒ <code>Promise</code>
Performs consistency checks on the NDSO.
The operation fails, if inconsistencies are found

Performed checks ensure:
- Inbound queues consistency
- Change log entries deleted for cleaned up activations
- Inbound queue entries deleted for finished activations
- Affected requests consistency

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>function</code> | callback function |

<a name="cleanupChangelog"></a>

## cleanupChangelog(tracer, client1, client2, schema, ndso, requestIds, [callback]) ⇒ <code>Promise</code>
Cleans up change log. The operation verifies, if the provided activation
request IDs can be cleaned up and then deletes them from the change log

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| requestIds | <code>Array.&lt;integer&gt;</code> | activation requests for which change log shall be  deleted |
| [callback] | <code>function</code> | callback function |

<a name="cleanupMetadata"></a>

## cleanupMetadata(tracer, client1, client2, schema, ndso, [maxRequestId], [maxTimestamp], [callback]) ⇒ <code>Promise</code>
Cleans up metadata up to either the provided maximal activation request ID
or corresponding creation timestamp (whichever is higher).

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  
**Todo**

- [ ] not implemented, i.e., it does not actually delete any data


| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [maxRequestId] | <code>integer</code> | request ID up to which to clean up |
| [maxTimestamp] | <code>string</code> | ISO 8601 UTC timestamp up to which to clean up |
| [callback] | <code>function</code> | callback function |

<a name="deleteAll"></a>

## deleteAll(tracer, client1, client2, schema, ndso, [callback]) ⇒ <code>Promise</code>
Deletes all NDSO data (main and metadata entities).
The operation fails, if there are subscribers

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>function</code> | callback function |

<a name="deleteRequest"></a>

## deleteRequest(tracer, client1, client2, schema, ndso, requestIds, [callback]) ⇒ <code>Promise</code>
Deletes load requests. The operation verifies, if the provided request IDs
can be deleted and then deletes them from the inbound queue(s)

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| requestIds | <code>Array.&lt;integer&gt;</code> | load requests to be deleted |
| [callback] | <code>function</code> | callback function |

<a name="deleteWithFilter"></a>

## deleteWithFilter(tracer, client1, client2, schema, ndso, queryOptions, propagateDeletion, [callback]) ⇒ <code>Promise</code>
Deletes active data by the provided query filter. Optionally writes an
activation request into the change log which allows rollback

**Fulfills**: [<code>DeleteResult</code>](#DeleteResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| queryOptions | [<code>QueryOptions</code>](#QueryOptions) | note that for this task, the 'options'  (and more specifically, the filter `flt`) are actually mandatory because the  context is selective deletion from active data which must not be  unrestricted (that would be deleteAll) |
| propagateDeletion | <code>bool</code> | if true, deletions will be added to change log |
| [callback] | <code>function</code> | callback function |

<a name="getDataStores"></a>

## getDataStores(tracer, client, schema, [queryOptions], [callback]) ⇒ <code>Promise</code>
Provides a list of NDSOs in the schema

**Fulfills**: [<code>DataStores</code>](#DataStores)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| [queryOptions] | [<code>QueryOptions</code>](#QueryOptions) |  |
| [callback] | <code>function</code> | callback function |

<a name="getDataStoreFeature"></a>

## getDataStoreFeature(tracer, client, schema, [callback]) ⇒ <code>Promise</code>
Provides information if the NDSO metamodel exists in the schema.
The metamodel is a prerequisite to model NDSOs

**Fulfills**: [<code>DataStoreFeature</code>](#DataStoreFeature)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| [callback] | <code>function</code> | callback function |

<a name="getLogForOperation"></a>

## getLogForOperation(tracer, client, schema, ndso, operationId, [callback]) ⇒ <code>Promise</code>
Provides the message log for an operation

**Fulfills**: [<code>LogForOperation</code>](#LogForOperation)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| operationId | <code>integer</code> | ID of the operation logs shall be read for |
| [callback] | <code>function</code> | callback function |

<a name="getMetadata"></a>

## getMetadata(tracer, client, schema, ndso, [callback]) ⇒ <code>Promise</code>
Provides NDSO metadata

**Fulfills**: [<code>Metadata</code>](#Metadata)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>function</code> | callback function |

<a name="getMonitoringOverview"></a>

## getMonitoringOverview(tracer, client, schema, [queryOptions], [callback]) ⇒ <code>Promise</code>
Provides monitoring relevant information about all NDSOs in the schema.

**Fulfills**: [<code>MonitoringOverview</code>](#MonitoringOverview)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| [queryOptions] | [<code>QueryOptions</code>](#QueryOptions) |  |
| [callback] | <code>function</code> | callback function |

<a name="getOperationInfo"></a>

## getOperationInfo(tracer, client, schema, ndso, [queryOptions], [callback]) ⇒ <code>Promise</code>
Provides general request information

**Fulfills**: [<code>OperationInfo</code>](#OperationInfo)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [queryOptions] | [<code>QueryOptions</code>](#QueryOptions) |  |
| [callback] | <code>function</code> | callback function |

<a name="getOperationsForRequest"></a>

## getOperationsForRequest(tracer, client, schema, ndso, requestId, [callback]) ⇒ <code>Promise</code>
Provides the list of operations that affected a specific request

**Fulfills**: [<code>OperationsForRequest</code>](#OperationsForRequest)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| requestId | <code>integer</code> | request ID which to retrieve operations for |
| [callback] | <code>function</code> | callback function |

<a name="getRequestInfo"></a>

## getRequestInfo(tracer, client, schema, ndso, [queryOptions], [callback]) ⇒ <code>Promise</code>
Provides general request information

**Fulfills**: [<code>RequestInfo</code>](#RequestInfo)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [queryOptions] | [<code>QueryOptions</code>](#QueryOptions) |  |
| [callback] | <code>function</code> | callback function |

<a name="getRequestsForActivation"></a>

## getRequestsForActivation(tracer, client, schema, ndso, [maxRequestId], [callback]) ⇒ <code>Promise</code>
Provides requests that can be activated. Condition:
- finished load requests
- after latest activation
- not subject to a deleteRequest operation
- (optional) load request ID lower than provided maxRequestId

**Fulfills**: [<code>RequestsForOperation</code>](#RequestsForOperation)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [maxRequestId] | <code>integer</code> | request ID up to which to retrieve load  requests |
| [callback] | <code>function</code> | callback function |

<a name="getRequestsForCleanup"></a>

## getRequestsForCleanup(tracer, client, schema, ndso, [maxRequestId], [maxTimestamp], [callback]) ⇒ <code>Promise</code>
Provides requests that can be cleaned up. Condition:
- finished activation requests
- not subject to rollback/clean-up operation
- extracted by all subscribers
- (optional) activation request ID less than or equal to provided
  max ID or timestamp

**Fulfills**: [<code>RequestsForOperation</code>](#RequestsForOperation)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [maxRequestId] | <code>integer</code> | request ID up to which to fetch requests |
| [maxTimestamp] | <code>string</code> | ISO 8601 UTC timestamp up to which to fetch requests |
| [callback] | <code>function</code> | callback function |

<a name="getRequestsForDeletion"></a>

## getRequestsForDeletion(tracer, client, schema, ndso, [callback]) ⇒ <code>Promise</code>
Provides requests that can be deleted. Condition:
- load request failed OR finished and after latest activation
- not subject to a deleteRequest operation

**Fulfills**: [<code>RequestsForOperation</code>](#RequestsForOperation)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>function</code> | callback function |

<a name="getRequestsForRollback"></a>

## getRequestsForRollback(tracer, client, schema, ndso, minRequestId, [callback]) ⇒ <code>Promise</code>
Provides requests that can be rolled back. Condition:
- finished activation requests
- after latest rollback/clean-up operation
- not yet extracted by any subscriber (as rollbacks are just deleted from
  change log, subscribers won't get a corresponding delta corrupting their
  data)
- (optional) load request ID greater than or equal to provided minRequestId

**Fulfills**: [<code>RequestsForOperation</code>](#RequestsForOperation)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| minRequestId | <code>integer</code> | request ID from which to roll back later activations |
| [callback] | <code>function</code> | callback function |

<a name="getRowcountWithFilter"></a>

## getRowcountWithFilter(tracer, client, schema, ndso, queryOptions, [callback]) ⇒ <code>Promise</code>
Provides number of rows in active data filtered by the provided query filter

**Fulfills**: [<code>RowcountWithFilter</code>](#RowcountWithFilter)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| queryOptions | [<code>QueryOptions</code>](#QueryOptions) | note that for this task, the 'options'  (and more specifically, the filter `flt`) are actually mandatory because  this is a preview task for deleteWithFilter |
| [callback] | <code>function</code> | callback function |

<a name="getSubscribers"></a>

## getSubscribers(tracer, client, schema, ndso, [callback]) ⇒ <code>Promise</code>
Provides a list of subscribers

**Fulfills**: [<code>Subscribers</code>](#Subscribers)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>function</code> | callback function |

<a name="removeSubscriber"></a>

## removeSubscriber(tracer, client1, client2, schema, ndso, subscriberName, [callback]) ⇒ <code>Promise</code>
Removes a subscriber from the subscribers entity

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| subscriberName | <code>string</code> | name (and key) of the subscriber |
| [callback] | <code>function</code> | callback function |

<a name="repairRunningOperations"></a>

## repairRunningOperations(tracer, client1, client2, schema, ndso, [callback]) ⇒ <code>Promise</code>
Repairs running operations that are not really running anymore and sets their
status to failed. This is done by attempting to retrieve a lock for the
corresponding entry in the operation history

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>function</code> | callback function |

<a name="resetSubscriber"></a>

## resetSubscriber(tracer, client1, client2, schema, ndso, subscriberName, [callback]) ⇒ <code>Promise</code>
Resets `maxRequestId` of a subscriber in the subscribers entity back to 0

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| subscriberName | <code>string</code> | name (and key) of the subscriber |
| [callback] | <code>function</code> | callback function |

<a name="rollback"></a>

## rollback(tracer, client1, client2, schema, ndso, activationIds, [callback]) ⇒ <code>Promise</code>
Restores data from the change log back to active data.
Writing of active data and change log is done by the HANA core procedure
`SYS.DSO_ROLLBACK_CHANGES`.

This operation takes care of
- verifying the provided activation IDs
- compiling procedure options like aggregation behavior and before-image
  handling
- calling the procedure

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| activationIds | <code>Array.&lt;integer&gt;</code> | activation requests to roll back |
| [callback] | <code>function</code> | callback function |

<a name="storeCsv"></a>

## storeCsv(tracer, client1, client2, schema, ndso, iqName, data, withHeader, [callback]) ⇒ <code>Promise</code>
Loads CSV data into the provided inbound queue.

If the data contain a header row, it is excluded from data but serves as
field list for the INSERT statement.

Data is generally loaded by just providing the data unaltered to the prepared
statement except for binary data types (VARBINARY, BLOB) where a hexadecimal
string is expected instead

**Fulfills**: [<code>LoadResult</code>](#LoadResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| iqName | <code>string</code> | inbound queue to load the data into |
| data | <code>array</code> \| <code>string</code> | CSV data as array or string |
| withHeader | <code>bool</code> | load requests to be activated |
| [callback] | <code>function</code> | callback function |

<a name="storeSql"></a>

## storeSql(tracer, client1, client2, schema, ndso, iqName, externalSql, [callback]) ⇒ <code>Promise</code>
Loads data into the provided inbound queue by the FROM clause provided via
`externalSql`.

`externalSql` needs to provide `technicalAttributes.recordMode` and all
semantical column names as the inbound queue (if the source table has
different column names, they must be aliased accordingly).

**Fulfills**: [<code>LoadResult</code>](#LoadResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| iqName | <code>string</code> | inbound queue to load the data into |
| externalSql | <code>string</code> | SQL by which to load data (used as `FROM`  clause) |
| [callback] | <code>function</code> | callback function |

**Example**  
```sql
 SELECT
   ''    AS "technicalAttributes.recordMode",
   CUST  AS "CustomerName",
   PRICE AS "Amount"
 FROM CUST_PRICES
```
<a name="smokeTest"></a>

## smokeTest(tracer, client1, client2, schema, ndso, [callback]) ⇒ <code>Promise</code>
Performs a smoke test on the provided NDSO, executing all tasks, beginning
with operations related to subscribers, then deletes all of them and runs
deleteAll to have a defined start-state

:warning: **Only use this in test environments!**

**Fulfills**: [<code>OperationResult</code>](#OperationResult)  

| Param | Type | Description |
| --- | --- | --- |
| tracer | <code>object</code> | tracer e.g. by @sap/logging |
| client1 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| client2 | <code>object</code> | DB client by node-hdb or @sap/hana-client |
| schema | <code>string</code> | DB schema |
| ndso | <code>string</code> | full DataStore name with namespace |
| [callback] | <code>operationCallback</code> | callback function |

<a name="ActivationResult"></a>

## ActivationResult
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| operationId | <code>integer</code> | ID of the activate operation |
| activationId | <code>integer</code> | ID of the resulting activation request |

<a name="DeleteResult"></a>

## DeleteResult
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| operationId | <code>integer</code> | ID of the deleteWithFilter operation |
| [changeLogId] | <code>integer</code> | ID of the optional activation request |

<a name="DataStores"></a>

## DataStores
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;string&gt;</code> | NDSO names |

<a name="DataStoreFeature"></a>

## DataStoreFeature
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isDataStoreActive | <code>bool</code> | true, if metamodel found |
| [version] | <code>string</code> | model version |

<a name="LogForOperation"></a>

## LogForOperation
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.posit | <code>integer</code> | defines message order |
| result.timestamp | <code>string</code> | ISO 8601 UTC timestamp of message  creation |
| result.msgType | <code>string</code> | message severity |
| result.msgNumber | <code>integer</code> | numeric message ID |
| result.msgText | <code>string</code> | message text |

<a name="MetadataMetaTable"></a>

## MetadataMetaTable
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | entity name of the meta table |
| fullName | <code>string</code> | fully qualified and quoted table name including  schema and namespace |

<a name="MetadataActiveDataField"></a>

## MetadataActiveDataField
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | field name |
| isKey | <code>bool</code> | indicates, if field is a semantical key |
| aggregation | <code>string</code> | defines before-image behavior (NOP or SUM) |
| sqlDataTypename | <code>string</code> | HANA data type |
| [typeParam1] | <code>integer</code> | parameter attribute 1 (e.g. length) |
| [typeParam2] | <code>integer</code> | parameter attribute 2 (e.g. scale) |
| [defaultValue] | <code>string</code> | default value |

<a name="MetadataChangeLogField"></a>

## MetadataChangeLogField
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | field name |
| isKey | <code>bool</code> | indicates, if field is a semantical key |
| sqlDataTypename | <code>string</code> | HANA data type |

<a name="MetadataInboundQueueField"></a>

## MetadataInboundQueueField
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | field name |
| isKey | <code>bool</code> | indicates, if field is a semantical key |
| aggregation | <code>string</code> | defines aggregation behavior (NOP, MOV, MIN,  MAX or SUM) |
| sqlDataTypename | <code>string</code> | HANA data type |
| [typeParam1] | <code>integer</code> | parameter attribute 1 (e.g. length) |
| [typeParam2] | <code>integer</code> | parameter attribute 2 (e.g. scale) |
| [defaultValue] | <code>string</code> | default value |

<a name="MetadataProcedure"></a>

## MetadataProcedure
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | qualified name of the procedure (with namespace,  without schema) |
| ifVersion | <code>string</code> | interface version of the procedure in the form X.Y (e.g. 1.0), major version incremented for backwards incompatible changes and minor for backwards compatible changes |

<a name="Metadata"></a>

## Metadata
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | NDSO name |
| snapshotSupport | <code>bool</code> | if true, every activation will overwrite  the complete active data table, i.e., inbound queue data is considered to  always be complete |
| operationHistory | [<code>MetadataMetaTable</code>](#MetadataMetaTable) | operation history containing  operation ID, timestamp, user, status etc. |
| affectedRequests | [<code>MetadataMetaTable</code>](#MetadataMetaTable) | mapping table of n:m  relation of operations to requests |
| aggregationHistory | [<code>MetadataMetaTable</code>](#MetadataMetaTable) | stores aggregation  behavior on activation. Needed to account for model changes between  activation and rollback |
| logMessages | [<code>MetadataMetaTable</code>](#MetadataMetaTable) | log messages per operation |
| idGen | [<code>MetadataMetaTable</code>](#MetadataMetaTable) | indicates request type (load,  activation, general operation). Without sequence, new IDs are drawn based on  the content of this table |
| subscribers | [<code>MetadataMetaTable</code>](#MetadataMetaTable) | stores subscribers doing  delta-extractions from the change log. The latest extracted activation  requests are written by each subscriber and affect housekeeping, like  cleanupChangelog |
| activeData | <code>object</code> | main, reportable data entity |
| activeData.name | <code>string</code> | entity name of the data table |
| activeData.fullName | <code>string</code> | fully qualified and quoted table  name including schema and namespace |
| activeData.fields | [<code>Array.&lt;MetadataActiveDataField&gt;</code>](#MetadataActiveDataField) |  |
| [changeLog] | <code>object</code> | optional data entity to track changes |
| changeLog.name | <code>string</code> | entity name of the data table |
| changeLog.fullName | <code>string</code> | fully qualified and quoted table  name including schema and namespace |
| changeLog.fields | [<code>Array.&lt;MetadataChangeLogField&gt;</code>](#MetadataChangeLogField) |  |
| activationQueues | <code>Array.&lt;object&gt;</code> | one or more data entity to queue  inbound data for activation |
| activationQueues.name | <code>string</code> | entity name of the data table |
| activationQueues.fullName | <code>string</code> | fully qualified and quoted  table name including schema and namespace |
| activationQueues.fields | [<code>Array.&lt;MetadataInboundQueueField&gt;</code>](#MetadataInboundQueueField) |  |
| procedures | <code>object.&lt;string, MetadataProcedure&gt;</code> | map of supported  SQL procedures. Key is the operation identifier, e.g. LOAD |
| sequence | <code>string</code> | sequence used to draw new IDs |
| metaModel | <code>object</code> | information about current NDSO metamodel |
| metaModel.version | <code>string</code> | metamodel version |

<a name="MonitoringTableStats"></a>

## MonitoringTableStats
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tableName | <code>string</code> | table name |
| [size] | <code>integer</code> | table estimated maximal memory size in bytes  (not provided, if user lacks authorization) |
| [rows] | <code>integer</code> | table row count (not provided, if user lacks  authorization) |

<a name="MonitoringOverview"></a>

## MonitoringOverview
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.name | <code>string</code> | NDSO name |
| result.lastOp | <code>string</code> | type of the last operation |
| result.lastOpBy | <code>string</code> | user last changing the last operation |
| result.lastOpAt | <code>string</code> | ISO 8601 UTC timestamp when the  last operation was last changed |
| result.lastOpStatus | <code>string</code> | status of the last operation |
| result.subscribers | <code>integer</code> | number of subscribers |
| result.stats | <code>object</code> | table statistics |
| result.stats.activeData | [<code>MonitoringTableStats</code>](#MonitoringTableStats) | stats for  active data entity |
| result.stats.inboundQueues | [<code>Array.&lt;MonitoringTableStats&gt;</code>](#MonitoringTableStats) | stats for  inbound queue entities |
| [result.stats.changeLog] | [<code>MonitoringTableStats</code>](#MonitoringTableStats) | optional stats  for change log entity |
| [result.message] | <code>string</code> | optional warning message derived from  authorization errors by HANA; thrown, if user lacks authorization for  monitoring synonyms (e.g. M_CS_TABLES) |

<a name="OperationInfo"></a>

## OperationInfo
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.operationId | <code>integer</code> | operation ID |
| result.operation | <code>string</code> | operation type |
| result.status | <code>string</code> | operation status |
| result.userName | <code>string</code> | user last changing the operation |
| result.lastTimestamp | <code>string</code> | ISO 8601 UTC timestamp when the  operation was last changed |
| [result.operationDetails] | <code>object</code> | optional operation details |

<a name="OperationsForRequest"></a>

## OperationsForRequest
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.operationId | <code>integer</code> | operation ID |
| result.operation | <code>string</code> | operation type |
| result.status | <code>string</code> | operation status |
| result.userName | <code>string</code> | user last changing the operation |
| result.lastTimestamp | <code>string</code> | ISO 8601 UTC timestamp when the  operation was last changed |
| result.affectedRequests | <code>Array.&lt;integer&gt;</code> | related request IDs |

<a name="RequestInfo"></a>

## RequestInfo
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.operationId | <code>integer</code> | ID of the last operation affecting  the request |
| result.operation | <code>string</code> | type of the last operation affecting  the request |
| result.status | <code>string</code> | status of the last operation affecting  the request |
| result.userName | <code>string</code> | user last changing the operation |
| result.startTimestamp | <code>string</code> | ISO 8601 UTC timestamp when the  operation was started |
| result.lastTimestamp | <code>string</code> | ISO 8601 UTC timestamp when the  operation was last changed |
| result.dependentRequests | <code>Array.&lt;integer&gt;</code> | related request IDs |
| result.requestStatus | <code>string</code> | current status of the request  (derived from the latest operation affecting it) |
| [result.operationDetails] | <code>object</code> | optional operation details |

<a name="RowcountWithFilter"></a>

## RowcountWithFilter
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.tableName | <code>string</code> | fully qualified name of active data table |
| result.rowCount | <code>integer</code> | total number of rows |

<a name="Subscribers"></a>

## Subscribers
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.subscriberName | <code>string</code> | subscriber name |
| result.description | <code>string</code> | additional description |
| result.userName | <code>string</code> | user that created the subscriber |
| result.creationTimestamp | <code>string</code> | ISO 8601 UTC timestamp of the  subscriber creation |
| result.maxRequest | <code>integer</code> | last activation request the  subscriber extracted from the change log |
| result.pushNotification | <code>string</code> | not implemented |

<a name="OperationResult"></a>

## OperationResult
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| operationId | <code>integer</code> | ID of the operation |

<a name="LoadResult"></a>

## LoadResult
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| operationId | <code>integer</code> | ID of the load operation |
| loadId | <code>integer</code> | ID of the resulting load request |

<a name="QueryOptions"></a>

## QueryOptions
Some tasks offer a parameter `queryOptions` that allow for backend-side
paging, sorting and filtering. The task expects it to be an object like this:

**Example**  
```javascript
{
  lim: 100,             // LIMIT in SQL: returns up to 100 rows
  off: 200,             // OFFSET in SQL: skips first 200 rows
  flt: {                // builds WHERE in SQL; multiple columns are connected
    COLUMN1: 'value1',  // by AND
    COLUMN2: 123,
    COLUMN3: [          // array elements for same column are connected by OR
      {
        op: 'BT',       // BT resolves to 'BETWEEN ? AND ?'
        val: [10, 20]
      },
      {
        op: 'EQ',       // EQ resolves to 'IN (?,?,?)'
        val: [95, 99, 101]
      },
      {
        op: 'LT',      // LT ('less than') resolves to '< ?'
        val: 50        // there's also LE ('less or equal')
      },
      {
        op: 'GT',      // GT ('greater than') resolves to '> ?'
        val: 'abc'     // there's also GE ('greater or equal')
      }
    ]
  },
  fltMode: 'PARTIAL',   // instead of 'WHERE = ?' this resolves to 'WHERE LIKE ?'
                        // and wildcards around value (e.g. '%value1%')
                        // default is 'EXACT'
  ord: [                // builds ORDER BY in SQL
    {
      col: 'COLUMN1'    // defaults to 'ASC'
    },
    {
      col: 'COLUMN3',
      dir: 'DESC'
    }
  ]
}
```
<a name="RequestsForOperation"></a>

## RequestsForOperation
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>Array.&lt;object&gt;</code> |  |
| result.requestId | <code>integer</code> | request ID |
| result.userName | <code>string</code> | user last affecting the request  (by operation) |
| result.timestamp | <code>string</code> | ISO 8601 UTC timestamp when the  operation was last changed |

