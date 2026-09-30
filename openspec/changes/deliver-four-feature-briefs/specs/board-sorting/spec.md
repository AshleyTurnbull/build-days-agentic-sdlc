# Spec Delta

## Purpose

Lets workshop users switch between recent feedback and the ideas receiving the
most votes with predictable ordering, including ties.

## ADDED Requirements

### Requirement: Sort feedback

The application SHALL support `newest` and `most-votes` ordering. The default
ordering SHALL be `newest`. Equal creation times SHALL be ordered by feedback
identifier ascending. In `most-votes` mode, items SHALL be ordered by vote
count descending, then creation time descending, then feedback identifier
ascending. Sorting SHALL NOT mutate stored feedback.

#### Scenario: The default ordering is newest first

- **WHEN** a user opens the board without choosing a sort mode
- **THEN** feedback is shown by creation time descending, with equal times
  ordered by feedback identifier ascending

#### Scenario: A user chooses most-votes ordering

- **WHEN** a user selects `most-votes`
- **THEN** feedback is shown by vote count descending, then creation time
  descending, then feedback identifier ascending

#### Scenario: An unsupported API sort is requested

- **WHEN** a sort query contains a value other than `newest` or `most-votes`
- **THEN** the API returns HTTP 400 with an actionable validation error
  identifying supported values, and does not silently normalize the value

#### Scenario: Vote counts change while most-votes is selected

- **WHEN** a vote succeeds while `most-votes` is selected
- **THEN** the board reflects the updated count and reorders items according
  to the selected deterministic ordering

#### Scenario: A user refreshes the board

- **WHEN** a user refreshes the board with a sort mode selected
- **THEN** the selected ordering remains visible and the items follow that
  ordering

#### Scenario: A user operates sorting accessibly

- **WHEN** a user changes the sort mode
- **THEN** the selected mode is perceivable and the control is keyboard
  operable
