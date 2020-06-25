# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

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

