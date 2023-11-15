@sap/hdi
===============

`@sap/hdi` is a [Node.js](https://nodejs.org) library that allows access to the SQL based API through Node.js. It provides access to the HDI-, Container-Group- and the Container-API.

## Table of contents
 **Using the library**:
- [General things](#general-things)
- [Using the HDI API](#using-the-hdi-api)
- [Using the Container Group API](#using-the-container-group-api)
- [Using the Container API](#using-the-container-api)
- [Using the API with xsjs](#using-the-api-with-xsjs)

## General things

Note: Either [@sap/hana-client](https://www.npmjs.com/package/@sap/hana-client) or [hdb](https://www.npmjs.com/package/hdb) must be installed by yourself. 
@sap/hana-client versions ^2 >= 2.5 are currently supported by @sap/hdi 4.5.2.
To install the latest @sap/hana-client simply run `npm install @sap/hana-client`.

hdb version ^0 is currently supported by @sap/hdi 4.5.2.
To install the latest hdb simply run `npm install hdb`.

Running `npm install --save @sap/hdi` will install the package and add it as a dependency to your **package.json**.

We recommend using version 2.0.0 or higher. >=2.0.0 of the API brings access to the Container Group API, major refactoring of the HDI and Container API into separate components and lots of pre-defined classes to make working with the API easier.

Note that >=2.0.0 is not backwards compatible to 1.x, code written with the old API will ***NOT*** run with new API. This documentation is for the 3.x API.

All APIs require that the connected user has EXECUTE privileges for the corresponding SQL procedures and SELECT for all table types in SYS_DI (TT*).

Almost all methods are asynchronous and require a standard node-style callback, where the first parameter is any errors that occurred and the second is the result.
If no callback is supplied, the arguments will be partially applied and a function will be returned, taking a callback as the first and only parameter. This way, the methods can be easily chained via async.

If you are using the methods in the easily chainable way, the error parameter will be supplied if the return code of the HDI call is not equal 0. If you are using the "normal" way, the error-parameter is only supplied when a "technical" error occurs. To check if the action was successful, you need to check the return code (rc) of the returned result. In order to "automate" this, you can wrap your callback with the function below:

```javascript
function wrap (callback) {
  return function (error, result) {
    if (error) {
      return callback(error);
    } else {
      if (result.rc && result.rc !== 0) {
        const e = new Error('HDI call failed!')
        e.result = result
        return callback(e, result);
      } else {
        return callback(null, result);
      }
    }
  }
}
```


**This document only provides a really high-level and shallow overview of the API. For a more detailed, technical documentation, refer to the JSDoc. To generate the documentation, run `npm install jsdoc`,`npm install ink-docstrap` and then `npm run documentation`. The documentation can then be found in the `docs` folder.**

## Using the HDI API
Access to the _SYS_DI API is provided by the `HDI` class. Access to this API requires HANA server version: 1.00.120 or newer. To work with the API, simply construct a new object, as can be seen in the following (ES6-based) example:

```javascript
'use strict';
const { HDI } = require('@sap/hdi');

// This credentials object will be directly passed to the @sap/hana-client or hdb client. Any options accepted by the @sap/hana-client or hdb clients can be passed.
// Credentials object containing XSA environment variables will be converted to client acceptable options. 
const credentials = {
    host : <host>,
    port : <port>,
    user : <user>,
    password: <password>
};

const hdi = new HDI(credentials, parameterSchema, usehdb);

hdi.connect((error,result) => {
  if(error){
    throw error;
  }

  hdi.listLibraries(null,(error,result) => {
    if(error){
      throw error;
    }

    console.log(result);
  })
})
```

To construct an access object, you need the credentials for the HANA system and the `parameterSchema`. This schema will be used to create temporary tables to supply data to the underlying sql procedures.

## Using the Container Group API
The Container Group API provides access to an **existing** container group. In order to use the API, you might need to first grant the correct rights by using `grantContainerGroupAPIPrivileges` of the HDI class.

To construct an access object, you need the credentials for the HANA system, the `parameterSchema` and the name of the container group.

## Using the Container API
The Container API provides access to an **existing** container. In order to use the API, you might need to first grant the correct rights by using `grantContainerAPIPrivileges` of the ContainerGroup class.

To construct an access object, you need the credentials for the HANA system, the `parameterSchema` and the name of the container.

Example: Deploying files to an existing container, assuming that the container exists and has been configured correctly.

```javascript
'use strict';

const fs = require('fs');
const async = require('async');
const path = require('path');

const {Container, HDI, FileWithContent, FolderWithContent, File, Parameter} = require('@sap/hdi');

// This credentials object will be directly passed to the @sap/hana-client or hdb client. Any options accepted by the @sap/hana-client or hdb clients can be passed.
const credentials = {
  host: 'host',
  port: 'port',
  user: 'user',
  password: 'password'
};

const containerName = 'container_name';


const container = new Container(containerName, // Name of the container. Does not have to exist yet but has to exist before calling any methods.
  credentials, // Credentials to use for the HANA system.
  credentials.user // Schema where the user used for the connection has privileges to create temporary tables, for example the user's own schema.
);

const fPath = 'folder/';

const cPath = 'folder/.hdiconfig';
const cContent = fs.createReadStream(`${__dirname}${path.sep}testdata${path.sep}.hdiconfig`);

const tPath = 'folder/table1.hdbtable';
const tContent = fs.createReadStream(`${__dirname}${path.sep}testdata${path.sep}table1.hdbtable`);

const rContent = fs.createReadStream(`${__dirname}${path.sep}testdata${path.sep}role.hdbrole`);
const rPath = 'folder/role.hdbrole';

const filesFoldersContent = [
  new FolderWithContent(fPath),
  new FileWithContent(cPath, cContent),
  new FileWithContent(tPath, tContent),
  new FileWithContent(rPath, rContent)
];

const files = [new File(rPath), new File(cPath), new File(tPath)];
const params = [new Parameter('ignore_work', 'TRUE'), new Parameter('ignore_deployed', 'TRUE')];


function wrap (callback) {
  return function (error, result) {
    if (error) {
      return callback(error);
    } else {
      if (result.rc && result.rc !== 0) {
        const e = new Error('HDI call failed!')
        e.result = result
        return callback(e, result);
      } else {
        return callback(null, result);
      }
    }
  }
}

const tasks = [
  (cb) => containerUser.connect(wrap(cb)),
  (cb) => containerUser.lock(0, null, wrap(cb)),
  (cb) => containerUser.write(filesFoldersContent, null, wrap(cb)),
  (cb) => containerUser.status(null, null, wrap(cb)),
  (cb) => containerUser.list(null, null, wrap(cb)),
  (cb) => containerUser.make(files, null, null, null, wrap(cb)),
  (cb) => containerUser.unlock(wrap(cb)),
  (cb) => {
    containerUser.disconnect(); cb(null, 'OK: disconnected.');
  }
];

async.series(tasks, (e, results) => {
  if(e){
    console.error(e);
    process.exit(1);
  } else {
    console.log(results);

    /**
      Work with the results.
    **/
  }
});
```

## Using the API with xsjs
Since most of the methods of the HDI, ContainerGroup and Container class are asynchronous, you need to use the provided `sync` functionality to use them in xsjs code.
Be aware that this requires a version of xsjs that uses at least `"@sap/fibrous": "0.5.0-0"` as a dependency. This fixes issues with `sync` in combination with class methods.

If your version of xsjs is up to date in that regard, simply add `sync` before your method calls. This

```javascript
const { HDI } = require('@sap/hdi');

// This credentials object will be directly passed to the @sap/hana-client or hdb client. Any options accepted by the @sap/hana-client or hdb clients can be passed.
const credentials = {
    host : <host>,
    port : <port>,
    user : <user>,
    password: <password>
};

const hdi = new HDI(credentials, parameterSchema, usehdb);

hdi.connect((error,result) => {
  if(error){
    throw error;
  }

  hdi.listLibraries(null,(error,result) => {
    if(error){
      throw error;
    }

    console.log(result);
  })
})
```
turns into this:
```javascript
var { HDI } = $.require('@sap/hdi');

// This credentials object will be directly passed to the @sap/hana-client or hdb client. Any options accepted by the @sap/hana-client or hdb clients can be passed.
var credentials = {
    host : <host>,
    port : <port>,
    user : <user>,
    password: <password>
};

var hdi = new HDI(credentials, parameterSchema, usehdb);

hdi.sync.connect();
var libraries = hdi.sync.listLibraries(null);
console.log(libraries);
```
