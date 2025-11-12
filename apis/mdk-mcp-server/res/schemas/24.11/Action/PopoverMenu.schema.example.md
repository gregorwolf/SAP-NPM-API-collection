
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is the `OnPress` action result of the pop-over item. The failure ActionResult is an error message.

----
## Examples

```json
// Popover.action
{
  "Title": "Leave request actions",
  "Message": "Select one action from the list",
  "TextAlignment": "Right",
  "IconPosition": "Trailing",
  "PopoverItems": [
    {
      "Title": "Approve",
      "Icon": "approve.png",
      "TextAlignment": "Left",
      "OnPress": "/MDKApp/Actions/UpdateService.action",
    },
    {
      "Title": "Reject",
      "Icon": "reject.png",
      "TextAlignment": "Right",
      "OnPress": "/MDKApp/Actions/FailureMessage.action",
    },
  ],
  "_Type": "Action.Type.Popover"
}

// Popover menu with styling
{
  "Title": "Leave request actions",
  "Message": "Select one action from the list",
  "Styles": {
    "Title": "popover-title-style",
    "Message": "popover-message-style",
    "PopoverMenu": "background-critical"
  },
  "PopoverItems": [
    {
      "Title": "Approve",
      "Icon": "sap-icon://product",
      "Styles": {
        "Title": "popover-action-title-style1",
        "Icon": "popover-action-icon-style1"
      },
      "OnPress": "/MDKApp/Actions/UpdateService.action",
    },
    {
      "Title": "Reject",
      "Icon": "font://&#xe078;",
      "Styles": {
        "Title": "popover-action-title-style2",
        "Icon": "popover-action-icon-style2"
      },
      "OnPress": "/MDKApp/Actions/FailureMessage.action",
    },
  ],
  "_Type": "Action.Type.PopoverMenu"
}
```

### Style Classes Definition
```css
.popover-title-style {
  font-size: 22;
  font-color: red;
}

.popover-message-style {
  font-size: 14;
  font-color: blue;
  font-name: italicSystem;
  font-style: italic;
  font-typeface: italic;
}

.popover-action-title-style1 {
  font-color: red;
}

.popover-action-title-style2 {
  font-color: blue;
}

.popover-action-icon-style1 {
  font-size: 20;
  color: red;
  background-color: rgb(255, 0, 200);
}

.popover-action-icon-style2 {
  font-size: 20;
  color: blue;
  background-color: yellow;
}


```