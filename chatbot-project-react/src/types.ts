// Generic types used across the application
export type ChatbotChatRequest = {
  message: string;
  session_id: string;
};

export type ChatbotChatResponse = {
  message: string;
};

export type SessionContextType = {
  sessionId: string;
};

export type ChatMessage = {
  content: string;
  type: "user" | "ai";
  status: "success" | "error" | "pending";
};
