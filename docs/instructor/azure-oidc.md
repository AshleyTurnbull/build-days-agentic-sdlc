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
subject.

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

## Add the federated credential

The subject must match the protected GitHub environment:

```text
repo:<organization>/<repository>:environment:<environment-name>
```

Create one credential for each workflow environment. Use instructor-reviewed
JSON documents in the current workspace, apply them, then delete them:

```powershell
foreach ($environment in $deployEnvironments) {
  $credentialPath = ".\federated-credential-$($env:TEAM_REPO)-$environment.json"
  $credential = @{
    name = "github-$environment"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$($env:GH_ORG)/$($env:TEAM_REPO):environment:$environment"
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
variable names expected by the implemented workflows. These identifiers are
not client secrets.

## Verify

After `infra-validate.yml` and `deploy.yml` are implemented:

1. run infrastructure validation from the intended repository/ref;
2. inspect the Azure sign-in and GitHub job logs;
3. confirm another repository or environment cannot use the credential;
4. confirm deployment cannot escape the assigned resource group;
5. confirm no Azure client secret exists in repository or environment secrets.

## Recovery

For `AADSTS` subject or audience failures, compare the repository owner, name,
environment, issuer, subject, and audience exactly. Do not add a client secret
to bypass federation.
