# Design

## Context

The repository is currently documentation-only. The workshop must remain achievable in four hours and end with each team showing a feature deployed to Azure plus a working GitHub Agentic Workflow.

The audience is familiar with AI-DLC. The implementation must therefore demonstrate a GitHub-native control plane rather than only another artifact-generation methodology. Agent work must become visible through issues, branches, pull requests, checks, deployments, and safe workflow outputs.

Root `DESIGN.md` defines the durable repository principles. This change supplies the first concrete application and delivery architecture.

## Goals / Non-Goals

**Goals:**

- Provide a locally runnable and Azure-deployable TypeScript application before participants begin.
- Preserve a small, teachable architecture with clear frontend, API, shared-contract, storage, infrastructure, and workflow boundaries.
- Use pinned AVM modules and GitHub OIDC without long-lived Azure credentials.
- Make deterministic checks and human approvals independent from agent claims.
- Carry the same repository context across Copilot App/CLI, cloud coding agent, review, CI, and GH-AW.
- Provide recovery paths that still allow teams to finish with a deployed application.

**Non-Goals:**

- Build a production multi-tenant feedback product.
- Demonstrate every GitHub Copilot, Actions, Projects, GHAS, Azure, or GH-AW feature.
- Require GitHub Projects, MCP, merge queue, custom deployment protection rules, or artifact attestations for participant completion.
- Let an agent approve, merge, bypass protection, or deploy without platform authorization.

## Decisions

### Use a React/Express TypeScript application

One language and shared contracts reduce workshop setup and context switching. Express serves the API and production frontend bundle so one App Service deployment produces a visible end state.

### Use Azure Table Storage behind a storage interface

Table Storage demonstrates persistent state, managed identity, and data-plane authorization without introducing database migrations or complex operational setup. Tests use an in-memory implementation; local development may use Azurite.

Feedback records contain an identifier, title, description, category, author display name, vote count, creation timestamp, and optional status. Voting uses a stable workshop client identifier to prevent repeated votes in the sample.

### Use App Service with system-assigned managed identity

App Service provides a short and reliable path from a Node.js package to Azure. The web app receives a system-assigned identity with only the required Storage Table data role.

### Compose infrastructure from pinned AVM modules

The root deployment composes resource-group-scoped AVM modules for storage, monitoring, App Service plan, and web app where supported. Custom Bicep is limited to composition or gaps that the selected AVM modules do not cover, and exceptions are documented.

### Use two review gates

The specification PR approves proposal, requirements, design, and tasks. Implementation PRs then prove conformance through tests, security checks, and deployment evidence. This prevents implementation from silently redefining intent.

### Keep agent tasks visible in GitHub

OpenSpec `tasks.md` is the implementation plan. Parent issues and task issues/sub-issues make ownership, dependencies, agent assignment, and execution receipts visible outside the agent runtime.

### Use active workflows only for real checks

No workflow may report application, security, infrastructure, or deployment success without performing that check. Workflows produce actionable job summaries and preserve diagnostics on failure.

### Treat licensing and preview features explicitly

CodeQL, dependency review, protected environments, cloud agents, and GH-AW can depend on organization policy, repository visibility, license, or preview access. Instructor readiness checks identify availability. Labs provide a preferred path and a documented fallback without misrepresenting the missing control.

### Use one evidence-focused GH-AW

The primary GH-AW reads the OpenSpec change, pull-request checks, security result, and deployment evidence. It declares read-only permissions plus one narrow safe output. It cannot approve, merge, edit protected workflows, or deploy.

## Risks / Trade-offs

- App Service and AVM deployments can exceed the lab window if Azure quota or OIDC is not prepared. Team repositories and resource groups must be provisioned and tested before the event.
- Table Storage has limited query semantics. This is acceptable for the workshop feature menu and avoids unnecessary database complexity.
- Cloud-agent and GH-AW availability may vary. Readiness automation and instructor checkpoints are mandatory.
- A broad feature menu can create uneven difficulty. Features must be pre-validated for comparable scope and isolated file ownership.
- Multiple active workflows can overwhelm participants. Labs expose only the workflow relevant to the current stage and use concise summaries.
- Generated GH-AW lock files can drift from Markdown source. CI or instructor validation must compile and compare them.

