import { Author } from "./authors.types";
import { Genre } from "./genres.types";
import { User } from "./users.types";

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

export interface Review {
  id: number;
  title: string;
  description: string;
  rating: number;
  createdAt: string;
  userId: number;
  bookId: number;
  user: Omit<
    User,
    "id" | "email" | "country" | "gender" | "birthDate" | "joinDate" | "isAdmin"
  >;
  book: Book;
}

export type AddReview = Omit<Review, "id" | "createdAt" | "user" | "book">;

export type EditReviewContentPayload = Omit<
  Review,
  "createdAt" | "user" | "book" | "rating" | "bookId" | "userId"
>;
export type EditReviewRatingPayload = Omit<
  Review,
  "createdAt" | "user" | "book" | "title" | "description" | "userId"
>;

export type CreateBookPayload = Omit<Book, "id">;

export type UpdateBookPayload = Partial<CreateBookPayload>;
