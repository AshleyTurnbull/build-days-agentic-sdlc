# Capstone brief: Service request queue

## User outcome

An internal user can submit a small service request and a service owner can
mark it completed, making the queue and its current state visible without an
email thread.

## Time-boxed minimum

Complete the minimum in 90-120 minutes. Model one **service request** entity and
one workflow: submit a request, view it in the queue, and complete it. Use only
`open` and `completed` states.

The OpenSpec change defines exact fields and limits. At minimum, a request
identifies a request type from a small fixed set, contains a summary and
requester display name, records state, and exposes created/updated timestamps.

## Required behavior

### API

Provide a small HTTP API that can:

- create a valid open request;
- list requests in deterministic order;
- complete an existing open request;
- reject an unsupported request type or invalid text actionably;
- reject an unknown identifier without changing data; and
- handle repeated completion using one documented, tested response.

Keep contracts independent from transport UI and Azure SDK types.

### Accessible UI states

Provide a keyboard-operable submission and queue experience with:

- labeled controls and understandable request-type choices;
- loading and empty states;
- successful submission and completion feedback;
- validation associated with the relevant control;
- a recoverable API failure state;
- visible textual status independent of color; and
- perceivable updates and a logical focus path after actions.

### Persistence and operations

Persist requests through an application-owned storage abstraction. Focused
tests may replace it with a deterministic in-memory adapter; deployed requests
must survive refresh and process restart.

Expose process liveness and dependency-aware readiness. A storage outage must
be distinguishable from a healthy, ready service.

## Focused tests

Map requirements to focused tests for:

- entity validation, supported types, and completion transition;
- create, list, complete, invalid-input, unknown-ID, and repeated-completion
  API cases;
- loading, empty, success, validation, failure, and completed UI states;
- persistence across later access or a new adapter instance; and
- deployed health, readiness, and one submit-to-complete smoke path.

Keep fixtures small and failures diagnostic.

## Realistic bug scenario

After the minimum is deployed, expose this defect: completing one request can
update another request when their display order changes between loading and
action.

Create a bounded bug ticket with two-record reproduction steps, expected
identifier behavior, owned and prohibited paths, and focused validation. Fix it
in a fresh App session. The completed request must be selected by stable
identity rather than list position, and the other request must remain open.

## Azure target

Deploy one web application and its persistence dependency in the assigned
resource group. Use pinned Azure Verified Modules for supported resources,
GitHub Actions authenticated with GitHub OIDC through the protected
environment, and managed identity for runtime persistence access when
supported.

Choose the least complex suitable services during design; no hosting or
storage product is prescribed here.

## Non-overlapping task ownership

Approve this dependency shape before using Fleet:

| Task seam | Owned outcome | Dependency |
|---|---|---|
| Contract and storage port | Request rules and persistence boundary | none |
| API and adapter | Queue behavior and concrete persistence | reviewed contract |
| Accessible UI | Submission/queue workflow and UI-state tests | reviewed contract |
| Delivery | Capstone CI/CD, pinned AVM, OIDC, probes and evidence | validation contract |
| Defect fix | Stable-identity completion remediation | integrated minimum |

Write discovered owned and prohibited paths into every task issue. Shared
contracts, manifests, workflow generation, and common tests have one owner.

## Completion evidence

The durable trail includes:

- parent issue and approved OpenSpec proposal, scenarios, design, and tasks;
- bounded issues with ownership, dependencies, branches, commits, focused
  tests, and pull requests;
- independent CI and security results;
- AVM validation and protected OIDC deployment evidence;
- deployed commit, URL, health, readiness, and functional smoke result;
- bug issue, reproduced failure, fix, and independently passing checks; and
- one GH-AW run with exactly one safe output.

## Non-goals

Assignment, priorities, SLAs, comments, attachments, email or chat
notifications, catalog administration, authentication/authorization, routing,
approvals, reporting, and integrations with an external ticket system are out
of scope.

## Stretch

After the minimum evidence is complete, add an accessible filter for open and
completed requests without adding more workflow states.

