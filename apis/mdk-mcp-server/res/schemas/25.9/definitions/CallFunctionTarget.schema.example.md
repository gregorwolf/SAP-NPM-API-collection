
----
## Examples


### Target with FunctionCall
```json
// Execute a function call with result that returns an array of objects
{
    "Target": {
      "Function": {
        "Name": "FindCustomer",
        "Parameters": {
          "FirstName": "{#Control:TextFieldFirstName/#Value}"
        }
      },
      "Service": "/MyMDKApp/Services/MyOData.service",
    }
}
```
