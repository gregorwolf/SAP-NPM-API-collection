# Modernize CodeValidation `.pipeline/config.yml` and `Jenkinsfile_CI`

**Date:** 2026-05-19
**Status:** Approved — ready for implementation
**Repo:** `github.wdf.sap.corp/DevX/CodeValidation`
**Branch:** `chore/cleanup-pipeline-config` (off `master`)

## Goal

Make `.pipeline/config.yml` reflect the current scanner stack — CheckmarxOne for SAST, BlackDuck (via piper defaults) for OSS — and remove all Whitesource and legacy Checkmarx references. Move CheckmarxOne parameters out of `Jenkinsfile_CI` and into `.pipeline/config.yml` so the Jenkinsfile is a thin orchestrator and the configuration is reviewable in one place.

## Motivation

- Whitesource was retired during the BlackDuck migration. The Whitesource block, the `general:` Whitesource fields, and the `scanType: whitesource` reference in `sapCheckPPMSCompliance` are dead weight: there is no caller for `whitesourceExecuteScan` in `Jenkinsfile_CI` or `Jenkinsfile_Voter`.
- The legacy `checkmarxExecuteScan` block is dead now that the Jenkinsfile invokes `checkmarxOneExecuteScan`.
- Today's `Jenkinsfile_CI` carries four CxOne parameters inline (`checkmarxOneCredentialsId`, `applicationName`, `preset`, `projectName`). Static configuration belongs in `.pipeline/config.yml`, where piper's config-merge model expects it.
- This morning's master CI failures were caused by CxOne flagging false positives in empty mock-HTML test fixtures (`test/mock/dummyProj/hhh.html` etc.). Adding `!**/test/**` to the CxOne file filter removes those fixtures from the scan input.

## Out of scope: BlackDuck wiring

CodeValidation's `Jenkinsfile_CI` does not currently invoke any OSS dependency scanner. There is no `detectExecuteScan` stage, no Whitesource stage, and the `sapCheckPPMSCompliance` step only queries an existing BOM rather than producing one. Removing the dead Whitesource config does not regress anything because nothing calls it, but it does make the absence of an OSS scan visible.

Adding BlackDuck (a `detectExecuteScan` stage in `Jenkinsfile_CI` plus a `steps.detectExecuteScan` block in `.pipeline/config.yml`) is a **separate follow-up**, not part of this PR. It needs its own design pass: credential wiring (`basWithBlackDuckOSSCredential`), project name convention (`SHC-BAS-CodeValidation`), scan stage gating, and validation against gkeplatform2. Bundling it here would widen blast radius and tie two unrelated risks together.

## Current state

`/Users/i023811/git/CodeValidation/.pipeline/config.yml`:

```yaml
general:
  gitSshKeyCredentialsId: devxtech_ssh
  gitSshUrl: git@github.wdf.sap.corp:devx/CodeValidation.git
  whitesourceProductToken: 'cf5b7a84-545e-4d8f-9764-c0e342a55a1b'
  whitesourceProductName: SHC - DevX - SAP Web IDE & DI Cloud
  whitesourceUserTokenCredentialsId: whitesourceUserToken
steps:
  whitesourceExecuteScan:
    buildTool: 'npm'
    scanType: 'ua'
    customScanVersion: '1.0.0'
    orgToken: '6971b2eec2d3420bad0caf173ec629f6a3c7d3ba63f3445ab99ffdbf1acfb1d0'
    whitesourceProjectNames:
      - CodeValidation - 1.0.0
  checkmarxExecuteScan:
    checkmarxProject: CodeValidation_checkmarx
    checkmarxGroupId: 'f8bb43bd-9a38-4e6a-a932-6a8159817e41'
    checkmarxCredentialsId: 'checkmarxCredentialsId'
    preset: 100115
  sapCheckPPMSCompliance:
    ppmsCredentialsId: 'ppmsCredentialsId'
    ppmsID: '73555000100200005601'
    scanType: whitesource
  sapXmakeExecuteBuild:
    xMakeServer: xmake-nova
    xMakeBuildQuality: Release
```

`/Users/i023811/git/CodeValidation/Jenkinsfile_CI` (CheckmarxOne stage, lines 24-33):

```groovy
stage('CheckmarxOne') {
    node {
        checkmarxOneExecuteScan script: this,
            checkmarxOneCredentialsId: 'validatorsCxOneCredentialsId',
            applicationName: 'SAP_WEB_IDE',
            preset: 'SAP_Corp_JavaScript_Client',
            branch: env.BRANCH_NAME,
            projectName: githubRepo
    }
}
```

## Target state

### `.pipeline/config.yml`

```yaml
general:
  gitSshKeyCredentialsId: devxtech_ssh
  gitSshUrl: git@github.wdf.sap.corp:devx/CodeValidation.git
steps:
  checkmarxOneExecuteScan:
    checkmarxOneCredentialsId: validatorsCxOneCredentialsId
    applicationName: SAP_WEB_IDE
    preset: SAP_Corp_JavaScript_Client
    projectName: CodeValidation
    filterPattern: '!**/node_modules/**, !**/test/**, !**/.xmake/**, **/*.html, **/*.xml, **/*.go, **/*.py, **/*.js, **/*.rb, **/*.scala, **/*.ts'
  sapCheckPPMSCompliance:
    ppmsCredentialsId: ppmsCredentialsId
    ppmsID: '73555000100200005601'
  sapXmakeExecuteBuild:
    xMakeServer: xmake-nova
    xMakeBuildQuality: Release
```

### `Jenkinsfile_CI` (CheckmarxOne stage)

```groovy
stage('CheckmarxOne') {
    node {
        checkmarxOneExecuteScan script: this, branch: env.BRANCH_NAME
    }
}
```

## Change set

### Removed from `.pipeline/config.yml`

- `general.whitesourceProductToken`
- `general.whitesourceProductName`
- `general.whitesourceUserTokenCredentialsId`
- The entire `steps.whitesourceExecuteScan` block
- The entire `steps.checkmarxExecuteScan` block
- `steps.sapCheckPPMSCompliance.scanType: whitesource` (the line is dropped; the `sapCheckPPMSCompliance` block stays)

### Added to `.pipeline/config.yml`

A new `steps.checkmarxOneExecuteScan` block with five fields:

- `checkmarxOneCredentialsId: validatorsCxOneCredentialsId`
- `applicationName: SAP_WEB_IDE`
- `preset: SAP_Corp_JavaScript_Client`
- `projectName: CodeValidation`
- `filterPattern: '!**/node_modules/**, !**/test/**, !**/.xmake/**, **/*.html, **/*.xml, **/*.go, **/*.py, **/*.js, **/*.rb, **/*.scala, **/*.ts'`

### Modified in `Jenkinsfile_CI`

`stage('CheckmarxOne')` simplifies from a six-parameter call to a single-parameter call (`branch: env.BRANCH_NAME`). All other static parameters move to `.pipeline/config.yml`. `branch` stays inline because `env.BRANCH_NAME` is a runtime value not available in static YAML.

## Why this split

- **Static facts → `config.yml`.** Credential ID, application name, preset, project name, and file filter do not change per build and want to be reviewable in one place. piper's config-merge model is designed for exactly this.
- **Runtime values → `Jenkinsfile_CI`.** Anything pulled from `env`, the SCM checkout, or a Groovy variable must stay in the Jenkinsfile. Only `branch: env.BRANCH_NAME` qualifies.

## Filter pattern derivation

The `filterPattern` value mirrors the patterns observed in piper's default zip filter logged at build time on master build #17:

```
!**/node_modules/**, !**/.xmake/**, !**/*_test.go, !**/vendor/**/*.go,
**/*.html, **/*.xml, **/*.go, **/*.py, **/*.js, **/*.rb, **/*.scala, **/*.ts
```

The new value drops `!**/*_test.go` and `!**/vendor/**/*.go` (irrelevant to a Node validator), adds `!**/test/**` (the actual goal), and keeps the include patterns. piper's `filterPattern` field replaces the default rather than merging — this is intentional and the standard way to override.

## Risk and validation

- **PPMS scanType drop.** Removing `scanType: whitesource` lets piper apply its default. If the default produces an unintended scan type, the next master build will surface it; the fallback is to set `scanType: blackduck` explicitly in a follow-up.
- **filterPattern replacement.** The derived value is a superset of the build-time-default include list with one additional exclude (`!**/test/**`). Net effect: same files scanned as before, minus the `test/` tree.
- **No CxOne re-auth changes.** The credential ID, application name, and preset are unchanged from what the merged migration commit landed with. Authentication and project resolution behave identically.
- **No code path changes in pipeline groovy.** Only `Jenkinsfile_CI` and `.pipeline/config.yml` change in this PR.

This repo has no unit or integration tests for pipeline config; validation is by running master CI after merge and confirming:

1. CxOne stage authenticates and runs (no regression).
2. Scan input no longer includes `test/` files (visible in the piper "Zipping files using filter" log line).
3. `sapCheckPPMSCompliance` stage still passes.
4. Compliance gate clears once test-fixture false positives stop being scanned.

## Rollout

- One PR against `master` of `DevX/CodeValidation` from branch `chore/cleanup-pipeline-config`.
- User decides merge timing.
- No coordination required with other repos; this change is local to CodeValidation. Mirroring to jsvalidator / xmlvalidator / jsonvalidator is a separate follow-up.
