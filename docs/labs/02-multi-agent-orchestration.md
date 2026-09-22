# Lab 2: Visible multi-agent orchestration

## Outcome

Turn the approved OpenSpec tasks into bounded GitHub work items, delegate
independent units to local agents, and integrate their changes without hiding
ownership or dependencies in terminal history.

## Prerequisites

- The Lab 1 specification pull request is approved.
- The team selected one [comparable feature brief](../features/README.md).
- Each participant can create issues, branches, commits, and pull requests.
- Root `DESIGN.md`, the active change, and applicable `AGENTS.md` files are
  available to every agent.

## 1. Create the task graph

For each implementation unit, create a GitHub issue that records:

- parent issue and OpenSpec change path;
- requirement scenarios implemented;
- owned paths and paths that must not be changed;
- dependencies on other issues or contracts;
- focused validation command;
- required branch, commit, or pull-request receipt.

Use a simple dependency shape that fits the lab:

```text
shared contract
  |-- API behavior and tests
  |-- React behavior and tests
  `-- documentation/evidence
            |
       integration PR
```

Do not assign two active agents the same primary files. Shared-contract work
must stabilize before dependent API and UI tasks consume it.

## 2. Start bounded agent sessions

Give each local agent only the context needed for its issue:

1. issue URL or number;
2. active OpenSpec change;
3. relevant root and co-located instructions;
4. owned paths and prohibited paths;
5. validation and expected receipt.

Ask agents to make reviewable commits. An agent's completion message is useful
handoff context, but the commit, diff, tests, and pull request are the durable
record.

## 3. Monitor and redirect

Keep issue status current while agents work. If an agent discovers a contract
conflict:

- stop overlapping implementation;
- update the owning issue with the conflict;
- resolve the shared contract in one branch;
- rebase or update dependent work only after the contract is reviewed.

Do not silently broaden an issue. Create a follow-up task when work no longer
fits the original ownership or validation contract.

## 4. Integrate in dependency order

Review the smallest dependency first. For each branch:

```powershell
git --no-pager diff main...HEAD
git --no-pager diff --check
```

Run the focused validation named by the issue. Use the repository's package
scripts once application scaffolding is present; inspect `package.json` rather
than inventing a script name.

Open implementation pull requests that link the specification pull request and
close their task issue. Record conflicts and human decisions in the pull
request, not only in chat.

## Expected repository artifacts

- One parent feature issue and bounded task issues.
- Explicit dependency and ownership notes.
- Agent branches or commits with focused tests.
- Implementation pull requests linked to the OpenSpec change.
- Execution receipts recorded on the corresponding issues.

## Verification

```powershell
openspec validate --all
git --no-pager diff --check
gh issue list --state open
gh pr list --state open
```

Verify manually that concurrent issues do not claim the same primary paths and
that every completed issue links a branch, commit, or pull request.

## Recovery

Time-box conflict repair to ten minutes:

1. pause the branch that depends on an unstable contract;
2. keep the branch with the smallest authoritative contract change;
3. restore the instructor's Lab 2 checkpoint if integration remains blocked;
4. retain issue and pull-request links so the orchestration story remains
   reviewable.

If the expected checkpoint is unavailable, use the instructor-provided
recovery reference; do not force-reset an unverified branch.

## Stretch

Delegate an independent documentation or test-only task to a second agent and
show that it can merge without touching the feature implementation paths.
