@sap/logging
===========

A module that provides Logging and Tracing functionalities for Node.js applications.

<br/>
### Example
---

Here you can see how to consume the module using the very famous [express](https://www.npmjs.com/package/express) module:

```js
var LoggingLib = require('@sap/logging');
var express = require('express');

var app = express();

var appContext = LoggingLib.createAppContext();

app.use(LoggingLib.expressMiddleware(appContext));

app.get('/demo', function (req, res) {
  var logger = req.loggingContext.getLogger('/Application/Network');
  var tracer = req.loggingContext.getTracer();

  logger.info('Retrieving demo greeting ...');
  tracer.info('Processing GET request to /demo');

  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Server started');
});
```

In general you just need to:
- Initialize the Logging library with some application-wide options
- Use the provided middleware that will extract request specific information.
It is recommended that this middleware is the first one to be called in order to have the logging context available as early as possible.
It is also recommended to have the middleware that sets the user of the request right after the one provided by this library.
- Instantiate a Logger and a Tracer via the _loggingContext_ property of the request
- Log and Trace whatever you need

See more details below.

<br/>
### Logging & Tracing - what is the difference?
---

Logs are addressed to an administrator of an application. Traces - to a developer or support staff.
- Events that need to be logged are related to how the app operates - e.g. a user has been blocked because of too many failed login attempts
or the app cannot display some results taken from a remote HTTP service because the remote server is down.
An administrator of an app does not need to know how it is implemented. He/she should just be able to determine the state of the app itself.
- Traces are mainly used when a problem has occurred and further investigation on code level has to take place.

<br/>
### Categories & Locations
---

- Categories - represent a feature area in an application. For example, different layers - Network layer, Database layer etc.
The concept of categories is used in logging.
- Locations - represent a location in the source code - e.g. a path to a file. Used in the context of tracing.

Note on locations: every trace entry contains the source code location (path to a script and a line number) where the entry had been traced.
When running your application on Cloud Foundry or the XS OnPremise Runtime, this path to a file starts from the application root.
Otherwise this location is the absolute path to the script from the root of the file system.

Example:

Let's assume the structure of your application looks like the following:

<pre>
+-- demo-app
|   +-- package.json
|   +-- lib
|   |   +-- index.js
|   |   +-- services
|   |   |   +-- customer-service.js
|   |   |   +-- sales-service.js
</pre>

Here is how the location of a script (path to a file) will look like in the trace entries:

| Script | On CF and XS OnPremise | Outside XS Advanced |
| ------ | ---------------------- | ------------------- |
| index.js | /lib/index.js | /path/from/root/demo-app/lib/index.js |
| customer-service.js | /lib/services/customer-service.js | /path/from/root/demo-app/lib/services/customer-service.js |

The same applies to Windows systems as well. The path separator in the trace entries is always a forward slash, no matter the platform.


<br/>
### Formats
---

- [ListLog](http://help.sap.com/saphelp_nw73ehp1/helpdata/en/53/82dae7c2f5439a8afd1b0ee95c2e45/content.htm) format is used for the logs
- [Trace](http://help.sap.com/saphelp_nw74/helpdata/en/48/4f3966e39472d2e10000000a42189c/content.htm) format is used for traces

Note: instead of thread-name, a request id is used. This is an identifier that helps to distinguish which events are logged/traced because of which requests.
More info on that is available below.

<br/>
### Severity Levels
---

The following table shows which severity levels are available for the Loggers and Tracers:

| Logging | Tracing |
| ------- | ------- |
|         | debug   |
|         | path    |
| info    | info    |
| warning | warning |
| error   | error   |
| fatal   | fatal   |

Here you can find when to use which level:

| Level   | When to use |
| -----   | ----------- |
| debug   | Used to output the internal status of a program |
| path    | Used to analyze the execution flow of a program |
| info    | Used for events that do not need any follow up activity. They show the normal operations within an app. |
| warning | Used for events that need follow up activity in order to prevent errors in the future |
| error   | Used when the desired tasks cannot be completed and the application is still usable |
| fatal   | Used in case of errors, because of which the application is no longer usable |

The default severity level for Loggers is _info_ and the default one for Tracers is _error_.

By default, for convenience, all log entries will also be traced.

<br/>
### API
---

Here is how you can consume the logging module:

There are three layers of information that the module needs:
- application level context - information that is valid for the whole application (e.g. where to store the logs and the traces)
- request level context - information that is valid only during the processing of an HTTP request (e.g. who is the current user)
- message level context - information regarding a single log or trace entry (e.g. the message of the entry)

#### Let's begin with the application level context:

```js
var LoggingLib = require('@sap/logging');

var appContext = LoggingLib.createAppContext({
  logLocation: 'logs/log-file.log',
  traceLocation: 'logs/trace-file.trc',
  csnComponent: 'ab-cd-efg'
});
```

To create the application context, pass some application-wide options. Here is the explanation of the available properties:

| Property name | Meaning |
| ------------- | ------- |
| logLocation   | Used to specify where to store the log entries. The default is the standard output. A string is considered a path to a file. |
| traceLocation | Used to specify where to store trace entries. The default is the standard error. A string is considered a path to a file. |
| csnComponent  | Only applicable for SAP apps. Should be of type string. |

Note: when `logLocation` and `traceLocation` point to two different files, all log entries are automatically written to the traces as well to make troubleshooting easier.
In case you have no access to a request object in your code (e.g. in jobs), you may also instantiate loggers and tracers from the Application context:

```js
appContext.getLogger('/Application/Jobs');
// or you may instantiate it and explicitly pass an id which will be used instead of request id, like this:
// appContext.getLogger('/Application/Jobs', jobRunID);

appContext.getTracer();
// or with a custom ID:
// appContext.getTracer(jobRunID);
```
Note, if you do not pass an id when instantiating a logger/tracer, the default is an empty string.

You may use the Application context to change severity levels (with wildcards for flexibility):
```js
appContext.setLevel('/Application/*', 'warning'); // for a logger
appContext.setLevel(pathToFile, 'debug'); // for a tracer
```

Note: the level of a tracer is associated with a file, but not with the file a tracer has been created in,
but with the file you are actually tracing messages.

With the use of wildcards it is possible to match several Categories or Locations with just one setting.
The only character supported is the asterisk (_*_). It corresponds to zero or more characters (no matter what they are).
The comparison is executed in a case insensitive manner.

Let's illustrate the wildcard usage
using the example application structure from the [Categories & Locations section](#categories--locations),
assuming we are running the application in the context of XS Advanced (related to the script paths):

| Pattern | Result |
| ------- | ------ |
| /Application/Network | Match a certain Category |
| /Application/Network/* | Match all subcategories |
| /lib/services/users-service.js | Match a specific file |
| /lib/services/* | Match all files in all subdirectories of _services_ |


If you deploy your application on the XS Advanced On-Premise Runtime, it is possible to change the severity levels of categories and script files
at runtime without app restart. Just use the following command:

```bash
xs set-logging-level <application-name> <category-or-path-to-file> <level>
```

Note: it is possible to set a top priority level for all loggers and tracers via the environment variable `XS_APP_LOG_LEVEL`.
Its value is a level from `debug` to `fatal`. The value from the environment variable (if valid) will be used instead of all already set levels. This is especially suitable for debugging purposes.

If `XS_APP_LOG_LEVEL`=`none`, then all logging and tracing is disabled. This is useful for automated testing.


#### The next step is to create the request context

```js
 function(req) {
   var reqContext = appContext.createRequestContext(req);
   // Here you may explicitly pass an id as a second argument
   // (but you need to be sure that it will not collide with other ids).
   // If there is no second argument, then the module will generate an ID for you.
 }
```

If you use the popular [express](https://www.npmjs.com/package/express) module, there is a utility middleware that you can use (see the very first example).
It automatically attaches a property named _"loggingContext"_ to the request object.

#### Request ID

Because of the single-threaded nature and the event loop mechanism in Node.js, you may:
- receive a request
- start some async I/O operation
- in the meantime start processing another request before returning a response to the first one

This means that the log entries for the two requests will be mixed a bit. To overcome this issue, every time a new request comes in (and new request context is created)
a unique id for the request is generated and is present in the logs. If you use the express middleware,
this request id will be included in the response headers (name of the header: 'x-request-id'), so in case of any troubles you may see the request id in the response and
then filter the logs to see what are the entries for that request. Here is an example trace entry with a request id (in the square brackets):

> Aug 30, 2015 06:58:28 PM /lib/demo.js [idyoly5z] INFO: Hello World

It is possible to use your own ID instead of the automatically generated one (see previous examples), but you need to take care that it will not collide with other ids.

#### Using Loggers

You may create a Logger in the following way:

```js
var logger = req.loggingContext.getLogger('/Application/Network');
```

The request context has got the _"getLogger"_ function that takes 1 string argument - the category. Categories are names of functional areas in an application.
We recommend your categories always begin with _"/Application"_. The categories form a hierarchy with forward slash as a separator.

You may always get the severity level (a string) of a Logger with such code:
```js
var level = logger.getLevel();
```

It is also possible to check whether an entry with a specific severity level will be logged with the current level configuration:

```js
var willItBeLogged = logger.isEnabled('info');
```

Logging entries:

```js
logger.info('Successful login of user %s - ', user, new Date());
logger.warning('Job could not finish successfully. An app admin should retrigger it.');
logger.error(new Error('Uups, an error has occurred'));
logger.fatal('We are in trouble');
```

You may use the same string interpolation mechanism as with [util.format](https://nodejs.org/api/util.html#util_util_format_format)

The available severity levels for logging are: _info, warning, error, fatal_.

Logging errors:
```js
function callback(err, result) {
  if (err) {
    logger.error(err, 'Error during operation X');
  }
  // ...
}
```
If the first argument is an error, its message is appended to the log message.
Also the error stack is written to the trace.
This works for all severity levels and also with tracers.

#### Using Tracers

All you need to do to obtain a Tracer instance is:

```js
var tracer = req.loggingContext.getTracer();
```

Methods regarding level getting and checking are provided (similar to the loggers):

```js
var level = tracer.getLevel();
var willItBeTraced = tracer.isEnabled('path');
// etc.
```

Keep in mind that the available severity levels for tracing are: _debug, path, info, warning, error, fatal_.

##### Convenient tracing methods

There are several methods that the API provides for convenience (they use severity level _path_):
- entering - used to record that a function has been entered in the program flow. You may pass all of the arguments of your function to the _entering_ function and they will be traced.
- exiting - typically used in pair with the _entering_ method. If you provide an argument, it will be considered the return value of your function.

```js
function myFunction(tracer, a, b ,c) {
  tracer.entering(a, b, c);

  var result = // some logic here ...

  tracer.exiting(result);
  return result;
}
```

- throwing - used when you would like to trace when the code is about to throw an error. You may pass the error that is about to be thrown as an argument .
- catching - used in catch blocks. You may pass the caught error as an argument.

```js
function func1(tracer) {
  var error = new Error('An error has occurred');
  tracer.throwing(error);
  throw err;
}

function func2(tracer) {
  try {
    func1(tracer);
  } catch (err) {
    tracer.catching(err);
    // logic for processing the error
  }
}
```

#### Other

The library supports SAP Passports. When a request context is created with a request object that has the `sap-passport` header,
the unique identifiers of the received SAP Passport will be part of the log entries.
