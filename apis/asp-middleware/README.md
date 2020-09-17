@sap/asp-middleware
==============

<!-- toc -->

- [Overview](#overview)
- [Usage](#usage)
- [Supported Approuter versions](#supported-approuter-versions)
- [Getting Support](#getting-support)

<!-- tocstop -->

## Overview
The `asp-middleware` is an extension for the [@sap/approuter](https://www.npmjs.com/package/@sap/approuter) that enables usage of the *ABAP Solution* Service offered for the *SAP Cloud Platform, ABAP Environment*.

**It takes care of the following:**
- User onboarding for the initial administrator of a new tenant
- Routing to the right tenant url once a user onboarding is completed successfully

## Usage
This module must be loaded as an extension into the [@sap/approuter](https://www.npmjs.com/package/@sap/approuter).


The simplest way to achieve this is:
```javascript
const approuter = require('@sap/approuter');
const ar = approuter();

ar.start({
  extensions: [ require('@sap/asp-middleware') ]
});
```

Furthermore a service instance of service `abap-solution` in plan `standard` must be bound to the approuter application.

## Supported Approuter versions

Supported [@sap/approuter](https://www.npmjs.com/package/@sap/approuter) versions are (meaning every minor version of version 8): `^8.0.0`

It can be installed using: `npm i @sap/approuter@^8`

## Getting Support
Create a BCP Ticket on `BC-CP-ABA-INT`