# build-days-agentic-sdlc

## OpenSpec and GitHub Copilot

This repository is configured to use [OpenSpec](https://openspec.dev/) from GitHub Copilot project sessions. OpenSpec keeps proposals, requirements, designs, implementation tasks, and archived decisions in the repository so changes can be reviewed before code is written.

The GitHub Copilot integration includes the full workflow set, including proposal, apply, update, verify, sync, and archive workflows. The GitHub-hosted Copilot coding agent is intentionally disabled.

### Prerequisites

- Node.js 20.19.0 or newer
- The OpenSpec CLI

Check the installed versions:

```powershell
node --version
openspec --version
```

If OpenSpec is not installed, install it globally with a package manager already available on your `PATH`. npm is the default choice:

```powershell
npm install -g @fission-ai/openspec@latest
```

Global installation is machine-level. Review the command before running it, and do not use elevation or edit shell profiles automatically if installation or `PATH` configuration fails.

### Use OpenSpec in the GitHub Copilot app

Open or create a project session for this repository. The GitHub Copilot app may not show the generated IDE slash commands, so explicit natural-language skill invocation is the reliable option.

#### Propose a change

```text
Use the openspec-propose skill to propose <change>.
Create the proposal, requirements, design, and implementation tasks.
Do not implement anything until I approve the proposal.
```

Review the generated artifacts under:

```text
openspec/changes/<change-name>/
```

#### Apply an approved change

```text
The proposal for <change-name> is approved.
Use the openspec-apply-change skill to implement the active OpenSpec change.
Work through tasks.md, validate each task, and update its checkboxes.
```

#### Verify the implementation

```text
Use the openspec-verify-change skill to verify that <change-name>
matches its proposal, requirements, design, and tasks.
Resolve critical findings before archiving.
```

#### Archive the completed change

```text
Use the openspec-archive-change skill to finish <change-name>.
Sync its delta specifications when appropriate and archive the change.
```

Start a new or restarted project session if newly generated skills are not discovered immediately.

### Copilot IDE commands

GitHub Copilot extensions in VS Code, JetBrains IDEs, and Visual Studio can load the generated prompt files as commands:

| Workflow | IDE command | Project-session skill |
| --- | --- | --- |
| Propose | `/opsx-propose` | `openspec-propose` |
| Update | `/opsx-update` | `openspec-update-change` |
| Apply | `/opsx-apply` | `openspec-apply-change` |
| Verify | `/opsx-verify` | `openspec-verify-change` |
| Archive | `/opsx-archive` | `openspec-archive-change` |

If a command is not recognized in the GitHub Copilot app, use the project-session skill prompt instead.

### Generated repository files

OpenSpec manages these paths:

```text
openspec/
.github/skills/openspec-*/SKILL.md
.github/prompts/opsx-*.prompt.md
```

Do not hand-edit generated skills or prompts. Put repository-specific Copilot behavior in `.github/copilot-instructions.md`.

The cloud coding agent opt-out is recorded in `openspec/config.yaml`:

```yaml
githubCopilot:
  cloudAgent: false
```

This setup must not contain:

```text
.github/workflows/copilot-setup-steps.yml
.github/agents/openspec.agent.md
```

### Update OpenSpec

After upgrading the CLI, refresh the generated repository files:

1. Run `openspec config profile`.
2. Select delivery to both skills and commands.
3. Select the full workflow set, including `verify`.
4. Run:

   ```powershell
   openspec update
   ```

The workflow profile is stored in the user's OpenSpec configuration and can affect generated files in other repositories on the same machine.

### References

- [OpenSpec installation](https://openspec.dev/docs/installation)
- [Supported tools and GitHub Copilot paths](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
- [OpenSpec getting started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
