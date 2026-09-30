## ADDED Requirements

### Requirement: Explicit isolated team repository preparation

The instructor preparation path SHALL configure one pre-created repository per
team only after receiving explicit target repository, approved template
revision, feature brief, Azure scope, and confirmation inputs.

#### Scenario: Instructor prepares a valid repository

- **WHEN** the target repository derives from the approved template revision
  and the instructor supplies all required inputs
- **THEN** preparation configures or verifies the workshop environments,
  non-secret variables, labels, seeded issues, supported settings, and Azure
  scope for that repository

#### Scenario: Repository provenance is wrong

- **WHEN** the target repository cannot be verified against the approved
  template revision
- **THEN** preparation stops before seeding exercises or changing trust
  configuration and reports the mismatch

### Requirement: Safe idempotent convergence

Repository preparation SHALL be safe to rerun and SHALL verify postconditions
instead of duplicating seeded work or weakening existing protections.

#### Scenario: Preparation is rerun

- **WHEN** the instructor runs preparation again with the same desired inputs
- **THEN** existing matching resources are verified or updated in place, no
  duplicate labels, issues, branches, or pull requests are created, and
  protections are not reduced

#### Scenario: A required setting cannot be automated

- **WHEN** organization policy or a platform UI is required to complete a
  setting
- **THEN** preparation reports the exact manual action and treats an unresolved
  blocking invariant as not ready

### Requirement: Immutable secretless Azure federation

Azure federation for each team repository SHALL be constrained by immutable
GitHub repository and owner identities plus the intended GitHub environment,
and SHALL NOT use a long-lived client secret.

#### Scenario: OIDC trust is verified

- **WHEN** preparation validates the federated identity used by a workshop
  environment
- **THEN** the configured claims match the target repository's numeric
  repository ID, numeric owner ID, and exact environment scope

#### Scenario: Trust is broader than approved

- **WHEN** federation relies on a mutable name-only subject, a wildcard
  repository or environment, or a client-secret fallback
- **THEN** preparation fails the readiness check and does not report the
  repository as prepared
