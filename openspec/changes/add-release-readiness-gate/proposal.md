# Proposal

## Why

The selected capstone brief needs more than a static checklist: it needs a user-triggered, commit-specific pre-deployment gate with visible progress, plus a complete and reviewable path from pull-request validation to a protected deployment. A local dashboard alone cannot prove checks passed or host durable run evidence, while an unreviewed or unexecuted deployment setup must not be mistaken for a live release.

## What Changes

- Add a standalone release-readiness application under `capstone/release-readiness-gate/`, leaving the workshop feedback application unchanged.
- Let users select a same-repository pull request and manually start the approved preflight workflow for its exact current head SHA.
- Display accessible per-check progress, outcomes, failures, staleness, source links, and retry behavior; missing and simulated evidence must remain explicit.
- Add an opt-in three-agent code review for a selected pull request. Three distinct configured review agents independently assess the same diff; at least two must approve before the app reports quorum approval. A human remains responsible for applying any code change.
- Run capstone CI automatically for relevant pull requests and the default branch, and support the dashboard's explicit manual preflight dispatch.
- Add an AVM-composed Azure App Service, Table Storage, monitoring, and Key Vault infrastructure definition, with managed identity for runtime access and no committed credentials.
- Add a separate post-merge CD workflow that validates the merged commit, produces Azure `what-if` evidence through GitHub OIDC, waits for a protected-environment approval, deploys infrastructure and application, and records live smoke-test evidence.
- Keep approval and deployment authority out of the dashboard and read-only preflight workflow. CD runs only from the default branch and cannot deploy unmerged pull-request code.
- Author and locally validate the application, workflow, and infrastructure sources in this worktree. Do not push or publish workflow files, configure GitHub environments/App credentials/OIDC, authenticate to Azure, run Azure deployment `validate`/`what-if`, provision resources, or deploy.
- Add focused tests and operator documentation for local setup, future GitHub/Azure configuration, security boundaries, deployment evidence, and recovery.
- Keep model credentials server-side, send code to configured model endpoints only after an explicit review action, and make provider/model identity and review limitations visible to the user.

## Capabilities

### New Capabilities

- `release-readiness-gate`: Manually start and observe commit-bound pre-deployment checks through an accessible dashboard, with honest evidence and readiness states.

### Modified Capabilities

None. The active `workshop-capstone` capability is a change-local delta and there is no archived `openspec/specs/` capability to modify. This change adds one application and its delivery path without changing the workshop-wide capstone lab contract.

## Impact

- **Application:** New isolated React/Express application, API, GitHub integration, three-agent review integration with a two-approval quorum, local and Azure persistence adapters, tests, and local documentation under `capstone/release-readiness-gate/`.
- **Infrastructure:** New capstone-local Bicep composition using pinned AVMs for App Service, Table Storage, monitoring, and Key Vault; no Azure resource is created in this phase.
- **Workflows:** Capstone-specific root workflows for PR/manual CI and protected post-merge deployment; existing workshop workflows remain unchanged.
- **GitHub integration:** Real preflight dispatch requires an externally configured repository-scoped GitHub App. Future Azure jobs require protected GitHub environments, OIDC federation, and resource-group-scoped Azure permissions. None are configured here.
- **Security:** The GitHub App dispatch integration requires `Actions: write`, broader than one dispatch endpoint; review this residual risk before installation. CI/preflight have no deployment authority, secrets, or OIDC. CD receives OIDC only in its Azure jobs and requires protected approval before deployment.
- **Model review:** Review requires exactly three distinct model identifiers and separately configured server-side credentials/endpoints. Source diffs are sent only after a user explicitly starts review. A two-of-three approval quorum is advisory, cannot write files, and does not replace human review or tests.
- **Evidence:** A passing app preflight is not deployment evidence. Azure `what-if`, deployment, health/readiness, and smoke-test results are distinct evidence; no absent or simulated result may be reported as a completed Azure operation.
- **Documentation:** Explain local commands, required future environment variables and protected-environment/OIDC configuration, external GitHub App/Key Vault setup, and limitations before the first hosted release.
