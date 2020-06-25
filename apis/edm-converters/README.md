@sap/edm-converters
===================

This module provides several model converters. The following converters are currently supported:

* OData V2 EDM model (XML Format) to OData V4 EDM (JSON Format)
(details [Readme](./lib/edmxV20ToJsonV40/README.md))
* OData V4 EDM model (XML Format) to OData V4 EDM (JSON Format)
(details [Readme](./lib/edmxV40ToJsonV40/README.md))

Each converter is contained in separate folder inside the lib folder.
A detailed description of a converter is provided in the README.md
of each converter sub-folder, or you may check the API documentation
in the `index.js` and other files. Please note that it is also possible
to compile an HTML version of the API documentation with:

```
cd @sap/edm-converters
npm install  # this will install the development dependencies
npm run doc      # this will generate the documentation
```

(If the module is installed into the global node package folder,
use `npm root -g` to find and navigate to it.)

# Usage scenario

The model converters can be used to convert the OData EDMX V2 or EDMX V4 model of a remote service
into the EDM V4 JSON format. This EDM V4 JSON format can then be used with the OData Consumption library
in module @sap/odata-v4 to consume remote OData services.

The converters can be called via commandline or programmtically via an API

# Installation

The @sap/edm-converters provide a commandline interface and a API for use with node.

## Installation commandline interface

If you want to use the commandline interface we recommend to install the @sap/edm-converters with

```npm install -g @sap/edm-converters```

Installing it globally eases the usage of the converters from any folder.
If you do so, then after installation the ```convert_edm``` symlink/script should be created.
You can test this with calling ```convert_edm -v``` to show the converter version.

## Installation for API usage

If you want to used the converters from your node application, then you can either install it locally or global. Just add:
```js
const converters = require('@sap/edm-converters'):
```

The converter can then be accessed via:
```js
converters.MetadataConverterFactory.createEdmxV20ToJsonV40(<option>);
or
converters.MetadataConverterFactory.createEdmxV40ToJsonV40(<option>);
```

Please check the API documentation in
```lib/<converter>/index.js``` for documentation about the parameters of the converter.


# Console usage

All converters follow the following pattern

```sh
convert_edm <converter> <file to be converted> <further arguments>
```
Note: Currently absolute path as well as relative path to your model is supported.

Currently the converters edmxV20ToJsonV40 and edmxV40ToJsonV40 are supported.
Common sample arguments are:

* ```-i, --input <file to be converted>```
  Input file to be converted
* ```--inputdir <input directory>```
  Containing the source files, if <file> is relative
* ```-o, --output <output file>```
  Target file to be generated
* ```--outputdir <output directory>```
  Output directory, if target file is relative or more files are generated
* ```-l, --loglevel```
  Use 'e'/'i'(default)/'d' to show log information (e=error-log, i=info-log ,d=debug-log)
* ```-t, --target```
  Omit or set to 'cs02' to produce the Oasis CSDL 4.01-CS02 format;
  if the Oasis CSDL Json 4.01-CS01 format should be produced, set to 'cs01'.
  The CS01 format can be used as the EDM JSON to bootstrap the Okra library.
* Converters may have additional options. Please see below on how to show documentation about this converters.

# Get help

## Get console help:

```sh
convert_edm --help
```

## Get distinct converter help:

```sh
convert_edm edmxV40ToJsonV40 --help
```

# Releases and Milestones

[Changelog](./CHANGELOG.md)
