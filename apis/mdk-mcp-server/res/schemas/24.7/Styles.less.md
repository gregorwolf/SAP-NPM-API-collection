# Unified Styling

MDK support styling with Less (which stands for Leaner Style Sheets) to support multi-platforms styling capability. General styling designs and methods can be referenced to [doc](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/features/fiori-ui/mdk/styling.html)

Below are styling references for specific UI elements.

----

## Page

`Page` styling is by Type-selector. Only 'background-color' and 'color' properties can be styled.
Example:

```css
MDKPage {
  color: white; 
  background-color: blue;
}
```

----

## ActionBar

`ActionBar` styling is by Type-selector. Only 'background-color' and 'color' properties can be styled.
Example:

```css
ActionBar {
  color: white; 
  background-color: blue;
}
```

`ActionBarTitle` styling is by Type-selector. This is to set custom style on ActionBar title.
Example:

```css
ActionBarTitle {
  color: white; 
  font-size: 17;
  /* The following attributes are not supported on iOS */
  font-family: "system";
  font-weight: 600;
  font-style: normal;
}
```


----

## ToolBar

`Toolbar` styling is by Type-selector. Only 'background-color' and 'color' properties can be styled. On iOS platform to customize the ToolBar background color use the property, `bartintcolor`.
Example:

```css
ToolBar {
  color: white; 
  background-color: blue;  /* Android */
  bartintcolor: blue;      /* iOS */
}
```

----

## Sub-control Styling

Many controls are constructed by a few sub-controls. To style these controls, it needs to apply style class on sub-controls.

### Form Cell Sub-controls

| Form Cell Control        | Available Sub-controls      |
| ------------------------ | --------------------------- |
| [AttachmentFormCell](./Page/FormCell/Attachment.schema.md#styles)              | Background                  |
| [ButtonFormCell](./Page/FormCell/Button.schema.md#styles)                      | Background, Value           |
| [DatePickerFormCell](./Page/FormCell/DatePicker.schema.md#styles)              | Background, Caption, Value  |
| [DurationPickerFormCell](./Page/FormCell/DurationPicker.schema.md#styles)      | Background, Caption, Value  |
| [FilterFormCell](./Page/FormCell/Filter.schema.md#styles)                      | Background, Caption         |
| [InlineSignatureCaptureFormCell](./Page/FormCell/InlineSignatureCapture.schema.md#styles)  | Background, Caption, SignatureCapture, SignatureCaptureUnderline  |
| [ListPickerFormCell](./Page/FormCell/ListPicker.schema.md#styles)              | Background, Caption, Value  |
| [NoteFormCell](./Page/FormCell/Note.schema.md#styles)                          | Background, Value           |
| [SegmentedFormCell](./Page/FormCell/Segmented.schema.md#styles)                | Background, Caption         |
| [SignatureCaptureFormCell](./Page/FormCell/SignatureCapture.schema.md#styles)  | Background, Caption, Value, SignatureCapture, SignatureCaptureUnderline  |
| [SimplePropertyFormCell](./Page/FormCell/SimpleProperty.schema.md#styles)      | Background, Caption, Value  |
| [SwitchFormCell](./Page/FormCell/Switch.schema.md#styles)                      | Background, Switch, Caption |
| [TitleFormCell](./Page/FormCell/Title.schema.md#styles)                        | Background, Value           |

All the form cells controls allow you to style its specific sub-controls.
To utilize this styling from a rule, you should add something like:

```js
switchFormcell.setStyle("FormCellSwitchNormal", "Switch");
switchFormcell.setStyle("FormCellSwitchCritical", "Caption");
```

into the code.

The styles might contain e.g. the following settings:

```less
.FormCellSwitchNormal {
  background-color: @green1;
}

.FormCellCaptionCritical {
  background-color: @green1;
  color: @purple1;
  font-typeface:: italic;
  font-size: 12;
}
```

This will set the 'Switch' sub-control of the `SwitchFormcell` to use 'FormCellSwitchNormal' style and the 'Caption' sub-control to use 'FormCellCaptionCritical' style

#### Background

All form cell controls has a special base sub-control called: *Background*. If you set the style of this sub-control, all of the sub-controls inside the cell receive the same style.
In order to utilize this styling from a rule you should add something like:

```js
switchFormcell.setStyle("FormCellBackgroundCritical", "Background");
```

into the code.

The style 'FormCellBackgroundCritical' might contain e.g. the following settings:

```less
.FormCellBackgroundCritical {
  background-color: @green1;
  color: @purple1;
  font-typeface:: italic;
  font-size: 12;
}
```

This will set the style of all sub-controls (both Switch and Caption) to use 'FormCellBackgroundCritical' in the `SwitchFormcell`.

### Sub-controls of Section Control

| Section Control          | Available Sub-controls      |
| ------------------------ | --------------------------- |
| [ChartCard](./Page/SectionedTable/Control/ChartCard.schema.md#styles)                   | Title, Subtitle, StatusText, SeriesTitle, TrendTitle, NoDataText, TrendImage |
| [ChartContent](./Page/SectionedTable/Container/ChartContent.schema.md#styles)           | Title, Subtitle, StatusText, CategoryTitles, NoDataText |
| [ContactCellItem](./Page/SectionedTable/Control/ContactCellItem.schema.md#styles)       | Headline, Subheadline, Description, DetailImage |
| [ImageCell](./Page/SectionedTable/Control/ImageCell.schema.md#styles)                   | Image                       |
| [KPIHeader](./Page/SectionedTable/Container/KPIHeader.schema.md#styles)                 | TintColor, BackgroundColor, Icon  |
| [KPISection](./Page/SectionedTable/Container/KPISection.schema.md#styles)               | TintColor, BackgroundColor, Icon  |
| [ObjectCell](./Page/SectionedTable/Control/ObjectCell.schema.md#styles)                 | Title, Subhead, Footnote, Description, StatusText, SubstatusText, DetailImageText, DetailImage, StatusImage, SubstatusImage, BackgroundColor, Icons, AccessoryButtonIcon, HorizontalIcons |
| [ObjectCard](./Page/SectionedTable/Control/ObjectCard.schema.md#styles)                 | Title, Subhead, Footnote, Description, StatusText, DetailImage, BackgroundColor |
| [ObjectHeader](./Page/SectionedTable/Container/ObjectHeader.schema.md#styles)           | BodyText, Description, Footnote, HeadlineText, StatusText, Subhead, SubstatusText, ChartTitle, ChartSubTitle, ChartTrendTitle, ChartKPIUnit, ChartKPIValue, ChartKPIIcon, NoDataText, KPITintColor, KPICaption, DetailImage, StatusImage, SubstatusImage, ObjectHeader, ChartTrendImage, ChartKPIIcon, KPIIcon   |
| [ProfileHeader](./Page/SectionedTable/Container/ProfileHeader.schema.md#styles)         | Description, Headline, Subheadline, DetailImage, BackgroundColor             |
| [SimplePropertyCell](./Page/SectionedTable/Control/SimplePropertyCell.schema.md#styles) | KeyName, Value              |
| [ImageSection](./Page/SectionedTable/Container/Image.schema.md#styles)               | ImageBackgroundColor, BackgroundColor, Image  |
| [CalendarSection](./Page/SectionedTable/Container/Calendar.schema.md#styles)               | Calendar, InnerMonthLabel, WeekDayLabel, WeekDayLabelToday, Header, Dates  |

For `ObjectHeader`, the available sub-controls includes all possible sub-controls when its `AnalyticView` is configured as `Chart` or `KPI`.
You may style on sub-controls of section controls from a rule as well. The method is the same as Form Cells, as examples above. 

For `ObjectCell`, it consists of sub-controls, namely `AvatarStack` and `AvatarGrid`. The Avatars that are configured in these sub-controls can be styled individually and examples can be found [here](./Page/SectionedTable/Control/ObjectCell.schema.md#examples).
