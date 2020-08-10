# CDS Language Server - ```@sap/cds-lsp```

The CDS language server implements the Language Server Protocol ([LSP](https://github.com/Microsoft/language-server-protocol)) 
for SAP's Core Data Services ([CDS](https://cap.cloud.sap/docs/cds/cdl)). 
It can be used in many popular IDEs like, for example, [Visual Studio Code](https://cap.cloud.sap/docs/get-started/tools#vscode) 
or [Eclipse](https://cap.cloud.sap/docs/get-started/tools#eclipse). 
It provides many useful features for working with and enjoying CDS sources.

## Features

- Source code validation providing diagnostics (error messages, warnings, ...)

- Quick fixes to
    - create using statement for unknown artifacts
    - maintain missing translation
    - convert `@cds.doc` and `@description` annotations to doc comments
    
- Where-used navigation to 
    - definition
    - references
    - highlight occurrences
    
- Inventory (symbols) for
    - current file
    - workspace incl. query capabilities to select, for example, artifact types, names, also include reuse models
    
- Code completion for
    - keywords
    - identifiers
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
    
- Hover information based on
    - doc comments
    - `@title`, `@description` and ~~`@cds.doc`~~ (deprecated) annotations
    - translations
    
- Code formatting 
    - whole document
    - selected range
    - on-the-fly when completing statements using ```;``` or ```}```
    - on save (depending on the IDE)
    - on paste (depending on the IDE) 
    - with many options, configurable using
        - settings file
        - command line switches
        - Config UI with simulation of options for Visual Studio Code and Eclipse
        - JSON schema for textual support
    - also for markdown in doc comments
    
- Translation support
    - properties, JSON, and CSV files
    - navigate to translation definitions from translation IDs like ```'{i18n>customerName}'``` 
    - show translations on hover
    - quickfix to maintain missing translations 
        
- Textmate grammar for syntax highlighting

- Plugin framework for external handlers of annotation domains 

## Usage

The CDS language server can only be used as part of an IDE extension or plugin. See [Installation](#installation) for more details.

A code formatter for CDS source files is included.

## Installation

Refer to the [installation details](./INSTALLATION.md). 

## License
This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3_1.txt).
