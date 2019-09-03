# Getting started

<!-- markdownlint-disable MD001 MD022 -->
##### Table of Contents
<!-- markdownlint-enable MD001 MD022 -->

[Installation and Usage](#installation-and-usage)  
[Command invocation](#command-invocation)

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
