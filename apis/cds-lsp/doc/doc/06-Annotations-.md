
## Annotations

{% include links.md %}

This chapter describes how to add Annotations to model definitions written in CDL, focused on the common syntax options and fundamental concepts. Find additional information in the [OData Annotations] guide.


<!-- TOC depthFrom:3 depthTo:3 -->

- [annotation syntax](#annotation-syntax)
- [annotation targets](#annotation-targets)
- [annotation values](#annotation-values)
- [records are syntax shortcuts](#records-are-syntax-shortcuts)

<!-- /TOC -->


### annotation syntax

Annotations in CDL are prefixed with an ___'@'___ sign and can be placed
before a definition, after the defined name or at the end of simple definitions.

```java
@before entity Foo @inner {
  @before simple @inner : String @after;
  @before struct @inner { ...elements... }
}
```

Multiple annotations can be placed in each spot separated by whitespaces or enclosed
in `@(...)` and separated by comma &mdash; i.e. the following are equivalent:

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

For an `@inner` annotation only the syntax `@(...)` is available.

### annotation targets

You can basically annotate any named thing in a CDS model, such as...

Contexts and services:

```java
@before [define] (context|service) Foo @inner { ... }
```

Definitions and elements with simple types:

```java
@before [define] type Foo @inner : String @after;
@before [key] anElement @inner : String @after;
```

Entities, facets and other struct types and elements thereof:

```java
@before [define] (entity|type|facet|annotation) Foo @inner {
  @before simple @inner : String @after;
  @before struct @inner { ...elements... };
}
```

Enums

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


### annotation values

Values can be literals or references.
If no value is given, the default value is `true` as for `@aFlag` below.

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

As described in the [CSN spec]({{csn}}#literals), the above annotations would compile to CSN as follows:

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

Note: References (and expressions in general) are not checked nor resolved by CDS parsers or linkers. They are interpreted and evaluated only on consumption-specific modules. For example, in case of Fiori models, it's the _4odata_ and _2edm(x)_ processors.



### records are syntax shortcuts

Annotations in cds are essentially flat lists of key-value pairs assigned to a target.
The record syntax &ndash; i.e. `{key:<value>, ...}` &ndash; is a shortcut notation that
applies a common prefix to nested annotations.
I.e. the following are equivalent:

```java
@Common.foo.bar
@Common.foo.car: 'wheels'
```
```java
@Common: { foo.bar, foo.car: 'wheels' }
//> not yet implemented!
```
```java
@Common.foo: { bar }
@Common.foo.car: 'wheels'
```
```java
@Common.foo: { bar, car: 'wheels'  }
```
.... and they would show up as follows in a parsed model (&rarr; see [CSN][]):

```
{
  "@Common.foo.bar": true,
  "@Common.foo.car": "wheels",
}
```

### annotation propagation

Annotations are inherited from types and base types to dereived types, entities and elements as well as from elements of underlying entities in case of views.

For examples, given this view definition:

````swift
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

**Rule #1** &mdash; _Entity-level properties and annotations are inherited from the **primary** underlying source entity &ndash; here `Books`._
{: .rule}

**Rule #2** &mdash; _Each element that can **unambiguously** be traced back to a single source element, inherits that element's properties**, ...**_
{: .rule}

**Rule #3** &mdash; _**...unless** an explicit **cast** in the select clause cuts them off, e.g. as for `genre` in our example above._
{: .rule}

<br>
