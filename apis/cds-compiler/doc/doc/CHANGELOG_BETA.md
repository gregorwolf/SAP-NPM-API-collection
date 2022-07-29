# ChangeLog of Beta Features for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are listed in this ChangeLog just for information.
The compiler behavior concerning `beta` features can change at any time without notice.
**Don't use `beta` fixes, changes and features in productive mode.**

## Version 2.XX.YY

### Removed `assocsWithParams`

Instead, of using the beta flag `assocsWithParams`, you can change the severity of the messages
`def-unexpected-paramview-assoc` and `def-unexpected-calcview-assoc`.

## Version 2.12.0 - 2022-01-25

### Added `sqlSnippets`

- to.sql/hdi/hdbcds: Introduce the annotations `@sql.prepend` and `@sql.append` that allow inserting user-written SQL snippets into the compiler generated content.

## Version 2.11.0 - 2021-12-02

### Removed `foreignKeyConstraints`

## Version 2.10.4 - 2021-11-05

### Fixed `nestedProjections`

- to.sql/hdi/hdbcds: Correctly handle a `*` at the not-first place in the query

## Version 2.6.0 - 2021-08-23

### Removed `pretransformedCSN`

### Removed `renderSql`

### Removed `keylessManagedAssoc`

This is now the default - see CHANGELOG entry for 2.6.0

### Fixed `nestedProjections`

- to.sql/hdi/hdbcds: now work correctly when nested projections are used

### Fixed `foreignKeyConstraints`

- Always use the name of the association / backlink compared to
  `$self` as name suffix for a constraint
- Composition of one always result in:
  + ON DELETE RESTRICT
  + ON UPDATE RESTRICT
- Composition of one w/o backlink will result in a constraint in
  the entity where the composition is defined

## Version 2.4.4 - 2021-07-02

### Added `nestedProjections`

- Support `expand`: columns can look like `assoc_or_struct_or_tabalias { col_expression1, … }`,
  `longer.ref as name { *, … } excluding { … }`, `{ col_expression1 as sub1, … } as name`, etc.
- Support `inline`: columns can look like `assoc_or_struct_or_tabalias.{ col_expression1, … }`,
  `longer.ref[filter = condition].{ *, … } excluding { … }`, `assoc_or_struct_or_tabalias.*`, etc.
- _Some checks are missing and will be added! Minor changes might occur._
- **The SQL backends might not work properly yet if nested projections are used!**

## Version 2.4.2 - 2021-07-01

### Added `keylessManagedAssoc`

- Support managed associations without foreign keys. Associations targeting a definition without primary keys or with an
  explicit empty foreign key tuple or with empty structured elements as foreign keys and their corresponding `$self`
  comparisons do not describe the relationship between the source and the target entity.
  These associations can be used to establish API navigations but cannot be used to access elements in the target
  entity as they cannot be transformed into a valid JOIN expression.
  Consequently, these associations are not added to the `WITH ASSOCIATIONS` clause or forwarded to HANA CDS.
  Managed Associations without foreign keys must be enabled with `--beta: keylessManagedAssoc`

## Version 2.4.0 - 2021-06-28

### Changed `foreignKeyConstraints`

- `toSql`/`toHdbcds`: omit constraint generation if the option `skipDbConstraints` is set
- If the database constraints are switched off by the global option,
  render constraints nevertheless if an association / composition
  is annotated with `@cds.persistency.assert.integrity: true`
- omit constraint generation if an association / composition
  is annotated with `@cds.persistency.assert.integrity: false`
  -> for managed compositions, the `up_` link in the compositions target entity
  will not result in a constraint if the composition is annotated as described

## Version 2.0.8

### Added `foreignKeyConstraints`

to.sql/to.hdi: If the beta option `foreignKeyConstraints` is supplied,
referential constraints are generated for compliant associations and compositions.

## Version 2.0.2

### Removed `dontRenderVirtualElements`

Virtual elements are no longer rendered in views as `null as <id>` or
added to potentially generated draft tables. This behavior can be turned off
with deprecated option `renderVirtualElements` for backward compatibility.

### Removed `originalKeysForTemporal`

### Removed `odataDefaultValues`

OData: Default values for EntityType properties are rendered always.

### Removed `subElemRedirections`

This option is now enabled by default.

### Removed `keyRefError`

## Version 1.44.0

### Added `addTextsLanguageAssoc`

When the beta option `addTextsLanguageAssoc` is set to true and
the model contains an entity `sap.common.Languages` with an element `code`,
all generated texts entities additionally contain an element `language`
which is an association to `sap.common.Languages` using element `locale`.

## Version 1.43.0

### Changed `subElemRedirections`

When the beta option `subElemRedirections` is set to true,
_all_ array (new!) and structure types are expanded when referenced:
managed associations (and compositions to entities) in that array are
implicitly redirected when necessary.
See [below for details](#version-1300---20200612).

Nested array types (without intermediate structure types) are not supported.

### Added `ignoreAssocPublishingInUnion`

For `to.hdbcds`, with beta flag `ignoreAssocPublishingInUnion` in conjunction with dialect
`hanaJoins`, unmanaged associations in UNIONs are silently ignored and managed associations
are replaced by their foreign keys and silently ignored

## Version 1.36.0 - 2020-08-07

### Added `mapAssocToJoinCardinality`

Analog to the feature `cardinality for explicit joins`, the association to
join transformation algorithm now experimentally supports join cardinalities as well.
The default cardinality `MANY TO ONE` is added to the join node if no cardinality has
been specified.

### Added `odataDefaultValues`

OData: Enables the rendering of default values for EntityType properties.

### Added `originalKeysForTemporal`

OData: The original entity keys are not enhanced with `@cds.valid.from` or replaced with
`@cds.valid.key` elements. The `@Core.AlternateKeys` only mentions the `@cds.valid.key` element.

### Added `dontRenderVirtualElements`

Virtual elements are no longer rendered in views as `null as <id>` or added to potentially generated
draft tables. This behavior can be turned off with `renderVirtualElements` for backward compatibility.

### Removed `noJoinsForForeignKeys`

The association to join transformation treats foreign key accesses with priority now.

### Removed `uniqueconstraints`

Unique constraints are now generally available.

## Version 1.33.0 - 2020-08-24

### Added `hanaAssocRealCardinality`

Render JOIN cardinality in native HANA association if provided. If no cardinality has been specified.

## Version 1.32.0 - 2020-07-10

### Removed `aspectCompositions`

Aspect compositions aka managed compositions are now avaible without beta option.
_Warning_: the CSN representation can still change.

## Version 1.31.0 - 2020-06-26

### Changed `subElemRedirections`

Signal an error
if an unmanaged association as sub element is to be implicitly redirected,
as we do not automatically rewrite the `on` condition in that situation yet.

## Version 1.30.0 - 2020-06-12

### Added `subElemRedirections`

When the beta option `subElemRedirections` is set to true,
_all_ structure types are expanded when referenced:

- managed associations (and compositions to entities) are implicitly redirected
  when necessary,
- sub elements of referred structure types can be annotated individually,
- the resulting CSN is bigger (will be reduced in the future if possible)
  as `type` references to structures will now have a sibling `elements`.

This option does not enable:

- rewriting the `on` conditions of associations in sub elements,
- aspect compositions as sub elements,
- `localized` sub elements,
- `key` property on sub elements.

## Version 1.23.0

### Added `keyRefError`

Always signal an error (instead of just a warning in some cases),
if not all references in the `keys` of an managed associations
are projected in the new target.
