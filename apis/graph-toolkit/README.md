# Graph Toolkit

Graph is a unified API for SAP, using modern open standards like OData v4.

With Graph, developers access SAP-managed business data as a single semantically connected data graph, spanning the suite of SAP products. Targeting SAP's ecosystem of developers and customers, Graph's one API and Business Data Graph reduce the cost and complexity of creating and deploying reusable extension applications.

The Graph Command Line Tool allows users with the role of _SAP_Graph_Key_User_ to mantain business data graphs.

## Installation

```sh
npm install -g @sap/graph-toolkit
```

or for a specific version (e.g. 3.0.8)

```sh
npm install -g @sap/graph-toolkit@3.0.8
```

Test your installation with

```sh
graphctl --version
```

For this example, you should see the output

```sh
3.0.8
```

## Usage

Execute the following command to get help and an overview of all available commands

```sh
graphctl --help
```

For more information, see [Documentation](https://explore.graph.sap/docs/beta/configure/configure-graph).
