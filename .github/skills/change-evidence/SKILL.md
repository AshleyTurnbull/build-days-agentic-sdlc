---
name: change-evidence
description: Build a traceable evidence matrix for an OpenSpec-governed pull request or deployment.
---

# Change evidence

Use this skill when preparing or reviewing delivery evidence.

1. Read the linked OpenSpec proposal, specs, design, and tasks.
2. Enumerate every affected requirement scenario.
3. Map each scenario to changed paths and an independent check.
4. Record the exact command/check, status, run link, and relevant artifact or deployment identifier.
5. Classify evidence as `pass`, `fail`, `missing`, or `unavailable`. Never convert skipped or unavailable checks into success.
6. For Azure delivery, include commit SHA, protected environment, resource group, application URL, workflow run/deployment ID, health, readiness, and API smoke results.
7. Record blockers such as missing OIDC variables, environment approval, GHAS/license access, Azure permissions/quota, or GH-AW preview access.

Use this compact output:

| Scenario | Evidence | Status | Link/identifier | Gap or next action |
|---|---|---|---|---|

End with an overall `complete` or `incomplete` verdict. A complete verdict requires independent evidence for every applicable scenario.

