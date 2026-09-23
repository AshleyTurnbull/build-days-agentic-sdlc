## ADDED Requirements

### Requirement: OpenSpec-canonical Lab 1

Lab 1 SHALL use OpenSpec as the only hands-on specification-driven development
workflow and SHALL connect participant intent to repository-owned context.

#### Scenario: Participant specifies a feature

- **WHEN** a participant begins an approved feature brief
- **THEN** the lab connects its GitHub issue, OpenSpec proposal, capability
  scenarios, change design, tasks, root `DESIGN.md`, applicable `AGENTS.md`, and
  AVM constraints in one implementation path

#### Scenario: Participant compares Spec Kit

- **WHEN** the participant completes the Spec Kit comparison
- **THEN** equivalent concepts, strengths, and the reason for the OpenSpec
  workshop path are clear without installing Spec Kit or adding a second
  specification workflow

### Requirement: Non-solution examples

The starter SHALL include a compact completed OpenSpec example and AVM guidance
that demonstrate structure without implementing any participant-owned feature.

#### Scenario: Participant inspects the example

- **WHEN** the participant reads the completed example before authoring a
  change
- **THEN** it demonstrates proposal, scenarios, design, and tasks while leaving
  all participant feature outcomes unresolved

### Requirement: Concrete App and CLI orchestration

Lab 2 SHALL provide executable Copilot App and Copilot CLI paths for delegating,
monitoring, redirecting, and integrating bounded tasks derived from approved
OpenSpec tasks.

#### Scenario: Work is delegated in parallel

- **WHEN** participants create bounded agent tasks
- **THEN** each task identifies its parent issue, dependencies, non-overlapping
  owned paths, prohibited paths, acceptance scenarios, and focused validation

#### Scenario: Agent work leaves scope

- **WHEN** a participant observes an agent changing an unowned path or pursuing
  an incorrect interpretation
- **THEN** the lab provides a concrete intervention path that redirects or
  stops the work before integration

#### Scenario: Work is integrated

- **WHEN** dependent tasks are complete
- **THEN** participants integrate them in dependency order and record issue,
  branch, commit, test, and pull-request receipts on GitHub
