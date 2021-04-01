
## Services

<!-- TOC depthFrom:3 depthTo:3 -->

- [service definitions](#service-definitions)
- [exposed entities](#exposed-entities)
- [actions / functions](#actions--functions)
- [derived services](#derived-services)
- [extend services](#extend-services)

<!-- /TOC -->



### service definitions

CDS allows to define service interfaces as collections of exposed entities enclosed
in a `service` block which essentially is and acts the same a [`context`](#contexts):

```swift
service SomeService {
  entity SomeExposedEntity ...;
  entity AnotherExposedEntity ...;
}
```


### exposed entities

The entities exposed by a service are most frequently projections on entities
from underlying data models.
Standard view definitions, using [`as SELECT from`](#views) or
[`as projection on`](#entity--as-projection-on) can be used for
that.

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


#### auto-promoted associations
{: .impl.concept}
> **TODO**



### actions / functions

Service definitions may additionally specify `actions` and `functions` with a
comma-separated list of named and typed inbound parameters and an
optional response type, which can be a reference to a declared type or
(not yet implemented) the inline definition of a new (struct) type.

```swift
service MyOrders {
  entity Order ...;
  // unbound actions / functions
  type cancelOrderRet {
    acknowledge: String enum { succeeded; failed; };
    message: String;
  }
  action cancelOrder ( orderID:Integer, reason:String ) returns cancelOrderRet;
  function countOrders() returns Integer;
}
```

> The notion of actions and functions in CDS adopts that of [OData](http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793737); actions and functions on service-level are _unbound_ ones.

#### bound actions / functions

Actions and functions can also be bound to individual entities of a service, enclosed
in an additional `actions` block as the last clause in an entity / view definition.

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

### derived services
{: .impl.concept}

You can define abstract services and inherit from it in other service definitions
as in this example:

```swift
abstract service ShoppingService {
  abstract entity Articles {...}
  entity Suppliers {...}
  entity ShoppingCart {} actions {
    submitOrder();
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


### extend services

You can [extend](#extend) services with additional entities and actions
much as you would add new entities to a context:

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



<br>
