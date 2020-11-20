# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

[1.0.3] - 2020-10-29

Added
- Support for code completion, diagnostic and navigating to definition in paths to annotation. Example:
    ```
    KPI                 : {
    SelectionVariant : ![@UI.SelectionVariant],
    DataPoint        : ![@UI.DataPoint#test],
    }
    ```
- Replacement behavior for editing annotations

Fixed
- Code completion for adding annotation before existing annotation when a comma is missing
- Code completion for path segments: removed actions from the completion lists
- False validation for non-standard annotations `@Aggregation.default`, `@Capabilities.Insertable`, `@Capabilities.Updatable`, `@Capabilities.Deletable` and `@Capabilities.Readable`
- False validation for 'Unknown Namespace ...'
- False validation for 'Term cannot be applied ...'

Changed: 
- Removed qualifier tab stop in embedded annotation snippets, as qualifiers are not allowed there


[1.0.2] - 2020-10-16

Added
- Hiding/showing the i18n-related diagnostic messages based on the user/workspace setting `Mark Missing I18n Default`
- Support for flattened annotation structures
- Support for annotating actions and functions

Fixed
- Annotating annotations, e.g. annotating UI.LineItem with UI.Criticality

[1.0] - 2020-10-08
Release status: GA We are pleased to announce the official GA of the SAP Fiori tools - CDS OData Language Server.

Added
- Basic code completion and diagnostics for annotating entities and elements
- Complex micro snippets for simplified annotation definition
- Vocabulary documentation on hover and in code completion lists
- Internationalization support for language dependent strings: warnings with Quick Fix actions
- Peek Definition support for referenced annotations 
- Go To Definition support for referenced annotations 
