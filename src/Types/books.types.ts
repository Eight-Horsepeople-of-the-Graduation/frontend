import { Author } from "./authors.types";
import { Genre } from "./genres.types";

export interface Book {
  id: number;
  title: string;
  isbn: string;
  description: string;
  publishDate: string;
  format: "PAPERBACK" | "HARDCOVER" | "EBOOK";
  language: string;
  country: string;
  numOfPages: number;
  rating: number;
  pdfLink?: string;
  authors: Author[];
  genres: Genre[];
  coverPicture?: string;
}

export type CreateBookPayload = Omit<Book, "id">;

export type UpdateBookPayload = Partial<CreateBookPayload>;
