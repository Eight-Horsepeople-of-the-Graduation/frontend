export interface Message {
  id: number;
  createdOn: string;
  role: "human" | "ai";
  content: string;
  conversationId: number;
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