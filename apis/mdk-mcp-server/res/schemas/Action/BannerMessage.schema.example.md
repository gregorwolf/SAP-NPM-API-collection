
----
## Action Result

This action has no ActionResult.

----
## Examples

```json
// BannerMessage.action
{
    "Message": "Message in a banner.",
    "Duration": 15,
    "Animated": true,
    "ActionLabel": "$(PLT,'Click to retry.','Retry')",
    "OnActionLabelPress": "/path/to/ConfirmMessage.action",
    "DismissBannerOnAction": true,
    "_Type": "Action.Type.BannerMessage"
}

// BannerMessage.action with Semantic and Styles
{
    "Message": "Message in a banner.",
    "Duration": 15,
    "Animated": true,
    "ActionLabel": "$(PLT,'Click to retry.','Retry')",
    "OnActionLabelPress": "/path/to/ConfirmMessage.action",
    "DismissBannerOnAction": true,
    "Semantic": "Negative",
    "Styles": {
        "Banner": "banner-class",
        "MessageText": "message-text-class",
        "ActionLabel": "action-label-class",
        "DismissButton": "dismiss-button-class"
    },
    "_Type": "Action.Type.BannerMessage"
}
```
### Style Classes Definition
```css
.banner-class {
    background-color: green;
    border-top-color: blue; /* iOS only */
}

.message-text-class {
    font-color: red;
    font-style: body;  /* iOS Only */
    font-typeface: bold;  /* Android Only */
}

.action-label-class { /* Android Only */
    background-color: black;
    font-color: white;
    font-typeface: bold;
    font-size: 16;
}

.dismiss-button-class {
    background-color: black; /* Android Only */
    font-color: white;
    font-typeface: bold; /* Android Only */
    font-size: 16; /* Android Only */
}
```