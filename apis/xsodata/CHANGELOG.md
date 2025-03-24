# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

## [8.2.1] - 2025-03-21

* FOSS related security updates

## [8.2.0] - 2024-10-23

* Add support for Node 22

## [8.1.3] - 2024-10-03

* FOSS related security updates

## [8.1.1] - 2023-11-30

* Add support for node 20
* Remove support for node 14
* Remove support for node 16
* Update dependencies
* Security fix - update @sap/xssec library to version 3.6.0

## [8.1.0] - 2023-02-20
* Add support Node.js 18
* Update node module dependencies

## [8.0.2] - 2023-01-30

* Security fix - update @sap/xssec library to version 3.2.17.

## [8.0.1] - 2022-09-13

* remove node 12 support

## [8.0.0] - 2022-08-04

* HANA Cloud database support added
* Public synonym support added
* Update node module dependencies

## [7.5.5] - 2022-04-21

* On calc view: Stable sort order with $skip and $top usage for subsequent requests via "order by" of key fields in SQL statement

## [7.5.4] - 2022-04-21

Build infrastructure fix

## [7.5.1] - [7.5.3] - 2022-04-20

Build infrastructure fixes

## [7.5.0] - 2022-03-22

* Support of node version 16
* Update module dependencies
* Update of system query options and xsodata-settings help text
* Minor changes: Error reporting

## [7.4.5] - 2021-12-15

* Suppress $metadata annotation <code>sap:aggregation-role="dimension"</code> on calculation view property if it is used as description property referenced by annotation <code>sap:text</code> by another property of the calulation view. The annotation is only supressed if the corresponding xsodata-file has <code>settings</code> containing this: <code>noDimensionAnnoOnTextProperty true;</code>
* Improvements on URI parsing errors:
  * reporting URI resource path character position on parsing error, if possible
  * Invalid navigation property on <code>$expand</code> system query option returns 400 (Bad Request) instead of 500 (Internal Server Error)
* Removed support for NodeJS version 10

## [7.4.4] - 2021-07-20

* HANA client API usage changed: 'execQuery' used for read requests, change requests remain on 'exec'

## [7.4.2] - 2021-05-05

* Quote reserve for calcview "in" formula
* node version support: 10, 12, 14

## [7.3.7] - 2021-02-24

### Fixed

For Edm.String typed properties, all single quotes must be preserved.

## [7.3.5] - 2020-11-23

### Fixed

Authorization header parsing conform to RFC6750

## [7.3.4] - 2020-10-14

### Fixed

add "return" before asynDone to avoid "Callback was already called" errors when "dataCollector* classes" are called

## [7.3.3] - 2020-10-01

### Fixed

Commit on drop of temporary tables added.


## [7.3.2] - 2020-09-30

## [7.3.1] - 2020-09-29

### Changed

* Improved error messages.

## [7.3.0] - 2020-09-15

* Aggregation for "count":
  * For explicit application the aggregation type "count" was not supported in the xsodata file. When
    "aggregates always (COUNT of "Amount");" was used, a syntax error was thrown.
  * For implicit aggregation, where the aggregation information is loaded from the calcviews measures (e.g.
    using "aggregates always;" without a property list in the *.xsodata file), wrongly "avg" was used as measure
    type instead of "count".
  * With this fix aggregation type "count" is now properly supported
    * For explicit application: "aggregates always (COUNT of "Amount");"
    * For implicit aggregation: calcview measures "count" and "avg" are now supported property

* Fix: If a temporary table is not properly dropped by the DB, a second drop step is performed to avoid errors
    when recreating the table.

## [7.2.0] - 2020-08-19

* Improve logging infrastructure

## [7.1.0] - 2020-08-11

* OData type Edm.Time is mapped to hana types 'TIME' (due to backward compatiblity) which stores only hour, minutes
  and seconds, so only the uri format **time'PT0H0M0S'** was supported. With this fix also the full representation
  like time'P2010Y12M30DT01H02M03S' can be used (some UIs generated it) if the parts of year, mounth and day are zero.

* Fix for missing annotations (e.g. "sap:label") if an calcview without input parameters is exposed as normal view
  (this is without the "parameter via" keyword in the xsodata file)

* Fixes for create, update, delete operations via user-exits on calculation views without input parameters.
  Please note: if the input parameters are omitted and "via keys" is used, then the input parameter must be set in
  the exit functions since they are rendered in the output.

* Explicitly drop prepared statements immediately instead at request end

## [7.0.3] - 2020-06-30

### Added
- license file: developer-license-3.1.txt

## [7.0.2] - 2020-05-18

* Add support for create, update, delete operations via user-exits on calculation views without input parameters.
  Work for both, calculation views without input parameters exposed as normal view and exposed as calcview.

## [7.0.1] - 2020-05-12

* Add support for calculation views without input parameters.
  Before release 7.0.0 calcviews without input parameters have not been supported, but worked accidentally if a calcview
  was wrongly exposed as normal view. After the major release 7.0.0 this wrong exposure of a calcview resulted in an error.
  Because calcviews without input parameters are used more often, the support for this calcviews is now supported.
  You can either expose a calcview as normal view or as proper calcview, for the latter an input parameter entityset with
  parenthesis must be used.

## [7.0.0] - 2020-04-23

* Add support for NodeJS version 12
* Removed support for NodeJS version 6
* Fix bug when using a view with explicit key in combination with concurrency token using default properties for ETag.
  Now key properties are not considered for etag generation as written in the "SAP HANA Developer Guide":
  _If you specify concurrency token only, then all properties, except the key properties, are used to calculate
  the ETag value. If you provide specific properties, then only those properties are used for the calculation._

## [6.2.1] - 2020-03-05

* fixes in release process

## [6.1.0] - 2020-03-05

* fixes in release process

## [6.0.0] - 2020-03-05

* Add support for LTS Node.js version 12 and 10
* Support for create/update/delete requests on calculation views if "parameter via keys" definition is used.
Requirements:
    * input parameters in the calculation view of type ALPHANUM, BLOB, DECIMAL, NVARCHAR, VARBINARY, VARCHAR must have length restriction
    * input parameters in the calculation view of type DECIMAL must have scale restriction
    * all key semantics also apply to keys coming from input parameters
* **IMPORTANT** By default, now a maximum body size of "10mb" per request is allowed. More payload leads to an "413 Payload Too Large" error. This value of 10mb can be changed with the odata settings in the *.xsodata file
[see **XSOdata Settings**](/documentation/xsodataSettings.md)

## [5.0.0] - 2019-12-17

### Info

* Removed lock when opening a db connection
  The new native hana-client driver used by xsjs is thread save, so the lock for retrieving a new db connection is not required anymore.
  **IMPORTANT** If a custom open function is used, then this function must be reentrant or implement an own lock inside.

### Fixed

* When using $count to determine the number of records of an entity set in junction with the limit feature, the
returned number was also capped by the limit, this was wrong. Now the correct full number of records is returned.
* Fixed typeError if a stored procedure used as custom exit does not return a proper error structure.

## [4.7.0] - 2019-10-28

### Fixed

Fixed error causing duplicate properties and property references in the metadata document. Prerequisites:
* The error occurs if an calculation view has been used as source for an entityset
* This calculation view contains an input parameter which is used in more than one measures
* Example: Input parameter "Input_Currency" (a calcview variable) is used in the currency conversion for the measures "VALUE" and "TAX"

## [4.6.0] - 2019-10-11

### Fixed

Fixed error "Error while executing a DB query" when using an navigation property to navigate from a calculation view to an related entity.

## [4.5.4] - 2019-08-26

### Info

- Update module dependencies

## [4.5.3] - 2019-08-26

### Info

- Update module dependencies

## [4.5.1] - 2019-08-23

### Info

- Updated documentation

## [4.5.0] - 2019-08-23

### Info

- Update module dependencies
- Adopt to new async behaviour
- Adopt to new calcview metadata

### Fixed

- Fix bug in error case (duplicate call of callback)


## [4.4.0] - 2019-01-25

- Update module dependencies
- The code field inside an OData error response (error.code) is now correctly send as string (not as number)
- For calcviews the columns type length is determined from the COLUMN_SQL_TYPE if LENGTH is not set.
- Fixed error while parsing multipart/mixed batch requests

## [4.3.0] - 2018-10-19

### Info

- Minimal required @sap/hana-client version is 2.3.123
- Improved test exits
- **IMPORTANT** Conversion: When converting TIMESTAMP db type to OData V2 json payload, only the first 3 digits
 of the fractional part are used (OData V2 type DateTime does only supports millisecond precision). With the old
 hdb db driver the xsodata library got already only millisecond precision, with the new hana-client db-driver the xsodata
 library itself has to remove any digits and use only the millisecond part. The check if the digits for micro- or nanoseconds
 are zero and throwing an error if not (added with release 4.0.0) has been removed due to backward  compatibility reasons.

## [4.2.0] - 2018-09-18

### Changed

- Upgraded lodash module dependency to 4.17.11

## [4.1.0] - 2018-08-31

### Added

- Write memory consumption to log if requested

### Fixed

- Improve cleanup of temporary tables

## [4.0.0] - 2018-08-15

### Added

- **IMPORTANT**|**INCOMPATIBLE** Added limit feature to restrict the amount of records loaded from the database.
  There are defaults for the limit values [see **XSOdata Settings**](/documentation/xsodataSettings.md) which need to
  be validated before using this version.
- Support for hana-client database connector
- **IMPORTANT**|**INCOMPATIBLE** Switched default database connector from hdb to hana-client
  [see **Database connector**](/documentation/db.md)

### Fixed

- Use always the original DB property ordering when copying data into temporary tables for use
in exits in the insert and update steps.


## [3.7.0] - 2018-05-22

### Fixed

- Update dependencies

## [3.6.7] - 2018-05-18

### Fixed

- Extended DB-Version check to avoid unnecessary cleanup of temporary tables (added new db versions)
- Allow throwing an Error object in custom exits

## New features with xsodata 3.6.0:

### Fixed

- Extended DB-Version check to avoid unnecessary cleanup of temporary tables
- Commands for cleanup of temporary tables don't stop the request processing if tables are truncated/dropped already
- Fixed error which leads to an unclosed db connection. This error occurred only if
   - the xsdata library is used without the xsjs layer (which is not recommended) and
   - the db connection information was provided via host, port, user,... to the OdataHandler
   - as request options for the processRequest method a string containing the uriPrefix is used
   (not an RequestOptions object).
   - $batch processing is used
- Fixed wrong decoding of OData strings of type Edm.String in $filter and $orderby expressions if the string contained
exactly one single quote (e.g. '''' have been decoded wrongly to Json "" not to the correct "'")
- Parsing milliseconds for Edm.DateTime works now as expected for hana column type TIMESTAMP.
  Sample: HANA value "9999-12-31T23:59:59.99" is parsed now to have 990 ms instead of just 99ms

### Changed

- Upgraded @sap/xssec module dependencies

## New features with xsodata 3.5.0:

### Fixed

- Proper pattern escaping for substringof, startswith and endswith operations on $filter or $orderby.
- Fixed SQL error when retrieving the row count of calculation views with transparent filters.

### Added:

- Added new SQL error class to pass all errors related to DB query execution

## New features with xsodata 3.4.0:

### Added:

- Support for points "." in HANA table column names and consistently in OData property names.
  This feature has been added for backward compatibility reasons only. The OData V2 specification does not allow the usage
  of points for property names as points are used to separate namespace parts and names.
  So please consider not using it.

### Changed

- Upgraded @sap/xssec and @sap/xsenv module dependencies

## New features with xsodata 3.3.0:

### Fixed:

- Removed failing sql calls to cleanup temporary tables, which become unnecessary with db patch 2.00.030.00.1515544046.
- Numbers of type Edm.Int64 must be represented as string (e.g. "123") in json format even if they are within in the range of JS Number.

## New features with xsodata 3.0.0:

### Added

- Support Node.js 4.x.x, 6.x.x and newly 8.x.x

### Changed

- Updated dependencies
- Improved content id handling in batch requests

### Fixed

- Fixed conversion of binary data if generated key are used

### Removed

- Removed support for Node.js 0.12.9

## New features with xsodata 2.4.0:

### Added

- Add "hints" setting to xsodata file definition to provide custom hints for SQL-select

## New features with xsodata 2.3.0:

### Added

- Before/After commit exits also called for non batch modifications
- Improved cleanup of temporary tables
- Improved error message when using key property with point '.'
- Rollback performed also for non batch modifications

### Changed

- Updated dependencies

### Fixed

- Fixed __metadata Uri in payload: name/value key pairs are now correct

## Modifications with SAP HANA XSA 2.0 SPS 2:

### Added

- Request specific logging
- I18N support for language specific metadata, e.g. labels in annotations
- Update of Open Source libraries

### Fixed

- Several smaller bug fixes

## Modifications with SAP HANA XSA 2.0 SPS 1:

### Added

- Switch to scoped package name @sap/xsodata
- Support for node.js version 4.X.X & 6.9.X

## New Features with SAP HANA XSA 2.0 SPS 0:

### Added

- [Annotations in metadata](/documentation/annotations.md)
- [Scope based authorization checks](/documentation/authorization.md)
- Support for node.js version 4.4.X & 6.2.X

## New Features with SAP HANA XSA SPS 12:

### Added

- Support for $links requests
- Custom exits for $links requests (modification requests only)
- Support for node.js version 0.12.X & 4.4.X
