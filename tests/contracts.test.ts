import {
  createFeedbackSchema,
  feedbackCategoryFilterSchema,
  feedbackCategories,
  feedbackListQuerySchema,
  feedbackSortOptions,
  feedbackSortSchema,
  fieldLimits,
  voteRequestSchema,
} from "../src/shared/contracts.js";

describe("feedback contracts", () => {
  it("accepts all and each supported category filter without normalizing", () => {
    expect(feedbackCategoryFilterSchema.parse("all")).toBe("all");
    for (const category of feedbackCategories) {
      expect(feedbackCategoryFilterSchema.parse(category)).toBe(category);
    }

    expect(feedbackCategoryFilterSchema.safeParse("Content").success).toBe(
      false,
    );
    expect(feedbackCategoryFilterSchema.safeParse(" content ").success).toBe(
      false,
    );
  });

  it("accepts only supported sort modes without normalizing", () => {
    for (const sort of feedbackSortOptions) {
      expect(feedbackSortSchema.parse(sort)).toBe(sort);
      expect(feedbackListQuerySchema.parse({ sort })).toEqual({ sort });
    }

    for (const sort of ["Most-votes", "most-votes ", "popular"]) {
      expect(feedbackSortSchema.safeParse(sort).success).toBe(false);
    }
  });

  it("normalizes valid feedback", () => {
    expect(
      createFeedbackSchema.parse({
        title: "  Clear examples  ",
        description: "  Add examples  ",
        category: "content",
        displayName: "  Ada  ",
      }),
    ).toEqual({
      title: "Clear examples",
      description: "Add examples",
      category: "content",
      displayName: "Ada",
    });
  });

  it("rejects missing and oversized fields", () => {
    const result = createFeedbackSchema.safeParse({
      title: "x".repeat(fieldLimits.title + 1),
      description: "",
      category: "unknown",
      displayName: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
        expect.arrayContaining([
          "title",
          "description",
          "category",
          "displayName",
        ]),
      );
    }
  });

  it("accepts workshop-safe client identifiers only", () => {
    expect(voteRequestSchema.safeParse({ clientId: "client_123-abc" }).success).toBe(
      true,
    );
    expect(voteRequestSchema.safeParse({ clientId: "not/valid" }).success).toBe(
      false,
    );
  });
});
