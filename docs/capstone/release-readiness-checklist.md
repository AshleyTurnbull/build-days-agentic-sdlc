# Capstone brief: Release readiness checklist

## User outcome

A delivery lead can create a small release assessment, review its required
checks, and mark each check ready so the team can see whether the release is
ready without reconstructing status from messages.

## Time-boxed minimum

Complete the minimum in 90-120 minutes. Model one **release check** entity and
one workflow: create a release assessment with a fixed, small set of checks,
then update individual checks until the assessment is ready.

Keep the check set bounded and selected during OpenSpec design. At minimum, a
release assessment identifies the release, contains check labels and states,
exposes an overall derived readiness state, and records timestamps.

## Required behavior

### API

Provide a small HTTP API that can:

- create a valid release assessment;
- retrieve or list assessments deterministically;
- update one known check to an allowed state;
- derive overall readiness from the current checks rather than accepting it as
  an unchecked client claim;
- reject invalid input or unknown checks with actionable responses; and
- reject an unknown assessment without creating data.

The contract remains independent from the browser framework and Azure SDK.

### Accessible UI states

Provide a keyboard-operable assessment experience with:

- labeled release input and understandable check controls;
- loading and empty states;
- successful creation and check-update feedback;
- validation associated with its input or control;
- a recoverable API failure state;
- overall readiness conveyed by text, not color alone; and
- programmatic names and update announcements for check controls.

### Persistence and operations

Persist assessments behind a storage interface. Tests may use a deterministic
in-memory implementation; deployed data must survive refresh and process
restart.

Expose liveness for the application process and readiness for the persistence
dependency. Readiness must fail or degrade observably when storage cannot
serve the workflow.

## Focused tests

Map scenarios to focused coverage for:

- entity validation and derived readiness;
- create, retrieve/list, update, invalid-check, and unknown-assessment API
  behavior;
- loading, empty, success, validation, failure, check-update, and readiness UI
  states;
- persistence across a later request or adapter instance; and
- deployed health, readiness, and one create-to-ready smoke path.

Prefer small deterministic tests over broad snapshots.

## Realistic bug scenario

After integration, expose this defect: the UI reports the release as ready
after the final visible check is selected even when an earlier persisted check
is still incomplete.

Create a bounded bug issue with reproduction evidence, expected derived state,
owned and prohibited paths, and focused validation. Route it to a fresh App
session. The fix must make the API authoritative for overall readiness and
prove the UI renders the returned state.

## Azure target

Deploy one web application and one persistence dependency into the assigned
resource group. Use pinned Azure Verified Modules for supported resources,
GitHub Actions with the approved protected environment and OIDC, and managed
identity for runtime data access where supported.

Select the smallest architecture that satisfies the behavior; this brief does
not choose a runtime, database, or UI library.

## Non-overlapping task ownership

Review this dependency shape before parallel execution:

| Task seam | Owned outcome | Dependency |
|---|---|---|
| Contract and readiness rules | Entity, check rules, storage port | none |
| API and persistence adapter | Authoritative state and storage behavior | reviewed contract |
| Accessible UI | Assessment workflow and UI-state tests | reviewed contract |
| Delivery | Capstone checks, pinned AVM, OIDC and probes | validation contract |
| Defect fix | Incorrect derived-readiness remediation | integrated minimum |

Task issues must name actual owned and prohibited paths. Serialize changes to
shared contracts, dependency manifests, and generated files.

## Completion evidence

Preserve links among:

- parent issue, approved OpenSpec proposal, scenarios, design, and tasks;
- task issues, branches, commits, focused validation, and pull requests;
- capstone CI and security results;
- AVM validation, protected deployment, commit, URL, health, readiness, and
  functional smoke result;
- real bug report, failing evidence, fix, and independent passing checks; and
- the single safe output from the capstone GH-AW.

## Non-goals

Importing external CI systems, approval chains, release scheduling, deployment
execution, environment promotion, artifact signing, custom check templates,
authentication/authorization, and notifications are out of scope.

## Stretch

If all minimum evidence is complete, add a read-only explanation listing which
checks still block readiness, with accessible linking to those controls.

