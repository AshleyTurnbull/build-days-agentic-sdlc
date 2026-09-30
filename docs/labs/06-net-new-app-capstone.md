# Optional lab: App-first net-new application capstone

## Outcome

In 90-120 minutes, create and deploy one bounded net-new application through a
reviewed OpenSpec contract, ticket-driven App sessions, independent GitHub
Actions evidence, AVM/OIDC deployment, a real bug-fix loop, one safe GH-AW
output, and a transcript-free evidence reconstruction.

## Prerequisites

- The guided workshop is complete or the instructor has approved this
  extension.
- The team repository's required GitHub and Azure controls passed readiness.
- Team members can use Chat, Plan mode, Fleet, separate sessions, Autopilot,
  issues, pull requests, Actions, deployments, and the approved GH-AW tooling.
- The protected Azure environment, OIDC identity, and assigned resource group
  are available.
- The team has selected one
  [capstone brief](../capstone/README.md).

The App is the participant interface. Ask the App to run repository-owned
validation when needed; do not replace independent checks with agent claims.

## 1. Select and clarify the minimum

### Prompt card: clarify the brief

**Use:** Chat in a new repository session.

**Attach:** The selected brief, root `DESIGN.md`, root `AGENTS.md`,
`capstone/AGENTS.md`, and the active capstone OpenSpec requirement.

**Prompt:** Identify the minimum user outcome, constraints, unknowns, and
evidence needed to finish this brief within 90-120 minutes. Do not propose an
implementation yet.

**Expect:** A concise outcome, assumptions, risk list, and questions resolved
from attached repository sources.

**Decide:** Confirm one entity and one workflow. Defer every optional behavior
to non-goals or stretch.

Create a parent GitHub issue that links the selected brief and states the time
box, application directory, minimum outcome, and evidence chain.

## 2. Specify intent before implementation

### Prompt card: draft the capstone change

**Use:** Plan mode in the parent session.

**Attach:** The parent issue, selected brief, active capstone requirement,
`DESIGN.md`, and applicable agent guides.

**Prompt:** Propose a reviewable OpenSpec change for the minimum outcome. Include
observable scenarios, solution-neutral design decisions, bounded tasks,
non-goals, recovery, and validation. Do not implement.

**Expect:** Proposal, capability scenarios, design, and tasks that cover the
API, accessible UI states, persistence, liveness/readiness, tests, CI/CD,
AVM/OIDC deployment, defect loop, GH-AW, and evidence.

**Decide:** Approve only when requirements are observable, architecture choices
are explicit, and the task list fits the time box. Keep implementation paused
until the specification review is complete.

## 3. Build the ticket and dependency graph

### Prompt card: define ownership

**Use:** Plan mode in the parent session.

**Attach:** Approved OpenSpec artifacts and the parent issue.

**Prompt:** Translate approved tasks into bounded GitHub issues. For each issue,
name owned paths, prohibited paths, dependencies, focused validation, and
branch, commit, check, and pull-request receipts.

**Expect:** A graph with one owner for shared contracts and manifests, at least
two independent tasks, and explicit integration order.

**Decide:** Reject overlapping primary paths. Review shared dependencies before
allowing parallel execution.

Fleet is appropriate only after this dependency and ownership review. If the
graph has no independent ready tasks, use separate sessions in sequence rather
than manufacturing parallel work.

## 4. Execute independent work visibly

### Prompt card: start Fleet

**Use:** Fleet from the reviewed parent plan.

**Attach:** Only the independent ready task issues and their approved
specification scenarios.

**Prompt:** Execute these independent tickets within their owned paths. Run
each ticket's focused validation and stop with its durable receipts.

**Expect:** Isolated work, non-overlapping changed files, focused test results,
and separate pull requests linked to their issues.

**Decide:** Stop or redirect any task that touches a prohibited path, changes a
shared dependency without ownership, or claims an unrun check.

### Prompt card: run a dependent ticket

**Use:** A separate App session for one ticket.

**Attach:** The ticket, reviewed dependency pull request, and relevant OpenSpec
scenarios.

**Prompt:** Implement only this ticket against the reviewed dependency. Preserve
the approved contract and return the focused validation and pull-request
receipts.

**Expect:** A narrow diff in owned paths with an explicit dependency reference.

**Decide:** Integrate contracts and other authoritative dependencies before
their consumers. Keep each ticket in its own session.

## 5. Use Autopilot for one bounded goal

### Prompt card: bounded Autopilot

**Use:** Autopilot in a fresh isolated session.

**Attach:** One approved ticket with explicit acceptance criteria, owned paths,
prohibited paths, and focused validation.

**Prompt:** Complete this single approved goal, validate it, and prepare its
pull request without broadening scope.

**Expect:** End-to-end execution of only that goal, with a reviewable diff and
honest validation receipts.

**Decide:** Review the diff, checks, permissions, and pull request. Do not use
Autopilot for unresolved architecture, overlapping work, or protected approval
decisions.

## 6. Establish independent CI and delivery

### Prompt card: create capstone CI/CD

**Use:** Plan mode followed by an isolated implementation session.

**Attach:** Approved delivery tasks, application validation contract, root
design, and repository workflow guidance.

**Prompt:** Add capstone-scoped GitHub Actions CI/CD that validates the app,
builds reproducibly, preserves least privilege, and publishes actionable
evidence. Keep existing workshop workflows unchanged.

**Expect:** Capstone-named workflow changes, independent checks, clear failure
output, and links from pull requests to runs.

**Decide:** Require independent passing CI before integration. Reject broad
write permissions, hidden validation, or workflow claims without a successful
run.

### Prompt card: design AVM/OIDC deployment

**Use:** Plan mode.

**Attach:** Approved infrastructure task, root design, infrastructure guidance,
protected environment contract, and the team's Azure scope.

**Prompt:** Propose the smallest AVM-first Azure deployment for this app using
GitHub OIDC, protected-environment approval, managed identity where supported,
and health, readiness, and functional verification.

**Expect:** Pinned AVM composition, documented module gaps, least-privilege
identity, infrastructure validation, deployment evidence, and probe behavior.

**Decide:** Approve only within the assigned resource group and existing trust
boundary. Do not add secrets or broaden federation.

### Prompt card: deploy and verify

**Use:** An isolated implementation session, then the GitHub Actions and
deployment views.

**Attach:** Approved deployment design, delivery ticket, and reviewed
application pull request.

**Prompt:** Implement the approved deployment path and produce evidence for the
deployed commit, URL, liveness, dependency-aware readiness, and one functional
workflow.

**Expect:** Infrastructure validation, protected deployment, and independently
inspectable health, readiness, and smoke-test results.

**Decide:** Treat missing or failed platform evidence as incomplete. Do not
substitute a session summary for a workflow or deployment receipt.

## 7. Run a real bug-ticket loop

Exercise the brief's defect only after the minimum workflow is integrated or
deployed. Capture observable reproduction evidence before asking for a fix.

### Prompt card: write the bug ticket

**Use:** Chat in a fresh triage session.

**Attach:** Reproduction evidence, relevant scenario, focused test location,
and the brief's bug description.

**Prompt:** Draft a bounded bug issue with expected and actual behavior,
reproduction, owned and prohibited paths, and independent validation.

**Expect:** A ticket another session can execute without the original
conversation.

**Decide:** File it only when the failure is reproducible and the scope is
narrow. Link it to the parent issue.

### Prompt card: fix without hidden context

**Use:** A new isolated session or bounded Autopilot session.

**Attach:** Only the bug issue and its linked repository evidence.

**Prompt:** Reproduce and fix this bug within its ownership boundary. Add the
smallest regression test and prepare a linked pull request.

**Expect:** Failing-before and passing-after evidence, a focused diff, and
independent checks.

**Decide:** Merge only after a human reviews the regression test, changed
behavior, and CI result.

## 8. Author one narrowly safe GH-AW

### Prompt card: create operational feedback

**Use:** Plan mode with the approved GH-AW creation guide.

**Attach:** Real capstone issue, pull-request, check, security, deployment, and
bug-fix evidence.

**Prompt:** Propose a release-readiness or bug-triage GH-AW that reads this
evidence and produces exactly one narrow safe output.

**Expect:** A reviewable trigger, read scope, evidence criteria, one safe
output, and explicit prohibition of approval, merge, policy bypass, workflow
editing, and deployment authority.

**Decide:** Approve one output only, such as one evidence comment or one
follow-up issue. Reject any authority that can change protected delivery state.

### Prompt card: validate the workflow

**Use:** An isolated implementation session and the workflow run view.

**Attach:** Approved GH-AW design, source/lock guidance, and evidence target.

**Prompt:** Create and validate the approved workflow, keep generated files
reproducible, and run it against the real capstone evidence.

**Expect:** Source and generated artifacts in sync, a real run receipt, and
exactly one safe output that identifies complete or missing evidence honestly.

**Decide:** Label unavailable tooling as a fallback. Never present a manual
summary as a GH-AW run.

## 9. Reconstruct evidence without transcripts

### Prompt card: perform the handoff review

**Use:** Chat in a new session with no prior capstone conversation.

**Attach:** The parent issue only.

**Prompt:** Reconstruct the delivery story by following repository and GitHub
links. Report the first missing or contradictory receipt; do not infer
success.

**Expect:** A trace through OpenSpec, task issues, pull requests, checks,
deployment, live verification, bug fix, and GH-AW output.

**Decide:** Repair missing links or file a follow-up issue. The capstone is
complete only when the reviewer needs no transcript or verbal explanation.

## Expected repository artifacts

- One net-new application under `capstone/<app-name>/` with local guidance.
- Approved capstone OpenSpec proposal, scenarios, design, and tasks.
- Parent and bounded task issues with non-overlapping ownership.
- Separate session receipts and dependency-ordered pull requests.
- Focused unit, API, accessible UI, persistence, and smoke tests.
- Capstone-scoped GitHub Actions CI/CD.
- Pinned AVM infrastructure, protected OIDC deployment, and managed identity
  where supported.
- Deployed URL with liveness, readiness, and functional evidence.
- Real bug issue, regression test, fix pull request, and passing checks.
- GH-AW source/generated artifacts, run receipt, and one safe output.
- Final transcript-free evidence reconstruction.

## Verification

Ask a fresh review session to inspect the parent issue and verify:

- every approved scenario maps to focused evidence;
- changed paths respect capstone and task ownership;
- required checks and security results are real and passing;
- the deployed commit matches the reviewed change;
- liveness, readiness, persistence, and the primary workflow are observable;
- the defect was reproduced, fixed, and protected by a regression test;
- the GH-AW has one safe output and no protected authority; and
- links resolve from intent through deployment and operational feedback.

## Recovery

Time-box recovery to ten minutes:

1. Stop Fleet and preserve every issue, branch, and pull request.
2. Return to the last reviewed dependency and keep only its verified receipts.
3. Reduce to the brief's minimum entity and workflow; move stretch work to
   follow-up issues.
4. Continue independent ready tickets in separate sessions, sequentially if
   ownership is uncertain.
5. If Azure or a licensed GitHub control is unavailable, record the exact
   limitation and preserve local/CI evidence without claiming equivalent
   deployment or platform enforcement.
6. If the minimum cannot be completed inside the extension, leave a runnable
   checkpoint and a prioritized issue for each missing receipt.

Never rewrite participant history or copy a completed capstone solution into
the team's branch.

## Stretch

Complete only the selected brief's stretch after the minimum evidence chain is
verified. Use a new issue and session so optional work cannot obscure the
reviewed capstone outcome.

