# GitHub Copilot instructions

## OpenSpec workflow

This repository uses OpenSpec for substantive feature and behavior changes.

- In GitHub Copilot app project sessions, prefer explicit natural-language skill invocation. The generated `.github/prompts/opsx-*.prompt.md` files provide slash commands in supported Copilot IDE extensions, but the app may not expose those commands through autocomplete.
- Start planning with the `openspec-propose` skill. Create the proposal, delta requirements, design, and implementation tasks under `openspec/changes/<change-name>/`.
- The propose workflow is planning-only. Do not edit implementation code until the user explicitly approves the proposal in a later message.
- If planning artifacts need revision, use the `openspec-update-change` skill and keep the proposal, specs, design, and tasks consistent.
- After approval, use the `openspec-apply-change` skill. Work through `tasks.md`, implement each task, validate the change, and mark completed tasks with `[x]`.
- Before archiving, use the `openspec-verify-change` skill to compare the implementation with the proposal, requirements, design, and tasks. Resolve critical findings before continuing.
- Finish with the `openspec-archive-change` skill. Sync delta specifications into `openspec/specs/` when appropriate and archive the completed change.

The equivalent Copilot IDE commands are `/opsx-propose`, `/opsx-update`, `/opsx-apply`, `/opsx-verify`, and `/opsx-archive`.

## Generated files

- Treat `.github/skills/openspec-*` and `.github/prompts/opsx-*` as OpenSpec-managed files. Do not edit them manually.
- After upgrading the OpenSpec CLI, select the repository's full custom workflow set with `openspec config profile`, then run `openspec update`.
- Keep the GitHub-hosted Copilot coding agent disabled. Do not add `.github/workflows/copilot-setup-steps.yml` or `.github/agents/openspec.agent.md` unless the repository owners explicitly change this policy.
