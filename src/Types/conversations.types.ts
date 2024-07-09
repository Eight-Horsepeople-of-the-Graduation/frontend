export interface Message {
  id: number;
  content: string;
  role: "human" | "ai";
  createdOn: string;
}

export interface Conversation {
  id: number;
  createdOn: string;
  retriever: string;
  memory: string;
  llm: string;
  bookId: number;
  userId: number;
  messages: Message[];
}


// export type PostMessageToConversation = 