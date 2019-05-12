@sap/hdbext
============

This package provides convenient functions on top of the *@sap/hana-client* module.

The [change log](CHANGELOG.md) describes notable changes in this package.

## Usage

```js
var hdbext = require('@sap/hdbext');
```

## API

### createConnection(hanaConfig, callback)

Creates a connection to a HANA database:

```js
var hanaConfig = {
  host     : 'hostname',
  port     : 30015,
  user     : 'user',
  password : 'secret'
};
hdbext.createConnection(hanaConfig, function(error, client) {
  if (error) {
    return console.error(error);
  }

  client.exec(...);
});
```

The `hanaConfig` argument contains [database connection options](#database-connection-options) and [additional options](#additional-options).
The callback provides a connected `client` object.

If the application will be deployed on Cloud Foundry or XS Advanced, you can use _@sap/xsenv_ package to
lookup the bound HANA service, like this:
```js
var xsenv = require('@sap/xsenv');

var hanaConfig = xsenv.cfServiceCredentials({ tag: 'hana' });
hdbext.createConnection(hanaConfig, function(error, client) {
  //...
});
```

#### Database connection options

The HANA options provided to *@sap/hdbext* should be in the same format as expected by the *@sap/hana-client* package.

For convenience these properties set by the HANA service broker are also accepted:
* `schema` - can be used instead of the `currentSchema` property of *@sap/hana-client*.
* `db_hosts` - can be used instead of the `hosts` property of *@sap/hana-client*.
* `certificate` - can be used instead of `ca` property of *@sap/hana-client*.
__Note:__ `certificate` is a string containing one certificate, while `ca` is an array of certificates.
* `hostname_in_certificate` - can be used instead of `sslHostNameInCertificate` property of *@sap/hana-client*.
* `validate_certificate ` - can be used instead of `sslValidateCertificate` property of *@sap/hana-client*. The default value is `true`.
* `client_authentication_certificate` - can be used instead of `cert` property of *@sap/hana-client*.
* `client_authentication_private_key` - can be used instead of `key` property of *@sap/hana-client*. 

#### Additional options

A connection created with *@sap/hdbext* can be further configured with the following options:

Option   | Type | Description
-------- | ---- | -----------
`autoCommit` | boolean | Sets the autoCommit flag. If no option is specified it defaults to `true`.

**Note**: the *@sap/hana-client* package also accepts other configurations like `isolationLevel` (one can use the isolation level constants in `require('@sap/hana-client/extension/Enums')`), `locale` and `sessionVariable:<name-of-the-session-variable>`.

##### Special session variables

Some session variables are handled in a special way.

* `XS_APPLICATIONUSER` - can be set to a user token (SAML/JWT) to associate the application user with the database connection
* `SAP_PASSPORT` - used to propagate SAP passport to SAP HANA, used for end-to-end tracing
* `APPLICATION` - the name of the application initiating the database connection

**Note**: If providing the `SAP_PASSPORT` session variable, the SAP Passport in
it should have already been updated with data, specific to the component that consumes *@sap/hdbext*.
For more information, see the documentation of the *@sap/e2e-trace* package.

#### Example

Sample configuration with both [database connection options](#database-connection-options) and [additional options](#additional-options):

```js
var enums = require('@sap/hana-client/extension/Enums');

{
  host: 'my.host',
  port: 30015,
  user: 'my_user',
  password: 'secret',
  schema: 'name_of_the_schema',
  isolationLevel: enums.SERIALIZABLE,
  locale: 'en_US',
  autoCommit: false,
  'sessionVariable:APPLICATION': 'myapp',
  'sessionVariable:SAP_PASSPORT': 'passport'
}
```

### connectionOptions.getGlobalOptions()

Returns an object with the following properties:
* `sessionVariable:APPLICATION` - extracted from VCAP_APPLICATION, fallbacks to process's pid and machine's hostname.
* `sessionVariable:APPLICATIONVERSION` - extracted from package.json in current directory. May not be present if the file is not present or not in valid JSON format.

### connectionOptions.getRequestOptions(req)

Returns an object with the following properties, based on the given HTTP request (_req_):
* `sessionVariable:SAP_PASSPORT` - may not be present if the SAP Passport header is not present. The passport is updated with default component data.
* `sessionVariable:XS_APPLICATIONUSER` - only present for authenticated requests that do not use client credentials token.
* `locale` - only present if _req_ has either a `x-sap-request-language` or `accept-language` header.

### loadProcedure(client, schemaName, procedureName, callback)

*@sap/hdbext* provides functionalities to simplify stored procedure calls.

For example, if you have the following stored procedure:

```sql
create procedure PROC_DUMMY (in a int, in b int, out c int, out d DUMMY, out e TABLES)
  language sqlscript
  reads sql data as
  begin
    c := :a + :b;
    d = select * from DUMMY;
    e = select TOP 3 * from TABLES;
  end
```

you can call it via the *@sap/hana-client* package in the following way:

```js
var dbStream = require('@sap/hana-client/extension/Stream');
dbStream.createProcStatement(client, 'CALL PROC_DUMMY (?, ?, ?, ?, ?)', function (err, stmt) {
  if (err) {
    return console.error('createProcStatement error:', err);
  }

  stmt.exec({ A: 3, B: 4 }, function (err, params, dummyRows, tablesRows) {
    if (err) {
      return console.error('exec error:', err);
    }

    stmt.drop(function (err) {
      if (err) {
        return console.error('drop error:', err);
      }

      console.log('C:', params.C);
      console.log('Dummy rows:', dummyRows);
      console.log('Tables rows:', tablesRows);
    });
  });
});
```

With *@sap/hdbext* you don't need to construct a `CALL` statement. The procedure can be loaded by its name.
The code can look like this:

```js
hdbext.loadProcedure(client, null, 'PROC_DUMMY', function(err, sp) {
  sp({ A: 3, B: 4 }, function(err, parameters, dummyRows, tablesRows) {
    if (err) {
      return console.error(err);
    }

    console.log('C:', parameters.C);
    console.log('Dummy rows:', dummyRows);
    console.log('Tables rows:', tablesRows);
  });
});
```

To use the current schema, pass an empty string `''`, `null` or `undefined` for schema.

`loadProcedure(client, schemaName, procedureName, callback)` returns a JavaScript function which you can call directly.
The function has the `paramsMetadata` property containing metadata for all parameters of the stored procedure.
This could be useful if you need to implement generic stored procedures calling.

You can also pass the input parameters directly in the proper order:

```js
sp(3, 4, function(err, parameters, dummyRows, tableRows) {
  // ...
});
```

or as an array:

```js
sp([3, 4], function(err, parameters, dummyRows, tableRows) {
  // ...
});
```

Where the big advantage comes in is with table parameters.
You can pass an array of objects and *@sap/hdbext* will automatically convert it into a table parameter.
Say we have a `customer` table with `ID` and `NAME` columns and a procedure:

```sql
create table "customer" (ID integer, NAME VARCHAR(100), primary key (ID));

create procedure "getCustomers" (in in_table_1 "customer")
language sqlscript reads sql data as begin
select * from :in_table_1;
end;
```

You can call it like this:

```js
hdbext.loadProcedure(client, null, 'getCustomers', function (err, sp) {
  if (err) {
    return console.error(err);
  }

  sp([
    { ID: 1, NAME: 'Alex' },
    { ID: 2, NAME: 'Peter' }
  ], function (err, parameters, tableRows) {
    if (err) {
      return console.error(err);
    }

    console.log(parameters);
    console.log(tableRows);
  });
});
```

In this example each array element represents a table row. Property names should case-sensitively match the corresponding column names.

Internally *@sap/hdbext* creates a local temporary table in the current schema for each table parameter.
Thus, the current user needs the respective permissions.

It is also possible to explicitly state an existing table to be used as input table parameter:

```js
  sp({ schema: 'my-schema', table: 'my-table' }, function (err, parameters, tableRows) {
    // ...
  });
```

The `schema` property is optional.

Every output table has a `columnInfo` property which contains info about each of the table's columns.

Input arguments for parameters that have default values can be skipped in order to use the defined defaults.
It is recommended to pass the input as an object in those cases. In this way the application code would be independent
from the order in which parameters with default values are defined in the procedure.
When the parameters are passed in a sequence (i.e. as an array or are passed directly in the proper order),
input arguments can be skipped only for the parameters which are after the last mandatory parameter in the procedure's list.

### Middleware

*@sap/hdbext* provides a middleware which allows easy database connection creation in a middleware-based application.
The `close` method of the database client is invoked when the request is closed or finished.

```js
var hdbext = require('@sap/hdbext');
var express = require('express');

var app = express();
app.use(hdbext.middleware(hanaConfig));

app.get('/execute-query', function (req, res) {
  var client = req.db;

  client.exec('SELECT * FROM DUMMY', function (err, rs) {
    if (err) {
      return res.end('Error: ' + err.message);
    }

    res.end(JSON.stringify(rs));
  });
});
```

The argument `hanaConfig` may contain both [database connection options](#database-connection-options) and [additional options](#additional-options).

The middleware uses [connectionOptions.getGlobalOptions()](#connectionoptionsgetglobaloptions) and [connectionOptions.getRequestOptions(req)](#connectionoptionsgetrequestoptionsreq) for extracting options. It is possible for applications to override the default global options by setting them explicitly in `hanaConfig`.

### SQL Parameter Utilities

The `hdbext.sqlInjectionUtils` object contains several synchronous utility functions that can be used to prevent SQL injections.

#### isAcceptableParameter(value, maxToken)

Returns true if `value` can be used to construct SQL statements.
The number of tokens a value is allowed to contain is set via the optional `maxToken` argument. Defaults to 1.

#### isAcceptableQuotedParameter(value)

Returns true if the provided `value` is quoted correctly and can be used in an SQL statement.

#### escapeDoubleQuotes(value)

Returns the `value` parameter with all double quotation marks escaped (i. e. doubled).

#### escapeSingleQuotes(value)

Returns the `value` parameter with all single quotation marks escaped (i. e. doubled).

## Troubleshooting

To enable tracing, you should set the environment variable `DEBUG` to `hdbext:*`.

## Migration guide

Guide on how to adopt new major versions of the library can be found [here](./migration.md).
