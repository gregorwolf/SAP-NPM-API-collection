# `@sap/cloud-sdk-generator`

Generate your own service module using a service specification (.edmx file).

## Installation

```sh
npm install @sap/cloud-sdk-generator
```

## Usage

The generator is primarily meant to be used on the command line:
```sh
generate-odata-client --inputDir path/to/your/service-specification(s) --outputDir path/where/the/modules/are/stored
```
Run `generate-odata-client --help` for further options.

You can also use the generator programatically. You will have to provide the options anyways.
```ts
import { generateProject } from '@sap/cloud-sdk-generator';

// initialize generator options based on what you want to do
const options: GeneratorOptions = initializeOptions();

// creates a Project datastructure with all sourcefiles based on your options
const project = generateProject(options);

// here you can modify you project if you need to

// save the files at the specified location
project.save();

// alternatively you can generate and save the project in one step with: generate(options)
```
