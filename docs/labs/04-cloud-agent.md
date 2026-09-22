# Lab 4: Continue with a cloud coding agent

## Outcome

Assign a bounded follow-up issue to a cloud coding agent and verify that
repository-owned context is sufficient for a compliant pull request without
the original local session.

## Prerequisites

- The instructor confirmed cloud coding agent availability for the team
  repository.
- The repository contains the approved OpenSpec change, root `DESIGN.md`, and
  applicable `AGENTS.md` files.
- The issue is independent from any unmerged work, or its dependency is
  explicitly linked and available to the cloud agent.

## 1. Prepare the issue

Use a small test, accessibility, validation, or documentation refinement from
the selected feature brief. Include:

- user-visible problem and success criteria;
- exact OpenSpec scenarios;
- owned and prohibited paths;
- architecture and local-instruction links;
- focused validation;
- expected pull-request evidence.

Do not paste the original local-agent conversation into the issue. The goal is
to test whether durable repository context is enough.

## 2. Assign the cloud agent

Use the GitHub interface available in the workshop organization to assign the
issue. Cloud-agent enablement is organization configuration prepared by the
instructor, not a repository script.

Observe whether the agent discovers:

- the root and closest `AGENTS.md`;
- root `DESIGN.md`;
- the active OpenSpec artifacts;
- existing application and test patterns;
- the repository's real validation commands.

## 3. Review the pull request

Check that the agent:

- stayed within owned paths;
- linked the issue and OpenSpec scenarios;
- added or updated tests for changed behavior;
- reported commands it actually ran;
- did not weaken policy, security, or deployment controls.

Request one concrete revision through pull-request review. The revision should
be small enough to complete without changing the issue's scope.

## 4. Verify the revision

Inspect the updated diff and independent checks:

```powershell
gh pr view --web
gh pr checks
git --no-pager diff --check
```

Merge only after the human-requested revision and required checks are complete.

## Expected repository artifacts

- Bounded issue assigned to the cloud coding agent.
- Agent-created pull request linked to the issue and OpenSpec change.
- Human review requesting a specific revision.
- Updated commit and passing independent checks.

## Verification

A teammate who did not run the original local sessions must be able to explain
the change using only the issue, repository instructions, diff, review, and
checks.

## Recovery

If the cloud agent is unavailable or cannot start within five minutes:

1. record the availability limitation;
2. assign the same issue to a fresh local agent session with no copied chat
   history;
3. preserve the issue and review flow;
4. do not describe the fallback as a cloud-agent run.

If the agent repeatedly changes prohibited paths, close its branch without
merging and use the instructor's cloud-agent-ready checkpoint.

## Stretch

Remove redundant prose from the issue while preserving authoritative links,
then show that a fresh agent can still identify every required constraint.
