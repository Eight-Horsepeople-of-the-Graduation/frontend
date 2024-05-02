import { Book } from "./books.types";
export type ChallengeType = "ANNUAL" | "MONTHLY" | "WEEKLY";
export interface Challenge {
  id: number;
  type: ChallengeType;
  userId: number;
  goal: number;
  books: Book[];
  period: string;
  endDate: string;
}
export type UpdateChallengePayload = Partial<CreateChallengePayload>;

export type CreateChallengePayload = Omit<
  Challenge,
  "id" | "endDate" | "period" | "books"
>;
