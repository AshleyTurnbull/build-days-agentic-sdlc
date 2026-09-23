# Recovery checkpoints

Recovery publishes one reviewed starting state to a new branch in one team
repository. It does not replace diagnosis, rewrite the default branch, or turn
instructor work into participant evidence.

## Safety model

- Store completed states in a private instructor solution repository that
  participants cannot read. Branch protection may preserve ref integrity, but
  it is not a confidentiality boundary.
- Never put solution commits, checkpoint refs, or a populated checkpoint
  manifest on the public template default branch.
- Publish only one selected checkpoint: `lab1-start` through `lab5-start`.
- Always create a new `recovery/...` target branch. Never delete, reset,
  overwrite, or force-push participant refs.
- Mark the publication and all derived evidence as `instructor-recovery`.
- Keep the original issue, branch, pull request, and failing run available for
  root-cause follow-up.

The public files in [`checkpoints/`](checkpoints/) are templates and operating
instructions only. They contain no completed lab state.

## Checkpoint boundaries

| Checkpoint | Provides | Must not include | Next-lab validation |
|---|---|---|---|
| `lab1-start` | Checked-in starter repository and assigned feature brief | Participant OpenSpec change | Complete Lab 1 and validate its OpenSpec artifacts |
| `lab2-start` | Reviewed Lab 1 specification and task boundary | Implemented participant feature | Complete bounded orchestration and focused tests |
| `lab3-start` | Integrated implementation ready for independent validation | Successful deployment evidence | Run CI, infrastructure validation, deployment, and smoke tests |
| `lab4-start` | Deployable state with required Lab 3 evidence | Completed cloud-agent exercise | Complete assignment, requested revision, checks, and merge |
| `lab5-start` | Cloud-agent exercise complete and security fixture ready | CodeQL remediation or participant GH-AW solution | Remediate the seeded finding and produce the required safe output |

Each state must be reviewed and validated by starting at that exact commit and
completing the next lab without using a later checkpoint. Record this in the
private manifest described by
[`checkpoint-manifest.template.json`](checkpoints/checkpoint-manifest.template.json).

## Prepare private checkpoints

1. Create or select a private instructor solution repository and remove every
   participant or participant team from its access list.
2. Create a full ref such as `refs/tags/checkpoint/lab3-start` for each reviewed
   boundary.
3. Pin the full 40-character commit SHA. Do not rely on a moving branch alone.
4. Run the next lab from that commit and capture durable validation evidence.
5. Copy the public manifest template to a private instructor location and
   replace every placeholder. Do not commit the populated manifest here.
6. Have a second instructor review the boundary for accidental later-lab
   solutions, credentials, attendee identifiers, and participant evidence.

## Publish a checkpoint

Prerequisites:

- PowerShell 7, Git, and GitHub CLI are installed;
- `gh auth status` succeeds for an instructor identity that can read the
  source and create branches in the target;
- the populated manifest is stored outside the participant repository; and
- the target branch name is new and clearly identifies the recovery.

First perform a dry run. All repositories, the checkpoint, the destination
branch, and the manifest are explicit inputs:

```powershell
.\scripts\publish-checkpoint.ps1 `
  -SourceRepository 'instructor-org/workshop-solutions' `
  -TargetRepository 'workshop-org/team-07' `
  -Checkpoint 'lab3-start' `
  -TargetBranch 'recovery/team-07-lab3-start-20260929' `
  -ManifestPath 'C:\instructor-private\checkpoint-manifest.json' `
  -ParticipantLogins @('participant-one', 'participant-two') `
  -EvidencePath '.\recovery-evidence\team-07-lab3-start-dry-run.json' `
  -DryRun
```

Review the JSON output, especially the pinned source commit, target repository,
new branch name, reviewer, and validation evidence. Publication requires a
separate confirmation switch:

```powershell
.\scripts\publish-checkpoint.ps1 `
  -SourceRepository 'instructor-org/workshop-solutions' `
  -TargetRepository 'workshop-org/team-07' `
  -Checkpoint 'lab3-start' `
  -TargetBranch 'recovery/team-07-lab3-start-20260929' `
  -ManifestPath 'C:\instructor-private\checkpoint-manifest.json' `
  -ParticipantLogins @('participant-one', 'participant-two') `
  -EvidencePath '.\recovery-evidence\team-07-lab3-start.json' `
  -ConfirmPublication
```

The script:

1. verifies the explicit source and target repositories;
2. verifies the source is private and every supplied participant login lacks
   repository access;
3. requires the source ref to resolve to the reviewed commit in the manifest;
4. stops if the target branch already exists;
5. creates a new root commit from only the selected checkpoint tree;
6. adds instructor origin and review attribution to the commit; and
7. pushes and verifies only the new target branch.

It does not check out, reset, merge, delete, or force-push any participant ref.
Its unique local scratch repository is removed after the run.

## Team handoff

The participant preserves current work and starts from the published branch:

```powershell
git fetch origin
git switch -c 'team/recovered-lab3' --track 'origin/recovery/team-07-lab3-start-20260929'
```

Do not reuse the instructor publication branch for participant commits. Link
the original failure and the recovery publication evidence in the team issue,
then record:

- original branch, commit, pull request, and failed run URL;
- published recovery branch and checkpoint source commit;
- evidence origin `instructor-recovery`;
- work completed by participants after recovery;
- next-lab validation results; and
- a follow-up issue for the unresolved root cause.

Use [`recovery-evidence.template.md`](checkpoints/recovery-evidence.template.md)
for consistent attribution.

## Time-boxed triage

| Symptom | First checks | Recovery boundary |
|---|---|---|
| OpenSpec invalid | Artifact paths, headings, scenarios, `openspec validate --all` | `lab1-start` or `lab2-start` |
| Agent overlap | Owned paths, task dependencies, integration order | `lab2-start` |
| CI install failure | Runtime, lock file, registry access | Repair environment before checkpointing |
| Required check missing | Workflow trigger and actual check name | `lab3-start` only after configuration repair |
| OIDC failure | Issuer, audience, immutable repository identity, environment | Never substitute a client secret |
| Bicep or quota failure | AVM version, parameters, region, quota | `lab3-start`; escalate platform blocker |
| App unhealthy | Startup logs, health route, package output | Last verified deployable state |
| Cloud agent unavailable | Organization access and assignment | `lab4-start`; label approved fallback |
| CodeQL or GH-AW unavailable | License, query result, extension/model access | `lab5-start`; label approved fallback |

## Event readiness

Before the event, publish every named checkpoint into a disposable team
repository, complete the next lab, and verify that no later answer is exposed.
A checkpoint is not approved merely because its branch can be created.
