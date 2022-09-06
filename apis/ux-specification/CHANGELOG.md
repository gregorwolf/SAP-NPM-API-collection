# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

## [1.102.5] - 2022-08-24

### Added

- API enhanced by a wrapper function for the creation of custom views (that delegates to the FPM writer of open-ux-tools)
- OData V4:
  - Added custom pages using FPM library to pages view in Application Modeler Panel

### Changed

- The specification module is now build with esbuild instead of webpack.
The new build generates all type information into a types folder, which makes it easier to consume (but the consumption must be adapted). Examples:

````
import { PageType } from '@sap/ux-specification/dist/src/specification/common/'; 
==>  import { PageType } from '@sap/ux-specification/types';

import type { TableCustomColumns, TableCustomColumn } from '@sap/ux-specification/dist/src/v2';
==> import type { TableCustomColumns, TableCustomColumn } from '@sap/ux-specification/types/v2';

import { SectionPosition as SectionPositionV4 } from '@sap/ux-specification/dist/src/v4';
==> import { SectionPosition as SectionPositionV4 } from '@sap/ux-specification/types/v4';
````

- OData V4:
  - LR: Mark view properties `key`, `index` as hidden in schema

### Removed

### Deprecated

### Fixed

- OData V2:
  - OP: Fixed incorrect generation of flexChanges in case of Form, Form Fields and Form Fields referenced from a navigation entity

- OData V4:
  - In some cases sections defined with PresentationVariants did not appear on the object page
  - The resolution of alias definitions using the @SAP__ prefix was not correct, leading also to gaps in the elements that were considered
  - LR: Schema now considers default visualation `UI.LineItem` if not defined in `SelectionPresentationVariant`

### Quality

## [1.102.4] - 2022-08-11

### Added

- OData V2:
  - LR: Added enum with FieldGroup annotations to `annotationPath` property of tableSettings -> MultiEdit
- OData V4: the schemas and configs of list report views now also show the visibility property and custom views.

### Changed

- OData V4: With API version 4 of specification - introduced with the given version - the way how routes are represented in the app.json changes: before the pattern was
  `route: key`, now it follows the manifest syntax  

  ````
  key: {
      route: route
  }
  ````

  The switch to an object representation allows to also include other target information like "outbound".
- OData V4: as long as no views are defined in manifest, the showCounts property is not part of the schema, except if it is already maintained.  
- OData V2:
  - Mark custom column 'columnIndex' property as hidden

### Removed

### Deprecated

### Fixed

- OData V4:
  - LR: The export of property changes at the page editor led to a deletion of (custom) views in manifest; besides, outbound navigation entries could get deleted.
  - Fixed an issue with missing custom action if an empty "press" is defined

### Quality

## [1.102.3] - 2022-07-28

### Added

- OData V4:
  - Added support for custom actions for tables in LR and OP

### Changed

### Removed

### Deprecated

### Fixed

- OData V4:
  - Fixed an issue with custom column export where it was not possible to restore a deleted column

### Quality

- Upgrade of webpack and dependent modules
- Upgrade of terser
- Upgrade of glob-parent, mem-fs-editor
- Upgrade of lerna
- Upgrade of fe-fpm-writer

## [1.102.2] - 2022-07-14

### Changed

- OData V4: In case of PresentationVariant definitions for charts or line items an intermediate node had originally been introduced in the Object Page schema that represents the PresentationVariant. This multi-level propagation of references caused issues in the consuming UI, thus the intermediate node got deleted again. The PresentationVariant must be determined by the consuming application if necessary.

### Fixed

- OData V2:
  - OVP:

- OData V4:
  - Properties of custom columns on object page had not been exported correctly if the table is associated to another entity type via navigation path or is using a PresentationVariant.
  The value help of the anchor in LSP (config JSON) also did not show the right values.
  - Object Page: Fixed an issue with the schema that `annotationPath` for Object Page Table Sections did not contain `qualifier`;
  wrong `annotationPath` and `isViewNode` settings are adjusted.
  - Fixed an issue with export that multiple changes to view's `key` property created duplicated entries in manifest.json

### Quality

- Switch from nexus repository to artifactory

## [1.102.1] - 2022-06-29

### Added

- OData V4:
  - Extend pagemap support for freestyle apps using FPM library

### Fixed

- OData V2:
  - OVP: LSP for `model` property of a card now lists models from sap.ui5 section of manifest.json
  - Table type property is now set to blank in case not maintained in manifest.json
  - If two sections of object page referred to an element (e.g. action, table column) of the same name, they had been sync'd by the program logic: changes of one property had also been refelected in the other.
  - One UI adaptation or flexibility change may have been shown multiple times in the config, at different sections.
  - No sorting by time took place before for flexibility changes, as a result an older change of the same property may have shown up instead of the newer one.
  - If several flexibility changes existed for the same control property, secondary ones had not been imported correctly: you could find them under a wrong property name in the config JSON file.

## [1.102.0] - 2022-06-16

### Added

- Missing exposure of type definitions was added.

### Changed

OData V2:

- Custom column property "columnIndex". Schema enhancement by defining range using "minimum=0".

### Removed

OData V4:

- In case of List Report views, non-applicable table properties are removed.

### Fixed

OData V4:

- In case of List Report views, custom columns with navigation property are considered for the correct view.
- Avoid creation of empty personalization object
OData V2:
- Custom column issue with Grid/Tree/Analytical table types - empty second custom column is added in xml files
