# Lab 1: OpenSpec and harness engineering in GitHub Copilot App

## Outcome

Create and review an OpenSpec change for the team's assigned feature, then make
the repository context precise enough that a fresh App session can implement
one bounded task without the original conversation.

The durable result includes a proposal, observable capability scenarios, a
change-local design, bounded tasks, any necessary co-located `AGENTS.md`
improvement, and a specification pull request linked to the seeded issue.

OpenSpec is the canonical hands-on SDD path. The
[Spec Kit comparison](../comparisons/spec-kit-to-openspec.md) is a concept map,
not another toolchain.

Use the [App prompting pattern](copilot-app-prompting.md) throughout this lab.

## Prerequisites

- The instructor environment and GitHub Copilot App checks are green.
- The repository has one seeded issue for the assigned
  [feature brief](../features/README.md).
- OpenSpec, the root `DESIGN.md`, root and co-located `AGENTS.md`, and AVM
  guidance are present in the repository.
- The team can create an isolated App session and a specification pull request.

## 1. Explore the issue before choosing a solution

**Use:** A new Chat for this repository.

**Attach:** `#<feature-issue>`, `@DESIGN.md`, `@AGENTS.md`, the assigned feature
brief, the closest area instructions, `@infra/README.md`, and
`@.github/instructions/azure-avm.instructions.md`.

**Prompt:**

> Explore #<feature-issue> as input to an OpenSpec change. Identify the
> observable user outcome, likely capability requirements, architecture
> boundaries, affected areas, failure and accessibility states, AVM/OIDC
> impact, and questions that must be answered before implementation. Do not
> create files or propose code yet.

**Expect:** A concise problem framing, relevant repository constraints, and
open questions grounded in attached artifacts.

**Decide:** Resolve scope questions and reject assumptions that are not
supported by the issue or repository.

## 2. Propose the specification in Plan mode

**Use:** A new isolated session in Plan mode.

**Attach:** The same issue and files, plus the
[completed non-solution example](../examples/completed-openspec-example.md).

**Prompt:**

> Create a plan for an OpenSpec change named `<change-name>` for
> #<feature-issue>. The plan must produce proposal, capability scenarios,
> change design, bounded tasks, and only the harness updates a fresh agent
> actually needs. Map every scenario to independent validation and separate
> parallel tasks by non-overlapping primary paths. Do not implement the feature.
> Stop for my approval after showing the planned artifacts and files.

**Expect:** A reviewable artifact plan, dependency graph, path ownership, tests,
and explicit non-goals.

**Decide:** Approve only after the plan distinguishes root `DESIGN.md` from the
change-local `design.md` and keeps OpenSpec as the single SDD path.

## 3. Challenge the proposed scenarios

**Use:** The planned session with `/rubber-duck`, or a separate reviewer Chat.

**Attach:** The proposed OpenSpec artifacts.

**Prompt:**

> Critique this OpenSpec proposal as a skeptical reviewer. Find missing
> observable scenarios, untestable requirements, hidden implementation
> choices, accessibility or failure-state gaps, overlapping task ownership,
> and unsupported infrastructure assumptions. Recommend specific corrections
> without implementing the feature.

**Expect:** Concrete findings tied to requirements, scenarios, design
decisions, or tasks.

**Decide:** Accept, revise, or explicitly reject each finding before allowing
the session to create artifacts.

## 4. Create and refine the OpenSpec artifacts

**Use:** The approved session in Interactive mode.

**Attach:** The reviewed plan and critique.

**Prompt:**

> Apply the approved specification plan only. Create the OpenSpec proposal,
> capability specs, change design, and tasks for `<change-name>`. Update the
> closest `AGENTS.md` only if a fresh implementation session would otherwise
> miss a local boundary or focused validation path. Run repository-owned
> OpenSpec and documentation validation, report the real results, and stop
> without implementing participant feature code.

**Expect:** Complete specification artifacts, minimal harness changes, and
actual validation results.

**Decide:** Inspect the diff. Redirect the session if it changes application,
infrastructure, or workflow implementation.

## 5. Prepare the specification pull request

**Use:** The App's review and pull-request experience.

**Attach:** `#<feature-issue>`, the OpenSpec change, changed harness files, and
the current session diff.

**Prompt:**

> Review this specification change for consistency with root `DESIGN.md` and
> the applicable `AGENTS.md` files. Confirm that scenarios are observable,
> tasks are bounded, validation is named, and AVM/OIDC impact is accurate.
> Prepare a specification pull request that links #<feature-issue>, the change
> directory, scenarios, dependency order, validation results, and remaining
> platform assumptions. Do not describe unrun checks as passed.

**Expect:** A focused specification pull request with no participant feature
implementation.

**Decide:** A human reviews, approves, and merges the specification pull
request before Lab 2 starts. Implementation pull requests require the merged
specification PR as durable policy evidence.

## Expected repository artifacts

- Specification pull request linked to the seeded feature issue.
- Human approval and merge receipt for the specification pull request.
- Reviewed proposal, capability scenarios, change design, and tasks.
- Minimal, justified harness updates.
- Independent OpenSpec and repository validation evidence.

## Verification

Ask a fresh Chat to explain one task using only the issue, OpenSpec artifacts,
root and local instructions, dependencies, owned paths, focused validation, and
required GitHub receipts. If it needs the original conversation, the harness is
not ready.

## Recovery

Ask a new Plan session to compare the incomplete change with the completed
non-solution example and repair only missing artifact structure. If the change
still cannot validate after five minutes, preserve the issue and session, then
ask the instructor for the Lab 1 recovery checkpoint.

## Stretch

Prompt the App to propose one mechanically enforceable repository-context rule
and the failure message that would teach a fresh agent how to repair it.
