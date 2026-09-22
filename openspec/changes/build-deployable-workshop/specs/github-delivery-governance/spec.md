## ADDED Requirements

### Requirement: Specification approval

Material application, infrastructure, security, and workflow changes SHALL have an OpenSpec change reviewed through a specification pull request before implementation is merged.

#### Scenario: Specification is ready

- **WHEN** proposal, capability specs, design, and tasks are valid and reviewable
- **THEN** the team can approve the specification pull request and begin implementation tasks

#### Scenario: Material change lacks a specification

- **WHEN** a pull request changes a governed path without linking an applicable OpenSpec change
- **THEN** the repository policy check fails with instructions for creating or linking the change

### Requirement: GitHub-visible task orchestration

Implementation units SHALL be represented by durable GitHub work items with ownership, dependencies, validation, and execution receipts.

#### Scenario: Task is delegated to an agent

- **WHEN** a task is assigned to a local or cloud agent
- **THEN** the work item identifies the parent change, owned paths, dependencies, completion evidence, and resulting branch, commit, or pull request

### Requirement: Independent validation

The repository SHALL use GitHub Actions and GitHub security controls to validate implementation claims independently from the implementing agent.

#### Scenario: Pull request is ready to merge

- **WHEN** an implementation pull request satisfies its linked scenarios
- **THEN** required lint, type, test, build, security, and policy checks pass and a human reviewer can inspect their evidence

### Requirement: Context continuity

Repository-owned instructions SHALL provide sufficient context for a fresh local or cloud agent to continue bounded work without the original agent conversation.

#### Scenario: Cloud agent receives a task

- **WHEN** a cloud coding agent is assigned a well-formed implementation issue
- **THEN** it can discover the applicable OpenSpec change, design constraints, local instructions, and validation commands from the repository

