# Lab 4: Continue with a cloud coding agent

## Outcome

Run the instructor-seeded, feature-independent operational-hardening issue
through assignment, agent pull request, human-requested revision, updated
checks, human approval, and merge. The issue and repository must provide enough
context without any Lab 2 transcript.

Cloud-agent capability is license- and organization-dependent. A seeded issue
does not prove the feature is available; only a successful assignment and
observable agent run do.

## Prerequisites

- Labs 1-3 feature work is merged or the seeded issue is otherwise independent
  of every open branch.
- The instructor preparation result identifies the Lab 4 seeded issue and
  includes a verified baseline-gap receipt.
- The repository contains root `DESIGN.md`, applicable `AGENTS.md`, and the
  active hardening OpenSpec scenarios.
- The instructor has separately confirmed cloud-agent availability.

Locate, but do not recreate, the seeded issue:

```powershell
gh issue list --state open --limit 100
$Base = gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name'
$CloudIssue = 0 # replace with the seeded Lab 4 issue number
if ($CloudIssue -le 0) { throw "Set CloudIssue to the seeded Lab 4 issue." }
gh issue view $CloudIssue --comments
```

If the issue is missing, duplicated, closed as already satisfied, or lacks a
baseline receipt, stop and record a repository-preparation failure. Do not
invent a participant-feature follow-up.

## Universal issue path

The seeded issue is independent of all four feature briefs:

> Add `Cache-Control: no-store` to the existing `/health` and `/ready` JSON
> responses and cover the behavior in `tests/api.test.ts`.

Its contract must link:

- the `cloud-agent-workshop-exercise` scenarios in
  [`harden-workshop-lab-operations`](../../openspec/changes/harden-workshop-lab-operations/specs/cloud-agent-workshop-exercise/spec.md);
- root [`DESIGN.md`](../../DESIGN.md) and server-area instructions;
- owned paths: `src/server/app.ts` and `tests/api.test.ts`;
- prohibited paths: `src/client/**`, `src/shared/**`, `infra/**`,
  `.github/workflows/**`, and participant OpenSpec changes;
- acceptance criteria for both healthy and not-ready responses;
- focused validation: `npm test -- tests/api.test.ts`;
- expected issue, branch, commit, test, review, check, and pull-request receipts.

Preparation must verify that the selected template revision does not already
return the required policy. If the baseline already satisfies it, the issue is
not actionable and the instructor must seed a newly verified replacement; the
lab must not pretend work occurred.

## 1. Review the seeded contract

Confirm the issue states:

- `/health` returns `Cache-Control: no-store`;
- `/ready` returns it for both `200` and `503` responses;
- existing JSON body/status behavior remains unchanged;
- focused tests cover the policy;
- no feature, infrastructure, workflow, or credential work is allowed; and
- a human reviewer must request the bounded revision below before approval.

Do not paste local-agent conversation into the issue.

## 2. Assign the cloud coding agent

Use the repository's GitHub issue assignment control prepared by the
instructor. Record the assignment event on the issue.

Observe, without supplying hidden chat context, whether the agent discovers the
linked OpenSpec scenario, root and closest instructions, existing API patterns,
owned/prohibited paths, and the real focused command.

If no cloud-agent assignment control is visible or no run begins within five
minutes, follow Recovery. Do not claim external availability based on
documentation, a label, or an instructor expectation.

## 3. Review the initial pull request

Before requesting changes, capture:

```powershell
gh pr view <pr-number> --json url,headRefName,commits,files,reviews,statusCheckRollup
gh pr checks <pr-number>
```

Confirm the initial pull request:

- links and closes the seeded issue;
- changes only owned paths;
- preserves existing health/readiness bodies and status codes;
- includes focused tests and reports commands actually run; and
- does not weaken policy, security, or deployment controls.

## 4. Request the mandatory human revision

Submit a pull-request review requesting this bounded, feature-independent
revision:

> Add a focused `HEAD /health` regression assertion proving the no-store
> header is present and the response has no body. Keep the change within the
> issue's owned paths and rerun `npm test -- tests/api.test.ts`.

The request must be visible as a human review, not only as an issue comment or
agent prompt. Do not approve before the revision.

## 5. Verify revision and merge evidence

After the agent updates the pull request:

```powershell
gh pr view <pr-number> --json url,commits,files,reviews,statusCheckRollup
gh pr checks <pr-number>
gh pr checkout <pr-number>
git --no-pager diff --check "$Base...HEAD"
```

Verify that:

- a newer commit addresses the human review;
- `GET /health`, successful `GET /ready`, unavailable `GET /ready`, and
  `HEAD /health` are covered;
- focused and required checks are updated for the new commit;
- the review conversation shows the requested revision was resolved; and
- a human, not the agent, approves and merges.

Record the merge commit and final checks on the seeded issue.

## Expected repository artifacts

- One preparation-seeded universal issue with a baseline-gap receipt.
- Observable cloud-agent assignment and agent-created pull request.
- Human review requesting the specified bounded revision.
- Updated agent commit and checks.
- Human approval and merge receipt.

## Verification

A teammate who did not run Labs 1 or 2 must be able to explain the complete
issue-to-revision-to-merge path using only the issue, repository instructions,
OpenSpec link, diff, reviews, checks, and merge commit.

## Recovery

If the cloud agent is unavailable or cannot start within five minutes:

1. comment on the seeded issue with the exact unavailable or blocked state;
2. assign the same issue to a fresh local Copilot App or CLI session with no
   copied chat history;
3. preserve the same human review and merge gates;
4. label the receipt as a local fallback, not a cloud-agent run.

If the agent repeatedly changes prohibited paths, close its pull request
without merging and use the instructor-published `lab4-start` checkpoint.
Do not force-push the agent branch into compliance.

## Stretch

Remove redundant issue prose while preserving authoritative links, ownership,
acceptance criteria, validation, and evidence, then test whether a fresh local
session can restate the complete contract.
