# ChangeLog for cds compiler and backends

<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD004 -->
<!-- (no-duplicate-heading)-->

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog but [here](doc/CHANGELOG_BETA.md).
The compiler behavior concerning `beta` features can change at any time without notice.

## Version 3.9.4 - 2023-06-07

### Fixed

- compiler: `USING` empty files were incorrectly marked as "not found".
- Localized convenience views for projections (not views) did not have references rewritten.
  This only affects CSN, the SQL result was correct.
- to.edm(x): Render correct EntitySetPath and annotation target path for actions/functions
  with explicit binding parameter.

## Version 3.9.2 - 2023-04-27

### Fixed

- Fix crash in core compiler which occurred when CAP was used in a node environments
  where an enumerable property was added to `Array.prototype`.
- to.edm(x):
  + Publicly release `@open`.
  + No `DefaultValue` for `Edm.NavigationProperty`.

## Version 3.9.0 - 2023-04-20

### Added

- Variables `$valid.from` and `$valid.to` have been added to the compiler.
  They behave the same as `$at.from` and `$at.to`.
- to.edm(x):
  + Add `--odata-vocabularies` to pass a dictionary `{ <prefix>: { Alias, Namespace, Uri } }`
    into the EDM generation. `<prefix>` must match the value of `Alias`. Entries are ignored
    if they are incomplete, malformed, redefine an official OASIS/SAP vocabulary or match the name
    of the current service. Annotations of the form `@<prefix>.<annotation>` are added to the API
    without evaluation including an `edm:Reference`. It is in the users responsibility to provide
    a URI that a client can resolve against a valid vocabulary document.
  + Support annotation `@open` on entity and structured type level to declare the corresponding
    entity/complex type to be `OpenType=true`. If an open structured type is declared closed
    (with a falsy annotation value), the corresponding EDM type is closed as well and suffixed
    with `_closed` (or `_open` vice versa).
    No further checks are performed on possibly open foreign or primary key types nor on eventually
    bucket elements to store the additional data.

### Changed

- compiler: Parameter references in filters such as `assoc[field < :Param]` are now allowed.
- In the compiled CSN, sort the non-enumerable `$sources` property
  according to the reversed layered extension order.
- Update OData vocabulary 'Common', 'ODM', 'UI'.
- to.cdl: If an identifier contains illegal characters (e.g. newline), we no longer produces
  invalid CDL, but emit an error instead.

### Fixed

- to.edm(x):
  + Fix spec requirement: "Navigation properties of complex types MUST NOT specify a partner".
  + Set default target cardinality for unspecified `composition of {}` to `[0..1]`.
  + Correct referential constraint calculation for `[0..1]` backlink associations.
- for.hana/for.odata: Reject final unmanaged assoc path step in ON Condition if preceded with `$self`.
- to.cdl: Parentheses around expressions containing conditions were sometimes missing.
- to.sql/hdi/hdbcds:
  + Detect and process calculated elements in functions like `upper`.
  + Better detection of calculated elements in `.expand`/`.inline`.
  + Entities with calculated elements sometimes had incorrect types. This happened, for example,
    if they were marked with `@odata.draft.enabled`

## Version 3.8.2 - 2023-03-30

### Fixed

- parser: Identifiers that are keywords were not allowed in annotation values inside arrays
- compiler: Compatibility against cds-lsp was restored.
- to.sql/hdbcds/hdi/edm(x): Fix a crash for sub-queries inside nested expressions of on-conditions of JOINs.

## Version 3.8.0 - 2023-03-27

### Added

- compiler:
  + Table aliases for sub-queries are no longer required.
  + A time zone designator can now be used in time literals, e.g. `time'16:41:01+01:30'`or `time'16:41:01Z'`.
- Calculated elements ("on-read") are now enabled per default.  
  When used in views, they are replaced by their value, for example:
  ```cds
  entity E { one: Integer; two = one + 1; };
  entity P as projection on E { two };
  // P is the same as:
  entity P as projection on E { one + 1 as two };
  ```
  This allows to define calculations centrally at the entity, which can be used by
  other views.
- In CDL, a ternary operator was added as a shortcut for `CASE` expressions:  
  `a ? b : c` is a shortcut for `CASE WHEN a THEN b ELSE c END`.  There is no CSN
  representation. The ternary operator is rendered as a `CASE` expression in CSN.
- In CDL and CSN, `not null` can now also be used in type definitions.
- In CDL (and CSN as before), elements can be defined without specifying a type.

### Changed

- API: We now report an error for most backends, if the input CSN has
  `meta.flavor == 'xtended'`, because only client/inferred CSN is supported.
- Update OData vocabularies 'PersonalData', 'UI'
- for.odata: Shortcut annotations `@label`, `@title`, `@description`, `@readonly` are no longer
  removed from the OData processed CSN.
- to.cdl:
  + Annotation arrays are split into multiple lines, if a single line would be too long.
  + Nested `SELECT`s are put into separate lines to make them more readable.
  + (Annotation) paths are quoted less often.
- to.sql: The list of reserved SAP HANA identifiers was updated (for smart quoting).

### Fixed

- The CSN parser now accepts bare `list`s in `columns[]`, similar to the CDL parser.
- to.cdl:
  + Delimited identifiers in filters are now surrounded by spaces if necessary, to avoid `]]`
    being interpreted as an escaped bracket.
- to.edm(x):
  + Remove empty `Edm.EntityContainer` again. Removal of an empty entity container has been
    revoked with [3.5.0](#fixed-7) which was wrong. An empty container must not be rendered
    as it is not spec compliant.
  + Correctly resolve chained enum symbols.
  + Fix a program abort during structured rendering in combination with `--odata-foreign-keys`
    and foreign keys in structured types.
  + Correctly render paths to nested foreign keys as primary key in structured mode with
    `--odata-foreign-keys`.
- to.hdi/to.sql/to.edm(x):
  + Reject unmanaged associations as ON-condition path end points.
  + Fix bug in message rendering for tuple expansion.
  + Correctly detect invalid @sql.append/prepend in projections.
- to.hdi/to.sql: The list of SAP HANA keywords was updated to the latest version.

### Removed

- for.odata: Undocumented shortcut annotation `@important` has been removed.


## Version 3.7.2 - 2023-02-24

### Fixed

- CSN parser: Structured annotations containing `=` were accidentally interpreted as expressions,
  even though the corresponding beta flag was not set.


## Version 3.7.0 - 2023-02-22

### Added

- Several `annotate` statement can append/prepend values
  to the same array-valued annotation without an `anno-duplicate` error,
  even if there is no `using from` dependency between the involved sources
- SQL methods such as `point.ST_X()` can be used in views.
- The SQL `new` keyword can be used for `ST_*` types such as `new ST_POINT('Point(0.5 0.5)') )`

### Changed

- Update OData vocabularies 'Common', 'Core', 'Measures', 'PDF', 'UI'.
- to.edm(x): Empty complex types are no longer warned about as they are allowed.

### Fixed

- `parse.cql` and `parse.expr` no longer ignore type arguments such as `cast(field as String(12))`.
  One argument is interpreted as `length` and two are interpreted as `precision` and `scale`, similar to
  how custom types and their arguments are interpreted.
- Previously, the compiler could not always find a unique redirection target if there were
  one direct projection on the model target and two or more projections on that projection.
- The performance of compiler-checks for deeply nested expressions/queries has been improved
- Fix various bugs in Association to Join translation:
  + Recursive `$self` dereferencing
  + Correct resolution of table alias in non-bijective `$self` backlink associations in combination with
    explicit redirection.
- to.edm(x): Process value help list convenience annotations on unbound action parameters.


## Version 3.6.2 - 2023-02-06

### Fixed

- to.hdi(.migration): Don't render `-- generated by cds-compiler version` comment at the top of the HDI-based
  artifacts, as this caused HDI to detect the file as `changed`
  and redeploy, causing way longer deployment times. Old behavior can be enabled with option `generatedByComment: true`.
- to.sql/hdi/hdbcds: Correctly handle variables like `$user` in `exists` filters.

## Version 3.6.0 - 2023-01-25

### Added

- API: There are new API functions for `to.cdl`: `smartId`, `smartFunctionId` and `delimitedId`.
- CDL parser: when defining a parameter for entities, actions or functions,
  you can use a regular identifier for its name even if that is a reserved name like `in`.
- The first parameter of a bound action or function can be typed with `$self` or `many $self`
  even if no type named `$self` exists.
- If an aspect `sap.common.TextsAspect` exists in the `sap.common` context, it will be included
  in all `.texts` entities. This allows to extend `.texts` entities via extending the aspect.  
  Example:
  ```cds
  entity E {
    key id : Integer;
    content: localized String;
  }
  extend sap.common.TextsAspect with {
    elem: String;
  };
  // from @sap/cds common.cds
  aspect sap.common.TextsAspect {
    key locale: String;
  }
  ```
- to.edm(x): Support explicit binding parameter `<id>: [many] $self` for OData V4 only.
  The explicit binding parameter is rendered as any other parameter and `$self` is replaced with
  the binding type but only if no `$self` definition exists in the model. This gives full control
  over the binding parameter including name, nullability, default value and annotations.
  The explicit binding parameter is ignored for OData V2 and has precedence over `@cds.odata.bindingparameter`.

### Changed

- Many messages concerning the CDL and CSN syntax are improved:
  affects message ids (`syntax-…`), message texts and the error locations.
- Duplicate doc-comments are now errors, similar to duplicate annotations.
- Update OData vocabularies 'Aggregation', 'Analytics', 'Capabilities','Common', 'ODM', 'Offline',
  'PDF', 'Session', 'UI'.

### Fixed

- If an entity with parameters is auto-exposed, the generated projection now has
  the same formal parameters and its query forwards these parameters to the origin entity.
- to.hdbcds: Aliases for foreign `keys` were not quoted if necessary.
- to.cdl:
  + Aliases for `expand` and foreign `keys` were not quoted if necessary.
  + Query functions that are CDL keywords were not properly quoted.
  + CSN `doc` properties containing `*/` resulted in invalid CDL.
    To avoid compilation issues, `*/` is escaped as `*\/`.
- to.edm(x): Respect record type hint `$Type` in EDM JSON as  full qualified `@type` URI property.

## Version 3.5.4 - 2023-01-10

### Fixed

- Allow window functions also with a deprecated flag being set.
- to.edm(x): Fix program abort due to malformed error location in EDM annotation preprocessing.
- to.sql/hdi/hdbcds: The option `pre2134ReferentialConstraintNames` can be used to omit the referential
  constraint identifier prefix `c__`.

## Version 3.5.2 - 2022-12-20

### Fixed

- to.sql/hdi/hdbcds: Don't process references in actions, as they have no impact on the database - avoids internal errors.

## Version 3.5.0 - 2022-12-07

### Added

- grammar: `localized` is now allowed in select items as well, to force the creation of convenience views.
- to.edm(x):
  + Validate annotation values of OASIS/SAP vocabulary term definitions against `@Validation.AllowedValues`.
  + Reveal dangling type references in produced EDM.
  + `@Capabilities` 'pull up' introduced with [3.3.0](#version-330---2022-09-29) must now be switched
    on with option `odataCapabilitiesPullup`.
- If option `addTextsLanguageAssoc` is set but ignored by the compiler, an info message is emitted.
  This can happen if, e.g., the `sap.common.Languages` entity is missing.
- Add OData vocabularies 'Offline' and 'PDF'.

### Changed

- to.edm(x):
  + Vocabulary references to `Common` and `Core` are added to the generated EDM by default to allow
    usage of these vocabularies in http messages even if the terms are not being used in the EDM itself.
  + API representation of enum types as `@Validation.AllowedValues` has been shifted from `for.odata` to
    `to.edm(x)`. This allows to reuse imported enum types in new APIs.
  + Messages raised from the EDM annotation renderer have been reworked with message id and enhanced message
    position including the annotation under investigation.
  + `@Validation.AllowedValues` annotation as introduced for enum elements with
    [1.44.2](./doc/CHANGELOG_ARCHIVE.md#version-1442---2020-10-09)
    are now always rendered into the API regardless of `@assert.range`.
- to.cdl: The input CSN is no longer cloned for client-CSN and parseCdl-CSN,
  as the renderer does not modify it.
- A new warning is emitted if compositions of anonymous aspects are used with the `Association`
  keyword instead of `Composition`. Replace the former with the latter to fix the warning.
- The previous info messages about annotating undefined artifacts (e.g. `anno-undefined-art`)
  are now warnings.

### Removed

- to.edm(x): 'Empty Schema' warning has been removed.

### Fixed

- Enums with a structured base type were accidentally not warned about if used in annotation definitions.
- for.odata/for.hana: Instead of parenthesising tuple expansion with `()`, put
  newly created expression in a `xpr` expression, if the term has more than one expansion.
- Annotation on indirect or inferred enum values were sometimes lost
- to.cdl:
  + Certain keywords of special functions no longer add superfluous parentheses.
  + Extension rendering now supports type extensions as well as `key` for elements.
  + Builtins that clashed names with implicit contexts were not rendered with `cds.` prefix.
  + Unknown artifacts (as can happen in parseCdl-style CSN) are now rendered as `USING` statements.
  + Type extensions in `csn.extensions` (e.g. for `length`) are now rendered.
- to.edm(x):
  + Fix a bug in type exposure when using `@cds.external` complex types.
  + Don't remove empty `Edm.EntityContainer`.
  + Aspects with actions outside of services are no longer warned about.
- for.hana: Fix a foreign key replacement bug during association to join translation.

## Version 3.4.4 - 2022-11-25

### Fixed

- compiler: CSN flavor `gensrc` (known as `xtended` in `@sap/cds`) lost annotations
  on enum values and projection columns.

## Version 3.4.2 - 2022-11-11

### Fixed

- Don't propagate `@cds.external` (The CDS Importer adds `@cds.external` for all
  imported definitions beginning with cds-dk@6.3.0, see CAP release log).
- for.odata: Ignore all `@cds.external` definitions.
- to.sql: For sql dialect `h2`, don't turn a Decimal with length 0 into a Decfloat.
- Extending a projection with an aspect could result in incorrect auto-redirection.
- Annotations of aspects were not properly propagated to projections under some order-specific circumstances.

## Version 3.4.0 - 2022-10-26

### Added

- to.sql: Add support for sql dialect `h2`, which renders SQL for H2 2.x.
- Projections can now be extended by annotation-only aspects, e.g. `extend P with MyAspect;`.

### Fixed

- Properly report an error for bare `$self` references,
  except in the `on` condition of unmanaged associations.
- Do not dump with references to CDS variables like `$now` in `expand`/`inline`.
- Properly report an error when trying to `cast` a column to an association.
- to.cdl: Identifiers that are always keywords in special functions are now escaped.
- to.edm(x):
  + Nested annotation was not applied if outer annotation has value zero.
  + Fix `AppliesTo=ComplexType, TypeDefinition` term definition directive.
- to.sql/hdi/hdbcds:
  + Properly report an error for `exists` with `$self.managed-association`
  + For sql dialect `hana`, add an implicit alias when using `:param` in the select list
  + Handle `$self` and magic variables during expansion of nested projections

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

## Version 2.15.10 - 2023-01-26

### Fixed

- If an entity with parameters is auto-exposed, the generated projection now has
  the same formal parameters and its query forwards these parameters to the origin entity.
- to.edm(x): Respect record type hint `$Type` in EDM JSON as full qualified `@type` URI property.

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
  + Explicit foreign keys of a managed association that are not a primary key in the target are exposed in the proxy.
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
