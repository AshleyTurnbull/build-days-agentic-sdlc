# CSI Build Day: Agentic SDLC on GitHub

This repository is the starter template for a hands-on workshop that takes a change through the complete agentic software delivery loop:

> Issue -> OpenSpec proposal -> design -> tasks -> implementation -> tests -> pull request -> review -> security fix -> merge -> Azure deployment evidence

The workshop combines three complementary practices:

- **Spec-driven development with OpenSpec** defines what a change must accomplish before implementation begins.
- **Harness engineering** makes the repository legible, constrained, and self-verifying for every coding agent.
- **GitHub platform automation** connects Copilot, Actions, security scanning, Azure Verified Modules (AVM), and GitHub Agentic Workflows (GH-AW).

## The mental model

OpenSpec and harness engineering solve different problems:

| Practice | Scope | Primary artifacts | Question answered |
|---|---|---|---|
| OpenSpec | One proposed change | `proposal.md`, capability specs, change `design.md`, `tasks.md` | What are we changing, why, and how will we know it is correct? |
| Harness engineering | The whole repository | `AGENTS.md`, `DESIGN.md`, scoped instructions, tests, CI, observability | How can any agent understand and safely change this system? |

OpenSpec is the workshop's canonical SDD framework. Harness engineering is the persistent execution environment around it.

## What teams build

Teams extend a TypeScript feedback board with a React client and Express API.
The production server hosts both the API and the built client on Azure App
Service. Feedback and votes persist in Azure Table Storage through the App
Service managed identity. Azure infrastructure is composed from pinned Azure
Verified Modules where suitable modules exist.

The workshop uses a specification pull request before implementation. CI,
security, infrastructure validation, protected deployment, and live smoke tests
then produce evidence independently from the implementing agent. The final
outcome is a reachable deployed application plus a GitHub-visible record from
intent through deployment and GH-AW evidence review.

## Repository knowledge map

Start with these files:

- [`AGENTS.md`](AGENTS.md) - concise map and operating contract for coding agents.
- [`DESIGN.md`](DESIGN.md) - durable system boundaries and architectural decisions.
- [`docs/README.md`](docs/README.md) - index of workshop and engineering documentation.
- [`openspec/config.yaml`](openspec/config.yaml) - OpenSpec schema, context, and artifact rules.
- [`docs/labs/01-openspec-and-harness.md`](docs/labs/01-openspec-and-harness.md) - Lab 1 participant flow.
- [`docs/features/README.md`](docs/features/README.md) - comparable feature briefs for team implementation.
- [`docs/platform/README.md`](docs/platform/README.md) - GitHub, Azure, and evidence contracts.
- [`docs/instructor/README.md`](docs/instructor/README.md) - instructor provisioning and operations runbooks.

Directories may contain a co-located `AGENTS.md`. The closest file adds local instructions; it does not replace the repository-wide contract.

## OpenSpec workflow

OpenSpec requires Node.js 20.19 or later.

```powershell
npm install --global @fission-ai/openspec@1.13.1
openspec init
```

The core workshop loop is:

```text
/opsx:explore
/opsx:propose <change-name>
review proposal.md, specs, design.md, and tasks.md
/opsx:apply
validate the implementation and deployment evidence
/opsx:archive
```

The command spelling may vary by coding tool. `openspec init` reports the commands generated for the selected integration.

## Workshop delivery model

Use this repository as a **template**, not as the upstream for participant forks. Pre-create one repository per team in the workshop organization so that Actions, Copilot coding agent access, GitHub security features, Azure OIDC, environments, and GH-AW permissions can be tested before the event.

See [`docs/workshop-model.md`](docs/workshop-model.md) for the repository and
lab design. Participant instructions continue in
[`docs/labs/`](docs/labs/01-openspec-and-harness.md); instructor setup must be
completed before teams begin.
