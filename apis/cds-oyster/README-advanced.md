# @sap/cds-oyster — Advanced: Partner-Driven Extensibility

This is **Part 2** of the cds-oyster documentation. Part 1 — in [`README.md`](./README.md) — covers the default scenario: predefined extension points on a dedicated extension service that the application calls explicitly. That model assumes the application developer owns the surface and tenants only fill in handlers.

Part 2 covers what changes when the **application developer can additionally control _which_ extensions get deployed and _to whom_**: typical partner-development arrangements, premium tiers gated by feature toggles, scratch spaces for selected customers, or a separate extensible microservice that fronts a slice of the application. Once you have that control, you can responsibly open up more of the application: CRUD event handlers on regular entities, after-READ enrichment, validation, cross-record invariants.

Use this part only if you can answer "yes" to: _do I control or trust the source of every extension that reaches the tenant?_ Otherwise, prefer Part 1.

## Table of Contents

- [When to Open Things Up](#when-to-open-things-up)
  - [Partner / vendor extensions you (or the partner) review](#partner--vendor-extensions-you-or-the-partner-review)
  - [Customer-tier feature toggles](#customer-tier-feature-toggles)
  - [Placeholder service as a customer scratch space](#placeholder-service-as-a-customer-scratch-space)
  - [Separate extensible microservice](#separate-extensible-microservice)
- [Opening Regular Services to Code Extensions](#opening-regular-services-to-code-extensions)
- [Event Handler Scope (CRUD)](#event-handler-scope-crud)
- [Reading Data with Virtual Fields (`after-READ`)](#reading-data-with-virtual-fields-after-read)
- [Before Handlers](#before-handlers)
  - [before CREATE — input validation and calling an unbound action](#before-create--input-validation-and-calling-an-unbound-action)
  - [before UPDATE — enforcing a cross-record budget](#before-update--enforcing-a-cross-record-budget)
  - [before DELETE — dependency guard](#before-delete--dependency-guard)
  - [Reusable budget validation with a custom action](#reusable-budget-validation-with-a-custom-action)
- [After Handlers](#after-handlers)
  - [after CREATE — audit log entry](#after-create--audit-log-entry)
  - [after UPDATE — change tracking on selected fields](#after-update--change-tracking-on-selected-fields)
  - [after DELETE — cleanup of non-composition dependents](#after-delete--cleanup-of-non-composition-dependents)
- [Paginated reads](#paginated-reads)
- [Best Practices](#best-practices)
- [License](#license)

## When to Open Things Up

Predefined extension points (Part 1, [Use a Dedicated Extension Service for Extension Points](./README.md#use-a-dedicated-extension-service-for-extension-points)) remain the right default whenever the integration can be expressed as a hook the application calls. They are explicit, easy to govern, and don't expose CRUD events to tenants at all.

You only need the patterns in this document when you have a **controlled extension-supply chain** — that is, when the application developer (not the end customer) decides what code ends up running in each tenant. The four common arrangements:

### Partner / vendor extensions you (or the partner) review

The application is sold or deployed together with extensions from a known partner (an ISV, a consulting partner, or your own services team). Each partner deliverable goes through a review process — code review, security scan, contractual obligations — and the application developer pushes the approved extension to the tenant on the customer's behalf. The customer either never writes sandbox code themselves or the code is reviewed before pushing.

In this arrangement, opening CRUD events on selected entities is reasonable: the people writing the handlers are accountable, and the application developer remains the gatekeeper of what runs.

### Customer-tier feature toggles

Because `@extensible.code` is a CDS annotation, it can be gated by [CAP feature toggles](https://cap.cloud.sap/docs/guides/extensibility/feature-toggles). The same source CDS can then present different extension surfaces per tenant — a premium tier unlocks `@extensible.code` on `Travels`, a basic tier sees nothing. The annotation is evaluated at activation time, so validation is consistent with what was opened for the tenant.

This lets the application monetise extensibility, run pilots for selected customers, or roll out a new extension surface gradually — with no code changes.

### Placeholder service as a customer scratch space

Sometimes the value proposition is "give the customer a sandboxed area where they can build _something_ of their own". The application ships an otherwise empty service annotated with `@extensible.code` — no entities the application cares about, no application-side handlers — and tenants populate it with their own entities, actions, and handlers.

```cds
@extensible.code
service CustomerScratchpad {
  // intentionally empty — customers add their own entities and actions here
}
```

The scratch space is contained: the sandbox can only query entities inside this service, so customer code cannot reach into the rest of the application. With `extensibleAnnotation` on (the default) you get a clean, bounded customer-extension surface out of the box.

### Separate extensible microservice

When even the placeholder-service approach feels too close to the core application, ship the customer-extension area as a **separate microservice** that consumes the main application through CDS import and proxy APIs. The microservice depends on a narrow CDS contract — only the entities and actions you choose to expose — and runs cds-oyster with a generous extension surface. The core application stays closed.

This pattern is heaviest operationally (an additional service to operate) but offers the strongest isolation. It is appropriate when partners or customers need substantial elbow room to build alongside the application without being able to touch its database or internal services.

## Opening Regular Services to Code Extensions

On a regular application service (not annotated with `@extensible.code` at service level), nothing is extensible by default. Opt individual entities and unbound operations in with `@extensible.code`:

```cds
service TravelService {
  @extensible.code
  entity Travels as projection on our.Travels;   // opens the entity and its bound actions

  entity InternalData as projection on my.InternalData; // not extensible

  @extensible.code
  action travelAccepted(travelID: Integer);      // unbound — annotation applies directly
}
```

The annotation lives at three levels — service, entity, and unbound action/function. **Bound** actions and functions cannot be annotated individually; they inherit their extensibility from the entity they attach to (which in turn falls back to the service). Annotating a bound action has no effect.

Extension handlers that target elements without `@extensible.code` are rejected at push time:
`Code extension for <ServiceName>.<target> is not allowed`

Annotating the service itself with `@extensible.code` opens all its entities and operations in one step. Individual entities and unbound actions can then be closed again with `@extensible.code: false`. On regular application services, prefer per-entity or per-unbound-action annotations — it keeps the extension surface visible at the model level.

Annotation-based control is on by default (`extensibleAnnotation: true`) as of the current release. To fall back to the legacy allow-list mechanism for code, set `extensibleAnnotation: false` explicitly — see [DEPRECATED.md](./DEPRECATED.md).

## Event Handler Scope (CRUD)

In addition to the action and event handlers covered in Part 1, the sandbox supports the following CRUD event handlers:

| When     | What                                 | Description                                                                                                                                                                                              |
| :------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `before` | Create, Update, Upsert              | Manipulate `req.data` for custom calculations; validate input and reject requests                                                                                                                        |
| `before` | Delete                              | Validate or prevent deletion. `req.data` is always `{}` — use `req.subject` to identify the record                                                                                                       |
| `after`  | Read, Create, Update, Delete, Upsert | Manipulate `req.results`; trigger follow-on events. The DB transaction has already committed — CQL queries run in a new transaction. You can also use the two-parameter signature `(result, req)` where `result` is the same as `req.results` |

Draft events are planned for a subsequent version. Currently, all event handlers are triggered **after** the draft workflow only.

Sandboxed code runs within the CAP event loop alongside other event handlers. Execution order relative to other handlers is not guaranteed.

## Reading Data with Virtual Fields (`after-READ`)

A common entity-extension use case is to add computed information to read responses without changing the persisted model. The following handler enriches each `Travels` row with the agency's email address as a virtual field.

First, extend the data model:

```cds
extend Travels with {
  virtual agencyEmail: String @title: 'Agency Email';
}
```

This virtual element will be filled at runtime in the handler `TravelService/Travels/after-READ.js`:

```js
module.exports = async function enrichTravels(results, req) {
  for (let r of results) {
    const agency = await SELECT.one.from('TravelService.TravelAgencies')
      .columns('EMailAddress')
      .where({ ID: r.Agency_ID })
    r.agencyEmail = agency?.EMailAddress ?? 'No email on file'
  }
}
```

> **Note:** The `for of` loop is needed here because the `SELECT` is asynchronous — `forEach` does not work with `await`. The query runs at service level, triggering any `after-READ` handler for `TravelAgencies` in turn.

> **Note:** Extension `after-READ` handlers do not fire for nested queries inside the sandbox. If your handler reads `Travels` from within an `after-READ` on `Travels`, the nested read will **not** trigger the after-READ extension again. This prevents recursion but means virtual elements populated by an after-READ extension will not be filled on nested results.

The `this.entities` map makes entity references more readable:

```js

module.exports = async function enrichTravels(results, req) {
  const { TravelAgencies } = this.entities
  for (let r of results) {
    const agency = await SELECT.one.from(TravelAgencies)
      .columns('EMailAddress')
      .where({ ID: r.Agency_ID })
    r.agencyEmail = agency?.EMailAddress ?? 'No email on file'
  }
}
```

Use the `limitedAfterRead: true` sandbox option to restrict what `after-READ` handlers can change to virtual fields only. This prevents extension code from rewriting persisted data through the read path.

## Before Handlers

`before` handlers run before the event reaches the database layer. They can read and mutate `req.data` to change what gets written, or call `req.reject` to abort the operation entirely. `req.data` is always `{}` for `before-DELETE`.

### before CREATE — input validation and calling an unbound action

This handler enforces required fields, applies default values, and delegates customer validation to a dedicated unbound action declared in the service. Any unbound service action is callable via `this.actionName(params)` from within any sandbox handler.

```cds
// Application CDS declares the validation helper as an unbound action
extend service TravelService with {
  action validateCustomer(customerID: String) returns Boolean;
}
```

```js
// srv/TravelService/Travels/before-CREATE.js
module.exports = async function beforeCreateTravel(req) {
  if (!req.data.Description?.trim())
    req.reject(400, 'Description is required')

  if (req.data.BeginDate && req.data.EndDate && req.data.EndDate < req.data.BeginDate)
    req.reject(400, 'End date must be after begin date')

  // Apply defaults for optional fields the caller omitted
  if (req.data.Status_code == null) req.data.Status_code = 'O'   // Open
  if (req.data.Currency == null)    req.data.Currency    = 'EUR'

  // Validate the referenced customer by calling a service-level unbound action
  const isValid = await this.validateCustomer({ customerID: req.data.Customer_ID })
  if (!isValid)
    req.reject(422, 'The referenced customer does not exist or is inactive')
}
```

The sandbox validates parameter and return types against the CDS model before and after the action call. Only unbound (service-level) actions are callable via `this`; instance-bound actions cannot be invoked this way.

### before UPDATE — enforcing a cross-record budget

State machines and per-field transition rules belong in the CDS model — CAP already offers declarative flow annotations for them. Extension handlers become interesting when the rule reaches **across records** and needs a live aggregate that no annotation can express.

A partner sells the customer a fixed travel budget stored in a `CustomerBudgets` table (`customer_ID`, `maxTotal`). Before a travel is updated, the handler reads the currently-persisted `TotalPrice`, computes the delta the caller is applying, and delegates the customer-wide budget check to a reusable action.

The invariant is enforced on `Travels` (not on `Bookings`) because bookings reach the database as **deep composition writes on their parent travel**. Guarding at travel level covers direct edits and any deep write whose payload updates the parent's `TotalPrice`.

> **Note:** `before-UPDATE` on `Travels` fires only when the payload includes `TotalPrice`. A deep write that changes nested bookings without also updating the parent's `TotalPrice` will not trigger this check — keep `TotalPrice` in sync in your write API, or add a matching handler for whichever entity the mutation touches.

```js
// srv/TravelService/Travels/before-UPDATE.js
module.exports = async function beforeUpdateTravel(req) {
  if (req.data.TotalPrice == null) return  // payload does not touch the total — nothing to enforce

  const { TotalPrice: currentTotal, Customer_ID } = await SELECT.one.from(req.subject)
    .columns('TotalPrice', 'Customer_ID')
    || req.reject(404, 'Travel not found')

  await this.assert_within_budget({
    customerID: Customer_ID,
    delta: req.data.TotalPrice - currentTotal,
  })
}
```

`req.subject` carries the entity key only when the request originates from an OData URL (e.g., `PATCH /Travels(key)`). For programmatic updates using a `.where()` clause, fall back to `req.data.ID` if it is present in the payload.

### before DELETE — dependency guard

`req.data` is always `{}` in a `before-DELETE` handler. Use `req.subject` to identify the record being deleted, then check for dependencies that should block the operation:

```js
// srv/TravelService/Travels/before-DELETE.js
module.exports = async function beforeDeleteTravel(req) {
  const { Bookings } = this.entities
  const ID = req.subject.ref[0].where?.[2].val

module.exports = async function beforeDeleteTravel(req) {
  const ID = req.subject.ref[0].where?.[2].val

  const hasBookings = await this.exists(Bookings).where({ Travel_ID: ID })

  if (hasBookings)
    req.reject(409, 'Cancel all bookings before deleting this travel')
}
```

### Reusable budget validation with a custom action

The budget check above is not specific to `before-UPDATE` — the same rule applies when a travel is **created** or **modified** through a partner-defined action. Extract it into an unbound action so every handler can call it with a single line.

Declare the action at service level:

```cds
extend service TravelService with {
  action assert_within_budget(customerID: String, delta: Decimal);
}
```

Implement it in `srv/TravelService/on-assert_within_budget.js`. The action reads the customer's current travel spend, adds `delta`, and rejects if the budget would be exceeded. Callers are responsible for computing the delta (`new − old` for UPDATE; `new` for CREATE) — that keeps the action simple and event-agnostic:

```js
module.exports = async function assert_within_budget(req) {
  const { Travels, CustomerBudgets } = this.entities
  const { customerID, delta } = req.data

  const budget = await SELECT.one.from(CustomerBudgets)
    .columns('maxTotal')
    .where({ customer_ID: customerID })
  if (!budget) return  // no budget on record for this customer — nothing to enforce

  const { total } = await SELECT.one.from(Travels)
    .columns`sum(TotalPrice) as total`
    .where({ Customer_ID: customerID })

  const projected = (total ?? 0) + delta
  if (projected > budget.maxTotal)
    req.reject(409, `Change pushes customer travel total to ${projected}, over the customer budget of ${budget.maxTotal}`)
}
```

The `before-UPDATE` handler already fits this shape (see above). And a matching `before-CREATE` handler enforces the same rule when a travel is added — same action, no logic duplicated:

```js
// srv/TravelService/Travels/before-CREATE.js  (excerpt)
module.exports = async function beforeCreateTravel(req) {
  // ... existing input validation and defaulting ...

  if (req.data.Customer_ID && req.data.TotalPrice != null) {
    await this.assert_within_budget({
      customerID: req.data.Customer_ID,
      delta: req.data.TotalPrice,
    })
  }
}
```

Note the tagged-template form on `.columns\`sum(TotalPrice) as total\`` — the sandbox parses column aliases through the CQL tagged-template grammar; the object-string form `('sum(...) as total')` is not equivalent.

`|| req.reject(...)` works because `req.reject` always throws — so when `SELECT.one` returns `null`, the right-hand side is evaluated and the function exits immediately via the thrown error. If a record is found the `||` short-circuits and the result is destructured normally.

Unbound actions called on `this` from within a sandbox handler go through `srv.send`, exactly as described in [The Sandbox API](./README.md#the-sandbox-api). A `req.reject` inside the action throws a CAP error that propagates back through the call chain to the original request.

## After Handlers

`after` handlers run once the database transaction has committed. They receive the result of the operation as the first argument and the request as the second — `req.results` is the same value. Because the transaction is already closed, any CQL you run from an `after` handler executes in a **new** transaction: side effects survive even if the caller aborts subsequent work, and a rejection here surfaces to the caller but does not roll the original write back.

That makes `after` handlers the right place for audit trails, change tracking, and cleanup of non-composition dependents — not for enforcing invariants (those belong in `before` handlers, which can still reject in-flight).

### after CREATE — audit log entry

Record the fact that a new travel exists. The extension already declares a `TravelLog` entity in the base model, so extension handlers can insert into it directly:

```js
// srv/TravelService/Travels/after-CREATE.js
module.exports = async function afterCreateTravel(result, req) {
  const { TravelLog } = this.entities
  await INSERT.into(TravelLog).entries({
    ID: utils.uuid(),
    travel_ID: req.data.ID,
    action: `created (customer=${req.data.Customer_ID}, agency=${req.data.Agency_ID})`,
  })
}
```

`req.data` carries the full payload — including the ID CAP assigned in `before-CREATE`. Use `utils.uuid()` (available on `this` in every sandbox handler) rather than a hand-rolled random ID. Note that `result` under CAP 10 is a minimal projection (typically just the key columns) rather than the full row; reading from `req.data` gives you every field the write touched.

### after UPDATE — change tracking on selected fields

`req.data` still carries the caller's payload after the write, so `after-UPDATE` can log exactly which fields changed without re-reading the row:

```js
// srv/TravelService/Travels/after-UPDATE.js
const TRACKED = ['Status_code', 'TotalPrice', 'BookingFee']

module.exports = async function afterUpdateTravel(result, req) {
  const { TravelLog } = this.entities
  const changed = TRACKED.filter(f => f in req.data)
  if (!changed.length) return

  await INSERT.into(TravelLog).entries({
    ID: utils.uuid(),
    travel_ID: req.subject.ref[0].where?.[2].val,
    action: `updated: ${changed.map(f => `${f}=${req.data[f]}`).join(', ')}`,
  })
}
```

The `TRACKED` whitelist keeps noise out of the log — unrelated field changes (e.g. `Description`) don't produce entries. The travel ID comes from `req.subject.ref` (the URL key), which is populated for OData PATCH/PUT requests.

### after DELETE — cleanup of non-composition dependents

CAP automatically deletes composition targets when the parent is deleted. Anything that references a travel through a **plain association** (foreign key only, no composition) is not touched — `TravelLog` is such a case here. Use `after-DELETE` to sweep those rows:

```js
// srv/TravelService/Travels/after-DELETE.js
module.exports = async function afterDeleteTravel(result, req) {
  const { TravelLog } = this.entities
  const ID = req.subject.ref[0].where?.[2].val
  if (ID == null) return  // programmatic delete without an OData key — nothing to sweep

  await DELETE.from(TravelLog).where({ travel_ID: ID })
}
```

`result` is `undefined` for `after-DELETE` (the row is gone), so the key comes from `req.subject` just like in `before-DELETE`. Guard on the key: OData deletes populate `req.subject.ref[0].where`, but programmatic deletes (`DELETE.from(...).where(...)` executed by another handler) may not — the guard makes the handler safe against both paths. The cleanup runs after the parent row's transaction has committed — if it fails, the travel is still deleted; log the failure or emit a compensating event rather than trying to abort here.

## Paginated reads

Unbounded queries against large datasets are unpredictable in latency and memory use, and may exceed `maxMemory` inside the sandbox. Use `.limit(rows, offset)` to page through large collections — the second argument is the row offset:

```cds
extend service TravelService with {
  action listTravelsByCustomer(customerID: String, limit: Integer, offset: Integer) returns String;
}
```

```js
// srv/TravelService/on-listTravelsByCustomer.js
```js
// srv/TravelService/on-listTravelsByCustomer.js
module.exports = async function listTravelsByCustomer(req) {
  const { Travels } = this.entities
  const { customerID, limit = 20, offset = 0 } = req.data

module.exports = async function listTravelsByCustomer(req) {
  const { customerID, limit = 20, offset = 0 } = req.data

  const results = await SELECT.from(Travels)
    .columns('ID', 'Description', 'BeginDate', 'EndDate', 'Status_code', 'TotalPrice')
    .where({ Customer_ID: customerID })
    .orderBy({ BeginDate: 'desc' })
    .limit(limit, offset)
  return JSON.stringify(results)
}
```

> **Note:** Returning `many Entity` from an action is not yet supported by the sandbox return-type validation. Use `returns String` and serialize the result with `JSON.stringify` as a workaround.

Default values make the action safe to call with only `customerID`. The `.orderBy()` clause is essential: without a stable sort order the same row can appear on multiple pages.

Callers step through results by incrementing `offset` by `limit` on each call:

| Call | `limit` | `offset` | Rows returned |
|------|---------|----------|---------------|
| First page  | 20 | 0  | rows 1–20  |
| Second page | 20 | 20 | rows 21–40 |
| Third page  | 20 | 40 | rows 41–60 |

## Best Practices

The patterns in this document open more surface than Part 1's dedicated-extension-service model. The following principles keep that surface manageable:

- **Reject in `before` handlers, react in `after` handlers.** `before` runs inside the request's transaction and can abort it; `after` runs after commit and cannot undo the write. Putting invariants in `before` and side effects (audit, notify, cleanup) in `after` avoids surprises for the caller.
- **Open the smallest surface that fits the use case.** Annotate individual entities and unbound operations with `@extensible.code` rather than the whole service. A wider surface can be granted later; narrowing an already-opened one breaks deployed extensions.
- **Prefer predefined extension points (Part 1) whenever the integration is a single hook.** CRUD event handlers are powerful but ambient — an extension author has to reason about every write that reaches the entity. A `TravelExtensionService` action gives the same result with a much clearer contract.
- **Factor cross-record rules into unbound actions.** The `assert_within_budget` pattern above scales because every handler that touches the invariant delegates to one place. Duplicating the check in every event handler drifts.
- **Keep declarative rules declarative.** Status transitions, mandatory fields, and value ranges belong on the CDS model (`@assert.*`, flow annotations, `@readonly`). Restating them in a `before` handler bypasses tooling and hides the rule from the model. This document's `before-UPDATE` example is deliberately about a **cross-record aggregate** — something annotations cannot express.
- **Watch `after-READ` scope.** `after-READ` handlers are not fired for nested reads inside the sandbox; virtual fields you populate there will not be filled on children. Use `limitedAfterRead: true` to restrict `after-READ` handlers to virtual fields only if that fits your model.
- **When in doubt, go back to Part 1.** If your integration can be expressed as _"call this action at this point"_, keep it there. The scenarios that justify Part 2 all share a controlled extension-supply chain — see [When to Open Things Up](#when-to-open-things-up).


## License

This package is provided under the terms of the [SAP Developer License Agreement](https://cap.cloud.sap/resources/license/developer-license-3_2_CAP.txt).
