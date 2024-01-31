# Attributes API

## setAction

Parameters:

* `action` ... sets the action String in the Attributes JSON
* returns Attributes Object.

## getAction

* returns the action String specified in the Attributes JSON.

## setResource

Parameters:

* `resource` ... sets the resource String in the Attributes JSON
* returns Attributes Object.

## getResource

* returns the resource String specified in the Attributes JSON.

## setTenant

Parameters:

* `tenant` ... sets the tenant String in the Attributes JSON
* returns Attributes Object.

## getTenant

* returns the tenant String specified in the Attributes JSON.

## setPrincipalToPolicies

Note that all policies entries in Attributes will be removed because only policies or principal2policies can be valid.
It is very important to use the ias scim_id instead of the ias user_uuid.

Parameters:

* `principal2PoliciesArray` ... sets the principal2policies Array in the Attributes JSON, e.g. ["zone_a","scim_id"].
* returns Attributes Object.

## getPrincipalToPolicies

* returns the principalToPolicies array specified in the Attributes JSON. Empty array if not set.

## setPolicies

Note that the policies have to be prefixed with the DCL package(s) e.g. ["ams.readAllSalesOrders"].<br/>
Also note that if principal2policies was set before it will be removed, because only one of the entries can be valid.

Parameters:

* `policiesArray` ... a list of policies
* returns Attributes Object.

## getPolicies

* returns the policies array specified in the Attributes JSON. Empty array if not set.

## setScopeFilterPolicies

This is for scenarios where an additional filters need to be applied.<br/>
Note that the scopeFilterPolicies have to be prefixed with the DCL package(s) same as in `setPolicies`.<br/>
Logically the result is computed by doing an AND to the list of qualifiedPolicies that are combined with OR.

Parameters:

* `scopeFilterPoliciesArray` ... sets scope filtering policies
* returns Attributes Object.

## getScopeFilterPolicies

* returns the scopeFilterPolicies array specified in the Attributes JSON. Empty array if not set.

### getDcl

* returns the dcl JSON specified in the Attributes JSON

## setApp

Parameters:

* `app` ... sets the app section with key value pairs e.g. `{"country": "DE"}`
* returns Attributes Object.

## getApp

* returns the $app section specified in the Attributes JSON

## setEnv

Example:
```javascript
new Attributes()
	.setEnv({
		"$user": {
			"country": "A"
		},
	})
```

* Parameters:

* `env` ... sets the env section with key value pairs same as app
* returns Attributes Object.

## getEnv

* returns the $env section specified in the Attributes JSON

## addUnknowns

Takes an arbitrary number of arrays (AttributeNames) as input.<br/>
Internally transforms the param Arrays to AttributeName Object(s).<br/>
Example:
```javascript
new Attributes().addUnknowns(["$app"], ["$env", "$user"]);
```
Alternatively one can directly use an AttributeName as parameter:
```javascript
new Attributes().addUnknowns(
	AttributeName.fromArray(["$app"]),
	AttributeName.fromArray(["$env", "$user"])
);
```
However it's best practice to use standard types if possible to prevent typo errors:
```javascript
new Attributes().addUnknowns(
	AttributeName.common.APP,
	AttributeName.common.ENV_USER
);
```

* Parameters:

* `unknowns` ... adds all the specified unknowns to the attributes
* returns Attributes Object.


## setUnknowns

Takes one two dimensional array as input.<br/>
Internally transforms the param Arrays to AttributeName Object(s).<br/>
Overwrites the unknowns section in attributes.<br/>
Example:
```javascript
new Attributes().setUnknowns([["$app"], ["$env", "$user"]]);
```
Alternatively one can directly use an AttributeName as parameter:
```javascript
new Attributes().setUnknowns([
	AttributeName.fromArray(["$app"]), 
	AttributeName.fromArray(["$env", "$user"])
]);
```
However it's best practice to use standard types if possible to prevent typo errors:
```javascript
new Attributes().setUnknowns([
	AttributeName.common.APP,
	AttributeName.common.ENV_USER
]);
```


* Parameters:

* `unknowns` ... sets all the specified unknowns in the attributes
* returns Attributes Object.

## getUnknowns

* returns the array of AttributeName Objects

## addIgnores

* same as [addUnknowns](#addunknowns) only for ignore values

## setIgnores

* same as [setUnknowns](#setunknowns) only for ignore values

## getIgnores

* same as [getUnknowns](#getunknowns) only for ignore values

## getJSON

Parameters:

* `stringify` ... unknowns and ignores are stored as AttributeNames if this value is set to true (default), those will get transformed to strings. Otherwise copies of the object are created.
* returns all [Attributes](#attributes) as JSON object and deletes empty properties.

## setTokenInfo

Sets all information that can be retrieved from the token.<br/>
Expects as parameter a tokenInfo object which is provided by the [@sap/xssec](https://www.npmjs.com/package/@sap/xssec) library.<br/>
In additions this function stores the token clientId in the attribute to put it in the auditlog message.<br/>
Sets the following items in the attributes object:
```javascript
{
	"principal2policies": ["zone_id","user_id"],
	"tenant": "zone_id",
	// Default $user definition. This is injected, if no custom $user definition is present
	"$user": {
		"user_uuid": "user_a",
		"groups": ["group1", "group2"],
		"email": "abc@web.de"
	}
}
```

* Parameters:

* `tokenInfo` ... uses the tokenInfo of the xs2sec library
* returns Attributes Object.

## getTokenInfo

* returns the tokenInfo object from [setTokenInfo](#settokeninfo) or **null** if not set
