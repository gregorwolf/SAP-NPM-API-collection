[![REUSE status](https://api.reuse.software/badge/github.com/SAP/langchainjs-integration-for-sap-hana-cloud)](https://api.reuse.software/info/github.com/SAP/langchainjs-integration-for-sap-hana-cloud)

> [!NOTE]
>
> ### Legacy Version
>
> Langchain 0.3.x compatible version of this package is maintained in the 0.3.x branch:
>
> [https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/tree/0.3.x](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/tree/0.3.x)

# langchainjs-integration-for-sap-hana-cloud

## About this project

Integrates LangChain.js with SAP HANA Cloud to make use of vector search, knowledge graph, and further in-database capabilities as part of LLM-driven applications.

## Requirements and Setup

### Prerequisites

- **NodeJS Enviroment**: Since this package uses components from Langchain, please ensure you have a compliant NodeJS environment installed [from here](https://js.langchain.com/docs/how_to/installation/)
- **Peer Dependencies Installed**: This package requries these versions langchain, @langchain/classic and @langchain/core to be installed.

```bash
npm install @langchain/core@latest @langchain/classic@latest langchain@latest
```

- **SAP HANA Cloud**: Access to a running SAP HANA Cloud instance.

### Installation

Install the LangChain SAP HANA Cloud integration package using `npm`:

```bash
npm install @sap/hana-langchain
```

## Vectorstore

[SAP HANA Cloud Vector Engine](https://help.sap.com/docs/hana-cloud-database/sap-hana-cloud-sap-hana-database-vector-engine-guide/sap-hana-cloud-sap-hana-database-vector-engine-guide) is a vector store fully integrated into the `SAP HANA Cloud` database.

<!-- MIGRAGE USAGE EXAMPLE TO LANGCHAIN DOCS -->
See a [usage example](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/blob/main/examples/vectorstores/basics.ts).

```javascript
import { HanaDB } from "@sap/hana-langchain"
```

## Self Query Retriever

[SAP HANA Cloud Vector Engine](https://help.sap.com/docs/hana-cloud-database/sap-hana-cloud-sap-hana-database-vector-engine-guide/sap-hana-cloud-sap-hana-database-vector-engine-guide) also provides a Self Query Retriever implementation using the `HanaTranslator` Class.

<!-- MIGRATE USAGE EXAMPLE TO LANGCHAIN DOCS -->
See a [usage example](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/blob/main/examples/self_query/basics.ts).

```javascript
import { HanaTranslator } from "@sap/hana-langchain"
```

## Graph

[SAP HANA Cloud Knowledge Graph Engine](https://help.sap.com/docs/hana-cloud-database/sap-hana-cloud-sap-hana-database-knowledge-graph-guide/sap-hana-cloud-sap-hana-database-knowledge-graph-engine-guide) provides support to utilise knowledge graphs through the `HanaRdfGraph` Class.

<!-- MIGRAGE USAGE EXAMPLE TO LANGCHAIN DOCS -->
See a [usage example](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/blob/main/examples/graphs/basics.ts).

```javascript
import { HanaRdfGraph } from "@sap/hana-langchain"
```

## Chains

A `SparqlQAChain` is also provided which can be used with `HanaRdfGraph` for SPARQL-QA tasks.

See a [usage example](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/blob/main/examples/chains/sparqlQaChain.ts).

```javascript
import { HanaSparqlQAChain } from "@sap/hana-langchain"
```

## Documentation

<!-- MIGRATE DOCUMENTATION TO LANGCHAIN DOCS -->
<!-- For a detailed guide on using the package, please refer to [Langchain Hana Docs](https://js.langchain.com/docs/integrations/providers/sap/). -->
Please refer to the examples in [`examples/`](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/blob/main/examples) to know more about the different components available in the package.

## Support, Feedback, Contributing

This project is open to feature requests/suggestions, bug reports etc. via [GitHub issues](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/issues). Contribution and feedback are encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Security / Disclosure

If you find any bug that may be a security problem, please follow our instructions at [in our security policy](https://github.com/SAP/langchainjs-integration-for-sap-hana-cloud/security/policy) on how to report it. Please do not create GitHub issues for security-related doubts or problems.

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. By participating in this project, you agree to abide by its [Code of Conduct](https://github.com/SAP/.github/blob/main/CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright 2025 SAP SE or an SAP affiliate company and langchainjs-integration-for-sap-hana-cloud contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/langchainjs-integration-for-sap-hana-cloud).
