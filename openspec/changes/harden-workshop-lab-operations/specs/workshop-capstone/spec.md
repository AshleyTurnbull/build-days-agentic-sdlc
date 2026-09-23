## ADDED Requirements

### Requirement: Optional App-led net-new application capstone

The workshop SHALL provide an optional 90-120 minute extension or follow-up in
which a team selects a bounded brief and creates a net-new application under
`capstone/<app-name>/` in its existing repository.

#### Scenario: Team selects a capstone brief

- **WHEN** a team begins the capstone
- **THEN** it selects one of four comparable briefs whose minimum outcome,
  non-goals, ownership boundaries, test evidence, defect scenario, and
  deployment target fit the time box

#### Scenario: Capstone remains isolated

- **WHEN** agents implement the capstone application
- **THEN** capstone source, tests, infrastructure, and workflow changes remain
  independently identifiable and the existing feedback application is not
  modified as a shortcut

### Requirement: App-native specified and ticket-driven delivery

The capstone SHALL use GitHub Copilot App sessions to approve an OpenSpec
contract, translate tasks into GitHub work, and execute non-overlapping work.

#### Scenario: Work is planned

- **WHEN** a team starts a Plan mode session
- **THEN** the proposed OpenSpec artifacts and parent/child issue graph identify
  owned paths, prohibited paths, dependencies, focused validation, and
  completion receipts before implementation begins

#### Scenario: Work executes in parallel

- **WHEN** at least two independent capstone tasks are ready
- **THEN** Fleet or isolated sessions execute them with non-overlapping
  ownership and participants integrate them in dependency order through
  reviewed pull requests

#### Scenario: A bounded goal is approved

- **WHEN** one feature or defect has explicit acceptance criteria, scope, and
  validation
- **THEN** a participant may use Autopilot to execute that goal while retaining
  human review of the resulting diff, checks, and pull request

### Requirement: Governed capstone CI/CD and remediation

The capstone SHALL use GitHub Actions, AVM-first Azure infrastructure, GitHub
OIDC, independent checks, and a real ticket-driven defect-remediation loop.

#### Scenario: Capstone change is validated and deployed

- **WHEN** implementation pull requests are ready
- **THEN** capstone-scoped CI runs repository-approved validation,
  infrastructure validation uses pinned AVM composition, and deployment uses
  the protected OIDC boundary with health, readiness, and functional evidence

#### Scenario: A defect is discovered

- **WHEN** a focused test, review, security result, or deployed behavior exposes
  a capstone defect
- **THEN** the team creates a bounded bug issue, routes it through a fresh App
  session without hidden conversation context, verifies the fix independently,
  and records the pull-request and check receipts

### Requirement: Capstone operational feedback

The capstone SHALL include a participant-authored GH-AW with one narrow safe
output and a final evidence reconstruction.

#### Scenario: Team authors the workflow

- **WHEN** the capstone has real issue, pull-request, check, security, and
  deployment evidence
- **THEN** an App prompt uses the approved GH-AW creation guide to propose and
  create a release-readiness or bug-triage workflow with exactly one safe
  output and no approval, merge, policy-bypass, or deployment authority

#### Scenario: Reviewer reconstructs the result

- **WHEN** the capstone concludes
- **THEN** a reviewer can follow the parent issue, OpenSpec artifacts, task
  issues, session receipts, pull requests, checks, defect fix, deployment, and
  GH-AW output without access to the originating conversations
