# A "package.json" file must contain a valid _version_ field. (_feature-version-valid_)

## Rule Details

The _feature-version-valid_ rule displays an alert when the **package.json** file of a feature does not contain a valid _version_ field.

Example of **correct** code for this rule:

```json
{
	"name": "myFeature",
	"version": "1.0.0"
}
```

Example of **incorrect** code for this rule:

```json
{
	"name": "myFeature"
}
```
