# Azure deployment contract

## Runtime shape

The production React bundle and Express API run in one Azure App Service. The
API persists feedback and votes in Azure Table Storage through a storage
interface. App Service uses a system-assigned managed identity for data access.

Tests use an in-memory adapter. Local development may use Azurite when the
checked-in application guidance enables it.

## Infrastructure shape

The root Bicep deployment composes pinned Azure Verified Modules where suitable
modules exist for:

- Storage;
- monitoring;
- App Service plan;
- web app.

Custom Bicep is limited to composition and documented AVM gaps. Reviewers must
be able to identify module versions, parameters, exceptions, and the Azure
`what-if` result.

## Authentication and authorization

GitHub Actions uses OIDC to obtain short-lived Azure credentials. Federation is
constrained to the intended repository and GitHub environment. No long-lived
Azure client secret is required.

Keep these identities separate:

- the GitHub deployment identity can validate and deploy only within the
  assigned workshop scope;
- the App Service managed identity receives only the required Storage Table
  data-plane role.

Instructor setup is documented in
[`../instructor/azure-oidc.md`](../instructor/azure-oidc.md).

## Deployment success

`deploy.yml`, once implemented and active, must not publish success-shaped
evidence until it verifies:

- Azure deployment completion;
- application process health;
- storage-backed readiness;
- feedback creation;
- first vote;
- repeated-vote protection.

The recorded evidence includes the application URL, commit SHA, GitHub
environment, and Azure deployment identifier. A failed smoke test keeps the
workflow failed.

## Team isolation

Each team has a separate repository configuration and Azure resource group.
Resource names and deployment scope derive from the configured team identifier.
Never copy another team's identifiers, federated credential, or deployment
outputs into a team repository.
