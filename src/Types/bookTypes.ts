import { User } from "./userTypes";

export type Book = {
  id: number;
  name: string;
  author: User;
  description: string;
  cover: string;
  category: string;
};
