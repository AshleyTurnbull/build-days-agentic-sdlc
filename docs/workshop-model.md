# Workshop delivery model

## Repository topology

Use a GitHub template repository and pre-create one repository per team in the workshop organization.

This model allows organizers to validate, before attendees arrive:

- Copilot coding agent access;
- Actions and workflow permissions;
- Azure OIDC federation;
- deployment environments;
- security scanning;
- branch rulesets;
- GH-AW execution and AI access.

Forks are a fallback for attendees outside the workshop organization, not the standard path.

The template branch is a paved road, not a completed lab solution. It includes
the working feedback/voting baseline, CI, deployable AVM composition, and one
small reference GH-AW. Teams add a selected feature, the App Service health
check configuration, and their own evidence-review GH-AW. Completed answers
belong in instructor solution branches or a separate instructor repository.

## Team workflow

Tables of two or three participants share one pre-created repository. Suggested
roles rotate between labs:

- **Spec lead** validates intent, requirements, and scenarios.
- **Harness lead** checks repository context, scoped instructions, and validation loops.
- **Implementation lead** coordinates local agents and resolves integration issues.
- **Reviewer/operator** reviews pull requests and deployment evidence.

Roles describe human accountability, not exclusive keyboard access.

## Technical-win narrative

Attendees may already understand AI-DLC concepts such as intent capture, elaboration, units of work, dependency graphs, quality gates, agent roles, context recovery, and operations feedback.

Do not present those concepts as unique to this workshop. Demonstrate instead how the GitHub platform makes them shared, enforceable, and observable across the full delivery system:

1. OpenSpec keeps the change contract lightweight and versioned with the code.
2. `AGENTS.md`, `DESIGN.md`, and co-located guidance make repository context available to different agent runtimes.
3. Issues, branches, commits, pull requests, reviews, and rulesets provide the collaboration and approval model.
4. Actions and GitHub security features provide deterministic gates outside the model's control.
5. Environments, Azure OIDC, and AVM carry the same contract into deployment.
6. GH-AW consumes repository and delivery evidence to close the operational feedback loop.

The win is not an additional lifecycle diagram. It is one governed control plane from intent through production evidence.

See [`aidlc-positioning.md`](aidlc-positioning.md) for the detailed comparison and lab proof points.

## Lab outputs

| Lab | Required durable output |
|---|---|
| Environment check | Green environment workflow and successful Azure `what-if` |
| OpenSpec + harness | Approved proposal, specs, design, tasks, and one scoped `AGENTS.md` improvement, with the corresponding AI-DLC concepts identified |
| Multi-agent implementation | Independently owned tasks with testable completion contracts and GitHub-visible ownership |
| Build and deploy | Passing feature PR, required checks, deployment URL, and Actions evidence that the agent cannot self-assert |
| Cloud coding agent | Bounded issue, agent-created PR, and a human-requested revision without a local IDE session |
| GH-AW + security | Agentic workflow source and lock, seeded CodeQL result, verified remediation merge, narrow safe output, and final delivery evidence |
| Wrap | Merged PR with linked specification, security result, and deployment evidence |

The five agenda labs plus the wrap are indexed in
[`labs/`](labs/01-openspec-and-harness.md).
Comparable implementation choices are indexed in
[`features/`](features/README.md). Teams select one brief; instructors should
avoid assigning the same primary ownership area to concurrent agents.

## Checkpoints

Publish instructor-managed recovery branches for the start of each lab from a
private instructor solution repository that participants cannot read. A
checkpoint restores workshop progress; it must not contain the completed answer
for the current lab.

Recommended checkpoints:

```text
checkpoint/lab1-start
checkpoint/lab2-start
checkpoint/lab3-start
checkpoint/lab4-start
checkpoint/lab5-start
```

Instructor solution branches remain separate from the public template and are
published into a team repository only when recovery is needed.

Checkpoint tags are created and verified by instructors; participant
documentation must not imply they exist until the event repository exposes
them.

## Evidence contract

A change is complete only when its pull request links:

1. the OpenSpec change directory;
2. the requirement scenarios implemented;
3. test and structural-check results;
4. security scanning status;
5. Azure deployment run and application URL;
6. any approved deviation from `DESIGN.md`.

The evidence must be understandable by a reviewer who did not participate in the agent conversation.
