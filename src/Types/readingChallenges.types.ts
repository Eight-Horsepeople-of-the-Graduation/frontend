import { Book } from "./books.types";
export type ChallengeType = "ANNUAL" | "MONTHLY" | "WEEKLY";

export interface Challenge {
  id: number;
  title: string;
  type: ChallengeType;
  startDate: string;
  endDate: string;
  progress: number;
  goal: number;
  timeframe: string;
  hasEnded: boolean;
  userId: number;
  books: Book[];
}

export type CreateChallengePayload = Omit<
  Challenge,
  | "id"
  | "startDate"
  | "endDate"
  | "progress"
  | "timeframe"
  | "hasEnded"
  | "books"
>;

export type UpdateChallengePayload = Omit<
  Challenge,
  | "id"
  | "type"
  | "startDate"
  | "endDate"
  | "progress"
  | "timeframe"
  | "hasEnded"
  | "userId"
  | "books"
>;
