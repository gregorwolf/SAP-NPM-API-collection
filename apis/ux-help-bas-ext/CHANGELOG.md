# Change Log

All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

### Project Accelerator
- **Note**: Joule capabilities are only available for SAP Build Code subscribers using SAP Business Application Studio

## [1.17.3] - 2025-04-03

### Changed
- The `model` parameter is now shown as mandatory in overview page guides
- Enhanced the guides listed below to harmonize the creation of custom files. View XML files along with their controllers are now placed in the `ext/view` folder, fragment XML files in the `ext/fragment` folder, and single controller files in the `ext/controller` folder
  - _Add custom columns to the table using extensions_
  - _Extend object page headers using extensions_
  - _Extend forms in sections_
- Harmonized the creation of i18n keys so that PascalCase is used for annotation properties in a CAP application and camelCase elsewhere

### Fixed
- Fixed an issue where the extension did not open for an overview page application when the `globalFilterModel` property in the `manifest.json` file referred to a model that was not defined

## [1.17.1] - 2025-03-20

### Project Accelerator
- Fixed an issue where the `/fiori-gen-cap-ui` command in Joule was visible even if there was no project in the current workspace

### Added
- Added a parameter collection table to "Step 1" of the _Add multiple fields to a column in responsive tables_ guide helping users to do the following:
  - modify an existing `UI.FieldGroup` annotation
  - work with multiple parameters at once

### Changed
- Standardized file labeling to improve clarity in guides with multiple code snippets by replacing "Files to be updated/created" with "Files"
- Introduced UX adjustments to indicate existing files as opposed to newly created files in guides with multiple code snippets
- Enhanced the i18n popup's visibility and design by doing the following:
  - implementing an inverted theme
  - correcting spacing and grammar issues
  - refining button labels
  - ensuring the popup was centered relative to the trigger button

### Fixed
- Fixed an issue where an unintended "undefined" variant was added after viewing a guide variant with subvariants and navigating between guides
- Fixed an issue where guides were not scrollable when using SAP Business Application Studio in the Mozilla Firefox browser, preventing code snippets from being visible

## [1.17.0] - 2025-03-05

🚀 Added a new brand icon for the Guided Development extension to better align with the SAP Brand

### Project Accelerator
- Added a validation check to the `/fiori-gen-cap-ui` command in Joule to ensure that the user prompt to generate an SAP Fiori UI can be used with the existing services and entities in the CAP project
- Fixed an issue where the preview of the generated SAP Fiori application from the storyboard using the `/fiori-gen-cap-ui` Joule command failed to launch

### Added
- Added a validation check for OData V4 services to the "Model" parameter across all the steps in the _Add a stack card to an overview page_ guide

### Changed 
- Enhanced the user experience for steps containing multiple code snippets. Instead of scrolling to the relevant snippet, clicking on a file now opens it directly
- Enhanced the _Add a custom action to a page using extensions_ guide to ensure custom files are created in the following folders:
  - view XML files are placed in the `ext/view` folder
  - fragment XML files are placed in the `ext/fragment` folder
  - single controller files are placed in the `ext/controller` folder

### Fixed
- Fixed an issue in guides with multiple parameter collection tables where reordering or deleting rows on a table other than the first parameter collection table caused the view to scroll to a row in the first parameter collection table

## [1.16.5] - 2025-02-20
### Project Accelerator
- Fixed a number of accessibility issues with the Project Accelerator to improve screen reader usability and contrast ratio
- Fixed an issue where the Project Accelerator was visible in SAP Business Application Studio when users did not have an SAP Build Code subscription with Joule

### Added
- Added a validation message to the _Add a stack card to an overview page_ guide when an OData V4 model is selected

### Changed
- Improved the UX of links by adding an underline that disappears on hover to align with SAP Accessibility standards

### Fixed
- Removed empty space that appeared below the guide variants when in "All Guides" mode
- Fixed an issue where the message "There are no applicable guides" was displayed when guides were loading
- Fixed an issue where validation messages were displayed immediately when a parameter was enabled
- Fixed a UX issue where a vertical line appeared too close to the "Start" button

## [1.16.4] - 2025-02-06
### Project Accelerator
- Added a description to the Project Accelerator that details how you can drag and drop files from your local file system
- Fixed an issue where a generated SAP Fiori project would not have default annotations defined where needed when using the Project Accelerator
- Fixed an issue where an incorrect error message was being displayed when attempting to generate a UI for an existing CAP project and no CAP project is defined

### Changed
- When using overview page guides, if only one model is defined in an overview page application, it is now selected by default

### Fixed
- Fixed an issue with the overview page guides where code snippets were not updated according to the OData version of the selected model
- Fixed an issue with the code snippet in the _Create and edit dynamic measures_ step of several CAP CDS guides where the value of `AggregatableProperty` was incorrectly wrapped in quotes
- Fixed an issue where overview page guides were incorrectly shown as supported for an overview page application created in a CAP project
- Fixed an issue with overview page guides where the annotation file was not retrieved upon changing the `Model` property
- Fixed an accessibility issue where the values of "Project", "Group by", and "View" dropdowns were read aloud twice by screen readers

## [1.16.3] - 2025-01-23
### Project Accelerator
- Users can now drag image and text files from their local file system and drop them in the Project Accelerator window for use as their application requirements
- Fixed an issue where uppercase filenames were not accepted in the Project Accelerator
- Fixed an issue where clicking on the "Generate" button in the Project Accelerator caused a delay before starting generation

### Fixed
- Fixed an issue where the "Request New Guide" form was not responsive
- Fixed an accessibility issue where the focus moved out of the "Project" dropdown when opening the dropdown using keyboard shortcuts
- Fixed an issue with Step 2 of the _Add a micro chart column to a table_ guide where the `Common.Label` annotation was written incorrectly

## [1.16.2] - 2025-01-08

### Project Accelerator
- Fixed an issue where the text of an uploaded requirements document in the application requirements text window was not editable

### Added
- Added a CAP CDS variant for the _Add a new contact view column to a table_ guide

### Changed
- Updated the guide description of the OData V4 variant of the _Configure variant management for controls and pages_ guide to align with the implementation

### Fixed
- Enhanced the error handling by displaying the global warning page more quickly and providing hyperlinks for easy navigation to the error details and actionable steps
- Fixed an issue where Guided Development did not display any guides if there were no supported SAP Fiori projects in the workspace
- Fixed an issue with the _Add a new contact view column to a table_ guide where clicking on the "Reset" button or selecting an `Entity Type` removed the initial code snippet 

## [1.16.0] - 2024-12-05
### Project Accelerator
- Added a new section to the `Fiori Tools` panel that allows users to generate SAP Fiori applications with a CAP project using Joule capabilities. The Project Accelerator enables you to provide text, images, or text and images, to generate an application. For more information, see [Generating an Application with the Project Accelerator or Joule Using SAP Fiori Tools AI](https://help.sap.com/docs/SAP_FIORI_tools/17d50220bcd848aa854c9c182d65b699/6845fedbb38c4da7a54a2c76081f3abb.html)

### Joule
- Queries in Joule that relate to SAP Fiori project generation are now transferred to the Project Accelerator

### Fixed
- Fixed an issue where i18n entries were not created in the correct files in CAP projects
- Fixed an issue where guides did not scroll to error messages
- Fixed an issue that caused the Annotation Path property to be permanently disabled in the _Add a new section to an object page_ guide
- Fixed a UX issue where the underline of the currently active guide variant was positioned incorrectly

## [1.15.6] - 2024-11-14
### Added
- Improved the following chart guides by adding an additional step to create and edit a dynamic measure:
  - _Add a micro chart column to a table_
  - _Add a smart chart facet to an object page_
  - _Add an interactive chart to a list page_
  - _Add a key performance indicator (KPI) tag to a page_
  - _Add a new visual filter to the filter bar_

### Fixed
- Fixed an issue with CAP guides where the service selection dropdown displayed all services in a project instead of the service the app was built on
- Fixed an accessibility issue where the focus moved out of the filter by tags control when the escape key was pressed on Windows
- Fixed an issue where the properties in a dropdown did not update based on the selected navigation path

## [1.15.4] - 2024-10-31
### Changed
- Filter values are now in title case to improve consistency

### Fixed
- Fixed an issue in Step 1 of the _Configure multiple views for tables_ guide where the existing UI.LineItem and UI.Chart annotations were not being read, which rendered the guide unusable
- Fixed a UX issue where the filename above the code snippet was displayed differently on macOS and Windows
- Fixed a UX issue where the values in the dropdown control were not vertically aligned when selected
- Fixed an accessibility issue where field validation errors were not conveyed to screen readers
- Fixed an accessibility issue where the focus moved out of the dropdown control when the escape key was pressed
- Fixed an accessibility issue where the screen reader did not read out group and field labels

## [1.15.3] - 2024-10-16
### Fixed
- Fixed an issue with the search field where clicking on the x icon removed the filters, the parameters, and closed the guide
- Fixed an issue where the filename in the code snippet section was not updated correctly after changing the annotation file in CAP projects

## [1.15.2] - 2024-10-03
### Joule
- Updated Joule support for SAP Fiori generation to now use the LLM `GPT-4o` instead of `GPT-3.5`

### Changed
- Updated the following building block guides to use the new prompts architecture using Inquirer.js and added several enhancements:
  - Add a table building block
  - Add a chart building block
  - Add a filter bar building block
- Updated the minimum SAPUI5 version in all the guides to ensure that only relevant guides are shown based on the project's minimum SAPUI5 version

### Fixed
- Fixed an accessibility issue where some guide variants could not be accessed when the view was set to All Guides and the horizontal space was narrow
- Fixed an issue with the validation of certain fields in specific Overview Page guides

## [1.15.1] - 2024-09-19
### Joule
- Added the ability to upload a document with business requirements and use it as the basis for a Joule request; users can now upload a document and enter a prompt in Joule such as "create my application from the attached document" to generate an application
- Added Page Map and Application Information buttons after the generated application has been accepted in Joule

### Fixed
- Fixed a UX issue related to the display of the info message for unsupported properties in the parameter collection table
- Fixed an issue where the hand icon indicating drag and drop also appeared on icons and texts in the parameter collection table
- Fixed an accessibility issue with the Expand view/Split view and Hide code snippet/Show code snippet toggle buttons where the screen reader did not read their new values when the buttons were toggled
- Fixed an issue where the `UI.DataFieldForAnnotation` referred to non-UI annotations like `Communication.Contact` and `Communication.Address`, and they were not rendered in the _Add and edit table columns_ guide

## [1.15.0] - 2024-09-05
### Fixed
- Fixed an accessibility issue with the keyboard focus: the focus now moves to the beginning of the corresponding step when the `Start Guide`, `Back` or `Next` buttons are used
- Improved the accessibility experience by providing an `aria-label` and tooltip to the show/hide code snippet icon

## [1.14.5] - 2024-08-22
### Changed
- Building block guides now show an error notification if both `sap.fe.templates` and `sap.fe.core` libraries are missing in the `manifest.json`

## [1.14.4] - 2024-08-08
### Fixed
- Fixed an issue where incorrect validation messages were shown on certain input fields
- Fixed an issue where guide titles were truncated when there wasn't enough horizontal space: we now show ellipsis instead

### Changed
- Changed the warning message to "Guides are not available. Please open a supported SAP Fiori project or a workspace containing SAP Fiori projects to proceed." when Guided Development is opened without any project context

## [1.14.3] - 2024-07-24
### Changed
- Improved the visualization of parameter collection tables by doing the following:
  - increasing the table width to reduce empty horizontal space
  - ensuring the label is always the first parameter and has a fixed width
  - displaying an ellipsis for the parameter name in case it exceeds the available space
  - displaying the hand icon when hovering, to indicate that a row supports the drag-and-drop functionality

### Fixed
- Fixed an issue with the _Enable a Show Related Apps button_ guide where the list report page was shown even though the guide is only applicable to object pages
- Fixed an issue with the "Guide Requests for Guided Development" link in the SAP Fiori Information panel where the _Request a new guide_ form did not open if a workspace contained only one project
- Fixed an issue related to scrolling to an error in any guide: now scrolling to an error only takes place if the error is not already visible on the screen
- Fixed an issue where the info icon was not visually aligned with the bubble icon that is used to mark parameters filled with values from the previous action
- Fixed an issue with guides not opening in full-screen mode when using a small screen

## [1.14.2] - 2024-07-10
### Added
- Added functionality to choose existing UI.Chart annotations in the _Add a micro chart column to a table_ guide
- Reworked Step 4 of the _Add an analytical card to an overview page_ guide by adding a parameter collection table for easy editing, and the possibility to work with the existing UI.Identification annotation

### Changed
- Removed the Determining property for the UI.DataFieldForAction annotation in the _Add and edit table columns_ guide, as it not recommended by the SAP Fiori elements framework
- Removed the editing capabilities for the _Group By_ and _View_ options in the extension toolbar, as it lead to incorrect guide filtering on edit

### Fixed
- Fixed an issue with the tooltip of the button not being updated when switching the guide to full-screen mode. Additionally, the tooltips of the icons were renamed to `Expand view` and `Split view`

## [1.14.1] - 2024-06-26
### Added
- Added two new ways to open the _Request a New Guide_ form: via the command palette entry "Fiori: Request New Guide" and through "Guide Requests for Guided Development" under the Useful Links section in the information panel

### Changed
- Removed the special UI for rendering tooltips when the "Add a new dynamic measure" button is disabled

### Fixed
- Fixed an issue where the toolbar would go out of view and become invisible when scrolling in the guide
- Fixed an issue in Step 1 of the _Configure multiple views for tables_ guide where the 'Visualization Qualifier' field was not disabled when the variant type was set to UI.SelectionVariant
- _Request a New Guide_ form now opens directly when accessed from the info icon, eliminating the need for an additional click

## [1.14.0] - 2024-06-12
### Added
- Added support for the UI.DataFieldForAction annotation in the CAP CDS variant of the _Add and edit table columns_ guide

### Changed
- The toolbar now spans across the guide list and guide content so that the Group By, View, and Search options are easily accessible and provide an improved and consistent user experience in alignment with other SAP Fiori tools features

### Fixed
- Fixed an issue where no error message was shown when a user tried to add an already existing function import to the UI.DataFieldForAction annotation in the _Add and edit table columns_ guide
- Fixed an issue where the code snippet in Step 2 was not updated based on the selected Page Type parameter in the OData V2 variant of the _Add a custom action to a page using extensions_ guide

## [1.13.6] - 2024-05-29
### Changed
- Object Page Section is now a mandatory parameter in guides

### Fixed
- Fixed an issue with the parameter collection table not being shown in case of an empty annotation
- Fixed an issue where guides were not correctly grouped when Group By was set to _Application Artifacts_ and View was set to _All Guides_

## [1.13.5] - 2024-05-15
### Joule
- **Note**: Joule capabilities are available for SAP Build Code subscribers in SAP Business Application Studio
- Fixed an issue where users could attempt to accept files in the Joule staging area even if the staging area was empty
- Improved the error message that is displayed when users attempt to use BAS Joule after exceeding their token limit, or when an error occurs in the back end
- Improved the efficiency of tokens used when generating an SAP Fiori elements application

### Fixed
- Fixed an issue with an incorrect code snippet in the _Add multiple fields to a column in responsive tables_ guide

## [1.13.4] - 2024-05-02
### Joule
- **Note**: Joule capabilities are available for SAP Build Code subscribers in SAP Business Application Studio
- Added the capability to generate a CAP project with an SAP Fiori elements application with the Form Entry Object Page floorplan
- Added the ability to preview the generated SAP Fiori elements application from the staging area before accepting the files into your workspace
 
### Added
- Added the **CAP CDS Annotation** variant for the _Add semantic colors to visual filters_ guide
- Added several enhancements to the _Add semantic colors to visual filters_ guide based on the features supported by the SAP Fiori elements framework
- Added a feature where the Add a new measure, and Add a new dynamic measure button is disabled if not applicable

### Changed
- Updated ABAP CDS guide variants to use the annotation syntax that is written to the ABAP CDS
- Updated information links in all guides
- Split the XML variant of the _Add semantic colors to visual filters_ guide into OData V2 and OData V4
- Marked Entity Set and Extension Point parameters as mandatory in the _Add a custom section to an object page using extensions_ guide

### Fixed
- Fixed an issue where the parameter collection table in the case of measures did not delete the values from the annotation files
- Fixed an issue with the home page not showing the correct error message when Guided Development is opened for Adaptation projects without node_modules
- Fixed an issue with the _Add and edit table columns_ guide where the screen didn't scroll to the inline error message on the click of Insert Snippet button

## [1.13.3] - 2024-04-17
### Generative AI
- Added the capability to generate a CAP project with an SAP Fiori elements application for SAP Build code subscribers in SAP Business Application Studio
- Added a check to ensure CAP tools are installed in the SAP Business Application Studio dev space before using Fiori tools AI to generate a CAP project
- Added support for multiple Object Pages in the generated SAP Fiori application
- Fixed an issue with not being able to accept the project files after regeneration

### Fixed
- Fixed an issue with the _Add a micro chart column to a table_ guide where an error was shown on the selection of an `Entity Type` parameter even if measures were defined

## [1.13.2] - 2024-04-03
### Changed
- The extension now opens in the user-selected region when the editor is split into multiple regions
- Replaced images in a few of the guides to better reflect the feature implemented by the guides

## [1.13.1] - 2024-03-20
### Added
- Added support for using Joule, SAP's AI assistant in SAP Business Application Studio, to enable users to directly translate business requirements into an SAP Fiori elements application within a CAP project. For full details on this feature and the prerequisites, please see the [SAP Fiori tools help portal](https://help.sap.com/docs/SAP_FIORI_tools/17d50220bcd848aa854c9c182d65b699/6845fedbb38c4da7a54a2c76081f3abb.html)

## [1.13.0] - 2024-03-07
### Added
- Added support for the UI.DataFieldForAction annotation in CAP variant of the _Add and edit table columns_ guide

### Changed
- Changed Inline and Determining parameters from required to optional
- Reference information links now point to https://ui5.sap.com/ and https://sdk.openui5.org/ instead of https://sapui5.hana.ondemand.com/  and https://openui5.hana.ondemand.com/

### Fixed
- Fixed an issue where duplicate annotations were created even though the annotations already existed
- Fixed an issue where using **Insert Snippet** led to an error in the case of CAP projects
- Fixed an issue where the placeholder value was getting inserted into the code in the _Add a custom action to a page using extensions_ guide 
- Fixed an issue in the building block guides where the **View or Fragment File** parameter was filled only after the **Entity** parameter was selected
- Fixed an issue where annotations defined in the associated entity were not considered in the _Add a filter bar building block_ guide

## [1.12.5] - 2024-02-22
### Added
- Added support for the UI.DataFieldForAction annotation in the _Add and edit table columns_ guide
- Added OData V2 and OData V4 variants for the _Configure multiple views for tables_ guide

### Changed
- Changed guide variant name from CDS Annotation to _CAP CDS Annotation_
- Replaced the Target path with the Chart Annotation Path parameter which lists annotations supported on OData V2 and OData V4 in the _Add a smart chart facet to an object page_ guide

### Fixed
- Fixed an issue where the hierarchyQualifier parameter was not based on the table’s entity in the _Configure table type_ guide
- Fixed an issue where UI.LineItem annotations with a qualifier were not considered

## [1.12.4] - 2024-02-08
### Added
- Added support for additional table types in the _Configure table type_ guide based on the SAPUI5 version and project type
- Added a feature in the _Configure table type_ guide to reflect the table type defined in the project

### Fixed
- Fixed an issue where existing UI.DataFieldForAnnotation was not considered but duplicated on click of the Insert Snippet button in the _Add a micro chart column to a table_ guide
- Fixed an issue where the _Related Facets Annotation Term_ parameter was disabled in the _Add a custom section to an object page using extensions_ guide
- Fixed multiple issues on Step 5 on the _Add a table card to an overview page_ guide to ensure that code snippet is correctly applied
- Fixed an issue where an incorrect reference to Common Vocabulary was created in the annotations if it didn’t already exist

## [1.12.3] - 2024-01-25
### Added
- Added an inline warning to the Entity Type parameter for missing function import in the _Add an Action Button_ guide
- Added a CAP CDS variant for the _Add Multiple Fields to a Column in Responsive Tables_ guide
- Added a feature that values of parameters are reset when they are deactivated
- Added a new input field validation that checks the correctness of the URL and also considers SAP-specific image URLs

### Changed
- Removed the _Reorder columns in a table_ guide as the functionality is already covered by the _Add and edit table columns_ guide
- The Page Name parameter is now marked as mandatory
- The EntityType and Entity Type Property parameters are now marked as mandatory in the _Enable semantic Date range on smart filter bar_ guide

### Fixed
- Fixed an issue with Guided Development not opening directly for an app in case an SAP CAP project contained multiple apps
- Fixed an issue where an invalid page type error was shown when clicking the insert snippet in the _Configure multiple views for table_ guide
- Fixed an issue where an error was shown when inserting a snippet for the CDS Variant of the _Add semantic highlights to line items in a table_ guide

## [1.12.2] - 2024-01-10
### Added
- Added an inline warning for duplicate function import validation to the _Add an Action Button_ guide
- Added functionality that allows the update of existing annotations in the _Configure multiple views for tables_ guide by selecting an existing qualifier
- Updated code snippets for Overview Page guides based on the installed _specification_ version

### Changed
- Removed unsupported chart types from the ABAP CDS variant of the _Add a micro chart column to a table_ guide
- Changed the minimum SAPUI5 version for the ABAP CDS variant of the _Add a smart chart facet to an object page_ guide to 1.71.2

### Fixed
- Fixed an issue where an extra empty line was added to annotation code snippets
- Fixed an issue where values were not taken over from previous steps in the _Add a micro chart column to table_ and _Add a key performance indicator (KPI) tag to a page_ guides
- Fixed an issue where the `Entity Set` parameter was disabled in the _Add a key performance Indicator tag to a page_ guide
- Fixed an issue where an incorrect inline error message was shown even when the selected entity was correct in the _Add a micro chart column to table_ guide
- Fixed an issue where the chart type was not updated in the code snippet in the _Add an interactive chart_ guide
- Fixed minor UX issues (missing icons and highlighting) in _Configure multiple views for tables_ and _Add a micro chart column to table_ guides

## [1.12.0] - 2023-11-30
### Changed
- Updated guide names to reflect the floorplans the guides can modify.
- Introduced the ability to edit existing field group annotations in the _Add a field group to an object page_ guide by selecting an existing qualifier.
- Updated chart guides to provide a warning if a selected entity does not have measures available.
- Updated the _Add a filter building block_, _Add a chart building block_, and _Add a table building block_ guides to feature validation for the `Building Block ID` parameter so that duplicate code snippets cannot accidentally be inserted into the project's fragment file.

## [1.11.5] - 2023-11-16
### Changed
- Updated guides for creating charts so that the option to add values for `Dynamic Measures` or `Measures` is automatically set based on the type of measures available in the project.
### Fixed
- Resolved an issue where the _Add a micro chart to a table_ guide was not appearing in search results when searching by annotation terms. 

## [1.11.4] - 2023-11-02
### Added
- Introduced a new warning page for projects with virtual file system errors. 
### Changed
- Updated overview page guides to automatically select the `Model` parameter if there is only one option available for the project.
- Updated chart guides to only display `Dynamic Measures` or `Measures` parameter properties that can be used to successfully create charts for a given project.
### Fixed
- Fixed an issue with the code snippet inserted from the _Add a stack card to an overview page_ guide that used an invorrect variable type, causing an error. 
- Fixed an issue where the guided development window would not scroll up to display inline errors.
- Fixed an issue in the _Add a new visual filter_ guide where selected properties were not displayed in the guide code snippet.
- Fixed an issue in the _Add a table card to an overview page_ guide where the `Entity Type` parameter selected in earlier steps was not retained across all guide steps.

## [1.11.3] - 2023-10-19
### Changed
- Updated CAP CDS guide variants to automatically select the `Service` parameter if there is only one service available for the project.
### Fixed
- Fixed an issue in the ABAP CDS variant of the _Add and edit table columns_ guide where the `Entity Type` parameter was missing.

## [1.11.2] - 2023-10-05
### Fixed
- Fixed an issue where the extension would not open if a workspace with multiple projects in it had a package.json file that was not assigned to a project.

## [1.11.0] - 2023-09-12
### Added
- Introduced an indicator for parameters that are pre-filled when a guide is opened from the Page Editor.
### Changed
- Minor UX changes to make the guide details screen render better on smaller screen sizes. 
### Fixed
- Fixed an issue in the TypeScript variant of the `Add a custom action to a page using extensions` guide where the guide displayed a wrong file name.

## [1.10.6] - 2023-08-24
### Added
- Introduced the _Configure default grouping in a table_ guide for OData V2 list report projects.
### Changed
- Updated the _Add a chart building block_ guide to add support for dynamic measure annotations. For custom measures, please continue using the `Measures` property. 

## [1.10.5] - 2023-08-10
### Changed
- Updated the CAP CDS variant of the _Add a new visual filter_ guide to use dynamic measures. For custom measures, please continue using the `Measures` parameter.
- Consolidated steps in the _Configure multiple views_ to shorten the guide. All of the previous parameters remain available. 
### Fixed
- Fixed an issue in the _Configure multiple selection in tables_ guide where the `Page Name` parameter was not automatically filled based on whether the guide is opened in the List Report or Object Page section of the guide list.

## [1.10.4] - 2023-07-27
### Added
- Introduced a CAP CDS variant for the _Set default filter values_ guide.
- Added warning pages for common errors that prevent Guided Development from opening, for example: node modules not being installed, issues parsing manifest and CDS files, no pages present in the project, or application modeler not being installed.
### Fixed
- Fixed an issue with keyboard navigation in guides with multiple code snippets in a single step where it was not possible to use the tab key to navigate to the second, third, or fourth code snippet.

## [1.10.3] - 2023-07-13
### Changed
- Consolidated the three different _Add a custom filter to the filter bar of a list report page/analytical list page/overview page_ guides into a single guide: _Add a custom filter to the filter bar_. Guide parameters will update based on the page type of the project. 
## [1.10.2] - 2023-06-29
### Changed
- Removed the deprecated `Hide Descriptions` setting. Please continue to use its replacement `Show Descriptions`.

## [1.10.1] - 2023-06-15
### Added
- Introduced the _Create a table building block_ guide for custom pages.

### Changed
- Simplified guides that feature multiple code snippets in a single step by adding the file buttons to the code snippet header.

### Fixed
- Fixed an issue in the _Add a progress indicator column to a table_ guide where a parameter updated in step 2 would not be retained after navigating to step 1.

## [1.10.0] - 2023-06-01
### Added
- Introduced a CAP CDS variant for the _Add a value help to a field_ guide.
- Introduced a TypeScript variant for the _Add a custom filter to the filter bar of a list report_ guide.

### Changed
- Updated the UI5 version warning page with a link that opens the _Fiori: Change the minimum UI5 version_ command.

## [1.9.7] - 2023-05-18
### Changed
- Updated All Guides view to feature a warning when a project's UI5 version is too low or too high for a given guide variant.

### Fixed
- Fixed an issue where selecting the CAP CDS version of _Add a custom action to a page using extensions_ from the guide list opens a blank tab.
- Fixed an issue where translations created in Guided Development were not compatible with Page Editor.

## [1.9.6] - 2023-05-04
### Added
- Introduced the _Add a value help to a field_ guide for XML annotations.
- Added a warning message for adaptation projects as they are not currently supported in SAP Fiori tools Guided Development.

## [1.9.5] - 2023-04-20
### Added
- Added a CAP CDS variant to the _Create annotations for Key Performance Indicator (KPI) Tags_ guide. 

### Fixed
- Fixed an issue where the `Group by` dropdown in the guide list was disabled if a project was not present in the workspace in SAP Business Application Studio.


## [1.9.4] - 2023-04-06
### Added
- Added a TypeScript code snippet variant to the OData V4 version of the _Add a custom action to a page using extensions_ guide. 

### Changed
- Updated global warning pages (such as those displayed when a project's SAPUI5 version is too low to use Guided Development) so that a different project can be selected or the guide list can be opened via the All Guides view.
- Updated the _Configure multiple selection in tables_ guide so that the `Toggle Multi Select` (from the OData V2 variant) and `Selection Mode` (from the OData V4 variant) parameters default to the value in the project upon opening. 

## [1.9.3] - 2023-03-23
### Changed
- Updated CAP CDS guide variants to retain parameters from previous guide steps, similar to XML annotation guide variants. 

## [1.9.2] - 2023-03-09
### Added
- Introduced the ability to create i18n keys directly from values entered in guide input fields.

### Fixed
- Fixed an issue in the CAP CDS variant of the _Add a header facet using data points_ guide where the code snippet from the XML annotation variant was displayed after selecting values.

## [1.9.1] - 2023-02-23
### Fixed
- Fixed an issue in the _Add custom columns to the table using extensions_ guide where the code snippet for step 3 was not displayed.
- Corrected code snippet formatting for the ABAP CDS variant of the _Add a new section to a page_ guide.

## [1.9.0] - 2023-02-09
### Added
- Introduced the _Configure mass edit via dialog_ guide for list report pages.
- Added a CAP CDS code snippet variant for the _Configure object page header_ guide.

### Changed
- Enhanced `Card ID` and `Qualifier` validation to provide a warning message when unsupported characters are entered in the input field.
- Updated the _Add a new section to a page_ guide to feature a new `Annotation Type` parameter that will filter the results displayed in the `Annotation Path` parameter.

## [1.8.6] - 2023-01-26
### Added
- Added a warning to indicate if a project's UI5 version is too low to use Guided Development.

### Changed
- Updated the _Add a custom card to an overview page_ guide to consolidate its steps into a single step that can create and update the required fragment, component, controller, and manifest files.

## [1.8.5] - 2023-01-12
### Added
- Added warnings to the All Guides view to indicate if a guide cannot be used with a given project due to insufficient UI5 version, incorrect floorplan, inability to read pages, or the selection of the wrong code snippet variant (CAP or non-CAP projects).
- Added a CAP CDS code snippet variant for the _Add a new section to a page_ guide.

## [1.8.4] - 2022-12-16
### Fixed
- Fixed an issue where project path was incorrectly added to telemetry data.

## [1.8.3] - 2022-12-01

### Added 

- Introduced a project-based experience based on UI5 version so that only guides that are compatible with a project's UI5 version are displayed in the Project Guides view.
- Introduced the ability to add and update columns using `DataField for Annotation` annotations in the _Add and edit table columns_ guide.
- Introduced dynamic mandatory parameter indicators that update based on previous parameter entries.

## [1.8.2] - 2022-11-17

### Added

- Introduced a behavior where the Guided Development window will scroll to the first error message in a guide if the Insert Snippet button is clicked with errors still present.
- Added a CAP CDS code snippet variant for the _Add a header facet using data points_ guide. 

### Fixed

- Fixed an issue where the _Enable a Show Related Apps button_ guide would not appear in the guide list when filtering by Application Artifacts.
- Fixed an issue in the _Enable semantic date range on smart filter bar_ guide where changes made to the `Selected Values` parameter would not be inserted into the page configuration file.

## [1.8.1] - 2022-11-03

### Changed

- Updated the behavior of the Information Links menu in guides so that clicking on a link to the SAP Fiori elements reference documentation will open the documentation for the project's minimum UI5 version.

### Fixed

- Fixed an issue where error messages indicating duplicated parameters would not clear after removing the duplicate.
- Fixed a validation issue in the _Specify refresh interval for cards_ guide where the `Refresh Interval` parameter would allow the input of non-integer values, causing an error after clicking `Insert Snippet`.

## [1.8.0] - 2022-10-20

### Added

- Introduced the ability to add multiple dimensions and measures at once in the _Add a chart building block_ guide.

### Fixed

- Fixed an issue where opening the _Enable draft toggle buttons_ guide without a project in the workspace would open a blank Guided Development window instead.
- Resolved an issue in the _Enable semantic date range on smart filter bar_ guide where the `Exclude` parameter would be disabled when the `Date Range` parameter was set to `True`.

## [1.7.6] - 2022-10-06

### Fixed

- Fixed an issue in the ABAP CDS variant of the _Add a new section to a page_ guide where the `Position` and `Parent ID` parameters were not cleared after clicking the Reset button.
- Fixed an issue in the _Add a table card to an overview page_ guide where characters entered in the `Label` parameter were unexpectedly deleted.

## [1.7.5] - 2022-09-22

### Added

- Added a CAP CDS code snippet variant to the _Add a new visual filter_ guide.

### Fixed

- Fixed an issue in the _Add an analytical card to an overview page_ guide where an extra line of code not featured in the guide code snippet would be inserted into the project's annotation file after clicking `Insert Snippet`.

## [1.7.4] - 2022-09-08

### Added

- Introduced the _Add a filter bar building block_ guide to implement filter bars in custom pages using the SAP Fiori elements Flexible Programming Model (XML Annotation for OData V4 and CDS Annotation variants available).
- Introduced the _Add a chart building block_ guide to implement charts in custom pages using the SAP Fiori elements Flexible Programming Model (XML Annotation for OData V4 and CDS Annotation variants available).
- Added an ABAP CDS code snippet variant to the _Add a new column as a contact view_ guide.

## [1.7.2] - 2022-08-25

### Added

- Introduced the ability to add multiple table columns at once to a table card in the _Add a table card to an overview page_ guide.
- Introduced the ability to add multiple list items at once to a list card in the _Add a list card to an overview page_ guide.

### Changed

- Changed the `Add` button in the _Add a table card to an overview page_ and _Add a list card to an overview page_ guides so that it is possible to select between adding `Data Field` or `Data Field for Annotation` annotations as columns or list items respectively.

## [1.7.1] - 2022-08-10

### Added

- Added an ABAP CDS code snippet variant to the _Add a progress indicator column to a table_ guide.
- Added an ABAP CDS code snippet variant to the _Add status colors and icons for a column_ guide.

### Fixed

- Resolved an issue where opening Guided Development from an annotation file would result in an empty guide list.

## [1.7.0] - 2022-07-27

### Fixed

- Resolved an issue where the _Enable table to auto load data_ guide could not be found via search.
- Updated the preview image for the _Configure object page header_ guide as the corresponding annotations were previously mislabeled.

## [1.6.7] - 2022-07-13

### Added

- Added an ABAP CDS code snippet variant to the _Configure object page header_ guide.

### Changed

- Updated screen reader support across Guided Development to provide navigational information for toolbar dropdowns and guide steps.

### Fixed

- Fixed an issue where attempting to open Guided Development from an annotation file would display a blank window instead.

## [1.6.6] - 2022-06-29

### Added

- Added an ABAP CDS code snippet variant to the _Add a smart chart facet to an object page_ guide.

### Fixed

- Fixed an issue where parameters would not activate in XML guide variants when working on projects using an OData V4 service.
- Resolved an issue where parameters would not activate in the ABAP CDS variant of the _Add a smart micro chart to a table_ guide.
- Fixed an issue where focus was lost when using the keyboard to select a navigation path.

## [1.6.4] - 2022-06-15

### Added

- Introduced the ability to add multiple data fields at once to a new field group in the _Add a field group as a section to a page_ guide.
- Added an ABAP CDS code snippet variant to the _Add a header facet using data points_ guide.

### Changed

- Updated opening behavior so that the initial focus is on the project selector to simplify keyboard navigation in the toolbar
- Updated keyboard navigation in the guide footer when Wizard mode is enabled so that the `Back`, `Next`, and `Exit Guide` buttons can also be accessed with the Up and Down arrow keys once in the footer.
- Updated keyboard navigation in the guide list so that guides can also be opened with the Spacebar.

## [1.6.3] - 2022-06-01

### Added

- Introduced the ability to add labels to columns in the _Add and edit table columns_ guide.
- Added an ABAP CDS code snippet variant to the _Add a new section to a page_ guide.

### Changed

- Updated the filter button in the guide list toolbar to indicate when filters have been applied to a search. The button will turn blue to indicate a filter is active.

## [1.6.1] - 2022-05-18

### Added

- Added a CDS annotation variant to the _Add a field group as a section to a page_ guide.
- Introduced five new chart types for the XML annotation variant of the _Add a smart micro chart to a table_ guide. Column, Harvey, Line, Radial, and Stacked charts are now available.

## [1.6.0] - 2022-05-04

### Added

- Added guide variants featuring ABAP CDS code snippets to the following guides: _Add and edit table columns_, _Add and edit filter fields_, _Add a smart micro chart_, and _Add a field group_.

### Changed

- Updated the _Enable flexible column layout_ guide to feature configuration for the columns. It is now possible to set the default two column layout to either Begin-Expanded or Mid-Expanded and the default three column layout to Mid-Expanded or End-Expanded. The name of the guide has been changed to _Configure flexible column layout_ to reflect this.
- Enhanced the _Enable multiple selection in tables_ guide to allow the setting to be disabled as well. The guide has been renamed to _Configure multiple selection in tables_ to reflect this.
- Enhanced the _Enable selection of all rows in a table_ guide to allow the setting to be disabled as well. The guide has been renamed to _Configure selection of all rows in a table_ to reflect this.

## [1.5.5] - 2022-04-20

### Added

- Added a second `Add` button to guides with collections of parameters (Currently _Add and edit table columns_ and _Add and edit filter fields_) in cases where the table of parameters is larger than five rows to reduce scrolling when adding new elements. This will appear dynamically only after the table exceeds five rows.

## [1.5.4] - 2022-04-06

### Changed

- Renamed the _Add a new filter field to the Filter Bar_ guide to _Add and edit filter fields_ to reflect new capabilities. Multiple filter fields can now be added at once and new and existing filter fields can be rearranged, edited, and deleted.

### Fixed

- Fixed an issue where Guided Development would become unresponsive after clearing the guide search field to search for a second guide.

## [1.5.3] - 2022-03-23

### Changed

- Updated overview page card guides so that the selection of the OData version of the card service happens automatically. As it is no longer required, the `OData Version` parameter in the `Enter the card settings in overview page config file` step has been removed.

### Fixed

- Fixed an issue where `Service` placeholders or selected services were not shown in guide code snippets.

## [1.5.2] - 2022-03-09

### Added

- Added parameter validation to the _Add a custom action to a page using extensions_ guide.
- Introduced a `Qualifier` parameter to step 1 of the _Add an interactive chart_ guide.
- Added validation to `Data Point Qualifier` parameters.

### Changed

- Renamed the _Enable export of table data_ guide to _Configure spreadsheet export_ to reflect that it can now be used to enable and disable table data export to a spreadsheet.

## [1.5.1] - 2022-02-23

### Changed

- Updated the behavior of the _Add an interactive chart_ guide so that the `Initial Expansion Level` parameter receives a default value if one is not provided.
- Renamed Hide Descriptions mode to Show Descriptions mode. Show Descriptions is enabled by default but step and parameter descriptions can be hidden by deselecting the toggle.

## [1.5.0] - 2022-02-09

### Added

- Introduced new validation to the `Data Point Qualifier` parameter in the _Add a smart micro chart to a table_ guide to ensure the required formatting.

### Fixed

- Fixed an issue where the placement of the guide list filter dropdown would change when focus moved in or out of the search bar.
- Resolved an inconsistent behavior where the guide list filter dropdown needed to be double-clicked to be activated.
- Fixed an issue with color themes where, after switching out of High Contrast to another theme, the highlight color from a previously selected theme would be used instead of the highlight color belonging to the newly selected theme.

## [1.4.7] - 2022-01-26

### Added

- Introduced new validation to the `Entity` parameter in the _Add a smart micro chart to a table_ guide to notify users when an entity without properties has been selected.

### Fixed

- Fixed an issue with `Navigation Path` parameters where the field would not be cleared when a new `Entity Type` was selected.
- Resolved a validation issue in the _Add and edit table columns_ guide so that users are once again notified when attempting to add a duplicate column.

## [1.4.6] - 2022-01-12

### Fixed

- Fixed an issue in overview page card guides where attempting to add valid card settings to the code snippet for the overview page configuration file would result in an error.

## [1.4.4] - 2021-12-01

### Added

- Introduced default page type selection so that guides chosen from a guide list filtered by page type will automatically populate `Page Type` dropdowns with the relevant selection.

### Changed

- Changed the name of `Advanced User` mode -- which hides parameter and step descriptions -- to `Hide Descriptions`.
- Updated the minimum width of the guide list toolbar and guide details panel to prevent content from being cut off when the panels are adjusted to extremely narrow widths.
- Updated the behavior of the `Add column` button in the _Add and edit table columns_ guide so that it returns to a deactivated state when guide parameters have been reset.

## [1.4.3] - 2021-11-17

### Fixed

- Fixed an issue in the _Enable Show Related Apps button_ guide where pressing `Insert Snippet` with an object page selected would insert the code snippet into the related list report's configuration file.
- Fixed an issue in `Split Editor` view where a narrow guide list would displace toolbar elements.
- Fixed an issue with keyboard navigation so that the initial focus is consistently on the `Fullscreen view` button when opening another guide.

## [1.4.1] - 2021-11-03

### Added

- Added tooltips to guide parameters with dependencies to indicate which selections are required before a particular parameter is activated.

### Changed

- Updated keyboard navigation so that it is possible to navigate out of a guide's code snippet using the Tab key.

## [1.3.9] - 2021-10-20

### Changed

- Updated parameter selection and code snippet application notifications to use native Visual Studio Code notifications.
- Modified the Chart Type parameter in the _Add a smart micro chart to a table_ guide to display a placeholder after resetting parameters, rather than defaulting to a chart type.

### Fixed

- Fixed an issue where navigation path dropdowns would automatically scroll up after being scrolled down.
- Resolved a visual issue on guide description pages where the annotation terms used were not displayed as a single line.
- Fixed an issue where a duplicate column error would be triggered in the _Add and edit table columns_ guide after trying to add a column that was previously rearranged and then deleted.

## [1.3.7] - 2021-10-06

### Added

- Added the ability to rearrange columns in the _Add and edit table columns_ guide via the keyboard.
- Added a loading indicator to the _Add and edit table columns_ guide to indicate when the code snippet is being updated.
- Added a CDS variant for the _Add a new filter field to the filter bar_ guide.

### Fixed

- Resolved a guide search issue where entered text could not be cleared.
- Fixed an issue with the guide list where selecting a guide would occasionally cause Guided Development to become unresponsive.
- Revised dropdown behavior so that an expanded dropdown does not cover the guide list in side-by-side mode when the guide list is widened.

## [1.3.6] - 2021-10-05

### Fixed

- Fixed an issue where applying custom extension guides (_Add a custom action to a page using extensions_, _Add a custom filter to the filter bar_, _Add a custom card to an overview page_) would result in a "Target not found" error message in apps deployed to an SAP Fiori launchpad. For users on older versions of Guided Development experiencing this issue, please see this knowledge base article: <https://launchpad.support.sap.com/#/notes/3102930>

## [1.3.5] - 2021-09-22

### Added

- Added keyboard navigation to guide steps and wizard mode navigation buttons.

### Changed

- Updated the drag & drop behavior of the _Add and edit table columns_ guide so that users can click anywhere in the relevant parameter collection row to change its position.
- Moved the guide `Exit` button so that it can be clustered with the `Back` and `Next` navigation buttons when wizard mode is enabled.
- Updated the text in CDS variant of the _Add semantic highlights to line items in tables based on their criticality_ guide.

## [1.3.3] - 2021-09-08

### Added

- Introduced the ability to view and edit existing table columns in the _Add and edit table columns_ guide, formerly named _Add a new column to a table_.
- Added keyboard navigation to the Guide List and the Tag Selector List so that users can navigate via the arrow, Enter, Tab, Space, and Esc. keys.
- Added two new guides: _Enable object creation in a table via dialog_ and _Define a filter facet_.

### Changed

- Updated error message behavior in the code snippet header so that error messages disappear once corrected.
- Updated the _Add an action button_ guide so that it supports use with Object Pages.

### Fixed

- Fixed an issue where the `Info` button on a guide's detail page would link to the wrong documentation page.
- Fixed an issue where the Wizard Mode and Advanced Mode toggles did not accurately reflect the guide view.

## [1.3.2] - 2021-08-25

### Added

- Added keyboard navigation to the _Info Help_, _Info Links_, and _Settings_ dropdowns so that users can navigate via the arrow, Enter, and Esc. keys.

## [1.3.1] - 2021-08-11

### Changed

- Updated the behavior of the `Navigation Path` dropdown so that it can open upwards in a small window, allowing users to view its contents without having to scroll.

### Fixed

- Fixed an issue where free text input lagged in the _Add an analytical card to an overview page_, _Add a static link list card to an overview page_, and _Add a table card to an overview page_ guides.

## [1.3.0] - 2021-07-28

### Added

- Added validation to the _Add a new column to a table_ guide so that the `Property` parameter for an existing column cannot be selected. This ensures that users do not try to add columns that already exist in the project.

### Changed

- Updated the _Request a New Guide_ form so that it can be filled out without having to press `Start Guide` when Wizard Mode is enabled.

### Fixed

- Fixed an issue in the _Add a new column to a table_ guide where the `Property` parameter could not be selected via the keyboard.

## [1.2.5] - 2021-07-14

### Changed

- Updated the behavior of Wizard Mode so that navigation to the guide description is possible using the `Back` button.
- Updated the code snippet header so that it displays a warning message when trying to apply a code snippet to a project without an annotation file.

### Fixed

- Fixed an issue where an incorrect part of the code snippet was highlighted when inserting a parameter so that the correct parameter is highlighted.

## [1.2.4] - 2021-06-30

### Changed

- Updated the behavior of the _Project Guides_ view so that only guides relevant to the page type of the selected project are displayed when guided development is opened.

### Fixed

- Revised the search functionality for the guides list so that the search bar is active when guided development is initially opened.

## [1.2.3] - 2021-06-16

### Changed

- Updated the _Add a new column to a table_ guide so that multiple new columns can be added at once. The order of new columns can also be rearranged.

### Fixed

- Fixed an issue where guides not relevant to the current project could be accessed from the _Project Guides_ view so that only relevant guides are displayed
- Resolved an issue where a code snippet from a guide not relevant to the current project could be applied so that only code snippets from project-appropriate guides can be applied
- Resolved an issue where the code snippet from step 2 of the _Add a custom filter to the filter bar_ guide could not be applied when the Reset button was used

## [1.2.1] - 2021-06-02

### Added

- Added new guide: _Extend object page headers using extensions_
- Added support for subsections in the  _Add a custom section to an object page using extensions_ guide

### Fixed

- Fixed an issue where the Help button was hidden when using the _Open Guided Development to the side_ view so that it is now visible regardless of view
- Fixed an issue where a code snippet would not update to reflect a Navigation Path chosen after the Property parameter has been selected
- Resolved a navigation challenge resulting from the behavior of the _Request New Guide_ form when accessed from the Help button so that users can more easily navigate to the guide list

## [1.2.0] - 2021-05-19

### Changed

- Changed the label on the button for applying code snippets from Apply to Insert Snippet
- Updated guide texts to reference the renamed Insert Snippet button, formerly called Apply

### Fixed

- Fixed issue in the output console where an error was incorrectly displayed when successfully navigating and using guides
- Resolved issue where Guided Development would not respond when clicking the link to the Application Modeler in manifest-based guides so that users can now successfully navigate using the link
- Revised the behavior of the Project Guides view so that Guided Development reverts to the All Guides view when all projects have been removed from a workspace

## [1.1.11] - 2021-05-05

### Added

- Added validation support to card guides for overview pages to ensure card IDs are entered properly
- Added new guide: _Enable condensed table layout_

### Changed

- Modified the save procedure when applying code snippets. Now changes made to page config and manifest files will save automatically when snippets are applied to be consistent with other guides.

### Fixed

- Resolved issue in All Guides view so that it is maintained after closing a guide.  

## [1.1.10] - 2021-04-21

### Added

- Added _Enable a Show Related Apps button_ guide for object pages
- Added _Enable draft toggle buttons_ guide for list report pages
- Added _Enable inline creation of table entries_ guide for object pages
- Added _Add a static link list card to an overview page_ guide

### Changed

- Modified guide search functionality to accept only free text input. Tags have been moved to the filter function.
- Modified how guides are displayed when initially opening guided development. Only guides relevant to the selected project's OData version will be shown at first. You can view all guides by selecting All Guides from the View dropdown.

## [1.1.9] - 2021-04-07

### Added

- Added a new guide for List Report Object Page projects: _Add custom columns to the table using extensions_
- Added a new guide for Object Page forms: _Extend forms in sections_

### Changed

- The following guides were updated:
  - _Add a Table Card to an Overview Page_
  - _Add an Analytical Card to an Overview Page_
  - _Add a List Card to an Overview Page_

### Fixed

- When using the _Request New Guide_ form, the form now displays fields of a more appropriate width. Previously the fields were too narrow, making it difficult to review your text.

## [1.1.7] - 2021-03-24

### Added

- A warning message will now be displayed if a selected guide is not currently available for a given OData service version
- Support for selecting multiple values in a dropdown if appropriate
- Support for adding annotations from services other than the mainService
- The following guide has been added for analytical list pages: _Create annotations for Key Performance Indicator (KPI) Tags_

### Fixed

- When a guide available for multiple page types is selected, only the guide relevant to the page type of the current project is highlighted. Previously, the same guide would be highlighted multiple times – once for each applicable page type.

## [1.1.5] - 2021-03-10

### Changed

- The following guides were updated:
  - _Add a New Column as a Contact View_
  - _Add Custom Filter to the Filter Bar_
  - _Add a List Card to an Overview Page_
  - _Add a Table Card to an Overview Page_
  - _Add an Analytical Card to an Overview Page_
  - _Enable Flexible Column Layout_
  - _Enable Table to Auto Load Data_
  - _Enable Selection of All Rows in a Table_
  - _Enable Variant Management_
  - _Configure Side Effects_
  
## [1.1.4] - 2021-02-24

### Changed

- The following guides were updated:
  - _Update Header Facets Using Data Points_
  - _Add a Smart Chart Facet to an Object Page_
  - _Add Custom Section to an Object Page_
  - _Configure Object Page Header_
  - _Reorder Columns in a Table_
  - _Set Selection Limit for Tables_
  - _Set Table Type_
  - _Enable Semantic Date Range on Smart Filter Bar_
  
### Fixed

- _Add a Custom Card_ guide now pre-fills relevant parameters from previous steps. Previously users would have to re-enter parameters throughout the guide.
- _Add a Custom Card_ guide parameters can now be entered and applied after reset.
- Commented-out annotations are no longer applied.

## [1.1.2] - 2021-02-10

### Changed

- The following guides were updated:
  - _Add Analytical Card_
  - _Specify Refresh Interval_
  - _Specify Layout for the Card Container_
  - _Set Selection Limit for Table_
  - _Add Link List Card_
  - _Add Table Column_
  - _Enable Table Multiple Selection_
  - _Enable Select All in a Table_
  
### Fixed

- Enable Variant Management now works properly for CDS projects: previously it could not be enabled for “Pages” and would place the variantManagement property into the tables section of our config file.
- When an error occurred while applying a code snippet (e.g. when trying to apply to a deleted page), the progress indicator spun indefinitely.

## [1.1.0] - 2021-01-27

### Added

- Side-by-side mode is now the default Guided Development view mode. Can be changed from the extension settings

## [1.0.26] - 2021-01-14

### Added

- New visual status indicator of a step being applied when Apply button is clicked
- Parameter grouping for multiple guides

### Changed

- Toast messages will now be shown attached to the Entity Type dropdown for annotation guides

### Fixed

- Incorrect text highlight in comboxes when using light theme
- Extra non-existent guide variant shown for some guides

## [Holiday Version] - 2020-12-02

### Added

- New guide list-details side-by-side view mode to allow faster and more fluid navigation between guide details
- New extension settings to make side-by-side view as default

### Fixed

- Code highlight after pressing apply button does not work for some selected annotation guides
- Apply button is disabled even after filling in the mandatory fields for _Request a guide_ guide
- In CDS guides, CDS file selector only shows one cds file even though multiple cds files are present
- Refresh project list tooltip appears outside the refresh icon

## [1.0.23] - 2020-11-18

### Added

- New help dropdown in the main toolbar to provide convenient direct links to SAP Fiori tools community, Contacting support, etc.
- New guides added:
  - _Enable data label in smart charts and KPI cards_

### Fixed

- Step tiles are not clickable in guide details Full View mode
- In guide details Full View mode, description is shown when step 1 is selected
- In SAP Business Application Studio, an error is shown when _Add a custom card to an overview page_ is applied
- Step description disappears when a file is opened to the side
- Unable to switch guide details view mode (Wizard/Full) or user mode (Advanced/Normal) when a project is changed from project selector dropdown
- Wrong scroll position going from one step to another

## [1.0.22] - 2020-11-03

### Added

- Ability to default parameters in a step from any previous step. E.g. Guide _Add a field group as a section to a page_
- New guides added:
  - _Add an interactive chart_
  - _Configure visual filters_
  - _Add semantic coloring for visual filter_
  - _Add a header facet using data points_

### Fixed

- Clicking on apply for some guides throws an error in a CAP project

## [1.0.20] - 2020-10-21

### Added

- New guide details view mode - Wizard (shows one step at a time) and Full (shows all steps at once)
- Ability to switch between Wizard mode and Full mode either from Extension settings or through any guide details settings icon
- Ability to see a thumbnail and larger view of a feature being added through a guide. E.g. Guide _Add a progress indicator column to a table_
- New Guided Development user mode - Advanced (hides guide step(s) text for more advanced users). It can be toggled on/off from Extension settings or through any guide details settings icon

### Fixed

- Some dropdowns like "Group By", "Page" and "Entity Type" are disabled for V4 projects

## [1.0.17] - 2020-09-23

### Added

- Multiple UX refinements like zebra layout for guide list, repositioning of code snippet action buttons and its associated messages
- Support for enabling following guides for a CAP project:
  - _Add status colors and icons for a column_
  - _Add semantic highlights to line items in tables based on their criticality_
  - _Add a rating indicator column to a table_
  - _Add a progress indicator column to a table_

### Changed

- Parameters are now grouped in the step details for _Add a new section to a page_ guide
- Apply functionality is now enabled for steps in _Add a custom filter to an overview page_ guide

### Fixed

- Property and Navigation Path dropdowns are empty in projects using OData V4 service
- Clicking on Reset button in extension guides does not reset the previous values

## [1.0.16] - 2020-09-09

### Fixed

- Open Guided development, opens another tab, if Guided development was already open
- Selecting a service in _Model_ drop down for an overview page guide, does not update the corresponding entities in _Entity_ drop down

## [1.0.14] - 2020-08-26

### Fixed

- Clicking on Reset in the guide, does not revert the parameters to their original state
- If the annotation file using an I18N key for a string value, clicking on apply results in error
- Drop down selection fields in the guide are missing a scrollbar
- Specifying a parameter value results in highlighting only the first instance of the placeholder in the code snippet

### Added

- Support for clicking on the _Application Modeler view_ in the step description, to set focus to the view in the explorer side bar.

### Changed

- Support for sections for parameter groups in the step details for the following guides:
  - _Add a field group as a section to a page_
  - _Add a progress indicator column to a table_
  - _Add a rating indicator column to a table_

## [1.0.13] - 2020-08-12

### Added

- Support for highlighting code snippet, based on parameter value provided by the user

### Changed

- Support for sections for parameter groups in the step details for _Add a new column to a table_ guide
- Support for apply functionality for the following guides:
  - _Add a new section to a page_
  - _Add a field group as a section to a page_

## [1.0.10] - 2020-07-29

### Fixed

- Annotation path selector does not show the annotation term defined without a qualifier
- Fix rendering issues with the tree control in light theme

## [1.0.7] - 2020-07-15

### Added

- Support adding an indicator next to the mandatory fields required for applying a step
- Support for input validation for the mandatory fields when the user clicks apply for a step

### Fixed

- Clicking on a guide link in SAP Business Application Studio opens a new tab
- Qualifier drop down controls contains a default annotation term value when no entity type is selected
- Qualifier drop down controls contain a default value that is not defined in the service or local annotations file
- Changes in annotation file hierarchy are not reflected in Guided Development after refresh
- Code snippet is not always correctly updated after entity type value is changed
- _Open Guided Development_ should set focus to an already open Guided Development tab
- _Entity Type_ and _Property_ drop down controls, show the last selected value when clicking _Reset_
- Clicking _Refresh Guided Development_ doesn't update the _Model_ dropdown in the Overview page guides

### Changed

- Support for reading the `UI.LineItem` for the selected entity for adding a column in Step 2 for the following guides:
  - _Add a progress indicator column to a table_
  - _Add a rating indicator column to a table_
  - _Add semantic highlights to line items in tables based on their criticality_
- Update the _Additional Information_ links for all guides

## [1.0.6] - 2020-07-01

### Added

- New Guide Added: _Add status colors and icons for a column_
- Support for viewing guides based on application artifacts - manifest change, flex change, XML annotation
- Support for handling service namespace alias when generating code snippet

### Fixed

- Updated category headers for OData version to OData V2 and OData V4

### Changed

- Support for defining `UI.DataPoint` as step 1, and reading the `UI.LineItem` for the selected entity for adding a column with a micro chart in guide _Add a smart micro chart to a table_
- Support for navigating to _Add target entities for side effects_ and _Add target properties for side effects_ guides to complete step 2 in the following guides:
  - _Add source entities for side effects_
  - _Add source properties for side effects_
- Add extension tag to guide _Add a custom filter to an overview page_
- Support for showing input fields as mandatory in the following guide:
  - _Specify refresh interval for cards_
  - _Add a custom section to an object page using extensions_
- Support for reading the `UI.LneItem` from the local or server annotaion definition for the selected entity, based on the annotation hierarchy defined in the project for the guide _Add a new column to a table_

## [1.0.4] - 2020-06-17

### Added

- New Guide Added: _Add a custom action to a page using extensions_
- Support for searching list of values in the guides
- Information icon shows a link to the users guide for SAP Fiori tools

### Fixed

- Update Guided development to incorporate style changes
- Information icon does not display tooltip

### Changed

- Support for a drop down control showing qualifier selection for the relevant property in the following guides
  - _Add a progress indicator column to a table_
  - _Add a rating indicator column to a table_
  - _Add an analytical card to an overview page_
- Update Guide: Support for apply functionality _Add a new column to a table_ guide

## [1.0.0] - 2020-06-16

Release status: GA
We are pleased to announce the official GA of the SAP Fiori tools - Guided Development extension

## [0.0.591] - 2020-06-03

### Fixed

- Code snippet in the guide cannot be applied after clicking on Reset  
- Clicking apply in one of the guides for side effects results in overwriting code

### Changed

- Update Guide: _Add a smart micro chart to a table_
  - fix the code snippet generated for bullet micro chart to remove Dimensions property
  - add annotation terms used in the guide

## [0.0.590] - 2020-05-20

### Added

- Support for showing an indicator for new guides added, since the last release
- New Guide Added: _Add a custom filter to an overview page_
- New Guide Added: _Add source entities for side effects_
- New Guide Added: _Add source properties for side effects_
- New Guide Added: _Add target entities for side effects_
- New Guide Added: _Add target properties for side effects_

### Fixed

- Specifying the property without specifying the navigation target path, is not correctly formatting the parameter value in the code snippet  
- Clicking on Refresh within the project selector drop down changes the order of the projects displayed in the control  

### Changed

- Update Guide: Support for worklist page type for the following guides
  - _Add a smart micro chart to a table_
  - _Add a new column as a contact view_
  - _Add a new column to a table_
  - _Add a progress indicator column to a table_
  - _Add a rating indicator column to a table_
  - _Enable display of multiple page types on a single page_
  - _Enable multiple selection in tables_
  - _Enable table data export_
  - _Enable variant management_
  - _Re-order columns in a table_
  - _Set the table type of tables_

## [0.0.589] - 2020-05-06

### Added

- Support for updating the config files for a project under the Application Modeler tree view in Explorer side bar
- Support for submitting a request for a new guide to the SAP Fiori Tools development team using the _Request Guide Form_
- New Guide Added: _Add a smart micro chart to a table_
- New Guide Added: _Add a new filter field to the Smart Filter Bar_
- New Guide Added: _Set selection limit for tables_
- New Guide Added: _Configure side effects_
- New Guide Added: _Add a custom card to an overview page_

### Fixed

- Performance issue when loading navigation property
- Specifying the navigation property, property, and target value is not correctly formatting the parameter value in the code snippet  

## [0.0.588] - 2020-04-22

### Added

- Support for searching guide metadata ignoring the case of the search term
- Support for viewing the list of annotation terms used within a guide, and getting tooltip help on the annotation term  
- Support for logging error messages in the output log
- Support for selecting model when adding a card for an overview page guide

### Fixed

- Set the keyboard focus in the search field by default

### Changed

- Update Guide: Support for target value selector for _Add a rating indicator column to a table_ guide
- Update Guide: Support for target value selector for _Add a progress indicator column to a table_ guide

## [0.0.585] - 2020-04-09

### Added

- Support for showing the list of entities in alphabetical order
- Support for displaying variants of the same guide as tabs for example content for different versions of the framework
- Support for launching guided development without specifying the project
- Support for switching projects
- Support for searching guide metadata including step title, step description and code snippet
- Support for specifying the page for which the code snippet for the step needs to be applied
- New Guide Added: _Enable variant management_
- New Guide Added: _Add a progress indicator column to a table_
- New Guide Added: _Set the table type of tables_
- New Guide Added: _Specify refresh interval for cards_
- New Guide Added: _Specify layout for the card container_
- New Guide Added: _Add semantic highlights to line items in tables based on their criticality_

### Fixed

- Code highlighting when applying code snippets from a guide switches the order of the inserted lines
- Unable to copy selected text from code snippet on windows
- Style for the filter icon when using VSCode light theme
- Copy button, copies over the markers used for highlighting in the code snippet
- Applying code snippet, should open the file in a column beside guided development

### Changed

- Update Guide: Support for apply button for _Add a rating indicator column to a table_ guide
- Update Guide: Support for apply button for _Enable multiple selection in tables_ guide
- Update Guide: Update description for _Enable table data export_ guide

## [0.0.581] - 2020-03-11

### Added

- New Guide Added: Add semantic highlights to line items in tables based on their criticality
- Support for viewing guides grouped by categories
- Support for filtering guides by pre-defined tags
- Highlight inserted code in text editors upon apply of a guide step
- Use the open source Monaco Editor library for displaying code snippets in guides

### Fixed

- Search when multiple guided development web views are open

## [0.0.578] - 2020-02-27

### Added

- Introduced tooltip when hovering over the information icon of a guide
- Introduced right click context menu on the project in the explorer for launching Help
- CHANGELOG.md documenting changes

## [0.0.577] - 2020-02-19

### Added

- Initial version
