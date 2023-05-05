# Extending @sap/cds-lsp with Annotation Handlers

_`Status: DRAFT`_

### Overview

```@sap/cds-lsp``` allows external domain owners to contribute semantics in CDS annotation handling.

There are following extension points:
1) code completion for annotation
2) semantic errors in annotations
3) hover for annotation

#### Code Completion

A contribution for code completion allows the extension to add _additional_ completion items during code 
completion when cursor position used to trigger the completion is at the beginning or within an annotation
in a CDS source file.

#### Semantic Errors

A contribution for semantic errors allows the extension to add _additional_ diagnostic messages (errors, warning, infos).
Those are typically shown in IDEs as highlights of the message's corresponding location range or in a distinguished
problems view. The extension will be called whenever a CDS source file containing annotations changes, plus for all source files that depend on the changed file, directly or indirectly.     

#### Hover

A contribution for hover allows the extension to add _additional_ hover information in markdown format.

### How to contribute

A contributor must provide an NPM package fulfilling a specific interface.

The contributor's NPM package.json must define a ```main``` entry that points to
a JS module fulfilling the following interface:

```javascript
module.exports = {

    /**
     * (optional)
     * Allows the contribution to get additional services from the language server
     * @param {IContributionContext} context services for tracing and resolving translations
     */
    initialize: (context),

    /**
     * (optional)
     * @param {LSP.TextDocumentPositionParams} cursorPosition
     * @param {IBlitzIndex} index
     * @param {IAnnotationAssignmentToken} annotation
     * @param {XsnCompileModel} ast
     * @param {string} relativeLocalPath
     * @returns {Promise<LSP.CompletionItem[]>} result
     */
    fetchCompletions: (cursorPosition, index, annotation, ast, relativeLocalPath) => result,

    /**
     * (optional)
     * @param {string} uri
     * @param {IBlitzIndex} index
     * @param {IAnnotationAssignmentToken[]} annotations
     * @param {XsnCompileModel} ast
     * @param {string} relativeLocalPath
     * @returns {Promise<LSP.Diagnostic[]>} result
     */
    fetchDiagnostics: (uri, index, annotations, ast, relativeLocalPath) => result,

    /**
     * (optional)
     * @param {LSP.TextDocumentPositionParams} cursorPosition
     * @param {IAnnotationAssignmentToken} annotation
     * @param {IBlitzIndex} index
     * @returns {Promise<CdsHover|undefined>} result
     */
    fetchHover: (cursorPosition, annotation, index) => result
} 
```
References:
[IAnnotationContribution](../src/api/contributions/IAnnotationContribution.ts)

The contributor's NPM package.json 
- must have a property
```
    "cdsLspContributionKind": "annotation@1"
```
- use a **```devDependency```** to ```@sap/cds-lsp``` if needed, not a normal ~~dependency~~ nor a ~~peerDependency~~ or ~~optionalDependency~~. 

In ```@sap/cds-lsp```'s package.json an optional dependency to the contributor's NPM package must be defined e.g. 
```
...
   "optionalDependencies": {
      "my-custom-cds-annotation-handler": "^1"
   }
...
```
 
Create a PR on ```https://github.wdf.sap.corp/cdx/cds-lsp```, adding your extension to the ```optionalDependencies``` section.
Also provide a link to the contribution's git repository in the PR's description.

The contributor's NPM package must be publicly released, i.e. be available on the official SAP NPM registry ```https://npm.sap.com``` or global NPM registry ```https://www.npmjs.com```.

### Technical Aspects

Calling extension code during code completion or when source files change will add an additional burden in **performance**
and likely **memory footprint**.

It is therefor of utmost importance to develop your extension with both performance and memory footprint in mind.
Not just the user has to wait longer to see completions and messages, an increased memory footprint can lead to additional costs. 

**Especially when ```@sap/cds-lsp``` is running in a cloud environment like _SAP Business Application Studio_ the process environment
typically has limited memory quota and every CPU cycle may cost real money.**

#### Keep heap memory size low

- **Do NOT keep references to provided data structures, not even to parts of it!**
- Use CDS sources of real world (big) applications to test your extension against and measure additional footprint of performance and memory
  
#### Keep resident (code) memory size low

An important factor of memory footprint is resident i.e. code memory (not heap) by 3rd party dependencies. As you have no control what recursive dependencies are used by 1st level dependencies, **try to minimize the amount of dependencies as much as possible**. Do not use 3rd party npm modules for simple tasks that can easily be done by yourself or are now part of the node platform e.g. lodash should no longer be necessary. 

**Note**: Your contribution may be rejected if being too lax in 3rd party dependency usage.

#### Open source clearance

All of your 3rd party dependencies must have an open source clearance. Licensing and security must be reviewed green. Check [here]( https://open-source.mo.sap.corp/)

#### Compatibility

```@sap/cds-lsp``` uses NodeJS with version specified in package.json#engine. You can use any _stable_ NodeJS APIs matching that version. **Do not use _experimental_ or _deprecated_ APIs**

#### stdio and Tracing 

If you want to trace within your extension it is important that you **must not use any stdio functionality** i.e. no usage of  console.log or console.error. @sap/cds-lsp is a reuse component which runs in many IDEs, most of them will use stdio as the protocol medium. Any output to console will break the protocol and shutdown the language server.

It is **best** to use the **language server's tracer** provided via ```initialize```. It is efficient, user configurable via a single point, and the logs are embedded in the natural context of language server's workflow, making it easier to spot/understand bugs.

The tracer has methods for the different severities like error, warning,... and those only accept a function that returns a string. Typically, use a closure with a template string like ```tracer.error(() => `Some thing went wrong inside ${myVariable}`)```. The reason for this indirection is performance: if the tracer is currently not tracing the given severity the template string will not be executed and there will be no overhead.

#### URL and path handling

The URI spec leaves room for different ways to encode special characters. There is no canonical form. Examples are the casing of the drive letter on Windows, or the @-sign that may be encoded or not.
While vscode-uri npm module is used within VSCode client, the team responsible to define the language server protocol has understood that using their library within a server is not always a good idea - their implementation is different from the ```pathToFileURL``` and ```fileURLToPath``` that are part of Node.js 10+. ```@sap/cds-lsp``` requires at least Node.js 12, thus we have decided to use the standard methods from Node.js. I.e. internal data structures use those encodings.

An annotation extension should do the same. Otherwise, files may not be found in indexes etc. Additional benefit is one less external dependency.    
