# Spec Delta

## Purpose

The release readiness gate gives a user an evidence-based, commit-specific view
of pre-deployment checks and makes missing or stale evidence visibly block
readiness rather than relying on manual checkboxes.

## ADDED Requirements

### Requirement: User can start a commit-bound preflight

The system SHALL let an authorized user select a pull request in the configured
repository and explicitly start the approved preflight workflow for that pull
request's current head commit.

#### Scenario: Start checks for the current pull request head

- **WHEN** a user submits a valid pull request number
- **THEN** the system SHALL resolve the pull request in the configured
  repository, capture its current head commit SHA, and dispatch only the
  configured preflight workflow with the pull request number and captured SHA

#### Scenario: Reject pull requests outside the configured repository

- **WHEN** a pull request belongs to a fork or another repository
- **THEN** the system SHALL reject the run before dispatch and explain that
  only pull requests in the configured repository are supported

#### Scenario: Reject malformed or unavailable pull requests

- **WHEN** the user submits a malformed pull request number or GitHub cannot
  resolve that pull request
- **THEN** the system SHALL return an actionable error and SHALL NOT dispatch
  a workflow

#### Scenario: GitHub integration is not configured

- **WHEN** no valid GitHub App integration is configured
- **THEN** the system SHALL disable real dispatch, explain which external
  configuration is missing without exposing credentials, and SHALL NOT report
  simulated test data as a real run

### Requirement: Preflight executes without deployment authority

The approved preflight workflow SHALL validate only the selected commit and
SHALL NOT deploy, approve, merge, modify repository policy, or access Azure
credentials or deployment environments.

#### Scenario: Validate a pull request commit

- **WHEN** the dispatched workflow begins
- **THEN** it SHALL verify that the pull request still belongs to the configured
  repository and that its current head SHA matches the requested SHA before
  checking out or testing that commit

#### Scenario: Pull request head changes before execution

- **WHEN** the pull request head SHA no longer matches the requested SHA
- **THEN** the workflow SHALL stop before running checks and report a stale
  commit result

#### Scenario: Workflow permissions are constrained

- **WHEN** the preflight workflow runs
- **THEN** it SHALL use read-only repository permissions, run no deployment or
  Azure action, and SHALL NOT receive secrets or write access capable of
  approving, merging, or changing repository policy

### Requirement: User can observe per-check progress

The system SHALL display the selected pull request, exact commit SHA, run
identity, and a current status for every configured preflight check, refreshing
the view while a run is queued or in progress.

#### Scenario: A run is queued or in progress

- **WHEN** GitHub reports a run as queued or in progress
- **THEN** the system SHALL identify the active run, show each known check as
  queued, running, or not started, and provide a perceivable busy indicator
  with an accessible text equivalent

#### Scenario: A run completes

- **WHEN** GitHub reports terminal results for the run
- **THEN** the system SHALL show each check's actual conclusion and link to the
  source GitHub run or check details

#### Scenario: Status refresh fails

- **WHEN** the system cannot refresh GitHub status
- **THEN** it SHALL preserve the last verified result, identify it as stale,
  show the retrieval error, and offer a retry without presenting the stale
  state as current

### Requirement: Readiness requires fresh evidence

The system SHALL report readiness as ready only when every configured required
check has a passing result for the selected pull request's current head SHA and
every required external validation has verified evidence.

#### Scenario: All required checks pass for the selected commit

- **WHEN** every configured required check passes and its recorded SHA equals
  the current pull request head SHA
- **THEN** the system SHALL report the checks as passed for that commit

#### Scenario: A required check fails, is skipped, or is unavailable

- **WHEN** any configured required check fails, is skipped, or cannot be
  observed
- **THEN** the system SHALL report readiness as blocked and identify the
  specific check and its actual state

#### Scenario: Pull request head changes after a successful run

- **WHEN** the current pull request head SHA differs from the SHA associated
  with the last successful run
- **THEN** the system SHALL invalidate that run for readiness and require a
  new preflight run

#### Scenario: Azure validation has not run

- **WHEN** Azure validation or `what-if` has not been executed in an authorized
  Azure environment
- **THEN** the system SHALL mark Azure evidence as not run or unavailable and
  SHALL NOT report deployment readiness as ready

#### Scenario: Local test fixture represents a passing run

- **WHEN** the application is running with simulated GitHub evidence for local
  development or tests
- **THEN** the interface SHALL label the evidence as simulated and SHALL NOT
  represent it as a real GitHub run or deployment-readiness receipt

### Requirement: Dashboard is accessible and recoverable

The system SHALL provide an accessible dashboard for selecting a pull request,
starting its preflight, observing progress, and understanding outcomes.

#### Scenario: User starts a run

- **WHEN** the user activates the start action with a valid pull request number
- **THEN** the interface SHALL show an in-progress state, prevent accidental
  duplicate submissions while dispatch is pending, and announce status changes
  to assistive technology

#### Scenario: User encounters a validation or integration error

- **WHEN** the pull request input is invalid or dispatch/status retrieval
  fails
- **THEN** the interface SHALL associate validation with the input, show an
  actionable textual error, preserve the entered value, and provide retry when
  safe

#### Scenario: User views check status

- **WHEN** the dashboard displays progress or results
- **THEN** status SHALL be understandable without color, controls SHALL be
  keyboard-operable and labeled, and loading, empty, failure, and completion
  states SHALL be perceivable

### Requirement: GitHub App authority is limited

The application SHALL use a repository-scoped GitHub App integration for real
workflow dispatch and run/check lookup, and SHALL not expose the App private
key or installation credential to the browser.

#### Scenario: Dispatch only the configured workflow

- **WHEN** the server dispatches a preflight
- **THEN** it SHALL use the single configured workflow identifier and validated
  repository/ref inputs, and SHALL reject arbitrary workflow identifiers or
  refs supplied by a browser request

#### Scenario: GitHub App credentials are unavailable

- **WHEN** App credentials are missing or invalid
- **THEN** the service SHALL return an explicit integration-unavailable error,
  keep credentials out of responses and logs, and SHALL NOT fall back to a
  success-shaped simulated result

#### Scenario: GitHub App lacks protected authority

- **WHEN** the App integration is configured
- **THEN** its granted permissions SHALL exclude contents write, pull-request
  write, administration, environment administration, and deployment
  permissions; the application SHALL not provide approval, merge, or policy
  bypass operations

### Requirement: Local operation is honest about external evidence

The application SHALL support local development and validation without
requiring Azure access, while distinguishing local results from remote GitHub
and Azure evidence.

#### Scenario: Application runs locally without Azure credentials

- **WHEN** a developer starts the application locally with Azure validation
  unconfigured
- **THEN** local app behavior and tests SHALL remain usable, Azure validation
  SHALL remain not run, and no Azure resource SHALL be provisioned or changed

#### Scenario: Workflow source is only present locally

- **WHEN** the capstone preflight workflow has not been published to an
  eligible GitHub ref
- **THEN** the application SHALL explain that remote dispatch is unavailable
  and SHALL NOT claim that the workflow ran

### Requirement: Capstone changes receive continuous integration

The delivery system SHALL validate relevant capstone pull requests and default-branch commits with reproducible application and infrastructure checks. A manual preflight SHALL validate the exact same-repository pull-request head selected by the user and SHALL remain separate from Azure deployment authority.

#### Scenario: A pull request changes the capstone

- **WHEN** a pull request changes the readiness application, its infrastructure, or its delivery workflows
- **THEN** CI SHALL run the locked-dependency install, lint, type-check, tests, production build, infrastructure compilation, and configured security/dependency checks against the pull-request commit

#### Scenario: A user manually starts preflight

- **WHEN** the dashboard dispatches the configured preflight for a pull request and commit SHA
- **THEN** the workflow SHALL verify the pull request is in the configured repository and still has that SHA before checking out or testing it, and SHALL expose individual check results

#### Scenario: An optional security check cannot run

- **WHEN** a security or dependency check is unsupported or unavailable
- **THEN** the run SHALL identify it as unavailable or not run and SHALL NOT represent it as passed

#### Scenario: A pull-request workflow is inspected for authority

- **WHEN** capstone CI or the manual preflight runs on pull-request code
- **THEN** it SHALL have no Azure credentials, OIDC token permission, deployment environment, or ability to approve, merge, or modify repository policy

### Requirement: Azure deployment follows a protected post-merge path

The delivery system SHALL deploy only a validated commit on the configured default branch, using GitHub OIDC and a protected approval environment. Application preflight SHALL not deploy or claim that deployment was approved.

#### Scenario: A validated commit reaches the default branch

- **WHEN** a commit is pushed to the configured default branch after merge
- **THEN** the delivery workflow SHALL run CI for that exact commit, compile the capstone infrastructure, and produce Azure deployment `validate`/`what-if` evidence before offering deployment

#### Scenario: Azure validation fails or is unavailable

- **WHEN** Azure authentication, infrastructure validation, or `what-if` fails or is not configured
- **THEN** deployment SHALL stop and the workflow SHALL expose the failing or unavailable evidence without a success-shaped fallback

#### Scenario: A deployment requires human approval

- **WHEN** the validated deployment reaches its protected production environment
- **THEN** GitHub SHALL require the configured environment protection approval before any infrastructure mutation or application deployment occurs

#### Scenario: Deployment is requested for an unmerged pull request

- **WHEN** a pull-request commit has not reached the configured default branch
- **THEN** the CD workflow SHALL NOT deploy it

#### Scenario: Azure deployment completes

- **WHEN** infrastructure and the application have been deployed from the validated default-branch commit
- **THEN** the workflow SHALL verify application health/readiness, emit a deployment identifier and URL, and preserve machine-readable evidence linking the commit, Azure deployment, and verification results

### Requirement: Hosted readiness data is durable and credentials remain server-side

The hosted application SHALL persist readiness runs in an Azure data store through its managed identity and SHALL keep GitHub App private-key material in a managed secret store. Local development SHALL continue to work without Azure credentials.

#### Scenario: The hosted application is restarted

- **WHEN** the hosted API restarts after saving a readiness run
- **THEN** the run SHALL remain available from durable storage

#### Scenario: The hosted application accesses Azure resources

- **WHEN** the application reads or writes readiness data or reads its GitHub App key
- **THEN** it SHALL use its assigned managed identity and the minimum configured data-plane permissions, without storage account keys or GitHub App keys in source control or client responses

#### Scenario: Local development has no Azure configuration

- **WHEN** a developer runs the application locally without Azure credentials
- **THEN** local file or in-memory persistence and application tests SHALL remain usable, and the UI SHALL make clear that local evidence is not a hosted deployment result

### Requirement: Code review requires a three-agent approval quorum

The application SHALL provide an explicit, opt-in review of a selected
same-repository pull request using exactly three distinct configured review
agents. It SHALL send the same captured pull-request diff and review
instructions to each agent, preserve their results independently, and report
quorum approval only when at least two agents return an approval for the same
commit. An agent review SHALL NOT modify a branch or apply a code change; a
human remains responsible for deciding whether and how to apply any
recommendation.

#### Scenario: User starts a review

- **WHEN** a user explicitly starts a code review for a valid pull request
- **THEN** the server SHALL verify the pull request belongs to the configured
  repository, capture its current head SHA, fetch that commit's changed files,
  and send identical review input to exactly three distinct configured agent
  IDs

#### Scenario: At least two agents approve

- **WHEN** at least two of the three valid agent responses independently
  approve the same pull-request head SHA and have no blocking finding
- **THEN** the dashboard SHALL report a two-of-three quorum for that SHA and
  show all three agent identities and review results, while requiring a human
  to apply any code change

#### Scenario: Fewer than two agents approve

- **WHEN** fewer than two agents return valid approvals without blocking
  findings
- **THEN** the dashboard SHALL report no quorum approval, preserve all three
  responses, identify each rejection, blocker, or unavailable result, and
  SHALL NOT present the review as approved

#### Scenario: An agent is unavailable or returns an invalid response

- **WHEN** any configured agent cannot be reached, times out, or returns an
  invalid response
- **THEN** the review SHALL report an explicit incomplete or unavailable
  result and preserve every response; quorum approval MAY be reported only if
  two other valid agents approve without blocking findings

#### Scenario: Pull-request head changes during review

- **WHEN** the pull-request head SHA changes or cannot be verified during
  review
- **THEN** the server SHALL mark the review stale and SHALL NOT report
  consensus for the new head

#### Scenario: Review providers are not configured

- **WHEN** exactly three distinct agent IDs and their server-side provider credentials
  are not configured
- **THEN** the UI SHALL disable real model review, explain that configuration
  is unavailable without disclosing credentials, and SHALL NOT fabricate
  agent responses

#### Scenario: User has not explicitly started a review

- **WHEN** no user has started a review for the selected pull request
- **THEN** the application SHALL NOT send pull-request source code to a model
  provider
