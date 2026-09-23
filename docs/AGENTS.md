# Documentation agent guide

This file adds local guidance for `docs/`.

- Treat `docs/README.md` as the documentation index.
- Keep participant instructions task-oriented and independently runnable.
- Use Windows-compatible PowerShell examples for required workshop commands.
- Separate participant steps, expected evidence, recovery, and stretch work.
- Use the lab template in `docs/labs/AGENTS.md` for every participant lab.
- Keep feature briefs comparable in scope and explicit about owned paths,
  dependencies, and completion evidence.
- Keep instructor-only credentials, identifiers, and setup steps out of
  participant labs; link to `docs/instructor/` instead.
- Link to root `DESIGN.md` for architecture instead of copying it.
- Link to active OpenSpec artifacts for change-specific requirements.
- Verify relative links and command names when documentation changes.
- Centralize optional external reading in `docs/resources.md`. Repeat an
  external link in a participant lab only when it is needed to execute the lab
  or correctly interpret product status or versioning.
- Repository instructions, active OpenSpec requirements, and checked-in pinned
  inputs take precedence over rolling external documentation and community
  guidance.
- Do not claim a workflow is active merely because the approved design plans it.
  The reserved workflow names are `openspec.yml`, `ci.yml`,
  `spec-pr-policy.yml`, `codeql.yml`, `dependency-review.yml`,
  `infra-validate.yml`, and `deploy.yml`.
