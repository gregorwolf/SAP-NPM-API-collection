
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is a message containing the version (and revision) or a text message for

1. Current version is already up to date
2. AppUpdate feature is not enabled or no new revision found

The failure ActionResult is an error message.

----
## Examples


```json
{
    "_Type": "Action.Type.ApplicationUpdate",
    "ActionResult": {
      "_Name": "AppUpdate"
    },
    "OnSuccess": "/MyMDKApp/Rules/AppUpdateSuccessResult.js",
    "OnFailure": "/MyMDKApp/Actions/OnFailure.action"
}
```

```js
export default function AppUpdateSuccessResult(clientAPI) {
  let actionResult = clientAPI.getActionResult('AppUpdate');
  if (actionResult) {
    let result = actionResult.data;
    if (result.startsWith('Current version is already up to date')) {
      let versionNum = result.split(': ')[1];

      return clientAPI.getPageProxy().executeAction({
        "Name": "/MyMDKApp/Actions/GenericToastMessage.action",
        "Properties": {
          "Message": `Current version: ${versionNum} is already up to date`
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MyMDKApp/Actions/GenericToastMessage.action",
        "Properties": {
          "Message": result
        }
      });
    }
    // New version found don't display any message, OnWillUpdate will fire
  }
}
```

```json
{
  "_Type": "Action.Type.Message",
  "Message": "#ActionResults:AppUpdate/#Property:error",
  "Title": "Error",
  "OKCaption": "OK"
}
```
