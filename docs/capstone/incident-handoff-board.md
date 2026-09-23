# Capstone brief: Incident handoff board

## User outcome

An on-call engineer can record a concise operational handoff and the next
engineer can acknowledge it, making ownership and unresolved context visible
without relying on chat history.

## Time-boxed minimum

Complete the minimum in 90-120 minutes. Model one **handoff** entity and one
workflow: create a handoff, view it in the board, and acknowledge it. Keep the
state model intentionally small: `open` and `acknowledged`.

The team decides field names and validation in OpenSpec. At minimum, the entity
must identify a service, summarize the situation, state a next action, record
the current state, and expose created/updated timestamps.

## Required behavior

### API

Provide a small HTTP API that can:

- create a valid handoff;
- list handoffs in a deterministic order;
- acknowledge an existing open handoff;
- reject invalid input with an actionable response;
- reject an unknown identifier without creating or changing data; and
- reject a repeated or otherwise invalid acknowledgement consistently.

The contract must not depend on UI or Azure SDK types.

### Accessible UI states

Provide a keyboard-operable create-and-list experience with:

- labeled inputs and a clearly named submit action;
- loading and empty states;
- successful creation and acknowledgement feedback;
- inline validation that is associated with the relevant input;
- a recoverable API failure state that preserves entered data where practical;
- visible status text that does not rely on color alone; and
- focus behavior or announcements that make updates perceivable.

### Persistence and operations

Persist handoffs behind an application-owned storage interface. Focused tests
may use an in-memory adapter; the deployed application must retain records
across refreshes and process restarts.

Expose a liveness check for the process and a readiness check that reports
whether the persistence dependency is usable. A healthy process with
unavailable storage must not be represented as ready.

## Focused tests

Map approved scenarios to a small test set covering:

- entity validation and allowed state transition;
- create, list, acknowledge, invalid input, and unknown identifier API cases;
- loading, empty, success, validation, failure, and acknowledgement UI states;
- persistence through a new request or adapter instance, as appropriate; and
- deployed health, readiness, and one create-to-acknowledge smoke path.

Tests must be deterministic and return actionable failures.

## Realistic bug scenario

After the minimum workflow is integrated, use review or exploratory testing to
expose this defect: two acknowledgement attempts can overwrite the original
acknowledgement time or silently succeed.

Create a bug issue containing reproduction steps, expected behavior, owned and
prohibited paths, and focused validation. Fix it in a fresh App session without
hidden context from the implementation session. The expected outcome is that
the first acknowledgement is retained and a repeated attempt receives the
approved deterministic response.

## Azure target

Deploy a single web application and its persistence dependency to the team's
assigned resource group. Compose supported resources from pinned Azure
Verified Modules. GitHub Actions authenticates through the approved protected
environment and GitHub OIDC. The running application uses managed identity for
data-plane access where the selected Azure service supports it.

The team chooses the smallest suitable Azure services during design; the brief
does not prescribe a hosting runtime or storage product.

## Non-overlapping task ownership

Use one owner for each seam and record dependencies before Fleet:

| Task seam | Owned outcome | Dependency |
|---|---|---|
| Contract and storage port | Entity rules and persistence boundary | none |
| API and adapter | HTTP behavior and concrete persistence | reviewed contract |
| Accessible UI | User workflow and UI-state tests | reviewed contract |
| Delivery | Capstone CI, AVM composition, OIDC deployment evidence | validation contract |
| Defect fix | Repeated-acknowledgement remediation | integrated minimum |

Actual paths must be discovered and written into task issues. Do not allow
concurrent ownership of dependency manifests, shared contracts, or generated
workflow files.

## Completion evidence

A reviewer must be able to follow:

- parent issue and approved OpenSpec artifacts;
- bounded task issues with owned paths and dependency receipts;
- implementation pull requests and independent CI;
- infrastructure validation and protected OIDC deployment;
- live URL plus health, readiness, and functional smoke evidence;
- bug issue, focused failing test, fix pull request, and passing checks; and
- one GH-AW result with exactly one safe output.

## Non-goals

Incident paging, alert ingestion, chat integrations, escalation policies,
authentication/authorization, comments, attachments, audit export, analytics,
and multi-team routing are out of scope.

## Stretch

If the minimum evidence chain is complete, add a filter that separates open
and acknowledged handoffs while retaining an accessible all-items view.

