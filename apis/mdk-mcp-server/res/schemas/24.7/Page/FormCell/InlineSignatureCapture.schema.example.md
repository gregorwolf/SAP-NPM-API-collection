
----
## Examples

```json
{
  "_Type": "Page",
  "_Name": "FormCellsPage",
  "Caption": "FormCell Example",
  "Controls": [{
    "_Type": "Control.Type.FormCellContainer",
    "_Name": "FormCellContainer",
    "Sections": [{
      "Caption": "Section1",
      "Controls": [{
        "_Type": "Control.Type.FormCell.InlineSignatureCapture",
        "_Name": "InlineSignatureCaptureFormCell",
        "Caption": "Add Inline Signature",
        "ShowTimestampInImage": false,
        "ShowXMark": true,
        "ShowUnderline": true,
        "WatermarkText": "This is watermark text",
        "WatermarkTextMaxLines": 3,
        "TimestampFormatter": "yyyy-MM-dd",
        "HelperText": "This is helper text",
        "OnValueChange": "/MyMDKApp/Actions/ShowMessage.action",
        "validationProperties": {
          "ValidationMessage": "Validation Message",
          "ValidationMessageColor": "ff0000",
          "SeparatorBackgroundColor": "000000",
          "SeparatorIsHidden": false,
          "ValidationViewBackgroundColor": "fffa00",
          "ValidationViewIsHidden": false
        },
        "Styles": {
          "Background": "InlineSignatureCaptureFormCellBackground",
          "Caption": "InlineSignatureCaptureFormCellCaption",
          "SignatureCapture": "MyInlineSignatureCaptureClass",
          "SignatureCaptureUnderline": "MyInlineSignatureCaptureUnderlineClass"
        },
      }]
    }]
  }]
}
```

See the examples in [ODataService CreateMedia](../../Action/ODataService/CreateMedia.schema.md#examples) and [ODataService UploadStream](../../Action/ODataService/UploadStream.schema.md#examples) for how to upload the captured signature to your OData Service.

### Style Classes Definition
```css
/* InlineSignatureCapture Form Cell - Background */
.InlineSignatureCaptureFormCellBackground {
  background-color: yellow;
}

/* InlineSignatureCapture Form Cell - Caption */
.InlineSignatureCaptureFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

.MyInlineSignatureCaptureClass {
  background-color: #ff0000;
  stroke: #00ff00;
  stroke-width: 12;
}

.MyInlineSignatureCaptureUnderlineClass {
  stroke: #0000ff;
  stroke-width: 3;
}
```
