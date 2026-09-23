# Spec Kit to OpenSpec concept map

This is a comparison aid for participants who know Spec Kit. The workshop uses
OpenSpec as its only hands-on specification-driven development workflow. Do not
install Spec Kit, add `.specify/`, generate parallel artifacts, or create a
second implementation branch.

| Delivery concern | Spec Kit concept | OpenSpec workshop artifact |
|---|---|---|
| Durable project principles | Constitution | Root `DESIGN.md`, root/scoped `AGENTS.md`, and executable repository policy |
| Capture feature intent | Specify | Seeded GitHub issue plus change `proposal.md` |
| Resolve ambiguity | Clarify | Proposal/spec review and explicit questions recorded in GitHub or the change |
| Observable requirements | Specification and user scenarios | Capability requirements with `WHEN`/`THEN` scenarios |
| Technical approach | Plan | Change-local `design.md`, constrained by root `DESIGN.md` |
| Bounded work | Tasks | Change `tasks.md` plus linked GitHub task issues |
| Construction | Implement | Agent branches and pull requests after specification approval |
| Durable proof | Validation/checklists | Tests, checks, reviews, deployment evidence, and issue execution receipts |

## Strengths and trade-offs

- Spec Kit offers a recognizable staged command flow and a strong constitution
  metaphor.
- OpenSpec keeps capability deltas, technical design, and tasks together in a
  repository-native change that validates with `openspec validate --all`.
- Both approaches benefit from observable scenarios, human review, bounded
  tasks, and independent evidence.
- Neither tool replaces durable architecture, tests, security controls, or
  human approval.

## Why this workshop chooses OpenSpec

The starter already uses OpenSpec as the capability source of truth and policy
input. One canonical artifact chain reduces four-hour workshop setup, prevents
conflicting feature answers, and gives local and cloud agents the same
repository-owned context. The comparison is optional; the implementation path
always returns to:

```text
seeded issue -> OpenSpec change -> specification review -> bounded tasks
-> implementation pull requests -> independent evidence
```

Continue with [Lab 1](../labs/01-openspec-and-harness.md).
