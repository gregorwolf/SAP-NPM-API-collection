# ChangeLog for cdx compiler and backends (Archive)

Note: `beta` fixes, changes and features are usually not listed in this ChangeLog.
The compiler behaviour concerning `beta` features can change at any time without notice.

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
  the query source do not not originate from the same defining entity. Raise an
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

* Make `annotate` statements on members of autoexposed entities and
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
* Make `annotate` statements on autoexposed entities work in circumstances.
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
* The name of an autoexposed entity now looks like `<Service>.<LastNamePart>`
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
  + if the the entity is not `abstract` or annotated with any `@cds.persistence` set to true and
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
* Don't autoexpose composition target which is annotated with `@cds.autoexpose: false`.

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
* Annotate entities with `@cds.autoexposed` that are autoexposed in a service.
* Always autoexpose composition targets without annotating them with `@cds.autoexpose`.
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
* When generating SQL for SQLite, replace the the special variables `$now`, `$user.id`
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
  same view is explicitly redirected. Up to now this modelling error was not
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
* Project name in github is now `cdx/cds-compiler`.

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
