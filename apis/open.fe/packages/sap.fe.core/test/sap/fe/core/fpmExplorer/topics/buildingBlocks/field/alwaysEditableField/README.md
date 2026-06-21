# AlwaysEditableField Building Block Example

This example demonstrates the **AlwaysEditableField** building block in the SAP Fiori elements Dev Portal.

## Overview

The AlwaysEditableField building block provides always-editable fields that work with JSON model bindings. Unlike the standard Field building block, AlwaysEditableField ignores OData editability rules and is designed for:

-   Custom popup dialogs
-   Action parameter forms
-   Scenarios where fields must always be editable regardless of draft status or metadata

## File Structure

```
alwaysEditableField/
├── AlwaysEditableField.view.xml         # Main view with fpmExplorer:Page
├── Sample.fragment.xml         # Sample implementation with examples
├── Component.js                # Component with JSON model initialization
├── manifest.json               # App manifest with routing and models
├── code/
│   └── usage.xml              # Code example for custom dialog
└── i18n/
    └── i18n.properties        # Internationalization texts
```

## Running the Example

Navigate to: `/test/sap/fe/core/fpmExplorer/topics/buildingBlocks/alwaysEditableField.html`

Or access via Dev Portal: Building Blocks → Field → AlwaysEditableField

## Key Features Demonstrated

1. **Always Editable**: Fields are always rendered as editable, ignoring OData metadata
2. **JSON Model Support**: `value` and `description` properties support JSON model bindings
3. **FormatOptions**: Full support for formatting options (displayMode, textLinesEdit, etc.)
4. **ValueHelp Integration**: Dropdowns work with JSON bindings
5. **All Edit Styles**: Input, TextArea, CheckBox, DatePicker, etc.

## Usage Pattern

```xml
<macros:AlwaysEditableField
	id="customField"
	metaPath="/Travel/AgencyID"
	contextPath="/Travel"
	value="{dialogModel>/agencyID}"
	description="{dialogModel>/agencyName}"
	formatOptions="{
        displayMode: 'DescriptionValue'
    }"
/>
```

## Properties

-   `id` (required): Field identifier
-   `metaPath` (required): Path to property metadata
-   `contextPath` (required): Entity context path
-   `value`: Binding to JSON model value
-   `description`: Binding to JSON model description/text
-   `formatOptions`: Aggregation for formatting options
-   `vhIdPrefix`: Value help ID prefix

## Events

-   `change`: Fired when field value changes
-   `liveChange`: Fired on live changes (typing)
