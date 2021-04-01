
## Namespaces

<!-- TOC depthFrom:3 -->

- [`namespace` directive](#namespace-directive)
- [contexts](#contexts)
- [fully-qualified names](#fully-qualified-names)

<!-- /TOC -->

### namespace directive

Place a `namespace` directive to the top of a model to prefix the names of all subsequent definitions. This is very much as in other languages like Java.

{% include _code sample='namespaces.cds' %}


### contexts

Use `contexts` for nested namespace sections.

{% include _code sample='contexts.cds' %}


### fully-qualified names

A model ultimately is a collection of definitions with unique, fully-qualified names. For example, the second model above would compile to this [CSN][]:

{% include _code sample='contexts.json' %}


<br>
