# ChangeLog of Beta Features for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are listed in this ChangeLog.
The compiler behaviour concerning `beta` features can change at any time without notice.
**Don't use `beta` fixes, changes and features in productive mode.**

## Version 1.36.0 - 2020-08-xx

### Added

#### `mapAssocToJoinCardinality`

Analog to the feature `cardinality for explicit joins`, the association to
join transformation algorithm now experimentally supports join cardinalities as well.
The default cardinality `MANY TO ONE` is added to the join node if no cardinality has
been specified.

#### `odataDefaultValues`

OData: Enables the rendering of default values for EntityType properties.

#### `originalKeysForTemporal`

OData: The original entity keys are not enhanced with `@cds.valid.from` or replaced with
`@cds.valid.key` elements. The `@Core.AlternateKeys` only mentions the `@cds.valid.key` element.

#### `dontRenderVirtualElements`  

Virtual elements are no longer rendered in views as `null as <id>` or added to potentially generated
draft tables. This behavior can be turned off with `renderVirtualElements` for backward compatibility.

### Removed

#### `noJoinsForForeignKeys`

The association to join transformation treats foreign key accesses with priority now.
  
#### `uniqueconstraints`

Unique constraints are now generally available.
  
