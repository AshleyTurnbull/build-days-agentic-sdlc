# Feature brief: Author summary

## User need

Workshop users need a lightweight summary of participation without exposing
private profile data or treating a display name as an authenticated identity.

## Delivered behavior

The board provides a **Display name to summarize** lookup. The API accepts
`GET /api/feedback/summary?displayName=<name>`, trims surrounding whitespace,
and matches the remaining display name exactly and case-sensitively. Its
response contains only `displayName`, `feedbackCount`, and `totalVotes`.
Unknown names return HTTP 200 with zero counts. A new lookup reflects feedback
and votes added since any previous lookup.

The board presents accessible loading, zero-result, success, and actionable
error states; failed requests can be retried.

## Required scenarios

1. A known display name returns its feedback-item count and the sum of votes
   across those items.
2. Multiple items by the same display name are aggregated.
3. An unknown display name returns HTTP 200 with zero feedback and zero votes.
4. Surrounding whitespace is trimmed, while letter case is preserved for
   exact matching.
5. New feedback and votes appear in subsequent summary lookups.
6. The response contains no client vote identifiers, feedback IDs, or storage
   details.
7. The UI exposes accessible loading, zero-result, success, and retryable
   error states.

## Completion evidence

- deterministic contract and API tests for aggregation, matching, updates,
  unknown authors, and response minimization;
- UI tests for loading, zero-result, success, and retryable error states;
- deployed demonstration using non-sensitive workshop display names.

## Out of scope

Authentication, leaderboards, profile pages, historical analytics, exports,
and infrastructure changes.
