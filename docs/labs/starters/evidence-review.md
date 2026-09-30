---
# Participant starter: copy this file to
# .github/workflows/security-delivery-review.md, then complete the one TODO.

on:
  workflow_dispatch:
    inputs:
      issue:
        description: Seeded security exercise issue number
        required: true
        type: number
      pull_request:
        description: Security remediation pull request number
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
  # TODO: Declare exactly one narrow safe output for the review result.

---

# Security and delivery evidence review

Review seeded security issue `${{ inputs.issue }}` and remediation pull request
`${{ inputs.pull_request }}`.

Author instructions that require the agent to:

1. confirm that the issue and pull request link the deterministic-security
   OpenSpec scenario and describe the expected CodeQL finding;
2. inspect the CodeQL result and required CI checks for the remediation commit;
3. inspect the pull-request-linked Azure deployment record and live-verification
   evidence;
4. distinguish passing, failing, missing, skipped, and unavailable evidence;
5. publish one concise security-and-delivery result through the declared safe
   output; and
6. avoid approving, merging, editing workflow files, bypassing rules, exposing
   secrets, triggering deployment, or claiming that missing evidence passed.
