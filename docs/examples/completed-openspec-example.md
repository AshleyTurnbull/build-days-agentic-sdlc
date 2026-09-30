# Completed OpenSpec example: clarify validation output

This compact example shows the shape of a completed change without solving any
participant feature. It is documentation-only: it does not add feedback
status, category filtering, board sorting, or author summary behavior.

## Proposal

**Why:** Contributors can misread an omitted validation step as a passing step.

**What changes:** Add one sentence to contributor guidance requiring unrun
checks to be reported as unrun. No application, API, infrastructure, workflow,
or security behavior changes.

**Capability:** `contributor-validation-guidance`.

## Capability requirement and scenarios

### Requirement: Accurate validation reporting

Contributor guidance SHALL distinguish successful, failed, and unrun
validation.

#### Scenario: A command succeeds

- **WHEN** a contributor runs a documented validation command and it exits
  successfully
- **THEN** the contribution may record that command as passed

#### Scenario: A command is unavailable

- **WHEN** a contributor cannot run a documented validation command
- **THEN** the contribution records it as unrun with the reason and does not
  describe it as passed

## Change design

- Update the nearest contributor guidance rather than application code.
- Reuse the repository's existing validation command names.
- Link authoritative guidance instead of copying architecture text.
- Reject adding a workflow: prose accuracy is the bounded requirement and no
  new enforcement mechanism is justified for this example.
- Rollback is deletion of the sentence; no data or runtime migration exists.

## Tasks

1. Identify the nearest contributor guidance and add the accurate-reporting
   sentence.
2. Check all changed Markdown links.
3. Run `openspec validate --all` and `git --no-pager diff --check`.
4. Open a documentation-only pull request linking the originating issue and
   record each command as passed, failed, or unrun.

## Why this is complete

The proposal states scope, scenarios are observable, the design records a
bounded decision and rejected alternative, and tasks name validation and
evidence. It deliberately leaves every participant feature unresolved.

Return to [Lab 1](../labs/01-openspec-and-harness.md) and author the team's real
change from its seeded issue rather than copying this example as feature
content.
