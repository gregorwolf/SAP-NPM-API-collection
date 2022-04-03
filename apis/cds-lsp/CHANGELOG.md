# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 5.5.6 - 2022-03-31

### Added

- unit test for textmate grammar

### Changed

- ignore filtering is now lazy
- formatting options docs are now generated
- consume cds-compiler 2.13.6

### Fixed

- no longer set NODE_ENV to production
- highlighting of single quoted strings


## 5.5.5 - 2022-03-03

### Added

- schema file for `cds` section in `package.json`, `.cdsrc.json` and `.cdsrc-private.json`

### Fixed

- code completion for annotations no longer propose `@` if inside an annotation

## 5.5.4 - 2022-02-28

### Added

- new code-formatting options for `action`s and `function`s:
  + `alignActionNames` (aligns names)
  + `alignActionReturns` (aligns `returns` keywords)

### Changed

- removed obsolete code-formatting option `alignAsInElements` (calculated fields use `=` now)
- textmate grammar additionally compatible with Ruby regex engine

### Fixed

- code formatting:
  + separate post-annotation with blank
  + remove erroneous newlines around cardinality and filter in `select`
  + separate projection items with newlines
- code completion for annotations now correctly handle e.g: @aaa.| entity
- references for annotations: plugins now get all file indexes

## 5.5.3 - 2022-02-04

### Added

- test support for contribution providers

### Changed

- CDS language server back to Node 12 (5.5.0 required Node 14 which led to problems in BAS)
- typings for contribution implementors are now bundled and accessible directly via `@sap/cds-lsp`

### Fixed

- format-cds CLI was not working under certain circumstances
- syntax highlighting glitches
- code formatting of nested projections

## 5.5.0 - 2022-01-28

### Added

- Command-line interface for code formatter
- CDS language server is now bundled and minified to speed up initialization
- workspace symbols query now supports filters for kinds

### Changed

- consume cds-compiler 2.12.0
- code completion for `index.cds` files will now render just the folder
- performance: revalidate file on focus got only if stale index
- memory consumption: indexes are now cached per file, no longer per compilation

### Fixed

- `enum` was not indexed 
- `composition` of aspect was not indexed
- symbols contained localized entries with recent compiler versions
- workspaces with _many_ workspace folders could lead to stop lsp
- syntax highlighting is now better aligned with CDS grammar:
  + multi-lined strings disabled
  + backslash escaping disabled
  + doubled quotes inside strings to reproduce single quotes
  + element types now include scopes and length/size arguments


## 5.4.0 - 2021-12-03

### Added

- progress indication for initialization, configuration changed, references and workspace symbols
- support for protocol:selectionRange (though, VSCode has a bug and does not considers it currently)

### Fixed

- goto definition of certain references was wrong
- symlinks were not followed when scanning workspace
- (speedup) indexes might got stale even model file hasn't changed

### Changed

- consume cds-compiler 2.11.0
- import artifact quickfix now shortens the using path
- @sap/cds/common.cds now included by default
- speedup initialization: no scan/read workspace, reusing source files first read by compiler, unless reference or workspaceSymbols require a scan
- speedup: cache missed paths when compiler resolves using paths
- speedup: only consider models from app/srv/db folders (according cds env) for references and workspace symbols
- speedup when config changes: revalidation of files only if relevant settings changed
- speedup resolution of using paths
- speedup: cds env is now loaded synchronously in-process
- speedup: calculate annotation diagnostics only for active file
- speedup: dynamic registration of configurable requests now done asynchronously at startup
- speedup: files to index for references now ordered by rank

## 5.3.0 - 2021-09-23

### Added

- doc comments are automatically aligned

### Fixed

- certain localized elements were still indexed
- new i18n entry in properties file has corrupted existing last entry
- inconsistency in dependency calculation could have led to incorrect revalidations after a change

### Changed

- translation support is now lazy
- performance improvements when translation files changed
- last workspace/symbols are cached now to speed up CAP explorer
- user setting cds.workspace.scanCsn has now three modes: Off, ByFileExtension (new default) and InspectJson 


## 5.2.0 - 2021-07-30

### Added

- new validation mode _ActiveEditorOnly_ (new default) for clients indicating support
  via capability _workspace.didChangeActiveEditor_. 
  Other clients remain using _OpenEditorsOnly_ as default.
  The new mode reduces number of compilations during editing and thus improves responsiveness.
- new command to analyze using dependencies of CDS model files.
  It will create a graphviz dot file that can be viewed with an appropriate viewer. 
  Getting an overview of file dependencies can help to keep your project architecture clean.

### Changed

- consume cds-compiler 2.5.0


## 5.1.1 - 2021-07-05

### Changed

- consume cds-compiler 2.4.4
- new performance relevant user settings
    + `cds.workspace.debounceFastChanges`:  skip intermediate compilations when typing - enabled by default
    + `cds.workspace.scanDependentModules`: skip scanning of node_modules - enabled by default, speeds up start-up time
      Note: 
      - when using code completion for global identifiers (see `cds.completion.workspaceSymbols.minPrefixLength`) this option needs to be enabled
      - for code completion of import paths in `using` statements this option needs to be enabled


## 5.1.0 - 2021-06-22

### Note

This is a quality release focusing on performance for large models.
There are new user settings and some have changed their defaults.
Best performance is achieved with default settings, 
except `cds.contributions.enablement.odata` which should be switched `off` to speed up compilation, unless feature is needed.

Additonal hints to increase performance:
- Within _SAP Business Application Studio_: close `CAP Data Models and Services` view. Otherwise it will ask for all workspace symbols at every change.
- Settings: `Cds � Contributions � Enablement: Odata`: switch off as already mentioned above
- Settings: `Editor � Goto Location: Alternative Definition Command`: do not select `goToReferences`. Otherwise being already on a definition will trigger find references which requires all dirty models to be recompiled.
- Settings: `Workbench � Editor � Limit: Enabled`: switch on
- Settings: `Workbench � Editor � Limit: Value`: lower the number. If open editors have `using` dependencies, a change in one editor will lead to a recompile of releated editors.
- Commands `Go to References` / `Find All References` will recompile all models that might have changed due to a change in a depending model. If there are index models it often means the complete workspace is being recompiled. 
Until a further change, reference calculation is resonably fast.
- Command `Go to Symbol in Workspace` will recompile the complete workspace once, then it is reasonable fast
- Changing settings in `CDS` section will currently perform a complete workspace invalidation i.e. required indexes will lead to recompilations on-demand as described above
- Changing certain `cds.env` settings e.g. folder configurations will invalidate the workspace as well

### Changed

- consume cds-compiler 2.3.2
- user settings
    + cds.workspaceValidationMode new default: OpenEditorsOnly
    + cds.workspace.scanCsn new settings with default switch off (before implicitly on)
    + cds.quickfix.importArtifact new setting with default off (before implicitly on)


## 5.0.5 - 2021-05-11

### Fixed

- asynchronous scanning of workspace blocked and led to high cpu usage (mostly on Linux/macOS) 


## 5.0.3 - 2021-05-06

### Changed

- consume cds-compiler 2.2.4
- bug fixes

## 5.0.1 - 2021-04-22

### Changed/Fixed

- where-used for namespaces also for compiler v2
- new query flag for workspace symbols: /n to include implicit namespaces

## 5.0.0 - 2021-04-02

### Note

This is a major release which comes with @sap/cds-compiler v2.
It still supports cds-compiler v1 if used in your project
or via global @sap/cds-dk.

### Added

- semantic highlighting - to be enabled via user setting `cds.semanticHighlighting.enabled`
- new API for annotation handler to support semantic highlighting

### Changed

- consume cds-compiler 2.1.4

## 4.4.1 - 2021-03-17

### Added

- preliminary support for cds-compiler 2.x

## 4.4.0 - 2021-03-01

### Changed

- optimizations for decreased memory consumption
- consume cds-compiler 1.50.0

## 4.3.0 - 2021-02-01

### Added

- asynchronous initialization for annotation plugins (#923)
- find references for annotation plugins (#929)
- revalidate workspace after an initial annotation plugin installation (#930)

### Changed

- new user options for where-used request (#877)<br/>
until now this functionality was enabled by default and now needs to be enabled via user options
  + generic annotations - where a certain annotation 'class' or 'namespace' is used
  + strings literals - where same string literals are used

- consume cds-compiler 1.49.0
- compatibility with early versions of cds-compiler 2.x
- simplified consumption of CDS textmate grammar for Jetbrain IDEs

### Fixed

- dependency analysis for compilation:
if a changed file has dependencies to the roots, but the
root models do not cover it, no longer it will compile multiple
times

- translation code action was not shown in the context of annotations
- code completion for annotations had a trailing @ (#883)
- annotation assignment spanned beyond semantical end (#838)
- code formatting of brackets enclosing multiple elements in annotations had wrong indentation
- indexing of `on` condition for elements was broken
- update regex to highlight `one` and `many` keyword properly

## 4.2.0 - 2020-11-27

### Added

- quickfix for deprecated identifiers
- support for quickfixes in annotation handler
- internal support for incremental text updates 
- improved supportability with extended statistic logs

### Changed

- consume cds-compiler 1.46.4

### Fixes

- for annotation handler and others

## 4.1.2 - 2020-11-12

### Changed

- cds-lsp itself no longer dynamically registers file system watching for VSCode, BAS and Eclipse, as those configure it client-side

### Fixes

- bug fixes

## 4.1.1 - 2020-11-06

### Fixed

- support for mono repo file system layouts did not work in certain cases
- completion proposals for annotations were not shown at top of the list if inside an annotation

## 4.1.0 - 2020-10-30

### Added

- support mono repo file system layouts
- user option to format snippets after completion 
- user option to disable odata plugin
- detection of slow running odata plugin (when validating) incl. user options to disable and fine tune
- user option for omitRedundantTypesInSnippets for annotations

### Changed

- install/update contributions completely async
- completion no longer suggests types when values are meant
- project cds-lsp settings overrule all
- consume cds-compiler 1.45.0

### Fixed

- validation of annotation plugins led to 100% cpu load
- globally installed cds was not reliably found
- code completion for annotation plugins did not work inside annotations at @ characters
- bug fixes

### Note

From version 4.1.0 on, @sap/cds-lsp requires NodeJS 12.14+

## 4.0.0 - 2020-09-30

### Added

- Plugin support for domain specific annotation handlers, featuring
  - diagnostics
  - code completion
  - hover information
  - goto definition
  - quickfix to maintain translation
  - auto-installation/update with user setting for npm registry

- code completion inside string literals and `![...]` identifiers is automatically triggered by `/` character (additionally to `.` and `@`)
  
- snippets applied via code completion are now formatted

- `action`s and their parameters are now indexed and support code navigation, hover etc.

### Changed

- consume cds-compiler 1.42.0

### Fixed

- bug fixes

### Note
From version 4.0.0 on, @sap/cds-lsp requires NodeJS 12.8+ (was 10.16+)

## 3.5.0 - 2020-09-01

### Added

- Code completion proposes identifiers not yet imported in current file and generates corresponding `using` statement
  - user setting: minimum number of characters required to propose those identifiers (`cds.completion.workspaceSymbols.minPrefixLength`). Default is -1 (=off)
  - user setting: limit number of global identifiers (`cds.completion.workspaceSymbols.maxProposals`). Default is -1 (=unlimited)
- Code formatting: options `whitespaceBeforeColon` and `whitespaceAfterColon` are now supported inside anonymous structure types
- Code formatting: support configuration of alignment of COMPOSITION structs (option `alignCompositionStructToRight`)

### Changed

- consume cds-compiler 1.39.0

## 3.4.3 - 2020-08-05

### Changed

- consume cds-compiler 1.35.0

## 3.4.2 - 2020-07-28

### Added

- new user setting `cds.completion.workspaceSymbols` (default `off`) to add workspace symbols to code completion proposals
- query for workspace symbols allows new option `/f` to consider fully qualified name

### Changed

- consume cds-compiler 1.34.0

### Fixed

- bug fixes

## 3.4.0 - 2020-07-10

### Added

- support for docComments (/** ... */)
  + hover over artifact will consider docComment
  + snippet to create
  + formatting will beautify docComments, incl. new option maxDocCommentLine
  + quickFix to convert @cds.doc annotation to docComment incl. beautify
  + distinct syntax highlighting for docComments
- quickFix to generate using statement for not yet imported artifacts
  + sorted by module and artifact name, beautified
- semantic code completion for elements, enums, actions and parameters in annotate and extend (via cds-compiler 1.32.0)
- syntax highlighting identifiers, including variants delimited with \![...]
- identifier completion proposals are prioritized by message severity
- messages may now contain related information
- added INSTALLATION.md for 3rd party IDE integrations

### Changed

- consume cds-compiler 1.32.0
- updated README.md with feature list

### Fixed

- enum keyword was wrongly syntax highlighted
- when an ignored source file is closed, potential messages are wiped
- annotations of extensions were not indexed
- bug fixes

## 3.3.2 - 2020-04-26

### Changed

- remove optional odata annotation handler due to build issues

## 3.3.1 - 2020-04-24

### Changed

- consume cds-compiler 1.26.2

## 3.3.0 - 2020-04-24

### Added

- use global @sap/cds/common if locally not available

### Changed

- consume cds-compiler 1.26.0
- (alpha): diagnostics and hover support for external annotation providers

### Fixed

- Minor fixes and improvements

## 3.2.1 - 2020-03-30

### Changed

- consume cds-compiler 1.24.4

## 3.2.0 - 2020-03-16

### Changed

* remove option for compiler location - LSP will always search Project->Global(via DK&CDS)->BuiltIn now
- remove irrelevent formatting option (trimTrailingWhitespace)
- consume cds-compiler 1.24.3

### Fixed

- formatting failed (seen in Eclipse, VSCode works) due to off-by-one error
- global npm root for Business App Studio was not found with compiler.location option ProjectThenGlobalThenBuiltIn

## 3.1.4 - 2020-03-04

### Added

- _extend_ definitions are now shown in outline and workspace symbols
- api (alpha) for external annotation providers

### Changed

- consume cds-compiler 1.24.0

## 3.1.3 - 2020-02-24

### Added

- pick up compiler and env via global cds-dk if cds not (yet) in project

### Changed

- consume cds-compiler 1.23.2

## 3.1.2 - 2020-02-11

### Added
* code formatting
    * options can now be overridden in source comments e.g. // @formatter tabSize:3
    * new option to add/remove final line break
    * new option to trim trailing whitespace

### Changed
* consume cds-compiler 1.23.1

### Fixed
* in some cases csn files with .json extension where not detected and thus workspace symbols were incomplete

## 3.1.1 - 2020-01-30

### Added
* code formatting
    * option to keep original empty lines
* language server protocol 3.15: implement serverInfo in onInitialize

### Fixed
* formatting options were taken from homedir instead of preferring from project

## 3.1.0- 2020-01-24

### Added
* translation support
    * now with all formats supported by runtime (.properties, .json, .csv) incl. quick fixes to create missing entries
    * now with customizations supported by runtime (filename, folder name, fallback_bundle, default_language)
        * if entries of fallback language are missing but are defined for default language the latter ones are used
        * if property files or json nodes or csv header only has default language defined (and not raw), quick fix will use default language
        * quick fix for json and csv formats now try to keep entries sorted
        * navigation from translation reference in cds source files to value supported for all formats
* allow .cdsprettier.json to be located in user home dir

### Changed
* code formatting
    * improve alignment of types, values, and preceding `:` or `=` operators
* consume cds-compiler 1.22.0

### Fixed
* code formatting
    * fix, improve, and allow to better adjust alignments and whitespace
    * fix alignment of annotations in `annotate` statement
    * fix casing of and indentation after `Association` and `Composition`
    * fix formatting of parts of `select` statement in case of nesting and after `in`
    * fix positioning of brace `{` after annotation if requested to be kept in previous line
    * fix bug where token starting with `$` was merged
* in the past file changes via watcher were automatically sent for all files in VSCode.
  In recent versions of VSCode this has changed to only sent files supported by language server type (cds).
  A fix was made to dynamically register for relevant side-files like
  package.json, .cdsrc.json, all supported translation file formats, ignore files
  to keep track of changed environment

## 3.0.0 - 2019-12-16
Official support for code formatting

### Changed
* code completion
    * more snippet variants for extend
    * no longer differ entity suggestions between within service or outside
    * base types with parameters now suggested as simply keyword w/o params and additional suggestion as snippet (param names now enclosed in < >)
    * changed label indicator for snippets from <> to ellipsis
* consume cds-compiler 1.21.1
* code formatting
    * rework formatting options: add/remove options according to relevance, rename/group options for clarity, change default behavior in some cases
    * various improvements, including in case statements and bracketed conditions

### Fixed
* code formatting
    * fix alignment of annotations in views
    * safely identify unreserved keywords

## [2.1.21]
### Fixes
* Fix indentation after element definitions using Association or Composition

## [2.1.20]
### Added
* support LSP configuration via settings file in workspace incl. logs in workspace

### Changed
* consume cds-compiler 1.20.3

### Fixed
* fix: extraction of root models did no longer work since @sap/cds#3.19
* code formatting
    * Fix indentation of keywords `union`, `except`, and `minus`
    * Make alignments more consistent generally
    * Improve readability by padding operators with blanks
    * Improve alignment of bracketed conditions

## [2.1.19]
* consume cds-compiler 1.20.0
* fixes and enhancements in code formatting

## [2.1.18]
* syntax highlighting: now supports 'default' keyword, plus minor fixes
* removed dependencies to ts-md5 and vscode-uri
* **for all IDE providers**: _out_ folder was renamed to _lib_
* new internal URI handling: especially on Windows no longer encode drive letter colon

## [2.1.17]
* minor text polishing for config UI

## [2.1.16]
* fixes and enhancements for code formatting
    * renamed settings file to .cdsprettier.json
    * schema with parentOption and basic markdown support for label (new) and description
* renamed tmLanguage for syntax highlighting
* consume cds-compiler 1.19.2

## [2.1.15]
* fixes and enhancements for code formatting
* clean-ups in LSP project setup
* consume cds-compiler 1.19.1

## [2.1.13]
* fix regression: schema file was not included

## [2.1.12]
* fix minor issues

## [2.1.11]
* schema for formatting options with category, description, code sample, suboptions, enum values
* now sits on node 10+
* consume cds-compiler 1.18.1

## [2.1.10]
* Fixes and enhancement for syntax highlighting and code formatting

## [2.1.9]
* Syntax highlighting now uses different classifications (=colors) for annotations and comments
* Support user settings in $LSP/.cds-lsp/.settings.json for IDEs which do not support user settings (Eclipse, Intellij, ...)
* No longer report compiler messages for csn files
* Preparation for config editor for formatting options
* Deadlock detection and prevention for code formatting incl. option to cancel or try best in case
* Use json parsing from compiler for csn files (which allows comments etc.)
* Fixes and enhancements in source formatting
* consume cds-compiler 1.17.3

## [2.1.8]
* code formatting - many fixes and enhancements
    * now on by default but still experimental
* syntax highlighting reworked for CDL and CQL keywords
* where-used index now with using path segments
* updated cds documentation (in code completion)
* outline now shows contexts and services with fully qualified name
* other fixes and improvements
* consume cds-compiler 1.17.0

## [2.1.7]
* consume cds-compiler 1.16.2
* fixes and improvements

## [2.1.6]
* beautify: improve alignment of comments and robustness
* bug fix: outline showed entries not contained in file

## [2.1.5]
* consume cds-compiler 1.16.1
* beautification for annotations and CQL

## [2.1.4]
* consume cds-compiler 1.15.0
* user option to enable beautify: cds.experimental.beautify.enable (default false)

## [2.1.3]
* consume cds-compiler 1.14.0

## [2.1.2]
* consume cds-compiler 1.13.4
* using compiler from project workspace now default

## [2.1.1]
* consume cds-compiler 1.13.1
* performance improvements (less compilations and reduced memory footprint)
* Links to folders in using statement are now resolved

## [2.1.0]
* consume cds-compiler 1.12.1
* new where-used index with less memory consumption and support for references of custom annotations, built-in types, string constants and better tracking of identifiers in CQL
* targets of using statement now rendered as links (via documentLink request)

## [2.0.8]
* performance optimizations for translation support
* consume cds-compiler 1.10.0

## [2.0.7]
* new switch: cds.compiler.markMissingI18nDefault (default: off) to show problem markers for unresolved i18n references
* bug fixes

## [2.0.6]
* consume cds-compiler 1.9.0
* bug fixes

## [2.0.5]
* fix dependency installation in public cloud
* consume cds-compiler 1.8.1

## [2.0.4]
* suggest @sap/cds/common as default path in using snippet if dependency to @sap/cds is present

## [2.0.3]
* fixes

## [2.0.2]
* consume cds-compiler 1.8.0

## [2.0.1]
* doc support (snippet for localization, hover on translation id)
* consume cds-compiler 1.7.1
* new unofficial switch cds.compiler.showInternalErrors
* cds-compiler 1.7.1

## [2.0.0]
* Snippets for title and description
* Code completion for translation references
* Create translation properties file in quickfix if none existing
* fixes

## [1.4.25]
* support for cds.doc
* cds-compiler 1.6.0

## [1.4.24]
* Goto-definition for paths in using statement
* New user preference to configure minimum severity of compilation problems
* Compiler 1.5.0
* Fix support of git and git+https dependencies

## [1.4.23]
* code completions for using statement paths
* reworked snippets
* minor fixes

## [1.4.22]
* CSN files are now detected and including in where-used index e.g. for workspace symbols
* Introduce per-file compilation mode which speeds up where-used features expecially for large workspaces. User setting cds.compilation.mode (default PerFile)
* Installation of dependencies in package.json files
    * now configurable via user setting cds.autoInstallDependencies (default off)
    * if turned on it only reinstalls if dependency definitions exist and have changed since last install. Other changes in package.json files are ignored
    * package.json files are no longer reformatted when installing dependencies
    * .cdsignore can be used to exclude paths from installation e.g. test folders with package.json files
* In internal landscape within WebIDE it is now possible to use git-git-URLs to internal github in addition to https-git-URLs
* Compiler 1.3.0
* Trace now measures durations with high precision, includes compilation footprint (number of files and size of compiled sources) and shows memory changes
