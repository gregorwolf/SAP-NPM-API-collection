
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
        "_Type": "Control.Type.FormCell.SignatureCapture",
        "_Name": "SignatureCaptureFormCell",
        "Caption": "Add Signature",
        "InitialStatusText": "Please capture a signature",
        "CapturedLabel":"Signture is Captured!",
        "ShowTimestampInImage": false,
        "ShowXMark": true,
        "ShowUnderline": true,
        "WatermarkText": "This is watermark text",
        "WatermarkTextMaxLines": 3,
        "TimestampFormatter": "yyyy-MM-dd",
        "HelperText": "This is helper text",
        "OnValueChange": "/MyMDKApp/Actions/ShowMessage.action",
        "Validation": {
          "Message": "This is validation view message",
          "Visible": true,
          "SeparatorVisible": true,
          "Styles": {
            "Message": "ValidationMessage",
            "ValidationView": "ValidationView"
          }
        },
        "Styles": {
          "Background": "SignatureCaptureFormCellBackground",
          "Caption": "SignatureCaptureFormCellCaption",
          "Value": "SignatureCaptureFormCellValue",
          "SignatureCapture": "MySignatureCaptureClass",
          "SignatureCaptureUnderline": "MySignatureCaptureUnderlineClass"
        },
      }]
    }]
  }]
}
```

See the examples in [ODataService CreateMedia](../../Action/ODataService/CreateMedia.schema.md#examples) and [ODataService UploadStream](../../Action/ODataService/UploadStream.schema.md#examples) for how to upload the captured signature to your OData Service.

### Style Classes Definition
```css
/* SignatureCapture Form Cell - Background */
.SignatureCaptureFormCellBackground {
  background-color: yellow;
}

/* SignatureCapture Form Cell - Caption */
.SignatureCaptureFormCellCaption {
  background-color: #0000FF;
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

/* SignatureCapture Form Cell - Value */
.SignatureCaptureFormCellValue {
  background-color: #0000FF;  /* iOS Only */
  color: black;
  font-style: body;  /* iOS Only */
  font-typeface: bold;  /* Android Only */
  font-size: 16px;
}

.MySignatureCaptureClass {
  background-color: #ff0000;
  stroke: #00ff00;
  stroke-width: 12;
}

.MySignatureCaptureUnderlineClass {
  stroke: #0000ff;
  stroke-width: 3;
}

/* Validation view */
.ValidationView {
  background-color: #83AF9B;
  border-top-color: #ff00ee;
}

/* Validation message */
.ValidationMessage {
  font-size: 16;
  font-color: #0000ff;
}
```
