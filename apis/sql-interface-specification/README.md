[![REUSE status](https://api.reuse.software/badge/github.com/SAP/sql-interface-specification)](https://api.reuse.software/info/github.com/SAP/sql-interface-specification)

# SQL interface specification for SAP ecosystem

## About this project

The SQL interface specification for SAP ecosystem defines a standard document format for describing and publishing metadata of database-level API resources of a (database) server to allow consumers to discover API resources and to interact with a server via SQL client interfaces and SQL query or data manipulation statements.

The SQL interface specification for SAP ecosystem is like the Open API specification [1], but for SQL-based APIs instead of REST-based APIs.

[1] The OpenAPI Specification, Version 3.1.0, 2021. https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.1.0.md

## Versions

The current version is [SQL interface specification for SAP ecosystem 1.0.2](/versions/1.0.2.md).

The corresponding JSON schema is [schemas/v1.0/schema.yaml](/schemas/v1.0/schema.yaml).

Examples are located in the [examples](/examples) folder.

## Requirements

The [scripts](/scripts) folder contains some scripts to validate a SQL interface document, to convert between JSON and YAML representations, and to run the tests of the JSON schema file.

The scripts are based on [Node.js](https://nodejs.org). Before running a script, ensure that dependencies are installed via `npm install`.

## Contributing

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/sql-interface-specification/issues). Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Security / Disclosure
If you find any bug that may be a security problem, please follow our instructions at [in our security policy](https://github.com/SAP/sql-interface-specification/security/policy) on how to report it. Please do not create GitHub issues for security-related doubts or problems.

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright 2024 SAP SE or an SAP affiliate company and SQL interface specification for SAP ecosystem contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/sql-interface-specification).
