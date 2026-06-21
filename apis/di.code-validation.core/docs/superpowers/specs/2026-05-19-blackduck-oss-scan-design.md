# Wire BlackDuck OSS (`detectExecuteScan`) into CodeValidation

**Date:** 2026-05-19
**Status:** Approved — ready for implementation
**Repo:** `github.wdf.sap.corp/DevX/CodeValidation`
**Branch:** `chore/blackduck-oss-scan` (off `master`)

## Goal

Add a BlackDuck OSS dependency scan to `Jenkinsfile_CI` via piper's `detectExecuteScan`, and update `sapCheckPPMSCompliance` to query the BlackDuck BOM. The follow-up promised in the previous spec (`2026-05-19-modernize-pipeline-config-design.md`).

## Motivation

`Jenkinsfile_CI` currently runs no OSS dependency scan. The Whitesource scan was retired and never replaced; `sapCheckPPMSCompliance` queries an empty BOM. This wires the missing scanner.

## BlackDuck details

- Server: `https://sap.blackducksoftware.com/`
- Group: `Devx_Wing_M0`
- BD project: `Devx_Wing_M0_CodeValidation`
- Scan version: `master` (pinned via `customScanVersion`)
- Bot user: `bot_sap_web_ide_2_0` (token authenticates as this user; not a piper config field)
- Token storage: Jenkins "Secret text" credential id `codeValidationBlackDuckToken` on the `gkeplatform2` controller. The token value is **not** committed anywhere.

## Out of scope

- Other validators (jsvalidator, xmlvalidator, jsonvalidator). Same change can be mirrored in follow-up PRs.
- CTP / commercial license scans against `https://sap-cci.app.blackduck.com/`. CodeValidation is internal-only.

## Pre-PR action

Create a Jenkins "Secret text" credential on `gkeplatform2`:

- ID: `codeValidationBlackDuckToken`
- Description: `BlackDuck token for CodeValidation OSS scan (Devx_Wing_M0)`
- Secret: the token value

Created via Jenkins REST API; not part of the PR diff.

## Target state

### `.pipeline/config.yml` (additions only — existing blocks unchanged unless noted)

```yaml
steps:
  detectExecuteScan:
    serverUrl: 'https://sap.blackducksoftware.com/'
    detectTokenCredentialsId: codeValidationBlackDuckToken
    projectName: Devx_Wing_M0_CodeValidation
    customScanVersion: master
    groups:
      - 'Devx_Wing_M0'
    buildTool: npm
    unmap: true
    failOn:
      - BLOCKER
      - CRITICAL
      - MAJOR
      - MINOR
    excludedDirectories:
      - .github
      - .pipeline
      - test
      - tests
      - docs
      - coverage
      - node_modules
    scanProperties:
      - --blackduck.signature.scanner.memory=4096
      - --detect.timeout=6000
      - --blackduck.trust.cert=true
      - --detect.blackduck.signature.scanner.exclusion.name.patterns=node_modules
      - --detect.npm.dependency.types.excluded=DEV
      - --detect.project.version.update=true
  sapCheckPPMSCompliance:
    ppmsCredentialsId: ppmsCredentialsId
    ppmsID: '73555000100200005601'
    scanType: blackduck
```

### `Jenkinsfile_CI` — replace `stage('CheckmarxOne')` with parallel security stage

```groovy
stage('Security Scans') {
    parallel(
        'CheckmarxOne': {
            node {
                checkmarxOneExecuteScan script: this, branch: env.BRANCH_NAME
            }
        },
        'BlackDuck OSS': {
            node {
                checkout scm
                detectExecuteScan script: this
            }
        }
    )
}
```

The BD branch needs `checkout scm` because piper scans the workspace. The CxOne branch already runs from a node that gets its own checkout via piper.

## Why these field choices

- **`detectTokenCredentialsId`** is the standard piper Jenkins-credential field (alias `apiTokenCredentialsId`). Token is read from the Jenkins credential store at scan time.
- **`customScanVersion: master`** pins the BD project version to `master` regardless of artifact version. Standard for the bas org. Overrides versioning derivation, so `versioningModel` is not set.
- **`unmap: true`** keeps only the latest scan result on the project version, matching the global default in `bas-jenkins-pipeline`.
- **`failOn: [BLOCKER, CRITICAL, MAJOR, MINOR]`** matches the policy gate landed in `bas-jenkins-pipeline` PR #336. Strict.
- **`buildTool: npm`** aligns piper with the package.json + package-lock.json layout.
- **`excludedDirectories`** removes test fixtures, generated docs, and dependency dirs from signature scanning. Mirrors the global default but trimmed to what CodeValidation actually has.
- **`scanProperties`** carries the load-bearing piper defaults that get lost if a repo overrides this field (timeout, memory, trust-cert, node_modules exclusion, dev-deps excluded). Without these the scan times out or runs out of memory.

## Risk and validation

- **First scan creates the BD project.** Project `Devx_Wing_M0_CodeValidation` does not yet exist on `sap.blackducksoftware.com`. The first scan creates it under group `Devx_Wing_M0`. Subsequent scans update `version: master`.
- **Strict failOn may surface existing findings.** If transitive deps already violate policy at MAJOR/MINOR, the master build fails after merge. That is the intended behavior — same posture as PR #336.
- **PPMS scanType change.** Switching `sapCheckPPMSCompliance.scanType` to `blackduck` makes PPMS query the BD BOM. Validates BD scan ran first. If PPMS fails after BD passes, revert just that one line.
- **No bas-jenkins-pipeline dependency.** This repo's Jenkinsfile loads `piper-lib` / `piper-lib-os` directly (no `bas-jenkins-pipeline`), so the `basWithBlackDuckOSSCredential` wrapper is not available. The plain `detectTokenCredentialsId` field replaces it.

This repo has no unit/integration tests. Validation is by post-merge master CI:

1. `Security Scans` stage runs both branches in parallel.
2. `BlackDuck OSS` branch authenticates against `sap.blackducksoftware.com`, creates project `Devx_Wing_M0_CodeValidation` (first run only), and uploads scan results under `version: master`.
3. `sapCheckPPMSCompliance` queries the BD BOM and passes (or fails on real PPMS issues, not because of an empty BOM).
4. CxOne branch unchanged.

## Rollout

- One PR against `master` of `DevX/CodeValidation` from `chore/blackduck-oss-scan`.
- Pre-PR: Jenkins "Secret text" credential `codeValidationBlackDuckToken` created on `gkeplatform2`.
- User decides merge timing.
- Mirror to jsvalidator / xmlvalidator / jsonvalidator is a separate follow-up.
