# ChangeLog of Beta Features for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are listed in this ChangeLog just for information.
The compiler behaviour concerning `beta` features can change at any time without notice.
**Don't use `beta` fixes, changes and features in productive mode.**

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

* managed associations (and compositions to entities) are implicitly redirected
  when necessary,
* sub elements of referred structure types can be annotated individually,
* the resulting CSN is bigger (will be reduced in the future if possible)
  as `type` references to structures will now have a sibling `elements`.

This option does not enable:

* rewriting the `on` conditions of associations in sub elements,
* aspect compositions as sub elements,
* `localized` sub elements,
* `key` property on sub elements.

## Version 1.23.0

### Added `keyRefError`

Always signal an error (instead of just a warning in some cases),
if not all references in the `keys` of an managed associations
are projected in the new target.
