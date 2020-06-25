@sap/xsjs
===========

Compatibility layer for SAP HANA extended application services, classic model (SAP HANA XS Classic) applications to run on Node.js in SAP HANA extended application services, advanced model.

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
- [Differences with HANA XS Classic](#differences-with-hana-xs-classic)

<!-- tocstop -->

For the API of XS Engine
  * [SAP HANA XS JavaScript Reference](http://help.sap.com/hana/SAP_HANA_XS_JavaScript_API_Reference_en/)


## Usage
It is as simple as it could be.
```js
'use strict';

var xsenv = require('@sap/xsenv');
var xsjs = require('@sap/xsjs');

var port = process.env.PORT || 3000;
var options = xsenv.getServices({
    uaa: 'xsuaa',
    hana: 'hana-hdi',
    jobs: 'scheduler',
    mail: 'mail',
    secureStore: 'secureStore',
    auditLog: 'audit-log'
});
xsjs(options).listen(port);

console.log('Node XS server listening on port %d', port);
```

The starting function takes an object that contains service credentials and application options.

You will need to setup the Application Router for authentication.
For a step by step tutorial see *Use the XSJS Compatibility Layer in XS Advanced*
in *SAP HANA Developer Guide for SAP HANA XS Advanced Model*.

For local testing you can set `options.anonymous = true` to disable authentication.

### Options

Here is a list with options you can provide:

| property | default | usage |
| -------- | ------- | ----- |
| rootDir | 'lib' | xsjs files location |
| rootDirs |  | same as above, but array of directories can be provided, overrides rootDir if provided |
| uaa |  | UAA configuration necessary to enable JWT token authentication and business user propagation to HANA |
| [hana](#hana) |  | object containing HANA DB connection parameters, used for DB connectivity |
| [secureStore](#secureStore) |  | object containing HANA DB connection parameters, used for secure store connectivity |
| jobs |  | Job scheduler connection parameters used to register jobs during application startup and later for updating job execution status when job finished |
| [mail](#mail) |  | Mail options, used by $.net.Mail API |
| maxBodySize | '1mb' | Maximum body size accepted by xsjs. The value is passed to the [bytes library](https://www.npmjs.com/package/bytes) for parsing. |
| anonymous | false | Enable anonymous access, i.e. without credentials |
| [formData](#formdata) |  | Special restrictions over form-data submitted to server |
| [destinationProvider](#destinationProvider) |  | Custom function, synchronous or asynchronous, to be used when $.net.http.readDestination is called in XSJS code. For more information on destinations support, check the detailed description for this configuration option. |
| ca | certificates listed in `XS_CACERT_PATH` env var | Trusted SSL certificates for any outgoing HTTPS connections. Should be an array of loaded certificates. |
| compression | true | By default text resources over 1K are compressed. |
| [auditLog](#auditlog) |  | Object containing Audit log service credentials. If not provied audit logging will be disabled. If set to `{ logToConsole: true }` audit log messages will be written on the console (only suitable for non-productive setup, e.g. local development).|
| [context](#context) | {} | Extend the default context in xsjs scripts. |
| [libraryCache](#librarycache) | {} | Contains the xsjslibs that should be cached. |
| redirectUrl | | If specified, a redirect to this url is triggered when the root path is requested. **Note**: When xsjs is behind a reverse proxy (Application Router for instance), the value of this property should be aligned with the path rewriting rules that may apply. |
| xsApplicationUser | true | If set to false, the session variable `XS_APPLICATIONUSER` will not be set. |

**Note:** When there are several rootDirs (for example: repo1 and repo2) and their file strucutre is equivalent (/repo1/hello.xsjs and /repo2/hello.xsjs) the file from the first directory (as listed in the 'rootDirs' property) will be used (/repo1/hello.xsjs) and the file from the second directory (/repo2/hello.xsjs) will be ignored with a warning message in the logs.

SAP HANA XS Advanced applications connect to HANA with a fixed technical user provided via CloudFoundry service (environment variables). The actual (business) user of the application is retrieved from the JWT token and propagated to HANA.

The connection to Job scheduler service is done with a fixed technical user provided by the CloudFoundry service binding.


#### hana

| property | mandatory | usage |
| -------- | ----- | -------- |
| host | x | DB host |
| port | x | DB port |
| user | x | Technical user used for DB connection |
| password | x | Technical user password |
| schema |  | If provided will be set as current schema to DB connection |
| connectWithLoggedUser |  | Possible values are `true` / `false`, default is `false`. If provided the DB connection will be done with the SAML assertion contained in the JWT token of the logged user. **Note:** This option is provided only for HANA cockpit transition to SAP HANA XS Advanced. In general this option should be avoided. |
| sqlcc |  | Object containing all SQLCC configurations as properties with name after  SQLCC name used in XSJS code |
| ca |  | Trusted SSL certificates explicitly for HANA connection. Should be an array of loaded certificates. If not provided, certificate from service binding will be used. If none are available HANA connection will not be encrypted. |

- `sqlcc` - referring to the example above, SQLCC property can be initialized from the bound services like this:

```js
...
options.hana.sqlcc = xsenv.getServices({
  'com.sap.my.sqlcc_config': 'SQLCC__NAME',
  'com.sap.my.other_sqlcc_config': 'OTHER_SQLCC_UPS_NAME'
  });
...
```

and used later in xsjs code like:
```js
var connection = $.db.getConnection('com.sap.my.sqlcc_config');
```


#### secureStore

| property | mandatory | usage |
| -------- | ----- | -------- |
| host | x | DB host |
| port | x | DB port |
| user | x | Technical user used for DB connection |
| password | x | Technical user password |
| schema |  | If provided will be set as current schema to DB connection |



#### formData

object with following properties:

| property | default | usage |
| -------- | ------- | ----- |
| maxFilesSizeInBytes | `10485760` | It restricts the total size of all the uploaded files. |


#### mail

object with following properties:

| property | mandatory | usage |
| -------- | ----- | -------- |
| host | x | SMTP server host. |
| port | x | SMTP server port. |
| ignoreTLS |  | Could be `true` or `false`. This represents whether a STARTTLS command should be invoked if available by the mail server. Defaults to `false`. |
| secure |  | Could be `true` or `false`. This represents whether the connection should be over TLS/SSL. Defaults to `false`. |
| connectionTimeout |  | Connection timeout in ms. Defaults to 60000. |
| authMethod |  | Authentication method to use. Could be 'PLAIN' / 'LOGIN' / 'CRAM-MD5'. |
| auth |  | Authentication credentials. Example: {user: 'user', pass: 'pass'} The default is no authentication. |


#### destinationProvider

If your application requires different mechanism for destination configuration for example dynamic configuration changes or dynamically adding new destinations to your application, you can provide own function that retrieves these configurations from your storage.

For convenience we support synchronous and asynchronous destination provider function. Depending on the number of parameters your function has we call it synchronously or asynchronously.

Here are the signatures for both:

```js
function getDestinationSync(packagename, objectname, dtDescriptor) {
}

function getDestinationAsync(packagename, objectname, dtDescriptor, callback) {
}
```


| parameter | description |
| -------- | --------- |
| packagename | the package of the destination supplied to $.net.http.readDestination |
| objectname | the object name of the destination supplied to $.net.http.readDestination |
| dtDescriptor | object containing all properties contained in the corresponding .xshttpdest file, if such file is available, otherwise __undefined__ |
| callback | provided only in the asynchronous case - should be called by your provider function to return the destination or report error  |

#### auditLog

This package audit logs entries in the following cases:
- when the validation of the incoming JWT token fails
- when the token in the request used to trigger a job does not contain the required scope

Applications can also write audit log messages:

```js
var xsjs = require('@sap/xsjs');
var xsenv = require('@sap/xsenv');
var auditLogging = require('@sap/audit-logging');

var port = process.env.PORT || 3000;
var options = xsenv.getServices({ auditLog: 'audit-log', uaa: 'xsuaa', hana: 'hana-hdi' });

// Using Audit log REST API v2
auditLogging.v2(options.auditLog, function (err, auditLog) {
  if (err) {
    return console.log('Could not create audit log client:', err);
  }

  options.context = { auditLog: auditLog };
  xsjs(options).listen(port);
});
```

**Note**: Check in advance whether the Audit log service to be used supports REST API v2
(note the invocation of the `v2` method of `auditLogging`).
Otherwise instantiate a client object that works with Audit log REST API v1:

```js
// Using Audit log REST API v1
var auditLog = auditLogging(options.auditLog);
```

It is recommended to use Audit log REST API v2 if available.
Refer to the documentation of the _@sap/audit-logging_ package for more information.

The audit log client object can then be used as following:

```js
auditLog
  .securityMessage('Content of the message')
  .by($.session.getUsername())
  .sync.log();
```

**Note**: The usage of `sync` before `log` - this ensures that the call to the Audit log service is synchronous.

**Note**: `$.session.getUsername()` returns `undefined` in case `anonymous` mode is used. It is up to applications whether to use another string as user or not audit log at all.


#### context

This option can be used if you want to extend the xsjs scripts with additional global variables.

Example:

```js
var xsjs = require('@sap/xsjs');
var options = {
  anonymous: true,
  context: { answer: 42 }
};
xsjs(options).listen(3000);
```

This configuration extends the context of xsjs scripts with one additional variable called `answer`.
Every time an xsjs script is executed it will not only have the `$` variable in it's context, but it will also include variable `answer` with value `42`.

Lets have a file `answer.xsjs` with the following content:
```js
$.response.setBody(answer);
```
A request to `http://<your_domain>:3000/answer.xsjs` will respond with `42`.

With the `context` property set, you can expose Node.js packages and variables:
```js
var options = {
  anonymous: true,
  context: { environment: process.env, _: require('lodash') }
};
```

Currently we are aware of a limitation, which causes `<variable> instanceof <constructor_function>` used in a xsjs script to have odd behaviour.
Also stubbing or mocking constructor functions such as `Date`, `String`, etc in a xsjs script won't affect other xsjs files.

The `context` property also finds usage in a workaround for this limitations. Setting:
```js
var options = {
  anonymous: true,
  context: { Array: Array, String: String }
};
```
will fix these problems, but has side effects:

* Creating an array in xsjs script and checking it's instance will now return false:
```js
  var myArray = [1, 2, 3];
  $.response.setBody(myArray instanceof Array); // Responds with false
```
* Monkey-patching built-in types won't work as expected, if they are exposed through the `context` property:
```js
  String.prototype.contains = function(str) { return this.indexOf(str) >= 0; };
  var stringLiteral = 'Abc';
  var stringObject = new String('Abc');
  console.log(stringLiteral.contains); // undefined
  console.log(stringObject.contains); // [Function]
```
Since there might be other side effects, **use this feature at your own risk.**

#### libraryCache

An object that contains the xsjslibs that will be cached. Example:

```js
{
  'my.libs.utility': 'global'
}
```

In XSJS code the import looks like:

```js
var utility = $.import('my.libs', 'utility');
```

**Note:** it is recommended to use this feature only when necessary because keeps the cached content until the application is running.
It might have side effects in case the xsjslib keeps state. It also leads to extensive memory consumption and this should be considered while calculating application memory limits.

#### Multitenant usage

In multitenant scenarios, the `hana` and `secureStore` properties can contain an object with the credentials of a _managed-hana_ (Instance Manager) service (created with the appropriate service plan)
instead of the credentials of a _hana_ service. In this case the application will connect to a HANA system depending on the tenant (identity zone) of the incoming request.
A managed service instance for the particular tenant should be created in advance and the corresponding database artefacts should be deployed prior to requesting the application with this tenant.
Otherwise the processing of the request will be terminated with an error.

**Note**: Currently jobs are not multitenant-aware. Jobs are shared between tenants and a connection to a HANA database cannot be established.
A job executing xsjs code can still connect to a specific HANA service instance using SQLCC configuration.

## OData support

OData support is provided by OData package @sap/xsodata. Details on what features are provided can be found in the project itself. The compatibility layer scans for .xsodata files in the specified source directory and registers OData endpoints for each valid descriptor. Both JavaScript and SQL script exits are supported.

### Clear OData model cache

For each OData service the model is loaded and cached in memory upon first request.
In case the schema of the underlying db objects is changed at runtime, it is necessary to reload the model. Here is an example:
```js
var app = xsjs(options);

function onSchemaChange(tenant) {
  app.clearODataCache(tenant);
}
```
`clearODataCache(tenant)` clears the OData model cache for the given tenant.
`tenant` argument is optional. If not provided, the cache for all tenants will be cleared.

**Note:** Each application instance contains a cache of OData models. Clearing the cache in one of those instances does not automatically trigger cache invalidation in the others. The application itself is responsible for calling `clearODataCache` in each instance. Since an HTTP request is received only by a single instance, it cannot be used to trigger clearing the cache in a consistent manner for the whole application. Other solutions, like messaging, are more suitable for that purpose.

## NPM packages support
As an extension in the dollar API we included support for all the available NPM packages. <br />
For example, in your xsjs file you can add the following code:

```js
var _ = $.require('underscore');
// Count to ten
var count = '';
_.range(11).forEach(function(number) {
  count += number + ' ';
});
$.response.setBody(count);
```

__NOTE__: If you require an npm package that is asynchronous, you have to use the `sync` property to make it synchronous. See [fibrous](https://github.com/goodeggs/fibrous) package for details.

Let's take for example the [request](https://github.com/request/request/blob/master/request.js) module from npm. The standard Node.js approach for using the module will be:

```js
var request = $.require('request');
request('http://google.com', function(error, response) {
  if (error) {
    $.trace.error(error);
    return;
  }
  $.response.setBody(response.body);
});
```
This snippet won't work in a xsjs file. The right xsjs approach would be:

```js
var request = $.require('request');
try {
  var response = request.sync('http://google.com');
  $.response.setBody(response.body);
} catch(error) {
  $.trace.error(error.message);
}
```

You can also require a file relatively. The required file will execute in Node.js context. This means you will have access to global Node.js variables, such as `__dirname`, `process`, etc. in it.
For example, if we have a file called myAPI.js with content:

```js
// myAPI.js
module.exports = {
  getDirname: function() {
    return __dirname;
  }
};
```

Let's say myAPI.js is located in a parent directory for the following xsjs file:
```js
var myAPI = $.require('../myAPI.js');
$.response.setBody(myAPI.getDirname());
```

## Destinations support

#### Via user provided services
By default the compatibility layer supports destinations configuration via user provided services. The destination name (the repo resource id, e.g. package + '.' + xshttpdest name) is matched to service name.

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
Example usage in XSJS code:
```js
var destination = $.net.http.readDestination('foobar.httpdest', 'mydest');
```
If there is no service in VCAP_SERVICES with same name as the destination requested, an exception is thrown.

When destination is read the content of the design time descriptor is merged with the properties provided in the user provided service. Property values of the UP service override DT descriptor values.


#### Via custom provider function

If the default support is not enough for your use case, you can provide custom destination provider function. For details how to do that, see the __destinationProvider__ configuration option explained above.

## Accessing column values by index in *$.hdb.ResultSet* rows

Column values from within a row of a *$.hdb.ResultSet* in XS Classic can be accessed either by column name or by column index.
If an application does not make use of accessing columns by index, then this capability can be turned off which will result in
improved performance:

```js
var connection = $.hdb.getConnection({ enableColumnIndices: false });
```

## Tracing via *$.trace* API

Each trace entry is associated with a location. The entry point being accessed is used as a location:
- All application trace entries produced during OData handling (entries produced by exits and the imported `.xsjslib` scripts, _@sap/xsodata_ entries) use the location of the `.xsodata` service itself, e.g. '/odata/service.xsodata'.
- All application trace entries produced during job execution (entries from `.xsjs` scripts and the imported `.xsjslib`s) use the location of the `.xsjob` descriptor, e.g '/jobs/my-job.xsjob'.
- All application trace entries produced by `.xsjs` code (including the imported `.xsjslib` scripts) use the location of the `.xsjs` file itself, e.g. '/xsjs/service.xsjs'. The same applies to scripts referenced from `$.response.followUp`.

This allows easier changing of the tracing level (only of the entry point - a `.xsodata`, a `.xsjob` or a `.xsjs`) without doing so for every single script involved in the execution or by using wildcards. The trace message can be used to find the source line that has produced it.

**Note:** Regarding request-ids for jobs - the run-id received from the jobscheduler is used as the request-id instead of an auto-generated one.

## Troubleshooting

This package uses _@sap/logging_ package so all of its features are available to control logging.
For example to set all logging and tracing to finest level set `XS_APP_LOG_LEVEL` environment variable to `debug`.

If the application is deployed on XS Advanced On-premise Runtime, you can change the log level without restarting the application.
For example this command will set all logging and tracing to finest level.
```sh
xs set-logging-level <application-name> "*" debug
```
See @sap/logging documentation for details.

Some of the libraries used by this package employ other tracing mechanisms. For example many use the popular [debug](https://www.npmjs.com/package/debug) package. This means that by setting `DEBUG` environment variable, you can enable additional traces. Set it to `*` to enable all of them, but be careful as the output may be overwhelming.
In addition internal Node.js traces can be enabled via `NODE_DEBUG` environment variable. [This post](http://www.juliengilli.com/2013/05/26/Using-Node.js-NODE_DEBUG-for-fun-and-profit/) describes it in more detail.

**Warning:** Enabling some of these options may trace security sensitive data, so use with caution.

## Differences with HANA XS Classic

See the differences [here](differences.md).

<br/>
