---
# Participant starter: copy this file to
# .github/workflows/evidence-review.md, then replace every TODO.

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

tools:
  github:
    toolsets: [context, repos, pull_requests, actions, code_security]

network: defaults

safe-outputs:
  # TODO: Declare exactly one safe output for the evidence result.

---

# Delivery evidence review

Review pull request `${{ inputs.pull_request }}`.

TODO: Write instructions that require the agent to:

1. locate the linked OpenSpec change and enumerate its scenarios;
2. inspect required CI and security results;
3. inspect the Azure deployment record and live-verification evidence;
4. distinguish passing, failing, missing, and unavailable evidence;
5. publish one concise result through the declared safe output;
6. avoid approving, merging, editing workflows, exposing secrets, or deploying.

