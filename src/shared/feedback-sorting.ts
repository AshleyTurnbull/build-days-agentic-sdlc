import type { Feedback, FeedbackSort } from "./contracts.js";

const compareIds = (left: Feedback, right: Feedback): number =>
  left.id < right.id ? -1 : left.id > right.id ? 1 : 0;

const compareNewest = (left: Feedback, right: Feedback): number =>
  Date.parse(right.createdAt) - Date.parse(left.createdAt) ||
  compareIds(left, right);

export const sortFeedback = (
  items: readonly Feedback[],
  sort: FeedbackSort,
): Feedback[] =>
  [...items].sort((left, right) =>
    sort === "most-votes"
      ? right.votes - left.votes || compareNewest(left, right)
      : compareNewest(left, right),
  );
