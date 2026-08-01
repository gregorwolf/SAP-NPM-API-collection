# Deprecated Features

Features documented here are still supported for backward compatibility but should not be used in new projects. They may be removed in a future major version.

## Extension Allow-List

> **Deprecated.** The `extension-allowlist` is superseded by the `@extensible.code` annotation on the CDS model. See [Controlling Extensibility with Annotations](./README.md#controlling-extensibility-with-annotations) in the main README for the current mechanism.

Prior to the annotation-first model, an application developer opened parts of the surface for extension by listing them explicitly in `package.json`. The allow-list defined exactly which entities, actions, and functions extension developers could target.

### Turning the allow-list back on for code

With `extensibleAnnotation` defaulting to `true`, the allow-list is bypassed by the code checker (annotations decide). If you still want the allow-list to gate code extensions — for example while migrating an existing project — set `extensibleAnnotation` to `false` explicitly:

```jsonc
"cds": {
  "requires": {
    "code-extensibility": {
      "extensibleAnnotation": false
    },
    "cds.xt.ExtensibilityService": {
      "namespace-blocklist": "com.sap.",
      "extension-allowlist": [
        {
          "for": ["ServiceName"],
          "kind": "entity",
          "new-fields": 4,
          "code": ["CREATE", "READ", "UPDATE", "DELETE", "action", "function"]  // bound actions and functions
        },
        {
          "for": ["ServiceName.EntityName"],
          "kind": "entity",
          "code": ["READ"]
        },
        {
          "for": ["ServiceName"],
          "kind": "service",
          "new-entities": 1,
          "code": ["action", "function"]                                        // unbound actions and functions
        }
      ]
    }
  }
}
```

When `extensibleAnnotation: false` is set, the allow-list is the sole source of truth for code and Oyster performs no annotation-based checks. When the annotation is on (the default), the allow-list still governs **non-code** artefacts through MTX (new fields, new entities, namespace blocking), but the code checker consults only `@extensible.code`.

The two mechanisms in one table:

| `extensibleAnnotation` | Allow-list configured? | Result for code |
|---|---|---|
| `true` (default) | any | Annotations decide; allow-list ignored for code |
| `false` | yes | Allow-list decides (legacy behaviour) |
| `false` | no | No code checks from Oyster |

### Notes on the deprecated behaviour

Not all entities should be eligible for code extensions. In particular, avoid opening projections to remote services — extension code targeting these can break the application or cause unintended side effects in external systems.

The allow-list does not protect against all misuse. Application handlers may rely on specific values in `req.data` or `req.results`, and extension code can change these. cds-oyster performs basic checks for known issues in generic handlers, but this validation does not cover all cases. Design extension points with explicit contracts and validate outputs where critical.

### Migrating away from the allow-list

1. Add `@extensible.code` at the appropriate levels in your CDS model (service, entity, or per-operation — see the walk rules in the main README).
2. Remove the `code:` entries from your `extension-allowlist` — or drop the allow-list entirely if it was only there for code control.
3. Remove `"extensibleAnnotation": false` (or leave it unset). The default `true` will now consult your annotations.

## `@kind: 'ext-service'`

> **Deprecated shortcut.** Equivalent to `@extensible.code` at service level. Prefer the annotation in new code.

Historically, marking a service with `@kind: 'ext-service'` gave it the "dedicated extension service" semantics (all elements extensible, silent no-op actions, scoped data access). The same semantics now come from `@extensible.code` at service level:

```cds
// deprecated
@kind: 'ext-service'
service TravelExtensionService { ... }

// preferred
@extensible.code
service TravelExtensionService { ... }
```

Both forms are recognised by the push checker. The plugin still validates against `@kind: 'ext-service'` for backward compatibility with tenants deployed against older versions.
