import { Book } from "./books.types";
export type ChallengeType = "ANNUAL" | "MONTHLY" | "WEEKLY";

export interface Challenge {
  id: number;
  title: string;
  userId: number;
  type: ChallengeType;
  startDate: string;
  endDate: string;
  goal: number;
  books: Book[];
}
export type UpdateChallengePayload = Partial<CreateChallengePayload>;

export type CreateChallengePayload = Omit<
  Challenge,
  "id" | "endDate" | "period" | "books"
>;
