# Proposal

## Why

The deployable workshop baseline provides the application, delivery workflows,
and participant narratives, but several event-critical operations remain
documented intentions rather than executable, repeatable controls. Instructors
cannot yet prove that a fresh team repository is correctly prepared, that every
participant can pass check-in, that recovery checkpoints are safe, or that the
five labs can complete within the scheduled session.

This change closes those readiness gaps without changing the participant-owned
feature work. It makes workshop preparation, orchestration, security practice,
deployment evidence, recovery, and final rehearsal observable and testable.

## What Changes

- Add executable Windows and Bash environment preflight behavior with explicit
  blocking, advisory, and manual results.
- Add idempotent instructor preparation for one pre-created repository per
  team, including immutable GitHub OIDC identity constraints, environments,
  variables, labels, and seeded work.
- Keep OpenSpec as the only hands-on SDD workflow in Lab 1 and present Spec Kit
  only as a short concept comparison.
- Make the GitHub Copilot App the canonical participant interface and add
  short, copy-ready prompt cards for Chat, Plan, Interactive, Fleet, Autopilot,
  review, and pull-request work.
- Define concrete GitHub Copilot App orchestration with isolated sessions,
  reviewed mode selection, bounded path ownership, dependency ordering,
  intervention, and GitHub execution receipts.
- Publish compact machine-readable deployment evidence linked to the deploying
  pull request without broadening deployment authority.
- Seed a universal, bounded cloud-agent issue that requires a human-requested
  revision before merge.
- Create a deterministic CodeQL exercise only on an instructor-seeded,
  non-production branch and draft pull request.
- Require participants to author a security-and-delivery GH-AW with one narrow
  safe output, while adding a second safe reference workflow that does not
  disclose the Lab 5 solution.
- Remove terminal-driven procedures from participant labs while retaining
  checked-in scripts and commands as instructor operations and agent-executed
  validation.
- Keep completed recovery states in a participant-inaccessible private
  instructor repository and publish only a
  requested checkpoint into a team repository without deleting participant
  work.
- Require a timed end-to-end dry run from a fresh repository before declaring
  the event ready.
- Add an optional 90-120 minute App-led capstone where teams create a net-new
  application under `capstone/<app-name>/` using OpenSpec, scoped harness
  guidance, parallel ticket-driven work, Actions CI/CD, AVM/OIDC deployment,
  a real bug-fix loop, GH-AW, and durable evidence.

## Capabilities

### New Capabilities

- `workshop-environment-preflight`: Executable, cross-platform check-in with
  actionable pass, fail, advisory, and manual-check results.
- `team-repository-preparation`: Safe, repeatable preparation of isolated team
  repositories and immutable OIDC trust.
- `workshop-lab-orchestration`: OpenSpec-canonical Lab 1 and concrete GitHub
  Copilot App orchestration for Lab 2.
- `pr-linked-deployment-evidence`: Successful deployments produce compact,
  pull-request-linked evidence.
- `cloud-agent-workshop-exercise`: Every team receives a bounded, observable
  cloud-agent issue-to-revision-to-merge exercise.
- `deterministic-security-exercise`: Lab 5 begins from an isolated,
  deterministic CodeQL finding and ends with verified remediation.
- `workshop-agentic-workflows`: Participants author a narrowly authorized
  security-and-delivery workflow and can inspect two safe references.
- `workshop-recovery-checkpoints`: Private or protected reviewed checkpoints
  can be safely published for recovery.
- `workshop-readiness-rehearsal`: A timed fresh-repository rehearsal gates event
  readiness.
- `workshop-capstone`: A bounded optional synthesis lab applies the complete
  governed delivery loop to a net-new application in the team repository.

### Modified Capabilities

None.

## Non-Goals

- Installing or adopting Spec Kit as a second workshop toolchain.
- Moving participant feature implementation, AVM extension work, security
  remediation, or GH-AW authorship into the starter baseline.
- Shipping a completed capstone application or prescribing one implementation
  as the answer.
- Storing Azure client secrets or weakening repository, environment, or branch
  protections to simplify setup.
- Allowing an agentic workflow to approve, merge, deploy, or modify protected
  workflow definitions.
- Publishing completed lab solutions on the public template default branch.
- Treating unavailable licensed or preview platform controls as equivalent to
  successful platform enforcement.

## Impact

- **Application:** No production application behavior is intentionally changed;
  the security fixture remains isolated from deployed code.
- **Tests and scripts:** Adds executable preflight, preparation, checkpoint, and
  fixture validation with safe rerun and representative failure coverage.
- **Infrastructure and identity:** Preserves pinned AVM composition, managed
  identity, and GitHub OIDC; preparation verifies exact immutable repository
  identity claims and environment scope.
- **GitHub workflows and security:** Adds narrowly permissioned evidence
  publication, seeded cloud-agent and CodeQL exercises, and two safe GH-AW
  references/patterns.
- **Documentation:** Aligns all labs, instructor runbooks, recovery guidance,
  App-native prompt cards, optional capstone, and platform evidence around the
  executable path.
- **Operations:** Requires a private instructor solution location, a disposable
  rehearsal repository, supported GitHub/Azure features, and approved App
  Service quota before event go-live.
