
## Import Directives
{:#imports}

  - [`using` directives](#using-directives)
  - [`import` directives](#import-directives)
  - [model resolution](#model-resolution)


### `using` directives

Using directives allow to import definitions from other cds models. As shown in line 3 below you can specify aliases to be used subsequently. You can import single definitions as well as several ones with a
common namespace prefix, optionally choosing a local alias.

{% include _code sample='using-from.cds' %}

Multiple named imports via es6-like deconstructors:

```swift
using { Foo as Moo, sub.Bar } from './base-model';
entity Boo : Moo;
entity Car : Bar;
```

Note: also in the deconstructor variant of `using`  shown above, you always need to specify fully-qualified names.


### `import` directives
{: .impl.concept}

The `import` directive extends the `using` directive to fully support syntax and semantics of [`import` statements in ES6][ES6].
In particular...

Imported names may omit the target's namespace prefix:

```swift
import {Foo} from './base-model';
```

Multiple named imports via es6-like deconstructors:

```swift
import { Foo as Moo, scoped.Bar } from './base-model';
entity Boo : Moo;
entity Car : Bar;
```


Imports with locally chosen prefixes (independent from target namespaces):

```swift
import base from './base-model';
entity Foo : base.Foo;
entity Bar : base.scoped.Bar;
```


### model resolution

Imports in `cds` work very much like `require` in [node][] and `imports` in [ES6][].
In fact we reuse **[Node's module loading mechanisms](https://nodejs.org/api/modules.html)**.
Hence the same rules apply; in short:

* names starting with `./` or `../` are resolved relative to the current model
* others are absolute references, fetched for in `node_modules` folders...
* with `.json` or `.cds` suffixes appended in order
* or from a `.../index.<json|cds>` file in case of a folder

> Note: to allow for loading from pre-compiled `.json` files it is recommended
to **omit `.cds` suffixes** in import statements, as shown in the examples above.


<br>