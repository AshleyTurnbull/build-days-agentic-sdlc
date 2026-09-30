## ADDED Requirements

### Requirement: Executable cross-platform preflight

The workshop SHALL provide a canonical Windows preflight and an equivalent Bash
preflight that verify required local tools, authentication, repository state,
GitHub configuration, Azure access, and observable cloud validation before
Lab 1.

#### Scenario: Participant environment is ready

- **WHEN** all required tools and versions, GitHub and Azure authentication,
  repository identity and template revision, Issues and Actions, environments,
  variables, resource-group access, and required cloud validations are present
- **THEN** the preflight reports each required check as passed and exits
  successfully

#### Scenario: Blocking prerequisite fails

- **WHEN** a required tool, authentication, repository invariant, GitHub
  setting, Azure scope, or completed cloud validation is missing or incorrect
- **THEN** the preflight identifies the failing check, provides an actionable
  remediation, and exits with a non-zero status

### Requirement: Honest result classification

The preflight SHALL distinguish passed, failed, advisory, manual, and
not-yet-run conditions without presenting an unverified condition as success.

#### Scenario: Copilot App installation must be checked

- **WHEN** the preflight cannot reliably determine whether Copilot App is
  installed and available
- **THEN** it reports an explicit manual check rather than a pass

#### Scenario: OIDC validation has not run

- **WHEN** no qualifying Actions run proves OIDC authentication and
  infrastructure validation for the team repository
- **THEN** the result is labeled not-yet-run or blocking according to the
  current readiness phase and is not reported as green

### Requirement: Actionable preflight evidence

Preflight results SHALL be available in human-readable and structured form so
instructors can diagnose check-in failures and retain readiness evidence.

#### Scenario: A check fails

- **WHEN** a preflight check produces a failure
- **THEN** the output identifies the check, observed state, expected state, and
  remediation without exposing credentials or tokens
