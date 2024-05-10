import { Book } from "./books.types";

export type Privacy = "PUBLIC" | "PRIVATE";

export interface List {
  id: number;
  title: string;
  description: string;
  privacy: Privacy;
  userId: number;
  books: Book[];
}

export type createListPayload = Omit<List, "id" | "books">;

export type updateListPayload = Partial<createListPayload>;
