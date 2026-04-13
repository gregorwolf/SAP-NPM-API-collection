

----
## Action Result
This action has no ActionResult.

----
## Examples

```json
// ToastMessage.action
{
    "Message": "This is a toast message test",
    "Icon": "test.png",
    "IsIconHidden": false,
    "NumberOfLines": 2,
    "Duration": 3,
    "Animated": true,
    "_Type": "Action.Type.ToastMessage"
}

// ToastMessage.action with font icon and style example
{
    "Message": "This is a toast message test with font icon styling",
    "Icon": "test.png",
    "IsIconHidden": false,
    "NumberOfLines": 2,
    "Duration": 3,
    "Animated": true,
    "Style": "font-icon-class",
    "_Type": "Action.Type.ToastMessage"
}
```

### Style Classes Definition
```css
.font-icon-class {
  font-size: 4;
  color: red;
}
```