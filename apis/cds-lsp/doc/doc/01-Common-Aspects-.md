
## Common reuse aspects


_@sap/cds/common_ defines the following [aspects] for use in your entity definitions. They give you not only shortcuts for concise and comprehensible models but also interoperability and out-of-the-box runtime features connected to them.

### aspect `cuid`

Use this as a convenient shortcut to add canonic, universally unique primary keys to your entity definitions. For example:

```swift
entity Foo : cuid {...}
```

... is equivalent to:

```swift
entity Foo {
  key ID : UUID;
  ...
}
```

**Note:** The service provider runtimes automatically fill in UUID-typed keys like these with auto-generated UUIDs.

[learn more about **canonic keys** and **UUIDs**](../guides/domain-models#use-canonic-primary-keys){: .learn-more}


### aspect `managed`

Use this to add four elements to capture created by/at and latest changed by/at management information for records.

```swift
entity Foo : managed {...}
```

... is essentially equivalent to:

```swift
entity Foo {
  modifiedAt : DateTime;
  createdAt  : DateTime;
  createdBy  : String;
  modifiedBy : String;
  ...
}
```

**In addition** to what's shown above, the pre-defined elements are annotated in a way that has the respective fields managed and filled in automatically by the generic service providers. Moreover, the fields are annotated with `@Core.Immutable` that tells Fiori clients to handle them as non-editable fields.

[learn more about **generic service features**](../guides/providing-services#generic-providers){: .learn-more}


### aspect `temporal`

This aspect basically adds two canonic elements, `validFrom` and `validTo` to an entity. It also adds a tag annotation that connects the cds compiler's and runtime's built-in support for _[Temporal Data]_, which covers handling date-effective records and time slices, including time travel. All you have to do is add the temporal aspect to respective entities as follows:

```swift
entity Contract : temporal {...}
```

[learn more about **temporal data**][temporal data]{: .learn-more}
