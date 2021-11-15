# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.90.14] - 2021-11-03

### Added

### Changed

- In the JSON schema, the description of DataPoints as part of sections or header facets now reflects the Title of the target annotation.

### Removed

### Deprecated

### Fixed

### Quality

- Code smell solved: "Define a constant instead of duplicating this literal n times."

## [1.90.13] - 2021-10-20

### Added

- OData V2:
  - Support for (Sub)Section properties: `visible`.
  - ALP: Schema now comprises of entity properties for config `createWithParameterDialog`->`fields`
  - OP: Added support for multiple flex changes in Form and Header Actions
- V2 & V4: Footer actions are now part of the schema. A node for header actions is visible even if there are no actions yet.

### Changed

- OData V2: 
  - Enhanced sync logic to use generic approach for handling unknown properties. As a result sync logic is more robust and handles more unknown properties.

### Removed

- OData V2:
  - OVP: Removed `tab` property from `Stack` and `Link List` cards as view switch control is not supported

### Deprecated

### Fixed

- OData V4:
  - Pages Schema. Exception if path in UI.SelectionFields is not valid.
  - Object page sections referring to UI.Identification with qualifer shall show actions besides the fields.
- V2 & V4: 
  - replace alias of namespace definitions of header actions even for references that are not related to OData vocabularies.
  - Add `visible` property to DataField types
- annotationPath definitions of header and footer actions.

### Quality

- Settings for sonarlint have been added.
- Upgrade of Annotation Vocabularies Tools.
- Fix of code smells reported by SonarQube.

## [1.90.12] - 2021-10-18

### Fixed

For some V4 apps, the export of property changes failed due to invalid schema definitions.

## [1.90.11] - 2021-10-06

### Added

- Annotation path com.sap.vocabularies.UI.v1.HeaderInfo added to ObjectPageHeader in V2 and V4.
- Added `i18nClassification` for `title`, `description` properties for `App.json` schema in V2 and V4.
- OData V4: Header actions are now part of the Object Page schema.
- OData V2:
  - OVP: Added support for property `annotationPath` in Linklist card settings.
  - OVP: property `requireAppAuthorization` is now supported for all card types.

### Changed

- README file updated.
- Order and naming of view nodes for the V2 Object Page adapted.
- Pattern for binding changes in V2: there are now two different patterns for List Report and Object Page; the one for the Object Page  provides the additional enum values  "{ui>/editable}" and "{= !${ui>/editable}}"

### Fixed

- V4: if one section comprises a field group without qualifier, and one referred to UI.Identification, the properties of the field group had been displayed for Identification section of header facet as well.

### Quality

- Fix of vulnerabilities by upgrade of npm modules.
- Fix of bugs nd code smells reported by SonarQube.

## [1.90.10] - 2021-09-22

### Added

- New html files showing a graphical representation of the content of each generic schema.
- OData V2:
    - We show field groups and fields now as part of the object page schema, and allow the maintenance of the visible property for fields.
    - Support of property `flexEnabled`on app level.

### Changed

- The default for titles and labels of schema nodes - in case of missing annotation labels - has been adapted, for facets and header facets. There will be node-specific content now in all cases instead of generic defaults like "Form".

### Removed

### Deprecated

### Fixed

- OData V2: 
    - Invalid flexChanges are now ignored during sync, hence configs and pages files are created.
- OData V4:
    - Exception occurred in case of invalid custom page definitions in manifest
    - Page determination went wrong in case of irregular ordering of routing targets

### Quality

- Bugs & code smells removed that had been detected by SonarQube

## [1.90.9] - 2021-09-08

### Added

- OData V4:
  - Header Facets are now shown in the schemas and configs, along with their actual manifest settings.
- OData V2:
  - OVP: Added support for property `dataPointAnnotationPath` in ListCard settings
  - OVP: Added support for OData V4 Link List Card

### Fixed

- OData V4: Import and export of Custom Page properties could get out of sync when specific properties were missing.  

## [1.90.8] - 2021-08-25

### Added

- OData V4:
  - Added support for `AnayticalTable`
  - Enhanced sync logic to avoid export of properties unknown to specification module to avoid modification in manifest.json
  - Added support for new Custom Page syntax
- Added test for function `convertInterfaces` to increase test coverage
- Added flexchange layer information to API interface

### Changed

- OData V2: Unresolvable facets are not returned by schema to avoid creation of corrupted custom sections 

### Fixed

- Object Page schema generation crash when 'Facets' entry is not defined for 'CollectionFacet'
- Page schema generation - `annotationPath` was missing for `table/toolbar`

## [1.90.7] - 2021-08-12

### Added

- OData V2:
  - Added description property to header actions in schema
  - Table toolbar as structure node
  - Added properties showClearOnFB, showFilterConfiguration and showRestoreOnFB to the FilterBar

- OData V4:  
  - Table toolbar as structure node
  - enableOnSelect as property for table toolbar

- Developer guide for contributors to this module

- Actualization of JS-DOC

- Enhanced error handling of API functions.

- The generic schema is enhanced by the following information:
  - artifact type (manifest setting, flex change or annotation)
  - in case of flex change: control name

### Changed

- The node Selection Fields was renamed to Filter Fields, in accordance with the UI.

- The generic schemas now already comprise anyOf definitions for enums of type string that allow binding changes. Previously this was only added during the generation of app specific schemas.

### Fixed

- A common function was introduced to resolve path references of Common.Label annotations; endless loop references are interjected, the variable value or key is returned in this case.
- Enhance function determineTableType to also check for presence of old tableType flag in manifest.json
- OData V2:
  - ALP: Use correct Id for flex changes generated in case of Filter Bar

### Quality

- Refactor interfaces and class definitions for ALP tables

## [1.90.6] - 2021-07-28

### Added

- OData V2: dateSettings property of Filterbar now supports addtional values
- OData V2: Added growingThreshold property to Responsive Tables

### Fixed

- When starting the app modeler for certain CDS projects, an exception occurs, and no pages nor schemas are listed.
- Modified regex used in binding properties to avoid issues with Shebang plugin during consumption of specification module.

### Quality

- Upgrade of Annotation Vocabularies Tools to version 0.3.28

## [1.90.5] - 2021-07-14

### Added

- annotationPath is added to the selectionFields node.

### Changed

- The import functions for filling the content of config files are now instantiating the required metadata based on factory classes (that had been introduced for the export before).

### Fixed

- In the annotationPath of columns, qualifiers had not been added.
- The namespace of the entity type is now present in all annotation paths.
- Changing binding value to false removed flex changes from the file system.
- The logic for section generation in app schemas did not consider qualifiers correctly.

### Quality

- Missing path to types in package.json was added. This is required because after introducing bundling with webpack, the index.d.ts file is not next to index-min.js

## [1.90.4] - 2021-06-30

### Added

- New structure elements at the Filterbar that represent the selection fields resulting from  the UI.SelectionFields annotation.

### Changed

- In the annotationPath information of the generated JSON schemas all alias definitions are now replaced by the full vocabulary name.
- Descriptions in the schema now follow the following paradigm:
  - For facets we need use title and description, the export logic takes the title and extracts the facet key from it for concatenating the stable ID. The text that shall be shown in the Page Editor shall be the description.  
  - Thus we now generalise: all view nodes (isViewNode = true) have a description (but do not necessarily need a title).  
  - Properties (no isViewNode tag) are not listed in the outline, but in the properties panel. Here, the title shall be used as a label, and the description shall be shown on hover (old UI) or rendered directly (new UI).

### Removed

- OData V4: remove initialLoad property from Object Page config

### Fixed

- The deletion of a custom section from the config file was not reflected in manifest.json.
- New page export fails if parent page does not have navigation property defined.
- Navigation is not cleared if we remove last associated page.
- The import of unknow flex change properties into the config is now avoided.
- The export of flex changes sometimes generated multiple flex changes into the dev workspace.
- The script for extracting documentation had neglected patternProperties of the schemas.
- An exception occurred in case of invalid annotation references, the schemas and config files were not generated in this case.
- Too many actions had been listed as table columns: now it is restricted to the inline actions.

## [1.90.3] - 2021-06-28

### Fixed

- The build result did not comprise the type definitions anymore. They are available again now.

## [1.90.2] - 2021-06-17

### Added

- annotationPath added as metadata to the columns in JSON schema.

### Changed

- The enum for fragment names of column extension is more restrictive now, it does not comprise cells anymore.
- webpack uglify function names.

### Fixed

- During the export of V4 configs, manifest sections were created from scratch; this led to a deletion of properties that are not considered (yet) by the specification module.
- Fix for launch config Import project which can be used to debug the import of a project.
- During the export, fragments are not deleted anymore, as they may comprise customer coding.
- If a fragment is not present yet, it gets created now, i.e. added with a <root> prefix to the list of fragments.
- yarn watch allows debugging of custom extensions now, as the templates are available again in the dist folder.
- Correct sync logic to make sure that config changes are written only to desired places in manifest.json
- An exception had occured in case of invalid target annotation paths, this is caught now.
- OData V4 - Correct sync logic so that custom sections entry in manifest.json gets deleted if entry is deleted from page config
- OData V4 - Correct sync logic, page add was not added if 'navigation' property missing in 'manifest.json'.
- OData V4 - Correct sync logic, page deletion, 'navigation' property was not cleared if there was no an navigation left.
- OData V2 - Flex changes not supported by specification module remain unaffected by the sync logic
- OData V2 - Fix sync logic to avoid creation of duplicate flex changes in case of Object Page tables
- OData V2 - ALP: Improved sync logic as some of the supported flex chagnes were not imported to config files

## [1.90.1] - 2021-06-03

### Changed

- The access to reflect metadata is now centralized in factory classes and thus runs in a generic way in most situations.

### Fixed

- Path references of labels had not been resolved correctly. Common.label annotations of the target reference are now considered correctly.
- The regex pattern for binding changes was incomplete, resulting in validation errrors.
- OData V4: Enhance sync logic to ensure only properties that are supported by specification module are modified in the manifest.json

### Quality

Upgrades of dependencies to:

- "ts-loader": 9.1.2
- node version 12
- "webpack": 5.37.1
- "chalk": "4.1.1"
- "ejs": "3.1.6"
- "i18next": "20.3.1"
- "ts-json-schema-generator": "0.93.0"

Added resolutions for

- "glob-parent": "^5.1.2"
- "normalize-url": "^6.0.1"
- "ws": "^7.4.6"
- "trim-newlines": "^3.0.1"

## [1.90.0] - 2021-05-20

### Added

First specification version for SAPUI5 release 1.90 and later.

### Changed

- The initialLoad setting of V4 tables is now an enum with three different options, in accordance with sap.fe.
