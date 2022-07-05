---
layout: cds-ref
shorty: Definition Language
synopsis: >
  A reference and overview of all CDS concepts and features with compact examples written in CDS' definition language.
permalink: cds/cdl
status: released
uacp: Used as link target from Help Portal at https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/855e00bd559742a3b8276fbed4af1008.html
---

# Definition Language (CDL)
<style>
  h2 {
    font-weight: 300; font-size: 2.8em; color: #222;
    border-bottom: .5px solid silver;
    padding-bottom: 5px;
  }
  h3 {
    font-weight: 400;
    font-size: 1.5em;
  }
</style>

Find here a reference of all CDS concepts and features in the form of compact examples.
The examples are given in **_CDL_**, a human-readable syntax for defining models, and **_CQL_**, an extension of SQL to write queries.


{% include _toc levels="2,3" %}
{% include links.md %}

<br>
Please refer also to [_The Nature of Models_](models) and the [_CSN specification_][CSN] to complete your understanding of CDS.

<br>


## Entity and Type Definitions

- [Entity Definitions](#entities) --- `define entity`
- [Type Definitions](#types) --- `define type`
- [Predefined Types](#predefined-types)
- [Structured Types](#structured-types)
- [Arrayed Types](#arrayed-types)
- [Virtual Elements](#virtual-elements)
- [Calculated Fields](#calculated-fields)
- [Default Values](#default-values)
- [Constraints](#constraints)
- [Enums](#enums)




### Entity Definitions --- `define entity`
{:#entities}

Entities are structured types with named and typed elements,
representing sets of (persisted) data that can be read and manipulated using usual CRUD operations.
They usually contain one or more designated primary key elements:

```swift
define entity Employees {
  key ID : Integer;
  name : String;
  jobTitle : String;
}
```

> The `define` keyword is optional, that means `define entity Foo` is equal to `entity Foo`.


### Type Definitions --- `define type`
{:#types}

You can declare custom types to reuse later on, for example, for elements in entity definitions.
Custom-defined types can be simple, that is derived from one of the predefined types, structure types or [Associations].

```swift
define type User : String(111);
define type Amount {
  value : Decimal(10,3);
  currency : Currency;
}
define type Currency : Association to Currencies;
```
> The `define` keyword is optional, that means `define type Foo` is equal to `type Foo`.

[Learn more about **Definitions of Named Aspects**.](#aspects){:.learn-more}




### Predefined Types


[See list of **Built-in Types**](types){:.learn-more}




### Structured Types

You can declare and use custom struct types as follows:

```swift
type Amount {
  value : Decimal(10,3);
  currency : Currency;
}
entity Books {
  price : Amount;
}
```

Elements can also be specified with anonymous inline struct types.
For example, the following is equivalent to the definition of `Books` above:

```swift
entity Books {
  price : {
    value : Decimal(10,3);
    currency : Currency;
  };
}
```


### Arrayed Types

Prefix a type specification with `array of` or `many` to signify array types.

```swift
entity Foo { emails: many String; }
entity Bar { emails: many { kind:String; address:String; }; }
entity Car { emails: many EmailAddress; }
entity Car { emails: EmailAddresses; }
type EmailAddresses : many { kind:String; address:String; }
type EmailAddress : { kind:String; address:String; }
```

> Keywords `many` and `array of` are mere syntax variants with identical semantics and implementations.

When deployed to SQL databases, such fields are mapped to [LargeString](types) columns.
With OData V4, arrayed types are rendered as `Collection` in the EDM(X).

Generic support in runtimes is added over time. It's available in Node.js but not yet in Java. If not available, you need to add custom logic, for example, to serialize payloads into JSON strings and vice versa.



### Virtual Elements

An element definition can be prefixed with modifier keyword `virtual`. This keyword indicates that this element isn't added to persistent artifacts, that is, tables or views in SQL databases. Virtual elements are part of OData metadata.

```swift
entity Employees {
  ...
  virtual something : String(11);
}
```
### Literals

Using literals in CDS models is commonly used, for example, to set default values. The literals in the following table show you how to define these values in your CDS source.

| Kind | Example |
| --- | --- |
| Null | `null` |
| Boolean | `true`, `false` |
| Numbers | `11` or  `2.4` |
| Strings | `'foo'` |
| Dates |  `'2016-11-24'` |
| Times  |  `'16:11'` |
| DateTimes |  `'2016-11-24T16:11'` |
| Records |  `{"foo":<literal>, ...}` |
| Arrays |  `[<literal>, ...]` |

[Learn more about literals and their representation in CSN.]({{cap}}/cds/csn#literals){:.learn-more}

### Calculated Fields
{: .impl.concept}

Elements can be specified with a calculation expression in which you can refer to other elements of the same entity.

```swift
entity Employees {
  addresses : Association to many Addresses;
  homeAddress = addresses [kind='home'];
}
```


### Default Values

As in SQL you can specify default values to fill in upon INSERTs if no value is specified for a given element.

```swift
entity Foo {
  bar : String default 'bar';
  boo : Integer default 1;
}
```


### Type References
{:#typereferences}

If you want to base an element's type on another element of the same structure, you can use the `type of` operator.

```swift
entity Author {
  firstname : String(100);
   lastname : type of firstname; // has type "String(100)"
}
```

For referencing elements of other artifacts, you can use the element access through `:`.
Element references with `:` don’t require `type of` in front of them.

```swift
entity Employees {
  firstname: type of Author:firstname;
   lastname: Author:firstname; // optional type of
}
```


### Constraints

Element definitions can be augmented with constraint `not null` as known from SQL.

```swift
entity Employees {
  name : String(111) not null;
}
```


### Enums

You can specify enumeration values for a type as a semicolon-delimited list of symbols. String and integer enums are supported. For string types, declaration of actual values is optional; if omitted, the actual values then are the string counterparts of the symbols.

```swift
type Gender : String enum { male; female; }
entity Order {
  status : Integer enum {
    submitted =  1;
    fulfilled =  2;
    shipped   =  3;
    canceled  = -1;
  };
}
```


<br>


## Views and Projections
{:#views}

Use `as select from` or `as projection on` to derive new entities from existing ones by projections, very much like views in SQL. When mapped to relational databases, such entities are in fact translated to SQL views but they're frequently also used to declare projections without any SQL views involved.

The entity signature is inferred from the projection.

- [The `as select from` Variant](#as-select-from)
- [The `as projection on` Variant](#as-projection-on)
- [Views with Inferred Signatures](#views-with-inferred-signatures)
- [Views with Declared Signatures](#views-with-declared-signatures)
- [Views with Nested Projections](#views-with-nested-projections)
- [Views with Parameters](#views-with-parameters)


### The `as select from` Variant
{:#as-select-from}

Use the `as select from` variant to use all possible features an underlying relational database would support using any valid [CQL] query including all query clauses.

```swift
entity Foo1 as SELECT from Bar; //> implicit {*}
entity Foo2 as SELECT from Employees { * };
entity Foo3 as SELECT from Employees LEFT JOIN Bar on Employees.ID=Bar.ID {
  foo, bar as car, sum(boo) as moo
} where exists (
  SELECT 1 as anyXY from SomeOtherEntity as soe where soe.x = y
)
group by foo, bar
order by moo asc;
```


### The `as projection on` Variant
{:#as-projection-on}

Use the `as projection on` variant instead of `as select from` to indicate that you don’t use the full power of SQL in your query. For example, having a restricted query in an entity allows us to serve such an entity from external OData services.


```swift
entity Foo as projection on Bar {...}
```

Currently the restrictions of `as projection on` compared to `as select from` are:

- no explicit, manual `JOINs`
- no explicit, manual `UNIONs`
- no sub selects in from clauses

Over time, we can add additional checks depending on specific outbound protocols.


### Views with Inferred Signatures

By default views inherit all properties and annotations from their primary underlying base entity.
Their [`elements`]({{csn}}#structured-types) signature is **inferred** from the projection on base elements.
Each element inherits all properties from the respective base element.

For example, the following definition:

```swift
entity SomeView as SELECT from Employees {
  ID,
  name,
  job.title as jobTitle
};
```

Might result in this inferred signature:

```swift
entity SomeView {
  ID: Integer;
  name: String;
  jobTitle: String;
};
```


### Views with Declared Signatures
{: .impl.concept}

You can optionally declare the expected signature explicitly. This declaration overrides the inferred signature. The implementation can check the inferred signature against the declared one.

```swift
entity SomeView {
  ID: Integer; name: String; jobTitle: String;
} as SELECT from Employees {
  ID, name, job.title as jobTitle
};
```


### Views with Nested Projections
{: .impl.concept}

Use [CQL's nested expands]({{cql}}#nested-expands) to declare projections on document structures and/or entity graphs, in turn resulting in structured document signatures.

```swift
entity MyOrders as select from Orders {
  ID, buyer {
    ID, name
  },
  Items {
    pos, quantity, product {
      ID, title
    }
  }
};
```

This projection would result in an inferred signature like that:


```swift
entity MyOrders {
  ID : UUID;
  buyer : {
    ID : UUID;
    name : String;
  };
  Items : array of {
    pos : Integer;
    quantity : Integer;
    product : {
      ID : UUID;
      title : String;
    }
  }
};
```


### Views with Parameters

You can equip views with parameters that are passed in whenever that view is queried. Default values can be specified. Refer to these parameters in the view's query using the prefix `:`.

```swift
entity SomeView ( foo: Integer, bar: Boolean )
as SELECT * from Employees where ID=:foo;
```
[Learn more about how to expose views with parameters in **Services - Exposed Entities**.](#exposed-entities){: .learn-more}
[Learn more about views with parameters for existing HANA artifactsSee in **Native SAP HANA Artifacts**.]({{cap}}/advanced/hana){: .learn-more}



## Associations & Compositions
{:#associations}

Associations capture relationships between entities. They are like forward-declared joins added to a table definition in SQL.

- [Unmanaged Associations](#unmanaged-associations)
- [Managed Associations](#managed-associations)
- [To-many Associations](#to-many-associations)
- [Many-to-many Associations](#many-to-many-associations)
- [Managed many-to-many Associations](#managed-many-to-many-associations)
- [Associations with Default Filters](#associations-with-default-filters)
- [Associations to Parameterized Views](#associations-to-parameterized-views)
- [Compositions](#compositions)
- [Managed Compositions](#managed-compositions)


### Unmanaged Associations

Unmanaged associations specify arbitrary join conditions in their `on` clause, which refer to available foreign key elements. The association's name (`address` in the following example) is used as the alias for the to-be-joined target entity.

```swift
entity Employees {
  address : Association to Addresses on address.ID = address_ID;
  address_ID : Integer;  //> foreign key
}
```
```swift
entity Addresses {
  key ID : Integer;
}
```


### Managed (To-One) Associations
{:#managed-associations}

For to-one associations, CDS can automatically resolve and add requisite foreign key elements from the target's primary keys and implicitly add respective join conditions.

```swift
entity Employees {
  address : Association to Addresses;
}
```

This example is equivalent to the [unmanaged example above](#unmanaged-associations), with the foreign
key element `address_ID` being added automatically upon activation to a SQL database.

> No foreign key constraints are added on database level.


### To-many Associations

For to-many associations specify an `on` condition following the canonical expression pattern `<assoc>.<backlink> = $self` as in this example:

```swift
entity Employees {
  key ID : Integer;
  addresses : Association to many Addresses
    on addresses.owner = $self;
}
```
```swift
entity Addresses {
  owner : Association to Employees;  //> the backlink
}
```

> The backlink can be any managed to-one association on the _many_ side pointing back to the _one_ side.


### Many-to-many Associations

For many-to-many association, follow the common practice of resolving logical many-to-many relationships into two one-to-many associations using a link entity to connect both.
For example:

```swift
entity Employees { ...
  addresses : Association to many Emp2Addr on addresses.emp = $self;
}
entity Emp2Addr {
  key emp : Association to Employees;
  key adr : Association to Addresses;
}
```

[Learn more about **Managed Compositions for Many-to-many Relationships**.](#for-many-to-many-relationships){:.learn-more}



### Managed many-to-many Associations
{: .impl.concept}

With Managed Many-to-many Associations, CDS can generate requisite link tables automatically. You can use the `via` parameter clause to add elements to link table reflecting attributed relationships or to use a predefined link table instead.

```swift
entity Employees {
  addresses1 : Association to many Addresses;
  addresses2 : Association to many Addresses via {
    kind: String(11);
  };
  addresses3 : Association to many Addresses via Emp2Addr;
}
```

For the first case, [`cds.compile`]({{cap}}/node.js/cds-compile) automatically adds a link table.
For the second case, it automatically adds a link table with an additional element `kind` (&rarr; an _attributed relationship_).
For the third case, [`cds.compile`]({{cap}}/node.js/cds-compile) uses the predefined entity `Emp2Addr` that is defined like that (names for `source/target` can be freely chosen):

```swift
entity Emp2Addr {
  key emp : Association to Employees;
  key adr : Association to Addresses;
}
```



### Associations with Default Filters
{: .impl.concept}

For to-many associations, you can optionally specify a default filter. That filter automatically
applies to any usage of that association in queries, unless another filter is specified explicitly.

```swift
entity Products {
  localized : Association to many Product$Texts
    with default filter lang=$env.user.lang;
}
```
```swift
entity Product$Texts {
  key product : Association to Products;
  key lang : String(3);
  title : String(44);
  descr : String(444);
}
```

### Associations to Parameterized Views
{: .impl.concept}

If the target is a [parameterized view](#views-with-parameters), you can specify
corresponding arguments in an `Association` definition as follows:

```swift
entity Products {
  assoc : Association to SomeParameterizedView (
    param1: 4711,
    param2: foo
  );
  foo : String;
}
```

> The argument values for parameters are literals or expressions in which references are resolved within the current entity's elements.



<br>


### Compositions

Compositions constitute document structures through 'contained-in' relationships.
They frequently show up in to-many header-child scenarios.

```swift
entity Orders {
  key ID: Integer; //...
  Items : Composition of many Orders.Items on Items.parent = $self;
}
entity Orders.Items {
  key pos : Integer;
  key parent : Association to Orders;
  product : Association to Products;
  quantity : Integer;
}
```

> Essentially, Compositions are the same as _[associations]_, just with the additional information that this association represents a contained-in relationship so the same syntax and rules apply in their base form.


### Managed Compositions of Aspects
{:#managed-compositions}

Use managed compositions variant to nicely reflect document structures in your domain models, without the need for separate entities, reverse associations, and unmanaged `on` conditions.


#### With Inline Targets

```swift
entity Orders { 
  key ID: Integer; //...
  Items : Composition of many { 
    key pos : Integer;
    product : Association to Products;
    quantity : Integer;
  }
}
```

Managed Compositions are mostly syntactical sugar: Behind the scenes, they are unfolded to the [unmanaged equivalent as shown above](#compositions) 
by automatically adding a new entity, the name of which being constructed as a [scoped name](#scoped-names) from the name of parent entity, followed by the name of the composition element, 
that is `Orders.Items` in the previous example.


#### With Named Targets

Instead of anonymous target aspects you can also specify named aspects, which are unfolded the same way than anonymous inner types, as shown in the previous example:

```swift
entity Orders {
  key ID: Integer; //...
  Items : Composition of many OrderItems;
}
aspect OrderItems { 
  key pos : Integer;
  product : Association to Products;
  quantity : Integer;
}
```

#### For Many-to-many Relationships

Managed Compositions are handy for [many-to-many relationships](#many-to-many-associations), where a link table usually is private to one side.

```swift
entity Teams { ...
  members : Composition of many { key user: Association to Users; }
}
entity Users { ...
  teams: Association to many Teams.members on teams.user = $self;
}
```

And here's an example of an attributed many-to-many relationship:

```swift
entity Teams { ...
  members : Composition of many {
    key user : Association to Users;
    role : String enum { Lead; Member; Collaborator; }
  }
}
entity Users { ... }
```




## Annotations

This section describes how to add Annotations to model definitions written in CDL, focused on the common syntax options, and fundamental concepts. Find additional information in the [OData Annotations] guide. 

- [Annotation Syntax](#annotation-syntax)
- [Annotation Targets](#annotation-targets)
- [Annotation Values](#annotation-values)
- [Records as Syntax Shortcuts](#records-as-syntax-shortcuts)
- [The `annotate` Directive](#annotate)


### Annotation Syntax

Annotations in CDL are prefixed with an `@` character and can be placed before a definition, after the defined name or at the end of simple definitions.

```swift
@before entity Foo @inner {
  @before simpleElement @inner : String @after;
  @before structElement @inner { /* elements */ }
}
```

Multiple annotations can be placed in each spot separated by whitespaces or enclosed in `@(...)` and separated by comma - like the following are equivalent:

```swift
entity Foo @(
  my.annotation: foo,
  another.one: 4711
) { /* elements */ }
```
```swift
@my.annotation:foo
@another.one: 4711
entity Foo { /* elements */ }
```

For an `@inner` annotation, only the syntax `@(...)` is available.

### Annotation Targets

You can basically annotate any named thing in a CDS model, such as:

Contexts and services:

```java
@before [define] (context|service) Foo @inner { ... }
```

Definitions and elements with simple types:

```java
@before [define] type Foo @inner : String @after;
@before [key] anElement @inner : String @after;
```

Entities, aspects, and other struct types and elements thereof:

```java
@before [define] (entity|type|aspect|annotation) Foo @inner {
  @before simple @inner : String @after;
  @before struct @inner { ...elements... };
}
```

Enums:

```java
... status : String @inner enum {
  fulfilled @after;
}
```

Columns in a view definition's query:

```java
... as SELECT from Foo {
  @before expr as alias @inner : String,
  ...
}
```

Parameters in view definitions:

```java
... with parameters (
  @before param @inner : String @after
) ...
```

Actions/functions including their parameters and result elements:

```java
@before action doSomething @inner (
  @before param @inner : String @after
) returns {
  @before result @inner : String @after;
};
```


### Annotation Values

Values can be literals or references. If no value is given, the default value is `true` as for `@aFlag` in the following example:

```java
@aFlag //= true, if no value is given
@aBoolean: false
@aString: 'foo'
@anInteger: 11
@aDecimal: 11.1
@aSymbol: #foo
@aReference: foo.bar
@anArray: [ /* can contain any kind of value */ ]
```

As described in the [CSN spec]({{csn}}#literals), the previously mentioned annotations would compile to CSN as follows:

```
{
  "@aFlag": true,
  "@aBoolean": false,
  "@aString": "foo",
  "@anInteger": 11,
  "@aDecimal": 11.1,
  "@aSymbol": {"#":"foo"},
  "@aReference": {"=":"foo.bar"},
  "@anArray": [ ... ]
}
```

References (and expressions in general) aren't checked or resolved by CDS parsers or linkers. They’re interpreted and evaluated only on consumption-specific modules. For example, for SAP Fiori models, it's the _4odata_ and _2edm(x)_ processors.
{:.tip}


### Records as Syntax Shortcuts

Annotations in CDS are flat lists of key-value pairs assigned to a target.
The record syntax - that is, `{key:<value>, ...}` - is a shortcut notation that applies a common prefix to nested annotations.
For example, the following are equivalent:

```java
@Common.foo.bar
@Common.foo.car: 'wheels'
```
```java
@Common: { foo.bar, foo.car: 'wheels' }
```
```java
@Common.foo: { bar }
@Common.foo.car: 'wheels'
```
```java
@Common.foo: { bar, car: 'wheels'  }
```

and they would show up as follows in a parsed model (&rarr; see [CSN][]):

```
{
  "@Common.foo.bar": true,
  "@Common.foo.car": "wheels",
}
```

### Annotation Propagation

Annotations are inherited from types and base types to derived types, entities, and elements as well as from elements of underlying entities in case of views.

For examples, given this view definition:

```swift
using Books from './bookshop-model';
entity BooksList as SELECT from Books {
  ID, genre : Genre, title,
  author.name as author
};
```

* `BooksList` would inherit annotations from `Books`
* `BooksList.ID` would inherit from `Books.ID`
* `BooksList.author` would inherit from `Books.author.name`
* `BooksList.genre` would inherit from type `Genre`

The rules are:

1. Entity-level properties and annotations are inherited from the **primary** underlying source entity --- here `Books`.

2. Each element that can **unambiguously** be traced back to a single source element, inherits that element's properties.

3. An explicit **cast** in the select clause cuts off the inheritance, for example, as for `genre` in our previous example.



### The `annotate` Directive
{:#annotate}

The `annotate` directive allows to annotate already existing definitions, that may have been [imported](#imports) from other files or projects.

```swift
annotate Foo with @title:'Foo' {
  nestedStructField {
    existingField @title:'Nested Field';
  }
}
annotate Bar with @title:'Bar';
```

The `annotate` directive a variant of the [`extend` directive](#extend).
Actually, `annotate` is just a shortcut with the default mode being switched to `extend`ing existing fields instead of adding new ones.

<br>

## Aspects

CDS's aspects allow to flexibly extend definitions by new elements as well as overriding properties and annotations.
They're based on a mixin approach as known from Aspect-oriented Programming methods.

- [The `extend` Directive](#extend)
- [Named Aspects](#aspect) --- `define aspect`
- [Shortcut Syntax `:`](#includes)
- [Looks Like Inheritance](#looks-like-inheritance)
- [Extending Views / Projections](#extend-view)


### The `extend` Directive
{: #extend}

Use `extend` to add extension fields or to add/override metadata to existing definitions, for example, annotations, as follows:

```swift
extend Foo with @title:'Foo' {
  newField : String;
  extend nestedStructField {
    newField : String;
    extend existingField @title:'Nested Field';
  }
}
extend Bar with @title:'Bar'; // nothing for elements
```

Make sure that you prepend the `extend` keyword to nested elements, otherwise this would mean that you want to add a new field with that name:
{:.tip}

[Learn more about the **annotate** Directive.](#annotate){:.learn-more}



### Named Aspects --- `define aspect`
{:#aspect}

You can use `extend` or `annotate` with predefined aspects, to apply the same extensions to multiple targets:

```swift
extend Foo with ManagedObject;
extend Bar with ManagedObject;
```
```swift
aspect ManagedObject {
  created { at: Timestamp; _by: User; }
}
```

> The `define` keyword is optional, that means `define aspect Foo` is equal to `aspect Foo`.

If you use `extend`, all nested fields in the named aspect are interpreted as being extension fields. If you use `annotate`, the nested fields are interpreted as existing fields and the annotations are copied to the corresponding target elements.

The named extension can be anything, for example, including other `types` or `entities`.
Use keyword `aspect` as shown in the example to declare definitions that are only meant to be used in such extensions, not as types for elements.



### Includes -- `:` as Shortcut Syntax
{:#includes}

You can use an inheritance-like syntax option to extend a definition with one or more [named aspects](#aspect)
as follows:

```swift
define entity Foo : ManagedObject, AnotherAspect {
  key ID : Integer;
  name : String;
  ...
}
```

This is syntactical sugar and equivalent to using a sequence of [extends](#extend) as follows:

```swift
define entity Foo {}
extend Foo with ManagedObject;
extend Foo with AnotherAspect;
extend Foo with {
  key ID : Integer;
  name : String;
  ...
}
```

You can apply this to any definition of an entity or a structured type.



### Looks Like Inheritance

The `:`-based syntax option described before looks very much like (multiple) inheritance and in fact has very much the same effects. Yet, as mentioned in the beginning of this
section, it isn’t based on inheritance but on mixins, which are more powerful and also avoid common problems like the infamous diamond shapes in type derivations.

When combined with persistence mapping there are a few things to note, that goes down to which strategy to choose to map inheritance to, for example, relational models. See [_Aspects vs Inheritance_](../cds/aspects-inheritance) for more details.


### Extending Views and Projections
{: #extend-view}

Use the `extend projection` variant to extend the projection of a view entity to include more elements existing in the underlying entity:

```swift
extend projection Foo with @title:'Foo' {
  foo as bar @car
}
```

Enhancing nested structs isn’t supported. Note also that you can use the common [`annotate`](#annotate) syntax, to just add/override annotations of a view's elements.
{:.tip}

<br>


## Services

- [Service Definitions](#service-definitions)
- [Exposed Entities](#exposed-entities)
- [(Auto-) Redirected Associations](#auto-redirect)
- [Auto-exposed Targets](#auto-expose)
- [Custom Actions/Functions](#actions)
- [Custom-defined Events](#events)
- [Extending Services](#extend-service)
- [Derived Services](#derived-services)


### Service Definitions

CDS allows to define service interfaces as collections of exposed entities enclosed in a `service` block, which essentially is and acts the same a [`context`](#context):

```swift
service SomeService {
  entity SomeExposedEntity { ... };
  entity AnotherExposedEntity { ... };
}
```

The endpoint of the exposed service is constructed by its name, following some conventions (the string `service` is dropped and kebab-case is enforced). If you want to overwrite the path, you can add the `@path` annotation as follows:

```swift
@path: 'myCustomServicePath'
service SomeService { ... }
```


### Exposed Entities

The entities exposed by a service are most frequently projections on entities from underlying data models.
Standard view definitions, using [`as SELECT from`](#views) or [`as projection on`](#as-projection-on), can be used for
exposing entities.

```swift
service CatalogService {
  entity Product as projection on data.Products {
    *, created.at as since
  } excluding { created };
}
service MyOrders {
  view Order as select from data.Orders { * } where buyer=$user.id;  //> $user not yet implemented!
  entity Product as projection on CatalogService.Product;
}
```

You can optionally add annotations such as `@readonly` or `@insertonly` to exposed entities, which, will be enforced by the CAP runtimes in Java and Node.js.
{:.tip}

Entities can be also exposed as views with parameters:

```swift
service MyOrders {
  view OrderWithParameter( foo: Integer ) as select from data.Orders where id=:foo;
}
```
A [`view with parameter`](#views-with-parameters) modeled in the previous example, can be exposed as follows:

```swift
service SomeService {
  view ViewInService( p1: Integer, p2: Boolean ) as select from data.SomeView(foo: :p1, bar: :p2) {*};
}
```
Then the OData request for views with parameters should look like this:

```swift
GET: /OrderWithParameter(foo=5)/Set or GET: /OrderWithParameter(5)/Set
GET: /ViewInService(p1=5, p2=true)/Set
```


### (Auto-) Redirected Associations
{:#auto-redirect}

When exposing related entities, associations are automatically redirected. This ensures that clients can navigate between projected entities as expected. For example:

```swift
service AdminService {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  //> AdminService.Authors.books refers to AdminService.Books
}
```

#### Resolving Ambiguities 

Auto-redirection fails if a target can't be resolved unambiguously, that is, when there is more than one projection with the same minimal 'distance' to the source. For example, compiling the following model with two projection on `my.Books` would produce this error:

{:.danger-title}  
Target "Books" is exposed in service "AdminService" by multiple projections "AdminService.ListOfBooks", "AdminService.Books" - no implicit redirection.
{:.danger} 

```swift
service AdminService {
  entity ListOfBooks as projection on my.Books;
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  //> which one should AdminService.Authors.books refers to?
}
```

#### Using `redirected to` with projected Associations

You can use `redirected to` to resolve the ambiguity as follows:

```swift
service AdminService {
  ...
  entity Authors as projection on my.Authors { *,
    books : redirected to Books //> resolved ambiguity
  };
}
```

#### Using `@cds.redirection.target` Annotations

Alternatively, you can use the boolean annotation `@cds.redirection.target` with value `true` to make an entity a preferred redirection target, or with value `false` to exclude an entity as target for auto-redirection.

```swift
service AdminService {
  @cds.redirection.target: true
  entity ListOfBooks as projection on my.Books;
  ...
}
```

### Auto-Exposed Entities

{:#auto-expose}

Annotate entities with `@cds.autoexpose` to automatically expose them in services containing entities with Association referring to them. 

For example, given the following entity definitions:

```swift
// schema.cds
namespace schema;
entity Bar @cds.autoexpose { key id: Integer; }

using { sap.common.CodeList } from '@sap/cds/common';
entity Car : CodeList { key code: Integer; }
//> inherits  @cds.autoexpose from  sap.common.CodeList
```

... a service definition like this:

```swift
using { schema as my } from './schema.cds';
service Zoo {
  entity Foo { //...
    bar : Association to my.Bar;
    car : Association to my.Car;
  }
}
```

... would result in the service being automatically extended like this:

```swift
extend service Zoo with { // auto-exposed entities:
   @readonly entity Foo_bar as projection on Bar;
   @readonly entity Foo_car as projection on Car;
}
```

You can still expose such entities explicitly, for example, to make them read-write:

```swift
service Sue {
  entity Foo { /*...*/ }
  entity Bar as projection on my.Bar;
}
```

[Learn more about **CodeLists in `@sap/cds/common`**.][{{cap}}/cds/common#code-lists]{:.learn-more}

### Custom Actions and Functions
{:#actions}

Within service definitions, you can additionally specify `actions` and `functions`. Use a comma-separated list of named and typed inbound parameters and an
optional response type, which can be either a:

- [Predefined Type](types)
- [Reference to a custom-defined type](#types)
- [Inline definition of an anonymous structured type](#structured-types)

```swift
service MyOrders {
  entity Order { /*...*/ };
  // unbound actions / functions
  type cancelOrderRet {
    acknowledge: String enum { succeeded; failed; };
    message: String;
  }
  action cancelOrder ( orderID:Integer, reason:String ) returns cancelOrderRet;
  function countOrders() returns Integer;
  function getOpenOrders() returns array of Order;
}
```

The notion of actions and functions in CDS adopts that of [OData](http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793737); actions and functions on service-level are _unbound_ ones.
{:.tip}


#### Bound Actions and Functions
{: #bound-actions}

Actions and functions can also be bound to individual entities of a service, enclosed in an additional `actions` block as the last clause in an entity/view definition.

```swift
service CatalogService {
  entity Products as projection on data.Products { ... }
    actions {
      // bound actions/functions
      action addRating (stars: Integer);
      function getViewsCount() returns Integer;
    }
}
```


### Custom-Defined Events
{:#events .impl.beta}

Similar to [Actions and Functions][actions] you can declare `events`, which a service emits via messaging channels. Essentially, an event declaration looks very much like a type definition, specifying the event's name and the type structure of the event messages' payload.

```swift
service MyOrders { ...
  event OrderCanceled {
    orderID: Integer;
    reason: String;
  }
}
```

### Extending Services
{:#extend-service}

You can [extend](#extend) services with additional entities and actions much as you would add new entities to a context:

```swift
extend service CatalogService with {
  entity Foo {};
  function getRatings() returns Integer;
}
```

Similarly, you can [extend](#extend) entities with additional actions
as you would add new elements:


```swift
extend entity CatalogService.Products with actions {
  function getRatings() returns Integer;
}
```


### Derived Services
{: .impl.concept}

Define abstract services and inherit from it in other service definitions as in this example:

```swift
abstract service ShoppingService {
  abstract entity Articles {...}
  entity Suppliers {...}
  entity ShoppingCart {} actions {
    action submitOrder();
  }
}
```

```swift
service Bookshop : ShoppingService {
  entity Books : ShoppingService.Articles {
    author : Association to Authors;
  }
  entity Authors {...}
}
```



<br>

## Namespaces

- [The `namespace` Directive](#namespace)
- [The `context` Directive](#context)
- [Fully Qualified Names](#fully-qualified-names)


### The `namespace` Directive
{:#namespace}

To prefix the names of all subsequent definitions, place a `namespace` directive at the top of a model. This is comparable to other languages, like Java.

{% include _code sample='namespaces.cds' %}


### The `context` Directive
{:#context}

Use `contexts` for nested namespace sections.

{% include _code sample='contexts.cds' %}



### Scoped Definitions
{:#scoped-names}

You can define types and entities with other definitions' names as prefixes:

```swift
namespace foo.bar;
entity Foo {}           //> foo.bar.Foo
entity Foo.Bar {}       //> foo.bar.Foo.Bar
type Foo.Bar.Car {}     //> foo.bar.Foo.Bar.Car
```


### Fully Qualified Names

A model ultimately is a collection of definitions with unique, fully qualified names. For example, the second model above would compile to this [CSN][]:

{% include _code sample='contexts.json' %}


<br>

## Import Directives
{:#imports}

  - [The `using` Directive](#using)
  - [The `import` Directive](#import)
  - [Model Resolution](#model-resolution)


### The `using` Directive
{:#using}

Using directives allows to import definitions from other CDS models. As shown in line three below you can specify aliases to be used subsequently. You can import single definitions as well as several ones with a common namespace prefix. Optional: Choose a local alias.

{% include _code sample='using-from.cds' %}

Multiple named imports through es6-like deconstructors:

```swift
using { Foo as Moo, sub.Bar } from './base-model';
entity Boo : Moo { /*...*/ }
entity Car : Bar { /*...*/ }
```

> Also in the deconstructor variant of `using` shown in the previous example, specify fully qualified names.


### The `import` Directive
{: #import .impl.concept}

The `import` directive extends the `using` directive to fully support syntax and semantics of [`import` statements in ES6][ES6].

Imported names can omit the target's namespace prefix:

```swift
import {Foo} from './base-model';
```

Multiple named imports through es6-like deconstructors:

```swift
import { Foo as Moo, scoped.Bar } from './base-model';
entity Boo : Moo;
entity Car : Bar;
```


Imports with locally chosen prefixes (independent from target namespaces):

```swift
import base from './base-model';
entity Foo : base.Foo;
entity Bar : base.scoped.Bar;
```


### Model Resolution

Imports in `cds` work very much like `require` in [node][] and `imports` in [ES6][].
In fact, we reuse **[Node's module loading mechanisms](https://nodejs.org/api/modules.html#modules_all_together)**.
Hence, the same rules apply:

* Relative path resolution
  Names starting with `./` or `../` are resolved relative to the current model.
* Resolving absolute references
  They're fetched for in `node_modules` folders:
  * Files having `.cds`, `.csn`, or `.json` as suffixes, appended in order
  * Folders, from either the file set in `cds.main` in the folder's `package.json` or `index.<cds|csn|json>` file.

To allow for loading from precompiled `.json` files it’s recommended to **omit `.cds` suffixes** in import statements, as shown in the provided examples.
{:.tip}
