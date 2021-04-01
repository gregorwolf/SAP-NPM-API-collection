# extend-repeated-intralayer

The order of elements of an artifact may not be stable due to multiple extensions
in the same layer (e.g. same file).

A _layer_ can be seen as a group of connected sources, e.g. CDL files.
They form a cyclic connection through their dependencies (e.g. `using` in CDL).

## Example

Erroneous code example with a single CDL file.

```
entity FooBar { }

extend FooBar { foo : Integer; }
extend FooBar { bar : Integer; }
```

Due to multiple extensions in the example above, the order of `foo` and `bar`
inside `FooBar` may not be stable.  You therefore cannot depend on it.

It is also possible to trigger this warning with multiple files.
Take a look at the example below:

```
// (1) Definition.cds
using from './Extension.cds';
entity FooBar { };
extend FooBar { foo: Integer; };

// (2) Extension.cds
using from './Definition.cds';
extend FooBar { bar: Integer; }
```

Here we have a cyclic dependency between (1) and (2).  Together they form one
layer with multiple extensions.  Again, the element order is not stable.

## Fix

To fix the issue, move extensions for the same artifact into the extension block:

```
entity FooBar { }

extend FooBar {
  foo : Integer;
  bar : Integer;
}
```

## Related messages

- `extend-unrelated-layer`
