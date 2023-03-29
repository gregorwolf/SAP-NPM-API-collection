<!-- markdownlint-disable -->
# ChangeLog for cdx compiler and backends (Archive)

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog.
The compiler behaviour concerning `beta` features can change at any time without notice.

## Version 2.11.4 - 2021-12-21

### Fixed

- CDL parser: in many situations, improve message when people use reserved keywords as identifier
- Improve error text and error location for ambiguous auto-redirection target
- to.sql/hdi/hdbcds:
  + Correctly detect `exists` in projections
  + Correctly handle elements starting with `$` in the on-condition of associations
  + Correctly handle sub queries in an entity defined with `projection on`
  + Correctly handle associations in sub queries in a `from` of a sub query
  + foreign key constraints: respect @assert.integrity: false for compositions
- to.hdbcds: Correctly quote elements named `$self` and `$projection`
- to.cdl: `when` was added to the keyword list for smart quoting
- Compiler support for code completion for `$user` and `$session` now respect user
  provided variables in `options.variableReplacements`.
- API: `deduplicateMessages()` no longer removes messages for `duplicate` artifact/annotation errors.
  Prior to this version, only one of the duplicated artifacts had a message, leaving the user to
  guess where the other duplicates were.


## Version 2.11.2 - 2021-12-06

### Fixed

- to.sql/hdi/hdbcds:
  + No foreign key constraint will be rendered for managed `composition of one` if annotated with `@assert.integrity: false`
  + Correctly handle managed associations with other managed associations as foreign keys in conjunction with `exists`

## Version 2.11.0 - 2021-12-02

### Added

- Option `defaultBinaryLength` to set a `length` type facet for all definitions with type `cds.Binary`. This option
  overrides the default binary length in the database backends and is also used as `MaxLength` attribute in Odata.
- If doc-comments are ignored by the compiler, an info message is now emitted.  A doc-comment is ignored,
  if it can't be assigned to an artifact.  For example for two subsequent doc-comments, the first doc-comment
  is ignored.  To suppress these info messages, explicitly set option `docComment` to `false`.
- `cdsc`:
  + `cdsc explain list` can now be used to get a list of message IDs with explanation texts.
  + `cdsc` now respects the environment variable `NO_COLOR`. If set, no ANSI escape codes will be used.
    Can be overwritten by `cdsc --color always`.
- to.sql/hdi: Support SQL Window Functions
- to.sql/hdi/hdbcds:
  + Support configuration of `$session` and `$user` via option `variableReplacements`.
  + Restricted support for SQL foreign key constraints if option `assertIntegrityType` is set to `"DB"`.
    The behavior of this feature might change in the future.

### Changed

- Updated OData vocabularies 'Common' and 'UI'.
- to.sql/hdi/hdbcds: The default length of `cds.Binary` is set to `5000` similar to `cds.String`.

### Removed

- to.hdbcds: Doc comments on view columns are not rendered anymore. Doc comments on string literals will make the deployment fail
  as the SAP HANA CDS compiler concatenates the doc comment with the string literal. Besides that, doc comments on view columns
  are not transported to the database by SAP HANA CDS.
- to.hdbcds/sql/hdi: Forbid associations in filters after `exists` (except for nested `exists`), as the final behavior is not yet specified.

### Fixed

- CSN parser: doc-comment extensions are no longer ignored.
- Properly check for duplicate annotation definitions.
- Correctly apply annotations on inherited enum symbols.
- Correctly apply annotations on elements in an inherited structure array.
- Fix a bug in API `defaultStringLength` value evaluation.
- Fix crash if named arguments are used in a function that's inside a `CASE` statement.
- to.sql/hdi/hdbcds:
  + Properly flatten ad-hoc defined elements in `returns` / `params` of `actions` and `functions`.
  + Correctly handle `*` in non-first position.
  + Correctly handle action return types
  + Correctly handle mixin association named `$self`
- to.cdl: doc-comments are no longer rendered twice.
- to.edm(x):
  + Fix a bug in V2/V4 partner ship calculation.
  + Remove warning of unknown types for Open Types in `@Core.Dictionary`.
  + An empty CSN no longer results in a JavaScript type error

## Version 2.10.4 - 2021-11-05

### Fixed

- to.sql/hdi/hdbcds:
  + Correctly complain about `exists` in conjunction with non-associations/compositions
  + Don't resolve types in action returns, as this causes issues with $self-resolution

- to.edm(x): Be robust against transitively untyped keys in stacked view hierarchies

## Version 2.10.2 - 2021-10-29

### Fixed

- to.sql/hdi/hdbcds: Correctly handle `exists` in conjunction with mixin-associations

## Version 2.10.0 - 2021-10-28

### Added

- Support arbitrary paths after `$user` - similar to `$session`.
- Support scale `floating` and `variable` for `cds.Decimal` in CDL and CSN. Backend specific handling is descibed in their sections.
- Allow select item wildcard (`*`) in a `select`/`projection` at any position, not just the first.

- to.edm(x):
  + In Odata V4 generate transitive navigation property binding paths along containment hierarchies and terminate on the
    first non-containment association. The association target is either an explicit Edm.EntitySet in the same EntityContainer
    or in a referred EntityContainer (cross service references) or an implicit EntitySet identified by the containment path
    originating from an explicit EntitySet. This enhancement has an observable effect only in structured format with containment
    turned on.
  + Support for scales `variable` and `floating`:
    + V4: `variable` and `floating` are rendered as `Scale="variable"`. Since V4 does not support `floating`, it is aproximated as `variable`.
    + V2: `variable` and `floating` are announced via property annotation `sap:variable-scale="true"`
  
- to.sql/hdi/hdbcds:
  + Reject scale `floating` and `variable`.
  + Reject arbitrary `$user` or `$session` paths that cannot be translated to valid SQL.
  + Following a valid `exists`, further `exists` can be used inside of the filter-expression: `exists assoc[exists another[1=1]]`
  + `exists` can now be followed by more than one association step.
  `exists assoc.anotherassoc.moreassoc` is semantically equivalent to `exists assoc[exists anotherassoc[exists moreassoc]]`

### Changed

- to.odata: Inform when overwriting draft action annotations like `@Common.DraftRoot.ActivationAction`.

## Version 2.9.0 - 2021-10-15

### Changed

- to.edm(x): Raise `odata-spec-violation-type` to a downgradable error.

### Fixed

- to.edm(x):
  + Fix a bug in annotation propagation to foreign keys.
  + Don't render annotations for not rendered stream element in V2.
- to.hdi:
  + for naming mode "hdbcds" and "quoted" parameter definitions are not quoted anymore.
- to.hdi/sql/hdbcds:
  + Correctly handle explicit and implicit alias during flattening.
  + Raise an error for `@odata.draft.enabled` artifacts with elements without types - instead of crashing with internal assertions.

## Version 2.8.0 - 2021-10-07

### Added

- Allow defining unmanaged associations in anonymous aspects of compositions.
- Enable extensions of anonymous aspects for managed compositions of aspects.
- When the option `addTextsLanguageAssoc` is set to true and
  the model contains an entity `sap.common.Languages` with an element `code`,
  all generated texts entities additionally contain an element `language`
  which is an association to `sap.common.Languages` using element `locale`.
- for.odata:
  + In `--odata-format=flat`, structured view parameters are flattened like elements.
- to.hdbcds
  + Use "smart quotes" for naming mode "plain" - automatically quote identifier which are reserved keywords or non-regular.

### Changed

- for.odata:
  + In `--data-format=structured`, anonymous sub elements of primary keys and parameters are set to `notNull:true`,
    an existing `notNull` attribute is _not_ overwritten. Referred named types are _not_ modified.
- to.edm(x):
  + Improve specification violation checks of (nested) keys:
    + All (sub-)elements must be `Nullable: false` (error).
    + Must represent a single value (error).
    + In V4 must be a specification compliant Edm.PrimitiveType (warning).
- to.hdi/hdbcds/sql: $user.\<xy\> now has \<xy\> added as alias - "$user.\<xy\> as \<xy\>"

### Fixed

- Properly generate auto-exposed entities for associations in parameters.
- Correctly apply extensions to anonymous array item types.
- Correctly apply/render annotations to anonymous action return types.
- With CSN flavor `plain` (`gensrc`), correctly render annotations on elements
  of referred structure types as `annotate` statements in the CSN's `extensions` property.
- to.cdl:
  + Correctly render extensions on array item types
  + Correctly render annotations on action return types
- to/for: Correctly handle CSN input where the prototype of objects is not the "default"
- to.hdi:
  + for naming mode "hdbcds" and "quoted" parameter definitions are now quoted.
  + for naming mode "plain", smart quotation is applied to parameter definitions if they are reserved words.
- to.hdi/hdbcds/sql:
  + Ensure that cdl-style casts to localized types do not lose their localized property
  + Fix a small memory leak during rendering of SQL/HDBCDS.
- to.edm(x): Remove ambiguous `Partner` attribute from `NavigationProperty`. A forward association referred
  to by multiple backlinks (`$self` comparisons) is no longer partner to an arbitrary backlink.

## Version 2.7.0 - 2021-09-22

### Added

- to.hdi.migration:
  + Support changes to HANA comments.

### Changed

- Updated OData vocabularies 'Common', 'Core'

### Fixed

- Fix memory issue: do not keep reference to last-compiled model.
- Fix dump which occured when trying to report that the user has defined an element to be both `key` and `localized` if
  `localized` was inherited via the provided type, or in the generated entity for a managed composition of aspect.
- Properly auto-expose targets of associations in parameters and `many`.
- for.Odata:
  + Fix handling of annotation `@cds.odata.valuelist` in conjunction with associations in structures using flat-mode and sqlMapping set to plain.
  + Set correctly the $localized property in the OData backend resulting CSN for artifacts that have localized convenience views.
- to.edm(x):
  + Fix rendering of structured referential constraints and nested partnerships in combination with `$self` comparisons.
  + Fix merging of `@Capabilities` annotations while transforming them into `NavigationCapabilities` from the containee into the container.
- to.sql/hdi/hdbcds:
  + Fix a bug in Association to Join translation in multi-level association redirection in combination with `$self`.
  + Correctly flatten paths with filters or parameters.
  + Improve error message in case of invalid `exists`.

## Version 2.6.2 - 2021-08-26

### Fixed

- to.sql/hdi/hdbcds/edm(x)/for.odata: Correctly handle tuple expansion in subqueries of Unions.

## Version 2.6.0 - 2021-08-23

### Added

- Support managed associations without foreign keys. Associations targeting a definition without primary keys or with an
  explicit empty foreign key tuple or with empty structured elements as foreign keys and their corresponding `$self`
  comparisons do not describe the relationship between the source and the target entity.
  These associations can be used to establish API navigations but cannot be used to access elements in the target
  entity as they cannot be transformed into a valid JOIN expression.
  Consequently, these associations are not added to the `WITH ASSOCIATIONS` clause or forwarded to HANA CDS.
- to.sql/hdi/hdbcds/edm(x)/for.odata: Structure/managed association comparisons (tuple comparisons) are now
  also expanded in infix filters, all expressions and all on-conditions.
- to.hdbcds: Better locations for messages - mostly concerning keywords and duplicates

### Changed

- to.sql/hdi/hdbcds: Invalid (i.e. not expandable) usage of structures is now checked - an error is raised

### Removed

- The internal non-enumerable CSN property `$env` has been removed from the compiled CSN.

### Fixed

- Make `;` optional before `}` in all circumstances (was not the case with `many`).
- to.sql/hdi/hdbcds/edm(x): More graceful handling of CSN input where associations do not have `keys` or an `on`-condition

## Version 2.5.2 - 2021-08-10

### Fixed

- to.hdbcds: Fixed a bug introduced with 2.5.0 that caused virtual elements to be rendered in views.

## Version 2.5.0 - 2021-07-28

### Added

- Allow to extend existing array annotation values via the ellipsis operator `...`.
  An ellipsis may appear exactly once at an arbitrary position in the top level array
  of an `annotate` directive. Only array values can be merged into arrays and unapplied
  ellipses are removed from the final array value. Annotation layering rules remain unaffected.
- to.sql/hdi/hdbcds:
  + Doc comments are translated into HANA comments (or into `@Comment` annotation for `to.hdbcds`).
  Such comments are possible on entities, views, elements of entities and `to.hdbcds` also supports comments on view columns.
  Generation can be disabled via option `disableHanaComments`. Entities/views (and their elements/columns)
  annotated with `@cds.persistence.journal` for `to.hdi`/`to.sql` will not have comments rendered.
  + Generation of temporal `WHERE` clause can be suppressed by annotating the `validFrom`/`validTo` elements of the projection with `false` or `null`.
- to.sql/hdi/hdbcds/edm(x)/for.odata: Structure/managed association comparisons (tuple comparisons) are now
  also expanded in `WHERE` and `HAVING` - this was previously only supported in on-conditions.
- `cdsc` now internally uses SNAPI.
- to.hdi.migration:
  + Validate that the two supplied CSNs are compatible.
  + Improve delta-mechanism to not render superflous [ALTER|DROP|ADD] statements for unchanged SQL.

### Changed

- If the first source provided to the compile command has a `$sources` property
  (whether enumerable or not) which is an array of strings,
  use that instead of calculating one.
- Updated OData vocabularies 'Aggregation', 'Analytics', 'Authorization', 'Capabilities',
  'CodeList', 'Common', 'Communication', 'Core', 'Graph', 'HTML5', 'Measures', 'ODM', 'PersonalData',
  'Repeatability', 'Session', 'UI', 'Validation'

### Removed

- Removed internal property `$viaTransform` from CSN produced by OData/HANA transformation

### Fixed

- Remove warnings 'Ignoring annotation “@odata.draft.enabled” as the artifact is not part of a service'
  and 'Ignoring draft node for composition target ... because it is not part of a service'
- Doc comments are no longer ignored after enum values and on view columns in parseCdl mode.
- to.cdl:
  + Doc comments for enum values are correctly rendered.
  + Enum value and doc comments are now correctly rendered if the enum is called `doc`.
  + Doc comments at type references are correctly rendered.
  + Empty doc comments are correctly rendered and not left out.
  + Doc comments on view columns are correctly rendered.
- to.edm(x):
  + OData V2: Ignore `@odata.singleton`.
  + OData V4: Do not render an `edm:NavigationPropertyBinding` to a singleton if the association has
    cardinality 'to-many'.
- forOData:
  + Fix automatic renaming of shortcut annotation (eg. `@label`) with value `null`.
- CSN parser:
  + Empty doc comments are correctly parsed and not complained about.

## Version 2.4.4 - 2021-07-02

### Fixed

- Do not remove parentheses around single literals and references on the right-hand side of an `in` and `not in` operator.

## Version 2.4.2 - 2021-07-01

- Only changes to beta features. Refer to the [beta ChangeLog](doc/CHANGELOG_BETA.md#version-242) for more.

## Version 2.4.0 - 2021-06-28

### Added

- to.edm(x):
  + Warn if an `edm:Property` has no `Type` attribute.
  + Warn about using the protected names 'Edm', 'odata', 'System', 'Transient' as `edm:Schema` `Namespace` values.
  + Allow `$edmJson` inline annotations in `edm:Collection` and nested annotations.
- to.hdi/sql/hdbcds: Transform a `exists <association>` into a `exists <subselect>`, where the subselect
  selects from the target of `<association>` and establishes the same relation as `<association>` would via the WHERE clause.
  Infix-filters of `<association>` are added to the WHERE clause.

### Changed

- Do not inherit `@cds.persistence.skip` when `@cds.persistence.table` is set on entity.
- to.cdl: Opening and closing braces of empty services and contexts are now on the same line.

### Fixed

- `cdsc`: Option `--direct-backend` can now be combined with `toCsn`'s option `--with-localized`
- The option `testSortCsn` was erroneously ignored in some compiler backends.

## Version 2.3.2 - 2021-06-14

### Fixed

- for.odata: Propagate the `virtual` attribute correctly while flattening structures.
- If internal relational types are used directly in CDL (e.g. `cds.Association`), an error is emitted.
  In CSN, all artifacts of relational types need a `target` (/`targetAspect`) as well.
- In Association to Join translation don't produce a JOIN node for exposed (transitive) associations in
  combination with their exposed foreign keys. Also resolve foreign keys correctly against the target
  entity allowing to expose renamed foreign keys when aliased.
- The option `testSortCsn` (`--test-sort-csn` in `cdsc`) can be used to sort CSN definitions alphabetically.
  This option is only intended for tests.  This will restore the pre-v2.3.0 ordering in EDMX.
- to.sql:
  + for SQL-dialect `sqlite`, render the string-format-time function (`strftime()`)
    + `$at.from` with date-format: `'%Y-%m-%dT%H:%M:%S.000Z'`
    + `$at.to` with date-format:  `'%Y-%m-%dT%H:%M:%S.001Z'` (**+1ms** compared to `$at.from`)
  + for SQL-dialect `hana` wrap `SESSION_CONTEXT('VALID-TO')` and `SESSION_CONTEXT('VALID-FROM')` in `TO_TIMESTAMP(..)` function
- to.hdbcds:
  + Wrap `SESSION_CONTEXT('VALID-TO')` and `SESSION_CONTEXT('VALID-FROM')` in `TO_TIMESTAMP(..)` function

## Version 2.3.0 - 2021-06-02

### Added

- `cdsc` got a new option `--fallback-parser <cdl|csn>` that is used
  if an unknown or no file extension is used.
- to.hdi/sql: Allow association publishing in UNIONs - this was previously forbidden, but this limitation only applies to HANA CDS.
- to.edm(x): Support dynamic expressions as $edmJson inline code

### Changed

- Type `DecimalFloat` is no longer proposed for code-completion.
- Non-string enums without values for their enum elements are warned about.
- OData CSN is no longer sorted by definition names
- to.edm(x): Update OData vocabularies 'Aggregation', 'Analytics', 'CodeList', 'Common', 'Measures', 'Session', 'UI'

### Removed

- to.hdbcds: Association publishing in subqueries is not supported by HANA CDS - an error is raised during compile time, instead of waiting for a deployment error.

### Fixed

- Correct auto-exposure in model with unscoped projection on deep scoped entity
  (from managed aspect compositions: component in component, like they are common in ODM).
- Internal types `cds.Association` and `cds.Composition` are no longer proposed for code-completion.
- Fix various issues with Association to Join translation:
  + Substitute `$self.alias` expressions and respect prefix paths in foreign key accesses.
- to.hdbcds: In naming mode "hdbcds", correctly resolve $self backlinks with aliased foreign keys.
- to.cdl:
  + Correctly traverse subelements when rendering annotations for them.
  + Quote element names (if required) in `annotate with` statements.
- for.odata: Fix regression with detecting collision when generating foreign keys.
- to.edmx: Correctly render final base types in EDMX V2 when called with transformed OData CSN for V4.

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

### 2.5.0 Addendum to Changed

- Replace outdated option `length` with `defaultStringLength` which is usable in `for.*` and `to.*` APIs.


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
  + Minimize name clashes when calculating names for auto-exposed entities,
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

## Version 1.50.10 - 2021-07-30

### Fixed

- to.hdi.migration: Check for incompatible CSN versions to avoid wrongly generated ALTER|DROP|ADD statements.

## Version 1.50.8 - 2021-07-01

### Fixed

- to.hdi.migration: Don't generate `ALTER` for type change from association to composition or vice versa (if the rest stays the same), as the resulting SQL is identical.

## Version 1.50.6 - 2021-05-05

### Fixed

- to.edm(x):
  + OData V2: Render constraints only if all principal keys are used in association.
  + OData V4: Don't remove `@Capabilities` annotations from containee.
  + Allow `@Core.MediaType` on all types and raise a warning for those (scalar) types that can't be mapped to `Edm.String` or `Edm.Binary`.

## Version 1.50.4 - 2021-04-06

### Fixed

- to.hdbcds: CDS and HANA CDS types inside cast expressions are mapped to their SQL-counterparts, as the CDS types can't be used in a cast.

## Version 1.50.2 - 2021-03-19

### Fixed

- Correct calculation of dependent auto-exposed entity name
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
  with value `true`, is considered a “preferred” redirection target.

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
  Previously, compiling a compiled model could lead to new auto-exposed entities.
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
  auto-exposed entities (text entities, components of managed compositions).
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

- OData V2: Assign various `@sap` annotations to the `<edmx:entitySet>` and `<edmx:AssociationSet>`
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

- Compiler: `type of <unmanaged association>` is now handled correctly by raising an error.

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

## Version 1.23.2

Changes

* Association to Join Transformation:
  + Validate paths of an expression in the projection to be compliant with the
    ON condition path constraints if such an expression is used in a mixin.
  + Reject recursive or non-bijective `$self` expressions.
* Reject casting of a structured select item to a different type.
* OData: Update vocabularies `Capabilities`, `Common`, `UI`, `Validation`

Fixes

* Association to Join Transformation: Resolve compound ON conditions with
  multiple logical terms and/or references to different associations via `$self`.
* Remove temporary property `viaTransformation` from published CSN.
* Do not complain about unaligned `$syntax` attribute in CSN frontend.

## Version 1.23.1

Changes

* OData:
  + Lower message for unknown vocabulary annotations from warning to info.
  + Lower message for `@Analytics.Measure expects @Aggregation.default` from warning to info.
  + Remove empty EntityContainer and raise warning if Schema is empty.

Fixes

* Correctly calculate code completion candidates for projection items in all
  circumstances (regression introduced in v1.22.0).
* In the Hana/Sql backend, correctly resolve forward `on` condition when using
  mixin association that backlinks to an unrelated 3rd party entity and association.
* Raise a warning if the element of the forward association and the element of
  the query source do not originate from the same defining entity. Raise an
  error if the element of the forward association cannot be found in the query
  source or is ambiguous.
* Correctly create localization views with compiled model as input;
  it was wrong previously in a model with a high view hierarchy.

## Version 1.23.0

Features

* Introduce `![identifier body]` in the CDL source for delimited identifiers.
  (The `!` is inspired by ABAP's identifier tag,
  `[]` by the delimited identifier syntax in Microsoft SQL Server and Sybase;
  we cannot use `[]` alone, because brackets are used for filter conditions.)
* When generating SQL or HDBVIEW, explicit CASTs are now rendered

Changes

* Signal a warning for all uses of `"identifier body"` in the CDL source, as
  most uses of double-quotes in actual CDS models were likely meant for strings.
  (Yes, we do not adhere strictly to the lexical rules of the SQL Standard with this change…)
* Issue a warning for an `aspect` definition without `{…}`.
* In the CSN, `aspect` definitions have a `$syntax` property with value `"aspect"`.
  A future incompatible change will set the `kind` of aspect definitions to value `"aspect"`.
* Removed old CSN frontend and the corresponding options: `stdJsonParser` and `oldCsnFrontend`.
* Fix check for arguments and filters in references (__might introduce new errors__).
* Issue an error if explicit `keys` are provided when redirecting *un*managed associations.
* File paths given to `cdsc` which contain symbolic links are now resolved before being
  passed to the compiler.
* Annotating elements with `@Core.Computed` now always overwrites computed value;
  also expressions in parentheses will now induce to set `@Core.Computed` to `true`.
* Update OData vocabulary `UI`
* Increase the length of the element `locale` in generated `_texts` entities from
  `String(5)` to `String(14)`.
* Do not overwrite annotations with generated annotations (such as shortcuts and other
  convenience annotations).

Fixes

* Automatically calculate `keys` also for published _secondary_ managed
  associations, i.e., associations in a select column which is reached by
  following another association.  The compiler doest not yet calculate the `on`
  condition of published secondary unmanaged associations – provide it explicitly.
* Entities/Views without elements are now detected correctly.
* Fix check for action/function parameters in services.
* OData: Correctly apply annotations to parameters.

## Version 1.22.0

Features

* With `redirected to`, model designers can now explicitly provide the `on`
  condition / foreign `keys` for "consumers" of the current query (entity).
  This is useful for situations (usually mentioned as message) where the
  compiler does not calculate `on`/`keys` (automatically yet).
* Add OData vocabularies: `com.sap.vocabularies.CodeList.v1`, `Org.OData.Repeatability.V1` and `com.sap.vocabularies.Session.v1`

Changes

* In the `sql`, `hdi` and `hdbcds` backends with SQL dialect HANA, `$user.id` is translated to
  `SESSION_CONTEXT('APPLICATIONUSER')`, not `SESSION_CONTEXT('XS_APPLICATIONUSER')` anymore.
  As with the SQL dialect SQLite, it can now be configured.
* The client tool `cdsc` now prints a source excerpt for each message by default;
  use `cdsc --no-message-context` to get the previous behavior.
* Increase severity to `Warning` of messages for a situation where the compiler
  cannot calculate an `on` condition / foreign `keys` automatically.
* Issues warnings for annotation definitions, as their CSN representation will be
  moved from `definitions` into an new property `vocabularies` in a future change.
* OData:
  + Update vocabularies: `Analytics`, `Common`, `Communication`, `Core`, `PersonalData`, `UI`
  + Set reference base URI for SAP Vocabularies to `https://sap.github.io/odata-vocabularies/vocabularies`

Fixes

* In the `sql`, `hdi` and `hdbcds` backends,
  + correctly ignore contexts containing just actions,
* In all backends, correctly handle models where an `on` condition of a `join` contains a sub query.
* Avoid infloop for cyclic dependencies on select items with explicit redirections.

## Version 1.21.1

Features

* OData: Support annotation `@insertonly` at an entity which translates to
  `@Capabilities.DeleteRestrictions.Deletable: false`, `@Capabilities.ReadRestrictions.Readable:false`,
  `@Capabilities.UpdateRestrictions.Updatable: false`.
  A warning is raised if `@insertonly` and `@readonly` are applied at the same entity and no mapping is
  done.

## Version 1.21.0

Features

* Support `cds.Decimal` without type facets `precision` and `scale` as substitute for the deprecated `cds.DecimalFloat`. Mapping is as follows:

  | HANA CDS     | HANA SQL | SQLite  | Odata V4 | Odata V2 |
  |--------------|----------|---------|----------|----------|
  | DecimalFloat | DECIMAL  | DECIMAL | Decimal  | Decimal  |

* OData:
  + Expand shorthand annotation `@mandatory` to `Common.FieldControl: #Mandatory`.
  + Support edm:Singleton by annotating an entity with either
    `@odata.singleton: Boolean` or `@odata.singleton.nullable: Boolean`.

    `@odata.singleton.nullable` is a shorthand for `@odata.singleton: true` and sets
    the value for attribute `Nullable` (default is false).

    If `odata.singleton` is `false`, no singleton is generated regardless of the existence of `@odata.singleton.nullable`.
  + Option `odataContainment: true` renders compositions as `edm:NavigationProperty` with
    containment. This option is only available for OData V4 and with `--beta-mode`.

Changes

* CSN frontend: use faster implementation by default.
* CDL frontend: issue warning for suspicious-looking delimited identifiers;
  some people think that they have written strings when they use double-quotes.
* Models delivered with `@sap/cds` are now resolved from `cds.home`; e.g. `using ... from '@sap/cds/common'`.
  This allows working without locally inst# ChangeLog for cdx compiler and backends
  This allows working without locally installed `@sap/cds`, for example in Java projects.
  In that case, respective models will be fetched from a globally installed `@sap/cds-dk`.
* OData:
  + Improve `array of` checks and reject anonymous types and types that are not service members.
  + Set draft properties  `HasActiveEntity` and `HasDraftEntity` to `Nullable: false`.
* Reject old-style CSN from all CSN based transformers and renderers
* `toHana` and `toSql`: Allow aliasing for foreign keys

Fixes

* OData:
  + Fix `Nullable` attribute for parameters in EDM JSON V4.
  + Do not annotate `edm:NavigationProperty` for term definitions with `AppliesTo: Property` and vice versa.
* Fix bug in ON Condition rendering during transformation of associations to joins for stream based `$self` expressions.
* `toHana`: Only render and allow keys in the leading query
* `toHana` and `toSql`: When following an association, explicitly set the implicit alias to work around a HANA limitation

## Version 1.20.3

Changes

* Core Compiler: Forbid navigating associations (to non foreign key elements) in the ON condition
  of an association definition.
* OData: Do not generate `OnDelete` for Containment Navigation Propertie, as this is redundant.

Fixes

* In `toSql` for  `Sqlite` generate `current_timestamp` for `$at`

## Version 1.20.1

Changes

* Associations to 'abstract' artifacts and the usage of abstract entities in queries are now rejected.

Fixes

* OData:
  + Raise level from 'info' to 'warning' for excluded NavigationProperties due to targets outside the service.
  + Fix a bug in mapping of `@Capabilities` (see Version 1.20.0)
  + Flattening of structured elements - @cds.persistence.name was semi-flattened

* CSN Input:
  + Support views with parameters in queries
  + Support views with parameters in on-conditions of unmanaged associations
  + Support 'not null' for enum elements

## Version 1.20.0

Changes

* Issue error (instead of a warning) if a projected association uses a non-projected element
  in its `on` condition (message id `rewrite-not-projected`).

* Issue error (instead of a warning) if the redirected target does not originate from the original
  target of an association (message id `redirected-to-unrelated`).

* In `--beta-mode` remove the annotation `@odata.draft.enabled: false` from generated
  `_texts` entities. Annotate the technical foreign keys of a `_texts` entity with
  `@cds.odata.v4.ignore: true` to allow containment in OData V4 for `_texts`.

* In `toHana` and `toSql` associations to entities annotated with `@cds.persistence.exists` are
  removed from the generated model. This is an extension to the change introduced with version 1.15.0.
  If a proxy artifact shall be an association target, another 1:1 projection entity shall be created
  wich then can act as the association target.

* OData:
  + Reject non specification compliant CSN as input to csn2edmx
  + Add annotation `@cds.odata.{v2|v4}.ignore` in `--beta-mode`
  + Rewrite `@Capabilities` annotation to `@Capabilities.NavigationRestrictions` at the containment
    association in case an entity set has been omitted due to containment in OData V4.
  + Update vocabularies `Common` and `UI`
  + Improve error message when not generating a navigation property for association targets outside
    the same service.

* Draft:
  + Raise an info message if a draft root has not exactly one primary key element of type `cds.UUID`
  + Raise an info message if a draft node (subordinate to a draft root) has not exactly one primary key element
    of type `cds.UUID` and optionally one more additional primary key.
  + Raise an error message if the same draft node is reachable from two separate draft roots.
  + Raise an info message if a service contains more than one draft root entities.
  + Annotate technical elements `IsActiveEntity`, `HasActiveEntity`, `HasDraftEntity`,
    `DraftAdministrativeData` and `DraftAdministrativeData_DraftUUID` with `@UI.Hidden`

* CSN Input:
  + New simplified parsing of CSN, can be enabled via compiler option stdJsonParser or
    command line option --std-json-parser
  + Support for $location

Fixes
* Compiler:
  + Correctly reject the Promise if errors occur during parsing

* OData:
  + Correctly render annotations with `null` values in arrays.
  + Correctly render annotations with records of complex types.
  + Correctly annotate artifacts with parameters. Annotations are assigned to the resulting
    EntityType `<name>Type`
  + Correctly flatten substructures when used as types

* CSN Validation:
  + Correctly process views with parameters in unmanaged associations

* Make `parseToCqn()` use filter in `FROM` clause as hint for (recommended) colon, i.e.
  never discard the filter.

## Version 1.19.2

Changes

* Improve the semantic checks for `Association to many` with a partial key, not complaining
  about a missing `ON` condition anymore.

* HANA:
  + When using `names: quoted`, raise a warning when artifacts with `@cds.persistence.exists`
    belong to a CDS namespace, context or service.

* OData:
  + Raise an `info` message on the usage of deprectated OData vocabulary terms.
  + Raise a `warning` message when applying `@odata.Type` with another type as `Edm.String`, `Edm.Int16`,
    `Edm.Int32`, `Edm.Int64`.
  + Support shorthand annotation `@description` for `@Core.Description`.

* Never complain about `localization` views when recompiling a CSN file that has localized convenience views
  already expanded. If the definition's absolute name is `localized`, it must be a context. If the definition's
  absolute name starts with `localized.`, it must either be a context or a query entity. An error message is
  raised in all other cases. In all cases, definitions in the namespace `localized` are ignored for further processing.

Fixes

* Fix a dump when compiling from CSN for query elements without a `key` property that have no column
  counterpart.

## Version 1.19.1

Fixes

* Make sure that we really create all localized convenience views for entities
  which have localized elements, select localized elements or can directly or
  indirectly reach (via navigation along associations and compositions) such entities.

Features

* Allow annotations with `@odata.Type: 'Edm.Int16'` and likewise with value `'Edm.Int32'`
  and `'Edm.Int64'` to influence the type which is chosen in the generated EDMX.

## Version 1.19.0

Changes

* Event definitions are now properly listed in the CSN:
  the `kind` is `event`, the property for its members is called `payload`.
* Omit redundant `kind: 'param'` for parameters in the `params` dictionary of a CSN.

Fixes

* Do not use upcoming OData v4.01 facet values for `cds.DecimalFloat`, i.e.
  revert v1.18.0 change which had added `Scale: floating` and `Precision: 34`.
* In CSN frontend, support direct `{func: …}` objects in `orderBy` and `groupBy`.

## Version 1.18.2

Fixes

* Issue warning instead error when CDS type `cds.DecimalFloat` is used with OData v2.
  Also issue the warning for CDS type `cds.hana.SMALLDECIMAL`.
* Properly render n-ary `cross join`s, typically produced by `select from A, B, C`.

Features

* Allow to provide HANA-specific magic variables like `current_utctimestamp` via the
  function syntax `current_utctimestamp()`.  Similar for `sysuuid`, `current_connection`,
  `current_schema`, `current_transaction_isolation_level`, `current_utcdate` and `current_utctime`.
  Support SQL Standard magic variable `system_user` (without parentheses); be aware that
  it is not supported (by that syntax) in HANA.

## Version 1.18.1

Changes

* Hide the experimental swagger backend behind `betaMode` and issue a warning even then.

Fixes

* Properly establish EDMX partnership again between forward and backward association
  even in the presense of "hidden" associations (v1.18.0 had introduced a bug).
  Issue a warning if there are multiple (non hidden) partnership candidates.

Features

* `using from <module>` also tries file extensions `.csn` and `.csn.json`.

## Version 1.18.0

Changes

* OData: add type facet `Scale: floating`, `Precision: 34` to `Edm.Decimal`
  for mapped CDS type `cds.DecimalFloat`.
  Issue __error if `cds.DecimalFloat` is used with OData v2__.

Fixes

* If a projection in a service selects from a source in a model,
  associations in the projection source are _implicitly redirected_
  to a target in the service.
  The corresponding redirection must also happen for the _localized convenience view_
  for the projection in the service: the new target should be
  the localized convenience view for the "original" redirection target
  (if it does not exist: the "original" redirection target itself).

## Version 1.17.3

Changes

* OData:
  Disable proxy generation again due to too many runtime conflicts. This effectively
  auto-excludes the associations as navigation properties from the service that reference targets outside the service;
  properties from the foreign keys of managed associations remain.
  As opposed to the pre-v1.16.2 behaviour, this only affects the OData backend.
* OData: Raise error if `EntityType` has no primary key.
* Raise warning if compiler is invoked in `--beta-mode`

Fixes

* Make `annotate` statements on members of auto-exposed entities and
  automatically created text entities work.

## Version 1.17.2

Fixes

* Fix stack overflow bug in EDM Preprocessing

## Version 1.17.1

Changes

* OData: Add type facet `Precision=7` to `Edm.DataTimeOffset` if CDS type is `cds.Timestamp`.
* Add semantic check to prevent the usage of `hana.ST_POINT` and `hana.ST_GEOMETRY` as primary key types.

Fixes

* OData: Do not generate `NavigationPropertyBinding` (V4) or `AssociationSet` (V2) for non-existing `EntitySet`
  of the Proxy `EntityType`s introduced with Version 1.16.2.


## Version 1.17.0

Features

* OData V4:
  With `--beta-mode` enabled, compositions become containment navigation properties. This
  is performed by annotating all compositions with `@odata.contained`. Existing assignments
  are not overwritten.
  Enabling containment is an incompatible change to existing OData metadata documents
  as all composition targets are no longer accessible as EntitySets but only through their
  container.
* Release keyword `event`.

Changes

* OData: Update all known Odata vocabularies, this also includes SAP vocabularies which now
  may contain Term definitions marked as *experimental*.
* HANA Datatype Support in SQLite: Render `ST_GEOMETRY` and `ST_POINT` as `CHAR(5000)`.
* Use association names as table aliases during the association to join transformation instead of
  using the association target (this makes the transformed view more comprehensible).

Fixes

* Parameter lists and filters in ON condition paths are rejected in association to join transformation.
* Append the temporal `WHERE` clause to views that already have a `WHERE` clause.
* View elements with @cds.valid.from/@cds.valid.key are no longer marked as key in the columns.
* CSN validator accepts select statements with a having or a group by clause containing a function call.

## Version 1.16.2

Features

* Introduce builtin-types for the (HANA) SQL types `SMALLINT`, `TINYINT`,
  `SMALLDECIMAL`, `REAL`, `CHAR`, `NCHAR`, `VARCHAR`, `CLOB`, `BINARY`,
  `ST_POINT`, `ST_GEOMETRY`.  In the CSN, they appear as `cds.hana.SMALLINT`,
  ….  In CDL, they can be referred to by `hana.SMALLINT`, ….

  Mapping of the types is as follows:

  |CDS|HANA|SQLite|OData V4|OData V2|
  |----|----|-----|--------|--------|
  |SMALLINT|SMALLINT|INT|Edm.Int16|Edm.Int16|
  |TINYINT|TINYINT|INT|Edm.Byte|Edm.Byte|
  |SMALLDECIMAL|SMALLDECIMAL|DECIMAL|Edm.Decimal Scale="floating" Precision="16"|Edm.Decimal|
  |REAL|REAL|FLOAT|Edm.Single|Edm.Single|
  |CHAR|CHAR|CHAR|Edm.String|Edm.String|
  |NCHAR|NCHAR|CHAR|Edm.String|Edm.String|
  |VARCHAR|VARCHAR|CHAR|Edm.String|Edm.String|
  |CLOB|CLOB|CHAR|Edm.String|Edm.String|
  |BINARY|BINARY|CHAR|Edm.Binary|Edm.Binary|
  |ST_POINT|ST_POINT|CHAR|Edm.GeometryPoint|n/a|
  |ST_GEOMETRY|ST_GEOMETRY|CHAR|Edm.Geometry|n/a|

Changes

* Associations in services with targets outside the service
  are not auto-excluded anymore.
* OData: Create proxy `EntityType`s for association targets that are not
  part of the current service. This maintains the navigation path in the
  EDM model and exposes the primary key tuple of the otherwise unreachable
  target. The primary keys of a proxy entity must be scalar types. No
  complex types are supported. Also all outbound navigations are removed
  from a proxy.
* The package require node version 8 or higher.

Fixes

* Forbid publishing associations inside unions.
* Fix a bug in the creation of localized convenience views that lead to an erroneously JOIN
  expression if such a view gets transformed into a SQL query with `toSql --assoc joins`.

* OData: be robust against erroneoulsy assigned @odata.foreignKey4 annotation.
* Improve ON condition path checks in Association to Join transformation.
* Fix crash in forHana generation when determining the type of an enum.

## Version 1.16.1

Features

* API: If the compiler frontend reports messages and the `compile` function
  had been called without options having a `messages` property, then
  the resulting CSN contains a non-enumerable `messages` property containing the messages.

Changes

* Removed TNT specific behaviours for HANA CDS, SQL and OData from the code.
* Perform usage check of entities annotated with `@cds.persistence.skip` if
  using entity really exists on the database (not annotated with `cds.persistence.table`).
* Remove mixin associations with a target entity annotated with `@cds.persistence.skip` and
  its select item that eventually expose this association.
* csn2edm: Produce all services in a given model in one pass removing the requirement
  to call the EDM transformation for each service individually. The existing API is still
  compatible. If an EDM for only one service is requested, only this EDM will be produced.
* Odata:
  + Don't omit containee's foreign keys if they are also primary key.
  + Remove warning that containment association must be `NOT NULL` .
  + Support annotation `@cds.etag` as (backward compabible) replacement for `@odata.etag`.
  + Update broken UI vocabulary.

Fixes

* Make property propagation from query sources using associations work.
* Consider associations in `from` clause for `on` condition rewrite.
* Make the CSN parser always produce the correct result for `null`.
* Propagate `@cds.autoexpose` along primary query source in all circumstances.
* Make `annotate` statements on auto-exposed entities work in circumstances.
* Do not dump when magic variables like `$now` or `current_date` had been used
  in an entitiy for which the compiler creates a localized convenience view.
* Fix order problem in creation of association `DraftAdministrativeData` for draft enabled entities.
* Fix runtime error in `forHana` in handling of mixin forward and backward associations.

## Version 1.15.0

Features

* Release aspect `temporal`.

Changes

* Improve handling for entities are either `abstract` or annotated with `@cds.persistence.skip` in `toHana` and `toSql`:
  + Such entities are not part of the generated database model and thus non-existing in the database schema.
  + Associations/compositions to non-existing entities are removed from the generated model but not their eventually
    generated foreign keys (for managed associations). An info message is raised for each removal.
  + An error message is raised if a non-existing entity is used (either directly or indirectly through an association).

Fixes

* OData
  + Do not assign `@Core.AlternateKeys` for `temporal` aspects if the annotation already assigned.
  + Resolve primitive return types for actions
  + Mark localized _texts entities and convenience views with `@odata.draft.enabled: false`
* JSON parser
  + Allow JavaScript objects as input, as well as JSON

## Version 1.14.1

Changes

* Primary key definitions are only allowed in first `union`. Raise an error if primary keys are defined in
  subordinate `union` clauses when generating `toHana`.

Fixes

* HANA CDS
  + Don't generate primary keys in subordinate `union` clauses if the element is a key-element of the source entity.
  + In case of multiple chained `union`s, generate all `union` clauses correctly.
* OData
  + Generate unique Names for `<edmx:Association>` elements in Version 2 to avoid name clashes with other entries in `<edmx:Schema>`.
  + Raise error for duplicate definitions in `<edmx:Schema>`.
* CSN Input
  + validation - joins can have value literals in the on condition

## Version 1.14.0

Features

* Support aspect `temporal` with option `--beta-mode`:
  + Support magic variables `$at.from` and `$at.to`.
  + OData:
    - Add element annotated with `@cds.valid.from` to the key in the metadata document but not in the CSN, requiring a valid
      primary key in the projection to exist.
    - An element annotated with `@cds.valid.key` becomes the sole primary key in the EntityType.
      Add an `@Core.AlternateKeys` annotation that lists the original primary key tuple as well as the element annotated with `@cds.valid.from`.
  + SQL/HANA CDS:
    - Translate `$at.from` to `SESSION_CONTEXT('VALID-FROM')` in HANA and `current_time` in Sqlite.
    - Translate `$at.to` to `SESSION_CONTEXT('VALID-TO')` in HANA and `current_time` in Sqlite.
    - A `WHERE` claues that allows time travel queries is generated for projection that contain exactly one element annotated
      with `@cds.valid.from` and `@cds.valid.to` that stem from the same origin.
    - An entity elementannotated with `@cds.valid.from` is added to the primary key tuple of the resulting database table.
    - If an entity element is annotated with `@cds.valid.key`, it becomes the sole primary key of the resulting database table.
* Redirect targets of associations in `localized` convenience views to their respective `localized` convenience views.
  In addition to that, create a `localized` convenience view for all entities that contain associations that lead directly
or indirectly (via n other association steps) to a localized entity, so that these associations can also be redirected.
`Localized` convenience views are only created in case the model is error free.

Changes

* Allow to `extend` an entity with an empty structure
* OData:
  + An error is raised for entities that have become empty (no elements) due to automatic exclusion of associations.
  + Update the vocabulary `UI`
  + Allow multiple 'backlink' associations via `$self` ON condition, first 'backlink' establishes the partnership
  + Allow 'backlink' associations to define their own target multiplicity.
  + Raise a warning if the forward association is not included in the service (due to autoexclusion).
  + Reclassify error on containment association to be `NOT NULL` down to a warning.
  + `@cds.api.ignore` suppresses annotations.


Fixes

* OData: Fix issues with `@cds.odata.bindingparameter.collection`:
  + Correct `$Collection` to `Collection` in EDMX
  + No referential constraints for NavigationProperties with target multiplicity '*'
* Avoid internal errors on cyclic view definitions
* Strengthen checks on reserved names


## Version 1.13.4

Feature

* `extend projection` with elements
* `extend` entity with aspect, i.e. not by specifying new elements, but via a definition which has elements.

Changes

* Localized convenience views (introduced in Version 1.12.0 as beta feature) are now available.
  + The convenience views for views and projections are created as a copy of the regular artifact in
    the `localized` namespace which selects from the corresponding localized artifacts.
  + Associations within localized convenience views aren't redirected yet; they still point to their
    original non-localized target.
  + Convenience views for views containing associations in their `FROM` clause aren't supported yet.
    For those views an `Info` message is produced stating that no convenience view could be created for the given view.
  + In contrast to the beta feature it isn't required anymore to expose the `localized` association or the primary key.
* The automatic exposure of entities, redirection and exclusion of
  associations has been moved from `forHana` and `forOdata` post-processing into the core compiler:
  + When an association is projected, the compiler checks whether all elements are propagated
    which are referred to in the `on` condition of the projected association.
    Please __reexamine warnings__ for your model.
  + The compiler checks whether a redirection target (directly or indirectly) projects from the
    original target (and/or uses the original target as structure include).
  + Elements can be renamed in the redirected target and the `on` condition is rewritten correspondingly
    (currently not if the projected association is an indirect one, i.e. if we project `assoc1.assoc2`,
    which _was an Error in v1.12.0_) → this means that those DB artifacts can be deployed.
  + When following an implicitily redirected association,
    potentially renamed elements are taken into account.
  + Implicit redirections fail less often as the compiler tries to find a "minimal" exposure.
  + Auto-exposure via `Composition of` now works in all circumstances.
  + Other features like "localized" work for auto-exposed entity and/or with implicitly redirected association.
  + __Redirections for associations which are sub elements do not work__.
* The name of an auto-exposed entity now looks like `<Service>.<LastNamePart>`
  where `<LastNamePart>` is the part of the name of the original entity after the final dot.
  If you get an error because of name clashes, just expose one entity explicitly
  (or use the option `longAutoexposed`).
* Multiple backlink associations for one forward association make the OData backend report an error.

Fixes

* Forward the `key` property to the select items of generated HANA CDS views.
* Remove some issues of the `$projection` and `$self` handling in the association to join translation.
* Add alias for select items that are primary key in HANA CDS.
* Fix support for union queries in localized convenience views.

## Version 1.12.1

Changes
* With option `--beta-mode`, automatic exposure of entities, redirection and exclusion of
  associations has been moved from `forHana` and `forOdata` post-processing into the core compiler.

Fixes
* With option `--beta-mode` in v1.12.0, a just inherited `@cds.autoexpose` had not been considered.
* With option `--beta-mode` in v1.12.0, projecting indirect associations (`assoc1.assoc2`) lead to an error.

## Version 1.12.0

Features
* With option `--beta-mode`, support `localized` convenience views:
  Create a view named `localized.<EntityName>` for an entity with `localized` elements.
  This view allows a coalesced access to `localized` elements and either returns
  the default or translated content, depending on the locale setting.
  + A convencience view is only created if both the `localized` association and some
    localized elements are exposed in the entity.
  + When exposing the `localized` association in an entity, also the complete primary key
    has to be exposed, otherwise an error is thrown.
* Mark calculated and virtual elements as `@Core.Computed:true`. If `@Core.Computed` has
  been set manually, it remains unchanged.

Changes

* With option `--beta-mode`, automatic exposure of entities, redirection and exclusion of
  associations has been moved from `forHana` and `forOdata` post-processing into the core compiler.
  _Update to v1.12.1_ if you experience problems – an inherited `@cds.autoexpose` had not been considered.
* In `toSql` and `toHana` errors are raised
  + for duplicate definitions of elements that differ only in spelling,
  + if the entity is not `abstract` or annotated with any `@cds.persistence` set to true and
    - an element is typed to be an `array of` a `type`,
    - an implicit managed composition has cardinality to many.
* Raise a warning if an element is to be `localized` which is not of type `cds.String`.

Fixes
* OData:
  + On `@Aggregation.ApplySupported.PropertyRestrictions` apply `@sap.sortable':false, '@sap.filterable':false`
    at new `ID__` property.
  + Allow `@Core.OperationAvailable: null`
  + Abstract entities and all inbound navigation properties are removed from the metadata document.
  + Non-properties are not considered as referential constraints.
* Correct annotation `cds.autoexposed`.

## Version 1.11.0

Features
* Support `localized` elements:
  + Add sibling entity `<entityName>_texts` to store the localized content.
  + Add two associations `texts` and `localized` to the original entity.
  + Add view `localized.<entityName>` to retrieve either the translated or original content.
* Annotate elements that are `virtual` or annotated with `@odata.on.insert` or
  `@odata.on.update` with `@Core.Computed`.
* Support OData `@Common.ValueList` by either
  + annotating an element for which a value help entity shall be used with
    `@Common.ValueList.viaAssociation`. The value is the association to the value list entity.
  + annotating an entity with `@cds.odata.valuelist`. All associations targeting to this entity
    are then annotated with `@Common.ValueList.viaAssociation`.
  + annotating an element statically with `@Common.ValueList.entity`. The annotation value
    is a static entity name and cannot be dynamically adapted during autoexposure.
* Add annotation `@cds.odata.bindingparameter: {name: String, collection: Boolean }`
  which allows overriding the binding parameter name and cardinality of a bound action in
  OData V4. Default is: `name='in'`, `collection=false`.
* Allow a colon in `FROM` and `TYPE OF` references.
* Support using and publishing a mixin association in the same view when activating for HANA CDS.

Changes
* Produce all CSN output in version 1.0 by default.
* Virtual elements cannot be used in expressions.
* Command `toRename` creates a stored procedure instead of individual statements.
* Don't auto-expose composition target which is annotated with `@cds.autoexpose: false`.

Fixes
* OData:
  + Rename OData annotation vocabulary `Auth` to `Authorization`.
  + Correct exposure of entities with parameters:
    - Set attribute `EntityType` of  element `edm:EntitySet` to the correct type
    - Set attribute `EntitySet` of element `edm:End` in `edm:AssociationSet` to
      the correct set.
  + `EnumMember` in element `edm:Annotation` has only one delimiting slash
* Rewrite ON condition of a mixin backlink association for an inferred and redirected
  forward association.

## Version 1.10.0

Features
* Annotate entities with `@cds.autoexposed` that are auto-exposed in a service.
* Always auto-expose composition targets without annotating them with `@cds.autoexpose`.
* For associations in a service with targets which are not in a service:
  + automatically exclude them if the associaiton is inferred (via select * or include),
  + signal an error if the association is explicitly defined in the service.
* Support the OData annotation vocabulary `Authorization`.


Changes
* Generate `null as …` for virtual view elements.
* Update OData annotation vocabulary `Core`.
* Change the tranlation of annotation `@readonly` at an element from `@Core.Immutable` to
  `@Core.Computed` when processing for OData.

Fixes
* Avoid unnecessary aliases for paths that terminate on an association in the FROM clause.
* Fix an issue with table alias handling in Association to Join translation.
* Translate type `Cds.DateTime` to SQL type `TIMESTAMP` for Sqlite.
* Fix an internal error when parsing `view V as select distinct from E`
* Raise an error that an empty service cannot be used to generate an OData metadata document
* Correctly set the OData principal in a referential constraint for compositions with
  free defined ON conditions.

## Version 1.9.0

Changes
* Always use quotes around identifiers for `toSql` and `toHana` with `quoted` or
  `hdbcds` names.
* Never use quotes around identifiers for `toSql` and `toHana` with `plain` names.
  Issue a warning if an identifier may conflict with a language keyword.
* Generate `.hdbtable`, `.hdbview` etc. files if option `toSql.src` is `hdi` (default
  `sql` generates `.sql` files).

Features
* Allow `select` clauses with standard SQL syntax (i.e. also accept `select ... from ...`
  in addition to the CDS-specific form `select from ... { ... }`).
* Support `count(*)` etc.
* Support function calls with names arguments.
* Support `aspect` definitions.

Fixes
* Omit unused vocabularies in OData-generated EDMX files.
* For `toOdata`, handle nested anonymous types correctly (also with arrays, e.g. in
  action/function parameters)
* Handle mixins correctly when transforming associations to joins.

## Version 1.8.1

Changes
* With `--new-redirect-impl`, associations and compositions in services
  are implicitely redirected to a (unique) projection of the original target
  if the projection is "simple and similar enough" and defined in the service.
  This is now always done, not only by the `toOdata` backend;
  association targets explicitly provided in the service are not implicitly redirected.
* With option `--new-csn` (or `--beta-mode`) alone, we do not properly rewrite the
  `on` condition or `keys` anymore.
  Use option `--assoc-on-rewrite` and `--new-redirect-impl` to do so.

Fixes
* With `--new-redirect-impl`, the navigation along implicitly redirected associations now
  properly considers that elements could have been renamed in the new association target.
* With `--new-redirect-impl`, the code completion candidates are the elements
  of the new association target calculated by the implicit redirection.
* With `--new-redirect-impl` and `--assoc-on-rewrite`,
  the `on` condition or `keys` are rewritten with implicit redirections.
* With `toSwagger`, enum constants without values are now correctly rendered.
* With `toSql` in `sqlite` dialect, a warning is now issued if an identifier collides
  with a known SQL keyword.
* For OData, annotations with `null` values are now ignored (this can also be used to
  "delete" an annotation in an extension).
* In OData, structured types that are anonymous or not exposed in a service are now
  automatically exposed (unless used as an entity element - in that case they are still
  flattened).
* For OData v2, the namespace for service annotations is now correctly set.
* For `toHana` with `plain` names, all type properties (including `length` ...) are now
  propagated correctly when derived types are used explicitly in view columns.
* CSN version 0.2.0 is now accepted by the compiler.

## Version 1.8.0

Features
* Support the OData annotation vocabularies `PersonalData` and `Aggregation`.
  The vocabulary for `PersonalData` contains a number of annotations that are flagged
  as "experimental". Their usage will result in a warning.
* New option for specifying the locale in SQLite dialect. As part of the `toSql`
  command is now available the options `'-l, --locale <locale>'` for specifying
  value for the "$user.locale" variable.

Changes
* Entity definitions with elements of type `array` and structure type definitions with
  association elements will now lead to an error message when generating edmx for OData v2.
  These constructs are not allowed in OData v2, but there was no corresponding check in the
  cds compiler yet.

## Version 1.7.1

Fixes
* Restore version function which was deleted by accident

## Version 1.7.0

Features
* Allow entities to have parameters. They can be referred to inside the query with
  `:Param`. Entites with parameters are not allowed in `toSql` for dialect "sqlite".
  When generating for HANA, parameters cannot be used in combination with associations:
  an entity with parameters cannot have associations, and an association must not point
  to an entity with parameters.
* The parameters and return value of actions and functions can now have structured types.
* In the annotation translation for OData, falsy values of the special variable `$value`
  (that is used to provide nested annotations for scalar values) are correctly handled.
* When (new-style) csn is used as input, the compiler ignores unknown attributes.
* Implicit redirection and auto-exposure are now applied recursively, i.e. the associations
  of an auto-exposed entity are considered for implicit redirection and auto-exposure,
  if necessary.

Changes
* With `--new-csn`, consider `redirected to` on projected associations and
  adapt the `on` condition and the `keys` specification accordingly.  There are
  also Info messages if an element referred to in the `on` condition or `keys`
  specification has not been projected to the new association target.
  _The severity of these messages will be increased if implicit redirections
  will have been performed by the core compiler._
* `toHana` and `toSql` now reject entities that only contain unmanaged associations.
  Such entites would lead to a deployment error later.
* SQL name mapping modes `quoted` and `hdbcds` are only allowed when generating for HANA.
* In the csn, the csn language version is now stored in the top level attribute `$version`.
  The version information via `version.csn` is deprecated and will be removed in a future
  release. The information about the creator of the csn has been moved inside the new
  top level attribute `meta`.

Fixes
* Provide code completion for references in complex select item expressions not
  (yet) having an alias (complex = not consisting of just a reference).
* With `--new-csn`, avoid internal error while rewriting the `on` condition
  from an element of a source entity which refers to a `mixin` definition with
  an `on` condition containing a reference like `$projection.<elem>`.
* OData, edmx generation: correctly escape the characters `<`, `>`, `&`, and `"`.
* When an entity is auto-exposed, it's annotations are transferred to the generated
  projection.

## Version 1.6.0

Features
* Provide code completion for `using` declarations.
* Support the OData annotation vocabulary "Validation".
* For compositions in EDM, add `<OnDelete Action="Cascade"/>` to the navigation
  property where required.

Changes
* With `--new-csn`, complain more often about projected associations whose `on`
  condition could not be rewritten correctly.
* Make `associations: 'joins'` the default for `toSql` (because the default for
  `dialect` is already `sqlite`, which requires joins).
* Adapt the command line interface to use commands instead of the `--to...` generation
  options (e.g. `cdsc toHana --src --names plain` instead of `cdsc --toHana src,plain`).
  Please see the [Command Line Migration guide](doc/CommandLineMigration.md)
  for details.
* Add a `generated by cds-compiler version x.y.z` comment to all generated SQL and `hdbcds`
  sources.
* Replace the CSN validator (formerly `ajv`) with a new own implementation.

Fixes
* With `--new-csn`, do not change references to magic variables like `$user.id`
  while rewriting the `on` conditition of a projected association.
* Apply OData specific checks (e.g. that all elements of an entity must have a type)
  applied only to objects that are exposed in a service.
* When generating SQL for SQLite, replace the special variables `$now`, `$user.id`
  and `$user.locale` by `CURRENT_TIMESTAMP`, `'$user.id'`, and `'EN'`, respectively.
* Issue a warning for conflicting cardinality declarations (e.g. `association[1] to many ...`).
* Handle filters with cardinality correctly when translating associations to joins.
* Avoid crash when checking structured action parameters.
* Handle `$self` as the first of multiple path steps correctly in `toOdata`.
* In `toHana`, render the combination of enums and `type of` correctly.
* In mixins generated by `toHana`, handle special variables starting with `$` correctly.

## Version 1.5.0

Features
* The DDL statements in the output of `toSql` are now sorted according to kind
  (views after tables), so that they can be deployed sequentially to HANA (view
  dependencies not yet considered).
* (Still work in progress): The output of `toSql` now also contains kind-specific
  dictionaries for `hdbtable`, `hdbview` etc., which should be directly deployable
  to HDI.

Changes
* Element definitions in multiple entity/structure extensions are now sorted
  according to the layer hierarchy – elements from highest layers come last.
  Report such multiple extensions only if they are potentially problematic.
* The values for the `names` option of `toSql`, `toHana` and `toOdata` have
  been renamed: `flat` (default) is now `plain`, `deep` is now `quoted`. The old
  values are still accepted (with a warning) but **will be removed in a subsequent
  release**.

Fixes
* OData, annotation processing for v2: In a view where translation of analytical annotations
  is switched on, the annotations `@Common.Text`, `@Common.Label`, and
  `@Measures.ISOCurrency/@Measures.Unit` are now translated into the corresponding v2-style annotations
  `sap:label`, `sap:text`, and `sap:unit`, respectively, even if the value is a path or
  has a nested annotation.
* OData V2, generation of EDMX: The Parameters of a FunctionImport now always have
  an attribute `Nullable="true"` if not specified as `not null` in CDS.
* Produce better parentheses for nested set operations (`union`, `intersect`, ...) in views
  for SQL output.
* Correctly strip off the `enum` property of types for HANA CDS, even when derived types are
  involved.

## Version 1.4.0

Features
* OData, annotation processing: Provide a shortcut for the nesting of the `TextArrangement`
  annotation: In order to annotate a `@Common.Text` annotation, just put an annotation
  `@Common.TextArrangement` next to it.
* Parameters can now be referred to with `:param`, `:1` or `?` in the parse API functions.

Changes
* More checks for the correct usage of `$self` and associations as values in expressions.
* Backlink-Associations: When transforming an ON-condition `on $self = foo.bar`, check that
  the association `bar` really points to the entity enclosing association `foo`.
* Allow and transform multiple `$self`-comparisons in one association ON-condition
  (but a true backlink association still requires exactly one such comparison).
* Warn if a "to many" association or composition does not have an ON-condition
  (likely not intended because the resulting managed association will at most match a single
  item)

Fixes
* Add missing `as` for flattened structured elements.
* Allow `using cds;` to make the namespace `cds` explicitly known, which is
  useful if that had been shadowed by a namespace declaration ending with `cds`.
* OData: don't generate empty `<Annotations ...>` elements any more.
* Draft for OData v2: in the `DraftRoot` and `DraftNode` annotations, the path
  to the draft annotations now contains `EntityContainer`.
* Improved checks for parameters of actions and functions. Inappropriate warnings like
  "The type of input parameter ... must be from the current service" and
  "The action ... can only return an array of entities" don't appear any more.
* Correctly generate foreign key fields for associations in structured types.
* For `toHana()` and `toSql()`, enclose the artificial condition resulting from
  `$self`-comparisons in parentheses.
* Warn properly when draft-enabled artifacts are not exposed in a service.
* Do not render a full entity name for paths like `$self.foo` to SQL (just skip `$self`).

## Version 1.3.0

Features
* The `using` declaration can now appear top-level also after artifact definitions.
* Support for `$user.locale` and `$user.id` with HANA generation `SESSION_CONTEXT(…)`.
* For entities annotated with `@odata.draft.enabled`, the generated `DraftAdministrativeData`
  association for ODATA is now annotated with `@odata.contained: true` (avoiding the
  generation of an `<Attribute>` for its foreign key in ODATA V4).

Changes
* Having just `$user` in CDL is now rendered as `{ref:['$user','id'], as:'$user'}`
  in new-style CSN.
* Using SQL's parameter-less functions not having parentheses (like `current_date`)
  is now rendered as `{func:'current_date'}` in new-style CSN.
* `betaMode` is currently required for entities with parameters.
* In old-style CSN, the `on` condition as source text has been removed.
* Explicit redirection of an association to a target that is completely unrelated to
  the original target is now an error, not just a warning.
* The API function `toI18n()` and the corresponding command line option `--to-i18n` have
  been removed.
* Annotation assignments after sub structure definitions, enum definitions, and
  parameters are now considered an error instead of just a warning.
* For bound actions and functions, the name of the corresponding function import in
  OData v2 edmx is now prefixed with the name of the entity.

Fixes
* For ODATA V2, create correct `<Principal>` and `<Dependent>` for backlink associations
  having `@odata.navigable:false`.
* Avoid the `Expecting artifact to be part of a service` error that occurred when generating
  multiple entities with `@odata.draft.enabled` to SQL.
* Generate correct (fully qualified) action names into the `@Common.DraftRoot` and
  `@Common.DraftNode` annotations.
* When generating the `DRAFT.DraftAdministrativeData` entity for SQL, provide proper
  lengths for all `NVARCHAR` fields.

## Version 1.2.0

Features
* Provide semantic code completion for the `excluding` clause.
* Add support for "deep drafts", i.e. follow compositions from entities annotated
  with `@odata.draft.enabled` ("draft roots") and draft-enable them as "draft nodes".

Changes
* Finalize the propagation of the `key` property.
  Provide Info messages if it is not obvious why it has not been propagated.
* Finalize the propagation of the `keys` property and `items` property.
* Check for illegal use of `$self` and associations in expressions (may only occur
  as values in an expression as part of the ON-condition in a backlink association).

Fixes
* Produce warnings instead of errors in the translation of OData annotations.
* For ODATA, in case of managed associations to draft-enabled entities, do not add
  an extra foreign key for the ODATA-generated key field `IsActiveEntity`.
* For HANA, in the generated draft shadow entities, redirect all associations (not
  just compositions) so that they point to the draft shadow entities.
* For ODATA V2, produce an `<EntitySet>` for `DraftAdministrativeData`, too. Ignore
  the `@cds.odata.NoEntitySet` annotation.
* For ODATA V4, do not generate `<Nullable>` for `<NavigationProperty>`s that are
  collections.

## Version 1.1.3

Features
* A `;` is now always optional before `}` and more often optional after a `}`.

Changes
* In `toOdata()` for v2, in the edmx the
  **names of bound actions and functions now are prefixed with the corresponding entity's name**
  in order to disambiguate actions and functions with the same name at two or more entities.
  The corresponding implementation code in the CDS runtime needs to be adapted.
* Check `redirected to` target.

Fixes
* Make the compiler more robust wrt/ parse errors and redefinitions.
* Correctly propagate properties inside `returns` and `items`.
* Some corrections to EDM `ActionImport` and `FunctionImport` in ODATA V2 and V4.
* Generate correct joins for mixin associations that are traversed with different filters.
* Generate joins not only for views, but also for projections.
* For entities annotated with `@odata.draft.enabled`, make all non-key fields nullable in
  `toOdata()`.

## Version 1.1.2

Features
* Allow reserved names for annotations/properties in assignments.
* Allow final `,` for much more "lists" (e.g. arguments).
* It is now possible to omit the select list in a view definition,
  which is the same as writing `select from <name> {*}`.
* Allow `array of` as type spec for a parameter definition.
* SQL generation for sqlite now supports a mode where associations are resolved
  to joins.

Changes
* Improved messages for syntax errors.
* `where` now is a reserved keyword and so cannot be used anymore as name at many places.

Fixes
* In `toOdata()` with the `hdbcds` naming convention, the value of the `@cds.persistence.name`
  annotation now uses `.` rather than `_` as separator for the names of flattened structured
  entity elements.
* Numeric values in OData annotations are now correctly mapped to edmx.

## Version 1.1.1

Fixes
* Ignore unapplied extensions when generating HANA CDS source.
* Make sure the combination of `collectSources()` and `compileSources()` has the same
  effect as `compile()`, especially regarding annotation precedence.
* Render annotations of `edm:Schema` correctly in for ODATA V4.

## Version 1.1.0

Features
* Support `@odata.draft.enabled` without the need for option `{ betaMode: true }`).

Fixes
* Return result of `collectSources()` as promise.

## Version 1.0.33

Features
* Allow to extend query entites with actions.
* Allow `select distinct`.
* With `--tnt-flavor` only: allow to specify (a restricted version of) service include via syntax.
* (Work in progress): New option `{ dialect: 'hana'|'sqlite' }` for `toSql()`, allowing generation
  of SQL statements without HANA-specific constructs (e.g. without `WITH ASSOCIATION`).
* For ODATA V4, handle associations to parameterized entities correctly.
* Allow specifying `key` for projection elements (important in case of partial keys
  not being propagated, see below).
* Annotate entities and elements in the CSN with `@cds.persistence.name`, the name generated
  for the persistence layer according to the naming convention chosen (`flat`, `deep`, `hdbcds`).
* (Work in progress, only available with option `{ betaMode: true }`): Support `@odata.draft.enabled`
  with `toHana()`, `toOdata()` and `toSql()`. Only draft roots so far, no compositions.

Fixes
* Put table alias for `from` into CSN even without having it explicitly provided in CDL
  if necessary (the table has been referred via a `using` with alias).
* Do not assume a specific min cardinality if none was provided.
* For SQL, provide table aliases when required because of `flat` naming.
* Handle `@readonly` annotation correctly when applied to entities.
* Various fixes to the handling of `@odata.contained`.

Changes in the property propagation, see internalDoc/Propagation.md:
* Propagate properties along primary sources in includes, especially actions/functions.
* The propagation of `key` is more restrictive now, most notably:
  only if all keys are selected (selecting sub elements of a structured key is not enough),
  only if there is no navigation along a to-many association in a select item.
* The propagation of `notNull` has been corrected.
* The propagation of `virtual` has been corrected.
* The propagation of an array type has been corrected.

Other changes
* For ODATA, provide min cardinality 1 for non-null associations.
* Remove obsolete option `--check-model`. Instead, always perform all checks
  previously hidden behind that option, possibly resulting in more warnings
  (but not more errors).
* Actions and functions are no longer restricted to entities within services.

## Version 1.0.32

Features
* The `toHana()`, `toSql()` and `toRename()` backends now also support a naming
  convention that is backward compatible to HANA CDS, with option `{ names: 'hdbcds' }`.
* New API function `collectSources()` to conserve a set of compiled sources with
  its hierarchy relations.
* Avoid unnecessary quoting of names generated by `toHana()`, `toSql()` and `toRename()`.
* Implement handling of `@cds.persistence.table`.
* Support "term casts" in paths of ODATA annotations.
* Support the `@odata.contained` annotation.

Changes that only have an effect if the `--new-csn` option is set
* With `--disable-propagate`, produce CSN in `gensrc` flavor:
  + omit inferred elements and keys,
  + omit propagated properties (like annotation assignments),
  + supply annotation assignments on inferred and propagated members with an
    extra `annotate` statement in the model's `extensions` property if necessary.
* Without `--disable-propagate`, produce CSN in `client` flavor:
  + provide inferred elements and keys,
  + provide propagated properties (like annotation assignments),
  + supply annotation assignments directly with the inferred member.
* The `$inferred` property has been removed.
* Rename `foreignKeys` to `keys` for the keys to target elements of associations.
* Rename `filter` to `where` in `ref`s and omit the surrounding `{xpr:…}` of the condition.
* Do not render query `columns` if no columns have been provided (only implicit `*`).
* Render technical configuration correctly.
* Render `select distinct` correctly.
* Let also those backends that produce CSN as a by-product (e.g. `toHana()`, `toOdata()`, ...)
  produce new-style CSN if the `--new-csn` option is set.

Other changes
* The property propagation has been changed, except with `--tnt-flavor`.
  See internalDoc/Propagation.md, it is still work in progress.
* Remove the special handling of namespaces ending with `::`
* Sort the output of `toHana()` and `toCdl` (also within contexts and services).
* When `@cds.autoexpose` is set for entities that are already exposed, use the existing
  exposure for implicit redirection.

Fixes
* An `annotate` statement on an enum symbol now has the expected effect.
* Annotation `@cds.autoexposure` is renamed to `@cds.autoexpose` (like it is used in documentation)
* EDM `Nullable` and `Cardinality` now handled correctly for ODATA V2.
* Correctly check that elements must have a type for ODATA.
* Handle structured annotation assignments and `#`-variants correctly with `toCdl()`.
* For `toHana`, generate correct aliases for foreign key fields in views if the corresponding
  association has an alias.
* Do not propagate `@cds.persistence.table` and `@cds.persistence.exists`.
* Render artifact paths in `from` correctly with `toSql()`.
* In EDM, do not render `OpenType` and `Abstract` if they have default values.
* For EDM annotations, correctly set `Target` according to vocabulary's `AppliesTo`.
* In EDM, only set `Nullable=false` if `not null` was explicitly specified (i.e. not just for
  all keys).
* In EDM, handle entities with parameters correctly regarding the entity type that
  is generated for the parameters.

## Version 1.0.31

Features
* Support multiple imported names in `using` declaration:
  `using { foo.bar, this as that } from './othermodule';`
* Add new command line option `--to-rename`, generates SQL DDL statements
  renaming existing HANA tables for migration (work in progress, subject to
  change).
* For ODATA, allow backlink associations on unmanaged associations.

Changes
* New error for extending views (query entities) with new elements.
* Allow annotations of unknown artifacts - slightly change the name resolution
  in CDL for references in top-level `extend` and `annotate` statements.
* Make the client tool display info messages by default.
* Make keywords `new` and `aspect` to be non-reserved.  With this change, the set
  of reserved keywords of CDL is a real subset of the reserved keywords of SQL.
* Remove command line options and API functions deprecated with v1.0.24.
* In ODATA V2, reuse the `edm::Association` of the original association for backlink
  associations.

Fixes
* Miscellaneous fixes for CSN with option `--new-csn`.
* Avoid internal error by not running extra checks after compilation with error.
* Propagate defaults and `@odata.Type` annotations from keys to generated foreign
  key fields of associations.
* Do not render annotations of subqueries to HANA CDS.
* Suppress `$projection` in ON-conditions for ODATA.
* When looking for candidates for implicit redirection, follow `FROM` sources of
  views/projections and `:`-includes of entities transitively, not just for one level.
  (Please note that this fix **may uncover errors in existing models** where implicit
  redirection now fails because of multiple candidates. Use explicit redirection to
  resolve this to one of the candidates, as suggested in the error message).
* For ODATA and HANA CDS, recognize and transform backlink associations also if the
  condition is in (redundant) parentheses.
* For HANA CDS, replace enum literals in defaults by their values.
* Reject paths in defaults.

## Version 1.0.30

Features
* Complex queries (with joins, sub-selects etc.) are now supported.

Changes
* Both `toHana()` and `toSql()` now use `flat` names by default (specify
  options `{ names: 'deep' }` to get the old behavior). The CSN version
  currently starts with `0.1` for `flat` names, with `0.0` for `deep`.
  This is likely to be adapted again later.
* Using `Annotate` on unknown artifacts or members now only leads to an info
  message, not an error anymore.  The CSN with option `--new-csn` then has
  an `extensions` property containing the effective assignments.
* Downward compatibility for `@cds.odata.navigable` was finally removed
  (see 1.0.11, use `@odata.navigable` instead).

Fixes
* Render table aliases correctly for HANA CDS when an entity is used in
  `from` that is aliased by a `using` declaration.

## Version 1.0.29

Features
* Support the generation of multiple services with `--to-swagger`.
* Support `SELECT DISTINCT`.

Changes
* Improve smart wildcard handling: simple projections with just redirections now
  have the original element order of the source.
* Restrict `limit` and `offset` value to number (and `null`).
* There is a warning for `key` elements outside entities or views, as an inner
  `key` specification would be ignored for implicit foreign keys and propagation.
* Change propagation of the `key` property: see internalDoc/Propagation.md. Most
  notably, in a view/projection the `key` property is no longer propagated along
  association navigation.

Fixes
* Entities that contain only virtual elements or are empty (recursively) are
  now rejected for HANA CDS, unless they are abstract (was only partly checked before).
* Multiply nested structs in views or projections are now correctly rendered to
  HANA CDS (avoiding a completely unrelated error message complaining about
  extensions).

## Version 1.0.28

Features
* The mapping of cds to edm types can be overridden by the annotations
  `@odata.Type` and `@odata.MaxLength`. Currently only `Edm.String` can
  be used as target type. This is intended for exceptional cases, where
  the standard type mapping is not wanted (e.g. if `UUID` should be mapped
  to `Edm.String` rather than `Edm.Guid`).

Fixes
* Issue an error, if an association element that is defined in a mixin of the
  same view is explicitly redirected. Up to now this modeling error was not
  recognized and led to the generation of incorrect HANA CDS models.
* We now also allow query entities and their elements to use as type, relaxing
  a check introduces with v1.0.26.
  It needs to be seen whether we allow entites as type only for actions.

## Version 1.0.27

Changes
* The `implemented in` clause of entity definitions **has been removed** and will now
  cause a syntax error (this clause is obsolete since version 1.0.21, see corresponding
  changelog entry). Replace it by one of these annotations:
  + use `@cds.persistence.exists` to indicate that an object should not be
    created in the database because the database object already exists.
  + use `@cds.persistence.skip` to indicate that an object should not be
    created in the database because it is implemented in the service layer.

## Version 1.0.26

Features
* For annotation assignments outside array values,
  allow paths and variants, not just identifiers as keys in structure values.

Changes
* In `flat` mode, the `toHana` channel will reject quoted identifiers in definitions.
* Smart `*`: just issue a warning if a select item "overwrites" an element
  coming from the wildcard.  Might even be downgraded to an Info message in the future.
* Artifact references are checked for plausibility:
  only allow entities as association and composition target and
  for the `select from` clause (allow to navigate along associations there, too),
  only allow (non-query) structures for structure includes,
  only allow types (and entities) and their elements as types.
* Implicit redirection of associations is now also performed for HANA CDS (as it was
  already for ODATA).

Fixes
* IDE support: improve syntactic code completion, and messages for parse errors.
* OData: correctly escape special xml characters in generated edmx.

## Version 1.0.25

Changes
* Better command line error reporting for `cdsc`.

Fixes
* Render anonymous structured types correctly to HANA CDS (no `:`).
* Handle structured elements with aliases in views and projections correctly.
* Flatten structured view elements for ODATA (like for HANA CDS).

## Version 1.0.24

Features
* The `toHana()` channel now also supports the option flag `toHana.names:'flat'`.
  This option affects how the names of database objects and their columns are built.
  This option **will become the default in one of the next versions**.
  The old behavior can then be enforced with option flag `toHana.names:'deep'`.
  With option flag `flat`, ...
  + all names are converted to uppercase
  + in object names, `_` is used as separator instead of `.`

Changes
* The new command line tool `cdsc` is going to replace the old `cdsv`, which is deprecated **and will
  be removed soon**. Please see the [Command Line Migration guide](doc/CommandLineMigration.md)
  for details.
* New API "backend" functions (i.e. those that generate output from a CSN model) are going to replace
  the existing ones. The old API functions `toHanaCdl`, `forHana`, `toOdataOutput`, `exportAnnotations`,
  `exportAnnosUi5Style` and `toSqlDdl`, are deprecated **and will be removed soon**. Please see the
  [API Migration guide](doc/ApiMigration.md) for details.
* ODATA JSON output can no longer be generated for V2 (there is no valid V2 JSON format).
* When generating the CSDL JSON for OData v4, enum values now have an additional attribute `$EnumMember@odata.type`.
  This addition reflects an amendment of the specification of CSDL JSON.

Fixes
* Do not try to find table aliases for references consisting of a single identifier,
  i.e., a column named `x` in the select list is also found
  if the table alias or the table itself has been named `x`, too.
* Fix unjustified message about a undefined reference in `mixin` definitions
  when a reference starting with `$projection` accesses
  a nested element or an element which has been added to the query via `*`.
* Check that ON-conditions of unmanaged associations do not traverse other unmanaged associations.
* When generating EDM, ignore aliased elements in ON conditions of redirected associations.
* Guarantee a deterministic artifact processing order even if async calls are involved.
* When generating edmx for OData v2, referential constraints for entities with multi-part keys
  are now correctly rendered.

## Version 1.0.23

Changes
* When generating for Swagger, handle TNT-specific features more gracefully.

## Version 1.0.22

Fixes
* IDE support: improve syntactic code completion, and messages for parse errors.
* Fix behavior of `@cds.persistence.exists` for HANA CDS (generate correct `using`,
  avoid empty contexts).
* Strip `key` from structured type elements when generating for HANA CDS.

## Version 1.0.21

Changes
* The CSN element property `notNull` is not inherited anymore
  if the `select`/`projection` items whose path refering the source element
  navigates along associations or compositions.
* Annotation assignments which are placed after the name of `context` or `service` definitions
  must now use the `@(...)` syntax variant if a value is supplied,
  the same restriction already applies for all other definitions.
  This new syntax restriction can be disabled with option `tntFlavor`, and
  re-enabled with its new sub option `skipSloppyAnnoAssignments`.
* The syntax `implemented in` is deprecated. It is replaced by two new annotations:
  + use `@cds.persistence.exists` to indicate that an object should not be
    created in the database because the database object already exists.
  + use `@cds.persistence.skip` to indicate that an object should not be
    created in the database because it is implemented in the service layer.
* The shortcut for the value list annotation has been simplified, you now can just type
  `@Common.ValueList.entity:'SomeValueList'`

Fixes
* IDE support: improve semantic code completion.
* Self-associations are now handled correctly in the ODATA generation.

## Version 1.0.20

Features
* For Swagger, one parameter of an action or function can now be selected to become
  the request body, by annotating it with `@Swagger.parameter: 'requestBody'`.
* The shortcut for value help annotation `@Common.ValueList:{ type:#fixed, entity:'SomeValueList' }`
  is now generally available.
* For associations in ODATA that have targets outside the service, projection-like views
  are now also considered as implicit redirection targets (not just projections).

Fixes
* Type properties like `length` are now omitted when generating an ODATA property `Edm.Stream`.
* Nested annotations for ODATA are now handled correctly.
* The transformation of backlink associations for HANA CDS is now more robust against
  artifact processing order.

## Version 1.0.19

Changes
* Allow aliases in projections for HANA CDS (although not 100% watertight in all cases).

Features
* Entities annotated with `@cds.autoexposure` are now automatically exposed in a service
  (by means of a full projection) when they are used as association targets
  within that service.

Fixes
* The `$user` variable is now correctly expanded to `SESSION_CONTEXT('XS_APPLICATIONUSER')`,
  with only one underscore.
* The `--check-model` option is now more robust against the order of artifacts in the
  model.
* Enum types are now always reduced to their base type for HANA CDS.
* Options given to the compiler or one of the post-processing functions are now always
  handed down together with the model.
* The query clauses `LIMIT` and `OFFSET` are now really enabled (were accidentally still
  left in beta).

## Version 1.0.18

Changes
* Compiler now complains if an entity exposed for ODATA has an element without a type.
* View and projection elements in CSN now always have a `value` property (possibly
  with a path).

Features
* For ODATA, now also the annotations from the Analytics vocabulary are translated.

Fixes
* Workaround for a HANA CDS issue: When providing `LargeString` or `LargeBinary` as
  explicit type for a view element, HANA CDS runs into an error during the deployment
  of the generated HANA CDS (fix pending). This error can be prevented by annotating
  the corresponding elements in CDX with `@cds.workaround.noExplicitTypeForHANA`.
* `not null` at a managed association is no longer added to the corresponding
  unmanaged association in HANA CDS, but only to the foreign keys.
* When a redirected association is used as a view element, the select item for the
  corresponding MIXIN is now correctly rendered for HANA CDS and CDL (accidentally had
  an explicit association type).
* MIXINs that are explicitly added to views are now correctly generated for HANA CDS
  (were accidentally duplicated).
* Do not complain about `@Core.MediaType` for key-less entities.

## Version 1.0.17

Changes
* Correct license in `package.json`
* `toSwagger` takes in mind only artifacts from services

Fixes
* Handle type `cds.UUID` correctly when generating SQL.
* Handle associations in GROUP BY and ORDER BY correctly when generating HANA CDS.
* When generating MIXINs for associations in HANA CDS views, use an alias to avoid
  conflicts with association usage in the SELECT.
* Wrap bound action and function definitions in an array when generating EDMX.

## Version 1.0.16

Changes
* Allow artifacts to be defined in namespace `cds.foundation`.

Features
* Support the remaining query clauses `group by`, `having`, `order by`
  (with optional `asc`/`desc` and optional `nulls first`/`nulls last`),
  and `limit` (with optional `offset`).
* Support the magic variables `$now` and `$user`.

Fixes
* Complain about artifact extensions inside context/service extensions.
* For ODATA, add a `$Partner` attribute to `edm:NavigationProperty` when
  appropriate for bi-directional asociations.

There is a [new document](doc/ErrorMessages.md) which explains some error messages
(more messages will be added in the future).

## Version 1.0.15

Changes
* More checks for correct ODATA input (element names, keys, ...).

Features
* Allow `redirected to` in `select` items of views.
* Support the `@Core.MediaType` annotation for ODATA.

Fixes
* Correct bug in the calculation of the `_finalType`,
  which could lead to an internal error within the `odata` backend.
* Properly resolve filter conditions in the `from` clause of `select`,
  as we do in value expressions/conditions.
* Translate associations and filters in `FROM` correctly to HANA CDS.
* Avoid error with `undefined` when checking annotations with structs in arrays.
* Provide correct defaults for `$Nullable` in ODATA V4.

## Version 1.0.14

Changes
* Preserve the `key` properties of elements selected in a view (like we do in projections).
* Improve the CSN representation for views.
  Represent the `where` and `on` condition of `select`s like other conditions.
* Project name in github is now `cap/cds-compiler`.

Features
* Support `select *` in views.
* First version of transformation into OpenAPI json with `--to-swagger` option, more about it [here](doc/toSwagger.md)

Fixes
* Resolve the `on` condition for associations defined in the `mixin` clause of a `select`.
* Produce correct `using` directives with `--to-hana` for artifacts with `implemented in`.
* Handle mixins and expression elements in views correctly with `--to-hana`.
* Improve annotation assigment checks with `--check-model`.
* Check that type declarations for ODATA do not contain anonymous struct types.

## Version 1.0.13

Changes
* Rename project from `@sap/cdsv` to `@sap/cds-compiler`. Note that you will likely
  __need to adapt your `package.json`__ because of that.
* Check that no sub-`select`s are used in expression and conditions
  (currently: path filters and `on`-conditions of unmanaged associations);
  in views, they are only allowed with option `--beta-mode`.

Features
* Support the `mixin` clause in `select`s (to add unmanaged associations to a `view`).
* Support extending `enum` types (and elements where the `enum` type has been
  defined in-place), and annotating existing enum symbols.

Fixes
* Recognize function calls without parentheses (like `current_data`)
  in all expressions and conditions (not just in `select` items and the `where` condition).
* Make layer computation respect all `using from`-dependencies.
* Make the compiler more robust regarding incomplete/unexpected sources.
* During annotation propagation in the ODATA preprocessing, handle overwriting of
  annotations correctly.
* Fix foreign key checks with `--toHana`.
* The key generated for analytical views now has the name `ID__`.

## Version 1.0.12

Changes
* The `--odata-and-hana-output` no longer contains the plain compiled CSN but the result
  of the ODATA-specific preprocessing step. Dito for the API function `cdsv.toOdataOutput`.

Features
* For analytical views (those annotated with `@Aggregation.ApplySupported.PropertyRestrictions`),
  transform keys appropriately.

Fixes
* Views are now handled like projections by `--toHana` (regarding struct flattening and
  transformation of association-typed elements into mixins).

## Version 1.0.11

Changes
* Check that user code does not define artifacts in namespace `cds`.
* It is an error to have two assignment for the same annotation on the same artifact/member
  in the same file/layer (see Features below),
  even if one is via `extend` and the other via `annotate`
  (both still overwrite assignments provided with a definition).

Features
* Allow arbitrary expressions and comparison operators in ON-condition of unmanaged associations
  (note: in EDMX, SQL functions that are called without parentheses like `CURRENT_DATE` are not yet supported)
* Annotation assignments are now _layer_-aware:
  an annotation assignment in file _A_ overwrites a annotation assignment in file _B_
  if file _A_ directly or indirectly depends (via `using…from`) on file _B_, but not the other way round.
* New syntax variant `using from '<module>'` (without an artifact name)
  to just add `<module>` to the model (and introduce a dependency between the two files).

Fixes
* Reintroduced attribute `nullable` for function import parameters in edmx generation for OData V2
* Better handling of paths for `--to-hana` in views and projections by using aliases.
* SQL functions without parentheses (like `CURRENT_DATE` etc.) now correctly rendered with `--to-hana`.
* TNT only: Handle `@odata.navigable` like `@cds.odata.navigable`

## Version 1.0.10

Changes
* When using the command line tool to generate edmx files, the file names have changed:
  + the file name now contains the exact service name (dots are preserved and no longer replaced by underscore)
  + suffix `default` has been removed
* Removed obsolete command line options `--old-cdl` and `--new-cdl`

Features
* Backlink associations now also work for unmanaged associations
* Support for `WHERE` condition in views

Fixes
* Views are now rendered as EntitySet/EntityType in edmx
* Abstract entites do not appear as EntitySet/EntityType in the generated edmx
* `--to-hana` now correctly handles type casts in view definitions
* In the generated edmx for OData V2, inside a `ReferentialConstraint`, the elements `Dependent` and `Principal` now have the correct order
* Remove attribute `nullable` for function import parameters in edmx generation for OData V2

## Version 1.0.9

Changes
* With `--to-hana` the `$self` identifier is replaced by the absolute name of the
  current artifact, when it is part of a path.
* TNT only: Remove obsolete skip options, add new skip options for remaining special cases.
* Check that non-abstract entities must have a key for ODATA.

Features
* (experimental) Introduce shortcut for the value help annotation: `@Common.ValueList:{ type:#fixed, entity:'DeliveryStatus' }`

Fixes
* Also consider annotations of bound actions in the edmx generation.
* Detect illegal cycles with managed associations.
* Remove `key` property from a managed association which is transformed into an unmanaged one.
* Do not swallow `key` in select items of views.
* Handle backlink associations correctly in projections and structs.
* For HANA and ODATA, correctly flatten paths starting within structs.
* With `--export-annotations`, also export view annotations.
* For nullable keys, let corresponding association foreign keys be nullable, too.
* Handle implicit redirections within structs correctly
* Render included (inherited) types and projections with `implemented in` correctly with `--cdl-output`

## Version 1.0.8

Changes
* The `namespace` declaration now constructs a `.`-connected namespace,
  use (final) `::` to construct a `::`-connected namespace.
  The `nameprefix` declaration is considered obsolete (and leads to a warning).
* Non-context/service artifacts cannot be named like a namespace.
* New implementation of `--to-hana`, `--cdl-output` and `--odata-and-hana-output`
  produces one `hdbcds` file per top-level artifact (instead of trying to emulate
  the input source structure). Old implementation can still be used by specifying
  `--old-cdl` (will be __removed in next version__).

Features
* Allow path when defining new artifacts.
  You can refer to a namespace in a `using` declaration`.
* Support simple single-source views, which can have expressions in select items
* With option `--beta-mode`, support multi-source views without `union` and `join` -
  work in progress.
* Support more expressions: Path filters, `case`, `is null`, `not`, parentheses,
  unary `-`, quantifiers (`any`, `all`, ...), `between`, `like`, SQL functions.
* Allow CDL files without definitions or extensions.
* Initial support for semantic code completion.
* Annotation assignments can be written at more places (consistently).
* Support structured elements in entities (flattened for ODATA and HANA CDS).
* Support backlink associations for `--to-hana` and `--odata-and-hana-output`

Fixes
* All redefinitions in a source now lead to an error message.
* Always do `--to-hana` checks when necessary.
* With the new implementation, `--to-hana`, `--cdl-output` and `--odata-and-hana-output`
  now handle namespaces, `using` aliases, associations in projections,
  enums in entities, default values, strings without length, structured types,
  managed associations and quoted identifiers correctly.
* Keys can now have the attribute `null` (unless generating for HANA, which does not
  support that)
* Correctly determine multiplicity for backlink associations.

## Version 1.0.7

Features
* Support for analytical annotations in ODATA V2
* Deprecated`Common.FilterExpressionRestrictions` in favor of `Capabilities.FilterRestrictions.FilterExpressionRestrictions`
* `--to-hana`: Transform managed associations to unmanaged associations (with foreign key fields generated with `_` and
  appropriate ON-conditions). Please note that this __results in different field names on generated HANA tables__.

Fixes
* Handle annotations `@Analytics.Measures`  and `@Semantics.*` annotations correctly
* Check that services and contexts are not illegally nested

## Version 1.0.6

Features
* Support for the `from` clause of the `using` declaration, see [the README file](README.md#using-from).

Fixes
* EDMX generation for annotations: if an annotation value is an expression that is not a CDS path,
  dots are no longer replaced by slashes
* `--to-hana`: Handle the target of associations inside views with mixins correctly, when `redirected to` is used
* Handle enums and structured types correctly in ODATA transformation
* TNT only: Apply implicit redirection also to CSN output of ODATA translation
* TNT only: Fix options `skipGeneratedFKsWithout_` and `skipAssociationSetsWithTo`

## Version 1.0.5

Fixes
* Added new dependency on npm module "resolver" to npm-shrinkwrap.json

## Version 1.0.4

Features
* Support for function `SESSION_CONTEXT` in the on ON-condition of unmanaged associations
* The keyword `annotate` can be used to annotate actions and functions
* Annotation translation mechanism works for annotations at actions/functions and their parameters
* Error messages that refer to csn files as input have position information

## Version 1.0.3

Features
* Automatic redirection of associations: When a service contains a projection on an entity with an association
  with a target that is not part of the service, the association is now automatically redirected to a corresponding
  entity/projection in the service, if this new target can be determined uniquely (via following projections or includes)
* `--to-hana`: now correctly handles elements of type `Composition`, they are translated to `Association`
* Support for annotation `@odata.etag` for enabling optimistic concurrency handling in the (v2) OData provider
* Support for managed associations as foreign keys of managed associations

Fixes
* Generated foreign key elements are now correctly marked as `key` if their association is a key element

Other
* Removed the message "compiled successfully"
* A `service` can now be extended by `extend service` instead of `extend context`
  (the latter still works, but __might lead to a compiler warning in the future__)

## Version 1.0.3-RC3

Fixes
* Disable EDMX schema aliases again (apparently, not all consumers can properly digest them)
* TNT-specific `@extends`: Multiple services exposing the same inherited context with different redirections

## Version 1.0.3-RC2

Features
* Support for `virtual` elements
* More semantic checks for actions, functions and managed associations
* Generation of CSDL JSON (work in progress)

Fixes
* CDS annotations with "inline CSDL JSON" now also support `$LabeledElement`
* Version number now consistent with suffix like `-RC2` in all places
* EDMX schema aliases now use last part of service name (no dots allowed)

## Version 1.0.3-RC1

Features
* Command line parameter `--new-odata' is deprecated and has no effect any more (it is ignored).
  Providing this parameter __will lead to an error in future versions__, so please don't use it anymore
* New command line parameter `--odata-preprocessing`: For internal testing only (displays intermediate CSN).
* CSN now contains a `version` attribute (no strict semantic versioning yet, though)
* Allow "inline CSDL JSON" attributes to be transported through CSN to EDM annotations (still limited to a few use cases)
* Allow managed associations with `--to-hana` (work in progress)
* More semantic checks for actions and functions
* Support for multiple services in one model. This results in changes to the return value of `cdsv.toOdataOutput` resp. `toTntSpecificOutput`.
  EDMX results (metadata and annotations) are now provided per-service in a dictionary `services`. For backward compatibility, the old return
  value attributes are additionally provided if there is only one service. This __will be abandoned in future versions__.
* Support for entities with parameters in EDMX

Fixes
* Fiori annotation translation for OData v2: Correctly set xmlns attribute for EntitySet annotations
* EDMX generation for actions/functions: Correctly set attribute `EntitySet` in `FunctionImport` or `ActionImport` if the return type is entity or array of entity
* TNT-specific: Ignore annotation "CoreModel" in the translation to EDMX
* Various fixes for ReferentialConstraints in EDMX

## Version 1.0.2

Features
* `implemented in <id>`: Allow wider range of identifier; using `calcview` as identifier is deprecated and __will lead to an error in one of the next versions__,
  please
change to another identifier
* Allow literals in ON-condition of unmanaged associations
* Name resolution in association definition

Fixes
* Alerts are now sent to `stderr`
* Correct rendering of type `Time` in EDMX v2

## Version 1.0.1-MS1

Features
* New implementation of name resolution (according to [spec](doc/NameResolution.md)
* Support for bound and unbound actions and functions
* More semantic checks
* Support for `implemented in` (HANA)
* EDMX generation now also for ODATA V4

Fixes
* `skip` options of TNT-flavor now working correctly (TNT only)
* Fixed bug affecting elements called `items` (TNT only)
* Correctly handle `TypeDefinition` in annotations EDMX

## Version 1.0.0-MS9

Features
* Support for bound functions
* EDMX annotations: Support pseudo-nested annotations, multiple enum values
* New option `--export-annos-ui5-style` for localized annotations

Fixes
* Various fixes for annotation assignment checks
* HANA CDS output now with source files like original (fixes issues with `using`)
* Fixed multiplicity for EDMX V2
* EDMX output: Reject ON-conditions that cannot be expressed in EDMX, reject structured elements, allow service-less input
* EDMX annotation generation: More checks, better error messages
* Compiler: Better handling of errors on top of errors

## Version 1.0.0-MS8

Features
* First primitive type checks with '--check-model'

Fixes
* TNT-specific: It is in fact `@com.sap.gtt.core.CoreModel.Indexable` that should not be propagated

## Version 1.0.0-MS7

Fixes
* Render view target paths in HANA CDS output like in original source
* Various fixes for EDMX generation (XML namespace headers, `EntitySet`, `EntityType`, multiplicity, ...)
* Structured elements in projections not yet supported for `--to-hana`

Features
* TNT-specific: Do not propagate `@CoreModel.Indexable`
* New primitive datatype `UUID`
* New option `--check-model` (work in progress, starting with annotations)
* Option `--odata-and-hana-output` now also produces combined V4 EDMX file

## Version 1.0.0-MS6

Fixes
* Really do not use plural form of entity names anywhere in ODATA
* Properly complain about (most) incomplete/unsupported features

## Version 1.0.0-MS5

Fixes
* Use all `using` declarations for HANA CDS
* Do not use plural form of entity names for EntitySet in ODATA

## Version 1.0.0-MS4

Features
* Allow multiple `ReferentialConstraint` nodes for ODATA (`--new-odata` only)
* Support `abstract`, `BaseType`, `TypeDefinition` for ODATA (`--new-odata` only)
* Digest association `ON`-conditions properly
* Support default values for entity elements
* Allow projections with actions
* Support `implemented in` for entities
* Produce combined EDMX file, too (containing both metadata and annotations)
* Support `redirected to` for associations in projections
* Allow CSN files as compiler input

Fixes
* Preserve original order for elements and actions in EDMX
* Handle association cardinality properly for HANA CDS output
* New implementation of EDMX annotation processor
* Handle HANA-specific primitive types correctly (`LocalDate`, `UTCDateTime`, ...)

## Version 1.0.0-MS3

Delivery
* Now available as scoped module `@sap/cdsv`

Features
* New command line option `--odata-and-hana-output <dir>` to produce EDMX, HANA CDS and CSN output
* New command line option `--new-odata` to select the new ODATA backend implementation
* New command line option `--odatav4` to produce EDMX metadata with ODADA V4

## Version 1.0.0-MS2

Features:
* Allow property files as compiler input (for i18n)
* Support managed associations with explicit foreign keys (for ODATA)

Fixes:
* Improved automatic re-targeting of associations based on exposure
* Correct EDMX annotations for `Communication.Contact`
* Complete EDMX primitive type support
* Handle `one/many` cardinality correctly in HANA CDS output
* Provide complete type properties for projection elements
* Add `indexNo` also for action parameters
* Handle `self`-associations correctly in EDMX

## Version 1.0.0-MS1

Features:
* Allow multiple includes for entities

Miscellaneous:
* Improvements for delivery
* Cleanup of TNT-specific and not-yet-really-supported features

<!-- markdownlint-disable -->

## Version 0.0.5: Make cdsv usable for early adopters like TNT

Make TNT usage case work:
*   Produce special output for TNT: `annotations.xml`, `metadata.xml` and `csn.json`.
*   Add full TNT model, and smaller TNT examples as tests
    → produce same output as produced by prototype.
*   Adopt CSN format to a format expected by TNT (with option `--tnt-flavor`)

Extended functionality:
*   Support property files for internationalization (export and import).
*   Support generation of CDL (CDS language source) from CSN,
    with or without transformations to make it HANA-CDS compatible.
*   Started support to compile CSN files together with CDL files.

General compiler things:
*   Introduce options for (temporary) language variants: `--tnt-flavor`, `--hana-flavor`.
*   Support `extend` and `annotate`, and includes.
*   Support projections.
*   Support actions with their parameters.
*   Support annotation variants and all syntax variants for annotation assignments.
    Support propagation of annotation assignments.
*   Support all type expressions with potential errors.
*   Parse DCL constructs (no further processing yet).

Miscellaneous:
*   Provide `Promise`-less API.
*   Start with some (internal) documentation.
*   Much more tests.
*   Remove RND-inspired grammar.
*   Miscellaneous fixes and improvements.

## Version 0.0.4: Adapt ANTLR4 error strategy, use all HANA-CDS tests

Adapt ANTLR4 error strategy and related things:
*   Allow _unreserved keywords_ as identifier without listing them in error messages if an identifier is expected (but do list those which are to be matched as keywords!).
*   Match even _reserved keywords_ as identifier (with message in the future?) if there is no alternative.
*   Avoid excessive use of ANTLR's adaptive prediction, as it would slow down the parser
    (done in grammar, there is a test which ensure that it stays that way).
*   Proper `xmake` configuration to generate lexer and parser.
*   PEG.js-based parser is discontinued.

Use all HANA-CDS standalone tests:
*   Cover the complete HANA-CDS language.
    The main grammar use wildcards just for the `SERIES` and `TECHNICAL CONFIGURATION` section of entity definitions.
    (There is currently a second, much slower, grammar without wildcards, which is a one-to-one transformation of the RND grammar for HANA-CDS.)
*   Tests show completeness of parsing (except the wildcard use, see above),
    CSN-output equivalence (on specified parts) for 80% of the test cases.

## Version 0.0.3: ANTLR4-based Parser and Lexer

PEG.js-based parser still used by default, because it does not need Java to build.
Currently, we have a small ANTLR grammar in "final style",
and a full ANTLR grammar in "HANA-CDS style".

## Version 0.0.2: Define and Resolve – Augmented CSN

Functionality:

*   Multi-file support with `namespace`/`nameprefix` and `using` declarations
*   Context, entity, type, annotation, and element definitions
*   Types: builtin (also with parameters), derived, structure types
*   Unchecked annotation assignments (with absolute name calculation according to spec)
*   All values: null, bool, number, string and other quoted literals (`x`, `date`, `time`, `timestamp`),
    enum symbols, structure (top-level are flattened for annotation assignments) and arrays
*   "Define": merge source ASTs, set `name.absolute` and `_parent` links,
*   "Resolve" for main artifacts: set `type.absolute` and `_artifact` links
*   Dependency cycle detection with exact error positioning
*   Compact JSON: for "official" CSN and tests

Environment:

*   Integration with xmake
*   Checked accoding to our eslint rules
*   Full tests: invocation, negative, positive


## Version 0.0.1: Package Setup & Initial Grammar

Done:
*   `Promise` orchestration for asynchronous file processing,
*   avoid checking-in the generated parser,
*   proper whitespace handling in the grammar,
*   source location in AST, location includes filename
*   easy-to-use standard AST creation

Our **`Promise` orchestration** must support the intended error policy:
*   We do not mix error categories, e.g.,
    we do not output syntax/semantic errors in CDS files
    if the command invocation itself is wrong.
*   Inside one error category, we (intend to) list as many errors as possible,
    e.g. when two given files do not exist and another one is provided repeatedly,
    we report all these 3 errors at once.

We **do not include the generated parser**:
*   As we have no `npm publish` phase at the moment,
    we list the parser generator `pegjs` in `package.json`→`dependencies` and
    run the parser generation in `package.json`→`scripts/postinstall`.
*   If the product is published,
    we list the parser generator `pegjs` in `package.json`→`devDependencies` and
    run the parser generation in `package.json`→`scripts/prepublish`.

Parsers generated by [PEG.js](http://pegjs.org) are without tokenizer –
this looks cool at first, but leads to some problems:

*   Still open: Error reporting is less then ideal –
    if the intended top-level context definition start with `contxt`, you just see one char after `but`:
        Expected "context", … but "c" found.
    See the grammar for a potential future hack to cover at least the most common occurrences.
*   We always need to think about correct whitespace handling.
    See the initial comment in the grammar for details and common patterns. (_Solved_).
*   In rules ending with optional whitespaces,
    we need to adjust the end location – it should not include the final whitespaces!
    See the initial comment in the grammar for details. (_Solved_).

As an **alternative**, we could look at Antlr3.JavaScript, Antlr4.JavaScript, or RND.JavaScript.
