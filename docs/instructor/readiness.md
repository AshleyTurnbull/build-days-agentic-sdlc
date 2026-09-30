# Workshop readiness

Run the full matrix at least one week before the event and again within 24
hours. Use a prepared team repository, not the template. A green local tool
check alone is not event readiness.

## Participant and instructor preflight

The PowerShell script is canonical. Bash emits the same result schema:

```powershell
.\scripts\verify-env.ps1 `
  -Repository "contoso-workshop/workshop-team01" `
  -ExpectedRevision "<approved-template-commit>" `
  -AzureSubscriptionId "<subscription-id>" `
  -AzureResourceGroup "workshop-team01-rg" `
  -JsonOutput ".\preflight-team01.json"
```

```bash
./scripts/verify-env.sh \
  --repository contoso-workshop/workshop-team01 \
  --expected-revision '<approved-template-commit>' \
  --azure-subscription-id '<subscription-id>' \
  --azure-resource-group workshop-team01-rg \
  --json-output ./preflight-team01.json
```

The scripts verify:

- Git, Node.js 20.19+, npm, GitHub CLI, Azure CLI, OpenSpec, and Copilot CLI;
- GitHub and Azure CLI authentication;
- the exact repository and approved template revision;
- Issues, Actions, `workshop-validation` and `workshop` environments;
- required non-secret Actions variables in each exact environment;
- access to the assigned subscription and resource group; and
- a successful `infra-validate.yml` run for the current revision, proving the
  observable OIDC login, Bicep validation, and Azure `what-if` path.

Results are `PASS`, `FAIL`, `ADVISORY`, or `MANUAL`. A required failure exits
non-zero. `NOT_YET_RUN` cloud validation is red by default; instructors may use
`-RequireCloudValidation:$false` or
`--allow-pending-cloud-validation` only during early preparation. It remains
an advisory, never a pass.

Copilot App is always `MANUAL`: shell detection cannot prove installation,
sign-in, repository access, or current availability. Open the app, sign in,
open the team repository, and record that evidence separately.

The JSON output contains only check names and observed configuration; it does
not print tokens or variable values. Do not commit event-specific output.

## Readiness matrix

| Area | Verification | Evidence |
|---|---|---|
| Template | Expected revision and documentation links | Commit SHA |
| Team repo | One repository per table of two or three | Repository URL and preparation report |
| OpenSpec | `openspec validate --all` | Command output |
| Application | Install, focused tests, build, local smoke | Command output |
| Rules | Direct push blocked and review required | Test PR |
| CI | Implemented checks execute real commands | Run URL |
| Security | CodeQL/dependency review or recorded fallback | Run/setting URL |
| OIDC | Numeric owner/repository claims and exact environment; no secret | Preparation report and sign-in evidence |
| Infrastructure | Bicep validation and `what-if` | Successful `infra-validate.yml` run |
| Deployment | Protected deployment completes | Deployment URL |
| Runtime | Health, readiness, feedback, and voting pass | Job summary |
| Copilot App | Manual sign-in and repository-open check | Instructor roster |
| App sessions | Chat plus isolated local/worktree session creation | Instructor roster and test sessions |
| App modes | Interactive, Plan, and Autopilot available | Test session evidence |
| Fleet | Parallel task command available and completes bounded test work | Test session evidence |
| Cloud agent | Issue assignment, revision, and PR creation work | Test issue/PR |
| GH-AW | Source/lock valid and safe output produced | Run URL |
| Recovery | Every published checkpoint resolves | Branch list |
| Cleanup | Owner, date, and commands reviewed | Runbook sign-off |

## Go/no-go

Do not advertise a preferred path when:

- any preflight `FAIL` remains;
- Azure quota or App Service capacity is unverified;
- immutable OIDC claims or a successful team-repository login/`what-if` cannot
  be proven;
- required checks cannot run under organization policy;
- Copilot App, cloud-agent, or GH-AW access is assumed rather than tested;
- the App cannot create isolated sessions or use Plan, Fleet, and Autopilot for
  the tested repository;
- recovery checkpoints are missing; or
- cleanup ownership is undefined.

Record unsupported licensed controls and fallbacks accurately. A manual or
fallback result is not equivalent to platform enforcement.

## Optional capstone readiness

Rehearse the optional capstone separately from the four-hour agenda. Confirm:

- the `capstone/` boundary and one selected brief are understandable to a fresh
  App session;
- Plan mode produces a non-overlapping issue graph;
- Fleet can run two independent capstone tasks;
- Autopilot can complete one bounded capstone goal without touching the
  feedback application;
- capstone-scoped CI, AVM/OIDC deployment, bug-fix, and GH-AW paths produce
  durable evidence; and
- the full path fits the advertised 90-120 minute extension or has a clearly
  labeled partial-completion outcome.
