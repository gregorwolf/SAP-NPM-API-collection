# ChangeLog for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog.
The compiler behaviour concerning `beta` features can change at any time without notice.

## Version 1.24.4 - 2020-03-25

### Added

### Changed

- `doc` comment propagation can now also be stopped by comments that only contain whitespace
  (including newlines) like `/**  */`.

- OData:
  + Remove redundant service name and `__` prefix out of dynamically exposed substructures.
  + Update vocabularies 'Capabilities' and 'Graph'.

### Fixed

- OData:
  + Process correctly "type of".
  + Process correctly elements with underscore as prefix.

- Preserve parameter list in localized convenience views.

## Version 1.24.3 - 2020-03-16

### Added

### Changed

### Fixed

- Force usage of resolve@1.8.1 instead of semver to avoid issues with file cache

## Version 1.24.2 - 2020-03-13

### Added

- Support function calls like `count( distinct ... )` and `count( all ... )`.

- With option `--doc-comment` comments of the form `/**...*/` are preserved, if these comments
  appear at positions where annotation assignments are allowed. `doc` comments are propagated
  like annotations until an empty comment `/***/` disrupts the propagation.
  
- OData:
  + Add new OData vocabularies `com.sap.vocabularies.Graph.v1` and `com.sap.vocabularies.ODM.v1`
  + With option `--odata-containment`, `parent` association and inferred key elements for
  `composition of <aspect>` as well as inferred keys of `_texts` entities are not rendered.
  + OData V4: Produce primary key paths with length limited alias names.

### Changed

### Fixed

- When not disabled by `@cds.autoexpose:false`, an entity used as composition target
  is auto-exposed in the current service;
  this did not work always if the target was a _query_ entity.

- Foreign key creation in odata flat-mode when following associations.

- Rename `@description` to `@Core.Description` in all cases as part of the OData transformation of a CSN.

- When generating extensions from EDMX annotations, handle correctly targets from an EntityContainer.

- Apply service annotations in EDMX generation.


### Removed

- Warning 'Service should not have more then one draft root artifact'

- Experimental annotation '@cds.odata.{v2|v4}.ignore`

- OData vocabulary `com.sap.vocabularies.odm.v1` (lowercase 'odm')

- `--beta-mode` from option `--odata-containment`.

## Version 1.24.1 - 2020-03-06

### Added

- Add new OData vocabulary `com.sap.vocabularies.odm.v1`

### Changed

- Expressions in mixin-definitions are now validated.
- OData:
  + Redirect inbound associations to entities with parameters to corresponding Parameter EntityType.
  + Update vocabulary `UI`
- Use semver for dependencies

### Fixed

- Resolve backlink mixin association usages uniformly in association to join translation.


## Version 1.24.0 - 2020-02-28

### Added

- If an entity `E` with localized elements has the annotation `@fiori.draft.enabled`,
  a new element `ID_texts` of type `cds.UUID` is added to `E_texts` as the _only key_ and
  the annotation `@odata.draft.enabled` will not be set to false for `E.texts`.
- A comment of the form `/**…*/` at "annotation positions" is now considered a doc comment;
  its "cleaned-up" text is put into the CSN as value of the property `doc`.
  In the OData/EDMX, it appears as value for the annotation `@Core.Description`.

### Fixed

- HANA CDS: When casting a column to an enum type, don't render it as an enum
- Ignore top-level CSN "annotations" like `@sql_mapping` in the CSN frontend.
- OData: Key constraint checks for Draft enabled entities consider EDM exposed keys only.
- Message level for draft key checks is raised to 'warning' again.
- Action and function calls are checked for missing arguments.
- All references are correctly transformed in flatten mode.


## Older Versions

The change log for older entries can be found at
[`doc/CHANGELOG_ARCHIVE.md`](doc/CHANGELOG_ARCHIVE.md).
