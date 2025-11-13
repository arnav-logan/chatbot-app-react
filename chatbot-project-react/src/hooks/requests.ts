import type { ChatbotChatRequest, ChatbotChatResponse } from "../types";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  headers: { "Content-Type": "application/json" },
  timeout: import.meta.env.VITE_BASE_API_TIMEOUT
    ? parseInt(import.meta.env.VITE_BASE_API_TIMEOUT)
    : 5000,
});

export const fetchChatbotChatResponse = async (
  request: ChatbotChatRequest
): Promise<ChatbotChatResponse> => {
  const response = await axiosInstance.post("/chatbot/chat", request);

  if (response.status !== 200) {
    throw new Error("Failed to fetch response from chatbot");
  }
  return response.data;
};
