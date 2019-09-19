# Migration Guide

## Version 5 ==> Version 6

Support for Node.js 4 has been droppped, *@sap/hdbext* APIs have not been changed.

## Version 4 ==> Version 5

### Changes to application code

#### Creating connections

Code like:

```js
hdbext.createConnection({
  host: 'my.host',
  port: 30015,
  user: 'my_user',
  password: 'secret',
  schema: 'name_of_the_schema',
  isolationLevel: hdbext.constants.isolation.SERIALIZABLE,
  locale: 'en_US',
  session: {
    APPLICATION: 'myapp',
    SAP_PASSPORT: 'passport'
  }
}, function(err, client) {

});
```

should be transformed to:

```js
var enums = require('@sap/hana-client/extension/Enums');

hdbext.createConnection({
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
}, function(err, client) {

});
```

#### Connection pooling

```js
var pool = hdbext.getPool({ /* database options */ }, { /* pool options */ });
// or
var pool = hdbext.createPool({ /* database options */ }, { /* pool options */ });

pool.acquire({ /* options */ }, function(err, client) {

});
```

should be transformed to:

```js
hdbext.createConnection({
  // database options
  pooling: true
}, function(err, client) {

});
```

In that way the connection pooling functionality of *@sap/hana-client* will be used.

#### Connection pooling in the middleware

To enable connection pooling in `hdbext.middleware` add the option `pooling: true` to the database options.

#### Passing table name as input table parameter to a procedure

Code like:

```js
hdbext.loadProcedure(client, schema, name, function(err, sp) {
  sp({
    MY_INPUT_TABLE_PARAM: '"my""Schema"."my""Table"'
  }, function(err, outParams) {

  });
});
```

should be transofmed to:

```js
hdbext.loadProcedure(client, schema, name, function(err, sp) {
  sp({
    MY_INPUT_TABLE_PARAM: { schema: 'my"Schema', table: 'my"Table' }
  }, function(err, outParams) {

  });
});
```

The `table` property is mandatory and the `schema` property is optional if using the current schema.

#### Constants

*@sap/hdbext* no longer exposes constants, use those provided by *@sap/hana-client* instead:

```js
var types = require('@sap/hana-client/extension/TypeCode');
var enums = require('@sap/hana-client/extension/Enums');
```
