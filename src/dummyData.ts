import { Challenge } from "./Types/readingChallengeTypes";
import { Book } from "./Types/bookTypes";


export const dummyChallenges: Challenge[] = [
  {
    id: 1,
    goal: 100,
    progress: 25,
    type: "yearly",
    period: "2024",
    userId: 1,
  },
  {
    id: 2,
    goal: 8,
    progress: 6,
    type: "monthly",
    period: "april",
    userId: 1,
  },
  {
    id: 3,
    goal: 2,
    progress: 1,
    type: "weekly",
    period: "week 15",
    userId: 1,
  },
];

export const dummyUser = {
  id: 1,
  name: "Adham Usama",
  username: "adhamusama25",
  email: "adhamusama25@gmail.com",
  role: "user",
  image: "https://avatars.githubusercontent.com/u/95590437?v=4",
};

export const dummyLists = [
  { id: 1, name: "Novels" },
  { id: 2, name: "Self Development Books" },
  { id: 3, name: "Programming Books" },
  { id: 4, name: "Business Books" },
  { id: 5, name: "History Books" },
  { id: 6, name: "Biography Books" },
  { id: 7, name: "Science Books" },
  { id: 8, name: "Fantasy Books" },
];


export const dummyBooks: Book[] = [
  {
    id: 1,
    author: {
      name: "Chinua Acheeeeeeeebe",
      username: "",
      email: "",
      image: "",
      role: "",
      id: 0,
    },
    cover:
      "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    name: "Things Fall Apart",
    description: "",
    category: "",
  },
];