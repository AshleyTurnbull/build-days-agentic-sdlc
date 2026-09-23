# Lab 3: Build, test, and deploy

## Outcome

Prove the feature through independent GitHub checks, deploy the React/Express
application to Azure App Service through OIDC, and capture live health and
feedback evidence.

## Prerequisites

- The feature implementation pull request links the approved OpenSpec change.
- The instructor completed [Azure OIDC setup](../instructor/azure-oidc.md) and
  assigned the team resource group.
- The repository's deployment environment and required reviewers are
  configured.
- Any licensing-dependent security fallback is recorded by the instructor.

## 1. Validate locally

Inspect `package.json` and use its checked-in scripts for formatting, linting,
type checking, tests, and build. Do not substitute successful agent output for
the command results.

```powershell
npm ci
npm run check
openspec validate --all
git --no-pager diff --check
```

Run focused tests for the changed behavior before the full check when the
closest application or test instructions provide a selector.

## 2. Inspect the independent checks

The approved design reserves these workflow responsibilities:

- `openspec.yml` validates OpenSpec and repository integrity.
- `ci.yml` runs application lint, type checking, tests, build, and smoke tests.
- `spec-pr-policy.yml` checks that governed changes link an applicable spec.
- `codeql.yml` and `dependency-review.yml` provide security evidence where
  repository visibility and licensing support them.
- `infra-validate.yml` validates Bicep and records Azure `what-if`.
- `deploy.yml` performs protected deployment and live verification.

Treat a workflow as available only when its file exists in the repository and
the current pull request has a real run. Record a documented fallback rather
than claiming an unavailable feature passed.

```powershell
gh pr checks
gh run list --limit 20
```

Repair failures from the job logs. Do not rerun repeatedly without changing the
cause.

## 3. Review infrastructure evidence

Before requesting `what-if`, extend the existing AVM web-app configuration with
the App Service health-check path `/health`. This is the required participant
infrastructure change: the starter provides a deployable AVM composition, while
the team makes it production-aware for its changed application. Keep the
setting in the AVM module inputs rather than adding an unmanaged raw web-app
resource.

Confirm that the infrastructure change:

- composes pinned AVM modules where suitable modules exist;
- scopes resources to the assigned resource group and team identifier;
- enables App Service system-assigned managed identity;
- grants only the required Storage Table data-plane role;
- stores no long-lived Azure client secret;
- configures the App Service health check to use `/health`;
- shows the `what-if` result and documented AVM exceptions.

The instructor owns the external Azure federation and resource-group setup.
Repository documentation and Bicep must accurately describe, not fabricate,
that configuration.

## 4. Deploy through the protected environment

After required pull-request checks and approvals pass, invoke the repository's
implemented deployment path. Approve the GitHub environment only after
reviewing the commit SHA, target environment, resource group, and `what-if`
evidence.

The deployment input is the pull request number, not a free-form URL. Dispatch
the workflow from the pull request's head branch so the selected commit is
contained by that pull request:

```powershell
$pr = gh pr view --json number,headRefName,headRefOid | ConvertFrom-Json
gh workflow run deploy.yml `
  --ref $pr.headRefName `
  -f teamId="$env:TEAM_ID" `
  -f pullRequestNumber=$pr.number
Write-Host "Requested deployment of $($pr.headRefOid) for PR #$($pr.number)."
```

The workflow rejects a missing or invalid number, a pull request from another
repository, any selected commit other than the pull request's current head,
missing required checks, and failed or pending security checks. This prevents
current-head check results from being attached to an older superseded commit.
Do not dispatch from the default branch after merge; use the reviewed
same-repository pull-request head while it is still available.

The deployment is successful only when the workflow verifies:

1. process health;
2. storage-backed readiness;
3. creation of a feedback item;
4. first-vote behavior;
5. repeated-vote protection.

## 5. Capture evidence

After live verification succeeds, `deploy.yml` uploads one compact
`deployment-evidence.json` artifact and creates or updates one marked comment
on the supplied pull request. A failed deployment or smoke test produces
neither success evidence nor a success comment.

Inspect the receipt:

```powershell
$run = gh run list --workflow deploy.yml --limit 1 --json databaseId,url,conclusion |
  ConvertFrom-Json
gh run view $run.databaseId
gh run download $run.databaseId --pattern "deployment-evidence-*"
Get-Content .\deployment-evidence-*\deployment-evidence.json | ConvertFrom-Json |
  Format-List
```

The artifact records:

- implementation pull-request URL and commit SHA;
- required-check and security status;
- Azure deployment run and deployment identifier;
- application URL;
- health/readiness and focused feedback smoke-test result;
- environment approval and any documented fallback.

Avoid placing tokens, subscription details, or sensitive configuration in
issues or pull requests.

## Expected repository artifacts

- Passing implementation pull request linked to OpenSpec scenarios.
- Reviewed infrastructure change and `what-if` evidence.
- Protected deployment record.
- Machine-readable deployment evidence artifact and one updated PR comment.
- Reachable application URL with persistent feedback and votes.

## Verification

```powershell
gh pr checks
gh run list --limit 20
Invoke-RestMethod -Method Get -Uri "$env:APP_URL/health"
Invoke-RestMethod -Method Get -Uri "$env:APP_URL/ready"
```

Set `APP_URL` to the application URL published by the successful deployment.
Use the repository's documented smoke-test command for write and vote
verification once it is present; do not invent request payloads.

## Recovery

Time-box deployment repair to fifteen minutes:

1. distinguish CI, OIDC, Azure quota, infrastructure, application startup, and
   storage-readiness failures;
2. preserve failing job summaries and deployment identifiers;
3. restore the instructor's deployment-ready checkpoint if code or
   infrastructure drift cannot be repaired;
4. use an instructor-verified deployment only after recording which team
   evidence is unavailable.

Never add a client secret as an OIDC workaround.

## Stretch

Restart the App Service and show that previously created feedback and vote
counts remain available from Azure Table Storage.
