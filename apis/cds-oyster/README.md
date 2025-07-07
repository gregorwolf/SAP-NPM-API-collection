# @sap/cds-oyster


## Disclaimer

This is an **alpha-preview** of a secure execution environment for tenant-specific code in the Node.js version of CAP.

This functionality is **experimental** and **not meant for productive use**! The sandbox environment is delivered for interested stakeholders to evaluate the scope, security, and performance to provide feedback and additional requirements for continued development.

### Latest Breaking Changes
In the alpha state, the event umbrella and hence the API to code against can be changed frequently, invalidating already deployed handlers with a new `npm install`. Please make sure to check this section, when extensions crash or expose unexpected behavior after each new install, since we to our best to list all incompatible changes here.

These constructs are now deprecated , and should be replaced by the respective alternatives as soon as possible:
- The old self-invoking function format `f(){...}()` is deprecated and replaced by `module.export`
- the internal API is being standardized to `this.*`, so please search and replace for all occurrences of `srv.*`
- after handlers are changed to standard signature `after(result, req)`. See the documented [after handlers](https://cap.cloud.sap/docs/node.js/core-services#srv-after-request).

## Prerequisites

### Oyster
The runtime component of [Oyster](https://www.npmjs.com/package/@sap/oyster-runtime) is needed for deployment of the application. The [Oyster SDK](https://www.npmjs.com/package/@sap/oyster-sdk-js) is only needed for local development and specific use cases, where developers want to provide a custom shell for the Code Sandbox (framework modifications). This dependency is managed for you by the plugin and should not be modified manually.

### CDS-OYSTER
Add the [@sap/cds-oyster](http://npmjs.com/package/@sap/cds-oyster) dependency to your project `package.json` of **both**, the Base Application **and** the MTX sidecar
```jsonc
"@sap/cds-oyster": "latest"
```

### Enabling the Sandbox
The minimal configuration to enable the sandbox is

```jsonc
"cds": {
    "requires": {...
      "code-extensibility": true
    }
}
```
The same switch can also be utilized within the extension project itself to test extensions locally before activation.


## About Sandboxed Extension Logic

Upon enabling the sandboxed extension feature, the runtime is extended with the additional capability to execute tenant-specific custom code securely. The custom code is written as plain JavaScript files, which are deployed as part of a standard CAP extension project.

![](assets/Extension%20Project%20Setup.png)

The developer experience is very similar to writing regular CAP event handlers, the only difference is that each event handler requires an individual file and has to follow a strict naming convention.
The deployment and execution of custom logic require the new MTX-S component and applies to multi-tenant applications.

## Limitations

To ensure secure handling, the sandbox environment is decoupled from the runtime through a limited API, and the code is scanned before deployment/activation for potentially harmful or resource-consuming constructs. Limits to memory consumption, execution time, query result size and coding constructs apply.
In addition, code scanning is **always** applied upon activation and checks for the following constructs

| What                | Description                                                                                                                                                                             | Mitigation                                                                                                                                                                        |
|:--------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Globals             | The globals Object, Reflect, Symbol, Proxy, global, globalThis cannot be accessed within the sandbox. Any usage will be rejected at deployment time                                     | Extension Developers need to simply live with this limitation                                                                                                                     |
| Require             | Is it not possible to require any library beyond the limited API provided to the sandbox                                                                                                |                                                                                                                                                                                   |
| Console             | The console object is available locally in development mode (CDS watch), but extensions cannot be deployed to MTX using it                                                              | Remove all console statements before activating custom code                                                                                                                       |
| Object properties   | access to `prototype` or `__proto__` is also completely prohibited                                                                                                                      |                                                                                                                                                                                   |
| Asynchronous calls  | `await` is prohibited generally - except for the data access API (QL) as well as `this.send` and `this.emit` where it is actually required           | We have yet to see a valid use case for asynchronous calls within the sandbox when I/O is generally disallowed. Helper functions and system libraries can be called synchronously |
| Throw Statement     | No errors can be thrown within the sandbox                                                                                                                                              | Either call `req.reject` or call `req.error`                                                                                        |
| Generator Functions | Generator functions and `yield` are error prone, a frequent cause of memory leaks and should serve no useful purpose in the sandbox                                                  |                                                                                                                                                                                   |
| Debugger Statement  | In local single-tenancy mode, debugging the sandbox is allowed and supported through the `debug` mode. When deploying to a multi-tenant application, debugger statements are prohibited | Remove all debugger statements before activating custom code                                                                                                                      |


## Enabling the Sandbox

After adding the [CDS Plugin](#cds-oyster), the following switch in the application configuration in `package.json` will enable the code sandbox in the project:


```jsonc
"cds": {
    "requires": {
      "code-extensibility": {
        "runtime": "oyster",
        "maxTime": 1000,
        "maxMemory": 4
      },
  ...          
```
The possiblle parameters are all optional and follow the following specification

| Parameter | Explanation |
|---------|-------|
| runtime | `oyster` is the default runtime and must be used for deployment. <br>`debug` allows local debugging within local extension projects only|
| maxTime| in milliseconds |
| maxMemory | in megabytes|

The same switch can also be utilized within the extension project itself to test extensions locally before activation.

## Create a custom Event Handler

In an existing extension project (see here for a [jumpstart tutorial](https://github.com/cap-js/extensibility-sample)), code extensions can be created within the SRV folder following a strict naming convention, with the service name as top level folder and service entity name as second level folder. The filename *must* follow the format of `WHEN-dash-WHAT.js`. If you are following the jumpstart tutorial, a valid file would be `srv/ProcessorService/Incidents/after-READ.js`.
Every event handler should follow the same pattern of exporting exactly one callable async function to the outside world. The easiest method is to use `module.exports`

```js
async function doSomething(req) {
    // your code here
}
module.exports = doSomething
```

or

```js
module.exports = async function doSomething(req) {
    // your code here
}
```

Note that creating a self-invoking function using the pattern

```js
;(async function () {
  // your code here
})()
```
doesn't work anymore.


For the Incidents entity, a valid after read event handler would look like this:

```js
module.exports = async function modifyComponent(req) {
    req.results.forEach(
      row => row.component = " Custom Handler here"
    )
  }
```

Note the first line of the event handler. The `req` object represents a subset of the request in CAP. It should look like, and behave the same as normal CAP application level handlers, but without any callable functions.

## Event Handler Scope

Developers can create custom logic for (Planned events in `{brackets}`):

| When   | What                                    | Useful Scope                                    | Example Usage                                                                                                                                                                                             |
|:-------|:----------------------------------------|:------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Before | Create, Update, Delete `{Read, Upsert}` | Request Payload `req.data`                      | Manipulate `req.data` with e.g custom calculations. Validate input against constraints and reject requests                                                                                                |
| After  | Read `{Create, Update, Delete, Upsert}` | Response `req.results`                          | Manipulate `req.results`in read handlers to display calculated fields, but also asynchronously trigger events after any operation. Note, the DB transaction of the event in question has already finished. QL requests will be executed within a new transaction |
| On     | Event                                   | Inbound Interface `req.data`                    | Custom coding will run within the context of the calling transaction, so this one is useful to enable BADI-like extension points                                                                           |
| On     | Bound/Unbound Action and Function       | Inbound Interface `req.data`, Response `return` | This option can also be used well for BADI-like extension points. Application developers can provide action definitions without an implementation and invoke them as needed                               |

It is planned to also support draft events in a subsequent version, but for now, all event handlers will be triggered **after** the draft workflow only.

Sandboxed code is executed within the CAP event loop coexisting with other generic or application-specific event handlers, and it is not guaranteed that it runs at a specific point in time. If application developers want to ensure a specific execution order, they should consider only a BADI-like approach.

![](assets/Runtime%20Hooks.png)

## The Sandbox API
The available API within custom handlers is limited to a subset of the `req` object and contains

```js
subject: req.subject,
data: req.data,
target: req.target,
results: req.results,
errors: req.errors,
messages: req.messages
```

and the ability to call the `req.error(...)` and `req.reject(...)` methods.
The `req` object is available to the extension developer as the handler parameter and doesn't need a require statement or initialization. Throwing errors within custom code is not possible. Unhandled exceptions are propagated to the outer shell of the sandbox and handled generically without a meaningful semantic error message.
Instead, developers should either call the `req.reject(...)` method or call the `req.error(...)` method. Developers are free to manipulate the `req.data` and `req.results` arrays but should be aware that adding attributes beyond the application model will be ignored by the framework and won't appear in subsequent processing. As per the table above, while the full `req` object is always inherently defined, manipulating data within only makes sense to the specific context. A `before UPDATE` handler has an undefined results array, so whatever the sandboxed code does to it, will be overwritten by subsequent processing of the CAP framework.

In addition, developers can asynchronously call `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `UPSERT` on **service** level with authorization enforced on request-user level. Calls to database entities will be rejected with an error message. Alternatively one can use direct service calls like `this.read` or `this.update`. Finally unbound actions of the service can be called like `this.someAction(data:{object})`.

### Reading data

A more complex example would be to display the customer's e-mail directly in the  Incidents list. We also want to display a useful default for the component if there is no one selected yet. You need to extend the data model first with

```cds
extend Incidents with {
  virtual customerEmail: String @title: 'Customer Email';
}
```

This virtual element will be filled at runtime in the handler `ProcessorService/Incidents/after-READ.js`

```js
module.exports = async function processEmail(req) {
  for (let r of req.results) {
    const { email } = await SELECT.one.from('ProcessorService.Customers').where({ ID: r.customer_ID })
    r.customerEmail = email ?? 'No email provided'
    r.component = r.component ?? 'Not yet defined!'
  }
}
```

The core of this function is the `for of` loop. We can operate on the `req.results` object like in normal application-level event handlers. Since the `SELECT` is executed asynchronously, we cannot use a `forEach` statement, and need to loop synchronously instead with `for of`.
The `SELECT` statement operates on the application service level, meaning the `after READ` handler for Customers - if any is present - will also be executed.
Keep in mind that adding a query on incidents in the customer read handler would create a recursive loop and would lead to the request timing out. When querying data, be aware that custom event handlers cannot throw or raise their own errors. You can use `try / catch` statements to prevent your code from aborting without a meaningful error message.

To make queries more convenient to developers, the API provides a list of entities in `this.entities`

```js
const {Customers} = this.entities

module.exports = async function processEmail(results) {
  for (let r of results) {
      const { email } = await SELECT.one.from(Customers).where({ ID: r.customer_ID })
      r.customerEmail = email ?? 'None Provided'
    }
}
```

### Writing Handlers

Within an extension project, extension developers need to create a new folder `srv/ServiceName/EntityName` and create new files according to a naming convention. Event handlers are registered based on Service Entity, Event Type and Event Timing:

#### Convention

```sh
srv/ServiceName/EntityName/when-WHAT.js
```

#### Parameters

`Servicename` is the fully qualified service name within the application. Note: This includes namespaces, if they are used, even if the services are exposed with simplified names

`EntityName` is optional. When registering a CRUD handler or a bound action, the Entity name must be specified. For unbound actions and application level events, the files should be placed within the service level folder

`when` refers to the implementation hook. For CUD events, it should be `before`, for read events `after` and for actions and events `on`

`WHAT` would specify the name of the event. Framework events are `CREATE, UPDATE, DELETE, READ`. Application Level Events and Actions are called as defined in the model.

All parameters are **case sensitive** and application level events as well as event and action signatures need to be statically defined in the model.

### Configuration

Code extensibility is also reflected in the extension allow list:

```jsonc
"cds": {
    "requires": {...
      "cds.xt.ExtensibilityService": {
        "namespace-blocklist": "com.sap.",
        "extension-allowlist": [
          {
            "for": ["ServiceName"],
            "kind": "entity",
            "new-fields": 4,
            "code" : ["CREATE", "READ", "UPDATE", "DELETE", "action", "function"]  // this applies to bound actions and functions
          },
          {
            "for": ["ServiceName.EntityName"],
            "kind": "entity",
            "code" : ["READ"]
          },
          {
            "for": ["ServiceName"],
            "kind": "service",
            "new-entities": 1,
            "code" : ["action", "function"] // this applies to unbound actions and functions
          }
        ]
      }
    }
  }
```


## Reference

### Query Language (CQL)
CDS-OYSTER exposes a **limited subset** of the query API described in [Capire](https://pages.github.tools.sap/cap/docs/node.js/cds-ql). In this guide, only the relevant differences to the full query API will be described.
On a general note, a lot of features of the CQL rely on the capability of the CDS compiler to inspect the model and resolve element names. Enabling this in an encapsulated sandbox would require serializing potentially very large models, posing a significant performance impact.


### SELECT

The sandbox API is limited to the `SELECT.from` syntax for **service entities** of the target service only.
```js
let q = SELECT.from('Incidents').where({ID:201}).orderBy({title:1})
// is equivalent to
let r = SELECT.from('ProcessorService.Incidents').where({ID:201}).orderBy({title:1})
```
There is a convenience function `this.entities` which can be used to make the code easier to read:
```js
const {Customers} = this.entities

module.exports = async function processEmail(results) {
  for (let r of results) {
      const { email } = await SELECT.one.from(Customers).where({ ID: r.customer_ID })
      r.customerEmail = email ?? 'None provided'
  }
}
```

#### Supported syntax for SELECT

| Clause   | Syntax                                | Notes                                                                                                                                                                                                                                                                                                                      |
|----------|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| from     | `.from(target)`                       | target must be a string and point to a service entity. A fully qualified name and only the entity name are allowed, but the fully qualified name must match the service of `this`. It must precede the `.columns` call                                                                                                     |
| columns  | `.columns([columns])`                 | columns expects an array of string or a single string as argument. Columns names are case sensitive.  `as` is supported, but not semantically checked at design time and activation. Functions supported are `count(*)`, `avg(column) as alias`, `max(column) as alias`, `min(column) as alias` and `sum(column) as alias` |
| one      | `.one([columns])` or `.one`           | one can replace `.columns` and adds `limit: { rows: {val:1}, offset: {val:0} }` to the query. The query result is an object containing a single row as opposed to an array of objects in all other queries. You can also use one without parameters to select the full row. `one` must precede the `.from` call            |
| distinct | `.distinct([columns])` or `.distinct` | distinct also can replace columns and can be called with and without parameters. It too must precede the `from` clause                                                                                                                                                                                                    |
| where    | `.where({valid CQN expression})`      | The exercise section contains multiple examples for valid where clauses.                                                                                                                                                                                                                                                   |
| limit    | `.limit(num, offset)`                 | TODO: Implement offset                                                                                                                                                                                                                                                                                                     |
| order by | `orderBy([columns])`                  |                                                                                                                                                                                                                                                                                                                            |

### INSERT

The only syntax supported for inserting is `INSERT.into(EntityName).entries({ObjectNotation})`

If you have an unbound action defined for incidents like this
```cds

extend service AdminService with {
  action createIncident(customer: Integer, title: String) returns String;
}
```

then a valid event handler for it `srv/AdminService/on-createIncident.js` would be
```js
function createGuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const { Incidents } = this.entities
module.exports = async function createIncident (req) {
  const res = await INSERT.into(Incidents).entries([
    { ID: createGuid(), customer_ID: req.data.customer, title: req.data.title }
  ])
  return 'Success'
}
```

## How to Obtain Support

In case you find a bug, please report an [incident](https://cap.cloud.sap/docs/resources/#support-channels) on SAP Support Portal.

## License

This package is provided under the terms of the [SAP Developer License Agreement](https://cap.cloud.sap/resources/license/developer-license-3_2_CAP.txt).
