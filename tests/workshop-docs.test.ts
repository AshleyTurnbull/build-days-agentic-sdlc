import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");

const participantLabs = [
  "docs/labs/01-openspec-and-harness.md",
  "docs/labs/02-multi-agent-orchestration.md",
  "docs/labs/03-build-test-deploy.md",
  "docs/labs/04-cloud-agent.md",
  "docs/labs/05-gh-aw.md",
  "docs/labs/workshop-wrap-and-evidence.md",
  "docs/labs/06-net-new-app-capstone.md",
];

function read(relativePath: string) {
  return readFileSync(resolve(root, relativePath), "utf8");
}

describe("participant lab documentation", () => {
  it.each(participantLabs)("%s is App-first and independently runnable", (path) => {
    const content = read(path);

    for (const section of [
      "## Outcome",
      "## Prerequisites",
      "## Expected repository artifacts",
      "## Verification",
      "## Recovery",
      "## Stretch",
    ]) {
      expect(content, `${path} is missing ${section}`).toContain(section);
    }

    for (const field of ["**Use:**", "**Attach:**", "**Prompt:**", "**Expect:**", "**Decide:**"]) {
      expect(content, `${path} is missing prompt-card field ${field}`).toContain(field);
    }

    expect(content, `${path} must not contain participant command fences`).not.toContain("```");
  });

  it("teaches Plan, Fleet, sessions, steering, and Autopilot in Lab 2", () => {
    const content = read("docs/labs/02-multi-agent-orchestration.md");

    for (const concept of ["Plan mode", "Fleet", "session", "Autopilot", "Pause. Re-read"]) {
      expect(content).toContain(concept);
    }
  });

  it("uses the pinned GH-AW creation guide and one safe output in Lab 5", () => {
    const content = read("docs/labs/05-gh-aw.md");
    const normalized = content.replace(/\s+/g, " ");

    expect(content).toContain("https://raw.githubusercontent.com/github/gh-aw/v0.88.8/create.md");
    expect(content).toContain("https://github.github.com/gh-aw/");
    expect(content).toContain(
      "https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/",
    );
    expect(normalized).toContain("exactly one safe output");
    expect(normalized).toContain("installing or converging the extension to that version when necessary");
    expect(normalized).toContain("Do not use `main` or `latest`");
  });

  it("requires the specification pull request to merge before implementation", () => {
    expect(read("docs/labs/01-openspec-and-harness.md").replace(/\s+/g, " ")).toContain(
      "approves, and merges the specification pull request",
    );
    expect(read("docs/labs/02-multi-agent-orchestration.md")).toContain(
      "specification pull request is approved and merged",
    );
  });

  it("keeps seeded exercise policy exceptions marker and path constrained", () => {
    const policy = read(".github/workflows/spec-pr-policy.yml");

    expect(policy).toContain("<!-- cloud-agent-revision-exercise:v1 -->");
    expect(policy).toContain("src/server/app.ts");
    expect(policy).toContain("tests/api.test.ts");
    expect(policy).toContain("<!-- workshop-lab5-codeql-exercise -->");
    expect(policy).toContain("workshop/lab5-codeql-exercise");
    expect(policy).toContain("tests/security-exercise/unsafe-command.ts");

    expect(read("scripts/prepare-team-repo.ps1")).toContain(
      "<!-- cloud-agent-revision-exercise:v1 -->",
    );
    expect(read("scripts/seed-security-exercise.ps1")).toContain(
      "<!-- workshop-lab5-codeql-exercise -->",
    );
  });

  it("publishes the curated workshop reference set", () => {
    const resources = read("docs/resources.md");

    for (const url of [
      "https://github.github.com/gh-aw/",
      "https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/",
      "https://openspec.dev/",
      "https://github.com/github/spec-kit",
      "https://github.blog/ai-and-ml/github-copilot/how-to-bring-your-software-delivery-workflow-into-github-with-agent-apps/",
      "https://agenticsdlc.github.io/agentic-sdlc-ops/",
      "https://danielmeppiel.github.io/agentic-sdlc-handbook/",
    ]) {
      expect(resources).toContain(url);
    }

    expect(resources).toContain("## Canonical hands-on references");
    expect(resources).toContain("recommended further reading");
    expect(resources).toContain("not additional required frameworks");
    expect(read("README.md")).toContain("docs/resources.md");
    expect(read("docs/README.md")).toContain("resources.md");
  });

  it("keeps Spec Kit comparison-only in the participant path", () => {
    const lab = read("docs/labs/01-openspec-and-harness.md");
    const comparison = read("docs/comparisons/spec-kit-to-openspec.md");

    expect(lab).toContain("OpenSpec is the canonical hands-on SDD path");
    expect(lab).toContain("../comparisons/spec-kit-to-openspec.md");
    expect(lab).not.toContain("https://github.com/github/spec-kit");
    expect(comparison).toContain("https://github.com/github/spec-kit");
    expect(comparison).toContain("Do not install Spec Kit");
    expect(comparison).toContain("add `.specify/`");
  });
});
