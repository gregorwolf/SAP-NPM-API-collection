# Error Messages Explained

> Status Oct 2019: up-to-date

This document tries to explain some of the less-obvious error messages.

## Common Compiler Messages (Independent From Backend)

### Duplicate definitions

In most cases, you really have just used the same name twice when defining an artifact.
This section is about a situation where you are pretty sure that you have not done that.

```
node_modules/Base/index.cds:1:6-7: Error: Duplicate definition of artifact "T"
node_modules/base/index.cds:1:6-7: Error: Duplicate definition of artifact "T"
node_modules/dep/node_modules/model/index.cds:1:8-9: Error: Duplicate definition of artifact "E"
node_modules/model/index.cds:1:8-9: Error: Duplicate definition of artifact "E"
```

Here, the CDS Compiler considers `…/Base/index.cds` to be different to `…/base/index.cds`,
and also considers the two `…/model/index.cds` files to be different files.
Why is that the case?  Consider the following "top-level" file

```
using from 'Base';     // upper-case 'B'!
using from 'model';
using from 'dep';
```

File node_modules/dep/index.cds` looks like:

```
using from 'base';     // lower-case 'b'!
using from 'model';
```

`node_modules/Base/index.cds` is the same file as
`node_modules/base/index.cds` on case-insensitive file systems (Windows, Mac):

```
type T: Integer;
```

We have `node_modules/model/index.cds` and a copy of it in
`node_modules/dep/node_modules/model/index.cds`:

```
entity E { i: Integer; }
```

The technical explanation is that the CDS Compiler considers
two file names pointing to the same file if their `fs.realpath` is equal.
That means that we properly _recognize symlinks_ (Linux, Mac),
but we do _not_ recognize two files to be equal if:

* the same file is referred to with different name casing,
  which does not work on case-sensitive file systems (Linux) anyway
  (yes, we might issue a better message when `node v9.2` is widely adopted),
* a file is _copied_ within the NPM package (or when _hardlinks_ are used).

The CDL code/package can be corrected as follows:

* Use __consistent casing__ when referring to file and modules in `using from`
  (if in doubt, please check the error output provided by the CDS compiler client tool).
* __Clean up a dirty NPM installation__.  Then, the file
  `node_modules/dep/node_modules/model/index.cds` should disappear
  (or be a symlink to `node_modules/model/index.cds`).


### Nested extensions

If you use nested extensions, you might get messages like:

```
nested-extensions.cds:3:20-26: Error: No `EXTEND artifact` within CONTEXT extensions
nested-extensions.cds:4:20-28: Error: No `ANNOTATE artifact` within SERVICE extensions
nested-extensions.cds:5:14-22: Error: Elements only exist in entities, types or typed constructs
nested-extensions.cds:6:12-36: Error: Elements only exist in entities, types or typed constructs
```

Artifacts (entities, types, …) should not be extended within other extensions –
just elements (and other members) are to be extended within an artifact extension.
The above messages are reported for the following CDL code:

```
context C { entity E { d: Integer; } }
service S { entity E { d: Integer; } }
extend context C { extend C.E { e: Integer; } }
extend service S { annotate S.E @Anno; }
annotate C { E @Anno; }
extend S { extend E { e: Integer; } }
```

The reason for these messages is – if we would allow it:

* If we follow the [normal name resolution rules](NameResolution.md),
  people would have to refer to the entity the same way
  as outside `extend context`/`extend service`.
  Most people would probably expect being able
  to write just `E` instead `C.E`/`S.E` in line 3 and 4,
  but this not only require special rules, but leads to other surprises – see below.
* Using `{ … }` inside a plain `annotate` or `extend` statement
  is supposed to annotate/extend elements (or enums), not containing artifacts.

The CDL code can be corrected as follows:

```
context C { entity E { d: Integer; } }
service S { entity E { d: Integer; } }
extend C.E { e: Integer; }
annotate S.E @Anno;
annotate C.E @Anno;
extend S.E { e: Integer; }
```

Now consider that you could use the following to extend the entity `C.E`:

```
context C { entity E { key d: Integer; } }
entity E { key x: Integer; }
extend context C {
    extend E { e: Integer; }          // i.e. extend C.E
}
extend context C {
    entity F { a: association to E; } // target: E, not C.E (normal name resolution)
}
```

What about combining the two `extend context`:

```
context C { entity E { key d: Integer; } }
entity E { key x: Integer; }
extend context C {
    extend E { e: Integer; }          // i.e. extend C.E
    entity F { a: association to E; } // target: E or C.E ?
}
```

In summary, allowing artifact extensions inside `extend context`/`extend service`
would provide little benefit, but would add complexity and confusion.


### Redirection issues

The target `OrigTarget` of an existing association can only be redirected to another target `NewTarget`
if the `NewTarget` is a direct or indirect projection of `OrigTarget`
(complex views are questionable and lead to a Warning),
or an entity definition which directly or indirectly includes `OrigTarget`.

```
entity Base {
    key i: Integer;
}
entity Proj as projection on Base;
entity NewTarget as projection on Intermediate;
entity Intermediate as projection on Base;

entity Assocs {
    base: association to Base;
    proj: association to Proj;
}
entity Redirect as projection on Assocs {
    base: redirected to NewTarget, // works
    proj: redirected to NewTarget  // ERROR: does not originate from Proj
}
```

For the above CDS code, you get the following error message:

```
redirect-to-unrelated.cds:16:25-34: Error: The redirected target does not originate from "Proj"
    (in entity:"Redirect"/element:"proj")
```
