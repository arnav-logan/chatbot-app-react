import { Button, ConfigProvider, Input, Space, type InputRef } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";

type ChatInputProps = {
    onSendMessage: (message: string) => Promise<void>;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isReadyForInput, setIsReadyForInput] = useState<boolean>(true);
    const chatInputTextRef = useRef<InputRef>(null);

    const handleSend = () => {
        if (inputValue.trim() === "") return;

        setIsReadyForInput(false);

        onSendMessage(inputValue).finally(() => {
            setIsReadyForInput(true);
        });

        setInputValue("");
    }

    useEffect(() => {
        if (isReadyForInput && chatInputTextRef.current) {
            chatInputTextRef.current.focus();
        }
    }, [isReadyForInput]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        colorBgContainerDisabled: "#f5f5f5",
                        colorTextDisabled: "#747474ff",
                    },
                    Button: {
                        colorBgContainerDisabled: "#e0e0e0",
                        colorTextDisabled: "#a0a0a0",
                    },
                },
            }}
        >
            <div>
                <Space.Compact style={{ width: "100%" }} size="small">
                    <TextArea
                        style={{ height: '5vh', resize: 'none', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        rows={4}
                        ref={chatInputTextRef}
                        placeholder={isReadyForInput ? "Type your message..." : "Please wait..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={!isReadyForInput}
                        autoFocus={true}
                        onPressEnter={handleSend}
                    />
                    <Button style={{ height: '5vh' }} autoFocus={true} type="primary" onClick={handleSend} disabled={!isReadyForInput || !inputValue.trim()}>Send</Button>
                </Space.Compact>
            </div>
        </ConfigProvider>
    );
};

export default ChatInput;
