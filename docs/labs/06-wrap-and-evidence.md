# Lab 6: Wrap and reconstruct the evidence

## Outcome

Demonstrate the deployed feature and prove that a reviewer can reconstruct the
complete delivery story from durable repository, GitHub, and Azure evidence.

## Prerequisites

- The feature pull request is merged or is ready for final approved merge.
- The deployed application URL and successful deployment run are available.
- The GH-AW run or clearly labeled manual fallback is available.

## 1. Walk the evidence chain

Starting from the feature issue, follow links in order:

```text
issue
  -> specification pull request
  -> OpenSpec proposal, scenarios, design, and tasks
  -> task issues and agent execution receipts
  -> implementation pull request and human review
  -> CI and security evidence
  -> infrastructure validation and deployment
  -> live application
  -> GH-AW security and delivery review
  -> verified security-fix merge
  -> final deployment evidence or labeled fallback
```

Repair missing links. Do not rewrite history or claim unavailable controls.

## 2. Demonstrate the final outcome

Show:

1. the React feedback board loads from Azure App Service;
2. valid feedback persists;
3. invalid input receives an actionable message;
4. a first vote increments the count;
5. a repeated vote from the same workshop client does not;
6. health and storage-backed readiness succeed.

Use non-sensitive workshop data.

## 3. Complete the reviewer checklist

A reviewer with only repository access should be able to answer:

- Why was the change requested?
- Which scenarios were approved?
- Which durable architecture constraints applied?
- How were tasks divided and who or what performed them?
- Which independent checks passed?
- Which security control ran, or which availability fallback was recorded?
- What commit was deployed, by which authorized workflow and environment?
- Where is the application URL and smoke-test evidence?
- What did GH-AW report, and what authority did it not have?
- Which deterministic security finding was fixed, and which scanner proved the
  remediation before merge?

## 4. Leave the repository ready for handoff

```powershell
openspec validate --all
git --no-pager status --short
git --no-pager diff --check
gh pr checks
```

Remove scratch data and local-only secrets. Do not archive the active OpenSpec
change until its implementation, validation, and review are complete.

## Expected repository artifacts

- Merged or approved implementation pull request.
- Linked specification and task receipts.
- Independent CI/security/infrastructure results.
- Successful protected deployment with URL and commit SHA.
- GH-AW security/delivery output or labeled manual fallback.
- Merged security remediation with passing CodeQL evidence.
- Any follow-up issue for deferred work.

## Verification

Confirm the commands in step 4 pass, the deployed URL is reachable, and every
row in the [delivery evidence contract](../platform/evidence-contract.md)
points to a real repository, GitHub, or Azure record.

## Recovery

Use the strongest verified evidence available:

1. recover missing links from issues, pull requests, checks, and deployments;
2. use the instructor's final checkpoint only for a live demonstration;
3. state clearly which evidence belongs to the team and which belongs to the
   checkpoint;
4. create a follow-up issue for any unresolved gap.

Do not mark the team's delivery complete when the live application or required
evidence belongs only to another team's repository.

## Stretch

Ask a reviewer from another team to reconstruct the story without verbal
guidance and record the first missing or ambiguous link as a follow-up issue.
