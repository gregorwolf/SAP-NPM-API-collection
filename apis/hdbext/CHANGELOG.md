# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

<a name="8.0.8"></a>
## 8.0.8 - 2024-10-23

### Updated
- Added Hana Cloud support to createConnection and createConnectionPromise
- Update *@sap/hana-client* to 2.22.29

<a name="8.0.7"></a>
## 8.0.7 - 2024-09-18

### Updated
- Update *async* to 3.2.6

<a name="8.0.6"></a>
## 8.0.6 - 2024-07-08

### Updated
- Update *@sap/hana-client* to 2.21.28
 
<a name="8.0.5"></a>
## 8.0.5 - 2024-06-14

### Updated
- Update *@sap/hana-client* to v2.20.23

<a name="8.0.4"></a>
## 8.0.4 - 2024-05-29

### Updated
- Update *@sap/hana-client* to v2.20.22

<a name="8.0.3"></a>
## 8.0.3 - 2024-01-23

### Updated
- Update *@sap/hana-client* to v2.19.21

<a name="8.0.2"></a>
## 8.0.2 - 2023-11-28

### Added
- Added Node.js 20.x support.

### Updated
- Update *@sap/hana-client* to v2.18.27
- Update *@sap/e2e-trace* to v4.1.0
- Updated versions of dev dependencies node modules
- Replaced *options.hasOwnProperty(prop)* by *Object.prototype.hasOwnProperty.call(obj, prop)*
- Replaced *istanbul* with *nyc* for test script as *istanbul* is deprecated
- Replaced Buffer() with Buffer.from() and Buffer.alloc() as Buffer() is deprecated

### Fixed
- Replaced deprecated function of *@sap/hana-client* library - createClient and close with createConnection and disconnect respectively.

<a name="8.0.1"></a>
## 8.0.1 - 2023-11-14

### Updated
- Update *@sap/hana-client* to v2.18.24

<a name="8.0.0"></a>
## 8.0.0 - 2023-08-30

### Removed
- Removed support node.js 10 

<a name="7.7.6"></a>
## 7.7.6 - 2023-07-18

### Updated
- Update *@sap/hana-client* to v2.17.21
  
<a name="7.7.5"></a>
## 7.7.5 - 2023-06-20

### Updated
- Update *@sap/hana-client* to v2.17.14

<a name="7.7.4"></a>
## 7.7.4 - 2023-05-03

### Updated
- Update *@sap/hana-client* to v2.16.26

<a name="7.7.3"></a>
## 7.7.3 - 2023-03-27

### Updated
- Update *@sap/hana-client* to v2.16.21

### Removed 
- Removed support node.js

<a name="7.7.2"></a>
## 7.7.2 - 2023-01-24

### Fixed
- Fixed `hdbext.createConnectionPromise` add connection as first param

<a name="7.7.1"></a>
## 7.7.1 - 2023-01-10

### Updated
- Update *@sap/hana-client* to v2.15.19

### Fixed
- `checkSynonymsPromise` now returns in case result is not a synonym

<a name="7.7.0"></a>
## 7.7.0 - 2022-11-01

### Added
- Node.js 18.x support.

<a name="7.6.9"></a>
## 7.6.9 - 2022-10-28

### Added
- `hdbext.loadProcedurePromise` promise-based behavior which supports async / await syntax. 

<a name="7.6.8"></a>
## 7.6.8 - 2022-10-19

### Fixed
- `hdbext.createConnectionPromise` now returns connection

<a name="7.6.7"></a>
## 7.6.7 - 2022-10-17

### Added
- `hdbext.createConnectionPromise` promise-based behavior which supports async / await syntax.

### Updated
- Update *@sap/hana-client* to v2.14.22

<a name="7.6.6"></a>
## 7.6.6 - 2022-09-23

### Updated
- Update *@sap/hana-client* to v2.14.18

<a name="7.6.5"></a>
## 7.6.5 - 2022-07-20

### Fixed
- Update *@sap/hana-client* to v2.13.22

<a name="7.6.4"></a>
## 7.6.4 - 2022-05-03

### Fixed
- Update *@sap/hana-client* to v2.12.20

<a name="7.6.3"></a>
## 7.6.3 - 2022-04-13

### Fixed
- Update async to v3.2.2

<a name="7.6.2"></a>
## 7.6.2 - 2022-02-24

### Fixed
- Update update package.json version

<a name="7.6.1"></a>
## 7.6.1 - 2022-02-23

### Fixed
- Update *@sap/hana-client* to v2.11.20

<a name="7.6.0"></a>
## 7.6.0 - 2022-27-01

### Added
- Node.js 16.x support.

<a name="7.5.0"></a>
## 7.5.0 - 2021-12-16

### Fixed
- Update *@sap/hana-client* to v2.11.14

<a name="7.4.1"></a>
## 7.4.1 - 2021-11-23

### Fixed
- Update *@sap/hana-client* to v2.10.20

<a name="7.4.0"></a>
## 7.4.0 - 2021-10-04

### Fixed
- Update *@sap/hana-client* to v2.10.13

<a name="7.3.1"></a>
## 7.3.1 - 2021-08-06

### Fixed
- Update *@sap/hana-client* to v2.9.28

<a name="7.3.0"></a>
## 7.3.0 - 2021-07-19

### Fixed
- Update *@sap/hana-client* to v2.9.23
- Update *debug* to v4.3.1

<a name="7.2.0"></a>
## 7.2.0 - 2021-05-07

### Fixed
- Update *@sap/hana-client* to v2.8.20

<a name="7.1.4"></a>
## 7.1.4 - 2021-03-16

### Fixed
- Update *@sap/hana-client* to v2.7.26

<a name="7.1.3"></a>
## 7.1.3 - 2021-02-22

### Fixed
- Update *lodash* to v4.17.21

<a name="7.1.2"></a>
## 7.1.2 - 2021-02-19

### Fixed
- Update *@sap/hana-client* to v2.7.23

<a name="7.1.1"></a>
## 7.1.1 - 2021-01-28

### Fixed
- Update *@sap/hana-client* to v2.7.21
- In StoredProcedure.js createTempTables, use async.eachLimit to avoid races

<a name="7.1.0"></a>
## 7.1.0 - 2021-01-05

### Fixed
- Update *@sap/hana-client* to v2.7.16, debug to 4.2.0 and *@sap/e2e-trace* to 3.0.0

### Added
- Node.js 14.x support.

<a name="7.0.1"></a>
## 7.0.1 - 2020-10-21

### Fixed
- Update *@sap/hana-client* to v2.6.58, debug to 4.1.1 and lodash to 4.17.20

<a name="7.0.0"></a>
## 7.0.0 - 2020-07-13

### Fixed
- Update *@sap/hana-client* to v2.5.104, async to 3.2.0 and lodash to 4.17.19

### Removed
- Node.js 6 support

<a name="6.2.2"></a>
## 6.2.2 - 2020-04-29

### Fixed
- Update *@sap/hana-client* to v2.4.196

<a name="6.2.1"></a>
## 6.2.1 - 2020-04-15

### Fixed
- Do not drop statement objects in the background in order to prevent IsGlobalEmpty crash

<a name="6.2.0"></a>
## 6.2.0 - 2020-03-06

### Added
- Node.js 12.x support.

<a name="6.1.1"></a>
## 6.1.1 - 2019-11-19

### Fixed
- Update *@sap/hana-client* to v2.4.167

<a name="6.1.0"></a>
## 6.1.0 - 2019-10-25

### Added
- Support for synonyms as table parameters in procedures

<a name="6.0.1"></a>
## 6.0.1 - 2019-07-10

### Fixed
- Update `lodash` package to 4.17.13

<a name="6.0.0"></a>
## 6.0.0 - 2019-05-20

### Removed
- Node 4 support
- Stored procedures: caching of prepared CALL statements for simple procedures

### Fixed
- Statement leak due to caching of prepared CALL statements for simple procedures
- Update *@sap/hana-client* to v2.4.139

### Added
- Node.js 10 support

## 5.1.0 - 2019-01-11

### Added
- Support for `hostname_in_certificate`, `validate_certificate`, `client_authentication_certificate`, `client_authentication_private_key` properties from HANA service binding

### Fixed
- Check for non-existing procedure

## 5.0.0 - 2018-09-27

### Removed
- Node 0.12 support.
- The `constants` property.
- The `getPool` property.
- The `createPool` property.
- The `updateConnectionOptions` property.
- The `session` property is no longer considered for setting session variables.

### Changed
- Now the package provides convenient functions on top of the *@sap/hana-client* package instead of the *hdb* package.
- The package expects schema and table names to be provided unescaped everywhere, e.g. `my"TABLE` instead of `"my""Table"`.
- A string containing a table name and optionally a schema name is no longer accepted for input table parameters. An object with `table` property (mandatory) and `schema` property (optional) should be provided instead, e.g. `{ schema: 'my"Schema', table: 'my"Table' }`
- `hdbext.createConnection` throws if the input is not an object.
- `hdbext.createConnection` throws if provided value for `autoCommit` is not a boolean.
- Format of the object returned from `hdbext.connectionOptions.getGlobalOptions`, from `{ session: { APPLICATION: '', APPLICATIONVERSION: '' } }` to `{ 'sessionVariable:APPLICATION': '', 'sessionVariable:APPLICATIONVERSION': '' }`
- `hdbext.connectionOptions.getGlobalOptions` may return an object without a `'sessionVariable:APPLICATIONVERSION'` property if an appropriate value cannot be determined.
- Format of the object returned from `hdbext.connectionOptions.getRequestOptions` from `{ session: { XS_APPLICATIONUSER: '', SAP_PASSPORT: '', locale: '' } }` to `{ 'sessionVariable:XS_APPLICATIONUSER': '', 'sessionVariable:SAP_PASSPORT': '', locale: '' }`
- `hdbext.connectionOptions.getRequestOptions` may return an object without a `locale` property if an appropriate value cannot be determined.
- `hdbext.middleware` no longer takes pool options as second argument.
- `hdbext.middleware` does not work with pooled connections by default.

## 4.7.5 - 2018-09-18

### Fixed
- Update `lodash` package to 4.17.11

## 4.7.4 - 2018-07-27

### Fixed
- Passing a Buffer as a single input argument for a procedure

## 4.7.3 - 2018-06-29

### Fixed
- Updated `hdb` package to 0.16.0

## 4.7.2 - 2018-04-03

### Fixed
- Do not call `setImmediate` when invoking stored procedures

## 4.7.1 - 2018-03-30

### Fixed
- Update dependencies
- Implicit commit when procedure with input table parameters is executed
- Cleanup of global temporary tables when a connection is returned to a pool
- Local temporary tables are now dropped without CASCADE
- Names of temporary tables are now properly escaped during cleanup of connections returned to a pool
- Prepared statement leak when calling a procedure without input table parameters and without parameters having a default value

## 4.7.0 - 2018-01-19

### Added
- npm-shrinkwrap.json

## 4.6.0 - 2018-01-12

### Added
- Support for `servername` option on connect

### Fixed
- Error when `authInfo` is missing `getGrantType` property
- Minimum idle connections is now 0

## 4.5.0 - 2017-11-23

### Added
- Stored procedures: support for default parameters

### Fixed
- Update dependencies

## 4.4.3 - 2017-10-12

### Added
- Support for Node.js 8

### Fixed
- Prevent using a client object that has been returned to the pool
- Update dependencies

## 4.4.2 - 2017-07-17

### Fixed
 - Client credentials token now doesn't throw error

## 4.4.1 - 2017-07-04

### Fixed
 - Allow pool release to be called only once

## 4.4.0 - 2017-06-30

### Added
 - Support for synonyms for procedures
 - Expose generic-pool object

### Fixed
 - Return only non-busy connections to pool
 - Additional options leaks in getPool
 - Fixes in passing input arguments as Array
 - Fixed passing `null` as single input argument

## 4.3.4 - 2017-05-02

### Fixed
 - Close connection if authentication fails
 - Handle `null` for procedures with input table parameters

## 4.3.3 - 2017-04-04

### Fixed
 - Support for INOUT parameters in stored procedures

## 4.3.2 - 2017-03-10

### Fixed
 - Report error if temp table delete fails
 - Updated hdb module to 0.12.1

## 4.3.1 - 2017-02-23

### Fixed
- The `locale` property in the object returned by `connOptions.getRequestOptions` now defaults to undefined instead of to an empty string when there is no language info in the provided request

## 4.3.0 - 2017-01-26

### Added
- Introduce pool.drain - a function to dispose of idle connections

### Fixed
- Log on level 'debug' in case of 'insufficient privilege' error during clean-up of temporary tables

## 4.2.3 - 2017-01-24

### Changed
- Rename package to use @sap scope

## 4.2.2 - 2017-01-24

### Fixed
- Clean-up temporary tables on connection release
- Fixes in procedures and inplace table parameters

## 4.2.1 - 2016-12-07

### Fixed
- `middleware` and `connOptions.getRequestOptions` now update SAP-Passports automatically with default component data

## 4.2.0 - 2016-11-16

### Added
- Make options optional in `pool.acquire`

### Fixed
- Quote name in set schema statement
- Rollback transaction before isolation level restore
- Support for multiple middlewares
- Allow calling a procedure with inplace table parameter
- Fix crash on connect

## 4.1.3 - 2016-10-14

### Fixed
- Fixes in database connectivity

## 4.1.2 - 2016-09-28

### Fixed
- Handle websocket connection end.
- Set DB connection locale from HTTP request in middleware.

## 4.1.1 - 2016-09-15

### Added
- Rollback of uncommitted changes when a connection is returned to a connection pool.

## 4.1.0 - 2016-09-14

### Added
- `autoCommit` connection option
- Set APPLICATION and APPLICATIONVERSION session variables in the middleware
- `connectionOptions.getGlobalOptions()` and `connectionOptions.getRequestOptions(req)` functions

## 4.0.0 - 2016-09-09

### Added
- `session` property in database connection options
- `certificate` property in database connection options

### Removed
- `sapPassport` property in database connection options, use `session.SAP_PASSPORT` instead.
- `userTokens` property in database connection options, use `session.XS_APPLICATIONUSER` instead.
Now a single token is expected.

## 3.0.0 - 2016-08-05

### Changed
- Removed additional functions attached to the returned HDB connection object (incompatible change).
  In previous versions the returned connection object was enriched with the following functions:
    - setSchema
    - setApplicationUser
    - unsetApplicationUser

  Those functions have been removed and we have provided a new function `updateConnectionOptions` instead,
  to be used as utility for setting the supported connection options.

- Read HANA service properties from environment as fallback if no HANA config provided has been removed.

- HANA config object no longer supports setting `userTokens` as string, it must be an object.

- Connection pooling API was changed incompatibly to fix issues with connection cleanup.

