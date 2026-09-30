# Design

## Context

See `proposal.md` for motivation and `specs/` for the four behavior contracts.
The existing application is a React client and Express API with shared Zod
contracts, a `FeedbackStorage` interface, in-memory and Azure Table adapters,
and focused contract, storage, API, and UI test files. `GET /api/feedback`
currently returns the complete list; both storage adapters sort newest first.
There is no application service layer or production authentication.

Root `DESIGN.md` requires inward dependency direction, shared contracts free of
framework and Azure types, deterministic independent evidence, and preservation
of the managed-identity/Azure Table boundary. This plan adds no dependency,
infrastructure, workflow, authentication, or durable architecture change.
There are no closer `src/` or `tests/` agent guides; documentation work follows
`docs/AGENTS.md`.

## Goals / Non-Goals

**Goals:**

- Deliver one human-reviewable implementation PR per capability, with each PR
  based on the latest `main` and targeting the personal fork's `main`.
- Make each feature independently testable and deployable while retaining the
  existing application contract.
- Make shared-file collisions explicit and prevent simultaneous edits to
  those files.
- Correct the feature index and the delivered brief in the same PR as each
  feature, without modifying workshop labs, infrastructure, workflows, or
  architecture documentation.

**Non-Goals:**

- Implement or deploy any feature as part of this planning change.
- Create implementation workspaces, GitHub issues, or pull requests here.
- Introduce authentication, roles, profile data, storage query infrastructure,
  or a new service layer.
- Change the feedback creation or voting contract, Azure identity or table
  boundary, health/readiness behavior, or existing least-privilege controls.
- Make any change to `VeVarunSharma/build-days-agentic-sdlc`.

## Decisions

### Retain the existing application and storage boundaries

Keep Zod request and response types in `src/shared/contracts.ts`, transport
validation and HTTP mapping in `src/server/app.ts`, and persistent operations
behind the existing `FeedbackStorage` interface in `src/server/storage.ts`.
Keep the React board and request helpers in their existing client files. The
existing API loads the complete feedback list, and Azure Table storage already
materializes that list before sorting it; category selection, deterministic
ordering, and summary aggregation can therefore be applied to the loaded list
without adding Azure-specific query behavior or changing the storage list
contract.

For the new status write only, extend `FeedbackStorage` and both adapters. New
records persist `new`; the Azure adapter updates the feedback entity using its
existing entity/ETag concurrency boundary. It must preserve the vote count and
all existing entity fields. Do not add a table, migration workflow, or broader
Azure permission.

**Alternative considered:** Add a query-oriented storage API and Azure Table
query/index behavior. Rejected for this workshop-sized board because it adds a
new cross-adapter contract and Azure query complexity where the existing code
already loads and sorts the complete list.

### Validate API filters and sorting at the transport boundary

Extend the existing shared Zod contract with the supported category and sort
inputs, then validate `GET /api/feedback` query parameters in Express. An
omitted category means all categories; omitted sort means `newest`. If both
are supplied, filter first and then sort the matching items. Reject unsupported
values as actionable HTTP 400 validation errors; do not normalize them.

Use the existing `GET /api/feedback` endpoint for both query options. Define a
single deterministic comparison: `newest` sorts creation time descending,
then ID ascending; `most-votes` sorts vote count descending, creation time
descending, then ID ascending. The React controls encode their selections in
the page URL query string, so refresh and copied links retain visible board
state without introducing saved preferences. API requests send the same
validated values to `/api/feedback`.

**Alternative considered:** Add separate category and sort endpoints or persist
selection in local storage. Rejected because the current list endpoint is the
natural query surface and URL state supports refresh without introducing
preferences or mutating feedback.

### Add status as a workshop workflow, not an authorization feature

Add the three-value status to the shared feedback shape and persist it with
feedback. Add one status-update operation that verifies the current persisted
state before allowing only `new` to `planned` or `planned` to `done`; reject
reversal, skipping, and unknown states without modifying the record. Use the
existing not-found error pattern for unknown feedback and an actionable client
validation response for unsupported transitions. The React control exposes
only the next available transition and announces the current status.

The app is explicitly workshop-only and has no production authentication:
anyone with access to it may make a valid forward status update. Do not add
user identity, role checks, authentication middleware, or claims that this is
a production authorization boundary.

**Alternative considered:** Restrict updates to an assumed facilitator role.
Rejected because no such role or authentication exists in the repository and
the confirmed workshop behavior permits any user with app access.

### Derive author summaries from feedback and expose only aggregate fields

Add a summary query to the existing Express API and compute `feedbackCount` and
`totalVotes` from the feedback list. Return only the requested display name and
these two aggregate values; an unknown name is a successful zero-valued
summary. Show summaries from an accessible board detail/panel interaction
with loading, zero-result, success, and actionable error states. Do not return
feedback IDs, client vote identifiers, table keys, or storage details.

**Alternative considered:** Store a separate author aggregate or add profile
records. Rejected because both totals are derived from current feedback and
votes, while separate state would add consistency and privacy risk.

### Use four isolated workspaces but serialize implementation

The PRs are not stacked: each targets `AshleyTurnbull/build-days-agentic-sdlc`
`main`, and each implementation workspace is created from the latest `main`.
The feature contracts have no semantic prerequisite on one another. However,
the existing source, client, and test layout means all four changes overlap in
the same files. Do not start the next implementation until the preceding PR is
merged; refresh the next workspace from the updated `main` before it begins.

Use this staged merge order:

| Order | Implementation PR | Reason for position |
|---|---|---|
| 1 | Category filtering | Establishes validated list-query and board-control behavior and replaces the false all-unimplemented index statement with per-feature delivery status. |
| 2 | Board sorting | Adds a second validated list-query option after the filter state and query contract are integrated. |
| 3 | Author summary | Adds the derived aggregate endpoint and detail UI on top of the integrated list behavior. |
| 4 | Feedback status | Adds the most invasive persisted feedback-shape/update contract after the other list and summary consumers are stable. |

This order is collision management, not a claim that one capability requires
another. Each PR remains separately reviewable, independently targets `main`,
and updates only its delivered status row after PR 1 establishes the index.

**Alternative considered:** Fleet-style concurrent implementation in the four
workspaces. Rejected because separate worktrees do not prevent conflicting
edits or integration conflicts in shared files.

### Assign ownership against the checked-in paths

Every implementation PR owns only the feature-specific behavior and tests
within these shared files:

| Shared path | Planned overlap |
|---|---|
| `src/shared/contracts.ts` | All four: query/summary/status contracts and validation. |
| `src/server/app.ts` | All four: list query handling, summary endpoint, status endpoint and error mapping. |
| `src/server/storage.ts` | All four: both adapters; status persistence/update, while other features use the existing list contract. |
| `src/client/api.ts` | All four: category/sort list options, status update, and summary request. |
| `src/client/App.tsx` | All four: filter/sort controls, summary interaction, status display/update. |
| `src/client/styles.css` | Any feature needing styles for controls, status, or summary. |
| `tests/contracts.test.ts` | All four: shared contract and validation coverage. |
| `tests/storage.test.ts` | All four: adapter behavior, particularly status persistence and preservation. |
| `tests/api.test.ts` | All four: query validation/order, summary responses, and status transitions. |
| `tests/App.test.tsx` | All four: accessible controls, summary states, and status interaction. |
| `docs/features/README.md` | All four: shared feature-delivery status; serially updated after PR 1. |
| `openspec/changes/deliver-four-feature-briefs/tasks.md` | All four: the implementation PR checks off its own completed tasks. |

Each PR additionally owns exactly one corresponding brief:
`docs/features/category-filtering.md`,
`docs/features/board-sorting.md`,
`docs/features/author-summary.md`, or
`docs/features/feedback-status.md`. No feature-specific source or test file
exists today. Keep changes to the current shared files rather than creating
parallel implementations. PR 1 removes the blanket claim that no brief is
implemented and replaces it with a delivery-status table; every PR updates its
own row and corrects its brief to describe the delivered fork behavior. Do not
edit unrelated labs or architecture documentation.

### Record the approved legacy-data and author-matching behavior

These observable behaviors were clarified before the task breakdown and are
recorded in the delta specs so implementation does not infer them:

1. **Legacy feedback status — resolved:** Existing Azure Table entities
   without a status are presented and treated as `new`; no bulk data migration
   is required. The status spec requires this behavior, and a future status
   update persists the new value.
2. **Author matching — resolved:** Trim surrounding whitespace and then match
   display names exactly and case-sensitively. The author-summary spec requires
   this behavior.

Unknown authors returning a successful zero summary, invalid category/sort
queries returning HTTP 400, and unauthenticated workshop status updates are
confirmed requirements, not open questions.

## Risks / Trade-offs

- **Shared-file merge conflicts** → Implement and merge strictly in the stated
  order; start each next workspace from current `main`, and review its diff for
  accidental changes to predecessor behavior.
- **Legacy Azure entities lack a status property** → Present and treat the
  missing value as `new`, persist a value on a successful transition, and test
  both legacy-shaped and newly written entities without a bulk migration.
- **Names that differ only by case remain distinct summaries** → Preserve the
  approved exact case-sensitive match after trimming and cover it with
  deterministic tests.
- **Client-side list processing grows with data volume** → Keep this bounded
  to the existing workshop use case and existing full-list storage behavior;
  do not imply production-scale query performance.
- **URL query state contains unsupported values** → Let API validation return
  the same actionable 400 contract and surface the error in the board rather
  than silently changing the user's selection.
- **Open workshop access is mistaken for production authorization** → Repeat
  the workshop-only/no-auth boundary in the status UI/API documentation and
  review; do not introduce role-like terminology.
- **A feature silently regresses the paved road** → Keep existing creation,
  vote, persistence, health, and readiness tests and behavior; run focused
  tests, repository checks, existing CI/security gates, and the protected
  deployment evidence path for each PR.

## Migration Plan

1. Human reviewers approve this proposal, specs, design, and task breakdown
   before applying.
2. Implement, validate, review, and merge the four PRs in the staged order.
   Each PR targets `main` and uses the repository's existing CI, security, and
   protected deployment path.
3. In each PR, update the matching feature brief and the delivery-status table
   in `docs/features/README.md`. Demonstrate existing feedback creation and
   voting, and verify the changed feature against the deployed Azure-backed
   application before reporting delivery evidence.
4. If a PR must be rolled back, revert that PR alone through a reviewed PR.
   Query and summary behavior is additive; a status rollback must account for
   the additive Azure entity property without deleting feedback or votes.

No root `DESIGN.md` update, infrastructure migration, new dependency, or
workflow change is expected. If implementation discovers a durable boundary
change, stop and revise the design for human approval rather than silently
changing architecture.
