
## Aspects

{% include links.md %}

<!-- TOC depthFrom:3 depthTo:3 -->

- [extend entity](#extend)
- [extend view](#extend-view)
- [extend services](#extend-services)
- [annotate](#annotate)
- [named aspects](#named-aspects)
- [shortcut syntax `:`](#shortcut-syntax-)
- [looks like inheritance](#looks-like-inheritance)

<!-- /TOC -->



### extend [ entity / type ]
{: #extend}

Use `extend` to add extension fields or to add/override metadata to existing
definitions, e.g. annotations, as follows:

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

Note: make sure you prepend the `extend` keyword to nested elements,
otherwise this would mean you want to add a new field with that name:



### annotate


Use `annotate` instead of `extend` if you only want to add/override annotations:

```swift
annotate Foo with @title:'Foo' {
  nestedStructField {
    existingField @title:'Nested Field';
  }
}
annotate Bar with @title:'Bar';
```

This example is effectively the same as the above one for [extend](#extend)
without the extension fields added. Actually, `annotate` is just a shortcut with the
default mode being switched to `extend`ing existing fields instead of adding
new ones.



### extend view
{: .impl.concept}

Use `extend view` to extend the projection of a view entity to include more elements existing in the underlying entity:

```swift
extend view Foo with @title:'Foo' {
  foo as bar @car,
  <expression> as jar
}
```

Note: Enhancing nested structs is not supported. Note also that you can use the common [`annotate`](#annotate) syntax if you only need to add/override annotations.




### named aspects

You can use `extend` or `annotate` with pre-defined aspects, in order
to apply the same extensions to multiple targets:

```swift
extend Foo with ManagedObject;
extend Bar with ManagedObject;
```
```swift
aspect ManagedObject {
  created { at: DateTime; by: User; }
}
```

In case of `extend` all nested fields in the named aspect are interpreted
as being extension fields. In case of `annotate` they are interpreted as existing fields
and the annotations are copied to the corresponding target elements.

The named extension can be anything, e.g. including other `types` or `entities`.
You can use `aspects` as shown in the example to declare definitions that are only
meant to be used in such extensions, not as types for elements.



###  shortcut syntax `:`

You can use an inheritance-like syntax option to extend a definition with one or more [named aspects](#named-aspects)
as follows:

```swift
define entity Foo : ManagedObject, AnotherAspect {
  key ID : Integer;
  name : String;
  ...
}
```

This essentially is syntactical sugar and equivalent to using a sequence of [extends](#extend) as follows:

```swift
define entity Foo;
extend Foo with ManagedObject;
extend Foo with AnotherAspect;
extend Foo with {
  key ID : Integer;
  name : String;
  ...
}
```

You can apply this to any definition of an entity or a structured type.



### looks like inheritance

The `:`-based syntax option described before looks very much like (multiple) inheritance
and in fact has very much the same effects. Yet, as mentioned in the beginning of this
chapter, it is not based on inheritance but on mixins, which are more powerful and also
avoid common problems like the infamous diamond shapes in type derivations.

When combined with persistence mapping there are a few things to note, that goes down
to which strategy to choose to map inheritance to e.g. relational models.
Find some details in [_Aspects vs Inheritance_](../cds/aspects-inheritance).
