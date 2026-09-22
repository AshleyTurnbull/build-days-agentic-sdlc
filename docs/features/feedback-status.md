# Feature brief: Feedback status

## User need

Workshop users need to distinguish new feedback from items that are being
considered or completed without editing the original request.

## Comparable scope

Add an optional status with exactly three values:

- `new`;
- `planned`;
- `done`.

New feedback starts as `new`. The board displays the status, and an authorized
workshop user can move an item only forward through the sequence. The sample
does not require production authentication; document the workshop-only update
mechanism chosen in the OpenSpec design.

## Required scenarios

1. A newly created item is returned and displayed as `new`.
2. A valid forward transition persists and is visible after refresh.
3. Skipping or reversing a state is rejected with an actionable response.
4. An unknown feedback identifier is rejected without creating data.
5. Existing voting behavior and counts remain unchanged.

## Suggested task seams

- shared status contract and validation;
- storage update behavior and API tests;
- Express endpoint and error mapping;
- React status display/control and accessibility tests;
- evidence and documentation.

Finalize actual path ownership only after inspecting the repository.

## Completion evidence

- OpenSpec scenarios mapped to focused tests;
- API and UI behavior shown in the implementation pull request;
- persistence demonstrated after refresh or application restart;
- no infrastructure or workflow change unless separately specified and
  approved.

## Out of scope

Custom states, role-based access control, status history, notifications, and
bulk updates.
