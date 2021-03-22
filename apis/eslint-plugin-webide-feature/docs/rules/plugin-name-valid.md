# A "plugin.json" file must contain a valid _name_ field (_plugin-name-valid_)

## Rule Details

The _plugin-name-valid_ rule displays an alert when a **plugin.json** file of a feature does not contain a valid _name_ field.

Example of **correct** code for this rule:

```json
{
	"name": "myPlugin"
}
```

Example of **incorrect** code for this rule:

```json
{
	"description": "Opens a dialog box."
}
```
