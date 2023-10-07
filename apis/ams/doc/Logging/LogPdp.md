# How to log PDP results
For each pdp request an event is emitted.<br/>
The events are triggered by the [Policy Decision Point](../API/PolicyDecisionPoint.md).<br/>
All available events are placed in `require("@sap/ams").PolicyEventName`:

* `ANY` register on this event to capture all PDP events
* `POLICY_EVALUATION` receive all events of type ALLOW and ALLOW_PARTIAL
* `ALLOW` receive events for the function `pdp.allow(...)`
* `ALLOW_PARTIAL`  receive events for the function `pdp.allowFilterClause(...)`
* `PING` receive events for the function `pdp.ping(...)`
* `GET_VERSION` receive events for the function `pdp.getVersion()`

The events can for example be used for logging results:
```javascript
const logAllowResult = (evaluationResult) => { console.log(JSON.stringify(evaluationResult)); };
pdp.on(PolicyEventName.ALLOW, logAllowResult);
```

The JSON parameter *evaluationResult* which is passed to the event handler has the following structure:
```javascript
{
	"operation": String, // Name of the event (e.g. allow or allowPartial)
	"pdpURL": String, // URL of the Policy Decision Point to which the request was sent
	"result": Boolean or Error, // response from pdp
	"httpBody": JSON, // body sent to the pdp
	"attributes": JSON, // attributes sent to the pdp
	"dclPackage": String, // in allow or allowFilterClause specified DCL package
	"isSucceeded": Boolean // has an error been thrown in the request or not
}
```