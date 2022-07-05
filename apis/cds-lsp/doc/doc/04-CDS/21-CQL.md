---
layout: cds-ref
shorty: Query Language
synopsis: >
  Documents the CDS Query Language (aka CQL) which is an extension of the standard SQL SELECT statement.
permalink: cds/cql
status: released
uacp: Used as link target from Help Portal at https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/855e00bd559742a3b8276fbed4af1008.html
---


# Query Language (CQL)

CDS QL is based on standard SQL, which it enhances by...

{% include _toc levels="2,3" %}
{% include links.md %}

## Postfix Projections

CQL allows to put projections, that means, the `SELECT` clause, behind the `FROM` clause enclosed in curly braces. For example, the following are equivalent:

```sql
SELECT name, address.street from Authors;
```
```sql
SELECT from Authors { name, address.street };
```


### Nested Expands
{: .impl.concept}

Postfix projections can be appended to any column referring to a struct element or an association and hence be nested.
This allows **expand** results along associations and hence read deeply structured documents:

```sql
SELECT from Authors {
   name, address { street, town { name, country }}
};
```

This actually executes three correlated queries to authors, addresses, and towns and returns a structured result set like that:

```js
results = [
  {
    name: 'Victor Hugo',
    address: {
      street: '6 Place des Vosges', town: {
        name: 'Paris',
        country: 'France'
      }
    }
  }, {
    name: 'Emily Brontë', ...
  }, ...
]
```

> This is rather a feature tailored to NoSQL databases and has no equivalent in standard SQL as it requires structured result sets. Some SQL vendors allow things like that with non-scalar subqueries in SELECT clauses.


### Nested Inlines
{: .impl.concept}

Put a **`"."`** before the opening brace to **inline** the target elements and avoid writing lengthy lists of paths to read several elements from the same target. For example:

```sql
SELECT from Authors {
   name, address.{ street, town.{ name, country }}
};
```

... is equivalent to:

```sql
SELECT from Authors {
  name,
  address.street,
  address.town.name,
  address.town.country
};
```


### Smart `*` Selector

Within postfix projections, the `*` operator queries are handled slightly different than in plain SQL select clauses.

#### Example:

```swift
SELECT from Books { *, author.name as author }
```

 Queries like in our example, would result in duplicate element effects for `author` in SQL, while in CQL explicitly defined columns following a `*` replaces equally named columns inferred before.



## Path Expressions

Use path expressions to navigate along associations and/or struct elements in any of the SQL clauses as follows:

* In `from` clauses:

```sql
SELECT from Authors[name='Emily Brontë'].books;
SELECT from Books:authors.towns;
```

* In `select` clauses:

```sql
SELECT title, author.name from Books;
SELECT *, author.address.town.name from Books;

```
* In `where` clauses:

```sql
SELECT from Books where author.name='Emily Brontë';

```
* The same is valid for `group by`, `having`, and `order by`.


### Path Expressions in `from` Clauses

Path expressions in from clauses allow to fetch only those entries from a target entity, which are associated to a parent entity. They unfold to _SEMI JOINS_ in plain SQL queries. For example, the previous mentioned queries would unfold to the following plain SQL counterparts:

```sql
SELECT * from Books WHERE EXISTS (
  SELECT 1 from Authors WHERE Authors.ID = Books.author_ID
    AND Authors.name='Emily Brontë'
);
```
```sql
SELECT * from Towns WHERE EXISTS (
  SELECT 1 from Authors WHERE Authors.town_ID = Towns.ID AND EXISTS (
    SELECT 1 from Books WHERE Books.author_ID = Authors.ID
  )
);
```

### Path Expressions in All Other Clauses

Path expressions in all other clauses are very much like standard SQL's column expressions with table aliases as single prefixes. CQL essentially extends the standard behavior to paths with multiple prefixes, each resolving to a table alias from a corresponding `LEFT OUTER JOIN`. For example, the path expressions in the previous mentioned queries would unfold to the following plain SQL queries:

```sql
SELECT Books.title, author.name from Books
LEFT JOIN Authors author ON author.ID = Books.author_ID;
```
```sql
SELECT Books.*, author_address_town.name from Books
LEFT JOIN Authors author ON author.ID = Books.author_ID
LEFT JOIN Addresses author_address ON author_address.ID = author.address_ID
LEFT JOIN Towns author_address_town ON author_address_town.ID = author_address.town_ID;
```
```sql
SELECT Books.* from Books
LEFT JOIN Authors author ON author.ID = Books.author_ID
WHERE author.name='Emily Brontë'
```

All column references get qualified &rarr; in contrast to plain SQL joins there’s no risk of ambiguous or conflicting column names.
{:.tip}

### With Infix Filters

Append infix filters to associations in path expressions to narrow the resulting joins. For example:

```sql
SELECT books[genre='Mystery'].title from Authors
 WHERE name='Agatha Christie'
```

... unfolds to:
```sql
SELECT books.title from Authors
LEFT JOIN Books books ON ( books.author_ID = Authors.ID )
  AND ( books.genre = 'Mystery' )  --> from Infix Filter
WHERE Authors.name='Agatha Christie';
```

### Exists Predicate
{:.impl.concept}

Use a filtered path expression to test if any element of the associated collection matches the given filter:

```sql
SELECT FROM Authors {name} WHERE EXISTS books[year = 2000]
```

...unfolds to:
```sql
SELECT name
FROM Authors a
WHERE EXISTS (
        SELECT 1
        FROM Books b
        WHERE b.author_id = a.id
            AND b.year = 2000
    )
```

## CDL-Style Casts

Instead of SQL-style type casts you can alternatively use [CDL]-style casts, that means, as in the element of an entity definition.
For example, the following statements are equivalent:

```sql
SELECT cast (foo+1 as Decimal) as bar from Foo;  -- standard SQL
SELECT from Foo { foo+1 as bar : Decimal };      -- CDL-style
```
[learn more about CDL type definitions]({{cdl}}#types){:.learn-more}

SQL-style type casts aren’t yet supported.
{:.tip}

## Excluding Clause

Use the `excluding` clause in combination with `SELECT *` to select all elements except for the ones listed in the exclude list.

```swift
SELECT from Books { * } excluding { author }
```

The effect is about **late materialization** of signatures and staying open to late extensions.
For example assume the following definitions:

```swift
entity Foo { foo : String; bar : String; car : String; }
entity Bar as SELECT from Foo excluding { bar };
entity Boo as SELECT from Foo { foo, car };
```

A `SELECT * from Bar` would result into the same as a query of `Boo`:

```sql
SELECT * from Bar --> { foo, car }
SELECT * from Boo --> { foo, car }
```

Now, assume a consumer of that package extends the definitions as follows:

```swift
extend Foo with { boo : String; }
```

With that, queries on `Bar` and `Boo` would return different results:

```sql
SELECT * from Bar --> { foo, car, boo }
SELECT * from Boo --> { foo, car }
```


## Query-Local Mixins

Use the `mixin...into` clause to logically add unmanaged associations to the source of the query, which you can use and propagate in the query's projection. This is only supported in postfix notation.

```sql
SELECT from Books mixin {
  localized : Association to LocalizedBooks on localized.ID = ID;
} into {
  ID, localized.title
};
```
