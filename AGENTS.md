# Agent guide

This file is the entry point for agents working in this repository. It is a map, not an encyclopedia. Follow links to the authoritative source instead of expanding this file with duplicated guidance.

## Read first

1. Read [`DESIGN.md`](DESIGN.md) for durable architecture and repository boundaries.
2. Read [`docs/README.md`](docs/README.md) to find task-specific documentation.
3. For feature or behavior changes, locate the active change under `openspec/changes/<change-name>/`.
4. Read the closest co-located `AGENTS.md` before modifying files in a directory.

## Source-of-truth order

When instructions appear to conflict, use this order:

1. Approved OpenSpec capability requirements and scenarios.
2. Root `DESIGN.md` and accepted architectural decision records.
3. The active OpenSpec change's `proposal.md` and `design.md`.
4. The active change's `tasks.md`.
5. Root and co-located `AGENTS.md` files.
6. Existing implementation patterns.

Stop and surface the conflict instead of silently choosing when two higher-priority sources disagree.

## Required change workflow

- Start material feature, behavior, infrastructure, security, or workflow changes with OpenSpec.
- Do not implement until the proposal, capability specs, design, and tasks are reviewable.
- Keep change-local implementation decisions in `openspec/changes/<change-name>/design.md`.
- Update `DESIGN.md` only for durable system-wide decisions or boundary changes.
- Implement one bounded task at a time and keep `tasks.md` current.
- Add or update tests for every changed requirement scenario.
- Run the smallest relevant validation before broader checks.
- Record deployment and security evidence in the pull request.
- Archive the OpenSpec change only after validation and review are complete.

## Engineering guardrails

- Prefer existing patterns and dependencies over new abstractions.
- Keep agent tasks independently reviewable and avoid overlapping file ownership.
- Do not weaken tests, security scanning, branch protections, or deployment gates.
- Use Azure Verified Modules for Azure resources unless the approved design records why not.
- Use GitHub OIDC for Azure authentication; do not add long-lived cloud credentials.
- Give workflows least privilege and declare only the write operations they require.
- Generated files must be reproducible and committed when the owning tool requires them.
- Do not report completion without test, build, or deployment evidence appropriate to the change.

## Useful commands

```powershell
openspec status
openspec validate --all
npm run check
git --no-pager diff --check
```

Use focused test commands documented by the closest application or test
instructions before the full `npm run check`. Deployment and organization
configuration are documented under `docs/instructor/`.
