# @sap/sbss
Node.js client library for SBSS (Service Broker Security Support)

SBSS provides secure generation, storage and validation of credentials (user name and password).
This functionality is aimed at service implementations to protect access to their resources.
See [Custom Services](https://docs.cloudfoundry.org/services/) in Cloud Foundry documentation for detailed description how to provide custom services.

SBSS uses a database to do its job and provides a DB API in the form of stored procedures and views.
This package provides a JavaScript API to access SBSS.

## Requirements

SBSS should be installed and configured. The credentials to access it should be available.

## Install
```sh
npm install --save @sap/sbss
```

## Usage

```js
var sbssLib = require('@sap/sbss');
var xsenv = require('@sap/xsenv');
var assert = require('assert');

var options = xsenv.cfServiceCredentials({ tag: 'hana', plan: 'sbss' });
var sbss = sbssLib(options);

function generateCredentials(options, cb) {
  sbss.createCredentials({
    instanceId: options.instanceId,
    bindingId: options.bindingId,
    serviceId: options.serviceId,
    planId: options.planId,
    appGuid: options.appGuid,
    subaccountId: options.subaccountId
  }, (err, credentials) => {
    if (!err) {
      // credentials.username - generated user name
      // credentials.password - generated password
    }
    cb(err);
  });
}

function validateCredentials(username, password, cb) {
  sbss.validateCredentials(username, password, (err, result) => {
    if (!err) {
      // provided credentials are valid
      // result.instanceId - instanceId provided to createCredentials that generated these credentials
      // result.bindingId - bindingId provided to createCredentials that generated these credentials
      // result.serviceId - serviceId provided to createCredentials that generated these credentials
      // result.planId - planId provided to createCredentials that generated these credentials
      // result.appGuid - appGuid provided to createCredentials that generated these credentials
      // result.subaccountId - subaccountId provided to createCredentials that generated these credentials
    }
    cb(err);
  });
}
```

## API

### `sbss(options)`
* `options` - database connection options, normally the `credentials` object of a SAP HANA or PostgreSQL service binding.

Constructs and returns a new SBSS client. All subsequent functions are accessed through this object.

**Note:** When using PostgreSQL it is recommended to provide restricted DB user credentials via the `restrictedUser` property. When `restrictedUser` property is present it is mandatory to specify both `restricted-dbuser-name` and the corresponding `restricted-dbuser-password`. They are normally taken from the user-provided service used when populating PostgreSQL schema with SBSS stored procedures.

* `options`
  * `<postgres service credentials>`
  * `restrictedUser`
    * `restricted-dbuser-name`
    * `restricted-dbuser-password`

Sample usage:

```js
var sbssLib = require('@sap/sbss');
var xsenv = require('@sap/xsenv');

var options = xsenv.cfServiceCredentials({ label: 'postgresql', tag: 'sbss' });
options.restrictedUser = xsenv.cfServiceCredentials('restriced-dbuser-ups');
var sbss = sbssLib(options);
```

### `createCredentials(options, callback)`
* `options`
  * `instanceId` - {string} service instance ID
  * `bindingId` - {string} service binding ID
  * `serviceId` - {string} service ID
  * `planId` - {string} service plan ID
  * `appGuid` - {string} (optional) application guid
  * `subaccountId` - {string} subaccount ID (only supported on PostgreSQL)
* `callback` - `function(error, credentials)`
  * `error` - Error object in case of error, `null` or `undefined` otherwise
  * `credentials` - {object}
    * `username` - {string} generated user name
    * `password` - {string} generated password

Generates a new set of credentials and persists them in the database together with the given `options`.
It is possible to generate multiple credentials for the same instance ID and binding ID.

**Note:** If SBBS version is older than 1.5.4, then `serviceId`, `planId` and `appGuid` options will not be persisted.
**Note:** If SBBS version is older than 1.5.11, then `subaccountId` will not be persisted.

### `deleteCredentials(instanceId, bindingId, callback)`
* `instanceId` - {string} service instance ID
* `bindingId` - {string} service binding ID
* `callback` - `function(error, result)`
  * `error` - Error object in case of error, `null` or `undefined` otherwise
  * `result` - {object}
    * `deletedCredentials` - number of deleted credentials, 0 if there are no credentials to delete

Deletes all previously generated credentials for the given `instanceId` and `bindingId`.

### `deleteAllInstanceCredentials(instanceId, callback)`
* `instanceId` - {string} service instance ID
* `callback` - `function(error, result)`
  * `error` - Error object in case of error, `null` or `undefined` otherwise
  * `result` - {object}
    * `deletedCredentials` - number of deleted credentials, 0 if there are no credentials to delete

Deletes all previously generated credentials for the given `instanceId` no matter the binding ID.

### `validateCredentials(username, password, callback)`
* `username` - {string} user name
* `password` - {string} password
* `callback` - `function(error, result)`
  * `error` - Error object in case of error, `null` or `undefined` otherwise
  * `result` - {object}
    * `instanceId`- {string} service instance ID associated with the given credentials
    * `bindingId` - {string} service binding ID associated with the given credentials
    * `serviceId` - {string} (optional) service ID
    * `planId` - {string} (optional) service plan ID
    * `appGuid` - {string} (optional) application guid
    * `subaccountId` - {string} (optional) subaccount ID

Checks if the given credentials match any previously generated credentials. If a match is found,
the `callback` is called with the associated instance ID and binding ID. Otherwise it is called with an error.

**Note:** `serviceId`, `planId` and `appGuid` options will not be provided if:
 * the credentials are generated with versions of SBSS before 1.5.4, or
 * the credentials are generated via the `createCredentials({ instanceId, bindingId }, callback)` call.

**Note:** `subaccountId` will not be provided if:
  * the credentials are generated with versions of SBSS before 1.5.11
  * the credentials are generated with SBSS on HANA
  * the property is not provided in the call to `createCredentials`

## Troubleshooting

To enable debug traces set this environment variable:
```
DEBUG=sbss
```
