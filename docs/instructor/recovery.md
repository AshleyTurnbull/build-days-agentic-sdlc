# Recovery and troubleshooting

## Recovery principles

- Preserve participant issues, pull requests, and failing run evidence.
- Diagnose the failing layer before restoring a checkpoint.
- Keep recovery to the current lab; do not reveal later solution work.
- Label instructor-provided evidence separately from team-produced evidence.
- Never bypass OIDC with a long-lived secret.

## Checkpoint preparation

Publish and verify:

```text
checkpoint/environment-ready
checkpoint/spec-ready
checkpoint/implementation-ready
checkpoint/deployment-ready
checkpoint/cloud-agent-ready
```

Create checkpoints from reviewed commits. A checkpoint provides the starting
state for the next lab and must not contain that lab's completed answer.
Instructor solution branches remain separate.

Verify before the event:

```powershell
git fetch --all --tags
git tag --list "checkpoint/*"
git branch --all --list "*checkpoint/*"
```

## Participant restore pattern

Prefer a new recovery branch so existing work remains inspectable:

```powershell
git fetch --all --tags
git switch -c "recovery/<team>-<lab>" "<verified-checkpoint-ref>"
```

The instructor supplies the exact verified ref. Do not tell participants to
force-reset or delete their work.

## Triage guide

| Symptom | First checks | Recovery |
|---|---|---|
| OpenSpec invalid | Artifact paths, headings, scenario format | Repair structure or use `spec-ready` |
| Agent overlap | Owned paths and dependency issue | Pause dependent branch and integrate contract first |
| CI install failure | Runtime version, lock file, registry access | Restore environment; do not regenerate dependencies casually |
| Required check missing | Workflow exists, trigger, actual check name | Fix ruleset after one real run |
| OIDC failure | Issuer, audience, subject, environment | Correct federation; never add secret |
| Bicep/AVM failure | Module version, parameters, region/quota | Use reviewed parameters or deployment checkpoint |
| App unhealthy | startup logs, health route, package output | Roll back to last healthy deployment |
| Readiness failure | managed identity, role assignment, Table endpoint | Repair data-plane access |
| Cloud agent unavailable | org access and assignment | Use fresh local session and label fallback |
| GH-AW unavailable | extension/model/org access | Manual evidence review, labeled fallback |

## Evidence after recovery

Record:

- original failure and run URL;
- checkpoint or workaround used;
- which artifacts remain team-produced;
- which final evidence belongs to the recovery state;
- follow-up issue for the unresolved root cause.
