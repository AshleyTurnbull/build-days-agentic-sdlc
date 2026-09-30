## ADDED Requirements

### Requirement: Participant-authored evidence review

The starter repository SHALL provide a working reference GH-AW and an incomplete evidence-review starter that participants author to evaluate linked OpenSpec scenarios, pull-request checks, security results, and Azure deployment evidence.

#### Scenario: Evidence is complete

- **WHEN** the team completes the evidence-review instructions, declares one safe output, and compiles the workflow
- **THEN** the workflow evaluates the available linked requirements, checks, security status, and deployment record and produces a concise evidence summary

#### Scenario: Evidence is incomplete

- **WHEN** required specification, validation, security, or deployment evidence is missing or inconsistent
- **THEN** the workflow identifies the missing evidence without claiming the change is complete

### Requirement: Narrow authority

The evidence workflow SHALL use read-only permissions by default and SHALL declare only the write output required for the exercise.

#### Scenario: Workflow evaluates a pull request

- **WHEN** the workflow processes repository and deployment evidence
- **THEN** it cannot approve, merge, bypass repository rules, edit protected workflows, or deploy resources

### Requirement: Reproducible workflow generation

The participant end state SHALL retain the team-authored GH-AW Markdown source and its generated lock workflow together.

#### Scenario: Workflow source changes

- **WHEN** the Markdown source is modified
- **THEN** validation detects a missing or stale generated lock workflow and provides the compile command
