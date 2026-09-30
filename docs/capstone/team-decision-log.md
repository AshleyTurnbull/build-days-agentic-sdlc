# Capstone brief: Team decision log

## User outcome

A team member can record a concise proposed decision and then mark it accepted,
leaving the current choice and its rationale available outside meeting or chat
history.

## Time-boxed minimum

Complete the minimum in 90-120 minutes. Model one **decision** entity and one
workflow: propose a decision, view it in the log, and accept it. Keep states to
`proposed` and `accepted`.

The approved specification defines exact validation. At minimum, a decision
has a title, context, chosen option, rationale, state, and created/updated
timestamps.

## Required behavior

### API

Provide a small HTTP API that can:

- create a valid proposed decision;
- list decisions in a deterministic order;
- accept an existing proposed decision;
- reject missing or excessive input with actionable details;
- reject an unknown identifier without creating data; and
- handle repeated acceptance according to one documented, tested rule.

Do not couple the shared contract to UI or cloud-provider types.

### Accessible UI states

Provide a keyboard-operable decision form and log with:

- persistent labels and clear instructions for required fields;
- loading and empty states;
- successful proposal and acceptance feedback;
- field-associated validation;
- a recoverable API failure state that avoids discarding entered rationale;
- state shown in text rather than color alone; and
- perceivable focus or status announcements after updates.

### Persistence and operations

Hide persistence behind an application interface. Focused tests may substitute
an in-memory adapter; the deployed decision log must retain entries after
refresh and process restart.

Provide a liveness endpoint and a dependency-aware readiness endpoint.
Unavailable persistence must be observable as not ready rather than hidden
behind a successful process check.

## Focused tests

Create focused, scenario-mapped tests for:

- entity validation and the proposal-to-acceptance rule;
- create, list, accept, invalid-input, unknown-ID, and repeated-acceptance API
  cases;
- loading, empty, success, validation, failure, and accepted UI states;
- persistence across a subsequent request or adapter instance; and
- deployed health, readiness, and one propose-to-accept smoke path.

Tests should identify the failed behavior without requiring transcript context.

## Realistic bug scenario

After integration, expose this defect: rapidly submitting the proposal action
twice creates two decisions with the same client submission identity.

Create a GitHub bug issue with reproduction steps, expected idempotent result,
owned and prohibited paths, and focused validation. Use a fresh App session for
the repair. The team chooses and specifies an appropriately bounded duplicate
submission rule; the fix must be independently verified through the API and
UI path.

## Azure target

Deploy the application and persistence dependency to the assigned resource
group. Compose supported resources using pinned Azure Verified Modules.
GitHub Actions deploys through the approved protected environment using GitHub
OIDC, and the application uses managed identity for data-plane access when the
chosen Azure service supports it.

Architecture and product choices remain team decisions documented in OpenSpec.

## Non-overlapping task ownership

Use bounded task issues based on this dependency shape:

| Task seam | Owned outcome | Dependency |
|---|---|---|
| Contract and storage port | Decision rules and persistence boundary | none |
| API and adapter | HTTP workflow and concrete persistence | reviewed contract |
| Accessible UI | Proposal/log workflow and UI-state tests | reviewed contract |
| Delivery | Capstone CI/CD, AVM, OIDC, probes and evidence | validation contract |
| Defect fix | Duplicate-submission remediation | integrated minimum |

Discover real paths before assignment. Only one active task may own shared
contracts, manifests, generated workflows, or the same primary test file.

## Completion evidence

A transcript-free review must connect:

- the parent issue to approved OpenSpec artifacts;
- each bounded task to ownership, dependencies, branch, commit, test, and pull
  request receipts;
- implementation to independent CI and review;
- pinned AVM validation to protected OIDC deployment and the deployed commit;
- URL, health, readiness, and functional smoke evidence;
- bug issue, reproduction, fix pull request, and passing checks; and
- one narrowly authorized GH-AW output.

## Non-goals

Voting, comments, alternatives analysis, decision supersession, attachments,
full ADR generation, authentication/authorization, notifications, search,
analytics, and organizational approval policy are out of scope.

## Stretch

After minimum completion, add a simple text filter over the currently loaded
decision log with an accessible no-results state.

