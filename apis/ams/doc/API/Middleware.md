# Express Middleware API

## isAllowed
Checks if a user is allowed regarding the given attributes

Parameters:

* `attributes` ... Attributes object which is passed to the allow request
* `addPrincipal` ... boolean if true adds if true adds token user info (principal2policy) to attributes

## hasAuthority
This check can only be applied for very trivial policies e.g.: POLICY myPolicy { GRANT action ON *; }.

Parameters:

* `action` ... action String
* returns next() if the authenticated user has the permission to perform the given action.

## hasBaseAuthority

Parameters:

* `action` ... action String
* `resource` ... resource String
* returns next() if the authenticated user has in principal the permission to perform a given action on a given resource. It's also allowed to use a '*' to be less restrictive.

## forAction

Parameters:

* `action` ... action String
* `app` ... restrict to attributes by providing one or more attributes in the parameter app e.g. {"CountryCode": "GB", "salesOrderId": 233}.
* Returns next(), if the user is authorized to perform a dedicated action. The resource in the DCL rules need to be declared as * for this case.
If the DCL rules depend on attributes that are not automatically filled (either by default or an AttributesProvider) then their values need to be provided as additional attributes arguments.

## forResource

Parameters:

* `resource` ... resource String
* `app` ... Optionally you can restrict to attributes by providing additional key, value pairs via the parameter app
* returns next(), if the user is authorized to access the given resource. The action in the DCL rules need to be declared as * for this case.
If the DCL rules depend on attributes that are not automatically filled (either by default or an AttributesProvider) then their values need to be provided as additional attributes arguments.

## forResourceAction

Parameters:

* `resource` resource String
* `action` action String
* `app` ... restrict to attributes by providing additional key, value pairs via the parameter app
* returns next(), if the user is authorized to perform a dedicated action on the given resource.
If the DCL rules depend on attributes that are not automatically filled (either by default or an AttributesProvider) then their values need to be provided as additional attributes arguments.

## getPdp

This function is used for retrieving further information by registering on the Policy Decision Point instance events (see [Event Listener](../Logging/LogPdp.md)).<br/>
Example:
```javascript
const pdp = middleware.getPdp();
pdp.on(EventNames.POLICY_EVALUATION, (evaluationResult) => {
	console.log(evaluationResult)
});
middleware.hasAuthority("view");
```

* returns the Policy Decision Point instance used in the middleware
