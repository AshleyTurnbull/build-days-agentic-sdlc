# App-first capstone briefs

The optional capstone is a 90-120 minute extension or follow-up. A team selects
one brief and creates a net-new application under `capstone/<app-name>/`.
These briefs define comparable outcomes and constraints without prescribing a
framework, schema, component structure, or Azure topology.

| Brief | Entity | Primary workflow |
|---|---|---|
| [Incident handoff board](incident-handoff-board.md) | Handoff | Record and acknowledge an operational handoff |
| [Release readiness checklist](release-readiness-checklist.md) | Release check | Assess and update release readiness |
| [Team decision log](team-decision-log.md) | Decision | Propose and record a team decision |
| [Service request queue](service-request-queue.md) | Service request | Submit and progress a request |

## Comparable minimum

Every brief requires:

- one entity and one primary workflow;
- a small API and accessible browser UI;
- durable persistence behind a storage boundary;
- liveness and dependency-aware readiness endpoints;
- focused unit, API, UI, and deployed smoke tests;
- one realistic defect discovered and fixed through a GitHub bug issue;
- capstone-scoped GitHub Actions CI/CD;
- AVM-first Azure infrastructure and GitHub OIDC deployment;
- non-overlapping task ownership and dependency-aware integration;
- one GH-AW with exactly one narrow safe output; and
- evidence that a reviewer can reconstruct without session transcripts.

The team converts its selected brief into an approved OpenSpec change. The
brief is input, not the specification or implementation answer.

## Selection rules

- Choose one brief per team.
- Keep the minimum outcome inside the time box; defer stretch work.
- Use the existing feedback application only as an architectural reference,
  never as code to modify or rebrand.
- Name root-level workflow files for the capstone and include them only where
  GitHub requires a repository-level location.
- Stop parallel work when owned paths overlap or a dependency is unresolved.

Continue with the [App-first capstone lab](../labs/06-net-new-app-capstone.md)
and the [capstone workspace rules](../../capstone/AGENTS.md).

