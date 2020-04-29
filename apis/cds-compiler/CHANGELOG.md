# ChangeLog for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog.
The compiler behaviour concerning `beta` features can change at any time without notice.

## Version 1.26.2 - 2020-04-24

### Added

- The client tool `cdsc` has got a new option `--beta <list>` which may be used to
  specify a comma separated list of experimental features to be enabled.
  
- CSN in parse-cdl mode now has a `requires` property that represents `using`s from CDL.

### Fixed

- OData:
  + Change foreign key creation order for associations to respect their dependencies.
  + Use correct path during on-condition flattening.
  + Report error when using elements without types for **array of type of (element)** and similar definitions.

- HANA/SQL:
  + Fix references to `null` enum values in default clauses.
  
- Type arguments are now properly set in CSN when using parse-cdl mode.

- Avoid unjust warning if the `extensions` property of an input CSN contain `extend` statements.

## Version 1.26.0 - 2020-04-17

### Added

- The client tool `cdsc` has got a new command `parseCdl` which returns a CSN
  that is close to the original CDL file. It does not resolve imports and does
  not apply extensions.

- Unmanaged associations as primary keys are now warned about.

- `localized` in combination with `key` is now warned about.

- Enum values are now checked to only be either numbers or a strings - a warning is raised.

- Elements in mixin clauses that are _not_ unmanaged associations now produce an error.

### Changed

- HANA/SQL:
  + Raise warnings `rewrite-not-supported` and `rewrite-undefined-key` to errors.

- Compiler: Empty elements are now kept along for the propagation.

- OData: Annotate all elements of `DraftAdministrativeData` with `@Common.Label: '{i18n>"Draft_<elementName>"}'`
  and elements  'DraftUUID', 'DraftIsCreatedByMe' and 'DraftIsProcessedByMe' with `@UI.Hidden`.

### Fixed

- Compiler: `type of <unmanaged assocation>` is now handled correctly by raising an error.

## Version 1.25.0 - 2020-04-09

### Changed

- Downgrade `chained array of`-error to a warning
- SQLite: Don't render implicit casts

## Version 1.24.6 - 2020-04-08

### Changed

- OData:
  + Improve messages for misaligned forward/backlink associations in EDM generator
  + For V2 add annotations `@sap.creatable: false`, `@sap.updatable: false`, `@sap.deletable: false`,
  `@sap.pageable: false` to the Parameter EntityType and `@sap.creatable: false`, `@sap.updatable: false`,
  `@sap.deletable: false`, `@sap.addressable: false` to the Result EntityType.
  + Update vocabularies 'Common' and 'Graph' and 'ODM'.


### Fixed

- Various messages mention more appropriate source locations.

- Improve messages for `array of`

- OData:
  + Render 'array of' for ReturnType correctly
  + Report error for view fields with no type information early
  + Handle associations in structures with an association as explicit key

### Removed

- The client tool `cdsc` does not offer the option `--std-json-parser` anymore,
  as it had no effect.

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
