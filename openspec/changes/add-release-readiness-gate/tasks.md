# Tasks

## 1. Standalone local application

- [x] 1.1 Add the isolated capstone app scaffold, local scripts, lockfile, app-local instructions, and developer documentation; verify `npm ci` and the documented local commands run without changing root application manifests or `src/`.
- [x] 1.2 Implement run/check/readiness contracts and current-head evidence rules; add unit tests proving stale, failed, skipped, unavailable, simulated, and not-run Azure checks cannot produce a deployment-ready result.
- [x] 1.3 Implement validated in-memory/local-file persistence and the hosted storage interface; test reload, atomic serialized writes, invalid-state errors, and local state exclusion from Git.

## 2. GitHub integration and continuous integration

- [x] 2.1 Implement a server-side GitHub App adapter for same-repository PR lookup, configured-workflow dispatch, correlation, and status lookup; test forks, malformed/not-found PRs, unavailable credentials, API errors, correlation timeout, and secret-free errors with a fake adapter.
- [x] 2.2 Add the capstone PR/default-branch CI and manually dispatchable preflight workflow; validate the exact PR head before checkout, run app/security/dependency checks, use least privilege, and verify the source contains no Azure login, OIDC, deployment, approval, merge, or policy-editing authority.
- [x] 2.3 Add workflow-structure/policy tests for triggers, SHA validation, check results, optional-check unavailability, permissions, and prohibited deployment authority; run the tests locally without publishing the workflow.

## 3. API and progress dashboard

- [x] 3.1 Implement local API routes to create, list, and refresh runs; test input validation, dispatch deduplication, current-head verification, real status mapping, stale results, and explicit integration-unavailable errors.
- [x] 3.2 Implement the accessible dashboard with manual run start, spinners/text progress, per-check outcomes, source links, stale/retry/error states, and simulated-evidence labels; test keyboard interaction, announcements, loading, empty, failure, blocked, and completed states.
- [x] 3.3 Bind the server to loopback by default and enforce same-origin mutation requests; test rejected cross-origin requests, health/readiness, and that credentials never appear in API responses.
- [x] 3.4 Implement an opt-in review service that sends the same bounded same-repository PR diff to exactly three distinct configured agent IDs, validates and preserves each response, reports approval only with at least two valid approvals on the current SHA, and never applies code changes; test all vote combinations, provider failure, invalid output, missing config, changed head, and secret/source-content non-disclosure.
- [x] 3.5 Add an accessible review panel that discloses the three configured model endpoints and IDs before explicit review consent, shows each agent's independent findings and failures, and reports two-of-three quorum only when earned; test empty, loading, unavailable, dissent, quorum, no quorum, stale, and human-apply-only states.

## 4. Hosted infrastructure and protected delivery structure

- [x] 4.1 Add capstone-local Bicep composition for App Service, durable Table Storage, monitoring, and Key Vault using pinned AVMs, managed identity, least-privilege role assignments, and non-secret parameters; validate with local `az bicep build` only and do not authenticate to Azure.
- [x] 4.2 Implement and test the Azure Table storage adapter using the app's managed identity configuration; verify local file/in-memory adapters remain usable without Azure settings and add persistence/restart tests for the hosted adapter boundary.
- [x] 4.3 Add a separate default-branch-only CD workflow source with OIDC-based Azure validate/what-if, protected production environment approval, deployment, health/readiness/smoke checks, and machine-readable evidence; add structural tests proving PR/preflight jobs cannot access deployment authority and CD cannot target an unmerged PR.
- [x] 4.4 Document future GitHub App installation, Key Vault population, environment protection, OIDC federation, Azure RBAC, validation, deployment, evidence review, and recovery; clearly state these are external setup steps and verify documented local-only commands.
- [x] 4.5 Document three-agent endpoint/model ID configuration, credential handling, explicit source-sharing consent, provider data-retention considerations, two-of-three quorum semantics, and the human-only code-application boundary.

## 5. Local integration verification

- [x] 5.1 Run capstone lint, type-check, unit/API/UI tests, build, and smoke checks; run workflow-structure tests, local Bicep compilation, OpenSpec validation, and diff hygiene without publishing workflows or contacting Azure.
- [x] 5.2 Exercise deterministic simulated GitHub progress and confirm Azure what-if, deployment, and live smoke evidence remain not run and block deployment readiness; verify a PR head change invalidates prior evidence.
- [x] 5.3 Exercise three-agent review with deterministic fake providers and verify no request is sent before explicit user action, exactly two approvals are sufficient, fewer than two never pass, provider failures never fall back to fabricated votes, and review cannot modify source or bypass preflight.
