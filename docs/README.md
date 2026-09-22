# Documentation map

Repository documentation is organized for progressive disclosure. Keep this file as the navigation layer and place detailed instructions in focused documents.

## Workshop

- [`workshop-model.md`](workshop-model.md) - participant repository model and lab outputs.
- [`aidlc-positioning.md`](aidlc-positioning.md) - mapping from familiar AI-DLC concepts to the workshop's GitHub-native implementation.
- [`labs/01-openspec-and-harness.md`](labs/01-openspec-and-harness.md) - OpenSpec and harness-engineering lab.
- [`labs/02-multi-agent-orchestration.md`](labs/02-multi-agent-orchestration.md) - visible, bounded multi-agent implementation.
- [`labs/03-build-test-deploy.md`](labs/03-build-test-deploy.md) - independent validation and Azure deployment.
- [`labs/04-cloud-agent.md`](labs/04-cloud-agent.md) - context continuity with a cloud coding agent.
- [`labs/05-gh-aw.md`](labs/05-gh-aw.md) - evidence review with a narrowly authorized GH-AW.
- [`labs/06-wrap-and-evidence.md`](labs/06-wrap-and-evidence.md) - final evidence reconstruction and workshop wrap.
- [`features/README.md`](features/README.md) - comparable participant feature briefs.

## Engineering

- [`../DESIGN.md`](../DESIGN.md) - durable repository and system design.
- [`../AGENTS.md`](../AGENTS.md) - root agent operating contract.
- [`../openspec/config.yaml`](../openspec/config.yaml) - OpenSpec project context and rules.
- [`platform/README.md`](platform/README.md) - GitHub delivery, Azure deployment, and evidence guidance.

## Instructor operations

- [`instructor/README.md`](instructor/README.md) - ordered setup and event operations map.
- [`instructor/provisioning.md`](instructor/provisioning.md) - organization and Azure provisioning.
- [`instructor/readiness.md`](instructor/readiness.md) - pre-event readiness checks.
- [`instructor/team-repositories.md`](instructor/team-repositories.md) - team repository creation and configuration.
- [`instructor/rulesets.md`](instructor/rulesets.md) - branch rules and required checks.
- [`instructor/azure-oidc.md`](instructor/azure-oidc.md) - workload identity federation.
- [`instructor/recovery.md`](instructor/recovery.md) - checkpoints and time-boxed incident recovery.
- [`instructor/cleanup.md`](instructor/cleanup.md) - post-event access and Azure cleanup.

## Documentation rules

- Link to authoritative files rather than duplicating their content.
- Record stable architecture in `DESIGN.md`.
- Record change-specific decisions in the active OpenSpec `design.md`.
- Prefer executable examples and commands that work on Windows.
- Add recovery instructions for every participant-facing procedure.
