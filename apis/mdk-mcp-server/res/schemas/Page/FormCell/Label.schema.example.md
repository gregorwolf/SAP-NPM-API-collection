
----
## Examples


```json
{
  "Caption": "FormCell Label Page",
  "Controls": [
    {
      "Sections": [
        {
          "Controls": [
            {
              "_Type": "Control.Type.FormCell.Label",
              "_Name": "LabelFormCell",
              "Text": "/MDKDevApp/Rules/FormCell/SetStartingLabelText.js",
              "TextWrap": true,
              "Style": "MDKLabelFormCell"
            },
            {
              "Title": "Get Text",
              "OnPress": "/MDKDevApp/Rules/FormCell/GetLabelText.js",
              "ButtonType": "Primary",
              "_Type": "Control.Type.FormCell.Button",
              "_Name": "GetTextButton"
            },
            {
              "Title": "Set Text",
              "OnPress": "/MDKDevApp/Rules/FormCell/SetLabelText.js",
              "ButtonType": "Primary",
              "_Type": "Control.Type.FormCell.Button",
              "_Name": "SetTextButton"
            },
            {
              "Title": "Get TextWrap",
              "OnPress": "/MDKDevApp/Rules/FormCell/GetLabelTextWrap.js",
              "ButtonType": "Primary",
              "_Type": "Control.Type.FormCell.Button",
              "_Name": "GetTextWrapButton"
            },
            {
              "Title": "Set TextWrap",
              "OnPress": "/MDKDevApp/Rules/FormCell/SetLabelTextWrap.js",
              "ButtonType": "Primary",
              "_Type": "Control.Type.FormCell.Button",
              "_Name": "SetTextWrapButton"
            },
          ]
        }
      ],
      "_Name": "FormCellContainer",
      "_Type": "Control.Type.FormCellContainer"
    }
  ],
  "_Type": "Page",
  "_Name": "Formcell"
}
```

### Style Classes Definition
```css
/* Label Form Cell */
.MDKLabelFormCell {
    background-color: #f5f505fa;
    color: black;
    font-size: 20;
    font-style: normal;
    font-weight: bold;
    text-align: center;
    text-decoration: underline;
}
```