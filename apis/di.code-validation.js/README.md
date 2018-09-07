# di.code-validation.js

A javascript code validator for DI based on eslint, implements di.code-validation.core API.

# install

npm install di.code-validation.js --save-dev

# Usage

```javascript
var jsvalidator = require("di.code-validation.js");
var ValidationMetadata = require("di.code-validation.core").validationMetadata;
var FileResource = require("di.code-validation.core").fileResource;

var validationMetadata = new ValidationMetadata(<proLocation>);
var fileResources = [];
var fileResource = new FileResource(<full project path>, <full file path>);
fileResources.push(fileResource);
var result = jsvalidator.validateFiles(validationMetadata, fileResources);
```

_result_ structure

```javascript
{
    "category" : <category for the rule>,
    "checker" : <base linter used>,
    "column" : 0,
    "line" : 2,
    "helpUrl" : <url for help documentation>,
    "message" : <message>,
    "path" : <full file path>,
    "ruleId" : <rule id>,
    "severity" : <error/warning/info>
}
```
