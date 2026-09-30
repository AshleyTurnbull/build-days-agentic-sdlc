# Spec Delta

## Purpose

Lets workshop users inspect a privacy-minimized summary of participation for a
display name without treating that name as an authenticated identity.

## ADDED Requirements

### Requirement: Author feedback summary

The application SHALL provide a summary for a display name containing only
that name, its feedback item count, and the total votes received by those
items. Matching SHALL trim surrounding whitespace and otherwise compare
display names exactly and case-sensitively. A lookup for an unknown display
name SHALL succeed with HTTP 200, zero feedback, and zero votes. The summary
SHALL NOT expose client vote identifiers or storage internals.

#### Scenario: A known author has one feedback item

- **WHEN** a user requests a summary for a display name with one feedback item
- **THEN** the summary returns the display name, a feedback count of one, and
  that item's vote count as the total votes

#### Scenario: Multiple feedback items are aggregated

- **WHEN** a user requests a summary for a display name with multiple feedback
  items
- **THEN** the summary returns the number of matching items and the sum of
  votes across those items

#### Scenario: An unknown author is requested

- **WHEN** a user requests a summary for a display name with no matching
  feedback
- **THEN** the request returns HTTP 200 with zero feedback and zero votes

#### Scenario: Display names are matched exactly after trimming

- **WHEN** a user requests a summary using a display name with surrounding
  whitespace
- **THEN** the whitespace is trimmed and the remaining name is matched
  exactly, with letter case preserved

#### Scenario: New feedback or votes change the summary

- **WHEN** matching feedback is created or a vote is added
- **THEN** a subsequent summary request reflects the updated totals

#### Scenario: Summary data is minimized

- **WHEN** a user receives an author summary
- **THEN** it contains no client vote identifiers, storage keys, or storage
  implementation details

#### Scenario: The summary view is loading, empty, successful, or failed

- **WHEN** a user opens or requests an author summary
- **THEN** the board presents accessible loading, zero-result, success, and
  actionable error states as applicable
