# A "package.json" file must contain a valid _author_ field with _name_ and _icon_ fields. (_feature-author-valid_)

## Rule Details

The _author_ field together with its _name_ and _icon_ fields are mandatory in a **package.json** file of an SAP Web IDE feature. If they are invalid or missing, the _feature-author-valid_ rule displays an alert.

Example of **correct** code for this rule:

```json
{
        "author": {
			"name": "featureName1",
			"icon": "https://www.website.com"
		}
```

```json
	"author": {
		"name": "featureName2",
		"icon": "/icon.png"
	}
}
```

Examples of **incorrect** code for this rule:

```json
{
	"author": {
		"name": "featureName3",
		"icon": "https://white space.com"
	}
}
```

```json
{
	"author": {
		"name": "featureName4",
		"icon": "noProtocol"
	}
}
```
