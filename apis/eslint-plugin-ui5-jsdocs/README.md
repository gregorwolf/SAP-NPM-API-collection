[![Build Status](https://jaas.wdf.sap.corp:58861/buildStatus/icon?job=eslint-plugin-ui5-jsdocs-ci%2Fmaster)](https://jaas.wdf.sap.corp:58861/job/eslint-plugin-ui5-jsdocs-ci/job/master/)
[![maintainability](https://sonarci.wdf.sap.corp:8443/sonar/api/badges/measure?key=eslint-plugin-fiori&metric=sqale_rating)](https://sonarci.wdf.sap.corp:8443/sonar/component_measures/domain/Maintainability?id=devxwing-eslint-plugin-ui5-jsdocs)
[![complexity](https://sonarci.wdf.sap.corp:8443/sonar/api/badges/measure?key=devxwing-eslint-plugin-ui5-jsdocs&metric=function_complexity)](https://sonarci.wdf.sap.corp:8443/sonar/component_measures/domain/Complexity?id=devxwing-eslint-plugin-ui5-jsdocs)
[![bugs](https://sonarci.wdf.sap.corp:8443/sonar/api/badges/measure?key=devxwing-eslint-plugin-ui5-jsdocs&metric=bugs)](https://sonarci.wdf.sap.corp:8443/sonar/component_measures/domain/Reliability?id=devxwing-eslint-plugin-ui5-jsdocs)
[![duplication](https://sonarci.wdf.sap.corp:8443/sonar/api/badges/measure?key=devxwing-eslint-plugin-ui5-jsdocs&metric=duplicated_lines_density)](https://sonarci.wdf.sap.corp:8443/sonar/component_measures/domain/Duplications?id=devxwing-eslint-plugin-ui5-jsdocs)
[![test cases](https://sonarci.wdf.sap.corp:8443/sonar/api/badges/measure?key=devxwing-eslint-plugin-ui5-jsdocs&metric=tests)](https://sonarci.wdf.sap.corp:8443/sonar/component_measures/metric/tests/list?id=devxwing-eslint-plugin-ui5-jsdocs)
[![coverage](https://sonarci.wdf.sap.corp:8443/sonar/api/badges/measure?key=devxwing-eslint-plugin-ui5-jsdocs&metric=coverage)](https://sonarci.wdf.sap.corp:8443/sonar/component_measures/domain/Coverage?id=devxwing-eslint-plugin-ui5-jsdocs)

# @sap/ui5-jsdocs

## Overview

This is the eslint plugin for UI5 appplications. It contains a set of eslint rules and recommended ESLint configuration for static jsdoc code checks of sap.ui.define modules to be used by UI5 appplication developers.

## Usage

To add this package as a dependency in your **package.json** file, do the following:

1. Under the "devDependencies" section, add the following dependency: `"@sap/eslint-plugin-ui5-jsdocs": "a.b.c"`
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
