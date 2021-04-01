# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## Version 1.25.0 - 2020-04-23 (part of cds-runtime 1.1.0)

### Changed

- If a column or column alias is used multiple times in a SELECT query, the query is from now on rejected.
Example: SELECT.from(Foo).columns(['c1', 'c1'])

### Fixed

- Mapping over a result will propagate $count
- Don't ignore rows with `null` column values in negated `$search` queries

## Version 1.24.0 - 2020-03-19

### Added

- Support for different columns combinations in INSERT.entries
- Support for $count in SELECT CQN
- Support String objects in the annotation expressions
- .setTransactionTimestamp in BaseClient
- check for @cds.persistence.skip for deep operations

### Changed

- Use || for concat (works for HANA and sqlite)

### Fixed

- Using view by draft & localized 
- Quote alias in orderBy to work on HANA
- Expand from not draft enabled entity to draft enabled entity
- `where` and `orderBy`clauses containing navigations in combination with expand are correctly translated to SQL

## Version 1.23.2 - 2020-02-25

### Fixed

- Missing alias for orderBy caused column ambiguously defined error

## Version 1.23.1 - 2020-02-21

### Added

- Support for set and data in UPDATE CQN
- Support draft for localized texts 
- Support for with and data in UPDATE CQN

## Version 1.23.0 - 2020-02-19

### Changed

- Convert all search queries using `contains` to `like`

### Fixed

- Searching for `_` or `%` in `$search`

## Version 1.22.0 - 2020-02-05

### Changed

- Managed fields are not removed anymore if they dont belong to operation (e.g. modifiedAt in INSERT, createdAt in UPDATE)
- `null` is a valid value for a managed field (e. g. if `null` is provided for `@cds.on.insert`, `null` will be inserted to DB)

### Fixed

- Expand with composition to one for draft enabled entity

## Version 1.21.0 - 2019-12-10

### Fixed

- post-processing for columns with function calls

## Version 1.20.1 - 2019-11-29

- Error message when ambiguous naming of alias and entity property occurs in SELECT query

### Changed

- Minor improvements

## Version 1.20.0 - 2019-11-19

### Fixed

- Managed fields were not generated when values are null
- Read of active entity with navigation and orderBy with draft specific column (e.g `HasActiveEntity`)

## Version 1.19.1 - 2019-10-30

### Fixed

- Expand adding foreign keys twice

## Version 1.19.0 - 2019-10-29

### Changed

- Improved deep update

### Removed

- `npm-shrinkwrap.json`

## Version 1.18.1 - 2019-10-16

### Fixed

- Problems with deep update of a composition of one
- Unhandled promise rejections by expand

## Version 1.18.0 - 2019-10-02

### Fixed

- Problems with backlinks with custom on condition

## Version 1.17.1 - 2019-09-18

### Changed

- Improved error messages
- Improves SQL Builder for `.where` clauses

## Version 1.17.0 - 2019-09-09

### Fixed

- Expand-to-one in draft context
- Expand with multiple orderby elements using window function
- `UUID` generation for `INSERT` statements

## Version 1.16.0 - 2019-08-21

### Fixed

- Missing sub-select columns in case of UNIONs (e.g. when expanding on the DraftAdminTable)
- UUID generation in custom built deep inserts/updates

## Version 1.15.0 - 2019-07-23

### Added

- `getDraftCompositionTree` to get draft specific composition tree

### Fixed

- Deep Operations with custom on-Condition without backlink

## Version 1.14.0 - 2019-07-09

### Fixed

- Combination of `expand` with instance-based authorization

## Version 1.13.0 - 2019-06-24

### Added

- Struct Mapper checks subselect for matching columns

## Version 1.12.0 - 2019-05-24

### Changed

- Deep insert/update for to-many associations is not allowed

### Fixed

- Property mapper now works for fully-specified columns in SELECT statements

## Version 1.11.1 - 2019-05-16

### Fixed

- Cases with multiple brackets during `onCond` generation

## Version 1.11.0 - 2019-05-15

### Fixed

- Annotate elements with both `@cds.on.insert` and `@cds.on.update`

## Version 1.10.0 - 2019-05-03

### Added

- Support for composition to-one using `$self`
- Service functions `update`, `read`, `insert`, `delete` and `create`

### Fixed

- Expand with compound keys and orderby where order column is not requested
- Deeply nested expands

## Version 1.9.0 - 2019-04-16

### Fixed

- Cascading `Delete CQN` generation in case of transitive model

## Version 1.8.0 - 2019-03-29

### Changed

- Minor improvements
- alphabetical aliases instead of md5 in case of expand

## Version 1.7.0 - 2019-03-19

### Added

- Support for 'list' in function arguments
- Support for ```from: { ref: [] }``` in DeleteBuilder
- Support for Compositions with custom on condition (no and/or)

### Fixed

- Expanding of on active draft documents lists without $filter
- Expand of entities with compound key might return duplicate results

## Version 1.6.0 - 2019-02-25

### Added

- Support for 'func' as defined in cqn spec
- Support for 'list' in expressions
- Support for deep insert with recursive entities

### Changed

### Fixed

- Recursion in composition tree
- Added brackets in oncond
- Fixed is null / is not null in oncond
- Falsy values at expanded elements
- Fixed expand with selected column 'IsActiveEntity'

## Version 1.5.1 - 2019-02-12

### Added

- Support for sql functions lower, upper, trim, length in $filter and $orderby

## Version 1.5.0 - 2019-02-06

### Added

- Support for ```INSERT into ... SELECT ...```

### Changed

- Minimum node version 8.9.0
- Improve expand performance

## Version 1.4.0 - 2019-01-22

### Added

- Construct SQLs from CQN which includes placeholder
- Support draft scenario 'Locked by another user'

## Version 1.3.0 - 2019-01-11

### Added

- Support for compound keys

### Changed

- Improve inline detection

## Version 1.2.0 - 2018-12-21

### Added

- Set default values in case of CREATE, UPSERT and adding a child in deep documents
- Reversed cascade delete

## Version 1.1.0 - 2018-12-12

### Added

- Support Deep Document CQNs
- Support for inline
- Post processing with CQN that uses select *

### Fixed

- Expand in combination with left outer joins

## Version 1.0.3 - 2018-11-27

### Changed

- Throw root cause instead of CqnParseError
- Throw root cause instead of SqlError

### Fixed

- Binary generated wrong SQL
- Complex CQN with draft and expand for Hana
- Expand modifies copy instead of original CQN
- Expand with missing columns
- Expand in combination with limit
- Post processing of DateTime and Boolean

## Version 0.12.0 - 2018-10-17

- Refactoring and changes due to updated dependencies

## Version 0.11.0 - 2018-10-04

### Added

- Expanding of drafts entries at list pages
- Expanding of drafts entries at object pages

## Version 0.10.0 - 2018-09-17

### Added

- Support of now/user annotations in structured type
- Support of expand in combination with contains at where
- Support of LIMIT/OFFSET, ORDER BY and WHERE at expanded items
- Custom types on top of associations
- Support columns: ['*'] at CQN

## Version 0.9.2 - 2018-09-05

### Added

- SQL generation for SELECT statements that include UNION

### Changed

- Improved npm-shrinkwrap

### Fixed

- Postprocessing breaks without CSN

## Version 0.9.1 - 2018-08-28

(Preparation for Release)

## Version 0.9.0 - 2018-08-28

### Changed

- .getColumns includes annotations
- .deploy of BaseClient uses CDS-Compiler to do database setup

### Fixed

- SQL generation in case of CREATE statements using structured elements containing managed associations
- Postprocessing of expand to many in plain mode

## Version 0.8.1 - 2018-08-09

### Changed

- Require submodules on demand

## Version 0.8.0 - 2018-08-07

### Added

- Support for exists in combination with expand
- Support column annotations '@cds.on.insert', '@cds.on.update', '@odata.on.insert' and '@odata.on.update'
- Post processing of complex and structured types
- Support for unary and binary expressions in contains
- Support for CQN partials at .where

### Changed

- Renamed SELECT.elements to SELECT.columns
- SQL Error provides info about the executed query and values in logs

### Fixed

- Deep expands with more than 10 levels
- Expand to composition and further to one association
- Structured types at expand could lead to ambiguity

## Version 0.7.0 - 2018-07-11

### Added

- CREATE supports type cds.Composition
- Expand supports type cds.Composition
- Support for structured elements

## Version 0.6.0 - 2018-07-02

### Added

<!-- Was never documented publicly: - Shortcut for running queries with run().then.run() -->

### Fixed

- SQL generation in case of combination of navigation and expand in SELECT statements

## Version 0.5.0 - 2018-06-25

### Added

- custom builders can now be provided via options in SQL Builder
- support create with views
- added SQL Error to hide the internal information from other errors
- support structured elements
- support for complex types in Create Builder
- BaseClient has method .deploy to easily create database artifacts from csn model
- support for SQL function contains by converting it using like
- support execution of blocks of statements

### Changed

- quotation in SQL generation is now configurable (default is plain)
- support for latest CQN spec changes

### Fixed

- column generation for managed associations
- CREATE statement with managed association as key
- resolve $self for expand
- 1:1 associations can be null

## Version 0.4.0 - 2018-05-02

### Added

- BaseClient has methods .run & .foreach & .isValid

### Changed

- support for latest CQN spec changes

## Version 0.3.0 - 2018-04-16

### Added

- support CREATE statements

### Fixed

- auto-generated columns in expand=* requests

## Version 0.2.0 - 2018-03-16
### Added

- usage of npm-shrinkwrap

### Changed

- improved performance for expand in case of one-to-many relations

### Fixed

- ambiguous column name when having multiple expands on same entity
