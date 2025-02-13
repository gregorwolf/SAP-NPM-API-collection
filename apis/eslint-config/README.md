[![REUSE status](https://api.reuse.software/badge/github.com/SAP/eslint-config)](https://api.reuse.software/info/github.com/SAP/eslint-config)

# ESLint Configuration for SAP Ecosystem

## About this project

Set of linting rules for JavaScript/TypeScript based projects in SAP ecosystem.

The package provides the following rule sets:

- `default`: All relevant rules for linting JavaScript files.
- `typescript`: All relevant rules for linting TypeScript files. Contains or overrides `base` rules where appropriate.
- (**Temporarily unsupported**) `react`: All relevant rules for linting TypeScript files in React projects. Contains or overrides `typescript` rules where appropriate.

## Usage

### Prerequisites

- [Node.js](https://nodejs.org/en/) `>= v20`
- [npm](https://www.npmjs.com/) `>= v10`

### Installation

1. Run in the project root directory:

   ```bash
   npm install --save-dev eslint @sap/eslint-config
   ```

2. Create `eslint.config.js` in the project root:

   ```javascript
   const { configs } = require("@sap/eslint-config");

   module.exports = configs.recommended;
   ```

### Project setup examples

- [Standalone project with TypeScript](./examples/standalone/)
- [Monorepo with TypeScript + Husky + Lint-staged](./examples/monorepo/)

## Support, Feedback, Contributing

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/eslint-configuration-for-sap-ecosystem/issues). Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Security / Disclosure

If you find any bug that may be a security problem, please follow our instructions at [in our security policy](https://github.com/SAP/eslint-configuration-for-sap-ecosystem/security/policy) on how to report it. Please do not create GitHub issues for security-related doubts or problems.

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright 2025 SAP SE or an SAP affiliate company and eslint-configuration-for-sap-ecosystem contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/eslint-configuration-for-sap-ecosystem).
