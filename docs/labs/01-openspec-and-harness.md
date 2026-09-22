# Lab 1: OpenSpec and harness engineering

## Outcome

Create and review an OpenSpec change for a workshop feature, then improve the repository harness so local and cloud agents can implement it consistently.

At the end of this lab, the repository contains:

- `openspec/changes/<change-name>/proposal.md`;
- one or more capability specs with observable scenarios;
- a change-local `design.md`;
- a bounded `tasks.md`;
- any necessary update to a co-located `AGENTS.md`.

The change is reviewed in a specification pull request before implementation
starts. Approval confirms intent and scenarios; it does not claim that the
feature is already built.

## Mental model

OpenSpec defines the change contract. Harness engineering makes that contract executable by agents.

```text
Issue
  -> proposal: why and scope
  -> specs: observable requirements and scenarios
  -> design: technical choices for this change
  -> tasks: independently verifiable work
  -> harness: context, boundaries, tools, and feedback
```

For attendees familiar with AI-DLC, this is not a rejection of intent, elaboration, design, units, gates, or context recovery. It is a lighter mapping of those ideas onto repository-native artifacts:

| Familiar AI-DLC concept | Workshop implementation |
|---|---|
| Intent capture and scope | GitHub issue plus `proposal.md` |
| Requirements and stories | Capability specs and scenarios |
| Domain/functional design | Root `DESIGN.md` plus change `design.md` |
| Units and dependency planning | Bounded `tasks.md`, GitHub issues, and explicit ownership |
| Team/project memory | Root and co-located `AGENTS.md`, linked documentation, and version history |
| Quality gates | Tests, linters, security scanning, required checks, and environments |
| Construction receipts | Commits, pull-request checks, reviews, and deployment records |
| Operations feedback | Telemetry and evidence consumed by GH-AW to open or update GitHub work |

The exercise should reveal which controls remain useful when the originating chat session or agent runtime disappears.

Root `DESIGN.md` is not replaced by the OpenSpec change design:

| Artifact | Lifetime | Contents |
|---|---|---|
| `DESIGN.md` | Repository lifetime | Stable architecture, boundaries, dependency direction, system-wide constraints |
| `openspec/changes/<name>/design.md` | One change | Context, goals, decisions, alternatives, risks, and trade-offs |

## Prerequisites

```powershell
node --version
openspec --version
openspec status
```

Node.js must be 20.19 or later. The instructor environment check must already be green.

Choose one brief from [`../features/README.md`](../features/README.md). Confirm
that the team's repository, feature assignment, and GitHub access are recorded
before generating artifacts.

## 1. Explore the feature

Use the OpenSpec exploration command to inspect the application, existing capability specs, root design, and local agent instructions before committing to a solution:

```text
/opsx:explore
```

Answer:

- Who needs the feature and what problem does it solve?
- Which behavior is observable by a user or operator?
- Which existing capability is affected?
- Which repository boundaries constrain the solution?
- What evidence will prove the change works?
- Which parts of the familiar lifecycle can be represented by durable GitHub or repository artifacts rather than agent memory?

## 2. Propose the change

```text
/opsx:propose <kebab-case-change-name>
```

Review all generated artifacts. Do not begin implementation yet.

### Proposal review

- The problem and urgency are clear.
- Scope and non-scope are explicit.
- New and modified capabilities use stable names.
- Impact identifies application, tests, infrastructure, workflows, and documentation.

### Specification review

- Requirements describe observable behavior, not implementation preferences.
- Every requirement contains concrete `WHEN`/`THEN` scenarios.
- Failure and boundary behavior are included.
- Scenarios can be mapped to automated tests or deployment checks.

### Change design review

- The design references root `DESIGN.md` constraints.
- Decisions include rationale and alternatives.
- AVM impact and Azure identity requirements are explicit.
- Security, migration, rollback, and observability are addressed when applicable.

### Task review

- Tasks are small enough for one agent context.
- Parallel tasks have non-overlapping primary file ownership.
- Dependencies identify what must merge or stabilize first.
- Each task names its validation command or observable completion evidence.
- Each delegated task can be represented by a GitHub issue with parent change,
  owned paths, and an execution receipt.
- Integration and documentation tasks are not omitted.

## 3. Improve the harness

Inspect the files an implementation agent will change. If local knowledge is missing, update the closest `AGENTS.md` with:

- the area's purpose and allowed dependencies;
- the authoritative design or spec links;
- local conventions;
- focused test, lint, or validation commands;
- common mistakes or prohibited shortcuts.

Keep the file concise. Put architectural explanation in root `DESIGN.md` or a focused document and link to it.

## 4. Validate

```powershell
openspec validate --all
git --no-pager diff --check
```

The team should be able to hand each task to a fresh agent without relying on workshop chat history.

The team should also be able to explain where approval, validation, and evidence live outside the model.

## 5. Open the specification pull request

Create a branch containing only the reviewed OpenSpec and harness changes.
In the pull-request description, link the originating issue and identify:

- the change directory;
- the capability requirements and scenarios;
- the durable architecture constraints in root `DESIGN.md`;
- the implementation tasks and their dependencies;
- any availability assumption that the instructor must verify.

The planned `openspec.yml` and `spec-pr-policy.yml` workflows will enforce parts
of this contract after those workflow files are implemented and active. Until
then, run the local validation above and record the output accurately rather
than describing an unavailable check as passed.

## Expected repository artifacts and evidence

- Specification pull-request URL.
- Reviewer approval of proposal, specs, design, and tasks.
- Successful `openspec validate --all`.
- Clean `git --no-pager diff --check`.
- A link to every harness file changed for the feature.

## Recovery

If artifact generation or validation cannot be repaired within five minutes:

1. compare the change directory with the instructor example;
2. copy only the missing artifact structure, not the feature content;
3. run `openspec validate --all` again;
4. use the Lab 1 recovery checkpoint if the team cannot produce a valid change before the next lab.

If the repository does not expose the documented checkpoint, ask the instructor
for the verified tag or branch rather than guessing a name.

## Stretch

Add a mechanically enforceable architecture or documentation check that teaches an agent how to repair the violation.
