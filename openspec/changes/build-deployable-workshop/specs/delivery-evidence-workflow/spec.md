## ADDED Requirements

### Requirement: Evidence review

The GitHub Agentic Workflow SHALL evaluate the linked OpenSpec scenarios, pull-request checks, security result, and Azure deployment evidence.

#### Scenario: Evidence is complete

- **WHEN** the linked requirements, required checks, security status, and deployment record are available
- **THEN** the workflow produces a concise evidence summary through its declared safe output

#### Scenario: Evidence is incomplete

- **WHEN** required specification, validation, security, or deployment evidence is missing or inconsistent
- **THEN** the workflow identifies the missing evidence without claiming the change is complete

### Requirement: Narrow authority

The evidence workflow SHALL use read-only permissions by default and SHALL declare only the write output required for the exercise.

#### Scenario: Workflow evaluates a pull request

- **WHEN** the workflow processes repository and deployment evidence
- **THEN** it cannot approve, merge, bypass repository rules, edit protected workflows, or deploy resources

### Requirement: Reproducible workflow generation

The repository SHALL retain the GH-AW Markdown source and its generated lock workflow together.

#### Scenario: Workflow source changes

- **WHEN** the Markdown source is modified
- **THEN** validation detects a missing or stale generated lock workflow and provides the compile command

