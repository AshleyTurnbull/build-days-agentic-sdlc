# Design

## Context

Root `DESIGN.md` defines the repository as both a deployable sample and a
four-hour teaching harness. The existing `build-deployable-workshop` change
created the application and initial delivery path. This change controls the
remaining operational hardening identified by the approved workshop readiness
plan.

The central problem is not missing narrative. It is the absence of executable,
repeatable proof that external identities, repository settings, seeded work,
security findings, deployment evidence, and recovery states are correct in a
fresh team repository. The design therefore favors scripts and platform
evidence over instructor memory or agent claims.

## Goals / Non-Goals

**Goals:**

- Make check-in and repository preparation fail fast with actionable output.
- Make instructor preparation safe to rerun without duplicating or weakening
  configuration.
- Bind Azure federation to immutable GitHub repository identity and the
  intended environment.
- Preserve OpenSpec as the canonical participant SDD path.
- Give Lab 2 a concrete App/CLI orchestration path with durable GitHub receipts.
- Link successful deployment evidence to the pull request that requested it.
- Make cloud-agent and security exercises deterministic and independent of
  participant feature selection.
- Constrain GH-AW examples and participant outputs to narrow, reviewable
  authority.
- Recover teams without exposing later solutions or destroying their work.
- Gate event readiness on a timed rehearsal from a newly created repository.

**Non-Goals:**

- Redesign the feedback application or Azure topology.
- Add Spec Kit files, installation, or an alternate implementation path.
- Automate organization-policy decisions that require an authorized human.
- Create long-lived Azure credentials or use attendee identities as federation
  anchors.
- Make licensing-dependent controls optional while still claiming the preferred
  path passed.

## Decisions

### Use explicit preflight result classes

The canonical PowerShell preflight and Bash equivalent report each check as
`PASS`, `FAIL`, `ADVISORY`, or `MANUAL`. Blocking failures produce a non-zero
exit code. Advisory and manual results cannot be rendered as green.

The checks cover required tool versions, GitHub and Azure authentication,
repository identity and expected template revision, Issues and Actions,
required environments and variables, resource-group access, and observable
OIDC/infrastructure validation. Copilot App installation remains a manual check
because a shell probe cannot prove it reliably.

Structured output is retained so tests and instructor evidence can distinguish
a passed check from a skipped or not-yet-run check.

**Alternative considered:** A documentation checklist. Rejected because it is
not deterministic, cannot fail check-in, and cannot be regression tested.

### Prepare repositories from an instructor workstation

An authenticated instructor script accepts explicit organization, repository,
approved template revision, feature brief, Azure scope, and confirmation
inputs. It converges environments, non-secret variables, labels, issues, and
supported settings to the desired state. Existing matching resources are
verified or updated; reruns do not create duplicate issues, labels, branches,
or pull requests.

The script prints unresolved organization-policy or UI-only actions as manual
requirements and exits unsuccessfully when a blocking invariant cannot be
proven. It never creates a client secret.

An instructor-run script is preferred to a setup workflow because GitHub events
created with the default workflow token do not reliably trigger the downstream
branch and pull-request workflows needed for the CodeQL exercise.

### Constrain OIDC with immutable repository identity

Federated trust is derived from the numeric GitHub repository ID and repository
owner ID, plus the exact protected environment expected by the workflow. The
preparation path retrieves and records these identifiers, verifies the
configured subject/claims, and rejects name-only or wildcard trust.

If the organization cannot support the approved immutable-claim subject
configuration, preparation records a blocking readiness failure rather than
silently substituting a broader credential. Environment-scoped variables are
configured by script; secrets are not introduced.

### Keep OpenSpec canonical and Spec Kit comparative

Lab 1 maps the selected feature brief to its GitHub issue, OpenSpec proposal,
capability scenarios, change design, tasks, root `DESIGN.md`, and applicable
`AGENTS.md`. A compact completed example may demonstrate structure but may not
implement any participant feature.

Spec Kit is represented only by a comparison artifact mapping equivalent
concepts and explaining trade-offs. No `.specify/` directory, Spec Kit branch,
installation, or parallel lab path is added.

### Make App and CLI orchestration observable

Lab 2 translates approved `tasks.md` items into a seeded parent/task issue
structure. Participants open bounded Copilot App sessions and Copilot CLI agent
tasks with non-overlapping owned paths and explicit dependencies. They monitor,
redirect, and integrate work in dependency order.

Every completed task records its issue, owner, branch, commit, focused
validation, and pull request. These receipts are evidence of orchestration; the
agent transcript is not.

### Publish deployment evidence from a separate narrow job

Deployment accepts a validated pull-request number. After infrastructure,
application deployment, health, readiness, API smoke tests, and required
checks succeed, a dedicated evidence job creates a compact machine-readable
artifact containing commit SHA, pull-request number, check/security status,
Azure deployment/run identifier, environment, application URL, and smoke-test
results.

Only this publication job receives `pull-requests: write`. It creates or updates
one marker-addressed concise PR comment, avoiding repeated comments on reruns.
It cannot manufacture success if an upstream deployment or smoke test failed.

### Seed one universal cloud-agent revision exercise

Repository preparation creates or verifies one feature-independent issue whose
baseline absence is covered by a focused test. The issue links applicable
OpenSpec scenarios, names owned and prohibited paths, provides observable
acceptance criteria, and requires a human reviewer to request one bounded
revision before merge.

The exact issue content is selected from the verified baseline during
implementation and remains small enough to complete independently of the
team's selected feature.

### Isolate the CodeQL exercise from deployable code

Instructor credentials create a dedicated non-production branch and draft pull
request containing a synthetic, non-secret fixture that deterministically
matches the repository's configured CodeQL query suite. The fixture is excluded
from application build and deployment inputs. A sanitized issue links the
finding, remediation acceptance criteria, OpenSpec scenario, focused test, and
draft pull request.

Participants remediate the finding on that pull request, confirm the expected
CodeQL alert disappears, merge the safe state, and capture final evidence. The
vulnerable fixture never exists on the template default branch and no live
credential or production exploit is used.

### Separate reference GH-AW from participant authorship

The participant starter becomes a security-and-delivery review workflow that
reads the seeded issue/pull request, CodeQL result, linked OpenSpec scenario,
and deployment evidence. Participants author its evaluation and declare exactly
one narrow safe output. It cannot approve, merge, edit protected workflows,
trigger deployment, or obtain write permissions unrelated to that output.

The existing safe reference remains available, and a second small working
reference demonstrates a different trigger/tool/output pattern, such as
explaining a failed test. Neither reference contains the Lab 5 solution.
Markdown source and generated lock files remain reproducible together.

### Publish recovery checkpoints without rewriting participant history

Reviewed states for `lab1-start` through `lab5-start` live in a private
instructor repository inaccessible to normal participants. Protected refs may
preserve integrity inside that private repository, but do not provide
confidentiality. A publication script copies one selected state into a new,
clearly named recovery branch in one team repository. It never force-pushes,
deletes branches, resets the participant default branch, or publishes later
checkpoints.

Instructor-origin evidence is labeled separately from participant evidence.
Each checkpoint is tested by beginning at that state and completing the next
lab.

### Gate readiness with a timed fresh-repository rehearsal

A disposable repository is created from the approved template revision and
prepared using the same instructor script. The rehearsal executes preflight,
all five labs, recovery paths, wrap evidence, OIDC validation, Azure `what-if`,
deployment, smoke tests, cloud-agent revision, deterministic CodeQL
remediation, and both GH-AW paths.

The run records elapsed time, blockers, fallbacks, and links to platform
evidence. Event readiness remains blocked by failed required controls, missing
App Service quota, or inability to complete/recover within the agenda.

## Permissions and Data Boundaries

- Preparation uses an instructor identity with only the repository and
  organization administration permissions needed for the target team
  repository.
- Active workflows default to read-only permissions.
- Deployment retains OIDC `id-token: write`; only the evidence-publishing job
  gains `pull-requests: write`.
- GH-AW workflows declare one narrow safe output and cannot self-approve,
  merge, deploy, or alter protected workflow definitions.
- Seeded content contains no credentials, attendee-specific identifiers, or
  private instructor solutions.
- Instructor solution refs remain outside participant read access until one
  selected checkpoint is published.

## Validation and Observability

- Fixture-driven tests cover preflight result classification and representative
  failures on PowerShell and Bash.
- Preparation has dry-run or equivalent inspection, rerun tests, and explicit
  verification of environments, variables, labels, issues, immutable identity,
  and seeded branch/PR state.
- Workflow validation proves permissions, pull-request input validation,
  evidence schema, single-comment update behavior, and GH-AW lock freshness.
- CodeQL is demonstrated failing on the seeded draft pull request and passing
  after remediation.
- Checkpoint tests prove the next lab can start without revealing later answers.
- The rehearsal report links GitHub checks, security results, Azure operations,
  deployment, smoke tests, and final evidence rather than relying on narrative.

## Risks / Trade-offs

- GitHub feature availability varies by organization, repository visibility,
  and license. Readiness records unsupported controls explicitly and does not
  claim equivalence.
- Immutable OIDC subject customization may require organization-level support.
  The secure failure mode can block a team repository until an administrator
  completes the approved configuration.
- Deterministic CodeQL behavior can drift when query packs change. The fixture
  and expected query identity must be pinned or validated before every event.
- Instructor scripts require meaningful privileges. Explicit targets,
  confirmation, dry-run output, idempotency, and postcondition checks reduce
  accidental cross-repository changes.
- Private checkpoints increase instructor maintenance. Testing only the five
  named boundaries keeps the recovery surface bounded.
- End-to-end rehearsal consumes cloud-agent, Actions, and Azure capacity. A
  disposable, isolated repository and resource group limit impact.

## Migration and Rollback

This change adds operational assets around the existing workshop. Team
repositories already created from the template can be converged by the
preparation script after their template revision is verified.

Rollback disables the new seeded exercises and evidence publication, removes
only resources carrying their deterministic markers, and leaves participant
branches, issues, pull requests, and Azure resources intact. Federated
credentials are not broadened during rollback. Recovery checkpoints remain
private and can be withdrawn without rewriting team history.

## Durable Architecture Impact

The change implements existing root design principles: executable constraints,
immutable OIDC trust, narrow workflow permissions, independent evidence, and
recovery paths. No new application or infrastructure boundary is introduced.
Implementation should update root `DESIGN.md` only if it discovers a durable
system-wide invariant not already represented there.
