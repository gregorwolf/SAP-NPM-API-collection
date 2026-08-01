
----
## Action Result
This action does not have a ActionResult.

----
## Examples


```json
// Message.action
{
   "Message": "This is a message.",
   "OKCaption": "Okay",
   "Title": "Attention!!!",
   "_Type": "Action.Type.Message",
   "Sytles": {
    "Dialog": "dialog-style",
    "Title": "dialog-title-style",
    "Message": "dialog-message-style",
    "OKButton": "ok-button-style",
    "CancelButton": "cancel-button-style"
   }
}
```
### Style Classes Definition
```css
.dialog-style {
  background-color:blue;
  text-align:center; /* IOS Only */
}

.dialog-title-style {
  font-color:grey;
  font-size: 30;
  font-style: italic; /* IOS Only */
  font-name: italic; /* IOS Only */
  font-typeface: italic; /* Android Only */
}

.dialog-message-style {
  font-color:red;
  font-size: 5;
  font-style: normal; /* IOS Only */
  font-name: normal; /* IOS Only */
  font-typeface: normal; /* Android Only */
}

.ok-button-style {
  font-color:yellow;
}

.cancel-button-style {
  font-color:red;
}
```