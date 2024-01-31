# Auditlog helper
The helper class `auditlog.PdpEventWriter(pdpInstance, auditlog)` writes and formats auditlogs in a standardized way.</br>
It takes as input a pdp instance and an auditlog object.</br>
Optionally a third configuration parameter can be provided to change some of the auditlog message default fields:
```javascript
{
	accessChannel: "", // default "web"
	type: "", // default "AmsPolicyEvaluation"
	tenant: "", // default $PROVIDER
	byUser: "", // default $USER
	dataSubject: {
		type: "", // default application-oauth2-client
		id: { client_id: "" } // retrieved by middleware
	},
	callTransformer: {} => (...)
}
```
Example usage:
```javascript
try {
	auditLogging.v2(xsenv.cfServiceCredentials({ label: "auditlog" }), function(err, auditLog) {
		if (err) {
			console.log("seems like audit log server does not support version 2 of the REST API's");
			console.log(err);
			return;
		}
		try {
			new require("@sap/ams").auditlog.PdpEventWriter(
				amsMiddleware.getPdp(),
				auditLog,
				(err) => { console.error(err); }
			);
		} catch (err) {
			console.log(`Error while auditlogging: ${err.toString()}`);
		}
	});
} catch (err) {
	console.error(`Error creating auditlog: ${err.toString()}`);
}
```
The auditlog message has the following structure:
```json
{
    "uuid": "K5B56B2C214565E0AD64B8B2F0A00A5Y",
    "user": "sb-dsdaod-b482-4439-12kd-deofie!b15517|auditlog!b4",
    "time": "2021-12-10T10:57:05.939Z",
    "channel": "web",
    "object": {
      "type": "AmsPolicyEvaluation",
      "id": {
        "operation": "allow",
        "access": "grant",
        "accessResult": "true",
        "kind": "QUERY",
        "$dcl.action": "read",
        "$dcl.principal2policies.0": "idoqi12-1279-4352-a68d-a9a228a4f1e9",
        "$dcl.principal2policies.1": "dadioo2-5ea3-4c88-9267-e856ef358e6",
        "$env.$user.user_uuid": "dwdwqwi1-3kkd-4c88-9267-e856ef358e6b",
        "$env.$user.email": "alice@sap.com",
        "$env.$user.groups.0": "GROUPE1",
        "$env.$user.groups.1": "GROUPE2"
      }
    },
    "data_subject": {
      "type": "application-oauth2-client",
      "id": {
        "client_id": "f9d28f7f-361e-4728-b5e6-00797ca4b3a1"
      }
    },
    "data_subjects": [],
    "attributes": [
      {
        "name": "access",
        "successful": true
      }
    ],
    "attachments": [],
    "id": "2130149dh-9c17-4a9d-a1da-12ijfoe0",
    "category": "audit.data-access",
    "tenant": "idoqi12-1279-4352-a68d-a9a228a4f1e9",
    "customDetails": {}
}