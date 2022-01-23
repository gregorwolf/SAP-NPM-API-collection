# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.4.8 (2022-01-20)


### Bug Fixes

* also allows contextBasedIsolation for inline config ([#31](https://github.tools.sap/ux/mockserver/issues/31)) ([dc5083c](https://github.tools.sap/ux/mockserver/commit/dc5083cc0c43f528309adf8adbf3f4061db4b5d9))
* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* ensure dynamic loading of config still works ([#47](https://github.tools.sap/ux/mockserver/issues/47)) ([7bb2854](https://github.tools.sap/ux/mockserver/commit/7bb2854e90831cf03f56a6116453171468c81675))
* entity data can be null when accessing a property by path ([#81](https://github.tools.sap/ux/mockserver/issues/81)) ([acb6655](https://github.tools.sap/ux/mockserver/commit/acb6655ccf6a6f1e6f41e37cde124e6606e17a11))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve error handling ([#82](https://github.tools.sap/ux/mockserver/issues/82)) ([65531f2](https://github.tools.sap/ux/mockserver/commit/65531f2f63fba1af4d450e1e579f26760888c5ef))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix webpack ([#44](https://github.tools.sap/ux/mockserver/issues/44)) ([ee39cbb](https://github.tools.sap/ux/mockserver/commit/ee39cbb3af9e6acd252aed97900d2962df484f7b))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* keep all properties for expand ([#72](https://github.tools.sap/ux/mockserver/issues/72)) ([67175d7](https://github.tools.sap/ux/mockserver/commit/67175d7a0c3b79571560d60cfd137bf7848f1696))
* newly created draft items are not saved ([#93](https://github.tools.sap/ux/mockserver/issues/93)) ([d69488f](https://github.tools.sap/ux/mockserver/commit/d69488f982b3fbee6203647c7f7e8e48fd4a9c25))
* oData guid are now properly parsed in filters ([#79](https://github.tools.sap/ux/mockserver/issues/79)) ([07b041e](https://github.tools.sap/ux/mockserver/commit/07b041e641a0ef1e33fdaa440ad1276c9ff14798))
* or-ed complex functions now work properly ([#92](https://github.tools.sap/ux/mockserver/issues/92)) ([bc6544a](https://github.tools.sap/ux/mockserver/commit/bc6544abe71dbf55346976e9d3cea2c48e9712f4))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* properly go to draft for multiple level of data ([#78](https://github.tools.sap/ux/mockserver/issues/78)) ([9cb3b19](https://github.tools.sap/ux/mockserver/commit/9cb3b193e84dd006786f3bf4d2d80c7222cfa515))
* return all properties if query does not contain $select ([#83](https://github.tools.sap/ux/mockserver/issues/83)) ([37627ca](https://github.tools.sap/ux/mockserver/commit/37627ca554f2be2f07cd6e8b801108571d5655eb))
* **security:** add tgz filtering configuration ([50af7be](https://github.tools.sap/ux/mockserver/commit/50af7be4c3548bf2a0845b65367aa0bfba37dab1))
* select work properly when combining navProperties and expand ([#94](https://github.tools.sap/ux/mockserver/issues/94)) ([1d575e8](https://github.tools.sap/ux/mockserver/commit/1d575e8cdcd16196883d39f7f685a455c8c22540))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* test ([360087e](https://github.tools.sap/ux/mockserver/commit/360087efcb08887ec4d379ddda988f8f20c6c9c2))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* usage in the browser is working again ([#52](https://github.tools.sap/ux/mockserver/issues/52)) ([aa7f700](https://github.tools.sap/ux/mockserver/commit/aa7f700ad422a209651dc62ca8f11ea181128e82))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* adapt Edm.Date mockdata ([#67](https://github.tools.sap/ux/mockserver/issues/67)) ([bee36af](https://github.tools.sap/ux/mockserver/commit/bee36af93bd897fa91e93168883755ae66b1dbf2))
* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* add support for EntityContainer extension ([#64](https://github.tools.sap/ux/mockserver/issues/64)) ([4a494c2](https://github.tools.sap/ux/mockserver/commit/4a494c20c81268024357b900bc3c1974739dbb69))
* allow to define header for error response ([#95](https://github.tools.sap/ux/mockserver/issues/95)) ([d701c36](https://github.tools.sap/ux/mockserver/commit/d701c36bc894c39da7e0badc9b4bfd38ca6eff64))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* bundle the mockserver code ([#37](https://github.tools.sap/ux/mockserver/issues/37)) ([ddc6c4d](https://github.tools.sap/ux/mockserver/commit/ddc6c4d454abf8bdf84db0b9e4a42a36e27ada2d))
* configuration now supports multiple services / annotations ([#98](https://github.tools.sap/ux/mockserver/issues/98)) ([9c7f04e](https://github.tools.sap/ux/mockserver/commit/9c7f04e876dd4ef9af0fff4e8da1754ff27047da))
* dev script for vscode debug ([#70](https://github.tools.sap/ux/mockserver/issues/70)) ([19e689d](https://github.tools.sap/ux/mockserver/commit/19e689d547111d66289cc39fa8616145de2f1c25))
* follow the same logic flow when called outside of batch ([cb33b36](https://github.tools.sap/ux/mockserver/commit/cb33b363852e5cd4b42f3b983023389e7b2df8c9))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
* support watch option  ([#29](https://github.tools.sap/ux/mockserver/issues/29)) ([f80853b](https://github.tools.sap/ux/mockserver/commit/f80853bfc6f1132fae14fc813902bef8c68a42d4))
* update the snapshot ([5b40eda](https://github.tools.sap/ux/mockserver/commit/5b40edad344d5d9eab3712d07ae069b036bea03c))





## 1.4.7 (2021-12-08)


### Bug Fixes

* also allows contextBasedIsolation for inline config ([#31](https://github.tools.sap/ux/mockserver/issues/31)) ([dc5083c](https://github.tools.sap/ux/mockserver/commit/dc5083cc0c43f528309adf8adbf3f4061db4b5d9))
* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* ensure dynamic loading of config still works ([#47](https://github.tools.sap/ux/mockserver/issues/47)) ([7bb2854](https://github.tools.sap/ux/mockserver/commit/7bb2854e90831cf03f56a6116453171468c81675))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix webpack ([#44](https://github.tools.sap/ux/mockserver/issues/44)) ([ee39cbb](https://github.tools.sap/ux/mockserver/commit/ee39cbb3af9e6acd252aed97900d2962df484f7b))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* keep all properties for expand ([#72](https://github.tools.sap/ux/mockserver/issues/72)) ([67175d7](https://github.tools.sap/ux/mockserver/commit/67175d7a0c3b79571560d60cfd137bf7848f1696))
* oData guid are now properly parsed in filters ([#79](https://github.tools.sap/ux/mockserver/issues/79)) ([07b041e](https://github.tools.sap/ux/mockserver/commit/07b041e641a0ef1e33fdaa440ad1276c9ff14798))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* properly go to draft for multiple level of data ([#78](https://github.tools.sap/ux/mockserver/issues/78)) ([9cb3b19](https://github.tools.sap/ux/mockserver/commit/9cb3b193e84dd006786f3bf4d2d80c7222cfa515))
* **security:** add tgz filtering configuration ([50af7be](https://github.tools.sap/ux/mockserver/commit/50af7be4c3548bf2a0845b65367aa0bfba37dab1))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* test ([360087e](https://github.tools.sap/ux/mockserver/commit/360087efcb08887ec4d379ddda988f8f20c6c9c2))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* usage in the browser is working again ([#52](https://github.tools.sap/ux/mockserver/issues/52)) ([aa7f700](https://github.tools.sap/ux/mockserver/commit/aa7f700ad422a209651dc62ca8f11ea181128e82))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* adapt Edm.Date mockdata ([#67](https://github.tools.sap/ux/mockserver/issues/67)) ([bee36af](https://github.tools.sap/ux/mockserver/commit/bee36af93bd897fa91e93168883755ae66b1dbf2))
* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* add support for EntityContainer extension ([#64](https://github.tools.sap/ux/mockserver/issues/64)) ([4a494c2](https://github.tools.sap/ux/mockserver/commit/4a494c20c81268024357b900bc3c1974739dbb69))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* bundle the mockserver code ([#37](https://github.tools.sap/ux/mockserver/issues/37)) ([ddc6c4d](https://github.tools.sap/ux/mockserver/commit/ddc6c4d454abf8bdf84db0b9e4a42a36e27ada2d))
* dev script for vscode debug ([#70](https://github.tools.sap/ux/mockserver/issues/70)) ([19e689d](https://github.tools.sap/ux/mockserver/commit/19e689d547111d66289cc39fa8616145de2f1c25))
* follow the same logic flow when called outside of batch ([cb33b36](https://github.tools.sap/ux/mockserver/commit/cb33b363852e5cd4b42f3b983023389e7b2df8c9))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
* support watch option  ([#29](https://github.tools.sap/ux/mockserver/issues/29)) ([f80853b](https://github.tools.sap/ux/mockserver/commit/f80853bfc6f1132fae14fc813902bef8c68a42d4))





## 1.4.6 (2021-11-25)


### Bug Fixes

* also allows contextBasedIsolation for inline config ([#31](https://github.tools.sap/ux/mockserver/issues/31)) ([dc5083c](https://github.tools.sap/ux/mockserver/commit/dc5083cc0c43f528309adf8adbf3f4061db4b5d9))
* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* ensure dynamic loading of config still works ([#47](https://github.tools.sap/ux/mockserver/issues/47)) ([7bb2854](https://github.tools.sap/ux/mockserver/commit/7bb2854e90831cf03f56a6116453171468c81675))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix webpack ([#44](https://github.tools.sap/ux/mockserver/issues/44)) ([ee39cbb](https://github.tools.sap/ux/mockserver/commit/ee39cbb3af9e6acd252aed97900d2962df484f7b))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* keep all properties for expand ([#72](https://github.tools.sap/ux/mockserver/issues/72)) ([67175d7](https://github.tools.sap/ux/mockserver/commit/67175d7a0c3b79571560d60cfd137bf7848f1696))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* **security:** add tgz filtering configuration ([50af7be](https://github.tools.sap/ux/mockserver/commit/50af7be4c3548bf2a0845b65367aa0bfba37dab1))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* test ([360087e](https://github.tools.sap/ux/mockserver/commit/360087efcb08887ec4d379ddda988f8f20c6c9c2))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* usage in the browser is working again ([#52](https://github.tools.sap/ux/mockserver/issues/52)) ([aa7f700](https://github.tools.sap/ux/mockserver/commit/aa7f700ad422a209651dc62ca8f11ea181128e82))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* adapt Edm.Date mockdata ([#67](https://github.tools.sap/ux/mockserver/issues/67)) ([bee36af](https://github.tools.sap/ux/mockserver/commit/bee36af93bd897fa91e93168883755ae66b1dbf2))
* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* add support for EntityContainer extension ([#64](https://github.tools.sap/ux/mockserver/issues/64)) ([4a494c2](https://github.tools.sap/ux/mockserver/commit/4a494c20c81268024357b900bc3c1974739dbb69))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* bundle the mockserver code ([#37](https://github.tools.sap/ux/mockserver/issues/37)) ([ddc6c4d](https://github.tools.sap/ux/mockserver/commit/ddc6c4d454abf8bdf84db0b9e4a42a36e27ada2d))
* dev script for vscode debug ([#70](https://github.tools.sap/ux/mockserver/issues/70)) ([19e689d](https://github.tools.sap/ux/mockserver/commit/19e689d547111d66289cc39fa8616145de2f1c25))
* follow the same logic flow when called outside of batch ([cb33b36](https://github.tools.sap/ux/mockserver/commit/cb33b363852e5cd4b42f3b983023389e7b2df8c9))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
* support watch option  ([#29](https://github.tools.sap/ux/mockserver/issues/29)) ([f80853b](https://github.tools.sap/ux/mockserver/commit/f80853bfc6f1132fae14fc813902bef8c68a42d4))





## 1.4.5 (2021-10-12)


### Bug Fixes

* also allows contextBasedIsolation for inline config ([#31](https://github.tools.sap/ux/mockserver/issues/31)) ([dc5083c](https://github.tools.sap/ux/mockserver/commit/dc5083cc0c43f528309adf8adbf3f4061db4b5d9))
* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix webpack ([925c9a5](https://github.tools.sap/ux/mockserver/commit/925c9a59ba9c5c30c20bcd3a7439fc5def046d25))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* **security:** add tgz filtering configuration ([50af7be](https://github.tools.sap/ux/mockserver/commit/50af7be4c3548bf2a0845b65367aa0bfba37dab1))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* test ([360087e](https://github.tools.sap/ux/mockserver/commit/360087efcb08887ec4d379ddda988f8f20c6c9c2))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* bundle the mockserver code ([#37](https://github.tools.sap/ux/mockserver/issues/37)) ([ddc6c4d](https://github.tools.sap/ux/mockserver/commit/ddc6c4d454abf8bdf84db0b9e4a42a36e27ada2d))
* follow the same logic flow when called outside of batch ([cb33b36](https://github.tools.sap/ux/mockserver/commit/cb33b363852e5cd4b42f3b983023389e7b2df8c9))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
* support watch option  ([#29](https://github.tools.sap/ux/mockserver/issues/29)) ([f80853b](https://github.tools.sap/ux/mockserver/commit/f80853bfc6f1132fae14fc813902bef8c68a42d4))





## 1.4.4 (2021-10-08)


### Bug Fixes

* also allows contextBasedIsolation for inline config ([#31](https://github.tools.sap/ux/mockserver/issues/31)) ([dc5083c](https://github.tools.sap/ux/mockserver/commit/dc5083cc0c43f528309adf8adbf3f4061db4b5d9))
* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* **security:** add tgz filtering configuration ([50af7be](https://github.tools.sap/ux/mockserver/commit/50af7be4c3548bf2a0845b65367aa0bfba37dab1))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* bundle the mockserver code ([#37](https://github.tools.sap/ux/mockserver/issues/37)) ([ddc6c4d](https://github.tools.sap/ux/mockserver/commit/ddc6c4d454abf8bdf84db0b9e4a42a36e27ada2d))
* follow the same logic flow when called outside of batch ([cb33b36](https://github.tools.sap/ux/mockserver/commit/cb33b363852e5cd4b42f3b983023389e7b2df8c9))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
* support watch option  ([#29](https://github.tools.sap/ux/mockserver/issues/29)) ([f80853b](https://github.tools.sap/ux/mockserver/commit/f80853bfc6f1132fae14fc813902bef8c68a42d4))





## 1.4.3 (2021-10-04)


### Bug Fixes

* also allows contextBasedIsolation for inline config ([#31](https://github.tools.sap/ux/mockserver/issues/31)) ([dc5083c](https://github.tools.sap/ux/mockserver/commit/dc5083cc0c43f528309adf8adbf3f4061db4b5d9))
* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
* support watch option  ([#29](https://github.tools.sap/ux/mockserver/issues/29)) ([f80853b](https://github.tools.sap/ux/mockserver/commit/f80853bfc6f1132fae14fc813902bef8c68a42d4))





## 1.4.2 (2021-09-29)


### Bug Fixes

* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))





## 1.4.1 (2021-09-28)


### Bug Fixes

* build it ([6e6c6cf](https://github.tools.sap/ux/mockserver/commit/6e6c6cf95df87e87f7f7050f942e5b6bc884ad74))
* change test port ([ec47cc1](https://github.tools.sap/ux/mockserver/commit/ec47cc14cf4760d5b1723be79218210ebafa8f1d))
* data access ([880653e](https://github.tools.sap/ux/mockserver/commit/880653e9a60191177e6ee669136caecdd1fae179))
* disable test requiring backend ([ef00ae9](https://github.tools.sap/ux/mockserver/commit/ef00ae95d35c9f854d38d78b7cf2d1ce42643754))
* error message with code and content type ([#20](https://github.tools.sap/ux/mockserver/issues/20)) ([823281c](https://github.tools.sap/ux/mockserver/commit/823281c64b8a6caa4a95f209836fc188a18a388a))
* improve parametrized support in v2 ([4396e78](https://github.tools.sap/ux/mockserver/commit/4396e787042c10bc670ac182459ee80ca88e924f))
* improve parametrized support in v2 - ([0fb008d](https://github.tools.sap/ux/mockserver/commit/0fb008d6aa1d4114dd7f20c23523465af02cefd3))
* **infra:** fix xmake build ([88a2bc8](https://github.tools.sap/ux/mockserver/commit/88a2bc8b41ff2b75ae3c0f4a8db18ee3cb10e52b))
* proper support for function in v4 ([6a101d3](https://github.tools.sap/ux/mockserver/commit/6a101d346a50d2cf5bd3d035fcd3dd704284bb6e))
* support direct POST ([8c6b731](https://github.tools.sap/ux/mockserver/commit/8c6b7317d41c1c065bc284937583f6a305a2bfde))
* update AVT to work better with edmx with multiple schema ([5e3e02f](https://github.tools.sap/ux/mockserver/commit/5e3e02fce440c461dfddebe40bc4a3aee7103ee8))
* use proper express API ([23d76bc](https://github.tools.sap/ux/mockserver/commit/23d76bce95aeecd22eeb8339172cafcc91a77bfe))
* use yarn ([923e8e0](https://github.tools.sap/ux/mockserver/commit/923e8e0fb29d1f1140ca4f7ab359a6b246104628))
* v2 expand is now working fine ([e653a6f](https://github.tools.sap/ux/mockserver/commit/e653a6fc15f671c4f4c344f5826f27470bcf4c0f))


### Features

* add sort capabilities ([f37b754](https://github.tools.sap/ux/mockserver/commit/f37b754d7385c7ec4ef1b58576a08420cf39bb36))
* basic usage sample ([4ea757a](https://github.tools.sap/ux/mockserver/commit/4ea757a9d44a9e911517a50bfa4ec0928038d36d))
* samples / doc / api doc ([a8a5acf](https://github.tools.sap/ux/mockserver/commit/a8a5acff494042f58b99061fd9c9a22f59d15036))
