# @sap/faas
Provides the SAP Cloud Platform Functions runtime for Node.js and basic SDK features.

## Table of contents
* [Overview](#overview)
* [Package](#package)
* [Install](#install)
* [Service Instances](#service-instances)
* [Naming Rules](#naming-rules)
* [Function Projects](#function-projects)
  * [Project Attributes](#project-attributes)
  * [Secrets and Config Maps](#secrets-and-config-maps)
  * [Service References](#service-references)
  * [Functions](#functions)
* [Function Triggers](#function-triggers)
  * [HTTP](#http-trigger)
  * [Timer](#timer-trigger)
  * [AMQP](#amqp-trigger)
  * [CloudEvents](#cloudevents-trigger)
* [Function Runtime API](#function-runtime-api)
  * [Global Variables](#global-variables)
  * [Handler Exceptions](#handler-exceptions)
  * [Handler Parameter: event](#handler-parameter-event)
  * [Handler Parameter: context](#handler-parameter-context)
* [Function Test](#function-test)
* [Function Debugging](#function-debugging)
* [Function Unit Test](#function-unit-tests)

## Overview

SAP Cloud Platform Functions are provided as a service (__FaaS__).
Developers can focus on pure application logic while writing the code,
whereas FaaS takes responsibility to run the code in a secure, reliable and cost-efficient way.

Technically, FaaS runs on Kubernetes (__K8s__).
Artifact deployments are managed using a service API, also running in K8s, next to the runtime of course.
The overall architecture would allow integration of different serverless runtimes. However, currently K8s is used.

In Cloud Foundry (__CF__) service `xsf-runtime` (Extension Factory, serverless runtime) is used as entry point.
Each service instance represents a K8s namespace in a shared cluster.
All artifacts deployed to a given service will end up as resource in the corresponding namespace.
K8s namespaces (Faas tenants) are strictly isolated from each other.

Function development is based on projects, using file `faas.json` as manifest.
Any local IDE as well as WebIDE (Wing) can be used for implementation.

## Package

This package comprises two functional parts.
First, it provides the function runtime for Node.js (version 8.11.3 or higher):
* runtime components as such
* http server to run (or debug) functions locally
* test runner to support function unit tests

Secondly, it offers basic SDK functionality by installing command ` faas-sdk`:
* check project consistency
* create and test deployment files (`values.yaml`)

The function code is provided with usual `js` files.
```javascript
'use strict';

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
module.exports = function(event, context) {
    const rval = context.getSecretValueJSON('my-secret-1', 'rv.json');
    return rval.Info.Success;
};
```

Different trigger types are supported to invoke functions under various conditions.
Secrets provide an appropriate storage for credentials. Config maps can be used in addition for any further settings.

## Install

There are two FaaS client tools, waiting to support local development:
* __faas-sdk__: supports the development phase, checks project consistency, runs functions locally in a similar environments like in __K8s__, enables unit test implementation
* __faas-cli__: used to manage artifact deployment into __K8s__, uses FaaS instances in the Cloud Foundry as entry point

Let's start:
* Install __Node.js__ (version 8.11.3 or higher):
  * Download from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
  * Install Node.js runtime
  * Test installation with `node -v` and `npm -v`
* Add __SAP NPM Registry__ to your npm configuration for all `@sap` scoped modules.
  * Run `npm config set "@sap:registry=https://npm.sap.com"`
  * Test installation with `npm show @sap/faas version`
* Install __faas-sdk__:
  * Run ```npm install @sap/faas -g```
  * Test installation with `faas-sdk version`
* Install __faas-cli__:
  * Go to [https://tools.hana.ondemand.com/#cloud](https://tools.hana.ondemand.com/#cloud)
  * Search for "SAP Cloud Platform Functions Tools"
  * Install one binary, test via `faas-cli version`
* Install __Cloud Foundry CLI__:
  * Download latest release: [https://github.com/cloudfoundry/cli/releases](https://github.com/cloudfoundry/cli/releases)
  * Install binaries, test via `cf version`

Update the local IDE of your choice and install plugins for Node.js.
Finally, enable language support for Node.js and JavaScript (ECMAScript 6):
You may also find these links helpful: [Javascript Reference](https://developer.mozilla.org/bm/docs/Web/JavaScript) and [NodeJS Reference](https://nodejs.org/en/docs/)

The natural home of a FaaS project is a git repository.
Based on that you can later easily switch between local IDE and SAP Web IDE.
In the long term FaaS runtime may also support knative builds, fetching project files directly from git.
Hence, we recommend to set up a git repository for your project from the beginning.

## Naming Rules
All runtime artifacts need a name that matches the following constraints:
* Only lower case characters `[a-z]` and numbers `[0-9]` and `-` can be used.
* Separator `-` must not appear at the begin or the end of the name.
* Maximum length is restricted to 60 characters.

This applies to:
* secrets
* config maps
* service references
* functions
* triggers
* project names and
* project version identifiers

Secret and config map __keys__ (names of its entries) are usually based on file names.
That's why it may contain `.` as well, but not at the beginning or the end.

## Function Projects
We recommend using FaaS projects, as this simplifies development tasks.
Each project is defined with just one file, called `faas.json`.
Usually, it will reside next to a `package.json` file.

A first project can easily be created with an empty folder and the following command:
```bash
faas-sdk init -p ./my-test
```
It will create a simple project with one function, one secret, one http trigger and simple unit tests.
After `npm install` all unit tests, local test run and __K8s__ deployment will work immediately.
Continue with renaming artifacts and modifying the function code.

A first example defines one single function `build-qrcode`.
The source code is provided with file `.\lib\iso-time.js`.
And the `HTTP` trigger `build-qrcode` will invoke the function.
```json
{
  "project": "qrcode-producer",
  "version": "0.0.1",

  "runtime": "nodejs8",
  "library": "./lib",

  "functions": {
    "build-qrcode": {
      "module": "iso-time.js"
    }
  },

  "triggers": {
    "build-qrcode": {
      "type": "HTTP",
      "function": "build-qrcode"
    }
  }
}
```

A second example shows one project defining two functions, both implemented in the same module file.
In this case the module file `main.js` exports two function handlers `f1` and `f2`.
```json
{
  "project": "chain",
  "version": "0.0.1",

  "runtime": "nodejs8",
  "library": "./lib",

  "functions": {
    "chain-func1": {
      "module": "main.js",
      "handler": "f1"
    },
    "chain-func2": {
      "module": "main.js",
      "handler": "f2"
    }
  },

  "triggers": {
    "chain-simple": {
      "type": "HTTP",
      "function": "chain-func1"
    }
  }
}
```
### Project Attributes
At the top level of `faas.json` the following fields can be defined:
* __`project`__: used as label for all runtime artifacts (see restrictions to [naming rules](#naming-rules))
* __`version`__: used as label for all runtime artifacts (see restrictions to [naming rules](#naming-rules))

Specific to the runtime:
* __`runtime`__: used to select the runtime, currently only `nodejs8` is supported
* __`library`__: base directory for all source code file references, just to reduce redundancy

Runtime artifacts:
* __`secrets`__: collection of secrets, used to store credentials, api keys and the like
* __`configs`__: collection of config maps, used for less critical, configuration-like settings, that shall not be hard-coded
* __`functions`__: collection of functions that this project defines
* __`triggers`__: collection of triggers, different types with individual settings

Each runtime artifact collection uses the [object name](#object-names) as json key field.
The name must be unique per artifact type in the scope of one __K8s__ namespace (that is, service instance).

For example:
* Multiple namespaces may define their own secret `test1`.
* In one namespace there might be a function `test1` and a secret `test1` in parallel.
* However, there will be only one secret `test1` in one namespace at a time, even if two different projects are used to deploy it.

No assumptions are made regarding the separation of projects.
In particular, __FaaS__ runtime will __not__ prevent multiple projects from deploying any artifacts concurrently.

### Secrets and Config Maps
Technically, secrets and config maps share the same structure.
A local directory containing one or more files is used for declaration.
All files together must not exceed a total size of 1Mb.
```json
{
  "project": "example",
  "version": "0.0.1",

  "runtime": "nodejs8",
  "library": "./lib",

  "secrets": {
    "sec1": {
      "source" : "./data/sec1"
    }
  },

  "configs": {
    "cfg1": {
      "source" : "./data/cfg1"
    }
  }
}
```
In addition to the unique object name, for example, `sec1` or `cfg1`, only one attribute is required:
* __`source`__: relative path to the data directory

The data directory and its contained files define the data model and default values.
As the files will most likely show up in a git repository you may wish to see placeholder values first, later replaced (dynamically) by valid credentials, for instance.

Both tools, `faas-sdk` and `faas-cli`, support a simple mechanism for that: a deployment file with a predefined structure.
Take this as an example:
```yaml
secret-values:
  sec1:
    rv.json:
      Info:
        Success: Demo
        Failure: Todo
      Code:
        Success: A
        Failure: X
    text: Nice Test!
```
Here, values are defined for secret `sec1`, and its two files `rv.json` and `text`.
For `json` or `yaml` files also single object attributes inside the file can be replaced. Arrays are handled as one value only.
In the case of other files e.g. text or binary data, the whole file content can be replaced.

To initialize such a deployment file based on specific secret definitions run inside the project:
```bash
faas-sdk init-values -y values.yaml
```
The command will search `faas.json` starting from the current working directory.
Once found it will add the content of secret and config map files to the deployment file `values.yaml`.
As no directory is specified it will be stored in folder `deploy` (to be ignored by git) next to `faas.json`.

After adjusting the deployment file content you can start a local test run:
```bash
faas-sdk run -y values.yaml
```

And for cloud deployment it can be used as well:
```bash
faas-cli project deploy -y ./deploy/values.yaml -s my-cf-service -k my-cf-service-key
```

These deployment files can also be used to define mock data for [function unit tests](#function-unit-tests).

### Service References

Besides the option to use secrets there is a more simple way to provide credentials of SAP CP platform services to functions or triggers.
First, you can use the command line tool to transfer service keys to a secure store in the faas runtime:
* Run ```cf login```
* Run ```faas-cli login```
* Run ```faas-cli service register -s <service-name> -b <service-key>```

To list all registered services (for your faas tenant, means service instance):
* Run ```faas-cli service list```

Then you can define in your project a service reference, for example to an enterprise messaging instance:
```json
{
  "services": {
    "my-ems": {
      "type": "enterprise-messaging",
      "instance": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "key": "xxx"
    }
  }
}
```
Finally, use the alias `my-ems` inside `faas.json` at trigger definitions and/or within function code.
The specific values of the reference can be provided with deploy values as well.

### Functions
Let's start with an example again:
```json
{
  "project": "example",
  "version": "0.0.1",

  "runtime": "nodejs8",
  "library": "./lib",

  "functions": {
    "my-new-fnc": {
      "module" : "index.js",
      "handler": "",
      "secrets": [ "sec-xbem", "sec-ebaas" ],
      "configs": [],
      "timeout": 180,
      "maxBody": "1MiB"
    }
  }
}
```
In addition to the unique object name `my-new-fnc` the following attributes can be provided:
* __`module`__: source code file that exports the function handler (it may require other files of course)
* __`handler`__: only needed if `module.exports` appears as an object where handler can be found as attribute
* __`httpApi`__: indicates whether or not HTTP request and response are required by the function handler
* __`secrets`__: array of secrets used by the function
* __`configs`__: array of config maps used by the function
* __`timeout`__: seconds the function can run, minimum between 10 and 180 seconds
* __`maxBody`__: limit for body size (payload) of incoming requests provided to the function, default `1MiB`

The function handler may require built-in modules, further local module files or external packages.
External dependencies (or devDependencies, for example for unit testing) are defined as usual in `package.json`.

An important entry in devDependencies is `@sap/faas`.
It allows the implementation of function unit tests.
Furthermore, it offers type definitions that your local IDE may use for code proposals.
```json
{
  "dependencies": {
  },
  "devDependencies": {
    "@sap/faas": ">=0.7.6"
  }
}
```

The function handler in file `ìndex.js` may look like this:
```javascript
'use strict';

/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>|*}
 */
module.exports = function(event, context) {
    const rval = context.getSecretValueJSON('sec1', 'rv.json');
    return rval.Info.Success;
};
```
Please note how jsdoc annotations are used to declare the types.
With that IDE shall support you in finding methods and attributes of `event` and `context` while typing.

## Function Triggers
Functions are invoked by triggers.
A single function may be referenced by multiple trigger instances of different types.
In principle a single trigger may also invoke different functions, e.g. an AMQP trigger with multiple rules.

The following types are supported:
* HTTP
* Timer
* AMQP
* CloudEvents

A first example shows how triggers are defined in principle within `faas.json`:
```json
{
  "project": "example",
  "version": "0.0.1",

  "runtime": "nodejs8",
  "library": "./lib",

  "functions": {
    "my-new-fnc": {
      "module" : "index.js"
    }
  },

  "triggers": {
    "demo": {
      "type": "HTTP",
      "function": "my-fnc-01"
    },
    "job1": {
      "type": "Timer",
      "schedule": "0/15 * * * *",
      "function": "my-fnc-02"
    }
  }

}
```
Trigger `demo` will provide an HTTP endpoint.
For each received HTTP request the function `my-fnc-01` will be invoked.
In parallel trigger `job1` will call function `my-fnc-02` each quarter of an hour.

### HTTP Trigger

For each trigger instance an external `HTTP` endpoint will be created.
Each incoming request will be forwarded to the function, except those for method 'OPTIONS'.
The result of the function will be returned as response.

__Attributes__:
* __`function`__: the function to call

__Example__:
```json
{
  
  "triggers": {
    "demo": {
      "type": "HTTP",
      "function": "my-new-fnc"
    }
  }
  
}
```

Be aware that the endpoint is public visible.
So far authentication/authorization has to be handled by the function code.
It is planned to support automated oauth token validation in future.

### Timer Trigger

A single `Timer` trigger defines a schedule, optionally with timezone to call a selected function.
Different schedule formats are supported:

* simple duration
  - every 1 minute and 30 seconds: `1m30s`,
  - every 15 seconds `15s`,
  - every 1 hour 30 minutes and 15 seconds: `1h30m15s`

* cron expression, [spec conform](https://en.wikipedia.org/wiki/Cron), 5 fields
  ```
  ┌───────────── minute (0 - 59)
  │ ┌───────────── hour (0 - 23)
  │ │ ┌───────────── day of the month (1 - 31)
  │ │ │ ┌───────────── month (1 - 12)
  │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday; 7 is also Sunday on some systems)
  │ │ │ │ │

  * * * * *
  ```

* cron expression, additional field for seconds, 6 fields
  ```
  ┌───────────── second (0 - 59)
  │ ┌───────────── minute (0 - 59)
  │ │ ┌───────────── hour (0 - 23)
  │ │ │ ┌───────────── day of the month (1 - 31)
  │ │ │ │ ┌───────────── month (1 - 12)
  │ │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday; 7 is also Sunday on some systems)
  │ │ │ │ │ │

  * * * * * *
  ```

Together with cron expressions also a timezone can be of importance, typically when scheduling for hours.
Valid timezone values follow [Iana timezone database](https://www.iana.org/time-zones).

__Attributes__:
* __`schedule`__: duration or cron expression, which defines the execution interval
* __`timezone`__: optional, timezone
* __`function`__: the function to call

__Examples for schedule and timezone__:

| schedule | timezone | execution |
|---|---|---|
|`30s`            |             | every 30 seconds, start immediately, 10:15:12, 10:15:42, 10:16:12 ... |
|`1h30m`          |             | every one and a half hour, 10:12:10, 11:42:10, 13:12:10, 14:42:10 ... |
|`0 * * * *`      |             | each full hour                                                        |
|`0/15 * * * *`   |             | each quarter of an hour                                               |
|`0/15 * * * * *` |             | each 15 seconds, 10:00:00, 10:00:15, 10:00:30, 10:00:45, 10:01:00 ... |
|`30 4 * * *`     |Asia/Tokyo   | each day 04:30, Tokyo time                                            |
|`15 8 * * *`     |Europe/Berlin| each day 08:15, Berlin time                                           |
|`20-24/2 * * * *`|             | each hour the 20th, 22nd and 24th minute                              |

The minimum interval of a timer is 1 second, runtime will either round up or raise an error if syntax is wrong.
If a function call takes longer than the scheduled interval, the timer will skip those calls and log this accordingly.
If a function can not be reached, the timer will repeat to try this a defined number of times with a growing delay.

Updates to timer definitions may require a timer restart, which may be of importance when scheduling hours or longer intervals.
For example, if you define a timer schedule of `1h` and change the timer 5 minutes before execution to `1h30m` you will have to wait full `1h30m` for the next call.

A timer is restarted if `schedule` or `timezone` change, otherwise it is only updated, keeping the calculated point in time for the next execution.

### AMQP Trigger

This trigger type invokes functions as message consumers.
As long business events are transported via messages the trigger can also be seen as a business event trigger.

Depending on rules functions are selected based on message properties.
The function results can optionally be sent as new messages.
If the function execution fails the corresponding message can also be forwarded to an error topic.

Technically the trigger behaves like an [AMQP 1.0](https://www.amqp.org/resources/specifications) client.
It will connect to any peer either via WebSocket (with or without OAuth credentials flow) or via plain TCP, most likely using SASL credentials. 
Usually, the peer will be a message broker like Enterprise Messaging provides it for example.

__Attributes__:
* __`service`__: a service alias, it must be defined in the same project
* __`secret`__: a secret that provides credentials to connect if no service reference is provided
* __`config`__: a config map that provides the amqp link settings and binding rules

Usually, the secret can be re-used by multiple triggers as it provides just connection data for a messaging broker.
The config map will be trigger specific, providing link settings (to address queues or topics) as well as binding rules.

__Secret Entries__:
* `dial` or `dial.json`: destination data like host, port, use of websocket or not, oauth credentials if needed
* `sasl` or `sasl.json`: SASL mechanism (ANONYMOUS, PLAIN), corresponding parameters if plain TCP connections are used

__Config Entries__:
* `amqp` or `amqp.json`: definition of AMQP links and sessions to use, addresses, settle modes and so on 
* `bind` or `bind.json`: rules to select functions based on message properties and to specify result and error handling

It will be important to use a deployment file (values.yaml) to provide real credentials and settings for a specific deployment.
Those data must not be stored in the secret and config defintion fields directly, as you probably will not wish to see it on git.

### CloudEvents Trigger

This trigger allows you to subscribe CloudEvents and to define a rule-based function invocation.
It works similar to an AMQP trigger, but does not require secret or config map.
Instead it is completely defined within `faas.json`.
Furthermore, it will configure the messaging service automatically with the project deployment.

```json
{
  "functions": {
    "ce-coffee-handler": {
      "module": "index.js",
      "services": []
    }
  },
  "triggers": {
    "my-ce": {
      "type": "CloudEvents",
      "service": "my-ems",
      "rules": [
        {
          "ce-source": "",
          "ce-type": "com.sap.coffee.required",
          "function": "ce-coffee-handler",
          "failure": "accept"
        },
        {
          "ce-source": "",
          "ce-type": "com.sap.coffee.produced",
          "function": "ce-coffee-handler",
          "failure": "accept"
        },
        {
          "ce-source": "",
          "ce-type": "com.sap.coffee.consumed",
          "function": "ce-coffee-handler",
          "failure": "accept"
        }
      ]
    }
  }
}
```
While deployment the referenced messaging service will be called to create a queue and topic subscriptions according to the given rules.
For one single message only one single rule is applied, the first that matches.
Currently SAP Enterprise Messaging is supported. The list may be extended according to development requests you raise.

## Function Runtime API
The function handler is implemented as usual (anonymous) function, receiving two parameters: `event` and `context`.
It may return a simple value directly or a `Promise` to handle asynchronous execution.
As a consequence, `async` and `await` may be used as well.

### Global Variables
Multiple calls may arrive in parallel in one Node.js instance.
Each call will be handled in a [sandbox](https://nodejs.org/docs/latest-v8.x/api/vm.html#vm_vm_runinnewcontext_code_sandbox_options).
This means global variables of the main file are never shared and never reused.

However, the sandbox does not cover globals of any dependent file.
Hence, global variables in required modules must be handled with care if it cannot be avoided.
Valid examples for those globals could be:
* A cache for access tokens, not retrieved for each single call
* Protocol clients that manage a permanent network connection, e.g. to a message broker

Still, there is no guarantee that a Node.js instance is running for a certain time,
but in fact such a cache or reused client will be reused many times and will improve overall performance significantly.

### Handler Exceptions
The function code can throw an exception at any point in time to stop processing unexpected internal state.
In this case an HTTP caller for example will receive response status code 500 (internal server error) only.
Error details will be added to the function log.
`faas-cli` can be used to retrieve log entries.

### Handler Parameter: __event__
Provides attributes and methods related to a single function invocation.

__Attributes__:
* __`auth`__: authorization data
  * __`type`__: first part of HTTP authorization header, e.g. `Basic`, `Bearer`, ..: 
  * __`credentials`__: plain data corresponding to `type`
* __`ce`__: [cloud event context attributes](https://github.com/cloudevents/spec/blob/v0.2/spec.md#context-attributes), only defined if available
  * __`specVersion`__: version of the CloudEvents specification which the event uses
  * __`source`__: event producer `"sap/app/01"`
  * __`type`__: event type, e.g. `"sap.common.alert"`
  * __`id`__: ID of the event
  * __`subject`__: subject of the event
  * __`time`__: timestamp of when the event happened
  * __`dataContentType`__: data encoding format
  * __`dataSchema`__: link to the schema that the data attribute adheres to
  * __`data`__: event payload, please note `event.ce.data` will always be equal to `event.data`
  * __`extensions`__: additional metadata not covered by the specification
* __`data`__: payload data (HTTP body) related to invocation, depending on the received content type, either `string`, `Buffer` or `Object`, data can always be found here, with or without cloud event.
* __`http`__: only defined if explicitly requested, provides access to HTTP `request` and `response` if available

__Methods__:
* __`decodeJsonWebToken():{ header: object, payload: object, signature: string }`__:
Decodes event credentials as JSON WebToken (JWT).
Returns `null` if the mechanism is not 'Bearer' or if the token has no valid JWT structure.
Does not validate the token signature, as this has been done by the calling trigger already.
The token itself is provided in field `event.auth.credentials`.
* __`decodeUserPassword():{ user: string, password: string }`__:
Decodes event credentials as basic authentication data.
Returns `null` if the mechanism is not 'Basic' or if the credentials do not match the expected structure.
Does not validate the credentials against any provider, as this will be function logic already.
* __`setBadRequest()`__:
Sets the event status to `bad request`.
Event will not be processed, handler may still add data to the response, for example as hint. 
In contrast, throwing any error would be treated as internal error.
* __`setUnauthorized()`__:
Sets the event status to `unauthorized`.
Event will not be processed, handler may still add data to the response, for example as hint.
In contrast, throwing any error would be treated as internal error.
* __`getContentType():string`__:
Provides the received content type.
In the case of cloud events it will be taken from the event itself.
Data are provided accordingly, this means as object in case of `json`-format or as string or Buffer otherwise.
* __`setResponseType(string)`__:
Defines the response content type explicitly.
Otherwise callers' accepted types will be compared with the return data type and best matches will be used.
Fallback strategy is based on the returned data type only.
* __`getResponseStream(contentType):WritableStream`__:
The response content type is defined and the corresponding stream is returned.
It is possible to write data directly to the stream or to pipe data from other streams.
The function handler shall return a `Promise` to the runtime to indicate the asynchronous end of processing.
* __`sendResponseEvent(ce)`__:
The cloud event is returned as result of function execution.
Http-Triggers would return it to the caller.
AMQP or CE trigger can send the event, depending on its configuration. Source will be adjusted.

If the function returns a simple value without defining the content type, a matching response content type will be selected automatically.
And if the client was sending an HTTP request with `Accept` header this will also be taken into account.

### Handler Parameter: __context__
Provides attributes and methods related to the current process.

__Attributes__:
* __`funcName`__: function name
* __`timeoutMS`__: milliseconds that the function is allowed to run

__Methods__: (runtime nodejs8 provides the same methods, but __not__ async)
* __`async getServiceCredentials(faas-json-alias)`__: provides service credentials as binary data (Buffer)`
* __`async getServiceCredentialsString(faas-json-alias)`__: provides service credentials as text`
* __`async getServiceCredentialsJSON(faas-json-alias)`__: provides service credentials as parsed JSON data`
* __`async getSecretValueStream(name, key)`__: provides secret value stream
* __`async getSecretValue(name, key)`__: provides secret value as binary data (Buffer)
* __`async getSecretValueString(name, key)`__: provides secret value as text
* __`async getSecretValueJSON(name, key)`__: provides secret value as parsed JSON data
* __`async getSecretValueYAML(name, key)`__: provides secret value as parsed YAML data
* __`async getConfigValueStream(name, key)`__: provides config value stream
* __`async getConfigValue(name, key)`__: provides config value as binary data (Buffer)
* __`async getConfigValueString(name, key)`__: provides config value as text
* __`async getConfigValueJSON(name, key)`__: provides config value as parsed JSON data
* __`async getConfigValueYAML(name, key)`__: provides config value as parsed YAML data
* __`async callFunction(name, content): response`__:
Calls another function by `name` within the same __K8s__ namespace,
`content.data` provides the request payload, `content.type` the request content type.
`response.data` contains the received payload, `response.type` the received content type.
Special handling with runtime `nodejs8`: the method accepts a JsCallback as third parameter or returns a promise otherwise.
* __`getFunctionEndpoint(name):string`__: Only available with enabled HTTP API,
expects a function name (inside the same __K8s__ namespace) and returns the corresponding HTTP endpoint.

The object is reused for all function calls within the current Node.js instance,
but attributes must not be changed.

## Function Test
The following command runs all functions of a project locally:
```bash
faas-sdk run -r 7777 -y values.yaml
```
It will search `faas.json` starting from the current working directory.
After reading all declarations one HTTP server starts listening at the given port.
The URL for each function is printed to the console.

Each function will find the same environment like in the cloud later on.
Use any HTTP client or just a Web browser to call it.

## Function Debugging
To debug function code in a local IDE, usually a debug configuration is needed:
* Install `@sap/faas` as devDependency.
* Create a debug configuration in your local IDE for Node.js.
* Use `./node_modules/@sap/faas/lib/cli.js` as file to execute.
* Use `run` as cli argument.
* Use this directory or just another underneath `faas.json` as working directory.
* Set break points and invoke a function via browser or HTTP client.

## Function Unit Tests
Finally, also unit tests for functions can be implemented. Here, `@sap/faas` provides a test method.
It will do the following:
* Start an HTTP server as described before.
* Execute the provided test callback.
* Shut down the server afterwards.

As entry point the same [`context`](#handler-parameter:-context) object is provided that functions see at runtime.
It allows to call functions and to read secret or config map values, at this point of course starting from the local files.
A deployment file can be provided to apply mock data.

The following example uses a well-known test framework, even if `@sap/faas` does not enforce its usage.
```javascript
/*jshint mocha:true*/
'use strict';

const assert = require('assert');
const faas = require('@sap/faas');

describe('hello secret example', () => {

//  ************************************************************************************************

    it('using default values', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                const result = await context.callFunction('hello-secret', {});
                assert.equal(result.type, 'text/plain; charset=utf-8');
                assert.equal(result.data, 'Demo');
            }
        );
    });

//  ************************************************************************************************

    it('using deploy values', (done) => {
        faas.test(done,
            {
                'deploy-values': '../mock/values.yaml'
            },
            async (context) => {
                const result = await context.callFunction('hello-secret', {});
                assert.equal(result.type, 'text/plain; charset=utf-8');
                assert.equal(result.data, 'Nice Test!');
            }
        );
    });

//  ************************************************************************************************

    it('read secret text', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                assert.equal(context.getSecretValueString('sec1', 'text'), 'Hello World!');
            }
        );
    });

//  ************************************************************************************************

    it('read secret json', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                assert.deepStrictEqual(context.getSecretValueJSON('sec1', 'rv.json'), {
                    "Info": {
                        "Success": "Demo",
                        "Failure": "Todo"
                    },
                    "Code": {
                        "Success": "A",
                        "Failure": "X"
                    }
                });
            }
        );
    });

//  ************************************************************************************************

});
```

