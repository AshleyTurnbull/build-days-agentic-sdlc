# Capstone workspace

This directory is reserved for the optional App-first capstone. Each team
creates one net-new application in its own subdirectory:

```text
capstone/<app-name>/
```

The public starter contains no completed capstone application. Select a brief
from the [capstone catalog](../docs/capstone/README.md), then use the
[App-first capstone lab](../docs/labs/06-net-new-app-capstone.md) to create the
specification, task graph, application, tests, infrastructure, and evidence.

## Boundary

- Do not modify the workshop feedback application as a shortcut.
- Keep capstone source, tests, configuration, and infrastructure beneath the
  selected application directory wherever the owning tool permits.
- Give root-level GitHub Actions and GH-AW files a capstone-specific name and
  include them only when the approved design requires platform-recognized
  locations.
- Reuse repository governance, protected environments, and GitHub OIDC. Do not
  copy credentials or weaken existing controls.
- Use pinned Azure Verified Modules (AVM) for supported Azure resources.
- Keep generated files reproducible and commit them when their owning tool
  requires them.

Read [the local agent guide](AGENTS.md) before creating an application.

