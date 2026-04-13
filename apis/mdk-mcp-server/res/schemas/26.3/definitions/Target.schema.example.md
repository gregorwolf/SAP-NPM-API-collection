
----
## Examples


### Target Object
```json
{
    "Target": {
      "EntitySet": "Orders",
      "Service": "/MDKOnline/Services/Online.service"
    }
}
```

### Target with Object Binding
```json
// {Addresses} is a binding that'll return an array of objects
{
    "Target": "{Addresses}"
}

// Complex type object binding with the use of array index that returns an object
{
    "Target": "{Output/Roles/1}"
}
```

### Target with TargetPath
```json
// {Addresses} is a binding that returns an array of objects
{
    "Target": "{Addresses}"
}
```

### Target with ReadLink
```json
{
  "Target": {
    "EntitySet": "WorkOrderHeader",
    "Service": "/MyMDKApp/Services/MyOData.service",
    "ReadLink": "{@odata.readLink}"
  }
}
```

### Target with EditLink
```json
{
  "Target": {
    "EntitySet": "WorkOrderHeader",
    "Service": "/MyMDKApp/Services/MyOData.service",
    "EditLink": "{@odata.editLink}"
  }
}
```

### Target with ServerSidePaging
```json
// Specify the service supports pagination via skiptoken by setting ServerSidePaging to true.
{
    "Target": {
      "EntitySet": "FeedEntries",
      "Service": "/MDKOnline/Services/Jam.service",
      "ServerSidePaging": true,
    }
}
```

### Escape TargetPath
```json
// The string {#Control:Note/#Value} will be returned.
{
    "Value": "`{#Control:Note/#Value}`"
}
```