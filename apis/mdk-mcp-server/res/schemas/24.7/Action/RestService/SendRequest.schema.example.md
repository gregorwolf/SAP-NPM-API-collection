
----
## Action Result
Refer to the [MDK Guide](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-results) to understand what an action result is.

The success ActionResult of this action is of a JS primitive type, object or a JS array. The failure ActionResult is an error message.

----
## Examples

The SendRequest action can be used to send HTTP requests to either OData or REST services.

### Get portion of response json object

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/Groups",
    "RequestProperties": {
      "Method": "GET",
      "Headers": {
        "Accept": "application/json"
      }
    },
    "OutputPath": "/d/results",
    "Service": "/MyMDKApp/Services/MyRest.service"
  },
}      
```

Assume below is the response data in JSON format. If the `OutputPath` property value is set to '/d/results'. This means that you only want the data in 'd.results'. 

```json
{
  "d":
    {
      "results":[
        {
          "Id":"Hu5PfmXDuNbUoKapf1EZFh",
          "Name":"GroupKrishna"
        },
        {
          "Id":"PX6qrsTU1BrCmyAJWzdXGl",
          "Name":"GroupVelidi"
        },
      ]
    }
}
```

### Post using native data

A HTTPS POST request is sent with native data of file. The header['Content-Type'] should be set according to file content.

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/Images",
    "RequestProperties": {
      "Method": "POST",
      "Headers": {
        "Content-Type": "#Control:Attachment/#Value/#Index:0/contentType"
      },
      "Body": "#Control:Attachment/#Value/#Index:0/content",
      "FetchCSRF": false
    },
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

### Post using json object or array

A HTTPS POST request is sent with the request body as JSON string. The header['Content-Type'] is set to "application/json" by default.

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/Customers",
    "RequestProperties": {
      "Method": "POST",
      "Body": {
        "Address": "{#Control:Address/#Value}",
        "City": "{#Control:City/#Value}",
        "CompanyName": "{#Control:CompanyName/#Value}",
        "ContactName": "{#Control:ContactName/#Value}",
        "ContactTitle": "{#Control:ContactTitle/#Value}",
        "Country": "{#Control:Country/#Value}",
        "Fax": "{#Control:Fax/#Value}",
        "Phone": "{#Control:Phone/#Value}",
        "PostalCode":"{#Control:PostalCode/#Value}",
        "Region":"{#Control:Region/#Value}"
      },
      "FetchCSRF": true
    },
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/asset/imports/123/files",
    "RequestProperties": {
      "Method": "POST",
      "Body": [
        {
          "Id": "{#Control:Id/#Value}",
          "Name": "{#Control:Name/#Value}",
          "AssetName": "{#Control:AssetName/#Value}"
        },
        {
          "Id": "{#Control:Id2/#Value}",
          "Name": "{#Control:Name2/#Value}",
          "AssetName": "{#Control:AssetName2/#Value}"
        }
      ]
    },
    "Service": "/MyMDKApp/Services/MyRest.service"
  }
}
```

### Post using form data

A HTTPS POST request is sent with the request body specially formatted as a series of "parts", separated with MIME boundaries. The header['Content-Type'] should be set to "multipart/form-data".  

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/api/v2/similarity-scoring",
    "RequestProperties": {
      "Method": "POST",
      "Headers": {
        "Content-Type": "multipart/form-data"
      },
      "Body": [
        {
          "Key": "files",
          "Value": "#Control:Attachment/#Value/#Index:0"
        },
        {
          "Key": "options",
          "Value": "#Control:Options/#Value"
        }
      ]
    },
    "Service": "/MyMDKApp/Services/MyRest.service"
  }
}
```

### Patch

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/Customers('{#Control:CustomerID/#Value}')",
    "RequestProperties": {
      "Method": "PATCH",
      "Body": {
        "Address": "{#Control:Address/#Value}",
        "City": "{#Control:City/#Value}",
        "CompanyName": "{#Control:CompanyName/#Value}",
        "ContactName": "{#Control:ContactName/#Value}",
        "ContactTitle": "{#Control:ContactTitle/#Value}",
        "Country": "{#Control:Country/#Value}",
        "Fax": "{#Control:Fax/#Value}",
        "Phone": "{#Control:Phone/#Value}",
        "PostalCode":"{#Control:PostalCode/#Value}",
        "Region":"{#Control:Region/#Value}"
      },
      "FetchCSRF": false
    },
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

### Delete

```json
{
  "_Type": "Action.Type.RestService.SendRequest",
  "Target": {
    "Path": "/Customers('{CustomerID}')",
    "RequestProperties": {
      "Method": "DELETE",
      "FetchCSRF": false
    },
    "Service": "/MyMDKApp/Services/MyOData.service"
  }
}
```

## Auto-store the result into actionBinding

Note: `result` is the final parsed result (including using `OutputPath`). 
If the `result` is a single object, then it will be stored into the action binding directly.

```js
actionBinding = result;
```

If the `result` is an `array` (or `collection`), it will be stored into the action binding with a key that's based on the ActionResult name. If Action Result is not defined, then the default key is `_Result`.

```js 
actionBinding = { "_Result": result }; 
actionBinding = { "GetProducts": result };  //Assuming your ActionResult name is GetProducts
```
