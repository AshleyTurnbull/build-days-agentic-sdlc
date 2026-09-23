# Workshop wrap: Reconstruct the evidence

## Outcome

Demonstrate the deployed feature and prove that a reviewer can reconstruct the
complete delivery story from durable repository, GitHub, and Azure evidence
without access to any originating chat history.

## Prerequisites

- The feature pull request is merged or ready for final human-approved merge.
- The deployed application URL and successful deployment run are available.
- The GH-AW run or clearly labeled manual fallback is available.
- The deterministic security remediation and CodeQL result are available.

## 1. Reconstruct the evidence chain

Follow durable links in this order: issue, specification pull request, OpenSpec
proposal/scenarios/design/tasks, task issues and session receipts,
implementation pull request and human review, CI and security evidence,
infrastructure validation and deployment, live application, GH-AW review,
verified security-fix merge, and final deployment evidence or labeled
fallback.

### Prompt card: independent reviewer

- **Use:** A fresh Copilot App session with no prior lab conversation.
- **Attach:** Only the feature issue or final implementation pull request as
  the starting record.
- **Prompt:** Act as an independent delivery reviewer. Without using chat
  history, reconstruct the issue-to-deployment story by following durable
  repository and GitHub links. Identify the approved OpenSpec scenarios,
  architecture constraints, task receipts, implementation and human reviews,
  current-head CI and security checks, AVM `what-if`, protected deployment,
  deployed commit and URL, smoke evidence, GH-AW result and its authority
  limits, deterministic CodeQL remediation, and any labeled fallback. Return a
  chronological evidence table with direct links, then list every missing,
  inconsistent, or unprovable claim. Do not infer success from agent summaries.
- **Expect:** A self-contained evidence map that does not depend on transcripts.
- **Decide:** Repair missing links, not history. Do not claim unavailable
  controls or manufacture receipts.

## 2. Demonstrate the final outcome

Show with non-sensitive workshop data:

1. the React feedback board loads from Azure App Service;
2. valid feedback persists;
3. invalid input receives an actionable message;
4. a first vote increments the count;
5. a repeated vote from the same workshop client does not; and
6. health and storage-backed readiness succeed.

### Prompt card: live demonstration review

- **Use:** Copilot App beside the deployed application and successful deployment
  run.
- **Attach:** The application URL, deployment evidence artifact, and documented
  smoke-test result.
- **Prompt:** Guide a read-only comparison between the live demonstration and
  the recorded smoke evidence. Check that the URL, environment, deployed commit,
  health, readiness, persistence, validation message, first vote, and repeated
  vote behavior agree. Do not expose tokens or sensitive configuration.
- **Expect:** A concise match or mismatch list tied to durable evidence.
- **Decide:** Treat any live or evidence mismatch as an unresolved gap.

## 3. Complete the reviewer checklist

A reviewer with repository access should be able to answer:

- Why was the change requested?
- Which scenarios were approved?
- Which durable architecture constraints applied?
- How were tasks divided and what performed them?
- Which independent checks passed for the final commit?
- Which security control ran, or which availability fallback was recorded?
- What commit was deployed by which authorized workflow and environment?
- Where are the application URL and smoke-test evidence?
- What did GH-AW report, and what authority did it not have?
- Which deterministic security finding was fixed, and which scanner proved the
  remediation before merge?

### Prompt card: handoff decision

- **Use:** The independent reviewer session.
- **Attach:** The reconstructed evidence table and
  [delivery evidence contract](../platform/evidence-contract.md).
- **Prompt:** Compare every required evidence-contract row with the reconstructed
  records. Separate team evidence from instructor checkpoint evidence, and
  separate enforced controls from documented fallbacks. Recommend complete,
  incomplete, or complete-with-recorded-limitation; do not merge, deploy, or
  archive anything.
- **Expect:** A transparent handoff recommendation and explicit unresolved
  items.
- **Decide:** A human makes the final completion and merge decision.

## 4. Leave the repository ready for handoff

### Prompt card: final repository check

- **Use:** A fresh Copilot App session in the final workspace.
- **Attach:** Root and closest instructions, active OpenSpec change, final pull
  request, and evidence contract.
- **Prompt:** Run the repository's checked-in OpenSpec validation, repository
  status review, diff check, and final pull-request checks. Remove only
  workshop scratch data and local-only secrets. Do not modify durable evidence,
  rewrite history, weaken checks, or archive the active OpenSpec change before
  implementation, validation, and review are complete.
- **Expect:** Clean validation results or an exact list of remaining work.
- **Decide:** Hand off only when the durable repository and platform receipts
  match the demonstrated state.

## Expected repository artifacts

- Merged or approved implementation pull request.
- Linked specification and task receipts.
- Independent CI, security, and infrastructure results.
- Successful protected deployment with URL and commit SHA.
- GH-AW security/delivery output or labeled manual fallback.
- Merged security remediation with passing CodeQL evidence.
- Follow-up issue for any deferred or unresolved work.

## Verification

Use the fresh reviewer session to confirm checked-in validation passes, the
deployed URL is reachable, and every row in the
[delivery evidence contract](../platform/evidence-contract.md) points to a real
repository, GitHub, or Azure record. Agent summaries alone are not evidence.

## Recovery

### Prompt card: strongest verified evidence

- **Use:** A fresh Copilot App recovery session.
- **Attach:** Available issues, pull requests, checks, deployments, checkpoint
  labels, and the evidence contract.
- **Prompt:** Recover missing links from durable records and distinguish team
  evidence from instructor checkpoint evidence. Identify what can be proved,
  what is unavailable, and the smallest follow-up issue needed. Do not mark the
  team complete when the live application or required evidence belongs only to
  another repository.
- **Expect:** The strongest honest evidence set and a bounded follow-up for each
  unresolved gap.
- **Decide:** Use the instructor's final checkpoint only for the live
  demonstration and label its provenance clearly.

## Stretch

Ask a reviewer from another team to start from the feature issue, use the
independent-reviewer prompt without verbal guidance, and record the first
missing or ambiguous link as a follow-up issue.
