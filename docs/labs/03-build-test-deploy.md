# Lab 3: Build, test, and deploy

## Outcome

Use GitHub Copilot App to review focused validation and CI failures, make the
required AVM health-check change, inspect Azure `what-if`, authorize a protected
deployment, and preserve independent deployment evidence.

## Prerequisites

- The feature implementation pull request links the approved OpenSpec change.
- The instructor completed [Azure OIDC setup](../instructor/azure-oidc.md) and
  assigned the team resource group.
- The repository deployment environment and required reviewers are configured.
- Any licensing-dependent security fallback is recorded by the instructor.
- Open the repository in GitHub Copilot App and start from the implementation
  pull request.

## 1. Ask the App to run checked-in validation

### Prompt card: focused validation

- **Use:** A fresh Copilot App session in the feature branch workspace.
- **Attach:** The implementation pull request, active OpenSpec change,
  `package.json`, and the closest application and test instructions.
- **Prompt:** Review the changed scenarios and run the smallest checked-in
  focused validation first. Then run the repository's checked-in full
  validation, OpenSpec validation, and diff check. Do not invent commands,
  weaken tests, or treat your own summary as evidence. Report the exact checks,
  outcomes, and changed files.
- **Expect:** Focused results followed by the repository-defined full checks,
  with actionable failures and no unrelated edits.
- **Decide:** Continue only when the focused behavior and full repository checks
  pass. Otherwise ask the same session for the smallest bounded repair and
  rerun the affected checked-in validation.

## 2. Review independent CI evidence

Treat a workflow as available only when its file exists and the current pull
request has a real run. The approved responsibilities are:

- `openspec.yml`: OpenSpec and repository integrity.
- `ci.yml`: lint, type checking, tests, build, and smoke tests.
- `spec-pr-policy.yml`: applicable approved specification linkage.
- `codeql.yml` and `dependency-review.yml`: security evidence where available.
- `infra-validate.yml`: Bicep validation and Azure `what-if`.
- `deploy.yml`: protected deployment and live verification.

### Prompt card: CI failure review

- **Use:** Copilot App with the pull request and failed check open.
- **Attach:** The failing job log, pull-request diff, linked OpenSpec scenarios,
  and applicable `AGENTS.md` files.
- **Prompt:** Explain the first causal failure, distinguish it from downstream
  noise, and propose the smallest compliant fix. Preserve required checks,
  security controls, OIDC, and protected-environment gates. If a workflow or
  licensed control is unavailable, identify the documented fallback instead of
  claiming it passed.
- **Expect:** A cause tied to log evidence, a bounded repair, and a focused
  validation plan.
- **Decide:** Apply a repair only when it addresses the cause. Do not repeatedly
  rerun unchanged failures.

## 3. Make the AVM health-check change

The required participant infrastructure change is to configure the existing
AVM web-app composition to use `/health` as the App Service health-check path.
Keep the setting in AVM module inputs; do not add an unmanaged raw web-app
resource.

### Prompt card: production-aware AVM change

- **Use:** A Copilot App session scoped to the infrastructure task.
- **Attach:** The infrastructure files, `infra/AGENTS.md`, root `DESIGN.md`, the
  active Azure deployment spec, and the implementation pull request.
- **Prompt:** Update the existing pinned AVM web-app configuration so App
  Service health checks use `/health`. Preserve the assigned resource-group and
  team scope, system-assigned managed identity, least-privilege Storage Table
  data access, and OIDC-only authentication. Do not add secrets or unmanaged
  replacement resources. Run the checked-in infrastructure validation and show
  the exact diff and evidence.
- **Expect:** A narrow AVM input change, passing repository validation, and no
  change to external federation owned by the instructor.
- **Decide:** Accept only if the diff preserves pinned AVM composition,
  documents any existing exception, and contains no long-lived Azure
  credential.

## 4. Inspect `what-if` and authorize deployment

### Prompt card: infrastructure evidence

- **Use:** Copilot App and the GitHub pull-request checks view.
- **Attach:** The `infra-validate.yml` run summary, Azure `what-if` output, AVM
  diff, and target environment details.
- **Prompt:** Review this `what-if` for the pull request. Summarize creates,
  updates, deletes, scope, identity, role assignments, and the `/health`
  setting. Flag destructive, cross-team, secret-based, or unexplained changes.
  Do not approve or deploy.
- **Expect:** A concise risk review tied to the actual `what-if`.
- **Decide:** A human proceeds only when the commit, environment, resource
  group, and expected changes match the approved pull request.

### Prompt card: protected deployment

- **Use:** The GitHub Actions deployment form and protected-environment approval
  screen, with Copilot App available for review.
- **Attach:** The pull-request number, current head commit, passing required and
  security checks, approved `what-if`, and assigned team identifier.
- **Prompt:** Verify that this deployment targets the current head commit of
  this same-repository pull request, uses the assigned team scope, and has all
  required checks complete. Explain any mismatch. Do not bypass approvals,
  dispatch from an unrelated ref, or substitute a URL for the pull-request
  number.
- **Expect:** Confirmation that the selected commit and pull request are
  linked, or a clear blocking mismatch.
- **Decide:** The environment reviewer approves or rejects. Copilot does not
  make the protected deployment decision.

Deployment is successful only when the workflow verifies process health,
storage-backed readiness, feedback creation, first-vote behavior, and
repeated-vote protection.

## 5. Review and preserve evidence

After successful verification, `deploy.yml` should publish one compact
`deployment-evidence.json` artifact and create or update one marked pull-request
comment. Failed deployment or smoke tests must produce neither success-shaped
evidence nor a success comment.

### Prompt card: evidence review

- **Use:** Copilot App with the successful deployment run and pull request.
- **Attach:** The deployment run, `deployment-evidence.json`, marked
  pull-request comment, and live application URL.
- **Prompt:** Check that the evidence records the implementation pull request,
  deployed commit SHA, required-check and security status, Azure run or
  deployment identifier, environment, application URL, health, readiness,
  focused feedback smoke results, approval, and any documented fallback.
  Identify missing or inconsistent fields without fabricating them.
- **Expect:** A field-by-field consistency review and links to durable evidence.
- **Decide:** Mark the lab complete only when the artifact, comment, run, commit,
  and live behavior agree.

Avoid placing tokens, subscription details, or sensitive configuration in
issues, pull requests, prompts, or evidence.

## Expected repository artifacts

- Passing implementation pull request linked to OpenSpec scenarios.
- Reviewed AVM health-check change and Azure `what-if` evidence.
- Protected deployment record.
- Machine-readable deployment evidence artifact and one updated PR comment.
- Reachable application URL with persistent feedback and votes.

## Verification

In Copilot App, ask a fresh session to inspect the pull request and run the
repository's checked-in focused and full validation. Independently open the
required checks, deployment run, evidence artifact, `/health`, `/ready`, and
the documented write-and-vote smoke result. Do not invent request payloads.

## Recovery

Time-box repair to fifteen minutes.

### Prompt card: deployment recovery

- **Use:** A fresh Copilot App session.
- **Attach:** The failing run summary, first causal job log, pull-request diff,
  `what-if`, and application health/readiness evidence.
- **Prompt:** Classify the failure as CI, OIDC, Azure quota, infrastructure,
  application startup, or storage readiness. Preserve diagnostics and propose
  the smallest safe next step. Never add a client secret as an OIDC workaround.
- **Expect:** A classified failure, retained run or deployment identifiers, and
  one bounded recovery action.
- **Decide:** Repair within the time box, restore the instructor's
  deployment-ready checkpoint when drift cannot be repaired, or use an
  instructor-verified deployment only after recording which team evidence is
  unavailable.

## Stretch

Restart the App Service, then use Copilot App to help compare before-and-after
evidence showing that previously created feedback and vote counts remain in
Azure Table Storage.
