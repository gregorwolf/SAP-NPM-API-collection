# Change Log

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/) and
this project adheres to [Semantic Versioning](http://semver.org/).

## Version 2.13.0 - 2020-09-02

## Added
- `aspect` to core type system
- `Association` class now knows `isAssociation`, `isComposition`, and `isManagedComposition`
- `any` has now a `path` getter


## Version 2.12.2 - 2020-07-31

## Added

- getters `.associations` and `.compositions` on linked entities


## Version 2.11.0 - 2020-04-27

## Added

- QL parser

## Version 2.10.2 - 2020-03-19

### Removed

`npm-shrinkwrap.json`

## Version 2.10.1 - 2020-02-20

### Changed

- Updated version number for public release


## Version 2.9.3 - 2020-02-19

### Changed

- Updated version number for public release

## Version 2.9.2 - 2020-01-17

### Fixed

- Linked view entities erroneously inherited their base entities' `.keys` e.g.:
```js
const m = cds.linked(cds.parse(`
  entity Foo { key ID : UUID }
  entity Bar as select from Foo { ID as Kennung };
`))
const { Foo, Bar } = m.entities
Foo.keys //> { ID: string { key: true, type: 'cds.UUID' } }
Bar.keys //> { Kennung: string { key: true, type: 'cds.UUID' } }
// The latter before was erronously:
Bar.keys //> { ID: string { key: true, type: 'cds.UUID' } } -> WRONG
```
## Version 2.9.1 - 2019-12-11

### Added
- Preparations for streamlined compiler APIs


## Version 2.8.0 - 2019-10-08

### Added
- Entity definitions know their service

## Version 2.7.1 - 2019-09-09

### Added

- Support for `cds.extend(Foo)`

## Version 2.7.0 - 2019-09-09

### Added

- Support for linking typeof refs

## Version 2.6.0 - 2019-08-21

### Added

- `.valueOf` to easily construct qualified names

### Changed

- Improved stack traces

## Version 2.5.0 - 2019-05-03

### Added

- `cds` now is an `EventEmitter` -- This allows server modules to inform interested listeners about notable events in a loose-coupling fashion.

### Fixed
- `model.services` now really filters
- `cds.infer` supports paths with filters


## Version 2.3.0

### Changed
- The minimum required Node.js version is now set more specifically to _8.9_ LTS.  Previously, just Node.js 8 was mentioned.


## Version 2.2.1 - 2019-01-24

### Fixed

- Getter for `linked_entity.source`

## Version 2.2.0

### Added
- Getter for `linked_entity.source` (better use: `linked_entity.query._target`)

## Version 2.0.5
### Features
- Seperated iteration and recursion `.foreach` is now iteration only, use `.forall` to visit all definitions recursively.

## Version 1.8.0
### Features
- Entities and services can be retrieved with namespace scope

## Version 1.7.0
### Changes
- Clean up of TypeScript APIs

## Version 1.6.0
### Features
- Getters for entities and services
- Infer keys for managed associations
- Support for getting entities and services with namespace, e.g. `cds.reflect(m).entities ('my.bookshop')`

## Version 1.5.0
### Fixes
- Fixes for linking associations and foreign keys
