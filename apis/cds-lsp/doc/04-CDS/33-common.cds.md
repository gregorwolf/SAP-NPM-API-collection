---
layout: cds-ref
shorty: \@sap/cds/common
synopsis: >
  Introduces _@sap/cds/common_ a prebuilt CDS model shipped with `@sap/cds` that provides common types and aspects.
permalink: cds/common
status: released
uacp: Used as link target from Help Portal at https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/855e00bd559742a3b8276fbed4af1008.html
---

# Common Types & Aspects
_@sap/cds/common_
{:.subtitle}

CDS ships with a prebuilt model _@sap/cds/common_ that provides common types and aspects.

#### Content
{% include _toc levels="2,3" %}
{% include links.md %}

[ISO 3166]: https://en.wikipedia.org/wiki/ISO_3166
[ISO 3166-1]: https://en.wikipedia.org/wiki/ISO_3166-1
[ISO 3166-2]: https://en.wikipedia.org/wiki/ISO_3166-2
[ISO 3166-3]: https://en.wikipedia.org/wiki/ISO_3166-3
[ISO 4217]: https://en.wikipedia.org/wiki/ISO_4217
[ISO/IEC 15897]: https://en.wikipedia.org/wiki/ISO/IEC_15897


## Why Use _@sap/cds/common_?

It’s recommended that all applications use the common types and aspects provided through _@sap/cds/common_ to benefit from these features:

* **Concise** and **comprehensible** models &rarr; see also [Conceptual Modeling](../guides/domain-models#conceptual-modeling)
* **Foster interoperability** between all applications
* **Proven best practices** captured from real applications
* **Streamlined** data models with **minimal entry barriers**
* **Optimized** implementations and runtime performance
* **Automatic** support for [localized] code lists and value helps
* **Extensibility** using [Aspects](../guides/domain-models#aspects)
* **Verticalization** through third-party extension packages

For example, usage is as simple as indicated in the following sample:

```swift
using { Country } from '@sap/cds/common';
entity Addresses {
  street  : String;
  town    : String;
  country : Country; //> using reuse type
}
```

### Outcome = Optimized Best Practice

The final outcomes in terms of modeling patterns, persistence structures, and implementations is essentially the same as with native means, if you would have collected design experiences from prior solutions, such as we did.

All the common reuse features of _@sap/cds/common_ are provided only through this ~100 line .cds model. Additional runtime support isn't required. _@sap/cds/common_ merely uses basic CDS modeling features as well as generic features like [localized data] and [temporal data] (which only need minimal runtime support with minimal overhead).
{:.tip}

In effect, the results are **straightforward**, capturing **best practices** we learned from real business applications, with **minimal footprint**, **optimized performance**, and **maximized adaptability** and **extensibility**.


## Common Reuse Aspects

_@sap/cds/common_ defines the following [aspects] for use in your entity definitions. They give you shortcuts, for concise and comprehensible models, interoperability and out-of-the-box runtime features connected to them.


### Aspect `cuid`

Use `cuid` as a convenient shortcut, to add canonical, universally unique primary keys to your entity definitions. These examples are equivalent:

```swift
entity Foo : cuid {...}
```


```swift
entity Foo {
  key ID : UUID;
  ...
}
```

> The service provider runtimes automatically fill in UUID-typed keys like these with auto-generated UUIDs.

[Learn more about **canonical keys** and **UUIDs**.](../guides/domain-models#use-canonic-primary-keys){: .learn-more}


### Aspect `managed`

Use `managed`, to add four elements to capture _created by/at_ and latest _modified by/at_ management information for records. The following examples are equivalent-

```swift
entity Foo : managed {...}
```


```swift
entity Foo {
  createdAt  : Timestamp @cds.on.insert : $now;
  createdBy  : User      @cds.on.insert : $user;
  modifiedAt : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
  modifiedBy : User      @cds.on.insert : $user @cds.on.update : $user;
  ...
}
```

`modifiedAt` and `modifiedBy` are set whenever the respective row was modified, that means, also during `CREATE` operations.
{:.tip}

The annotations `@cds.on.insert/update` are handled in generic service providers so to fill-in those fields automatically.

[Learn more about **generic service features**.](../guides/providing-services#managed-data){: .learn-more}


### Aspect `temporal`

This aspect basically adds two canonical elements, `validFrom` and `validTo` to an entity. It also adds a tag annotation that connects the CDS compiler's and runtime's built-in support for _[Temporal Data]_. This built-in support covers handling date-effective records and time slices, including time travel. All you have to do is, add the temporal aspect to respective entities as follows:

```swift
entity Contract : temporal {...}
```

[Learn more about **temporal data**.][temporal data]{: .learn-more}


## Common Reuse Types
{:#code-types}

_@sap/cds/common_ provides predefined easy-to-use types for _Countries_, _Currencies_, and _Languages_. Use these in all applications to foster interoperability.

### Type `Country`
[`Country`]: #country

The reuse type `Country` is defined in _@sap/cds/common_ as a simple managed [Association] to the [code list](#code-lists) for countries as follows:

```swift
type Country : Association to sap.common.Countries;
```

Here's an example of how you would use that reuse type:

{% include _code sample='using-country-type.cds' %}

The [code lists](#code-lists) define a key element `code`, which results in a foreign key column `country_code` in your SQL table for Addresses. For example:

{% include _code sample='using-country-type.sql' %}

[Learn more about **managed associations**.][Associations]{: .learn-more}


### Type `Currency`

```swift
type Currency : Association to sap.common.Currencies;
```

[It’s the same as for `Country`.](#type-country){: .learn-more}

### Type `Language`

```swift
type Language : Association to sap.common.Languages;
```

[It’s the same as for `Country`.](#type-country){: .learn-more}


## Common Code Lists
{: #code-lists}

As seen in the previous section, the reuse types `Country`, `Currency`, and `Language` are defined as associations to respective code list entities. They act as code list tables for respective elements in your domain model.

> You rarely have to refer to the code lists in consuming models, but always only do so transitively by using the corresponding reuse types [as shown above](#code-types).


### Aspect `sap.common.CodeList`

This is the base definition for the three code list entities in _@sap/cds/common_. It can also be used for your own code lists.

```swift
aspect sap.common.CodeList {
  name  : localized String(111);
  descr : localized String(1111);
}
```
[Learn more about **localized** keyword.][localized]{: .learn-more}


### Entity `sap.common.Countries`

The code list entity for countries is meant to be used with **[ISO 3166-1] two-letter alpha codes** as primary keys. For example, `'GB'` for the United Kingdom. Nevertheless, it's defined as `String(3)` to allow you to fill in three-letter codes, if needed.

```swift
entity sap.common.Countries : CodeList {
  key code : String(3); //> ISO 3166-1 alpha-2 codes (or alpha-3)
}
```


### Entity `sap.common.Currencies`

The code list entity for currencies is meant to be used with **[ISO 4217] three-letter alpha codes** as primary keys, for example, `'USD'` for US Dollar. In addition, it provides an element to hold common currency symbols.

```swift
entity sap.common.Currencies : CodeList {
  key code : String(3); //> ISO 4217 alpha-3 codes
  symbol : String(2); //> for example, $, €, £, ₪, ...
}
```


### Entity `sap.common.Languages`

The code list entity for countries is meant to be used with POSIX locales as defined in **[ISO/IEC 15897]** as primary keys. For example, `'en_GB'` for British English.

```swift
entity sap.common.Languages : CodeList {
  key code : String(5); //> for example, en_GB
}
```
[Learn more on **normalized locales**.](../guides/i18n#normalized-locales){: .learn-more}


### SQL Persistence

The following table definition represents the resulting SQL persistence of the countries code list:

{% include _code sample='sap-common-countries.sql' label='none' %}


### SQL Persistence and Localized Texts

In addition, the generic [localized data] support triggered through the `localized` keyword adds these additional tables and views to efficiently deal with translations:

{% include _code sample='sap-common-countries_texts.sql' label='none' %}
{% include _code sample='sap-common-countries_localized.sql' label='none' %}

[Learn more about **localized data**.][localized data]{: .learn-more}


### Minimalistic Design by Intent
{:label=none}
{: #minimalistic-design-by-intend}

The models for code lists are intentionally minimalistic to keep the entry barriers as low as possible, focusing on the bare minimum of what all applications generally need: a unique code and localizable fields for name and full name or descriptions.

**ISO alpha codes** for languages, countries, and currencies were chosen because they:

1. Are most common (most projects would choose that)
2. Are most efficient (as these codes are also frequently displayed on UIs)
3. Guarantee minimal entry barriers (bringing about 1 above)
4. Guarantee best support (for example, by readable foreign keys)

Assumption is that ~80% of all apps don't need more than what is already covered in this minimalistic model. Yet, in case you need more, you can easily leverage CDS standard features to adapt and extend these base models to your needs as demonstrated in the section [Adapting to your needs](#adapting-to-your-needs).


## Providing Initial Data

To fill code lists with data, a business application would frequently connect to and use _[Business Configuration]_ services. This allows customers to adjust the data for code lists individually. Alternatively or in addition, you can also provide initial data for the code lists by placing CSV files in a folder called `csv` next to your data models.

The following is an example of a `csv` file to provide data for countries:

{% include _code sample='db/csv/sap.common-Countries.csv' %}

[Learn more about **Providing Initial Data**.](../guides/databases#providing-initial-data){: .learn-more}


### Add Translated Texts

In addition, you can provide translations for the `sap.common.Countries_texts` table as follows:

{% include _code sample='db/csv/sap.common-Countries_texts.csv' %}

[Learn more about **Localization/i18n**.][localization]{: .learn-more}


### Using Tools like Excel

You can use Excel or similar tools to maintain these files. For example, the following screenshot shows how we maintained the above two files in Numbers on a Mac:

![csv in numbers](assets/csv-numbers.png)


## Adapting to Your Needs

As stated, the predefined definitions are minimalistic by intent. Yet, as _@sap/cds/common_ is also just a CDS model, you can apply all the standard features provided by [CDS][CDL], especially CDS' [Aspects] to adapt, and extend these definitions to your needs.

Let's look at a few examples of what could be done. You can combine these extensions in an effective model.

You can do such extensions in the models of your project. You can also collect your extensions into reuse packages and share them as common definitions with several consuming projects, similar to _@sap/cds/common_ itself.
{:.tip}

[Learn more about providing reuse packages.]({{cap}}/guides/reuse-and-compose){: .learn-more}


### Adding Detailed Fields as of [ISO 3166-1]

{% include _code sample='your-common.1.cds' %}

> Value lists in SAP Fiori automatically search in the new text fields as well.


### Protecting Certain Entries

Some application logic might have to be hard-coded against certain entries in code lists. Therefore, these entries have to be protected against changes and removal. For example, let's assume a code list for payment methods defined as follows:

```swift
entity PaymentMethods : sap.common.CodeList {
  code : String(11);
}
```

Let's further assume the entires with code `Main` and `Travel` are required by implementations and hence must not be changed or removed. Have a look at a couple of solutions.


#### Generic Solution
{:.impl.concept}

One option is to add an [automatic validation](../guides/providing-services#input-validation) based on certain annotations. For example:

```swift
annotate PaymentMethods {
  code @assert.nottouched: ['Main','Travel'];
}
```

However, the generic logic behind this validation isn’t trivial and an implementation is pending.


#### Programmatic Solution

A fallback, and at the same time, the most open, and most flexible approach, is to use a custom handler to assert that. For example, in Node.js:

```js
srv.on ('DELETE', 'PaymentMethods', req=>{
  const entry = req.query.DELETE.where[2].val
  if (['Main','Travel'].includes(entry))
    return req.reject(403, 'these entries must not be deleted')
})
```


### Using Different Foreign Keys

Let's assume you prefer to have references to the latest code list entries without adjusting foreign keys. This can be achieved by adding and using numeric ISO codes for foreign keys instead of the alpha codes.

{% include _code sample='your-common.2.cds' %}

You can use your own definition of `Country` instead of the one from _@sap/cds/common_ in your models as follows:

{% include _code sample='using-numcodes.cds' %}


### Mapping to SAP S/4HANA or ABAP Table Signatures

{% include _code sample='your-common.3.cds' %}

These views are updatable on SAP HANA and many other databases. You can also use CDS to expose them through corresponding OData services in order to facilitate integration with SAP S/4HANA or older ABAP backends.


## Adding Own Code Lists

As another example of adaptations, let's add support for subdivisions, that means regions, as of [ISO 3166-2] to countries.


### Defining a New Code List Entity

{% include _code sample='your-common.4.1.cds' %}

`Regions` is a new, custom-defined code list entity defined in the same way as the predefined ones in _@sap/cds/common_. In particular, it inherits all elements and annotations from the base definition [`sap.common.CodeList`](#code-lists). For example, the `@cds.autoexpose` annotation, which provides that `Regions` is auto-exposed in any OData service that has exposed entities with associations to it. The localization of the predefined elements `name` and `descr` is also inherited.


### Defining a New Reuse Type

Following the pattern for codes in _@sap/cds/common_ a bit more, you can also define a reuse type for regions as a managed association:

{% include _code sample='your-common.4.2.cds' %}


### Using the New Reuse Type and Code List

This finally allows you to add respective elements, the same way you do it with predefined reuse types. These elements receive the same support from built-in generic features. For example:

{% include _code sample='using-region-type.cds' %}


## Code Lists with Validity

Even ISO codes may change over time and you may have to react to that in your applications. For example, when Burma was renamed to Myanmar in 1989. Let's investigate strategies on how that can be updated in our code lists.


### Accommodating Changes

The renaming from Burma to Myanmar in 1989, was reflected in [ISO 3166] as follows (_the alpha-4 codes as specified in [ISO 3166-3] signify entries officially deleted from [ISO 3166-1] code lists_):

| Name | Alpha-2 | Alpha-3 | Alpha-4 | Numeric |
| --- | --- | --- | --- | --- |
| Burma | BU | BUR | BUMM | 104	|
| Myanmar | MM | MMR | | 104	|

By default, and with the given default definitions in _@sap/cds/common_, this would have been reflected as a new entry for Myanmar and you'd have the following choices on what to do with the existing records in your data:

* **(a)** adjust foreign keys for records so that it always reflects the current state
* **(b)** keep foreign keys as is for cases where the old records reflect the state effective at the time they were created or valid


### Exclude Outdated Entries from Pick Lists (Optional)

Although outdated entries like the one for Burma have to remain in the code lists as targets for references from historic records in other entities, you would certainly want to exclude it from all pick lists used in UIs when entering new data. This is how you could achieve that:


#### 1. Extend the Common Code List Entity

```swift
using { sap.common.Countries } from '@sap/cds/common';
extend Countries with { validFrom: Date; validTo: Date; }
```


#### 2. Fill Validity Boundaries in Code Lists:

| code | name | validFrom | validTo |
| --- | --- | --- | --- | --- |
| BU | Burma | | 1989-06-18 |
| MM | Myanmar | 1989-06-18 |


#### 3. Add Custom Handlers to Narrow Queries

```js
srv.before ('READ','sap_common_Countries', req => {
  req.query.where ('current_date between validFrom and validTo')
})
```
