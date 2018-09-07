# ESLint plugin for SAP Web IDE features

## Table of contents

- [Overview](#overview)
- [Usage](#usage)
- [List of rules](#list-of-rules)

## Overview

This is the eslint plugin for Web IDE features. It contains a set of eslint rules and recommended ESLint configuration for static code checks to be used by Web IDE feature developers.

## Usage

### Add linting to tests

To add this package as a dependency in your package.json file, do the following:

1. Under the "scripts" section, add: `"lint": "eslint src"`
1. Under the "scripts" section, add: "npm run lint" to the test section: `"test": "npm run lint && ..."`
1. Under the "devDependencies" section, add the following dependency: `"@sap/eslint-plugin-webide-feature": "a.b.c"`
1. Add `.eslintrc.json` file with the following content:

```json
{
	"plugins": ["@sap/webide-feature"],
	"extends": "plugin:@sap/webide-feature/recommended-internal"
}
```

The linting checks will be executed as part of tests.

**Please note that each version of this ESLint plugin corresponds to certain version of SAP Web IDE. As cloud version of SAP Web IDE is continiously updated it is strongly recommended to update the version of this plugin as soon as it is released. To update your feature to use the latest version of ESLint plugin, run: npm install --save-exact @sap/eslint-plugin-webide-feature@latest**

### Fix existing lint issues

After you have added linting, please execute it with `npm run lint`. Do not worry if you see lots of warnings and errors most of the can be fixed automatically with [--fix option of ESLint](https://eslint.org/docs/user-guide/command-line-interface#--fix), by running `node_modules/.bin/eslint src --fix`. Remaining issues can be fixed manually or ignored by [using special comments or overrding recommended configuration values](https://eslint.org/docs/user-guide/configuring#configuring-rules). To fix the issues manually please refer to the documentation of specific rule.

## List of rules

| Rule                                                                           | Description                                                                                             | Recommended Severity |
| :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :------------------- |
| [no-private-methods](docs/rules/no-private-methods.md)                         | Do not invoke private methods                                                                           | Error                |
| [no-private-apis](docs/rules/no-private-apis.md)                               | Do not invoke private methods                                                                           | Warning              |
| [bundled-uris-valid](docs/rules/bundled-uris-valid.md)                         | "bundledPlugins" and "bundledFeatures" arrays items must start with "file:" and have valid uri          | Error                |
| [no-deprecated-fields](docs/rules/no-deprecated-fields.md)                     | package.json file should contain neither deprecatedPluginExtensions nor deprecatedConfigIncludes fields | Warning              |
| [feature-description-valid](docs/rules/feature-description-valid.md)           | package.json file must contain description field                                                        | Warning              |
| [homepage-url-valid](docs/rules/homepage-url-valid.md)                         | package.json file must contain a homepage field with a valid path                                       | Warning              |
| [package-json-exists](docs/rules/package-json-exists.md)                       | package.json file must exist in feature's root folder                                                   | Error                |
| [consistent-ids](docs/rules/consistent-ids.md)                                 | each package.json and plugin.json file must has consistent ids                                          | Error                |
| [feature-name-valid](docs/rules/feature-name-valid.md)                         | package.json file must contain name field                                                               | Error                |
| [no-optional-features](docs/rules/no-optional-features.md)                     | package.json file must not contain optionalBundledFeatures field                                        | Error                |
| [feature-author-valid](docs/rules/feature-author-valid.md)                     | package.json file must contain an author field with name and icon                                       | Warning              |
| [feature-version-valid](docs/rules/feature-version-valid.md)                   | package.json file must contain a version field                                                          | Error                |
| [webide-dependencies-consistent](docs/rules/webide-dependencies-consistent.md) | "webideDependencies" section should be declared properly                                                | Error                |
| [plugin-name-valid](docs/rules/plugin-name-valid.md)                           | plugin.json file must contain name field                                                                | Error                |
| [plugin-provides-valid](docs/rules/plugin-provides-valid.md)                   | service and interface file references in "plugin.json" file must be valid                               | Error                |
| [no-unused-required-services](docs/rules/no-unused-required-services.md)       | All required services of a plugin must be in use                                                        | Warning              |
| [valid-json-files](docs/rules/valid-json-files.md)                             | All JSON files in a feature must be valid                                                               | Error                |
