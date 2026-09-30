## ADDED Requirements

### Requirement: Validated pull-request deployment linkage

A workshop deployment SHALL accept and validate the pull request associated
with the deployed commit before publishing pull-request evidence.

#### Scenario: Pull request matches the deployment

- **WHEN** the supplied pull request belongs to the repository and contains the
  commit being deployed
- **THEN** the deployment may use that pull request as the evidence target

#### Scenario: Pull request input is invalid

- **WHEN** the supplied pull request is absent, belongs to another repository,
  or does not contain the deployed commit
- **THEN** evidence publication fails without commenting on an unrelated pull
  request

### Requirement: Machine-readable successful deployment evidence

After successful deployment verification, the workflow SHALL preserve compact
machine-readable evidence containing the commit SHA, pull-request number,
required check and security status, Azure run or deployment identifier,
environment, application URL, and health, readiness, and API smoke-test
results.

#### Scenario: Deployment and smoke tests pass

- **WHEN** infrastructure and application deployment complete and all required
  post-deployment checks pass
- **THEN** one evidence artifact is published with all required fields linked
  to the successful workflow run

#### Scenario: Deployment verification fails

- **WHEN** deployment, health, readiness, API smoke tests, or required security
  checks fail
- **THEN** the workflow does not publish success-shaped deployment evidence

### Requirement: Narrow idempotent pull-request publication

Only the evidence-publication job SHALL receive pull-request write permission,
and it SHALL create or update one concise evidence comment after success.

#### Scenario: Successful deployment is rerun

- **WHEN** a qualifying deployment for the same pull request is rerun
- **THEN** the workflow updates its existing marked evidence comment rather
  than creating duplicate comments

#### Scenario: Another job executes

- **WHEN** validation, build, infrastructure, deployment, or smoke-test jobs
  execute
- **THEN** they do not receive pull-request write permission solely for
  evidence publication
