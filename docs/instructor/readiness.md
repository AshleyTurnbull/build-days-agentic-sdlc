# Workshop readiness

## Timing

Run the full matrix at least one week before the event and again within 24
hours. Test a normal team repository, not only the template.

## Workstation and repository

```powershell
node --version
npm --version
git --version
gh --version
az version
az bicep version
openspec --version
gh auth status
az account show
```

Confirm Node.js is 20.19 or later. Confirm the GH-AW CLI separately with
`gh aw --help` only if GH-AW is part of the supported event path.

## Readiness matrix

| Area | Verification | Evidence |
|---|---|---|
| Template | Expected revision and documentation links | Commit SHA |
| Team repo | Members and variables are isolated | Repository URL |
| OpenSpec | `openspec validate --all` | Command output |
| Application | Install, focused tests, build, local smoke | Command output |
| Rules | Direct push blocked and review required | Test PR |
| CI | Implemented checks execute real commands | Run URL |
| Security | CodeQL/dependency review or recorded fallback | Run/setting URL |
| OIDC | Token issued only for intended repo/environment | Run and sign-in evidence |
| Infrastructure | Bicep validation and `what-if` | Run URL |
| Deployment | Protected deployment completes | Deployment URL |
| Runtime | Health, readiness, feedback, and voting pass | Job summary |
| Cloud agent | Issue assignment and PR creation work | Test issue/PR |
| GH-AW | Source/lock valid and safe output produced | Run URL |
| Recovery | Every published checkpoint resolves | Tag/branch list |
| Cleanup | Owner, date, and commands reviewed | Runbook sign-off |

## Workflow accuracy

Only expect these planned workflow files when implementation has added them:
`openspec.yml`, `ci.yml`, `spec-pr-policy.yml`, `codeql.yml`,
`dependency-review.yml`, `infra-validate.yml`, and `deploy.yml`.

For each existing file:

- trigger it on a disposable change;
- confirm its jobs run the claimed validation;
- confirm failure output is actionable;
- confirm permissions are least privilege;
- capture the actual required-check name.

## Go/no-go

Do not advertise a preferred path when:

- Azure quota or App Service capacity is unverified;
- OIDC has not succeeded from a team repository;
- required checks cannot run under organization policy;
- cloud-agent or GH-AW access is assumed rather than tested;
- recovery checkpoints are missing;
- cleanup ownership is undefined.

Record the supported fallback and explain its evidence limitations before
participants arrive.
