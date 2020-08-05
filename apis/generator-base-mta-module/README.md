
# @sap/generator-base-mta-module
Yeoman generator for collecting user inputs on the multi target application (MTA) project location and the target for generating the module content, etc. in a consistent way.

## Requirements

[Cloud MTA](https://github.com/SAP/cloud-mta) minimal version should be [0.1.2](https://github.com/SAP/cloud-mta/releases/tag/v0.1.2).


## Installation

First, install [Yeoman](http://yeoman.io) and generator-base-module using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).


```bash
npm install -g yo
npm install -g @sap/generator-base-mta-module
```

## Generate

Then call the generator:

```bash
yo base-mta-module --mtaFilePath=c:/testMTA/mta.yaml --defaultName=ui5
```

## Generator options

The generator accepts several options which can be passed by user (are written as command line flags):
 * mtaFilePath - path to mta.yaml file. Serves the use case where the path to the mta.yaml is known from the context.
 * mtaFilesPathsList - list of mta.yaml files. Serves the use case where the list of available mta.yaml files is known from the context. If the mtaFilePath option is passed, this parameter is ignored.
 * configPath - path to the configuration file. 
 * defaultName - default module name.
 * targetFolderPath - path to the module target folder. Indicates where to generate the module folder.
 * relativeTargetFolderPath - path to the module target folder relative to the mta.yaml file, e.g 'app'.
 * addMtaId - add MTAID to module name: true or false(default). Only relevant if default module name is provided.
 * noTargetFolder - No folder module: true or false(default). Set this option to true if no content in the file tree should be generated for this module. This option overrides the “targetFolderPath” option.

## Getting To Know Yeoman

 * Feel free to [learn more about Yeoman](http://yeoman.io/).
 
 
 ## Release 
 1.1.3
