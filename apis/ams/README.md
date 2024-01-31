<!-- This is the README for npmjs -->

# @sap/ams

This is the Node.Js runtime library used to perform [authorization checks](https://help.sap.com/docs/identity-authentication/identity-authentication/configuring-authorization-policies?locale=en-US) in applications which authenticate users via the [SAP Cloud Identity Services](https://help.sap.com/docs/identity-authentication?locale=en-US).

The module [@sap/ams-dev](https://www.npmjs.com/package/@sap/ams-dev) provides the corresponding tooling support during application development.

As ADC (Authorization Decision Controller) the policy engine [OPA](https://www.openpolicyagent.org/) (Open Policy Agent) is used.


## Installation
Via public [npmjs](https://www.npmjs.com/) repository:
```
npm install @sap/ams
```


## Usage examples
Basic allow request on resource *salesOrders* with action *read*:
```javascript
const pdp = new PolicyDecisionPoint();
const attr = new Attributes();
attr.setAction("read")
	.setResource("salesOrders")
	.setPolicies(["sales.readAllSalesOrders"])
let isAllowedRead = await this.pdp.allow(attr);
```
Basic allowFilterClause request with unknown *$env.$user*:
```javascript
const pdp = new PolicyDecisionPoint();
const attr = new Attributes();
attr.setAction("read")
	.setResource("salesOrders")
	.setPolicies(["sales.readAllSalesOrders"])
	.addUnknowns(AttributeName.common.APP, AttributeName.common.ENV);
const filterClause = await this.pdp.allowFilterClause(attr);
```


## API Description

### Attributes

The `Attributes` class (*see* `doc/API/Attributes.md`) wraps the input data for the OPA.\
Internally a JSON object is created which could look approximately as follows:
```json
{
	"$dcl": {
		"action":                "read",
		"resource":              "SalesOrder",
		"tenant":                "12345",
		"principal2policies":    ["zone_a","user_a"],
	},
	"$app": {
		"country": "DE"
	},
	"$env": {

	},
	"unknowns": [
		"$app.SalesID"
 	],
	 "ignores": [
		 "input[\"$dcl\"][\"resource\"]"
	]
}
```


An Attributes object can be defined as follows:
```javascript
const attr = new Attributes()
	.setAction("read")
	.setPolicies(["ams.readAllSalesOrders"])
	.setResource("salesOrder")
	.setApp({"country": "DE"});
```
Note: Only principal2policies **or** policies can be set. The other one will be overridden.\

### Policy Decision Point

The `PolicyDecisionPoint` or PDP (*see* `doc/API/PolicyDecisionPoint.md`) is responsible for communicating with OPA.

Per default, the URL of the OPA server is set to *127.0.0.1:8181*. This URL can be set via the environment variable *OPA_URL*.\
Alternatively, the URL can be passed to the constructor of the Policy Decision Point if a connection to multiple different OPA servers is desired.

### AttributeName

`AttributeName` (*see* `doc/API/AttributeName.md`) is a special type to store unknown and ignore values.

### Call

The `Call` class (*see* `doc/API/Call.md`) wraps a condition JSON returned from `pdp.allowFilterClause()`.\
In addition it wraps an enum `Call.type`:
```javascript
{
	AND:         "and",
	OR:          "or",
	EQ:          "eq",
	GT:          "gt",
	...
}
```
The Call API contains functionalities which should make working with big condition results easier.\
First the allowFilterClause condition is transformed into a `Call` object:
```javascript
const filterClause = await pdp.allowFilterClause(attributes);
const call = Call.fromCondition(filterClause.condition);
```
In the most common cases one wants to transform the condition into a sql like statement.\
Therefore a transform function has to be defined:
```javascript
function transformToSQL(item) {
	if (Call.isCall(item)) {
		switch (item.getType()) {
		case Call.types.EQ: {
			const callChildren = [ "(", item.getArgument(0), " = ", item.getArgument(1), ")" ];
			return callChildren;
		}
		case Call.types.OR: {
			...
		}
		case Call.types.LT: {
			...
		}}
		...
	}
	else if (AttributeName.isAttributeName(item)) {
		return item.toString();
	}
}
```
This transform function will then be recursively applied on the Call object:
```javascript
const sqlString = Call.transform(call, transformToSQL);
```

### RolesProvider

An instance of the `RolesProvider` class can be used to evaluate the roles (or scopes) of a user based on policies of the following form:

```
GRANT <role> ON $SCOPES;
```

To get an `Array<String>` of a user's roles, call `getRoles` on a previously constructed instance of RolesProvider:

```javascript
const pdp = new PolicyDecisionPoint();
const rp = new RolesProvider(pdp);
const principle = new Principle(app_tid, scim_id); // app_tid, scim_id taken from SAP Identity Service token

const roles = await rp.getRoles(principle);
```

Only one RolesProvider instance needs to be constructed and can be used to subsequently get the roles of different users.

### RolesCache
A RolesProvider can use an optional `RolesCache` to improve the performance of subsequent role evaluations for the same user.
It has the following configuration parameters:
- **TTL** [ms] (time-to-live): the lifetime of cache entries. Specifies how long the cached roles of a given user are used without evaluating them again via the ADC. If set too high, administrative changes of a user's policy assignments or changes in policies might affect the application's behavior with a high delay which reduces overall security.\
Default: **1 minute**
- **limit**: maximum number of simultaneous cache entries. The cache follows a FIFO strategy: if necessary, the oldest cache entry is removed to make space for a new entry.\
Default: **10000**

A RolesCache can be constructed and used by a RolesProvider as follows:
```javascript
const rc = new RolesCache(10 * 60 * 1000, 1E6); // 10 min TTL and 100k users max
const rp = new RolesProvider(pdp).withRolesCache(rc);
```

#### RolesCache Sizing Guide
The memory consumed by the RolesCache can be estimated with the following formula:

```
Memory [Byte] = U*R*(2*S) + 84*U

U: #Users
R: #Roles per user
S: String length of role name
```

It is only an estimate and should be correct up to a factor of 2. Please use it only to get an understanding for the order of magnitude of the memory consumption.
Use `avg`, `min` or `max` values of the input parameters to get a memory estimation for the scenario that is most important to you.

The following table gives a quick reference of expected memory consumption:
| U (Users) | R (Roles) | S (String length) | Memory |
|----------:|----------:|------------------:|-------:|
|        1k |        10 |                20 |    1MB |
|        1k |        50 |                30 |    3MB |
|       10k |        10 |                20 |    5MB |
|      100k |        15 |                20 |   70MB |
|      100k |        50 |                10 |  100MB |
|      100k |        50 |                30 |  300MB |
|        1m |        25 |                20 |    1GB |

To compute a suitable user limit for your cache given a fixed amount of memory `M`, you can estimate it with the following formula:

$$U = \frac{M}{2 * R * S + 84}$$

### Express Middleware

The authorization checks can be performed by the provided express `middleware` (*see* `doc/API/Middleware.md`).

For example, to restrict the `/read` endpoint to users with `read` authority:
```javascript
const { middleware } = require('@sap/ams');

app.get("/read", [requireAuthentication, middleware.hasAuthority("read")], (req, res) => {
  res.send("User is allowed to read");
})
```

Note that the `req` object has to be extended with a `tokenInfo` object from  [@sap/xssec](https://www.npmjs.com/package/@sap/xssec) before calling `hasAuthority`.\
This can be achieved by registering the middleware after the passport middleware of @sap/xssec.

If a middleware returns false or fails an error will be thrown otherwise the next handler is called.


## CAP integration

This module provides a runtime plugin for [CAP](https://cap.cloud.sap/docs/guides/authorization) (Cloud Application Programming Model) applications which is documented in `docs/CapIntegration.md`.


## Logging

The Node AMS library does **no** logging.\
But theres's a guide on **how to log Policy Decision Point results** (*see* `doc/Logging/LogPdp.md`) and/or perform **auditlogging** (*see* `doc/Logging/AuditLog.md`).


## Resources

### Reporting Incidents

As registered SAP customers, report your issue in creating an incident for component **BC-CP-CF-SEC-LIB** on the [SAP Support Portal][SAPOSS]

See also [Getting Support][SAP_GS] in the SAP BTP documentation.

### Open Source Legal Notices

[SAP Cloud Identity 1.0][SSCI10]

[SAPOSS]: https://support.sap.com/en/index.html
[SAP_GS]: https://help.sap.com/docs/btp/sap-business-technology-platform/btp-getting-support
[SSCI10]: https://support.sap.com/content/dam/launchpad/en_us/osln/osln/67837800100900008826_20170821125934.pdf