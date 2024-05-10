import { Author } from "./authors.types";
import { Genre } from "./genres.types";

export interface Book {
  id: number;
  title: string;
  isbn: string;
  description: string;
  language: string;
  format: "PAPERBACK" | "HARDCOVER" | "EBOOK";
  country: string;
  numOfPages: number;
  publishDate: Date;
  authors: Author[];
  genres: Genre[];
  cover?: string;
  file?: string;
}

export type CreateBookPayload = Omit<Book, "id">;

export type UpdateBookPayload = Partial<CreateBookPayload>;
