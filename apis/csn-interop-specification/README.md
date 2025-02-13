[![REUSE status](https://api.reuse.software/badge/github.com/SAP/csn-interop-specification)](https://api.reuse.software/info/github.com/SAP/csn-interop-specification)

# Core Schema Notation Interoperability Specification

**Documentation Page**: https://sap.github.io/csn-interop-specification/

Core schema notation interoperability specification (short: CSN Interop) is a powerful and flexible format used to represent the structure and metadata of data and service models in the wider SAP and BTP ecosystem. CSN files are JSON-based and provide a comprehensive way to describe entities, relationships, and other aspects of the model.

For questions and feedback, please create a [GitHub Issue](https://github.com/SAP/csn-interop-specification/issues).

## Contribute

If you want to propose concrete changes, the best way is to create a GitHub PR request.
The documentation files can be found in the [./docs](./docs/) folder.
On the GitHub page, every page includes an "Edit this page" link at the bottom, which will also take you to the correct file to create changes for.

For more general requests (like missing content), please create a [GitHub Issue](https://github.com/SAP/csn-interop-specification/issues) in this repository.

## Development Setup

```bash
# Prerequisite: Node.js 18+ installed
# Install dependencies
npm i

# Build docusaurus page locally
npm run build

# Start development server / local preview
npm start

# Create or update the generated pages, e.g. interface documentation
npm run generate

# Run unit tests
npm run test-unit
```

This repository uses simple trunk-based development flow.
Always create a new branch with your changes and create a PR.
There automatic checks + review will be done.
A merge to main will result to the GitHub page to be updated.

## Support, Feedback, Contributing

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/csn-interop-specification/issues). Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

- Contact Persons: [Andreas Balzar](mailto:andreas.balzar@sap.com), [Simon Heimler](mailto:simon.heimler@sap.com) and [Raluca Gruber](mailto:raluca.gruber@sap.com)

## Security / Disclosure

If you find any bug that may be a security problem, please follow our instructions at [in our security policy](https://github.com/SAP/csn-interop-specification/security/policy) on how to report it. Please do not create GitHub issues for security-related doubts or problems.

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright 2024 SAP SE or an SAP affiliate company and csn-interop-specification contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/csn-interop-specification).
