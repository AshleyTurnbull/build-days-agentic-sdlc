# Spec Delta

## Purpose

Lets workshop users focus on feedback from one supported category while
preserving a clear, non-destructive way to restore the complete board.

## ADDED Requirements

### Requirement: Filter feedback by category

The application SHALL let users display all feedback or only feedback from a
supported category. The supported categories are `content`, `facilitation`,
`tooling`, and `idea`. Filtering SHALL NOT mutate stored feedback.

#### Scenario: All categories are selected

- **WHEN** a user selects the all-categories option
- **THEN** the board displays every available feedback item

#### Scenario: A supported category is selected

- **WHEN** a user selects a supported category
- **THEN** the board displays only items whose category matches the selection

#### Scenario: A category has no feedback

- **WHEN** a user selects a supported category with no matching items
- **THEN** the board presents an accessible empty state and an available way
  to return to all categories

#### Scenario: An unsupported API category is requested

- **WHEN** a category query contains a value other than a supported category
- **THEN** the API returns HTTP 400 with an actionable validation error
  identifying supported values, and does not silently normalize the value

#### Scenario: A user clears the category filter

- **WHEN** a user returns the filter to all categories
- **THEN** the board restores the complete current feedback list, including
  items created while the filter was active

#### Scenario: A user operates the filter accessibly

- **WHEN** a user changes the category filter
- **THEN** the selected category is perceivable and the control is keyboard
  operable with an accessible empty-state announcement when applicable
