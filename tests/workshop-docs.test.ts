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
    expect(normalized).toContain("exactly one safe output");
  });
});
