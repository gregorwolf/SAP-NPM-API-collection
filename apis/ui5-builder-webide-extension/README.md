# ui5-builder-webide-extension

The SAP Web IDE extension for the UI5 builder provides custom tasks which are not part of the standard UI5 builder. The tasks can be added to the application or library project as custom tasks.

## Usage

First of all, declare the dependency to this project in the package.json of the application or library:

```json
  "dependencies": {
    "ui5-builder-webide-extension": "^1.0.0"
  },
```

As of today, the custom tasks need to be added to the `dependencies` section rather than to the `devDependencies` section.

Now, you can add the custom tasks to the `ui5.yaml` of the application or library:

```yaml
specVersion: '1.0'
metadata:
  name: my-app
type: application
builder:
    customTasks:
    - name: simpleTask
      afterTask: replaceVersion
    - name: otherTask
      afterTask: simpleTask
```

The `simpleTask` will be added after the `replaceVersion` and the `otherTask` will be executed after the `simpleTask`.
