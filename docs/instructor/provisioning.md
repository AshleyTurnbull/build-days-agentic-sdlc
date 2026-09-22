# Instructor provisioning

## Outcome

Prepare the GitHub organization and Azure scope needed to create isolated team
repositories and deployments.

## Inputs

Set workshop-specific values in the current PowerShell session:

```powershell
$env:GH_ORG = "<organization>"
$env:TEMPLATE_REPO = "<organization>/<template-repository>"
$env:AZURE_SUBSCRIPTION_ID = "<subscription-id>"
$env:AZURE_LOCATION = "<region>"
$env:WORKSHOP_PREFIX = "<short-prefix>"
```

Do not commit these values. Subscription IDs are not credentials, but keeping
event configuration out of the template reduces accidental cross-team reuse.

## GitHub organization decisions

Confirm:

- team count and membership;
- repository visibility;
- GitHub Copilot and cloud coding agent access;
- Actions policy and allowed actions;
- CodeQL and dependency-review availability;
- environment protection availability;
- GH-AW and model access;
- retention requirements for issues, pull requests, Actions, and deployments.

Prefer a workshop organization where these controls can be tested centrally.
Forks are a fallback, not the standard topology.

## Azure decisions

Confirm:

- subscription and tenant;
- region and App Service quota;
- one resource group per team;
- one deployment identity per team, unless a reviewed central pattern provides
  equivalent isolation;
- instructor break-glass ownership;
- resource tags and cleanup date.

Example resource-group creation:

```powershell
az account set --subscription $env:AZURE_SUBSCRIPTION_ID
az group create `
  --name "$($env:WORKSHOP_PREFIX)-team01-rg" `
  --location $env:AZURE_LOCATION `
  --tags workshop=$env:WORKSHOP_PREFIX team=team01 cleanup="<yyyy-mm-dd>"
```

Repeat from an instructor-maintained roster. Review generated names before
running bulk operations.

## Least privilege

Scope the GitHub deployment identity to the assigned resource group. The
deployed App Service identity receives the Storage Table data-plane role only
for its team's storage account. Keep instructor break-glass access separate
from workflow identity.

## Exit criteria

- Organization feature matrix recorded.
- Azure region and quota tested.
- Team roster mapped to repository and resource group names.
- Cleanup owner and date assigned.
- No long-lived Azure client secrets planned for GitHub Actions.
