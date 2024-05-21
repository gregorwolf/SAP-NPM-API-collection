# CDS Language Server

The CDS language server implements the Language Server Protocol ([LSP](https://github.com/Microsoft/language-server-protocol))
for SAP's Core Data Services ([CDS](https://cap.cloud.sap/docs/cds/cdl)).
It can be used in many popular IDEs like, for example, [Visual Studio Code](https://cap.cloud.sap/docs/get-started/tools#vscode),
[IntelliJ](https://github.com/cap-js/cds-intellij),
or [Eclipse](https://cap.cloud.sap/docs/get-started/tools#eclipse).
It provides many useful features for working with and enjoying CDS sources.

## Features

- Syntax highlighting via Textmate grammar

- Additional semantic highlighting

- Source code validation providing diagnostics (error messages, warnings, ...)

- Where-used navigation to
    - definition
    - references
    - highlight occurrences

- Code completion for
    - keywords
    - identifiers incl. not yet imported identifiers with corresponding `using` statement
    - using paths and artifacts incl. showing README.md documentation as details
    - i18n translation IDs
    - turn on/off formatting regions

- Snippets for typical CDS language construct<br/> (with documentation extracts of [capire](https://cap.cloud.sap/docs/cds/cdl) explaining language concepts)<br/> like
    - namespace and context
    - using
    - service
    - type
    - entity and projections, ...
    - element, associations, and compositions
    - extend and annotate
    - annotations for documentation
    - annotate all elements of an entity

- Quick fixes to
    - create using statement for unknown artifacts
    - maintain missing translation
    - convert `@description` annotations to doc comments

- Inventory (symbols) for
    - current file (Outline)
    - workspace incl. query capabilities to select, for example, artifact types, names, also include reuse models

- Hover information based on
    - doc comments
    - `@title` and `@description` annotations
    - translations
  - `README.md` and `package.json#description`

- Code formatting
    - whole document
    - selected range
    - on-the-fly when completing statements using `;` or `}`
    - on save (depending on the IDE)
    - on paste (depending on the IDE)
    - with many options, configurable using
        - settings file
        - command line switches
        - Config UI with simulation of options for Visual Studio Code and Eclipse
        - JSON schema for textual support
    - also for markdown in doc comments

- Code formatting via CLI (incl. verification mode)

- Translation support
    - properties, JSON, and CSV files
    - navigate to translation definitions from translation IDs like `'{i18n>customerName}'`
    - show translations on hover
    - quickfix to maintain missing translations

- Annotation support via external plugin
    - diagnostics
    - where-used navigation
    - hover information
    - code completion
    - quick fixes for translations

## Usage

The CDS language server can only be used as part of an IDE extension or plugin. See [Installation](#installation) for more details.

A code formatter for CDS source files is included.

## Installation

Refer to the [installation details](doc/INSTALLATION.md).

## License
This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3_1.txt).
