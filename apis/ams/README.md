<!-- This is the README for npmjs -->

# @sap/ams

This is the Node.Js runtime library used to perform [authorization checks](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies?locale=en-US) in applications which authenticate users via the [SAP Cloud Identity Services](https://help.sap.com/docs/identity-authentication?locale=en-US).

The module [@sap/ams-dev](https://www.npmjs.com/package/@sap/ams-dev) provides the corresponding tooling support during application development.

As ADC (Authorization Decision Controller) an in-process engine based on DCN (Data Control Notation) files is used in versions >= 1.17.0. Follow the migration guide in the CHANGELOG of @sap/ams-dev for version 1.0.0 to update your local test setup from OPA to DCN Engine. When using newer versions, the OPA buildpack on CF can be removed once a [policy deployer application](#dcl-deployer-application) has been configured for the upload of the base policies.

## Table of Contents

- [Installation](#installation)
- [Usage examples](#usage-examples)
- [API Description](#api-description)
  - [Attributes](#attributes)
  - [Policy Decision Point](#policy-decision-point)
  - [AttributeName](#attributename)
  - [Call](#call)
  - [RolesProvider](#rolesprovider)
  - [RolesCache](#rolescache)
- [Express Middleware](#express-middleware)
- [Logging](#logging)
- [Deploy DCL](#deploy-dcl)
  - [DCL Deployer Application](#dcl-deployer-application)
  - [deploy-dcl script](#deploy-dcl-script)
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
  - [Logging](#logging-1)
- [Resources](#resources)
  - [Reporting Incidents](#reporting-incidents)
  - [Open Source Legal Notices](#open-source-legal-notices)


## Installation
Via public [npmjs](https://www.npmjs.com/) repository:
```
npm install @sap/ams
```


## Usage examples
Basic allow request on resource *salesOrders* with action *read*:
```javascript
const pdp = new PolicyDecisionPoint();
const attr = new Attributes();
attr.setAction("read")
	.setResource("salesOrders")
	.setPolicies(["sales.readAllSalesOrders"])
let isAllowedRead = await this.pdp.allow(attr);
```
Basic allowFilterClause request with unknown *$env.$user*:
```javascript
const pdp = new PolicyDecisionPoint();
const attr = new Attributes();
attr.setAction("read")
	.setResource("salesOrders")
	.setPolicies(["sales.readAllSalesOrders"])
	.addUnknowns(AttributeName.common.APP, AttributeName.common.ENV);
const filterClause = await this.pdp.allowFilterClause(attr);
```


## API Description

### Attributes

The `Attributes` class (*see* `doc/API/Attributes.md`) wraps the input data for an authorization check.\
Internally a JSON object is created which could look approximately as follows:
```json
{
	"$dcl": {
		"action":                "read",
		"resource":              "SalesOrder",
		"tenant":                "12345",
		"principal2policies":    ["zone_a","user_a"],
	},
	"$app": {
		"country": "DE"
	},
	"$env": {

	},
	"unknowns": [
		"$app.SalesID"
 	],
	 "ignores": [
		 "input[\"$dcl\"][\"resource\"]"
	]
}
```


An Attributes object can be defined as follows:
```javascript
const attr = new Attributes()
	.setAction("read")
	.setPolicies(["ams.readAllSalesOrders"])
	.setResource("salesOrder")
	.setApp({"country": "DE"});
```
Note: Only principal2policies **or** policies can be set. The other one will be overridden.

### Policy Decision Point

The `PolicyDecisionPoint` or PDP (*see* `doc/API/PolicyDecisionPoint.md`) is the primary API for consumers and is responsible for performing authorization checks using the ADC.

### AttributeName

`AttributeName` (*see* `doc/API/AttributeName.md`) is a special type to store unknown and ignore values.

### Call

The `Call` class (*see* `doc/API/Call.md`) wraps a condition JSON returned from `pdp.allowFilterClause()`.\
In addition it wraps an enum `Call.type`:
```javascript
{
	AND:         "and",
	OR:          "or",
	EQ:          "eq",
	GT:          "gt",
	...
}
```
The Call API contains functionalities which should make working with big condition results easier.\
First the allowFilterClause condition is transformed into a `Call` object:
```javascript
const filterClause = await pdp.allowFilterClause(attributes);
const call = Call.fromCondition(filterClause.condition);
```
In the most common cases one wants to transform the condition into a sql like statement.\
Therefore a transform function has to be defined:
```javascript
function transformToSQL(item) {
	if (Call.isCall(item)) {
		switch (item.getType()) {
		case Call.types.EQ: {
			const callChildren = [ "(", item.getArgument(0), " = ", item.getArgument(1), ")" ];
			return callChildren;
		}
		case Call.types.OR: {
			...
		}
		case Call.types.LT: {
			...
		}}
		...
	}
	else if (AttributeName.isAttributeName(item)) {
		return item.toString();
	}
}
```
This transform function will then be recursively applied on the Call object:
```javascript
const sqlString = Call.transform(call, transformToSQL);
```

### RolesProvider

An instance of the `RolesProvider` class can be used to evaluate the roles (or scopes) of a user based on policies of the following form:

```
GRANT <role> ON $SCOPES;
```

To get an `Array<String>` of a user's roles, call `getRoles` on a previously constructed instance of RolesProvider:

```javascript
const pdp = new PolicyDecisionPoint();
const rp = new RolesProvider(pdp);
const principle = new Principle(app_tid, scim_id); // app_tid, scim_id taken from SAP Identity Service token

const roles = await rp.getRoles(principle);
```

Only one RolesProvider instance needs to be constructed and can be used to subsequently get the roles of different users.

### RolesCache
A RolesProvider can use an optional `RolesCache` to improve the performance of subsequent role evaluations for the same user.
It has the following configuration parameters:
- **TTL** [ms] (time-to-live): the lifetime of cache entries. Specifies how long the cached roles of a given user are used without evaluating them again via the ADC. If set too high, administrative changes of a user's policy assignments or changes in policies might affect the application's behavior with a high delay which reduces overall security.\
Default: **20 seconds**
- **limit**: maximum number of simultaneous cache entries. The cache follows a FIFO strategy: if necessary, the oldest cache entry is removed to make space for a new entry.\
Default: **10000**

A RolesCache can be constructed and used by a RolesProvider as follows:
```javascript
const rc = new RolesCache(10 * 60 * 1000, 1E6); // 10 min TTL and 100k users max
const rp = new RolesProvider(pdp).withRolesCache(rc);
```

#### RolesCache Sizing Guide
The memory consumed by the RolesCache can be estimated with the following formula:

```
Memory [Byte] = U*R*(2*S) + 84*U

U: #Users
R: #Roles per user
S: String length of role name
```

It is only an estimate and should be correct up to a factor of 2. Please use it only to get an understanding for the order of magnitude of the memory consumption.
Use `avg`, `min` or `max` values of the input parameters to get a memory estimation for the scenario that is most important to you.

The following table gives a quick reference of expected memory consumption:
| U (Users) | R (Roles) | S (String length) | Memory |
|----------:|----------:|------------------:|-------:|
|        1k |        10 |                20 |    1MB |
|        1k |        50 |                30 |    3MB |
|       10k |        10 |                20 |    5MB |
|      100k |        15 |                20 |   70MB |
|      100k |        50 |                10 |  100MB |
|      100k |        50 |                30 |  300MB |
|        1m |        25 |                20 |    1GB |

To compute a suitable user limit for your cache given a fixed amount of memory `M`, you can estimate it with the following formula:

$$U = \frac{M}{2 * R * S + 84}$$

### Express Middleware

The authorization checks can be performed by the provided express `middleware` (*see* `doc/API/Middleware.md`).

For example, to restrict the `/read` endpoint to users with `read` authority:
```javascript
const { middleware } = require('@sap/ams');

app.get("/read", [requireAuthentication, middleware.hasAuthority("read")], (req, res) => {
  res.send("User is allowed to read");
})
```

Note that the `req` object has to be extended with a `tokenInfo` object from  [@sap/xssec](https://www.npmjs.com/package/@sap/xssec) before calling `hasAuthority`.\
This can be achieved by registering the middleware after the passport middleware of @sap/xssec.

If a middleware returns false or fails an error will be thrown otherwise the next handler is called.


## Logging

The Node AMS library does **no** logging.\
But theres's a guide on **how to log Policy Decision Point results** (*see* `doc/Logging/LogPdp.md`) and/or perform **auditlogging** (*see* `doc/Logging/AuditLog.md`).




## Deploy DCL

The DCL bundle is typically deployed together with the application to ensure the application's authorization checks are always done with the most current set of policies.

### DCL Deployer Application
The recommended way to deploy DCL, is by deploying a minimal Node.js\* application along with your application that contains the DCL bundle and has a service binding to the target SAP Identity Service instance.

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
    command: (npm start && echo "This application may now be stopped to free resources." || echo "AMS Policy Deployment unsuccessful.") && sleep infinity
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

The script pushes a DCL bundle (including schema.dcl, DCL root package and all subpackages) to the Identity Service instance from the environment (see `deploy-dcl --help`):

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
                     object of an Identity Service binding. If omitted, will try
                     to find and use an Identity Service binding from the
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
  -n bookshop-dcl-deployer                  ./src/dcl using the Identity Service
                                            credentials in ./config/ias.json.
                                            The deployer app name for this
                                            upload will be set to
                                            "bookshop-dcl-deployer" to be able
                                            to trace back the upload source to
                                            this deployer.
```



## CAP integration

AMS can be used for authorization in CAP applications to provide both role and instance-based authorization management at runtime.
The integration is based on the standard cds annotations for authorization via roles and optional ams-specific annotations for instance-based authorization filters. 

For production, AMS is meant to be used with SAP Identity Service as authentication solution but mocked authentication can be used to test authorization without the need for Identity Service tokens. This is useful when the application is started locally or to execute automated tests.

When deployed, the application's authorization policies are managed in the Identity Service cockpit of your application. During development, policies can be edited in the IDE and assigned to mocked users via the `cds env` configuration of non-production profiles.

### cds add ams
Once available via `@sap/cds-dk`, the `cds add ams` command configures the application for AMS.

It installs both the AMS runtime plugin for cds (@sap/ams) and the AMS development plugin for cds (@sap/ams-dev):

```shell
npm i @sap/ams
npm i --save-dev @sap/ams-dev
```

Additionally, it configures the application's deployment artefacts (`mta`, `helm`, `cf-manifest`) for AMS, e.g. by adding configuration for the [ams policy deployer application](#base-policy-upload).

### Features
#### Role-based authorization
AMS can be used to assign roles from the cds authorization model to users via authorization policies. For example, the following policy would grant the `Admin` role when assigned to a user:

```SQL
POLICY Admin {
  ASSIGN ROLE Admin;
}
```

The AMS plugin implements a middleware that computes the roles of Identity Service users before each request by overriding the [`user.is`](https://cap.cloud.sap/docs/node.js/authentication#user-is) function.

#### Instance-based authorization
Policies that assign roles can be extended with attribute filters for instance-based authorization. This allows administrators to create custom policies at runtime for fine-grained control. This is most useful to customer administrators in a multi-tenant application.

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

Example admin policy (created at runtime via Identity Service cockpit)
```sql
POLICY JuniorReader {
    USE "Reader" RESTRICT genre IN ('Fantasy', 'Fairy Tale'), price < 20;
}
```

#### Validation
The AMS plugin [@sap/ams](https://www.npmjs.com/package/@sap/ams) adds a [custom build task](https://cap.cloud.sap/docs/guides/deployment/custom-builds#custom-build-plugins) for *ams*.

It validates `@ams.attributes` annotations for syntactic correctness and type coherence during `cds build` and whenever a model is loaded if the application was started via `cds serve`, `cds watch` or `cds.test`. This gives early feedback about the correctness of the annotations during development:

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

`@sap/ams-dev` automatically compiles DCL files to the `DCN` format which is required for local policy evaluations. This happens when the application is started via `cds start`, `cds watch` or via `cds.test`, so that the application should be able to do authorization checks via AMS even during development without deploying the policies first to the Identity Service.

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
If [autoDeployDcl](#configuration) is enabled when bound to an `ias` instance for authentication, e.g. during [Hybrid testing](https://cap.cloud.sap/docs/advanced/hybrid-testing), the AMS plugin uploads the base policies to the AMS server instead of compiling them to `DCN`. From there, they will be downloaded into the DCN engine shortly after that via polling and subsequently used for authorization checks.

**Be very careful though with `autoDeployDcl` and do not enable it when bound against a productive system or it will override the deployed base policies with the current development state!**

An application bound to an `ias` instance for authentication will always download its policy bundle from the corresponding AMS instance. This means, hybrid testing can be used to run an application locally with the policies from an AMS instance (including admin policies created at runtime) without overriding them. Downloading policies in hybrid mode does not require `autoDeployDcl` to be enabled.

### Configuration
The AMS plugins are configured inside the `requires.auth.ams` property of the [cds env](https://cap.cloud.sap/docs/node.js/cds-env#project-settings).\
It supports the following properties with the following [`default`]:

- **generateDcl** / **autoCompile** *true/false* [`true`]: unless set to `false`, generates `basePolicies.dcl` and `schema.dcl` from the cds model (see [Base Policy Generaiton](#base-policy-generation))
- **dclRoot** / **dclFolder** *string* [`ams/dcl`]: the root DCL folder (containing the `schema.dcl`) which is used for generating DCL, compiling DCL to DCN during development, uploading DCL etc.
- **dclGenerationPackage** *string* [`cap`]: name of the DCL package to which basePolicies.dcl is generated
- **dcnRoot** *string* [`gen/dcn` / `srv/src/gen/ams/dcn` (Java)]:  folder for DCL to DCN compilation results during development (see [Testing Policies](#testing-policies))
- **policyDeployerRoot** *string* [`gen/policies` / `srv/src/gen/policies` (Java)]:  folder of the ams policy deployer application created during `cds build` (see [Base Policy Upload](#base-policy-upload))
- **cache** *object*: Properties for of cache for user roles and role-based attribute filters
	- **enabled** *boolean* [`false` in `development` profile, `true` otherwise]: Disabling is not recommended in production due to performance reasons.
	- **TTL** *number* [default: `20000`]:  maximum life-time in `ms` for cache entries
	- **limit** *number* [default: `10000`]:  maximum cached entries  
- **authPushDcl** *true/false* [`false`]:  if enabled, uploads the base policies to the AMS server (see [Hybrid testing](#hybrid-testing)

All AMS properties also work lowercased (e.g. `generatedcl`) and this casing has priority of the camelCase (e.g. `generateDcl`) version of properties. This means, all [cds env sources](https://cap.cloud.sap/docs/node.js/cds-env#sources-for-cds-env) including case-insensitive ones are supported such as setting properties via environment variables (`CDS_REQUIRES_AUTH_AMS_GENERATEDCL`) which gets mapped to lowercased versions of the property. 

### Logging
The AMS CAP plugins log to namespace `ams` in CAP. To see [debug logs](https://cap.cloud.sap/docs/node.js/cds-log#debug-env-variable) during development, turn it on for this namespace, e.g. via

```shell
DEBUG=ams cds watch
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