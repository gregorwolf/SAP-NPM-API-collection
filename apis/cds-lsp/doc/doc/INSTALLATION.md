# Installation

`@sap/cds-lsp` is a language server. As such it needs a client to operate. This is typically an IDE. 
Today, most of the popular IDEs come with support for language servers. Basically there are two kinds of integration, specific and generic.

### Specific IDE support
Often, a plug-in or extension component for a specific language wraps the corresponding language server. For `@sap/cds-lsp` there are specific extensions for
- [Visual Studio Code](https://cap.cloud.sap/docs/get-started/tools#vscode)
- [IntelliJ](https://github.com/cap-js/cds-intellij)
- [Eclipse](https://cap.cloud.sap/docs/get-started/tools#eclipse)
### Generic IDE support
For other IDEs there exist generic client plug-ins for language servers. Examples:
  - [VIM](https://www.vim.org/) has several options, e.g. [ALE](https://github.com/dense-analysis/ale)
  - Emacs, ...

#### Requirements
`@sap/cds-lsp` is a NodeJS module. As such it requires NodeJS installed on the client machine. Minimum version is 20.15.1

#### Start-up

##### Installation via `npm`

1) Create an empty folder and `cd` into it
2) Execute `npm i @sap/cds-lsp` to download the language server and all its dependencies

This will create a sub-folder `node_modules` with all required npm modules.
It will also create a platform specific shell script to start the language server.
It is located in the `node_modules/.bin` sub-folder and is called `cds-lsp`. 

For a _stdio_ connection use `node_modules/.bin/cds-lsp --stdio`.
For other connection channels see [below](#connection-channels) 

##### Custom Installation

##### TL;DR 
1. install `@sap/cds-lsp` from _npmjs.org_ into subfolder `cds-lsp`

   ```
   #!/bin/bash
   componentName=cds-lsp
   fullName="@sap/$componentName"
   
   echo '=== Getting latest download URL'
   url=$(npm view $fullName | sed -n 's/.tarball.*\(https.*\)$/\1/p')
   echo "=== Downloading $url"
   curl -O $url
   filename=$(echo $url | sed -n 's/.*\/\(.*\)$/\1/p')
   echo "=== Extracting $filename"
   tar xfv $filename
   mv package $componentName
   echo "=== Removing $filename"
   rm $filename
   cd $componentName
   echo "=== Installing dependencies"
   npm i
   ```

2. start the server using _stdio_
   ```
   #!/bin/bash
   main=$(cat cds-lsp/package.json | sed -n 's/.*"main".*"\(.*\)".*/\1/p')
   node "cds-lsp/$main" --stdio 
   ```


----
##### Details

1) Get the download URL for the tarball with `npm view @sap/cds-lsp`. E.g.

   ```
   /home/user$ npm view @sap/cds-lsp
   @sap/cds-lsp@6.2.2 | SEE LICENSE IN LICENSE | deps: 9 | versions: 33
   Language server for CDS
   https://cap.cloud.sap/

   keywords: CAP, CDS, LSP, SAP, language, editor

   bin: cds-lsp, format-cds

   dist
   .tarball: https://registry.npmjs.org/@sap/cds-lsp/-/cds-lsp-6.2.2.tgz
   ...
   ```

2) Download the tarball e.g. `curl -O https://registry.npmjs.org/@sap/cds-lsp/-/cds-lsp-6.2.2.tgz`
3) Extract the TGZ file e.g. `tar -xf cds-lsp-6.2.2.tgz`
4) Enter `package` folder: `cd package`
5) Execute `npm i` to install the dependencies.
6) Check the `main` entry in `package.json`. This is the start script e.g.
   
   ```
   /home/user/package$ grep "main" package.json
   "main": "dist/main.js",
   ```
   
7) The simplest form to start the language server using `stdio` (see [Connection channels](#connection-channels) below) e.g.

   ```
   /home/user/package$ node dist/main.js --stdio
   ```
   
8) The server is started and waits for a client to connect

##### Connection channels

`@sap/cds-lsp` can communicate to a client via one of three different connection channels (see the documentation of the client plug-in for details which channels are supported)
- `stdio`: the language server listens on `stdin` for requests and sends responses to `stdout`
- `node-ipc` (if the client runs with NodeJS): add `--node-ipc` as a command-line argument
- `sockets`: add `--socket=<port>` as a command-line argument

For details see the similar json-language-server integration [docs](https://github.com/vscode-langservers/vscode-json-languageserver#integrate).

#### Syntax Highlighting
For performance reasons, syntax highlighting is not done via the language server protocol.
A [TextMate grammar](https://macromates.com/manual/en/language_grammars) aside of the language server provides this.
`@sap/cds-lsp` comes with a TextMate grammar file [included](../syntaxes/cds.tmLanguage.json) for the CDS language.
Additionally `@sap/cds-lsp` supports semantic highlighting. This is a feature of the language server protocol and is supported by some IDEs.

While specific client extensions usually integrate this by default, a generic integration requires to configure this separately.
Some IDEs have TextMate support built-in. Others require another plug-in, a TextMate client. 
Refer to the corresponding documentation how to configure a custom TextMate grammar file. CDS source files have the `.cds` file extension. 
