# Feature brief: Category filtering

## User need

Workshop users need to focus on feedback from one category while retaining a
clear way to return to the full board.

## Comparable scope

Add an optional category filter with an `all` choice. The API may accept a
validated category query, and the React board keeps the selected filter visible.
Filtering must not mutate stored feedback.

## Required scenarios

1. With `all` selected, the board shows every available item.
2. Selecting a category shows only matching items.
3. A category with no items shows an accessible empty state.
4. An unsupported category query is rejected or normalized according to the
   approved specification.
5. Clearing the filter restores the complete current list.

## Suggested task seams

- shared category/query validation;
- storage or service query behavior and tests;
- Express query handling;
- React filter controls, URL/state choice, and accessibility tests;
- evidence and documentation.

Finalize actual path ownership only after inspecting the repository.

## Completion evidence

- deterministic API tests for supported and unsupported categories;
- UI test for selection, empty state, and clearing;
- pull-request evidence that feedback creation and voting still work;
- deployed demonstration using persisted Azure data.

## Out of scope

User-created categories, multiple simultaneous categories, saved preferences,
full-text search, and infrastructure changes.
