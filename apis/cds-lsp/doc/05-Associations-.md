
## Associations

Associations capture relationships between entities. They are like forward-declared joins added to a a table definition in SQL.


<!-- TOC depthFrom:3 depthTo:3 -->

- [unmanaged](#unmanaged)
- [managed to-one](#managed-to-one)
- [managed to-many](#managed-to-many)
- [managed many-to-many](#managed-many-to-many)
- [with default filters](#with-default-filters)
- [to parameterized views](#to-parameterized-views)
- [Compositions](#compositions)
- [... of inner types](#-of-inner-types)
- [... of named types or facets](#-of-named-types-or-facets)

<!-- /TOC -->



### unmanaged

Unmanaged Associations specify arbitrary join conditions in their `on` clause which refer to available foreign key elements. The association's name (`address` in the example below) is used as the alias for the to-be-joined target entity.

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


### managed to-one

For to-one associations, CDS can automatically resolve and add requisite foreign key
elements from the target's primary keys and implicitly add respective join conditions.

```swift
entity Employees {
  address : Association to Addresses;
}
```

This example is equivalent to the [unmanaged example above](#unmanaged), with the foreign
key element `address_ID` being added automatically upon activation to a SQL database.

> No foreign key constraints are added on database level.

### managed to-many

For one-to-many associations specify an on condition following the canonical
expression pattern `<assoc>.<backlink> = $self` as in this example:

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


### managed many-to-many
{: .impl.concept}

For many-to-many associations, CDS can generate requisite link tables. You can use
the `via` parameter clause to add elements to link table reflecting attributed relationships
or to use a pre-defined link table instead.

```swift
entity Employees {
  addresses1 : Association to many Addresses;
  addresses2 : Association to many Addresses via {
    kind: String(11);
  }
  addresses3 : Association to many Addresses via Emp2Addr;
}
```

For the first two cases, [`cds.compile`](../node.js/api#cds-compile) would automatically add a link table,
for the second case with an additional element `kind` (&rarr; an _attributed relationship_).
For the third case it will use the pre-defined entity `Emp2Addr` that is expected to be
defined like that (names for `source/target` can be freely chosen):

```swift
entity Emp2Addr {
  key source : Association to Employees;
  key target : Association to Addresses;
}
```

### with default filters
{: .impl.concept}

For to-many associations you can optionally specify a default filter that will automatically
be applied to any usage of that association in queries unless another filter is specified explicitly.

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

### to parameterized views
{: .impl.concept}

If the target is a [parameterized view](#views-with-parameters), you can specify
corresponding arguments in an Association definition as follows:

```swift
entity Products {
  assoc : Association to SomeParameterizedView (
    param1: 4711,
    param2: foo
  );
  foo : String;
}
```

> The argument values for parameters are literals or expressions in which references
are resolved within the current entity's elements.



### Compositions

Compositions are the same as Associations just with the additional information
that this Association represents a contained-in relationship. Compositions frequently
show up in to-many header-child scenarios.

```swift
entity Orders {
  Items : Composition of many OrderItems on Items.order = $self;
}
entity OrderItems {
  key order : Association to Orders;
  product : ...;
  quantity : ...;
}
```

### ... of inner types
{: .impl.concept}

A managed syntactical sugar variant allows to write such Compositions in a
(anynomous) inner child way:

```swift
entity Orders {
  Items : Composition of many OrderItems { ... }
  Items : Composition of many { ... }
}
```
This would automatically be unfolded to
the equivalent as shown in the [former example](#compositions).
If the inner struct is anonymous it will be constructed as
`OrdersItems` in the example above.


### ... of named types or facets
{: .impl.concept}

Instead of an inner type you can also specify a named type or facet which would
be unfolded the same way than anonymous inner types as shown above:

```swift
entity Products {
  offeredQuantities : Composition of many Quantity;
}
type Quantity {
  value : Decimal(10,2);
  unit : String(22);
}
```


<br>
