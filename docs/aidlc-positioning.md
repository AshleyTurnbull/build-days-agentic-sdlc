# Building on AI-DLC with GitHub

## Starting from familiar ideas

If you have worked with AI-DLC, many parts of this workshop will feel familiar:

- capturing intent and defining scope;
- creating requirements and design artifacts;
- dividing work into ordered, testable units;
- using different agent roles for planning, implementation, and review;
- applying quality gates;
- preserving context between agent sessions;
- carrying feedback from deployment and operations into the next change.

We will build on those ideas rather than introduce a competing lifecycle. The workshop focuses on how GitHub connects the methodology to the everyday software delivery system:

> OpenSpec describes the change, harness engineering gives agents the right repository context, and GitHub connects the work to collaboration, policy, security, deployment, and evidence.

The result is a delivery loop that remains visible and understandable across local agents, cloud agents, human reviewers, CI, security tools, and Azure.

Participants practice that loop primarily through the GitHub Copilot App. The
App makes the operating model visible: Chats clarify intent, Plan mode exposes
the proposed approach, Fleet shows parallel work, Autopilot executes one
approved goal, and isolated sessions preserve issue boundaries.

## How the concepts map

| Familiar AI-DLC concept | How we will apply it | What GitHub adds |
|---|---|---|
| Intent and initiative framing | GitHub issue and OpenSpec proposal | A durable, assignable work item where the team can discuss and refine intent |
| Requirements and stories | OpenSpec capability specs and scenarios | Versioned requirements that can be linked directly from the pull request |
| Architecture and functional design | Root `DESIGN.md`, change `design.md`, and optional ADRs | Design and implementation can be reviewed together |
| Practices and project memory | Root and scoped `AGENTS.md` files and repository documentation | Local and cloud agents receive the same versioned guidance |
| Units and dependency planning | OpenSpec tasks, GitHub issues or sub-issues, and explicit ownership | Work remains visible and reviewable outside an individual agent session |
| Builder and reviewer roles | Copilot sessions, coding agents, and code review | Branches, commits, and pull requests provide durable handoffs |
| Quality gates | Actions checks, code scanning, dependency scanning, and rulesets | Checks run independently from the implementing agent |
| Human approval gates | Pull-request review, rulesets, and protected environments | Approvals are tied to identities and recorded by the platform |
| Context recovery | Specs, designs, tasks, commits, PR discussion, and checks | A new person or agent can reconstruct the current state from the repository |
| Infrastructure and deployment | AVM, Actions, Azure OIDC, and environments | Deployment identity and authorization remain separate from the AI model |
| Operations feedback | Azure deployment evidence and GH-AW | Runtime findings can create or update governed GitHub work |

## What we will explore

### A methodology that can adapt with the team

OpenSpec provides a lightweight workflow for the workshop, but GitHub does not require every team or every change to use the same amount of ceremony. Teams can continue using AI-DLC practices, adopt OpenSpec, or evolve their own approach while retaining the same issues, pull requests, rulesets, Actions, security controls, and environments.

This lets the development methodology adapt while the delivery guardrails remain consistent.

### Validation that is independent of the agent

Agents can propose requirements, write code, generate tests, and prepare infrastructure changes. The final checks still run independently through GitHub and Azure:

```text
Agent proposes or implements
        |
        v
GitHub validates with checks and policy
        |
        v
People and protected environments authorize
```

This separation helps teams distinguish an agent's report from independently verified evidence.

### Evidence connected to the delivery workflow

Issues, commits, pull requests, reviews, checks, security alerts, deployments, and environments are connected GitHub objects. Each carries identity, timestamps, status, and history.

A reviewer should be able to understand why a change shipped without needing access to the original agent conversation.

### Consistent guidance across different agents

The same repository contract can guide Copilot in an editor, Copilot CLI, background coding agents, code review, and GH-AW. OpenSpec, `DESIGN.md`, `AGENTS.md`, tests, and workflows preserve the important context when work moves between people and agents.

### A loop that reaches production

The workshop continues beyond code generation. Each team will work toward:

- a reviewed and merged pull request;
- independently executed test and security results;
- an Azure deployment using workload identity;
- a reachable application;
- a GH-AW run that evaluates or routes the resulting evidence.

## What each lab demonstrates

### Lab 1: OpenSpec and repository context

We will briefly compare Spec Kit and OpenSpec, then use OpenSpec as the
canonical hands-on path. The goal is to create a change contract that a new
local or cloud agent can understand without relying on hidden conversation
history.

### Lab 2: visible multi-agent orchestration

The team uses the GitHub Copilot App to turn approved OpenSpec tasks into:

- a durable issue or task reference;
- clear ownership;
- dependency information;
- a validation contract;
- a branch, commit, or pull-request record.

Plan mode makes decomposition reviewable before implementation. Fleet runs
only independent work, separate sessions keep issues isolated, and Autopilot
demonstrates goal-oriented execution for one bounded task. This makes
orchestration visible to the whole team rather than only in terminal output.

### Lab 3: independently verified build and deployment

Agents can generate application code, tests, Bicep, and workflow changes. GitHub Actions will execute the checks independently, and Azure deployment will use OIDC and protected environment policy.

### Lab 4: continuity from local to cloud

A cloud coding agent will receive an issue and the repository harness, without the context of the original workstation session. Its ability to create a compliant pull request demonstrates that the important context is versioned with the project.

### Lab 5: operational feedback through GH-AW

The GH-AW exercise will use evidence produced by the earlier labs:

1. inspect the instructor-seeded CodeQL pull request, required checks, linked
   OpenSpec work, and deployment evidence;
2. produce one narrowly defined security-and-delivery output;
3. use an agent to implement the bounded remediation;
4. require CodeQL and human review before merging the fix;
5. keep merge and protected-environment approval with people or deterministic
   policy.

### Optional capstone: apply the complete method to a new app

Teams select a bounded brief and create a net-new application inside the same
governed repository. They repeat intent capture, OpenSpec elaboration, issue
decomposition, Plan approval, parallel Fleet work, a bounded Autopilot goal,
independent Actions gates, AVM/OIDC deployment, ticket-driven bug fixing, and
GH-AW feedback.

This is the synthesis point: familiar AI-DLC concepts become connected GitHub
objects and independently verifiable platform evidence.

## The end-of-day test

At the end of the workshop, imagine handing a new reviewer only the repository URL. The reviewer should be able to determine:

1. why the change was requested;
2. which requirements were approved;
3. which architectural decisions shaped it;
4. who or what implemented and reviewed it;
5. which independent checks passed;
6. which security issue was resolved;
7. what was deployed, by which identity, and where;
8. what follow-up work was created from the resulting evidence.

If that story is available in the repository and platform, the team has created more than an agent-generated feature: it has created a governed and repeatable delivery loop.
