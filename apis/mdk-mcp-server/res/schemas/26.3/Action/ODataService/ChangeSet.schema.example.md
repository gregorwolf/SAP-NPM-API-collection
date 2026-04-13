
----
## Action Result
There is no ActionResult for this action.

----
## Examples

Note: A typical use case is to have the one action start a chain of actions. In this example,navigating to Page One will chain a series of actions that would validate and apply the changes made to an object displayed on that page. Assuming all actions are completed successfully and the user doesn't cancel the next action in the array is executed.

The supported OData actions in a changeSet can be committed. 

The following OData actions are supported in a change set:

Mobile and Web platforms

- Create entity
- Update entity
- Delete entity
- Create related entity

Mobile platforms only

- Create Media entity
- Create related Media entity
- Upload Media entity
- Delete Media entity
- Upload Stream entity
- Call Function entity (only supports the execution of ActionImport and not FunctionImport)

### Multi-page

```json
{
  "_Type": "Action.Type.ChangeSet",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service"
  },
  "Actions": [
    "/MyMDKApp/Actions/ChangeSet/NavigateToPageOne.action",
    "/MyMDKApp/Rules/ChangeSet/NavigateToPageTwo.js"
  ],
  "Headers": {
    "MDK-Header": "MDK"
  }
}
```

```js
export default function NavigateToPageTwo(pageProxy) {
  return pageProxy.executeAction('/MyMDKApp/Actions/ChangeSet/NavigateToPageTwo.action')
}
```

### Multi-page with failure / success chaining

```json
{
  "_Type": "Action.Type.ChangeSet",
  "Target": {
    "Service": "/MyMDKApp/Services/MyOData.service"
  },
  "Actions": [
    "/MyMDKApp/Actions/ChangeSet/NavigateToPageOne.action",
    "/MyMDKApp/Rules/ChangeSet/NavigateToPageTwo.js"
  ],
  "Headers": {
    "MDK-Header": "MDK"
  },
  "OnSuccess": "/MyMDKApp/Actions/ChangeSet/ChangeSetSuccessMessage.action",
  "OnFailure": "/MyMDKApp/Actions/ChangeSet/ChangeSetFailureMessage.action"
}
```

----
## Creating links to new entities from a ChangeSet
When entities are created as part of a ChangeSet, they do not get actually created in the store until the ChangeSet is processed (i.e. until the last action of the ChangeSet has been completed). As a result, they would not appear in a list which queries the EntitySet they belong to, if the query is executed as part of the same ChangeSet in which they have been created.

In other words, this would not work:

1. Begin ChangeSet
2. Create an entity of type MyWorkOrderHeader
3. Create an entity of type MyWorkOrderOperation
4. Display a list of all WorkOrders, in order to select the newly created WorkOrder from it, and then link it to the Operation

The newly created WorkOrder would not show up in the list, as it does not exist yet.

To go around this limitation, when entities get created in a ChangeSet, they get assigned a temporary, ordinal ReadLink until the ChangeSet completes. If those entities need to be referred to in subsequent actions which are part of the same ChangeSet, this temporary ReadLink is used.

The prefix of the ReadLink is "pending\_", followed by an ordinal, i.e. "pending\_1", "pending\_2", etc.

In the below code, which refers to the example described above, this is how the new Operation would refer to the new WorkOrder, in the CreateLinks section:

```json
"CreateLinks": [
    {
      "Property": "WOHeader",
      "Target": {
        "EntitySet": "MyWorkOrderHeaders",
        "ReadLink": "pending_1"
      }
    }
  ]
```