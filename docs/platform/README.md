# Platform delivery guide

These documents explain the platform contracts used across the labs:

- [`github-delivery.md`](github-delivery.md) - specification and implementation
  pull requests, checks, rulesets, and agent boundaries.
- [`azure-deployment.md`](azure-deployment.md) - AVM, OIDC, App Service, Table
  Storage, deployment, and live verification.
- [`evidence-contract.md`](evidence-contract.md) - the minimum durable evidence
  from intent through GH-AW review.

Root [`DESIGN.md`](../../DESIGN.md) remains authoritative for durable
architecture. The active
[`build-deployable-workshop`](../../openspec/changes/build-deployable-workshop/)
change remains authoritative for the starter implementation. The
[`harden-workshop-lab-operations`](../../openspec/changes/harden-workshop-lab-operations/)
change governs executable event preparation and recovery.
