# Feature brief: Author summary

## User need

Workshop users need a lightweight summary of participation without exposing
private profile data.

## Comparable scope

Add a derived summary for each display name containing:

- number of feedback items submitted;
- total votes received across those items.

The board can show the summary in a small panel or detail view. Display names
remain workshop-provided text and are not treated as authenticated identities.

## Required scenarios

1. A known display name returns the correct item and vote totals.
2. Multiple items by the same display name are aggregated.
3. A display name with no items returns an empty/not-found result defined by
   the approved specification.
4. New feedback and votes update the summary.
5. The response exposes no client vote identifiers or storage internals.

## Suggested task seams

- shared summary contract and validation;
- derived storage/service query and tests;
- Express summary endpoint and error mapping;
- React summary display and accessibility tests;
- evidence and documentation.

Finalize actual path ownership only after inspecting the repository.

## Completion evidence

- deterministic aggregation tests;
- API response reviewed for data minimization;
- UI states for loading, empty, success, and error;
- deployed demonstration with non-sensitive workshop display names.

## Out of scope

Authentication, leaderboards, profile pages, historical analytics, exports, and
infrastructure changes.
