
----
## Examples

### OnPulledDown Event

```json
{
   "PullDown":{
      "OnPulledDown":"/MDKDevApp/Actions/Messages/Message.action",
      "Styles":{
         "IndicatorColor":"#48a832",
         "BackgroundColor":"#abffff"
      }
   }
}
```

### OnPulledDown Event with the PLT formatter

```json
{
   "PullDown":{
      "OnPulledDown":"$(PLT,'/MDKDevApp/Actions/Messages/IOS.action', '/MDKDevApp/Actions/Messages/Android.action')",
      "Styles":{
         "IndicatorColor":"#48a832",
         "BackgroundColor":"#abffff"
      }
   }
}
```

### Overriding action properties in OnPulledDown Event

```json
{
   "PullDown":{
      "OnPulledDown":{
         "Name":"/MDKDevApp/Actions/Messages/Message1.action",
         "Properties":{
            "Title":"Overriden Title 1",
            "Message":"Overriden Message 1"
         }
      },
      "Styles":{
         "IndicatorColor":"#48a832",
         "BackgroundColor":"#abffff"
      }
   }
}
```