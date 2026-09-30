# Proposal

## Why

The repository documents an Agentic SDLC workshop but does not yet provide the runnable application, GitHub controls, Azure deployment path, or GitHub Agentic Workflow participants need to complete the end-to-end loop.

Participants need a predictable starter application and a governed delivery path that demonstrates OpenSpec, repository harness engineering, local and cloud agents, CI/security validation, Azure Verified Modules, GitHub OIDC, protected deployment, and operational evidence in one four-hour workshop.

## What Changes

- Add a full-stack TypeScript feedback board that is complete before the workshop and contains bounded feature seams for participant changes.
- Add deterministic local validation and GitHub Actions CI/security workflows.
- Add AVM-based Azure App Service, Storage, monitoring, managed identity, and role assignment infrastructure.
- Add OIDC-based Azure validation and protected deployment workflows.
- Add issue forms, specification and implementation PR contracts, Copilot customizations, and GitHub-visible task orchestration.
- Complete the participant labs and instructor provisioning/recovery guidance.
- Add a small working GH-AW reference plus a participant starter for authoring an evidence workflow against real specification, CI, security, and deployment evidence.

## Capabilities

### New Capabilities

- `feedback-application`: A deployable workshop feedback board with persistent feedback and voting behavior.
- `github-delivery-governance`: Issue, specification approval, implementation review, CI, security, and evidence requirements.
- `azure-workshop-deployment`: AVM-based, identity-secured Azure infrastructure and deployment.
- `agent-context-continuity`: Repository-owned instructions and task contracts that work across local and cloud agents.
- `delivery-evidence-workflow`: A GH-AW workflow that evaluates completed delivery evidence and safely reports gaps or outcomes.

### Modified Capabilities

None.

## Impact

- Adds the initial application source, tests, package manifests, and build tooling.
- Adds Azure infrastructure and deployment configuration.
- Adds active GitHub Actions workflows, issue forms, PR templates, Copilot customizations, and GH-AW.
- Expands participant labs and adds instructor provisioning, readiness, recovery, and cleanup documentation.
- Requires Node.js, Azure CLI/Bicep, GitHub CLI, OpenSpec, and GH-AW tooling for full instructor validation.
