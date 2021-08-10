## 4.1.0
Features:
- Node 16.x support
- hana-client 2.9.x support

Removed:
- Node 8.x and 10.x support

## 4.0.2
Features:
- hana-client 2.8.x support

## 4.0.1
Fixes:
- Cleanup package.json

## 4.0.0
Changes:
- Moved hana-client from dependencies to peerDependencies, supported are versions 2.7.x

## 3.0.2
Features:
- Use hana-client 2.7.21

## 3.0.1
Fixes:
- Correctly remove devDependencies and integrity hashes from npm-shrinkwrap.json

## 3.0.0
Features:
- Use hana-client 2.7.16
- Node 14.x support

Removed:
- Node 6.x support

## 2.2.7
Fixes:
- Renamed developer-license-3.1.txt to LICENSE

## 2.2.6
Features:
- Use hana-client 2.4.202

## 2.2.5
Features:
- Use hana-client 2.4.182
- Node 12.x support

## 2.2.4
Features:
- Use hana-client 2.4.162

## 2.2.3
Features:
- Use async 3.1.0 - removes lodash dependency

## 2.2.2
Features:
- Updated dependencies
- Node 10.x support

## 2.2.1
Fixes:
- Fixed bug that caused errors to be reported, even though only warnings occurred

## 2.2.0
Features:
- Partially apply arguments and return function if no callback is supplied

## 2.1.2
Features:
- Updated dependencies

## 2.1.1
Fixes:
- Error with npm-shrinkwrap.json

## 2.1.0
Features:
- Added quoting of schema names
- Switched from hdb to the official @sap/hana-client

## 2.0.3
Fixes:
- Locking now uses a second connection
- Improved typeCheck to correctly detect arrays when using the API with xsjs

## 2.0.2
Features:
- Passes a complete credentials object to the hdb driver, which allows passing additional parameters to the hdb connection.
- Allows all instances of Readable as content for FileWithContent or FolderWithContent

Fixes:
- Fixed a spelling error in ResultTuple

## 2.0.1
Fixes:
- Fixed a type check error when passing an empty array as parameter

## 2.0.0
Features:
- Provides access to the Container Group API
- Clearer split between the APIs, different classes for SYS_DI, Container and Container Group API
- Removed dependency on async library
