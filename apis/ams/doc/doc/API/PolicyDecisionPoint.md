# Policy Decision Point API

## allow

Checks if access can be granted.<br/>
The DCL package must hereby exist (uses default DCL package if not specified).<br/>
Ignore elements are removed as if they where not present in the DCL rules.<br/>
In the past it was possible to specify a dcl package name as optional parameter in the allow function.<br/>
However this does not work in combination with admin policies created in a multi-tenancy scenario.<br/>
Admin policies are stored in a different package.<br/>
Specifying a dcl package, ignores the admin policies in turn.

* Parameters:

* `attributes` ... the [Attributes](#attributes) object which specifies the request
* returns Boolean

## allowFilterClause

Computes the FilterClause.<br/>
The unknown [Attributes](#attributes) determine which elements should be in the filter clause.<br/>
Ignore elements are removed as if they where not present in the DCL rules.<br/>
This request will never respond with a DCL error instead false will be returned.<br/>
Just like in the allow function it is no longer possible to specify a dcl package name as parameter because of admin policies created in a multi-tenancy scenario.

* Parameters:

* `attributes` ... the [Attributes](#attributes) object which specifies the request
* returns a javascript object with fields: condition, unknowns and ignores, for example:
```json
{
	"condition": {
		"call":"eq","args":[{"ref":["$app","country"]},"Germany"]
	},
	"unknowns": ["$app.country"],
	"ignores": []
}
```

## isReachable

As health endpoint <code>pdp.isReachable()</code> can be used since this function only returns true or false depending on wether the opa is up and running.<br/>
This method does not throw any. If the reason for a failure needs to be known use [ping](#ping) with the required DCL package of your application.

* returns Boolean

## getHealthStatus
Determines the health status of the pdp

* return {Promise<PolicyDecisionPoint.HealthState>}

## startupCheck
Resolves when pdp is healthy (getHealthStatus = "OK")

* Parameters:

* `timeout` ... timeout in milliseconds until the pdp must resolve
* `failOnStartupCheck` ... throws error if state not HealthState.OK (default true)

* return {Promise<PolicyDecisionPoint.HealthState>}

## ping

Tests for existence of the dclPackage (default if not provided) and implicitly checks the connectivity to the runtime.

* Parameters:

* `dclPackage` ... optional parameter for setting the DCL package name
* returns Boolean if ping was successful otherwise throws error

## getVersion

Get the version of the PolicyDecisionPoint runtime implementation.<br/>
The format is not guaranteed. It may change between versions and different implementations.

* returns Boolean if ping was successful otherwise throws error