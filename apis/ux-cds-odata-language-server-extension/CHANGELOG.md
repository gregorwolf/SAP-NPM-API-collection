# Change Log
All notable changes to this project are documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/) and the changelog is formatted based on [Keep a Changelog](http://keepachangelog.com/).

[1.0] - 2020-10-08
Release status: GA We are pleased to announce the official GA of the The SAP Fiori tools - CDS OData Language Server extension module.

Added
- Basic code completion and diagnostics for annotating entities and elements
- Complex micro snippets for simplified annotation definition
- Vocabulary documentation on hover and in code completion lists
- Internationalization support for language dependent strings: warnings with Quick Fix actions
- Peek Definition support for referenced annotations 
- Go To Definition support for referenced annotations 

[1.0.1] - 2020-10-16

Added
- Hiding/showing the i18n-related diagnostic messages based on the user/workspace setting `Mark Missing I18n Default`
- Support for flattened annotation structures
- Support for annotating actions and functions

Fixed
- Annotating annotations, e.g. annotating UI.LineItem with UI.Criticality
