# Spec Delta

## Purpose

Lets workshop users track feedback through a small forward-only workflow while
keeping the original feedback and its votes intact.

## ADDED Requirements

### Requirement: Workshop feedback status

The workshop-only application SHALL expose each feedback item's status using
exactly `new`, `planned`, or `done`. Newly created feedback SHALL have status
`new`, and the board SHALL make the status perceivable.

#### Scenario: New feedback starts in the new state

- **WHEN** a workshop user creates valid feedback
- **THEN** the returned item and board display its status as `new`

#### Scenario: Legacy feedback has no stored status

- **WHEN** the application reads feedback stored before status was introduced
- **THEN** it presents and treats the item as `new` without requiring a bulk
  data migration

#### Scenario: A user advances feedback by one state

- **WHEN** any user with access to the explicitly workshop-only application
  changes an item from `new` to `planned` or from `planned` to `done`
- **THEN** the change succeeds without requiring production authentication,
  persists, and is visible after a refresh

#### Scenario: A user attempts an unsupported transition

- **WHEN** any user attempts to skip a state, reverse a state, or set an
  unsupported status
- **THEN** the application rejects the update with an actionable validation
  response and leaves the stored status unchanged

#### Scenario: A user updates an unknown feedback item

- **WHEN** any user attempts to update the status of an unknown feedback
  identifier
- **THEN** the application returns a not-found response and creates no data

#### Scenario: Status changes preserve voting

- **WHEN** a feedback item's status changes
- **THEN** its existing votes and vote count remain unchanged

#### Scenario: Status is operable with assistive technology

- **WHEN** a user views or changes status using the board
- **THEN** the status and available action are named and operable with
  keyboard and assistive technology
