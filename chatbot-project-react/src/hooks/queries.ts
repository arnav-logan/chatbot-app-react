import { useQuery } from "@tanstack/react-query";
import { fetchChatbotChatResponse } from "./requests";
import type { ChatbotChatRequest } from "../types";

export const useChatbotQuery = (request: ChatbotChatRequest) => {
  return useQuery({
    queryKey: ["chatbotChat", request.message],
    queryFn: () => fetchChatbotChatResponse(request),
    enabled: false,
    networkMode: "always", // Ensures the query always fetches from the network
  });
};
