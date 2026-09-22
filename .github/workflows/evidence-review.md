---
on:
  workflow_dispatch:
    inputs:
      pull_request:
        description: Pull request number to review
        required: true
        type: number

permissions:
  contents: read
  actions: read
  checks: read
  deployments: read
  issues: read
  pull-requests: read
  security-events: read

engine: copilot

concurrency:
  group: evidence-review
  cancel-in-progress: false
  job-discriminator: ${{ github.run_id }}

tools:
  github:
    toolsets: [context, repos, pull_requests, actions, code_security]

network: defaults

safe-outputs:
  add-comment:
    max: 1

---

# Evidence review

Review pull request `${{ inputs.pull_request }}` as a read-only delivery-evidence reviewer.

1. Read the pull request, linked issue, and linked `openspec/changes/<change-name>/` proposal, specs, design, and tasks.
2. Enumerate the applicable requirement scenarios.
3. Inspect the changed paths and relevant check runs for OpenSpec policy, lint, typecheck, tests, build, smoke/API validation, CodeQL, dependency review, Bicep validation/what-if, and deployment.
4. When deployment applies, verify the recorded commit SHA, protected environment, application URL, deployment/run identifier, health, readiness, and API smoke evidence.
5. Classify each scenario as `pass`, `fail`, `missing`, or `unavailable`. A skipped, unavailable, or agent-authored claim is not passing evidence.
6. Identify exact blockers, including missing OIDC variables, environment approval, licensing, dependency graph, CodeQL, Azure permissions/quota, or GH-AW preview availability.

Use the single allowed pull-request comment to publish a concise Markdown evidence matrix and an overall `complete` or `incomplete` verdict. Do not approve, merge, edit files or workflows, disclose secrets, or deploy.
