# Team repository runbook

## Outcome

Create one repository per team from the workshop template and configure
team-specific variables without copying credentials.

## Create repositories

Authenticate and confirm the target organization:

```powershell
gh auth status
gh repo view $env:TEMPLATE_REPO
```

Create repositories through the GitHub template UI or the organization-approved
automation. Example for one team:

```powershell
gh repo create "$($env:GH_ORG)/$($env:WORKSHOP_PREFIX)-team01" `
  --template $env:TEMPLATE_REPO `
  --private `
  --confirm
```

Adjust visibility only after confirming feature availability. The exact `gh`
flags can vary by installed version; check `gh repo create --help`.

## Configure each repository

Record:

- team identifier;
- Azure resource group;
- Azure subscription and tenant identifiers;
- OIDC client/application identifier;
- deployment environment name;
- application naming prefix or suffix.

Use GitHub Actions variables for non-secret configuration. OIDC should remove
the need for an Azure client secret. Do not copy one team's variables or
federated credential to another repository.

Example variable pattern:

```powershell
$repo = "$($env:GH_ORG)/$($env:WORKSHOP_PREFIX)-team01"
gh variable set TEAM_ID --repo $repo --body "team01"
gh variable set AZURE_RESOURCE_GROUP --repo $repo --body "$($env:WORKSHOP_PREFIX)-team01-rg"
gh variable set AZURE_CLIENT_ID --repo $repo --body "$env:AZURE_CLIENT_ID"
gh variable set AZURE_TENANT_ID --repo $repo --body "$env:AZURE_TENANT_ID"
gh variable set AZURE_SUBSCRIPTION_ID --repo $repo --body "$env:AZURE_SUBSCRIPTION_ID"
```

Use the variable names expected by the implemented workflows; inspect the
repository before setting additional names.

## Access

- Add team members with the least role needed for the labs.
- Ensure at least two people can review the specification and implementation
  pull requests.
- Keep instructor administration separate from participant approval.
- Verify the cloud coding agent can access the repository if that path is
  advertised.

## Verification

```powershell
gh repo view $repo
gh variable list --repo $repo
gh api "repos/$repo/environments"
```

Do not expect Actions checks until the corresponding planned workflow files are
implemented and active.

## Exit criteria

- Repository was created from the intended template revision.
- Team membership is correct.
- Variables point only to the assigned Azure scope.
- Environments, rulesets, and OIDC remain to be verified by their runbooks.
