## Overview

This is the eslint plugin for UI5 appplications. It contains a set of eslint rules and recommended ESLint configuration for static jsdoc code checks of sap.ui.define modules to be used by UI5 appplication developers.

## Usage

To add this package as a dependency in your **package.json** file, do the following:

1. Under the "devDependencies" section, add the following dependency: `"@sap/eslint-plugin-ui5-jsdocs": "2.0.x"`
1. Add `.eslintrc.json` file with the following content:

```json
{
  "plugins": ["@sap/ui5-jsdocs"],
  "extends": "plugin:@sap/ui5-jsdocs/recommended"
}
```

## List of rules

| Rule                                                           | Description                                      | Recommended Severity | Fixable |
| :------------------------------------------------------------- | :----------------------------------------------- | :------------------- | :------ |
| [no-jsdoc](docs/rules/no-jsdoc.md)                             | There is no JSDoc provided                       | Warning              | yes     |
| [no-jsdoc-param](docs/rules/no-jsdoc-param.md)                 | There is no JSDoc param defined                  | Warning              | yes     |
| [check-jsdoc-param-type](docs/rules/check-jsdoc-param-type.md) | The JSDoc param type is incorrect                | Warning              | yes     |
| [duplicate-jsdoc-params](docs/rules/duplicate-jsdoc-params.md) | The argument should contain only one JSDoc param | Warning              | no      |

