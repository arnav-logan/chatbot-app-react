import { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import { Avatar, List, Skeleton } from "antd";
import "./ChatWindow.css";
//import viteLogo from "/vite.svg";
import MCLogo from "../assets/MC-logo.png";
import { fetchChatbotChatResponse } from "../hooks/requests";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  AI_DISPLAY_NAME,
  DEFAULT_CHAT_MESSAGE,
  USER_DISPLAY_NAME,
} from "../constants";
import type { ChatMessage } from "../types";
import ReactMarkdown from "react-markdown";
import { SessionContext } from "../contexts/sessionContext";

type ChatWindowProps = {};

const ChatWindow: React.FC<ChatWindowProps> = ({ }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { content: DEFAULT_CHAT_MESSAGE, type: "ai", status: "success" },
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sessionId = useContext(SessionContext).sessionId;

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div id="message-container" ref={scrollContainerRef}>
        <List
          dataSource={messages}
          split={false}
          renderItem={(msg, index) => (
            <List.Item key={index} className="chat-message-item">
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      msg.type === "user" ? (
                        <UserOutlined
                          style={{
                            fontSize: "24px",
                          }}
                        />
                      ) : (
                        MCLogo
                      )
                    }
                  />
                }
                title={
                  <span className={"chat-message-title"}>
                    {msg.type === "user" ? USER_DISPLAY_NAME : AI_DISPLAY_NAME}
                    {msg.status === "error" && (
                      <ExclamationCircleOutlined
                        style={{ color: "red", marginLeft: "8px" }}
                      />
                    )}
                  </span>
                }
                description={
                  <span
                    style={{ color: msg.status === "error" ? "red" : "white" }}
                  >
                    {msg.status === "pending" ? (
                      <Skeleton active paragraph={{ rows: 3 }} title={false} />
                    ) : msg.type === "user" ? (
                      msg.content
                    ) : (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    )}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </div>

      <ChatInput
        onSendMessage={(message: string) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: message, type: "user", status: "success" },
            { content: "", type: "ai", status: "pending" },
          ]);

          return fetchChatbotChatResponse({
            message: message,
            session_id: sessionId,
          })
            .then((response: any) => {
              setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { content: response['message'].at(-1)['a'], type: "ai", status: "success" },
              ]);
            })
            .catch((error) => {
              console.error("Error fetching AI response:", error);
              setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                {
                  content: "Error fetching AI response. Try again later.",
                  type: "ai",
                  status: "error",
                },
              ]);
            });
        }}
      />
    </div>
  );
};

export default ChatWindow;
