## Undo OData Pending Changes

###

```json
{
    "_Type": "Action.Type.OfflineOData.UndoPendingChanges",
    "Target": {
        "EntitySet": "Products",
        "Service": "/MDKSampleApp/Services/SampleService.service",
        "EditLink": "/MDKSampleApp/Rules/Products/GetItemODataLink.js"
    },
    "OnSuccess": "/MDKSampleApp/Actions/Products/UndoPendingChangeSuccess.action",
    "OnFailure": "/MDKSampleApp/Actions/Products/UndoPendingChangeFailed.action"
}
```

### GetItemODataLink.js

```js
/**
* Get OData EditLink from binding
* @param {IClientAPI} clientAPI
* @returns {@odata.editLink} linkData
*/
export default function GetItemODataLink(clientAPI) {
    return clientAPI.binding["@odata.editLink"];
}
```

## OnSuccess

### UndoPendingChangeSuccess.action

```json
{
    "Duration": 3,
    "Message": "Undo Pending Changes on Products Successful",
    "NumberOfLines": 2,
    "_Type": "Action.Type.ToastMessage"
}
```

## On Failure

### UndoPendingChangeFailed.action

```json
{
    "Duration": 3,
    "Message": "Undo Pending Changes on Products Failed",
    "NumberOfLines": 2,
    "_Type": "Action.Type.ToastMessage"
}
```