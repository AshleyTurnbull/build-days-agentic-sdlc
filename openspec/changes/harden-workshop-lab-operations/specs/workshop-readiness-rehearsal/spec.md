## ADDED Requirements

### Requirement: Timed fresh-repository rehearsal

Before the event, instructors SHALL perform a timed end-to-end rehearsal in a
new repository created from the approved template revision and prepared through
the same team-repository path used for participants.

#### Scenario: Rehearsal completes

- **WHEN** preflight, preparation, all five labs, wrap evidence, cloud-agent
  revision, deterministic security remediation, deployment, both GH-AW
  patterns, and required recovery paths complete within the agenda
- **THEN** the rehearsal records elapsed time and links the relevant GitHub,
  security, Azure, deployment, smoke-test, and workflow evidence

#### Scenario: Rehearsal exceeds the agenda

- **WHEN** required work cannot complete or recover within the scheduled time
- **THEN** event readiness remains blocked and the overrun and responsible step
  are recorded for remediation

### Requirement: Evidence-based go/no-go

Workshop readiness SHALL require successful required controls and SHALL
explicitly identify licensing, quota, policy, or preview-feature limitations.

#### Scenario: A required dependency is unavailable

- **WHEN** App Service quota, immutable OIDC configuration, Azure `what-if`,
  live deployment, smoke tests, CodeQL, cloud agents, or required GH-AW access
  cannot be proven
- **THEN** the readiness result is no-go unless the approved plan explicitly
  defines a labeled fallback for that dependency

#### Scenario: A fallback is used

- **WHEN** an approved fallback is exercised for a licensing-dependent or
  preview feature
- **THEN** the report labels the limitation and fallback and does not describe
  it as equivalent platform enforcement

### Requirement: Rehearsal isolation and hygiene

The timed rehearsal SHALL use disposable repository and Azure scope and SHALL
leave no committed secrets or attendee-specific identifiers.

#### Scenario: Rehearsal is complete

- **WHEN** instructors retain the readiness record and clean up disposable
  resources
- **THEN** required evidence remains linkable while temporary cloud resources,
  seeded vulnerable branches, and rehearsal-only identifiers are removed or
  safely archived
