# Feature brief: Board sorting

## User need

Workshop users need to switch between recent feedback and the ideas receiving
the most votes.

## Delivered behavior

The board provides an accessible sort selector for two modes:

- `newest` (the default): creation time descending, then feedback ID
  ascending;
- `most-votes`: vote count descending, creation time descending, then feedback
  ID ascending.

The selected mode is stored in the page URL as `sort`, preserving it across
refresh and browser back/forward navigation. `GET /api/feedback` accepts the
same validated values and composes sorting with the existing `category` filter.
Unsupported values receive HTTP 400 with an actionable validation error; they
are not normalized. Sorting does not mutate stored feedback, and a successful
vote immediately reorders the visible board when `most-votes` is selected.

## Required scenarios

1. The default mode orders by newest creation time, then ascending ID.
2. Most-voted mode orders by descending votes, then newest creation time, then
   ascending ID.
3. Category filtering composes with either sort mode.
4. Unsupported sort values are rejected with HTTP 400 and are not normalized.
5. URL state survives refresh and browser back/forward navigation.
6. A successful vote immediately updates the order in most-votes mode.
7. The sort control is keyboard operable and its selected mode is perceivable.

## Suggested task seams

- shared sort contract, deterministic ordering, and API validation;
- accessible React sort control and URL state;
- contract, API, and UI tests;
- evidence and documentation.

## Completion evidence

- fixed test data proving both modes and tie-breakers;
- UI tests proving selected URL state, back navigation, and reordering after a
  successful vote;
- pull request linked to the approved scenarios;
- protected Azure-backed demonstration plus unchanged creation, voting,
  `/health`, and `/ready` behavior.

## Out of scope

Arbitrary fields, drag-and-drop ordering, personalized preferences, pagination,
and infrastructure changes.
