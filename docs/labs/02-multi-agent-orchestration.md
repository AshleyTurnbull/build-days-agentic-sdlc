# Lab 2: Visible multi-agent orchestration

## Outcome

Turn approved OpenSpec tasks into bounded GitHub work, run at least two
non-overlapping tasks through Copilot App and Copilot CLI, intervene when
needed, and integrate in dependency order using GitHub receipts rather than
agent transcripts.

## Prerequisites

- The Lab 1 specification pull request is approved.
- The instructor-seeded parent feature issue is open.
- The active change has approved scenarios and `tasks.md`.
- `gh auth status`, `copilot --version`, and `git status` succeed.
- Each participant can create issues, branches, commits, and pull requests.

```powershell
gh auth status
copilot --version
git --no-pager status --short
$Base = gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name'
$ParentIssue = 0 # replace with the seeded parent feature issue number
if ($ParentIssue -le 0) { throw "Set ParentIssue to the seeded parent issue." }
gh issue view $ParentIssue --comments
```

Repository preparation seeds the parent work item. Participants own task
decomposition, assignment, and integration; do not wait for a setup script to
invent those decisions.

## 1. Build a testable task graph

Select at least two approved `tasks.md` items. A safe shape is one authoritative
contract task followed by independent API and UI consumers, or two independent
test/documentation tasks. Do not assign two active tasks the same primary file.

Create each task issue with this contract:

```markdown
Parent: #<parent>
OpenSpec change: openspec/changes/<change-name>/
Scenarios: <requirement and scenario names>

Owned paths:
- <path or narrow glob>

Prohibited paths:
- <path or narrow glob>

Depends on:
- #<issue>, or "none"

Focused validation:
- `<exact command>`

Done receipts:
- branch
- commit SHA
- focused test output
- pull request
```

Use `gh issue create --web` or your repository's issue UI so the contract can
be reviewed before assignment. Then add the task links and dependency order to
the seeded parent issue:

```powershell
gh issue view $ParentIssue --web
gh issue list --state open --limit 50
```

Stop if ownership overlaps. Split by stable contracts or serialize the tasks.

## 2. Run one task in Copilot App

From the repository root:

```powershell
copilot app
```

In Copilot App:

1. create a new session for this repository and select an isolated worktree;
2. name it `issue-<number>-<short-name>`;
3. paste the task issue URL and this instruction:

   ```text
   Implement only this issue. Read root DESIGN.md, root and closest AGENTS.md,
   and the linked OpenSpec artifacts first. Stay inside owned paths, do not
   touch prohibited paths, run the named focused validation, and stop with the
   branch, commit, test, and pull-request receipts.
   ```

4. before accepting edits, inspect the session's changed-file list and task
   progress;
5. use the App's message box to redirect scope, or Stop if the agent continues
   outside the issue contract.

Test the intervention path once with a harmless clarification:

```text
Pause. Re-read issue #<number>. Do not change <prohibited-path>. Revert any
unowned edit, show the remaining diff, and continue only in the owned paths.
```

The session transcript is not a completion receipt.

## 3. Run one task in Copilot CLI

Create a separate worktree so App and CLI tasks cannot overwrite each other:

```powershell
$TaskIssue = 0 # replace with the CLI task issue number
if ($TaskIssue -le 0) { throw "Set TaskIssue to the CLI task issue." }
$TaskBranch = "task/$TaskIssue-cli"
$TaskPath = Join-Path (Split-Path $PWD -Parent) "issue-$TaskIssue-cli"
git worktree add $TaskPath -b $TaskBranch $Base
gh issue view $TaskIssue --comments
copilot -C $TaskPath --name "issue-$TaskIssue-cli" --mode interactive -i `
  "Implement only GitHub issue #$TaskIssue. Read its linked OpenSpec artifacts, DESIGN.md, and applicable AGENTS.md files. Respect owned and prohibited paths. Run the issue's focused validation and finish with branch, commit, test, and PR receipts."
```

During the interactive session:

- use `/tasks` to inspect active agent work;
- use `/diff` to inspect changes;
- send the same `Pause. Re-read issue...` redirect if scope drifts;
- press `Ctrl+C` to stop an unsafe command or stop the session if redirection
  fails.

After the session exits, independently inspect its work:

```powershell
git -C $TaskPath --no-pager status --short
git -C $TaskPath --no-pager diff --check
git -C $TaskPath --no-pager diff "$Base...HEAD"
```

Do not use `--allow-all`, `--yolo`, or broad path grants for this lab.

## 4. Monitor and redirect both paths

For every active task:

- compare changed files with owned/prohibited paths;
- confirm dependencies are still valid;
- add scope decisions or blockers to the task issue;
- stop overlapping work before integration;
- create a follow-up issue rather than silently broadening the task.

If a shared contract changes, pause consumers, review and merge the contract
first, then update dependent branches from the reviewed commit.

## 5. Integrate in dependency order

Review the smallest authoritative dependency first:

```powershell
git --no-pager diff "$Base...HEAD"
git --no-pager diff --check
```

Run the exact focused command recorded on the issue. Open a pull request that
links the task issue, seeded parent issue, specification pull request, and
OpenSpec scenarios. Do not merge a dependent pull request before its contract
dependency is reviewed.

Post a durable receipt on each completed task:

```powershell
$Receipt = @"
Execution receipt
- Branch: <branch>
- Commit: <full-sha>
- Focused validation: `<command>` — PASS
- Pull request: <url>
- Dependency state: <issue/PR links>
"@
gh issue comment $TaskIssue --body $Receipt
```

Replace every placeholder and report a failure accurately. A model's summary
does not turn an unrun test into `PASS`.

## Expected repository artifacts

- The seeded parent issue linked to the approved OpenSpec change.
- At least two participant-created bounded task issues.
- Non-overlapping ownership and explicit dependency notes.
- One Copilot App session and one Copilot CLI session on isolated worktrees.
- Branch, commit, focused-test, and pull-request receipts on each task issue.

## Verification

```powershell
openspec validate --all
git --no-pager diff --check
gh issue view $ParentIssue --comments
gh pr list --state all --limit 50
git worktree list
```

A teammate without transcript access must be able to reconstruct assignment,
intervention, dependency order, validation, and integration from GitHub and the
repository alone.

## Recovery

Time-box conflict repair to ten minutes:

1. stop the task that depends on an unstable contract;
2. preserve both issue receipts and branches;
3. keep the smallest authoritative contract change;
4. update dependent work only after that contract is reviewed;
5. if still blocked, use the instructor-published Lab 2 checkpoint on a new
   recovery branch.

Do not force-reset or delete participant branches.

## Stretch

Add a third test-only or documentation-only task and prove it can merge without
touching either feature implementation worktree.
