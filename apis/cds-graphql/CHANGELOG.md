# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Version 1.2.0 - 2022-10-04

### Added

- Support for CDS types `cds.UInt8`, `cds.Int16`, `cds.Int32` and `cds.Int64`
- Map `cds.Binary` and `cds.LargeBinary` to new custom `Binary` scalar type that uses strings to represent base64url encoded binary values
- Map `cds.Date` to new custom `Date` scalar type that uses strings to represent date values in the ISO 8601 format `YYYY-MM-DD`
- Map `cds.DateTime` to new custom `DateTime` scalar type that uses strings to represents datetime values in the ISO 8601 format `YYYY-MM-DDThh-mm-ssTZD`
- Map `cds.Decimal` to new custom `Decimal` scalar type that uses strings to represent exacted signed decimal values
- Map `cds.Int16` to new custom `Int16` scalar type that represents 16-bit signed integer values
- Map `cds.Int32` to the GraphQL built-in scalar type `Int`
- Map `cds.Integer64` and `cds.Int64` to new custom `Int64` scalar type that uses strings to represent 64-bit signed integer values
- Map `cds.Time` to new custom `Time` scalar type that uses strings to represent time values in the ISO 8601 format `hh:mm:ss`
- Map `cds.Timestamp` to new custom `Timestamp` scalar type that uses strings to represents timestamp values in the ISO 8601 format `YYYY-MM-DDThh-mm-ss.sTZD` with up to 7 digits of fractional seconds
- Map `cds.UInt8` to new custom `UInt8` scalar type that represents 8-bit unsigned integer values

### Changed

- Don't generate fields that represent compositions of aspects within types that represent services
- Map `cds.Double` to GraphQL `Float` scalar type as it is capable of signed double‐precision

### Fixed

- Omit `filter` and `orderBy` for entities which don't contain fields
- Don't generate fields for associations and compositions in `orderBy` input types

## Version 1.1.0 - 2022-08-08

### Added

- Parsing of input literal values specified inline inside of GraphQL queries

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
