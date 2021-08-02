# rewrite-not-supported

The compiler is not able to rewrite ON conditions for some associations.
They have to be explicitly defined by the user.

The message's severity is `Warning` but will be raised to `Error` in the SQL,
HANA and OData backends.  These backends require associations to have proper
ON conditions.

## Example

Erroneous code example:

```
entity Base {
  key id     : Integer;
  primary    : Association to Primary on primary.id = primary_id;
  primary_id : Integer;
}

entity Primary {
  key id       : Integer;
  secondary    : Association to Secondary on secondary.id = secondary_id;
  secondary_id : Integer;
}

entity Secondary {
  key id : Integer;
  text   : LargeString;
}

entity View as select from Base {
  id,
  primary.secondary // Error: The ON condition is not rewritten here
};
```

In the example above the ON condition in `View` of `secondary` cannot be
automatically rewritten because the associations are unmanaged and the
compiler cannot determine how to properly rewrite them for `View`.

## Fix

To fix the issue, you have to provide an explicit ON condition.  This can be
achieved by using the `redirected to` statement:

```
entity View as select from Base {
  id,
  primary.secondary_id,
  primary.secondary: redirected to Secondary on
    secondary.id = secondary_id
};
```

In the corrected view above the association `secondary` gets an explicit ON
condition.  For this to work it is necessary to add `secondary_id` to the
selection list, i.e. we have to explicitly use the foreign key.
