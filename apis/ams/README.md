# cloud-authorization-client-library-nodejs

The content of this repository is used to leverage the Cloud Authorization Service (AMS).<br/>
It offers runtime support to make calls to the AMS service and supports the distribution of policy dcl’s to AMS.<br/>
More information about the AMS project can be found in the [knowledge base](https://github.wdf.sap.corp/pages/CPSecurity/Knowledge-Base/13_AuthorizationManagementService(AMS)/AMS_basics/) of CP-Security.<br/>
As policy engine Open Policy Agent ([OPA](https://www.openpolicyagent.org/)) is used.<br/>
A test application where this library is used can be viewed [here](https://github.wdf.sap.corp/CPSecurity/cloud-authorization-nodejs-testapp).<br/>
There's also a dedicated section with more documentation about [Node AMS developer tools](doc/DeveloperTools.md), such as features for local development.

## CAP integration
See [CAP Integration README](./lib/cap/README.md).

## Installation
To install the library:
```
npm install git+https://github.wdf.sap.corp/CPSecurity/cloud-authorization-client-library-nodejs
```
or
```
npm config set @sap:registry https://int.repositories.cloud.sap/artifactory/api/npm/build-releases-npm/
npm install npm install @sap/ams
```

## Examples
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

The [Attributes class](doc/API/Attributes.md) wraps the input data for the OPA.<br/>
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
More general information about the structure of this JSON can be found [here](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLRuntime.md).<br/>
An Attributes object can be defined as:
```javascript
const attr = new Attributes()
	.setAction("read")
	.setPolicies(["ams.readAllSalesOrders"])
	.setResource("salesOrder")
	.setApp({"country": "DE"});
```
Note: Only principal2policies or policies can be set. The other one will be deleted.<br/>
Further information on how to create Attributes can be viewed in the [tests](https://github.wdf.sap.corp/CPSecurity/cloud-authorization-client-library-nodejs/blob/master/test/unit/attributes_test.js).<br/>

### Policy Decision Point

The Policy Decision Point (PDP) is responsible for communicating with the OPA.<br/>
Per default the URL of the opa is set to *127.0.0.1:8181* otherwise the default URL can be set via the environment variable *OPA_URL*.<br/>
Lastly the OPA URL can be passed to the constructor of the Policy Decision Point if a connection to multiple different OPA servers is desired.<br/>
[Here](doc/API/PolicyDecisionPoint.md) is the full API documentation of the PDP.

### AttributeName

[AttributeName](doc/API/AttributeName.md) is a special type to store unknown and ignore values.<br/>
A more detailed description can be found in the [Attributes documentation](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLRuntime.md#attribute-structure-and-naming).

### Call

The [Call class](doc/API/Call.md) wraps a condition JSON returned from `pdp.allowFilterClause()`.<br/>
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
The Call API contains functionalities which should make working with big condition results easier.<br/>
First the allowFilterClause condition is transformed into a `Call` object:
```javascript
const filterClause = await pdp.allowFilterClause(attributes);
const call = Call.fromCondition(filterClause.condition);
```
In the most common cases one wants to transform the condition into a sql like statement.<br/>
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
const principle = new Principle(app_tid, scim_id); // app_tid, scim_id taken from IAS id token

const roles = await rp.getRoles(principle);
```

Only one RolesProvider instance needs to be constructed and can be used to get roles of different users.

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

$$U = {M \over 2*R*S + 84}$$

### Express Middleware

The express middleware got introduced to simplify working with web apps in combination with AMS.<br/>
A full example is described in the [ams node test application](https://github.wdf.sap.corp/CPSecurity/cloud-authorization-nodejs-testapp/blob/master/node-webserver/index.js).<br/>
To check weather a user has authority read (is there a rule with "GRANT read ON *;" assigned to this user) on the endpoint `/read` the `hasAuthority()` middleware API can be used:
```javascript
app.get("/read", [requireAuthentication, middleware.hasAuthority("read")], (req, res) => {
  res.send("User is allowed to read");
})
```
This is intended to achieve a similar use as in the [ams-java lib](https://github.wdf.sap.corp/CPSecurity/cloud-authorization-client-library-java/tree/acdde19f241832ba6917f322f9215a64948746cf/spring-ams) with spring annotations.<br/>
Note that the request object has to be extended with authentication tokenInfo before calling `hasAuthority()`.<br/>
This can be easily achieved when using the passport lib and JWTStrategy from the `@sap/xssec` library.<br/>
If a middleware returns false or fails an error will be thrown otherwise the next handler is called.<br/>
Here's the full [middleware API](doc/API/Middleware.md).

## Logging

The Node AMS library does **no** logging.<br/>
But theres's a guide on [how to log Policy Decision Point results](doc/Logging/LogPdp.md) and/or perform [auditlogging](doc/Logging/AuditLog.md).

## Troubleshoot

- If policies created under a custom package do not work, check if the tenant is set correctly in the attributes

## Resources

### Reporting Incidents

As registered SAP customers, report your issue in creating an incident for component **BC-CP-CF-SEC-LIB** on the [SAP Support Portal][SAPOSS]

See also [Getting Support][SAP_GS] in the SAP BTP documentation.

### Open Source Legal Notices

[SAP Cloud Identity 1.0][SSCI10]

[SAPOSS]: https://support.sap.com/en/index.html
[SAP_GS]: https://help.sap.com/docs/btp/sap-business-technology-platform/btp-getting-support
[SSCI10]: https://support.sap.com/content/dam/launchpad/en_us/osln/osln/67837800100900008826_20170821125934.pdf

## How to get access to CheckmarxOne (CxONE)
- Apply for the ARM request via this [Authorization Link](https://sapit-home-prod-004.launchpad.cfapps.eu10.hana.ondemand.com/site#arm-Create&/createRequest/prefilled?system=ADS_GLB&role=CHECKMARX_Prod_User_Access)
- Once your request is approved, please ask CxOne app owners to provide authorization to your user in the [CxOne App](https://checkmarx.tools.sap/applications/6d80515f-6466-453c-992b-ed88b8a18b5f/settings)
- As soon as you have access to CxOne, you can login to the [CxOne Portal](https://checkmarx.tools.sap) and check the scan results based on your branch.
