# Predefined plugins for feature validations

## Predefined plugins

• **[RequireJS](https://github.com/cvisco/eslint-plugin-requirejs) - Enforce code conventions for RequireJS modules with ESLint.**

Rules severity configuration

    "plugin:requirejs/recommended",

and [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/recommended.json#L10-L12).

---

• **[es5](https://github.com/nkt/eslint-plugin-es5) - ESLint plugin for ES5 users.**
This plugin sets default values to 'error', which is too strict, then we gave [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/recommended.json#L14-L31) for the plugin.

---

• **[Lodash](https://github.com/wix/eslint-plugin-lodash) - Lodash specific linting rules.**
This plugin sets default values for stylistic issues to 'error', which is too strict, then [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/common.json#L64-L102) for the plugin.

---

• **[ESLint](https://github.com/mysticatea/eslint-plugin-eslint-comments) Comments - Best practices about ESLint directive comments (/_eslint-disable_/, etc...)**

Our recommendation rules severity for the plugin

    "plugin:eslint-comments/recommended"

and [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/recommended.json#L33-L36).

---

• **[JSDoc](https://github.com/gajus/eslint-plugin-jsdoc) - Linting rules for JSDoc comments.**
This plugin sets default values for to 'error', which is too strict, then recommendation [rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/common.json#L104-L116) for the plugin:

---

• **[XSS](https://github.com/Rantanen/eslint-plugin-xss) - Tries to detect XSS issues in codebase before they end up in production.**

Our [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/common.json#L120-L121) for the plugin

---

• **[unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) - Various awesome ESLint rules.**

Our recommendation rules severity for the plugin
"plugin:unicorn/recommended",

and [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/recommended.json#L38-L50).

---

• **[promise](https://github.com/xjamundx/eslint-plugin-promise) - Enforce best practices for JavaScript promises.**
Our recommendation rules severity for the plugin

    "plugin:promise/recommended"

and [recommendation rules severity](https://github.wdf.sap.corp/DevX/eslint-plugin-webide-feature/blob/master/lib/configs/recommended.json#L52-L54).
