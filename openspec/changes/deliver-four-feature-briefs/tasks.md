# Tasks

## 1. Specification gate and isolated workspaces

- [x] 1.1 Obtain human approval and merge this OpenSpec proposal, four delta specs, design, and tasks into `AshleyTurnbull/build-days-agentic-sdlc` `main`; verify the approved specs record workshop-only status access, HTTP 400 query validation, zero-valued unknown-author summaries, legacy status defaulting to `new`, and trimmed exact case-sensitive author matching.
- [ ] 1.2 Create four isolated implementation workspaces for category filtering, board sorting, author summary, and feedback status; verify each has a separate worktree and branch targeting the personal fork's `main`, and keep only the next scheduled feature active.
- [ ] 1.3 Before each feature starts, refresh its workspace from the latest `main`; verify shared source, test, feature-index, and OpenSpec task paths are not being edited concurrently and that the feature branch is not stacked on another feature branch.

## 2. Category-filtering implementation PR

- [x] 2.1 Extend the shared query contract and `/api/feedback` handling for the supported categories and all-categories default; return actionable HTTP 400 errors for unsupported values and verify supported/unsupported cases with `npm test -- tests/contracts.test.ts tests/api.test.ts`.
- [x] 2.2 Add the accessible category control, selected URL state, matching-item rendering, empty state, and clear-filter behavior; verify the current full list is restored with `npm test -- tests/App.test.tsx`.
- [x] 2.3 Update `docs/features/category-filtering.md` to describe delivered behavior and replace the false all-unimplemented statement in `docs/features/README.md` with a four-feature delivery table; verify the table marks category filtering delivered and the other briefs accurately pending.
- [ ] 2.4 Complete this as one independent PR targeting `main`; check off only its tasks in this change, pass `npm run check`, `openspec validate --all`, and `git --no-pager diff --check`, satisfy the configured CI and security checks, obtain human review, and capture protected Azure-backed evidence for filtering plus unchanged creation, voting, `/health`, and `/ready` behavior before merge.

## 3. Board-sorting implementation PR

- [x] 3.1 Add validated `newest` and `most-votes` API ordering with the approved deterministic tie-breakers and category/sort composition; verify both modes, ties, vote updates, and actionable HTTP 400 handling with `npm test -- tests/contracts.test.ts tests/api.test.ts`.
- [x] 3.2 Add an accessible sort control whose selected state survives refresh through the page URL and whose visible order updates after voting; verify control state, refresh behavior, and reordering with `npm test -- tests/App.test.tsx`.
- [x] 3.3 Update `docs/features/board-sorting.md` and the board-sorting row in `docs/features/README.md`; verify the index keeps the other three statuses accurate and this brief matches the approved tie-breakers.
- [ ] 3.4 After PR 2's workspace is refreshed from the merged category-filtering PR, complete one independent PR targeting `main`; check off only its tasks, pass `npm run check`, `openspec validate --all`, and `git --no-pager diff --check`, satisfy configured CI and security checks, obtain human review, and capture protected Azure-backed ordering evidence plus unchanged creation, voting, `/health`, and `/ready` behavior before merge.

## 4. Author-summary implementation PR

- [ ] 4.1 Add the summary query using trimmed, exact case-sensitive display-name matching; return only the display name, feedback count, and total votes, with HTTP 200 and zero totals for an unknown name; verify aggregation, new feedback/votes, unknown names, matching, and response minimization with `npm test -- tests/contracts.test.ts tests/api.test.ts`.
- [ ] 4.2 Add the accessible summary interaction and loading, zero-result, success, and actionable error states; verify the user-facing summary states with `npm test -- tests/App.test.tsx`.
- [ ] 4.3 Update `docs/features/author-summary.md` and the author-summary row in `docs/features/README.md`; verify the index keeps the other three statuses accurate and no profile or authentication claim is introduced.
- [ ] 4.4 After PR 3's workspace is refreshed from the merged sorting PR, complete one independent PR targeting `main`; check off only its tasks, pass `npm run check`, `openspec validate --all`, and `git --no-pager diff --check`, satisfy configured CI and security checks, obtain human review, and capture protected Azure-backed summary evidence plus unchanged creation, voting, `/health`, and `/ready` behavior before merge.

## 5. Feedback-status implementation PR

- [ ] 5.1 Extend the shared feedback contract and both storage adapters so new feedback is `new`, legacy Azure entities without a status are presented as `new` without bulk migration, and a successful status update persists without changing votes or other fields; verify new/legacy records, transition persistence, and vote preservation with `npm test -- tests/contracts.test.ts tests/storage.test.ts`.
- [ ] 5.2 Add a status API and accessible board control that allow any user with app access to advance only one step, require no production authentication, and return actionable errors for invalid transitions or unknown IDs; verify status, error, no-data-creation, and vote-preservation behavior with `npm test -- tests/api.test.ts tests/App.test.tsx`.
- [ ] 5.3 Update `docs/features/feedback-status.md` to state the workshop-only/no-production-auth boundary and the approved legacy behavior; update its row in `docs/features/README.md` and verify the index no longer says all four briefs remain unimplemented.
- [ ] 5.4 After PR 4's workspace is refreshed from the merged author-summary PR, complete one independent PR targeting `main`; check off only its tasks, pass `npm run check`, `openspec validate --all`, and `git --no-pager diff --check`, satisfy configured CI and security checks, obtain human review, and capture protected Azure-backed status persistence evidence plus unchanged creation, voting, `/health`, and `/ready` behavior before merge.

## 6. Final delivery evidence

- [ ] 6.1 Verify the four implementation PRs are independently merged to the personal fork's `main` in the staged order and each links its approved scenarios, focused test results, full checks, review, and protected deployment evidence; confirm no work or PR targets `VeVarunSharma/build-days-agentic-sdlc`.
- [ ] 6.2 Review `docs/features/README.md` and all four briefs against the delivered behavior; verify none claims all four remain unimplemented and no unrelated lab, infrastructure, workflow, or architecture files changed.
