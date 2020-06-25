# Getting started

<!-- markdownlint-disable MD001 MD022 -->
##### Table of Contents
<!-- markdownlint-enable MD001 MD022 -->

[Installation and Usage](#installation-and-usage)  
[Command invocation](#command-invocation)  
[Build from source](#build-from-source)  
[Documentation](#documentation)

## Installation and Usage

Install via npm:

```
npm install "@sap/cds-compiler"
```

Or maintain your package.json dependencies as follows:

```
  "dependencies": {
    "@sap/cds-compiler": "latest"
  }
```

### Command Invocation

The compiler with its options is invoked like any other npm/Unix command:

```bash
cdsc <command> [options] <file...>
```
See `cdsc --help` for commands and options.

The exit code of the process is:

* `0`: successful compilation
* `1`: compiled with error (the command invocation itself is ok)
* `2`: commmand invocation error (invalid options, repeated file name)

### Build from source

We recommend to install cds-compiler using npm. However, if you want to use
the latest master (e.g. for testing purposes) then you need to set up the
compiler first:

```sh
git clone git@github.wdf.sap.corp:cdx/cds-compiler.git
cd cds-compiler
npm install
npm run download # Downloads Antlr (Java Dependency)
npm run gen      # Generates the parser
./bin/cdsc.js --help
```

## Documentation

Please refer to the [official CDS documentation][capire].

[capire]: https://cap.cloud.sap/docs/cds/
