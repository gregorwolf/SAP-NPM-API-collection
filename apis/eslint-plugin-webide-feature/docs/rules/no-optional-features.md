# A "package.json" file must not contain an _optionalBundledFeatures_ field. (_no-optional-features_)

## Rule Details

If the _optionalBundledFeatures_ field exists in a **package.json** file of an SAP Web IDE feature, the _no-optional-features_ rule displays an alert.

Example of **incorrect** code for this rule:

```json
{
	"optionalBundledFeatures": {
		"optFeatureId": "file:optFeaturePath/package.json"
	}
}
```
