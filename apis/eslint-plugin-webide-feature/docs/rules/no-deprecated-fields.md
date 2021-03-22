# A "package.json" file should not contain _deprecatedPluginExtensions_ or _deprecatedConfigIncludes_ fields. (_no-deprecated-fields_)

## Rule Details

If the _deprecatedPluginExtensions_ or _deprecatedConfigIncludes_ field exists in a **package.json** file of an SAP Web IDE feature, the _no-deprecated-fields_ rule displays an alert.

Example of **incorrect** code for this rule:

```json
{
	"deprecatedConfigIncludes": {},

	"deprecatedPluginExtensions": {}
}
```
