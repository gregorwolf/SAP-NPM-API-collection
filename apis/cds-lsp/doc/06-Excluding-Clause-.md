

## Excluding Clause

Use the `excluding` clause in combination with `SELECT *` to select all elements except for the ones listed in the exclude list.

```swift
SELECT from Books { * } excluding { author };
```
```swift
SELECT from Books { *, author.name as author, author{*} }
excluding { author.town };
```

The effect is about **late materialization** of signatures and staying open to late extensions.
For example assume the following definitions:

```swift
entity Foo { foo; bar; car; }
entity Bar as SELECT from Foo excluding { bar }
entity Boo as SELECT from Foo { foo, car }
```

A `SELECT * from Bar` would result into the very same as a query of `Boo`:

```sql
SELECT * from Bar --> { foo, car }
SELECT * from Boo --> { foo, car }
```

Now assume a consumer of that package extends the definitions as follows:

```swift
extend Foo with { boo : String; }
```

... with that, queries on `Bar` and `Boo` would return different results:

```sql
SELECT * from Bar --> { foo, car, boo }
SELECT * from Boo --> { foo, car }
```
