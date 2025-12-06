# Incompatible Changes in CDS Compiler Version 6

This document lists (potentially) incompatible changes
which came with Compiler Version 6.

<!-- toc: start -->

1. [Preamble](#preamble)
2. [General](#general)
   1. [Increase Required Node.js Version to 20](#increase-required-nodejs-version-to-20)
   2. [Deprecate HDBCDS backend](#deprecate-hdbcds-backend)
   3. [Remove old deprecated flags](#remove-old-deprecated-flags)
3. [Changes in CDL and CSN parser](#changes-in-cdl-and-csn-parser)
   1. [Virtual elements in views](#virtual-elements-in-views)
   2. [`syntax-deprecated-ref-virtual` (warning in v5)](#syntax-deprecated-ref-virtual-warning-in-v5)
   3. [`syntax-unexpected-filter` (warning in v5)](#syntax-unexpected-filter-warning-in-v5)
   4. [`syntax-unexpected-after` (warning in v5)](#syntax-unexpected-after-warning-in-v5)
   5. [`syntax-duplicate-clause` (error in v5, downgradable)](#syntax-duplicate-clause-error-in-v5-downgradable)
   6. [`syntax-unexpected-many-one` (error in v5, downgradable)](#syntax-unexpected-many-one-error-in-v5-downgradable)
   7. [`syntax-invalid-name` (error in v5, downgradable with deprecated flag)](#syntax-invalid-name-error-in-v5-downgradable-with-deprecated-flag)
   8. [CSN parser: reject elements, enum and items inside cast function](#csn-parser-reject-elements-enum-and-items-inside-cast-function)
4. [Changes in Core Compiler](#changes-in-core-compiler)
   1. [Require columns to be virtual if they select non-virtual element of virtual structure](#require-columns-to-be-virtual-if-they-select-non-virtual-element-of-virtual-structure)
   2. [No SET for simple query inside parentheses](#no-set-for-simple-query-inside-parentheses)
   3. [Inconsistent handling of `@cds.persistence.skip: 'if-unused'`](#inconsistent-handling-of-cdspersistenceskip-if-unused)
   4. [Propagate actions from aspect to managed composition](#propagate-actions-from-aspect-to-managed-composition)
   5. [Disallow "not null default null"](#disallow-not-null-default-null)
   6. [Don't propagate doc comments](#dont-propagate-doc-comments)
   7. [No FK generation for "Association to Many Foo"](#no-fk-generation-for-association-to-many-foo)
   8. [Propagate journal annotation to generated entities](#propagate-journal-annotation-to-generated-entities)
5. [Changes in OData/EDM](#changes-in-odataedm)
   1. [Shorten message id prefix](#shorten-message-id-prefix)
6. [Changes in to.cdl()](#changes-in-tocdl)
   1. [Nesting Definitions in Services and Contexts](#nesting-definitions-in-services-and-contexts)
   2. [No namespace file](#no-namespace-file)
7. [Changes in to.sql()](#changes-in-tosql)
   1. [DB standard functions](#db-standard-functions)
   2. [Change semantics of `!=`](#change-semantics-of-!=)
   3. [Change translation of `$now`](#change-translation-of-now)
   4. [Switch off native HANA associations](#switch-off-native-hana-associations)

<!-- toc: end -->

## Preamble

Major versions are used to clean up things that could potentially break existing user code.
Such changes always have a reason, and we don't introduce them "just for the sake of it".


## General

### Increase Required Node.js Version to 20

Node.js 18 reaches EOL on April 30th 2025. Accordingly, we require Node.js 20 starting with cds-compiler v6.


### Deprecate HDBCDS backend

Only relevant for HANA on-prem (or "old" HaaS), as HANA CDS is not available on HANA Cloud.

In the early days of CAP, the only possibility to generate the DB schema was via
the hdbcds backend (i.e. generating HANA CDS files).

Since cds-compiler 1.5 the DB backend could alternatively be generated via hdbtable/hdbview,
while for new projects the default still was hdbcds.
With CDS 7 (corresponds to cds-compiler 4), the default was switched to hdbtable.

For regular CAP projects on HANA, there now is no need to use the hdbcds backend any longer.
They should migrate to hdbtable, see [hdbcds-to-hdbtable migration guide](https://cap.cloud.sap/docs/cds/compiler/hdbcds-to-hdbtable).

We started deprecating the hdbcds backend in compiler V5.
Now in V6:
- Document as deprecated
- No new features in hdbcds backend
- No bugfixes
- Using the hdbcds backend leads to an error message (can be downgraded to warning or info)
- Make sure that hdbcds is removed from all documentation ...
- ... and is not mentioned in any command line tool (e.g. `cds`)

The hdbcds backend can still be used by downgrading the error, e.g. in _package.json_:
```json
{
  "cds": {
    "cdsc": {
      "severities": {
        "api-deprecated-hdbcds": "Warning"
      }
    }
  }
}
```

With the next major version V7, we plan to remove the code.

When is hdbcds still needed?

- If custom code makes use of the HANA CDS metadata in the HANA catalog
- XSA to CAP migration currently requires deployment via hdbcds as an intermediate step.
  Should no longer be necessary with HANA 2 SPS08 (RTC 20.11.2024)


### Remove old deprecated flags

As mentioned in the ChangeLog, we removed deprecated flags `includesNonShadowedFirst`,
`eagerPersistenceForGeneratedEntities` and `noKeyPropagationWithExpansions`.
If you really still need them, please let us know (and give some reasons for your wish).

All hidden deprecated flags (i.e. those listed as removed before,
but actually having been just renamed) are now really removed.


## Changes in CDL and CSN parser

The first of the following sub sections covers an potential incompatible change
with `virtual` columns in a `select`.

The remaining sections cover warnings and configurable errors in v5 that
become errors in v6 (some are downgradable, some are not).
Some message id and text might be different.
If possible, the message text now includes expected tokens which are valid
instead of the erroneous one.


### Virtual elements in views

Up to V5, a virtual element in a view can only be declared when also
a value (literal, reference, even expression is possible) is specified.

```cds
entity E {
  a : String;
  b : String;
  c : Integer;
  foo: { bar : Integer; }
};
view V as select from E {
  virtual null as myV0 : String,
  virtual 17   as myV1 : Integer,
  virtual 3*c  as myV2 : Integer,

  virtual a as myV3 : String,  // pre v6: refers to E:a
  virtual a         : String,  // pre v6: refers to E:a
  virtual a as myV4,           // pre v6: refers to E:a
  virtual b,                   // pre v6: refers to E:b
  virtual E.c,
  virtual foo.bar
}
```

Important: When the "value" is a reference without an explicit type (CDL style cast),
all properties (incl. annotations) of the base element are propagated to the virtual view element,
and the view element can be traced back to the respective element of the base entity.

In V6, it is possible to define "new" virtual elements in a view without a value,
with and without providing a type:
```cds
view V as select from E {
  virtual newV0 : String,  // v6: just new name, no reference to `newV0`
  virtual newV1,           // v6: just new name, no reference to `newV1`
}
```

In v6, we __change the semantics__ of such virtual select list entries:  
the compiler doesn't try to resolve names `newV0/1` as elements of `E`,
but these are new elements that are not linked to an element of `E` in any way.

Consequence: if the name of the virtual element is present as element in `E`
and there is no explicit type specification (as this would break the chain anyway),
the semantics of such a select item changes.
```cds
view V as select from E {
  virtual a : String,  // v5: like `virtual a as a : String`
  virtual b,           // v5: like `virtual b as b`
}
```
Incompatibilities in the example:
- none for `a`, as the CDL style cast cuts off property propagation anyway
- some for `b`: no properties are propagated anymore;
  use `virtual b as b` to get the v5 behavior also in v6.

There is no change in semantics if the syntax clearly indicates that the select item is
a reference, e.g. if an alias is present, if a table alias is used, or if the reference is a path:
```cds
view V as select from E {
  virtual a as myV3,  // alias       -> `a` is a reference (no change)
  virtual E.c,        // table alias -> this is a reference (no change)
  virtual foo.bar     // path        -> this is a reference (no change)
}
```

With v5.9, we have introduced a warning for those select items whose semantics changes with in v6.


### `syntax-deprecated-ref-virtual` (warning in v5)

In v6, an initial `virtual` at the beginning of an `expand` or `inline` column is
parsed in the same way as an initial `virtual` at the beginning of a `select` column.

Up to v5, the nested `virtual` was always considered a reference or function name,
which could lead to a constructed incompatibility:

```cds
entity Base {
  key virtual: Integer;           // element named 'virtual' - great choice
  name: Integer;
  me: Association to Base;
}
entity Proj as select from Base {
  virtual -42 as minusFourtyTwo,  // v5=v6: 'virtual' is keyword
  me {
    virtual -42 as subtraction,   // v5: 'virtual' is ref, v6: keyword → Error
    virtual name,                 // v5: 'virtual' is ref, v6: keyword → Error
    virtual (42) as funcCall,     // v5: 'virtual' is function, v6: keyword → Error
  },
  virtual (42) as fourtyTwo,      // v5=v6: 'virtual' is keyword
}
```

As `virtual` is not allowed inside `expand` and `inline`, the above model
leads to a syntax error in v6.

Situation v5: warning (`syntax-deprecated-ref-virtual`, introduced in v5.9);  
v6: (non-downgradable) error `syntax-unexpected-modifier` (new parser) or
`syntax-deprecated-ref-virtual` (old parser)

_Fix_: if you really want to name an element `virtual`
(in any lower-/upper-case variation), use a delimited id (`![virtual]`)
when referring to it at the beginning of an `expand`/`inline` column expression
(as you already have to do so at the beginning of a `select` column expressions).


### `syntax-unexpected-filter` (warning in v5)

You can't provide a filter to the result of a function call.
In v5, it is simply ignored, with a warning since v5.8.

```cds
entity Proj as select from Base {
  count(*)[ uncheckedFilterRef > 0 ] as count,
  assoc()[ id > 0 ] as target
};
entity Base { id: Integer; assoc: Association to Target; }
entity Target() { key id: Integer; } // in definitions unnecessary () are still allowed
```

Situation v5: warning (introduced in v5.8);
v6: downgradable error.

_Fix:_ Delete the ignored filter.
In the second column, you probably meant to follow the association `assoc`,
not calling a function named `assoc` → remove the `()`.


### `syntax-unexpected-after` (warning in v5)

#### Default

Because CDL has no array literals, providing a `default` value
for an element or parameter using `many` or `array of` as type is erroneous.

```cds
entity E { elem: many String default 42; }  // error in v5: syntax-unexpected-token
action Act( PAR: many String default 42 );  // warning in v5: syntax-unexpected-after
```

Situation v5: error `syntax-unexpected-token` for element; warning `syntax-unexpected-after` for parameter
(introduced in v5.3), OData backend ignores the default value;  
v6: (non-downgradable) error `syntax-unexpected-token` for element and parameter.

#### Annotation

The effect of the following type expression is probably very surprising:  
`String`, `null` and `enum` determine the _line_ type,
but `@anno` _in between_ `null` and `enum` clauses is assigned to the _complete element_.  

```cds
entity E {
  bar: many String null @anno enum { symbol };  // @anno annotates to element(!), not the line type
}
```

Situation v5: warning `syntax-unexpected-after` (introduced in v5.3);  
v6: (non-downgradable) error `syntax-unexpected-token`.

_Fix:_ move the annotation assignment out of the type expression, e.g. before the element name `bar`.


### `syntax-duplicate-clause` (error in v5, downgradable)

In some places it is possible to provide contradicting clauses.

Has the following element a `not null` constraint or not?
```cds
entity E {
  elem: Integer null default 42 not null;
}
```

Is the following association “to many” (via `*` inside `[…]`) or “to one”?
```cds
entity E {
  key ID: UUID;
  assoc: Association[*] to one E;
}
```

Situation v5: downgradable error (`syntax-duplicate-clause`);  
v6: (non-downgradable) error `syntax-unexpected-token`.

Remark: if the clause is repeated without conflicting semantics,
the corresponding message is still just a warning `syntax-duplicate-equal-clause`.

### `syntax-unexpected-many-one` (error in v5, downgradable)

A composition type definition with a user-provided foreign key (not a commonly used feature)
to an entity named `many` or `one` (in all lower-/upper-case variations)
looks syntactically like a managed composition of an anonymous aspect.
Because the latter is not allowed as type (only as element), the following model leads to a syntax error:

```cds
entity Many { key id };
type MyType: Composition of Many { id };
```

Situation v5: downgradable error `syntax-unexpected-many-one`;  
v6: (non-downgradable) error `type-unexpected-target-aspect`.

### `syntax-invalid-name` (error in v5, downgradable with deprecated flag)

An empty string as name for an element (or any other definition) is not the best idea:

```cds
entity E {
  ![]: Integer;
}
```
> Remark: Empty names are neither allowed on HANA, nor in OData. Probably none uses this.

Situation v5: error, downgradable with deprecated flag (`--deprecated downgradableErrors --warn syntax-invalid-name`);  
v6: non-downgradable error.


### CSN parser: reject elements, enum and items inside cast function

The following properties are no longer allowed to occur in the SQL cast function:
- `enum`
- `elements`
- `items`


## Changes in Core Compiler

### Require columns to be virtual if they select non-virtual element of virtual structure

If a user selects an element of a virtual structure that itself is not explicitly marked as virtual,
then the select item must be explicitly marked as virtual, too.
The compiler does not propagate `virtual` to the column, as the selected element isn't `virtual`, either.

```cds
entity E {
  virtual struct : {    // < virtual struct
    a : String;         // < elem is not marked as virtual
    b : String;         // < elem is not marked as virtual
    virtual c : String  // < elem is marked as virtual
  };
};
entity P as projection on E {
  struct.a,           // < ERR (since v6, warning before)
  virtual struct.b,   // < ok
  struct.c            // < ok
};
```

Situation v5: warning; v6: configurable error.

```
Warning[def-missing-virtual]: Prepend ‘virtual’ to current select item - referred element “E:struct” is virtual which is not inherited
   |
  ../e.cds:N:3-9, at entity:“P”/column:“str”
   |
 9 |   struct.str
   |   ^^^^^^
```

Note: Upon flattening, the flat elements resulting from `struct` are all virtual.

Remark: it would be nice and users probably would expect that `virtual` is
propagated to the elements.


### No SET for simple query inside parentheses

Before V6, (unnecessary) parentheses around a simple query, like in
```cds
entity E { id };
entity V as (select from E) order by id;
```
were represented in CSN by a `SET`:
```json
query: { SET: { args: [ { SELECT: { from: … } } ], orderBy: … } }
```

This is now simplified to
```json
query: { SELECT: { from: …, orderBy: … } }
```

If the compiler receives as input a CSN in the "old" format, it is rewritten.

Additionally, we do not allow repeated `order by` or `limit`, e.g.
```cds
entity V as ( select from E order by id ) order by id;
```
This change should be uncritical, as the generated SQL was invalid (at least for HANA and SQLite):
```sql
CREATE VIEW V AS ((SELECT E_0.id FROM E AS E_0 ORDER BY id)) ORDER BY id;
```

Remark: such `SET` queries as generated by v5 were not supported by runtimes in some situations,
i.e. this change potentially fixes the runtime behavior.


### Inconsistent handling of `@cds.persistence.skip: 'if-unused'`

In our backends we have
- checks that test for `=== true`
- checks that test for truthy

In v6, consistently check for truthiness, but have a special handling for `if-unused` and handle it as false.

This change is not expected to have any observable changes.


### Propagate actions from aspect to managed composition

The generated child entity for a managed composition of named aspect should
inherit the actions (and functions) from the aspect.

```cds
aspect A {
  key id : String;
} actions {
  action a();
};

entity E {
  key id : String;
  comp: Composition of A; // -> generated E.comp should have the action
};
```

`E.comp` "includes" `A`, so that _all_ properties of `A` (also actions/functions) become properties of `E.comp`.
Ensure that order of key elements does not change.

It is possible switch back to old behavior via deprecated switch `noCompositionIncludes`.


### Disallow "not null default null"

There is no known use case where an element definition with both `not null` and `default null` is reasonable.
```cds
  elem : <type> not null default null;
```

Such a definition is rejected by the compiler
- in element definitions
- in entity parameter definitions
- in action/function parameter definitions

The first two should be uncritical, as the combination of `not null` and `default null` should lead to an error
upon deployment.  The third may be an incompatible change.

The error (`type-unexpected-null`) is configurable.


### Don't propagate doc comments

Currently, doc comments are controlled via switch `docComment` with three-valued logic:

- truthy : keep doc comments in CSN, translate CDL doc comments to `doc` property in CSN
- falsy excl. `false` : keep doc property in CSN, don't translate CDL doc comments to `doc` property in CSN
- `false` : remove doc comments (also if they come in via CSN)

If doc comments are present in CSN,

In v5, doc comments are propagated according to usual propagation rules.  
In v6, doc comments are by default not propagated, only if the option `propagateDocComments` is set.


### No FK generation for "Association to Many Foo"

An association "to many" w/o explicit FKs and w/o ON-condition
```cds
entity E {
  key id : Integer;
  assoc: Association to many F;
}
entity F { key id : Integer; }
```
has up to and including v5 been treated as managed association with implicit FK, i.e. FKs are generated that reflect the key of the target.

Client CSN:
```json
"f": {
  "type": "cds.Association",
  "cardinality": {"max": "*"},
  "target": "F",
  "keys": [{"ref": ["id"]}]
}
```
OData CSN:
```json
"f": {
  "type": "cds.Association",
  "cardinality": {"max": "*"},
  "target": "S.F",
  "keys": [{
    "ref": ["id"],
    "$generatedFieldName": "f_id"
  }]
},
"f_id": {
  "type": "cds.Integer",
  "@odata.foreignKey4": "f"
}
```
This is in most cases not what a user has intended, thus there was a warning `assoc-incomplete-to-many`.

In v6, the situation is as follows:

- such a definition is to be regarded as an "unspecified" association/composition, similar to
    `Association to many F {}`
- core compiler: no compiler message, do not generate a `keys` array (not even an empty one)
- for.odata/to.edmx: do not generate foreign key elements, just render NavigationProperty
- toSql: raise error for such association (i.e. for association with cardinality to-many w/o ON condition and
  w/o keys array)

The error in the SQL backend is to prevent data loss in existing projects that by mistake
have such associations. Otherwise we would just drop FK columns on the database and loose
the content. In a future major release (ideally not already v7 but better v8) we can
assume that all projects have been fixed and remove the error.

User action:
- if a real managed association is needed, fix by changing cardinality to "to one"
- if an unspecified association is needed, add explicit empty keys array `{}`
- or model a correct to-many association, if that is what is needed

There is a deprecated flag `noQuasiVirtualAssocs` to get back the old behavior.


### Propagate journal annotation to generated entities

Build/tools team has decided to change semantics of `@cds.persistence.journal` (hdbmigrationtable),
so that now switching on journal for an entity automatically also switches it on for the related texts entity.
User can opt out by explicitly annotating texts entity with `@cds.persistence.journal: false`.

When using "composition of aspect", this annotation is now also copied from an entity to its generated composition children.

The compiler doesn't copy the annotation to generated drafts entity.
Reasoning: hdbtablemigration mainly used for controlling
migration of large tables, but the drafts table usually has only few entries.
Don't copy it to localized convenience views, too.

As always, we don't overwrite user-provided annotation `@cds.persistence.journal`
on a generated entity.


## Changes in OData/EDM

### Shorten message id prefix

Shorten message id prefix `odata-spec-violation-` to `odata-`.

Benefit?
- shorten the IDs
- also: define more specific msg IDs (currently there are rather coarse grained)

Only "incompatible" effect: people would see different msg id
(the old msg ids still can be used to downgrade messages, the new should be preferred, though).


## Changes in to.cdl()

### Nesting Definitions in Services and Contexts

With compiler v5.9., it became possible to nest definitions into services/contexts
and extract a common namespace via setting options. In v6, nesting is made the default.
It is possible to switch back to the old behavior by setting these options to `false`:
- `renderCdlDefinitionNesting`
- `renderCdlCommonNamespace`


### No namespace file

Behavior up to v6: If input CSN for `toCdl` contains property `namespace`,
`toCdl` produces two files. One contains the model, the other one only contains a `namespace`
and a `using` directive. This second file is only needed to ensure that when fed into the compiler,
the result is again a CSN with a `namespace`.

The `namespace` is not an official CSN property, but is only needed in the Node runtime for
a shortcut to address some entities in custom code without having to write their full name.
When transferring CSN, it is not intended to also transfer the `namespace`, as this shortcut
mechanism should be set up by the consumer of the CSN in his app, e.g. by adding an `index.cds`
which adds the respective namespace.

In v6, `toCdl` does not render this additional file anymore.

## Changes in to.sql()

### DB standard functions

The new standard functions are currently available via switch `standardDatabaseFunctions`.
In v6, make them default, but keep switch to allow users to get back old behavior.
The function names are case sensitive, thus the native DB function is available by
writing the function name not in lower case.

Hint for users: use sql preview in VS Code to check what is actually used/rendered.


### Change semantics of `!=`

Change behavior of operator `!=` in SQL backend:
- situation v5: SQL semantics, behaves like `<>`
- planned for v6: switch to 2-valued Boolean semantics, for precise translation see BLI

Note: option `booleanEquality` only affects `!=`.


### Change translation of `$now`

Before V6, we translate `$now` in CDS models to `CURRENT_TIMESTAMP` when generating SQL.
This is not consistent with the behavior of the CAP runtimes, which translate `$now`
to `session_context('$now')` on HANA and corresponding constructs for other databses.

In V6, we change the mapping to do the same as the runtimes, with one exception:
as the `default` clause in HANA (other databases, too?) doesn't allow `session_context('$now')`,
we don't change the mapping of `$now` in the `default` clause and still render `CURRENT_TIMESTAMP`.

It is possible to switch back to the old behavior with option `dollarNowAsTimestamp`.


### Switch off native HANA associations

With v5 we introduced the possibility to switch off generation of native HANA associations.
In v6, generation of native HANA associations is switched off by default.

Generation of native HANA associations can be switched on via
```json
{
  "cds": {
    "sql": {
      "native_hana_associations": true
    }
  }
}
```

To avoid long migrations when upgrading to v6, we recommend to set HDI deploy parameter
`try_fast_table_migration`.
