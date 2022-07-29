# ChangeLog of deprecated Features for cdx compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- (no-duplicate-heading)-->

Note: `deprecated` features are listed in this ChangeLog just for information.
`deprecated` features will be removed after a certain grace period.

**Use `deprecated` features only transitional in productive mode.**

**When the `deprecated` option is set, the `beta` option is ignored,
and several new features are not available.**

## Version 2.XX.YY - 2022-MM-DD

### Added `redirectInSubQueries`

When this option is set, we auto-redirect associations and composition also in
non-main queries, sometimes without rewriting the `keys`/`on` (there will be no
fix for this).

### Added `oldVirtualNotNullPropagation`

When this option is set, we do not propagate `notNull` along types.
Additionally, we propagate `notNull` and `virtual` from a query source element
to the sub elements of a query entity element, even if the property is not
propagated to the query entity element itself (like with type references).


## Version 2.2.0

### Added `noScopedRedirections`

When this option is set, the definition scope is not taken into account when
trying to find an implicit redirection target.  Setting the following
deprecated options also switches off scoped redirections (additionally to their
other effect): `noElementsExpansion`, `generatedEntityNameWithUnderscore`,
`shortAutoexposed`, `longAutoexposed`, `noInheritedAutoexposeViaComposition`.

### Added `noInheritedAutoexposeViaComposition`

When this option is set, only entities directly specified after `Composition of` are
auto-exposed, not entities used as target via explicit or implicit `redirected to`.

## Version 2.0.16

### Added `downgradableErrors`

Allow to change the severity of some errors which should stay to be an error.

### Added `shortAutoexposed`

When this option is set (and `generatedEntityNameWithUnderscore`), the names of
autoexposed entities are calculated according to the default compiler v1
behavior (without v1 options `dependentAutoexposed` and `longAutoexposed`).

## Version 2.0.10

### Added `longAutoexposed`

When this option is set (and `generatedEntityNameWithUnderscore`),
the names of autoexposed entities are calculated according to the
compiler v1 option `longAutoexposed`.

### Added `generatedEntityNameWithUnderscore`

Keep using `_` is separator for generated autoexposed entities and for entities
created for managed compositions.  It also disables a definition `A.B.C` if `A`
or `A.B` is a definition other than a context or service (v1 behavior).

## Version 2.0.4-ms1

### Added `createLocalizedViews`

Add localized convenience views in `for.odata`.

### Added `unmanagedUpInComponent`

Render association `up_` in composition component unmanaged.

## Version 2.0.2-ms1

### Added `renderVirtualElements`

Virtual elements are no longer rendered in views as `null as <id>` or added to potentially generated
draft tables. This behavior can be turned off with `renderVirtualElements` for backward compatibility.

### Added `parensAsStrings`

Represent parentheses in expressions with `'('` and `')'` in `xpr` arrays
instead of using nested `xpr`s or `list`.

### Added `v1KeysForTemporal`

Render old and broken temporal EDM API.

### Added `noElementsExpansion`

When setting it, association in sub elements are not automatically redirected,
and the sub elements cannot be annotated indivually.

Do not use this.  Setting it might avoid some compile errors,
but in most cases the reported errors are rightly reported.

### Added `projectionAsQuery`

Render `projection` as `query` in CSN.
