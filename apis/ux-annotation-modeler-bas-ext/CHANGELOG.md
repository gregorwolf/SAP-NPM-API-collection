# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).
## [1.9.4] - 2023-04-17
### Added
  - The **Show All References** option for metadata elements such as entity types, properties, and actions displays now also the references to these elements in annotation values.

## [1.7.2] - 2022-08-25
### Added
  - Added a code action to transform self-closing tag in `Common.Text` annotation to simplify annotating it e.g. with `Common.TextArrangement`.
## [1.2.3] - 2021-06-24
### Added
- Code completion, diagnostic and go to definition for string properties `CollectionPath` and `ValueListProperty` in `Common.ValueList` annotation.
- Semantic highlighting of annotation elements.
### Changed
- Updated comprised OData vocabularies to include HTML5 vocabulary https://sap.github.io/odata-vocabularies/vocabularies/HTML5.html.

## [1.2.0] - 2021-05-27
### Changed
- Updated comprised OData vocabularies.

## [1.1.11] - 2021-05-13
### Changed
- Updated comprised OData vocabularies.

## [1.1.9] - 2021-04-15
### Changed
- Removed paths to the same annotation and `/` segment for the absolute paths from the code completion. 

## [1.1.7] - 2021-03-31
### Added
- Go To References /Peek References / Show All References for the aggregared properties defined with the `Analytics.AggregatedProperties` annotation. You can now navigate to the place in the metadata or annotation file where the aggregated property is referenced.

### Changed
- Vocabulary description and long description for restricted `String` values are now displayed in Quick Info window of the completion lists. 

## [1.1.5] - 2021-03-18
### Added
- Code completion and diagnostics for comparison operators
- Links to relevant development guides on hover over the annotation term

## [1.1.4] - 2021-03-04
### Added
- Quick Fix to convert self-closing tags for `PropertyValue` and `LabeledElement`. You can now apply odata functions or annotate property values faster.
- Code completion and diagnostics for logical operators. You can now define values based on certain conditions more efficient.

## [1.1.2] - 2021-02-25

### Added
- Code completion, diagnostics and quick info for applying selected client-side odata functions:
  - `odata.concat` 
  - `odata.fillUriTemplate`
  - `odata.uriEncode`


## [1.0.28] - 2021-02-04

### Added
- Peek Definition for target path segments. You can now see where and how the annotated targets (entity types, properties, function imports, etc) are defined.
- Go To Definition for target path segments. You can now navigate to the place in the metadata where the annotated targets (entity types, properties, function imports, etc) are defined.
- Peek Definition for the dynamically created aggregared properties. You can now see how and where the property used as an annotation value is defined also if it is  dynamically created using the `Analytics.AggregatedProperties` annotation.
- Go To Definition for the dynamically created aggregared properties. You can now navigate to the place in the metadata or annotation file where the aggregated property is defined with the `Analytics.AggregatedProperties` annotation.


## [1.0.26] - 2021-01-21

### Added
- Peek References for annotations referenced in other annotations. You can now see if and where the annotation is referenced.
- Go To References for annotations referenced in other annotations. You can now navigate to the place in the project where the annotation is referenced (if any).
- Peek Definition for entity type properties and actions used in annotations. You can now see where the entity type property or action is defined.
- Go To Definition for entity type properties and actions used in annotations. You can now navigate to the place in the metadata where the entity type property or action is defined.
- Dedicated validation and quick fix for wrong case in annotation terms, properties, record types, paths and enum values. You can now fix the typos related to wrong case with one click. 
- Dedicated validation for type mismatch in paths. 

### Changed
- Omitted qualifier tab stops in code completion snippets for annotation not applied to entity type 
- Omitted attributes in code completion snippets for boolean type annotations with default value `true`.

## [1.0.24] - 2020-12-10

### Added
- Code completion and diagnostics for referencing actions in DataFieldForAction
- Code completion and diagnostics for properties of open complex types (e.g. Data property in UI.ConnectedFields)
- String attribute included by default in code snippets for annotation properties of type `Edm.String`

## [1.0.23] - 2020-11-26

### Added
- Display the type of annotation target on hover and in code completion lists

## [1.0.22] - 2020-11-13

### Changed
- Excluded some irrelevant values from code completion lists in paths

## [1.0.12] - 2020-08-12

### Added
- Code completion lists for property path values now include properties dynamically generated using the Analytics.AggregatedProperties annotation.
- Diagnostics for property path values now consider properties dynamically generated using the Analytics.AggregatedProperties annotation.
 
## [1.0] - 2020-06-16
Release status: GA
We are pleased to announce the official GA of the SAP Fiori tools - XMl Annotation Language Server extension. 

## [0.9] - 2020-05-20
Release status:Beta

### Added
- Basic code completion and diagnostics
-	Complex micro snippets for simplified annotation definition
- Vocabulary documentation on hover and in code completion lists
- Code snippet in documentation window for items in code completion lists
- Internationalization support for language dependent strings: warnings with Quick Fix actions
- Peek Definition support for annotation and internationalized text references
- Go To Definition support for annotation and internationalized text references
-	Automatic update of code completion lists and diagnostics on project changes
-	Multiple schema support in service metadata
- Multiple services support in projects based on Overview Page template
