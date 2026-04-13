
----
## Examples


```json
{
  "_Type": "Page",
  "_Name": "FormCellSectionPage",
  "Caption": "FormCell section Page",
  "Controls": [
    {
      "_Type": "Control.Type.SectionedTable",
      "_Name": "SectionedTable",
      "Sections": [
        {
          "Header": {
            "Caption": "FormCell Section One"
          },
          "Footer": {
            "Caption": "FormCell Section Footer",
            "AccessoryType": "disclosureIndicator",
            "AttributeLabel": "AttributeLabel",
            "FooterStyle": "attribute",
            "OnPress": "/MDKDevApp/Actions/Messages/Message1.action"
          },
          "Controls": [
            {
              "Title": "Button",
              "OnPress": "/MDKDevApp/Actions/Messages/Message2.action",
              "TextAlignment": "center",
              "_Type": "Control.Type.FormCell.Button",
              "_Name": "MDKVisibleButton"
            },
            {
              "Caption": "Supplier ID",
              "IsEditable": true,
              "PlaceHolder": "Enter a new supplier ID",
              "Value": "100",
              "Styles": {
                "Background": "simple-property-background-style",
                "Caption": "text-green-italic",
                "Value": "simple-property-value-style"
              },
              "_Type": "Control.Type.FormCell.SimpleProperty",
              "_Name": "SupplierID"
            },
            {
              "Caption": "Style formcells",
              "Value": true,
              "OnValueChange": "/MDKDevApp/Rules/InputValidation/ClearValidationOnValueChange.js",
              "_Type": "Control.Type.FormCell.Switch",
              "_Name": "MasterSwitchCell"
            },
            {
              "Caption": "Duration",
              "Value": 85,
              "Unit": "S",
              "MinuteInterval": 5,
              "_Type": "Control.Type.FormCell.DurationPicker",
              "_Name": "MDKVisibleDurationControl"
            },
            {
              "Caption": "Date and Time",
              "Value": "2015-12-25T11:40.000Z",
              "Mode": "datetime",
              "IsEditable": true,
              "_Type": "Control.Type.FormCell.DatePicker",
              "_Name": "DatePicker"
            },
            {
              "Caption": "Add Signature",
              "_Type": "Control.Type.FormCell.SignatureCapture",
              "_Name": "SignatureCapture"
            }
          ],
          "_Type": "Section.Type.FormCell",
          "_Name": "FormCellSection1"
        },
        {
          "Header": {
            "UseTopPadding": false,
            "Caption": "2nd FormCell Section"
          },
          "Controls": [
            {
              "Caption": "NoteFormCell",
              "IsEditable": true,
              "PlaceHolder": "Note FormCell",
              "_Type": "Control.Type.FormCell.Note",
              "_Name": "NoteFormCell1"
            },
            {
              "Caption": "TitleFormCell",
              "IsEditable": true,
              "PlaceHolder": "Title FormCell",
              "_Type": "Control.Type.FormCell.Title",
              "_Name": "MDKVisibleTitleFormCell1"
            },
            {
              "Caption": "Choose Single",
              "Value": "4000034",
              "PickerItems": {
                  "DisplayValue": "{OrderDescription}",
                  "ReturnValue": "{OrderId}",
                  "Target": {
                      "EntitySet": "MyWorkOrderHeaders",
                      "Service": "/MDKDevApp/Services/Amw.service"
                  }
              },
              "Search": {
                  "AdditionalProperties": ["PlantSection"],
                  "BarcodeScanner": false,
                  "Enabled": true,
                  "Placeholder": "Item Search",
                  "MinimumCharacterThreshold": 2,
                  "Options": {
                      "CaseSensitive": true,
                      "NumberSearch": {
                          "Enabled": true,
                          "ConversionMethod": "UseCast"
                      }
                  }
              },
              "IsSearchCancelledAfterSelection": true,
              "AllowMultipleSelection": false,
              "IsSelectedSectionEnabled": "/MDKDevApp/Rules/SetSelectedSectionEnabled.js",
              "AllowEmptySelection": true,
              "PickerPrompt": "Please Select",
              "_Type": "Control.Type.FormCell.ListPicker",
              "_Name": "ListPicker1"
            },
            {
              "Caption": "Priority",
              "Value": "3-High",
              "ApportionsSegmentWidthsByContent": true,
              "Segments": [
                "1-Low",
                "2-Medium",
                "3-High",
                "4-Very High"
              ],
              "_Type": "Control.Type.FormCell.SegmentedControl",
              "_Name": "SegmentedControl"
            },
            {
              "AttachmentTitle": "Photos [%d]",
              "AttachmentAddTitle": "Add photos",
              "AttachmentCancelTitle": "No!",
              "AttachmentActionType": [
                  "AddPhoto",
                  "TakePhoto",
                  "SelectFile"
              ],
              "AllowedFileTypes": ["jpg", "png", "gif"],
              "Value": [],
              "OnValueChange": "/MDKDevApp/Rules/FormCellSection/UpdateAttachments.js",
              "_Type": "Control.Type.FormCell.Attachment",
              "_Name": "MDKVisibleAttachment"
            }
          ],
          "Layout": {
            "NumberOfColumns": 3
          },
          "_Type": "Section.Type.FormCell",
          "_Name": "FormCellSection2"
        }
      ]
    }
  ]
}
```

### Style Classes Definition
```css
/* SimpleProperty Form Cell - Background */
.simple-property-background-style {
  background-color: yellow;
}
/* SimpleProperty Form Cell - Caption */
.text-green-italic {
  background-color: #0000FF;
  color: green;
  font-name: italicSystem;
  font-style: italic;
  font-size: 16px;
}
/* SimpleProperty Form Cell - Value */
.simple-property-value-style {
  background-color: #0000FF;  /* iOS Only */
  color: black;
  font-name: italicSystem;
  font-style: italic; /* iOS Only */
  font-size: 16px;
}
```