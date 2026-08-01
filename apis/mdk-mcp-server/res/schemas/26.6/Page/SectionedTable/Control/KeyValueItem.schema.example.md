
----
## Examples

### Static
```json
{
  "_Type": "Page",
  "_Name": "ProductDetailsPage",
  "Caption": "Product Details",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.KeyValue",
          "_Name": "ProductInfoSection",
          "Header": {
            "Caption": "Product Information"
          },
          "KeyAndValues": [
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "ProductNameItem",
              "KeyName": "Product Name",
              "Value": "MacBook Pro 16",
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
              "Visible": true
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "PriceItem",
              "KeyName": "Price",
              "Value": "$2,499.00",
              "Visible": true
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "StockItem",
              "KeyName": "In Stock",
              "Value": "Yes",
              "Visible": true
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "DetailsLinkItem",
              "KeyName": "More Details",
              "Value": "View Specifications",
              "Visible": true,
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action"
            }
          ]
        }
      ]
    }
  ]
}
```

### Dynamic
```json
{
  "_Type": "Page",
  "_Name": "OrderDetailsPage",
  "Caption": "Order Details",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "DataSubscriptions": ["OrderDetails"],
      "Sections": [
        {
          "_Type": "Section.Type.KeyValue",
          "_Name": "SectionKeyValue",
          "KeyAndValues": [
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "OrderIdItem",
              "KeyName": "Order ID",
              "Value": "{OrderId}"
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "TrackingNumberItem",
              "KeyName": "Tracking Number",
              "Value": "{TrackingNumber}",
              "Visible": "{HasTrackingNumber}"
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "CustomerNameItem",
              "KeyName": "Customer",
              "Value": "{CustomerName}"
            }
          ]
        }
      ]
    }
  ]
}
```

### Styled KeyValueItem with static data
```json
{
  "_Type": "Page",
  "_Name": "ProductDetailsPage",
  "Caption": "Product Details",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "_Type": "Section.Type.KeyValue",
          "_Name": "ProductInfoSection",
          "Header": {
            "Caption": "Product Information"
          },
          "KeyAndValues": [
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "ProductNameItem",
              "KeyName": "Product Name",
              "Value": "MacBook Pro 16",
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
              "Visible": true,
              "LinkColor": "#0000FF"
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "StockItem",
              "KeyName": "In Stock",
              "Value": "Yes",
              "Visible": true,
              "Styles": {
                "KeyValueItem": "customKeyValueBackground",
                "KeyName": "customKeyNameStyle",
                "Value": "customValueStyle"
              }
            },
            {
              "_Type": "KeyValue.Type.Item",
              "_Name": "DetailsLinkItem",
              "KeyName": "More Details",
              "Value": "View Specifications",
              "Visible": true,
              "OnPress": "/MDKDevApp/Actions/Messages/Message.action",
              "Styles": {
                "Value": "linkText"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Style Classes Definition
Define custom style classes for KeyValueItem components.
```css
.customKeyValueBackground {
  background-color: #fde7e7ff;
  padding: 12;
}

.customKeyNameStyle {
  font-color: #333333;
  font-size: 14;
}

.customValueStyle {
  font-color: #0066CC;
  font-size: 16;
}

.linkText {
  font-color: #0066CC;
  text-decoration: underline;
}
```