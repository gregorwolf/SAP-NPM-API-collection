# syntax-expected-integer

The compiler expects a safe integer here.
The last safe Integer is `2^53 - 1` or `9007199254740991`.

A safe integer is an integer that

- can be exactly represented as an IEEE-754 double precision number, and
- whose IEEE-754 representation cannot be the result of rounding any
  other integer to fit the IEEE-754 representation.

The message's severity is `Error`.

## Example

Erroneous code example:

```cdl
type LengthIsUnsafe : String(9007199254740992);
type NotAnInteger : String(42.1);
```

In the above example, the string length for the type `LengthIsUnsafe` is not a
safe Integer. It is too large.
Likewise, the string length for the type `NotAnInteger` is a decimal.

## How to Fix

To fix the issue, you have to provide a safe integer:

```cdl
type LengthIsSafe : String(9007199254740991);
type AnInteger : String(42);
```

If not feasible, a string representation of the number needs to be used,
e.g. in annotation values.
