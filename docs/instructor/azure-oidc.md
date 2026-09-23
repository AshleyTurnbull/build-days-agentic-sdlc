# Azure OIDC runbook

## Outcome

Allow each team's GitHub deployment workflow to obtain short-lived Azure
credentials constrained to its repository and protected environment.

## Inputs

```powershell
$env:GH_ORG = "<organization>"
$env:TEAM_REPO = "<repository-name>"
$env:AZURE_SUBSCRIPTION_ID = "<subscription-id>"
$env:AZURE_RESOURCE_GROUP = "<team-resource-group>"
$env:AZURE_TENANT_ID = "<tenant-id>"
$deployEnvironments = @("workshop-validation", "workshop")
```

The checked-in workflows use `workshop-validation` for Bicep validation and
`workshop` for deployment. Each environment requires its own exact federated
subject and its own environment-scoped GitHub variables.

## Resolve immutable GitHub identity

GitHub.com repositories created, renamed, or transferred after July 15, 2026
use immutable OIDC subjects by default. Existing repositories must opt in.
Read the live repository identity and enable the repository's immutable
subject setting:

```powershell
$repository = gh api "repos/$($env:GH_ORG)/$($env:TEAM_REPO)" |
  ConvertFrom-Json
$repositoryId = [string]$repository.id
$ownerId = [string]$repository.owner.id

gh api --method PUT `
  "repos/$($env:GH_ORG)/$($env:TEAM_REPO)/actions/oidc/customization/sub" `
  -F use_default=true `
  -F use_immutable_subject=true

$oidc = gh api `
  "repos/$($env:GH_ORG)/$($env:TEAM_REPO)/actions/oidc/customization/sub" |
  ConvertFrom-Json
if (-not $oidc.use_immutable_subject) {
  throw "The repository is not using immutable OIDC subjects."
}
Write-Host "Observed immutable subject prefix: $($oidc.sub_claim_prefix)"
```

The observed prefix must be exactly:

```text
repo:<owner>@<numeric-owner-id>/<repository>@<numeric-repository-id>
```

Stop if the API returns a name-only prefix, unexpected IDs, a wildcard, or an
unsupported platform. Do not infer the prefix from names when the live preview
is available.

## Create the workload identity

Create one Microsoft Entra application and service principal per team, or use a
reviewed equivalent isolation model:

```powershell
$app = az ad app create `
  --display-name "$($env:TEAM_REPO)-github-oidc" `
  --query "{appId:appId,id:id}" `
  --output json | ConvertFrom-Json

az ad sp create --id $app.appId | Out-Null
```

Assign the least Azure control-plane role required by the checked-in
infrastructure at the team resource-group scope. Confirm the role with the
infrastructure owner; do not default to subscription Owner or Contributor.

```powershell
$scope = "/subscriptions/$($env:AZURE_SUBSCRIPTION_ID)/resourceGroups/$($env:AZURE_RESOURCE_GROUP)"
az role assignment create `
  --assignee $app.appId `
  --role "<approved-deployment-role>" `
  --scope $scope
```

## Add the federated credentials

For an environment-scoped job, append the exact protected environment to the
live immutable prefix:

```text
repo:<owner>@<owner-id>/<repository>@<repository-id>:environment:<environment-name>
```

Create one credential for each workflow environment. Use instructor-reviewed
JSON documents in the current workspace, apply them, then delete them:

```powershell
foreach ($environment in $deployEnvironments) {
  $credentialPath = ".\federated-credential-$($env:TEAM_REPO)-$environment.json"
  $expectedPrefix = "repo:$($repository.owner.login)@$ownerId/$($repository.name)@$repositoryId"
  if ($oidc.sub_claim_prefix -ne $expectedPrefix) {
    throw "Live OIDC prefix '$($oidc.sub_claim_prefix)' does not match '$expectedPrefix'."
  }
  $credential = @{
    name = "github-$environment"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "$expectedPrefix`:environment:$environment"
    audiences = @("api://AzureADTokenExchange")
  } | ConvertTo-Json

  Set-Content -Path $credentialPath -Value $credential -Encoding utf8
  az ad app federated-credential create --id $app.id --parameters $credentialPath
  Remove-Item $credentialPath
}
```

Do not commit the intermediate file.

## Configure GitHub variables

Set the tenant, subscription, and client/application identifiers using the
variable names expected by the implemented workflows. Scope every value to the
environment that uses it; do not place deployment identity or resource-group
values at repository scope.

```powershell
foreach ($environment in $deployEnvironments) {
  gh variable set AZURE_CLIENT_ID `
    --repo "$($env:GH_ORG)/$($env:TEAM_REPO)" `
    --env $environment `
    --body $app.appId
  gh variable set AZURE_TENANT_ID `
    --repo "$($env:GH_ORG)/$($env:TEAM_REPO)" `
    --env $environment `
    --body $env:AZURE_TENANT_ID
  gh variable set AZURE_SUBSCRIPTION_ID `
    --repo "$($env:GH_ORG)/$($env:TEAM_REPO)" `
    --env $environment `
    --body $env:AZURE_SUBSCRIPTION_ID
  gh variable set AZURE_RESOURCE_GROUP `
    --repo "$($env:GH_ORG)/$($env:TEAM_REPO)" `
    --env $environment `
    --body $env:AZURE_RESOURCE_GROUP
}
```

Set `TEAM_ID` in `workshop-validation` when required by
`infra-validate.yml`. These identifiers are not client secrets. Do not create
an `AZURE_CLIENT_SECRET` variable or secret.

## Verify

After `infra-validate.yml` and `deploy.yml` are implemented:

1. run infrastructure validation from the intended repository/ref;
2. inspect the Azure sign-in and GitHub job logs;
3. compare the job's live `sub` claim with the exact
   `repo:<owner>@<owner-id>/<repo>@<repo-id>:environment:<environment>` value;
4. confirm another repository or environment cannot use the credential;
5. confirm deployment cannot escape the assigned resource group;
6. confirm no Azure client secret exists in repository or environment secrets.

## Recovery

For `AADSTS` subject or audience failures, compare owner name and ID, repository
name and ID, environment, issuer, subject, and audience exactly. Re-read
`sub_claim_prefix`; repository transfers and opt-in state change the emitted
subject. Do not add a client secret to bypass federation.
