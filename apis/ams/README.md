<!-- This is the README for npmjs -->

# @sap/ams

This is the Node.Js runtime library used to perform [authorization checks](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies?locale=en-US) in applications which authenticate users via the [SAP Cloud Identity Services](https://help.sap.com/docs/identity-authentication?locale=en-US).

The module [@sap/ams-dev](https://www.npmjs.com/package/@sap/ams-dev) provides the corresponding tooling support during application development.

As ADC (Authorization Decision Controller) an in-process engine based on DCN (Data Control Notation) files is used in versions >= 1.17.0. Follow the migration guide in the CHANGELOG of @sap/ams-dev for version 1.0.0 to update your local test setup from OPA to DCN Engine. When using newer versions, the OPA buildpack on CF can be removed once a [policy deployer application](#dcl-deployer-application) has been configured for the upload of the base policies.

## Table of Contents

- [Installation](#installation)
  - [Maintenance](#maintenance)
- [Version 3](#version-3)
  - [Breaking Changes](#breaking-changes)
- [Usage](#usage)
  - [Set-up](#set-up)
  - [Authorization checks](#authorization-checks)
  - [Handling Decisions](#handling-decisions)
  - [AmsMiddleware](#amsmiddleware)
  - [Technical communication](#technical-communication)
  - [Testing](#testing)
  - [Events/Logging](#eventslogging)
  - [Samples](#samples)
- [API](#api)
  - [AuthorizationManagementService](#authorizationmanagementservice)
  - [AuthProvider](#authprovider-interface)
    - [IdentityServiceAuthProvider](#identityserviceauthprovider)
    - [HybridAuthProvider](#hybridauthprovider)
    - [CdsXssecAuthProvider](#cdsxssecauthprovider)
  - [Authorizations](#authorizations)
  - [Decision](#decision)
  - [Events](#events)
- [CAP integration](#cap-integration)
  - [cds add ams](#cds-add-ams)
  - [Features](#features)
    - [Role-based authorization](#role-based-authorization)
    - [Instance-based authorization](#instance-based-authorization)
    - [Validation](#validation)
    - [Base Policy Generation](#base-policy-generation)
    - [Base Policy Upload](#base-policy-upload)
    - [Testing policies](#testing-policies)
    - [Mocked user testing](#mocked-user-testing)
    - [Hybrid testing](#hybrid-testing)
  - [Configuration](#configuration)
    - [Plugin Runtime](#plugin-runtime)
  - [Technical communication](#technical-communication-1)
  - [Logging](#logging)
- [Deploy DCL](#deploy-dcl)
  - [DCL Deployer Application](#dcl-deployer-application)
  - [Building the DCL Deployer Application](#building-the-dcl-deployer-application)
  - [Deploying the DCL Deployer Application](#deploying-the-dcl-deployer-application)
  - [deploy-dcl script](#deploy-dcl-script)
- [Resources](#resources)
  - [Getting Support](#getting-support)
  - [Open Source Legal Notices](#open-source-legal-notices)


## Installation
Via public [npmjs](https://www.npmjs.com/) repository:

```sh
npm install @sap/ams
```

### Maintenance
Keep the version of this dependency up-to-date since it's a **crucial part of your application's security**, for example by regularly running:

```bash
npm update @sap/ams # or: npm update
```
This is especially important when you deploy your application with a `package-lock.json` that locks the version that gets installed to a fixed version, until the next `npm update`.

When in doubt, check which version of the module is installed via 

```bash
npm list @sap/ams
```
This will print a dependency tree that shows which versions of the module are installed, including transitive dependencies.



## Version 3
Version 3 drastically changes the core API. Instead of checking privileges on a `PolicyDecisionPoint` with an `Attributes` object, an `AuthProvider` prepares an `Authorizations` object for the same purpose. This separates *what* to check from *how* to check it. The necessary configuration for advanced authorization scenarios, such as principal propagation or non-standard authorization strategies, are configured once during application start. As a result, the authorization checks themselves remain straight-forward in version 3, with a focus on the application domain.

New features:

- Out-of-the-box support for technical communication scenarios via SAP Cloud Identity Services
- Flexible configuration and extensibility for non-standard authorization strategies, for example when authenticating both via XSUAA and SAP Cloud Identity Services tokens
- Exports Typescript Types for a better development experience
- Improved events that allow correlating authorization checks with requests for logging and auditing
- Support for SAP Cloud Identity Services credentials with certificates changing at runtime, for example when using ZTIS or mounted Kyma service bindings

### Breaking Changes
CAP Node.js Applications should **not** need to make changes when updating to version 3.

For Non-CAP Node.js applications, please refer to the [migration guide](./doc/V2_V3_Migration_Guide.md).



## Usage
The following snippets give an example for the usage of the core API of the library.

### Set-up
```js
const { AuthorizationManagementService, IdentityServiceAuthProvider, AmsError } = require("@sap/ams");

let ams;
if (process.env.NODE_ENV === 'test') {
  // For local tests, init AMS with a locally compiled policy bundle and mocked policy assignments
  ams = AuthorizationManagementService.fromLocalDcn("./test/dcn", { // your compile target directory of the @sap/ams-dev compile-dcl script
    assignments: "./test/mockPolicyAssignments.json" // a file path of your choice or an in-memory structure
  });
} else {
  // For production, init AMS with the cloud policy and assignment bundle from the AMS server
  const identityService = ... // your @sap/xssec 4 IdentityService instance used for authentication
  ams = AuthorizationManagementService.fromIdentityService(identityService);
}

// Use the standard IdentityServiceAuthProvider or if necessary, write your own AuthProvider implementation instead
const authProvider = new IdentityServiceAuthProvider(ams)
    .withApiMapper(mapTechnicalUserApi, TECHNICAL_USER_FLOW)                // Optional: to authorize technical user tokens
    .withApiMapper(mapPrincipalPropagationApi, PRINCIPAL_PROPAGATION_FLOW); // Optional: to authorize principal propagation tokens

// Recommendation: Register a middleware behind the authentication middleware that allows authorization checks via the req object
const amsMw = authProvider.getMiddleware(); // IdentityServiceAuthProvider provides a pre-configured instance of AmsMiddleware
app.use(/^\/(?!health).*/i, authenticate, amsMw.authorize());

// You can identity Errors from @sap/ams via instanceof, for example in the express error handler:
app.use((err, req, res, next) => {
    if(err instance of AmsError) {
      // Error from @sap/ams library
      LOG.error("Error while authorizing user: ", err);
    } else {
      ... // other Error
    }

    return res.sendStatus(500);
});

// Make sure the readiness check of the application returns false before the following Promise resolves as AMS has not yet loaded the policy bundle required for authorization checks.
const AMS_STARTUP_TIMEOUT = process.env.AMS_STARTUP_TIMEOUT || 30; // maximum wait time in seconds
await ams.whenReady(AMS_STARTUP_TIMEOUT);
```

### Authorization checks
Authorization checks are performed on `Authorization` objects created by implementations of the `AuthProvider` interface. Typically, authorizations are based on a security context that is created from a valid token during authentication. For instance, `IdentityServiceAuthProvider` expects an instance of `IdentityServiceSecurityContext`.

```js
const securityContext = await createSecurityContext(identityService, { req }); // @sap/xssec 4 authentication
const authorizations = await authProvider.getAuthorizations(securityContext);
```

If the `AmsMiddleware#authorize()` handler is registered, it streamlines this process for all requests by placing an `Authorization` instance on the `req` object under the `AMS_AUTHORIZATIONS` symbol exported by `@sap/ams`.

```js
const { AMS_AUTHORIZATIONS } = require("@sap/ams");

function createOrder(req, res) {
  const authorizations = req[AMS_AUTHORIZATIONS];
}
```

### Handling Decisions
An authorization check will return a `Decision` object. A decision can be in one of three states:

- *granted*: the checked privilege is unconditionally granted
- *denied*: the checked privilege is unconditionally denied
- *conditional*: the checked privilege might be granted but there are outstanding conditions whose attributes have not been grounded to values in the attribute input.

It provides the following methods to distinguish between these cases:

```js
let decision;

// context-free privilege-check
decision = authorizations.checkPrivilege('delete', 'orders')
if(!decision.isGranted()) {
    return res.sendStatus(403);
}  

// contextual privilege check for a single entity
decision = authorizations.checkPrivilege('create', 'orders', { "$app.product.category" : "accessory" });
if(!decision.isGranted()) {
  return res.sendStatus(403);
}

// contextual privilege check for many entities
decision = authorizations.checkPrivilege('read', 'orders');
if(decision.isDenied()) {
  return res.sendStatus(403);
} else if (decision.isGranted()) {
  // definitive GRANT without outstanding WHERE condition
  return res.json(db.readAllOrders());
} else {
  // instance-based GRANT with outstanding WHERE condition
  const filter = decision.visitDCN(convertCall, convertValue); // convert condition to a filter for the DB layer
  return res.json(db.readOrders(filter));
}
```

### AmsMiddleware
Besides [`authorize()`](#authorization-checks), the `AmsMiddleware` provides additional handlers to define early privilege (pre-)checks on the endpoint layer:

```js
// returns 403 when no definitive (= no outstanding WHERE condition) GRANT delete ON orders is assigned to user
app.delete('/orders/:id', amsMw.checkPrivilege('delete', 'orders'), deleteOrder);

// returns 403 when no GRANT read ON orders is assigned to user. A potential WHERE condition for the GRANT is acceptable which needs to be evaluated in the service handler.
app.get('/orders', amsMw.precheckPrivilege('read', 'orders'), getOrders);

// returns 403 when no definitive GRANT read ON products or no (definitive or conditional) GRANT create ON orders is assigned to user
app.post('/orders', amsMw.checkPrivilege('read', 'products'), amsMw.precheckPrivilege('create', 'orders'), createOrder);
```

The benefits of defining privilege checks on the endpoint level are:
  - concise syntax
  - provides central overview of required privileges for different parts of the application
  - prevents accidental information leaks, for example by returning 404 instead of 403 while preparing the actual authorization check in the service handler

### Technical communication
Technical communication via SAP Cloud Identity Services is supported out-of-the-box by the [IdentityServiceAuthProvider](#identityserviceauthprovider).

### Testing
For CAP applications, see [here](#testing-policies).

To test your application locally, without real SAP Cloud Identity Services tokens and AMS server, we recommend mocking an `@sap/xssec` SecurityContext during authentication that contains the relevant information. Then, the `IdentityServiceAuthProvider` will execute the same way it does in production, resulting in realistic authorization behavior of the application.

The DCL package called `local` has a special semantic. It is meant for DCL files with policies that are only relevant for testing but not for production. Its policies are ignored during the base policy upload, even if they are contained during the upload. You can use it to test runtime policies that build on top of your base policies without deploying them.

Follow the `@sap/ams-dev` [documentation](https://www.npmjs.com/package/@sap/ams-dev?activeTab=readme#DCL-compilation) to set up your application for testing.

### Events/Logging
Consumer applications can listen to events of the `AuthorizationManagementService` instance to log authorization checks and/or create audit log events:

```js
ams.on("authorizationCheck", event => {
  if(event.type === "checkPrivilege") {
    if (event.decision.isGranted()) {
      console.log(`Privilege '${event.action} ${event.resource}' for ${event.context.token.scimId} was granted based on input`, event.input);
    }
  } else if (event.type === "getPotentialPrivileges") {
    ...
  }
});
```

### Samples
The [ams-samples-node](https://github.com/SAP-samples/ams-samples-node) repository contains samples that demonstrate the usage of this library.
- [ams-cap-nodejs-bookshop](https://github.com/SAP-samples/ams-samples-node/tree/main/ams-cap-nodejs-bookshop) - CAP Node.js application
- [ams-nodejs-sample](https://github.com/SAP-samples/ams-samples-node/tree/main/ams-nodejs-sample) - Express based Node.js application

## API

### AuthorizationManagementService

#### Construction
- **`fromIdentityService(identityService, config?): AuthorizationManagementService`**  
  Creates an instance using the DCN and policy assignments fetched with SAP Cloud Identity Services credentials.  
  - `identityService` (object): SAP Cloud Identity Services object with **certificate-based** credentials.  

- **`fromLocalDcn(dcnRoot, config?): AuthorizationManagementService`**  
  Creates an instance using locally compiled DCL files for testing.  
  - `dcnRoot` (string): Root directory of the DCN bundle.  
  - `config` (object, optional):  
    - `watch` (boolean, default: `false`): Watch for file changes.  
    - `assignments` (string | PolicyAssignments, optional): Path to JSON file or `PolicyAssignments` object.  
    - `debounceDelay` (number, default: `1000`): Debounce delay in ms.  
    - `start` (boolean, default: `true`): Control whether to immediately start downloading the AMS bundle.

If an instance has been constructed with `config.start=false`, the loading of the AMS bundle must be started manually. This is useful when ZTIS is used and the credentials do not yet contain a certificate when the instance is created:

```js
const ams = AuthorizationManagementService.fromIdentityService(identityService, { start: false });
// fill credentials with certificate asynchronously from ZTIS
getCertificateFromZTIS().then((cert, key) => {
  identityService.setCertificateAndKey(cert, key);
  ams.start();
});
```

#### Readiness Checks
- **`whenReady(timeoutSeconds = 0): Promise<void>`**  
  Returns a Promise that resolves once the instance is ready for authorization checks. If it has not received policies and assignments after the specified timeout interval, the Promise is rejected.  
  - `timeoutSeconds` (number): Max wait time in seconds.  

- **`isReady(): boolean`**  
  Checks if the instance is ready for authorization checks.  

---

### AuthProvider \<\<interface\>\>
This is a generic interface. Its implementations define *how* to construct instances of `Authorizations` and from which application context.

- **`C`**: The generic type of the context object.

#### Methods
- **`getAuthorizations(context: C): Promise<Authorizations>`**  
  - `context` (`C`): The context object from which authorizations are derived.  

#### Implementations
- **[`AuthorizationManagementService`](#authorizationmanagementservice)**: Implements `AuthProvider<PolicySet>`.
- `XssecAuthProvider`: Abstract base class implementing `AuthProvider<SecurityContext>` for authorization with an `@sap/xssec` SecurityContext.
  - **[`IdentityServiceAuthProvider`](#identityserviceauthprovider)**: Implements `AuthProvider<IdentityServiceSecurityContext>` for authorization of SAP Cloud Identity Services tokens.
      - **[`HybridAuthProvider`](#hybridauthprovider)**: Implements `AuthProvider<IdentityServiceSecurityContext | XsuaaSecurityContext>` for authorization of SAP Cloud Identity Services tokens or XSUAA tokens.
- `CdsAuthProvider`: Abstract base class implementing `AuthProvider<CdsContext>` for authorization with a cds context in CAP applications.
  - **[`CdsXssecAuthProvider`](#cdsxssecauthprovider)** Extends `CdsAuthProvider` for cds contexts with an `@sap/xssec` SecurityContext in `cdsContext.http.req.authInfo`.
    - **`CdsMockedAuthProvider`**: Extends `CdsXssecAuthProvider` by mocking an `@sap/xssec` SecurityContext for `auth.kind = mocked` users.

### IdentityServiceAuthProvider

- Implements `AuthProvider<IdentityServiceSecurityContext>`.

#### Methods
- **`constructor(ams: AuthorizationManagementService): IdentityServiceAuthProvider`**  

- **`withApiMapper(mapApi: ApiMapper, flow?: TechnicalUserFlow): IdentityServiceAuthProvider`**  
  Defines an API mapper for mapping consumed SAP Cloud Identity Services APIs to policies.  
  - `mapApi` ((api : string, securityContext : IdentityServiceSecurityContext) =>  string | string[] | undefined): A function that maps a consumed API to no (undefined), one (string) or multiple (string[]) fully-qualified policy name(s).
  - `flow` (TECHNICAL_USER_FLOW | PRINCIPAL_PROPAGATION_FLOW, optional): A technical user flow exported by `@sap/ams` for which to apply the mapper. If omitted, applies it for both flows.  

- **`withServicePlanMapper(servicePlanMapper: ServicePlanMapper): IdentityServiceAuthProvider`**  
  Defines a service plan mapper for BTP reuse service for mapping BTP service plans of consumers to policies.  
  - `servicePlanMapper` ((plan : string, securityContext : IdentityServiceSecurityContext) =>  string | string[] | undefined): A function that maps a service plan to no (undefined), one (string) or multiple (string[]) fully-qualified policy name(s).

- **`getAuthorizations(securityContext: IdentityServiceSecurityContext): Promise<Authorizations>`**  
  Returns the results of getUserAuthorizations or getTechnicalAuthorizations depending on the token. If both are available, returns the logical intersection (principal propagation).

- **`getUserAuthorizations(securityContext: IdentityServiceSecurityContext): Promise<Authorizations | null>`**  
  Extracts authorizations for a user based on assigned policies.  

- **`getTechnicalAuthorizations(securityContext: IdentityServiceSecurityContext): Promise<Authorizations | null>`**  
  Extracts authorizations for technical communication scenarios based on the provided API or service plan mappers.  

- **`getInput(securityContext: IdentityServiceSecurityContext): AttributeInput`**  
  Returns default input for $env.$user attributes used in all authorization checks.  

- **`supportsSecurityContext(securityContext: SecurityContext): boolean`**  
  Checks if the given security context is supported, for example to skip authorization or early exits.  

### `HybridAuthProvider`

- Implements `AuthProvider<IdentityServiceSecurityContext | XsuaaSecurityContext>` by extending `IdentityServiceAuthProvider`.

#### Methods:
- `constructor(ams: AMS, scopeToPolicyMapper: (ScopeMapper)`
  - `mapScope` ((scope: string, securityContext: XsuaaSecurityContext) => string | string[] | undefined): A function that maps a consumed API to no (undefined), one (string) or multiple (string[]) fully-qualified policy name(s).
- `getAuthorizations(securityContext: IdentityServiceSecurityContext | XsuaaSecurityContext): Promise<Authorizations>`
  - For `XsuaaSecurityContext`: Maps token scopes to policies and identifies the tenant using the `zid` field.
  - For `IdentityServiceSecurityContext`: Delegates to the base class implementation.

---

### CdsXssecAuthProvider

- Implements `CdsAuthProvider<CdsContext>` for CdsContexts with an `@sap/xssec` SecurityContext in `cdsContext.http.req.authInfo`.

#### Public Properties
- **`xssecAuthProvider`** The `XssecAuthProvider` implementation used to build `Authorizations` from the `SecurityContext`. Can be customized or replaced with a custom implementation.

#### Methods
- **`getAuthorizations(cdsContext: CdsContext): Promise<Authorizations>`**  
Retrieves the SecurityContext from `cdsContext.http.req.authInfo` and uses `xssecAuthProvider` to build [Authorizations](#authorizations) from it.

- **`getCdsInput(cdsContext: CdsContext, definition: @sap/cds.linked.LinkedDefinitions, event: string): AttributeInput`**  
  Returns default input for AMS attributes used in all authorization checks. By default, returns the input provided by `xssecAuthProvider` but can be overwritten with an implementation that returns custom input when authorizing requests for the given cds event on the given cds model definition. 

- **`supportsCdsContext(cdsContext: CdsContext): boolean`**  
  Checks if the given cds context is supported to be handled by this implementation, for example to skip authorization or early exits.  

### Authorizations

An abstract representation of authorizations determined by the strategy of the [AuthProvider](#authproviderc) from which it was constructed.

#### Methods

- **`constructor(ams: AuthorizationManagementService, policySet: PolicySet, context: any): Authorizations`**  

- **`checkPrivilege(action: string, resource: string, input?: AttributeInput): Decision`**  
  Checks if the action is allowed on the resource.  
  - `input` (AttributeInput, optional): A flat input object that grounds fully-qualified attribute names to values, for example { "$app.product.category" : "accessory" }.
  Attributes that are not grounded in the input are considered *unknown* and may result in a conditional Decision.

- **`getPotentialResources(): Set<string>`**  
  Collects all resources for which at least one action is potentially granted, ignoring conditions.  

- **`getPotentialActions(resource: string): Set<string>`**  
  Collects all actions that are potentially granted for a given resource, ignoring conditions.  

- **`getPotentialPrivileges(): Array<{action: string, resource: string}>`**  
  Collects all action/resource combinations that are potentially granted, ignoring conditions.  

- **`withDefaultInput(input: AttributeInput): Authorizations`**  
  Sets default input used for all authorization checks.  
  - `input` (AttributeInput, optional): A flat input object that grounds fully-qualified attribute names to values, for example { "$env.$user.origin" : "EU" }

- **`limitedTo(other: Authorizations): Authorizations`**  
  Limits the authorizations of this instance to the authorizations of another instance. Subsequent authorization checks on this instance will use the logical intersection of its authorizations and those of the other Authorization instances.

---

### Decision

Represents the result of an authorization check. A decision can be in one of three states: *granted*, *denied*, or *conditional*.

#### Methods

- **`isGranted(): boolean`**  
  Returns true if the authorization check resulted in a definitive GRANT with no outstanding conditions.

- **`isDenied(): boolean`**  
  Returns true if the authorization check resulted in a definitive DENY with no outstanding conditions.

- **`<T,V>visit(visitCall: CallVisitor, visitValue: ValueVisitor) : T`**
  This method can be used to visit the condition tree bottom-up. The visitor calls `visitValue` whenever it encounters a value (attribute reference or literal) or `visitCall` when it encounters a function call in the condition, for example a call to the "EQ" function to compare two arguments for equality.
    - `visitCall` ((call : string, args : (DcnReference|DcnValue|V)[]) => T): A function that visits the given call and its arguments, for example to transform `("EQ", args)` => `"args[0] = args[1]"`. The call names are the constants from `DclConstants.operators`.
    - `transformValue` ((value : DcnReference|DcnValue) => DcnReference|DcnValue|V): A function that visits the given attribute reference or literal, for example to translate AMS references to database field names.
    - {{ref:string}} `DcnReference`
    - {number|string|boolean|number[]|string[]|boolean[]} `DcnValue` 

- **`filterUnknown(unknowns: string[]): Decision`**  
  Returns a new `Decision` instance that is the result of keeping only the fully-qualified attributes as *unknown*, evaluating the remaining attributes as *unset*.

- **`apply(flatInput: { [attributeName: string]: DcnValue }): Decision`**  
  **EXPERIMENTAL**: If you plan to use this method in production, please open a ServiceNow ticket on component `BC-CP-CF-SEC-LIB`.
  Uses the data provided in `flatInput` to create a new Decision. Simple example on a decision `d` that represents `a = 3` and `b = 4`:
  ```javascript
  d.apply({ a: 3 }) // returns a Decision that represents b=4
  d.apply({ a: 3, b: 4 }) // returns a Decision that represents true
  d.apply({ a: 1 }) // returns a Decision that represents false
  d.apply({ a:3 }).apply({ b: 4 }) // returns a Decision that represents true
  ```
   
### Events

Instances of `AuthorizationManagementService` emit the following events to which consumers can subscribe via the `on(eventName: string, function(event: AmsEvent) : void)` method.

- **`authorizationCheck`**: Emitted during various authorization operations by the methods of [Authorizations](#authorizations). The event object contains the following properties based on the type of operation:
  - **`type`**: The type of the event. Possible values are:
    - `"checkPrivilege"`: Emitted during a privilege check. Additional payload:
      - **`action`**: The action being checked.
      - **`resource`**: The resource being checked.
      - **`input`**: The input used for the authorization check.
      - **`decision`**: The decision of the authorization check.
    - `"getPotentialActions"`: Emitted when collecting potential actions for a resource. Additional payload:
      - **`resource`**: The resource for which actions are being collected.
      - **`potentialActions`**: The set of actions that are potentially granted for the given resource.
    - `"getPotentialResources"`: Emitted when collecting potential resources. Additional payload:
      - **`potentialResources`**: The set of resources for which at least one action is potentially granted.
    - `"getPotentialPrivileges"`: Emitted when collecting potential privileges. Additional payload:
      - **`potentialPrivileges`**: The list of potentially granted privileges, each containing:
        - **`action`**: The action.
        - **`resource`**: The resource.
  - **`authorizations`**: The `Authorizations` instance that triggered the event.
  - **`context`**: The context of the event from which the `Authorizations` instance was created.

- **`error`**: Emitted when an error occurs in a background operation. The event object contains the following properties:
  - **`type`**: The type of the event. Possible values are:
    - `"bundleRefreshError"`: Emitted when the BundleLoader fails to refresh the current policies and assignments bundle, for example due to a failed request to the AMS server. This event is not emitted when the initial loading fails. Use the `whenReady` method instead to check for the initial readiness of AMS.
  - **`error`**: The `AmsError` instance that describes the error.



## CAP integration

AMS can be used for authorization in CAP applications to provide both role and instance-based authorization management at runtime.
The integration is based on the standard cds annotations for authorization via roles and optional ams-specific annotations for instance-based authorization filters. 

For production, AMS is meant to be used with SAP Cloud Identity Services as authentication solution but mocked authentication can be used to test authorization without the need for SAP Cloud Identity Services tokens. This is useful when the application is started locally or to execute automated tests.

When deployed, the application's authorization policies are managed in your application using the administration console of SAP Cloud Identity Services. During development, policies can be edited in the IDE and assigned to mocked users via the `cds env` configuration of non-production profiles.

The plugin runtime has the following expectations on the project environment. If your projects differs from this, for example due to a custom auth middleware, you can customize the plugin via [cds env configuration](#configuration) and the [plugin runtime configuration](#plugin-runtime).

| **Default**                                     | **Value**                                                                       | **Customize**
|------------------------------------------       | ------------------------------------------------------------------------------- | -----------------
| SAP Cloud Identity Services credentials location| `cds.env.requires.auth.credentials`                                             | [Provide credentials manually](#custom-sap-cloud-identity-services-credential-location)
| amsPluginRuntime.authProvider.xssecAuthProvider | Defaults to `IdentityServiceAuthProvider`                                       | [Replace default XssecAuthProvider](#custom-xssecauthprovider)
| @sap/xssec SecurityContext location             | `IdentityServiceSecurityContext` expected under `cds.context.http.req.authInfo` | [Replace default CdsAuthProvider](#custom-cdsauthprovider)
| amsPluginRuntime.authProvider                   | Defaults to `CdsXssecAuthProvider`                                              | [Replace default CdsAuthProvider](#custom-cdsauthprovider)

### cds add ams
The `cds add ams` command configures the application for AMS.

It installs both the AMS runtime plugin for cds (@sap/ams) and the AMS development plugin for cds (@sap/ams-dev):

```shell
npm i @sap/ams
npm i --save-dev @sap/ams-dev
```

Additionally, it configures the application's deployment artefacts (`mta`, `helm`, `cf-manifest`) for AMS, for example by adding configuration for the [ams policy deployer application](#base-policy-upload).

### Features
#### Role-based authorization
AMS can be used to assign roles from the cds authorization model to users via authorization policies. For example, the following policy would grant the `Admin` role when assigned to a user:

```SQL
POLICY Admin {
  ASSIGN ROLE Admin;
}
```

The AMS plugin implements a middleware that computes the roles of SAP Cloud Identity Services users before each request by overriding the [`user.is`](https://cap.cloud.sap/docs/node.js/authentication#user-is) function.

#### Instance-based authorization
Policies that assign roles can be extended with attribute filters for instance-based authorization. This allows administrators to create custom policies at runtime for fine-grained control. This is most useful to give customer administrators in multi-tenant applications fine-grained control over their user's rights.

Via `@ams.attributes` annotations, the AMS attributes are mapped to elements (or association paths) in the cds model. Whenever requests access cds resources with those elements, the result is filtered based on the attribute conditions computed by AMS. The conditions are based on the `WHERE` condition behind role assignments in policies.

`ams.attributes` annotations are supported on *aspects*, *entities* and *actions/functions bound to a single entity* as those are the [cds resources that support *where* conditions](https://cap.cloud.sap/docs/guides/security/authorization#supported-combinations-with-cds-resources).

Example annotations
```js
aspect media {
    price: Integer;
    genre: Association to Genres;
}

annotate media with @ams.attributes: {
    price: (price),
    genre: (genre.name)
};

@restrict: [{ grant:['READ'], to: ['Reader'] }]
entity Books : media {
  // ...
}
```

Example schema.dcl
```sql
SCHEMA {
  genre: String,
  price: Number
}
```

Example basePolicies.dcl
```sql
POLICY "Reader" {
    ASSIGN ROLE "Reader" WHERE genre IS NOT RESTRICTED AND price IS NOT RESTRICTED;
}
```

Example admin policy (created at runtime via the administration console of SAP Cloud Identity Services)
```sql
POLICY JuniorReader {
    USE "Reader" RESTRICT genre IN ('Fantasy', 'Fairy Tale'), price < 20;
}
```

#### Validation
The AMS plugin [@sap/ams](https://www.npmjs.com/package/@sap/ams) adds a [custom build task](https://cap.cloud.sap/docs/guides/deployment/custom-builds#custom-build-plugins) for *ams*.

It validates `@ams.attributes` annotations for syntactic correctness and type coherence during `cds build`, and whenever a model is loaded if the application was started via `cds serve`, `cds watch` or `cds.test`. This gives early feedback about the correctness of the annotations during development:

- validates that `@ams.attributes` annotations map AMS attributes syntactically correct to cds elements via expression syntax.
- if a manually written/adjusted `schema.dcl` is used, validates that all AMS attributes mapped via `@ams.attributes` annotations exist and have a type that fits each cds element to which they are mapped.
- if a generated `schema.dcl` is used, validates that the inferred type of each AMS attribute is coherent across all `@ams.attributes` mappings in which it is mapped to a cds element.

#### Base Policy Generation
Unless disabled, the AMS build task generates base policies for roles that occur in the `@requires` and `@restrict` annotations of the cds model.

Example annotation
```js
@restrict: [{ grant:['READ'], to: ['Reader', 'Inquisitor'] }]
entity Books as projection on my.Books { *,
```

Example `basePolicies.dcl`
```sql
POLICY "Reader" {
  ASSIGN ROLE "Reader";
}

POLICY "Inquisitor" {
  ASSIGN ROLE "Inquisitor";
}
```

It also generates a `schema.dcl` that defines AMS attributes with inferred types based on `@ams.attributes` annotation for [instance-based authorization](#instance-based-authorization).

:information_source: Policy generation also occurs during `cds serve`, `cds watch` and `cds.test` to react to changes of cds annotations.

DCL Files that have been modified manually will not be overridden during generation to allow manual changes of the schema and base policies. To force re-generation of a generated DCL file, delete it prior to the next DCL generation.

#### Base Policy Upload
During `cds build`, a policy deployer application will be generated in `<cds.build.target>/policies`:

[*Node.js default*] `gen/policies`\
[*Java default*] `srv/src/gen/policies`

It requires a certificate-based binding to the Identity service and must be deployed together with the application to upload the base policies to the AMS.
For `helm` chart deployments, it can be built via `containerize` as a Node.js image and deployed with the `content-deployment` helm template.

#### Testing policies
The DCL package called `local` has a special semantic. It is meant for DCL files with policies that are only relevant for testing but not for production. Its policies are ignored during the base policy upload, even if they are contained during the upload.

For example, you can create fictitious admin policies inside this package to test whether extensions of base policies work as expected.

`@sap/ams-dev` automatically compiles DCL files to the `DCN` format which is required for local policy evaluations. This happens when the application is started via `cds start`, `cds watch` or via `cds.test`, so that the application should be able to do authorization checks via AMS even during development without deploying the policies first to the SAP Cloud Identity Services.

#### Mocked user testing
For testing and development purposes, policies can be assigned to mocked users via the `cds env` configuration of non-production profiles:

```json
{
    "requires": {
        "auth": {
            "[development]": {
                "kind": "mocked",
                "users": {
                    "carol": {
                        "policies": [
                            "cap.Reader"
                        ]
                    },
                    "dave": {
                        "policies": [
                            "cap.Admin",
                            "cap.Reader"
                        ]
```

It is important to assign policies via their fully-qualified name which includes the DCL package (`cap` in this example).

Of course, you can still assign roles via the `roles` array directly to mocked users.
Assigning policies instead of roles is mostly useful for testing instance-based authorization via AMS as the attribute filters only apply to roles assigned via AMS policies.

#### Hybrid testing
If [autoDeployDcl](#configuration) is enabled when bound to an `ias` instance for authentication, for example during [Hybrid testing](https://cap.cloud.sap/docs/advanced/hybrid-testing), the AMS plugin uploads the base policies to the AMS server instead of compiling them to `DCN`. From there, they will be downloaded into the DCN engine shortly after that via polling and subsequently used for authorization checks.

**Be very careful though with `autoDeployDcl` and do not enable it when bound against a productive system or it will override the deployed base policies with the current development state!**

An application bound to an `ias` instance for authentication will always download its policy bundle from the corresponding AMS instance. This means, hybrid testing can be used to run an application locally with the policies from an AMS instance (including admin policies created at runtime) without overriding them. Downloading policies in hybrid mode does not require `autoDeployDcl` to be enabled.

### Configuration
The AMS plugins are configured inside the `requires.auth.ams` property of the [cds env](https://cap.cloud.sap/docs/node.js/cds-env#project-settings).\
It supports the following properties with the following [`default`]:

- **generateDcl** *true/false* [`true`]: unless set to `false`, generates `basePolicies.dcl` and `schema.dcl` from the cds model (see [Base Policy Generaiton](#base-policy-generation))
- **dclRoot** *string* [`ams/dcl`]: the root DCL folder (containing the `schema.dcl`) which is used for generating DCL, compiling DCL to DCN during development, uploading DCL etc.
- **dclGenerationPackage** *string* [`cap`]: name of the DCL package to which basePolicies.dcl is generated
- **dcnRoot** *string* [`gen/dcn` / `srv/src/gen/ams/dcn` (Java)]:  folder for DCL to DCN compilation results during development (see [Testing Policies](#testing-policies))
- **policyDeployerRoot** *string* [`gen/policies` / `srv/src/gen/policies` (Java)]:  folder of the ams policy deployer application created during `cds build` (see [Base Policy Upload](#base-policy-upload))
- **authPushDcl** *true/false* [`false`]:  if enabled, uploads the base policies to the AMS server (see [Hybrid testing](#hybrid-testing)

All AMS properties also work lowercased (for example `generatedcl`) and this casing has priority of the camelCase (for example `generateDcl`) version of properties. This means, all [cds env sources](https://cap.cloud.sap/docs/node.js/cds-env#sources-for-cds-env) including case-insensitive ones are supported such as setting properties via environment variables (`CDS_REQUIRES_AUTH_AMS_GENERATEDCL`) which gets mapped to lowercased versions of the property. 

#### Plugin Runtime
It is possible to replace the following defaults in the runtime of the plugin to configure it for non-standard project environments.

##### Custom SAP Cloud Identity Services credential location

If the SAP Cloud Identity Services credentials are not available under the default location (`cds.env.requires.auth.credentials`), you need to manually provide them:

server.js
```js
const { amsCapPluginRuntime } = require("@sap/ams");

amsCapPluginRuntime.credentials = { ... } // manually provide the SAP Cloud Identity Services credentials from service binding
```

##### Custom XssecAuthProvider

It is possible to override the `XssecAuthProvider` implementation used by the default `CdsAuthProvider` internally to a different implementation.
For example, the following snippet shows how it can be replaced in projects that authenticate both via SAP Cloud Identity Services and XSUAA.

server.js
```js
const { amsCapPluginRuntime, HybridAuthProvider } = require("@sap/ams");

const mapScope = (scope, securityContext) => scope; // your custom scope to policy mapper
amsCapPluginRuntime.authProvider.xssecAuthProvider = new HybridAuthProvider(amsCapPluginRuntime.ams, mapScope) // authorization for both SAP Cloud Identity Services and XSUAA tokens
```

##### Custom CdsAuthProvider

server.js
```js
const { amsCapPluginRuntime } = require("@sap/ams");

amsCapPluginRuntime.authProvider = new MyCustomCdsAuthProvider(); // your custom CdsAuthProvider implementation if you do not authorize based on @sap/xssec SecurityContexts
```

#### Technical communication
By default, the plugin runtime uses an [IdentityServiceAuthProvider](#identityserviceauthprovider) which supports technical communication via SAP Cloud Identity Services out-of-the-box.
You can access it as follows in the default plugin runtime to configure which policies to use for technical communication scenarios:

```js
const { amsCapPluginRuntime, TECHNICAL_USER_FLOW, PRINCIPAL_PROPAGATION_FLOW } = require("@sap/ams");
const { mapTechnicalUserApi, mapPrincipalPropagationApi } = require('../ams/apis.js'); // your custom API mappers

const identityServiceAuthProvider = amsCapPluginRuntime.authProvider.xssecAuthProvider;
identityServiceAuthProvider
  .withApiMapper(mapTechnicalUserApi, TECHNICAL_USER_FLOW)
  .withApiMapper(mapPrincipalPropagationApi, PRINCIPAL_PROPAGATION_FLOW);
```

### Logging
The AMS CAP plugins log to namespace `ams` in CAP. To see [debug logs](https://cap.cloud.sap/docs/node.js/cds-log#debug-env-variable) during development, turn it on for this namespace, for example via

```shell
DEBUG=ams cds watch
```



## Deploy DCL

The DCL bundle is typically deployed together with the application to ensure the application's authorization checks are always done with the most current set of policies.

### DCL Deployer Application
The recommended way to deploy DCL, is by deploying a minimal Node.js\* application along with your application that contains the DCL bundle and has a service binding to the target SAP Cloud Identity Services instance.

This module provides a ready-to-use [package.json](./ams-dcl-content-deployer/package.json) for such an application:

```js 
{
  "name": "ams-dcl-content-deployer",
  "version": "2.0.0",
  "dependencies": {
    "@sap/ams": "^2"
  },
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "start": "npx --package=@sap/ams deploy-dcl"
  }
}
```

It expects to find the DCL bundle in a folder called `dcl` next to the package.json. As you can see, the application's start script simply calls the [deploy-dcl](#deploy-dcl-1) script of this module. Afterwards, it exits with exit code 0 (*success*) or 1 (*error*).

\* *A Node.js installation is not required during development, so this method also works nicely for applications written in other languages such as Java.*

#### Building the DCL Deployer Application
1. Create a new folder for the Deployer application with the ready-to-use [package.json](./ams-dcl-content-deployer/package.json).
2. Extend your build script to copy your DCL root folder to the `dcl` folder of your Deployer application

#### Deploying the DCL Deployer Application
It depends on the target platform and deployment method how best to deploy the DCL Deployer Application alongside your application.
Below is a list of templates for the most common scenarios.

Make sure to always bind the DCL deployer to the Identity service instance with a **certificate-based** service binding because this is required by the AMS server for authentication.


<details><summary>MTA</summary>

\
The following entry defines a module that registers and executes a CF task to deploy the DCL bundle and shuts down on success to free resources.

mta.yaml
```yaml
modules:
  - name: {{appName}}-ams-policies-deployer
      type: javascript.nodejs
      path: {{dclDeployerAppFolder}}
      parameters:
        buildpack: nodejs_buildpack
        no-route: true
        no-start: true
        tasks:
          - name: deploy-dcl
            command: npm start
            memory: 512M
      requires:
        - name: {{identityServiceInstanceName}}
          parameters:
            config:
              credential-type: X509_GENERATED
              app-identifier: policy-deployer
```
</details>



<details><summary>CF Manifest</summary>

\
Unlike MTAs, CF manifests do not support the execution of CF tasks and CF considers applications as crashed, even when their process exits with status code 0. For this reason, the deployer application needs to idle and be manually stopped after the DCL deployment. It will report about success or failure in its logs.

manifest.yml
```yaml
applications:
  - name: {{appName}}-ams-policies-deployer
    path: {{dclDeployerAppFolder}}
    no-route: true
    health-check-type: none
    memory: 256M
    instances: 1
    buildpack: nodejs_buildpack
    command: (npm start && echo "This application may now be stopped to free resources." || echo "AMS policy deployment unsuccessful.") && sleep infinity
    services:
      - name: {{identityServiceInstanceName}}
        parameters:
          credential-type: X509_GENERATED
          app-identifier: policy-deployer
```
</details>



<details><summary>Unified Runtime Helm Charts</summary>
Build and deploy an image from your Application deployer and replace {{YourAmsDclDeployerImage}} below with its URL.

\
Charts.yaml
```yml
dependencies:
    # ...

  - name: content-deployment
    alias: ams-policies-deployer
    version: ">0.0.0"
```

values.yaml
```yml
# ...

ams-policies-deployer:
    image:
        repository: {{YourAmsDclDeployerImage}}
    bindings:
        identity:
            serviceInstanceName: {{identityServiceInstanceName}}
            parameters:
                credential-type: X509_GENERATED
                app-identifier: policy-deployer
```
</details>



<details><summary>Kubernetes Job</summary>
Build and deploy an image from your Application deployer and replace {{YourAmsDclDeployerImage}} below with its URL.

\
ams-dcl-deployer.yml
```yml
apiVersion: batch/v1
kind: Job
metadata:
  name: {{appName}}-ams-policies-deployer
spec:
  completions: 1
  parallelism: 1
  ttlSecondsAfterFinished: 1209600
  template:
    spec:
      imagePullSecrets:
        - name: {{imagePullSecret}}
      containers:
      - image: {{YourAmsDclDeployerImage}}
        name: ams-policies-deployer
        env:
        - name: SERVICE_BINDING_ROOT
          value: /bindings
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop:
            - ALL
          privileged: false
          runAsNonRoot: true
          readOnlyRootFilesystem: false
        volumeMounts:        
        - mountPath: /bindings/identity/
          name: identity-binding
          readOnly: true
      restartPolicy: OnFailure
      volumes:      
      - name: identity-binding
        secret:
          secretName: {{certBasedIdentityBinding}}
```
</details>

### deploy-dcl script

The script pushes a DCL bundle (including schema.dcl, DCL root package and all subpackages) to the Identity service instance from the environment (see `deploy-dcl --help`):

```
Usage: deploy-dcl -d [DCL_ROOT_DIR] -c [CREDENTIALS_FILE] -n [DEPLOYER_APP_NAME]

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -d, --dcl          [optional] path to the directory that contains the DCL root
                     package. If a path is provided via environment variable
                     AMS_DCL_ROOT, it overrides this option.
                                                       [string] [default: "dcl"]
  -c, --credentials  [optional] path to a JSON file containing the credentials
                     object of an Identity service binding. If omitted, will try
                     to find and use an Identity service binding from the
                     process environment.                               [string]
  -n, --name         [optional] a descriptive name of this deployer application
                     to trace back the currently deployed DCL bundle on the AMS
                     server to its source when DCL is deployed from more than
                     one source. If a name is provided directly via environment
                     variable AMS_APP_NAME or indirectly as application_name via
                     VCAP_APPLICATION on Cloud Foundry or the pod name on K8s,
                     it overrides this option.
                                   [string] [default: "@sap/ams:deploy-dcl"]

Examples:
  deploy-dcl                                Pushes the DCL content in ./dcl
                                            (including schema.dcl, DCL root
                                            package and all subpackages) to the
                                            identity service instance from the
                                            environment.
  deploy-dcl -d src/dcl -c config/ias.json  Pushes the DCL content from
  -n bookshop-dcl-deployer                  ./src/dcl using the SAP Cloud Identity Services
                                            credentials in ./config/ias.json.
                                            The deployer app name for this
                                            upload will be set to
                                            "bookshop-dcl-deployer" to be able
                                            to trace back the upload source to
                                            this deployer.
```



## Resources

### Getting Support

As registered SAP customers, report your issue in creating a ticket for component **BC-CP-CF-SEC-LIB** on the [SAP Support Portal][SAPOSS]
See also [Getting Support][SAP_GS] in the SAP BTP documentation.

Note that consulting can **not** be offered via the support channels unless it is part of a customer's service plan.

### Open Source Legal Notices

[SAP Cloud Identity 1.0][SSCI10]

[SAPOSS]: https://support.sap.com/en/index.html
[SAP_GS]: https://help.sap.com/docs/btp/sap-business-technology-platform/btp-getting-support
[SSCI10]: https://support.sap.com/content/dam/launchpad/en_us/osln/osln/67837800100900008826_20170821125934.pdf