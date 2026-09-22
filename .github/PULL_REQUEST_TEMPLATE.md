## Change contract

- Parent issue:
- OpenSpec change: `openspec/changes/<change-name>/`
- Specification PR: #<!-- merged PR that approved the OpenSpec change; omit for the specification PR itself -->
- Change type: <!-- specification / implementation / security / configuration -->
- Owned paths:

## Intent and scenarios

Describe the approved intent and list the requirement scenarios addressed. A specification PR should make proposal, specs, design, and tasks reviewable before implementation begins.

## Validation evidence

| Evidence | Command or check | Result/link |
|---|---|---|
| OpenSpec | `openspec validate --all` | |
| Lint/typecheck | `npm run lint` / `npm run typecheck` | |
| Tests/build | `npm test` / `npm run build` | |
| Security | CodeQL / dependency review / other scanner | |
| Infrastructure | Bicep validation and Azure what-if | |
| Deployment | environment, URL, run/deployment ID, health and API smoke | |

## Risk and recovery

- Security/privacy impact:
- Deployment/configuration impact:
- Rollback or recovery checkpoint:
- Known feature/license/preview limitations:

## Review checklist

- [ ] The implementation does not redefine approved OpenSpec intent.
- [ ] Changed scenarios have deterministic tests or checks.
- [ ] No secret values or sensitive vulnerability details are present.
- [ ] Workflows use least privilege and Azure authentication uses OIDC.
- [ ] Generated files were produced by their owning tool.
- [ ] A human reviewer can reconstruct the issue-to-evidence story.
