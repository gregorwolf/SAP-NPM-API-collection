# ChangeLog for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog but [here](doc/CHANGELOG_BETA.md).
The compiler behaviour concerning `beta` features can change at any time without notice.

## Version 1.39.0 - 2020-08-26

### Added

- If the first CDS source (CDL or CSN) provided to the compiler
  has a `namespace` declaration/property, then
  that namespace name is put into the property `namespace` of the returned CSN.
- An event payload type can now be defined with a type/entity reference or
  or projection (instead of providing the elements directly).
- Aspects can now be included when specifying the elements of an event payload type,
  as it is known for type, entity and aspect definitions.

### Fixed

- Fix a bug in explicit JOIN cardinality CDL parsing
- to.hdbcds/hdi/sql: Identifiers are checked and warnings are raised if the identifier exceeds a length limitation which would result in a deployment error.
- OData: Service, entity and element identifiers are checked and warnings are raised if an identifier is not compliant with the OData specification.

## Version 1.38.0 - 2020-08-25

### Changed

- CSN: The property `payload` of an `event` has been renamed to `elements`.

### Fixed

- to.hdbcds/hdi/sql: Correctly handle local-scope refs in on-conditions when flattening structures.
- Run checks for associations inside of `many` or `array of` only on entities and views.


## Version 1.37.0 - 2020-08-21

### Added

- Projections columns can now use expressions like select items,
  both for `entity … as projection on` and `extend projection … with`.
- OData: `array of <structure>` or `many <structure>` is now allowed in OData V4, flat format.

### Changed

- to.hdbcds/hdi/sql:
  + Messages of id "query-no-undefined" are now raised as errors.
  + Aspects/types/abstract entities containing anonymous aspect compositions
    must not be used as types and are removed during transformation.

### Fixed

- to.cdl: Events are rendered.
- to.cds: Anonymous aspect composition are now rendered correctly.
- to.hdbcds/hdi/sql:
  + Events are ignored.
  + local-scope references in on-conditions are now handled correctly during flattening.
  + Removed duplicate messages.
- A model with multilevel `composition of <aspect>` (spread across several aspect declarations,
  composing one another) is now processed successfully with the OData backend.
- The CSN parser supports explicit join cardinalities.
- Prefix a `@assert.unique` table constraint with the table name to avoid name clashes.


## Version 1.36.0 - 2020-08-07

### Added

- Query select items can now be declared to be virtual.

- CQL now allows to specify a join cardinality. Allowed are any combinations of  
  `{ [ EXACT ] ONE | MANY } TO { [ EXACT ] ONE | MANY }` for  
  `{ INNER | { LEFT | RIGHT | FULL } [ OUTER ] }` joins.  
  The cardinality is added in the for HANA generated `CREATE VIEW` statements.

- Support the creation of unique constraints by assigning `@assert.unique.<constraintName>` to
  non-query entities or query entities annotated with `@cds.persistence.table`. The value of the
  annotation is an array of paths referring to elements in the entity. The path leaf may
  be an element of a scalar, structured or managed association type. Individual foreign keys or
  unmanaged associations can not be accessed. In case the path points to a structured element,
  the unique constraint will contain all columns stemming from the structured type. In case
  the path points to a managed association, the unique constraint will contain all foreign key
  columns stemming from this managed association.
  For HANA a `UNIQUE INVERTED INDEX` and for SQLite a `named unique table constraint` is generated.

### Changed

- OData: Update vocabularies 'Common', 'UI'
- The association to join transformation treats foreign key accesses with priority. If a foreign key
  of a managed association can be accessed without joins, no joins are generated.
  The priority handling can be turned of with option `joinfk`.

### Fixed

- Semantic location in messages is now more precise.

## Version 1.35.0 - 2020-07-31

### Added

- Introduce option `localizedLanguageFallback`; if set to value `"none"`, the localized
  convenience views do not use function `coalesce` to select from a default text as fallback.

### Fixed

- Properly consider targets of compositions in `mixin`s to be autoexposed.
- Uniformly limit propagation of `@cds.autoexposed`, i.e.
  there is not inheritance from a query source navigating along an association.
  Previously, compiling a compiled model could lead to new autoexposed entities.
- OData:
  + V2: Distribute various `@sap` specific annotations to the entity container.
  + Always set attribute `Nullable` on properties of type `Collection()`.

## Version 1.34.0 - 2020-07-27

### Fixed

- Do not dump with illegal references in explicit `on` conditions of redirections;
  properly report them via error messages.

## Version 1.33.0 - 2020-07-24

### Added

- Allow to declare `many/array of` elements, parameters and return types to be `(not) null`.
  The nullability applies to the array items of the element, not the element itself.
- New boolean option `dependentAutoexposed` to avoid name clashes in dependent
  autoexposed entities (text entities, components of managed compositions).
- cdsc: Add toOdata version 'v4x' to combine `{ version: 'v4', odataFormat: 'structured', odataContainment: true }`.

### Changed

- OData:
  + Update vocabularies 'Common', 'Core', 'ODM'.
  + The default nullability for collection value properties is `false`, indicating that the returned collection must
    not contain null value entries.
- toCdl: Identifiers are now quoted with `![` and `]`. Inner `]` characters are escaped with `]]`.
- toCdl/toSql: Function names containing non standard HANA identifier characters are rendered case preserving and quoted
  if an appropriate naming mode has been set in the options.

### Fixed

- forHana: Correctly flatten managed associations as foreign keys used in the definition.
  of another managed association.
- OData: Don't render aspects as `edm.ComplexType`.

## Version 1.32.0 - 2020-07-10

### Added

- Provide semantic code completion for elements, enums, actions and parameters
  in `annotate` and `extend`.
- forHana: Allow the relational comparison of structures or managed associations in an ON condition.  
  Both operands must be structurally compatible, that is both structures must be expandable
  to an identical set of leaf paths. Each leaf path must terminate on a builtin CDS scalar type.
  The original relational term of the form `s1 op s2` is replaced by the resulting expression
  `s1.leafpath_0 op s2.leafpath_0 (AND s1.leafpath_i op s2.leafpath_i)*` with `i < n leaf paths`.

### Changed

- toCdl: String enums without a value are no longer rendered with their name's string representation as their value.

### Fixed

- parseCdl: Fix missing extensions in files that extend unknown services/contexts.
- OData: Do not render an EDM document in case of raised errors
- to.cdl: Aspects are now correctly rendered as aspects and not as types

## Version 1.31.2 - 2020-07-03

### Fixed

- HANA/SQLite: Correctly handle already resolved types when a cds.linked CSN is passed in
- HANA/SQLite: Ensure that all elements in a Draft are non-virtual

## Version 1.31.0 - 2020-06-26

### Added

- forHana/toSql: A (proxy) entity representing a HANA User Defined Function or a HANA Calculation View
  can now be annotated with `@cds.persistence { udf, calcview }` so that queries to these artifacts are
  rendered with the appropriate parameter lists. Parameters for HANA Calculation Views are decorated with
  `PLACEHOLDER."$$<id>$$"`. HANA User Defined Functions without arguments require an empty argument
  list `()` as part of the query source.  
  Entities that are assigned with `@cds.persistence { udf, calcview }` cannot contain associations or act as
  association targets, even if they have no defined parameter list.  
  Multiple assignments of `@cds.persistence { table, udf, calcview }` to the same entity are rejected.
- OData V4: Elements with type `array of <scalar type>` are now supported in flat mode

### Changed

- Option `beta` now only works with selective feature flags. Instead of `beta: true`, a dictionary of `<feature>: true` is expected. Available feature flags are:
  1. subElemRedirections
  2. keyRefError
  3. aspectCompositions
  4. odataProxies
  5. uniqueconstraints
- OData V4: Unmanaged associations/compositions with a target cardinality of exactly one (that is `[1..1]`)
  are rendered as `edmx:NavigationProperty` with attribute `Nullable="false"`
- OData: On-condition checks are now performed when generating OData as well.
- SQLite: The property length for string parameters is not longer restricted to 5000 characters.
- HANA/SQLite: Improved the error message when an entity without elements is found to make it clearer what is expected.

### Fixed

- An error is emitted if parameters in functions/actions have a default value as it is not yet supported.
  For example by using `type of E:element` where `element` has a default value.
- OData V2: Derived scalar types are not rendered as `<edmx:TypeDefinition>`, so no annotation assignments to
  such carriers must be rendered.
- HANA/SQLite: Fixed a bug when flattening structured elements - instead of a human-readable error, an exception was thrown.

## Version 1.30.0 - 2020-06-12

### Added

- Projections can now have `where` and `group by`/`having` clauses.

### Changed

### Fixed

- `doc` comments in CDL now support Windows-style line breaks (CRLF). They are replaced with `\n` in CSN.
- `toCdl` no longer renders a `*` column if no columns are used in the original source.
- Types that have both `type` and `items`/`elements` properties in CSN are now checked to avoid
  mismatches if a unstructured / non-arrayed type is referenced but `items`/`elements` exists.
- OData:
  + Correctly render CRLF and LF to __&#xa;__ in EDMX

## Version 1.29.0 - 2020-06-08

### Added

- Projections can now have `limit` and `order by` clauses.

### Changed

- OData: Update vocabularies 'CodeList', 'Common', 'Graph', 'UI'

### Fixed

- Memory usage improvement - compile messages with id `ref-undefined-excluding` uses much less memory.

- HANA/SQL: Validate ON conditions of mixin association definitions in all subqueries

- OData V2: Assign various `@sap` annotations to the `<edmx:EnitySet>` and `<edmx:AssociationSet>`
  if such annotations are assigned to CDS entities or associations.

- OData V4 Structured: Omit foreign keys of managed associations that establish the containment relationship to
  a container, if this association was declared to be primary key.

- OData: Warn about non-integer enums as they are not supported by OData, yet.

- Warn about string values in integer enums and vice versa.

## Version 1.28.0 - 2020-05-27

### Added

- API: add `getArtifactCdsPersistenceName()` and `getElementCdsPersistenceName()` which return
  the value of annotation `@cds.persistence.name` for the corresponding artifact/element.

### Changed

- Issue error if old backends are used with beta mode.
- Raise severity of message `Unmanaged associations cannot be used as primary key` with id `unmanaged-as-key` to error.

### Fixed

- OData:
  + Render vocabulary `<edmx:Reference>` and `<edmx:Include>` if vocabulary namespace was used.
  + Reduce memory consumption in EDM Renderer.
  + Render annotations for navigation properties if association is annotated with `@cds.api.ignore: true`.

## Version 1.27.0 - 2020-05-15

### Added

### Changed

- Improve warning messages for integer enum missing a value and chained array of.
- HANA/SQL
  + Empty structures are not allowed as foreign keys.
- Report a warning for integer enum elements that do not have values.
- Report a warning for enums that are not integer- or string-like.
- OData
  + Update vocabularies 'Common', 'Core', 'Validation'
  + Pass through structures without elements
  + `cds.Decimal` and `cds.DecimalFloat` (deprecated) without precision/scale are rendered
    as `Edm.Decimal` with `Scale=variable` (V4) and `sap:variable-scale="true"` (V2)

### Fixed

- Memory usage improvement - compile messages do not inherit from Error any more.
- HANA types in annotation assignments work again.
- HANA/SQL: Correctly handle temporal in conjunction with namespaces.
- Fix a bug in Association to Join translation that prevents exposing managed associations via subqueries.

### Removed

## Version 1.26.4 - 2020-05-08

### Added

- Add new OData vocabulary `com.sap.vocabularies.HTML5.v1`

### Changed

- Report a warning when a deprecated non-snapi backend (OData, HANA/SQL) is called.

- OData:
  + Update vocabulary 'UI'
  + Add annotation `@Common.Label: '{i18n>Draft_DraftAdministrativeData}'` to entity `DraftAdministrativeData`
  + Improve info message for target mismatch on associations that are compared with $self

### Fixed

- The CSN `val` property is now allowed in enum element extensions. Such CSN can be
  generated using the `parseCdl` mode and it is now compilable.

- Again allow negative values as enum values, fixing a regression introduced with v1.24.6.

- OData: Correctly handle associations in arrayed elements (keyword `many`).

- Annotation assignment checks now recognize HANA types.

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
