# Design

## Context

See [proposal.md](proposal.md) for the motivation and
[spec.md](specs/release-readiness-gate/spec.md) for the behavior contract.
The application is a standalone React/Express TypeScript project under
`capstone/release-readiness-gate/`. Its current persistence is local-file or
in-memory, and its GitHub adapter can dispatch only a single configured
preflight workflow. The capstone's current local agent guide prohibits
deployment, while the repository's durable architecture expects net-new
capstone apps to have CI/CD, AVM infrastructure, and OIDC deployment.

This change authors that delivery path without operating it. Local validation
can test the application, workflow structure, and compile Bicep, but cannot
prove GitHub App access, GitHub environment protection, Azure OIDC, Azure
`validate`/`what-if`, resource provisioning, or a live deployment. Those
remain future operator actions and must not be reported as completed evidence.

## Goals / Non-Goals

**Goals:**

- Keep the application isolated and usable locally, with a separately
  configured real GitHub adapter.
- Keep manual PR preflight read-only and bound to one same-repository PR head
  SHA; never give it Azure or deployment authority.
- Provide PR/default-branch CI and a distinct post-merge Azure CD workflow.
- Make the eventual hosted application durable and secure with Azure Table
  Storage, App Service managed identity, and Key Vault for the GitHub App
  private key.
- Compose capstone resources with pinned AVMs, protect production deployment
  with GitHub environment approval, authenticate workflows through OIDC, and
  produce verifiable deployment and smoke-test evidence.
- Validate implementation and configuration locally without pushing workflows,
  configuring external identities, or running Azure operations.

**Non-Goals:**

- Hosting the dashboard, creating a GitHub App, installing it, or configuring
  GitHub environments, OIDC federation, Azure role assignments, or secrets in
  this phase.
- Running Azure CLI `validate`/`what-if`, provisioning Azure resources, or
  deploying the application during this phase. Those commands are authored
  into future CI/CD automation where specified, but will not be executed now.
- Letting the dashboard approve, merge, bypass policies, or deploy; the
  dashboard preflight and protected CD workflow remain separate.
- Deploying unmerged PR code or treating dispatch acceptance, simulated data,
  a passing preflight, or a local Bicep build as Azure deployment evidence.
- Modifying the existing feedback application or its workflows.

## Decisions

### Keep manual PR preflight separate from delivery authority

The dashboard's server-side GitHub App continues to accept only a PR number,
resolve it in the configured repository, capture its current head SHA, and
dispatch one configured preflight. The workflow validates repository identity
and SHA before checkout. CI and preflight have only the read permissions
needed for source, PR metadata, checks, and workflow status. Neither receives
Azure credentials, `id-token: write`, deployment-environment access, or a
write token capable of approving, merging, or changing policy.

The app's readiness decision remains derived from verified current-SHA check
evidence and required external evidence. Azure `what-if` remains a separate
CD-stage result; its absence is explicitly not run/unavailable and does not
become a dashboard pass. Local and simulated records remain visibly marked.

**Alternative considered:** Give the app or preflight workflow deployment
permissions so a passing spinner can launch deployment. Rejected because a
readiness display is not a human approval boundary and PR code must never
inherit Azure authority.

### Run capstone CI on PRs and default-branch commits

The capstone CI workflow runs for relevant pull requests and default-branch
pushes. It installs locked dependencies and exposes lint, type-check, test,
build, infrastructure compilation, and supported security/dependency checks
as independently diagnosable results. The same workflow file remains manually
dispatchable by the dashboard for a fresh exact-SHA preflight. Its manual
dispatch path validates the PR repository and live head before testing.

Pull-request and manual-preflight jobs check out only the validated SHA with
persisted checkout credentials disabled. Security/dependency checks that
cannot execute are reported as not run/unavailable; they are not silently
omitted from readiness. Action references and permissions follow
`.github/AGENTS.md`.

**Alternative considered:** Reuse root `ci.yml`. Rejected because it targets
the feedback application and does not cover the capstone subtree; the capstone
must have independently identifiable checks without changing workshop CI.

### Deploy only merged default-branch commits through a protected CD path

A separate capstone deployment workflow runs only after a commit reaches the
configured default branch. It validates the exact pushed commit and required
CI results, packages that same commit, and performs Azure infrastructure
validation/`what-if` through a dedicated GitHub environment using OIDC. Only
after those checks succeed does a second job enter the protected production
environment. Environment reviewers approve before any infrastructure mutation
or application deployment. The deploy job uses OIDC again and is scoped to the
assigned resource group. It deploys the Bicep composition and app package,
then checks public HTTPS health/readiness and emits a machine-readable
evidence artifact with commit, deployment identifier, URL, and verification
results.

The two environments separate a pre-deployment Azure preview from a
human-approved production mutation. Their federation subjects are exact
repository/environment subjects; no Azure client secret or publish profile is
introduced. CI does not create or alter branch protection, environments,
approvers, federation, or Azure role assignments. These are explicit external
operator setup prerequisites and remain unconfigured in this phase.

**Alternative considered:** Deploy from a PR event or let `workflow_dispatch`
select an arbitrary ref. Rejected because it can deploy unmerged/unreviewed
code and makes the deployment identity's source ambiguous. Default-branch
pushes preserve the reviewed merge boundary; environment approval remains
required.

**Alternative considered:** Put OIDC and Azure validation in the PR/manual
preflight. Rejected because a user-triggered status workflow should not gain
cloud control-plane access, and untrusted PR code must not run in a job with
deployment credentials.

### Use AVM infrastructure and managed runtime identity for hosted operation

Add an isolated composition beneath
`capstone/release-readiness-gate/infra/`. It provisions a Linux App Service,
Azure Table Storage, workspace-based monitoring, and a Key Vault using
version-pinned AVMs. Follow the existing `infra/` composition patterns for
resource-group scoping, HTTPS/TLS, diagnostic settings, tags, and Bicep
parameters. Storage shared-key access stays disabled.

Keep `ReadinessStore` as the application boundary. Local development uses the
existing file and in-memory adapters; a new Azure Table adapter provides
durable hosted run records using the App Service system-assigned managed
identity and a narrowly scoped Table Storage data-plane role. App Service
configuration holds non-secret identifiers and a Key Vault reference for the
GitHub App private key. The managed identity receives only the necessary
Table Storage and Key Vault secret-read permissions. The key itself is
provisioned into Key Vault by a later, explicitly authorized operator action;
it is never committed or passed through the browser or deployment workflow.

Use existing pinned AVM versions from `infra/README.md` where resource module
versions match. For Key Vault, select and pin a supported AVM version during
implementation and prove the module reference with local Bicep build; do not
fall back to native resources for convenience. Keep role assignment narrowly
scoped, make its required deployment authority explicit, and do not enable
shared keys.

**Alternative considered:** Keep local JSON persistence when hosted. Rejected
because local files do not provide a reliable durable, multi-process hosted
store and would lose the application's history on replacement or scale-out.

**Alternative considered:** Store the GitHub App key in source, workflow
variables, or a client-side configuration. Rejected because the private key
must remain server-side and out of source control; Key Vault plus managed
identity matches repository security boundaries.

### Make status observation recoverable and evidence-linked

Runs keep a generated request ID, PR number, repository, captured SHA, source,
workflow run identity, check outcomes, timestamps, and staleness state. The
server polls the one configured workflow with bounded backoff because GitHub
workflow dispatch does not return a run ID. Correlation timeout is pending or
unknown, never success. The app periodically refreshes the live PR head and
invalidates old readiness when it changes.

The React dashboard polls the local API while a run is active, backs off to a
bounded interval, and stops when terminal or stale. It announces meaningful
state changes accessibly, retains a last verified result with a stale marker
if refresh fails, and exposes source GitHub links and retry controls. No
color-only state is used.

**Alternative considered:** WebSockets or server-sent events. Deferred because
bounded polling is simpler to test and adequate for a small number of
concurrent runs.

### Require a three-agent quorum before presenting code-review approval

Add a separate, opt-in code-review path that accepts a PR number, verifies the
same-repository PR, and captures the current head SHA and changed-file patch.
Only after the user starts review does the server send the same bounded diff
and fixed review rubric to exactly three independently invoked, distinctly
identified agents. Model access is behind a server-side interface so local
tests can use deterministic fakes and provider credentials never enter
browser responses. The live adapters use configured OpenAI-compatible
chat-completions endpoints; agent IDs must be distinct, endpoints must be
explicitly configured, and responses are schema-validated. Source code is
sent to those configured third-party endpoints only after the UI clearly
discloses the destinations and the user starts the review.

Persist each agent's identity, decision, concise findings, and error state
separately against the captured PR SHA. Approval requires two or more of the
three valid, independent agents to return `approve` without a blocking finding
for that same SHA. The third agent may disagree or be unavailable; its result
remains visible but does not veto two clear valid approvals. Fewer than two
valid approvals, invalid output in place of a needed vote, or a changed or
unverifiable PR head yields no approval quorum. Model responses are untrusted
suggestions: the application never writes to a branch, edits files, or
auto-applies a suggestion. A human must review and apply any code change, then
run the normal checks. The code-review result is separate from CI/preflight
readiness and cannot override it.

**Alternative considered:** Allow the consensus result to commit or apply a
patch automatically. Rejected because model agreement is not a human approval
boundary and the repository requires people to approve intent and risk.

**Alternative considered:** Run reviews automatically for each dashboard
visit or preflight. Rejected because sending source to an external model is a
material user decision and incurs provider cost; a clear user action is
required.

**Alternative considered:** Require all three agents to agree or allow fewer
than three configured agents. Rejected because the requested policy is exactly
three reviewers with a two-approval quorum; a single dissent or outage should
not erase two valid approvals, and smaller panels do not satisfy the review
contract.

## Risks / Trade-offs

- **GitHub App dispatch requires repository `Actions: write`** → Keep one
  repository and workflow fixed in server configuration, expose no arbitrary
  dispatch route, document the permission as broader than a single endpoint,
  and require owner review before installation.
- **PR code is untrusted** → Run CI on ephemeral runners, use read-only tokens,
  disable persisted checkout credentials, do not pass secrets or OIDC to PR
  jobs, and deploy only a default-branch commit after merge.
- **Azure OIDC deployment needs external identity and RBAC setup** → Keep the
  exact environment and repository binding documented, scope permissions to
  the assigned resource group, separate validation and production identities,
  and require a protected environment reviewer before mutation.
- **Bicep role assignment requires elevated Azure authority** → Declare the
  required role and scope as a reviewed setup prerequisite; do not hide an
  Owner/Contributor grant or run the assignment in this worktree.
- **Key Vault and GitHub App key do not exist yet** → Keep real integration
  disabled until an operator creates/installs the App, stores the key, and
  configures the managed-identity reference. Never fake these prerequisites.
- **Azure `what-if` can fail due permissions, policy, or platform state** →
  Stop before deployment, retain failure details and commit identity, and
  require a rerun after correction.
- **Deployment passes but app is unhealthy** → Fail the workflow, retain
  diagnostics and deployment identity, and do not publish a success evidence
  artifact until live smoke checks pass.
- **Azure evidence is intentionally absent during local work** → Keep
  dashboard readiness blocked for missing evidence and distinguish local
  Bicep compilation from authenticated Azure validation or deployment.
- **Hosted storage migrations may invalidate records** → Version and validate
  stored entities, preserve the store interface, and document recovery before
  switching the hosted adapter.
- **Pull-request code may be sensitive when sent to a model provider** → Show
  the configured endpoint and model IDs before review, send only after explicit
  user action, bound request size, avoid logging diffs or provider keys, and
  document that provider-side retention follows its own policy.
- **Model output may be wrong or malformed** → Treat output as untrusted,
  validate its schema, preserve each of the three results, require at least
  two valid approvals without blocking findings, and require a human to apply
  changes and rerun checks.

## Migration Plan

There is no production migration in this phase. Add the hosted storage adapter,
infrastructure composition, CI workflow, CD workflow, tests, and setup/recovery
documentation as new capstone-owned artifacts. Verify application checks,
workflow structure, and local Bicep compilation without GitHub/Azure
credentials. Do not push, install, configure environments or federation, run
Azure deployment `validate`/`what-if`, create resources, or deploy.

A future operator rollout must first configure the GitHub App and Key Vault
secret, create protected GitHub validation/production environments and OIDC
federation, assign reviewed resource-group-scoped permissions, publish the
workflows, and inspect successful CI and Azure `what-if` evidence. Only then
may a human approve the production environment and permit deployment. Rollback
is a protected redeployment of a previously reviewed default-branch commit
plus the documented infrastructure recovery procedure; it is not an
automated destructive teardown.

## Durable Architecture Impact

The capstone app gains a deployed-service pattern already established by root
`DESIGN.md`: Express on Azure App Service, Azure Table Storage behind a storage
interface, managed identity, AVM infrastructure, and GitHub OIDC. No root
design update is required because the change stays inside the existing
capstone boundary and follows the repository's delivery architecture.
