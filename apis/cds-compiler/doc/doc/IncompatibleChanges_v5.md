# Incompatible Changes in CDS Compiler Version 5

This document lists (potentially) incompatible changes
which came with Compiler Version 5.

<!-- toc: start -->

1. [Preamble](#preamble)
2. [General](#general)
   1. [Increase Required Node.js Version to 18](#increase-required-nodejs-version-to-18)
   2. [`CompilationError` no longer contains all messages as stringified text](#compilationerror-no-longer-contains-all-messages-as-stringified-text)
   3. [Deprecate HDBCDS backend](#deprecate-hdbcds-backend)
   4. [Remove deprecated API functions `preparedCsnToEdmx` and `preparedCsnToEdm`](#remove-deprecated-api-functions-preparedcsntoedmx-and-preparedcsntoedm)
3. [Changes in CDL and CSN parser](#changes-in-cdl-and-csn-parser)
   1. [Syntax restriction for nested inlines](#syntax-restriction-for-nested-inlines)
   2. [Reject nonassignable annotations](#reject-nonassignable-annotations)
   3. [Reject annotations on Mixin definitions via CSN input](#reject-annotations-on-mixin-definitions-via-csn-input)
   4. [Reject missing space between number and keyword](#reject-missing-space-between-number-and-keyword)
4. [Changes in Core Compiler](#changes-in-core-compiler)
   1. [Errors for unapplied extend statement](#errors-for-unapplied-extend-statement)
   2. [Upgrade some warnings to errors](#upgrade-some-warnings-to-errors)
   3. [Deprecate $at.from and $at.to](#deprecate-atfrom-and-atto)
5. [Changes in OData/EDM](#changes-in-odataedm)
   1. [No Annotation propagation from element to artificial named type during type exposure](#no-annotation-propagation-from-element-to-artificial-named-type-during-type-exposure)
   2. [Raise Spec violation warnings to error](#raise-spec-violation-warnings-to-error)
   3. [Restore propagation in vocabularies](#restore-propagation-in-vocabularies)
6. [Changes in to.sql()](#changes-in-tosql)
   1. [Localized entities and `@cds.persistence.exists`](#localized-entities-and-cdspersistenceexists)
   2. [Changes for dialect sqlite](#changes-for-dialect-sqlite)
   3. [Fewer localized views](#fewer-localized-views)

<!-- toc: end -->

## Preamble

Major versions are used to clean up things that could potentially break existing user code.
Such changes always have a reason, and we don't introduce them "just for the sake of it".


## General

### Increase Required Node.js Version to 18

Node.js 16 is EOL, hence we will require Node 18 starting with cds-compiler v5.


### `CompilationError` no longer contains all messages as stringified text

It's duplicate: We were storing both the messages as an array in `err.messages` as
well as their stringified version in the error's message.

Because test frameworks such as mocha and jest to not call `toString()` on
an unhandled `CompilationError` and instead use `e.stack` directly, there is
no proper message about _what_ the root cause of the exception was.
To mitigate that, we still serialize the first error in the message.


### Deprecate HDBCDS backend

Only relevant for HANA on-prem (or "old" HaaS), as HANA CDS is not available on HANA Cloud.

In the early days of CAP, the only possibility to generate the DB schema was via
the hdbcds backend (i.e. generating HANA CDS files).

Since cds-compiler 1.5 the DB backend could alternatively be generated via hdbtable/hdbview,
while for new projects the default still was hdbcds.
With cds 7, the default was switched to hdbtable,
see [Release Notes June 2023](https://cap.cloud.sap/docs/releases/archive/2023/jun23#deploy-format-hdbtable)

For regular CAP projects on HANA, there now is no need to use the hdbcds backend any longer.
They should migrate to hdbtable. We are going to deprecate the hdbcds backend in compiler V5.

Time table:
* V5
  - Document as deprecated
  - No new features in hdbcds backend
  - Only _critical_ bugfixes
  - Using the hdbcds backend leads to warning message (can be down-graded to info)
* V6
  - Using the hdbcds backend leads to error message (can be down-graded to warning)
* V7
  - Remove code

When is hdbcds still needed?
* If custom code makes use of the HANA CDS metadata in the HANA catalog
* XSA to CAP migration currently requires deployment via hdbcds as an intermediate step.
  Should no longer be necessary with HANA 2 SPS08 (RTC 20.11.2024)


### Remove deprecated API functions `preparedCsnToEdmx` and `preparedCsnToEdm`

These two API functions have been deprecated since "SNAPI" was introduced.
`to.edm[x]` can now be used to achieve the same:  If the CSN was OData preprocessed,
then it doesn't need to be preprocessed again.


## Changes in CDL and CSN parser

### Syntax restriction for nested inlines

For nested inline, forbid space between `.` and `{`.

Example:
```cds
entity E {
  a : Integer;
  e : Association to E;
}
entity V1 as select from E {
   e. {a}
//   ^
}
```

In v4: warning `syntax-unexpected-space`  
In v5: configurable error `syntax-invalid-space`

Remark: As of v5.0.0, nested expand/inline were still documented as beta.
So this by definition is _not_ an incompatible change ...


### Reject nonassignable annotations

Given a projection such as:

```cds
entity Model { struct { a : Integer; } }
entity Wildcard as projection on Model {
    @inline: ( i_am_only_a_warning ) // error in v5
    struct.{*},
};
```

In v4, the annotation `@inline` is ignored and the warning `syntax-ignoring-anno` is emitted.
However, it is not an error, even though it uses an expression with a non-resolvable
identifier.

In v5, all nonassignable annotations are rejected to avoid users
assuming that the references are valid. We now emit the error `syntax-unexpected-anno`.
The Error is not configurable. Authors need to fix their model.


### Reject annotations on Mixin definitions via CSN input

It is not possible via CDL and not specified.
Even though normal propagation rules apply (i.e. annotations at mixin definition
are propagated to the inferred element if the mixin is published), reject them in v5.


### Reject missing space between number and keyword

The lexer accidentally allows to have __no__ space between a number token and another
token. Example:

```cds
entity U as SELECT Numbers * -1e1a, -1.1b, -1c, -1e-1d from TestTable;
```

This is now a hard error (`syntax-expecting-space`) in cds-compiler v5, as it makes it
impossible to ever introduce postfixes for numbers and it makes it easy to accidentally
introduce a column alias.


## Changes in Core Compiler

### Errors for unapplied extend statement

Consistently issue an error if a reference used in an `extend` statement
does not point to an artifact definition, i.e. is not resolvable.
Only the `annotate` statement may produce an info or warning in that situation.

A “namespace” is not an artifact definition and must result in an error.

In v5, the only exception should be `extend … with definitions { … }` without
any annotation assignments, which adds a common name prefix to all definitions in the block.

(Also remove the message `Namespaces can't be annotated` for it.)
That `extend` statement should then also not appear in the output of `parse.cdl`.

Example:

```cds
entity A.B.C {};
@anno: true
extend A.B; // this should be an error
```


### Upgrade some warnings to errors

Messages are:

1. `ref-deprecated-self-element`: for `$self.‹elem›` references in `on` conditions of `joins` (see PR #12534)
    Tests in `test3/Queries/Joins/RejectNonVisible.err.cds`. Avoid cases such as:
    ```cds
    entity AliasAndSelf as select from A
      right join
      ( B join C on C.c + B.b = C.c + $self.a ) // WARNING: to.sql replaces it with A.a → invisible
      on A.a = B.b;

    entity A { key a: Integer; }
    entity B { key b: Integer; }
    entity C { key c: Integer; }
    ```
    It's too easy to accidentally use elements that aren't available.
2. `def-expected-structured`: for unstructured events
    ```cds
    event E : Integer;
    ```
3. `type-missing-enum-value`: for non-string enums that don't have explicit values
    ```cds
    entity Books {
      category: Integer enum {
        Fiction;
        Action;
      };
    };
    ```
4. `name-deprecated-$self`: if user has defined an artifact `$self`; required for binding parameter
    ```cds
    entity $self {
      key id : Integer;
    }
    ```
    Elements named `$self` are still allowed.

All these messages are configurable.


### Deprecate $at.from and $at.to

When starting with "temporal" we at first introduced the session variables `$at.from` and `$at.to`.
In April 2023 we "discovered" that these are wrong names and introduced `$valid.from` and `$valid.to`
as replacements.

In v5, issue a warning that `$at.from/to` are deprecated and should be replaced by `$valid.from/to`.
Replace `$at.from/to` by `$valid.from/to` in capire.

_Note:_ Java RT doesn't yet support `$valid`, they plan to do so with their v3 release.
Node RT apparently supports neither `$valid` nor `$at`.

Fix: use `$valid.from` and `$valid.to` instead.

## Changes in OData/EDM

### No Annotation propagation from element to artificial named type during type exposure

Current behavior:
For inline structured elements an artificial named type is created in **structured** EDMX.
Annotations for the structured element are copied/propagated to that type.

Example:
```cds
service MyService {
  entity E {
    key id : Integer;
    @Common.Label: 'Dingens'
    struc {
      x : Integer;
    }
  }
}
```
->
```xml
<EntityType Name="E">
  <Key> <PropertyRef Name="id"/> </Key>
  <Property Name="id" Type="Edm.Int32" Nullable="false"/>
  <Property Name="struc" Type="MyService.E_struc"/>
</EntityType>
<ComplexType Name="E_struc">
  <Property Name="x" Type="Edm.Int32"/>
</ComplexType>
<Annotations Target="MyService.E/struc">             <!-- annotating the element -->
  <Annotation Term="Common.Label" String="Dingens"/>
</Annotations>
<Annotations Target="MyService.E_struc">             <!-- annotating the type - will vanish -->
  <Annotation Term="Common.Label" String="Dingens"/>
</Annotations>
```

In most cases, this annotation propagation is not desired, as annotations
that are applicable to elements most likely are _not_ applicable to Complex Types.
If the value of the annotation is a path expression, the result may even be
an unresolvable path.

In V5, this kind of annotation propagation will no longer happen. If a type with
an annotation is needed in the result, users have to explicitly define a corresponding
named type in CDS.


### Raise Spec violation warnings to error

Today, most spec violations are warnings (except for the pathological type missing situation).
Two of them are now reported as errors.

Note: Issue errors only when generating OData EDM(x) APIs. For EDM Json as input to the OpenAPI generator,
spec violations are still reported as warnings (with new option `edm4OpenApi`).

#### List of messages

1. `odata-spec-violation-param`: "Expected parameter to be typed with either scalar or structured type for OData ‘2.0’"  
    v2 only - action/function must have scalar or structured type
    ```cds
    service S {
      action foo(p: E);
      entity E { key id : Integer; };
    }
    ```

2. `odata-spec-violation-no-key`: "Expected entity to have a primary key"  
    Entity must have key
    ```cds
    service S {
      entity Authors {
        a : Integer;
      };
    }
    ```
    Implemented with `v5preview`. Only message that lead to errors in Node runtime if ignored.

Messages can be downgraded to warnings in `package.json` like this:
```
{
  "cds": {
    "cdsc": {
      "severities": {
        "odata-spec-violation-property-name": "Warning"
      }
    }
  }
}
```


### Restore propagation in vocabularies

In cds-compiler version 1, annotation definitions were part of
`csn.definitions` and annotations were propagated into annotation
definitions.

Since cds-compiler v2, annotation definitions were forgotten.
No propagation was performed.

Example:
```cds
@anno
type T {
   id: UUID;
}

annotation E {
  elem: T;
};
```

In v5, propagation is restored.


## Changes in to.sql()

### Localized entities and `@cds.persistence.exists`

Old behavior: for an entity with `@cds.persistence.exists`
* no table is generated for `E`
* no table is generated for `E.texts`
* no localized convenience view `localized_E` is generated (this one would join `E` and `E.texts`)
* localized convenience views for views/projections on top of E _are_ generated

Example:
```cds
@cds.persistence.exists
entity E {
  key id : Integer;
  name : localized String(10);
}
entity P as projection on E;
```
->
```sql
CREATE VIEW P AS SELECT
  E_0.id,
  E_0.name
FROM E AS E_0;

CREATE VIEW localized_P AS SELECT
  E_0.id,
  E_0.name
FROM localized_E AS E_0;
```

When adding the annotation `@cds.persistence.exists`, the user is expected to provide
tables `E` and `E_texts`, and in v4 also the view `localized_E`.

Because this behavior is not fully consistent with the idea of the
localized convenience views being an "implementation detail" that the user
should not be aware of, the view `localized_E` _is_ generated by the compiler v5.

Already today the compiler can be forced to create the convenience view by
```
annotate localized.E with @cds.persistence.exists: false;
```

The old behavior can be restored by
```cds
annotate localized.E with @cds.persistence.exists: true;
```

Note: This "rolls back" part of an incompatible change in V3
where we probably didn't thoroughly consider this particular topic.


### Changes for dialect sqlite

With CAP 8, the default database adapter for SQLite in the node runtime will be `@cap-js/sqlite`.
Thus we should also adapt the dialect `sqlite` in the compiler to use the "new" session
variables by default. Before, they had to be switched on explicitly via configuration
`betterSqliteSessionVariables`.

For projects still using the old SQLite DB adapter, the umbrella will modify the generated
CSN and replace the `session_context` functions with the respective old values, e.g.
```
session_context( '$user.locale' ) -> 'en'
session_context( '$valid.from' )  -> strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')
```

Temporarily (until final release of v5) the compiler will provide the old behavior if
config variable `betterSqliteSessionVariables` is explicitly set to `false`.


### Fewer localized views

In v5, transitive localized views are no longer generated by default.

The old behavior is still needed for old HANA and SQLite DB drivers on Node RT. It can be
obtained by explicitly setting `fewerLocalizedViews` to `false`.
