@sap/async-xsjs
===========

Asynchronous compatibility layer for SAP HANA XS applications running on Node.js 16 and higher. 
<!-- toc -->

- [Usage](#usage)
    * [Options](#options)
        + [hana](#hana)
        + [secureStore](#securestore)
        + [formData](#formdata)
        + [mail](#mail)
        + [destinationProvider](#destinationprovider)
        + [auditLog](#auditlog)
        + [context](#context)
        + [libraryCache](#librarycache)
        + [Multitenant usage](#multitenant-usage)
- [OData support](#odata-support)
    * [Clear OData model cache](#clear-odata-model-cache)
- [NPM packages support](#npm-packages-support)
- [Destinations support](#destinations-support)
    + [Via user provided services](#via-user-provided-services)
    + [Via custom provider function](#via-custom-provider-function)
- [Accessing column values by index in *$.hdb.ResultSet* rows](#accessing-column-values-by-index-in-hdbresultset-rows)
- [Tracing via *$.trace* API](#tracing-via-trace-api)
- [Troubleshooting](#troubleshooting)
- [Differences with SAP HANA XS Classic](#differences-with-hana-xs-classic)

<!-- tocstop -->

For the API of the XS Engine:
* [SAP HANA XS JavaScript Reference](http://help.sap.com/hana/SAP_HANA_XS_JavaScript_API_Reference_en/)


## Usage

```js
'use strict';

var xsenv = require('@sap/xsenv');
var async_xsjs = require('@sap/async-xsjs');

var port = process.env.PORT || 3000;
var options = xsenv.getServices({
    uaa: 'xsuaa',
    hana: 'hana-hdi',
    jobs: 'scheduler',
    mail: 'mail',
    secureStore: 'secureStore',
    auditLog: 'audit-log'
});
var xsjs_server = await async_xsjs(options);
await xsjs_server.listen(port);

console.log('Node XS server listening on port %d', port);
```

The starting function takes an object that contains service credentials and application options.

You need to set up the Application Router for authentication.
To learn how, see: 
[Configure the XS Advanced Application Router](https://help.sap.com/docs/SAP_HANA_PLATFORM/4505d0bdaf4948449b7f7379d24d0f0d/6ba89596e3a64a5480c3977d4ea7fdba.html)

For local testing, you can set `options.anonymous = true` to disable authentication.

### Options

Here is a list of options you can provide:

| property | default | usage |
| -------- | ------- | ----- |
| rootDir | 'lib' | XSJS files location |
| rootDirs |  | Same as above but array of directories can be provided. Overrides `rootDir` if provided. |
| uaa |  | UAA configuration necessary to enable JWT token authentication and business user propagation to SAP HANA |
| [hana](#hana) |  | Object containing SAP HANA DB connection parameters - used for DB connectivity |
| [secureStore](#secureStore) |  | Object containing SAP HANA DB connection parameters - used for secure store connectivity |
| jobs |  | Job Scheduler connection parameters - used for registering jobs during application startup, and later for updating job execution status when the job is finished |
| [mail](#mail) |  | Mail options - used by $.net.Mail API |
| maxBodySize | '1mb' | Maximum body size accepted by _async-xsjs_. The value is passed to the [bytes library](https://www.npmjs.com/package/bytes) for parsing. |
| anonymous | false | Enables anonymous access - without credentials |
| [formData](#formdata) |  | Special restrictions over form-data submitted to server |
| [destinationProvider](#destinationProvider) |  | Custom function, synchronous or asynchronous, to be used when $.net.http.readDestination is called in the XSJS code. For more information on destination support, check the detailed description for this configuration option. |
| ca | certificates listed in the `XS_CACERT_PATH` env variable | Trusted SSL certificates for any outgoing HTTPS connections. Should be an array of loaded certificates. |
| compression | true | By default, text resources over 1K are compressed. |
| [auditLog](#auditlog) |  | Object containing Audit Log service credentials. If not provided, audit logging will be disabled. If set to `{ logToConsole: true }` Audit Log messages will be written to the console (only suitable for non-productive setup, e.g. local development).|
| [context](#context) | {} | Extends the default context in `.xsjs` scripts |
| [libraryCache](#librarycache) | {} | Contains the `.xsjslibs` that should be cached |
| redirectUrl | | If specified, a redirect to this URL is triggered when the root path is requested. <br> **Note**: When _async-xsjs_ is performed behind a reverse proxy (for example, Application Router), the value of this property should be aligned with the path rewriting rules that may apply. |
| xsApplicationUser | true | If set to false, the session variable `XS_APPLICATIONUSER` will not be set. | 

**Note:** When there are several `rootDirs` (for example, **repo1** and **repo2**) and their file structures are identical (_/repo1/hello.xsjs_ and _/repo2/hello.xsjs_), then:
* The file from the first directory, as listed in the `rootDirs` property, will be used (_/repo1/hello.xsjs_).
* The file from the second directory (_/repo2/hello.xsjs_) will be ignored with a warning message in the logs.

SAP HANA XS Advanced applications connect to SAP HANA with a fixed technical user provided via a Cloud Foundry service (environment variables). The actual (business) user of the application is retrieved from the JWT token and propagated to SAP HANA.

The connection to the Job Scheduler service is done by using a fixed technical user provided by the Cloud Foundry service binding.


#### hana

| property | mandatory | usage |
| -------- | ----- | -------- |
| host | x | DB host |
| port | x | DB port |
| user | x | Technical user used for a DB connection |
| password | x | Technical user password |
| schema |  | If provided, it will be set as a current schema to DB connection |
| connectWithLoggedUser |  | Possible values are `true` / `false`. Default is `false`. If provided, the DB connection will be done with the SAML assertion contained in the JWT token of the logged user. <br> **Note:** This option is provided only for the SAP HANA cockpit transition to SAP HANA XS Advanced. In general, this option should be avoided. |
| sqlcc |  | Object containing all SQLCC configurations as properties with name after SQLCC name used in the XSJS code |
| ca |  | Trusted SSL certificates explicitly for SAP HANA connection. Should be an array of loaded certificates. If not provided, certificate from the service binding will be used. If none are available, SAP HANA connection will not be encrypted. |

- `sqlcc` - referring to the example above. SQLCC property can be initialized from the bound services like this:

```js
...
options.hana.sqlcc = xsenv.getServices({
  'com.sap.my.sqlcc_config': 'SQLCC__NAME',
  'com.sap.my.other_sqlcc_config': 'OTHER_SQLCC_UPS_NAME'
  });
...
```

and later used in an XSJS code like:
```js
var connection = await $.db.getConnection('com.sap.my.sqlcc_config');
```


#### secureStore

| property | mandatory | usage |
| -------- | ----- | -------- |
| host | x | DB host |
| port | x | DB port |
| user | x | Technical user used for DB connection |
| password | x | Technical user password |
| schema |  | If provided, it will be set as a current schema to DB connection |



#### formData

Object with the following properties:

| property | default | usage |
| -------- | ------- | ----- |
| maxFilesSizeInBytes | `10485760` | It restricts the total size of all uploaded files. |


#### mail

Object with the following properties:

| property | mandatory | usage |
| -------- | ----- | -------- |
| host | x | SMTP server host |
| port | x | SMTP server port |
| ignoreTLS |  | Can be `true` or `false`. Represents whether a STARTTLS command should be invoked, if available by the mail server. Default: `false` |
| secure |  | Can be `true` or `false`. Represents whether the connection should be over TLS/SSL. Default: `false` |
| connectionTimeout |  | Connection timeout in ms. Default: 60000 |
| authMethod |  | Authentication method to use. Can be: `'PLAIN'` / `'LOGIN'` / `'CRAM-MD5'` |
| auth |  | Authentication credentials. Example: `{user: 'user', pass: 'pass'}`  Default: no authentication |


#### destinationProvider

If your application requires different mechanism for destination configuration - for example, dynamic configuration changes or dynamically adding new destinations to your application - you can provide your own function that retrieves these configurations from your storage.

For convenience, we support synchronous and asynchronous destination provider function. Depending on the number of parameters your function has, we call it synchronously or asynchronously.

Here are the signatures for both:

```js
function getDestinationSync(packagename, objectname, dtDescriptor) {
}

function getDestinationAsync(packagename, objectname, dtDescriptor, callback) {
}
```


| parameter | description |
| -------- | --------- |
| packagename | The package of the destination supplied to `$.net.http.readDestination` |
| objectname | The object name of the destination supplied to `$.net.http.readDestination` |
| dtDescriptor | Object containing all properties contained in the corresponding `.xshttpdest` file, if such file is available. Otherwise - __undefined__. |
| callback | Provided only in the asynchronous case - should be called by your provider function to return the destination or report an error.  |

#### auditLog

This package generates audit log entries in the following cases:
- When the validation of the incoming JWT token fails
- When the token in the request used to trigger a job does not contain the required scope

Applications can also write audit log messages:

```js
var async_xsjs = require('@sap/async-xsjs');
var xsenv = require('@sap/xsenv');
var auditLogging = require('@sap/audit-logging');

var port = process.env.PORT || 3000;
var options = xsenv.getServices({ auditLog: 'audit-log', uaa: 'xsuaa', hana: 'hana-hdi' });

// Using Audit Log REST API v2
var auditLog = await auditLogging.v2(options.auditLog);
options.context = { auditLog: auditLog };
(await async_xsjs(options)).listen(port);
```

It is recommended to use Audit Log REST API v2.
For more information, refer to the documentation of the _@sap/audit-logging_ package.

The audit log client object can then be used as following:

```js
await auditLog
  .securityMessage('Content of the message')
  .by($.session.getUsername())
  .log();
```

**Note**: `$.session.getUsername()` returns `undefined` in case `anonymous` mode is used. It is up to applications whether to use another string as a user or not to audit log at all.


#### context

This option can be used if you want to extend the XSJS scripts with additional global variables.

Example:

```js
var async_xsjs = require('@sap/async_xsjs');
var options = {
  anonymous: true,
  context: { answer: 42 }
};
(await async_xsjs(options)).listen(3000);
```

This configuration extends the context of XSJS scripts with one additional variable called `answer`.
Every time an XSJS script is executed, it will not only have the `$` variable in its context, but will also include the variable `answer` with value `42`.

Let's say we have a file `answer.xsjs` with the following content:
```js
await $.response.setBody(answer);
```
A request to `http://<your_domain>:3000/answer.xsjs` will respond with `42`.

With the `context` property set, you can expose Node.js packages and variables:
```js
var options = {
  anonymous: true,
  context: { environment: process.env, _: require('lodash') }
};
```

Currently, we are aware of a limitation which causes `<variable> instanceof <constructor_function>` used in an XSJS script to have odd behaviour.
Also, stubbing or mocking constructor functions such as `Date`, `String`, etc in an XSJS script won't affect other XSJS files.

The `context` property also finds usage in a workaround for this limitations. 

Setting:
```js
var options = {
  anonymous: true,
  context: { Array: Array, String: String }
};
```
will fix these problems, but has the following side effects:

* Creating an array in an XSJS script and checking its instance will now return `false`:
```js
  var myArray = [1, 2, 3];
  await $.response.setBody(myArray instanceof Array); // Responds with false
```
* Monkey-patching built-in types won't work as expected if they are exposed through the `context` property:
```js
  String.prototype.contains = function(str) { return this.indexOf(str) >= 0; };
  var stringLiteral = 'Abc';
  var stringObject = new String('Abc');
  console.log(stringLiteral.contains); // undefined
  console.log(stringObject.contains); // [Function]
```
Since there might be other side effects, **use this feature at your own risk.**

#### libraryCache

An object that contains the `.xsjslibs` that will be cached. Example:

```js
{
  'my.libs.utility': 'global'
}
```

In an XSJS code, the import looks like this:

```js
var utility = await $.import('my.libs', 'utility');
```

**Note:** It is recommended to use this feature only when necessary, because it keeps the cached content until the application is running.
It might have side effects in case the `.xsjslib` keeps state. It also leads to extensive memory consumption and this should be considered while calculating application memory limits.

#### Multitenant Usage

In multitenant scenarios, the `hana` and `secureStore` properties can contain an object with the credentials of a _managed-hana_ (Instance Manager) service (created with the appropriate service plan) instead of the credentials of the _hana_ service. In this case, the application will connect to a SAP HANA system, depending on the tenant (identity zone) of the incoming request.
A managed service instance for the particular tenant should be created in advance, and the corresponding database artefacts should be deployed prior to requesting the application with this tenant. Otherwise, the processing of the request will be terminated with an error.

**Note**: Currently, jobs are not multitenant-aware. They are shared between tenants, and a connection to a SAP HANA database cannot be established.
A job executing XSJS code can still connect to a specific SAP HANA service instance, by using SQLCC configuration.

## OData Support

OData support is provided by OData package `@sap/xsodata`. Details on what features are provided can be found in the project itself. The compatibility layer scans for `.xsodata` files in the specified source directory and registers OData endpoints for each valid descriptor. Both JavaScript and SQL script exits are supported.

### Clear OData model cache

For each OData service, the model is loaded and cached in memory upon first request.
In case the schema of the underlying DB objects is changed at runtime, it is necessary to reload the model. Here is an example:
```js
var app = await xsjs(options);

function onSchemaChange(tenant) {
  app.clearODataCache(tenant);
}
```
* `clearODataCache(tenant)` clears the OData model cache for the given tenant.
* `tenant` argument is optional. If not provided, the cache for all tenants will be cleared.

**Note:** Each application instance contains a cache of OData models. Clearing the cache in one of those instances does not automatically trigger cache invalidation in the others. The application itself is responsible for calling `clearODataCache` in each instance. Since an HTTP request is received only by a single instance, it cannot be used to trigger clearing the cache in a consistent manner for the whole application. Other solutions, like messaging, are more suitable for that purpose.

## NPM Package Support
As an extension in the dollar API, we included support for all the available NPM packages. <br />
For example, in your XSJS file you can add the following code:

```js
var _ = $.require('underscore');
// Count to ten
var count = '';
_.range(11).forEach(function(number) {
  count += number + ' ';
});
await $.response.setBody(count);
```

You can also require a file relatively. The required file will execute in a Node.js context. This means, you will have access to global Node.js variables, such as `__dirname`, `process`, etc. in it.

For example, if we have a file called `myAPI.js` with content:

```js
// myAPI.js
module.exports = {
  getDirname: function() {
    return __dirname;
  }
};
```

Let's say `myAPI.js` is located in a parent directory for the following XSJS file:
```js
var myAPI = $.require('../myAPI.js');
await $.response.setBody(myAPI.getDirname());
```

## Destinations Support

#### Via user provided services
By default, the compatibility layer supports destination configuration via user-provided services. The destination name (the repo resource ID, e.g. package + '.' + xshttpdest name) is matched to a service name.

Example content of VCAP_SERVICES:

```js
"VCAP_SERVICES": {
  "user-provided": [
    {
      "label": "user-provided",
      "name": "foobar.httpdest.mydest",
      "credentials": {
        "host": "some.host",
        "port": 8088,
        "username": "user",
        "password": "secret"
      }
    }
  ]
}
```
Example usage in an XSJS code:
```js
var destination = await $.net.http.readDestination('foobar.httpdest', 'mydest');
```
If there is no service in VCAP_SERVICES with the same name as the destination requested, an exception is thrown.

When a destination is read, the content of the design time descriptor is merged with the properties provided in the user-provided service. Property values of the UP service override DT descriptor values.


#### Via custom provider function

If the default support is not enough for your use case, you can provide a custom destination provider function. For details how to do that, see the __destinationProvider__ configuration option explained above.

## Accessing Column Values by Index in `$.hdb.ResultSet` Rows

Column values from within a row of `$.hdb.ResultSet` in XS Classic can be accessed either by column name or by column index.
If an application does not make use of accessing columns by index, then this capability can be turned off, which will result in an improved performance:

```js
var connection = await $.hdb.getConnection({ enableColumnIndices: false });
```

## Tracing Via `$.trace` API

Each trace entry is associated with a location. The entry point being accessed is used as a location:
- All application trace entries produced during OData handling (entries produced by exits and the imported `.xsjslib` scripts, `@sap/xsodata` entries) use the location of the `.xsodata` service itself, e.g. '/odata/service.xsodata'.
- All application trace entries produced during job execution (entries from `.xsjs` scripts and the imported `.xsjslib` scripts) use the location of the `.xsjob` descriptor, e.g '/jobs/my-job.xsjob'.
- All application trace entries produced by `.xsjs` code (including the imported `.xsjslib` scripts) use the location of the `.xsjs` file itself, e.g. '/xsjs/service.xsjs'. The same applies to scripts referenced from `$.response.followUp`.

This allows easier change of the tracing level (only of the entry point - `.xsodata`, `.xsjob` or `.xsjs`) without doing so for every single script involved in the execution or by using wildcards. The trace message can be used to find the source line that has produced it.

**Note:** Regarding request-ids for jobs: the run-id received from the jobscheduler is used as the request-id instead of an auto-generated one.

## Troubleshooting

This package uses `@sap/logging` package, so all of its features are available to control logging.
For example, to set all logging and tracing to the finest level, set `XS_APP_LOG_LEVEL` environment variable to `debug`.

If the application is deployed on XS Advanced On-Premise Runtime, you can change the log level without restarting the application.
For example, the following command will set all logging and tracing to the finest level.
```sh
xs set-logging-level <application-name> "*" debug
```
See the `@sap/logging` documentation for more information.

Some of the libraries used by this package employ other tracing mechanisms. For example, many use the popular [debug](https://www.npmjs.com/package/debug) package. This means that by setting `DEBUG` environment variable, you can enable additional traces. Set it to `*` to enable all of them, but be careful as the output may be overwhelming.

In addition, internal Node.js traces can be enabled via the `NODE_DEBUG` environment variable.

**Warning:** Enabling some of these options may trace security sensitive data, so use with caution.

## Differences with SAP HANA XS Classic

See the differences [here](differences.md).
<br/>
