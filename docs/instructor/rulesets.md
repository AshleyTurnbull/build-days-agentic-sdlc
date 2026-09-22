# Rulesets and environment protection

## Outcome

Require human review and real validation evidence without blocking the
specification pull request before application workflows exist.

## Branch protection model

Protect the default branch with:

- pull requests required;
- at least one approving review;
- dismissal or re-review after material changes, where supported;
- conversation resolution;
- no force pushes or branch deletion;
- no participant bypass.

Require status checks only after the workflow files are implemented and a
successful run has established their actual check names. The planned files are:

- `openspec.yml`;
- `ci.yml`;
- `spec-pr-policy.yml`;
- `codeql.yml`;
- `dependency-review.yml`;
- `infra-validate.yml`;
- `deploy.yml`.

Workflow file names and check names are not necessarily identical. Never enter
guessed check names into a ruleset.

## Specification and implementation flow

The specification pull request must be able to merge the approved OpenSpec and
harness artifacts before implementation begins. Configure policy so it checks
the applicable contract rather than requiring application checks that cannot
run on a documentation-only starting state.

Implementation pull requests should require the checks relevant to their
changed paths. Security and infrastructure controls can be availability- or
path-dependent, but any fallback must be documented.

## Deployment environment

Create the environment expected by the implemented deployment workflow. Apply:

- required human reviewer;
- no self-review where supported;
- deployment branch/tag restrictions;
- environment-scoped variables;
- environment-scoped OIDC subject.

Do not store an Azure client secret in the environment.

## Verification

Use the GitHub UI to inspect effective rules and bypass actors. CLI/API reads
can supplement the review:

```powershell
$repo = "$($env:GH_ORG)/$($env:WORKSHOP_PREFIX)-team01"
gh api "repos/$repo/rulesets"
gh api "repos/$repo/environments"
```

Test with a disposable pull request:

1. confirm direct push is blocked;
2. confirm approval is required;
3. confirm real check failures block merge;
4. confirm environment approval gates deployment;
5. confirm participants cannot bypass.

## Recovery

If a guessed or stale required check blocks every pull request, remove only that
check requirement, run the implemented workflow once, capture its real check
name, and restore the rule. Do not disable the entire ruleset as a shortcut.
