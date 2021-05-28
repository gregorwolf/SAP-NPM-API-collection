# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).
## [1.2.0] - 2021-05-27
### Changed
- Updated comprised OData vocabularies.
### Fixed
- Unjustified error message for expected type

## [1.1.11] - 2021-05-13
### Changed
- Updated comprised OData vocabularies.

## [1.1.8] - 2021-04-15
### Added
- Syntax warning for `/` or `.` after annotation term name.  

### Changed
- Removed paths to the same annotation from code completion. 

## [1.1.7] - 2021-03-31
### Added
- Go To References /Peek References / Show All References for the aggregared properties defined with the `@Analytics.AggregatedProperties` annotation. You can now navigate to the place where the aggregated property is referenced.

### Changed
- Vocabulary description and long description for restricted `String` values are now displayed in Quick Info window of the completion lists. 

## [1.1.5] - 2021-0304

### Added
- Code completion, diagnostics and quick info for applying selected client-side odata functions:
  -  `odata.concat`
  -  `odata.fillUriTemplate`
  -  `odata.uriEncode`
- Peek References/ Go To References for annotations referenced in other annotations. You can now see if and where the annotation is referenced. 
Limitation: references in propagated annotations might be not included.

## [1.1.4] - 2021-02-25

### Changed
- Error message "Invalid property" for `@Common.ValueList.entity` substituted with warning of deprecated non-standard property.


## [1.1.2] - 2021-02-04

### Added
- Peek Definition for the dynamically created aggregared properties. You can now see how and where the property used as an annotation value is defined also if it is  dynamically created using the Analytics.AggregatedProperties  annotation.
- Go To Definition for the dynamically created aggregared properties. You can now navigate to the place where the aggregated property is defined with the Analytics.AggregatedProperties annotation.
- Code completion and diagnostics for annotating types with terms applicable to properties and parameters. 

## [1.0.9] - 2021-01-21

### Added
- Code completion and diagnostics for cds-specific alternatives to OData annotations 
- Code completion and diagnostics for annotating services (entity containers)
- Code completion and diagnostics for properties `IsActiveEntity` and `HasActiveEntity` auto-generated on applying `@odata.draft.enabled`
- Peek Definition for entity type properties and actions used in annotations. You can now see where the entity type property or action is defined.
- Go To Definition for entity type properties and actions used in annotations. You can now navigate to the place in the service where the entity type property or action is defined.
- Dedicated validation and quick fix for wrong case in annotation terms, properties, record types, `$Type`, `$value`, paths and enum values. You can now fix the typos related to wrong case with one click. 
- Dedicated validation for type mismatch in paths

### Changed
- Omitted qualifier tab stops in code completion snippets for annotation not applied to entity type 
- Omitted `:` in code completion snippets for boolean type annotations with default value `true`.

## [1.0.7] - 2020-12-10

### Added
- Code completion and diagnostics for referencing actions in DataFieldForAction
- Code completion and diagnostics for properties of open complex types (e.g. Data property in UI.ConnectedFields)
- Code completion, diagnostics and hover information for a subset of cds [common annotations](https://cap.cloud.sap/docs/cds/annotations) recommended in SAP Cloud Application Programming documentation for [serving Fiori UIs](https://cap.cloud.sap/docs/advanced/fiori#prefer-title-and-description)
- String attribute included by default in code snippets for annotation properties of type `Edm.String`


## [1.0.6] - 2020-11-25

### Changed
- Enhanced error messages with additional information.

### Fixed
- Infinite loop at loading caused by unhandled block comments
- Code completion and validation for $Return in annotations applied to bound actions or functions
- Code completion and validation for paths starting with `_it` in annotations applied to bound actions or functions
- Code completion and validation for relative paths to parameters

## [1.0.5] - 2020-11-13

### Added
- Option to omit the redundant types if they are not mandatory based user setting omitRedundantTypesInSnippets.

### Changed
- Excluded some irrelevant path segments from the code completion in paths

## [1.0.4] - 2020-11-11

### Fixed
- Performance for large projects

## [1.0.3] - 2020-10-29

### Added
- Support for code completion, diagnostic and navigating to definition in paths to annotation. Example:
    ```
    KPI                 : {
    SelectionVariant : ![@UI.SelectionVariant],
    DataPoint        : ![@UI.DataPoint#test],
    }
    ```
- Replacement behavior for editing annotations

### Fixed
- Code completion for adding annotation before existing annotation when a comma is missing
- Code completion for path segments: removed actions from the completion lists
- False validation for non-standard annotations `@Aggregation.default`, `@Capabilities.Insertable`, `@Capabilities.Updatable`, `@Capabilities.Deletable` and `@Capabilities.Readable`
- False validation for 'Unknown Namespace ...'
- False validation for 'Term cannot be applied ...'

### Changed: 
- Removed qualifier tab stop in embedded annotation snippets, as qualifiers are not allowed there


## [1.0.2] - 2020-10-16

### Added
- Hiding/showing the i18n-related diagnostic messages based on the user/workspace setting `Mark Missing I18n Default`
- Support for flattened annotation structures
- Support for annotating actions and functions

### Fixed
- Annotating annotations, e.g. annotating UI.LineItem with UI.Criticality

## [1.0] - 2020-10-08
Release status: GA We are pleased to announce the official GA of the SAP Fiori tools - CDS OData Language Server.

### Added
- Basic code completion and diagnostics for annotating entities and elements
- Complex micro snippets for simplified annotation definition
- Vocabulary documentation on hover and in code completion lists
- Internationalization support for language dependent strings: warnings with Quick Fix actions
- Peek Definition support for referenced annotations 
- Go To Definition support for referenced annotations 
