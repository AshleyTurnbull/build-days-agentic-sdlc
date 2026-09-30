---
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    branches: [main]

permissions:
  actions: read
  contents: read

engine: copilot

concurrency:
  group: failed-test-explainer-${{ github.event.workflow_run.id }}
  cancel-in-progress: false

tools:
  github:
    toolsets: [context, repos, actions]

network: defaults

safe-outputs:
  create-issue:
    max: 1

---

# Failed test explainer

Inspect completed CI run `${{ github.event.workflow_run.id }}`.

- If the run did not fail, produce no output.
- If it failed, inspect only the run, jobs, annotations, and logs available
  through the read-only GitHub tools.
- Create at most one issue titled `CI failure explained: run
  ${{ github.event.workflow_run.id }}` with a concise failure summary, links to
  the failing job and relevant annotations, and one suggested next diagnostic
  step.
- Clearly distinguish observed evidence from hypotheses.

Do not rerun jobs, edit files or workflows, approve or merge pull requests,
expose log secrets, or deploy.
