## ADDED Requirements

### Requirement: Private or protected reviewed checkpoints

Reviewed recovery states for `lab1-start`, `lab2-start`, `lab3-start`,
`lab4-start`, and `lab5-start` SHALL remain in a private instructor repository
instructor repository that participants cannot read until a specific recovery
is required.

#### Scenario: Participant browses the template

- **WHEN** a participant can read the public template default branch and normal
  team repository refs
- **THEN** completed later-lab solutions are not available through recovery
  checkpoint storage

### Requirement: Non-destructive selective publication

The instructor SHALL be able to publish one selected checkpoint into one team
repository as a new recovery branch without deleting or rewriting participant
work.

#### Scenario: A team needs recovery

- **WHEN** the instructor selects an approved checkpoint and target team
  repository
- **THEN** a new clearly named recovery branch is created from only that
  checkpoint, participant branches and default history are preserved, and
  instructor-origin evidence is labeled separately

#### Scenario: Target recovery branch already exists

- **WHEN** publication would overwrite an existing recovery or participant
  branch
- **THEN** publication stops or chooses a new explicit branch name and never
  force-pushes the existing branch

### Requirement: Checkpoint usability

Every checkpoint SHALL be validated by beginning at that state and completing
the next lab without requiring access to a later solution.

#### Scenario: Checkpoint is approved for event use

- **WHEN** instructors validate a checkpoint
- **THEN** the next lab's prerequisites, commands, and expected evidence
  complete successfully within its recovery time budget
