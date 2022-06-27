# @sap/hana-tooling-feature-toggles
A node library for checking feature toggles. It gives you the option to create standard feature toggles and also feature toggles for Visual Studio Code commands.

## Usage

### Instantiation

Create an instance managing your feature toggles. The first parameter has to be either a JSON object or a string. The second parameter is the name of your Visual Studio Code extension (optional) if you want to enable / disable Visual Studio Code commands. The third parameter is a Visual Studio Code API object (optional).
Depending on the type of your first parameter the module will
a) directly use the provided feature toggles.
b) check if the string is stringified JSON.
c) try to read the file at the provided path.

Pure Node.js:

```javascript
    // With JSON parameter.
    import FeatureToggles = require("@sap/hana-tooling-feature-toggles");
    const myFeatures = {
        "featureToggles": [
            {
                "name": "helloworld",
                "status": "released"
            }
        ]
    };
    const FeatureToggleInstance = new FeatureToggles(myFeatures);
```
```javascript
    // With string parameter.
    import FeatureToggles = require("@sap/hana-tooling-feature-toggles");
    const FeatureToggleInstance = new FeatureToggles(__dirname + "/../features.json");
```
```javascript
    // With stringified JSON parameter.
    import FeatureToggles = require("@sap/hana-tooling-feature-toggles");
    const myFeatures = {
        "featureToggles": [
            {
                "name": "helloworld",
                "status": "released"
            }
        ]
    };
    const featureString = JSON.stringify(myFeatures);
    const FeatureToggleInstance = new FeatureToggles(featureString);
```


Visual Studio Code:

```javascript
    const vscode = require( 'vscode' );
    import FeatureToggles = require("@sap/hana-tooling-feature-toggles");
    const FeatureToggleInstance = new FeatureToggles(__dirname + "/../features.json", "featuretoggletest", vscode);
```

The structure of your JSON object / file (first parameter) should be:

```json
{
    "featureToggles": [
        {
            "name": "helloworld",
            "status": "released"
        },
        {
            "name": "helloworlddisabled",
            "status": "dev"
        },
        {
            "name": "helloworldqa",
            "status": "candidate"
        }
    ]
}
```

The name is the unique identifier of your feature and the status determines whether it is in development, a candidate for release or a released feature.

### API

```javascript
    FeatureToggles.isFeatureEnabled("featureToggleName")
```

This function checks if the feature 'featureToggleName' is enabled inside your specified .json file for feature toggles:
- If the feature is enabled (for example 'helloworld' in the code above), it will return true.
- If the feature is disabled (for example 'helloworlddisabled' in the code above), it will call _isFeatureQaEnabled("featureToggleName") and return the internal result.

```javascript
    FeatureToggles.isCommandEnabled("featureToggleName")
```

This function should only be used if you are developing a Visual Studio Code extension and want to set feature toggles for commands. It will work like '.isFeatureEnabled("featureToggleName")' with the difference that it will set a Visual Studio Code context variable which makes the command visible to the user.

The set Visual Studio Code context variable will be:
```javascript
    "extensionName:featureToggleName"
```

So the package.json file of your extension should contain the following structure:

```javascript
	"contributes": {
		"commands": [
			{
				"command": "extensionName.commandName",
				"title": "Hello World (enabled)"
			}
		],
		"menus": {
			"commandPalette": [
				{
					"command": "extensionName.commandName",
					"when": "extensionName:featureToggleName1"
                }
            ],
            "editor/context": [
                {
					"command": "extensionName.commandName",
					"when": "extensionName:featureToggleName2"
				}
            ]
        }
    }
```

## License
This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3_1.txt).