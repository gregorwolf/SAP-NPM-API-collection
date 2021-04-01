# All required services in a "plugin.json" file must be in use. (_no-unused-required-services_)

## Rule Details

The _no-unused-required-services_ rule displays an alert if there is a service in the _"requires":"services"_ section of a **plugin.json** file (see code snippet below) that is not used either in the **plugin.json** file itself or in the plugin's JavaScript code.

```json
"requires": {
		"services": [
			"usernotification",
			"log",
			"command",
			"commandGroup"
		]
	}
```
