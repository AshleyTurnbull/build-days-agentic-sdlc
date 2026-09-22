# GitHub delivery contract

## Two review gates

The workshop separates approval of intent from approval of implementation.

### Specification pull request

Approves:

- OpenSpec proposal and scope;
- capability requirements and scenarios;
- change-local technical design;
- bounded tasks and dependencies;
- required harness updates.

It does not assert that application behavior exists.

### Implementation pull request

Proves:

- linked approved scenarios;
- bounded task ownership and execution receipts;
- tests and structural checks;
- security and dependency evidence;
- infrastructure validation where applicable;
- deployment evidence for the final integration.

## Planned workflow responsibilities

The approved implementation plan reserves these names:

| Name | Responsibility |
|---|---|
| `openspec.yml` | OpenSpec and repository-integrity validation |
| `ci.yml` | Application lint, type-check, tests, build, and smoke test |
| `spec-pr-policy.yml` | Specification linkage for governed paths |
| `codeql.yml` | CodeQL analysis where available |
| `dependency-review.yml` | Dependency change review where available |
| `infra-validate.yml` | Bicep validation and Azure `what-if` |
| `deploy.yml` | Protected deployment and live verification |

A name in this guide is a contract, not evidence that the workflow has already
been implemented or successfully run. Inspect the repository and current
GitHub checks.

## Human and agent authority

Agents may explore, propose, implement, test, review, and prepare pull requests.
They may not approve their own protected change, bypass rules, merge without
authorization, or deploy outside the configured environment policy.

Humans approve the specification, architectural/security trade-offs, pull
request merge, and protected deployment. Deterministic checks independently
validate agent claims.

## Availability-dependent controls

CodeQL, dependency review, protected environments, cloud agents, and GH-AW may
depend on repository visibility, licensing, organization policy, and preview
access. Instructors record availability before the event. A fallback must:

1. state which control is unavailable;
2. retain the strongest deterministic check that is available;
3. avoid describing the fallback as equivalent platform enforcement;
4. preserve reviewable evidence.
