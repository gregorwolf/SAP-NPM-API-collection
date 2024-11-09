# DCN Engine written in Javascript

An engine that takes the [DCN](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLNotation.md)-input created from [DCL](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLLanguage.md) by the [DCL compiler](https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide) and allows operations on the resulting decision tree.

## Usage

### Authorization Manager

The AuthorizationManager is the entry point to the DCN engine. It receives the authorization data in its constructor and can be updated using the updateBundle method. The format is defined in the BundleLoader

The only access to this class at the moment is the method

```JavaScript
 __internal_genericInquiry(dcl, unkown, ignore, input)
```

- where dcl is an object with fields described here: https://github.wdf.sap.corp/CPSecurity/cas-dcl-ide/blob/master/documentation/DCLNotation.md#evaluating-assigned-policy-default-policy-scopefilter

- and unkown and ignore are arrays of qualified variable names (in array format)

- input is a deeply nested structure with values for dcn variables defined in the DCN schema ($app and $env)

- returns a Decision object, which can be checked to the full grant or full deny and has an internal condition field that can be transformed to DCN.

### Bundle Loader

the bundle loader is an eventemitter that connects to a bundle-gateway server and emits "change" with the authorization data as payload whenever there is a change in the upstream.
it needs to be setup using

```JavaScript
setupMTLS(bundleURL, amsInstanceID, certificate, key)
```

### Local DCN

in the util folder is a load(path) function which can be used to feed local DCN files to the engine. It returns the authorization data in the same format like the bundle loader "change" event.

## Concept: Three Layer approach

The concept of this engine is to have a three layer approach:

- Simple core engine that handles boolean logic and the defined operators.
- Libraries/APIs that allows operating on the core engines results and implement DCL's IGNORE/UNSET-feature.
- A compatibility-layer that emulates the legacy (OPA-based) PDP-interface (PolicyDecisionPoint), so existing customers can seamlessly migrate from OPA to the native engine.

## Two step evaluation - Three components

The consuming application developer can decide to use the legacy way of evaluating DCN (two steps through PDP) or choose the performance mode which does not support IGNORE/UNSET but only uses one step of evaluation and thus provides improved performance.

### DCN Core Engine

Evaluates the given DCN according to the provided INPUT variables. Can only handle boolean expressions. Everything that is not in INPUT is regarded as UNKNOWN.
The core engine has no concept of UNSET OR IGNORE.

### DCN Library

The Library providing public API for the consuming application.
It can be used to evaluate DCN using the core engine without UNSET or IGNORE and/or execute those operations on the returned value from the core engine.

The plan is to expose specialized API to solve some of the problems that currently require UNSET/IGNORE-logic in a more efficient way, like "Which actions can this user perform?".

### DCN-Legacy (PolicyDecisionPoint)

Exposes the legacy API and internally uses the DCN Library to evaluate the DCN, then in a second step evaluate the result using bool+-logic with UNSET/IGNORE/NULL.

## Additional Information

Here are some topics explained in detail to improve the understanding of DCL/DCN:

### USE, RESTRICT and IS (NOT) RESTRICTED

The reuse-features of DCL can lead to misunderstandings. [Here is how USE works](./doc/explained_use.md).
