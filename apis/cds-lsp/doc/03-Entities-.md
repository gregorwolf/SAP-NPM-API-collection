
## Entities, Views<!-- omit in toc -->

- [entities](#entities)
- [views](#views)
- [views with declared signatures](#views-with-declared-signatures)
- [views with parameters](#views-with-parameters)
- [abstract entities](#abstract-entities)
- [entity ... as projection on](#entity--as-projection-on)


### entities

Entities are essentially structured types representing sets of (persisted) data
that can be read and manipulated using CRUD operations. They usually contain
primary key elements. The leading `define` is optional.

```swift
entity Employees {
  key ID : Integer;
  name : String;
  jobTitle : String;
}
```
A most simple entity definition is:
```
entity Foo {};
```

### views

Views are entities defined by projection on underlying entities/views, like views
in SQL. The element signatures are usually inferred from the projection.
The projection can be any valid query.

```swift
entity SomeView as SELECT from Employees { * };
entity Foo as SELECT from Bar; //> implicit {*}
```

Views inherit all properties and annotations from their primary underlying base entity. Their [`elements`]({{csn}}#structs) signature is **inferred** from the projection on base elements and each element inherits all properties from the respective base element.

For example, a view like that:

```swift
entity SomeView as SELECT from Employees {
  ID, name, job.title as jobTitle
};
```

would probably have an inferred signature equivalent to that:
```swift
entity SomeView {
  ID: Integer; name: String; jobTitle: String;
};
```


### views with declared signatures
{: .impl.concept}

You can optionally declare a view's expected signature explicitly. This will completely override the inferred signature. And implementation can check the inferred signature against the declared (i.e. expected) one.

```swift
entity SomeView {
  ID: Integer; name: String; jobTitle: String;
} as SELECT from Employees {
  ID, name, job.title as jobTitle
};
```


### views with parameters

Views can be equipped with parameters that need to be passed in whenever that
view is queried. Default values can be specified. The parameters can be referred
to in the view's query using the prefix `:`.

```swift
entity SomeView ( foo: Integer, bar: Boolean )
as SELECT * from Employees where ID=:foo;
```


### abstract entities

You can prefix an entity definition with the keyword `abstract` to indicate that
this entity should not have instances; i.e. just an _entity type_ declaration without
an _entity set_. When activated to a database, no persistence artifacts, i.e. tables and views in SQL, are created.

```swift
abstract entity Foo {...}
abstract entity Foo as SELECT from Bar {...};
```



### entity ... as projection on

You can use `as projection on` instead of `as SELECT from` to indicate restrictions on the allowed expressions of the following query.


```swift
entity Foo as projection on Bar {...}
```

> This is to support custom implementations in parsing the query, which would add respective checks.
The core `cds` parser and compiler modules themselves don't make any assumptions nor about restrictions on allowed expressions neither about when and where `as projection on` is allowed instead of `as SELECT from`.
