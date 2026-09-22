# Tasks

## 1. Application foundation

- [x] 1.1 Scaffold the TypeScript workspace, package scripts, formatting, linting, type checking, and build.
- [x] 1.2 Implement shared feedback contracts and validation.
- [x] 1.3 Implement in-memory and Azure Table storage adapters.
- [x] 1.4 Implement Express feedback, vote, health, and readiness endpoints.
- [x] 1.5 Implement the React feedback board, creation, voting, and accessible state handling.
- [x] 1.6 Add unit, API, and focused end-to-end tests.

## 2. Azure infrastructure

- [x] 2.1 Add pinned AVM-based storage, monitoring, App Service plan, and web app infrastructure.
- [x] 2.2 Configure managed identity, least-privilege storage access, secure app settings, and deployment outputs.
- [x] 2.3 Add parameterization, Bicep validation, and `what-if` support.

## 3. GitHub planning and agent harness

- [x] 3.1 Add feature, implementation-task, and security issue forms.
- [x] 3.2 Add the evidence-focused pull-request template and specification PR guidance.
- [x] 3.3 Add OpenSpec planner and evidence reviewer custom agents.
- [x] 3.4 Add the reusable change-evidence skill and scoped instructions.
- [x] 3.5 Add GitHub-visible task and ownership contracts.

## 4. CI, security, and deployment

- [x] 4.1 Add OpenSpec and repository-integrity validation.
- [x] 4.2 Add application lint, type-check, test, build, and smoke-test CI.
- [x] 4.3 Add OpenSpec policy checks for material changes.
- [x] 4.4 Add CodeQL and dependency-review paths with documented availability fallbacks.
- [x] 4.5 Add OIDC-based Bicep validation and Azure `what-if`.
- [x] 4.6 Add protected App Service deployment, health checks, and deployment evidence.

## 5. Agentic workflow

- [x] 5.1 Add the GH-AW evidence-review source with read-only permissions and one narrow safe output.
- [x] 5.2 Compile and commit the generated lock workflow.
- [x] 5.3 Add source/lock validation and update guidance.

## 6. Participant and instructor experience

- [x] 6.1 Complete Labs 1 through 5 and the wrap/evidence guide.
- [x] 6.2 Add comparable participant feature briefs.
- [x] 6.3 Add environment readiness, recovery checkpoints, and troubleshooting.
- [x] 6.4 Add team repository, ruleset, OIDC, Azure resource, feature-availability, and cleanup guidance.
- [x] 6.5 Update README, DESIGN, documentation maps, and co-located agent guidance.

## 7. End-to-end validation

- [x] 7.1 Run all local application, OpenSpec, documentation, workflow, and Bicep checks.
- [ ] 7.2 Deploy to a test Azure resource group through GitHub OIDC.
- [ ] 7.3 Verify feedback creation and voting against the deployed application.
- [ ] 7.4 Run GH-AW against the real specification, CI/security, and deployment evidence.
- [ ] 7.5 Confirm a reviewer can reconstruct the complete issue-to-deployment story from GitHub.
