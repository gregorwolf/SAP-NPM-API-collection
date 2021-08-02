# redirected-to-unrelated

The redirected target does not originate from the original target.

The message's severity is `Error` and is raised by the compiler.
The error happens due to an ill-formed redirection which requires changes to
your model.

## Example

Erroneous code example:

```
entity Main {
    key id : Integer;
    // self association for example purpose only
    toMain : Association to Main;
}
entity Secondary {
    key id : Integer;
}
entity InvalidRedirect as projection on Main {
    id,
    // Invalid redirection
    toMain: redirected to Secondary,
};
```

Projection `InvalidRedirect` tries to redirect `toMain` to `Secondary`.
However, that entity does not have any connection to the original target
`Main`, i.e. it does not originate from `Main`.

While this example may be clear, your model may have multiple redirections
that make the error not as obvious.

Erroneous code example with multiple redirections:

```
entity Main {
    key id : Integer;
    toMain : Association to Main;
}
entity FirstRedirect as projection on Main {
    id,
    toMain: redirected to FirstRedirect,
}
entity SecondRedirect as projection on FirstRedirect {
    id,
    // Invalid redirection
    toMain: redirected to Main,
}
```

The intent of the example above is to redirect `toMain` to its original target
in `SecondRedirect`.  But because `SecondRedirect` uses `toMain` from
`FirstRedirect`, the original target is `FirstRedirect`.  And `Main` does not
originate from `FirstRedirect` but only vice versa.

## Fix

To fix the issue, you must redirect the association to an entity that originates
from the original target.  In the first example above you could redirect
`SecondRedirect:toMain` to `SecondRedirect`.  However, if that is not feasible
then you have to redefine the association using a mixin clause.

```
view SecondRedirect as select from FirstRedirect mixin {
    toMain : Association to Main on id = $self.id;
} into {
    FirstRedirect.id as id,
    toMain
};
```

## Related messages

- `redirected-to-ambiguous`
