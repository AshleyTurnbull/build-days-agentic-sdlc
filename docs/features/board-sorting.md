# Feature brief: Board sorting

## User need

Workshop users need to switch between recent feedback and the ideas receiving
the most votes.

## Comparable scope

Add two sort modes:

- newest first;
- most votes first.

Define deterministic tie-breakers in the OpenSpec design. The selected mode is
visible in the React board and may be sent to the API as a validated query.

## Required scenarios

1. The default mode returns newest feedback first.
2. Most-voted mode orders by descending vote count.
3. Equal vote counts use the documented deterministic tie-breaker.
4. An unsupported sort value is rejected or normalized according to the
   approved specification.
5. Voting and refreshing preserve correct order.

## Suggested task seams

- shared sort contract and validation;
- deterministic service/storage ordering and tests;
- Express query handling;
- React sort control and accessible state;
- evidence and documentation.

Finalize actual path ownership only after inspecting the repository.

## Completion evidence

- fixed test data proving both modes and tie-breakers;
- UI test proving the selected mode is visible;
- pull request linked to the approved scenarios;
- deployed demonstration with at least three feedback items.

## Out of scope

Arbitrary fields, drag-and-drop ordering, personalized preferences, pagination,
and infrastructure changes.
