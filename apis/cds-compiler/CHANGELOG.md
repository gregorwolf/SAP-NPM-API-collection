# ChangeLog for cds compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog but [here](doc/CHANGELOG_BETA.md).
The compiler behaviour concerning `beta` features can change at any time without notice.

## Version 2.2.8 - 2021-05-20

### Fixed

- Fix regression: also for associations _defined_ in a service, try to
  implicitly redirect the provided model target.

## Version 2.2.6 - 2021-05-12

### Fixed

- to.edmx(x):
  + The reverted change "`array of` elements are now allowed for OData V2, too." introduced with v2.2.0 has caused
    regressions in various scenarios that used OData V4 processed CSN for OData V2 EDMX rendering. Therefore
    the error has been lowered to a 'odata-spec-violation-array-of' warning.
  + The fix 'Render constraints only if all principal keys are used in association' introduced with v2.2.2 has
    caused regressions in mocking scenarios. With option `--odata-v2-partial-constr` partial constraint generation
    can be reactivated. A 'odata-spec-violation-constraints' warning is raised.

## Version 2.2.4 - 2021-05-06

No changes compared to Version 2.2.2; fixes latest NPM tag

## Version 2.2.2 - 2021-05-04

### Fixed

- Usually reserved names like `in` in references used as annotation values can now really
  be provided without delimited identifiers (if the name is not `true`, `false` or `null`).
- Fixed the implicit redirection of associations to scoped targets (like texts entities).
- Fix regression: Allow virtual structured elements.
- to.edm(x):
  + OData V2:
    + Remove warning about scalar return types.
    + Render constraints only if all principal keys are used in association.
  + OData V4: Don't remove `@Capabilities` annotations from containee.
  + Allow `@Core.MediaType` on all types and raise a warning for those (scalar) types that can't be mapped to `Edm.String` or `Edm.Binary`.
- to.cdl: Also handle subelement-annotations by rendering a `annotate X with Y`.
- to.hdi/sql/hdbcds: Fixed the DB name (with naming mode `quoted`/`hdbcds`) and the `to.hdi` file name of scoped definitions (like `texts` entities)  in services.
- Empty enums no longer result in a syntax error.

## Version 2.2.0 - 2021-04-28

### Added

- The compiler now takes the “definition scope” of associations and compositions into account
  when implicitly redirecting the target and auto-exposing entities.
- odata: The warning `enum-value-ref` is no longer reclassified to an error.
  However, references to other enum values are still not supported.

### Changed

- Remove special handling for implicit redirection to auto-exposed entity; consistently
  do not overwrite user-specified target in a service anymore, also in this special case.
- Structured/Arrayed types for enums are now an error and not just a warning.
- to.cdl: Keywords in annotation paths are no longer escaped

### Removed

- Consistently reject references to auto-exposed entities except for `annotate`
  (it might have worked before, depending on the sequence of definitions);
  expose an entity manually if you want to refer to it.

### Fixed

- Do not omit indirectly annotated or redirected sub elements
  during propagation of expanded sub elements.
- Also auto-expose composition targets of projected compositions,
  not just those target which were used at the original definition of the composition.
- Improve checks for keys which are `array of` or of SAP HANA spatial type (`ST_POINT` & `ST_GEOMETRY`)
  with checking also inside of used user-defined structured type.
- to.edm(x):
  + V2: `OnDelete=Cascade` was set on dependent instead on principal role.
  + V4: ReferentialConstraints Property and ReferencedProperty for managed composition to one were swapped.

### 2.2.6 Addendum to Changed

- to.edm(x): Revert 2.1.0 change: "`array of` elements are now allowed for OData V2, too."
  OData V2 does not allow elements to be typed with `Collection()`. Any `many`
  predicate in element definitions is rejected. The only two positions where the `many` predicate
  is allowed are `association to many` and `returns many`.

## Version 2.1.6 - 2021-04-14

### Fixed

- Do not unjustified complain about `$self` comparisons.
- Auto-exposed entities are represented as projections in the CSN.
- to.sql/to.hdi:
  + Revert change "Default values are no longer propagated from the principal to the generated foreign key element." from version 2.1.0
  + Fix regression where localized convenience views for temporal entities used keys in the from clause that did not exist on the texts-entity
  + Mixin associations are properly removed and are not rendered into views anymore
- to.hdi(.migration): Ensure filenames for `.hdbindex` files stay compatible to V1
- for.odata: An association as a type of action's parameter or return type now signals an error
- to.edm(x):
  + `@Capabilities` annotations remain on the containees entity type
  + In containment mode don't render foreign keys of the containment constituting 'up' association in the containee
    as primary key refs.
  + Revert change "Default values are no longer propagated from the principal to the generated foreign key element." from version 2.1.0
  + Allow `--odata-proxies` and/or `--odata-x-service-refs` in combination with `--odata-format=flat` and `--version=v4`

## Version 2.1.4 - 2021-03-31

### Fixed

- The postinstall step now never fails with an exit code != 0. As the postinstall step is optional, it should not break any `npm install` steps.

## Version 2.1.2 - 2021-03-29

### Fixed

- ensure `postinstall` script is part of the shipped `package.json`

## Version 2.1.0 - 2021-03-26

### Added

- Inferred sub elements of a referred structure type can be individually annotated.
- All primitive types except for binary are now allowed as enum value types.
- Allow users to define `A.B` even if there is a definition `A` which is not a context or service.
- You can now provide almost all annotation assignments without delimited identifiers:
  the use of `.`, `@` and `#` is fine for annotation names,
  property names of structures, and in references used as annotation values.
- for.odata:
  + All the artifacts that have localized fields get a `$localized: true` property.
  + Allow the user to define draft actions for annotation purposes
    + `draftPrepare(SideEffectsQualifier: String) returns <ET>`,
    + `draftActivate() returns <ET>`,
    + `draftEdit(PreserveChanges: Boolean) returns <ET>`
- to.edm(x):
  + Warn about non-applicable annotations.
  + Render property default values (only OData V4).
  + Option `odataProxies` exposes association targets outside of the current service.
    These `EntityType`s do only expose their primary keys have no accompanying `EntitySet`.
    The added navigation targets are exposed under their namespace or if not available under namespace `root`.
    `odataProxies` is only available with `--format=structured`.
  + Option `odataXServiceRefs` renders an `edm:Reference` to the service for those navigation targets
    that are defined in another service. `odataXServiceRefs` is only available with `--format=structured`.
  + Duplicate EntityContainer entries with same name will raise an error.
  + `array of` elements are now allowed for OData V2, too.
- to.sql/hdi/hdbcds: Explicitly render the implicit alias for functions without arguments, e.g. `current_date`.
- to.sql:
  + Sort the SQL statements according to the deployment order.
  + New sql dialect `plain`, which now is the default.
synchronously.
- API:
  + `compileSync()` is now compatible to `compile()`:
    the function can also receive a file cache and will resolve all `using`s
  + New API functions `parse.cql` (prefer it to deprecated `parseToCqn`) and
    `parse.expr` (prefer it to deprecated `parseToExpr`)
  + function `getArtifactCdsPersistenceName` now accepts a CSN as a third parameter (used to be a namespace). With a CSN provided,
    the name can be correctly constructed for naming modes `quoted` and `hdbcds`. Without a CSN, the name is possibly wrong
    if it contains dots. If the CSN is not provided or the third parameter is not a CSN, the old, deprecated, implementation is used.
- `cdsc` and other client tools:
  + Added `--with-localized` to the command `toCsn` which adds convenience views for localized entities to the output.
  + A script `bin/cds_update_identifiers.js` was added. You can use it to update the delimited identifier style in your CDS sources.
  + A script `bin/cdscv2m.js` was added.
    It's command `ria` adds `@cds.redirection.target: false` annotate statements
    for all ambiguous redirection errors.
- Added `deprecated` options; setting any of them disables all `beta` options.

### Changed

- CSN representation:
  + CSN Version is set to `2.0`
  + CSN `definitions` are not sorted anymore
  + `$syntax` is non-enumerable
  + increase the use of JS numbers in the CSN for numbers in CDL, especially noticable in annotation values
  + Annotation definitions are to be found in the top-level property `vocabularies`.
  + Introduce `kind: 'aspect'` to replace `kind: 'type', $syntax: 'aspect'` and
    `kind: 'entity', abstract: true` (the deprecated variants are still accepted as input).
  + Projections are rendered via `projection` instead of `query.SELECT`.
  + Parentheses are represented structurally and unnecessary parentheses are omitted.
  + Use `.` instead of `_` for the name suffix of generated texts entities and the calculated entity for managed compositions.
  + The CSN returned by `compile()` does not include localized convenience views anymore.
- Core engine (function `compile`):
  + An assignment `@Foo.Bar` is always `@Foo.Bar`, we do not try to search anymore
    for a local definition of `Foo` probably having a different full name.
  + Localized convenience views are no longer generated by the core compiler but added by the `for.odata`
    and `to.sql/hdi/hdbcds` processing on demand.
  + Minimize name clashes when calculating names for autoexposed entities,
    extends the v1 option `dependentAutoexposed` to sub artifacts of entites (see “Added”).
  + Ambiguities when redirecting associations now always lead to compile errors;
    you might want to use the new annotation `@cds.redirection.target` to solve them.
  + The association `up_` in the calculated entity for managed compositions is now managed.  
    _Limitation_: Nested managed compositions are not activatable via `to.hdbcds --names=hdbcds`.
  + Bound actions and functions are no longer propagated from the main query source to the resulting view or projection.
  + Remove annotation `@cds.autoexpose` from generated `.texts` entity
  + Require `order by` references to start with a table alias when referring to source elements.
  + Infer the type of a `select` item from the type of a top-level `cast`.
- Localized convenience views now also contain `masked` elements of the original artifact.
- for.odata:
  + Even with `--format: structured`, (flat) foreign keys for managed associations are generated.
  + An `entity` or an `aspect` defined outside the current service cannot be used as action parameter or return types.
  + Structured elements are expanded in-place.
  + Foreign keys for managed associations are created in-place.
- to.edm(x):
  + An `Edm.TypeDefinition` is rendered for a derived scalar type and used as type reference instead of
    rendering the final scalar type, including the `array of`/`many` predicates.
  + `enum` type definition as service member is rendered as `edm:TypeDefinition` instead of `edm:EnumType`.
  + Set default source cardinality of compositions to exact one. This is observable in V2 EDM only.
  + Key must not be `nullable=true`, this includes all sub elements of used structured types.
  + Default values are no longer propagated from the principal to the generated foreign key element.
  + `array of array` is rejected, nested Collections `Collection(Collection(...))` are illegal.
  + Temporal rendering:
    + `@cds.valid.from` is not `Edm.KeyRef` anymore.
    + `@cds.valid.key` is rendered as `@Core.AlternateKeys`.
  + Downgrade message "`<Term>` is not applied" from warning to info.
  + Update Vocabularies 'Aggregation', 'Capabilities', 'Core', 'Validation'.
- to.sql/to.hdi/to.hdbcds:
  + Reject using associations or compositions in query elements starting with `$self` or `$projection`.
  + Virtual elements are not rendered.
  + Structured elements are expanded in-place.
  + Foreign keys for managed associations are created in-place.
  + Implicit/CDL-style casts are not rendered as SQL CASTs.
  + All association usages in queries are always translated into JOIN expressions
    (except for to.hdbcds `--names=hdbcds`).
- to.sql/to.hdi:
  + Downgrade message `to-many-no-on` from error to warning.
  + Default values are no longer propagated from the principal to the generated foreign key element.
- to.sql:
  + Changed type mappings for `--dialect=sqlite`:
    + `cds.Date` -> `DATE_TEXT`
    + `cds.Time` -> `TIME_TEXT`
    + `cds.Timestamp` -> `TIMESTAMP_TEXT`
    + `cds.DateTime` -> `TIMESTAMP_TEXT`
    + `cds.Binary` -> `BINARY_BLOB`
    + `cds.hana.Binary` -> `BINARY_BLOB`
  + Don't check missing type facets.
- to.hdbcds:
  + References to derived, primitive types are replaced by their final type.
    The derived type definitions are not rendered anymore for hdbcds naming mode.
  + Don't check missing type facets in views.
- to.cdl:
  + Render maximum cardinality as 'to one' or 'to many'.
  + Return at most two files. The first one (named `model.cds`) contains all definitions, simply rendered in order,
    without namespaces or usings. Contexts and services are NOT nested. The second file (named `<namespace>.cds`)
    represents the CSN `namespace` property, simply defining such a namespace and requiring the first file.
- API changes:
  + The API functions `compile()` and `compileSync()` return a CSN and not an XSN,
    `compactModel()` returns the first argument.
  + If `options` does not provide a `messages` property, all messages are printed to standard error.
  + The `options.messages` is kept throughout the compiler and contains all messages from the compiler and all backends.
  + Messages are not sorted anymore; use the API function `sortMessages` to have it sorted.

### Removed

- Core engine (function `compile`):
  + Referential integrity issues now always lead to compile errors.
  + The `type of` operator (without `:` in the reference) cannot be used
    for parameters and inside queries anymore.
  + Using `"…"` for delimited identifiers leads to a compile error.
  + Issue an error for “smart artifact references”, i.e.
    when using `Definition.elem` instead of `Definition:elem`
  + The definition of annotations is no longer allowed in `context`s and `service`s.
  + Providing an alias name without `as` leads to a compile error or warning.
  + Providing unexpected kind of definitions for `type` or other references leads to a compile error.
  + The ancient CSN 0.1.0 format generation has been removed.
  + The compiler does no longer look for modules whose file extension is `.csn.json`,
    both `.csn` and `.json` is still checked.
- for.odata:
  + With `--format: structured`, the property `$generatedFieldName` in keys of
    managed associations has been removed.
  + Artificially exposed types that are required to make a service self contained are
    removed from the OData processed CSN.
  + Localized convenience views are no longer part of the OData CSN.
- API changes:
  + The deprecated XSN based transformers `forHana`, `forOdata`, `toSwagger`, `toSql`, `toCsn`, `toCdl`
    have now been removed from the code base.
  + Remove `collectSources()` as well as `options.collectSources`.
  + A `CompilationError` usually does not have the property `model` anymore,
    to avoid potential memory issues.
  + CSN compiler messages no longer have a `location` property. Use `$location` instead.
- The following `cdsc` options have been removed:
  + `--old-transformers`.
  + `--hana-flavor` with all corresponding rudimentarily implemented language constructs.
  + `--new-resolve` (the new resolver is now the default).

### Fixed

- Core engine (function `compile`):
  + Managed composition in sub elements are now properly redirected,
    even if the sub structure comes from a referred type.
  + Do not dump with sub queries in the `on` condition of `join`s.
  + Properly report that managed aspect composition inside types and as sub elements
    are not supported yet.
  + Make sure that including elements with managed aspect compositions only
    use the provided target aspect, but not the generated target entity.
  + Properly handle the extra keywords in the third argument of the HANA SQL function `round`.
- to.edm(x):
  + Return all warnings to the user.
  + Don't render references and annotations for unexposed associations.
  + Rendering of `@Validation.AllowedValue` for elements of type enum annotated with `@assert.range`:
    + Add `@Core.Description`, if the enum symbol has a `@Core.Description`, `@description` or document comments.
  + Primary key aliases are now the path basenames, colliding aliases are numbered.
  + Fix a bug in constraint calculation if principal has no primary keys.
  + Illegal OData identifiers which are not exposed in the generated edmx schema are not causing errors anymore.
  + Improve non-enum value handling on term definitions based on an enum type by raising a warning and rendering
    the value with appropriate scalar EDM type.
  + Render annotion qualifier in JSON format.
- to.sql/hdi/hdbcds:
  + Reject structured view parameters for HANA.
  + Types are not rendered anymore for HANA in quoted mode.
  + Structured elements in subqueries are now properly expanded.
  + Actions, functions, annotations and events do not have DB specific checks run on them, as
    they will not be part of the resulting artifacts anyways
  + With `--names=quoted` or `hdbcds`, some `.` in artifact names are turned into `_`.
    In general, this happens when part of the name prefix is "shadowed" by a non-context/service;
    any `.` after that point is turned into `_`. This change also affects the filenames and the
    `@cds.persistence.name` annotation in the CSN returned by `to.hdi.migration` and `for.odata`.
- to.sql/hdi:
  + Fixed a bug which led to an exception if elements were referenced as types.
  + For the SQLite dialect, date, time and timestamp are rendered as simple string literals instead of function calls.
  + For naming mode "plain", date, time and timestamps are rendered as SQL-compliant literals.
- to.sql/hdbcds: Fix issue which led to wrong ON conditions for naming mode `hdbcds`.
- to.sql:
  + SRID of SAP HANA spatial type (`ST_POINT` & `ST_GEOMETRY`) is not rendered as the length of `CHAR`
    for SQL-dialects other than `hana`. The resulting `CHAR` has a default length of 2000.
- to.hdbcds:
  + Nullability constraints on view parameters are not rendered anymore.
  + CDS and HANA CDS types inside cast expressions are mapped to their SQL-counterparts, as the CDS types can't be used in a cast.
- to.cdl: Correctly render `event` typed as `projection`.
- to.hdi.migration: Don't generate `ALTER` for type change from association to composition or vice versa (if the rest stays the same),
  as the resulting SQL is  identical.

## Version 1.50.4 - 2021-04-06

### Fixed

- to.hdbcds: CDS and HANA CDS types inside cast expressions are mapped to their SQL-counterparts, as the CDS types can't be used in a cast.

## Version 1.50.2 - 2021-03-19

### Fixed

- Correct calculation of dependent autoexposed entity name
  (fixing a potential regression with v1.50.0)
- to.hdi.migration: Correctly handle "temporal" and other cases when rendering expressions
- to.edm(x):
  + Improve non-enum value handling on Oasis enum term definitions by raising a warning and rendering
    the value with appropriate scalar EDM type.
  + Render annotion qualifier in JSON format.
- Update OData vocabularies
  'Aggregation', 'Analytics', 'Capabilities', 'CodeList', 'Common', 'Communication',
  'Core', 'Graph', 'HTML5', 'ODM', 'PersonalData', 'Session', 'UI'

## Version 1.50.0 - 2021-02-25

### Added

- Introduce annotation `@cds.redirection.target`.
  With value `false`, the projection is not considered an implicit redirection target;
  with value `true`, is is considered a “preferred” redirection target.

## Version 1.49.2 - 2021-02-16

### Fixed

- to.edm(x): Illegal OData identifiers which are not exposed in the generated edmx schema are not causing errors anymore.
- to.cdl: Annotations are now rendered with the new delimited Identifier syntax
- to.sql/hdi:
  + Fixed a bug which led to an exception if elements were referenced as types.
  + For the SQLite dialect, date, time and timestamp are rendered as simple string literals instead of function calls.
  + For naming mode "plain", date, time and timestamps are rendered as SQL-compliant literals.

## Version 1.49.0 - 2021-01-29

### Added

- to.hdi/sql:
  + Updated the list of reserved keywords for HANA and SQLite
  + Use "smart quoting" for naming mode "plain" - automatically quote reserved keywords
- to.hdi.migration:
  + Supports various kinds of entity changes: entity addition/deletion/change (the latter including element additions/deletions/type changes).
  + Provides option to render any element type change as `ALTER TABLE DROP` to prevent deployment issues due to incompatible data
    (default for length reductions or association/composition changes).
- to.cdl: Smart artifact references are now rendered explicitly via `:` notation

### Changed

- OData/EDMX:
  Change the `EntityType` precedence of the OData term definition `AppliesTo=` attribute. If `AppliesTo` contains
  both `EntityType` and `EntitySet`, the annotation was assigned to the entity type. Extending an
  `AppliesTo=[EntitySet]` with `EntityType` would be OData compliant but incompatible for clients
  which still expect the annotation at the set and do not perform the full lookup.
  With this change, `EntitySet` and `EntityType` are treated individually, effectively annotating the type and
  (if available) the set. This fixes both extendability and client behavior.

### Fixed

- Structured foreign key and forward association reference paths used in ON condition definitions
  are now translatable into the correct short form ON condition paths in Association to Join translation.
- to.hdbcds: Aliased mixin-associations are now handled correctly

## Version 1.48.0 - 2021-01-15

### Changed

- to.hdbcds/hdi/sql: Reject using associations or compositions in query elements starting with `$self` or `$projection`.
- OData: Update vocabularies 'Common', 'PersonalData', 'UI'.

### Fixed

- Using a hex literal like `x'D028'` (in a CSN input) could lead to an error.
- for.odata:
  + Fix a bug in constraint calculation if principal has no primary keys.
  + Don't overwrite user defined `@Core.Computed` annotation.
- to.hdi/sql/hdbcds: Fixed a bug during processing of skipped/otherwise not db-relevant artifacts.

## Version 1.47.0 - 2020-12-11

### Changed

- Update vocabularies 'Aggregation', 'Common'

### Fixed

- to.hdbcds/hdi/sql:
  + Types are not rendered anymore for SAP HANA in quoted mode.
  + Aliases are now respected when resolving $self
  + Association clones are now pre-pended with three underscores (`_`) instead of two
    to prevent shadowing of context names or usings

## Version 1.46.6 - 2020-12-01

### Fixed

- OData identifiers can now include all unicode characters which are described in the OData specification.

## Version 1.46.4 - 2020-11-28

### Fixed

- Association to Join translation: Fix using forward association target as table alias in ON condition.

## Version 1.46.2 - 2020-11-20

### Fixed

- to.edm(x) Fix a bug in the alias calculation for key references in structured OData.

## Version 1.46.0 - 2020-11-20

### Changed

- to.edm(x):
  + V4 structured key ref path aliases are now the basenames, colliding aliases are numbered.
  + Lower level to `info` for "‹Term› is not applied" message if an annotation cannot be applied.
- OData:
  + Update vocabulary 'UI'
  + Correctly handle `not null` during flattening. Only if the parent and all subelements in the chain
  are `not null`, make the corresponding flat leaf element `not null`.

### Fixed

- Do not consider events to be potential targets for implicit redirections:
  strange warnings for multiple projections or other strange errors disappear.
- to.hdbcds/hdi/sql:
  + Reject structured view parameters for HANA.
  + Correctly handle `not null` during flattening.
  Only if the parent and all subelements in the chain are `not null`, make the corresponding flat leaf element `not null`.
- to.edm(x): Render @assert.range enum annotations correctly (enum symbol as value and don't omit zero value).
- Fixed CDS module resolution with option `newResolve` on Windows where a superfluous `\` was prepended to absolute paths.

## Version 1.45.0 - 2020-10-30

### Added

- OData: Warn about non-applicable annotations.

### Changed

- A warning is emitted for annotation definitions inside services/contexts as this won't be
  allowed in the next major cds-compiler release.
- OData: Update vocabularies 'Analytics' and 'Common'.

### Fixed

- Association to Join translation: Fill empty select blocks with aliased columns.
- to.edm(x):
  + Some EDM(x) warnings were not properly passed to the user.
  + Don't render references and annotations for unexposed associations.
- to.hdbcds: Warnings during rendering of the hdbcds were not raised to the user.
- Issue which led to wrong on-conditions for `hdbcds` naming mode.

## Version 1.44.4 - 2020-10-16

### Fixed

- to.hdbcds/hdi/sql: The processing of managed associations as foreign keys now works regardless of the order in which the possible chains are resolved.
- OData: Namespaces are brought back into the exposed types. Dots are replaced with underscores in the name.

## Version 1.44.2 - 2020-10-09

### Added

- OData: The annotations `@assert.format` and `@assert.range` now result in adding the
  `@Validation.Pattern` and `@Validation.AllowedValues` in the resulting EDMX.
- A new compiler option `newResolve` is added (`--new-resolve` for `cdsc`).  When set to `true` a new
  module resolver is used which needs fewer file lookups. It will become the default in the future.
- Event definitions can be typed with a reference to an event.
- When the new option `withLocation` is set,
  the property `$location` in the CSN is enumerable instead of non-enumerable;
  the value of `$location` is an object with sub properties `file`, `line` and `col`
  which describes the source position of all definitions, elements and other members.

### Changed

- OData:
  + The `namespace` is now not part of the exposed type's name.
  + Update vocabularies 'Aggregation', 'UI' and 'Validation'.

## Version 1.43.0 - 2020-10-02

### Added

- The magic variable `$session` is now supported. All element accesses are unchecked.
- Reference paths as annotation values can now contain identifiers starting with `@`.

### Changed

- OData:
  + Raise message level for illegal OData identifiers from warning to error.
  + Update vocabularies 'Aggregation' and 'Common'.
  
### Fixed

- to.hdi/hdbcds/sql: Correctly process the elements of subqueries in localized view variants

### Removed

### Fixed

- OData: put default value validation under `beta:odataDefaultValues`

## Version 1.42.2 - 2020-09-29

### Fixed

- CDL: Action blocks can now be empty, e.g. `entity E {…} actions { }`.
- An info message is emitted if builtin types are annotated.  Use a custom type instead.
  Annotating builtins in CDL is possible but when transformed into CSN the annotation was silently lost.
  It is now put into the "extensions" property of the CSN.
- Fixed `cast()` for simple values like numbers and strings.

- to.sql:
  + Remove simple default value checks and allow the database to reject default values upon activation.
  + Render empty actual parameter list when selecting from a view with parameters which are fully covered with
  default values and no actual parameters are provided in the query itself.

- OData:  
  + Correctly render unary operator of default values in EDM.

## Version 1.42.0 - 2020-09-25

### Added

- The compiler now supports the `cast(element as Type)` function in queries.
  Using this function will also result in a `CAST` SQL function call.
- A top-level property `i18n` is now supported. The property can contain translated texts.
  The compiler expects its entries to be objects where each text value is a string.
- CDL: Empty selection lists in views/projections are now allowed and make it possible to extend
  empty projections. Note that views/projections without any elements are not deployable.
- For CSNs as input, the compiler returns properties as they are (without checks)
  if their name does not match the regexp `/[_$]?[a-zA-Z]+[0-9]*/` and does not start with `@`.
  With more than one CSN input,
  the compiler only returns the top-level CSN properties of the first source.

### Changed

- to.cdl: Smart type references are now explicitly rendered via ":"-syntax

### Removed

### Fixed

- Annotating an _unknown_ element _twice_ now results in a duplicate annotation error instead
  of silently loosing the annotation.
- Service/context extensions that reference a non-service/non-context now result in a compiler error
  instead of silently loosing the context/service extension.
- to.hdbcds/sql/hdi:
  + fix a bug, which resulted in a malformed on-condition, if an association key
  was another association pointing to an entitiy with a structured key.
  + in conjunction with assoc-to-joins, the internal CSN reference broke
  causing missing locations and even internal errors when logging messages
  + managed associations in UNION are now correctly processed
- The parseCdl mode now correctly resolves type arguments of "many" types.
- OData: The annotation `@Capabilities.Readable` is now correctly
  translated to `@Capabilities.ReadRestrictions.Readable`.

## Version 1.41.4 - 2020-09-18

### Removed

- The length of HANA identifiers are not checked anymore: no more warnings are issued for long identifiers.

### Fixed

- The check for ignored "localized" keywords in sub-elements has been extended to also
  include references to structured types.  
- A warning was added if views/projections are used as element types.
- An info message is emitted if a namespace is annotated.  
  Annotating namespaces is not possible. Previously the annotation was silently lost.
  It is now put into the "extensions" property of the CSN.

## Version 1.41.2 - 2020-09-15

### Fixed

- OData: correctly render primary key associations targeting a composition parent but are not
  the composition enabling association.
- to.hdbcds/sql/hdi: Do not dump if artifact doesn't exist anymore after association to join translation
- Only check for unmanaged associations inside of "many"/"array of" in the elements of views and entities,
  not inside of actions and other members.

## Version 1.41.0 - 2020-09-11

### Added

- OData: Allow the relational comparison of structures or managed associations in an ON condition as described in
  version 1.32.0 - 2020-07-10 (forHana).
- Allow `Struct:elem` with and without preceeding `type of` as type reference.

### Fixed

- to.cdl: Only render enums if they were directly defined there
- The parseCdl mode now checks for redefinitions to avoid generating invalid CSN.
- OData: An error is thrown if a redirected target has fewer keys than the original one.
- OData: Empty structured elements are now handled correctly in `flat` format.

## Version 1.40.0 - 2020-09-04

### Added

- to.hdi/sql: Support default values for view parameters.
- OData: lower message severity from Error to Warning for
  `<entity type> has no primary key` and `<type> has no properties`.

### Changed

- OData: The foreign key references in associations are not flattened any more with format `structured`.

### Fixed

- parse.cdl: Properly handle type arguments, most likely relevant for HANA types.
- OData: Multilevel anonymously defined `composition of <aspect>` is now processed successfully with the OData backend.
- OData: Fix a bug in EDM generation that caused a dump.
- Update ANTLR dependency to version 4.8.

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
