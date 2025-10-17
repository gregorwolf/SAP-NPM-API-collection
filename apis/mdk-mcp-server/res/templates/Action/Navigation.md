## Navigation action

### Navigate to normal page

```json
{
	"_Type": "Action.Type.Navigation",
    "PageToOpen": "/MDKSampleApp/Pages/Products/ProductList.page"
}
```

### Naviate to modal page (Full Modal)

```json
{
	"_Type": "Action.Type.Navigation",
	"PageToOpen": "/MDKSampleApp/Pages/PurchaseOrders/POHeaderCreate.page",
	"ModalPage": true,
	"ModalPageFullscreen": true
}
```

### Navigate to modal page (Partial Modal)

```json
{
    "_Type": "Action.Type.Navigation",
    "PageToOpen": "/MDKSampleApp/Pages/Products/ProductEdit.page",
	"ModalPage": true,
	"ModalPageFullscreen": false
}
```

