
----
## Examples

### OnLoaded Event

```json
{
  "Caption": "Main Page",
  "OnLoaded": {
    "Name": "/MyApp/Actions/Toast/ToastMessage.action",
    "Properties": {
      "Message": "My Message"
    }
  },
  "_Type": "Page",
  "_Name": "MainPage"
}
```

### OnSuccess Event (Nested Actions)

```json
{
  "_Type": "Action.Type.ODataService.CreateEntity",
  "Target": {
    "EntitySet": "MyWorkOrderHeaders",
    "Service": "/MyApp/Services/MyOData.service"
  },
  "Properties": {
    "OrderDescription": "new installation",
  },
  "OnSuccess": {
    "Name": "/MyApp/Actions/Message.action",
    "Properties": {
      "Message": "My Message",
      "Title": "My Title",
      "OnSuccess": {
        "Name": "/MyApp/Actions/GoToPage.action",
        "Properties": {
          "PageToOpen": "/MyApp/Pages/MySecondPage.page"
        }
      }
    }
  }
}
```

### ExecuteAction API

```js
export default function OverrideActionProperties(context) {
  const pageProxy = context.getPageProxy();

  pageProxy.setActionBinding({
    'message': "Hello"
  });

  return pageProxy.executeAction({
    "Name": "/MyApp/Actions/Message.action",
    "Properties": {
      "Message": "My Message is {message}",
      "Title": "My Title"
    }
  });
}

```

### ExecuteAction API (Override Object Properties)

```js
export default function OverrideActionProperties(context) {
  let readLink = "MyWorkOrderHeaders('4000019')";
  let description = "Override Description";

  return context.executeAction({
    "Name": "/MyApp/Actions/UpdateEntity.action",
    "Properties": {
      "Target": {
        "ReadLink": readLink
      },  
      "Properties": {
        "OrderDescription": description
      },
    }
  });
}
```
