import request from "supertest";
import { createApp } from "../src/server/app.js";
import type { Logger } from "../src/server/logger.js";
import {
  InMemoryFeedbackStorage,
  type FeedbackStorage,
} from "../src/server/storage.js";

const silentLogger: Logger = { log: () => undefined };

describe("feedback API", () => {
  it("exposes liveness and storage-backed readiness", async () => {
    const storage = new InMemoryFeedbackStorage();
    const app = createApp({ storage, logger: silentLogger });

    await request(app).get("/health").expect(200, { status: "healthy" });
    await request(app).get("/ready").expect(200, { status: "ready" });
  });

  it("returns 503 when storage is unavailable", async () => {
    const storage = new InMemoryFeedbackStorage();
    storage.checkHealth = () => Promise.reject(new Error("secret details"));
    const app = createApp({ storage, logger: silentLogger });

    const response = await request(app).get("/ready").expect(503);
    expect(response.text).not.toContain("secret details");
    expect(response.body.error.code).toBe("STORAGE_UNAVAILABLE");
  });

  it("creates, lists, and votes on feedback", async () => {
    const app = createApp({
      storage: new InMemoryFeedbackStorage(),
      logger: silentLogger,
    });
    const created = await request(app)
      .post("/api/feedback")
      .send({
        title: "  Add a break  ",
        description: "A short break would help.",
        category: "facilitation",
        displayName: "Lin",
      })
      .expect(201);

    expect(created.body.feedback).toMatchObject({
      title: "Add a break",
      votes: 0,
    });
    const id = created.body.feedback.id as string;

    const firstVote = await request(app)
      .post(`/api/feedback/${id}/votes`)
      .send({ clientId: "workshop-client" })
      .expect(201);
    expect(firstVote.body).toMatchObject({
      alreadyVoted: false,
      feedback: { votes: 1 },
    });

    const duplicateVote = await request(app)
      .post(`/api/feedback/${id}/votes`)
      .send({ clientId: "workshop-client" })
      .expect(200);
    expect(duplicateVote.body).toMatchObject({
      alreadyVoted: true,
      feedback: { votes: 1 },
    });

    const list = await request(app).get("/api/feedback").expect(200);
    expect(list.body.items).toHaveLength(1);
    expect(list.body.items[0].votes).toBe(1);
  });

  it("aggregates a trimmed, exact-case author summary with only public totals", async () => {
    const app = createApp({
      storage: new InMemoryFeedbackStorage(),
      logger: silentLogger,
    });
    const first = await request(app)
      .post("/api/feedback")
      .send({
        title: "First item",
        description: "First contribution.",
        category: "content",
        displayName: "Ada",
      })
      .expect(201);
    await request(app)
      .post(`/api/feedback/${first.body.feedback.id}/votes`)
      .send({ clientId: "client-1" })
      .expect(201);
    await request(app)
      .post("/api/feedback")
      .send({
        title: "Second item",
        description: "Another contribution.",
        category: "idea",
        displayName: "Ada",
      })
      .expect(201);
    const differentlyCased = await request(app)
      .post("/api/feedback")
      .send({
        title: "Different author",
        description: "Case matters.",
        category: "idea",
        displayName: "ada",
      })
      .expect(201);
    await request(app)
      .post(`/api/feedback/${differentlyCased.body.feedback.id}/votes`)
      .send({ clientId: "client-2" })
      .expect(201);

    const summary = await request(app)
      .get("/api/feedback/summary?displayName=%20Ada%20")
      .expect(200);
    expect(summary.body).toEqual({
      displayName: "Ada",
      feedbackCount: 2,
      totalVotes: 1,
    });
    expect(Object.keys(summary.body).sort()).toEqual([
      "displayName",
      "feedbackCount",
      "totalVotes",
    ]);

    await request(app)
      .get("/api/feedback/summary?displayName=Ada%20Unknown")
      .expect(200, {
        displayName: "Ada Unknown",
        feedbackCount: 0,
        totalVotes: 0,
      });
  });

  it("reflects feedback creation and votes in subsequent author summaries", async () => {
    const app = createApp({
      storage: new InMemoryFeedbackStorage(),
      logger: silentLogger,
    });
    const created = await request(app)
      .post("/api/feedback")
      .send({
        title: "Fresh idea",
        description: "New contribution.",
        category: "idea",
        displayName: "Sam",
      })
      .expect(201);

    await request(app)
      .get("/api/feedback/summary?displayName=Sam")
      .expect(200, { displayName: "Sam", feedbackCount: 1, totalVotes: 0 });
    await request(app)
      .post("/api/feedback")
      .send({
        title: "Second fresh idea",
        description: "Another new contribution.",
        category: "content",
        displayName: "Sam",
      })
      .expect(201);
    await request(app)
      .get("/api/feedback/summary?displayName=Sam")
      .expect(200, { displayName: "Sam", feedbackCount: 2, totalVotes: 0 });
    await request(app)
      .post(`/api/feedback/${created.body.feedback.id}/votes`)
      .send({ clientId: "client-3" })
      .expect(201);
    await request(app)
      .get("/api/feedback/summary?displayName=Sam")
      .expect(200, { displayName: "Sam", feedbackCount: 2, totalVotes: 1 });
  });

  it("returns actionable validation for an invalid author summary query", async () => {
    const app = createApp({
      storage: new InMemoryFeedbackStorage(),
      logger: silentLogger,
    });
    const response = await request(app)
      .get("/api/feedback/summary?displayName=%20%20")
      .expect(400);

    expect(response.body.error).toMatchObject({
      code: "VALIDATION_ERROR",
      message: "Check the query parameters and try again.",
      fieldErrors: { displayName: ["Enter a display name."] },
    });
  });

  it("filters feedback by supported category without mutating the full list", async () => {
    const storage = new InMemoryFeedbackStorage();
    await storage.create(
      {
        title: "Content feedback",
        description: "Add an example.",
        category: "content",
        displayName: "Ada",
      },
      { id: "content-1", createdAt: "2025-01-01T00:00:00.000Z" },
    );
    await storage.create(
      {
        title: "Tooling feedback",
        description: "Improve the tools.",
        category: "tooling",
        displayName: "Lin",
      },
      { id: "tooling-1", createdAt: "2025-01-02T00:00:00.000Z" },
    );
    const app = createApp({ storage, logger: silentLogger });

    const filtered = await request(app)
      .get("/api/feedback?category=tooling")
      .expect(200);
    expect(filtered.body.items).toHaveLength(1);
    expect(filtered.body.items[0].category).toBe("tooling");

    const all = await request(app)
      .get("/api/feedback?category=all")
      .expect(200);
    expect(all.body.items).toHaveLength(2);
    expect(await storage.list()).toHaveLength(2);
  });

  it("sorts deterministically, composes category filtering, and reflects new votes", async () => {
    const storage = new InMemoryFeedbackStorage();
    const rows = [
      { id: "newest-b", createdAt: "2025-01-03T00:00:00.000Z", category: "content", votes: 0 },
      { id: "newest-a", createdAt: "2025-01-03T00:00:00.000Z", category: "content", votes: 1 },
      { id: "popular-old", createdAt: "2025-01-02T00:00:00.000Z", category: "tooling", votes: 3 },
      { id: "popular-new-z", createdAt: "2025-01-04T00:00:00.000Z", category: "content", votes: 2 },
      { id: "popular-new-a", createdAt: "2025-01-04T00:00:00.000Z", category: "content", votes: 2 },
    ] as const;
    for (const row of rows) {
      await storage.create(
        {
          title: row.id,
          description: "Sorting test item.",
          category: row.category,
          displayName: "Ada",
        },
        { id: row.id, createdAt: row.createdAt },
      );
      for (let vote = 0; vote < row.votes; vote += 1) {
        await storage.vote(row.id, `${row.id}-client-${vote}`);
      }
    }
    const storedIds = (await storage.list()).map((item) => item.id);
    const app = createApp({ storage, logger: silentLogger });

    const newest = await request(app).get("/api/feedback").expect(200);
    expect(newest.body.items).toMatchObject([
      { id: "popular-new-a" },
      { id: "popular-new-z" },
      { id: "newest-a" },
      { id: "newest-b" },
      { id: "popular-old" },
    ]);

    const mostVotes = await request(app)
      .get("/api/feedback?sort=most-votes")
      .expect(200);
    expect(mostVotes.body.items).toMatchObject([
      { id: "popular-old" },
      { id: "popular-new-a" },
      { id: "popular-new-z" },
      { id: "newest-a" },
      { id: "newest-b" },
    ]);

    const filtered = await request(app)
      .get("/api/feedback?category=content&sort=most-votes")
      .expect(200);
    expect(filtered.body.items).toMatchObject([
      { id: "popular-new-a" },
      { id: "popular-new-z" },
      { id: "newest-a" },
      { id: "newest-b" },
    ]);
    expect((await storage.list()).map((item) => item.id)).toEqual(storedIds);

    await request(app)
      .post("/api/feedback/newest-a/votes")
      .send({ clientId: "extra-voter-1" })
      .expect(201);
    await request(app)
      .post("/api/feedback/newest-a/votes")
      .send({ clientId: "extra-voter-2" })
      .expect(201);
    const afterVote = await request(app)
      .get("/api/feedback?sort=most-votes")
      .expect(200);
    expect(afterVote.body.items).toMatchObject([
      { id: "newest-a" },
      { id: "popular-old" },
      { id: "popular-new-a" },
      { id: "popular-new-z" },
      { id: "newest-b" },
    ]);
  });

  it.each(["popular", "Most-votes", "most-votes "])(
    "rejects unsupported sort query %s without normalizing it",
    async (sort) => {
      const app = createApp({
        storage: new InMemoryFeedbackStorage(),
        logger: silentLogger,
      });
      const response = await request(app)
        .get(`/api/feedback?sort=${encodeURIComponent(sort)}`)
        .expect(400);

      expect(response.body.error).toMatchObject({
        code: "VALIDATION_ERROR",
        message: "Check the query parameters and try again.",
        fieldErrors: { sort: ["Choose newest or most-votes."] },
      });
    },
  );

  it.each(["unknown", "Content", "content "])(
    "rejects unsupported category query %s without normalizing it",
    async (category) => {
      const app = createApp({
        storage: new InMemoryFeedbackStorage(),
        logger: silentLogger,
      });
      const response = await request(app)
        .get(`/api/feedback?category=${encodeURIComponent(category)}`)
        .expect(400);

      expect(response.body.error).toMatchObject({
        code: "VALIDATION_ERROR",
        message: "Check the query parameters and try again.",
        fieldErrors: {
          category: [
            "Choose all, content, facilitation, tooling, or idea.",
          ],
        },
      });
    },
  );

  it("returns actionable validation without persisting", async () => {
    const storage = new InMemoryFeedbackStorage();
    const app = createApp({ storage, logger: silentLogger });
    const response = await request(app)
      .post("/api/feedback")
      .send({ title: "", description: "", category: "idea", displayName: "" })
      .expect(400);

    expect(response.body.error).toMatchObject({
      code: "VALIDATION_ERROR",
      fieldErrors: {
        title: ["Enter a title."],
        description: ["Enter a description."],
        displayName: ["Enter your display name."],
      },
    });
    expect(await storage.list()).toEqual([]);
  });

  it("returns a not-found response for votes on missing feedback", async () => {
    const app = createApp({
      storage: new InMemoryFeedbackStorage(),
      logger: silentLogger,
    });
    await request(app)
      .post("/api/feedback/missing/votes")
      .send({ clientId: "client-1" })
      .expect(404, {
        error: { code: "NOT_FOUND", message: "Feedback was not found." },
      });
  });

  it("rate-limits repeated application requests without blocking liveness", async () => {
    const app = createApp({
      storage: new InMemoryFeedbackStorage(),
      logger: silentLogger,
    });

    for (let attempt = 0; attempt < 120; attempt += 1) {
      await request(app).get("/api/feedback").expect(200);
    }

    await request(app).get("/api/feedback").expect(429, {
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Try again shortly.",
      },
    });
    await request(app).get("/health").expect(200, { status: "healthy" });
  });

  it("converts unexpected storage failures to safe errors", async () => {
    const storage: FeedbackStorage = {
      initialize: () => Promise.resolve(),
      list: () => Promise.reject(new Error("connection string was secret")),
      create: () => Promise.reject(new Error("unused")),
      vote: () => Promise.reject(new Error("unused")),
      checkHealth: () => Promise.resolve(),
    };
    const app = createApp({ storage, logger: silentLogger });
    const response = await request(app).get("/api/feedback").expect(500);
    expect(response.text).not.toContain("connection string");
    expect(response.body.error.code).toBe("INTERNAL_ERROR");
  });
});
