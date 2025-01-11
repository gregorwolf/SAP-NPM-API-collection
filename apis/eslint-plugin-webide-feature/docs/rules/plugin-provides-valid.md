# The _services_ and _interfaces_ file references in a "plugin.json" file must be valid. (_plugin-provides-valid_)

## Rule Details

The _plugin-provides-valid_ rule displays an alert when a **plugin.json** file contains services and interfaces that include an invalid or nonexistent file reference.

A service must include two properties: the _implements_ property and one of the following properties:

- _module_
- _factory_

| Property Name | Description                                                                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _implements_  | Must contain the corresponding interface for the service mentioned in the _module_ or _factory_ property.                                                                                                                                |
| _module_      | Must have a valid plugin name (the current plugin name) followed by a slash \(\/\) that is followed by a path to the **service .js** file.                                                                                               |
| _factory_     | Must have a valid factory service name that appears in the _requires_ or _provides_ block. NOTE: For more information, see _Service Factories_ in the [SAP Web IDE SDK](https://sdk-sapwebide.dispatcher.hana.ondemand.com/index.html#). |

Example using the _implements_ and _module_ properties:

```
{
    "provides": {
        "services": {
            "myService": {
                "implements": "SomeInterface",
                "module": "some.plugin.name/MyService"
            }
        }
    }

}
```

Example using the _implements_ and _factory_ properties:

```
{
    "requires": {
        "services": [
            "myExampleServiceFactory"
        ]
    },
    "provides": {
        "services": {
            "myService": {
                "implements": "SomeInterface",
                "factory": "myExampleServiceFactory"
            }
        }
    }
}
```

An interface must contain a value as shown below.

```
{
    "provides": {
        "interfaces": {
            "SomeInterface": "some.plugin.name/SomeInterface"
        }
    }
}
```

The value string must consist of a valid plugin name (the current plugin name) followed by a slash \(\/\) that is followed by a path to the interface JSON file.

Example of **correct** code for this rule:

```json
{
	"name": "some.plugin.name",
	"provides": {
		"services": {
			"myService": {
				"implements": "SomeInterface",
				"module": "some.plugin.name/MyService"
			}
		},
		"interfaces": {
			"SomeInterface": "some.plugin.name/SomeInterface"
		}
	}
}
```

Example of **incorrect** code for this rule:

```json
{
	"name": "some.plugin.name",
	"provides": {
		"services": {
			"myService": {
				"implements": "SomeInterface",
				"module": "some.other.plugin.name/MyService"
			}
		}
	}
}
```

```
{
    "name": "some.plugin.name",
    "provides": {
        "services": {
            "myService": {
                "implements": "SomeInterface",
                "factory": "myFactory"
            }
        },
	   "interfaces": {
	       "SomeInterface": "some.plugin.name/SomeInterface"
	   }
    }
}
```

**NOTE**: The _module_ path should point to the current plugin.
