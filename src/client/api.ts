import type {
  AuthorSummary,
  ApiError,
  CreateFeedbackRequest,
  Feedback,
  VoteResult,
} from "../shared/contracts.js";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...options?.headers,
    },
  });
  const body = (await response.json()) as T | ApiError;
  if (!response.ok) {
    const apiError = body as ApiError;
    throw new ApiRequestError(
      apiError.error?.message ?? "Something went wrong. Try again.",
      apiError.error?.fieldErrors,
    );
  }
  return body as T;
}

export const listFeedback = async (
  category = "all",
  sort = "newest",
): Promise<Feedback[]> => {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (sort !== "newest") params.set("sort", sort);
  const queryString = params.toString();
  const query = queryString ? `?${queryString}` : "";
  const result = await request<{ items: Feedback[] }>(
    `/api/feedback${query}`,
  );
  return result.items;
};

export const getAuthorSummary = (
  displayName: string,
): Promise<AuthorSummary> => {
  const params = new URLSearchParams({ displayName });
  return request<AuthorSummary>(
    `/api/feedback/summary?${params.toString()}`,
  );
};

export const createFeedback = async (
  input: CreateFeedbackRequest,
): Promise<Feedback> => {
  const result = await request<{ feedback: Feedback }>("/api/feedback", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return result.feedback;
};

export const voteForFeedback = (
  id: string,
  clientId: string,
): Promise<VoteResult> =>
  request<VoteResult>(`/api/feedback/${encodeURIComponent(id)}/votes`, {
    method: "POST",
    body: JSON.stringify({ clientId }),
  });
