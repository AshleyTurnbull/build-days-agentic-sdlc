## ADDED Requirements

### Requirement: Isolated deterministic CodeQL finding

The instructor SHALL seed a dedicated non-production branch and draft pull
request containing a synthetic fixture that deterministically triggers an
identified query in the configured CodeQL suite.

#### Scenario: Security exercise is seeded

- **WHEN** the instructor creates the exercise with credentials that trigger
  normal pull-request workflows
- **THEN** CodeQL reports the expected finding on the draft pull request and a
  sanitized issue links the finding, OpenSpec scenario, acceptance criteria,
  focused validation, and remediation pull request

#### Scenario: Application is built or deployed

- **WHEN** normal application build and deployment inputs are evaluated
- **THEN** the vulnerable fixture is excluded and cannot affect the deployed
  application

### Requirement: Safe security fixture

The deterministic fixture SHALL contain no credential, live secret,
attendee-specific data, or usable production exploit and SHALL never be
present on the template default branch.

#### Scenario: Fixture content is inspected

- **WHEN** instructors validate the seeded branch before an event
- **THEN** the fixture is synthetic, isolated, non-secret, and limited to the
  intended scanner demonstration

### Requirement: Verifiable remediation

The exercise SHALL have one small testable remediation that removes the
expected CodeQL finding before merge.

#### Scenario: Participant applies the approved fix

- **WHEN** the remediation and focused test are pushed to the exercise pull
  request
- **THEN** CodeQL no longer reports the expected finding and required checks
  pass without suppressing or disabling the query

#### Scenario: Finding remains

- **WHEN** CodeQL still reports the expected finding or scanning is skipped
- **THEN** the exercise is not complete and the pull request is not presented
  as safely remediated
