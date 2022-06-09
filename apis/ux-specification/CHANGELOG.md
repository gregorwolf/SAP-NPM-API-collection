# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.100.4] - 2022-06-02

### Added
OData V4:
- In case of a default (without qualifier) Selection-/PresentationVariant, the table settings and columns are now considered on list report page.

### Changed
OData V4:
- Titles of charts in sections and header sections now correspond to the run-time.
- Add "annotationPath" schema property to schema for "Table" definition in simple list report.

### Removed

### Deprecated

### Fixed
OData V4:
- If `defaultAnnotationPath` is used, corresponding custom columns were not considered on list report page.

### Quality
Upgrade node & node-version to 14.x

## [1.100.3] - 2022-05-19

### Changed
- OData V4: 
    - For list report views, the content of title and description in the schema got exchanged.
    - Custom columns having an invalid anchor are not filtered out anymore but added to the schema (at the end of the columns' list). This better supports fixing the situation and is necessary so that the import fills the properties correctly.
    - LR: If views are enabled, generic table columns won't be used/filled.


### Fixed
- OData V4: 
    - If the table setting creationMode existed in the outdated string format, the export just had overwritten the string. Now, an implicit conversion to the new object format takes place.
    - In case of multiple custom columns with an invalid anchor the app schema generation ran into an endless loop.
    - No import of property annotationPath was happening at chart views of List Report.
    - In the app specific schema, the description was missing for charts in sections.
    - Tag 'hidden' was added to the property annotationPath of the ALP chart view in app schema.
    - If defaultTemplateAnnotationPath is maintained and refers to an annotation other than UI.LineItem, the table settings and columns of the referred definition are now imported correctly.
    
### Quality
- Code smells fixed, as reported by sonarQube.
- Upgrade of annotation vocabularies tools.

## [1.100.2] - 2022-05-05

### Added
- OData V4: 
  - The title of ALP or List Report views is now following the same criteria as the UI5 run-time.

### Fixed
- OData V4:  
  - Problems with deletion of ListReport table views.
  - Unknown properties removed from custom section definition in 'manifest.json'.
  - delete 'table/personalization' object property in 'manifest.json' if last property was removed.
  - Export. Delete of entries from `table/views` - views were not deleted during export if entries in annotation file were deleted as first.
  - When changing the table type in the page editor for LRP (V4), the respective manifest setting is not updated as long as this page is configured with the primary and secondary views
- OData V2:
  - Sections and subsections with a reference to Communication.Contact or Communication.Address had not been shown, support of flexibility changes for them.
  - Facet or section references with multi-level navigation had not been handled correctly.

### Quality
- Switch consumption of "@sapui5/ts-types" to "@sapui5/ts-types-esm".

## [1.100.1] - 2022-04-21

### Added

- OData V2:
  - LR: Old settings for table type (tableType) had been ignored in newer specification releases. As a consequence, you may have found the table type twice in manifest, once with the old syntax and an additional entry with the new syntax, after switching to a newer UI5 version.
  Now an implicit conversion to the new tableSettings takes place, and the old setting gets automatically replaced during the export. 
- OData V4:
  - OP: Added support for presentationVariants with chart or lineItem visualization

- Documentation actualized with regards to the new release version 1.100.

### Fixed
- OData V4: 
  - Exception in case of multi-tab views in manifest that referred to a SelectionVariant.
  - Export of table settings of list report was targeting the wrong manifest settings if a defaultTemplateAnnotationPath is defined, pointing to a SelectionPresentationVariant. 
  - List report with multiple views: insert and reordering was not supported correctly.
- OData V2:
  - After an entry of quickVariantSelectionX got deleted, the entry still was present in manifest.json.
  - Sections of subordinate object pages had not been added correctly to the app schema in all cases.

### Quality
- upgrade ejs to 3.1.7
- SonarQube: issued solved with regards to cognitive complexity
- upgrade ejs to 3.1.7

## [1.100.0] - 2022-04-07

### Added

- OData V2:
  - LR: Added support for `multiEdit` property to enable mass edit feature.
- OData V4:
  - LR: Added support for property `hideFilterBar`
  - Support of defaultTemplateAnnotationPath as property; consider defaultTemplateAnnotationPath when retrieving the relevant table settings and while switching to ALP flavour.

### Fixed

- OData V2:
  - Extensions - empty "extensions" object was created in "sap.ui5/"extends"/"extensions"/"sap.ui.viewExtensions"/"sap.suite.ui.generic.template.ListReport.view.ListReport".

### Quality

- Replace type object for schemas by Definition from 'typescript-json-schema'.
- Upgrade of async.
