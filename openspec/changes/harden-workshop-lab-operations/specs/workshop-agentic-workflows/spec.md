## ADDED Requirements

### Requirement: Participant-authored security-and-delivery review

Lab 5 SHALL require participants to author a GH-AW that evaluates the seeded
security issue and pull request, CodeQL result, linked OpenSpec scenario, and
deployment evidence.

#### Scenario: Evidence is complete

- **WHEN** the security remediation, required checks, linked specification, and
  deployment evidence are consistent
- **THEN** the participant-authored workflow produces a concise
  security-and-delivery result through exactly one declared safe output

#### Scenario: Evidence is incomplete

- **WHEN** the finding remains, scanning was skipped, specification linkage is
  missing, or deployment evidence is absent or inconsistent
- **THEN** the workflow identifies the gap without approving, merging,
  deploying, or claiming completion

### Requirement: Narrow workflow authority

The participant-authored workflow SHALL use read-only permissions by default
and SHALL NOT approve, merge, deploy, alter protected workflows, bypass rules,
or declare unrelated write outputs.

#### Scenario: Workflow processes a protected pull request

- **WHEN** the workflow evaluates repository, security, and deployment evidence
- **THEN** platform permissions prevent it from changing protected delivery
  state beyond its one approved safe output

### Requirement: Two non-solution safe references

The starter SHALL include two small working GH-AW references with distinct safe
trigger, tool, and output patterns, and neither SHALL contain the Lab 5
security-and-delivery solution.

#### Scenario: Participant studies the references

- **WHEN** the participant compares both references
- **THEN** they can identify reusable permission and output patterns while
  still authoring the Lab 5 evidence evaluation themselves

### Requirement: Reproducible GH-AW generation

Reference and participant workflow Markdown SHALL remain reproducible with
their generated lock workflows.

#### Scenario: Workflow source changes

- **WHEN** GH-AW Markdown is modified
- **THEN** validation detects a missing or stale generated lock and provides
  the compile action needed to restore consistency

#### Scenario: Participant consults current GH-AW documentation

- **WHEN** the GH-AW home page or public-preview announcement is used for
  orientation or status
- **THEN** generation still uses the repository's exact pinned creation guide,
  compiler version, source/lock validation, and narrow safe-output contract
