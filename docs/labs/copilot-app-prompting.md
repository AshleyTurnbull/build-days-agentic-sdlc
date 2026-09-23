# GitHub Copilot App prompting pattern

The participant labs use the GitHub Copilot App as the primary interface. You
will describe outcomes, attach durable repository context, review plans and
diffs, steer sessions, and inspect GitHub evidence. You do not need to copy
terminal commands from the lab.

See GitHub's current guidance for
[agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
and
[App slash commands](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands).
Type `/` in the App to see the commands available in your current context.

## Choose the right App experience

| Experience | Use it for | Human responsibility |
|---|---|---|
| Chat | Explore an issue, architecture, or alternative without creating a branch | Decide whether the idea should become planned work |
| Plan | Significant or multi-file changes | Review scope, dependencies, files, tests, and risks before approving |
| Interactive | Ambiguous work or a task that needs active steering | Answer questions and redirect scope as the work develops |
| Fleet | Independent tasks with non-overlapping primary files | Approve the decomposition and monitor every delegated task |
| Autopilot | One approved, bounded, testable goal | Review the final diff, validation, and pull request |
| Separate session | A separate issue, bug, experiment, or ownership boundary | Keep the session tied to one durable work item |
| Forked session | Explore an alternative from the current context | Compare both results and merge only the selected direction |

Fleet is not a shortcut for unclear requirements. Stabilize shared contracts
and dependencies before running parallel work.

## Prompt-card format

Every lab step uses the same five fields.

### Use

The App surface, session mode, or review experience to select.

### Attach

Use `#` for the relevant GitHub issue and `@` for repository files. Attach only
the smallest authoritative context needed for the task.

### Prompt

Copy the prompt, replace every `<placeholder>`, and adapt only the
team-specific details.

### Expect

The plan, question, diff, validation, pull request, or evidence that should
appear before the team continues.

### Decide

The human review, approval, redirection, or stop decision. A prompt is never
approval to merge, bypass policy, or deploy.

## Reusable scope-correction prompt

**Use:** The active session in Interactive mode.

**Attach:** The owning issue and the files the agent changed.

**Prompt:**

> Pause implementation. Re-read #<task-issue> and compare the current changes
> with its owned and prohibited paths. Revert changes outside the approved
> scope, explain any remaining overlap or ambiguity, and stop for my review
> before continuing.

**Expect:** A smaller diff, a clear explanation of scope, and no hidden
continuation.

**Decide:** Continue only if ownership is unambiguous. Otherwise split or
serialize the work in GitHub.

## Reusable validation prompt

**Use:** The implementation session after the diff is ready.

**Attach:** The task issue, applicable `AGENTS.md`, and changed files.

**Prompt:**

> Validate this change using the repository's checked-in instructions and the
> focused validation named in #<task-issue>. Run the smallest relevant checks
> first, then any required repository checks. Do not weaken tests or skip a
> failing gate. Summarize each command you actually ran, its result, and any
> remaining blocker.

**Expect:** Real tool output and an accurate distinction between passed,
failed, pending, and unavailable evidence.

**Decide:** Do not open or approve the pull request until failures caused by
the change are resolved.

## Reusable receipt prompt

**Use:** The completed implementation session.

**Attach:** The task issue and resulting pull request.

**Prompt:**

> Prepare a concise execution receipt for #<task-issue>. Include the session,
> branch, commit, changed scope, validation actually run, pull request,
> dependency state, and any follow-up issue. Post or propose the receipt in the
> durable GitHub work item; do not use the conversation transcript as evidence.

**Expect:** A reviewer can reconstruct the work from GitHub and the repository.

**Decide:** Correct missing or overstated evidence before integration.

## Example: outcome-first GH-AW prompt

**Use:** A new Plan mode session.

**Attach:** The repository's workflow instructions, existing GH-AW references,
and the pinned workshop creation guide at
<https://raw.githubusercontent.com/github/gh-aw/v0.88.8/create.md>.

**Prompt:**

> Create a workflow for GitHub Agentic Workflows using the attached creation
> guide. The purpose of the workflow is to triage new issues: label them by type
> and priority, identify likely duplicates, ask clarifying questions when the
> description is unclear, and route them to the right team members. Before
> creating files, propose the trigger, permissions, tools, safe outputs, and
> guardrails for human review. Inspect `.github/workflows/openspec.yml`, verify
> the available GH-AW compiler, and install or converge it to the repository's
> exact `v0.88.8` pin when necessary. Do not use `main` or `latest`.

**Expect:** A workflow design before generated files or permissions are added.

**Decide:** Approve only the minimum permissions and safe outputs needed for
the agreed triage behavior. The concise outcome prompt starts the design; it
does not pre-approve workflow authority.
