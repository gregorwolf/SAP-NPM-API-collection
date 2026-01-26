# @sap/sbf

A Node.js framework to create a service broker in SAP Business Technology Platform (SAP BTP)

The Service Broker Framework (SBF) implements the [Open Service Broker API](https://www.openservicebrokerapi.org/).
It can be used in the Cloud Foundry environment of SAP Cloud Platform or on-premise in SAP HANA XS advanced model.

**Note**:  SBF Rejects requests for which the `X-Broker-API-Version` header is not set or its value is outside the supported interval [2.4, 3).

SBF can generate service credentials for the following authentication mechanisms:
* OAuth2 authentication with JSON Web Tokens (JWT) (via XSUAA _broker_ plan)
  * Named user via *user_token* flow
  * Technical user via *client_credentials* flow

After adding the necessary configuration, the SBF can be started directly as a service broker.
If necessary, it can be extended with custom JavaScript code.

All the information here is valid also for XS advanced, unless explicitly stated otherwise.
In the shell commands below replace `cf` with `xs` when working on XS advanced.

**Table of contents**

<!-- toc -->


- [Usage](#usage)
  * [Create a simple service broker](#create-a-simple-service-broker)
    + [Prerequisites](#prerequisites)
    + [Create a Node.js application](#create-a-nodejs-application)
    + [Add the Service Broker Framework](#add-the-service-broker-framework)
    + [Add the start command](#add-the-start-command)
    + [Create the service catalog](#create-the-service-catalog)
    + [Create XSUAA service instance](#create-xsuaa-service-instance)
    + [Create an instance of the Audit Log service](#create-an-instance-of-the-audit-log-service)
    + [Generate a secure broker password](#generate-a-secure-broker-password)
    + [Create an application manifest](#create-an-application-manifest)
    + [Push the broker application](#push-the-broker-application)
    + [Register the service broker](#register-the-service-broker)
    + [Use the service broker](#use-the-service-broker)
  * [Extend the service broker](#extend-the-service-broker)
  * [Asynchronous broker operations](#asynchronous-broker-operations)
  * [Service broker as middleware](#service-broker-as-middleware)
  * [Health HTTP endpoint](#health-http-endpoint)
  * [Custom parameters](#custom-parameters)
    + [Create service with custom parameters](#create-service-with-custom-parameters)
    + [Update service with custom parameters](#update-service-with-custom-parameters)
    + [Bind service with custom parameters](#bind-service-with-custom-parameters)
  * [Credentials providers](#credentials-providers)
    + [XSUAA](#xsuaa)
      - [XSUAA Service Selection Priority](#xsuaa-service-selection-priority)
      - [XSUAA Plans Support](#xsuaa-plans-support)
      - [Available XSUAA Plans](#available-xsuaa-plans)
      - [Creating reuse service instances](#creating-reuse-service-instances)
      - [Updating reuse service instances](#updating-reuse-service-instances)
      - [Authentication with X.509 client certificates](#authentication-with-x509-client-certificates)
        * [XSUAA managed certificates](#xsuaa-managed-certificates)
        * [Externally managed certificates](#externally-managed-certificates)
            * [XSUAA broker instance](#1-xsuaa-broker-instance)
            * [Reuse service instance](#2-reuse-service-instance)
    + [IAS](#ias)
      - [Prerequisites](#prerequisites-1)
      - [Creating an IAS instance](#creating-an-ias-instance)
      - [Binding an IAS instance to the broker application](#binding-an-IAS-instance-to-the-broker-application)
      - [Unsupported Features](#unsupported-features)
    + [Multiple Credentials Provider Support](#multiple-credentials-provider-support)
  * [Unique service broker](#unique-service-broker)
  * [Secure outgoing connections](#secure-outgoing-connections)
  * [Stateless](#stateless)
  * [Memory usage](#memory-usage)
  * [User Interface](#user-interface)
  * [Security](#security)
    + [HTTPS](#https)
    + [Authentication](#authentication)
    	- [Basic Authentication](#basic-authentication)
    		* [Service Broker Plain-Text Credentials](#service-broker-credentials)
    		* [Service Broker Hashed Credentials](#service-broker-hashed-credentials)
    	- [mTLS Authentication](#mtls-authentication)
    		* [Out-of-the-Box mTLS](#out-of-the-box-mtls)
    		* [Customized mTLS](#customized-mtls)
    + [Password rotation](#password-rotation)
  * [Audit logging](#audit-logging)
    + [Auditlog Viewer](#auditlog-viewer)
      - [Running on XSA](#running-on-xsa)
      - [Providing the tenant ID](#providing-the-tenant-id)
- [Reference](#reference)
  * [Class: ServiceBroker](#class-servicebroker)
    + [new ServiceBroker([options])](#new-servicebrokeroptions)
    + [ServiceBroker.start()](#servicebrokerstart)
    + [ServiceBroker.app](#servicebrokerapp)
    + [ServiceBroker.callXsuaa(req, options, callback)](#servicebrokercallxsuaareq-options-callback)
    + [(static) ServiceBroker.createCredentialsProvider(credentials)](#static-servicebrokercreatecredentialsprovidercredentials)
  * [Service Catalog](#service-catalog)
  * [Additional Service Configuration](#additional-service-configuration)
  * [Automatic Credentials Generation](#automatic-credentials-generation)
  * [Credentials Provider Service](#credentials-provider-service)
  * [Business Service Support](#business-service-support)
  * [Hooks](#hooks)
    + [`verifyClientCertificate(params, callback)`](#verifyclientcertificateparams-callback)
    + [`onProvision(params, callback)`](#onprovisionparams-callback)
    + [`onUpdate(params, callback)`](#onupdateparams-callback)
    + [`onDeprovision(params, callback)`](#ondeprovisionparams-callback)
    + [`onLastOperation(params, callback)`](#onlastoperationparams-callback)
    + [`onFetchInstanceParams(params, callback)`](#onfetchinstanceparamsparams-callback)
    + [`onBind(params, callback)`](#onbindparams-callback)
    + [`onUnbind(params, callback)`](#onunbindparams-callback)
    + [`onBindLastOperation(params, callback)`](#onbindlastoperationparams-callback)
    + [`onFetchBindingParams(params, callback)`](#onfetchbindingparamsparams-callback)
    + [`params` details](#params-details)
      - [`req`](#req)
      - [`XSUAA clone info`](#xsuaa-clone-info)
    + [Error handling](#error-handling)
  * [Environment variables](#environment-variables)
  * [`gen-catalog-ids`](#gen-catalog-ids)
  * [`hash-broker-password`](#hash-broker-password)
- [Troubleshooting](#troubleshooting)
  * [Increase the log level](#increase-the-log-level)
  * [@sap/sbf not found](#sapsbf-not-found)
  * [Cannot execute start-broker script](#cannot-execute-start-broker-script)
  * [Create service fails with "Client already exists"](#create-service-fails-with-client-already-exists)

<!-- tocstop -->

## Usage

### Create a simple service broker
For simple use cases, you don't need to write any JavaScript code. You can start this package directly by providing it with the necessary configuration.

The following sections describe the steps to create a simple service broker application by using this framework.

#### Prerequisites
You need the following:
- [Node.js](https://nodejs.org) v18 or later
- Cloud Foundry [CLI](https://github.com/cloudfoundry/cli#downloads)
- Access to a Cloud Foundry installation where you can log in via CLI and push applications

#### Create a Node.js application
Create a new directory and run the following command in it:
```sh
npm init
```
You are prompted to answer several questions. Upon completion, this command creates a _package.json_ file in the current directory. The presence of this file, tells Cloud Foundry that this is a Node.js application.

#### Add the Service Broker Framework
Download the _@sap/sbf_ package and add it to your service broker by executing the following command:
```sh
npm install @sap/sbf
```

#### Add the start command
Edit the _package.json_ file and add the `start` command in section `scripts`:
```json
{
  "scripts": {
    "start": "start-broker"
  }
}
```

#### Specify a required Node.js version
Add the following property in the _package.json_ file to inform Cloud Foundry that the service broker requires Node.js v18:
```json
  "engines": {
    "node": "^18"
  }
```

#### Create the service catalog
The service catalog describes the services offered by this service broker.
It is defined in a JSON format as described in [Cloud Foundry documentation](https://docs.cloudfoundry.org/services/api.html#catalog-management).

Create a file called _catalog.json_ in the current directory and describe in it the service catalog.
For example:
```json
{
  "services": [{
    "name": "my-service",
    "description": "A simple service",
    "bindable": true,
    "plans": [{
      "name": "my-plan",
      "description": "The only plan"
    }]
  }]
}
```

Execute the following command to generate unique IDs for the services and their plans in the _catalog.json_ file:
```sh
npx gen-catalog-ids
```

#### Create XSUAA service instance
The service broker can use different services to generate and store credentials needed later on by applications to access your reusable service. In this example we use the XSUAA service as a credentials provider.

Create an XSUAA service instance of plan _broker_:
```sh
cf create-service xsuaa broker xsuaa-broker --wait
```
Here `xsuaa-broker` is the service instance name. You can use an arbitrary name here. Make sure to use the same name in the subsequent commands.

#### Create an instance of the Audit Log service
The service broker is configured by default to audit log every operation. It needs information to connect to the Audit log service.

Create Audit log service with the following command:
```sh
cf create-service auditlog oauth2 broker-audit
```
You can also use the standard plan. It was deprecated, however still supported:
```sh
cf create-service auditlog standard broker-audit
```

#### Generate a secure broker password
```sh
npx hash-broker-password -b
```
This command generates a random password and hashes it.

#### Create an application manifest
You can deploy the service broker in Cloud Foundry as a regular application.
An easy way to do that is via an [application manifest](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html).
Create a _manifest.yml_ file in the current directory with the following content:
```yaml
---
applications:
  - name: my-broker
    memory: 128M
    services:
      - xsuaa-broker
      - broker-audit
    health-check-type: http
    health-check-http-endpoint: /health
    env:
      SBF_BROKER_CREDENTIALS_HASH: >
        {
          "broker-user": "<broker-password-hash>"
        }
      SBF_SERVICE_CONFIG: >
        {
          "my-service": {
            "extend_credentials": {
              "shared": {
                "uri": "https://my-service.example.com"
              }
            }
          }
        }
```

`my-broker` is the name of the broker application. You can use an arbitrary name.

Some configurations are not known in advance and they need to be set at the time of deployment via the environment variables.

One such configuration is the credentials configuration used to call the service broker.
This configuration is provided via the environment variable *SBF_BROKER_CREDENTIALS_HASH*.
Here you can use arbitrary credentials.
Replace `<broker-password-hash>` with the hashed credentials from the previous step.
Just make sure to use matching credentials when you register the broker and don't commit these in source control.

Another configuration done during the deployment is the service URL. You can provide it via the environment variable *SBF_SERVICE_CONFIG*.<br/> See [Additional Service Configuration](#additional-service-configuration) for details.

#### Push the broker application
Push the broker application to Cloud Foundry by running the following command:
```sh
cf push
```
By default, Cloud Foundry uses the name of the application as the host name.<br/> If this name is already taken, you can specify a different host via the `host` property in the manifest. Alternatively you can use a random host with the following command:
```sh
cf push --random-route
```

#### Register the service broker
For productive use a service broker is [registered globally](https://docs.cloudfoundry.org/services/managing-service-brokers.html#register-broker) so you can use it throughout Cloud Foundry, but this requires administrative permissions.<br/> During development and testing you can register the service broker only in your space. You do this with the following command:
```sh
cf create-service-broker my-broker-name broker-user <plain-broker-password> <broker-url> --space-scoped
```
Replace here `<plain-broker-password>` with the plaintext password generated by _hash-broker-password_ script.

You can get the broker URL via the command `cf apps`.

Here `my-broker-name` is an arbitrary name used to distinguish this service broker from the rest.
It is independent from the broker application name.

#### Use the service broker
Now you can use your service broker within the same space.
For example, you can now see its services and plans via the `cf marketplace` command.
You can use the new services as regular [services](https://docs.cloudfoundry.org/devguide/services/) in Cloud Foundry.

You can also create a service instance via `cf create-service`.
Then you can bind it to your application via `cf bind-service`.<br/> After that the application gets the URL and the credentials for your service from the environment variable [VCAP_SERVICES](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html).
You can see them via the `cf env` command.

You can also create a service key (`cf create-service-key`) and print its content (`cf service-key`) to see the credentials to access the service instance.

You can also register the service broker in another space and use it there.
To do that append a unique suffix to the broker URL:
```sh
cf create-service-broker my-broker-name broker-user broker-password <broker-url>/<unique-suffix> --space-scoped
```
Use a different suffix for each broker registration.

### Extend the service broker

Some service brokers need to perform custom actions during standard broker operations.
For example, special actions might be necessary to provision a new service instance.
To do that, you can create a custom Node.js application for your service broker.
This application can use the service broker framework as a normal Node.js package.
Then you can register [custom callbacks](#hooks) to be invoked during each broker operation.

Create a Node.js application and add a _@sap/sbf_ dependency as described [above](#create-a-nodejs-application). 

Create the start script of your broker application, e.g. _start.js_:
```js
const Broker = require('@sap/sbf');

let broker = new Broker({
  hooks: {
    onProvision: (params, callback) => {
      console.log('Provision service %s with plan %s', params.service_id, params.plan_id);
      // custom provision actions
      callback();
    },
    onDeprovision: (params, callback) => {
      console.log('Deprovision service instance %s', params.instance_id);
      // custom deprovision actions
      callback();
    }
  }
});
let server = broker.start();
```

Edit the _package.json_ file and set the `start` command to execute your start script:
```json
  "scripts": {
    "start": "node start.js"
  }
```

### Asynchronous broker operations

By default, service broker operations like provisioning and deprovisioning are synchronous,
i.e. HTTP response is returned when the operation is complete.
So that long-running operations are also supported, some platforms, like Cloud Foundry, support also asynchronous operations.
See [Synchronous and Asynchronous Operations](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#synchronous-and-asynchronous-operations)
in the Open Service Broker API specifications.

**Note:** currently the XS advanced runtime does not support asynchronous operations.

To perform an asynchronous operation you implement several [hooks](#hooks).
First, check if your platform supports asynchronous operations.
If it does, start the operation in the background and return `async: true` in the `reply`:
```js
function onProvision(params, callback) {
  if (params.accepts_incomplete !== 'true') {
    let error = new Error('Cannot provision service instance synchronously');
    error.statusCode = 422; // Unprocessable Entity
    return callback(error);
  }
  let operationId;
  // start the operation in the background ...
  // and assign operationId ...
  callback(null, {
    async: true, // indicate that operation was started asynchronously
    operation: operationId // later the same operationId will be passed to onLastOperation
  });
}
```
The same applies also to `onUpdate`, `onDeprovision`, `onBind` and `onUnbind` hooks.

Next, the platform polls in regular intervals for the status of the operation.
Each time it sends the same `operation` string to identify the operation.
This is useful if multiple asynchronous operations are running in parallel, e.g. multiple service instances are created at the same time.
To provide the current status of the operation, you implement the [onLastOperation](#onlastoperationparams-callback) hook (or [onBindLastOperation](#onbindlastoperationparams-callback) in case of async binding operations):
```js
function onLastOperation(params, callback) {
  let operationId = params.operation; // for which operation to return status
  // get operation status ...
  callback(null, {
    state: 'in progress', // or 'succeeded' or 'failed'
    description: 'progress 50%' // Some user-facing message, what is going on
  });
}
```

**Note:** With [IAS as a credentials provider](#ias) all requests are proxied to the IAS Broker, which manages the statuses of last operations. If you choose to implement a hook, do it with caution because you could override the original status received from the IAS Broker.  

**Note:** If several instances of the service broker are running, it is very likely that the start of an asynchronous operation and subsequent polling via [onLastOperation](#onlastoperationparams-callback) / [onBindLastOperation](#onbindlastoperationparams-callback) will be handled by different broker instances.
So make sure that all broker instances see the same state.

### Service broker as middleware
You can create a custom Node.js application and add the service broker as a middleware. The *Broker* class has property `app` which is an express application.
Example:
```javascript
const express = require('express');
const Broker = require('@sap/sbf');

let app = express();
let broker = new Broker();

app.get('/custom-endpoint', (req, res) => {
  res.send('custom-response');
});
app.use('/broker', broker.app);

app.listen(process.env.PORT);
```

Then to register the broker use url: `https://<app-url>/broker`.

### Health HTTP endpoint

SBF provides an HTTP endpoint (on path `/health`) whose purpose is to serve as a health check endpoint.
It does not require authentication and can process HTTP GET requests only.
Currently, it returns a static response with the status `200` and body `OK`.

By default, Cloud Foundry uses `port` as a health check type ([documentation for health check ]](https://docs.cloudfoundry.org/devguide/deploy-apps/healthchecks.html#types)). To use the health endpoint provided by SBF:
- Configure the health check type to `http`. In `manifest.yml`, you do this via the property `health-check-type`.
- Configure the path of the health endpoint, by default it's `/`. In `manifest.yml`, you do this via the property `health-check-http-endpoint`.

See an example [here](#create-application-manifest).

### Custom parameters

Custom parameters can be passed to the service broker in several locations.
The parameters are passed as a JSON object. It can have arbitrary content and is not interpreted by Cloud Foundry.

#### Create service with custom parameters

```sh
cf create-service <service> <plan> <service-instance> -c parameters.json
```
The content of _parameters.json_ is passed to the service broker and can be accessed in the [`onProvision`](#onprovisionparams-callback) hook via the `params.parameters` argument.

**Note**: When using XSUAA for authentication, the parameters JSON should contain `xs-security` property to avoid confusion with custom parameters.
See [XSUAA](#xsuaa) for details.

#### Update service with custom parameters

```sh
cf update-service <service-instance> -c parameters.json
```
The content of _parameters.json_ is passed to the service broker and can be accessed in [`onUpdate`](#onupdateparams-callback) hook via `params.parameters` argument.

#### Bind service with custom parameters

```sh
cf bind-service <application> <service-instance> -c parameters.json
```
The content of _parameters.json_ is passed to the service broker and can be accessed in [`onBind`](#onbindparams-callback) hook via `params.parameters` argument.

The same goes for CF service-keys:
```sh
cf create-service-key <service-instance> <key-name> -c parameters.json
```

**Note**: Binding for reuse service instance when XSUAA is the credentials' provider, allows for specific configuration in order to support certificate credentials, as specified here: [Authentication with X.509 client certificates](#authentication-with-x509-client-certificates)

### Credentials providers

By default, this module searches for a bound service instance which is responsible for generating credentials for the services offered by a service broker. The framework attempts to find a suitable service with the following properties in the following order:
1. XSUAA Service Instance (A service with label `xsuaa` and plan `broker`)
2. IAS Service Instance (A service with the label `identity` and plan `application`)

If no such service is found in the environment of the broker, an error is returned.

You can disable this behavior by [setting the credentials provider service explicitly](#credentials-provider-service). When running on K8S you must always set the credentials provider service explicitly.


Depending on the type of the service that provides credentials: XSUAA, or IAS, this module generates credentials and merges them to the `credentials` object received in the response to *bind* operation.
The same object will appear also in the `credentials` section for the respective service in the `VCAP_SERVICES` environment variable in bound applications. You can find some examples below.

#### SBSS
**Note**: SBSS support was removed on 01/25 following SBSS deprecation by XSUAA.

### XSUAA

The `node-sbf` library supports XSUAA **broker** plan as a credentials provider.
The core implementation relies on a **broker** plan, there is also the option to use a **reference-instance** that points back to a XSUAA **broker** instance, allowing greater adaptability in authentication setups.

- **xsuaa:broker** - Traditional service broker configuration and the primary base for XSUAA integration.
- **xsuaa:reference-instance** - Allows flexibility by referencing an existing broker instance, useful for complex setups that may involve [multiple credentials providers](#multiple-credentials-provider-support).

##### XSUAA Service Selection Priority

The `node-sbf` library follows a priority-based logic to choose the most suitable credentials provider. If explicit names are not provided via `SBF_CREDENTIALS_PROVIDER_SERVICE` (Read more: [Credentials Provider Service](#credentials-provider-service)), the library automatically searches `VCAP_SERVICES` objects using labels with the following priority order:

1. **xsuaa:broker** - The library prioritizes the first broker instance found.
2. **xsuaa:reference-instance** - If no broker instance is found, it then looks for the first reference-instance plan.

> **Note:** If multiple matching instances exist, only the first is selected.

##### XSUAA Plans Support

The `node-sbf` library now supports additional XSUAA plan types, allowing for flexible configurations based on your application’s authentication needs. You can now work with either a single provider or [multiple credentials providers](#multiple-credentials-provider-support), depending on the configuration.

##### Available XSUAA Plans

- **xsuaa:broker** - Designed for traditional service broker configurations, ideal when operating with a single XSUAA provider.
- **xsuaa:reference-instance** - Offers flexibility to use either a single or [multiple credentials providers](#multiple-credentials-provider-support) setup, allowing greater adaptability for complex authentication landscapes.

**Note:** When using [multiple credentials providers](#multiple-credentials-provider-support), ensure that each request is routed to a valid provider through the `xsuaaCredentialsDecider` hook. Failing to return a valid provider can cause request delivery issues due to improper authentication ([Read more about multiple credentials providers](#multiple-credentials-provider-support)).

##### XSUAA Service Selection Priority

When initializing authentication services, the library follows a priority-based selection logic to ensure the most suitable credentials provider is chosen based on the available configurations, which prioritizes services in the following order:


1. **XSUAA (broker)** - If available, the `broker` plan is prioritized as the primary credentials provider.
2. **XSUAA (reference-instance)** - If the `broker` plan is unavailable, the library will then attempt to use the `reference-instance` plan. This allows applications to connect with a single credentials provider for simpler configurations.

This prioritized order is applied when `SBF_CREDENTIALS_PROVIDER_SERVICE` is not explicitly provided with specific service names. In this case, the `node-sbf` library will automatically choose values from `VCAP_SERVICES` according to the order mentioned above.

> **Note:** For more details on configuring multiple credentials providers, refer to the [Multiple Credentials Provider Support](#multiple-credentials-provider-support) section.

Create XSUAA instance of plan _broker_ (example):
```sh
cf create-service xsuaa broker <service-instance> -c xs-security.json  --wait
```

Create XSUAA instance of plan _reference-instance_ (example):
> **Note:** must include a 'broker' tag in the service instance definition. The reference-instance must point to a XSUAA broker instance.
```sh
cf create-service xsuaa reference-instance <service-instance> -t broker -c xs-security.json  --wait
```

##### Creating reuse service instances

Later on, you can create instances of the reuse service:
```sh
cf create-service my-service my-plan <service-instance> -c parameters.json
```
Here we assume that service `my-service` with plan `my-plan` is defined in the service catalog of the broker.

*parameters.json*:
```
{
  "xs-security": {
    "xsappname": "my-app",
    ...
  },
  "customProperty1": 1,
  "customProperty2": "2",
  ...
}
```

`xs-security` object in *parameters.json* has the same structure as [xs-security.json] file.
It is sent to XSUAA to create an OAuth client for each instance of the reuse service.

`xs-security` properties will be overwritten by any additional service configuration defined in the environment variable `SBF_SERVICE_CONFIG`.
See [Additional Service Configuration](#additional-service-configuration).

Other top level properties are optional (e.g. `customProperty1` and `customProperty2`) and can be used to pass arbitrary parameters.
The whole *parameters.json* file is accessible via `params.parameters` in [`onProvision(params, callback)`](#onprovisionparams-callback) hook.

**Note**: Custom parameters can be defined as root-level properties. If `xs-security` is not defined, the SBF generates a default value, where `xsappname` is set to the service instance id.

**Note**: During reuse instance create/update, an `authorities` array can be passed to XSUAA. It is recommended to provide `extend_xssecurity` from the [Additional Service Configuration](#additional-service-configuration) and set `authorities` explicitly, to control the scopes exposed for the reuse instance. If no `authorities` section was provided in [Additional service configuration](#additional-service-configuration) (`extend_xssecurity`), by default SBF will pass an empty `authorities` array in create/update requests to XSUAA, and`authorities` provided by consumers are ignored. <br/>
Set the secureUAAScopes option (or environment variable `SBF_SECURE_UAA_SCOPES`) **explicitly** to `false`, in order to pass the authorities array provided by the consumer as is.<br/>
**This behavior and environment variable form an incompatible change from release v6.4.9**.

Generated credentials example:
```json
{
  "uaa": {
    "clientid": "sb-my-app!b27|reuse-service!b27",
    "clientsecret": "o7M5UE0S+Q498j9zNmAlAKdYrSo=",
    "identityzone": "cc-sap",
    "tenantid": "cc-sap",
    "tenantmode": "dedicated",
    "uaadomain": "authentication.sap.hana.ondemand.com",
    "url": "https://cc-sap.authentication.sap.hana.ondemand.com",
    "verificationkey": "-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----",
    "xsappname": "my-app!b27|reuse-service!b27"
  }
}
```
An application can use these credentials to call the UAA to fetch a proper JWT token. Then the application can call the reuse service using this token as authentication.

As it's seen the `clientid` and the `xsappname` properties hold some specific information. Here the string "my-app" corresponds to the _xsappname_ from the _security.json_ which was provided when creating the service instance which the service broker offers. The string "reuse-service" corresponds to the _xsappname_ in the _security.json_ which was used to create the XSUAA service instance with plan broker. More information can be found in the examples.

##### Updating reuse service instances

The instance of the reuse service can be updated as follows:

```
cf update-service <service-instance> -p <new-plan> -c parameters.json
```

The plan of the service instance can be optionally changed with the `-p` option.
Updating the plan of an instance to a different one from the catalog is possible only if the service is configured with `plan_updateable`.
Refer to [the description of services](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#service-objects) in the catalog in the OSB specification.

Parameters are provided in the same manner as they are during service instance creation -
XSUAA parameters are passed in the `xs-security` property.
Service specific parameters are provided on root level.
`xs-security` properties will be overwritten by any additional service configuration defined in `extend_xssecurity` from the [Additional Service Configuration](#additional-service-configuration).
The whole *parameters.json* file is accessible via `params.parameters` in [`onUpdate(params, callback)`](#onupdateparams-callback) hook.

**Note**: It is recommended to provide explicitly `xsappname` in `xs-security` when creating a service instance
instead of letting SBF set it automatically to the service instance id,
because `xsappname` needs to be provided in every update operation on XSUAA clones.
In case the service instance id should be provided in the update operation,
it can be retrieved for an instance with the following command: `cf service <name> --guid`.

**Note**: If `xsappname` is provided in `xs-security` when creating a service instance,
the same `xsappname` should be provided in `xs-security` when updating a service instance.
If `xsappname` is not provided on provision, SBF by default will use the service instance id.
The same service instance id will also be used during instance update as value for `xsappname`.

**Note**: If `xs-security` is not provided in *parameters.json* then no update of the XSUAA options will take place. If only `extend_xssecurity` from the [Additional Service Configuration](#additional-service-configuration) needs to be taken into account, `xs-security` can be provided as an empty object.

**Note**: To enable SBF to use per plan `extend_xssecurity` from the [Additional Service Configuration](#additional-service-configuration),
the platform requesting the broker should provide a plan id.
The [OSB specification](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#body-4) does not mark any `plan_id` field as mandatory
(neither on root level, nor in `previous_values`).
SBF first checks the `plan_id` property on root level and if it is not available fallbacks to `previous_values.plan_id`.
If no plan id information is provided, and there is a `per_plan` configuration in `extend_xssecurity` from the [Additional Service Configuration](#additional-service-configuration), SBF will return an error.
Cloud Foundry provides both `plan_id` and `previous_values.plan_id`.
At the moment Service Catalog on Kubernetes does not support service instance update. Refer to the [CLI documentation](https://github.com/kubernetes-sigs/service-catalog/blob/master/docs/cli.md) for changes.

##### Authentication with X.509 client certificates
> [!WARNING]
> #### XSUAA / X.509 Client Deprecation Notice
> **Heads-up (XSUAA / X.509):** The XSUAA grant type client_x509 will reach end of life on January 26, and creating **X.509 client bindings or service keys** will only work if the target service instance supports:
>
> - `grant_type=client_credentials`
> - `credential_type=x509`
>
> Setups that don't meet this requirement will fail.
>
> Learn more here: [Retrieving Access Tokens with Mutual Transport Layer Security (mTLS)](https://help.sap.com/docs/btp/sap-business-technology-platform/retrieving-access-tokens-with-mutual-transport-layer-security-mtls).
>
> If you have already updated your security descriptor and want to stop using client_x509 earlier, you can set the environment variable `DISABLE_UAA_GRANT_TYPE_CLIENT_X509=true`.


Authentication with X.509 client certificates can be enabled with the following configuration provided in the _xs-security_ options:

```json
{ 
  "xsappname": "...", 
  "oauth2-configuration": {
    "credential-types": ["x509"]
  } 
}
```

`credential-types` is an array of allowed credential types, where allowed values are `binding-secret`, `x509`, `x509_attested`. <br><br>
If `x509` is not the only type in the array AND not the first item (e.g `"credential-types": ["binding-secret", x509"]`), in order to enable X.509 authentication, you MUST specify it explicitly during bind (see below).

X.509 client certificate authentication can be separately configured on **3 levels**:

1. XSUAA instance of plan _broker_. This enables X.509 authentication between the **SBF based broker application** and XSUAA. <br>
   * If `x509` is not the default `credential-type` that was configured during the XSUAA instance creation, it must be explicitly requested during bind: <br>
    ```sh
        cf bind-service <broker-application> <xsuaa-instance> -c parameters.json
    ```
    Where the relevant parameters.json format is:
     ```json
        {
           "credential-type": "x509", 
           "x509": { 
               ...
           } 
       }
    ```

2. Reuse service instance. The required configuration can be provided either via SBF's [additional service configuration](#additional-service-configuration) (property `extend_xssecurity`) or via the parameters during reuse service instance creation (_[parameters.json](#create-service-with-custom-parameters)_, property `xs-security`).

3. Reuse service instance binding. The required configuration should be provided via the parameters during reuse service instance binding creation:
   * If `x509` is not the default `credential-type` that was configured during the reuse instance creation, it must be explicitly requested during bind: <br> 
   ```sh
    cf bind-service <application> <service-instance> -c parameters.json
    ```
   Where the relevant configuration must be wrapped with `xsuaa`. The exact format in which the configuration should be provided is:
    ```json
    {
      "xsuaa": { 
           "credential-type": "x509", 
           "x509": { 
               ...
           } 
       }
   }
   ```
   The same goes for CF service-keys:
   ```sh
   cf create-service-key <service-instance> <key-name> -c parameters.json
   ```
   **Note**: currently only `credential-type` and `x509` (and `X.509` for [Externally managed certificates](#externally-managed-certificates)) fields are supported under `xsuaa`.
    

##### Certificate types:
The certificate-key pairs that will be used can either be automatically generated by XSUAA (_XSUAA managed certificates_) or
explicitly provided custom ones (_externally managed certificates_).

##### XSUAA managed certificates

The configuration above is sufficient to use XSUAA managed certificates.
The credentials of the XSUAA _broker_ instance or/and the credentials of the reuse service instance will contain `certificate` and `key` properties that can be used for X.509 client certificate authentication.

##### Externally managed certificates

In this case, the certificate should be provided in the parameters **during bind** of the XSUAA instnace.
 
###### 1. XSUAA broker instance
The format in which the certificate should be provided is:

```json
{
  "credential-type": "x509",
  "x509": {
    "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
    "ensure-uniqueness": false,
    "certificate-pinning": true
  }
}
```
Then pass the following bind parameters:
```json
{
   "X.509": "-----BEGIN CERTIFICATE-----\nMIID1j ..."
}
```

The resulting credentials will contain a `certificate` property.
The key should be provided to the broker application, so that it can be used in combination with the `certificate` from the binding. This is done through the `SBF_CLIENT_CERTIFICATE_KEY` environment variable or through the `clientCertificateKey` option. Format should be:

```
SBF_CLIENT_CERTIFICATE_KEY: -----BEGIN RSA PRIVATE KEY-----
MIIEpA ...
```

In order to set SBF_CLIENT_CERTIFICATE_KEY properly, linebreaks needs to be preserved as `\n`. <br>
The following 2 options demonstrates how to configure this key in the **broker's `manifest.yaml`**:

* Use the `pipe` charachter (`|`):
```yaml
SBF_CLIENT_CERTIFICATE_KEY: |
        -----BEGIN RSA PRIVATE KEY-----
        MIIEpAIBAAKCABCD+59YBTqEOvQaYWvc/hg+ixznh59qVBXxJKLH0jw85RSlGp
        ...
        asBsdfNfWvdf1FPf6QV+VWaRdQ6zneimsbkxjIg/cdfpW2HmVyTSnqw==
        -----END RSA PRIVATE KEY-----
```

* Keep the `\n` and wrap with quotation marks ("..."):
```yaml
SBF_CLIENT_CERTIFICATE_KEY: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBA ... VyTSnqw==\n-----END RSA PRIVATE KEY-----\n"
```

When enabled, SBF uses X.509 certificates authentication with precedence over `clientid` and `clientsecret`.

###### 2. Reuse service instance
The relevant configuration must be wrapped with `xsuaa`, that is:
```json
{
  "xsuaa": {
      "credential-type": "x509",
      "x509": {
        "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
        "ensure-uniqueness": false,
        "certificate-pinning": true
      }
  }
}
```

**Note**: currently only `credential-type`, `x509` and `X.509` fields are supported under `xsuaa`.

The key should be provided (in the environment, for example) to the consumer application so that it can be used in combination with the `certificate` from the binding.

#### IAS

IAS (Identity and Authentication Service) is enabling service owners to maintain a service broker within IAS. 
Therefore, SBF with IAS as credentials provider acts as a proxy to the IAS Broker, while still allowing you to extend functionalities by using custom hooks (an ability IAS Broker doesn't support).

##### Prerequisites

You can find the complete IAS Broker documentation [here](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/integrating-service-with-identity-service-of-sap-btp), along with prerequisites and procedures. 

##### Creating an IAS instance
Create an IAS instance of the plan _application_ (example):
```sh
cf create-service identity application <service-instance> -c catalog.json
```
Here, the catalog.json is passed to the IAS instance, as this instance represents a IAS Broker. Therefore, a file that contains the catalog should not be provided to the application (see [Service Catalog](#service-catalog)). 

##### Binding an IAS instance to the broker application
Bind an IAS instance (example):
```sh
cf bind-service <broker-app> <service-instance> -c '{"credential-type": "X509_GENERATED"}'
```
Here we use the IAS ability to generate X.509 client certificates for us. Refer to the [documentation](https://help.sap.com/docs/cloud-identity-services/cloud-identity-services/reference-information-for-identity-service-of-sap-btp?q=X509_GENERATED#binding-properties) for alternatives.

**Note:** communication between the SBF-based broker application and the IAS broker is based on TLS authentication (X.509 client certificates). Make sure you create the binding properly by passing the parameters correctly. 
In addition, arbitrary parameters are not supported in app manifests in cf CLI v6.x (see [here](https://docs.cloudfoundry.org/devguide/services/application-binding.html#bind-with-manifest)), therefore the binding cannot be declared in the manifest.yml file.

#### Unsupported Features
The following [Additional Service Configuration](#additional-service-configuration) are not yet supported with IAS as credentials provider:
1.  `extend_credentials`
2. The following properties from the [Business Service Support](#business-service-support) section:
    * `sap.cloud.service`
    * `sap.cloud.service.alias`
    * `saasregistryenabled`
    
You can still choose to extend the response with these parameters within the [onBind hook](#onbindparams-callback).

#### Multiple Credentials Provider Support

##### Overview
The `node-sbf` library has been enhanced to support multiple credentials providers, enabling improved workload migration across different landscapes in BTP CF. This update allows service broker developers to distribute their solutions across landscapes using dedicated credentials providers for each landscape.

##### Use Case
As a service provider, this enhancement allows you to distribute workloads across different landscapes, each with a dedicated credentials provider, ensuring secure and efficient authentication management.

##### Key Features
1. **Multiple Credentials Provider Initialization:** Developers can now initialize and manage more than one credentials provider instance within their applications.
2. **Custom Credential Provider Selection Hook:** A dedicated hook, `xsuaaCredentialsDecider`, is available to implement custom logic for selecting the appropriate credentials provider based on business needs.
3. **Credential Usage:** The `node-sbf` library utilizes the credentials provider returned by the hook's callback to issue credentials, ensuring secure and context-aware authentication for each request.
4. **Flexible and Scalable Authentication Management:** The multiple credentials provider feature enhances the scalability of service broker applications, enabling seamless workload migration across different landscapes.
5. **Environment Variable Configuration:** Developers can configure the desired credentials provider by setting the `SBF_CREDENTIALS_PROVIDER_SERVICE` environment variable.

##### Configuration
To enable the multiple credentials provider feature, the following environment variables need to be set:
- `SBF_USE_MULTIPLE_XSUAA_CREDENTIALS`: Set this to `TRUE` to activate the multiple credentials provider functionality. <br /> **Note:** when enabling this feature, the `xsuaaCredentialsDecider` hook must be implemented to select the desired credentials provider.
- `SBF_CREDENTIALS_PROVIDER_SERVICE`:  Provide a comma-separated list of credentials provider names to use. When working with multiple XSUAA credential providers it is mandatory to explicity provide the instance name by using the `SBF_CREDENTIALS_PROVIDER_SERVICE` property (See: [Environment variables](#environment-variables)).
  - Example:
    `SBF_CREDENTIALS_PROVIDER_SERVICE=xsuaa1,xsuaa2`
- `xsuaaCredentialsDecider`: Define this hook in the service broker to return the desired credentials provider.
  - **Important**: The `xsuaaCredentialsDecider` is an `async` function, and developers must `await` its result to avoid unexpected issues.
  - Example:
    ```javascript
    const Broker = require('@sap/sbf');
    let broker = new Broker({
      hooks: {
        xsuaaCredentialsDecider: async (config, req) => {
          // Implement logic to select the desired credentials provider.
          // For example: 
              try {
                console.log(`*** decider hook ***`)
                // Developer can implement custom logic to select the desired credentials provider.
                let name = await hooks.getCorrectUAAProvider(req);
                // Developer can save the name of the selected credentials provider in the request object for future use.
                req.params.uaaProviderName = name;
                console.log(`*** xsuaa name requested: ${name} ***`)
                // Return the selected credentials provider using the xsuaaCredentialsProviders map.
                return config.xsuaaCredentialsProviders.get(`${name}`);
            } catch (error) {
                let message = `xsuaaCredentialsDecider hook failed: ${error}`;
                logger.error(message);
                throw (message);
            }
        }
      }
    });
    ```
  
> **Note:** Developer Responsibilities
When enabling the `SBF_USE_MULTIPLE_XSUAA_CREDENTIALS` environment variable, it is the developer's responsibility to ensure that the `xsuaaCredentialsDecider` hook returns a valid credentials provider for each request. Failing to do so could lead to failed requests due to missing credential provider.

##### Scope and Limitations
- **XSUAA:** This feature currently supports only XSUAA credentials providers.
- **IAS:** This service is out of scope for this enhancement.

### Unique service broker

Sometimes for testing it is useful to register the same broker multiple times as if it were multiple different brokers.

The service broker framework can append a suffix to each service name, ID and plan ID to make them unique.
There are 3 options to provide this suffix (taken in the following order):
1. append the suffix in the broker URL
```sh
cf create-service-broker broker-name user password https://broker.domain/suffix --space-scoped
```
2. broker's constructor option `catalogSuffix` (requires separate broker deployment)
3. environment variable `SBF_CATALOG_SUFFIX` (requires separate broker deployment)

If this suffix is specified, it is used only in the communication with service broker clients like Cloud Controller.
Internally this suffix is removed, so all hook functions will get IDs without the suffix, just like in the service catalog.
Still in the marketplace the services will be visible with the suffix. So you will have to use the suffix in commands like `cf create-service`.

The URL suffix should not contain URL special characters (`/`, `?`, etc.).

Assume you have pushed a service broker application and its URL is https://my-broker.domain.com/.
Then you can register this broker using suffix `abc` in the URL:
```sh
cf create-service-broker my-broker-abc user password https://my-broker.domain.com/abc --space-scoped
```
This will append the suffix "abc" to each service name, ID and plan ID in the catalog in this space.

You can also register the same broker with another suffix:
```sh
cf create-service-broker my-broker-xyz user password https://my-broker.domain.com/xyz --space-scoped
```
This will append the suffix "xyz" to each service name, ID and plan ID in the catalog in that space.


### Secure outgoing connections

By default all outgoing connections from the service broker must be encrypted or the broker will fail to start.
This behavior can be changed using the `secureOutgoingConnections` option or the environment variable `SBF_SECURE_OUTGOING_CONNECTIONS`.
If one of them is set to *false*, unencrypted connections will be allowed.

**Note:** This option does not apply for connections made by custom code (for example: [`hooks`](#hooks)).

### Stateless

A service broker can and should be scaled to run with several instances to achieve high availability and if necessary handle more load.
For this reason the service broker framework is designed to be stateless.
So it maintains no state between broker requests and provides no communication among broker instances.
If custom hooks introduce some state, they should take care to synchronize it across multiple broker instances.

Special care should be taken for asynchronous operations which have inherent state.
It is very likely that the start of an asynchronous operation and subsequent polling via [onLastOperation](#onlastoperationparams-callback) will be handled by different broker instances.

### Memory usage

A non customized SBF application (without custom code) consumes around 52MB of memory in idle state.
During light load (less then 10 concurrent requests) the memory consumption is around 110MB (depending on the requests type).
During heavy load (100+ concurrent requests) the memory could reach 160MB.
Recommendations:
 * For light load scenarios, deploy with memory limit at least 128MB.
 * For heavy load scenarios, deploy with memory limit at least 256MB.

Also, consider scaling out the broker application with multiple instances.
This will increase both the throughput and the fault tolerance (against app crashes).

If custom code is used (e.g. hooks or middleware), its memory usage should be taken into account when calculating the overall memory consumption.

In addition you should limit the Node.js heap size accordingly.
The general recommendation is to set it to 75% of the application memory limit.
For example (in manifest.yml):
```
  memory: 128M
  env:
    NODE_OPTIONS: --max-old-space-size=96
```

### User Interface

The service broker framework provides no user interface.
It implements only the standard [Service Broker API](https://docs.cloudfoundry.org/services/api.html).

Still if your services provide a web-based management user interface, you can expose it via the `reply.dashboard_url` property in [`onProvision`](#onprovisionparams-callback) hook.

### Security
To ensure ISO/SOC compliance, certain security requirements should be fulfilled:
* Minimum password length of 15 characters (fulfilled by passwords generated by XSUAA and deploy service)
* Regular password rotation

#### Password rotation
You can use this procedure to update the broker password without downtime.
1. Deploy the broker with the new password as a new application
2. Update the broker registration with the new password and URL
```sh
cf update-service-broker <broker-name> <broker-username> <broker-password> <broker-url>
```
3. Delete the old broker application

#### HTTPS
Since different credentials are transferred between the service broker and its client (Cloud Controller),
the communication should be encrypted. If the broker is deployed as an application in Cloud Foundry,
no special configuration is required as the platform provides HTTPS support.
If the broker is deployed outside the platform then HTTPS should be enabled.
This section describes how to do that.

Create a custom start script, for example _broker.js_:
```javascript
const https = require('https');
const fs = require('fs');
const Broker = require('@sap/sbf');

const broker = new Broker();

// this is an example, you should provide your own key and certificate
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

https.createServer(options, broker.app).listen(process.env.PORT);
```
For details how to configure HTTPS see [https.createServer](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

Use your start script in the `start` command in _package.json_
```json
  "scripts": {
    "start": "node broker.js"
  }
```

### Authentication
SBF supports Basic and mTLS authentication. Below you can find information about how to configure each type of authentication. 
#### Basic Authentication
You can configure SBF to use basic authentication. You need to configure username and password. You set the credentials either in plain text
or hashed format.
##### Service Broker Credentials
Credentials in plain text format used by the Cloud Controller and other clients to call the service broker.
It is an object where each key is a user name and the value is the respective password. It may contain multiple credentials but at least one is required.

Example:
```json
{
  "user1": "password1",
  "user2": "password2"
}
```

These credentials can be provided via the option `brokerCredentials` or the environment variable `SBF_BROKER_CREDENTIALS`.

**Note:** Service broker credentials must be provided either in plain text or [hashed](#service-broker-hashed-credentials) format.

##### Service Broker Hashed Credentials
Credentials in hashed format used by the Cloud Controller and other clients to call the service broker.
It is an object where each key is a user name and the value is the respective password in format `sha256:<salt>:<hash-digest-of-salt+password>`.
Here `<salt>` and `<hash-digest-of-salt+password>` are _base64_-encoded strings.
It may contain multiple credentials but at least one is required.

Example:
```json
{
  "user1": "sha256:gVJILqx/97j4aWVQas5RbSUFpWzu7OpaHOt0O29CJOc=:4klnhxFY2YYwzHO7unYu7jc+HuikQLhF7Ebk8tjOJ9c=",
  "user2": "sha256:0NRIb4Gzx1zFRTTs6qpElujmHuUE1TAIg3NbES219f0=:Gv1NMeIzxlbmOCLvY3q4DMbiDXamqF3xRfFivUdligo="
}
```

These credentials can be provided via the option `brokerCredentialsHash` or the environment variable `SBF_BROKER_CREDENTIALS_HASH`.

**Note:** Service broker credentials must be provided either in [plain text](#service-broker-plain-text-credentials) or hashed format. 

**Note:** To generate such hashed credentials, you can use the [hash-broker-password](#hash-broker-password) script.
#### mTLS Authentication
##### Out-of-the-Box mTLS
***Note:*** For those of you who use out-of-the-box mTLS, ***we recommend using unique credentials, i.e. Basic authentication, alongside out-of-the-box*** mTLS, to ensure accurate identification in relation to your brokers. This can assist in identifying potential misconfiguration incidents.


You can configure SBF broker to verify the Service Manager-issued client certificate each time the Service Manager communicates with the broker. 

For that, you need to create your broker with the `secureIncomingConnections` option set to true, or set the environment variable `SBF_SECURE_INCOMING_CONNECTIONS` to true.

You also have to specify the Service Manager certificate's subject so that its identity can be verified.
If you don't specify the Service Manager certificate's subject the out-of-box validation is not performed. 

***Note:***
In such case, the only validation performed is the one that your provided with the implementation of the  [verifyClientCertificate](#verifyclientcertificateparams-callback) hook. 

If the hook is also not implemented, the validation fails.  

To set the Service Manager certificate's subject, create the broker with the `serviceManagerCertificateSubject` parameter or set the `SBF_SERVICE_MANAGER_CERTIFICATE_SUBJECT` environment variable.
You can retrieve the Service Manager certificate's subject at `https://service-manager.cfapps.{landscape-domain}/v1/info` from the `service_manager_certificate_subject` field, where `{landscape-domain}` is the landscape in which you registered your broker. 

For example, calling https://service-manager.cfapps.stagingaws.hanavlab.ondemand.com/v1/info, returns 
```
{
  "token_issuer_url": "https://svcmgr.authentication.stagingaws.hanavlab.ondemand.com",
  "token_basic_auth": false,
  "service_manager_tenant_id": "svcmgr-cf-us10-staging",
  "service_manager_subaccount_id": "svcmgr-cf-us10-staging",
  "service_manager_certificate_subject":"/C=DE/O=SAP SE/OU=SAP Cloud Platform Clients/OU=Staging/OU=svcmgr-cf-us10-staging/L=service-manager/CN=service-manager"
}
```


 You can enhance the out-of-box client certificate verification by implementing the [verifyClientCertificate](#verifyclientcertificateparams-callback) hook. 
 
 With this hook, you can perform your own validations.

##### Customized mTLS
Alternatively, you can register your broker with your own certificate. 

Once the service broker has been registered, it will send the client certificate you configured each time it communicates with SBF. 

To enable this verification, make sure to create your broker with  the `secureIncomingConnections` option set to true, or set the `SBF_SECURE_INCOMING_CONNECTIONS` environment variable to true.
You have to implement  [verifyClientCertificate](#verifyclientcertificateparams-callback) hook to verify the received certificate.

### Audit logging

_@sap/sbf_ writes to audit log for every operation except for _catalog_
(an instance of the Audit log service should be bound to the broker).
The user is taken from the first of the following that contains a valid value:
- `X-Broker-API-Originating-Identity` header (if provided), property `user_id` (in case running on Cloud Foundry).
- `X-Broker-API-Originating-Identity` header (if provided), property `uid` (in case running on Kubernetes).
- `X-Broker-API-Originating-Identity` header (if provided), property `username` (in case running on Kubernetes).
- The authenticated user that calls the service broker.

It is recommended to use the same user in hooks that also write audit messages.
What the `X-Broker-API-Originating-Identity` header contains (if present) can be found
in the `originating_identity` property of the `params` object passed to the hook.
If `originating_identity` is not available, then the `user_id` property can be used.
It contains the authenticated user that called the broker.

#### Auditlog Viewer

In Cloud Foundry environment the [Auditlog Viewer](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e3baa5f1a0c64c44aac8ab3ea3d1b500.html) is the tool used for retrieving audit logs. The tool shows logs for concrete subaccount. In order for the SBF application to write auditlog messages properly it needs **tenant ID**.

##### Running on XSA
In XSA environment the tenant ID can be provided but **it is not mandatory**, since the audit logs are viewed in the *SAP HANA Studio* and not in Auditlog viewer (it is deprecated).

##### Providing the tenant ID
The value of the tenant ID can be taken from the *SAP CP Cockpit*. It is listed as `ID` in the Subaccount details for the subaccount that will deploy the SBF application.
Then it can be provided to the SBF application:
- manually by setting [`tenantId`](#new-servicebrokeroptions) in SBF options.
- manually by setting [`SBF_TENANT_ID`](#environment-variables) environment variable.
- automatically if XSUAA is used as credentials provider. It is part of the service instance binding.

The priority of the above settings is as follows:
`tenantId` > `SBF_TENANT_ID` > *XSUAA service instance binding: credentials.tenantid*

Please be aware that if you are running in Cloud Foundry and Audit logging is ***enabled*** you **must provide *tenant ID*** for the broker application. Otherwise it will fail to start with error: `Audit logging is enabled and "tenantId" option or "SBF_TENANT_ID" environment variable must be provided for successful writing of audit log messages.`.

## Reference

### Class: ServiceBroker
Service broker class.

#### new ServiceBroker([options])
Creates a new ServiceBroker instance.

* `options` *Object* Optional parameter containing the following properties:
  * [`brokerCredentials`](#service-broker-credentials) *Object* The credentials for calling the service broker, if using the plain text format.
  * [`brokerCredentialsHash`](#service-broker-hashed-credentials) *Object* The credentials for calling the service broker, if using the hashed format.
  * [`catalog`](#service-catalog) *String|Object* This property holds the service catalog. If it is a *String*, it should be a path to a JSON file which contains the catalog information.
  * [`serviceConfig`](#additional-service-configuration) *Object* Provides additional deploy-time configuration to extend the service catalog.
  * [`hooks`](#hooks) *Object* Contains callback functions that can extend or customize service broker operations.
  * [`autoCredentials`](#automatic-credentials-generation) *Boolean* Enable automatic credentials generation.
  * [`credentialsProviderService`](#credentials-provider-service) *String* The name of the credentials provider service instance.
  * [`catalogSuffix`](#unique-service-broker) *String* Suffix which will be appended to each service name, ID and plan ID in the service catalog to make them unique across Cloud Foundry.
  * [`enableAuditLog`](#audit-logging) *Boolean* Enable/Disable audit logging. Defaults to **true**.
  * [`tenantId`](#auditlog-viewer) *String* Tenant ID of the broker application. It is used for audit logging. Mandatory if the broker is running on CF and audit logging is enabled.
  * [`secureOutgoingConnections`](#secure-outgoing-connections) *Boolean* If *false*, unencrypted outgoing connections will be allowed. Default value is **true**.
  * [`secureIncomingConnections`](#mtls-authentication) *Boolean* If set to *true*, secure connection is established and the custom hook [verifyClientCertificate](#verifyclientcertificateparams-callback) is called . For the automatic verification of the Service Manager certificate's subject, you also have to configure the `serviceManagerCertificateSubject`. Default value is **false**.
  * [`serviceManagerCertificateSubject`](#out-of-the-box-mtls) *String* If `secureIncomingConnections` is set to true and `serviceManagerCertificateSubject` is configured to the Service Manager certificate's subject in the broker's landscape, the Service Manager [client certificate](#out-of-the-box-mtls) is verified in each public landscape.
  * [`clientCertificateKey`](#authentication-using-x509-client-certificates) *String* the private key corresponding to the client certificate used for authentication with XSUAA.
  * [`secureUAAScopes`](#xsuaa) *Boolean* Relevant for [XSUAA as a credentials provider](#xsuaa). When set to `true` and no `authorities` section was provided in [Additional service configuration](#additional-service-configuration) (`extend_xssecurity`), SBF will pass an empty `authorities` array in create/update requests to XSUAA, regardless of the `authorities` provided by the consumer. Default: `true`.<br/> **Note: This behavior and environment variable form an incompatible change from release v6.4.9**.
  * [`k8sSecretsPath`](#credentials-providers) *String* the path to the mounted volume containing service secrets when running on K8S. Default is '/etc/secrets/sapcp/'.

#### ServiceBroker.start()
Starts the service broker.

* _returns_ the [http.Server](https://nodejs.org/api/http.html#http_class_http_server) used by the service broker

You can attach handlers for 'error' and 'listening' events like this:
```js
let broker = new ServiceBroker(options);
let server = broker.start();
server.on('error', err => console.error(err));
server.on('listening', () => console.log('Listening'));
```

#### ServiceBroker.app
Express application which you can use as a middleware. See [Service broker as middleware](#service-broker-as-middleware).

#### ServiceBroker.callXsuaa(req, options, callback)
Utility function to easily make HTTP calls to XSUAA. Authentication to XSUAA is performed internally.

* `req` *Object* Details can be found [here](#req).
* `options` *Object* Parameter containing the following properties:
  * `baseUrlProperty` *String* Name of a property from the XSUAA credentials to be used as base URL. Defaults to `url`.
  * `path` *String* XSUAA REST API endpoint. This path will be appended to the XSUAA base URL internally.
  * The [options](https://github.com/request/request#requestoptions-callback) described in the documentation of the [axios request](https://www.npmjs.com/package/axios) package.
* `callback` *function(error, res, body)*
  * The [parameters](https://github.com/request/request#requestoptions-callback) described in the documentation of the [axios request](https://www.npmjs.com/package/axios) package.

Example:
```js
const Broker = require('@sap/sbf');

let broker = new Broker({
  hooks: {
    onProvision: (params, callback) => {
      const encodedInstanceId = encodeURIComponent(params['instance_id']);
      let options = {
        path: `/sap/rest/broker/clones/${encodedInstanceId}`,
        method: 'GET'
      };
      broker.callXsuaa(params.req, options, (err, res, body) => {
        if (err) { return callback(err); }

        if (res.status !== 200) {
          return callback(new Error(`Status code: ${res.status}. Body: ${body}`));
        }

        try {
          const cloneInfo = JSON.parse(body);
          console.log('XSUAA clone info:', cloneInfo);
          callback();
        } catch (err) {
          callback(new Error(`Failed to parse UAA response with status code ${res.status} and body ${body}`));
        }
      });
    }
  }
});
let server = broker.start();
```

#### (static) ServiceBroker.createCredentialsProvider(credentials)

Creates a suitable [credentials provider](#credentials-providers) instance according to the passed `credentials`.
Disabling [automatic credentials generation](#automatic-credentials-generation) and manually creating a credentials provider allows using multiple providers in the same broker and brings more flexibility when extending the broker with custom code.

**Note**: This approach requires implementing the relevant hooks (`onProvision`, `onBind`, `onUnbind` and `onDeprovision`) and calling the respective method on the created provider.

* `credentials` *Object* Credentials for a UAA service.

```js
const credentials = xsenv.cfServiceCredentials('xsuaa-service-name');
const provider = Broker.createCredentialsProvider(credentials);
```

* Returns a [credentials provider](#credentials-providers) instance.

A credentials provider has the following methods:

* `provision(req, callback)`
Performs operations associated with service provisioning.
  * `req` *Object* Details can be found [here](#req).
  * `callback` *function(error, operationData)* An error is received in the callback in case of operations' failure. `operationData` (optional) *Object* Contains operation data provided by the credentials provider. In case XSUAA is used as a credentials provider `operationData` contains a property `xsuaa` which is an *Object* described [here](#xsuaa-clone-info).

* `update(req, callback)`
Performs operations associated with service updating.
  * `req` *Object* Details can be found [here](#req).
  * `callback` *function(error, operationData)* An error is received in the callback in case of operations' failure. `operationData` (optional) *Object* Contains operation data provided by the credentials provider. In case XSUAA is used as a credentials provider `operationData` contains a property `xsuaa` which is an *Object* described [here](#xsuaa-clone-info).

* `bind(req, callback)`
Performs operations associated with service binding.
  * `req` *Object* Details can be found [here](#req).
  * `callback` *function(error, credentials)* An error is received in the callback in case of operations' failure. `credentials` is an object containing the generated credentials.

* `unbind(req, callback)`
Performs operations associated with service unbinding.
  * `req` *Object* Details can be found [here](#req).
  * `callback` *function(error)* An error is received in the callback in case of operations' failure.

* `deprovision(req, callback)`
Performs operations associated with service deprovisioning.
  * `req` *Object* Details can be found [here](#req).
  * `callback` *function(error)* An error is received in the callback in case of operations' failure.

UAA credentials provider has the following method too:

* `callXsuaa(req, options, callback)`
See [this section](#servicebrokercallxsuaareq-options-callback) for more information.

Example:

```js
const Broker = require('@sap/sbf');

// Applications can have a single provider:
// const provider = Broker.createCredentialsProvider({ /* ... */ })

// or multiple providers, shown below

let broker = new Broker({
  autoCredentials: false,
  hooks: {
    onProvision: (params, callback) => {
      // validate request's params
      const provider = Broker.createCredentialsProvider({ /* ... */ });
      provider.provision(params.req, callback);
    },
    onBind: (params, callback) => {
      const provider = Broker.createCredentialsProvider({ /* ... */ });
      provider.bind(params.req, (err, credentials) => {
        if (err) { return callback(err); }
        credentials.url = '...';
        callback(null, { credentials });
      });
    },
    onUnbind: (params, callback) => {
      const provider = Broker.createCredentialsProvider({ /* ... */ });
      provider.unbind(params.req, callback);
    },
    onDeprovision: (params, callback) => {
      const provider = Broker.createCredentialsProvider({ /* ... */ });
      provider.deprovision(params.req, callback);
    }
  }
});
let server = broker.start();
```

**Note**: Provision and bind are operations associated with creating a resource in the service used for credentials generation. If an error has occurred in a hook after the respective provider method has been called (i.e. `provider.provision` and `provider.bind`), it is recommended that hooks also call the opposite method (i.e. `provider.deprovision` and `provider.unbind`) to clean up the already created resources.

### Service Broker Credentials
Credentials in plain text format used by the Cloud Controller and other clients to call the service broker.
It is an object where each key is a user name and the value is the respective password. It may contain multiple credentials but at least one is required.

Example:
```json
{
  "user1": "password1",
  "user2": "password2"
}
```

These credentials can be provided via the option `brokerCredentials` or the environment variable `SBF_BROKER_CREDENTIALS`.

**Note:** Service broker credentials must be provided either in plain text or [hashed](#service-broker-hashed-credentials) format. The service broker will not work if credentials in neither or both formats are present.

### Service Broker Hashed Credentials
Credentials in hashed format used by the Cloud Controller and other clients to call the service broker.
It is an object where each key is a user name and the value is the respective password in format `sha256:<salt>:<hash-digest-of-salt+password>`.
Here `<salt>` and `<hash-digest-of-salt+password>` are _base64_-encoded strings.
It may contain multiple credentials but at least one is required.

Example:
```json
{
  "user1": "sha256:gVJILqx/97j4aWVQas5RbSUFpWzu7OpaHOt0O29CJOc=:4klnhxFY2YYwzHO7unYu7jc+HuikQLhF7Ebk8tjOJ9c=",
  "user2": "sha256:0NRIb4Gzx1zFRTTs6qpElujmHuUE1TAIg3NbES219f0=:Gv1NMeIzxlbmOCLvY3q4DMbiDXamqF3xRfFivUdligo="
}
```

These credentials can be provided via the option `brokerCredentialsHash` or the environment variable `SBF_BROKER_CREDENTIALS_HASH`.

**Note:** Service broker credentials must be provided either in [plain text](#service-broker-credentials) or hashed format. The service broker will not work if credentials in neither or both formats are present.

**Note:** To generate such hashed credentials, you can use the [hash-broker-password](#hash-broker-password) script.

### Service Catalog
This is a JSON object describing all services and plans offered by this service broker. Its structure is described in [Catalog Management](https://docs.cloudfoundry.org/services/api.html#catalog-management) in Cloud Foundry documentation.

By default the service catalog is loaded from *./catalog.json* file. Alternatively, the catalog file could be explicitly set via the `SBF_CATALOG_FILE` environment variable.

**Note:** In case of IAS as a credentials provider, the catalog is provided to the IAS instance. Do not provide the *./catalog.json* file. See more in the [IAS](#ias) section.

**Note:** Each service name, ID and plan ID in the catalog must be unique across Cloud Foundry.
GUIDs are recommended for service ID and plan ID.
See [Unique service broker](#unique-service-broker).

**Warnings for broker authors:**
- Be cautious when removing services and plans from their catalogs, as platform marketplaces might have provisioned service instances of these plans. Consider your deprecation strategy.
- Do not change the IDs of services and plans. This action is likely to be evaluated by a platform marketplace as a removal of one plan and addition of another. See above warning about removal of plans.

**Note:** For the service image to display correctly in the cockpit it should be encoded as Base64 in the property `metadata.imageUrl` instead of a URL.

Service catalog example:
```json
{
  "services": [{
    "name": "not-real-service",
    "id": "acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
    "description": "Just an example service",
    "tags": ["no-sql", "relational"],
    "requires": ["route_forwarding"],
    "bindable": true,
    "metadata": {
      "provider": {
        "name": "The name"
      },
      "listing": {
        "imageUrl": "http://example.com/cat.gif",
        "blurb": "Add a blurb here",
        "longDescription": "A long time ago, in a galaxy far far away..."
      },
      "displayName": "The Fake Broker"
    },
    "dashboard_client": {
      "id": "398e2f8e-XXXX-XXXX-XXXX-19a71ecbcf64",
      "secret": "277cabb0-XXXX-XXXX-XXXX-7822c0a90e5d",
      "redirect_uri": "http://localhost:1234"
    },
    "plan_updateable": true,
    "plans": [{
      "name": "fake-plan-1",
      "id": "d3031751-XXXX-XXXX-XXXX-a42377d3320e",
      "description": "Shared fake Server, 5tb persistent disk, 40 max concurrent connections",
      "max_storage_tb": 5,
      "metadata": {
        "costs":[
            {
               "amount":{
                  "usd":99.0
               },
               "unit":"MONTHLY"
            },
            {
               "amount":{
                  "usd":0.99
               },
               "unit":"1GB of messages over 20GB"
            }
         ],
        "bullets": [
            "Shared fake server",
            "5 TB storage",
            "40 concurrent connections"
        ],
      }
    }, {
      "name": "fake-plan-2",
      "id": "0f4008b5-XXXX-XXXX-XXXX-dace631cd648",
      "description": "Shared fake Server, 5tb persistent disk, 40 max concurrent connections. 100 async",
      "max_storage_tb": 5,
      "metadata": {
        "costs":[
            {
               "amount":{
                  "usd":199.0
               },
               "unit":"MONTHLY"
            },
            {
               "amount":{
                  "usd":0.99
               },
               "unit":"1GB of messages over 20GB"
            }
         ],
        "bullets": [
          "40 concurrent connections"
        ]
      }
    }]
  }]
}
```

### Additional Service Configuration
This is a JSON object that provides additional deploy-time configuration.
Usually this is used for configurations which are not known in advance like URLs.
Each key in this object should match a service `name` in the catalog. Its value should be an object with the following optional properties:
* `extend_credentials` An object, containing these optional properties.
  * `shared` An object that is merged with the `credentials` object returned by the *bind* operation for this service.
  * `per_plan` An object where each key should match a plan of this service. The value is an object that is merged with the `credentials` object returned by the *bind* operation for this service and plan.
  Overrides any common properties in `shared` object.
* `extend_xssecurity` An object, containing these optional properties.
  * `shared` An object that will overwrite the properties that are sent to the XSUAA on service instance creation. It should have the same structure as [xs-security.json].
  * `per_plan` An object where each key should match a plan of this service. The value is an object that overwrites the properties that are sent to XSUAA when a service instance of this plan is created. This object should have the same structure as [xs-security.json].
  Overrides any common properties in `shared` object.
* `extend_catalog` An object that is merged with the object describing this service in the catalog.

All of these properties are optional.

This configuration can be provided via the option `serviceConfig` or the environment variable `SBF_SERVICE_CONFIG`.

Example:
```js
{
  "service1": {
    "extend_credentials": {
      "shared": {
        // This will go into credentials when binding
        // Common properties for all plans
      },
      "per_plan": {
        "plan1": {
          // Properties specific to this plan
          // This will be merged with "shared" and will go to credentials when binding
        },
        "plan2": {
          "uri": "http://some.host/plan2"
        }
      }
    },
    "extend_xssecurity": {
      "shared": {
        // This object will extend the properties that are sent to the XSUAA on service instance creation
        // Common properties for all plans
        "authorities": ["$XSMASTERAPPNAME.shared_limited_scope"]
      },
      "per_plan": {
        "plan1": {
          // This object will extend the properties that are sent to the XSUAA on service instance creation
          // This will overwrite "shared" properties
          "authorities": ["$XSMASTERAPPNAME.plan_limited_scope"]
        }
      }
    },
    "extend_catalog": {
      // Will hold free-form JSON that will be merged with the catalog description for service "service1"
      "dashboard_client": {
        "id": "133423",
        "secret": "secret",
        "redirect_uri": "http://some.host/dashboard"
      },
      "metadata": {
        "documentationUrl": "http://vendor.com/docs",
        "supportUrl": "http://vendor.com/support"
      }
    }
  }
}
```

### Automatic Credentials Generation
By default this module will try to find a suitable credentials provider service using the strategies described [here](#credentials-providers).

This behavior can be disabled via the `autoCredentials` option so you can take full control of credentials generation in your code.
In this case the `onBind` hook must be implemented as it is responsible for providing the credentials in the reply.

**Note:** To ensure consistent security, it is highly recommended that applications and services use security features provided by the platform instead of implementing their own.

### Credentials Provider Service

It is possible to explicitly specify the credentials provider service name when [automatic credentials generation](#automatic-credentials-generation) is enabled. This could be achieved via the `credentialsProviderService` option or via the environment variable `SBF_CREDENTIALS_PROVIDER_SERVICE`.

Notice that when running on K8S you should also provide a path to the volume where you have mounted those credentials unless you're relying on the default one. See k8sSecretsPath option [here](#new-servicebrokeroptions).

### Business Service Support

SBF will automatically add the following properties to the credentials returned in the response to a bind request:
* `html5-apps-repo` - object containing `app_host_id` property
* `sap.cloud.service`
* `sap.cloud.service.alias`
* `saasregistryenabled`

**Note:** In case of IAS as a credentials provider, properties `sap.cloud.service`, `sap.cloud.service.alias` and `saasregistryenabled` will not be automatically returned. See more in the [IAS](#ias) section.

**Note:** In order to provide the `html5-apps-repo` automatically as part of the service credentials, the service broker must be bound to at least one *html5-apps-repo* service instance (*app-host* plan). In the case of K8S the service instance will be looked up by label *html5-apps-repo*.

It is also possible to dynamically provide `app_host_id` in the [`onBind`](#onbindparams-callback) hook which will be merged with the `app_host_id`(s) of the already bound *html5-apps-repo* service instance(s) (if any). This can be achieved via the `reply.credentials` object returned by the `onBind` hook:

```js
function onBind(params, callback) {
  // obtain 'app_host_id'
  const appHostId = 'dynamic_app_host_id';

  const reply = {
    credentials = {
      'html5-apps-repo': {
        'app_host_id': appHostId // Multiple `app_host_id`s can be provided in a comma-separated list without spaces (e.g. 'app-host-1,app-host-2').
      }
    }
  }

  callback(null, reply);
}
```

**Note:** It is expected that the `sap.cloud.service`, `sap.cloud.service.alias` and the `saasregistryenabled` properties are defined in the service catalog, under the `sapservice` property of the service metadata, for example:
```json
{
  "services": [{
    "name": "fake-service",
    "id": "acb56d7c-XXXX-XXXX-XXXX-feb140a59a66",
    "description": "fake service",
    "tags": ["no-sql", "relational"],
    "bindable": true,
    "metadata": {
      "sapservice": {
        "sap.cloud.service": "com.sap.sbf.testservice",
        "sap.cloud.service.alias": "country",
        "saasregistryenabled": true
      }
    },
    "plan_updateable": true,
    "plans": [{
      "name": "fake-plan-1",
      "id": "d3031751-XXXX-XXXX-XXXX-a42377d3320e",
      "description": "Shared fake Server, 5tb persistent disk, 40 max concurrent connections",
      "max_storage_tb": 5,
    }]
  }]
}
```

### Hooks
Hooks are custom callback functions that allow you to extend and even replace default service broker functionality.


#### `verifyClientCertificate(params, callback)`
This hook is called on each received request in SBF if the service broker was configured with the `SBF_SECURE_INCOMING_CONNECTIONS` parameter (See [Environment variables](#environment-variables)) set to true.

* `params` *Object*
  * `clientCertificate` *String*  Service Manager certificate.  
  * `req` *Object* See [here](#req) for more details.
* `callback` *function(error, reply)*
  * `error` *Object* See [Error Handling](#error-handling).
  * `reply` *Object* An object returned as a response to each request.
  
```js
  const broker = new Broker({
    autoCredentials: true,
  	hooks: {
      verifyClientCertificate:(params, callback) =>{
          console.log(params.clientCertificate);
          //do you validations here
          //in case of failed verification pass Forbidden
           callback(new Forbidden());
                              
      }
    }});
  broker.start();
```

SBF performs no additional processing for this operation.

**Note:** Implementing `verifyClientCertificate` is not mandatory.

#### `onProvision(params, callback)`
Called when the broker receives a *provision* request.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (more information about the structure can be found [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* Details can be found [here](#req).
  * `xsuaa` *Object* (Optional) Details can be found [here](#xsuaa-clone-info).
  * The parameters described in the OSB API specification under [Provisioning, Parameters](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#parameters-1)
  * The fields described in the OSB API specification under [Provisioning, Body](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#body-2)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *provision* request.
    * `async` *Boolean* (Optional) Specifies whether the provision operation is started asynchronously. Default is `false`. It will not be included in the response.
    * `dashboard_url` *String* (Optional) The URL of a web-based management user interface for the service instance; we refer to this as a service dashboard. The URL MUST contain enough information for the dashboard to identify the resource being accessed. **Note:** a broker that wishes to return *dashboard_url* for a service instance MUST return it with the initial response to the provision request, even if the service is provisioned asynchronously.
    * `operation` *String* (Optional) For asynchronous responses, service brokers MAY return an identifier representing the operation. The value of this field SHOULD be provided by the broker client with requests to the Last Operation endpoint in a URL encoded query parameter.

**Note:** The default SBF operation is executed _before_ this hook is called. For example, if XSUAA is used, the OAuth client clone is already created.

#### `onUpdate(params, callback)`
Called when the broker receives an *update* request.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (more information about the structure can be found [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* Details can be found [here](#req).
  * `xsuaa` *Object* (Optional) Details can be found [here](#xsuaa-clone-info).
  * The parameters described in the OSB API specification under [Updating a Service Instance, Parameters](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#parameters-2)
  * The fields described in the OSB API specification under [Updating a Service Instance, Body](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#body-4)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *update* request.
    * `async` *Boolean* (Optional) Specifies whether the update operation is started asynchronously. Default is `false`. It will not be included in the response.
    * `operation` *String* (Optional) For asynchronous responses, service brokers MAY return an identifier representing the operation. The value of this field SHOULD be provided by the broker client with requests to the Last Operation endpoint in a URL encoded query parameter.

**Note:** The default SBF operation is executed _before_ this hook is called. For example, if XSUAA is used, the OAuth client clone is already updated.

#### `onDeprovision(params, callback)`
Called when the broker receives a *deprovision* request.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (more information about the structure can be found [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* Details can be found [here](#req).
  * The parameters described in the OSB API specification under [Deprovisioning, Parameters](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#parameters-4)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *deprovision* request.
    * `async` *Boolean* (Optional) Specifies whether the deprovision operation is started asynchronously. Default is `false`. It will not be included in the response.
    * `operation` *String* (Optional) For asynchronous responses, service brokers MAY return an identifier representing the operation. The value of this field SHOULD be provided by the broker client with requests to the Instance Last Operation endpoint in a URL encoded query parameter.

**Note:** The default SBF operation is executed right _after_ this hook and before the HTTP response is returned.
For example, if XSUAA is used, the OAuth client clone will be deleted right after this hook, even in case of an async operation (`reply.async == true`).

**Note:** This hook should be repeatable (idempotent), i.e. if it completes successfully once, any subsequent invocations with the same parameters should be successful too. This is necessary in case the default SBF operation fails. Then it should be possible to repeat the whole operation to complete the cleanup. Also the platform may execute _deprovision_ after a failed _provision_ operation as part of [orphan mitigation](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#orphans). So `onDeprovision` hook may be called even when the service instance and associated resources do not exist.

#### `onLastOperation(params, callback)`
Called when the broker receives a *last operation* request for an **instance**.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (more information about the structure can be found [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* Details can be found [here](#req).
  * The parameters described in the OSB API specification under [Polling Last Operation, Parameters](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#parameters)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *last operation* request.
    * `state` *String* Valid values are "in progress", "succeeded", and "failed". While "state": "in progress", the platform SHOULD continue polling. A response with "state": "succeeded" or "state": "failed" MUST cause the platform to cease polling.
    * `description` *String* (Optional) A user-facing message displayed to the platform API client. Can be used to tell the user details about the status of the operation.


SBF performs no additional processing for this operation, except for [IAS as credentials provider](#ias), where the request is proxied to the IAS Broker.

**Note:** Implementing `onLastOperation` is mandatory, if any other instance operation hook returns `reply.async = true` (apart from IAS flow). If this hook is not implemented, SBF returns status 501 (Not Implemented). If IAS is the credentials provider, the hook is optional.

See [Asynchronous broker operations](#asynchronous-broker-operations) for more information.

#### `onFetchInstanceParams(params, callback)`
Called when the broker receives a *fetch instance* request.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (you can find more information about the structure [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* See [here](#req) for more details.
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *instance parameters* request.

SBF performs no additional processing for this operation, except for [IAS as credentials provider](#ias), where the request is proxied to the IAS Broker.

**Note:** Make sure to set the `instances_retrievable` property in the broker catalog to `true`.

**Note:** Implementing `onFetchInstanceParams` is not mandatory, but we recommend that you implement it together with the [onProvision hook](#onprovisionparams-callback),which is used to store parameters (SBF doesn't handle parameters' storage). If this hook isn't implemented, SBF returns status 501 (Not Implemented).

**Note:** The OSB specification defines the expected response body for this request. Please review it [here](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#fetching-a-service-instance). For instance, the response body expects a `parameters` object, which is what CF is looking for as an OSB platform.

#### `onBind(params, callback)`
Called when the broker receives a *bind* request.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `binding_id` *String* Service binding ID. It will be used for future unbind requests, so the broker will use it to correlate the resource it creates.
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (more information about the structure can be found [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `generatedCredentials` *Object* (Optional) The credentials object generated by the [credentials provider](#credentials-providers). It is not provided if the `autoCredentials` option is `false`.
  * `req` *Object* Details can be found [here](#req).
  * The fields described in the OSB API specification under [Binding, Body](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#body-6)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *bind* request.
    * `credentials` *Object* A free-form object of credentials that can be used by applications or users to access the service.

The `credentials` object in the response will be produced by merging:
1. `reply.credentials` returned from `onBind`
2. Credentials generated by the [Credentials Provider Service](#credentials-provider-service), unless [disabled](#automatic-credentials-generation)
3. The properties described in the [Business Service Support](#business-service-support) section
4. Binding properties for the given service and plan from [Additional Service Configuration](#additional-service-configuration)

Here each object overwrites common properties in the next one.

**Note:** The default SBF operation is executed _before_ this hook is called.

**Note:** Implementing `onBind` hook is mandatory, if `autoCredentials` option is `false`.
In this case `onBind` must provide the necessary credentials in `reply.credentials`.

**Note:** If the `onBind` hook returns a 202 status code for async operation (`reply.async = true`), you are required to also implement the [onBindLastOperation](#onbindlastoperationparams-callback) and [onFetchBindingParams](#onfetchbindingparamsparams-callback) hooks (not mandatory in IAS flow).<br/>
This is defined in the OSB specification [async binding response handling](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#response-6).

#### `onUnbind(params, callback)`
Called when the broker receives an *unbind* request.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `binding_id` *String* Service binding ID. It will be used for future unbind requests, so the broker will use it to correlate the resource it creates.
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
  Contains the parsed data from the header (more information about the structure can be found [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* Details can be found [here](#req).
  * The parameters described in the OSB API specification under [Unbinding, Parameters](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#parameters-3)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *unbind* request.
    * `async` *Boolean* (Optional) Specifies whether the unbind operation is started asynchronously. Default is `false`. It will not be included in the response.
    * `operation` *String* (Optional) For asynchronous responses, service brokers MAY return an identifier representing the operation. The value of this field SHOULD be provided by the broker client with requests to the Binding Last Operation endpoint in a URL encoded query parameter.

**Note:** The default SBF operation is executed right _after_ this hook and before the HTTP response is returned.

**Note:** This hook should be repeatable (idempotent), i.e. if it completes successfully once, any subsequent invocations with the same parameters should be successful too. This is necessary in case the default SBF operation fails. Then it should be possible to repeat the whole operation to complete the cleanup. Also the platform may execute _unbind_ after a failed _bind_ operation as part of [orphan mitigation](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#orphans). So `onUnbind` hook may be called even when the service binding and associated resources do not exist.

#### `onBindLastOperation(params, callback)`
Called when the broker receives a *last operation* request for **binding**.

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `binding_id` *String* Service binding ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
    Contains the parsed data from the header (You can find more information about the structure [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* You can find the details [here](#req).
  * The parameters described in the OSB API specification under [Polling Last Operation, Parameters](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md#parameters)
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *last operation* request.
    * `state` *String* Valid values are "in progress", "succeeded", and "failed". While "state": "in progress", the platform SHOULD continue polling. A response with "state": "succeeded" or "state": "failed" MUST cause the platform to cease polling.
    * `description` *String* (Optional) A user-facing message displayed to the platform API client. Can be used to tell the user details about the status of the operation.

SBF performs no additional processing for this operation, except for [IAS as credentials provider](#ias), where the request is proxied to the IAS Broker.

**Note:** Implementing `onBindLastOperation` is mandatory, if any other binding operation hook returns `reply.async = true` (apart from IAS flow). If this hook is not implemented, SBF returns status 501 (Not Implemented). If IAS is the credentials provider, the hook is optional.

See [Asynchronous broker operations](#asynchronous-broker-operations) for more information.

#### `onFetchBindingParams(params, callback)`
Called when the broker receives a *fetch binding* request. 

* `params` *Object*
  * `instance_id` *String* Service instance ID
  * `binding_id` *String* Service binding ID
  * `originating_identity` *Object* Only available if the `X-Broker-API-Originating-Identity` header is provided in the request.
    Contains the parsed data from the header (you can find more information about the structure [here](https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/profile.md#originating-identity-header)).
  * `user_id` *String* The authenticated user that called the broker.
  * `req` *Object* See [here](#req) for more details.
* `callback` *function(error, reply)*
  * `error` *Object* See [Error handling](#error-handling).
  * `reply` *Object* An object returned as a response to the *instance parameters* request.

SBF performs no additional processing for this operation, except for [IAS as credentials provider](#ias), where the request is proxied to the IAS Broker.

**Note:** Make sure to set the `bindings_retrievable` property in the broker catalog to `true`.

**Note:** Implementing `onFetchBindingParams` is not mandatory, except for when the [onBind hook](#onbindparams-callback) is implemented and returns an async response, as defined by the OSB specification. In this case, the bind operation will be asynchronous, and the platform will poll for its last operation status, and finally will send a fetch binding request. <br/> If this hook isn't implemented, SBF returns status 501 (Not Implemented).

**Note:** The OSB specification defines the expected response body for this request. Please review it [here](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md#fetching-a-service-binding). For instance, the response body expects a `parameters` and `credentials` objects, which is what CF is looking for as an OSB platform.


#### `params` details

##### `req`

An [IncommingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) instance with additional properties:
- `loggingContext` - attached to the request object by the _@sap/logging_ library, provides means of getting loggers and tracers. The `correlationId` property provided by the `loggingContext` can be used to correlate log entries from different components involved in a broker operation. More information is available in the documentation of the _@sap/logging_ package.

##### `XSUAA clone info`

An *Object*, currently only provided in case XSUAA is used as a credentials provider. It contains OAuth client clone information. Available properties:
- `tenantId` *String*

#### Error handling
The `callback` function passed to each hook takes an `error` as its first argument.
This is the standard conventions for callback functions in Node.js.

**Note:** The hook must call the `callback` _exactly_ once.

In case of success, the hook should pass `null` or `undefined` as `error` argument to the `callback`.

In case of error, the hook should pass an [Error](https://nodejs.org/api/errors.html#errors_class_error) object as `error` argument to the `callback`. In this case any subsequent arguments will be ignored.

If the `error.statusCode` is set, it will be returned as HTTP status code in the response.
In this case the error message will be sent to the broker client.
Otherwise the broker will return HTTP status code 500 with a generic error message.

### Environment variables

- `SBF_CATALOG_FILE` - path to a catalog file, the default is *./catalog.json*, see [Service Catalog](#service-catalog)
- `SBF_CATALOG_SUFFIX` - suffix to append to all service names, service IDs and plan IDs in the catalog, see [Unique service broker](#unique-service-broker)
- `SBF_BROKER_CREDENTIALS` - JSON object with credentials in plain text format for calling the service broker, see [Service Broker Credentials](#service-broker-credentials)
- `SBF_CLIENT_CERTIFICATE_KEY` - a string that represents the private key corresponding to the client certificate used for authentication with XSUAA, see [Authentication using X.509 client certificates](#authentication-using-x509-client-certificates)
- `SBF_BROKER_CREDENTIALS_HASH` - JSON object with credentials in hashed format for calling the service broker, see [Service Broker Hashed Credentials](#service-broker-hashed-credentials)
- `SBF_SERVICE_CONFIG` - provides additional deploy-time configuration, see [Additional service configuration](#additional-service-configuration)
- `SBF_CREDENTIALS_PROVIDER_SERVICE` - the name of the credentials provider service instance, see [Credentials provider service](#credentials-provider-service)
- `SBF_UAA_TIMEOUT` - timeout in milliseconds for requests to XSUAA, default is 20 seconds.
- `SBF_UAA_RETRY_TIMEOUT` - maximum allocated time (in milliseconds) to connect to XSUAA, including retries. Defaults to 30 seconds (30000 ms).
- `SBF_UAA_RETRY_MAX_NUMBER` - maximum connection attempts to XSUAA. Allowed values: 0-5 (0 = no retries). Defaults to 3.
- `DISABLE_UAA_GRANT_TYPE_CLIENT_X509` — when set to true, disables the deprecated client_x509 grant type and forces the use of client_credentials with X.509 certificates. This allows applications to proactively migrate away from client_x509 regardless of any remaining deprecated configuration. Default: false. This flag will be removed once the client_x509 grant type is officially deprecated.
- `SBF_SECURE_OUTGOING_CONNECTIONS` - if set to false `false`, unencrypted outgoing connections will be allowed, see [Secure outgoing connections](#secure-outgoing-connections)
- `SBF_SECURE_INCOMING_CONNECTIONS` - if set to true `true`, a [secured connection](#mtls-authentication) is established and the custom hook [verifyClientCertificate](#verifyclientcertificateparams-callback) is called . For the automatic verification of the Service Manager certificate, you also have to configure the `SBF_SERVICE_MANAGER_CERTIFICATE_SUBJECT` environment variable.
- `SBF_SERVICE_MANAGER_CERTIFICATE_SUBJECT` - the Service Manager client certificate's subject. This variable has to be configured so that the Service Manager [client certificate](#out-of-the-box-mtls) is verified. Also, set `SBF_SECURE_INCOMING_CONNECTIONS` to true. You can retrieve the Service Manager certificate's subject at `https://service-manager.cfapps.<landscape domain>/v1/info` from the `service_manager_certificate_subject` field. The URL changes depending on your landscape domains. For example, https://service-manager.cfapps.eu10.hana.ondemand.com/v1/info.
- `SBF_ENABLE_AUDITLOG` - if `false` disable audit logging, otherwise it is enabled.
- `SBF_TENANT_ID` - Mandatory if the broker application is running on Cloud Foundry and audit logging is *enabled*.
- `SBF_SECURE_UAA_SCOPES` - Relevant for [XSUAA as a credentials provider](#xsuaa). When set to `true` and no `authorities` section was provided in [Additional service configuration](#additional-service-configuration) (`extend_xssecurity`), SBF will pass an empty `authorities` array in create/update requests to XSUAA, regardless of the `authorities` provided by the consumer. Default: `true`.<br/> **Note: This behavior and environment variable form an incompatible change from release v6.4.9**.
- `SBF_USE_MULTIPLE_XSUAA_CREDENTIALS` - Enables the multiple credentials provider feature. Enabling this variable, required implementation of the `xsuaaCredentialsDecider` hook. It is the developer's responsibility to ensure that the `xsuaaCredentialsDecider` hook returns a valid credentials provider for each request (See: [Multiple Credentials Provider Support](#multiple-credentials-provider-support)).
- `PORT` - the port on which the service broker will listen for requests, default is 8080.

### `gen-catalog-ids`

Each service object and each service plan object has a mandatory _id_ field. Its value must be a non-empty string, globally unique within the platform marketplace. Using a GUID is recommended.

The _@sap/sbf_ package provides the `gen-catalog-ids` script which generates such GUIDs for you.

```sh
npx gen-catalog-ids [<path-to-catalog.json>]
```
Here the file path argument is optional. If not provided, the command will use _catalog.json_ in the current directory.
This command will insert a new GUID as _id_ property for each service and each plan in the catalog.
It will not change any existing IDs - only the id properties with empty string for their value and the ones not provided at all.
You can run it after creating a new catalog or after adding more services or plans.

**Note:** In the command above you may need to replace the forward slashes with backslashes, depending on your platform.

### `hash-broker-password`

If you use service broker credentials in [hashed format](#service-broker-hashed-credentials), you will need to hash your plain text password. For this purpose the _@sap/sbf_ package provides the `hash-broker-passsword` script which does that for you.

If you want to use some password of your own, run:

```sh
npx hash-broker-password
```

You will be prompted to enter the plaintext password and will be given its hash in format `sha256:<salt>:<hash-digest-of-salt+password>`.
Here `<salt>` is also generated by the script.

Otherwise you can use the command in _batch_ mode:

```sh
npx hash-broker-password -b
```

That will generate a random 32-character plaintext password, random 32-byte salt and print them along with the hash.
Take note of the generated password and hash as they will not be persisted.

When you have your service broker hashed credentials generated, you should:
* provide hashed credentials via the option `brokerCredentialsHash` or the environment variable `SBF_BROKER_CREDENTIALS_HASH`
* provide the user and plaintext password when [registering the service broker](#register-the-service-broker).

## Troubleshooting

### Increase the log level

The service broker framework uses _@sap/logging_ package so all of its features are available to control logging.
For example to set all logging and tracing to finest level set `XS_APP_LOG_LEVEL` environment variable to `debug`.
See _@sap/logging_ documentation for details.

Some of the libraries used by this package employ other tracing mechanisms. For example many use the popular [debug](https://www.npmjs.com/package/debug) package. This means that by setting `DEBUG` environment variable, you can enable additional traces. Set it to `*` to enable all of them, but be careful as the output may be overwhelming.
In addition, internal Node.js traces can be enabled via `NODE_DEBUG` environment variable.

**Warning:** Enabling some of these options may trace security sensitive data, so use with caution.

### @sap/sbf not found

If you get the following error during deployment
```
       npm ERR! 404 Not found : @sap/sbf
       npm ERR! 404
       npm ERR! 404  '@sap/sbf' is not in the npm registry.
```
Run `npm install` locally and make sure `node_modules` is not in *.cfignore* file.
Then push again your broker application.

If you get that error when you run `npm install` locally, make sure to configure the proper npm registry as described on the wiki of this project.

### Cannot execute start-broker script

The service broker may crash during startup on XS advanced with one of the following errors in the log:
```
exec: start-broker: not found
```
```
start-broker: cannot execute: Permission denied
```

There are two possible solutions:
* Set environment variable `ALWAYS_INSTALL` to `true` for the broker application
* Change the `start` script in _package.json_ like this:
```
"start": "node node_modules/@sap/sbf/sbf.js"
```

### Create service fails with "Client already exists"

If `create-service` operation fails with error "Client already exists", you are probably attempting to create a second service instance with the same *xsappname* in the parameters. Note that *xsappname* should be different for each service instance.

[xs-security.json]: https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.03/en-US/6d3ed64092f748cbac691abc5fe52985.html
