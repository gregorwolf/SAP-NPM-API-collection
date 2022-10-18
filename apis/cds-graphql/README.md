# GraphQL Protocol Adapter for `@sap/cds`

A GraphQL protocol adapter for [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap) Node.js.
This adapter generically generates a GraphQL schema for the models of a CAP application and serves an endpoint that allows you to query your CAP services using the GraphQL query language.
The adapter is loaded using the plugin system available in `@sap/cds@6`.

---

_**WARNING:** The `@sap/cds-graphql` package is in an early general availability state. This means that it is general available, with stable APIs unless otherwise indicated, and you can use it for production. However, please note the [current limitations](#known-limitations) listed below, as well as the fact that it has not yet been in use by many projects, so we don't have the same level of robustness checks as, for example, for the OData protocol adapter._

---


### Known limitations

- **Authentication** and authorization &rarr; will be added soon
- **Actions** and functions such as found in OData are unsupported
- **CDS annotations** like `@readonly` aren’t considered during schema generation
- **Cursor-based Pagination** &ndash; we currently support offset-based pagination, and will add cursor-based pagination going forward. While we intend to support both variants then, it is not guaranteed that we can do so without breaking changes to current behaviour.


## Install 

1. Add the GraphQL adapter to your CAP project using `npm`:
    ```js
    npm add @sap/cds-graphql
    ```

2. Enable the GraphQL adapter as a plugin in your project's `package.json`:
    ```jsonc
    {
      "cds": {
        "plugins": [
          "@sap/cds-graphql"
        ]
      }
    }
    ```


## Run

3. Run your server as usual, e.g. using `cds watch`.

> The CAP runtime will automatically serve all services via GraphQL at the default endpoint `/graphql`.


## Configure

Specify additional properties by wrapping the module name in `cds.plugins` into an object like so:

```jsonc
{
  "cds": {
    "plugins": [
      { "impl": "@sap/cds-graphql", ... }
    ]
  }
}
```

The endpoint at which to serve all services via GraphQL can be changed by setting the `path` property as described above. For example, to serve the endpoint at `/gql`, the `cds.plugins` object would look like:

```jsonc
{ "impl": "@sap/cds-graphql", "path": "/gql" }
```


## License
This package is provided under the terms of the [SAP Developer License Agreement](https://tools.hana.ondemand.com/developer-license-3.1.txt).
