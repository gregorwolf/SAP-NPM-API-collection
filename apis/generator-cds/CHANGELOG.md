# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [2.14.2]

### Changed
- Use `@sap/hana-client` instead of `hdb` npm library.
- Use `512M` as default `disk-quota`.

## [2.14.1]

### Changed
- Updated `minimist` and `yaml` npm library versions.
- Use `cds build` command instead of `cds build/all`.

## [2.14.0]

### Feature
- Use Maven Java `Archetype` version `1.39.0`.

## [2.13.2]

### Changed
- Engine entry for Nodejs is now `^10 || ^12` in `srv` and `root` package.json.

## [2.13.1]

### Removed
- Remove `engines.node` entry in package.json for `db` folder.

## [2.13.0]

### Feature
- Use Maven Java `Archetype` version `1.38.0`.

### Fixed
- Add engine entry for `Nodejs 12.0` to package.json.

## [2.12.2]

### Feature
- Use Maven Java `Archetype` version `1.37.1`.

## [2.12.1]

### Feature
- Change warning text when used directly on command line.

## [2.12.0]

### Feature
- Use Maven Java `Archetype` version `1.37.0`.

## [2.11.3]

### Feature
- Use Maven Java `Archetype` version `1.36.2`.

## [2.11.2]

### Fixed
- Do not use maven dependency `slf4j` in pom.xml anymore when technology is Java.

## [2.11.1]

### Feature
- Use Maven Java `Archetype` version `1.36.1`.

## [2.11.0]

### Feature
- Use Maven Java `Archetype` version `1.36.0`.

## [2.10.2]

### Feature
- Use Maven Java `Archetype` version `1.35.4`.

### Fixed
- Improved launch config for VS Code to enable debugging.

## [2.10.1]

### Feature
- Use Maven Java `Archetype` version `1.35.2`.

### Fixed
- Create launch config file with reference to cds.js instead of npx.

## [2.10.0]

### Feature
- Add csv sample data for books, authors and orders
- Use Maven Java `Archetype` version `1.35.0`.

### Fixed
- Add missing entries to generated `.gitignore` file.

## [2.9.0]

### Feature
- Use Maven Java `Archetype` version `1.34.1`.

## [2.8.3]

### Feature
- Use cds environment parameter `cds_version` to specify used cds version in semver format.

## [2.8.2]

### Fixed
- Add debug profile in srv `pom.xml`.

## [2.8.1]

### Fixed
- Clean up pom.xml generation.

## [2.8.0]

### Fixed
- Use service plan for uaa configuration based on environment.

## [2.7.0]

- Fix creation of root level `pom.xml`
- Fix `integration tests` for `Odata version 4`

## [2.6.3]

### Feature
- Use Maven Java `Archetype` version `1.32.5`.
- No `npm install` is done if project is located in a monorepo, where node modules is managed
  by e.g. lerna.

### Fixed
- Improve console output when project creation is done.

## [2.6.2]

### Fixed
- Add missing `integration tests` for `OData version 4`.

### Feature
- Use Maven Java `Archetype` version `1.32.3`.

## [2.6.1]

### Fixed
- `Jacoco` support for java based srv modules.
- Issue warning if user calls `cds init help` instead of `cds help init`

## [2.6.0]

### Features
- Use default names for database (`db`) and service (`srv`) folders.
- Use `v2` and `v4` as OData version values.

### Fixed
- Add missing prompt descriptions.

## [2.5.1]

### Fixed
- Fix support for `theia` based generator.
- Temp folder deletion via native os call.

### Feature
- Use Maven Java `Archetype` version `1.32.0`.

## [2.5.0]

### Features
- Add parameter `--pipeline` to create pipeline specific files.
- Add integration tests if user selects db and srv with srv technology java.

## [2.4.12]

### Feature
- Use Maven Java `Archetype` version `1.31.3`.

### Fixed
- Use new maven group id for `ngdbc` driver.

## [2.4.11]

### Feature
- Use Maven Java `Archetype` version `1.31.1`.

### Fixed
- Add logger to API so environment can inject specific loggers.

## [2.4.10]

### Fixed
- Add `default-*.json` and `connection.properties` to root level `.gitignore` file.

### Feature
- Use Maven Java `Archetype` version `1.30.1`.

## [2.4.9]

### Fixed
- Stop creation when required npm library cannot be found.
- Enhance reporting of internal errors.

## [2.4.8]

### Fixed
- Create correct `odata` version entry in root package.json.

## [2.4.7]

### Fixed
- Add `mta_archives` to .gitignore file.
- Create `directory` entry in pom.xml to avoid errors when importing project.

## [2.4.6]

### Fixed
- Add folder name to created hdi container name.
- Reuse existing hdi container when creating a srv module.
- Show npm install output in console by default.
- Use `ISC`as standard license in generated project.

## [2.4.5]

### Fixed
- Only add `disk-quota` when not using java as srv technology.
- Do not add `logback.xml` to `pom.xml` excludes for java srv.
- Add `cds.folders` entry to root level package.json.
- Create `sqlite3` development dependency for db technology sqlite.
- Add all folders specified in `--modules` to cds.requires section in project root package.json.
- Add odata.version entry to root level package.json.

## Features
- Use plugin version `2.0.0.0` in generated .hdiconfig file.
- Using fix archetype version `1.28.1` for java srv projects.

## [2.4.4]

### Fixed
- Using managed service uaa in mta.yaml

## [2.4.3]

### Fixed
- Empty mta.yaml was not parsed correctly.
- Empty package.json prevented correct project setup, cds build problems occurred afterwards.


## [2.4.2]

### Fixed
- Bug in package.json generation


## [2.4.1]

### Fixed
- Bug in file overwrite handling

### Features
- When running init on existing project, generator copies missing files but leaves existing.
- If parameter --force is present the generator overwrites entries in mta.yaml rather than reuse existing


## [2.4.0]

### Features
- Deprecate add module (replace with init --modules)
- Remove command line coloring
- Simplify internal CLI (CLI will be deprecated in the near future)
- Do not allow projects outside current working folder, e.g. init ../../some/where/else is not allowed
- No output at all (not even error messages) when using --quiet
- Create a module folder even if it is empty based on the supplied options
- Parameter --modules only supports one folder of each type

### Fixed
- Bug in mta.yaml creation which resulted in missing/invalid uaa entry
- Removal of existing tasks in .cdsrc.json during add module


## [2.3.10]

### Features
- Support named module folders, e.g. --modules myDB:db creates a db folder named myDB, while --modules db creates a db folder named db
- Enhance output when using --debug flag


## [2.3.9]

### Fixed
- Use existing UAA instance in mta.yaml, if file exists