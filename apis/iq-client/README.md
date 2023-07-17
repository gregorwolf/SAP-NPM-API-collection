# @sap/iq-client

Fully-featured Node.js driver for [SAP HANA Cloud, Data Lake Relational Engine](https://www.sap.com/products/hana.html). It is used to connect, issue SQL queries, and obtain result sets.

## Install

```bash
npm install @sap/iq-client
```

## Prerequisites

The iq-client driver requires client libraries to be installed and available in the environment. To use HDLRE or IQ Client libraries, source IQ.sh or set the IQDIR17 environment variable to point to the path where the dbcapi library is located. To use SQL Anywhere libraries, source sa_config.sh or set the SQLANY17 environment variable to point to the path where the dbcapi library is located.

This driver communicates with the native HANA libraries, and thus requires platform-specific native binaries. The official hosted version includes precompiled libraries for Linux, Windows and Mac OS X.

The @sap/iq-client driver supports versions of Node.js 10 and higher.

## Community

SAP Community provides a forum where you can ask and answer questions, and
comment and vote on the questions of others and their answers.

See [SAP HANA Community Questions](https://answers.sap.com/tags/7efde293-f35d-4737-b40f-756b6a798216) for details.

## Help Guide

The SAP HANA Cloud, Data Lake Relational Engine Node.js Driver help guide and API reference can be found on [help.sap.com](https://help.sap.com/docs/SAP_HANA_DATA_LAKE/a894a54d84f21015b142ffe773888f8c/e186e606a64b4aee95b98a6ee63e4531.html).

## Getting Started

A database connection object is created by calling createConnection. The connection to data lake Relational Engine is established by calling the connection object's connection method and passing an object or string representing connection parameters, for example:

```js
var iq = require('@sap/iq-client');

var conn = iq.createConnection();

var connOptions = {host:'XXX-XXX.iq.hdl.us10.hanacloud.ondemand.com:443',uid:'XXXXXXX',pwd:'XXXXXXX',ENC:'TLS{tls_type=rsa;direct=yes}'};

conn.connect(connOptions, function(err) {
  if (err) throw err;
  conn.exec('SELECT Name, Description FROM Products WHERE ID = ?', [301],
            function (err, result) {
    if (err) throw err;

    console.log('Name: ', result[0].Name, ', Description: ',
                result[0].Description);
    // output --> Name: Tee Shirt, Description: V-neck
    conn.disconnect();
  })
});
```

## Establish a database connection

### Connecting

A database connection object is created by specifying createConnection. The connection is established by calling the connection object's connect method and passing in an object or string representing connection parameters.

The following example shows a TCP/IP connection to data lake Relational Engine:

#### Example: Connecting over TCP/IP

```js
conn.connect({
  host: 'myserver',
  port: '443',
  uid: 'User1',
  pwd: 'Password123',
  ENC: 'TLS{tls_type=rsa;direct=yes}'
});
```

### Disconnecting

Disconnect from the database:

```js
conn.disconnect(function(err) {
  if (err) throw err;
  console.log('Disconnected');
});
```

## Direct Statement Execution

Direct statement execution is the simplest way to execute SQL statements. The input consists of the SQL command to be executed and an optional array of positional arguments. The result is returned by using callbacks. The type of returned result depends on the kind of statement.

### DDL Statement

In the case of a successful DDL Statement, nothing is returned.

```js
conn.exec('CREATE TABLE Test (ID INTEGER PRIMARY KEY, msg VARCHAR(128))',
  function (err, result) {
  if (err) throw err;
  console.log('Table Test created!');
});
```

### DML Statement

In the case of a DML Statement the number of `affectedRows` is returned.

```js
conn.exec("INSERT INTO Test VALUES(1, 'Hello')", function (err, affectedRows) {
  if (err) throw err;
  console.log('Number of affected rows:', affectedRows);
});
```

### Query

The `exec` function is a convenient way to completely retrieve the result of a
query. In this case all selected rows are fetched and returned in the callback.

```js
conn.exec("SELECT * FROM Test WHERE ID < 5", function (err, rows) {
  if (err) throw err;
  console.log('Rows:', rows);
});
```

Values in the query can be substitued with JavaScript variables by using `?`
placeholders in the query, and passing an array of positional arguments.

```js
conn.exec("SELECT * FROM Test WHERE ID BETWEEN ? AND ?", [5, 8],
  function (err, rows) {
  if (err) throw err;
  console.log('Rows:', rows);
});
```

## Prepared Statement Execution

Prepared statements can be used for performance gain if the same statement is going to be executed many times. The following describes how to execute prepared statements and queries with the Node.js driver.

### Prepare a Statement

The connection returns a `statement` object which can be executed multiple times.

```js
conn.prepare('SELECT * FROM Test WHERE ID = ?', function (err, stmt){
  if (err) throw err;
});
```

### Execute a Statement

The execution of a prepared statement is similar to the direct statement execution.
The first parameter of `exec` function is an array with positional parameters.

```js
stmt.exec([16], function(err, rows) {
  if (err) throw err;
  console.log("Rows: ", rows);
});
```

### Execute a Batch Statement

The execution of a prepared batch statement is similar to the direct statement execution.
The first parameter of `execBatch` function is an array with positional parameters.

```js
var stmt=conn.prepare("INSERT INTO Customers(ID, NAME) VALUES(?, ?)");
stmt.execBatch([[1, 'Company 1'], [2, 'Company 2']], function(err, rows) {
  if (err) throw err;
  console.log("Rows: ", rows);
});
```

### Execute a Query

The execution of a prepared query is similar to direct statement execution. The first parameter of the execQuery function is an array with positional parameters.

```js
var stmt=conn.prepare("SELECT * FROM Customers WHERE ID >= ? AND ID < ?");
stmt.execQuery([100, 200], function(err, rs) {
  if (err) throw err;
    var rows = [];
    while (rs.next()) {
	rows.push(rs.getValues());
    }
  console.log("Rows: ", rows);
});
```

### Drop Statement

The below example drops a statement:

```js
stmt.drop(function(err) {
  if (err) throw err;
});
```

## Transaction Handling

Transactions are automatically committed.

### Commit a Transaction

Setting auto commit to false implicitly starts a new transaction that must be explicitly committed.

```js
conn.setAutoCommit(false);
// Execute some statements
conn.commit(function(err) {
  if (err) throw err;
  console.log('Transaction commited.');
});
```

### Roll back a transaction

Setting auto commit to false implicitly starts a new transaction that must be explicitly rolled back.

```js
conn.setAutoCommit(false);

conn.rollback(function(err) {
  if (err) throw err;
  console.log('Transaction rolled back.');
});
```

## Resources

+ [SAP HANA Cloud, Data Lake Documentation](https://help.sap.com/docs/SAP_HANA_DATA_LAKE/)

## License

The SAP HANA Cloud, Data Lake Relational Engine Node.js Driver is provided via the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3_1.txt).

By using this software, you agree that the following text is incorporated into the terms of the Developer Agreement:

> If you are an existing SAP customer for On Premise software, your use of this current software is also covered by the terms of your software license agreement with SAP, including the Use Rights, the current version of which can be found at: https://www.sap.com/about/agreements/product-use-and-support-terms.html?tag=agreements:product-use-support-terms/on-premise-software/software-use-rights