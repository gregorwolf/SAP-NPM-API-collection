# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!-- New version information is automatically added after line 8 -->

## Version 2.1.0 - 2024-07-31

### Added

- Translations for new languages: bg (Bulgarian), el (Greek), he (Hebrew), hr (Croatian), kk (Kazakh), sk (Slovak), sl (Slovenian), sr (Serbian), uk (Ukrainian)

## Version 2.0.0 - 2024-06-18

### Removed

- All `ZZZ` entries for `sap.common.Countries` are removed.  `ZZZ` could denote an 'unknown' country, but also caused confusion for users.  Check your existing DB content for foreign keys to these entries and adjust them if needed, e.g. if referential constraints would be violated.


## Version 1.4.0 - 2024-02-27

### Added

- Data for `sap.common.Timezones`

### Changed

- Requires `@sap/cds` 7.7 or higher, because of `Timezones` definition

## Version 1.3.1 - 2023-11-21

### Fixed

- More fixes in JA, KO, TH, ZH_TW texts

## Version 1.3.0 - 2023-11-10

### Changed

- Some texts in JA, KO, TH, ZH_TW got longer translated texts, instead of the previously shorter but English texts.

## Version 1.2.0 - 2023-05-12

### Added

- Content for a new `minorUnit` element in `sap.common.Currencies` holding the number of fractions that the minor unit takes (e.g. 0 or 2).

## Version 1.1.0 - 2023-01-09

### Changed

- Changed the description of the croatian currency Kuna from `Croatian Kuna`to `Croatian Kuna (Old --> EUR)` since croatia adopted the euro on the 1st Jan. 2023.

## Version 1.0.1 - 2022-12-07

### Fixed

- Cosmetics in README and `package.json`

## Version 1.0.0 - 2022-12-01

### Fixed

- Removed embargoed countries (Cuba, Iran, North Korea, Syria) and their currencies

## Version 0.2.0 - 2022-09-29

### Added

- External Release

## Version 0.1.1 - 2022-06-29

### Fixed

- Add root `index.cds` for direct import
- Add test project

## Version 0.1.0 - 2022-06-28

### Added

- Internal Release
