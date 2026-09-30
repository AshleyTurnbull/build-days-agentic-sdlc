// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../src/client/App.js";
import type { Feedback } from "../src/shared/contracts.js";

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

describe("feedback board", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
    vi.restoreAllMocks();
  });

  it("shows an accessible empty state", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse({ items: [] }));
    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading feedback");
    expect(await screen.findByRole("heading", { name: "No feedback yet" })).toBeVisible();
  });

  it("filters the list and keeps the selected category in the page URL", async () => {
    const items: Feedback[] = [
      {
        id: "content-1",
        title: "Content idea",
        description: "Add an example.",
        category: "content",
        displayName: "Ada",
        votes: 0,
        createdAt: "2025-01-01T00:00:00.000Z",
      },
      {
        id: "tooling-1",
        title: "Tooling idea",
        description: "Improve a tool.",
        category: "tooling",
        displayName: "Lin",
        votes: 0,
        createdAt: "2025-01-02T00:00:00.000Z",
      },
    ];
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = new URL(String(input), window.location.origin);
      const category = url.searchParams.get("category");
      return jsonResponse({
        items:
          category && category !== "all"
            ? items.filter((item) => item.category === category)
            : items,
      });
    });
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Content idea" }))
      .toBeVisible();
    await user.selectOptions(
      screen.getByLabelText("Filter by category"),
      "tooling",
    );

    expect(await screen.findByRole("heading", { name: "Tooling idea" }))
      .toBeVisible();
    expect(screen.queryByRole("heading", { name: "Content idea" }))
      .not.toBeInTheDocument();
    expect(window.location.search).toBe("?category=tooling");
    expect(screen.getByLabelText("Filter by category")).toHaveValue("tooling");
  });

  it("restores all feedback when an empty category filter is cleared", async () => {
    const items: Feedback[] = [
      {
        id: "content-1",
        title: "Content idea",
        description: "Add an example.",
        category: "content",
        displayName: "Ada",
        votes: 0,
        createdAt: "2025-01-01T00:00:00.000Z",
      },
    ];
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const url = new URL(String(input), window.location.origin);
      const category = url.searchParams.get("category");
      return jsonResponse({
        items:
          category && category !== "all"
            ? items.filter((item) => item.category === category)
            : items,
      });
    });
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { name: "Content idea" });
    await user.selectOptions(
      screen.getByLabelText("Filter by category"),
      "idea",
    );

    expect(
      await screen.findByRole("heading", {
        name: "No feedback in this category",
      }),
    ).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Clear category filter" }),
    );

    expect(await screen.findByRole("heading", { name: "Content idea" }))
      .toBeVisible();
    expect(window.location.search).toBe("");
    expect(screen.getByLabelText("Filter by category")).toHaveValue("all");
  });

  it("restores the selected category from the page URL", async () => {
    window.history.replaceState({}, "", "/?category=tooling");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({
        items: [
          {
            id: "tooling-1",
            title: "Tooling idea",
            description: "Improve a tool.",
            category: "tooling",
            displayName: "Lin",
            votes: 0,
            createdAt: "2025-01-02T00:00:00.000Z",
          },
        ],
      }),
    );
    render(<App />);

    expect(await screen.findByRole("heading", { name: "Tooling idea" }))
      .toBeVisible();
    expect(screen.getByLabelText("Filter by category")).toHaveValue("tooling");
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/feedback?category=tooling",
      expect.anything(),
    );
  });

  it("creates feedback and votes through the complete UI flow", async () => {
    let item: Feedback | undefined;
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input, options) => {
      const url = String(input);
      if (url === "/api/feedback" && !options?.method) {
        return jsonResponse({ items: [] });
      }
      if (url === "/api/feedback" && options?.method === "POST") {
        item = {
          id: "feedback-1",
          ...(JSON.parse(String(options.body)) as Omit<
            Feedback,
            "id" | "votes" | "createdAt"
          >),
          votes: 0,
          createdAt: "2025-01-01T00:00:00.000Z",
        };
        return jsonResponse({ feedback: item }, 201);
      }
      if (url.endsWith("/votes") && item) {
        item = { ...item, votes: 1 };
        return jsonResponse({ feedback: item, alreadyVoted: false }, 201);
      }
      return jsonResponse({}, 404);
    });
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { name: "No feedback yet" });

    await user.type(screen.getByLabelText("Title"), "Better examples");
    await user.type(
      screen.getByLabelText("Description"),
      "Show another API example.",
    );
    await user.selectOptions(screen.getByLabelText("Category"), "tooling");
    await user.type(screen.getByLabelText("Display name"), "Sam");
    await user.click(screen.getByRole("button", { name: "Add feedback" }));

    expect(
      await screen.findByRole("heading", { name: "Better examples" }),
    ).toBeVisible();
    const vote = screen.getByRole("button", {
      name: "Vote for Better examples. 0 votes",
    });
    await user.click(vote);
    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: "Vote for Better examples. 1 votes",
        }),
      ).toBeVisible(),
    );
    expect(screen.getByText("Vote added for “Better examples”.")).toBeVisible();
  });

  it("shows server validation beside fields", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ items: [] }))
      .mockResolvedValueOnce(
        jsonResponse(
          {
            error: {
              code: "VALIDATION_ERROR",
              message: "Check the highlighted fields and try again.",
              fieldErrors: { title: ["Enter a title."] },
            },
          },
          400,
        ),
      );
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { name: "No feedback yet" });
    await user.click(screen.getByRole("button", { name: "Add feedback" }));

    expect(await screen.findByText("Enter a title.")).toBeVisible();
    expect(screen.getByLabelText("Title")).toHaveAttribute("aria-invalid", "true");
  });

  it("offers retry after a loading error", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("The board could not load."))
      .mockResolvedValueOnce(jsonResponse({ items: [] }));
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findByText("The board could not load.")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByRole("heading", { name: "No feedback yet" })).toBeVisible();
  });
});
