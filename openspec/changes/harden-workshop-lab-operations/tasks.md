# Tasks

## 1. Executable environment preflight

- [x] 1.1 Implement canonical PowerShell and equivalent Bash preflight scripts
  with version, authentication, repository, GitHub feature, environment,
  variable, Azure scope, and OIDC/infrastructure checks.
- [x] 1.2 Emit structured `PASS`, `FAIL`, `ADVISORY`, and `MANUAL` results and a
  non-zero exit code for blocking failures; keep Copilot App as an explicit
  manual check.
- [x] 1.3 Add fixture-driven tests for success, missing tools, failed auth,
  incorrect repository revision, missing configuration, and not-yet-run cloud
  validation.
- [x] 1.4 Validate with focused PowerShell and Bash tests and record sample
  machine-readable output.

## 2. Idempotent team-repository preparation

- [x] 2.1 Implement an instructor-run preparation script with explicit
  organization, repository, template revision, feature brief, Azure scope, and
  confirmation inputs.
- [x] 2.2 Converge required environments, non-secret variables, labels, seeded
  issues, supported settings, and manual-step reporting without creating
  duplicates on rerun.
- [x] 2.3 Retrieve and verify numeric repository and owner identities, exact
  environment scope, and approved immutable OIDC subject/claim configuration;
  reject name-only, wildcard, or client-secret fallback.
- [ ] 2.4 Add dry-run/idempotency tests and prove two consecutive runs preserve
  the same desired state in a disposable repository.

## 3. OpenSpec-canonical Lab 1

- [x] 3.1 Add a comparison-only Spec Kit-to-OpenSpec concept map without adding
  Spec Kit files, installation, branches, or a parallel implementation path.
- [x] 3.2 Add a compact completed OpenSpec example that does not implement any
  participant feature.
- [x] 3.3 Add scoped AVM Copilot instructions covering pinned modules,
  documented gaps, OIDC, and least privilege.
- [x] 3.4 Update Lab 1 to connect the selected feature brief, issue, OpenSpec
  artifacts, root design, co-located instructions, and AVM review; validate all
  documented commands and links.

## 4. Concrete GitHub Copilot App orchestration

- [x] 4.1 Seed the reusable parent/task issue structure while leaving feature
  decomposition and assignment to participants.
- [x] 4.2 Document and test bounded Copilot App session flows with reviewed
  mode selection, non-overlapping path ownership, and explicit dependencies.
- [x] 4.3 Define monitoring, scope redirection, dependency-order integration,
  and issue receipts for branch, commit, focused test, and pull request.
- [ ] 4.4 Dry-run Lab 2 with at least two bounded tasks and verify GitHub
  evidence is sufficient without agent transcript access.

## 5. Pull-request-linked deployment evidence

- [x] 5.1 Add and validate a pull-request input to deployment without weakening
  existing protected-environment, OIDC, AVM, or smoke-test gates.
- [x] 5.2 Produce a compact machine-readable artifact containing commit,
  pull-request, check/security, Azure run/deployment, environment, URL, and
  health/readiness/API smoke-test evidence.
- [x] 5.3 Publish or update one marker-addressed concise pull-request comment
  only after successful deployment; grant `pull-requests: write` only to the
  publishing job.
- [ ] 5.4 Test evidence schema, rejected pull-request inputs, failure
  suppression, rerun comment updates, and workflow permissions.

## 6. Seeded cloud-agent exercise

- [x] 6.1 Select a small feature-independent baseline gap and add a focused test
  proving its initial observable behavior.
- [x] 6.2 Seed an issue with acceptance criteria, OpenSpec/scenario links,
  owned/prohibited paths, focused validation, and a mandatory human-requested
  revision.
- [ ] 6.3 Dry-run assignment, agent pull request, requested revision, updated
  checks, human approval, and merge in a disposable team repository.

## 7. Deterministic non-production CodeQL exercise

- [x] 7.1 Add an isolated synthetic fixture that deterministically triggers an
  identified configured CodeQL query and cannot enter application build or
  deployment inputs.
- [x] 7.2 Extend instructor preparation to create the dedicated branch, draft
  pull request, and sanitized issue using instructor credentials.
- [ ] 7.3 Add the small testable remediation and validation proving the alert
  exists before the fix and is absent afterward.
- [x] 7.4 Verify the vulnerable state is never present on the template default
  branch and contains no credential, live secret, or production exploit.

## 8. Participant-authored security-and-delivery GH-AW

- [x] 8.1 Refactor the Lab 5 starter to read the seeded issue/pull request,
  CodeQL result, OpenSpec link, and deployment evidence while leaving the
  evaluation logic participant-authored.
- [x] 8.2 Require exactly one narrow safe output and enforce that the workflow
  cannot approve, merge, deploy, or modify protected workflows.
- [x] 8.3 Add a second small working GH-AW reference with a distinct safe
  trigger/tool/output pattern that does not reveal the Lab 5 solution.
- [ ] 8.4 Compile and validate source/lock reproducibility for both references
  and the participant end state; dry-run finding, fix, merge, deployment
  evidence, and final workflow output.

## 9. Private/protected recovery checkpoints

- [ ] 9.1 Create reviewed states in a participant-inaccessible private
  instructor repository for `lab1-start` through
  `lab5-start` without exposing completed solutions on the public template
  default branch.
- [x] 9.2 Implement checkpoint publication that creates a new recovery branch,
  publishes only the selected checkpoint, labels instructor evidence, and
  never deletes or rewrites participant work.
- [ ] 9.3 Test every checkpoint by starting from it and completing the next lab.

## 10. Documentation and timed readiness rehearsal

- [x] 10.1 Align the README, workshop model, Labs 1-5, wrap, instructor
  readiness, team repository, OIDC, recovery, provisioning, and evidence
  guidance with the executable path.
- [x] 10.2 Validate Markdown links, documented commands, issue/workflow YAML,
  GH-AW compilation, and absence of secrets or attendee-specific identifiers.
- [x] 10.3 Run repository validation with `openspec validate --all`,
  `npm run check`, `az bicep build --file .\infra\main.bicep`, and
  `git --no-pager diff --check`.
- [ ] 10.4 Perform a timed dry run in a fresh repository covering preflight,
  preparation, all labs, cloud-agent revision, CodeQL remediation, deployment,
  both GH-AW patterns, checkpoint recovery, and wrap evidence.
- [ ] 10.5 Record go/no-go evidence, including App Service quota, immutable
  OIDC, Azure `what-if`, live deployment and smoke tests, elapsed time,
  blockers, and explicitly labeled platform fallbacks.

## 11. App-native prompts and optional capstone

- [x] 11.1 Add a GitHub Copilot App prompting guide covering Chat, Plan,
  Interactive, Fleet, Autopilot, isolated sessions, review, checks, and
  pull-request evidence.
- [x] 11.2 Rewrite Labs 1-5 and the workshop wrap as prompt-card journeys with
  `Use`, `Attach`, `Prompt`, `Expect`, and `Decide`, and remove participant
  terminal command blocks.
- [x] 11.3 Rebuild Lab 2 around reviewed X/Y/Z ownership, Plan mode, Fleet for
  independent work, scope redirection, a separate Autopilot goal, and App-native
  integration.
- [x] 11.4 Add the `workshop-capstone` capability, repository boundary, four
  comparable briefs, and an optional App-led net-new application lab.
- [x] 11.5 Align workshop navigation, AI-DLC positioning, and instructor
  readiness while keeping operational scripts instructor-only.
- [x] 11.6 Add structural documentation tests and validate OpenSpec, links,
  prompt references, application checks, and diff hygiene.
