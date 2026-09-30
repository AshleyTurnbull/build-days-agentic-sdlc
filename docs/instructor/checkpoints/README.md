# Instructor checkpoint assets

This directory contains public templates, not recovery states.

- [`checkpoint-manifest.template.json`](checkpoint-manifest.template.json)
  defines the private manifest consumed by the publication script.
- [`recovery-evidence.template.md`](recovery-evidence.template.md) separates
  instructor-origin recovery evidence from participant-produced evidence.
- [`../recovery.md`](../recovery.md) is the publication and validation runbook.

Copy the templates to an instructor-controlled private location before filling
them in. Never commit completed solutions, real private ref names, populated
manifests, or attendee-specific recovery records to the public default branch.
The publication script requires the participant GitHub logins and verifies that
none can read the private solution repository; branch protection alone is not
accepted as a confidentiality boundary.
