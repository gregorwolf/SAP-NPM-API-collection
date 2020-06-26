
## Common reuse types
{:#code-types}

_@sap/cds/common_ provides predefined easy-to-use types for _Countries_, _Currencies_ and _Languages_.
Using these in all applications fosters interoperability.

### type `Country`
[`Country`]: #country

The reuse type `Country` is defined in _@sap/cds/common_ as a simple managed [Association] to the [code list](#code-lists) for countries as follows:

```swift
type Country : Association to sap.common.Countries;
```

Here's an example of how you would use that reuse type:

{% include _code sample='using-country-type.cds' %}

The [code lists](#code-lists) define a key element `code`, which results in a foreign key column `country_code` in your SQL table for Addresses. For example:

{% include _code sample='using-country-type.sql' %}

[learn more about **managed associations**][Associations]{: .learn-more}



### type `Currency`

```swift
type Currency : Association to sap.common.Currencies;
```

[essentially same as for `Country`](#type-country){: .learn-more}

### type `Language`

```swift
type Language : Association to sap.common.Languages;
```

[essentially same as for `Country`](#type-country){: .learn-more}
