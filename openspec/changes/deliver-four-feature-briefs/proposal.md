# Proposal

## Why

The four participant feature briefs are still described as unimplemented even
though this personal fork is ready to plan their delivery. The workshop needs
four separately reviewable feature changes with explicit contracts, real path
ownership, staged integration, and evidence that preserves the existing
feedback-board baseline.

## What Changes

- Specify four independent feature outcomes—feedback status, category
  filtering, board sorting, and author summaries—in four capability delta
  specs.
- Plan four isolated implementation workspaces and four independent pull
  requests, each targeting `AshleyTurnbull/build-days-agentic-sdlc` `main`.
- Define actual shared-path collisions, merge sequencing, ownership,
  validation, and human review gates; do not treat overlapping work as safe for
  concurrent implementation.
- Correct the feature documentation as each feature is delivered so it no
  longer claims all four remain unimplemented.
- Preserve feedback creation, voting, Azure persistence, health/readiness,
  existing architecture, and least-privilege boundaries.
- For status, document that this is an explicitly workshop-only application:
  any user with access can update status and there is no production
  authentication.
- Require unsupported category and sort query inputs to return actionable
  HTTP 400 validation errors.
- Require a summary lookup for an unknown author to succeed with zero feedback
  and zero votes.

## Capabilities

### New Capabilities

- `feedback-status`: Workshop users can view and move feedback through the
  specified forward-only status workflow.
- `category-filtering`: Users can filter the board by a supported category or
  return to all feedback, with invalid API query values rejected.
- `board-sorting`: Users can select deterministic newest-first or most-voted
  ordering, with invalid API query values rejected.
- `author-summary`: Users can retrieve a privacy-minimized aggregate of an
  author's feedback count and total votes, including zero totals for unknown
  authors.

### Modified Capabilities

None. The repository has no existing main capability specs; these four
feature contracts are introduced as separate capabilities.

## Impact

- **Application and tests:** Planned changes are limited to the existing
  shared TypeScript contract, Express API, feedback storage abstraction and
  adapters, React board/client, CSS where needed, and focused contract,
  storage, API, and UI tests. Exact ownership and overlaps are recorded in
  `design.md`.
- **Documentation:** Each feature's brief and the shared feature index must be
  corrected as the corresponding implementation is delivered.
- **Infrastructure and workflows:** No changes are planned.
- **Security and operations:** No production authentication, new identity,
  permission, or infrastructure boundary is introduced. Existing Azure Table
  persistence, health/readiness behavior, and least privilege remain intact.
- **Repository scope:** This proposal is for the `AshleyTurnbull` personal
  fork only. `VeVarunSharma/build-days-agentic-sdlc` is explicitly out of
  scope.

