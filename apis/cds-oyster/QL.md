# Querying with `cds.ql`

Fluent API to construct [CQN](https://cap.cloud.sap/docs/cds/cqn) query objects in a [CQL](https://cap.cloud.sap/docs/cds/cql)/SQL-like style — `SELECT`, `INSERT`, `UPSERT`, `UPDATE`, `DELETE`, and the `cql` tagged template literal.

This document is the complete reference for the user-facing surface. It is provider-neutral: it describes what the language itself supports. Specific runtimes may narrow this surface further; those restrictions are documented in the runtime's own README. For hand-building CQN objects directly, see [Hand-Building CQN](#hand-building-cqn) at the end.

## Table of Contents

- [Differences vs. CAP's Node.js Query API](#differences-vs-caps-nodejs-query-api)
- [`cql()`](#cql)
- [Literals and Interpolation in Tagged Templates](#literals-and-interpolation-in-tagged-templates)
- [SELECT](#select)
  - [`.one`](#one)
  - [`.distinct`](#distinct)
  - [`.localized`](#localized)
  - [`.from()`](#from)
  - [`.columns()`](#columns)
  - [`.where()`](#where)
  - [`.orderBy()`](#orderby)
  - [`.groupBy()`](#groupby)
  - [`.having()`](#having)
  - [`.limit()` / `.top()` / `.skip()` / `.offset()`](#limit-top-skip-offset)
- [INSERT](#insert)
  - [`.into()`](#into)
  - [`.entries()`](#entries)
  - [`.columns()` / `.values()` / `.rows()` / `.from()`](#columns-values-rows-from)
- [UPSERT](#upsert)
- [UPDATE](#update)
  - [`.entity()`](#entity)
  - [`.set()` / `.with()`](#set-with)
  - [`.where()`](#where-1)
- [DELETE](#delete)
- [Expression Language](#expression-language)
- [Hand-Building CQN](#hand-building-cqn)

## Differences vs. CAP's Node.js Query API

`@cap.core/ql` is a focused, standalone implementation of the [CAP Node.js Query API](https://cap.cloud.sap/docs/node.js/cds-ql) — the same `SELECT`, `INSERT`, `UPSERT`, `UPDATE`, `DELETE` classes and the same `cql` tagged template. The two are largely interchangeable, but not 100%. Three categories of divergence to keep in mind:

### CAP Node.js Query API features `@cap.core/ql` does not parse

| Feature | CAP Node.js | `@cap.core/ql` |
|---|---|---|
| Explicit `inner join` / `left join` / `right join` | ✓ | ✗ — use path expressions and infix filters instead |
| Set operations: `union` / `union all` / `intersect` / `except` | ✓ | ✗ |
| CTEs (`with` clause, recursive queries) | ✓ | ✗ |
| `order by … nulls first` / `nulls last` | ✓ | ✗ |
| Top-level `select * excluding { col }` | ✓ | ✗ — `excluding` works only inside nested expand blocks |
| Temporal variables `$at.from` / `$at.to` | ✓ | ✗ — only simple `$`-refs (`$now`, `$user`, `$self`) parse |
| Cardinality in path filters (`assoc[1: cond]`) | ✓ | ✗ — only plain infix filters |
| Query-local mixins (`mixin … into entity`) | ✓ | ✗ |
| Association definitions in select lists | ✓ | ✗ |
| SQL comments (`--`, `/* … */`) | ✓ | ✗ |

### Forms `@cap.core/ql` parses but the `@sap/cds` runtime rejects

These build syntactically valid CQN but fail when handed to the cds runtime. Avoid them; the right-hand column gives the alternative.

| Construct | What happens | Use instead |
|---|---|---|
| `SELECT.from('Books').columns('*')` | Wraps as `[{ ref: ['*'] }]`; runtime expects bare `'*'` | The tagged-template form (see [`.columns()`](#columns)) |
| `.where(qbe).where(template)` chained | No implicit `and` between the two predicates → invalid SQL | One `.where()` carrying the full predicate |
| `is empty` / `is not empty` on associations | Runtime: *"An association can't be used as a value in an expression"* | `exists books` / `not exists books` |
| `INSERT.into('Books').columns(...).values(...)` | `.values()` wraps scalars as `{val:…}`; runtime rejects them as not matching entity element types | `INSERT.into('Books').entries({...})` |
| `INSERT.into('Books').columns(...).rows(...)` | Same wrapping issue, multiplied per row | `INSERT.into('Books').entries([…])` |
| `INSERT.into('Books').from(SELECT…)` (sub-select insert) | Fails — typically because managed timestamp fields are not projected | Read with `SELECT`, then `INSERT.entries(rows)` |

### Conveniences `@cap.core/ql` adds beyond standard CQL

These are fluent-API ergonomics, not part of the CQL grammar itself:

- **Method aliases** — `.with()` is an alias for `.set()` in UPDATE; `.top()` / `.skip()` / `.offset()` for pagination alongside `.limit(rows, offset)`.
- **Entity + key shorthand** — `SELECT.from('Books', 201)`, `UPDATE.entity('Books', 201)`, `DELETE.from('Books', 201)`.
- **QBE (query-by-example) object form** for `.where(...)` — `where({ ID: 201, stock: 12 })` joins keys with `and`.
- **Direction object for `.orderBy()`** — `orderBy({ title: 1, ID: -1 })` (`1` = `asc`, `-1` = `desc`).
- **Reflection-object form** — `SELECT.from({ name: 'Books' })` for dynamic entity references.
- **`cql` as both a parser function and a tagged-template** — `cql(stringOrTemplateOrCQN)`.

## `cql()`

```tsx
function cql ( query    : Query instance )                        : Query
function cql ( cql      : tagged template string )                : Query
function cql ( cql      : string )                                : Query
```

Parses textual CQL into a CQN query object, or returns an existing `Query` instance unchanged.

```js
import { cql } from '@cap.core/ql'

// Tagged template — the idiomatic call form
cql`SELECT ID, title from Books where ID = 201`

// Plain string — equivalent, useful when CQL is already in a variable
cql('SELECT ID, title from Books where ID = 201')

// Pass-through
const q = SELECT.from('Books'); cql(q) === q
```

`SELECT`, `INSERT`, `UPSERT`, `UPDATE`, `DELETE` are exported individually. Each works both as a constructor and as a factory (no `new` required).

## Literals and Interpolation in Tagged Templates

Constants go directly into the template:

```js
cql`SELECT from Books where ID = 201`
cql`SELECT from Books where title = 'Jane Eyre'`
```

Variables go through `${…}`:

```js
const id = req.data.ID
SELECT.from('Books').where`ID = ${id}`
UPDATE.entity('Books').set`stock = stock - 1`.where`ID = ${id}`
```

`${value}` lands in a single `{val}` slot regardless of contents — no escaping needed. `${42}` and `42` produce the same CQN; for constants, the bare form reads cleaner.

> NOTE: This is not a SQL-injection defence — protecting against injection is the runtime's job, not the developer's.

## SELECT

Fluent API to construct [CQN SELECT](https://cap.cloud.sap/docs/cds/cqn#select) query objects. In contrast to SQL, the clauses can be arrayed in arbitrary order.

`SELECT` itself is a function acting as a shortcut to `SELECT.columns`:

```js
SELECT`ID, title`.from`Books`           // shortcut for:
SELECT.columns`ID, title`.from`Books`
```

For a full statement parsed in one go, use `cql`:

```js
const id = 201
const q = cql`SELECT ID, title from Books where ID = ${id}`
```

### `.one`

Start constructing a query with `SELECT.one` to indicate only the first row is wanted. At runtime, a single entry, if any, is returned instead of an array:

```js
SELECT.one.from('Books').where({ ID: 201 })
SELECT.one.from('Books').columns('title', 'author')
```

`.one` must precede `.from`.

### `.distinct`

Start the query with `SELECT.distinct` to skip duplicates as in SQL:

```js
SELECT.distinct.from('Books').columns('author')
```

### `.localized`

Start the query with `SELECT.localized` to select translated text columns from the corresponding `_texts` side table (where the data model supports localization):

```js
SELECT.localized.from('Books').columns('title', 'descr')
```

### `.from()`

```tsx
function SELECT.from (
   entity : string | CSN definition | tagged template string,
   key?   : string | number
)
```

Fills in the [CQN `from` clause](https://cap.cloud.sap/docs/cds/cqn#select), optionally adding a primary key. The latter is an alternative for a separate `.where` clause.

```js
SELECT.from('Books')
SELECT.from`Books`
SELECT.from({ name: 'Books' })           // entity reflection object
SELECT.from('Books', 201)                // entity + key shorthand
```

The `key` argument is a single string or number value. It collapses to `[{ val: <key> }]` inside the ref's `where`, matching the `Books[201]` template form. Specifying a `key` does **not** automatically enable `.one` in `cds.ql` — combine it with `SELECT.one.from(...)` explicitly when a single record is wanted.

### `.columns()`

```tsx
function SELECT.columns ( cql      : tagged template string )
function SELECT.columns ( ...cols  : string | CQN column object )
function SELECT.columns ( cols[]   : (string | CQN column object)[] )
```

Specifies which columns to fetch, very much like SQL select clauses, enhanced by [CQL](https://cap.cloud.sap/docs/cds/cql) projections and path expressions.

```js
SELECT.from('Books').columns('ID', 'title')
SELECT.from('Books').columns(['ID', 'title'])
SELECT.from('Books').columns`*`                                 // wildcard
SELECT.from('Authors').columns`ID, name, books { ID, title }`   // nested projections
SELECT.from('Books').columns`author.name as authorName`         // aliases
SELECT.from('Books').columns`count(*) as total, max(price) as maxPrice`
```

Nested projection blocks (`{ … }`) yield columns with `.expand` for to-many associations. `.inline` is also supported for flattening a structured element into the parent row.

> NOTE: A single comma-separated string passed to the fluent `.columns('ID, title')` is treated as **one** column literally named `"ID, title"` — not split. Use multiple arguments, an array, or a tagged template for multi-column lists.

### `.where()`

```tsx
function SELECT.where ( qbe    : query-by-example object )
function SELECT.where ( clause : tagged template string )
```

Predicate expressions can be specified as a query-by-example (QBE) object or as a tagged template string:

```js
SELECT.from('Books').where({ ID: 201, stock: 12 })    // qbe — keys joined with AND
SELECT.from('Books').where`ID = 201 and stock = 12`   // tagged template
```

See [Expression Language](#expression-language) for what tagged-template predicates can contain.

> NOTE: Multiple calls to `.where()` on the same query do not implicitly AND. Compose the full predicate in a single `.where()` call.

### `.orderBy()`

Fills in SQL `order by` clauses. Arguments are a single tagged template string, column expression strings (optionally followed by `asc` or `desc`), or a direction object:

```js
SELECT.from('Books').orderBy`title asc, ID desc`
SELECT.from('Books').orderBy('title', 'ID desc')
SELECT.from('Books').orderBy(['title', 'ID desc'])
SELECT.from('Books').orderBy({ title: 1, ID: -1 })   // 1 = asc, -1 = desc
```

### `.groupBy()`

Fills in SQL `group by` clauses. Accepts the same forms as [`.columns()`](#columns):

```js
SELECT.from('Books').columns('author', 'count(*) as books').groupBy('author')
SELECT.from('Books').groupBy`author, genre`
```

### `.having()`

Filter on aggregate values. Accepts the same forms as [`.where()`](#where):

```js
SELECT.from('Books')
  .columns('author', 'count(*) as books')
  .groupBy('author')
  .having`count(*) > 1`
```

### `.limit()` / `.top()` / `.skip()` / `.offset()`

Equivalent of the standard SQL `limit` and `offset` clauses. The four methods are interchangeable in the underlying CQN:

```js
SELECT.from('Books').limit(25)             // first page
SELECT.from('Books').limit(25, 100)        // fifth page
SELECT.from('Books').top(25).skip(100)     // same
SELECT.from('Books').limit(25).offset(100) // .offset is an alias for .skip
SELECT.from('Books').limit`25`.offset`100` // tagged-template values
```

## INSERT

Fluent API to construct [CQN INSERT](https://cap.cloud.sap/docs/cds/cqn#insert) query objects.

### `.into()`

```tsx
function INSERT.into (
   entity   : string | CSN definition | tagged template string,
   entries? : object | object[]
)
```

Specifies the target entity. As a shortcut, the second positional argument is interpreted as `.entries(...)` when it is an object or an array of objects, or as `.columns(...)` when it is an array of strings.

```js
INSERT.into('Books').entries({ ID: 301, title: 'Wuthering Heights', author_ID: 101 })
INSERT.into`Books`.entries({ ID: 302, title: 'Wuthering Heights', author_ID: 101 })
INSERT.into({ name: 'Books' }).entries({ ID: 303, title: 'Wuthering Heights', author_ID: 101 })
INSERT.into('Books', { ID: 304, title: 'Wuthering Heights', author_ID: 101 })          // shortcut for .entries()
INSERT.into('Books', ['ID', 'title', 'author_ID']).values(305, 'Wuthering Heights', 101) // shortcut for .columns()
```

### `.entries()`

```tsx
function INSERT.entries ( ...rows  : object[] )
function INSERT.entries ( rows[]   : object[] )
```

The most common write form. Inserts one or more rows specified as JavaScript objects. Supports deeply nested records — composition-by-composition arrays are inserted as related entities in one statement.

```js
INSERT.into('Books').entries({ ID: 311, title: 'Wuthering Heights', author_ID: 101 })
INSERT.into('Books').entries([
  { ID: 312, title: 'Wuthering Heights', author_ID: 101 },
  { ID: 313, title: 'Jane Eyre', author_ID: 107 },
])
cql`INSERT into Books ${{ ID: 314, title: 'Wuthering Heights', author_ID: 101 }}`
cql`INSERT into Books ${[{ ID: 315, title: 'A', author_ID: 101 }, { ID: 316, title: 'B', author_ID: 101 }]}`
```

### `.columns()` / `.values()` / `.rows()` / `.from()`

`@cap.core/ql` accepts the SQL-style positional shapes (`.columns(...).values(...)`, `.columns(...).rows(...)`, and `.from(<SELECT>)` for sub-select inserts) — they construct valid CQN. However, the CQN they produce is **not currently accepted by the `@sap/cds` runtime**:

- `.values()` wraps scalars as `{val:…}`; the cds runtime rejects them as not matching the entity element types.
- `.rows()` inherits the same wrapping.
- `.from(<SELECT>)` typically fails because managed timestamp fields are not projected.

Use [`.entries(...)`](#entries) instead. If you have a future need for these shapes, follow the upstream issues on `cap-js/ql` and `@sap/cds`.

## UPSERT

Fluent API to construct [CQN UPSERT](https://cap.cloud.sap/docs/cds/cqn#upsert) query objects. Inserts a record when the key does not exist; updates the existing record otherwise. Mirrors [INSERT.entries](#entries) — only the `.entries(...)` form is currently runtime-supported:

```js
UPSERT.into('Books').entries({ ID: 321, title: 'Wuthering Heights', author_ID: 101 })
cql`UPSERT into Books ${{ ID: 322, title: 'Jane Eyre', author_ID: 107 }}`
```

## UPDATE

Fluent API to construct [CQN UPDATE](https://cap.cloud.sap/docs/cds/cqn#update) query objects.

### `.entity()`

```tsx
function UPDATE.entity (
   entity : string | CSN definition | tagged template string,
   key?   : string | number
)
```

Specifies the update target. The `key` argument collapses to `[{ val: <key> }]` inside the ref's `where`.

```js
UPDATE.entity('Books').set({ stock: 0 })
UPDATE.entity`Books`.set({ stock: 0 })
UPDATE.entity('Books', 201).set({ stock: 0 })          // entity + key shorthand
UPDATE.entity`Books[ID=201]`.set({ stock: 0 })         // infix key in template
```

### `.set()` / `.with()`

```tsx
function UPDATE.set/with ( data   : object )
function UPDATE.set/with ( clause : tagged template string )
```

`.set` and `.with` are aliases — pick whichever reads better in context. Both accept the same forms:

```js
// Data object — simple replacement of values
UPDATE.entity('Books').set({ stock: 10, price: 4.99 })

// Tagged template — supports expressions on the right-hand side
UPDATE.entity('Books').set`stock = 10, price = 4.99`
UPDATE.entity('Books').set`stock = stock + 1`           // arithmetic
UPDATE.entity('Books').set`title = upper(title)`        // function call
```

The data-object form sets values directly (produces `UPDATE.data`). The tagged-template forms allow expressions on the right-hand side — column-to-column arithmetic, function calls, references to other elements of the same row (produces `UPDATE.with`).

### `.where()`

Same accepted forms as [`SELECT.where`](#where). Without `.where`, the update applies to **all rows** of the target.

```js
UPDATE.entity('Books').set({ stock: 0 }).where({ author_ID: 101 })
UPDATE.entity('Books').set`stock = 0`.where`author_ID = 101`
```

## DELETE

Fluent API to construct [CQN DELETE](https://cap.cloud.sap/docs/cds/cqn#delete) query objects.

```tsx
function DELETE.from (
   entity : string | CSN definition | tagged template string,
   key?   : string | number
)
```

```js
DELETE.from('Books').where({ ID: 201 })
DELETE.from('Books').where`stock = 0`
DELETE.from('Books', 201)                               // entity + key shorthand
cql`DELETE from Books where ID = 201`
cql`DELETE Books[201]`                                  // infix-filter shorthand
```

Without `.where`, the delete applies to **all rows** of the target. `.where()` accepts the same forms as [`SELECT.where`](#where).

## Expression Language

Tagged templates on `.where()`, `.having()`, `.set()`, and the like accept a full CQL expression sub-language. The grammar is intentionally close to SQL.

**Operators**

| Category | Symbols |
|---|---|
| Comparison | `=` `==` `!=` `<>` `<` `<=` `>` `>=` |
| Arithmetic | `+` `-` `*` `/` `%` |
| String concat / bitwise | `\|\|` `&` `\|` `^` `~` |

```js
SELECT.from('Books').where`stock > 0 and price <= 10`
UPDATE.entity('Books').set`stock = stock - 1`
SELECT.from('Books').where`upper(title) like '%RAVEN%'`
```

**Logical and set keywords** — `and`, `or`, `in`, `between`, `like`, `exists`:

```js
.where`currency_code = 'USD' and stock > 0`
.where`currency_code in ('USD', 'GBP', 'JPY')`
.where`price between 10 and 20`
.where`title like '%raven%'`
.where`exists author[name like '%Brontë%']`
```

**Null and empty checks** — `is null`, `is not null`. For checking whether an association has any related entries, use `exists` / `not exists`:

```js
.where`descr is null`
.where`descr is not null`
.where`exists books`            // author has at least one book
.where`not exists books`        // author has no books
```

**`case` expressions** — `case when … then … else … end`:

```js
SELECT.from('Books').columns`ID, title, case when stock = 0 then 'out of stock' when stock < 5 then 'low' else 'in stock' end as availability`
```

> NOTE: Keep the entire `case … end` block on one line — the current parser does not accept line breaks in the middle of an expression on a tagged-template clause like ``.columns`…` ``.

**Function calls** — any function name parses as a call; the runtime decides which functions are valid:

```js
.columns`count(*) as count, max(price) as maxPrice`
.set`title = upper(title)`
```

`contains` looks like a function call but is parsed as a **keyword** with a list argument, similar to `in`:

```js
.where`contains(title, 'raven')`
// → where: ['contains', { list: [{ ref: ['title'] }, { val: 'raven' }] }]
```

**Lists and parentheses** — parentheses group sub-expressions; a comma-separated parenthesised group is a list:

```js
.where`(stock > 1 or price < 2) and ID > 0`
.where`currency_code in ('USD', 'GBP', 'JPY')`   // list form
```

**References and infix filters** — references are dot-delimited paths (`author`, `author.name`, `genre.parent.name`). Path segments may carry an infix filter in brackets, narrowing an association before navigating it:

```js
SELECT.from('Authors').columns`ID, name, books[stock > 0] { ID, title }`
```

**Aliases (`as`)** — columns and aggregates can be aliased with `as` inside a tagged template:

```js
.columns`author.name as authorName, count(*) as books`
```

> NOTE: Entity aliases (``SELECT.from`Books as B` ``) are not currently supported by the parser — alias columns, not entities.

## Hand-Building CQN

Every query — whether built fluently or parsed from a tagged template — is ultimately a [CQN](https://cap.cloud.sap/docs/cds/cqn) object. The fluent classes and the `cql` function are constructors for that object. Most code never touches the CQN directly. When you do (programmatic query manipulation, code generation, framework adapters), you can hand-build it.

The shapes produced by the fluent API:

```js
// SELECT
{ SELECT: { from: { ref: ['Books'] }, columns: [{ ref: ['ID'] }, { ref: ['title'] }], where: [...] } }

// INSERT / UPSERT
{ INSERT: { into: { ref: ['Books'] }, entries: [{ ID: 1, title: 'WH' }] } }

// UPDATE
{ UPDATE: { entity: { ref: ['Books'] }, data: { stock: 0 }, where: [...] } }

// DELETE
{ DELETE: { from: { ref: ['Books'] }, where: [...] } }
```

`cql()` accepts a hand-built CQN object and casts it to the matching query class:

```js
const q = cql({
  SELECT: {
    from: { ref: ['Books'] },
    columns: [{ ref: ['ID'] }, { ref: ['title'] }],
  },
})
// q is a SELECT instance — chainable as usual:
q.where`stock > 0`
```

The clause targets (`from`, `entity`, `into`) also accept hand-built CQN refs directly:

```js
SELECT.from({ ref: ['Books'] })
UPDATE.entity({ ref: ['Books'] }).set({ stock: 0 })
DELETE.from({ ref: ['Books'] })
```

Anywhere the fluent surface takes a string entity name, it also takes the equivalent `{ ref: [...] }` ref. This makes it straightforward to route between programmatically constructed CQN and chainable queries without re-parsing.
