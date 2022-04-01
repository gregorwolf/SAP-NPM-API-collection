# ChangeLog for cds compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog but [here](doc/CHANGELOG_BETA.md).
The compiler behavior concerning `beta` features can change at any time without notice.

## Version 2.13.8 - 2022-03-29

### Fixed

- to.hdbcds/hdi/sql: Correctly handle `localized` in conjunction with `@cds.persistence.exists` and `@cds.persistence.skip`

## Version 2.13.6 - 2022-25-03

### Fixed

- to.hdbcds/hdi/sql: Correctly handle `localized` in conjunction with `@cds.persistence.exists`

## Version 2.13.4 - 2022-22-03

No changes compared to Version 2.13.0; fixes latest NPM tag

## Version 2.13.2 - 2022-22-03

No changes compared to Version 2.13.0; fixes latest NPM tag

## Version 2.13.0 - 2022-22-03

### Added

- CDL syntax:
  + Allow to `extend E:elem` and `annotate E:elem` instead of having to write deeply nested statements.
  + Enable `default` values as part of scalar type definitions.
  + The following `extend` syntax variants are now possible:
    ```cds
    extend … with elements { … }
    extend … with definitions { … }
    extend … with columns { … }
    extend … with enum { … }
    extend … with actions { … }
    ```
    This syntax expresses _how_ an artifact is extended instead of _what_ is extended.
  + Using `ORDER BY` in generic functions such as SAP HANA's `first_value` is now possible.
- Make API function `compileSources` accept CSN objects as file content
- to.edm(x): Annotate view parameters with `@sap.parameter: mandatory` (V2) and `@Common.FieldControl: #Mandatory` (V4).
- to.sql/hdi/hdbcds: Introduce the annotations `@sql.prepend` and `@sql.append` that allow inserting user-written SQL
  snippets into the compiler generated content. Changes in annotations `@sql.prepend` and `@sql.append` are now reflected
  in the output of `to.hdi.migration`. This enables CDS Build to produce `.hdbmigrationtable` files translating such model
  changes into schema changes.
- API: Lists of keywords for various backends are available as `to.<backend>[.<config>].keywords`, e.g. `to.sql.sqlite.keywords`.
- for.odata/to.edm(x): The draft composition hull is now also taking into account compositions in subelements.

### Changed

- In query entities inside services, only auto-redirect associations and compositions
  in the main query of the entity.
- An element now inherits the property `notNull` from its query source (as
  before) or its type (like it does for most other properties);
  `notNull` is then not further propagated to its sub elements anymore.
- A structure element inherits the property `virtual` from its query source (as
  before), but does not further propagate `virtual` to its sub elements
  (semantically of course, but the CSN is not cluttered with it);
  there is a new warning if a previously `virtual` query entity
  element is now considered to be non-virtual.
- Do not propagate annotation value `null`.
  The value `null` of an annotation (and `doc`) is used to stop the inheritance
  of an annotation value.  This means than other than that, a value `null` should
  not be handled differently to not having set that annotation.
- In the effective CSN, the structure type is only expanded if something has changed
  for associations: the `target` (`keys` does not change if the `target` does not change)
  unmanaged associations as sub elements are not supported anyway.
- In the effective CSN, “simple” type properties like `length`, `precision`,
  `scale` and `srid` are propagated even for a propagation via type.
- Update OData Vocabularies: 'Capabilities', 'Common', 'Core', 'UI'.
- to.sql:
  + For SQL dialect `hana` referential constraints are now appended
    as `ALTER TABLE ADD CONSTRAINT` clause to the end of `schema.sql`.
    With option `constraintsInCreateTable` constraints are rendered into the
    `CREATE TABLE` statement.
  + Referential constraint names are now prefixed with `c__`.

### Fixed

- Properly resolve references inside anonymous aspects:
  + references starting with `$self.` made the compiler dump.
  + a simple `$self` did  not always work as expected (it represents the entity created via the anonymous aspect).
  + other references inside deeply nested anonymous aspects induced a compilation error.
- compiler: `()` inside `ORDER BY` clause was not correctly set.
- parse.cdl: References in `ORDER BY` and filters are now correctly resolved.
- Issue error when trying to introduce managed compositions of aspects in `mixin`s
- Issue error in all cases for type references to unmanaged associations.
- Avoid dump when extending an illegal definition with a name starting with `cds.`.
- to.sql/to.cdl/to.hdbcds/to.hdi: Render `cast()` inside `ORDER BY`, `GROUP BY` and `HAVING` properly.
- to.sql/hdi/hdbcds:
  + `$self` was incorrectly treated as a structured path step.
  + Correctly handle table alias in on-condition of mixin in `exists` expansion.
  + Correctly handle table `$self` references to aliased fields in on-condition of mixin association
    during `exists` expansion.
- to.edm: Don't escape `&` as `&amp;`.
- to.edmx: Escaping compliant to XML specification:
  + `&` and `<` are always escaped.
  + `>` is not escaped, unless it appears in text values as `]]>`.
  + `"` is escaped in attribute values only.
  + Control characters are always escaped.
- Ellipsis (`...`) in annotations in different layers but without base annotation now produces an error.
  The old but incorrect behavior can be re-enabled with option `anno-unexpected-ellipsis-layers`.

## Version 2.12.0 - 2022-01-25

### Added

- CDL parser: You can now use multiline string literals and text blocks.  
  Use backticks (\`) for string literals that can span multiple lines and can use JavaScript-like escape
  sequences such as `\u{0020}`.  You can also use three backticks (\`\`\`) for strings (a.k.a. text blocks)
  which are automatically indentation-stripped and can have an optional language identifier that is used
  for syntax highlighting, similar to markdown.  In difference to the former, text blocks require the
  opening and closing backticks to be on separate lines.
  Example:
  ````
  @annotation: `Multi
   line\u{0020}strings`

  @textblock: ```xml
              <summary>
                <detail>The root tag has no indentation in this example</detail>
              </summary>
              ```
  ````

- Enhance the ellipsis operator `...` for array annotations by an `up to ‹val›`:
  only values in the array of the base annotation up to (including) the first match
  of the specified `‹val›` are included at the specified place in the final array value.
  An array annotation can have more than on `... up to ‹val›` items and must also
  have a pure `...` item after them.  
  A structured `‹val›` matches if the array item is also a structure and all property
  values in `‹val›` are equal to the corresponding property value in the array value;
  it is not necessary to specify all properties of the array value items in `‹val›`.
  Example
  ```
  @Anno: [{name: one, val: 1}, {name: two, val: 2}, {name: four, val: 4}]
  type T: Integer;
  @Anno: [{name: zero, val: 0}, ... up to {name: two}, {name: three, val: 3}, ...]
  annotate T;
  ```
- for.odata: Support `@cds.on {update|insert}` as replacement for deprecated `@odata.on { update|insert }` to
  set `@Core.Computed`.

### Changed

- Update OData Vocabularies 'Aggregation', 'Capabilities', 'Common', 'Core', PersonalData, 'Session', 'UI'

### Fixed

- to.sql/hdi/hdbcds: With `exists`, ensure that the precedence of the existing association-on-conditions and where-conditions is kept by adding braces.
- to.sql/hdi: Window function suffixes are now properly rendered.
- to.sql: `$self` comparisons inside aspects are not checked and won't result in an error anymore.
- to.hdbcds:
  + Correctly apply the "."-to-"_"-translation algorithm to artifacts that are marked with `@cds.persistence.exists`.
  + Message with ID `anno-hidden-exists` (former `anno-unstable-hdbcds`) is now
    only issued if the compiler generates a SAP HANA CDS artifact which would hide
    a native database object from being resolved in a SAP HANA CDS `using … as …`.
- to.cdl: Annotation paths containing special characters such as spaces or `@` are now quoted, e.g. `@![some@annotation]`.
- compiler: A warning is emitted for elements of views with localized keys as the localized property is ignored for them.

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
  which is an association to `sap.common.Languages` using element `local`.
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
  Generation can be disabled via option `disableHanaComments`. Entites/views (and their elements/columns)
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
