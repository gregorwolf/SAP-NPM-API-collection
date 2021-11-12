@sap/asp-middleware
==============

<!-- toc -->

- [@sap/asp-middleware](#sapasp-middleware)
	- [Overview](#overview)
	- [Usage](#usage)
		- [Approuter Middleware](#approuter-middleware)
		- [ABAP Solution Runtime Client](#abap-solution-runtime-client)
			- [Get Tenant](#get-tenant)
		- [Configuration](#configuration)
			- [Custom User Onboarding Path](#custom-user-onboarding-path)
	- [Supported Approuter versions](#supported-approuter-versions)
	- [Getting Support](#getting-support)

<!-- tocstop -->

## Overview
The `asp-middleware` is an extension for the [@sap/approuter](https://www.npmjs.com/package/@sap/approuter) that enables usage of the *ABAP Solution* Service offered for the *SAP Cloud Platform, ABAP Environment*.

**It takes care of the following:**
- User onboarding for the initial administrator of a new tenant
- Routing to the right tenant url once a user onboarding is completed successfully

## Usage

### Approuter Middleware

This module must be loaded as an extension into the [@sap/approuter](https://www.npmjs.com/package/@sap/approuter).


The simplest way to achieve this is:
```javascript
const approuter = require('@sap/approuter');
const ar = approuter();

ar.start({
  extensions: [ require('@sap/asp-middleware') ]
});
```

### ABAP Solution Runtime Client

The AspRuntimeClient allows you to communicate with the ABAP Solution Service to get information about your tenants.

```javascript
const AspRuntimeClient = require('@sap/asp-middleware/asp-runtime-client');

const client = AspRuntimeClient.getInstance();
const tenant = client.getTenant({
  consumerZoneId: '<consumer-zone-id>'
})
```

#### Get Tenant

The parameter *consumerZoneId* is passed to you during the getDependency call (as *tenantId* URL parameter) and the onSubscription call (as *subscribedTenantId* in the body), that is by default handled by the approuter component, but can also be implemented manually.

The getTenant call results in a Promise of a Tenant object, which has the following fields:

| Name | Description |
|---|---|
| tenantHost | The host of the ABAP tenant corresponding to this consumer |
| consumerZoneId | The zone ID of the consumer (as passed into the getTenant call) |
| abapServiceInstanceId | The service instance ID of the ABAP service instance the tenant is located on | 
| abapTenantId | The id of the ABAP tenant itself |

### Configuration

A service instance of service `abap-solution` in plan `standard` must be bound to the approuter application.

As a last step the `xs-app.json` must be configured to route to the `abap-solution` service. As a minimum this results in the following `xs-app.json` file:
```json
{
	"authenticationMethod": "route",
	"welcomeFile": "/ui",
	"logout": {
		"logoutEndpoint": "/public/logout",
		"logoutPage": "/ui"
	},
	"routes": [
		{
			"source": "^/sap/(.*)$",
			"target": "/sap/$1",
			"authenticationType": "xsuaa",
			"service": "com.sap.cloud.abap.solution",
			"csrfProtection": false
		},
		{
			"source": "^/ui(.*)$",
			"target": "/ui$1",
			"authenticationType": "xsuaa",
			"service": "com.sap.cloud.abap.solution",
			"csrfProtection": false
		}
	]
}
```

#### Custom User Onboarding Path

By configuring an environment variable called ASP_USER_ONBOARDING_PATHS, the application can decide, which paths should be intercepted for the onboarding of the initial user in the ABAP tenant. By default this is only /ui as this is the path to the ABAP Fiori Launchpad.

The variable should be configured as a JSON array. E.g. 

```json
["/path/to/entry_point_1","/path/to/entry_point_2"]
```

## Supported Approuter versions

Supported [@sap/approuter](https://www.npmjs.com/package/@sap/approuter) versions are (meaning every minor version of version 8): `^8.0.0`

It can be installed using: `npm i @sap/approuter@^8`

## Getting Support
Create a BCP Ticket on `BC-CP-ABA-INT`
