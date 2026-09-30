# Team repository runbook

## Topology

Create one isolated repository per workshop table of **two or three
participants**. Do not share an Azure scope, workload identity, variables, or
federated credential across tables.

Create each repository from the approved template through the organization
template UI or approved automation. Record the exact template commit before
preparation. The preparation script intentionally does not create repositories
so an instructor must select and confirm the target explicitly.

## Prepare one repository

Prerequisites:

- `gh auth status` succeeds with administration access to the target;
- `az account show` succeeds with permission to inspect the Entra application;
- the team resource group and secretless workload identity already exist;
- GitHub immutable OIDC subjects and exact Entra credentials are configured as
  described in [provisioning](provisioning.md); and
- no `AZURE_CLIENT_SECRET` or equivalent Actions secret exists.

Preview the exact target first:

```powershell
.\scripts\prepare-team-repo.ps1 `
  -Organization "contoso-workshop" `
  -Repository "workshop-team01" `
  -TemplateRepository "contoso-workshop/workshop-template" `
  -TemplateRevision "<approved-template-commit>" `
  -FeatureBrief "docs/features/feedback-status.md" `
  -TeamSize 3 `
  -TeamId "team01" `
  -AzureSubscriptionId "<subscription-id>" `
  -AzureTenantId "<tenant-id>" `
  -AzureClientId "<application-client-id>" `
  -AzureResourceGroup "workshop-team01-rg" `
  -EntraApplicationObjectId "<application-object-id>" `
  -Confirmation PREPARE `
  -DryRun `
  -StateOutput ".\team01-preparation.json"
```

Review the target, numeric GitHub owner/repository IDs, Azure scope, operations,
and manual actions. Remove `-DryRun` to converge the supported state. Run the
same command a second time; environments, variables, labels, and marker-based
issues must report `VERIFY`, not duplicate creation.

The script:

- stops before changes if the approved revision is not in default-branch
  history;
- enables Issues and creates the `workshop-validation` and `workshop`
  environments when missing;
- converges Azure and team workflow variables in each exact environment, plus
  repository-level feature and immutable-ID metadata;
- records numeric GitHub repository and owner IDs;
- creates or verifies workshop labels;
- seeds one feature parent issue and one bounded cloud-agent revision issue;
- verifies exact immutable federation for both environments; and
- reports environment-reviewer configuration as a manual organization action.

It deliberately **does not create the deterministic security branch or draft
pull request**. That belongs to the security-exercise preparation workstream.

## Idempotency and safety

Seeded issues contain stable HTML markers. Existing matching issues are reused;
duplicate markers are a blocking error. Existing labels and variables are
updated in place. The script does not delete participant work, weaken rulesets,
set secrets, create a client secret, force-push, or create a pull request.

If organization policy prevents environment protection automation, complete
the reported manual action and rerun readiness. Do not mark the repository
prepared while a blocking invariant remains unresolved.

## Exit criteria

- Repository provenance matches the approved template revision.
- The table has two or three participants and one isolated repository.
- Two exact environments and all required non-secret variables exist.
- Numeric repository/owner identity and exact environment OIDC claims pass.
- No Azure client secret or wildcard/name-only federation is present.
- Seeded issue markers are unique and a second run is stable.
- The preflight in [readiness](readiness.md) is green except its explicit
  Copilot App manual check.
