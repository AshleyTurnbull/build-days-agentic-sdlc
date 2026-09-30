# Instructor operations

Complete setup in this order:

1. [`provisioning.md`](provisioning.md) - confirm organization, Azure, licensing,
   quota, and naming decisions.
2. [`team-repositories.md`](team-repositories.md) - create one isolated
   repository per table of two or three participants from the template.
3. [`azure-oidc.md`](azure-oidc.md) - create workload identities and federated
   credentials.
4. [`rulesets.md`](rulesets.md) - configure protected branches, environments,
   and required checks.
5. [`readiness.md`](readiness.md) - run the full pre-event matrix.
6. [`recovery.md`](recovery.md) - publish and verify recovery checkpoints.
7. [`cleanup.md`](cleanup.md) - remove temporary access and Azure resources
   after evidence retention requirements are met.

Use the repository scripts as the executable path:

```powershell
.\scripts\prepare-team-repo.ps1 -Help
.\scripts\verify-env.ps1
.\scripts\seed-security-exercise.ps1 -Help
.\scripts\publish-checkpoint.ps1 -Help
```

Use [`../workshop-model.md`](../workshop-model.md) for the participant topology
and [`../platform/evidence-contract.md`](../platform/evidence-contract.md) for
the completion standard.

## Operating rule

Never advertise a control as available until it has been tested in a team
repository. Repository visibility, organization policy, licensing, preview
access, Azure quota, and regional capacity can change the supported path.
Record a fallback before the event and describe it accurately.
