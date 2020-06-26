
## Elements, Types
{: #elements-types}

<!-- TOC depthFrom:3 depthTo:3 -->

- [pre-defined types](#pre-defined-types)
- [custom-defined types](#custom-defined-types)
- [struct elements](#struct-elements)
- [enums](#enums)
- [calculated fields](#calculated-fields)
- [virtual elements](#virtual-elements)
- [element constraints](#element-constraints)

<!-- /TOC -->



### pre-defined types


The following built-in types are provided.
Mapping to ANSI SQL types and to [_Edm._ types](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part3-csdl/odata-v4.0-errata03-os-part3-csdl-complete.html#_Toc453752517) given for comparison.

| CDS Type | Arguments / Remarks | SQL | OData (v4) |
| --- | --- | ---  | --- |
| `UUID` | a 36-characters string | _varchar(36)_  | _Edm.Guid_ <sup>(1)</sup> |
| `Boolean` | | _boolean_  | _Edm.Boolean_ |
| `Integer` | | _integer_  | _Edm.Int32_ |
| `Integer64` | | _bigint_  | _Edm.Int64_ |
| `Decimal` | ( `precision`, `scale` ) | _decimal_  | _Edm.Decimal_ |
| `DecimalFloat` | | _decimal_  | _Edm.Decimal_ |
| `Double` | | _double_  | _Edm.Double_ |
| `Date` | | _datetime_  | _Edm.Date_ <sup>(2)</sup> |
| `Time` | | _datetime_  | _Edm.TimeOfDay_ <sup>(3)</sup> |
| `DateTime` | _sec_ precision | _datetime_  | _Edm.DateTimeOffset_ <sup>(4)</sup> |
| `Timestamp` | _µs_ precision | _timestamp_  | _Edm.DateTimeOffset_ <sup>(4)</sup> |
| `String` | ( `length` ) | _nvarchar_  | _Edm.String_ |
| `Binary` | ( `length` ) | _varbinary_  | _Edm.Binary_ |
| `LargeString` |  | _NCLOB_  | _Edm.String_ |
| `LargeBinary` |  | _BLOB_  | _Edm.Binary_ |

> <sup>(1)</sup> Mapping can be changed with e.g. `@odata.Type='Edm.String'` <br>
> <sup>(2)</sup> OData v2: _Edm.DateTime_ with `sap:display-format="Date"` <br>
> <sup>(3)</sup> OData v2: _Edm.Time_ <br>
> <sup>(4)</sup> OData v2: _Edm.DateTime_ <br>


### custom-defined types

You can declare custom types to reuse later on, e.g. for elements in entity definitions.

```swift
type User : String(111);
type Amount {
  value : Decimal(10,3);
  currency : Currency;
}
type Currency : Association to Currencies;

entity Order {
  buyer : User;
  price : Amount;
}
```


### struct elements

Elements can be specified with anonymous inline struct types.

```swift
entity Order {
  buyer : String(111);
  price {
    value : Decimal(10,3);
    currency : Currency;
  };
}
```

### enums

You can specify enumeration values for a type as a semicolon-delimited list of symbols.
For type `String`, declaration of actual values is optional; if omitted, the actual values then are the string counterparts of the symbols.

```swift
type Gender : String enum { male; female; }
entity Order {
  status : Integer enum {
    submitted = 1;
    fulfilled = 2;
    shipped = 3;
    canceled = -1;
  };
}
```

### calculated fields
{: .impl.concept}

Elements can be specified with a calculation expression in which you can refer to other
elements of the same entity.

```swift
entity Employees {
  addresses : Association of many Addresses;
  homeAddress = addresses [kind='home'];
}
```



### virtual elements

An element definiton can be prefixed with modifier keyword `virtual` to indicate that
this element shall not be added to persistent artifacts, i.e. tables or views in
SQL databases. The reason to declare virtual elements is to be able to add metadata.

```swift
entity Employees {
  ...
  virtual something : String(11);
}
```


### element constraints

Element definitons can be augmented with constraints `unique` and `not null` as known from SQL.

```swift
entity Employees {
  name : String(111) unique not null;
}
```

> Note: `unique` is not yet available.

<br>
