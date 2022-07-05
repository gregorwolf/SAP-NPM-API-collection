---
layout: cds-ref
shorty: Built-in Types
synopsis: >
  Find here a brief overview of the predefined types shipped with CDS.
permalink: cds/types
status: released
---


# Built-in Types

{% include links.md %}

The following built-in types are provided:


| CDS Type | Arguments / Remarks | Example Value | SQL <sup>(5)</sup> |
| --- | --- | ---  | --- |
| `UUID` | an opaque 36-characters string <sup>(1)</sup> | `'be071623-8699-4106-b6fa-8e3cb04c261e'`| _NVARCHAR(36)_  |
| `Boolean` | | `true` | _BOOLEAN_  |
| `Integer` | | `1337` | _INTEGER_  |
| `Integer64` | | `1337` | _BIGINT_  |
| `Decimal` | ( `precision`, `scale` ) <sup>(2)</sup> | `15.2` | _DECIMAL_  |
| `Double` | | `15.2` | _DOUBLE_  |
| `Date` | | `'2021-06-27'` | _DATE_  |
| `Time` | | `'07:59:59'` | _TIME_  |
| `DateTime` | _sec_ precision | `'2021-06-27T14:52:23Z'` | _TIMESTAMP_  |
| `Timestamp` | 0.1 _µs_ precision <sup>(3)</sup> | `'2021-06-27T14:52:23.123Z'` |  _TIMESTAMP_  |
| `String` | ( `length` ) <sup>(4)</sup> | `'hello world'` | _NVARCHAR_  |
| `Binary` | ( `length` ) <sup>(4)</sup> | |  _VARBINARY_  |
| `LargeBinary` |  | | _BLOB_  |
| `LargeString` |  | `'hello world'` | _NCLOB_  |


### Remarks


> <sup>(1)</sup> At runtime, UUIDs are treated as opaque values and are, for example, not converted to lower case on input. UUIDs generated in the application are [RFC 4122](https://tools.ietf.org/html/rfc4122)-compliant. See [Don't Interpret UUIDs!]({{cap}}/guides/domain-models#dont-interpret-uuids) for details.

> <sup>(2)</sup> Arguments `precision` and `scale` are optional → if omitted a *decfloat* type is used

> <sup>(3)</sup> Up to 7 digits of fractional seconds; if a data is given with higher precision truncation may occur

> <sup>(4)</sup> Argument `length` is optional → use options `cds.cdsc.defaultStringLength` and `cds.cdsc.defaultBinaryLength` to control the project-specific default length used for OData and SQL backends. If not set, the global default length 5000 is used for SQL backends.

> <sup>(5)</sup> Mapping to ANSI SQL types are given for comparison. Note though, that you need to have the specification of your target database in mind when considering, for example, length restrictions.


### See also...

[**Mapping to OData EDM types**]({{cap}}/advanced/odata#type-mapping){:.learn-more}

[**HANA-native Data Types**]({{cap}}/advanced/hana#hana-types){:.learn-more}