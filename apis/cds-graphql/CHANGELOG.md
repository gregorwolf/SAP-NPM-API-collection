# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version 1.0.0 - 2022-07-05

### Added

- Extracted GraphQL protocol adapter from `@sap/cds` to `@sap/cds-graphql`
- Support for `@sap/cds` `cds.plugins`

### Changed

- Refactor GraphQL schema generation to build schema using the `GraphQL.js` `GraphQLSchema` object rather than manually building an SDL string
- Let `cds.tx` handle setting `cds.context` instead of setting it manually
- Nest `create`, `update` and `delete` mutations within the entity that they mutate instead of naming mutations by prefixing the entity with the operation they perform:
  ```graphql
  mutation {
    AdminService {
      Books {
        create(input: { title: "Moby-Dick" }) {
          title
        }
      }
    }
  }
  ```
- Replace inequality operator `<>` with `!=` generated in `CQN` by `eq` filter to align with OData protocol adapter
- Logging level of `query on ${entity.name}` and `mutation on ${entity.name}` messages from `log` to `debug`

### Fixed

- Only generate `eq` and `ne` comparison operations for boolean filters
- Queries on entities with names that contain underscores
- Only generate args for fields that represent elements with to-many relationships

### Removed

- Dependency on `@graphql-tools/schema` previously used to combine SDL string with resolvers
