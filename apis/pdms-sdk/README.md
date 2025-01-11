@sap/pdms-sdk
==============

<!-- toc -->

- [Overview](#overview)
- [Variant API](#variant-api)
- [Config db](#config-db-module)

<!-- tocstop -->

## Overview

This library is intended for enabling the development of custom features and extensions to SAP Predictive Maintenance and Service (PdMS).

### Installation

Make sure that the @sap registry points to `https://npm.sap.com` in your .npmrc or in your npm config settings. Then run:
```
npm install @sap/pdms-variant-api --save
```


## Variant API


This is the node.js based implementation of the pdms variant API.
It is implemented as an express middleware that is easy to consume in the node-based backend of an Analysis Tool.

### Usage

The node-variant-api relies on a security context being present in req.authInfo so that the tenant
information of the HTTP request can be parsed. The easiest way to achieve this is to use the @sap/xssec library (see below). If this is not provided, the API will attempt to create a security context out of the JWT token in the "Authorization" header of the request.

Here is the sample code example in a simple server.js to consume node-variant-api:

```js
const express = require('express');
const xsenv = require('@sap/xsenv');
const passport = require('passport');
const JWTStrategy = require('@sap/xssec').JWTStrategy;


// import the library
const sdk = require('@sap/pdms-sdk');

// get from somewhere the hana credentials, ideally via `xsenv` module (but can also be a json file or whatever).
const configHanaCredentials = xsenv.cfServiceCredentials('myipro-config-hdi');

const app = express();

// Use passport to parse the JWT token from the request and enrich the request object with the authInfo information
passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));
app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

// mount the variant api middleware into /api/v1 and pass the db credentials to it.
app.use('/api/v1', sdk.middleware(configHanaCredentials));

// optionally, default variants can be passed to the middleware. It can be one variant or an array of variants. variantId is created by variantAPI.
app.use('/api/v1', sdk.middleware(configHanaCredentials, <default-variant>));

app.listen(1337, function () {
  console.log(`
    app running on port: 1337.
    Go to http://hostname:1337/api/v1/variants to use the variant API
  `);
});
```


> IMPORTANT NOTE: A pre-requisite for using the node variant API is the use of the [config db module](#config-db-module) to create the necessary database artifacts  used by the variant API.


## Config DB Module

The config-db module is a node module to provide the CDS artifacts for variant configuration tables, which will work out of the box with the variant API (node or java).
This removes the burden on the developer to write or maintain the CDS files for variant configuration tables and also, removes code-redundancy.

It contains the following tables and functions:

- com.sap.pdms.ipro::variants.Config
- com.sap.pdms.ipro::variants.I18n
- com.sap.pdms.ipro::variants.PreConfiguredConfig
- com.sap.pdms.ipro::variants.PreConfiguredI18n
- com.sap.pdms.ipro::variants.OptOutOfPreConfigured
- com.sap.pdms.ipro::variants.GET_CONFIG_FOR_TENANT(tenant VARCHAR(36))
- com.sap.pdms.ipro::variants.GET_I18N_FOR_TENANT(tenant VARCHAR(36))

### Usage

The usage is automatically done by the HDI deployer of a database MTA module. If the @sap/pdms-sdk the is included in the package.json
of the module, the HDI Deployer will pick up all necessary CDS artifact from the module when it is triggered. The HDB Deployer scans
the node_modules/ folder and virtually integrates the src/ and cfg/ folders of the found reusable database module - config-db module into 
the (consuming) database module’s lib/ folder. Reusable database modules are identified by the mandatory src/.hdiconfig file.

```JSON
{
	"name": "db",
	"dependencies": {
		"@sap/hdi-deploy": "3.1.2",
		"@sap/pdms-sdk": "0.0.1"
	},
	"scripts": {
		"start": "node node_modules/@sap/hdi-deploy/deploy.js"
	}
}
```

It is likely that an `.hdiignore` file will be needed to ignore additional files found by HDI Deploy that should
not be deployed to the database. The `.hdiignore` file works just like `.gitignore` and should be located in the 
root of you db module.
