# Instructor provisioning

## Outcome

Prepare organization capacity, one repository and Azure resource group per
table of two or three, and a secretless workload identity that can later be
verified by the repository preparation script.

## Event inventory

Maintain an instructor-only roster with:

- table/team identifier and two or three participants;
- target `owner/repository`;
- approved template commit;
- selected feature brief;
- Azure tenant, subscription, resource group, region, and cleanup date;
- Entra application client ID and object ID; and
- numeric GitHub repository ID and repository owner ID returned by GitHub.

Do not commit event identifiers or participant data.

## GitHub organization decisions

Confirm repository visibility, Actions policy, environment protection,
Copilot App and CLI access, cloud coding agent access, CodeQL/dependency-review
availability, GH-AW/model access, and evidence retention. Test licensing and
policy in a disposable team repository rather than inferring it from the
template.

## Azure scope and quota

Confirm the tenant, subscription, region, App Service quota, and one resource
group per team. Example:

```powershell
az account set --subscription "<subscription-id>"
az group create `
  --name "workshop-team01-rg" `
  --location "<region>" `
  --tags workshop="<event>" team="team01" cleanup="<yyyy-mm-dd>"
```

Assign the workflow identity only the reviewed control-plane role at:

```text
/subscriptions/<subscription-id>/resourceGroups/<team-resource-group>
```

Do not grant subscription Owner/Contributor by default. Keep instructor
break-glass access separate. App Service uses its own managed identity for
Storage Table data-plane access.

## Immutable GitHub OIDC trust

Create one Entra application/service principal per team or a reviewed
equivalent isolation model. Enable GitHub's immutable OIDC subject for the
repository and read the live prefix:

```text
repo:<owner>@<numeric-owner-id>/<repository>@<numeric-repository-id>
```

Create one Entra federated credential for each exact workflow environment by
appending `:environment:workshop-validation` or `:environment:workshop`.
Issuer remains `https://token.actions.githubusercontent.com` and audience
remains `api://AzureADTokenExchange`.

The preparation script reads GitHub's live OIDC customization and the
application's federated credentials. It requires the numeric owner/repository
prefix and exact environment subject, and rejects wildcards, mutable
`repo:<owner>/<name>`-only subjects, and client-secret fallback. If immutable
subjects are not available, record a blocking readiness failure rather than
broadening trust. Follow [the detailed OIDC runbook](azure-oidc.md) to enable
the repository setting and create credentials.

Retrieve immutable IDs with the instructor identity:

```powershell
gh api repos/contoso-workshop/workshop-team01 `
  --jq '{repository_id: .id, repository_owner_id: .owner.id}'
```

Never store an Azure client secret in repository, environment, organization,
or instructor automation. Scope the non-secret team and Azure workflow
variables to each GitHub environment.

## Ordered handoff

1. Record quota, policies, roster, resource groups, and cleanup ownership.
2. Create each repository from the approved template revision and retain the
   source template `owner/repository` for tree verification.
3. Create the team workload identity and exact immutable federated claims.
4. Run [`prepare-team-repo.ps1`](../../scripts/prepare-team-repo.ps1) first
   with `-DryRun`, then apply it, then rerun it.
5. Configure reported manual environment protections and
   [rulesets](rulesets.md).
6. Run the executable [readiness preflight](readiness.md).
7. Trigger `infra-validate.yml` and rerun preflight to capture green OIDC and
   Azure `what-if` evidence.

## Exit criteria

- Organization feature matrix and fallbacks are recorded.
- Azure region and App Service quota are tested.
- Every table maps to one repository, identity, and resource group.
- Numeric GitHub identity and exact environment federation are verified.
- No long-lived Azure client secret is planned or present.
- Cleanup owner and date are assigned.
