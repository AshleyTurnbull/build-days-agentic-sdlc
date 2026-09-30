# Copilot repository instructions

Before changing code or configuration:

1. Read root `AGENTS.md` and `DESIGN.md`.
2. Read the closest co-located `AGENTS.md`.
3. Locate the active OpenSpec change and follow its approved specs, design, and tasks.

OpenSpec is required for material feature, behavior, infrastructure, security,
and workflow changes. Implement bounded tasks, preserve repository guardrails,
and report completion only with relevant validation evidence.

## OpenSpec invocation

- In GitHub Copilot App project sessions, prefer explicit natural-language skill invocation. Generated `.github/prompts/opsx-*.prompt.md` files provide slash commands in supported Copilot IDE extensions, but the App may not expose those commands through autocomplete.
- Use `openspec-propose` to create the proposal, delta requirements, design, and tasks. The proposal workflow is planning-only; do not edit implementation code until the user explicitly approves it in a later message.
- Use `openspec-update-change` when planning artifacts need revision and keep the proposal, specs, design, and tasks consistent.
- After approval, use `openspec-apply-change`, implement one bounded task at a time, validate it, and keep `tasks.md` checkboxes current.
- Use `openspec-verify-change` before archiving and resolve critical findings.
- Use `openspec-archive-change` to sync specifications when appropriate and archive the completed change.

The equivalent Copilot IDE commands are `/opsx-propose`, `/opsx-update`,
`/opsx-apply`, `/opsx-verify`, and `/opsx-archive`.

## Generated OpenSpec integration

- Treat `.github/skills/openspec-*` and `.github/prompts/opsx-*` as generated files. Refresh them with `openspec update` after selecting the full custom workflow set with `openspec config profile`.
- Keep OpenSpec's generated GitHub-hosted coding-agent setup disabled. Do not add `.github/workflows/copilot-setup-steps.yml` or `.github/agents/openspec.agent.md` through OpenSpec unless the repository owners explicitly change this policy.
- Preserve the workshop's separately reviewed custom agents, workflows, exercises, and cloud-agent learning content.
