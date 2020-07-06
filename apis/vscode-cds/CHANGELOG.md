# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).
The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [2.3.0] - 2020-04-26
Now requires Visual Studio Code 1.41+

### Includes
- cds-lsp 3.3.1
- cds-compiler 1.26.2

### Added
- use global @sap/cds/common if locally not available

### Changed
- (alpha): diagnostics and hover support for external annotation providers 

### Fixed
- Minor fixes and improvements


## [2.2.0]
### Includes
* cds-lsp 3.2.0
* cds-compiler 1.24.3

### Added
* install/update global cds-dk

### Changed
* remove option for compiler origin - compiler will always be picked in that order: Project -> Global(via DK&CDS) -> BuiltIn
* remove irrelevent formatting option (trimTrailingWhitespace)

### Fixed
* global npm root for Business App Studio was not found with compiler origin option ProjectThenGlobalThenBuiltIn

## [2.1.4]

### Includes
* cds-lsp 3.1.3
* cds-compiler 1.23.2

### Added
* pick up compiler and env via global cds-dk if cds not (yet) in project

## [2.1.3]

### Includes
* cds-lsp 3.1.2
* cds-compiler 1.23.1

### Added
* code formatting
    * options can now be overridden in source comments e.g. // @formatter tabSize:3
    * new option to add/remove final line break
    * new option to trim trailing whitespace

### Fixed
* in some cases csn files with .json extension where not detected and thus workspace symbols were incomplete

## [2.1.2]

### Fixed
* Minor bugs and improvements.

## [2.1.1]

### Includes
* cds-lsp 3.1.1

### Added
* code formatting
    * option to keep original empty lines
    * ability to start config UI from any .cdsprettier.json
    * use most relevant .cdsprettier.json when starting from source file
    * use .cdsprettier.json in user home when none available in project

### Fixed
* formatting options were taken from homedir instead of preferring from project

## [2.1.0]

### Includes
* cds-lsp 3.1.0
* cds-compiler 1.22.0

### Added
* extended translation support
    * now all runtime-supported formats (.properties, .json, .csv) incl. quick fixes to create missing entries
    * now all runtime-supported customizations (filename, folder name, fallback_bundle, default_language)
        * if entries of fallback language are missing but are defined for default language the latter ones are used
        * quick fix will use default language if file/json-node/section for fallback language does not exist
        * quick fix will try to keep entries sorted
* allow .cdsprettier.json to be located in user home dir

### Changed
* code formatting
    * improve alignment of types, values, and preceding `:` or `=` operators

### Fixed
* code formatting
    * fix, improve, and allow to better adjust alignments and whitespace
    * fix alignment of annotations in `annotate` statement
    * fix casing of and indentation after `Association` and `Composition`
    * fix formatting of parts of `select` statement in case of nesting and after `in`
    * fix positioning of brace `{` after annotation if requested to be kept in previous line
    * fix bug where token starting with `$` was merged
* config UI
    * fix cap/issues#3498 - prettierrc file appears with content
    * fix: no longer selects editor content
* file watching for cds related files did no longer work in recent versions of VSCode e.g. package.json, .cdsrc.json, all supported translation file formats, ignore files

## [2.0.0]
Official support for code formatting

### Changed
* consume cds-lsp 3.0.0
    * code completion
        * more snippet variants for extend
        * no longer differ entity suggestions between within service or outside
        * base types with parameters now suggested as simply keyword w/o params and additional suggestion as snippet (param names now enclosed in < >)
        * changed label indicator for snippets from <> to ellipsis
    * code formatting
        * rework formatting options: add/remove options according to relevance, rename/group options for clarity, change default behavior in some cases
        * various improvements, including in case statements and bracketed conditions
* consume cds-compiler 1.21.1

### Fixed
* code formatting
    * fix alignment of annotations in views
    * safely identify unreserved keywords

## [1.4.0]
### Changed
* **requires `Visual Studio Code` version `1.40.0` or higher**
* consume cds-lsp 2.1.21
* consume cds-compiler 1.20.3

### Added
* support LSP configuration via settings file in workspace incl. logs in workspace

### Fixed
* Fix indentation after element definitions using Association or Composition 
* fix: extraction of root models did no longer work since @sap/cds#3.19
* code formatting
    * Fix indentation of keywords `union`, `except`, and `minus`
    * Make alignments more consistent generally
    * Improve readability by padding operators with blanks
    * Improve alignment of bracketed conditions



## [1.3.1]
* fix reloading formatting options in config UI
* consume cds-lsp 2.1.19
    * fixes and enhancements for code formatting
* consume cds-compiler 1.20.0

## [1.3.0]
* configuration UI for formatting options
* consumes cds-lsp 2.1.17
    * fixes and enhancements for code formatting
        * renamed settings file to .cdsprettier.json
* renamed tmLanguage for syntax highlighting
* consume cds-compiler 1.19.2

## [1.2.12]
* deprecate `updatesite` setting
* requires `Visual Studio Code` version `1.36.0` or higher

## [1.2.11]
* consumes cds-lsp 2.1.10
    * fixes and enhancements in syntax highlighting and code formatting

## [1.2.10]
* requires `Visual Studio Code` version `1.35.0` or higher.
* consumes cds-lsp 2.1.9
    * Syntax highlighting now uses different classifications (=colors) for annotations and comments
    * Support user settings in $LSP/.cds-lsp/.settings.json for IDEs which do not support user settings (Eclipse, Intellij, ...)
    * No longer report compiler messages for csn files
    * Preparation for config editor for formatting options
    * Deadlock detection and prevention for code formatting incl. option to cancel or try best in case
    * Use json parsing from compiler for csn files (which allows comments etc.)
    * Fixes and enhancements in source formatting
* consume cds-compiler 1.17.3

## [1.2.9]
* consume cds-lsp 2.1.8
    * code formatting - many fixes and enhancements
        * now on by default but still experimental
    * syntax highlighting reworked for CDL and CQL keywords
    * where-used index now with using path segments
    * updated cds documentation (in code completion)
    * outline now shows contexts and services with fully qualified name
    * other fixes and improvements
* consume cds-compiler 1.17.0

## [1.2.8]
* consume cds-lsp 2.1.7
  * consume cds-compiler 1.16.2

## [1.2.7]
* consume cds-lsp 2.1.6

## [1.2.6]
* consume cds-lsp 2.1.5
* take syntax file form LSP

## [1.2.5]
* use internal extension install command instead of command line call to `code` executable to install vsix file.
* requires `Visual Studio Code` version `1.33.0` or higher.
* consume cds-lsp 2.1.4
  * consume cds-compiler 1.15.0
  * experimental support for beautify

## [1.2.3]
* consume cds-lsp 2.1.3
  * consume cds-compiler 1.14.0

## [1.2.2]
* consume cds-lsp 2.1.2
  * consume cds-compiler 1.13.4
* Use cds-compiler from project workspace by default (option now called 'cds.compiler.origin' with default 'Project_Then_BuiltIn')
* Option to log internal compiler errors: 'cds.compiler.showInternalErrors' (default true). Same errors are reported at most once per minute.
* minor fixes


## [1.2.1]
* consume cds-lsp 2.1.1
  * consume compiler 1.13.1
  * performance improvements (less compilations and reduced memory footprint)
  * Links to folders in using statement are now resolved

## [1.2.0]
* consume cds-lsp 2.1.0
  * consume compiler 1.12.1
  * new where-used index with less memory consumption and support for references of custom annotations, built-in types, string constants and better tracking of identifiers in CQL
  * targets of using statement now rendered as links (via documentLink request)

## [1.1.5]
* Updated cds-lsp to 2.0.8
  * performance optimizations for translation support
  * consume cds-compiler 1.10.0
* Updated json schema to reflect latest cap config changes.
* Use json schema also for `.cdsrc.json` file.

## [1.1.4]
* Updated cds-lsp to 2.0.7
    * new user setting: cds.compiler.markMissingI18nDefault (default: off) to show problem markers for unresolved i18n references

## [1.1.3]
* Updated cds-lsp to 2.0.6 - bugfixes plus
* Updated cds-compiler to 1.9.0

## [1.1.2]
* Updated cds-lsp to 2.0.5 with
    * suggest @sap/cds/common as default path in using snippet if dependency to @sap/cds is present
* Updated cds-compiler to 1.8.1

### Also see
- Changes of `@sap/cds-lsp@2.0.5`
- Changes of `@sap/cds-compiler@1.8.1`

## [1.1.1]
* Updated cds-lsp to 2.0.3 with
    * doc support (snippet for localization, hover on translation id)
* Updated cds-compiler to 1.8.0

### Also see
- Changes of `@sap/cds-lsp@2.0.3`
- Changes of `@sap/cds-compiler@1.8.0`

## [1.1.0]
### Added
Support for documentation and translation in CDS source files

### Also see
- Changes of `@sap/cds-lsp@2.0.0`
- Changes of `@sap/cds-compiler@1.6.0`

## [1.0.37]
* Updated cds-lsp to 1.4.25 with
    * support for documentation tags and translation
        * show documentation when hovering
        * show documentation at code completion
        * take @title, @description and @cds.doc into account
        * resolve translation and show warning marker when translation not available
        * quickfix to create missing translation
        * snippet for @cds.doc
* Updated compiler to 1.6.0
    * especially with support for code completion of items in using statement

## [1.0.36]
* Updated cds-lsp to 1.4.24
* Updated compiler to 1.5.0

## [1.0.35]
* New icon
* Updated cds-lsp to 1.4.23
* Updated compiler to 1.3.0
* Added code completion for paths in using statement
* CSN files are now detected and including in where-used index e.g. for workspace symbols
* Introduce per-file compilation mode which speeds up where-used features expecially for large workspaces. User setting cds.compilation.mode (default PerFile)
* Installation of dependencies in package.json files
    * now configurable via user setting cds.autoInstallDependencies (default off)
    * if turned on it only reinstalls if dependency definitions exist and have changed since last install. Other changes in package.json files are ignored
    * package.json files are no longer reformatted when installing dependencies
    * cdsignore can be used to exclude paths from installation e.g. test folders with package.json files
* Check for updates when user changes update config
* Bug fixes

## [1.0.34]
* Updated compiler to 1.1.3
* bug fixes

## [1.0.33]
* Updated compiler to 1.1.2
* bug fixes

## [1.0.32]
* Snippets now with language documentation
* New snippets for annotate and enum type
* Add json validator for cds entry in package.json
* Add package.json snippet for npm script "watch"
* Replace auto build with npm script (see npm script "watch")
* Robustness
* No more logging from LSP to CDS console

## [1.0.31]
* Support for multiple workspace folders
* Editor now detects much more identifiers
* Compiler 1.1.0
* Improve error handling when update site is invalid or incorrectly configured

## [1.0.30]
* Bug fixes (update, ...)

## [1.0.29]
* Use cds-lsp 1.4.12

## [1.0.28]
* Use cds-lsp 1.4.10

## [1.0.27]
* Use os environment proxy settings as fallback when available (http_proxy, https_proxy, no_proxy)

## [1.0.26]
* Use cds-lsp 1.4.8
* Proxy settings (http.proxy, http.proxyAuthorization, http.proxyStrictSSL) will be used when downloading update
* Bug fixes

## [1.0.25]
* Use cds-lsp 1.4.7

## [1.0.24]
* Bug fixes (installation, ...)

## [1.0.23]
* Use cds-lsp 1.4.4
    * New setting: cds.workspaceValidationMode
        * OpenEditorsOnly
        * OpenEditorsAndDirectSources
        * OpenEditorsDirectSourcesAndDirectDependencies
* Show compiler version on status bar when it changes for 10secs
* Bug fixes (code completion, ...)

## [1.0.22]
* Add external update mechanism
