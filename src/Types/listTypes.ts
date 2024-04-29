import { Book } from "./bookTypes";

export interface List {
    id: number,
    name: string,
    ownerId: number,
    booksIds: Book[],
}

export interface createListPayload {
    name: string,
    ownerId: number,
    booksIds: Book[],
}