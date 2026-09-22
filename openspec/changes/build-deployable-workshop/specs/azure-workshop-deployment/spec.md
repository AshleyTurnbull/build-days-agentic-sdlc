## ADDED Requirements

### Requirement: AVM-based infrastructure

Azure infrastructure SHALL be composed from pinned Azure Verified Modules where suitable modules exist.

#### Scenario: Infrastructure is reviewed

- **WHEN** an infrastructure pull request is opened
- **THEN** reviewers can identify the pinned AVM modules, parameter changes, documented exceptions, and Azure `what-if` result

### Requirement: Secretless Azure authentication

GitHub Actions SHALL authenticate to Azure through OIDC and SHALL NOT require a long-lived Azure client secret.

#### Scenario: Deployment job authenticates

- **WHEN** an authorized workflow targets the configured GitHub environment
- **THEN** Azure issues a short-lived identity token constrained to the configured repository and environment

### Requirement: Governed deployment

Production-like workshop deployment SHALL run through a protected GitHub environment and SHALL verify the deployed application before reporting success.

#### Scenario: Deployment succeeds

- **WHEN** infrastructure and application deployment complete and post-deployment health and feedback smoke tests pass
- **THEN** GitHub records the deployment and publishes the application URL, commit SHA, environment, and deployment identifier

#### Scenario: Smoke test fails

- **WHEN** the deployed application does not pass health or feedback verification
- **THEN** the workflow fails and does not publish success-shaped deployment evidence

### Requirement: Team isolation

Each participant team deployment SHALL be isolated to its assigned repository configuration and Azure resource group.

#### Scenario: Team deploys the application

- **WHEN** a team runs the deployment workflow
- **THEN** resource names and deployment scope derive from its configured team identifier and assigned resource group

