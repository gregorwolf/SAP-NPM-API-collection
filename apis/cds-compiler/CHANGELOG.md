# ChangeLog for cds compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog but [here](doc/CHANGELOG_BETA.md).
The compiler behavior concerning `beta` features can change at any time without notice.

## Version 3.3.2 - 2022-09-30

### Fixed

- to.edm(x): Set `Scale` (V4) or `@sap:variable-scale` (V2) attributes correctly when overwriting `cds.Decimal`
  with `@odata.Scale`.
- to.sql: For dialect `postgres`, add braces around `$now`, `$at.from` and `$at.to`.

## Version 3.3.0 - 2022-09-29

### Added

- Nested projections can be used without `beta` option:
  + Support `expand`: columns can look like `assoc_or_struct_or_tabalias { col_expression1, … }`,
    `longer.ref as name { *, … } excluding { … }`, `{ col_expression1 as sub1, … } as name`, etc.
  + Support `inline`: columns can look like `assoc_or_struct_or_tabalias.{ col_expression1, … }`,
    `longer.ref[filter = condition].{ *, … } excluding { … }`, `assoc_or_struct_or_tabalias.*`, etc.
- to.sql/hdi/hdbcds/edm(x)/for.odata: Allow to structure comparison against `is [not] null`.
- to.sql: Support dialect `postgres` - generates SQL intended for PostgreSQL. Not supported are `cds.hana` data types and views with parameters.

### Changed

- A valid redirection target does not depend on parameters anymore.  This
  change could induce a redirection error, which could easily solved by assigning
  `@cds.redirection.target: false` to the entity with “non-matching” parameters.
- Properly issue an error when projecting associations with parameter
  references in the `on` condition.  Before this change, the compiler dumped
  when projecting such an association in a view on top.
- Update OData vocabularies 'Capabilities', 'Common', 'UI'.
- to.cdl:
  + Extensions are now always put into property `model` of `to.cdl()`s result.
  + Actions on views and projections are now rendered as part of the definition, instead of an extension.
- to.edm(x): `@Capabilities` 'pull up' supports all counterpart properties of `@Capabilities.NavigationPropertyRestriction`
  except for properties `NavigationProperty` and `Navigability`.
- to.hdi: Updated list of `keywords` which must be quoted in naming mode `plain`.
- to.sql/hdi/hdbcds/edm(x)/for.odata: Reject structure comparison with operators `<,>,<=,>=`. Message id `expr-unexpected-operator`
  is downgradable to a warning.

### Fixed

- Do not issue a warning anymore when adding elements via multiple `extend` statements in the same file.
- An info message for annotating builtins through `extend` statements is now reported, similar to `annotate`.
- Fix auto-redirection for target of new assoc in query entity
- for.odata: `@readonly/insertonly/mandatory: false` are not expanded.

## Version 3.2.0 - 2022-08-30

### Added

- New Integer types with these mappings:

  | CDS       | OData     | SQL      | HANA CDS      |
  | --------- | --------- | -------- | ------------- |
  | cds.UInt8 | Edm.Byte  | TINYINT  | hana.TINYINT  |
  | cds.Int16 | Edm.Int16 | SMALLINT | hana.SMALLINT |
  | cds.Int32 | Edm.Int32 | INTEGER  | cds.Integer   |
  | cds.Int64 | Edm.Int64 | BIGINT   | cds.Integer64 |

- Properties of type definitions and types of direct elements can now be extended,
  e.g. `extend T with (length: 10);`

- CDL parser: support SQL function `substr_regexpr` with its special argument syntax.

### Fixed

- An internal dump could have occurred in certain situations
  for models with cyclic type definitions.
- Annotations on inferred enum elements of views were lost during recompilation.
- to.cdl: Annotations on enum value in query elements were lost.
- for.odata: Allow dynamic shortcut annotation values (`$edmJson`).
- to.edm(x):
  + Don't overwrite annotations of input model.
  + Ignore `null` values in `$edmJson` strings.
- to.hdi.migration: Don't interpret bound action changes as element changes.

## Version 3.1.2 - 2022-08-19

### Fixed

- to.edm(x):
  + `@Capabilities` 'pull up' for containment trees should not prefix the
    dynamic annotation paths of the root container.
  + Remove service namespace prefix of a parameter type for function/action annotation targets
    in multi schema mode if the parameter type is defined in an alternative schema.

## Version 3.1.0 - 2022-08-04

### Added

- Extending an artifact with multiple includes in one extend statement is now possible:
  `extend SomeEntity with FirstInclude, SecondInclude;`
- Aspects can now have actions and functions, similar to entities.  Aspects can be extended by actions as well.
- `cdsc`:
  + `toCsn` now supports `--with-locations` which adds a `$location` property to artifacts
  + `toHana`/`toSql` now supports `--disable-hana-comments`, which disables rendering of doc-comments for HANA.
- to.hdi/sql/hdbcds: Support FK-access in `ORDER BY` and `GROUP BY`
- to.hdi.migration: Detect an implicit change from `not null` to `null` and render corresponding `ALTER`

### Changed

- compiler: If an unknown file extension is used but the file starts with
  an opening curly brace (`{`), it will be parsed as CSN.
- to.edm(x): In V4 containment mode, pull up `@Capabilities` annotations from the containees to the root container (set)
  and translate them into corresponding `@Capabilities.NavigationRestrictions`. If a `NavigationRestriction` is already available
  for that containment path, capabilities are merged into this path. Capability annotation value paths are prefixed with
  the navigation restriction path.
  The capability 'pull up' has an effect on entity annotations only. `@Capabilities` assignments on compositions are not pulled
  up but rendered to the association type which is important to enable dynamic capabilities on 'to-many' relations and to avoid
  ambiguities in entity set capabilities.
- Update OData vocabularies 'Analytics', 'Capabilities', 'Common', 'Core', 'DataIntegration', 'Graph', 'PersonalData', 'UI', 'Validation'.

### Fixed

- Syntax of date/time literals are now checked against ISO 8601. If the format is invalid, a warning is emitted.
- The code completion directly after the `(` for functions with special syntax
  now suggests all valid keywords, like for `extract` or `locate_regexpr`.
- compiler:
  + `cast(elem as EnumType)` crashed the compiler.
  + Annotations on sub-elements in query entities were lost during re-compilation.
  + An association's cardinality was lost for new associations published in projections.
  + Annotations on indirect action parameters were lost in CSN flavor `gensrc`.
  + Re-allow `annotate` statements referring to the same element twice,
    even if there are annotation assignments for sub elements.
  + If a file's content starts with `{` and if neither file extension is known nor
    `fallbackParser` is set, assume the source is CSN.
- all backends: references in `order by` _expressions_ are correctly resolved.
- to.edm(x):
  + Allow cross service references for unmanaged associations and improve warning message for muted associations.
  + Nested `@UI.TextArrangement` has precedence over `@TextArrangement` shortcut annotation for `@Common.Text`.
- to.hdi.migration:
  + Doc comments rendered the _full doc comment_ instead of only the first paragraph, as `to.hdi` does.
  + Respect option `disableHanaComments` when rendering the `ALTER` statements
- to.hdi/sql/hdbcds:
  + Check for invalid usages of `$self` and give helpful errors
  + Correctly resolve association-steps in the from-clause in conjunction with `exists`

## Version 3.0.2 - 2022-07-05

### Fixed

- to.sql: For `sqlDialect` `plain`, `$now` is replaced by `CURRENT_TIMESTAMP` again.
- compiler:
  + Don't crash if a USING filename is invalid on the operating system, e.g. if `\0` is used.
  + Info messages for annotations on localized convenience views are only emitted for unknown ones.
  + Improve error message for an `extend` statement which had added a new element
    and tried to extend that element further.  Similarly for a new action.
    (If you consider this really of any use, use two `extend` statements.)
- for.odata: expand `@readonly`/`@insertonly` on aspects as for entities into `@Capabilities`.
- to.edm(x):
  + Exclude managed association as primary key on value list annotation preprocessing.
  + Don't render annotations for aspects defined in a service.

## Version 3.0.0 - 2022-06-23

### Added

- Instead of requiring all files on startup, they are required on an as-needed basis to reduce startup times.
- CDL parser: support SQL functions `locate_regexpr`, `occurrences_regexpr`,
  `replace_regexpr` and `substring_regexpr` with their special argument syntax.
- CDL parser: the names `trim` and `extract` are not reserved anymore.

### Changed

- cds-compiler now requires Node 14.
- `compile()` and its derivates now use `fs.realpath.native()` instead of `fs.realpath()`.
- CDL parser:
  + Multi-line doc comments without leading `*` were inconsistently trimmed.
  + As before, a structure value for an annotation assignment in a CDL source is flattened,
    i.e. `@Anno: { foo: 1, @bar: 2 }` becomes `@Anno.foo: 1 @Anno.@bar: 2`.
    Now, the structure property name `$value` is basically ignored:
    `@Anno: { $value: 1, @bar: 2 }` becomes `@Anno: 1 @Anno.@bar: 2`.
    The advantage is that overwriting or appending the annotation value works as expected.
  + Keywords `not null` is only valid after `many String enum {...}` and no longer after `String`.
- `@cds.persistence.skip` and `@cds.persistence.exists` are both copied to generated child artifacts
  such as localized convenience views, texts entities and managed compositions.
- Update OData vocabularies 'Common', 'UI'.
- (Sub-)Elements of localized convenience views can now be annotated, e.g. `annotate localized.E:elem`.
- `getArtifactCdsPersistenceName` now enforces the `csn` argument and can optionally have the `sqlDialect` passed in.
- `getElementCdsPersistenceName` can optionally have the `sqlDialect` passed in.

### Removed

- All v2 deprecated flags.
- Keyword `masked`.
- CDL parser: `*` is not parsed anymore as argument to all SQL functions;
  it is now only allowed for `count`, `min`, `max`, `sum`, `avg`, `stddev`, `var`.
- All non-SNAPI options.

## Version 2.15.8 - 2022-08-02

### Fixed

- to.edm(x): Nested `@UI.TextArrangement` has precedence over `@TextArrangement` shortcut annotation for `@Common.Text`.
- to.hdi.migration:
  + Respect option `disableHanaComments` when rendering the `ALTER` statements
  + Doc comments rendered the _full doc comment_ instead of only the first paragraph, as `to.hdi` does.
- compiler: An association's cardinality was lost for associations published in projections.

## Version 2.15.6 - 2022-07-26

### Fixed

- Annotations on sub-elements were lost during re-compilation.

## Version 2.15.4 - 2022-06-09

### Fixed

- for.odata:
  + Fix derived type to scalar type resolution with intermediate `many`.
- to.edm(x):
  + (V4 structured) Fix key paths in combination with `--odata-foreign-keys`.
  + Add `Edm.PrimitiveType` to `@odata.Type`.
  + (V4 JSON) Render constant expressions for `Edm.Stream` and `Edm.Untyped`.
  + Fix a bug in target path calculation for `NavigationPropertyBinding`s to external references.
  + Render inner annotations even if `$value` is missing.
- Update OData vocabularies 'Common', 'UI'.
- to.sql/to.hdbcds/to.hdi: "type of"s in `cast()`s could lead to type properties being lost.

## Version 2.15.2 - 2022-05-12

### Fixed

- Option `cdsHome` can be used instead of `global.cds.home` to specify the path to `@sap/cds/`.
- to.edm(x):
  + Set anonymous nested proxy key elements to `Nullable:false` until first named type is reached.
  + Enforce `odata-spec-violation-key-null` on explicit foreign keys of managed primary key associations.
  + Proxies/service cross references are no longer created for associations with arbitrary ON conditions.
    Only managed or `$self` backlink association targets are proxy/service cross reference candidates.
  + Explicit foreign keys of a managed association that are not a primary key in the target are exposed in the the proxy.
  + If an association is primary key, the resulting navigation property is set to `Nullable:false` in structured mode.

## Version 2.15.0 - 2022-05-06

### Added

- A new warning is emitted if `excluding` is used without a wildcard, since this does
  not have any effect.
- All scalar types can now take named arguments, e.g. `MyString(length: 10)`.
  For custom scalar types, one unnamed arguments is interpreted as length, two arguments are interpreted
  as precision and scale, e.g. `MyDecimal(3,3)`.
- If the type `sap.common.Locale` exists, it will be used as type for the `locale` element
  of generated texts entities.  The type must be a `cds.String`.
- to.cdl: Extend statements (from `extensions`) can now be rendered.
- Add OData vocabulary 'Hierarchy'.
- CDL: New associations can be published in queries, e.g. `assoc : Association to Target on assoc.id = id`

### Changed

- to.edm(x):
  + perform inbound qualification and spec violation checks as well as most/feasible EDM preprocessing steps
    on requested services only.
  + Open up `@odata { Type, MaxLength, Precision, Scale, SRID }` annotation.  
    The annotations behavior is defined as follows:
    + The element/parameter must have a scalar CDS type. The annotation is not applied on named types
      (With the V2 exception where derived type chains terminating in a scalar type are resolved).
    + The value of `@odata.Type` must be a valid `EDM` type for the rendered protocol version.
    + If `@odata.Type` can be applied, all canonic type facets (`MaxLength`, `Precision`, `Scale`, `SRID`) are
      removed from the Edm Node and the new facets `@odata { MaxLength, Precision, Scale, SRID }` are applied.
      Non Edm type conformant facets are ignored (eg. `@odata { Type: 'Edm.Decimal', MaxLength: 10, SRID: 0 }`).
    + Type facet values are not evaluated.
  + V2: Propagate `@Core.MediaType` annotation from stream element to entity type if not set.
- to.edm: Render constant expressions in short notation.
- Update OData Vocabularies: 'Common', 'Graph', 'Validation'.

### Fixed

- to.cdl:
  + Annotations of elements of action `returns` are now rendered as `annotate` statements.
  + Annotations on columns (query sub-elements) were not always rendered.
  + Doc comments on bound actions were rendered twice.
  + Unapplied annotations for action parameters were not rendered.
  + Unions and joins are correctly put into parentheses.
  + Add parentheses around certain expressions in function bodies that require it, such as `fct((1=1))`.
- to.edm(x):
  + Fix a bug in top level and derived type `items` exposure leading to undefined type rendering.
  + Fix a naming bug in type exposure leading to false reuse types, disguising invididual type
    modifications (such as annotations, (auto-)redirections, element extensions).
  + Ignore `@Aggregation.default`.
  + Consolidate message texts and formatting.
  + Fix navigation property binding in cross service rendering mode.
  + Remove partner attribute in proxy/cross service navigations.
- Core engine (function `compile`):
  + Annotations for new columns inside `extend projection` blocks were not used.
  + Extending an unknown select item resulted in a crash.
  + Extending a context/service with columns now correctly emits an error.
  + Unmanaged `redirected to` in queries did not check whether the source is an association.
- parseCdl: `extend <art> with enum {...}` incorrectly threw a compiler error.
- API: `compile()` used a synchronous call `fs.realpathSync()` on the input filename array.  
  Now the asynchronous `fs.realpath()` is used.
- On-conditions in localized convenience views may be incorrectly rewritten if an element
  has the same as a localized entity.
- to.sql/hdi/hdbcds:
  + No referential constraint is generated for an association if its parent
  or target entity are annotated with `@cds.persistence.exists: true`.
  + Fix rendering of virtual elements in subqueries
  + Correctly process subqueries in JOINs
- to.sql/hdi: Queries with `UNION`, `INTERSECT` and similar in expressions are now enclosed in parentheses.

## Version 2.14.0 - 2022-04-08

### Added

- cdsc:
  + `--quiet` can now be used to suppress compiler output, including messages.
  + `--options <file.json>` can be used to load compiler options. A JSON file is expected. Is compatible to CDS `package.json`
    and `.cdsrc.json` by first looking for `cdsc` key in `cds`, then for a `cdsc` key and otherwise uses the full JSON file.
  + `--[error|warn|info|debug] id1,id2` can be used to reclassify specific messages.
- Add OData Vocabularies: 'DataIntegration', 'JSON'.
  
### Changed

- Update OData Vocabularies: 'UI'.

### Fixed

- to.cdl:
  + Delimited identifiers as the last elements of arrays in annotation values are now
    rendered with spaces in between, to avoid accidentally escaping `]`.
  + Identifiers in includes and redirection targets were not quoted if they are reserved keywords.
- to.edm(x): Correctly rewrite `@Capabilities.ReadRestrictions.ReadByKeyRestrictions` into
  `@Capabilities.NavigationPropertyRestriction` in containment mode.

## Version 2.13.8 - 2022-03-29

### Fixed

- to.hdbcds/hdi/sql: Correctly handle `localized` in conjunction with `@cds.persistence.exists` and `@cds.persistence.skip`

## Version 2.13.6 - 2022-03-25

### Fixed

- to.hdbcds/hdi/sql: Correctly handle `localized` in conjunction with `@cds.persistence.exists`

## Version 2.13.4 - 2022-03-22

No changes compared to Version 2.13.0; fixes latest NPM tag

## Version 2.13.2 - 2022-03-22

No changes compared to Version 2.13.0; fixes latest NPM tag

## Version 2.13.0 - 2022-03-22

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



## Older Versions

The change log for older entries can be found at
[`doc/CHANGELOG_ARCHIVE.md`](doc/CHANGELOG_ARCHIVE.md).
