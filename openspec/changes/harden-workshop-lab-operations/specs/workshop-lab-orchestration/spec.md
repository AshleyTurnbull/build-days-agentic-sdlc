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

#### Scenario: Participant consults external SDD references

- **WHEN** official OpenSpec or Spec Kit material is linked
- **THEN** OpenSpec is identified as the canonical hands-on path and Spec Kit
  remains comparison-only without installation, `.specify/`, or parallel
  implementation artifacts

### Requirement: Non-solution examples

The starter SHALL include a compact completed OpenSpec example and AVM guidance
that demonstrate structure without implementing any participant-owned feature.

#### Scenario: Participant inspects the example

- **WHEN** the participant reads the completed example before authoring a
  change
- **THEN** it demonstrates proposal, scenarios, design, and tasks while leaving
  all participant feature outcomes unresolved

### Requirement: Concrete GitHub Copilot App orchestration

Lab 2 SHALL provide an executable GitHub Copilot App path for planning,
delegating, monitoring, redirecting, and integrating bounded tasks derived from
approved OpenSpec tasks.

#### Scenario: Work is delegated in parallel

- **WHEN** participants create bounded agent tasks
- **THEN** each task identifies its parent issue, dependencies, non-overlapping
  owned paths, prohibited paths, acceptance scenarios, and focused validation

#### Scenario: Participant selects a session mode

- **WHEN** work is ambiguous, requires approval, can run independently, or is a
  bounded autonomous goal
- **THEN** the lab directs the participant to use Interactive, Plan, Fleet, or
  Autopilot respectively and explains the human gate before continuing

#### Scenario: Agent work leaves scope

- **WHEN** a participant observes an agent changing an unowned path or pursuing
  an incorrect interpretation
- **THEN** the lab provides a concrete intervention path that redirects or
  stops the work before integration

#### Scenario: Work is integrated

- **WHEN** dependent tasks are complete
- **THEN** participants integrate them in dependency order and record issue,
  branch, commit, test, and pull-request receipts on GitHub

### Requirement: App-native participant prompts

Every participant lab SHALL use short GitHub Copilot App prompt cards and SHALL
not require attendees to execute terminal or shell procedures.

#### Scenario: Participant uses a prompt card

- **WHEN** a participant begins a lab step
- **THEN** the card identifies the App surface or mode, context to attach,
  copy-ready prompt, expected output, and next human decision

#### Scenario: Validation requires repository commands

- **WHEN** a lab must run tests, OpenSpec validation, compilation, security
  checks, or deployment tooling
- **THEN** the participant prompts the App to use the checked-in repository
  workflow and independently reviews the resulting output or GitHub evidence

#### Scenario: Participant reaches a human gate

- **WHEN** the agent proposes a plan, encounters ambiguous scope, changes a
  security-sensitive boundary, or prepares merge or deployment
- **THEN** it stops for participant review rather than treating the prompt as
  approval

#### Scenario: Participant reads broader methodology guidance

- **WHEN** optional community Agentic SDLC resources are linked
- **THEN** they are separated from execution instructions and cannot redefine
  repository requirements, permissions, version pins, or completion evidence
