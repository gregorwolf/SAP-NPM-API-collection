# Minimalistic `cds.ql`

This is a minimalistic implementation of `cds.ql` that supports parsing and constructing SQL and [CQL](https://cap.cloud.sap/docs/cds/cql) queries into [CQN](https://cap.cloud.sap/docs/cds/cqn) objects. It provides a fluent API for constructing queries as well as a parser for CQL strings, including tagged template literals.

### Setup

```shell
npm add cap-js/ql
```
### Usage

Import from ESM modules, or from CommonJS modules:
```js
import { cql } from '@cap.core/ql'
```
```js
const { cql } = require ('@cap.core/ql')
```

Then construct queries like so:

```js
cql`SELECT ID, title from Books`
```
```js
cql`SELECT from Authors {
   ID, name, books {
      ID, title, genre.name as genre
   }
}`
```
### Try it in Node REPL

Start [Node's REPL](https://nodejs.org/learn/command-line/how-to-use-the-nodejs-repl) from your command line:

```sh
node
```

Within there import the `cql` function:

```js
const { cql } = await import ('@cap.core/ql')
```

Then copy and paste this:

```js
let ID = 201
cql`INSERT into Books ${{ ID, title:'Wuthering Heights' }}`
cql`UPSERT into Books ${{ ID, title:'Wuthering Heights' }}`
cql`UPDATE Books with ${{ stock:111 }} where ID=${ID}`
cql`SELECT ID, title, stock from Books where ID=${ID}`
cql`DELETE from Books where ${[ID]}`
cql`DELETE Books[${ID}]` // → same as above
```

> ⇒  the constructed CQN query objects are printed as output.

## Contribute

Feel invited to contribute.

```sh
git clone https://github.com/cap-js/ql cap/core/ql
cd cap/core/ql
npm i
```


### Try it in REPL or Browser

Launch Node's REPL, with `cqn` and all other API entry points preloaded into `global` constants:

```shell
npm run in:repl
```


Alternatively, launch a server and open http://localhost:4004 in your browser:

```shell
npm run in:browser
```

Then try out the API in your browser's [Developer Tools](https://developer.mozilla.org/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools) console – for example, copy and paste the sample lines above to start with.

### Running Tests

```shell
npx vitest
```
```shell
cds test
```
```shell
chest
```
> The latter ones are for users of [CAP](https://cap.cloud.sap) in general, or [@cap.core/cds-test](https://github.com/cap-js/cds-test) in particular.