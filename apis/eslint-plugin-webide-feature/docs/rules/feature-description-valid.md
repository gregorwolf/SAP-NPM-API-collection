# A "package.json" file must contain a valid _description_ field. (_feature-description-valid_)

## Rule Details

If the _description_ field is missing or invalid in a **package.json** file of an SAP Web IDE feature, the _feature-description-valid_ rule displays an alert.

Example of **correct** code for this rule:

```json
{
	"name": "myFeature",
	"description": "Opens a dialog box."
}
```

Example of **incorrect** code for this rule:

```json
{
	"name": "myFeature"
}
```
