
----
## Action Result

This action does not have an ActionResult.

----
## Examples

```json
// ProgressBanner.action
{
  "Message": "Sync in Progress.",
  "CompletionMessage": "Sync Complete.",
  "CompletionTimeout": 5,
  "OnSuccess": "/path/to/SyncRuleCode.js",
  "ActionLabel": "$(PLT,'Click to retry.','Retry')",
  "OnActionLabelPress": "/path/to/ConfirmMessage.action",
  "CompletionActionLabel": "$(PLT,'Show details.','Details')",
  "OnCompletionActionLabelPress": "/path/to/ToastMessage.action",
  "DismissBannerOnAction": false,
  "_Type": "Action.Type.ProgressBanner",
}

// ProgressBanner.action with Semantic and Styles
{
    "Message": "Sync in Progress.",
    "CompletionMessage": "Sync Complete.",
    "CompletionTimeout": 5,
    "OnSuccess": "/path/to/SyncRuleCode.js",
    "ActionLabel": "$(PLT,'Click to retry.','Retry')",
    "OnActionLabelPress": "/path/to/ConfirmMessage.action",
    "CompletionActionLabel": "$(PLT,'Show details.','Details')",
    "OnCompletionActionLabelPress": "/path/to/ToastMessage.action",
    "DismissBannerOnAction": false,
    "Semantic": "Tint",
    "CompletionSemantic": "Negative",
    "Styles": {
      "Banner": {
        "Progress": "banner-class-1",
        "Completion": "banner-class-2",
      },
      "MessageText": {
        "Progress": "message-text-class-1",
        "Completion": "message-text-class-2"
      },
      "ActionLabel": {
        "Progress": "action-label-class-1",
        "Completion": "action-label-class-2"
      },
      "DismissButton": {
        "Progress": "dismiss-button-class-1",
        "Completion": "dismiss-button-class-2"
      }
    },
    "_Type": "Action.Type.ProgressBanner",
}
```

```js
// SyncRuleCode.js (not needed, just to show how a rule can be interwined at any time)
function SyncRule(clientAPI) {
  clientAPI.showProgressBanner("Uploading...");
  return clientAPI.executeAction("/path/to/ODataUpload.action");
}
```

### Style Classes Definition
```css
.banner-class-1 {
    background-color: green;
    border-top-color: blue; /* For Android, applicable to Progress state only */
}

.message-text-class-1 {
    font-color: red;
    font-style: body;  /* iOS Only */
    font-typeface: bold;  /* Android Only */
}

.action-label-class-1 { /* Android Only */
    background-color: black;
    font-color: white;
    font-typeface: bold;
    font-size: 16;
}

.dismiss-button-class-1 {
    background-color: black; /* Android Only */
    font-color: white;
    font-typeface: bold; /* Android Only */
    font-size: 16; /* Android Only */
}
```