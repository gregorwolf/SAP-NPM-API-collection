# Changelog

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->
<!-- (no-duplicate-heading)-->

If you upgrade from a previous version, you might want to read in more detail about
incompatible [changes between v5 and v6](./doc/IncompatibleChanges_v6.md)
and [changes between v4 and v5](./doc/IncompatibleChanges_v5.md).

Note: while we list new `beta` flags and their removal in this ChangeLog,
we might not list every change in its behavior here.
Productive code should never require a `beta` flag to be set, and
might use a deprecated flag only for a limited period of time.

## Version 6.7.3 - 2026-02-11

### Fixed

- **sql:** do not resolve path navigations to virtual elements which resulted in an internal error.

## Version 6.7.2 - 2026-02-04

### Fixed

- **compiler:** Just issue warning for `using` declaration referring to nothing
  (fixes regression introduced with v6.7.0 if there is a file containing
  a `namespace` declaration, but no definitions)
- **effective:** clean up internal Symbols from meta section
- **sql:** clean up internal Symbols from meta section

## Version 6.7.1 - 2026-01-28

### Fixed

- compiler: Properly accept aspects as composition targets in an `extend`
  (fixes regression introduced with v6.7.0)

## Version 6.7.0 - 2026-01-23

### Added

- to.hdi: Support .hdbprojectionview for Data Product Production

### Changed

- compiler: Change internal processing sequence (extensions and entity generation) for
    potentially upcoming compiler features; messages for erroneous models might differ slightly

- for.odata/to.edm(x): Enhancements for Fiori Tree Views: support managed associations with explicit foreign keys,
    raise messages when the `@hierarchy` annotation cannot be applied.

### Fixed

- to.sql: portable hana functions `*_between` with dates


## Version 6.6.2 - 2026-01-16

### Fixed

- for.effective: Don't resolve backlinks in aspects

## Version 6.6.0 - 2025-12-12

### Added

- compiler:
  + Support for upcoming ESlint rules (by other team) for Fiori elements annotations.
  + Namespace `cds.dataproducts` is no longer reserved by the cds-compiler. It is used by the CAP @sap/cds-data-products plugin.
- for.odata/to.edm(x):
  + Enumeration symbols are now supported in annotation expression syntax.
  + For projections and views, the `@hierarchy` annotation now triggers generation of
    additional Fiori Tree View relevant annotations and fields.
- for.effective: First non-beta release.

### Changed

- `to.sql`: Annotating a foreign key of an association in a view with a sql-snippet annotation (e.g. `@sql.append`)
            now results in an error. This is the default behaviour for any element in a view.

### Fixed

- compiler:
  + Minor fixes for auto-redirections and recompilation with localized data
    in very rare situations when an aspect definition uses an entity as include.
  + Don't let “namespaces” prevent the compiler to generate texts/target entities.
- to.sql: Improve foreign key flattening for various edge cases.

## Version 6.5.2 - 2025-12-02

### Fixed

- to.sql|hdi:
  + Don't add superfluous (and actually wrong) parentheses around `UNION`s
  + Don't dump with a specific column expressions in the query after a `UNION`

## Version 6.5.0 - 2025-11-21

### Added

- compiler:
  + remove all special restrictions for references after an `exists` predicate
    (backends might introduce restrictions relevant for them)
  + support runtimes to improve draft handling (calc elements, column expressions)
- for.odata/to.edm(x):
  + `is (not) null` operator is now supported in annotation expressions
  + in OData version 2, all elements of the `DraftAdministrativeData` EntityType get
    the annotation `UI.HiddenFilter` with value `true`
  + artifacts annotated with `@cds.external: 2` are now processed by the OData backend
- to.sql:
  + the `exists` predicate can now be defined as a filter condition on the leaf of the `from` path
    i.e. `select from Books[exists author]` is equivalent to `select from Books where exists author`

### Changed

- compiler: report an error for an `annotate` on non-existent definitions
  with security-relevant annotations (`@restrict`, `@requires`, `@ams.…`)
- Update OData vocabularies: Capabilities, Common, Hierarchy

### Fixed

- compiler: make an annotation `@cds.autoexpose: false` on an aspect used as
  `Composition` target have the desired effect (similar on `cds.common.TextsAspect`)

## Version 6.4.6 - 2025-10-23

### Fixed

- compiler: a references to an element of the target in a filter for associations
  inside an annotation expression does not lead to a compiler message requesting
  users to provide the annotation themselves (regression with v6.4.4)

## Version 6.4.4 - 2025-10-15

### Fixed

- compiler:
  + properly rewrite references in arguments of associations in annotation expressions
  + a references to a variable (`$user.id`, …) in a filter of an annotation expression
    does not lead to a compiler message requesting users to provide the annotation themselves
  + improve code completion in annotation expressions: the editor can display valid names
    for references even if the expression does not properly end by `)`
- to.sql:
  + reject `$self` in infix filter following exists predicate instead of just ignoring the filter expression
  + properly add comparison for the `tenant` discriminator to the `join` condition of `localized` views
    if the non-published option for tenant support is set (regression with v6.4.0)

### Removed

## Version 6.4.2 - 2025-10-07

### Fixed

- parser:
  + improve error recovery with empty expression as annotation value
  + avoid clutter in message text for syntax errors: use `‹Value›` instead of listing value tokens
- compiler: fix suppression of warnings when annotating backend-generated things
  like draft entities or localized convenience views
- to.sql|hdi|hdbcds: don’t report unjustified errors when projecting structured elements and
  calculated elements had been used (regression with v6.4.0)

## Version 6.4.0 - 2025-09-26

### Added

- compiler: `annotate … with @extension.code: [..., 'additional code']` even works
  if no value for that annotation has been provided with the base definition.
- to.sql: Calculated elements can now be used next to (but not in) nested projections.
- to.edm(x): The `@cds.api.ignore` annotation can now be applied to actions, functions, and their parameters.

### Changed

- to.sql:
  + generation of localized convenience views now use the ON-condition of the `localized` element
    to create the FROM clause.

### Fixed

- parser: minor improvements in error reporting and error recovery
- to.sql:
  + columns selecting variables did not always get a column alias.
  + when excluding a structure, the SQL backend incorrectly emits `wildcard-excluding-one`.

## Version 6.3.6 - 2025-09-19

### Fixed

- to.sql: Topological ordering of views did not always account for subqueries (fixes regression from v5.9.0)

## Version 6.3.4 - 2025-09-11

### Fixed

- parser: Keep parentheses around lists on the right side of an `in` operator.
- compiler: For calculated elements using associations with filters and cardinality, CSN recompilation could
  fail for `gensrc` CSN, as happens for MTX.

## Version 6.3.2 - 2025-09-02

### Fixed

- to.sql: Fix internal inconsistency when handling nested projections.

## Version 6.3.0 - 2025-08-28

### Added

- compiler: Column casts can now use more modifiers such as `default` directly.
- for.odata/to.edm(x):
  + New option `draftUserDescription` is now available. It adds the fields `CreatedByUserDescription`,
    `LastChangedByUserDescription`, `InProcessByUserDescription` to the `DraftAdministrativeData` entity.
- to.sql:
  + Structures with only one element can now be compared to scalar values.
    This also applies to associations with only one foreign key.
  + `cds.UInt8` can now be used in SQL dialects "h2" and "postgres".
  + Managed associations can now be used in comparisons, e.g. `assoc = struct`.
  + Structures and managed associations with only one element can be compared with scalars, e.g. `struct = 1`.
  + In the draft use case, the `DRAFT.DraftAdministrativeData` entity now includes the following fields by default:
  `CreatedByUserDescription`, `LastChangedByUserDescription`, `InProcessByUserDescription`, and `DraftMessages`.

### Changed

- Update OData vocabularies: Common
- cdsc: EDMX output uses XML comments as service separators instead of `//`.
        If there is only one service, no header is printed, allowing piping the output to a file.
- to.sql: path expressions which end in a foreign key are now always optimized to use the element of the source side.

### Fixed

- compiler: Redirecting associations to non-query entities was fixed.
- to.sql/to.edm(x): References to associations can now be compared to other associations and structures.
- to.sql: Referencing a foreign key of an `@cds.persistence.skip` entity previously caused an
  error in queries. Now the foreign key in the source entity is resolved and rendered.

### Removed

- for.odata/to.edm(x): The `addAnnotationAddressViaNavigationPath` option has been removed. Its functionality is included in the `draftMessages` option.

## Version 6.2.2 - 2025-07-28

### Fixed

- compiler: `@extension.code` was accidentally restricted to non-expression values.

## Version 6.2.0 - 2025-07-25

### Added

- parser: CDL-casts in queries now support all type expressions, e.g. `field : many String not null`.
- compiler: Association paths in annotation expressions can now end with a filter, e.g. `@anno: (assoc[1=1])`.

### Changed

- compiler: Annotation `@extension.code` is no longer propagated.
- Update OData vocabularies: Common
- The list of CDL keywords was updated for the latest CDL grammar.
- to.cdl: Foreign keys of managed associations are only rendered explicitly if
  the compiler can't infer them when recompiled.
- cdsc: The command `parseCdl` was renamed to `parse`, since it also supports CSN input.

### Fixed

- compiler:
  + Calculated elements can now have a localized type.
  + Associations in sub-queries of an `order by` of a `UNION` are now redirected.

## Version 6.1.0 - 2025-06-27

### Added

- for.odata:
  + Introduce a new option `addAnnotationAddressViaNavigationPath` to annotate services
    containing draft-enabled entities with `@Common.AddressViaNavigationPath`.
  + Introduce a new option `draftMessages` that enhances the draft generation logic.

### Changed

- Update OData vocabularies: Capabilities, Common

### Fixed

- compiler: The ternary condition operator `…?…:…` is now right-associative as usual
  (in v5, chaining it like in `…?…:…?…:…` was not possible without parentheses).

## Version 6.0.14 - 2025-06-18

### Fixed

- to.sql: Fix error when calculated element refers to a localized element.
- to.edm(x): Correctly handle `PropertyPath` in a collection when using expressions as annotation values

## Version 6.0.12 - 2025-06-06

### Changed

- Update OData vocabularies: 'Common', 'Hierarchy'

### Fixed

- compiler: Fix artifact refs in annotated annotation expressions,
  i.e. the `Type` inside `annotate … with @SomeAnno: (cast( … as Type ))`.
- to.sql: Checks around managed associations for mocked entities have been relaxed.
- to.edm(x): Resolved a crash caused by references in annotation expressions that were not properly updated.

## Version 6.0.10 - 2025-05-28

### Fixed

- to.sql/to.hdi:
  + Fixed internal error for to-many associations without ON-condition in entities with `@cds.persistence.skip`.
- for.odata/to.edm(x):
  + In annotation expressions: enum references that have already been resolved by the compiler are
    correctly rendered to EDMX.

## Version 6.0.8 - 2025-05-23

### Changed

- License changed to "SAP DEVELOPER LICENSE AGREEMENT Version 3.2 CAP"
- Node 20 is now the minimum required version.
- Namespace `cds.core` is no longer reserved by the cds-compiler. It is used by the CAP runtimes.
- compiler:
  + Providing a filter for a function call now is a syntax error (was a warning before).
    Example: `count(*)[ uncheckedFilterRef > 0 ]`.
  + Providing a default value for an array-like action or function parameter is a syntax error now
    (was a warning  before). Example: `action A( par: many Integer default 42 )`.
  + Providing an annotation for an array-like element in the middle of a type expression is no longer allowed
    (was a warning before), as this leads to unexpected results. Example: `bar: many String null @anno enum { symbol };`.
    Fix this by moving the annotation out of the type expression, e.g. before the element name.
  + A simple query inside parentheses (e.g. `entity V as (select from E)`) is no longer
    represented as `set` in CSN. Repeated `order by` or `limit` clauses are no longer allowed
    (e.g. `entity V as ( select from E order by id ) order by id;`).
  + Defining an element or parameter as `not null default now` now is an error.
  + A virtual element can be defined in a view without providing a value or reference.

    ```cds
    entity V as select from E { virtual a } //defines new virtual element 'a'
    ```

    In this example, the compiler no longer tries to resolve the name of the virtual element as reference
    to an element of the view's data source.
  + If a select item selects an element of a virtual structure that itself is not explicitly marked as virtual,
    then the select item must be explicitly marked as virtual, too.
  + To-many associations without ON-condition no longer get a `keys` property, i.e. `Association to many Foo;` does not get
    any foreign keys.
  + Annotation `@cds.persistence.journal` is now propagated to generated entities, including `.texts` entities.
  + Doc comments are no longer propagated; use option `propagateDocComments: true` to propagate them again.
  + With CSN input, the compiler does not accept anymore type properties
    like `enum` in the `cast` property for the SQL function `cast` which were simply
    ignored by the SQL backend.  Remark: inside a direct `cast` property for select
    columns (CDL-style `cast`), these type properties are still allowed.
- to.sql/to.hdi:
  + Default for option `booleanEquality` is `true`, i.e. `!=` is rendered as `IS DISTINCT FROM`
    or a similar expression and therefore has boolean logic instead of three-valued logic.
  + To-many associations with neither an explicit foreign key list (i.e. without `keys`) nor an ON-condition
    are reported as errors.
  + For SAP HANA, CDS associations are by default no longer reflected in the respective database tables and views by
    native HANA Associations (HANA SQL clause `WITH ASSOCIATIONS`). They can be switched on via configuration
    `cds.sql.native_hana_associations: true`.
  + A set of OData and SAP HANA functions are translated to database-specific variants.
    See <https://cap.cloud.sap/docs/guides/databases#standard-database-functions>.
  + For SQL and HDI rendering, `$now` is no longer rendered as `CURRENT_TIMESTAMP`, but as
    a session variable `SESSION_CONTEXT('NOW')` for SAP HANA, `SESSION_CONTEXT('$now')`
    for SQLite, `@now` for H2, and `current_setting('cap.now')::timestamp` for Postgres.
    For `default` values, `CURRENT_TIMESTAMP` is kept, as `default` clauses only allow static expressions.
    To restore the old behavior, use option `dollarNowAsTimestamp: true`.
  + `count(*)` inside nested projections is rejected, as there is no proper representation in SQL
- to.cdl:
  + Nested definition rendering is now the default, i.e. definitions inside services are
    rendered in `service { … }`, instead of being rendered top-level using their absolute name.
  + `to.cdl` no longer returns an entry `namespace`, only `model`.
- for.odata/to.edm(x):
  + References to foreign keys in annotation expressions are now adjusted to directly
    reference the corresponding local foreign key element.
  + Annotating the generated `DraftAdministrativeData` artifacts and their elements is now supported.

### Added

- for.odata/to.edm(x):
  + Annotating the generated `DraftAdministrativeData` artifacts and their elements is now supported.
- beta flag `v7preview`: if set, the compiler reports those issues as errors
  which we consider severe enough to report as error with the v7 release.
- new `deprecated` flags (which can't be used together with beta flag):
  + If the deprecated flag `noQuasiVirtualAssocs` is set, managed to-many associations
    will get foreign keys as they got in compiler v5.  If not set, managed to-many associations
    without explicit foreign keys don't get `keys` anymore in  cds-compiler v6.
  + If the deprecated flag `noCompositionIncludes` is set, generated entities for compositions
    of named aspect will not get an `includes` property.
  + If the deprecated flag `noPersistenceJournalForGeneratedEntities` is set,
    `@cds.persistence.journal` will _not_ be propagated to generated entities,
    including generated `.texts` entities for localized entities, nor generated entities
    for managed compositions of aspects. If not set, this annotation is copied to those entities
    in compiler v6.

### Removed

- compiler:
  + The Antlr-based parser is removed.
  + Option `compositionIncludes` is removed, as its default is `true`; instead, a deprecated flag was added.
- to.hdbcds: The HDBCDS backend is deprecated and can no longer be invoked.
- beta feature `v6preview`
- deprecated flags `includesNonShadowedFirst`, `eagerPersistenceForGeneratedEntities` and
  `noKeyPropagationWithExpansions`

### Fixed

- to.edm(x): Fixed crash for rare case if annotation expressions were used.

## Version 5.9.12 - 2025-09-19

### Fixed

- to.sql: Topological ordering of views did not always account for subqueries (fixes regression from v5.9.0)

## Version 5.9.10 - 2025-09-11

### Fixed

- parser: Keep parentheses around lists on the right side of an `in` operator.
- compiler: For calculated elements using associations with filters and cardinality, CSN recompilation could
            fail for `gensrc` CSN, as happens for MTX.

## Version 5.9.8 - 2025-07-14

### Fixed

- compiler: Calculated elements can now have a localized type

## Version 5.9.6 - 2025-06-18

### Fixed

- to.sql: Fix error when calculated element refers to a localized element.
- to.edm(x):
  + Fix errors for service entities containing multiple path steps (e.g. `Service.Prefix.MyEntity`).
  + Support enum references in annotation expressions that were resolved by the compiler.

## Version 5.9.4 - 2025-05-22

### Fixed

- to.edm(x): Parameters are marked optional unless explicitly marked as `not null`.
  Annotation `Core.OptionalParameter` will be added to optional parameters.

## Version 5.9.2 - 2025-04-04

### Fixed

- to.edm(x): Revert addition of the attribute sap:filterable="false" to the NavigationProperty DraftAdministrativeData in OData V2

## Version 5.9.0 - 2025-03-28

### Added

- compiler:
  + Generated entities for compositions of named aspects now have an `include` on the named aspect,
    inheriting actions from the aspect.  This can be disabled via option `compositionIncludes: false`.
  + A warning is emitted for selected elements that are explicitly `virtual`, whose
    behavior will change in cds-compiler v6.
  + New warning for structures having a scalar default value.
  + New warning for localized structures, as they are not fully supported by the compiler.
  + The new parser (`newParser: true`) now supports operator `==`.
- to.cdl:
  + Definitions can now be rendered nested in services. A common namespace can be extracted, too.
    To use it, enabled options `renderCdlDefinitionNesting` and `renderCdlCommonNamespace`.
  + Annotation array values are pretty-printed to reduce whitespace.
- for.effective: Property `namespace` is no longer part of effective CSN.
- for.sql/hdi:
  + The new operator `==` is rendered as `IS NOT DISTINCT FROM` or an equivalent expression.
  + Using option `booleanEquality`, operator `!=` is rendered as `IS DISTINCT FROM` or an equivalent expression.

### Changed

- Update OData vocabularies: 'Common', 'Hierarchy'

### Fixed

- to.odata: Annotation expressions using `LabeledElement` were not correctly rendered into EDMX.

## Version 5.8.2 - 2025-03-07

### Fixed

- for.odata: Generate foreign key elements for events again.

## Version 5.8.0 - 2025-02-27

### Added

- Type definitions can now be projections on other types, i.e. `type Proj : projection on OtherType { elem }`.  
  Use it to create types based on other types, e.g. by selecting only certain elements.  
  Only available with the new parser (`newParser: true`)
- Analyze enum symbols like `#ENUM_SYMB` in all (sub) expressions and conditions.
  It can be validated if the compiler can deduce its `enum` type from its use context:
  + when the enum symbol is used as `default` value, `select` column expression,
    argument when navigating along an association to an entity with a parameter,
    or argument of a `cast` function call, or
  + when the enum symbol is compared to a reference or `cast` function call; we
    consider the operators `=`, `<>`, `!=`, `in`, `not in` and also analyze enum
    symbols as `when` operands if the `case` operand is a reference/`cast`.
  + We not only consider simple enum symbols, but also lists of enum symbols (on
    the right side of `in`/`not in`), and a `case … end` (sub) expression with
    enum symbols after the `then`s and/or the `else`.
  + An enum symbol can be validated if the deduced type is a direct or indirect
    `enum` type, or an managed association with one foreign key having an `enum` type.
  + For the effects in the compiler, IDE and backends, see the changelog entry for v5.7.0.
    Hint: the deprecated hdbcds backend does not support enum symbols.
  + Remark: the support for enum symbols used as annotation values is still limited.
- to.sql.migration: Allow extending `precision` of `cds.Decimal` and allow extending
  `scale` if `precision` is increased by at least the same amount.
- to.edm(x): `@assert.range` now supports "exclusive" values by writing values
  in parentheses such as `[ (1), (2) ]`, as well as "infinite" by using `[ _, _ ]`.
- for.odata/to.edm(x)/for.seal: Propagate annotation expressions from managed associations
  to the foreign keys
- beta feature `v6preview`: if set, the compiler reports those issues as errors
  which we consider severe enough to report as error with the v6 release.

### Changed

- Top-level CSN property `csnInteropEffective` is ignored and no longer warned about.
- Update OData vocabularies: 'Analytics', 'Common', 'Hierarchy', 'UI'

### Fixed

- New CDL parser: parse all entity definitions using `projection on` without a
  terminating `;` if they had been accepted by the old parser, i.e. for compatibility,
  we gave up the idea of removing the existing special handling in this case.
- Old and new parser: issue a warning for an ignored filter on the result
  of a function or method call.
- CSN annotation expressions with value `true` for `=` were not checked.
- Annotation `@Core.Computed` was not set for select items that are paths into structured parameters.
- Annotation expression path rewriting has been improved.
  + Paths on foreign keys are rewritten.
- for.seal:
  + References into structured parameters were incorrectly flattened.
  + Set `@cds.persistence.name` only on persistence-relevant things.

## Version 5.7.4 - 2025-02-05

### Fixed

- New CDL Parser (option `newParser: true`)
  + Improve code completion
  + Fix further edge cases in error recovery


## Version 5.7.2 - 2025-01-30

### Fixed

- Fix edge case in error recovery of the new CDL parser (option `newParser: true`)


## Version 5.7.0 - 2025-01-24

### Added

- Analyze enum symbols like `#ENUM_SYMB`; support starts at the following places:
  + used as sole `default` value or `select` column expression
    if the element/column has a specified enum type, or
  + used as sole value (in parentheses) of an annotation assignment
    if there is a definition for that annotation having an enum type;
  + effects in compiler: complain if enum symbol is undefined
  + effects in the IDE with an upcoming version of cds-lsp when compiler option `newParser` is set:
    offer code completion and hover information,
  + effects in backends like `to.sql` (and potentially runtimes): enum symbol
    is replaced by corresponding string/integer value when appropriate.
- for.seal: Process foreign key annotations similar to to.edm(x)

### Changed

- CDL parser: it is now recommended to set the option `newParser` to make the compiler
  use a CDL parser with a significantly smaller footprint (among other things).
  New features might only work if this option is set, see above.

### Fixed

- CDL parser: doc comment parser was susceptible to ReDos
- to.sql/hdi: Paths inside calculated elements that are simple functions were not properly rewritten.
- for.odata: Re-add foreign keys in property `targetAspect` in the OData CSN.
- to.edm(x): In annotation translation, by default map `SemanticObjectMappingAbstract` to `SemanticObjectMappingType` to avoid regressions.
- to.cdl: Fix quoting of identifier `many` in `Composition of`/`Association to`
- for.seal: Allow annotation paths to end in `many`-elements, not just scalar, like we allow in for.odata

## Version 5.6.0 - 2024-12-12

### Added

- Allow to refer to draft state element `HasActiveEntity` and `HasDraftEntity` via variable `$draft` in annotation path expressions.
- for.odata|to.edm(x): Introduce annotating the generated foreign keys

### Changed

- Update OData vocabularies: 'Common', 'EntityRelationship', 'UI'

## Version 5.5.2 - 2024-12-02

### Fixed

- to.hdi|sql|edm[x]: Correctly handle `cds.Map`, ensure that it does not have `.elements` yet.

## Version 5.5.0 - 2024-11-22

### Added

- CDL parser: when the new experimental option `newParser` is used, the compiler
  uses a CDL parser with a significantly smaller footprint (among other things).
- to.sql|hdi.migration: For SAP HANA, render `ALTER` statements as one big statement to improve performance.
- to.sql.migration: Give more helpful comments when using option `script`.

### Changed

- Update OData vocabularies: 'Common', 'PersonalData', 'UI'.

## Version 5.4.4 - 2024-11-14

### Fixed

- Re-allow referring to mixins (and table aliases) in added columns
- Re-add foreign keys of named aspects to the OData CSN.


## Version 5.4.2 - 2024-11-06

### Fixed

- to.sql: For SQLite, map `cds.Map` to `JSON_TEXT` to ensure text affinity.

## Version 5.4.0 - 2024-10-24

### Added

- to.edm(x): `cds.Map` as empty open complex type with name `cds_Map` or if the definition
  has been assigned `@open: false` as empty closed complex type `cds_Map_closed` in OData V4.

### Changed

- Update OData vocabularies: 'Capabilities', 'Common', 'Core', 'PersonalData', 'PDF', 'UI'.
- to.cdl: Identifiers using non-ASCII unicode characters, as introduced in v4.4.0, are no longer quoted.
- For propagated expressions as annotation values, the `=` is changed as well, if it is a simple identifier.

### Fixed

- compiler: Some invalid CDL snippets could crash the parser and compiler.
- to.edm(x): OData V2: `Core.Links` watermark annotation has a `xmlns` attribute now.
- for.seal: Remove unapplied extensions from CSN.
- to.sql.migration: Handle `ALTER COLUMN` for columns with `NOT NULL` and a default value.


## Version 5.3.2 - 2024-10-08

### Fixed

- to.sql|hdi|hdbcds|effective: Handle subexpressions in conjunction with exists predicate.


## Version 5.3.0 - 2024-09-25

### Added

- compiler:
  + A warning is emitted if a string enum's values are longer than the specified length.
  + ON-condition rewriting has been improved and now supports secondary associations.
- to.edm(x): Support optional action and function parameters in OData V4. The following rules apply:
  + A parameter declared `not null` without default value is mandatory.
  + A **function** parameter declared `null` without default value is mandatory.
  + An **action** parameter declared `null` without default value is optional as it is equivalent to
    `@Core.OptionalParameter { DefaultValue: null }`.
  + A parameter with a default value is optional and the default value is rendered as
    `@Core.OptionalParameter { DefaultValue: <value> }` regardless of its nullability.
  + `@Core.OptionalParameter: true` can be used to turn a mandatory parameter into an optional parameter
    (especially function parameters) and to signal an unspecified default value in the API if the parameter
    has no default clause.
  + `@Core.OptionalParameter: false` turns the creation of a `@Core.OptionalParameter: { Default: ... }`
    annotation off.
  + A default clause or `@Core.OptionalParameter: <bool>` have no effect on an explicit binding parameter.
  + Mandatory and optional **action** parameters may appear in any order.
  + Optional **function** parameters must not be followed by mandatory parameters.
- to.edm: Forward `@OpenAPI {...}` into EDM Json with option `--odata-openapi-hints`.
- cdsc: Option `--transitive-localized-views` was added.

### Fixed

- CDL parser: Issue warning if annotation assignments have been written
  at an invalid position inside a type expressions.
- CDL parser: Issue warning for arrayed parameter with default value.
- to.cdl: Arrayed parameters with default values were not rendered correctly.

### Removed

- beta flag `optionalActionFunctionParameters`: in v5, action and function parameters
  can be specified as optional without setting this beta flag.

## Version 5.2.0 - 2024-08-27

### Added

- to.edm(x): Add `@Core.Links { rel: 'author', href: 'https://cap.cloud.sap' };` as watermark to lead schema.
- to.sql.migration: Introduce option `script` to aid in generation of manual migration scripts by not aborting when encountering lossy changes.

### Changed

- for.odata: No longer reject default values on action/function parameters.
- to.edm(x): Raise warning for default values on action/function parameters that they are ignored.

### Fixed

- compiler: Fix extensions with bound actions using an explicit binding parameter in `parseCdl` CSN.
- for.odata, to.edm(x): Fix some issues with resolving annotation expressions in nested objects and
  reliably replace value of `=` attribute with `true` after processing.

## Version 5.1.2 - 2024-08-05

### Fixed

- compiler: In parseCdl mode, bound actions specifying the binding parameter with `$self` did not work.


## Version 5.1.0 - 2024-07-25

### Added

- cdsc: Option `--stdin` was added to support input via standard input, e.g. `cat file.cds | cdsc --stdin`
- Allow to refer to draft state element `IsActiveEntity` via variable `$draft.IsActiveEntity` in annotation path expressions.
  + for.odata: During draft augmentation `$draft.IsActiveEntity` is rewritten to `$self.IsActiveEntity` for all draft enabled
    entities (root and sub nodes but not for named types or entity parameters).
  + to.edm(x): (V4 only) Allow to refer to an entity element in a bound action via `$self` and not only via explicit binding parameter
    in an annotation path expression. The API generator will prefix the path with the actual binding parameter name (explicit, annotation or
    default).

### Changed

- Update OData vocabularies: 'Common', 'Core', 'HTML5', 'UI'.
- to.cdl|hdbcds|hdi|sql: Remove `generated by` comment.

### Fixed

- compiler: checks for associations now work for nested projections of the form `association.{ id }`
- to.edm(x): No `Nullable` attribute for `$ReturnType` of `Collection(<entity type>)` [OData V4 CSDL, section 12.8 Return Type](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/odata-csdl-xml-v4.01.html#sec_ReturnType)
- to.sql|hdi|hdbcds: Detect and error on "cross-eyed" backlinks, where we cannot construct a valid on-condition.
- to.sql|hdi.migration: Correctly detect that a view was dropped - this was previously just silently ignored.


## Version 5.0.6 - 2024-07-10

### Fixed

- for.seal: Don't generate DRAFT artifacts.

## Version 5.0.4 - 2024-06-26

### Fixed

- CDL parser: an `extend entity` and `extend aspect` with an extensions for the
  same element now correctly leads to an error, because it resulted in part of the
  extension being simply dropped.  Remark: an `extend type` and the recommended
  plain `extend` led to an error in that situation already before.
- to.sql: Conditions inside filters in combination with foreign key aliases were
          not properly translated in rare cases.
- Update OData Vocabularies: 'PDF', 'UI'.

## Version 5.0.2 - 2024-06-14

### Changed

- API `CompilationError` will serialize the first compiler error in `e.message`
- cdsc: `--without-hana-associations` is changed to `--with-hana-associations`

### Fixed

- to.edm(x):
  + Respect `AppliesTo` specification in term definitions for actions and functions.
  + Make message `odata-spec-violation-namespace` a warning again.

## Version 5.0.0 - Pre-release version - 2024-05-29

This is a preview version for the major release and contains breaking changes. It should not be used for production.

### Changed

- Node 18 is now the minimum required version.
- API `CompilationError`s will no longer serialize all compiler messages into `e.message`.
  Use `e.messages[]` instead or `e.toString()` to serialize errors into a string.
- CDL parser: Annotations that can't be applied are now rejected.
- compiler:
  + `extend` statements on "namespaces" (paths that are not definitions) are now always errors.
  + non-structured events are rejected
  + `$self` references in JOINs are rejected if they could lead to issues in SQL rendering.
  + non-string enum definitions must have a value.
  + A top-level definition `$self` is rejected. `$self` is considered a reserved name.
  + `$at.from`/`$at.to` are deprecated; use `$valid.from`/`$valid.to` instead.
- to.hdbcds: The HDBCDS backend is now considered deprecated.
- to.edm(x):
  + Set default nullability to `true` for collection like properties (was `false` before).
  + Raise message ids `odata-spec-violation-namespace`, `odata-spec-violation-no-key` from warning to error.
- to.sql:
  + `@cds.persistence.exists` is _not_ propagated to generated localization views (`localized.*`)
  + Option `fewerLocalizedViews` is now enabled by default.
  + Option `betterSqliteSessionVariables` is now enabled by default.

### Fixed

- for.odata: Propagate all `@odata { Type, MaxLength, Precision, Scale, SRID }` to generated foreign keys.

### Removed

- API: Deprecated functions `preparedCsnToEdmx` and `preparedCsnToEdm` were removed.
  Use `to.edm(x)` instead.
- beta feature `v5preview`
