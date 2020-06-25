# Hana Client 2.4.x Drivers

## Version 2.4.196

### Changes:

 - Issue Number 246837: node.js process crashes while executing a statement created by Stream.createProcStatement() when connection is closed.
 - Issue Number 245618: Application crashes with 'Check failed: IsGlobalEmpty()'.
 - Issue Number 244631: Fix Memory leaks caused by warnings.

### Underlying SQLDBC changes:

 - Issue Number 244599: Long-running plan execution cannot be canceled.

## Version 2.4.194

### Changes:

 - Issue Number 239769: Using HanaLobStream produced an incorrect streaming result of NULL value.

### Underlying SQLDBC changes:

 - Issue Number 244509: The wrong error message was displayed when the cseKeyStorePassword property was missing
 - Issue Number 237977: When bulk fetching rows into buffers from a ResultSet, the driver may have returned success when an error occurred while fetching data.
 - Issue Number 236457: There were several SQLDBC tracing issues with flushing disabled and trace only on error
 - Issue Number 241887: VARCHARMODE session variable was not visible using the ClientInfo interface when connecting with ABAPVARCHARMODE=1

## Version 2.4.191

### Changes:

 - Issue Number 242230: Possible crash on queries with TEXT columns

### Underlying SQLDBC changes:

 - Issue Number 243053: When specifying HOSTNAME environment variable and
   using both JDBC and SQLDBC-based drivers to connect with SecureStore
   entries, or Client Side Encryption operations, the JDBC operations could
   have failed
 - Issue Number 240995: Reading BLOB longer than SQLDBC packet size limit
   resulted in silent truncation
 - Issue Number 238492: There was no way for S/4 HANA to check if all internal
   connections for routing were valid on a distributed system

## Version 2.4.186

### Underlying SQLDBC changes:

 - Issue Number 243922: WebSockets would have only reported 'HTTP Exception' from HTTP errors
 - Issue Number 236729: HANA Client for Linux x86_64 was not backwards compatible with Red Hat Enterprise Linux 5

## Version 2.4.182

### Changes:

 - Bug 236802: SQLDBC 2.4.132 and later may infinitely loop on reading finished NCLOB into a more than large enough UCS2 destination buffer if the payload contains non-BMP characters

## Version 2.4.177

### Changes:

 - Bug: 233849 - [node] The ResultSet object could be prematurely freed by node.js GC

## Version 2.4.171

### Changes:

 - Bug: 233849 - [node] fix heap-use-after-free

### Underlying SQLDBC changes:

 - Bug: 233843 - [SQLDBC] SNI is not set correctly when sslValidateCertificate is false
 - Bug: 231977 - [SQLDBC] ALTER CLIENTSIDE ENCRYPTION COLUMN KEY <column key name> ADD KEYCOPY ENCRYPTED WITH KEYPAIR <keypair name> fails with error -10429: Encryption of Column Encryption Key failed: Failed to create temporary Key ID table
 - Bug: 231823 - [SQLDBC] Corrupted debug trace

## Version 2.4.167

### Underlying SQLDBC changes:

 - Bug: 233843 - [SQLDBC] SNI is not set correctly when sslValidateCertificate is false
 - Bug: 228317 - [SQLDBC] Audit log APPLICATION_USER_NAME column is single character on slave node and it works fine on master node

## Version 2.4.162

### Underlying SQLDBC changes:

 - Bug: 230135 - [SQLDBC] SQLDBC will now trace the initial connection reply packet
 - Bug: 229397 - [SQLDBC] Fixed incorrect reporting of rows-affected for LOB datatype
 - Bug: 228712 - [SQLDBC] DBSL could have given a Secure store error: Timeout waiting for the secure store access lock

## Version 2.4.155

### Underlying SQLDBC changes:

 - Bug: 228735 - [SQLDBC] Unintialized scalar value in Connection
 - Bug: 226661 - [SQLDBC] Client not work well with deferred_lob_writing ON

## Version 2.4.154

### Changes:

 - Bug: 225625 - [node] "stderr maxBuffer length exceeded" error when deploying an mtar to CF

### Underlying SQLDBC changes:

 - Bug: 220794 - [SQLDBC] Enable frequent TCP keepalive probes

## Version 2.4.153

### Changes:

 - Bug: 221808 - [node] mdx get_axisinfo return garbage data

### Underlying SQLDBC changes:

 - Bug: 225784 - [SQLDBC] Crash when OOM during error reporting
 - Bug: 224703 - [SQLDBC] Send networkGroup in DBConnectInfo

## Version 2.4.151

### Underlying SQLDBC changes:

 - Bug: 225299 - [SQLDBC] Show tracing category & level at start of restarted trace files
 - Bug: 224855 - [SQLDBC] Windows trace file archiving stop at first copy
 - Bug: 224764 - [SQLDBC] crash at: time::Transaction::xa_remote_rollback - Assertion failed: is_global_coordinator_
 - Bug: 223866 - [SQLDBC] Include original value in conversion failure situations
 - Bug: 223751 - [SQLDBC] Remove RANGE_RESTRICTION test against CE server
 - Bug: 192870 - [SQLDBC] Support returning TIMESTAMP with 'T' seperator instead of space (like ISO 8601)

## Version 2.4.144 (HANA 2.0 SPS03 Rev 37.02)

### Changes:

 - Bug: 217819 - [node] getColumnInfo on stored procedure result: accumulates column infos after multiple executions

### Underlying SQLDBC changes:

 - Bug: 223345 - [SQLDBC] Adjust/remove SQLDBC tests on master due to XSEngine removal
 - Bug: 218913 - [SQLDBC] Support HTTP CONNECT Proxy connections
 - Bug: 218677 - [SQLDBC] Server-side WebSocket pings disconnect client

## Version 2.4.142 (HANA 2.0 SPS04 Rev 41)

### Changes:

 - Bug: 221035 - [node] Wrong results for Node.js client with option rowsAsArray

### Underlying SQLDBC changes:

 - Bug: 221067 - [SQLDBC] Detect when connected to a cloud edition server
 - Bug: 220794 - [SQLDBC] Enable frequent TCP keepalive probes
 - Bug: 218956 - [SQLDBC] SQLDBC pass to a null value to hana server
 - Bug: 218917 - [SQLDBC] Error -10333 when SAPR3 prepare call with IN ITAB
 - Bug: 196975 - [SQLDBC] UCS-2 non-BMP (U+10000) conversions to UTF-8 are incorrect
 - Bug: 177745 - [SQLDBC] improve SQLDBC handling of exceptions and OOM

## Version 2.4.139 (HANA 2.0 SPS03 Rev037.01)

### Changes

 - Bug: 219118 - [node] Improve performance of fetching data from date, time, timestamp columns
 - Bug: 217395 - [node] need a way to check if output parameter is null and get its length

### Underlying SQLDBC changes

 - Bug: 215654 - [SQLDBC] Invalid number of row counts returned (0, expected 4)
 - Bug: 213867 - [SQLDBC] Columns which appear after the encrypted column in the SELECT list do not have the correct length
 - Bug: 117546 - [SQLDBC] DBACOCKPIT SQLDBC trace integration issue

## Version 2.4.126 (SP04 Takt 12, Rev 40)

### Changes

 - Bug: 210467 - [node] Value of inout clob procedure parameter lost
 - Bug: 210265 - [node] HanaProcStatement does not close result sets
 - Bug: 208719 - [node] Batch inserts with null value leading to data corruption

### Underlying SQLDBC changes

 - Bug: 212792 - [SQLDBC] Unexpected numeric overflow
 - Bug: 212269 - [SQLDBC] Support 0x80 Proxy Authentication for Cloud Connector
 - Bug: 210821 - [SQLDBC] Client crashes during connect after self-assignment of SQLDBC_ConnectProperties object
 - Bug: 210818 - [SQLDBC] Access violation while inserting empty string
 - Bug: 210341 - [SQLDBC] The SP04 converter for INTEGRAL to ASCII conversion is almost 2 times slower than the SP03 one
 - Bug: 210340 - [SQLDBC] The SP04 converter for REAL to ASCII conversion is 3 times slower than the SP03 one
 - Bug: 208245 - [SQLDBC] FDA partition-aware routing ignored partition information update
 - Bug: 201548 - [SQLDBC] secondary connections need to send SessionContext - required for workload replay
 - Bug: 177745 - [SQLDBC] improve SQLDBC handling of exceptions and OOM


# Hana Client 2.3.x Drivers


## Version 2.3.152

### Changes

 - Bug: 214413 - [node] NVARCHAR columns truncated by Connection.exec
 - Bug: 210467 - [node] Value of inout clob procedure parameter lost
 - Bug: 210265 - [node] HanaProcStatement does not close result sets
 - Bug: 200139 - [node] Segmentation fault errors in Node.js client
 - Bug: 193735 - [node] executeBatch incorrectly inserting invalid data

### Underlying SQLDBC changes

 - Bug: 212269 - [SQLDBC] Support 0x80 Proxy Authentication for Cloud Connector
 - Bug: 210818 - [SQLDBC] Access violation while inserting empty string
 - Bug: 208370 - [SQLDBC] SP03/04 is 10 times slower than SP02 on fetching data from numeric columns when the data is bound with CHAR
 - Bug: 208245 - [SQLDBC] FDA partition-aware routing ignored partition information update

## Version 2.3.144

### Changes

 - Bug: 170890 - [node] Feature request: Introduce a way to configure query timeout
 - Bug: 208719 - [node] Batch inserts with null value leading to data corruption
 - Bug: 207730 - [node] Data corruption (decimal data type) with execBatch
 - Bug: 202061 - [node] nodejs is killed by @sap/hana-client

### Underlying SQLDBC changes:

 - Bug: 212269 - [SQLDBC] Support 0x80 Proxy Authentication for Cloud Connector
 - Bug: 209416 - [SQLDBC] Much slower to fetch a value from a bool column than from a tinyint column
 - Bug: 207692 - [SQLDBC] [dbcapi] SQL strings are always assumed to be ASCII encoding
 - Bug: 205486 - [SQLDBC] Implicit XA join at prepare time
 - Bug: 204378 - [SQLDBC] Big endian client or server corruption during range partitioning
 - Bug: 180821 - [SQLDBC] improve sqldbc tracing

## Version 2.3.134

Note: This version includes node 10 support.

### Changes

 - Bug: 207088 - [node] hana-client throws error when inserting UTF8 value into NCLOB column
 - Bug: 203323 - [node] crash in ~executeBaton
 - Bug: 202025 - [node] crash in hana-client master snapshot during HRTT-service component tests
 - Bug: 201692 - [node] GetParameterValues() may return different values for queries executed using exec and execQuery
 - Bug: 200139 - [node] Segmentation fault errors in Node.js client
 - Bug: 197590 - [node] AddressSanitizer: heap-buffer-overflow in statement.cpp:644

### Underlying SQLDBC changes

 - Bug: 206695 - [SQLDBC] Always send ClientInfo APPLICATION / APPLICATIONUSER in ClientInfo
 - Bug: 205558 - [SQLDBC] Cannot set isolation level as described in docs
 - Bug: 205486 - [SQLDBC] Implicit XA join at prepare time
 - Bug: 205420 - [SQLDBC] SQL code: -10923 occurred while accessing table USR01
 - Bug: 202117 - [SQLDBC] Websocket connection to port with no listener hangs on Windows
 - Bug: 201991 - [SQLDBC] Change limit of READLOBREQUEST requested chunk size to be at most packet size - 1KB instead of 1KB*124
 - Bug: 201333 - [SQLDBC] Always cache cookies for all authentication methods
 - Bug: 201180 - [SQLDBC] Coverity failure - CID 175085 - dereference after null check
 - Bug: 199762 - [SQLDBC] result set and parameters incorrect after prepare, alter, routed execute
 - Bug: 197565 - [SQLDBC] Support 32bit fetchsize
 - Bug: 188197 - [SQLDBC] specifying hosts for multiple unrelated systems can cause issues for multiple connections

## Version 2.3.130

### Changes

 - Bug: 201050 - [node] HANA client crashes if ResultSet is closed while async next is running
 - Bug: 198780 - [node] Prepare happens twice for same statement execution (non distributed), impacts performance
 - Bug: 198599 - [node] empty DATE & TIMESTAMP causes crash/memory leak with prepared statements
 - Bug: 198300 - [node] executeQuery crashes if no parameters passed in
 - Bug: 197989 - [node] Node crashes with core dumps were found
 - Bug: 197914 - [node] nodejs application server memory increases even after drop and disconnect
 - Bug: 196801 - [node] Node driver crashes in getParameterValue
 - Bug: 186681 - [node] Fatal error when fetching a CLOB value of ~500MB

### Underlying SQLDBC changes

 - Bug: 199481 - [SQLDBC] Cursor holdability not correctly sent to the server
 - Bug: 199218 - [SQLDBC] Certain years cause DATE values to be incorrectly returned as NULL with DFV=1
 - Bug: 197444 - [SQLDBC] CSE test failures report misleading error messages
 - Bug: 197279 - [SQLDBC] Unable to lock newly created table with active distributed statement routing
 - Bug: 188197 - [SQLDBC] specifying hosts for multiple unrelated systems can cause issues for multiple connections
 - Bug: 184551 - [SQLDBC] fix Performance regression
 - Bug: 183778 - [SQLDBC] CESU-8 -> UTF-8 conversions don't work, CESU-8 isn't used in the SQLDBC protocol
 - Bug: 163009 - [SQLDBC] SQLDBC client can send out-of-date StatementContext resulting in server internal errors or incorrect transaction behaviour

## Version 2.3.123

### Changes

 - Bug: 196993 - [node] - Segmentation fault in stmt.getRowStatus()
 - Bug: 196811 - [node] - AddressSanitizer: heap-use-after-free in getResultSet()

### Underlying SQLDBC changes

 - Bug: 196981 - [SQLDBC] - Remove <CURRENT WRITE POSITION> at the end of trace file
 - Bug: 196540 - [SQLDBC] - SystemReplicationIntegrationTest testReconnectBehaviour, testBackOffTimerRetry sporadic failures
 - Bug: 195187 - [SQLDBC] - enabling autocommit with write txn "Invalid transaction state" error
 - Bug: 197118 - [SQLDBC] - Crash in SQLDBC::Connection::updateTopology
 - Bug: 189159 - [SQLDBC] - Fix "-10429: Failed to open the key store file. Opening of the Keystore failed."

## Version 2.3.122

### Changes

 - Bug: 179616 - [node] - Stream.createStatement does not support parameter bindings with an array of arrays
 - Bug: 194801 - [node] - NCLOB output parameter truncated
 - Bug: 191764 - [node] - crash in hana Node driver
 - Bug: 178638 - [node] - Expose named constants for Isolation Level
 - Bug: 186986 - [node] - HanaProcStatement: add possibility to have ColumnInfo on output tables (both output table parameters and SELECT results)
 - Bug: 183202 - [node] - Column info does not distinguish between column name and alias

## Version 2.3.121

### Changes

 - Bug: 185046 - [node] - Batch insert: specify which group has been inserted successfully and which not

### Underlying SQLDBC changes

 - Bug: 182656 - [SQLDBC] - [Decimal38, DFV=8] Performance regression (30%) in benchCppPsaloadBarrier.py (elapsed time)

## Version 2.3.120

### Changes

 - Bug: 194578 - [node] - @sap/hana-client could not be installed on Mac OS X 10.13.6 - node-gyp build fatal error: 'thread' file not found

## Version 2.3.119 (Rev 33)

### Underlying SQLDBC changes

 - Bug: 189502 - [SQLDBC] - core file produced if the OS400 version of R3trans connects to the database using the HDB client

## Version 2.3.118-ms

### Changes

 - Bug: 190151 - [node] - node driver returns incorrect values for large DECIMAL and SMALLDECIMAL types

### Underlying SQLDBC changes

 - Bug: 194315 - [SQLDBC] - Crash at PreparedStatement::getObject() if passed negative param-index
 - Bug: 191790 - [SQLDBC] - Wrong function name when using TO_VARCHAR function in GENERATED ALWAYS AS clause
 - Bug: 193427 - [SQLDBC] - Non terminated input string access overflow

## Version 2.3.117 (Rev 33 RC3)

### Underlying SQLDBC changes

 - Bug: 189511 - [SQLDBC] - Hierarchy Warning as error

## Version 2.3.115 (Rev 33 RC2)

### Changes

 - Bug: 187823 - [node] - Error message from query is truncated
 - Bug: 186963 - [node] - Procedures, output parameters with unicode characters not readable
 - Bug: 186399 - [node] - Error when using DDL Statement in dynamic SQL
 - Bug: 184557 - [node] - node driver memory leak
 - Bug: 186462 - [node] - executeBatch doesn't return error if callback function isn't provided 

### Underlying SQLDBC changes

 - Bug: 184711 - [SQLDBC] Vulnerabilities in trace files
 - Bug: 186830 - [SQLDBC] Coverity 33397, 171110

## Version 2.3.112

Note: This version contains the dependent module debug@3.1.0 and ms@2.0.0 to address security issues in those modules.

### Changes

 - Bug 184286 - Coverity CID 169674 - Resource leak in object
 - Bug 182045 - Preparing SQL statement returns error "Unhandled SQLDBC type '32'"

### Underlying SQLDBC changes

 - Bug 189083 - FDA fetch next after warning
 - Bug 189856 - error when AA hint based routing to down secondary or bad VolumeIds
 - Bug 184710 - [hdbkeystore] Imported key pairs are not validated
 - Bug 172302 - conversion error on bulk execute should fail all rows to match server behavior
 - Bug 184128 - [SQLDBC] Decrypted data and keys are not wiped
 - Bug 186707 - HE2E:H2SP4:Trying to encrypt a decimal column gets error

## Version 2.3.108

### Changes

 - Bug: 183789 - hana_client crashes when single sign-on attempted
 - Bug: 186603 - Crash in hana_node driver when using ResultSet.prototype.getData() for a NULL value

### Underlying SQLDBC changes

 - Bug: 185978 - Invalid numeric value for parameter/column (3) source type DECIMAL, target type FIXED16
 - Bug: 184670 - Batch insert with decimals does not work
 - Bug: 186968 - SQLDBC-based clients on Windows and 32-bit Linux platforms use an invalid value for a Randomly encrypted NULL for a TIMESTAMP column
 - Bug: 172302 - conversion error on bulk execute should fail all rows to match server behavior
 - Bug: 183982 - [SQLDBC] Allow override of APPLICATION / APPLICATIONUSER
 - Bug: 185435 - SQL Error "-10901 No space left in request packet" during FOR ALL ENTRIES FDA
 - Bug: 182050 - large clientinfo that fills packet causes client crash or failures
 - Bug: 184700 - node.js driver ignored databasename connect parameter
 - Bug: 184107 - [SQLDBC] WebSockets does not have a thread to return responses for ping/pong
 - Bug: 165561 - Netweaver workprocess crashes from SQLDBC

## Version 2.3.106

### Changes

 - Bug: 184700 - node.js driver ignored databasename connect parameter

## Version 2.3.102

### Changes

 - Bug: 184700 [nodejs] - Replace SQLDBC connection parameter serverDb with databasename
 - Bug: 184409 [nodejs] - HXE: SQL error while accessing data base explorer from cockpit UI
 - Bug: 182956 [SQLDBC] - SQLDBC should clear all write lobs before silent re-execution for stale metadata
 - Bug: 183012 [SQLDBC] - Support siteType connection property in the SQLDBC driver.
 - Bug: 183521 [SQLDBC] - StatementContext FlagSet now tests appropriate bit for A/A fallback
 - Bug: 180790 [SQLDBC] - Add socket timeout support
 - Bug: 182950 [SQLDBC] - Implement support for Client-side Encrypted Decimal38
 - Bug: 182230 [SQLDBC] - dfv8 error source expectation change
 - Bug: 182476 [SQLDBC] - Fetching a BOOLEAN value as string Host Type returns "TRUE" or "FALSE" instead of "1" or "0"
 - Bug: 181236 [nodejs] - Executing a DELETE statement returns undefined if the data doesn't exist, and make default CharSet=UTF-8 for node driver

The above bug fix also fixes the following bug reports:
 - Bug: 183239 - Unicode problem - HANA node.js client return wrong results "???"
 - Bug: 183364 - Error: result set has not been fetched yet when selecting an NCHAR column
 - Bug: 183368 - Unicode characters not readable when using a stream

## Version 2.3.99

### Changes

 - Bug: 172007 - WebSockets cannot reliably detect socket failures for reconnect logic 
 - Bug: 180692 - enable TLS 1.2 in openssl versions pre 1.1.0
 - Bug: 181793 - [SQLDBC] WebSockets do not support ping/pong for DBaaS

## Version 2.3.92-rel

### Changes

 - Bug: 179911 - Array type returned by Connection.execute is truncated
 - Bug: 179717 - node.js client crashes the app if a JS error happens in parallel
 - Bug: 179718  - a procedure call via createProcStatement doesn't include the object for scalar results
 - Bug: 178819 - Cannot fetch spatial types using stream

## Version 2.3.78

### Changes

 - Bug: 178841  - Resultset.getValues returns incorrect data for double/real/float

## Version 2.3.75

### Changes

 - Bug: 178226 - MDX SELECT returns no results

## Version 2.3.67

Note: This version contains HappyMake-built binaries for Linux x64.

### Changes

 - Bug: 176354 - prepared-statement.exec doesn't support parameter bindings with an array of arrays
 - Bug: 176359 - result objects of procedure calls are different in node-hdb vs. hana-client
 - Bug: 176361 - node-hdb treats undefined in parameters bindings as null, hana-client reports an error
 - Bug: 176397 - Process exits unexpectedly when 'setWarningCallback' is used
 - Bug: 174396 - DVF8 SQLDBC_SQLTypes for ODBC and DBCAPI

## Version 2.3.65-ms

### Changes

 - Bug: 175368 - Authentication fails if password contains a semicolon (;)
 - Bug: 176053 - instanceNumber connection property not supported
 - Bug: 175381 - [DBCAPI] Lob data could be truncated
 - Bug: 174309 - [SQLDBC] detect ResultSetPart overrun (DEV_ASSERTS in ResultDataIterator needed to be converted to runtime errors to prevent undefined behavior due to incorrect RESULTSET parts)

## Version 2.3.63-ms

### Changes

 - Bug: 175602 - Error when inserting zero-length stream into HANA through node client
 - Bug: 175368 - Authentication fails if password contains a semicolon
 - Bug: 175712 - Intermittent failures when inserting blobs into HANA through streams

## Version 2.3.59-ms

### Changes

 - Bug: 170723 - crash in dbcapi_get_function_code
 - Bug: 170934 - Failed Client Conti: node.js giving regex_error
 - Bug: 174161 - [DBCAPI] - DBCAPI reuses previous ResultSet bindings when fetching more results for a multi-resultset query
 - Bug: 173705 - garbage collector causes sporadic crashes
 - Enhancement: PPC BE support
 - Enhancement: Node 8 support

## Version 2.3.41

### Changes

 - Bug: 169885 - Connection pooling

## Version 2.3.40

### Changes

 - Bug: 169668 - wrong value returned from ResultSet.getValue(N)
 - Bug: 169674 - Main thread blocks when destroying a statement through garbage collector
 - Bug: 168663 - Cannot unset client info

## Version 2.3.39 (Nexus Release, Takt5)

### Changes

 - Bug: 160073 - Cannot create TLS-encrypted connection using certificate string

## Version 2.3.38

### Changes

 - Bug: 167516 - Crash if integer input parameter is given an empty string
 - Bug: 167524 - Crash when iterating an empty result set or a result set is not fully consumed
 - Bug: 167504 - No way to specify multiple hosts for connection
 - Bug: 167517 - Data type 53 incorrect in TypeCode.js
 - Bug: 167531 - Cannot determine if a Connection is connected
 - Bug: 167112 - Streaming API -- insert statement returns "undefined" result

## Version 2.3.31

### Changes

 - Bug: 162268 - statement options are not supported in statement.exec
 - Bug: 165051 - Coverity CID 140729 - Dereference before null check

## Version 2.3.28

### Changes

 - Bug: 163582 - MDX SELECT is not handled properly

## Version 2.3.27

### Changes

 - Bug: 163070 - clientsBarrier.seq fails - node4 test crashes
 - Bug: 163236 - Failed Client Conti: NodeJS crashing on master
 - Bug: 163374 - node driver returns incorrect numbers for large BIGINT
 - Bug: 163375 - node driver returns incorrect unicode strings for NCLOB

## Version 2.3.23

### Changes

 - Bug: 162924 - dbcapi crashes when fetching multiple resultsets

## Version 2.3.21 (Nexus Release, Takt 3, npm.sap.com)

### Changes

 - Bug: 162265 - end() is not available out-of-the-box



# Hana 2 SP02 Drivers


## Version 2.2.64

### Underling SQLDBC changes

 - Bug: 181384 - [SQLDBC] - LOB data got lost in batch mode if the lob data length greater than a network packet size
 - Bug: 182139 - [SQLDBC] - Error -10922 (200501) Write transaction already started on other connection in ABAP report
 - Bug: 180790 - [SQLDBC] - SDA query failure due to connection timeout error -10807 (Add socket timeout support)
 - Bug: 155895 - [SQLDBC] - Insert of timestamps as strings behaves different between cursor.execute() and cursor.executemany()
 - Bug: 182476 - [SQLDBC] - Fetching a BOOLEAN value as string Host Type returns \"TRUE\" or \"FALSE\" instead of \"1\" or \"0\"

## Version 2.2.62

### Changes

 - Bug: 178226 - [node] - MDX SELECT returns no results
 - Bug: 179911 - [node] - Array type returned by Connection.execute is truncated
 - Bug: 176397 - [node] - Process exits unexpectedly when 'setWarningCallback' is used
 - Bug: 175459 - [SQLDBC] - error message improvement for numeric overflow
 - Bug: 178841 - [node] - Resultset.getValues returns incorrect data for double/real/float
 - Bug: 178680 - [SQLDBC] - Access violation while batch-inserting BLOB-placeholder in expression
 - Bug: 180561 - [SQLDBC] - BasisClient lacks CRASH_ASSERT_* macros
 - Bug: 178819 - [node] - Cannot fetch spatial types using stream

### Underling SQLDBC changes

 - Bug: 175459 - [SQLDBC] - error message improvement for numeric overflow
 - Bug: 178680 - [SQLDBC] - Access violation while batch-inserting BLOB-placeholder in expression
 - Bug: 180561 - [SQLDBC] - BasisClient lacks CRASH_ASSERT_* macros

## Version 2.2.57

### Changes

 - Bug: 175712 - [node] - Intermittent failures when inserting blobs into HANA through streams
 - Bug: 173705 - [node] - garbage collector causes sporadic crashes
 - Bug: 175368 - [node] - Authentication fails if password contains a semicolon (;)
 - Bug: 176053 - [node] - instanceNumber connection property not supported
 - Bug: 169885 - [node] - Connection pooling

### Underling SQLDBC changes

 - Bug: 174651 - [SQLDBC] - Network compression assertions on non-rel builds on distributed system
 - Bug: 168750 - [SQLDBC] - Many transactions were blocked by record locks right after secondary replication was registered, and record locks were never released
 - Bug: 176544 - [SQLDBC] - testJtClientsDistributed table placement should be default

## Version 2.2.53

### Changes

 - Bug: 170723 - [node] - crash in dbcapi_get_function_code
 - Bug: 169885 - [node] - Connection pooling

### Underling SQLDBC changes

 - Bug: 170954 - [SQLDBC] - The second part can be off by a second for the timestamp output param in a procedure call
 - Bug: 171387 - [SQLDBC] - Trace content removal too aggressive
 - Bug: 174788 - [SQLDBC] - Statement routing not working for batch updates if 1-level part. key in the set-clause
 - Bug: 168697 - [SQLDBC] - DLL Autocommit setting will get lost on reconnect
 - Bug: 163336 - [SQLDBC] - General error;600 failed routed execution: anchor is switched in runtime: line 0 col 0 (at pos 0) after topology changed on SDA source site
 - Bug: 171093 - [SQLDBC] - SQL level tracing should imply DISTRIBUTION tracing but does not
 - Bug: 174161 - [SQLDBC] - DBCAPI reuses previous ResultSet bindings when fetching more results for a multi-resultset query

## Version 2.2.39 (included in Rev 24 ; 2.00.024)

### Changes

 - Bug: 169668 - wrong value returned from ResultSet.getValue(N)
 - Bug: 169674 - Main thread blocks when destroying a statement through garbage collector
 - Bug: 168663 - Cannot unset client info

## Version 2.2.37

### Changes

 - Bug: 160073 - Cannot create TLS-encrypted connection using certificate string
 - Bug: 167516 - Crash if integer input parameter is given an empty string
 - Bug: 167524 - Crash when iterating an empty result set or a result set is not fully consumed
 - Bug: 167504 - No way to specify multiple hosts for connection
 - Bug: 167517 - Data type 53 incorrect in TypeCode.js
 - Bug: 167531 - Cannot determine if a Connection is connected
 - Bug: 160073 - Cannot create TLS-encrypted connection using certificate string
 - Bug: 167112 - Streaming API -- insert statement returns "undefined" result

## Version 2.2.35 (included in Rev 23 ; 2.00.023)

### Changes

 - Bug: 162268 - statement options are not supported in statement.exec
 - Bug: 165051 - Coverity CID 140729 - Dereference before null check
 - Bug: 163582 - MDX SELECT is not handled properly
 - Bug: 163070 - clientsBarrier.seq fails - node4 test crashes
 - Bug: 163236 - Failed Client Conti: NodeJS crashing on master

## Version 2.2.34

### Changes

 - Bug: 163374 - node driver returns incorrect numbers for large BIGINT
 - Bug: 163375 - node driver returns incorrect unicode strings for NCLOB
 - Bug: 160968 - Failed Client Conti: ADO.NET - ColumnMapping tests fail sporadically but often

## Version 2.2.31

### Changes

 - Bug: 162924 - dbcapi crashes when fetching multiple resultsets

## Version 2.2.28 (included in 2.00.022)

### Changes

 - Bug: 162265 - end() is not available out-of-the-box
 - Bug: 160083 - Writing a stream from an HTTP IncomingMessage hangs
 - Bug: 160422 - Writing a stream that is not an instance of Readable crashes
 - Bug: 156392 - crash in ResultSet.getValues()
 - Bug: 159735 - Need to know total number of rows returned without fetching each one
 - Bug: 159649 - crash in getInputParameters
 - Bug: 160416 - Need a way to close a stream early

## Version 2.2.27

### Changes

 - Bug: 154982 - clients.seq fails - node tests on Windows fail with RC = 65280
 - Bug: 156105 - executing procedure call with CLOB output parameter very slow
 - Bug: 156119 - How to insert data from a stream
 - Bug: 150587 - cannot call stored procedures with named parameters

## Version 2.2.25 (included in 2.00.021)

### Changes

 - Bug: 156388 - Readable streams are not implemented correctly
 - Bug: 156389 - ResultSet.close() is not available as an async method
 - Bug: 156133 - Cannot determine if a statement was dropped
 - Bug: 156146 - INOUT parameter gets wrong value and type, depending on input parameter type
 - Bug: 155535 - If no parameters passed to stmt.execQuery, cannot get output parameter values
 - Bug: 156386 - ResultSet.getValues() crashes if connection was closed
 - Bug: 153647 - wrong number of arguments in callback from exec for DDL
 - Bug: 153657 - passing too many parameters should return an error
 - Bug: 153674 - getParameterValue for boolean type returns invalid value

## Version 2.2.24

### Changes

 - Bug: 153503 - params for statement.exec (and connection.exec) should not include output parameters
 - Bug: 153506 - Cannot get value for output parameter if no input param provided
 - Bug: 153656 - cannot get value from inout parameter
 - Bug: 153683 - setClientInfo() doesn't work as expected

## Version 2.2.22 (included in 2.00.020)

### Changes

 - Bug: 152564 -  Error doesn't have stack trace

## Version 2.2.20 (initial version)

### Changes

 - Bug: 152218 - wrong number of arguments in callback of connect
 - Bug: 150564 - "No more result" error
 - Bug: 150561 - wrong number of arguments in callback from commit and rollback
 - Bug: 150546 - crash in Connection::setClientInfo()
 - Bug: 150165 - getParameterValue doesn't work
 - Bug: 148776 - node.js client crashes when used in generic-pool with connections in parallel
 - Bug: 148128 - Exception from ExecuteReader when executing select with long case block
 - Bug: 145975 - warnings are (sometimes) fatal
 - Bug: 145953 - APIs are too picky
 - Bug: 145974 - Column metadata unavailable outside of the streaming interface
 - Bug: 145971 - Need isClosed() function on a streaming ResultSet
 - Bug: 145970 - need access to parameter metadata
 - Bug: 145976 - data type codes do not align with protocol/node-hdb
