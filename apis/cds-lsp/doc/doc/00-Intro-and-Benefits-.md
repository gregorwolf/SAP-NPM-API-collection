
## Why use _@sap/cds/common_?

It is strongly recommended that all applications use the common types and aspects provided through _@sap/cds/common_ in order to benefit from these features:

* **concise** and **comprehensible** models &rarr; see also [Capture Intent](../guides/domain-models#capture-intent)
* **foster interoperability** between all applications doing so
* **proven best practices** captured from real applications
* **streamlined** data models with **minimal entry barriers**
* **optimized** implementations and runtime performance
* **automatic** support for [localized] code lists and value helps
* **extensibility** to adapt to your needs using [Aspects](../guides/domain-models#aspects)
* **verticalization** through third party extension packages
* **out-of-the-box** support for [Business Configuration]


For example, usage is as simple as indicated in the following sample:

```swift
using { Country } from '@sap/cds/common';
entity Addresses {
  street  : String;
  town    : String;
  country : Country; //> using reuse type
}
```

### Outcome = optimized best practice

The final outcomes in terms of modeling patterns, persistence structures, and implementations is essentially the same as what you would have done in a straightforward approach with native means --- if you would have collected design experiences from prior solutions, such as we did.

**Note:** All the common reuse features discussed herein and provided through _@sap/cds/common_ are provided only through this ~100 lines .cds model. There's no additional runtime support required; it merely makes use of basic CDS modeling features as well as generic features like [localized data] and [temporal data] (which, in turn, also only need minimal runtime support with minimal overhead).

In effect, the results are **straightforward**, capturing **best practices** we learned from real business applications, with **minimal footprint**, **optimized performance** and **maximized adaptability** and **extensibility**.
