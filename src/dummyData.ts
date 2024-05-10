import { Book } from "./Types/books.types";
import { List } from "./Types/lists.types";
import { Challenge } from "./Types/readingChallenges.types";
import bookFile from "./assets/Atomic Habits.pdf";

export const dummyBooks: Book[] = [
  {
    id: 2341,
    title: "Atomic Habits",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    isbn: "978-4230198765421",
    description: `No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.

    If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights.
    
    Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field.
    
    Learn how to:
    - Make time for new habits (even when life gets crazy);
    - Overcome a lack of motivation and willpower;
    - Design your environment to make success easier;
    - Get back on track when you fall off course;
    ...and much more.
    
    Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.`,
    language: "English",
    format: "HARDCOVER",
    country: "USA",
    numOfPages: 319,
    publishDate: new Date("2018-10-16"),
    authors: [
      {
        name: "James Clear",
      },
    ],
    genres: [
      {
        title: "Self Development",
        description: "",
      },
    ],
    file: bookFile,
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [
      {
        title: "Non-Fiction",
        description: "",
      },
    ],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [
      {
        title: "Fantasy",
        description: "",
      },
    ],
  },
  {
    id: 2341,
    title: "Lost City",
    cover:
      "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [{ title: "Non-Fiction", description: "" }],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [{ title: "Fantasy", description: "" }],
  },
  {
    id: 2341,
    title: "Lost City",
    cover:
      "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [
      {
        title: "Non-Fiction",
        description: "",
      },
    ],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [
      {
        title: "Fantasy",
        description: "",
      },
    ],
  },
  {
    id: 2341,
    title: "Lost City",
    cover:
      "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [{ title: "Non-Fiction", description: "" }],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [{ title: "Fantasy", description: "" }],
  },
  {
    id: 2341,
    title: "Lost City",
    cover:
      "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [
      {
        title: "Non-Fiction",
        description: "",
      },
    ],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [
      {
        title: "Fantasy",
        description: "",
      },
    ],
  },
  {
    id: 2341,
    title: "Lost City",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [{ title: "Non-Fiction", description: "" }],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [{ title: "Fantasy", description: "" }],
  },
  {
    id: 2341,
    title: "Lost City",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [
      {
        title: "Non-Fiction",
        description: "",
      },
    ],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [
      {
        title: "Fantasy",
        description: "",
      },
    ],
  },
  {
    id: 2341,
    title: "Lost City",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [{ title: "Non-Fiction", description: "" }],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [{ title: "Fantasy", description: "" }],
  },
  {
    id: 2341,
    title: "Lost City",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [
      {
        title: "Non-Fiction",
        description: "",
      },
    ],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [
      {
        title: "Fantasy",
        description: "",
      },
    ],
  },
  {
    id: 2341,
    title: "Lost City",
    isbn: "978-4230198765421",
    description: "Deep in the Amazon jungle...",
    language: "Spanish",
    format: "HARDCOVER",
    country: "Brazil",
    numOfPages: 528,
    publishDate: new Date("2021-08-07"),
    authors: [
      {
        name: "David Lee",
      },
    ],
    genres: [
      {
        title: "Adventure",
        description: "",
      },
    ],
  },
  {
    id: 7890,
    title: "Galactic Wars",
    isbn: "978-1230985432109",
    description: "In a distant galaxy...",
    language: "English",
    format: "EBOOK",
    country: "United States",
    numOfPages: 272,
    publishDate: new Date("2022-02-14"),
    authors: [
      {
        name: "Jane Carter",
      },
    ],
    genres: [
      {
        title: "Science Fiction",
        description: "",
      },
    ],
  },
  {
    id: 5678,
    title: "Hidden Secrets",
    isbn: "978-7854123698527",
    description: "A family with a dark past...",
    language: "French",
    format: "PAPERBACK",
    country: "Canada",
    numOfPages: 415,
    publishDate: new Date("2020-12-25"),
    authors: [
      {
        name: "Michael Brown",
      },
    ],
    genres: [
      {
        title: "Mystery",
        description: "",
      },
    ],
  },
  {
    id: 1023,
    title: "Culinary Delights",
    isbn: "978-2341567890123",
    description: "A journey through world cuisine...",
    language: "English",
    format: "HARDCOVER",
    country: "Italy",
    numOfPages: 387,
    publishDate: new Date("2019-04-12"),
    authors: [
      {
        name: "Sarah Miller",
      },
    ],
    genres: [{ title: "Non-Fiction", description: "" }],
  },
  {
    id: 9514,
    title: "Enchanted Forest",
    isbn: "978-8765432109876",
    description: "Where mythical creatures roam...",
    language: "Spanish",
    format: "EBOOK",
    country: "Mexico",
    numOfPages: 612,
    publishDate: new Date("2023-05-01"),
    authors: [
      {
        name: "William Jones",
      },
    ],
    genres: [{ title: "Fantasy", description: "" }],
  },
];

export const dummyChallenges: Challenge[] = [
  {
    id: 1,
    goal: 100,
    type: "ANNUAL",
    period: "2024",
    userId: 1,
    books: dummyBooks.slice(0, 50),
    endDate: "2022-12-31",
  },
  {
    id: 2,
    goal: 8,
    type: "MONTHLY",
    period: "may   2024",
    userId: 1,
    books: dummyBooks.slice(0, 6),
    endDate: "2024-05-31",
  },
  {
    id: 3,
    goal: 2,
    type: "WEEKLY",
    period: "week 2 of May 2024",
    userId: 1,
    books: dummyBooks.slice(0, 1),
    endDate: "2024-05-10",
  },
  {
    id: 4,
    goal: 50,
    type: "ANNUAL",
    period: "2023",
    userId: 1,
    books: dummyBooks.slice(0, 50),
    endDate: "2023-12-31",
  },
  {
    id: 5,
    goal: 50,
    type: "ANNUAL",
    period: "2022",
    userId: 1,
    books: dummyBooks.slice(0, 40),
    endDate: "2023-12-31",
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

export const dummyLists: List[] = [
  {
    id: 1,
    title: "Novels",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Adventure"),
  },
  {
    id: 2,
    title: "Self Development Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Non-Fiction"),
  },
  {
    id: 3,
    title: "Programming Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Programming"),
  },
  {
    id: 4,
    title: "Business Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Business"),
  },
  {
    id: 5,
    title: "History Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "History"),
  },
  {
    id: 6,
    title: "Biography Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Biography"),
  },
  {
    id: 7,
    title: "Science Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Science"),
  },
  {
    id: 8,
    title: "Fantasy Books",
    description: "",
    privacy: "PUBLIC",
    userId: 1,
    books: dummyBooks.filter((book) => book.genres[0].title === "Fantasy"),
  },
];
