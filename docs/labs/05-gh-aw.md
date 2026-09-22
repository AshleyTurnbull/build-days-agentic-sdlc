# Lab 5: Review delivery evidence with GH-AW

## Outcome

Run the instructor-provided GitHub Agentic Workflow against real specification,
pull-request, security, and deployment evidence, and inspect one narrowly
authorized output.

## Prerequisites

- Labs 1 through 4 produced a linked OpenSpec change, implementation pull
  request, independent checks, and deployment record.
- The instructor confirmed GH-AW and model access for the repository.
- The GH-AW Markdown source and generated lock workflow are both present and
  current.

GH-AW availability and runner/model authorization are external setup. Do not
represent a locally simulated summary as a GH-AW run.

## 1. Inspect the workflow contract

Before running it, identify:

- event or manual trigger;
- read permissions;
- the single declared safe write output;
- evidence sources;
- prohibited authority.

The workflow must not approve, merge, bypass rules, edit protected workflows,
or deploy. Its job is to report whether evidence is complete, not to grant the
approval itself.

## 2. Confirm source and lock consistency

Use the GH-AW CLI command documented with the checked-in workflow to compile or
validate the Markdown source. Tooling syntax can vary by installed GH-AW
version, so use the repository guidance and `gh aw --help` rather than guessing.

```powershell
gh aw --help
git --no-pager diff --check
```

If source changes, the generated lock workflow must change in the same pull
request. Do not edit the generated lock file by hand.

## 3. Run against real evidence

Provide the pull request or issue reference expected by the checked-in
workflow. The evaluation should compare:

1. linked OpenSpec requirements and scenarios;
2. required check results;
3. security result or documented availability fallback;
4. Azure deployment evidence and live URL.

## 4. Review the safe output

For complete evidence, the output should be concise and point to the artifacts.
For incomplete or inconsistent evidence, it should identify the gap without
claiming the change is complete.

Verify that the output does not expose credentials, fabricate unavailable
checks, or imply merge/deployment authority.

## Expected repository artifacts

- GH-AW Markdown source and generated lock workflow in sync.
- Run URL and input issue or pull-request reference.
- One declared safe output, such as a concise evidence comment or follow-up
  issue.
- Human review of the result.

## Verification

```powershell
gh run list --limit 20
gh pr checks
git --no-pager diff --check
```

Open the selected run and confirm the permissions and output match the
repository source.

## Recovery

If GH-AW access or compilation is unavailable after ten minutes:

1. record the exact availability or tooling limitation;
2. inspect the checked-in source and lock workflow;
3. manually perform the same evidence comparison using
   [`../platform/evidence-contract.md`](../platform/evidence-contract.md);
4. label the result as a manual fallback, not a GH-AW run.

If a generated lock file is stale, restore the instructor's verified
GH-AW-ready checkpoint rather than hand-editing generated YAML.

## Stretch

Remove one nonessential evidence link from a test pull request and verify that
the workflow reports the missing evidence without attempting to repair or
approve the change.
