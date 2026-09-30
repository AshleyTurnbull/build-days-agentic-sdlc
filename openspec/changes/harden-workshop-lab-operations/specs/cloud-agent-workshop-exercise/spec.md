## ADDED Requirements

### Requirement: Universal bounded cloud-agent issue

Every prepared team repository SHALL contain one small feature-independent
cloud-agent issue with observable acceptance criteria and a verified baseline
gap.

#### Scenario: Team starts Lab 4

- **WHEN** the team opens the seeded issue
- **THEN** it identifies linked OpenSpec scenarios, owned and prohibited paths,
  focused validation, expected pull-request evidence, and work that does not
  depend on the team's selected feature

#### Scenario: Baseline already satisfies the issue

- **WHEN** preparation detects that the repository already meets the seeded
  acceptance criteria
- **THEN** the issue is not presented as actionable and preparation reports
  that a verified replacement task is required

### Requirement: Human revision in the cloud-agent loop

The cloud-agent exercise SHALL include assignment, agent pull request, human
review, one requested bounded revision, updated checks, and human-controlled
merge.

#### Scenario: Initial agent pull request is reviewable

- **WHEN** the cloud agent opens its pull request and focused checks complete
- **THEN** its exact exercise marker and governed path set satisfy the
  specification policy and a human reviewer requests the seeded revision
  before approval

#### Scenario: Revision is completed

- **WHEN** the agent addresses the requested revision
- **THEN** updated checks and review evidence are visible and only a human can
  approve and merge the pull request
