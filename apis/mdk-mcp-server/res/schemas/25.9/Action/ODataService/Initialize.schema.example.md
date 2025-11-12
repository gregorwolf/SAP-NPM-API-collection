
----
## Action Result
The ActionResult of this action is `null`.

----
## Examples


### Initialize Offline

```json
{
  "_Type": "Action.Type.ODataService.Initialize",
  "Service": "/MyMDKApp/Services/MyOData.service",
  "DefiningRequests": [
    {
      "Name": "MyProducts",
      "Query": "Products",
      "AutomaticallyRetrievesStreams": true
    },
    {
      "Name": "MyCustomers",
      "Query": "Customers"
    }
  ],
  "ProgressText": {
    "Opening": "Custom Opening Text",
    "Initializing": "Custom Initializing Text",
    "InitialCommunication": "Custom InitialComm Text",
    "StartingDownloadingFile": "Custom Waiting For File Text",
    "StartingDownloadingData": "Custom Waiting For Data Text",
    "Opened": "Custom Opened Text",
    "DownloadingFile": "Custom Downloading File Text {0}{1}",
    "DownloadingData": "Custom Downloading Data Text {1}{0}"
  }
}
```

### Initialize Online

```json
{
  "_Type": "Action.Type.ODataService.Initialize",
  "Service": "/MyMDKApp/Services/MyOnlineOData.service"
}
```

