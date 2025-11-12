
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is `null`. The failure ActionResult is an error message. 

----
## Examples

### Close page
Normal close
```json
{
  "_Type": "Action.Type.ClosePage"
}
```

### Cancel pending actions and close the page
A typical use case is a changeset action execution. When the user closes the last modal page that has a changeset action, all the pending actions in the queue are ended and the modal page is closed.
```json
{
  "_Type": "Action.Type.ClosePage",
  "DismissModal": "Action.Type.ClosePage.Cancel"
}
```

### Close the page only after the pending actions are executed
A typical use case is a changeset action execution. When the user closes the last modal page that has a changeset action, all the pending actions lined up in the queue are executed and only then the modal page is closed.
```json
{
  "_Type": "Action.Type.ClosePage",
  "DismissModal": "Action.Type.ClosePage.Completed"
}
```

### Multiple back navigation
`NavigateBackToPage` will allow the users to navigate back to the defined page. This property accepts the name of the target page as the input (target page name is assigned to `_Name` of the page). If you have multiple pages opened with the same name in the navigation stack, the `NavigateBackToPage` reference will return to the most recent occurance of the specified page name.
Note: `OnReturning` events bound to pages between the current page and the page specified by the `NavigateBackToPage` are not triggered. 
A typical use case is when you are in a product list page with _`Name` as "ProductList" and go through several pages to create an entity. After the entity is created, you want to go back to the product list page directly.
```json
{
  "_Type": "Action.Type.ClosePage",
  "NavigateBackToPage": "ProductList"
}
```
