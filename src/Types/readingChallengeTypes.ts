import { Book } from "./bookTypes";

export interface Challenge {
  goal: number;
  progress: number;
  id: number;
  type: "yearly" | "monthly" | "weekly";
  period: string;
  userId: number;
  books: Book[];
}

export interface CreateReadingChallengePayload {
  goal: number;
  type: "yearly" | "monthly" | "weekly";
  userId: number;
  books: [];
}
