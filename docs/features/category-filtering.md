# Feature brief: Category filtering

## User need

Workshop users need to focus on feedback from one category while retaining a
clear way to return to the full board.

## Delivered behavior

The board provides an accessible category selector for all feedback or one of
`content`, `facilitation`, `tooling`, and `idea`. The selection is stored in the
page URL as the `category` query parameter, so refreshes and shared links retain
the selected filter. Omitting the parameter or selecting `all` shows every
current feedback item.

`GET /api/feedback` accepts the same supported values. Unsupported values are
rejected with HTTP 400 and an actionable validation message; values are not
normalized. Filtering is applied to the listed results and does not mutate
feedback. A category with no matching items has an accessible empty state and
a clear-filter action that restores the current complete list.

## Completion evidence

- Contract tests cover supported and unsupported category values.
- API tests cover category filtering, HTTP 400 validation, and preservation of
  the complete stored list.
- UI tests cover matching results, URL state across refresh, accessible empty
  state, and clearing the filter.
- This implementation PR records creation/voting and health/readiness checks;
  protected Azure-backed deployment evidence remains a human-gated delivery
  step.

## Out of scope

User-created categories, multiple simultaneous categories, saved preferences,
full-text search, and infrastructure changes.
