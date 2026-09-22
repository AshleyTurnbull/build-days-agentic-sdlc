## ADDED Requirements

### Requirement: Feedback board

The application SHALL let a workshop user view and submit feedback with a title, description, category, and display name.

#### Scenario: User submits valid feedback

- **WHEN** the user submits all required fields with valid values
- **THEN** the feedback is persisted and appears in the board with its creation time and zero votes

#### Scenario: User submits invalid feedback

- **WHEN** the user omits a required field or exceeds a documented field limit
- **THEN** the application rejects the request and shows an actionable validation message without persisting the feedback

### Requirement: Feedback voting

The application SHALL let a workshop user vote for feedback and SHALL prevent the same workshop client identifier from voting repeatedly for the same item.

#### Scenario: User casts the first vote

- **WHEN** a client that has not voted for the feedback submits a vote
- **THEN** the persisted vote count increases by one and the updated count is returned

#### Scenario: User repeats a vote

- **WHEN** the same client identifier votes for the same feedback again
- **THEN** the vote count remains unchanged and the application reports that the vote already exists

### Requirement: Persistent Azure state

The deployed application SHALL persist feedback and votes in Azure Table Storage using the App Service managed identity.

#### Scenario: Application restarts

- **WHEN** the App Service restarts after feedback has been created
- **THEN** the existing feedback and vote counts remain available

### Requirement: Operational health

The application SHALL expose health and readiness endpoints suitable for GitHub Actions deployment verification.

#### Scenario: Deployment is ready

- **WHEN** the application process is running and its required storage dependency is reachable
- **THEN** the readiness endpoint returns a successful response

#### Scenario: Storage is unavailable

- **WHEN** the application cannot access required persistent storage
- **THEN** the readiness endpoint reports failure without exposing credentials or sensitive configuration

