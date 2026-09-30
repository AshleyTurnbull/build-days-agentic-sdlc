# Capstone agent guide

This directory contains independently built, net-new workshop applications.

## Read first

1. Read [`../DESIGN.md`](../DESIGN.md) and [`../AGENTS.md`](../AGENTS.md).
2. Read the selected brief under [`../docs/capstone/`](../docs/capstone/).
3. Read the approved capstone OpenSpec change before implementation.
4. Add a narrower `AGENTS.md` inside `capstone/<app-name>/` before parallel
   implementation begins.

## Boundaries

- One application owns one `capstone/<app-name>/` subtree.
- Do not change `src/`, its tests, or the existing feedback application.
- Use root-level platform files only when GitHub or another owning tool
  requires that location. Give each one a capstone-specific name and record
  the exception in the capstone change design.
- Assign non-overlapping owned paths to concurrent tasks. Shared contracts and
  dependency files must have a single owner and be integrated first.
- Keep the implementation solution-neutral until the team approves its
  OpenSpec proposal, scenarios, design, and tasks.

## Delivery guardrails

- Provide one entity and one primary workflow only.
- Expose an API and accessible loading, empty, success, validation, and failure
  states.
- Persist data through an explicit storage boundary; tests may use a
  deterministic in-memory adapter.
- Provide liveness and dependency-aware readiness behavior.
- Use focused unit, API, UI, and smoke tests mapped to approved scenarios.
- Compose supported Azure resources from pinned AVM modules.
- Authenticate GitHub Actions to Azure with OIDC and the protected environment;
  never add a long-lived cloud credential.
- Default workflow permissions to read-only and grant only required writes.
- A capstone GH-AW has exactly one narrow safe output and no approval, merge,
  policy-bypass, workflow-editing, or deployment authority.

## Evidence and validation

Every completed task records its issue, owned paths, dependency state, branch,
commit, focused validation, and pull request. Completion requires independent
CI, infrastructure validation, protected deployment, health/readiness and
functional evidence, a ticket-driven defect fix, and a reconstructable final
evidence chain.

Use the application-local validation documented by the team, then run the
repository integrity checks applicable to the changed paths.

