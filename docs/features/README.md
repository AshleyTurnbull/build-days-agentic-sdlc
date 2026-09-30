# Comparable feature briefs

Each team selects one brief for Labs 1 through 4. The briefs are intentionally
similar in size: one shared-contract change, one API behavior, one React
behavior, focused tests, and no required infrastructure change.

| Brief | User outcome | Primary complexity |
|---|---|---|
| [Feedback status](feedback-status.md) | Move feedback through a small visible workflow | Valid state transitions |
| [Category filtering](category-filtering.md) | Narrow the board without losing the current data set | Query/UI state |
| [Board sorting](board-sorting.md) | Order feedback by newest or most-voted | Stable deterministic ordering |
| [Author summary](author-summary.md) | Show aggregate contribution and vote information | Derived API data |

The starter already implements feedback creation, listing, voting, persistence,
health, readiness, CI, and the initial Azure deployment path. Those are the
paved road, not the participant feature answer. None of the four feature briefs
is implemented on the starter branch.

## Assignment rules

- One brief per team unless the instructor approves a stretch combination.
- Convert the brief into an OpenSpec change; the brief is input, not the final
  specification.
- Preserve the approved feedback, voting, persistence, health, and readiness
  behavior.
- Discover actual source and test paths before assigning ownership. Do not
  guess paths that application scaffolding has not created.
- Split contract, API, UI, test, and documentation work only where agents can
  own non-overlapping primary files.
- Use the checked-in package scripts for validation.
- In Lab 3, every team also extends the existing App Service AVM composition by
  configuring its health-check path to `/health`, then reviews the resulting
  Azure `what-if`.

All briefs require accessible loading, empty, success, and error states. A
feature is complete only when a reviewer can connect its issue, OpenSpec
scenarios, tests, pull request, and deployment evidence.
