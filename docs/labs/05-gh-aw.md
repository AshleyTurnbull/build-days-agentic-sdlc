# Lab 5: Remediate security evidence and review delivery with GH-AW

## Outcome

Use GitHub Copilot App to understand and remediate the instructor-seeded
non-production CodeQL finding, perform a security review, and create a GitHub
Agentic Workflow that evaluates real security and delivery evidence through
exactly one narrowly authorized safe output.

## Prerequisites

- Labs 1-4 produced linked OpenSpec, pull-request, check, review, and deployment
  evidence.
- The instructor seeded a sanitized issue and draft pull request on
  `workshop/lab5-codeql-exercise`.
- The instructor confirmed CodeQL, GH-AW, and model access.
- The `issue-clarifier` and `failed-test-explainer` source/lock pairs compile.
- The participant starter is
  [`starters/evidence-review.md`](starters/evidence-review.md).

GH-AW availability and runner/model authorization are external setup. A local
summary is not a GH-AW run.

## 1. Confirm and understand the deterministic finding

Open the seeded issue, draft pull request, and CodeQL result in GitHub.

### Prompt card: CodeQL understanding

- **Use:** Copilot App from the seeded draft pull request.
- **Attach:** The sanitized issue, CodeQL alert, pull-request diff, deterministic
  security OpenSpec scenario, and `tests/security-exercise/unsafe-command.ts`.
- **Prompt:** Explain why this synthetic fixture triggers
  `js/command-line-injection`, identify the untrusted-data-to-command path, and
  distinguish scanner evidence from an agent claim. Confirm the fixture is
  outside `src`, excluded from application build and deployment, absent from
  the default branch, and contains no secret or production exploit. Do not
  suppress or disable the query.
- **Expect:** A finding explanation tied to the exact alert and isolated
  non-production fixture.
- **Decide:** Continue only if the normal pull-request CodeQL run reports the
  expected finding. Otherwise record incomplete security evidence and use
  Recovery.

## 2. Apply and verify the narrow remediation

### Prompt card: CodeQL remediation

- **Use:** A Copilot App session in the seeded exercise branch.
- **Attach:** The alert, unsafe fixture, approved inert reference at
  `docs/labs/starters/security-exercise/remediated-command.ts.txt`, issue
  acceptance criteria, and closest instructions.
- **Prompt:** Replace the synthetic unsafe fixture with the approved inert
  reference, without changing application code, workflow configuration, query
  settings, or suppressions. Run the checked-in focused type and diff
  validation, show the exact diff, and update the draft pull request.
- **Expect:** One small fixture remediation and updated required checks.
- **Decide:** Keep the pull request in draft until CodeQL no longer reports the
  expected alert and required checks pass.

### Prompt card: security review

- **Use:** A fresh Copilot App review session.
- **Attach:** The original alert, remediated diff, updated CodeQL result,
  required checks, and linked OpenSpec scenario.
- **Prompt:** Review whether the command-injection data flow was removed rather
  than hidden. Confirm no query suppression, scanner disablement, unrelated
  authority, secret, or deployable vulnerable code was introduced. Report any
  remaining gap and do not approve or merge.
- **Expect:** A narrow review grounded in the before-and-after scanner evidence.
- **Decide:** A human may merge only when the expected finding is absent and
  current-head required checks pass.

## 3. Study the two safe GH-AW references

In Copilot App, compare:

- `.github/workflows/issue-clarifier.md`: manual issue input, issue-reading
  tools, and one bounded comment.
- `.github/workflows/failed-test-explainer.md`: completed-CI trigger,
  Actions-reading tools, and at most one follow-up issue.

### Prompt card: reference comparison

- **Use:** Copilot App.
- **Attach:** Both Markdown sources and generated lock workflows.
- **Prompt:** Compare each trigger, read permission, toolset, and single safe
  output. Explain which patterns are reusable for a security-and-delivery
  evidence review and which content would incorrectly copy a solution.
- **Expect:** A concise pattern comparison; neither reference becomes the Lab 5
  answer.
- **Decide:** Proceed only when the team can explain narrow authority and
  source/lock reproducibility.

## 4. Create the security-and-delivery GH-AW

Use the pinned workshop creation guide:
<https://raw.githubusercontent.com/github/gh-aw/v0.88.8/create.md>.
The pinned guide may direct Copilot to read further official upstream
documentation; follow those official reads when required. The repository
already pins GH-AW `v0.88.8`: skip the guide's install-or-upgrade step and do
not replace the workshop compiler with `main` or `latest`.

### Prompt card: propose before files

- **Use:** A fresh Copilot App session.
- **Attach:** The pinned creation guide, participant starter, both safe
  references, linked evidence contract, seeded security issue and pull request,
  deployment evidence, and active GH-AW OpenSpec scenarios.
- **Prompt:** Create a GH-AW using the approved creation guide. Its purpose is
  triage and security-delivery evidence. Before creating or changing files,
  propose the trigger, read permissions, tools, evidence sources, and exactly
  one safe output. Use the repository-pinned GH-AW `v0.88.8` compiler and skip
  any instruction to upgrade or install from `main`. Keep authority narrow: it
  must not approve, merge, bypass rules, edit protected workflows, deploy, or
  write anything beyond that one output. Wait for the human decision on the
  proposal before authoring.
- **Expect:** A reviewable design proposal before any file change.
- **Decide:** Approve, revise, or reject the proposed trigger, permissions,
  tools, and single output. Do not continue with broad or ambiguous authority.

### Prompt card: author and generate

- **Use:** The same Copilot App session after human approval.
- **Attach:** The approved proposal and
  `docs/labs/starters/evidence-review.md`.
- **Prompt:** Author `.github/workflows/security-delivery-review.md` from the
  participant starter so it evaluates the seeded issue and pull request,
  CodeQL result, linked OpenSpec scenario, required checks, and pull-request
  deployment evidence. Declare exactly the approved safe output. Use the
  installed GH-AW tooling and approved guide to generate and validate the lock
  workflow. Never hand edit generated lock files. Report source and generated
  files together with validation results.
- **Expect:** Team-authored Markdown and compiler-generated lock workflow in
  sync, with one declared safe output.
- **Decide:** Reject any result that hand edits the lock, adds unrelated write
  permissions, or claims evidence that was not read.

The existing repository integrity workflow discovers workflow Markdown through
its wildcard behavior; no workflow-list edit is required.

## 5. Run and review real evidence

### Prompt card: evidence evaluation

- **Use:** The GitHub GH-AW run flow and Copilot App for review.
- **Attach:** The input issue or pull request, linked OpenSpec scenario,
  current-head required checks, resolved CodeQL evidence, deployment artifact,
  and marked deployment comment.
- **Prompt:** Run the authored workflow against these real records. Evaluate
  consistency across specification, checks, security remediation, deployed
  commit, and Azure evidence. Produce only the declared safe output. If
  evidence is missing or inconsistent, report the gap without claiming
  completion or changing protected state.
- **Expect:** One concise output pointing to durable artifacts, or one concise
  gap report.
- **Decide:** A human reviews the run permissions, tools, evidence links, and
  output before accepting it as Lab 5 evidence.

## Expected repository artifacts

- Safely remediated draft pull request with original and resolved CodeQL
  evidence.
- Team-authored GH-AW Markdown source and generated lock workflow in sync.
- Run URL and input issue or pull-request reference.
- Exactly one declared safe output.
- Human review of the security fix and GH-AW result.

## Verification

Open the selected security and GH-AW runs in GitHub. Confirm current-head
required checks, disappearance of the expected CodeQL finding without
suppression, source/lock consistency produced by the installed compiler, and
permissions matching the Markdown source. Ask Copilot App to run the
repository's checked-in GH-AW validation and diff check; participants should
not type terminal commands or hand edit locks.

## Recovery

If the expected CodeQL result is absent after ten minutes, confirm the fixture
is on the seeded draft pull request under `tests/security-exercise`, ask the
instructor to rerun the seeding automation, and do not substitute a manual
claim.

If GH-AW access or generation is unavailable after ten minutes:

### Prompt card: labeled manual fallback

- **Use:** A fresh Copilot App session.
- **Attach:** The checked-in source and lock references, the team's Markdown if
  available, and the
  [delivery evidence contract](../platform/evidence-contract.md).
- **Prompt:** Perform the same read-only security-and-delivery evidence
  comparison, identify the exact GH-AW availability or tooling limitation, and
  label the result as a manual fallback. Do not simulate a run, hand edit a
  generated lock, or claim equivalent platform enforcement.
- **Expect:** A clearly labeled manual review and preserved limitation.
- **Decide:** If a generated lock is stale, restore the pre-Lab-5 checkpoint,
  keep the team's Markdown source, and regenerate with the approved tooling
  when available.

## Stretch

Remove one nonessential evidence link from a test pull request and verify that
the workflow reports the missing evidence without repairing, approving,
merging, or deploying.
