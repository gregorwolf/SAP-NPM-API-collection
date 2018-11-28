# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.4.0] - 2018-09-13
Added:
- .dwfdlmtablegroup - the design time artifact for modeling text, where the content of the file can be any valid text
- .dwfndso - the design time artifact for modeling text, where the content of the file can be any valid text

Fixed:
- .dwfnamespace - calculation and handling

## [2.3.0] - 2018-03-05
Added:
- Released for DWF 2 SP03

Fixed:
- changelog - complies with the 'Keep a Changelog' format
- Requires engine ^6.9.1

## [2.2.4] - 2017-09-07
### Fixed
- .dwfnamespace - fixed calculation, will require redeploy

## [2.2.3] - 2017-08-15
### Fixed
- license – shall have no license

## [2.2.2] - 2017-08-11
### Fixed
- trace - the version of the module
- repository - properly to update the providers and object types

## [2.2.1] - 2017-06-29
### Fixed
- minor fixes
- dwfdlmprofile - aligns with the general requirements for deployment of design time artefacts
- log and trace - handles better the sensitive data
- verbose - traces the details of the request and response

## [2.2.0] - 2017-05-30
### Added
- .dwfnamespace - schema validation
- repository - persists the calculated hash in the object instance
- dwf-template - removes the open source dependencies that are required for its Backend module, because they shall be made available via the dwf-dws-client
- .dwftaskchain -  delta-deployment

## [2.0.3] - 2017-03-21
### Fixed
- dwf-template - bumps the versions of express and body-parser

## [2.0.2] - 2017-03-21
### Fixed
- dwf-template - removes the dependency to swagger-express-mw

## [2.0.1] - 2017-03-14
### Added
- dwf-template - adds the open source dependencies that are required for its Backend module

### Fixed
- stdout and stderr - writes synchronously to avoid loss of log output in case of crashes, etc.
- trace - removes the sensitive information for the traced data
- dwf-template - adds the dependencies that are required by the Backend module of our dwf-template
- ssl certificate - loads the certificate by calling xsenv.loadCertificates(). If no certificates are loaded, then falls back to process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0 to avoid rejecting unauthorized backends
- org_guid and space_guid - fetched from the environment and pushed to the repository

## [2.0.0] - 2017-02-23
### Added
- dwf module environment - isolation per version, currently used for version 1
- repository - updates the dwf repository after dwf service provider is modified
- .dwfnamespace - the design time artifact for modeling namespaces, wihch are different than the default ones
- command line arguments - help, version, trace, verbose, exit and rejectUnauthorized
- .dwftaskchain - batch post for all task chains will replace the old post per task chain, to ensure the deployment transaction of module level
- .txt - the design time artifact for modeling text, where the content of the file can be any valid text
- .{any extension} - rejects the deployment of dwf-modules, which contain unsupported file extensions
 - .dwftaskchain - the design time artifact for modeling task chains, where the content of the file shall be a valid stringified json

### Fixed
- empty dwf module - Cannot read property 'forEach' of undefined: \@sap\dwf-deploy\lib\dwf\repository.js:35
- .dwftaskchain - supports nameless designtime files (i.e. .dwftaskchain as a complete file name)
- service instance - logs the name of the service instance (a.k.a. container) to which is deploying
- environment - expects the finalized structure for DWF 2.0 SP00 and HANA 2 SP01
- the stack trace of an error - will not be lost, but will be traced
- .dwftaskchain - will check the status code in the response of the post http call
- .dwftaskchain - will abort the deployment, when two or more designtime files defining the same runtime object
- .dwftaskchain - the default namespace of the runtime object is now prefixed with {mta.yaml mta name}.{mta.yaml dwf-module name}
 - .dwftaskchain - the name of the runtime object is derived by the file name, but without its file extension
