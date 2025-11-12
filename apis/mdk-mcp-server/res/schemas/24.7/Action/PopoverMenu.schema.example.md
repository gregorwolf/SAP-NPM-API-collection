
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
  "PopoverItems": [
    {
      "Title": "Approve",
      "Icon": "approve.png",
      "OnPress": "/MDKApp/Actions/UpdateService.action",
    },
    {
      "Title": "Reject",
      "Icon": "reject.png",
      "OnPress": "/MDKApp/Actions/FailureMessage.action",
    },
  ],
  "_Type": "Action.Type.Popover"
}

// Popover.action with font icon and styling
{
  "Title": "Leave request actions",
  "Message": "Select one action from the list",
  "PopoverItems": [
    {
      "Title": "Approve",
      "Icon": "sap-icon://product",
      "Style": "font-icon-class",
      "OnPress": "/MDKApp/Actions/UpdateService.action",
    },
    {
      "Title": "Reject",
      "Icon": "font://&#xe078;",
      "Style": "font-icon-class",
      "OnPress": "/MDKApp/Actions/FailureMessage.action",
    },
  ],
  "_Type": "Action.Type.PopoverMenu"
}
```

### Style Classes Definition
```css
.font-icon-class {
  font-size: 4;
  color: red;
}
```