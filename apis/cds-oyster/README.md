# @sap/cds-oyster - Code Sandboxing for CAP

## Introduction

CDS-Oyster builds on CAP and MTX-S multi-tenancy by providing a WebAssembly-based sandbox for tenant-specific code. Extension developers can implement custom business logic — entity handlers, actions, event subscribers — without risking the stability or security of the main application.

The sandbox enforces strict limits on memory, execution time, and available APIs. Sandboxed code interacts with the application only through a controlled API layer, preventing unauthorized operations or access to sensitive resources. It coexists alongside regular application-level event handlers.

## Disclaimer

This is a **beta-preview** of a secure execution environment for tenant-specific code in the Node.js version of CAP. It is **experimental** and **not yet verified for production use** — delivered for stakeholders to evaluate scope, security, and performance and to provide feedback.

### Latest Breaking Changes

During beta, the API can change frequently, invalidating deployed handlers after a new `npm install`. Check this section whenever extensions crash or behave unexpectedly — all incompatible changes are listed here. The full release-by-release history is in [`CHANGELOG.md`](./CHANGELOG.md).

- The `runtime` configuration option is renamed to **`sandbox`**, and its values are renamed from `oyster` / `debug` to **`wasm`** / **`mocked`**. The default in development mode is now `mocked`; the real `wasm` sandbox is the only allowed option in production and can be opted into in development with `cds watch --wasm`. The old names are no longer accepted.
- The `maxResultSize` configuration option is **removed**. Result-size limiting is no longer enforced inside the sandbox; pagination is now an extension-developer concern. See [Paginated reads](./README-advanced.md#paginated-reads) in Part 2.
- `@kind: 'ext-service'` is a **deprecated shortcut** for `@extensible.code` at service level. Both carry the same semantics (all elements extensible, silent no-op actions, scoped data access), but new services should use the annotation directly. See [On services annotated with `@extensible.code` at service level](#on-services-annotated-with-extensiblecode-at-service-level).
- `req.user` is **no longer exposed** to extension handlers. Pass any identity context the handler needs as an explicit action parameter.
- `cds add ext-handler` now generates files prefixed with **`#`** (e.g. `#on-travelAccepted.js`). The `#` prefix marks the file as inactive — remove the prefix to activate the handler. This prevents accidentally shipping empty stubs.
- **Annotation-based extensibility (`@extensible.code`) is now the default for code.** `extensibleAnnotation` defaults to `true`; the `extension-allowlist` is still honoured for non-code artefacts, but for code the annotation is the leading source of truth and the allow-list is bypassed by the code checker. **To keep the old allow-list-driven behaviour for code, set `"extensibleAnnotation": false` explicitly in `package.json`** under `cds.requires.code-extensibility`. See [Controlling Extensibility with Annotations](#controlling-extensibility-with-annotations) for the new model, and [DEPRECATED.md](./DEPRECATED.md) for the legacy allow-list mechanism.


## Table of Contents

- [Quick Start](#quick-start)
- [Introduction](#introduction)
- [Disclaimer](#disclaimer)
  - [Latest Breaking Changes](#latest-breaking-changes)
- [How It Works](#how-it-works)
- [Limitations](#limitations)
- [For Application Developers](#for-application-developers)
  - [Getting Started](#getting-started)
  - [Configuring the Sandbox](#configuring-the-sandbox)
  - [Controlling Extensibility with Annotations](#controlling-extensibility-with-annotations)
  - [Providing an Extension Project Template](#providing-an-extension-project-template)
  - [Best Practices](#best-practices)
- [For Extension Developers](#for-extension-developers)
  - [Getting Started](#getting-started-1)
  - [Create a Custom Event Handler](#create-a-custom-event-handler)
  - [Generating Handler Stubs with `cds add ext-handler`](#generating-handler-stubs-with-cds-add-ext-handler)
  - [Local Development with the Mocked Sandbox](#local-development-with-the-mocked-sandbox)
  - [The Sandbox API](#the-sandbox-api)
  - [Event Handler Scope](#event-handler-scope)
  - [Examples](#examples)
  - [Best Practices](#best-practices-1)
- [Query Language Reference](#query-language-reference) — sandbox-specific scoping and restrictions on top of [`QL.md`](./QL.md)
- [Troubleshooting](#troubleshooting)
  - [Extensions work locally but fail to run after deployment to MTX](#extensions-work-locally-but-fail-to-run-after-deployment-to-mtx)
  - [Extension push fails with a 422 validation error](#extension-push-fails-with-a-422-validation-error)
  - [Allow-list stopped working after upgrading `@sap/cds-oyster`](#allow-list-stopped-working-after-upgrading-sapcds-oyster)
  - [Handler is silently skipped after a runtime error](#handler-is-silently-skipped-after-a-runtime-error)
  - [Debug features removed before deployment](#debug-features-removed-before-deployment)
  - [Extension file is not picked up](#extension-file-is-not-picked-up)
  - [Handler behavior changed after a new install](#handler-behavior-changed-after-a-new-install)
- [Advanced — Partner-Driven Extensibility](./README-advanced.md)
- [Deprecated Features](./DEPRECATED.md)
- [Getting Help](#getting-help)
- [License](#license)

## Preface

This README covers the **recommended scenario**: extending a CAP application through **predefined extension points** — actions on a dedicated extension service that the application calls explicitly. This is the path that can be controlled best by the application developer.

For the partner-development scenario — where the application developer controls which extensions reach a tenant and can therefore open up more of the application (CRUD events on regular entities, after-READ enrichment, validation, feature-toggle-driven extension surfaces) — see [Part 2 — Advanced: Partner-Driven Extensibility](./README-advanced.md).

## Quick Start

To add sandboxed code extension capability to your CAP application:

1. Add the plugin to **both** the base application and MTX sidecar:
   ```sh
   npm add @sap/cds-oyster
   ```

2. Define extension points in your service (see [Providing an Extension Project Template](#providing-an-extension-project-template)).

For detailed setup and configuration, continue with the [For Application Developers](#for-application-developers) section.

## How It Works

The sandbox runtime executes tenant-specific JavaScript files securely alongside the main application. Custom code is deployed as part of a standard CAP extension project.

![](assets/Extension%20Project%20Setup.png)

Writing extension handlers is similar to writing regular CAP event handlers, with one key difference: each handler requires its own file following a strict [naming convention](#handler-file-naming-and-organization). Deployment and execution require MTX-S and apply to multi-tenant applications only.

## Limitations

The sandbox is decoupled from the runtime through a limited API. Limits to memory, execution time, query result size, and coding constructs apply.

As a convenince, Code scanning at deployment time identifies constructs that would fail at runtime or utilize bad practices. Scanning is **always** applied upon activation:


| What                | Description                                                                                                                                                                            | Mitigation                                                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Globals             | The globals Object, Reflect, Symbol, Proxy, global, globalThis cannot be accessed within the sandbox. Any usage will be rejected at deployment time                                    | None                                                                                                                                                                              |
| Require             | It is not possible to require any library beyond the limited API provided to the sandbox                                                                                               | Extract shared logic into a custom action and call it with `this.someAction({...})`                                                                                   |
| Console             | The console object is available locally in development mode (CDS watch), but extensions cannot be deployed to MTX using it                                                             | Remove all console statements before activating custom code                                                                                                                       |
| Object properties   | Access to `prototype` or `__proto__` is completely prohibited                                                                                                                      |                                                                                                                                                                                   |
| Asynchronous calls  | `await` is prohibited except when calling CQL statements (data access API) or `this.*` functions. All other I/O operations are disallowed.                                                      | Helper functions and system libraries can be called synchronously. No valid use case exists for general asynchronous operations in the sandbox. |
| Throw Statement     | No errors can be thrown within the sandbox                                                                                                                                             | Follow the best practice of CAP and call `req.reject` or `req.error`                                                                                                               |
| Generator Functions | Generator functions and `yield` are error prone, a frequent cause of memory leaks and should serve no useful purpose in the sandbox                                                    |                                                                                                                                                                                   |
| Debugger Statement  | In local single-tenancy mode, debugging the sandbox is allowed and supported through the `debug` mode. When deploying to a multi-tenant application, debugger statements are prohibited | Remove all debugger statements before activating custom code                                                                                                                      |

## For Application Developers

### Getting Started

#### Prerequisites

Add the [@sap/cds-oyster](http://npmjs.com/package/@sap/cds-oyster) dependency to your project `package.json` of **both**, the Base Application **and** the MTX sidecar

```jsonc
"@sap/cds-oyster": "latest"
```

The runtime component of [Oyster](https://www.npmjs.com/package/@sap/oyster-runtime) is needed for deployment. This dependency is managed by the plugin and should not be modified manually.


### Configuring the Sandbox

The full configuration with all optional parameters:

```jsonc
"cds": {
    "requires": {
      "code-extensibility": {
        "sandbox": "wasm",
        "maxTime": 3000,
        "maxMemory": 4,
        "maxCallbacks": 100,
        "maxDepth": 10,
        "continueOnError": false,
        "limitedAfterRead": false,
        "extensibleAnnotation": true
      },
  ...  
```

The possible parameters are all optional:


| Parameter        | Explanation                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sandbox          | `wasm` is the real WebAssembly sandbox and the only value allowed in production. `mocked` runs handlers in a Node.js `vm` for fast local development — see [Local Development with the Mocked Sandbox](#local-development-with-the-mocked-sandbox). Default in dev: `mocked`; in production: `wasm`. |
| maxTime          | in milliseconds, default is 3000                                                                                                                              |
| maxMemory        | in megabytes, default is 4                                                                                                                                    |
| maxCallbacks     | number: maximum number of callback calls, default is 100                                                                                                      |
| maxDepth         | number: maximum sequence of consecutively invoked sandboxes, default is 10                                                                                    |
| continueOnError  | boolean: when `true`, the sandbox continues on system errors instead of crashing. See [Let It Crash](https://cap.cloud.sap/docs/node.js/best-practices#let-it-crash). Default is `false` |
| limitedAfterRead | boolean: setting true restricts allowed changes in `after-READ` handlers to virtual fields. Default value is false                                             |
| extensibleAnnotation | boolean: when `true` (the default), `@extensible.code` in the base CDS model is the leading source of truth for code extensions. Setting it to `false` reverts to the legacy allow-list mechanism for code (see [DEPRECATED.md](./DEPRECATED.md)). |

All parameters are optional. For local testing, see [Local Development with the Mocked Sandbox](#local-development-with-the-mocked-sandbox).

### Controlling Extensibility with Annotations

Control extensibility directly in CDS models using the `@extensible.code` annotation. This makes intent visible at the model level and — since CDS annotations can be driven by feature toggles — the extensibility surface can vary per tenant without changing the runtime configuration.

The annotation is the **default** mechanism as of the current release: `extensibleAnnotation` is `true` unless you explicitly set it to `false`. When it is on, `@extensible.code` in the base model decides code extensions, and the legacy [extension allow-list](./DEPRECATED.md#extension-allow-list) is bypassed for code (it still governs non-code artefacts through MTX).

This section covers the **service-level** case used for [dedicated extension services](#use-a-dedicated-extension-service-for-extension-points); for per-entity annotations on regular application services see [Opening Regular Services to Code Extensions](./README-advanced.md#opening-regular-services-to-code-extensions) in Part 2.

#### Where the annotation can go

The annotation is legal at three levels — service, entity, and **unbound** action/function. Bound actions and functions inherit their extensibility from the entity they attach to; the annotation on a bound-action declaration is not recognised. The push checker resolves each event/artefact by walking upward from the target and takes the first level that decides.

```cds
@extensible.code                          // opens everything under the service
service TravelExtensionService {

  @extensible.code: false                 // …except this one entity (closes it and all its bound actions)
  entity Booking as projection on my.Booking;

  entity Travel as projection on my.Travel actions {
    action approve() returns String;      // bound to Travel → inherits entity → service (open)
    action sensitive() returns String;    // also inherits — bound actions can't be closed individually
  };

  @extensible.code: false                 // per-action annotation applies to UNBOUND actions/functions
  function sensitiveOperation() returns String;
}
```

Rules at each level:

- **Bare `@extensible.code`** — allowed, walk stops.
- **`@extensible.code: false`** — not allowed, walk stops.
- **Nothing at this level** — walk continues upward.
- If the walk reaches the top with no decision → **not allowed** (closed by default).

The walk path depends on the target:

- **Entities, CRUD events, unbound actions/functions:** the annotation is honoured at their own level, then at service level.
- **Bound actions/functions:** their own annotation is ignored — resolution starts at the parent entity, then walks up to the service.

There are no mandatory annotations at any level — an entity-level `@extensible.code` still opens that entity (and its bound actions) even if the service is unannotated. But when nothing anywhere is annotated, nothing is extensible.


#### On services annotated with `@extensible.code` at service level

Putting `@extensible.code` on the **service itself** opens all its entities and operations in one step — and gives that service an additional property: actions declared but not implemented behave as **silent no-ops** (returning `204`) when no extension handler is deployed. This makes a service annotated this way a natural fit for the [Dedicated Extension Service](#use-a-dedicated-extension-service-for-extension-points) pattern.

- All elements are extensible by default; individual elements can be opted out with `@extensible.code: false`.
- Extension handlers can only query entities defined in **this service** — the service definition itself acts as the data-access boundary which the application developer can control tightly.
- Actions without an implementation return `204` silently when no extension is deployed (instead of raising an error).

```cds
@extensible.code
service TravelExtensionService {
  action travelAccepted(travelID: Integer);
  action discountApplied(travelID: Integer, percent: Integer);
  @extensible.code: false  // explicit opt-out
  function sensitiveOperation() returns String;
}
```

> The legacy `@kind: 'ext-service'` marker is still accepted as a **deprecated shortcut** for `@extensible.code` at service level; prefer the annotation in new code.

Extension developers cannot use `@extensible.code` in their own project. Any extension that contains this annotation — regardless of its value — is rejected at push time:
`Extension contains @extensible.code annotation which is not permitted`

#### Entities and actions defined by the extension itself

When an extension **adds a new entity or action** — a genuinely new artefact, not just a handler for something the base already declares — that artefact is code-extensible by default. The extension author declared it, so they trivially own its handlers; no additional `@extensible.code` is needed (extensions can't annotate anything with `@extensible.code` anyway).

The distinction is structural: `extend TravelService.Travel with { actions { newAction(); } }` **defines** a new action and its handler is accepted; a handler file for an **action that already exists in the base model still walks the base-model** annotation chain.

### Providing an Extension Project Template

The standard `cds extend` / `cds pull` entry point produces only a CDS projection of the tenant model — no handler files, no application entry point, no documentation of extension hooks.

The preferred approach is for the **application developer to ship a ready-to-clone extension project template**. This gives extension developers a project that starts clean, runs immediately, and documents intent.

#### What the template should contain

**Application server code that invokes the extension points**

Include the relevant application handler code so extension developers understand *when* and *why* each extension point is called:

```js
// srv/travel-service.js  (application code — read-only reference for extension developers)
const cds = require('@sap/cds')
module.exports = srv => {
  srv.after('UPDATE', 'Travels', async (data, req) => {
    if (data.Status_code === 'A') {
      const ext = await cds.connect.to('TravelExtensionService')
      // Calls the extension point — safe to call even when no handler is deployed
      await ext.travelAccepted({ travelID: data.ID })
    }
  })
}
```

This file should be present as a **read-only reference** — clearly marked so extension developers do not push it as part of their extension.

**Handler stubs for every extension point**

Provide a minimal stub file at the correct sandbox path for each action. The stub does nothing, but its presence means the project is functional from the first `cds watch`:

```js
// srv/TravelExtensionService/on-travelAccepted.js
// Called by the application when a travel is accepted (see srv/travel-service.js).
// req.data: { travelID: Integer }
module.exports = async function travelAccepted(req) {
  // Add your custom logic here
}
```

**Event subscriber stubs**

For every custom event the application emits, include a matching subscriber stub:

```js
// srv/TravelService/on-TravelReviewRequested.js
// Emitted by the application when a review is requested on a travel.
// req.data: { travelID: Integer, comment: String }
module.exports = async function travelReviewRequested(req) {
  // Add your custom logic here
}
```

**Key generation stubs**

If the extension project may insert records, include an `on-CREATE` stub that generates a stable key:

```js
// srv/TravelService/Travels/on-CREATE.js
// Generates a sequential integer ID before the record is persisted.
const { Travels } = this.entities
module.exports = async function onCreate(req) {
  if (!req.data.ID) {
    const { maxID } = await SELECT.one.from(Travels).columns('max(ID) as maxID')
    req.data.ID = (maxID ?? 0) + 1
  }
}
```

**UI action stubs**

If bound actions appear in a Fiori Elements UI, a missing handler causes an error. Include a minimal stub:

```js
// srv/TravelService/Travels/on-acceptTravel.js
// Bound action shown in the Travels list UI.
// Extend this to add post-acceptance logic.
module.exports = async function onAcceptTravel(req) {
  return {}
}
```

**Sample data in `test/data/`**

Place test data under `test/data/` (not `db/data/`) to keep it scoped to development mode. Include one CSV per entity with stable IDs that HTTP test requests can reference:

```csv
# test/data/TravelService.Travels.csv
ID,Description,Status_code,Agency_ID
42,Business trip to Berlin,O,TRVL01
```

**HTTP test files**

Include `.http` files (compatible with the [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)) demonstrating requests that trigger extension points:

- **Keep**: CRUD operations and action calls that invoke extension hooks
- **Remove**: `$metadata` fetches, CSRF token requests, `OPTIONS` preflight calls

A clean example for the travel acceptance scenario:

```http
### Accept a travel — triggers the travelAccepted extension point
POST http://localhost:4004/odata/v4/travel/Travels(42)/acceptTravel
```

Using the same IDs from `test/data/` means requests work out of the box.

**(CDS) Tests**

Alternatively, include CDS test files that trigger extension points. These run in CI and validate that deployed extensions still work after application releases.

#### Preferred project layout

A typical template repository structure for an application that defines a `TravelExtensionService` and one entity service might look like:

```
my-app-extension-template/
  package.json               ← valid extension project descriptor
  .base/                     ← optional pre-filled base CSN (replaces cds pull)
    base.csn
  docs/
    EXTENSION-GUIDE.md       ← documents extension points and what is possible
  test/
    data/
      TravelService.Travels.csv  ← stable seed data for HTTP tests
    http/
      travels.http         ← trimmed HTTP test file
  srv/
    travel-service.js     ← read-only reference: shows when extension points are called
    TravelExtensionService/
      on-travelAccepted.js ← extension point stub
      on-discountApplied.js
    TravelService/
      on-TravelReviewRequested.js ← event subscriber stub
      Travels/
        on-CREATE.js          ← key generation stub
```

> **Note:** Within `srv/`, only files inside a service-named subfolder (e.g. `srv/TravelService/`) are picked up as Oyster extension handlers. Files placed directly in `srv/` — like `travel-service.js` above — are ignored by the sandbox but still executed by CDS as regular Node.js modules. Use this location for application-side reference code that extension developers need to read but should not modify.
>
> Any subfolder of `srv/` whose name does not match a CDS service name in the model is treated as invalid: the Oyster runtime raises an intentional error on startup, and the extension is rejected at push time with a validation error. Restrict `srv/` subfolders to service names only — do not create utility or library folders there.

**`package.json`**

A valid extension project `package.json` must declare the extension namespace and reference the application as the base package. A typical example:

```jsonc
{
  "name": "my-app-extension-template",
  "version": "1.0.0",
  "extends": "my-app",
  "workspaces": [
    ".base"
  ],
  "dependencies": {
    "@sap/cds": "^9",
    "@sap/cds-oyster": "latest"
  },
  "devDependencies": {
    "@cap-js/cds-typer": "latest"
  }
}

```

> The `code-extensibility` block is optional in extension projects: `mocked` is the default in development mode. Add an explicit `"sandbox": "wasm"` entry only when you want to force the real sandbox locally — or use `cds watch --wasm` for a one-off run.

**Pre-filled `.base/` CSN**

Normally an extension developer must run `cds pull` against a live tenant subscription to obtain the base model. The template can skip this by shipping a pre-filled `.base/base.csn`.

The application developer can reduce this file significantly — stripping internal entities and unexposed projections — as long as:

1. The CSN is structurally valid.
2. The service and entity definitions that extension handlers reference are present and accurate.

A trimmed base CSN exposing only relevant services is valid; a base that omits a service an extension targets will cause a compilation error at push time.

**`cds-typer` for autocompletion**

Declare [`@cap-js/cds-typer`](https://cap.cloud.sap/docs/tools/cds-typer) as a `devDependency` in the template's `package.json`. There is no need to ship generated types (`#cds-models/`) with the template — once `cds-typer` is installed, types are generated automatically when the extension developer runs `cds watch` or edits any CDS file. The JSDoc annotations produced by `cds add ext-handler` (see [JSDoc completions with `cds-typer`](#the-annotations-reference-types-from-cds-models)) then light up with full IntelliSense for `req.data`, `this.entities`, and service actions.

**Documentation**

Include a `docs/EXTENSION-GUIDE.md` covering:

- Defined extension points, when they are called, and what `req.data` contains
- Which entities and events are open and what operations are permitted
- Constraints on handler output (required fields, expected return shapes)
- How to run locally and what the HTTP test files demonstrate

#### Advantages over `cds extend` / `cds pull`

`cds extend` and `cds pull` are useful for inspecting the live tenant model, but produce no handler files, no file-path conventions, no base CSN, and no documented extension hooks. A maintained template removes that bootstrapping burden, so extension developers can focus on business logic from the first commit.


### Best Practices

#### Prefer Predefined Extension Points

The safest way to enable tenant extensibility is to define explicit extension hooks — actions that the application calls at well-known points in its business logic, and for which sandbox code provides the implementation. This gives application developers full control over *where* and *when* extension code can run, without opening arbitrary entity events to external code.

Declare the action in CDS without an implementation, call it from within a standard handler, and let the sandbox fill in the logic:

**Step 1 — Declare the extension point in CDS:**

```cds
// srv/travel-service.cds
service TravelService {
  entity Travels as projection on our.Travels;

  // Declared without implementation — sandbox will provide it
  action travelAccepted(travelID: Integer);
```

**Step 2 — Call it from a standard application handler:**

```js
// srv/travel-service.js
module.exports = srv => {
  srv.after('UPDATE', 'Travels', async (req) => {
    if (req.data.Status_code === 'A') {
      try {
        // Invokes the sandbox handler if one is deployed; otherwise a no-op
        await srv.travelAccepted({ travelID: req.data.ID })
      } catch {
        // No extension deployed — proceed normally
      }
    }
  })
}
```

**Step 3 — Extension developer provides the implementation:**

```js
// srv/TravelService/on-travelAccepted.js
module.exports = async function travelAccepted(req) {
  const { travelID } = req.data
  await INSERT.into('TravelLog').entries({
    ID: utils.uuid(),
    travel_ID: travelID,
    action: 'Travel accepted'
  })
}
```

#### Use a Dedicated Extension Service for Extension Points

The pattern above requires `try/catch` because calling an unimplemented action on a regular service raises an error. A cleaner alternative is a **dedicated extension service** annotated with [`@extensible.code` at service level](#on-services-annotated-with-extensiblecode-at-service-level) — this eliminates defensive error handling.

```cds
// srv/extension-service.cds
@extensible.code
service TravelExtensionService {
  action travelAccepted(travelID: Integer);
  action discountApplied(travelID: Integer, percent: Integer);
}
```

The application service remains untouched, and the handler connects to `TravelExtensionService` directly:

```js
// srv/travel-service.js
module.exports = srv => {
  srv.after('UPDATE', 'Travels', async (req) => {
    if (req.data.Status_code === 'A') {
      const ext = await cds.connect.to('TravelExtensionService')
      // Safe to call even when no extension is deployed — returns 204 silently
      await ext.travelAccepted({ travelID: req.data.ID })
    }
  })
}
```

The extension developer places the implementation under the extension service folder:

```js
// srv/TravelExtensionService/on-travelAccepted.js
module.exports = async function travelAccepted(req) {
  await INSERT.into('TravelLog').entries({
    ID: utils.uuid(),
    travel_ID: req.data.travelID,
    action: 'Travel accepted'
  })
}
```

#### Keep `@extensible.code` as Narrow as Possible

If predefined extension points are insufficient and entity-level extensibility is required, annotate the minimum surface. Every entity and event type opened to extensions increases the attack surface — extension code runs with the requesting user's permissions.

A good default is to open nothing and add `@extensible.code` only for concrete use cases:

```cds
service TravelService {
  @extensible.code   // open only after-READ on this one entity
  entity Travels as projection on our.Travels;

  entity InternalData as projection on my.InternalData;  // closed
}
```

Practical guidance:
- **Start closed.** Annotate only what you have a concrete reason to open.
- **Prefer predefined extension points** for any logic that can be modelled as a well-defined hook — they don't require opening entity events at all.
- **Open at the element, not the service.** Annotating the service with `@extensible.code` opens everything in one step; on a regular application service, prefer per-entity or per-unbound-action annotations and keep `@extensible.code: false` opt-outs visible at the model level. Bound actions can only be opened via their parent entity — plan the extensibility of each entity accordingly.
- **Consider `limitedAfterRead: true`** in the sandbox configuration to restrict `after-READ` handlers to virtual fields only, preventing extensions from altering persisted data through the read path.

## For Extension Developers

### Getting Started

The recommended way to start is by cloning the application's extension project template (see [Providing an Extension Project Template](#providing-an-extension-project-template)). It provides a ready-to-run project with handler stubs, sample data, and HTTP test files.

#### From a template (recommended)

1. Clone the template and install dependencies:

   ```sh
   git clone <template-repo-url> my-extension
   cd my-extension
   npm install
   ```

2. Start the local development server:

   ```sh
   cds watch
   ```

   The extension project loads the base CSN from `.base/` and registers the stub handlers. If the template declares `@cap-js/cds-typer` as a `devDependency`, typed models under `#cds-models/` are generated on startup and refreshed whenever you edit a CDS file — enabling JSDoc-driven autocompletion in handlers ([details](#the-annotations-reference-types-from-cds-models)). The application is functional immediately.

3. Open the HTTP test files in `test/http/` with the [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension and run the pre-built requests to trigger the extension points.

4. Fill in the handler stubs under `srv/` with your custom logic. To generate stubs for additional entities or actions not yet covered by the template:

   ```sh
   cds add ext-handler --filter <EntityOrActionName>
   ```

#### From scratch

If no template is provided by the application developer, create an extension project manually:

1. Run 
   ```sh
    cds init --nodejs
    cds add extension
    cds pull --from <tenant-subscription-url>
    ```
    to scaffold the project structure. Change the `extends` property in `package.json` to something useful and run 
    ```sh
    npm install
    ``` 
    to pull the base model to the appropriate location in `node_modules`.

3. Add `@sap/cds-oyster` as a dependency and install it — the sandbox runtime is required for local execution:

   ```sh
   npm add @sap/cds-oyster
   ```

4. Add [`@cap-js/cds-typer`](https://cap.cloud.sap/docs/tools/cds-typer) as a dev dependency to enable typed autocompletion in handlers:

   ```sh
   npm add -D @cap-js/cds-typer
   ```

   Types are generated automatically on `cds watch` and whenever a CDS file is edited — no manual `cds-typer` run required.

5. Generate handler stubs for all available extension points — see [Generating Handler Stubs with `cds add ext-handler`](#generating-handler-stubs-with-cds-add-ext-handler):

   ```sh
   cds add ext-handler
   ```

6. Generate sample test data into `test/data/` so that requests have something to work with:

   ```sh
   cds add data --dest test/data
   ```

   Edit the generated CSV files to add realistic records with stable UUIDs that your HTTP requests can reference.

7. Generate HTTP test files for the services you want to exercise:

   ```sh
   cds add http
   ```

   This creates `.http` files in `test/http/`. Trim them to the requests that are relevant to your extension — remove `$metadata` fetches, CSRF token calls, and any other noise before committing.

8. Implement the handlers you need and start `cds watch`.

> **Note:** Starting from scratch means file paths, handler signatures, and extension point semantics must all be discovered manually. Prefer the template approach whenever one is available.

### Create a Custom Event Handler

Extension handlers are JavaScript files placed in your `srv` folder following a strict naming convention. Each handler exports exactly one function that implements your custom logic. See [Handler File Naming and Organization](#handler-file-naming-and-organization) in the Troubleshooting section for the exact folder and filename pattern required.

The easiest way to export a handler is using `module.exports`:

```js
async function doSomething(req) {
    // your code here
}
module.exports = doSomething
```

or

```js
module.exports = async function doSomething(req) {
    // your code here
}
```

> **Note:** The self-invoking function pattern is not supported in the sandbox:
>
> ```js
> ;(async function () {
>   // your code here
> })()
> ```

Handlers do not have to be `async`. If no asynchronous operations (CQL queries, service calls) are needed, a plain synchronous function is equally valid:

```js
module.exports = function handler(req) {
  return req.data.someField.toUpperCase()
}
```

`after` handlers receive `(result, req)` — the first parameter is the response data (an array for READ; for write events under CAP 10, a minimal projection typically containing only the key columns), and the second is the request object. `req.data` still holds the payload that was written, so read from it when you need non-key fields:

```js
module.exports = async function afterCreate(result, req) {
  if (!req.data.Description?.includes('expected'))
    req.reject(400, 'Unexpected description')
}
```

For the Travels entity, a valid `after-READ` event handler would look like this:

```js
module.exports = async function modifyComponent(result) {
    result.forEach(
      row => row.component = " Custom Handler here"
    )
  }
```

The `req` object behaves like a standard CAP application-level handler request, but exposes only the properties and methods described in the [Sandbox API](#the-sandbox-api) section.


#### Handler File Naming and Organization

Handler files follow the naming pattern `srv/ServiceName/EntityName/when-WHAT.js`, where:

- **ServiceName**: The fully qualified service name (including namespace if used).
- **EntityName**: Optional. Required for CRUD handlers and bound actions; omit for unbound actions and service-level events.
- **when**: The implementation phase — `before` for CUD events, `after` for READ events, `on` for actions and events.
- **WHAT**: The event name — `CREATE`, `UPDATE`, `DELETE`, `READ` (framework events) or action/event names as defined in your CDS model.

All parameters are case-sensitive. You can only define custom handlers for events and action signatures that are statically defined in the CDS model. Also, calling on-the-fly actions and events that are not declared in CDS is not supported.

**Additional `srv/` files**

Files placed in `srv/` which do not satisfy the naming convention are not picked up as Oyster extension handlers. The sandbox ignores them, but CDS still executes them as regular Node.js modules on startup. This makes them a good place for extension-project bootstrapping: startup logging, configuration, or `cds` lifecycle hooks that you need during local development but that must not run in the tenant sandbox.

```js
// srv/bootstrap.js — executed by CDS on startup; not picked up as an Oyster handler
const cds = require('@sap/cds')

cds.once('served', () => {
  console.log('Extension project running — open http://localhost:4004 to explore.')
})
```

### Generating Handler Stubs with `cds add ext-handler`

The `cds add ext-handler` command inspects the CDS model and generates one ready-to-fill stub file per entity event and per action or function. Run it from the root of an extension project:

```sh
cds add ext-handler
```

This produces stub files for every non-autoexposed entity — one file per supported event type and one per action or function. All generated filenames are prefixed with `#` to mark them as **inactive**:

```
srv/
  TravelService/
    Travels/
      #before-CREATE.js
      #before-UPDATE.js
      #after-READ.js
      #before-DELETE.js
  TravelExtensionService/
    #on-travelAccepted.js
    #on-discountApplied.js
```

The `#` prefix prevents the sandbox from picking the file up. Remove the prefix to activate a handler — every generated file contains a `TODO` reminding you to do this. This protects you from accidentally shipping empty stubs that would either no-op or, worse, alter responses to `{}`.

To scaffold only specific entities or operations, use the `--filter` / `-f` option with a name pattern:

```sh
cds add ext-handler --filter Travels     # only Travels entity handlers
cds add ext-handler -f travelAccepted    # only the travelAccepted action stub
```

Each generated file includes JSDoc type annotations that enable accurate editor autocompletion for `req` and the `this` reference. For **actions**, the generator additionally infers the parameter types from the action's CDS declaration, so `req.data` is typed end-to-end:

```js
// #on-travelAccepted.js — action with typed req.data
/**
 * @param {import('@sap/cds-oyster').OysterReq<
 *   typeof import('#cds-models/TravelExtensionService').TravelExtensionService["travelAccepted"]["__parameters"]
 * >} req
 * @this {import('@sap/cds-oyster').OysterThis<import('#cds-models/TravelExtensionService')$>}
 * @typedef {import('@sap/cds-oyster')} _
 */
module.exports = async function (req) {
  // TODO: Implement extension handler — rename the file to remove the leading '#' to activate.
  // req.data.travelID is typed as Integer.
}
```

For **CRUD** stubs, `req.data` is typed against the entity:

```js
// #before-CREATE.js — entity-scoped req.data
/**
 * @param {import('@sap/cds-oyster').OysterReq<import('#cds-models/TravelService').Travels>} req
 * @this {import('@sap/cds-oyster').OysterThis<import('#cds-models/TravelService')$>}
 * @typedef {import('@sap/cds-oyster')} _
 */
module.exports = async function (req) {
  // TODO: Implement extension handler — rename the file to remove the leading '#' to activate.
}
```

The annotations reference types from `#cds-models/`, generated by [cds-typer](https://cap.cloud.sap/docs/tools/cds-typer). Install it as a dev dependency — types are then generated automatically on `cds watch` and whenever a CDS file is edited; no manual run is required:

```sh
npm add -D @cap-js/cds-typer
```

> **Note:** `cds add ext-handler` generates stubs for every entity and operation in the model. Delete the files for elements you don't intend to extend (or leave the `#` prefix in place) to keep the project clean.

### Local Development with the Mocked Sandbox

By default in development mode, handlers execute in the **mocked sandbox** — a Node.js `vm`-based runtime that approximates the real WebAssembly sandbox without its constraints. This is the default; no configuration is needed:

- **`console.log` works** — output appears in the `cds watch` terminal.
- **Native step-debugging is possible** — attach VS Code's Node.js debugger and step through handler code.

To verify your handler also works under the real WebAssembly sandbox before pushing, start `cds watch` with the `--wasm` flag:

```sh
cds watch --wasm
```

You can also pin the sandbox explicitly in `package.json` (rarely needed):

```jsonc
"cds": {
  "requires": {
    "code-extensibility": {
      "sandbox": "wasm"
    }
  }
}
```

> **Important:** The mocked sandbox is only available locally. In multi-tenant MTX deployments, only `wasm` is used — and `console` and `debugger` statements are rejected at push time. Test with `cds watch --wasm` before pushing to catch differences early.

### The Sandbox API

Within a custom handler, `req` exposes the following properties:

```js
req.subject   // CQN ref to the current entity instance
req.data      // request payload (write events) or action/event parameters
req.target    // entity metadata (name only), read-only
req.results   // response array (after handlers only)
req.errors    // accumulated errors (via req.error / req.reject)
req.messages  // accumulated messages (via req.warn / req.info / req.notify)
req.locale    // request locale (e.g. 'en', 'de')
```

> **Note:** Identity is intentionally **not** exposed inside the sandbox. `req.user` is unavailable. If a handler needs identity context (a user ID, a role, a tenant attribute), pass it as an explicit action parameter — the application controls what crosses the sandbox boundary.

Not all properties are populated in every handler phase:

| Property | Populated in | Writable | Notes |
| --- | --- | --- | --- |
| `req.data` | `before` Create/Update/Upsert; `after` write events; `on` Action/Function/Event | Yes — changes propagate to subsequent handlers | Always `{}` in `before Delete`, `after Read`, and `after Delete` |
| `req.results` | `after` all | Yes — changes replace the response | Always `undefined` in `before` and `on` handlers |
| `req.subject` | All entity-level phases | No | Shape varies by phase and call origin — see below |
| `req.target` | All entity-level phases | No | `null` for unbound actions and events |
| Return value | — | — | `on` Action/Function only: the returned value becomes the action response |

Changes to `req.data` in `before` handlers and `req.results` in `after` handlers propagate to subsequent CAP handlers and the final response. Attributes beyond the application model are silently ignored by the framework.

> **Note:** `req.subject` is a CQN ref, but its content depends on context. For **bound actions**, it always contains the entity name and key (e.g. `{ ref: [{ id: 'Svc.Entity', where: ['ID', '=', { val: '...' }] }] }`), so you can pass it directly to a CQL statement: `SELECT.from(req.subject)`. For **CRUD handlers**, the key is only present when the request originates from OData URL navigation — not from a programmatic `.where()` call. For collection operations (`before CREATE`, list reads) and **unbound** actions/events, `req.subject` has no key or is `null`. Always use optional chaining: `req.subject?.ref[0].where?.[2].val`.

The `req` object is passed as the handler parameter — no `require` or import needed. Unhandled exceptions propagate to the sandbox shell and produce a generic error message; use `try / catch` to handle them meaningfully.

In `on` action and function handlers, the returned value becomes the action response.

The following methods are available for adding messages and errors to the request. All share the signature `(code, message, target?, ...args)`:

| Method        | Description                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `req.reject`  | Adds a rejection error and halts further execution of the handler.                                                               |
| `req.error`   | Adds an error to `req.errors`. Errors with severity 4 are collected; severity 5 (set by `req.reject`) causes immediate rejection. |
| `req.warn`    | Adds a warning message to `req.messages`.                                                                                        |
| `req.info`    | Adds an informational message to `req.messages`.                                                                                 |
| `req.notify`  | Adds a notification message to `req.messages`.                                                                                   |

Messages and errors added in a handler are accessible via `req.messages` and `req.errors` within the same handler invocation.

You can call `SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `UPSERT` asynchronously on **service** level with authorization enforced at request-user level. Queries are strictly scoped to the entities of the **current service** — calls to database entities or other services are rejected.

This gives application developers precise control over accessible data. When using a [Dedicated Extension Service](#use-a-dedicated-extension-service-for-extension-points) (annotated with `@extensible.code` at service level), only entities projected into that service are accessible.

Supported query syntax is described in the [Query Language Reference](#query-language-reference) section.

The `this` object represents the current service context, available in all handlers without any require or import:

| Member | Description |
| --- | --- |
| `this.entities` | A map of entity definitions keyed by entity name (e.g. `const { Travels } = this.entities`). Entity references can be passed directly to CQL statements instead of plain string literals and are always scoped to the current service. Available inside the exported function. |
| `this.read(entity)` / `this.update(entity)` / `this.insert(entity)` / `this.create(entity)` / `this.upsert(entity)` | Asynchronous service-level DML calls, chainable with `.entries()`, `.columns()`, `.where()` etc. Results of modification statements are always `undefined`. (`create` is an alias for `insert`.) |
| `this.exists(entity).where({...})` | Returns `true` if at least one matching row exists, `false` otherwise. |
| `this.emit('eventName', data?)` | Emits a service event asynchronously. The optional `data` payload is passed to the event handler. The event name must be modelled in the service definition. |
| `this.someAction({...})` | Asynchronously calls an unbound action of the service by its name. |

Finally, some utilities are available:

- `cql` tagged template literal for concise query writing (e.g. ``await cql`SELECT * FROM Travels WHERE ID = ${id}` ``)
- `utils.uuid()` — generates a UUID value.
- `utils.i18n(key)` — provided for edge cases only. Prefer static messages that the application translates on its own.

> **Looking for `after-READ` enrichment with virtual fields?** That pattern lives in Part 2 — see [Reading Data with Virtual Fields](./README-advanced.md#reading-data-with-virtual-fields-after-read).

### Event Handler Scope

In the extension-point scenario, two event types are relevant:

| When     | What                                 | Description                                                                                                                                                                                              |
| :------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on`     | Event                               | Runs within the calling transaction — useful for BADI-like extension points                                                                                                                              |
| `on`     | Bound/Unbound Action/Function       | BADI-like extension points; return a value from the handler to set the action response                                                                                                                   |

Sandboxed code runs within the CAP event loop alongside other event handlers. Execution order relative to other handlers is not guaranteed — for ordered behavior, prefer dedicated extension-point actions the application calls explicitly.

> **For CRUD event handlers** (`before-CREATE`, `after-READ`, etc.), see [Event Handler Scope (CRUD)](./README-advanced.md#event-handler-scope-crud) in Part 2.

![](assets/Runtime%20Hooks.png)

## Query Language Reference

The sandbox uses the standard CAP Query Language (`cds.ql`). The complete reference for the language — every clause, the tagged-template syntax, the expression grammar — is in [`QL.md`](./QL.md). This section lists the **cds-oyster-specific** restrictions and conveniences that apply when queries run inside extension handlers.

> `QL.md` is currently part of this repository but is intended to move to the [`cap-js/ql`](https://github.com/cap-js/ql) package — the language itself is independent of the sandbox.

### Scoping rule — only service entities

Sandbox queries are scoped to the **service** the handler belongs to. The `.from(...)` / `.entity(...)` / `.into(...)` targets accept:

- a fully qualified entity name (`'TravelService.Travels'`) — must match the current service,
- a **short entity name** (e.g. `'Travels'`) — cds-oyster resolves it against the current service. This is a sandbox convenience and not part of `cds.ql` itself.
- an entry from `this.entities` (e.g. `const { Travels } = this.entities`) — always scoped to the current service,
- `req.subject` — for handlers that have a subject reference.

Queries against **database-level entities** or **other services** are rejected. When the application uses a [dedicated extension service](#use-a-dedicated-extension-service-for-extension-points), only entities projected into that service are queryable from extension handlers — this is the data-access boundary the application controls.

### Fluent-API clauses not exposed in the sandbox

These `cds.ql` clauses are part of the language but **not exposed through the sandbox's fluent API**:

- `.having()`, `.groupBy()`
- `.forUpdate()`, `.forShareLock()`
- `.hints()`, `.pipeline()`, `.stream()`, `.foreach()`
- the `.elements` property
- `SELECT.one(columnsList)` and `SELECT.distinct(columnsList)` as functions — use the property getters and specify columns on `SELECT` instead (`SELECT.one.from(...).columns(...)`)

The full clauses are still accessible through `cql` tagged-template literals, which the sandbox parses. For example, `GROUP BY` and `HAVING`:

```js
const rows = await cql`
  SELECT author, count(*) as n
  FROM Books
  GROUP BY author
  HAVING count(*) > ${1}
`
```

### INSERT shape

Inside the sandbox, INSERT and UPSERT only accept the **`.entries({...})`** form. The `.columns().values()`, `.columns().rows()`, and `.from(SELECT)` (sub-select insert) variants documented in `QL.md` are not exposed.

### Why these limits exist

Many full CQL features rely on the CDS compiler resolving element names against the data model. Serializing large models into the isolated sandbox context would be too expensive, which accounts for most restrictions above.

## Examples

Here are common patterns for extension handlers:

### Implementing a Custom Action

Actions let extension developers expose callable operations within a service.

#### Unbound action

An unbound action runs at service level without an entity context. The caller passes all needed identifiers as action parameters.

The application developer declares it in the service definition:

```cds
// In the application service CDS (e.g. srv/travel-service.cds)
extend service TravelService with {
  action cancelTravel(travelID: Integer) returns String;
}
```

The extension developer provides the implementation in `srv/TravelService/on-cancelTravel.js`:

```js
const { Travels } = this.entities

module.exports = async function cancelTravel(req) {
  const { travelID } = req.data
  await UPDATE.entity(Travels).set({ Status_code: 'X' }).where({ ID: travelID })
  return `Travel ${travelID} cancelled`
}
```

The return value becomes the response body. Action parameters are available via `req.data`.

---

#### Instance-bound action

An instance-bound action targets a specific entity record. The entity key is part of the URL (`POST /Travels(key)/requestReview`) and is always available via `req.subject`, regardless of how the call originates.

Declare the action inside the entity's `actions` block:

```cds
// In the application service CDS
extend TravelService.Travels with actions {
  action requestReview(comment: String) returns String;
};
```

The handler file goes at `srv/TravelService/Travels/on-requestReview.js`:

```js
module.exports = async function requestReview(req) {
  const { comment } = req.data

  // req.subject carries the entity + key; pass it directly to UPDATE
  await UPDATE.entity(req.subject)
    .set({ Status_code: 'P' })  // InReview

  await this.emit('TravelReviewRequested', {
    travelID: req.subject.ref[0].where[2].val,
    comment
  })

  return `Review requested: ${comment}`
}
```

Because the action is instance-bound, `req.subject` always contains the entity key — you can pass it directly to any CQL statement (`SELECT.from`, `UPDATE.entity`, `DELETE.from`).

---

#### Collection-bound action

A collection-bound action is declared with an explicit binding parameter `in: many $self` inside the entity's `actions` block. This tells OData clients that the action operates on a set of entity instances rather than a single record — the request URL contains no entity key (`POST /Travels/cancelExpired`).

```cds
// In the application service CDS
extend TravelService.Travels with actions {
  action cancelExpired (in: many $self, before: DateTime) returns Integer;
};
```

Because there is no entity key in the URL, `req.subject` carries no `where` clause. The handler defines its own scope through the action's parameters:

```js
// srv/TravelService/Travels/on-cancelExpired.js
const { Travels } = this.entities

module.exports = async function cancelExpired(req) {
  const { before } = req.data

  const found = await this.exists(Travels)
    .where`Status_code = 'O' and EndDate < ${before}`

  if (!found) return 0

  await UPDATE.entity(Travels)
    .set({ Status_code: 'X' })
    .where`Status_code = 'O' and EndDate < ${before}`

  await this.emit('BatchExpired', { before })
  return 1
}
```

The `in: many $self` binding parameter is a CDS/OData declaration detail and does not appear in `req.data`.

---

#### Unbound bulk action

An unbound bulk action is declared at service level with no entity binding. Unlike the collection-bound variant above, it is not tied to any entity type — the URL contains no entity segment (`POST /TravelService/cancelByAgency`). Use this when the bulk operation crosses entity boundaries or the concept does not belong to a single entity.

```cds
// In the application service CDS
extend service TravelService with {
  action cancelByAgency(agencyID: String) returns Integer;
}
```

The implementation in `srv/TravelService/on-cancelByAgency.js`:

```js
const { Travels } = this.entities

module.exports = async function cancelByAgency(req) {
  const { agencyID } = req.data

  const found = await this.exists(Travels)
    .where`Agency_ID = ${agencyID} and Status_code = 'O'`

  if (!found) return 0

  await UPDATE.entity(Travels)
    .set({ Status_code: 'X' })
    .where`Agency_ID = ${agencyID} and Status_code = 'O'`

  return 1
}
```

---

### Implementing a Custom Event

Events allow a handler to signal that something happened. The event must be modelled in the service definition before it can be emitted:

```cds
// In the application or extension CDS
extend service TravelService with {
  event TravelReviewRequested {
    travelID : Integer;
    comment  : String;
  }
}
```

Any sandbox handler can then emit this event using `this.emit`. Here, an `after-CREATE` handler for Travels emits it when the booking fee exceeds a threshold:

```js
// srv/TravelService/Travels/after-CREATE.js
module.exports = async function afterCreateTravel(result, req) {
  if ((req.data.BookingFee ?? 0) > 500) {
    await this.emit('TravelReviewRequested', {
      travelID: req.data.ID,
      comment: 'High booking fee requires review'
    })
  }
}
```

The event is dispatched asynchronously within the current service. Any registered handler for `TravelReviewRequested` receives the payload as `req.data`.

> **Need to write CRUD handlers** (before/after CREATE/UPDATE/DELETE/READ)? Those patterns — input validation, cross-record invariants, dependency guards, paginated reads, after-READ enrichment — live in [Part 2 — Advanced: Partner-Driven Extensibility](./README-advanced.md), in the context where opening that surface is appropriate.

## Best Practices

- **Keep handlers small and focused.** Each handler file should do one thing. Complex logic becomes difficult to diagnose when it produces a runtime error and causes the extension to be blocked.
- **Push work down to the database.** Use `WHERE` clauses, aggregates, and `req.subject` to let the database do the filtering and scoping — not JavaScript. Running a `SELECT` to collect IDs and then looping through them with individual `UPDATE` or `DELETE` statements exchanges one database round-trip for many. Write a single statement with the right `WHERE` clause instead, and only loop over a result set when the per-row logic cannot be expressed in SQL.
- **Use `req.reject` or `req.error` instead of throwing.** Unhandled errors from the sandbox are caught by the runtime and the extension code is marked as unsafe, leading to quarantine of the whole extension. Use the provided API methods for all error reporting.
- **Avoid recursive queries.** Extension `after-READ` handlers do not fire for nested queries inside the sandbox, but querying the same entity in an `after-READ` handler still incurs an extra round-trip per row. Prefer querying a different entity or use `req.subject` to reference the current record directly.
- **Add `LIMIT` clauses to queries.** Unbounded queries against large datasets are unpredictable in latency and memory use, and may exceed `maxMemory`. Always add `.limit(n)` when the result size is not bounded by the data model.
- **Remove `console` and `debugger` statements before activating.** They are permitted in the local mocked sandbox but rejected at push time.
- **Test locally first.** Develop in the mocked sandbox (the dev default), then run `cds watch --wasm` once to verify your handler under the real WebAssembly sandbox before pushing.
- **Check breaking changes after each install.** The API can change between versions during the beta preview. Review the [Latest Breaking Changes](#latest-breaking-changes) section after every `npm install`.

## Troubleshooting

### Extensions work locally but fail to run after deployment to MTX

Ensure `@sap/cds-oyster` is listed in the `package.json` of both the base application and the MTX sidecar. The plugin must be installed in both places for extensions to execute in production.

### Extension push fails with a 422 validation error

The validation runs at push time (via `/-/cds/extensibility/push`) and rejects the extension if any findings are detected. The error message lists each finding with the file name and, where possible, the line range. Common causes:

| Finding | Cause | Fix |
| --- | --- | --- |
| `Includes a forbidden name console` | `console.*` calls in handler code | Remove all `console` statements before activating. Use `req.info` / `req.warn` instead. |
| `Includes a forbidden name Object` | Use of the `Object` global | Rewrite using plain object literals or spread syntax. |
| `Includes a forbidden name require` | `require(...)` call in handler code | External modules cannot be loaded. Extract shared logic into a custom action and call it with `this.someAction({...})`. |
| `Await statement is not allowed` | `await` used outside data-access API | Only `await` on CQL statements and `this.*` methods is permitted. |
| `Unsupported on handler for READ` | File named `on-READ.js` | `on` phase is not supported for CRUD events. Use `after-READ.js` instead. |
| `Unsupported before handler for READ` | File named `before-READ.js` | `before-READ` is not supported. Move your logic to `after-READ.js`. |
| `Unsupported before handler for <action>` | `before-<action>.js` for an action | `before` / `after` phases are only supported for CRUD events. Use `on-<action>.js`. |
| `The specified service namespace is not permitted` | Handler targets a `cds.xt.*` service | Code extensions are not allowed for internal MTX services. |
| `uses a forbidden namespace` | Extension model element uses a blocked namespace (e.g. `sap.`, `com.sap.`) | Rename the element to use a permitted namespace. |
| `Code extension is not allowed for event '...' in '...'` | Under the default annotation-based mode, the target artefact is not opened by `@extensible.code` on the base model | Annotate the service, entity, or specific operation with `@extensible.code` on the application side. See [Controlling Extensibility with Annotations](#controlling-extensibility-with-annotations). |

### Allow-list stopped working after upgrading `@sap/cds-oyster`

Since the release that flipped `extensibleAnnotation` to `true` by default, the `extension-allowlist` is **bypassed for code** — the code checker consults `@extensible.code` instead. Non-code allow-list rules (`new-fields`, `new-entities`, `namespace-blocklist`) still apply, but the `code: [...]` entries in the allow-list are ignored.

Symptom: an existing push that used to succeed now fails with `Code extension is not allowed for event '...' in '...'` even though the target is listed in `extension-allowlist` with a `code:` entry.

Fix (choose one):

1. **Preferred** — add `@extensible.code` at the appropriate level in your CDS model and drop the `code:` entries from `extension-allowlist`. See [Controlling Extensibility with Annotations](#controlling-extensibility-with-annotations).
2. **Preserve legacy behaviour** — set `extensibleAnnotation: false` explicitly in `package.json`:

   ```jsonc
   "cds": {
     "requires": {
       "code-extensibility": {
         "extensibleAnnotation": false
       }
     }
   }
   ```

   This restores the previous behaviour where the allow-list is the sole source of truth for code. See [DEPRECATED.md](./DEPRECATED.md#turning-the-allow-list-back-on-for-code) for the full pattern.

### Handler is silently skipped after a runtime error

When a handler encounters an unexpected runtime error (not a deliberately raised error via `req.reject` or `req.error`), the extension is automatically blocked (`isBlockedCode = true` in `cds.xt.Extensions`). All subsequent requests for that tenant will skip the handler silently.

To recover, fix the code and re-push the extension. The `isBlockedCode` flag resets automatically on the next successful push. The reason for blocking is stored in `blockedCodeReason`.

### Debug features removed before deployment

Some features are allowed during local development but must be removed before pushing to production:

- `console.*` statements are permitted in local debug mode but rejected at push time. Remove all console logging.
- `debugger` statements are allowed locally but blocked on activation. Remove these before pushing.
- See [Prerequisites](#prerequisites) for dependency requirements.


### Extension file is not picked up

Verify the folder structure and filename match the required convention exactly:

```
srv/
  <ServiceName>/        ← fully qualified service name (including namespace)
    <EntityName>/       ← entity name as defined in the model
      <when>-<WHAT>.js  ← e.g. after-READ.js, before-CREATE.js, on-createTravel.js
```

Common mistakes include:

- **A leading `#` in the filename.** `cds add ext-handler` generates files like `#on-travelAccepted.js` to mark them as inactive. Remove the `#` to activate the handler.
- Using the simplified service name instead of the fully qualified name (e.g., `TravelService` instead of `sap.fe.cap.travel.TravelService` when namespaces are in use). A best practice would be to rely on `this.entities` to avoid this.
- Using the wrong phase/event combination (see [Event Handler Scope](#event-handler-scope)).
- Uppercase letters in filenames — all filenames are case-sensitive.

### Handler behavior changed after a new install

The API can change between versions during the beta preview. After each `npm install`, check the [Latest Breaking Changes](#latest-breaking-changes) section. Extensions that were deployed before the update may need to be re-pushed after updating the handler code.

## Getting Help

1. Search the [Troubleshooting](#troubleshooting) section above.
2. Check [Latest Breaking Changes](#latest-breaking-changes) after plugin updates.
3. Open an issue in the [cds-oyster GitHub repository](https://github.com/cap-js/cds-oyster).
4. For production issues, report an [incident](https://cap.cloud.sap/docs/resources/#support-channels) on SAP Support Portal.

## License

This package is provided under the terms of the [SAP Developer License Agreement](https://cap.cloud.sap/resources/license/developer-license-3_2_CAP.txt).
