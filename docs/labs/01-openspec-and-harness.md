# Lab 1: OpenSpec and harness engineering

## Outcome

Create and review an OpenSpec change for the team's assigned feature, then make
the repository context precise enough that a fresh agent can implement one
bounded task without the original conversation.

At the end of this lab, the repository contains:

- `openspec/changes/<change-name>/proposal.md`;
- capability specs with observable scenarios;
- a change-local `design.md`;
- a bounded `tasks.md`;
- any necessary co-located `AGENTS.md` update; and
- a specification pull request linked to the seeded feature issue.

OpenSpec is the canonical hands-on specification path. The optional
[Spec Kit comparison](../comparisons/spec-kit-to-openspec.md) is a concept map,
not another toolchain or implementation route.

## Prerequisites

- The instructor environment check is green, including its manual Copilot App
  check.
- The repository contains one instructor-seeded issue for the team's assigned
  [feature brief](../features/README.md).
- Node.js is 20.19 or later and OpenSpec is available.

```powershell
node --version
openspec --version
openspec status
gh auth status
gh issue list --state open --limit 50
```

Set the seeded issue number after finding the issue that names the assigned
feature:

```powershell
$FeatureIssue = 0 # replace with the seeded issue number
if ($FeatureIssue -le 0) { throw "Set FeatureIssue to the seeded issue number." }
gh issue view $FeatureIssue --comments
```

Do not create a substitute feature issue if the seeded work is missing. Record
the preparation gap and use the instructor recovery path.

## Mental model and example

```text
seeded GitHub issue
  -> proposal: why, scope, and capabilities
  -> specs: observable requirements and scenarios
  -> design: technical decisions for this change
  -> tasks: bounded implementation and validation
  -> harness: DESIGN.md, AGENTS.md, instructions, tools, and feedback
  -> specification pull request: human approval of intent
```

Root [`DESIGN.md`](../../DESIGN.md) records durable architecture. A change
`design.md` records decisions for one change; it does not replace the root
design.

Before authoring the feature change, inspect the
[completed non-solution example](../examples/completed-openspec-example.md).
It demonstrates proposal, scenarios, design, and tasks for a documentation-only
change and does not implement feedback status, category filtering, board
sorting, or author summary.

## 1. Trace the assigned intent

Read, in order:

1. the seeded feature issue;
2. the assigned feature brief;
3. root [`DESIGN.md`](../../DESIGN.md);
4. root [`AGENTS.md`](../../AGENTS.md);
5. the closest `AGENTS.md` for every likely owned path; and
6. the current infrastructure guidance in
   [`infra/README.md`](../../infra/README.md) and the scoped
   [AVM Copilot instructions](../../.github/instructions/azure-avm.instructions.md).

Use exploration before selecting a solution:

```text
/opsx:explore
```

Answer these questions in durable artifacts, not only in chat:

- Which user or operator behavior is observable?
- Which capability is added or modified?
- Which root architecture boundary constrains the solution?
- Which files can separate agents own without overlap?
- Which focused test or check proves each scenario?
- Does the change affect the pinned AVM composition, identity, permissions, or
  deployment evidence? If not, say so explicitly.

## 2. Propose the OpenSpec change

```text
/opsx:propose <kebab-case-change-name>
```

Review every generated artifact before implementation.

### Proposal review

- The seeded issue is linked.
- Scope and non-scope are explicit.
- Capability names are stable.
- Application, tests, infrastructure, workflow, and documentation impact is
  accurate.

### Specification review

- Requirements state observable behavior rather than implementation choices.
- Every requirement has concrete `WHEN`/`THEN` scenarios.
- Failure, loading, empty, accessibility, and boundary behavior are covered
  where applicable.
- Each scenario maps to a test or independent check.

### Change-design review

- Root `DESIGN.md` constraints are referenced rather than copied.
- Decisions record rationale and rejected alternatives.
- Security, observability, migration, and rollback are addressed as needed.
- AVM references remain pinned. Any native Bicep is an explicitly documented
  AVM gap, not an unreviewed replacement.
- Azure authentication remains GitHub OIDC and runtime access remains managed
  identity with least privilege.

### Task review

- Tasks are small enough for one agent context.
- Parallel tasks have non-overlapping primary paths.
- Dependencies identify what must stabilize first.
- Every task names focused validation and a GitHub execution receipt.
- Integration and documentation work are included.

## 3. Improve only the needed harness

If an implementation agent would lack local knowledge, update the closest
`AGENTS.md` with the area's purpose, authoritative links, allowed dependencies,
focused validation, and prohibited shortcuts.

Do not duplicate architecture prose into `AGENTS.md`. Do not add `.specify/`,
install Spec Kit, create a Spec Kit branch, or generate a second set of feature
artifacts.

## 4. Validate the specification contract

```powershell
openspec validate --all
git --no-pager diff --check
git --no-pager status --short
```

Trace one task end to end and confirm that a fresh agent can discover:

- its parent issue and OpenSpec scenario;
- owned and prohibited paths;
- applicable root and co-located instructions;
- dependencies;
- focused validation; and
- required branch, commit, test, and pull-request receipts.

## 5. Open the specification pull request

Create a branch containing only the reviewed OpenSpec and harness changes. The
pull-request body must link the seeded issue and identify:

- the change directory and capability scenarios;
- durable constraints in root `DESIGN.md`;
- implementation tasks and dependency order;
- AVM/OIDC/least-privilege impact;
- local validation output; and
- any platform availability assumption that remains instructor-verified.

The reserved `openspec.yml` and `spec-pr-policy.yml` checks count as evidence
only when their workflow files exist and a run is visible. Otherwise, record
the local commands without claiming an unavailable check passed.

## Expected repository artifacts

- Specification pull-request URL linked to the seeded feature issue.
- Reviewed proposal, capability specs, change design, and tasks.
- Successful `openspec validate --all`.
- Clean `git --no-pager diff --check`.
- Links to each changed harness file.

## Recovery

Time-box repair to five minutes:

1. compare structure with the completed non-solution example;
2. copy only missing headings or artifact shape, never its content as the
   feature answer;
3. rerun `openspec validate --all`;
4. if still blocked, preserve the issue and branch, then use the
   instructor-published Lab 1 recovery checkpoint.

Never guess a checkpoint name or force-reset participant work.

## Stretch

Add one mechanically enforceable architecture or documentation check and show
the failure message teaches a fresh agent how to repair the violation.
