# redirected-to-ambiguous

The redirected target originates more than once from the original target
through direct or indirect sources of the redirected target.

The message's severity is `Error` and is raised by the compiler.
The error happens due to an ill-formed redirection which requires changes to
your model.

## Example

Erroneous code example

```
entity Main {
      key id : Integer;
    toTarget : Association to Target;
}

entity Target {
    key id : Integer;
}

view View as select from
    Main,
    Target,
    Target as Duplicate
{
    // This redirection cannot be resolved:
    Main.toTarget : redirected to View
};
```

Entity `Target` exists more than once in `View`.  In the example above this
happens through the *direct* sources in the select clause.
Because the original target exists twice in the redirected target, the compiler
is not able to correctly resolve the redirection due to ambiguities.

This can also happen through *indirect* sources.  For example if entity `Main`
were to include `Target` then selecting from `Target` just once would be enough
to trigger this error.

## Fix

To fix the issue, you must have the original target only once in your direct
and indirect sources.  The example above can be fixed by removing `Duplicate`
from the select clause.

```
view View as select from Main, Target {
    Main.toTarget : redirected to View
};
```

If this is not feasible then you have to redefine the association using a mixin
clause.

```
view View as select from Main, Target mixin {
    toMain : Association to View on Main.id = Target.id;
} into {
    Main.id   as mainId,
    Target.id as targetId,
    toMain
};
```

## Related messages

- `redirected-to-unrelated`
