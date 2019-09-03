# Change Log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Unreleased

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
