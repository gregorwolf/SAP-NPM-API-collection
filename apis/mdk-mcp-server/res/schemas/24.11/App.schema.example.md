
----
## Examples

```json
// Application.app
{
  "_Name": "MDKApp",
  "MainPage": "/MDKApp/Pages/Menu.page",
  "OnLaunch": "/MDKApp/Actions/CreateService.action",
  "OnUnCaughtError": "/MDKApp/Actions/DisplayErrorMessage.action",
  "OnExit": "/MDKApp/Rules/AppExit.js",
  "OnWillUpdate": "/MDKApp/Rules/OnWillUpdate.js",
  "OnDidUpdate": "/MDKApp/Rules/OnDidUpdate.js",
  "OnSuspend": "/MDKApp/Rules/OnSuspend.js",
  "OnResume": "/MDKApp/Rules/OnResume.js",
  "OnLinkDataReceived": "/MDKApp/Rules/OnLinkDataReceived.js", 
  "Styles": "/MDKApp/Styles/Styles.css",
  "Version": "/MDKApp/Rules/MetadataVersion.js",
  "Localization": "/MDKApp/i18n/i18n.properties",
  "OnReceiveForegroundNotification": "/MDKApp/Rules/ForegroundNotificationEventHandler.js",
  "OnReceiveFetchCompletion": "/MDKApp/Rules/ContentAvailableEventHandler.js",
  "OnReceiveNotificationResponse": "/MDKApp/Rules/ReceiveNotificationResponseEventHandler.js",
  "OnUserSwitch": "/MDKApp/Actions/DisplayUserSwitchMessage.action"
}
```

### LinkData Example
For a deeplink URL of "mdkclient://sap.com?ProductId=123&Description=New software&Verified=true#tagExample-1", the LinkData is as below.

```javascript
{
  URLScheme: "mdkclient",
  URL: "sap.com",
  Parameters: {
    ProductId: "123",
    Description: "New software",
    Verified: "true"
  },
  Hash: "#tagExample-1",
  OriginalURL: "mdkclient://sap.com?ProductId=123&Description=New software&Verified=true#tagExample-1"
}
```