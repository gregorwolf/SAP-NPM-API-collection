# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.1](https://github.com/sap/cloud-foundry-tools-api/compare/v2.0.4...v2.1.1) (2021-12-06)


### Bug Fixes

* incorrect output analyzing ([#146](https://github.com/sap/cloud-foundry-tools-api/issues/146)) ([de2bed0](https://github.com/sap/cloud-foundry-tools-api/commit/de2bed0777c114389c03f83dfe7a277e47116532))

## [2.0.4](https://github.com/sap/cloud-foundry-tools-api/compare/v2.0.1...v2.0.4) (2021-11-21)


### Bug Fixes

* wrong parsing of cli output ([#142](https://github.com/sap/cloud-foundry-tools-api/issues/142)) ([857fbc8](https://github.com/sap/cloud-foundry-tools-api/commit/857fbc86bc21a49aa993065648cdfd407a5dd2ce))



## [2.0.1](https://github.com/sap/cloud-foundry-tools-api/compare/v2.0.0...v2.0.1) (2021-06-30)


### Bug Fixes

* change access to fs/promises lib ([#113](https://github.com/sap/cloud-foundry-tools-api/issues/113)) ([2dd4a36](https://github.com/sap/cloud-foundry-tools-api/commit/2dd4a361c7414738abef74f274898d9fcddeef0a))



# [2.0.0](https://github.com/sap/cloud-foundry-tools-api/compare/v1.2.0...v2.0.0) (2021-06-22)


### Features

* cfApi is announced ([#108](https://github.com/sap/cloud-foundry-tools-api/issues/108)) ([7217f97](https://github.com/sap/cloud-foundry-tools-api/commit/7217f97710436d6ddffcfba0de6890e47c982295))



# [1.2.0](https://github.com/sap/cloud-foundry-tools-api/compare/v1.1.1...v1.2.0) (2021-06-09)


### Features

* add guid to service instance info ([#100](https://github.com/sap/cloud-foundry-tools-api/issues/100)) ([82959b9](https://github.com/sap/cloud-foundry-tools-api/commit/82959b9d83b2bdba4fef1e80d796668ff32ec4a5))



## [1.1.1](https://github.com/sap/cloud-foundry-tools-api/compare/v1.1.0...v1.1.1) (2021-05-24)


### Bug Fixes

* 'getServicesInstancesFilteredByType' re-implemented ([#93](https://github.com/sap/cloud-foundry-tools-api/issues/93)) ([883de7d](https://github.com/sap/cloud-foundry-tools-api/commit/883de7da0c233fabc366c86b62c72a2720139295))



# [1.1.0](https://github.com/sap/cloud-foundry-tools-api/compare/v1.0.2...v1.1.0) (2021-04-04)


### Features

* function 'cfGetApps' announced ([#79](https://github.com/sap/cloud-foundry-tools-api/issues/79)) ([c9b333f](https://github.com/sap/cloud-foundry-tools-api/commit/c9b333f00324d8b0f17e7e516cf6179e1145311c))



## [1.0.2](https://github.com/sap/cloud-foundry-tools-api/compare/v1.0.1...v1.0.2) (2021-03-07)


### Bug Fixes

* v2->v3 adjustments ([#73](https://github.com/sap/cloud-foundry-tools-api/issues/73)) ([24df910](https://github.com/sap/cloud-foundry-tools-api/commit/24df910e800dcf58a245713c731cdc8e741bc747))



## [1.0.1](https://github.com/sap/cloud-foundry-tools-api/compare/v1.0.0...v1.0.1) (2021-03-04)


### Bug Fixes

* integration adjustment ([#72](https://github.com/sap/cloud-foundry-tools-api/issues/72)) ([b6596b3](https://github.com/sap/cloud-foundry-tools-api/commit/b6596b340d50221feca2dad54ae112817ea6cd44))
* integration scenario fixing ([#71](https://github.com/sap/cloud-foundry-tools-api/issues/71)) ([a9868cd](https://github.com/sap/cloud-foundry-tools-api/commit/a9868cdefc10cc60de255f9dfe5e38eadcba8d2a))



# [1.0.0](https://github.com/sap/cloud-foundry-tools-api/compare/v0.8.1...v1.0.0) (2021-03-01)


### Bug Fixes

* pad query with current space guid by default for cfGetServices call ([#63](https://github.com/sap/cloud-foundry-tools-api/issues/63)) ([cdcaca8](https://github.com/sap/cloud-foundry-tools-api/commit/cdcaca869e73dc0d44d63f40790901f6fa896c34))


### Features

* move on 'v3' format ([#58](https://github.com/sap/cloud-foundry-tools-api/issues/58)) ([846bd87](https://github.com/sap/cloud-foundry-tools-api/commit/846bd87de88190aca88a15e8e2642727292cbdf6))



## [0.8.1](https://github.com/sap/cloud-foundry-tools-api/compare/v0.8.0...v0.8.1) (2021-02-22)


### Bug Fixes

* bump patch version ([05dbda3](https://github.com/sap/cloud-foundry-tools-api/commit/05dbda39f2badd8c5d42f936d97337b7fe883574))



# [0.8.0](https://github.com/sap/cloud-foundry-tools-api/compare/v0.7.0...v0.8.0) (2021-01-03)


### Features

* added cfGetSpaceServices that uses /v2/spaces/:guid/services ([#48](https://github.com/sap/cloud-foundry-tools-api/issues/48)) ([3831e7d](https://github.com/sap/cloud-foundry-tools-api/commit/3831e7d530e151f3b9970fb59acff4f9ed9329bf))



# [0.7.0](https://github.com/sap/cloud-foundry-tools-api/compare/0.7.0...v0.7.0) (2020-12-30)


### Features

* adding service instance creation properties in ServiceTypeInfo interface ([#46](https://github.com/sap/cloud-foundry-tools-api/issues/46)) ([35b014d](https://github.com/sap/cloud-foundry-tools-api/commit/35b014da6225e2fcf350e2c7d1640d0b20ed6e7b))


### Reverts

* Revert "Revert "Create Dependabot config file (#30)" (#38)" (#40) ([7457929](https://github.com/sap/cloud-foundry-tools-api/commit/74579294be23b04bca4b75c725d42fd6a16b8636)), closes [#30](https://github.com/sap/cloud-foundry-tools-api/issues/30) [#38](https://github.com/sap/cloud-foundry-tools-api/issues/38) [#40](https://github.com/sap/cloud-foundry-tools-api/issues/40)
* Revert "Create Dependabot config file (#30)" (#38) ([0f4368b](https://github.com/sap/cloud-foundry-tools-api/commit/0f4368b93d254788c7670846031d27684e23e9ae)), closes [#30](https://github.com/sap/cloud-foundry-tools-api/issues/30) [#38](https://github.com/sap/cloud-foundry-tools-api/issues/38)



## [0.6.8](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.7...v0.6.8) (2020-11-04)



## [0.6.7](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.6...v0.6.7) (2020-10-19)



## [0.6.6](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.5...v0.6.6) (2020-10-12)



## [0.6.5](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.4...v0.6.5) (2020-10-08)



## [0.6.4](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.3...v0.6.4) (2020-09-29)



## [0.6.3](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.2...v0.6.3) (2020-09-22)



## [0.6.2](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.1...v0.6.2) (2020-08-23)



## [0.6.1](https://github.com/sap/cloud-foundry-tools-api/compare/v0.6.0...v0.6.1) (2020-08-23)



# [0.6.0](https://github.com/sap/cloud-foundry-tools-api/compare/v0.5.0...v0.6.0) (2020-08-20)



# [0.5.0](https://github.com/sap/cloud-foundry-tools-api/compare/v0.4.4...v0.5.0) (2020-08-09)



## 0.4.4 (2020-08-04)



