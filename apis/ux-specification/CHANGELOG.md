# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## What's new with version 1.84

*Official support of OData V4*

## [1.84.11] - 2021-05-06

### Added

- New tag displayName in JSON schema: used to switch the name in the UI when needed, the original schema name is not changed due to compatibility reasons.
- New tag dataType in JSON schema for V4 Form and Object Page: as a tag, this can be rendered display-only as an additional information for any data field.

### Changed

- Documentation updates, due to introduction of the additional version for UI5 1.89
- Schema file names are now based on entitySet instead of entityType

### Fixed

- OData V2: LR/OP/ALP - Unknown properties are now excluded from export which in turn also avoids deletion of properties unknown to specificaiton from manifest
- No invalid references anymore at the generated JSON schemas.

### Quality

- lodash upgrade

## [1.84.10] - 2021-04-22

### Added

- createWithParameterDialog is now also supported for the V2 Object Page

### Changed

- createWithParameterDialog can be found under _table_ properties  instead of _toolbarActions_ now.

### Fixed

- List report V2: too many properties had been presented at LSP for analytical table

### Quality

- Switch build to webpack
- Upgrade of Annotation-Vocabularies-Tools

## [1.84.9] - 2021-04-15

### Quality

- Upgrade of handlebars

## [1.84.8] - 2021-04-09

### Added

- Actions from the UI.Identification annotation are now represented in the V4 schemas.
- Property inlineDelete for quickVariantSelectionX (table variants)

### Changed

- quickVariantSelection and quickVariantSelectionX definitions are more general no, allowing any number of tabs.

### Fixed

- Missing or incorrect properties for semantic date range control: fields->filter->equals now supports an array of date ranges, not just a single date range value. Additionally, both 'key' and 'category' options support both "equals" and "contains".
- OData V2: ALP - ignoredChartTypes property is now supports more values
- Export of quickVariantSelectionX in V2 was wrong or could lead to exception.

### Quality

- Decrease the number of Eslint warnings

## [1.84.7] - 2021-03-25

### Added

- Forms and the comprised fields and actions are represented in schemas for V4 object pages

### Fixed

- No duplicate entries in the result lists of scripts for extracting documentation

## [1.84.6] - 2021-03-11

### Added

- Property availability for V4 table columns
- Tag isViewNode now marks schema elements that are relevant for setting up an out line or schematic view of a page; (complex) properties are not marked like that.
- Tag i18nClassification marks properties of the schema that are relevent for translation; it uses the key words following the SAP guidelines for translation.
- Forms, field groups and fields of Object Pages are now represented in the V4 schemas.
- Form Entry Object Page support

### Changed

- V4 tables: do not show columns in config that are empty or not maintained at all

### Fixed

- Export of OVP card of the new V4 types to manifest
- V4: Do not throw exception in case of invalid columns listed in manifest, just ignore them
- V4 column keys adjusted: vocabulary alias shall not be part of it
- OVP: Unknown properties are now excluded from export

## [1.84.5] - 2021-02-25

### Added

- Property valueSelectionInfo of OVP cards
- Mark translatable properties in `schema` with `isLanguageDependent` property.
- New Form Entry Object Page added

### Changed

### Deprecated

### Removed

### Fixed

- Exceptions have occurred in case of incomplete or inconsistent annotations. This was solved by a new version of the Annotation Vocabulary Tools that is delivered together with the Specification module.
- Sync now works correctly for property "quickVariantSelectionX"

### Quality

- Switch to Sonar EE

## [1.84.4] - 2021-02-23

### Fixed

- Duplicate property "entitySet" for link list cards got removed

## [1.84.3] - 2021-02-11

### Added

- Manifest settings for (standard) table columns of OData V4 are now supported.
- OData V4: Support of V4 card types in OVP template (table, list and analytical card).
- OData V2: Support of createWithParameterDialog settings for create from the V2 filterbar.

### Fixed

- Overview Page: mandatory fields are clarified and reworked
- Overview Page: obsolete field timeAxis eliminated
- Object Page V4: `layout/sectionLayout` is imported from `manifest.json`
- Object Page V2: `XML` type is only valid type for selection for Custom Section Fragment definition

### Quality

- Upgrade of node modules used

## [1.84.2] - 2021-01-28

### Fixed

- The 'views' definition for OData V4 was not read nor written to the right position at manifest.
- Flex changes for ALP table columns had been written with the wrong selector id and thus had no effect in the run-time.

### Quality

- Dependencies to other npm modules have been actualized

## [1.84.1] - 2021-01-14

### Added

- The specification API now allows passing a logger, i.e. an instance of the new interface ExtensionLogger.
If supplied, all messages resulting from the API processing will be passed to the logger instance instead of console.log.
- Property showDataLabel on global OVP level
- OData V2: New `extensionType` property is added to Custom Column definition.
- OData V2: Support for Custom Columns in Object Page tables.

### Changed

- OData V4: List Report `variantManagement` property is now moved to page level
- The specification API now returns a _complete_ list of flex changes, not only the updated ones; if a flex property was not maintained or deleted, you can find it in the list with content.newValue = null. This allows the consuming application to distinguish flex changes that are supported by the JSON schema of the specification from other flex changes that may have been created by other means; only changes that are part of the result list of the API but have content.newValue = null should get deleted from the app.

### Fixed

- OData V2: Export fails to resolve page in `manifest.json` when page key does not contain entitySet.
- OData V4: Switching from FCL to Standard Layout - `manifest.json` -> `sap.ui5/routing/routes/[]/target` was not reseting back

## [1.84.0] - 2020-12-03

### Added

- OData V4: new properties added to the specification for table settings of list report and object page
- OVP custom card - `template` property uses pattern to avoid non-custom card template overlap
- OVP cards - `model` property uses enum entries populated from `manifest.json`

### Changed

- OData V2: Use enum instead of string for property `createWithFilters -> strategy`

### Fixed

- OData V2: Improved sync logic to avoid deletion of entries from page config
- OData V4: Not all properties had been imported into config files
