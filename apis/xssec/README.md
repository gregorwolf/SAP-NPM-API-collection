@sap/xssec: SAP BTP Security Services Node.js Integration Library
==========================================================

This module allows Node.js applications to authenticate users via JWT tokens issued by [SAP Business Technology Platform (BTP)](https://www.sap.com/products/technology-platform.html) security services (SAP Cloud Identity Services and XSUAA). It also provides an API for fetching tokens from these services.

## Recommendation
**We recommend developing new applications for SAP BTP with the SAP Cloud Identity Service using Authorization Policies ([Details](#recommendation--sap-cloud-identity-services)).**

## Table of Contents
1. [Version 4](#version-4)
    - [Breaking Changes](#breaking-changes)
1. [Installation](#installation)
1. [Maintenance](#maintenance)
1. [Example](#example)
    - [Passport Strategy](#passport-strategy)
1. [Usage](#usage)
    - [Authentication](#authentication)
    - [Authorization](#authorization)
    - [Token Fetches](#fetching-tokens)
    - [Error Handling](#error-handling)
    - [Testing](#testing)
1. [API](#api)
    - [Service](#service)
    - [SecurityContext](#securitycontext)
    - [Token](#token)
1. [Configuration](#configuration)
    - [Passport Strategy](#passport-strategy-1)
    - [JWKS Cache](#jwks-cache)
    - [x5t Validation](#x5t-validation)
    - [Proof Token Validation](#proof-token-validation)
    - [IAS -> XSUAA Token Exchange](#ias---xsuaa-token-exchange)
1. [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [Debug Logs](#debug-logs)
    - [How to get support](#how-to-get-support)

## Version 4
Version 4 represents a major rework of the module with the following changes and benefits:
- Modern Promise-based API with cleaned up function signatures
- JsDoc with type definitions for better IDE support
- Detailed hierarchical Errors for fine-grained exception handling of ValidationError, ConfigurationError, NetworkError, ...
- Support for new and upcoming features, e.g. App2App and App2Service communication via SAP Cloud Identity Services
- Easier configuration and testing via mocking
- Backward-compatibility via `v3` package

### Breaking Changes
- Minimum Node.js version is now 18.
- The v3 API has moved to the `v3` package. While we strongly recommend to migrate to the new API, backward-compatibility should be achievable by changing the import to this package:
```js
const { createSecurityContext, requests, constants, TokenInfo, JWTStrategy } = require("@sap/xssec").v3;
```
- `isTokenIssuedByXSUAA`, `getConfigType` have been removed. Replace with class check:
```js 
securityContext.token instanceof XsuaaToken // or: IdentityServiceToken, XsaToken, UaaToken
```
- `getHdbToken` has been removed. It should be replaceable with the following code:
```js 
const hdbToken = securityContext.token.payload.ext_cxt?.['hdb.nameduser.saml'] || securityContext.token.payload['hdb.nameduser.saml'] || securityContext.token.jwt;
```
- Configuration option `IAS_XSUAA_XCHANGE_ENABLED` has been removed because it was unclear from which service instance to which service instance the exchange should be made when multiple instances of the same type were present. Applications can implement the exchange themselves with the new API as described [here](#ias---xsuaa-token-exchange).
- Configuration option `disableCache` has been removed. It is also not supported by implementations from the v3 compatibility package.
- `isInForeignMode` has been removed.

## Installation
Add a dependency to `@sap/xssec` to your package.json, e.g. via:
```bash
npm i @sap/xssec
```
We strongly recommend to declare the version of this dependency with a `^` (caret) to consume future minor and hotfix releases when you update your dependencies (also see [Maintenance](#maintenance)):

```json
"dependencies": {
    "@sap/xssec": "^4"
}
```

**Important**: @sap/xssec requires at least Node.js 18 which is the current LTS version.


## Maintenance
Keep the version of this dependency up-to-date as it is a **crucial part of your application's security**, e.g. by regularly running:

```bash
npm update @sap/xssec # or: npm update
```
This is especially important when you deploy your application with a `package-lock.json` that locks the version that gets installed to a fixed version, until the next `npm update`.

When in doubt, check which version of the module is installed via 

```bash
npm list @sap/xssec
```
This will print a dependency tree that shows which versions of the module are installed, including transitive dependencies.



## Example
The following example gives an overview of the most important APIs of this module for user authentication in [express](https://www.npmjs.com/package/express):

```js
const { createSecurityContext, XsuaaService, errors: { ValidationError }} = require("@sap/xssec");

const credentials = { clientid, ... } // access service credentials, e.g. via @sap/xsenv
const authService = new XsuaaService(credentials) // or: IdentityService, XsaService, UaaService ...

async function authMiddleware(req, res, next) {
  try {
    const secContext = await createSecurityContext(authService, { req });
    // user is authenticated -> tie the SecurityContext to this req object
    req.securityContext = secContext;
    return next();
  } catch (e) {
    // user could not be authenticated
    if(e instanceof ValidationError) {
      // request has invalid authentication (e.g. JWT expired, wrong audience, ...)
      LOG.debug("Unauthenticated request: ", e);
      return res.sendStatus(401);
    } else {
      // authentication could not be validated due to Error
      LOG.error("Error while authenticating user: ", e);
      return res.sendStatus(500);
    }
  }
}
app.use(authMiddleware);

// access SecurityContext in endpoint handlers
app.get('/helloWorld', (req, res) => {
  if (!req.securityContext.checkLocalScope('read')) {
    return res.sendStatus(403);
  }
  
  // access token information via SecurityContext
  return res.send("Hello " + req.securityContext.token.givenName);
};
```

### Passport Strategy
As an alternative to writing the middleware manually, you can use the provided `XssecPassportStrategy` for [passport](https://www.npmjs.com/package/passport):

```js
const { XssecPassportStrategy, XsuaaService } = require("@sap/xssec");

const credentials = { clientid, ... } // access service credentials, e.g. via @sap/xsenv
const authService = new XsuaaService(credentials) // or: IdentityService, XsaService, UaaService ...

passport.use(new XssecPassportStrategy(authService));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

app.get('/helloWorld', (req, res) => {
  if (!req.authInfo.checkLocalScope('read')) { // access SecurityContext via req.authInfo
    return res.sendStatus(403);
  }
  
  return res.send("Hello " + req.authInfo.token.givenName) // access token via SecurityContext or ...
  // return res.send("Hello " + req.user.name.givenName); // access passport user via req.user
};
```

**However**: Once you need access to [ValidationErrors](#error-handling) for logging or analyzing requests with invalid authentication, using the passport strategy becomes more or less the same effort as writing a middleware yourself:

```js
const { errors: { XssecError, ValidationError }} = require("@sap/xssec");

...

// configure passport to failWithError to be able to catch ValidationErrors.
// Otherwise it will swallow the ValidationError and directly send a 401/403 response
app.use(passport.authenticate('JWT', { session: false, failWithError: true }));

// in your express error handler, check for errors passed on by XssecPassportStrategy and handle accordingly
app.use((err, req, res, next) => {
  if(e instanceof ValidationError) {
    // request with invalid authentication (e.g. JWT expired, wrong audience, ...)
    LOG.debug("Unauthenticated request: ", e);
    return res.sendStatus(401);
  } else if (e instanceof XssecError) {
    // authentication could not be validated due to an Error
    LOG.error("Error while authenticating user: ", e);
    return res.sendStatus(500);
  } else {
    // ToDo: handle other errors ...
  }
});
```

Unless you have a reason to use passport, we suggest to write the middleware yourself. This gives you full control with comparable effort.



## Recommendation:  SAP Cloud Identity Services
For new SAP BTP applications, we recommend to directly start with [SAP Cloud Identity Services](https://help.sap.com/docs/cloud-identity-services) and [Authorization Policies](#sap-cloud-identity-service) instead of the other services supported by this module to get the following benefits:

- SAP BTP Landscape independent integrations
- Support for custom domains
- Fine granular (instance-based) authorization concept
- Avoid future migration effort: as customer data needs to be migrated, this migration will not be possible fully automated lateron

Major new features will only be made available for *SAP Cloud Identity Services*. Also, it allows consumption of XSUAA-based services that have not yet migrated.


### Migration from XSUAA
Migration for older applications from XSUAA to *SAP Cloud Identity Services* with *Authorization Policies* is currently in the pilot phase. There will be guides for different migration stages available soon.



## Usage
As a basis for all usage scenarios, instantiate a new [Service](#service) instance of one of the following classes exported by the module that corresponds to the authentication service your application is bound to:

- `IdentityService`
- `XsuaaService`
- `XsaService` (*legacy systems*)
- `UaaService` (*legacy systems*)

Pass the service credentials as parsed object:

```js 
const { IdentityService } = require("@sap/xssec");

const credentials = { clientid ...} // access service credentials, e.g. via @sap/xsenv
const authService = new IdentityService(credentials);
```

If your application is bound to more than one authentication service, create multiple instances using the corresponding class and credentials for each service.

### Authentication
To authenticate users, use the [createSecurityContext](#createsecuritycontext) function.

```js
try {
  const secContext = await createSecurityContext(authService, { req });
  // user is authenticated
} catch (e) {
  // user could not be authenticated
  if(e instanceof XssecError) {
    // e was thrown intentionally by this module with details for the cause of the failure
  }
}
```

:warning: To prevent information overlap from one user's *SecurityContext* to another's, do not re-use the same *contextConfig* object for multiple invocations of `createSecurityContext`!
Create a new object each time, as in the sample code. Changing the *req* property and then passing the same object a second time is not enough.
Since version 4.0.1, the module has mechanisms in place to avoid these issues even when used wrongly but you should not willingly trust it.

The createSecurityContext function resolves with a service-specific `SecurityContext` object, e.g. `XsuaaSecurityContext`.

The `SecurityContext` will always have the **token** property that contains a service-specific `Token` object, e.g. `XsuaaToken` that provides access to the decoded information of the token.



### Authorization
The library can also be used for authorization checks.

#### XSUAA
An `XsuaaSecurityContext` provides [different methods](#xsuaasecuritycontext) to check if the token contains a specific scope.

#### SAP Cloud Identity Service
The recommended way to perform authorization for tokens issued by SAP Cloud Identity Service, is to use [Authorization Policies](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies). After authenticating requests with this module, the authorization checks are done with a dedicated module called [@sap/ams](https://www.npmjs.com/package/@sap/ams).

### Fetching Tokens
Each `Service` subclass has [dedicated methods](#token-flows) that can be used to fetch tokens via the following flows:

- Client Credentials: `fetchClientCredentialsToken({ options })`
- Password: `fetchPasswordToken(username, password, { options })`
- JWT Bearer: `fetchJwtBearerToken(assertion, { options })`




## Error Handling
The API of this module throws instances of `XssecError` or hierarchical subclasses thereof that can be identified like so:

```js
try {
  await xsuaaService.fetchClientCredentialsToken()
} catch(e) {
  if(e instanceof XssecError) {
    // it is an error thrown by this module
  }
}
```

There are three important subclasses of `XssecError` that divide the Errors into different categories like so:

```bash
XssecError
├── ConfigurationError
    ├── InvalidCredentialsError
    ├── ...
├── NetworkError
│   ├── ResponseError
    ├── ...
├── ValidationError
    ├── ExpiredTokenError
    ├── ...
```

- `ConfigurationError` indicates that your application is not using this library correctly or the authentication service is not correctly configured. You should not encounter this Error outside of development as these Errors require fixing.\
*Examples:*
  - passing credentials to a `Service` constructor that are missing mandatory properties
  - fetching a token via a *grant_type* that is not supported by the authentication server because it is disabled in the server configuration etc.
- `NetworkError` means the authentication server was unreachable or responded with an unexpected error. This is not necessarily an issue of this module.\
*Examples:*
  - the authentication server is down
  - a token fetch uses invalid credentials resulting in a response error etc.
- `ValidationError` occurs during authentication when the request did not contain valid authentication information. This is the most common type of Error thrown by this module. It has many subclasses that provide detailed information about the reason why the validation result was negative.
*Examples:*
  - the request contained no JWT
  - the JWT in the request was expired
  - the JWT was not issued for this application audience
  - the JWT was forged by an attacker with an invalid signature
  - the JWT is valid but its x5t thumbprint does not match the client's certificate (see [x5t validation](#x5t-validation)) etc.

The Error classes contain error-specific properties as details:

*Example*:
```js
const { errors: { UnsupportedAlgorithmError }} = require("@sap/xssec");

catch(e) {
  if(e instanceof UnsupportedAlgorithmError) {
    // e.token contains the token whose algorithm is not supported
    // e.alg contains the algorithm of the token that is not supported, e.g. "HS256"
  }
}
```

## Testing
We discourage application developers from basing their integration tests against BTP Security Services on a local setup that feeds this module with self-signed JWTs and a self-hosted JWKS on localhost. This was a common strategy in the past but has several problems:

- **it provides a false sense of safety**: Due to additional validations done by real BTP JWKS endpoints (that you will not be able to mock), the test may suceed for token payloads that would be considered invalid in productive environments. This is especially true for multi-tenant applications and micro-service based applications with inter-service communication.
- **JWKS hosted via http is not supported anymore**: To improve the security of the module, only URLs beginning with **https** scheme are supported for JWKS fetching.
- **it is wasted development effort**: there is no value in knowing if this module can validate signatures of tokens that you signed yourself.
Testing the signature validation capabilities of this module is already well covered by the test pipeline of this module.

If you need to weaken the validation mechanisms of this module for testing, you should commit fully to this strategy.
Consider using a simpler authentication strategy like Basic Auth with mocked users or creating mocked `SecurityContext` or `Token` instances of this module for local tests.
Cloud application frameworks typically offer mechanisms to configure different strategies in test and production profiles ([CAP Example](https://cap.cloud.sap/docs/node.js/authentication#strategies)).\
In addition, complement your local tests with *proper* integration tests against real service instances on a dedicated test cloud landscape.


## API
This section describes the public API of v4 of this module.

:warning: Accessing other properties and methods is discouraged as they may change during minor and hotfix releases of this module, even if they are not marked *private* via **#** (ECMAScript private fields/methods) or **@private** (JsDoc)

### Service
Instances of `Service(credentials, serviceConfig)` are created from parsed service credentials and an optional configuration:

```js 
const { IdentityService } = require("@sap/xssec");

const credentials = { clientid ...} // access service credentials, e.g. via @sap/xsenv
const serviceConfig = {
  // optional, service-specific configuration object...    
  validation: {
    x5t: {  
      enabled: true // enables token ownership validation via x5t signature thumbprint
    }
  }
};
const identityService = new IdentityService(credentials, serviceConfig);
```

#### Certificate Rotation
It is possible to update the `cert` and `key` of a `Service` instance by calling `Service#setCertificateAndKey(cert, key)` with PEM-encoded values that will be used in subsequent calls to the server.

*Note: Updating the `cert` and `key` property of the `credentials` object passed in the `Service` constructor is not enough because the `Service` makes a copy of the credentials for internal use and then discards the original reference.*

This method is useful in different scenarios, e.g:
- applications using ZTIS to manage their SAP Identity Service certificate. Whenever ZTIS provides a new pair of `cert` and `key`, the application can update the credentials of the `Service` instance via this method.
- credential rotation without application re-start: In SAP BTP Kyma, it is possible to rotate service bindings of a running application. Typically, this is used to refresh certificates. In that case, the method can be used to update the `Service` instance.

##### Full Credential Rotation
Applications that expect their credentials to be rotated with other properties besides `cert` and `key` changing, must construct a fresh new `Service` instance whenever new credentials are received.

#### Token Flows
The subclasses of `Service` provide the following service-specific methods that can be used to fetch tokens:

- Client Credentials: `fetchClientCredentialsToken({ options })`
- Password: `fetchPasswordToken(username, password, { options })`
- JWT Bearer: `fetchJwtBearerToken(assertion, { options })`

They resolve with the parsed JSON response from the authentication server. Typically, the desired token is the one under property `access_token`. However, for user-specific IdentityService tokens (Password, JWT Bearer), the desired token is typically `id_token`:

```js
const accessTokenJwt = (await xsuaaService.fetchClientCredentialsToken()).access_token;
const idTokenJwt = (await identityService.fetchPasswordToken(username, password)).id_token;
```

Of course, the other properties of the response, for example `refresh_token`, are also accessible.

The methods are annotated with service-specific JSDoc type definitions that should provide IDE-support for the function signatures and following options.

##### options
The `options` parameter is optional. It supports:

`correlationId` (*string*) a correlation id that allows tracing debug logs and Errors thrown by this module to the request\
 `token_format` (*jwt|opaque*) can be used to explicitly specify token format \
 `timeout` (*number*) maximum time in *ms* to wait for a response
 
It also supports the following service-specific options:

**XSUAA**: 

`scope` (*string|string[]*) requested scope(s)\
`tenant` (string) the *subdomain* of a tenant on the same subaccount from which to fetch a token. *Note*: this parameter does **not** accept a zone ID. Use the zid parameter instead to pass a zone ID.\
`zid` (string) the zone id from which to fetch a token\
`authorities` (object) additional [authorities](https://github.com/cloudfoundry/uaa/blob/24c0c23fa36d7c604e365e1be4df658d55dcb211/docs/UAA-APIs.rst#support-for-additional-authorization-attributes) that can be freely chosen during token fetch and will be put into the token under *az_attr* claim

**Identity Service**:

`resource` (*string|string[]*) name(s) of API dependency to another application that shall be consumed with this token in the format urn:sap:identity:application:provider:name:\<dependencyName\>

#### acceptsToken
Furthermore, each subclass of `Service` offers the method `acceptsToken(token)` which checks if a `Token` is accepted by this service instance:

```js
const jwt = ... // extract JWT from req object
const token = new Token(jwt);
if(identityService.acceptsToken(token)) {
  // the JWT was issued for an application bound to this Identity Service instance but it MUST still be validated!
}
```

### createSecurityContext
`createSecurityContext(service, contextConfig)` can be called with a single `Service` instance or an array of `Service` instances as first parameter. In the latter case, the service from which the Security Context is created, will be determined based on the audience of the token.

The second parameter is a [unique (!)](#authentication) `contextConfig` object that is used to pass information for the creation of this specific context.

#### contextConfig 
  **Mandatory** properties:
  - `req` request object from which the JWT will be extracted as Bearer token from `req.headers.authorization`. Additionally, if present, the client's certificate will be extracted from `req.headers["x-forwarded-client-cert"]` where it is typically put by Cloud Foundry after SSL termination.
  
  *or*:
  - `jwt` manually provided JWT token as String
  
  *Optional* properties:
  - `correlationId` a correlation id that allows tracing debug logs and Errors thrown by this module to the request
  - `clientCertificatePem` manually provided client certificate in PEM format

The client certificate is only required in features such as [x5t validation](#x5t-validation) or [proof token validation](#proof-token-validation) for SAP Cloud Identity Service.

### SecurityContext
`SecurityContext` instances are returned by [createSecurityContext](#createsecuritycontext). They have the following properties:

- **service** (*Service*) the [Service](#service) on which the security context was opened
- **token** (*Token*)  the parsed [Token](#token) (previously `TokenInfo`) instance with getters for its header, payload and most important claims
- **config** (*object*) the (sanitized) `contextConfig` from which the `SecurityContext` was created
- legacy methods for v3 backward-compatibility, e.g. `getAppToken()`, `getUserInfo()`

The service-specific subclasses of `SecurityContext` extend this class as follows.

#### XsuaaSecurityContext
Instances of `XsuaaSecurityContext` additionally have methods for authorization checks:

- `checkScope(scope)` Checks if the scopes of the token include the given *scope* exactly as provided to the function. As the scopes of the token begin with the *xsappname* of the Xsuaa service instance, this means, the provided *scope* parameter must include this prefix:
```js 
if(secContext.checkScope(`${authService.credentials.xsappname}.READ`)) {
  // user is authorized
}
```

- `checkLocalScope(scope)` Checks if the scopes of the token include `<xsappname>.<scope>`, where the *xsappname* comes from the credentials of the service that was used to create the SecurityContext. This is a quality-of-life function to check for scopes without passing this *xsappname* to the function:
```js 
if(secContext.checkLocalScope("READ")) {
  // user is authorized
}
```

- `checkFollowingInstanceScope(scope)` Checks if the scopes of the token include `<followingInstanceXsAppName>.<scope>`, where *followingInstanceXsAppName* is the *xsappname* of the XSUAA clone instance for which the token was issued. This is a quality-of-life function to check for scopes of following XSUAA instances.

#### IdentityServiceSecurityContext
- **servicePlans** (*string[]*) [requires [proof token validation](#proof-token-validation)] contains the service plans of the caller when authenticated with [proof token validation](#proof-token-validation) enabled
- **isInternal()** (*boolean*) [requires  [x5t validation](#x5t-validation)] Checks whether the token from which this context was created is a token fetched by the OAuth 2.0 client for internal use. It returns true if the token was fetched via client credentials flow with the credentials of this context's IdentityService instance, false otherwise.

### Token
In production, only trust information of `Token` instances returned by `createSecurityContext` (see [Authentication](#authentication)).

However, for the purposes of testing, instances of `Token` can be constructed directly from a raw **jwt** or a combination of parsed header and payload like so:

```js 
const jwt = "eyJraWQiOi...."
let token = new IdentityServiceToken(jwt);

const header = { alg: "RS256" };
const payload = { foo: "bar" };
token = new IdentityServiceToken(null, { header, payload });
```

:warning: The resulting token object is created **without** validating the **jwt** for authenticity, integrity, expiration etc.

The `Token` class provides easier access to the most common claims of the **jwt**, as well as its parsed header and payload:

- **audiences** (*string[]*) or [] if token has no audiences
- **azp** (*string*) 
- **clientId** (*string*) 
- **email** (*string*) 
- **expired** (*boolean*) 
- **expirationDate** (*Date*) 
- **familyName** (*string*) 
- **givenName** (*string*) 
- **grantType** (*string*) 
- **header** (*object*)
- **issuer** (*string*) 
- **issueDate** (*Date*) 
- **jwt** (*string*) from which this `Token` instance was created
- **notYetValid** (*boolean*) based on the optional **nbf** (*no use before*) claim. If true, the token must not be accepted yet
- **origin** (*string*) 
- **payload** (*object*)
- **remainingTime** (*integer*) in seconds based on claim **exp** (*expiration time*)
- **subject** (*string*) 
- legacy methods for v3 backward-compatibility, e.g. `getAudiencesArray()`, `getTokenValue()`

#### IdentityServiceToken
Instances of `IdentityServiceToken` additionally have

- **appTid** (*string*) application tenant id
- **customIssuer** (*string*) or *null* if no custom issuer has been configured
- **scimId** (*string*)

#### XsuaaToken, XsaToken, UaaToken
Instances of `XsuaaToken`, `XsaToken`, `UaaToken` additionally have

- **azAttributes** (*object*) *az_attr* claim
- **extAttributes** (*object*) *ext_attr* claim
- **scopes** (*string[]*) or [] if token has no scope(s)
- **serviceInstanceId** (*string*) from *ext_attr*
- **subAccountId** (*string*) from *ext_attr* or *zid*
- **xsUserAttributes** (*object*) *xs.user.attributes* from *ext_ctx* or direct claim
- **xsSystemAttributes** (*object*) *xs.system.attributes* from *ext_ctx* or direct claim
- **zid** (*string*) zone id

## Configuration
### Passport Strategy
It is possible to configure the [XssecPassportStrategy](#passport-strategy) with *scope(s)* such that incoming requests must have at least one of them. Otherwise, a response with code 403 is returned:

```js
app.use(passport.authenticate('JWT', { session: false, scope: "read" }));
app.use(passport.authenticate('JWT', { session: false, scope: ["read", "write"] }));
```

### JWKS Cache
To verify the validity of a token, the library needs to ensure that it was signed with a *private key* belonging to one of the *public key*s from the authentication server's [JWKS](https://datatracker.ietf.org/doc/html/rfc7517) (JSON Web Key Set). The application retrieves the JWKS via HTTP from the authentication server. It is cached to reduce both the load on the server and the latency of requests introduced by the signature validation.

Please note that the JWKS endpoint is parameterized and does additional service-specific validations based on those parameters. For this reason, among others, more than one JWKS is typically cached and individually refreshed under different cache keys that include those parameters.

There are three values that are used to control the cache:
- `expiration time` *(integer)* when a JWKS is needed for validation whose cache entry has expired (`time since last refresh` > `expiration_time`), a refresh of the JWKS is performed (if not already in progress) and the token validation of the request needs to wait synchronously until the JWKS has been succesfully refreshed.
- `refresh period` *(integer)* When a JWKS is needed for validation whose cache entry is within the refresh period (`time until expiration` < `refresh_period`), the cached JWKS will be used for validation (unless it has expired completely) and the JWKS will be refreshed asynchronously in the background.
- `shared` *(boolean)* when true, shares the cache with all `Service` instances of the same subclass (e.g. `IdentityService`) created with `shared=true`.\
The shared cache's configuration will be determined by the first instance created with `shared=true`!

Only **one HTTP request at a time** will be performed to refresh the JWKS.

In effect, productive systems with regular incoming requests should not experience delays from refreshing a JWKS after the initial fetch of that JWKS. Delays will only happen when the JWKS could not be refreshed during the refresh period, e.g. due to a prolonged outage of the JWKS endpoint or when no requests were received during the refresh period that would have triggered an asynchronous refresh.


##### Default cache configuration
```json
{
  "shared": false,
  "expirationTime": 1800000, // 1800000ms = 30min
  "refreshPeriod": 900000, // 900000ms = 15min
}
```

##### Manual cache configuration
In rare situations you might need to change the cache configuration.
The `expiration time` is important to support key rotation scenarios and should not be too high. Otherwise, the security of the application is impacted.

:exclamation: **Normally you don't need to overwrite the default values!**

To overwrite cache parameters, you need to specify them as key/value pairs in `<serviceConfiguration>.validation.jwks`:

```js
const authService = new IdentityService(identityServiceCredentials,
  {
    // override one default value or many
    validation: {
      jwks: {
        expirationTime: 3600000,
        // refreshPeriod: 1800000,
        // shared: true
      }
    }
  });
```

### X.509 certificate support
#### X509_GENERATED
If your authentication service instance is configured to manage certificates and keys on its own, there will be `certificate` and `key` properties in the service credentials that work out-of-the-box with this module when you use it for authenticated requests to the authentication service, e.g. when [fetching tokens](#fetching-tokens).

#### X509_PROVIDED
If your authentication service instance is configured to use an externally managed certificate/key you might need to add them to the service credentials before passing the credentials to the `Service` constructor:

```js
const { XsuaaService } = require("@sap/xssec");

const credentials = { clientid, ... } // access service credentials, e.g. via @sap/xsenv
credentials.key = <yourExternallyManagedKey> // in PEM format
credentials.certificate = <yourExternallyManagedCertificate> // in PEM format

const authService = new XsuaaService(credentials) // or IdentityService ...
```



### Identity Service
The following are Identity Service specific configuration options.

#### x5t Validation
The library optionally supports token ownership validation via x5t thumbprint ([RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705)) for tokens issues by SAP Cloud Identity Service.

:grey_exclamation: x5t token validation should only be enabled for applications using mTLS because the x5t validation will fail when there is no client certificate used for the request. SAP BTP will automatically put the client certificate in the `x-forwarded-client-cert` header of requests performed against `cert` application routes. From there it will be picked up by this lib to do the validation against the fingerprint claim from the token payload.

To enable x5t validation, set `<serviceConfiguration>.validation.x5t.enabled>` flag to true:

```js
const authService = new IdentityService(identityServiceCredentials,
  {
    validation: {
      x5t: {
        enabled: true
      }
    }
  });
```

#### Proof Token Validation
To enable proof token validation, set `<serviceConfiguration>.validation.proofToken.enabled>` flag to true:

```js
const authService = new IdentityService(identityServiceCredentials,
  {
    validation: {
      proofToken: {
        enabled: true
      }
    }
  });
```

After creating a SecurityContext on a service with proof token validation enabled, the service plans of the caller can be retrieved:

```js
const securityContext = await createSecurityContext(identityService, { reqWithForwardedClientCertificate });
// service plans are available via securityContext.servicePlans
```

#### IAS -> XSUAA Token Exchange
Some applications need to exchange incoming Identity Service user tokens to XSUAA user tokens.
The correct token flow for this is the [JWT Bearer](#token-flows) flow.

The token exchange is not a fully fletched feature of the library and needs to be implemented **and tested** via application coding.

However, [this snippet](./src/util/iasXsuaaTokenExchange.js) should give a good idea how the API of the library can be used to achieve this.
It implements an express middleware that can be registered *before* the authentication middleware to exchange the IAS token in the request header to an XSUAA token.\
If you decide to base your implementation on the snippet, you need to copy it to your source files and implement logging and error handling as required by the application.


## Troubleshooting
### Common Issues
#### Requests get unexpectedly declined with 401/403
Analyze the [ValidationError](#error-handling) thrown by [createSecurityContext](#createsecuritycontext) or passed on by the [passport strategy](#passport-strategy) to find the cause for this, e.g. by logging its message or if possible, by inspecting it in the debugger.

#### SyntaxErrors
@sap/xssec 4 uses ECMAScript 2020 syntax. This means it requires at least Node.js 18 which is the current LTS version. Version 4 does not support Node.js versions that are out of maintenance. If you try, you will encounter SyntaxErrors such as 

```
SyntaxError: Unexpected token '??='
```

### Debug Logs
To enable debug logging, set the environment variable DEBUG as follows when starting your application: `DEBUG=xssec`. Note that `DEBUG=xssec:*` works only for xssec 3.


### How to get support
Please use official SAP support channels to get support under component `BC-CP-CF-SEC-LIB` or `Security Client Libraries`.\
Before opening support tickets, please check the [Troubleshooting](#troubleshooting) section first.

Make sure to include the following mandatory information:

- Installed version of @sap/xssec, preferrably full output of `npm list @sap/xssec`
- Auth service set-up of your application (XSUAA, IAS, XSUAA+IAS, IAS+AMS, etc.)
- For exceptions: Stack trace that includes the executed code locations of this library that lead to the exception
- For unexpected 401 / 403 response codes: relevant log output of this library with environment variable DEBUG=xssec:* set to enable debug output
- Steps you have tried to fix the problem
- Reason why you believe a bug in this library is causing your problem

Unfortunately, we can *NOT* offer consulting via support channels.
