# V1 -> V2 Migration guide

Follow these steps to migrate from `@sap/ams 1` to `@sap/ams 2`.

1. Update both `@sap/ams` and `@sap/ams-dev` simultaneously to version 2.
1. Replace the `package.json` in your AMS DCL policy deployer application with `/ams-dcl-content-deployer/package.json`.
1. Create a feature request in case you used some of the exports that have been removed from `index.js` (we do not expect any customer to have used them).

Additionally, follow the steps below depending on the nature of your project.

## Plain Node.js Projects
1. Adopt the new `PolicyDecisionPoint` constructor by removing the first two arguments: *constructor(~~url, timeout,~~ bundleProvider)* Those two arguments were not used anymore since `@sap/ams 1.17.0`, so this should not change the behavior of the library.

## CAP Projects

### Migrate @ams.publicFields annotations
To migrate a CAP project which used the DCL generation of `@sap/ams-dev 1` with `@ams.publicFields` annotations, follow these steps to migrate:

1. Back-up the content of the existing `basePolicies.dcl`, then delete it and re-generate it from scratch
1. In each role policy, add *all* attribute restrictions from the old role policies to a single `WHERE` clause behind the `ASSIGN ROLE` statement (use `AND` to connect multiple attribute restrictions)
1. Replace `@ams.publicFields` annotations with `@ams.attributes` annotations
1. Ensure the attribute names in `@ams.attributes` annotations are fully qualified AMS attribute names if you use a schema generated with the old algorithm (e.g. `BookService.Books.descr` instead of just `descr`)

**Important**: If multiple microservices share an AMS instance, you need to keep the old `GRANT * ON <service>.<entity> WHERE <service>.<entity>.<attribute> IS NOT RESTRICTED` grants alongside the adjusted role assignment grant from step 2 in your base policies until each microservice has been migrated. Once they are all on `@sap/ams 2`, those grants can be removed from the base policies.

For greenfield projects or projects in which the AMS schema can still be changed without breaking admin policies of customers, we recommend to use simple, short names for schema attributes. In case you used fully generated DCL files before, delete the old DCL files and generate new ones after migrating the annotations. Follow the [greenfield project example](#project-as-new-greenfield-project) for such projects.

This might not be possible though if your application is already productive and admin policies have been created that depend on the existing attributes that were generated with version 1. Follow the [Migrated project example](#project-as-migrated-brownfield-project) for such projects.

#### Example Migration

##### Project before migration
@ams.publicFields annotations
```js
  @ams: {publicFields: [{value: descr}]}
  @restrict: [{ grant:['READ'], to: ['Reader'] }]
  entity Books as projection on my.Books {
```

schema.dcl
```sql
SCHEMA {
    // CatalogService
    CatalogService : {
        // CatalogService.Books
        Books : {
            // descr : cds.String
            descr : String
        }
    }
}
```

basePolicies.dcl
```sql
POLICY "Reader" {
    GRANT "Reader" ON $SCOPES;
    GRANT * ON "CatalogService.BooksOverview";
    GRANT * ON "CatalogService.Books"
         WHERE CatalogService.Books.descr IS NOT RESTRICTED;
}
```



##### Project as new Greenfield project
@ams.attributes annotations
```js
  @ams.attributes: {
    description: (descr)
  }
  entity Books : managed {
    key ID : Integer;
    descr  : localized String(1111);
```

schema.dcl
```sql
SCHEMA {
    description : String
}
```

basePolicies.dcl
```sql
POLICY "Reader" {
    ASSIGN ROLE "Reader" WHERE description IS NOT RESTRICTED;
}
```



##### Project as migrated Brownfield project
@ams.attributes annotations
```js
  @ams.attributes: {
    CatalogService.Books.descr: (descr)
  }
  entity Books : managed {
    key ID : Integer;
    descr  : localized String(1111);
```

schema.dcl (unchanged to prevent breaking admin policies)
```sql
SCHEMA {
    // CatalogService
    CatalogService : {
        // CatalogService.Books
        Books : {
            // descr : cds.String
            descr : String
        }
    }
}
```

basePolicies.dcl
```sql
POLICY "Reader" {
    ASSIGN ROLE "Reader" WHERE CatalogService.Books.descr IS NOT RESTRICTED;
}
```

### CAP Node.js Projects
1. (Optional) Adopt the new AMS property names in your *cds env* as the old names will continue to work but are deprecated.
1. (Optional) Check the new defaults of the AMS properties in the *cds env* and remove unnecessary manual configuration.
1. (Optional) Remove manual calls of the `compile-dcl` script before unit tests as the AMS plugin should compile DCL to DCN automatically when the application is started via `cds` and during `cds.test`.

### CAP Java Projects
1. Replace the Node.js devDependency to the `@sap/ams-dev 1` plugin with a devDependency to the `@sap/ams 2` plugin. All AMS plugin features relevant for CAP Java projects have been moved there:
    - DCL generation
    - Generation of AMS policy deployer application during `cds build`
    - Validation of `@ams.attributes` annotations
1. (Optional) Adopt the new AMS property names, e.g. if you manually configured a different DCL root folder or disabled DCL generation via *cds env* environment variables.
