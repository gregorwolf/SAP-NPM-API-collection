# Change Log
All notable changes to this project will be documented in this file.

## 4.9.1 - 2025-08-07
- fix: IdentityService#getJwks now uses the retry settings from the Service configuration when fetching a JWKS from subscriber IAS tenants
- Refactored `Service` constructor to be more light-weight: This slightly improves performance and memory usage when creating multiple `Service` instances, e.g. when fetching tokens with a lot of different service credentials. For this purpose, some properties of the `Service` instance are now only initialized when they are actually needed for the first time, e.g. the jwksCache.
- Some properties of the `Service` class, which are meant for internal use, have become read-only (`endpoints`, `jwksCache`, `signatureCache`).

## 4.9.0 - 2025-07-14

- when DEBUG=xssec is enabled, the `createSecurityContext` function will now log the jwt token that gets validated for better analysis and replayability of issues
- relax typescript definition for `req` property of `SecurityContextConfig` to be an optional object with `headers` property to support request objects from different frameworks
- fix correlation_id logging when DEBUG=xssec is enabled: it was missing from some log statements

## 4.8.0 - 2025-06-04
This release primarily provides two new features: token decode cache and signature (validation) cache. They offer non-trivial performance improvements but are disabled by default until next major release for backward compatibility reasons. See README for details on how to enable them.

- log JWT token during createSecurityContext when DEBUG=xssec is enabled
- add `Token#enableDecodeCache(config)` function to enable token decode cache which stores header/payload objects after base64 decoding.
- add `validation.signatureCache` option to Service configuration to enable or disable the signature cache which stores results of token signature validation.
- minor performance improvements for `createSecurityContext` when only a single `Service` instance is provided
- Typescript types definition improvements (easier mocking of `Service` and `SecurityContext` classes etc.)
- small bugfixes for debug logging (e.g. for correlationId logging)

## 4.7.0 - 2025-05-07
- `createSecurityContext` can now also be called with a pre-decoded `Token` object instead of a raw JWT string in the `contextConfig` parameter. This prevents costly double-decoding of the token in scenarios where the token is already decoded before validation.
- fix and type definitions for request retry configuration
- fixes for Typescript typings
- reduced information when logging errors from `@sap/xssec` to console, e.g. no longer prints the http client request object unless debug logging for xssec is enabled

## 4.6.0 - 2025-04-09
- add `requests.retry` option to Service configuration to define retries for all HTTP calls of the instance
- export SECURITY_CONTEXT Symbol which is recommended as new default location for the SecurityContext on the req object
- add `skipValidation: true` option to `contextConfig` of `createSecurityConfig` (use with caution!)
- fix unintended side effect of XsuaaService#acceptsTokenAudience in multi-service setups
 
## 4.5.0 - 2025-03-24
- add `requests.timeout` as optional service configuration option to override default request timeout for all requests of that Service instance 

## 4.4.0 - 2025-02-13
- Service#setCertificateAndKey is a new setter that can be used to update the certificate and key of a service's credentials. Possible scenarios include ZTIS managed certificates and client certificate rotation scenarios in a running application.
- fix circular dependency between `Service` and `WrongAudienceError`
- fixes the return type of `createSecurityContext` in the exported typing changes from 4.3.0
- various typing improvements
- export `Service` and `ServiceContext` base classes

## 4.3.0 - 2025-02-11
- improved Typescript typings: The return type of `createSecurityContext` called with a single `Service` instance should now be a specific subclass of `SecurityContext`, e.g. `IdentityServiceSecurityContext` when called with an `IdentityService` instance. Consequently, the `token` and `service` properties of the security context will also be typed to service-specific subclasses, e.g. `IdentityServiceToken`.
- default `timeout` of *JWT bearer* token fetches increased to 10s from 2s to account for typical response times of this flow (restores default value from `@sap/xssec 3`)
- maximum allowed value for `timeout` option of token fetch configuration increased to 10s
- IdentityServiceToken#consumedApis is a new getter to get the consumed Identity Service APIs in technical communication scenarios
- IdentityServiceSecurityContext#isInternal is a new function that can be used to check whether the token from which this context was created is a token fetched by the OAuth 2.0 client for internal use. It returns true if the token was fetched via client credentials flow with the credentials of this context's IdentityService instance, false otherwise.
- `Service` instances now use a common cache for OIDC configurations indexed by `url` of `Service` instances to improve performance in credential rotation scenarios

## 4.2.8 - 2025-01-14
- fix token keys cache handling for error responses from server
- fix backward compatibility for getAdditionalAuthAttribute method for XSUAA

## 4.2.7 - 2024-11-08
- fix v3 compatibility layer to allow to configure new features like prooftoken validation there too
- fix service plan name handling

## 4.2.6 - 2024-10-17
- fix typescript definitions
- document and add a sample for  an automatic token exchange method

## 4.2.5 - 2024-10-16
- add TimeoutError Exception to provide a way to identify a timeout error

## 4.2.4 - 2024-09-05
- fix missing x-zid header in XSUAA token fetches via v3 compatibility requests with zoneId parameter
- add clientsecret as optional property to type XsuaaServiceCredentials

## 4.2.3 - 2024-09-03
- bugfix passport v3 wrapper so it does not call the error callback twice in specific scenario
- add certurl as optional property to type XsuaaServiceCredentials

## 4.2.2 - 2024-08-29
- export some more internal classes for better test support
- remove node-fetch dependency and use native https module instead

## 4.2.1 - 2024-07-25
- fix JWKS URL construction for XSA service bindings whose url contains already a path

## 4.2.0 - 2024-07-22
- move credential validation from Service constructors to fine-grained property validation upon use to support token fetches with partial credentials
- add type definitions for the configuration of the JWKS cache to the Service configuration
- include information about original http client error in both RequestError objects and debug log to allow analysis of the root cause of HTTP requests that cannot be sent

## 4.1.3 - 2024-06-27
- add zid as optional parameter to XsuaaService token fetch requests
- minor JsDoc fixes

## 4.1.2 - 2024-06-21
- fix for IdentityService token fetch requests: app_tid is now properly sent with the request

## 4.1.1 - 2024-06-19
- add new service configuration flag for JWKS cache: 'validation.jwks.shared' (boolean)
- use shared cache in v3 compatibility layer, otherwise compat layer has effectively NO caching as internally new Service instances are created for each request that each begin with an empty cache

## 4.1.0 - 2024-06-13
- Provide Typescript .d.ts typings
- Fix export of XssecPassportStrategyV3 in v3 package. Consumers that already adjusted their import to the "bugged" export structure of prior 4.0.X versions, should not be required to adjust their import again for this fix

## 4.0.4 - 2024-06-12
- MissingJwtError now inherits from ValidationError instead of ConfigurationError which implicitly changes its recommended statusCode from 500 to 401. Consumers are not expected to validate outside the lib whether requests contain a JWT before passing the request to the lib for validation. Encountering a MissingJwtError is therefore no longer classified as a misconfiguration of the library but as an expected error that may occur during validation.

## 4.0.3 - 2024-06-06
- export Token class and its subclasses

## 4.0.2 - 2024-06-05
- Fix failing validation of Identity Service tokens without azp claim
- Fix wrong JsDoc

## 4.0.1 - 2024-06-03
- Fix critical bug in XssecPassportStrategy

## 4.0.0 - 2024-05-16
- new Promise-based API with cleaned up function signatures
- provide backward-compatibility for callback-based v3 API via `v3` package
- add JsDoc with type definitions for better IDE support
- throw detailed hierarchical Error objects for fine-grained exception handling
- add Proof Token validation for SAP Identity Service tokens

## 3.6.1 - 2023-12-21
- better support for older node versions

## 3.6.0 - 2023-11-24
- adapt optimized IAS server API

## 3.5.0 - 2023-11-14
- update dependencies (e.g. axios 0 -> 1)

## 3.4.0 - 2023-10-23
- add optional x5t validation (RFC 8705) for IAS tokens
- Restore support for disableCache flag for JWKS retrieval
- Bugfix for requests to XSUAA with array values inside form

## 3.3.5 - 2023-09-28
- Support for app2service and app2app for IAS

## 3.3.4 - 2023-09-06
- Fix IAS token exchange with X509 binding

## 3.3.3 - 2023-08-08
- Send either both x-app_tid & x-client_id headers or none of them to IAS /certs endpoint to prevent bad request

## 3.3.2 - 2023-07-28
- restore backward-compatibility feature: use cleanUpPemKey function on verification keys to support PEM with missing line breaks-
- restore backward-compatible behaviour: use verificationKey as fallback if KID is not found in JWKS but throw error about missing KID if it fails
- fix error handling for cert endpoint

## 3.3.0 - 2023-07-24
- add app_tid to formular for token exchanges
- support for "x-app_tid" and "x-client-id" header for IAS cert endpoint
- bugfix for unknown variable in new cache implementation

## 3.2.18 - 2023-07-13
- Replaced keycache implementation with new JwksReplica implementation: When a JWKS is used for validation, it is now checked if the cached replica will expire soon (default refresh period: 15min before expiration). If so, it will be refreshed in the background and the cached replica will still be used for validation until it has expired completely (default expiration time: 30min since last refresh). Validation of incoming requests will only be blocked by an expired JWKS if it could not be refreshed during the refresh period. Only one call at a time will be performed to refresh the JWKS.
- Addd support for resource-attribute for token flow/token exchange calls

## 3.2.17 - 2023-01-09
- obfuscate credentials in debug output, when xssec:request debug variable is set

## 3.2.15 - 2023-01-09
- hotfix: upgrade to newest jsonwebtoken version ^9.0.0 because of security issue complainings. But the library was never affected

## 3.2.14 - 2022-10-11
- allow IAS issuer without https protocol prefix
- fix for additionalAttributes
- allow setting timeout without having credentials object provided

## 3.2.13 - 2022-02-15
- hofix in keycache implementation if you turn off to use the cache
- upgrade to newer axios library

## 3.2.12 - 2022-01-19
- add support for UAA system plan 
- upgrade to newer axios library

## 3.2.11 - 2021-11-30
- add support for timeout setting for all requests-calls 
- support for password token flow in requests module
- support for setting scopes for all requests to XSUAA
## 3.2.10 - 2021-11-02
- fix correlationID header names to "x-vcap-request-id" or "x-correlationid"

## 3.2.9 - 2021-10-22
- custom domain support for IAS
- support for "x-correlation-id" header to be set for createSecurityContext and tokenexchange-calls
- support to turn off the internal cache for a createSecurityContext call

## 3.2.8 - 2021-10-18
- add additional getter for user properties on XSUAA context
- remove deed and unneeded code for IAS context
- fix token flows in requests if subdomain is provided using certificate

## 3.2.7 - 2021-09-15
- replace got with axios library because of a bug in got lib during https get

## 3.2.5 - 2021-09-07
- fix to be backward-compatible for tokenFlow-APIs

## 3.2.4 - 2021-09-03
- fix an issue with IAS multitenancy support
- remove the deprecated request library with got library

## 3.2.3 - 2021-08-23
- add checkFollowingInstanceScope to SecurityContext to retrieve instance specific scope without need to build scope string on your own
- fix a reference error in key verification
- support for multitenance IAS applications using 'x-zone_uuid' Header in jwks call

## 3.2.2 - 2021-06-16
- Support for tokenexchanges with X.509 certificates managed by XSUAA
- Support for tokenexchanges with manually managed X.509 certificates
- support for configuration objects that does not provide a clientsecret (but a certificate)

## 3.2.1 - 2021-06-01
- Add some more error and tracing information

## 3.2.0 - 2021-04-20
- Support for IAS token validation. ([more details](doc/IAS.md))

## 3.1.2 - 2021-03-01
- Feature: Support for IAS to XSUAA token exchange ([more details](doc/IAStoXSUAA.md))
- Feature: Support for ZoneID enabled token flows ([more details](doc/TokenFlows.md))


## 3.1.1 - 2021-02-11
- Bugfix: Tokenexchange with additional attributes may result in a wrong formatted url
- Feature: The passport middleware allows to provide scopes to be validated at authentication time. Details [here](http://www.passportjs.org/docs/oauth/#scope)

## 3.1.0 - 2021-02-10
- Support for multiple configurations for one security context ([more details here](doc/MultiConfiguration.md))
- Bugfix: support for additional attributes in token exchange
- Bugfix: authorization now in payload for better XSUAA support
- correct support for azp (clientid) in token payload
- method to identify an XSUAA token

## 3.0.10 - 2021-10-01
- The requests to the XSUAA are now available using the requests module also if you do not have a securityContext

## 3.0.9 - 2020-08-06
- Set request library to version 2.88.2 because of security vulnerability

## 3.0.8 - 2020-08-06
- Increase timeout for jwt-bearer token flow to reduce of timeouts with very big tokens.

## 3.0.7 - 2020-07-24
- Move the token to the request body for jwt-bearer token flow, because of problems with very big tokens

## 3.0.6 - 2020-07-01
- Audience Validation validates to true when the derived client_id of broker-clone token matches the trusted client. This is relevant to support tokens of grant type user_token that contains no scopes.

## 3.0.5 - 2020-06-26
- Audience Validation accepts tokens of grant type user_token that does not provide aud claim. In that case the audience is derived from the audiences from the scopes.
- Audience Validation is skipped when cid of token matches the trusted client.
- Use getSubaccountId() method only to fetch the subaccount id, e.g. for calling the metering API for user-based pricing.
- In case you are interested in the customers tenant GUID make use of getZoneId method instead!
- A new [TokenInfo](/doc/TokenInfo.md) class is introduced for better logging capabilities.

## 3.0.3 - 2020-05-25

- Fix jwt-bearer flow to take the right token as uri parameter.

## 3.0.2 - 2020-05-20

- Fix get verification key from keycache.

## 3.0.1 - 2020-05-19

- HotFix missing debugTrace in verification key
- Fix RetryStrategy

## 3.0.0 - 2020-05-15

- Replace grant type user_token in method requestToken (TYPE_USER_TOKEN) in favor of urn:ietf:params:oauth:grant-type:jwt-bearer
- Remove obsolete method getToken (use getHdbToken or getAppToken))
- Remove obsolete method requestTokenForClient (use requestToken)
- Remove obsolete method getIdentityZone (use getZoneId() instead, or getSubaccountId() for metering purposes) 
- Support for audience validation in token
- remove of SAP_JWT_TRUST_ACL environment variable support (functionality now comes with audience validation); see also [here](https://jam4.sapjam.com/blogs/show/oEdyQO183plBoQdrvcPw2w).
- remove depencency to node-jwt (ALPINE support)
- restructure internal code for better maintainability

## 2.2.5 - 2020-02-28

- Update to node-jwt version 1.6.6

## 2.2.4 - 2019-08-14

- Support for API methods getUserName and getUniquePrincipalName
 
## 2.2.3 - 2019-08-07

- Add retry for recieving keys

## 2.2.2 - 2019-06-24

- Use verification key from binding as backup if online key retrieval fails

## 2.2.1 - 2019-06-17

- Fix uaaDomain comparison in key cache

## 2.2.0 - 2019-06-17

- Align key cache implementation with other container security libraries

## 2.1.17 - 2019-05-17

- Introduce http timeout of two seconds
- Update version of module debug, lru-cache and @sap/xsenv
- Fix token verification for broker master instance subscriptions

## 2.1.16 - 2019-01-28

- Fix token parser: switch ASCII to Utf8 decode

## 2.1.15 - 2018-08-13

- Update version of module request

## 2.1.14 - 2018-07-24

- Evaluate SAP_JWT_TRUST_ACL if trustedclientidsuffix is present but not matching

## 2.1.13 - 2018-07-18

- Update version of module request

## 2.1.12 - 2018-06-01

- Support for API methods getSubaccountId and getOrigin
- Mark API method getIdentityZone as deprecated

## 2.1.11 - 2018-05-18

- Update version of module request

## 2.1.10 - 2018-04-20

- Fixes for keycache

## 2.1.9 - 2018-04-18

- Update version of module @sap/node-jwt (1.4.8)
- Fixes for keycache
- Update version of module request

## 2.1.8 - 2018-03-14

- Support for API method getAppToken

## 2.1.7 - 2018-03-05

- Support for API method requestToken

## 2.1.6 - 2018-02-19

- Update version of module @sap/node-jwt

## 2.1.5 - 2018-02-07

- Update version of module request

## 2.1.4 - 2017-12-04

- Support new JWT structure (attribute location ext_cxt)
- First implementation for keycache

## 2.1.3 - 2017-11-29

- Support for API method getClientId

## 2.1.2 - 2017-10-23

- Support for API method getSubdomain

## 2.1.1 - 2017-10-09

- Update version of modules @sap/node-jwt, @sap/xsenv and debug

## 2.1.0 - 2017-07-06

- Support of API method requestTokenForClient
- Update version of module @sap/node-jwt

## 2.0.0 - 2017-06-26

- Removal of deprecated constructor method createSecurityContextCc
- Removal of API method method getUserInfo

## 1.3.0 - 2017-06-23

- Revert removal of API method method getUserInfo

## 1.2.0 - 2017-06-22

- Support for API methods getLogonName, getGivenName, getFamilyName, getEmail
- Removal of API method method getUserInfo
- Fix identity zone validation (only relevant for tenants created with SAP Cloud Cockpit)

## 1.1.1 - 2017-05-30
- Update version of dependent modules

## 1.1.0 - 2017-05-22
- Mark API method createSecurityContextCC as deprecated

## 1.0.4 - 2017-05-17

- Support for validation of XSUAA broker plan tokens
- Support for API methods getCloneServiceInstanceId and getAdditionalAuthAttribute
- Support for validation of XSUAA application plan tokens in arbitrary identity zones

## 1.0.3 - 2017-03-29

- Update version of dependent modules

## 1.0.2 - 2017-02-22

- Support for validation of SAML Bearer tokens

## 1.0.1 - 2017-02-02

- Support for client credentials tokens in JWT strategy

## 1.0.0 - 2017-01-25

- Introduction of scopeing, module name changed to @sap/xssec
