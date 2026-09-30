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
| Deployment | Protected-environment run, validated pull request, URL, commit SHA, environment, and deployment identifier |
| Live behavior | Health, readiness, feedback creation, first vote, and duplicate-vote verification |
| Feedback loop | GH-AW result with narrow authority, or labeled manual fallback |

## Evidence quality rules

- Link to the original GitHub or Azure record instead of copying only a green
  status into prose.
- Distinguish agent-reported commands from independently executed checks.
- Keep secrets, raw tokens, and sensitive subscription details out of evidence.
- Record unavailable licensed/preview controls accurately.
- A failed or missing check cannot be replaced by an optimistic summary.
- Deployment success is represented by one machine-readable artifact produced
  after live verification and one marker-addressed PR comment. Reruns update
  that comment rather than creating duplicates.
- The deployment artifact records required-check and observed security-check
  status. `not_run` is evidence of absence, not a passing security result.
- PR write permission belongs only to the post-success evidence publication
  job; deployment and verification retain read-only PR access or none.
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

## Deployment evidence schema

`deployment-evidence.json` is intentionally compact and contains:

- `schema_version`;
- `commit_sha` and `pull_request_number`;
- `required_checks` and `security_checks` summaries;
- Azure deployment name and GitHub workflow run ID;
- protected environment and application URL;
- boolean health, readiness, feedback-creation, first-vote, and
  duplicate-vote-protection results;
- the durable workflow-run URL from which the artifact can be downloaded.

The artifact exists only after every live-verification boolean is true.
