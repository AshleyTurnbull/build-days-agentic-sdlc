# Lab authoring guide

Each lab document must contain:

1. a measurable outcome;
2. prerequisites;
3. participant steps;
4. expected repository artifacts;
5. verification commands;
6. a time-boxed recovery path;
7. an optional stretch task.

Participant steps use GitHub Copilot App prompt cards with `Use`, `Attach`,
`Prompt`, `Expect`, and `Decide`. Do not put terminal command blocks in
participant labs. Ask the App to run repository-owned validation and have the
participant inspect the real output or GitHub evidence.

Keep the happy path achievable within the agenda and move exploratory
comparisons into optional sections.

Distinguish repository artifacts that participants can inspect from external
organization or Azure configuration that instructors must prepare. Keep
PowerShell-compatible operational commands in instructor documentation. Each
lab must leave a durable GitHub or repository receipt that a reviewer can
inspect without the originating agent conversation.
