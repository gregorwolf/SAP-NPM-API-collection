
## Query-local Mixins

Use the `mixin...into` clause to logically add elements to the source of the query which you can use and propagate in the query's projection.

```sql
SELECT from Books mixin {
  localized : Association to LocalizedBooks on localized.ID = ID;
} into {
  ID, localized.title
};
```
