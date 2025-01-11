# di.code-validation.js

A javascript code validator for DI based on eslint, implements di.code-validation.core API.

# Install

npm install di.code-validation.js --save-dev

# Migrating to v2.0.0

We have made ***breaking changes*** to this release as a result of the migration to eslint _v8.x.x_. Some of the public APIs now provide **asynchronous** behavior - please review the usage example to refine your code.

# Usage

```javascript
const jsvalidator = require("di.code-validation.js");
const ValidationMetadata = require("di.code-validation.core").validationMetadata;
const FileResource = require("di.code-validation.core").fileResource;

const validationMetadata = new ValidationMetadata(<proLocation>);
const fileResources = [];
const fileResource = new FileResource(<full project path>, <full file path>);
fileResources.push(fileResource);
const result = await jsvalidator.validateFiles(validationMetadata, fileResources);
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
