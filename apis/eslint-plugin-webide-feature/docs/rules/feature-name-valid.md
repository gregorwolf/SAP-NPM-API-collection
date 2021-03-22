# A "package.json" file must contain a valid _name_ field. (_feature-name-valid_)

## Rule Details

The _feature-name-valid_ rule displays an alert when the **package.json** file of a feature does not contain a valid _name_ field.

Example of **correct** code for this rule:

```json
{
	"name": "myFeature"
}
```

Example of **incorrect** code for this rule:

```json
{
	"description": "Opens a dialog box."
}
```
