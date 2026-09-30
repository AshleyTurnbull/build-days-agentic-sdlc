import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(".github/workflows/deploy.yml", "utf8");

describe("deployment evidence workflow contract", () => {
  it("requires the selected commit to be the same-repository pull-request head", () => {
    expect(workflow).toMatch(
      /pullRequestNumber:\s*\r?\n\s+description:[^\r\n]+\r?\n\s+required: true\r?\n\s+type: number/,
    );
    expect(workflow).toContain('head.repo.full_name // empty');
    expect(workflow).toContain(
      'Selected commit $DEPLOYED_SHA is not the current head $head_sha of pull request #$PR_NUMBER.',
    );
    expect(workflow).not.toContain('pulls/$PR_NUMBER/commits');
    expect(workflow).toContain("gh pr checks \"$PR_NUMBER\" --required");
  });

  it("publishes evidence only after successful live verification", () => {
    const verifyIndex = workflow.indexOf(
      "name: Verify deployed health, readiness, and API",
    );
    const evidenceIndex = workflow.indexOf(
      "name: Create machine-readable deployment evidence",
    );
    const artifactIndex = workflow.indexOf("name: Upload deployment evidence");

    expect(verifyIndex).toBeGreaterThan(-1);
    expect(evidenceIndex).toBeGreaterThan(verifyIndex);
    expect(artifactIndex).toBeGreaterThan(evidenceIndex);
    expect(workflow).toContain("([.verification[]] | all)");
    expect(workflow).not.toMatch(
      /name: Upload deployment evidence\s*\n\s+if: always\(\)/,
    );
  });

  it("keeps PR write permission in one post-success job", () => {
    expect(workflow.match(/pull-requests: write/g)).toHaveLength(1);
    expect(workflow).toMatch(
      /publish-evidence:\s*\n\s+needs: \[validate-linkage, deploy\]/,
    );
    expect(workflow).toContain("<!-- workshop-deployment-evidence -->");
    expect(workflow).toContain("gh api --method PATCH");
    expect(workflow).toContain("gh api --method POST");
  });

  it("records the required compact evidence fields", () => {
    for (const field of [
      "commit_sha",
      "pull_request_number",
      "required_checks",
      "security_checks",
      "deployment_name",
      "github_run_id",
      "environment",
      "application_url",
      "health",
      "readiness",
      "feedback_creation",
      "first_vote",
      "duplicate_vote_protection",
      "workflow_run_url",
    ]) {
      expect(workflow).toContain(field);
    }
  });
});
