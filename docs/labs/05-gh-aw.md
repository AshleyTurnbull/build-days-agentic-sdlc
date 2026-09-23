# Lab 5: Remediate security evidence and review delivery with GH-AW

## Outcome

Remediate the instructor-seeded, non-production CodeQL finding, then author and
compile a GitHub Agentic Workflow that reviews the real security,
specification, pull-request, and deployment evidence through one narrowly
authorized output.

## Prerequisites

- Labs 1 through 4 produced a linked OpenSpec change, implementation pull
  request, independent checks, and deployment record.
- The instructor ran `scripts/seed-security-exercise.ps1`. You have a sanitized
  issue and a draft pull request on `workshop/lab5-codeql-exercise`; the
  vulnerable fixture is not on the default branch.
- The instructor confirmed GH-AW and model access for the repository.
- The repository's `issue-clarifier` and `failed-test-explainer` references
  compile and can be inspected as working safe patterns.
- The participant starter is available at
  [`starters/evidence-review.md`](starters/evidence-review.md).

GH-AW availability and runner/model authorization are external setup. Do not
represent a locally simulated summary as a GH-AW run.

## 1. Confirm the deterministic finding

Open the seeded issue, draft pull request, and CodeQL check. Confirm:

- the finding is `js/command-line-injection` in
  `tests/security-exercise/unsafe-command.ts`;
- the fixture contains synthetic input only and is outside `src`;
- the default branch does not contain the generated fixture; and
- CodeQL ran through the normal pull-request trigger rather than a simulated
  result.

Do not continue if CodeQL was skipped or the expected finding is absent. Record
that as incomplete security evidence and use the recovery path.

## 2. Apply the small remediation

On the exercise branch, replace the fixture with the inert safe reference:

```powershell
Copy-Item `
  .\docs\labs\starters\security-exercise\remediated-command.ts.txt `
  .\tests\security-exercise\unsafe-command.ts

npm run typecheck
git --no-pager diff --check
git add .\tests\security-exercise\unsafe-command.ts
git commit -m "Remediate Lab 5 command injection fixture"
git push
```

Wait for the pull-request checks. The exercise is remediated only when the
expected CodeQL alert is absent and required checks pass without a query
suppression. Keep the pull request in draft until that evidence is visible.

## 3. Compare both safe references

Read these source/lock pairs:

- `.github/workflows/issue-clarifier.md` uses manual issue input, issue-reading
  tools, and one bounded comment.
- `.github/workflows/failed-test-explainer.md` uses a completed-CI trigger,
  Actions-reading tools, and at most one follow-up issue.

Identify each trigger, read permission, toolset, and safe output. The references
demonstrate patterns only; neither is the Lab 5 answer.

## 4. Author the security-and-delivery workflow

Copy the participant starter into the active workflows directory:

```powershell
Copy-Item `
  .\docs\labs\starters\evidence-review.md `
  .\.github\workflows\security-delivery-review.md
```

Complete the single `TODO` by declaring exactly one narrow safe output. Author
the evaluation instructions so the workflow reads the seeded issue and pull
request, linked OpenSpec scenario, required checks, CodeQL result, and
pull-request-linked Azure deployment evidence.

Before compiling it, identify:

- event or manual trigger;
- read permissions;
- the single declared safe write output;
- evidence sources;
- prohibited authority.

The workflow must not approve, merge, bypass rules, edit protected workflows,
or deploy. Its job is to report whether evidence is complete, not to grant the
approval itself.

## 5. Compile and confirm source/lock consistency

Use the GH-AW CLI command documented with the checked-in workflow to compile or
validate the Markdown source. Tooling syntax can vary by installed GH-AW
version, so use the repository guidance and `gh aw --help` rather than guessing.

```powershell
gh aw compile security-delivery-review `
  --no-check-update `
  --action-mode action `
  --action-tag 5e508589e03a7757a7e05b26e834292f5445bfb6
gh aw validate security-delivery-review --no-check-update
git --no-pager diff --check
```

If source changes, the generated lock workflow must change in the same pull
request. Do not edit the generated lock file by hand.

Commit both the authored Markdown and compiler-generated lock workflow.

The repository integrity workflow compiles every
`.github/workflows/*.md` source through its existing wildcard behavior, so no
workflow-list edit is required.

## 6. Run against real evidence

Provide the pull request or issue reference expected by the checked-in
workflow. The evaluation should compare:

1. linked OpenSpec requirements and scenarios;
2. required check results;
3. security result or documented availability fallback;
4. Azure deployment evidence and live URL.

## 7. Review the safe output

For complete evidence, the output should be concise and point to the artifacts.
For incomplete or inconsistent evidence, it should identify the gap without
claiming the change is complete.

Verify that the output does not expose credentials, fabricate unavailable
checks, or imply merge/deployment authority.

## Expected repository artifacts

- Safely remediated draft pull request with the original and resolved CodeQL
  evidence.
- Team-authored GH-AW Markdown source and generated lock workflow in sync.
- Run URL and input issue or pull-request reference.
- One declared safe output, such as a concise evidence comment or follow-up
  issue.
- Human review of the result.

## Verification

```powershell
gh run list --limit 20
gh pr checks <SECURITY_PR_NUMBER>
gh aw validate --no-check-update
git --no-pager diff --check
```

Open the selected run and confirm the permissions and output match the
repository source.

## Recovery

If the expected CodeQL result is absent after ten minutes, confirm the fixture
is on a draft pull request under `tests/security-exercise`, ask the instructor
to rerun `scripts/seed-security-exercise.ps1`, and do not substitute a manual
claim for scanner evidence.

If GH-AW access or compilation is unavailable after ten minutes:

1. record the exact availability or tooling limitation;
2. inspect the checked-in source and lock workflow;
3. manually perform the same evidence comparison using
   [`../platform/evidence-contract.md`](../platform/evidence-contract.md);
4. label the result as a manual fallback, not a GH-AW run.

If a generated lock file is stale, restore the pre-Lab-5 checkpoint, keep the
team's Markdown source, and compile it again rather than hand-editing generated
YAML.

## Stretch

Remove one nonessential evidence link from a test pull request and verify that
the workflow reports the missing evidence without attempting to repair,
approve, merge, or deploy the change.
