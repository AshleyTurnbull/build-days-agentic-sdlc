# Lab 2: Multi-agent orchestration in GitHub Copilot App

## Outcome

Use GitHub Copilot App sessions, Plan mode, Fleet, Interactive steering, and
Autopilot to turn approved OpenSpec tasks into visible, bounded work. Integrate
the results in dependency order using GitHub issues, branches, checks, reviews,
and pull requests rather than agent transcripts.

Use the [App prompting pattern](copilot-app-prompting.md) throughout this lab.

## Prerequisites

- The Lab 1 specification pull request is approved.
- The seeded parent feature issue links the approved OpenSpec change.
- The App can create isolated sessions for the team repository.
- Each task can name owned paths, prohibited paths, dependencies, focused
  validation, and durable completion receipts.

## 1. Plan the X/Y/Z workstreams

**Use:** A new isolated session in Plan mode.

**Attach:** `#<parent-feature-issue>`, the approved OpenSpec proposal, specs,
design, tasks, `@DESIGN.md`, and applicable `AGENTS.md` files.

**Prompt:**

> Turn the approved OpenSpec tasks for #<parent-feature-issue> into a GitHub
> issue graph with three bounded goals:
>
> - X: shared contract and API behavior;
> - Y: React user experience, loading, empty, error, and accessibility states;
> - Z: focused tests, documentation, and integration evidence.
>
> Identify dependencies, owned and prohibited paths, focused validation, and
> done receipts for each goal. Shared contracts must stabilize before dependent
> work. Do not implement anything and stop if two goals need the same primary
> file.

**Expect:** A dependency graph that distinguishes serial foundation work from
independent work suitable for Fleet.

**Decide:** Edit the plan until ownership does not overlap. Approve the graph,
not implementation.

## 2. Create durable task issues

**Use:** The same session in Interactive mode with GitHub issue tools.

**Attach:** The approved X/Y/Z plan and parent issue.

**Prompt:**

> Create or prepare three task issues from the approved X/Y/Z plan. Each issue
> must link the parent issue and exact OpenSpec scenarios, state owned and
> prohibited paths, list dependencies, name focused validation, and require
> branch, commit, checks, review, and pull-request receipts. Add the dependency
> order back to the parent issue. Stop before assigning or implementing work.

**Expect:** Reviewable task issues whose contracts are understandable without
the App conversation.

**Decide:** Confirm issue scope and dependency order before starting sessions.

## 3. Stabilize shared work interactively

**Use:** A separate isolated session for goal X in Interactive mode.

**Attach:** `#<x-issue>`, the approved OpenSpec scenarios, shared contracts,
server instructions, and focused tests.

**Prompt:**

> Implement only #<x-issue>. First restate the accepted behavior, dependency
> impact, owned paths, prohibited paths, and validation. Ask me about any
> ambiguity before editing. Keep the contract and API change minimal, run the
> issue's focused validation, and stop with the diff and real results for my
> review.

**Expect:** A focused contract/API diff and passing focused evidence, or an
honest blocker.

**Decide:** Review and integrate the shared foundation before starting
dependent Fleet work.

## 4. Run independent goals with Fleet

**Use:** A parent session with Fleet after X is reviewed.

**Attach:** `#<y-issue>`, `#<z-issue>`, the reviewed X pull request or commit,
applicable client/test instructions, and the approved dependency graph.

**Prompt:**

> Use Fleet to execute #<y-issue> and #<z-issue> in parallel. Give each
> subagent only its issue, owned paths, applicable instructions, and focused
> validation. Do not let either task modify the shared contract or the other
> task's primary files. The parent session should monitor progress, collect
> diffs and validation, and stop for my review before integration or pull
> request creation.

**Expect:** Visible parallel tasks with separate ownership, progress, diffs,
and validation results.

**Decide:** Stop or redirect any subagent that crosses its boundary. Fleet is
successful only if the work remains independently reviewable.

## 5. Practice steering a drifting task

**Use:** The active parent or child session in Interactive mode.

**Attach:** The drifting task issue and changed-file view.

**Prompt:**

> Pause. Re-read #<task-issue> and compare the current diff with its owned and
> prohibited paths. Revert unowned changes, explain why the drift occurred,
> show the remaining diff, and stop for my review before continuing.

**Expect:** A corrected diff and explicit scope explanation.

**Decide:** Continue only when the issue contract and changed files agree.
Create a follow-up issue instead of silently broadening scope.

## 6. Use Autopilot for one bounded goal

**Use:** A new isolated session in Autopilot mode.

**Attach:** A small approved issue such as a focused accessibility,
documentation, or regression-test improvement with no unresolved dependency.

**Prompt:**

> Complete #<bounded-issue> as one autonomous goal. Read the linked OpenSpec
> scenario, root and local instructions, and existing patterns. Stay within the
> issue's owned paths, run its focused validation and required repository
> checks, create a focused pull request, and stop if scope, permissions, or
> acceptance criteria are unclear. Do not merge.

**Expect:** A completed bounded change with a pull request and real validation,
or a clearly stated blocker.

**Decide:** Review the diff and evidence. Autopilot completion is not human
approval.

## 7. Integrate in dependency order

**Use:** The App's diff, review, checks, and pull-request experiences.

**Attach:** The X, Y, and Z issues and pull requests.

**Prompt:**

> Review these pull requests against their issue ownership and OpenSpec
> scenarios. Identify dependency-order violations, conflicting files, missing
> validation, stale checks, or evidence that exists only in an agent summary.
> Recommend the safe integration order and prepare concise execution receipts
> for each issue. Do not merge until I approve the order.

**Expect:** X integrates before dependent work; Y and Z integrate only when
their current checks and reviews are valid.

**Decide:** Humans approve and merge each pull request in dependency order.

## Expected repository artifacts

- Parent feature issue linked to the approved OpenSpec change.
- Three bounded X/Y/Z task issues with non-overlapping ownership.
- An Interactive shared-foundation session.
- A Fleet run for independent goals.
- A separate Autopilot session for one bounded goal.
- Branch, commit, validation, review, and pull-request receipts on GitHub.

## Verification

Ask a new reviewer Chat to reconstruct task assignment, Plan approval, Fleet
delegation, scope correction, Autopilot goal, dependency order, and integration
using only GitHub and repository artifacts. The reviewer must not need session
transcripts.

## Recovery

Stop overlapping work, preserve every issue and session, and ask a new Plan
session to propose the smallest non-overlapping integration path. If repair
cannot complete within ten minutes, use the instructor-provided Lab 2 recovery
checkpoint on a new branch without deleting participant work.

## Stretch

Fork one session before implementation, explore an alternative design in the
fork, compare both results with `/rubber-duck`, and merge only the selected
direction back to the parent session.
