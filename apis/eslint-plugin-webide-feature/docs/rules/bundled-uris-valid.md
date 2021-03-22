# Items in _bundledPlugins_ and _bundledFeatures_ arrays must start with "file:" and have a valid URI. (_bundled-uris-valid_)

## Rule Details

In the **package.json** file of an SAP Web IDE feature, you provide the _bundledPlugins_ and/or _bundledFeatures_ arrays. The _bundled-uris-valid_ rule checks that each bundled plugin and/or feature URI starts with "file:" and that the URI path provided is valid.

Examples of **correct** code for this rule:

```json
"bundledPlugins": {
    "sap.webide.example.plugin": "file:src/webide-plugin-example"
 }

"bundledFeatures": {
    "sap.webide.example.feature": "file:src/webide-feature-example"
 }
```

Examples of **incorrect** code for this rule:

```json
"bundledPlugins": {
    "sap.webide.example.plugin": "src/webide-plugin-example"
 }

 "bundledFeatures": {
    "sap.webide.example.feature": "file: src/webide feature example"
 }
```
