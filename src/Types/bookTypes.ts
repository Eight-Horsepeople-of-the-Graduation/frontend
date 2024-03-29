import { User } from "./userTypes";

export interface Book {
  id: number;
  name: string;
  author: User;
  description: string;
  cover: string;
  category: string;
}
