# A "package.json" file must contain a _homepage_ field with a valid path. (_homepage-url-valid_)

## Rule Details

If the _homepage_ field is missing or has an invalid path in a **package.json** file of an SAP Web IDE feature, the _homepage-url-valid_ rule displays an alert.

Example of **correct** code for this rule:

```json
{
	"name": "featureName1",
	"homepage": "https://www.website.com"
}
```

Examples of **incorrect** code for this rule:

```json
{
	"name": "featureName2",
	"homepage": "https://white space.com"
}
```

```json
{
	"name": "featureName3",
	"homepage": "noProtocol"
}
```

```json
{
	"name": "featureName4",
	"homepage": "onlyProtocol:"
}
```
