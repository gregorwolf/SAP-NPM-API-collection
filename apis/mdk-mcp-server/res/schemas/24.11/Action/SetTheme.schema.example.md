
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is the theme name applied. The failure ActionResult is an error message.

----
## Examples

```json
{
	"_Type": "Action.Type.SetTheme",
	"Theme":"#Page:StyleExamples/#Control:lprStyleAction/#SelectedValue",
	"ActionResult":{
		"_Name": "_setTheme"
	},
	"OnFailure":"/MDKDevApp/Rules/Styles/HandleInvalidTheme.js"
}
```

```js
function setAppTheme(context) {
  try {
      context.setTheme(selectedTheme);
  } catch (error) {
    let message = error.message;
    let title = 'SetTheme Failed';
    alert({'errorMessage':title+':'+message});
  }
}
```