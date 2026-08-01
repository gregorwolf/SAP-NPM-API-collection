
----
## Examples


### Navigation with default transition
```json
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation"
}
```

### Navigation with fade transition
```json
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation",
    "Transition": {
        "Curve": "Linear",
        "Duration": 2,
        "Name": "Fade"
    }
}
```

### Navigation without transition
```json
{
    "PageToOpen": "/MDKApp/Pages/ListPage.page",
    "Type": "Action.Type.Navigation",
    "Transition": {
        "Name": "None"
    }
}
```
