# Lab 4: Continue with a cloud coding agent

## Outcome

Use the GitHub Copilot App and GitHub browser experience to move the
instructor-seeded operational-hardening issue through cloud-agent assignment,
agent pull request, mandatory human revision, updated checks, and a
human-controlled merge decision without relying on earlier chat history.

Cloud-agent capability is license- and organization-dependent. Only an
observable assignment and run prove availability.

## Prerequisites

- Labs 1-3 feature work is merged, or the seeded issue is independent of every
  open branch.
- The instructor preparation result identifies the seeded Lab 4 issue and its
  verified baseline-gap receipt.
- Root `DESIGN.md`, applicable `AGENTS.md`, and the active hardening OpenSpec
  scenarios are present.
- The instructor separately confirmed cloud-agent availability.

Open GitHub Issues in the browser and locate, but do not recreate, the seeded
Lab 4 issue. If it is missing, duplicated, already satisfied, or lacks its
baseline receipt, record a preparation failure rather than inventing work.

## Universal issue path

The seeded issue is independent of all participant feature briefs:

> Add `Cache-Control: no-store` to the existing `/health` and `/ready` JSON
> responses and cover the behavior in `tests/api.test.ts`.

It must link the
[`cloud-agent-workshop-exercise` scenarios](../../openspec/changes/harden-workshop-lab-operations/specs/cloud-agent-workshop-exercise/spec.md),
root [`DESIGN.md`](../../DESIGN.md), server instructions, owned and prohibited
paths, acceptance criteria, focused validation, and expected receipts.

## 1. Review the seeded contract

### Prompt card: contract review

- **Use:** A fresh Copilot App session opened from the seeded issue.
- **Attach:** The issue, linked OpenSpec scenario, root and server-area
  instructions, and baseline-gap receipt.
- **Prompt:** Restate this issue's acceptance criteria, owned paths, prohibited
  paths, focused validation, and required evidence using only attached
  repository context. Confirm that `/health` and both `200` and `503` `/ready`
  responses require `Cache-Control: no-store` while existing JSON bodies and
  status codes remain unchanged. Identify the mandatory human revision but do
  not implement it early.
- **Expect:** A bounded, feature-independent contract with no infrastructure,
  workflow, credential, client, shared-contract, or participant-spec work.
- **Decide:** Assign only if the issue is actionable against the recorded
  baseline and contains enough durable context for a fresh agent.

## 2. Assign and observe the cloud agent

Use the issue's prepared GitHub assignment control in the browser. Record the
assignment event on the issue; do not supply hidden context from Labs 1 or 2.

### Prompt card: cloud-agent assignment

- **Use:** GitHub's cloud coding-agent assignment flow.
- **Attach:** The seeded issue only; its links provide the repository context.
- **Prompt:** Implement this bounded issue. Follow the linked OpenSpec scenario,
  root and closest instructions, owned and prohibited paths, and checked-in
  focused validation. Open a pull request that links the issue and reports
  validation actually run.
- **Expect:** An observable agent run and a pull request limited to
  `src/server/app.ts` and `tests/api.test.ts`.
- **Decide:** If no assignment control is visible or no run starts within five
  minutes, use Recovery and label the result as a local App fallback.

## 3. Review the initial pull request

### Prompt card: initial PR review

- **Use:** Copilot App review from the agent-created pull request.
- **Attach:** The seeded issue, pull-request diff, commits, checks, and linked
  instructions.
- **Prompt:** Review this pull request against the seeded contract. Confirm it
  links and closes the issue, changes only owned paths, preserves existing
  health/readiness bodies and statuses, adds focused tests, and reports
  validation actually run. Identify policy, security, or deployment weakening.
  Do not approve yet.
- **Expect:** A review grounded in the diff and current checks.
- **Decide:** Close without merge if prohibited paths are repeatedly changed.
  Otherwise continue to the required human revision.

## 4. Request the mandatory bounded revision

Submit a visible GitHub pull-request review requesting changes. Use this exact
revision:

> Add a focused `HEAD /health` regression assertion proving the no-store
> header is present and the response has no body. Keep the change within the
> issue's owned paths and rerun the checked-in focused API validation.

### Prompt card: revision response

- **Use:** The cloud-agent continuation control on the pull request.
- **Attach:** The human review thread and current pull-request diff.
- **Prompt:** Address only the requested `HEAD /health` regression assertion,
  keep changes within the issue's owned paths, run the checked-in focused API
  validation, and update the pull request with the result. Do not broaden the
  issue.
- **Expect:** A newer commit, a resolved review conversation, and checks for
  that newer commit.
- **Decide:** Do not approve until the revision is visible in the diff and the
  updated focused and required checks pass.

## 5. Make the human merge decision

### Prompt card: final evidence review

- **Use:** A fresh Copilot App review session and the GitHub pull-request page.
- **Attach:** The issue, final diff, commit list, review thread, and updated
  check results.
- **Prompt:** Verify coverage for `GET /health`, successful `GET /ready`,
  unavailable `GET /ready`, and `HEAD /health`; confirm the requested revision
  is in a newer commit; and confirm checks apply to the current head. Summarize
  evidence and remaining risks. Do not approve or merge.
- **Expect:** A current-head evidence summary with no reliance on the original
  agent conversation.
- **Decide:** A human approves and merges, or requests another bounded fix.
  Record the merge commit and final checks on the seeded issue.

## Expected repository artifacts

- One preparation-seeded universal issue with a baseline-gap receipt.
- Observable cloud-agent assignment and agent-created pull request.
- Human review requesting the specified bounded revision.
- Updated agent commit, resolved review, and current-head checks.
- Human approval and merge receipt.

## Verification

A teammate who did not run earlier labs must be able to reconstruct the entire
issue-to-revision-to-merge path from the issue, repository instructions,
OpenSpec link, diff, reviews, checks, and merge commit.

## Recovery

If the cloud agent is unavailable or cannot start within five minutes:

### Prompt card: fresh App fallback

- **Use:** A new Copilot App session with no copied chat history.
- **Attach:** The same seeded issue and its repository links.
- **Prompt:** Implement this issue from durable repository context only. Respect
  owned and prohibited paths, run the checked-in focused validation, and open
  or prepare the same reviewable pull-request evidence. Do not use hidden
  context from another session.
- **Expect:** The same bounded implementation and evidence, explicitly labeled
  as a local Copilot App fallback rather than a cloud-agent run.
- **Decide:** Preserve the mandatory human review and merge gates. If repeated
  prohibited-path changes continue, close the pull request and use the
  instructor-published `lab4-start` checkpoint without force-pushing the agent
  branch.

## Stretch

Remove redundant issue prose while preserving authoritative links, ownership,
acceptance criteria, validation, and evidence. Ask another fresh App session to
restate the complete contract from the shortened issue.
