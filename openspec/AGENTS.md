# OpenSpec agent guide

This directory is the source of truth for capability requirements and proposed changes.

- Use the `spec-driven` schema configured in `config.yaml`.
- Keep requirements observable and designs technical.
- Do not put implementation details into capability requirements unless the mechanism is part of the product contract.
- A change is not ready for implementation until proposal, specs, design, and tasks are reviewable.
- Reference root `DESIGN.md` rather than duplicating durable architecture.
- Update root design documentation when a change introduces a lasting boundary or invariant.
- Keep `tasks.md` synchronized during implementation.
- Run `openspec validate --all` after editing OpenSpec artifacts.
- Archive only after the pull request has verified implementation and deployment evidence.

