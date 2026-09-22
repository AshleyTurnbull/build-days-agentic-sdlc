# Delivery evidence contract

A change is complete only when a reviewer can connect the following evidence
without access to an agent conversation.

| Stage | Required evidence |
|---|---|
| Intent | Feature issue with user problem, scope, and owner |
| Specification | Approved OpenSpec proposal, scenarios, design, and tasks |
| Orchestration | Task issues with ownership, dependencies, validation, and execution receipts |
| Implementation | Pull request linked to issue, spec, and implemented scenarios |
| Validation | Independent lint, type, test, build, policy, and structural-check results |
| Security | Code/dependency result or explicit availability fallback |
| Infrastructure | Pinned AVM review, parameter change, and Azure `what-if` |
| Deployment | Protected-environment run, URL, commit SHA, environment, and deployment identifier |
| Live behavior | Health, readiness, feedback creation, first vote, and duplicate-vote verification |
| Feedback loop | GH-AW result with narrow authority, or labeled manual fallback |

## Evidence quality rules

- Link to the original GitHub or Azure record instead of copying only a green
  status into prose.
- Distinguish agent-reported commands from independently executed checks.
- Keep secrets, raw tokens, and sensitive subscription details out of evidence.
- Record unavailable licensed/preview controls accurately.
- A failed or missing check cannot be replaced by an optimistic summary.
- GH-AW can summarize or identify gaps; it cannot approve, merge, bypass policy,
  or deploy.

## Reviewer completion test

The reviewer should be able to answer:

1. What was approved?
2. What changed?
3. Which requirements were tested?
4. Which independent controls ran?
5. Which identity deployed which commit and where?
6. Does the live system satisfy health, readiness, feedback, and voting checks?
7. Which follow-up work remains?
