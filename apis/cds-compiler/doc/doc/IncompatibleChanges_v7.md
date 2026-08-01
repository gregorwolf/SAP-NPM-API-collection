# Incompatible Changes in CDS Compiler Version 7

This document lists (potentially) incompatible changes
which came with Compiler Version 7.

<!-- toc: start -->

1. [Preamble](#preamble)
2. [Summary](#summary)
3. [General](#general)
   1. [Increase Required Node.js Version to 22](#increase-required-nodejs-version-to-22)
   2. [Remove HDBCDS backend](#remove-hdbcds-backend)
   3. [Remove old deprecated flags](#remove-old-deprecated-flags)
4. [Changes in CDL and CSN parser](#changes-in-cdl-and-csn-parser)
   1. [syntax-unsupported-masked](#syntax-unsupported-masked)
5. [Changes in Core Compiler](#changes-in-core-compiler)
   1. [name-deprecated-$self](#name-deprecated-self)
   2. [String representation for expression-like annotation values](#string-representation-for-expression-like-annotation-values)
   3. [Default for structures](#default-for-structures)
   4. [Default for arrays)](#default-for-arrays-ic-v7-33)
   5. [Extend builtin with type properties](#extend-builtin-with-type-properties)
   6. [Key propagation](#key-propagation)
   7. [Annotate with invalid target](#annotate-with-invalid-target)
   8. [Duplicate element via extend with aspect](#duplicate-element-via-extend-with-aspect)
   9. [Extend ... with definitions](#extend--with-definitions)
   10. [Propagate value null](#propagate-value-null)
   11. [Expression as UP TO value](#expression-as-up-to-value)
   12. [Associations defined via backlink associations](#associations-defined-via-backlink-associations)
6. [Changes in OData/EDM](#changes-in-odataedm)
   1. [Vocabulary change for Common.SideEffectsType](#vocabulary-change-for-commonsideeffectstype)
7. [Changes in to.sql()](#changes-in-tosql)
   1. [Remove option to generate transitive localized views](#remove-option-to-generate-transitive-localized-views)
   2. [Change type mapping for Decimal on SQLite](#change-type-mapping-for-decimal-on-sqlite)

<!-- toc: end -->



## Preamble

Major versions are used to clean up things that could potentially break existing user code.
Such changes always have a reason, and we don't introduce them "just for the sake of it".

## Summary

| Title                               | Cat | Prob     |
| ----------------------------------- | --- | -------- |
| Remove HDBCDS backend               | 1   | very low |
| Remove old deprecated flags         | 1   | very low |
| syntax-unsupported-masked           | 1   | very low |
| name-deprecated-$self               | 1   | very low |
| String representation for anno-xpr  | 4   | low      |
| Default for structures              | 2   | low      |
| Default for arrays                  | 2   | low      |
| Extend builtin with type properties | 2   | very low |
| Key propagation                     | 3   | low      |
| Sec-Annotate with invalid target    | 2   | high     |
| Duplicate elem by extend w/ aspect  | 2   | low      |
| Extend ... with definitions         | 4   | zero     |
| Propagate value null                | 4   | very low |
| Expression as UP TO value           | 2+4 | low      |
| Associations via backlink           | 2   | low      |
| OData: Common.SideEffectsType       | 5   | low      |
| SQL: Transitive localized views     | 5   | very low |
| SQL: Decimal on SQLite              | 3   | ?        |

Category:
* 1: remove an _undocumented_ switch that was used to avoid an error or to get back an old behavior
* 2: new error, model must be fixed
* 3: changed behavior
* 4: changed CSN
* 5: other

Prob: probability that change has a _negative_ impact on projects that _requires_ an action



## General

### Increase Required Node.js Version to 22

Node.js 20 reached EOL in April 2026. Accordingly, we require Node.js 22 starting with cds-compiler v7.


### Remove HDBCDS backend

Only relevant for HANA on-prem (or "old" HaaS), as HANA CDS is not available on HANA Cloud.

In the early days of CAP, the only possibility to generate the DB schema was via
the hdbcds backend (i.e. generating and deploying HANA CDS files).

Since cds-compiler v1.5 the DB backend could alternatively be generated via hdbtable/hdbview,
while for new projects the default still was hdbcds.
With CDS 7 (cds-compiler v4), the default was switched to hdbtable,
see [Release Notes June 2023](https://cap.cloud.sap/docs/releases/2023/jun23#deploy-format-hdbtable).

For regular CAP projects on HANA, there is no need to use the hdbcds backend any longer.
They should migrate to hdbtable.

We started deprecation in v5 with issuing a warning when the hdbcds backend was invoked:
* capire [release notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24#deprecation-of-deploy-format-hdbcds)
* [Migration guide](https://cap.cloud.sap/docs/cds/compiler/hdbcds-to-hdbtable)

This warning was raised to a (configurable) error `api-deprecated-hdbcds` in v6:
* capire [release notes May 2025](https://cap.cloud.sap/docs/releases/2025/may25#removed-hdbcds-format)

Now, in v7, we remove the code for the hdbcds backend.


### Remove old deprecated flags

We removed deprecated flags `noPersistenceJournalForGeneratedEntities` and
`noCompositionIncludes`.
If you really still need them, please let us know (and give some reasons for your wish).

All hidden deprecated flags (i.e. those listed as removed before,
but actually having been just renamed) are now really removed.


## Changes in CDL and CSN parser

### syntax-unsupported-masked

Keyword masked is not supported.

```cds
entity E {
  key id : Integer;
  masked val : String(22);
}
```

It was ...
* introduced in first compiler versions on request by TNT, but never documented
* made an error (configurable) already in cds-compiler v3.

The error could be downgraded with
```sh
cdsc b51.<file> --warn syntax-unsupported-masked --deprecated downgradableErrors
```

In cds-compiler v7:  
As we don't plan to support `masked` in the near future, we make it
an unconfigurable error by removing it from the syntax.


## Changes in Core Compiler

### name-deprecated-$self

`$self` should not be used as name for an artifact definition.

In cds-compiler v5, we introduced a configurable error,
see [Release Notes](https://cap.cloud.sap/docs/releases/2024/jun24#no-definition-named-self).

Example:
```cds
entity $self {
  key id : Integer; // err: name-deprecated-$self
}
```

The error could be downgraded with
```sh
cdsc <file> --warn name-deprecated-$self
```

In cds-compiler v7, we make `name-deprecated-$self` a non-configurable error.


### String representation for expression-like annotation values

Before cds-compiler v7:  
The CSN representation of an expression-like annotation value is an object with
properties `=` and one of `ref`, `xpr`, `val`, `func`, `SELECT`, `list`.
In `=` we capture the (space-normalized, comments removed) string CDL representation of the expression,
the other one holds the parsed expression as a token stream.

When the annotation is propagated ...
* the token stream representation is rewritten, if necessary
* if the expression is a path/reference (`ref`), the string representation is rewritten, too
  (including paths with filter)
* for all other expressions: if no rewriting is necessary, the string representation in `=` is kept,
  otherwise it is set to `true`

Remark: for CSN input, there is no check that the string actually corresponds
to the CSN representation of the expression provided in sibling properties of `=`;
CSN consumers are advised not to rely on the value of `=`.

Example:
```cds
@Anno: (a+b)
entity E {
  key id : Integer;
  a : Integer;
  b : Integer;
}
entity P as projection on E { a as x, b as y};
```
Resulting CSN:
```jsonc
{
  "definitions": {
    "E": {
      "kind": "entity",
      "@Anno": {
        "=": "a+b",
        "xpr": [ { "ref": ["a"] }, "+", { "ref": ["b"] } ]
      },
      "elements": { /*...*/ }
    },
    "P": {
      "kind": "entity",
      "@Anno": {
        "=": true,
        "xpr": [ { "ref": ["x"] }, "+", { "ref": ["y"] } ]
      },
      "projection": { /*...*/ }, "elements": { /*...*/ }
    }
  }
}
```

In cds-compiler v7:  
* For anno-xpr that are a simple ref (simple: can be path, but no filter, no parameters)
  in the compiler and runtime CSN:
  - In `=`, render the `.`-concatenated `ref` items without CDL escaping
    (like for unchecked references, but unlike compiler v6);
    e.g. for a reference, written as `(![in])` in CDL, use `{ '=': 'in', ref: ['in'] }` in CSN.
  - When rewriting is necessary, also adapt the `=`.
* For expression which are a simple enum symbols, with or without surrounding parentheses:
  - Just render the `#`, omit the `=` property.
* For expressions which are represented in CSN by a simple `xpr`:
  - Do not render a `=` property anymore, just render the `xpr`.
* For all other expressions:
  - Use `=` property with value `true`, do not use the CDL source as value,
    both in original and in propagated annotations.

With the removal of `=`, any object in a CSN with just a `xpr`
is regarded as an expression value. With that, a structure inside an array
with just a `xpr` property could not be represented without ambiguity.

Therefore, the parser in v7 reports an error for such invalid structure values:
```cds
@A_xpr: [(2*foo)]
@A_str: [{xpr: [{val: 2}, '*', {ref: ['foo']}]}]
entity E { foo : Integer; }
```
The compiler also reports an error for structures inside arrays containing a `=` property and
a primary expression property (`ref`, `xpr`, `list`, `val`, `#`, `func`, `SELECT` and `SET`).

### Default for structures

Before cds-compiler v7:  
Providing a default value for a structured element resulted in a warning, the default was ignored in backends.

```cds
type T : {
  a : String;
  b : Integer;
};

entity E {
  field : T default 22;  // v6: warning, ignored in SQL and OData
}
```

This is an inconsistent situation:
* default for a structured element causes a warning,
  the default value is ignored by SQL and OData backend (even if `T` has only one element)
* one-element struct comparisons with a scalar are allowed
* a `default` for a managed association with one foreign key is allowed

In cds-compiler v7:
* for structs with one leaf element:
  - allow in compiler, remove the warning
  - add the default in SQL/OData (like for managed assoc)
* for structs with more than one leaf element
  - configurable compiler error


### Default for arrays

Before cds-compiler v7:  
Providing a default value for an array element is accepted and reflected (illegally) in the runtimes.

```cds
type T : array of Integer;

entity E {
  field : T default 22;
}
```

Default is recorded in CSN.

Resulting OData - is illegal according to CSN spec:
```xml
<Property Name="field" Type="Collection(S.T)" Nullable="true" DefaultValue="22"/>
```
Resulting SQL - probably this doesn't work:
```sql
field NCLOB DEFAULT 22,
```


Note: providing a default for an array element defined inline is syntactically forbidden:
```cds
entity E {
  field : array of Integer default 22;
}
// -> Error[syntax-unexpected-token]: Mismatched ‘default’, expecting ...
```

In cds-compiler v7:
providing a default value for an array element is an error.


### Extend builtin with type properties

Before cds-compiler v7:  
Extend statements that add type properties to builtin types are ignored.

Example:
```cds
extend cds.String with (length: 39);  // is ignored
extend cds.Integer with (length: 39); // is ignored
```
Such extends are highly dubious, in particular the second one, which sets a property that
doesn't exist for the type.

In cds-compiler v7,
the compiler throws configurable errors for these situations.
Planned to make non-configurable in v8.


### Key propagation

Before cds-compiler v7:  
A view or projection inherits the key of the underlying base entity, if ...
* no explicit key is set in the query
* all key elements of the primary base entity are selected
* no union, join or similar query construct is used
* no path expression with a to-many association is used

(key = the entirety of the key elements)

Essentially this means: we propagate the key only in situations
where we are (almost) sure that the result is a valid key. "Almost", because
a path with a to-many association isn't recognized inside an expression.

These rules are unnecessarily complex.

In cds-compiler v7:  
Simplify rules: a view or projection inherits the key of the
underlying base entity, if ...
* no explicit key is set in the query
* all key elements of the primary base entity and all key elements of joined
  entities are selected

Note: second rule is very strict, as oftentimes not all key elements of the target need
to be selected because they are tied to a key element of the source via the ON condition.
In these situations no key is propagated and we basically have the same situation as before v7.

This change means:
we would propagate the key also in many situations where we are not sure the
result is a valid key.


### Annotate with invalid target

Before cds-compiler v7:  
An annotate statement with an invalid (i.e. non-existing) target results in a warning.

Only for the security related annotations `@restrict`, `@requires`, and `@ams` we issue a configurable error
since cds-compiler 6.5 (see [capire Release Notes November 2025](https://pages.github.tools.sap/cap/docs/releases/2025/nov25#security-annotations)).
Note that there are three different error ids/error messages.

Example:
```cds
service S {
  entity Foo {
    bar : Integer;
  }
}

annotate S.FooX with @restrict: [{ grant:['WRITE'], to: ['Admin'] }];
// -> Error[ext-undefined-def-sec]: Artifact “S.FooX” has not been found

annotate SX.Foo with @restrict: [{ grant:['WRITE'], to: ['Admin'] }];
// -> Error[ext-undefined-art-sec]: No artifact has been found with name “SX”

annotate S.Foo:barX with @ams.attributes: (bar);
// -> Error[ext-undefined-element-sec]: Element “barX” has not been found
```

In v7, we additionally
* consolidated the messages: `ext-undefined-art-sec` now is `ext-undefined-def-sec`
* closed a gap, where we before missed some invalid `annotate` statements


### Duplicate element via extend with aspect

Before cds-compiler v7:  
If the same element gets into an entity via two direct includes, the compiler issues an error.

Example:
```cds
aspect A { field : String; }
aspect B { field : String; }

entity E : A, B {
  name: Integer;
}
```
-> Error[`duplicate-definition`]: Duplicate element “field” through multiple includes “A”, “B”

If the aspects are applied to the entity via `extend`, the compiler accepts this.

Example:
```cds
aspect A { field : String; }
aspect B { field : Date; }

entity E {
  name: Integer;
}

extend E with A;
extend E with B;
```

This is not correct, as `extend` should have the same effect as a direct include.
This was an unnoticed regression: the compiler issued an error until version 3.4.

In cds-compiler v6.9,
we introduced a warning as preparation.

In cds-compiler v7,
duplicate elements via `extend` are an error:
```txt
Error[ext-duplicate-include]: Duplicate element “field” through multiple includes “A”, “B”
```


### Extend ... with definitions

Before cds-compiler v7:  
`extend Foo with definitions ...` produces empty `extend` blocks in parsed CSN.

Example:
```cds
service S {}
extend S with definitions { type A : String; }
type S.B : String;
```
Parsed CSN:
```json
{
  "definitions": {
    "S":   { "kind": "service" },
    "S.A": { "kind": "type", "type": "cds.String" },
    "S.B": { "kind": "type", "type": "cds.String" },
  },
  "extensions": [
    { "extend": "S" }
  ]
}
```

Information content of the empty `extend` is very limited:
We know that in the original source there was an `extend`, but we don't know
whether `S.A` or `S.B` came via the `extend`.

In cds-compiler v7:  
Remove the empty `extend` (or `annotate`). Keep empty `extend` in parsed CSN only
when the `extend` in CDL is empty: `extend S` (or make that a syntax error).



### Propagate value null

Before cds-compiler v7,
an annotation with value `null` is not propagated (`null` effectively "removes" the annotation).

This causes a recompilation issue with the following example:
```cds
@type type Text: String;
type Base { @elem @type: null elem: Text(20) };
entity Incl : Base {};          // recompile: Incl:elem gets @type
type Derived: Base;
annotate Derived:elem with @anno; // recompile: Derived:elem gets @type
```
After first compilation, `Incl:elem` does not have annotation `@type` (as value `null` prohibits propagation).
In recompilation, `Incl:elem` gets annotation `@type` with value `true` via the type `Text`.

There is no recompile issue with the following example, but "linked" CSN would benefit
from propagating annotations with value `null`, too.
```cds
entity Root { @elem @type: null elem: Text(20) }
entity Proj as projection on Root; // Proj:elem should have @type: null
```
What is the problem here: look at `Proj:elem`, there is no explicit annotation `@type`.
Via prototype the properties are obtained from the type `Text`, where `@type` has value `true`.

In cds-compiler v7, the annotation with value `null` is propagated like any other annotation.


### Expression as UP TO value

When we introduced expressions as annotation values, we syntactically allowed them as comparator value
for the `... up to` syntax, but missed to handle them correctly in the comparison logic.
Some erroneous `annotates` were not detected.

Example:
```cds
@A: [1, 2, (1+2), 3, 4]
entity E {
  key id : Integer;
}
annotate E with @A: [... up to (1+2), 11, 12, ...];
```
results in
```txt
Warning: The ‘... up to’ value does not match any item in the base annotation “@A”
```
and values 11 and 12 are added to the end of the array.

In cds-compiler v7,
we issue errors (non-configurable) for all complex expressions, and correctly handle those that are allowed.

For the example above:
```txt
Error: Unexpected expression as ‘... up to’ value in the assignment of “@A”
```

### Associations defined via backlink associations

There are additional checks for associations (or compositions) which are defined like
```cds
entity E {
  // ..
  assoc: Association to Target on assoc.back = $self …:
}
```

1. There must be just one comparison with $self in one on condition.
2. The target `T` of the backlink association `back` must be the entity (or other structure) `E`
   where assoc is embedded in, or be a (direct or indirect) include or query source of `E`.
   The check is partially postponed if `E` is an aspect; there is no warning anymore if `T` is not `E`.
3. All target elements which are referred to in the foreign keys or ON condition of the backlink
   association `back` must be projected to `E` (or included) from T.
   Renaming these elements is supported.

These checks prevent late errors in the SQL backend, during deployment or in the runtime.
They also enable (a next version of) the SQL backend to properly generate a correct SQL condition
when elements on the target side of the backlink associations are renamed (see condition 3).



## Changes in OData/EDM

### Vocabulary change for Common.SideEffectsType

In a recent [update](https://github.com/SAP/odata-vocabularies/commit/05eb6034796706bdf3227108cfa13ecab2aab9d9)
of OData vocabulary `Common`, the complex type `Common.SideEffectsType` was changed incompatibly:
the (deprecated) property `EffectsType` was removed.

Effect:
```cds
service S {
  @Common.SideEffects: { 
    EffectTypes : #ValueChange
  }
  entity E {
    key id : Integer;
  }
}
```
Before removing property `EffectsType`:
```xml
<Annotation Term="Common.SideEffects">
  <Record Type="Common.SideEffectsType">
    <PropertyValue Property="EffectTypes" EnumMember="Common.EffectType/ValueChange"/>
  </Record>
</Annotation>
```
After removal:
```xml
<Annotation Term="Common.SideEffects">
  <Record Type="Common.SideEffectsType">
    <PropertyValue Property="EffectTypes" EnumMember="Common.SideEffectsType/ValueChange"/>
  </Record>
</Annotation>
```
with warning:
```txt
Warning[odata-anno-type]: “EffectTypes” is not a known property for “@Common.SideEffects” of type “Common.SideEffectsType”
```

You can safely remove property `EffectTypes` from your annotations, as they didn't have any effect.


## Changes in to.sql()

### Remove option to generate transitive localized views

In v5 we changed the default behavior to no longer generate transitive localized views.
We introduced option `cds.sql.transitive_localized_views` to explicitly switch on generation of transitive localized views.
See [Release notes June 2024](https://cap.cloud.sap/docs/releases/2024/jun24#transitive-localized-views-removed)
and [Deprecated Features](https://cap.cloud.sap/docs/releases/2024/jun24#deprecated-features).

In v6 we decided to not yet remove this option, as there were
issues in extension scenarios where cds-compiler v5 (new: no views by default)
and cds 7 (old: still needs these views) were used together.

In cds-compiler v7, this option is removed.


### Change type mapping for Decimal on SQLite

Before cds-compiler v7, cds type `Decimal` was mapped to `DECIMAL` on SQLite.
`DECIMAL` uses `NUMERIC` affinity, which has unexpected results in some situations:
```sql
> create table T (id int, d1 decimal, d2 decimal);
> insert into T values (1, 1.0, 4.0);
> insert into T values (2, 1.0, 4.1);
> select id, d1/d2 from T;
1|0
2|0.24390243902439
```

In cds-compiler v7, we changed the type mapping for SQLite:
CDS type `Decimal` now is mapped to `REAL_DECIMAL`, which has affinity `REAL`.

| CDS type       | type old       | affinity old | type new            | affinity new |
|----------------|----------------|--------------|---------------------|--------------|
| Decimal(10, 3) | DECIMAL(10, 3) | NUMERIC      | REAL_DECIMAL(10, 3) | REAL         |
| Decimal        | DECIMAL        | NUMERIC      | REAL_DECIMAL        | REAL         |
| DecimalFloat   | DECIMAL        | NUMERIC      | REAL_DECIMAL        | REAL         |
| Double         | DOUBLE         | REAL         | DOUBLE              | REAL         |

The old mapping can be restored via a switch:
```
cds.requires.db.decimal_affinity : 'numeric'
```
