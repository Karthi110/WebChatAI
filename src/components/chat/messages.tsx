import { useEffect, useRef } from "react";
import Message from "./message";
import { Message as TMessage } from "ai";

const Chat = ({ messages }: { messages: TMessage[] }) => {
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom whenever new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom on each render or message update
  }, [messages]);

  return (
    <div className="w-full h-[80vh] overflow-y-auto p-4">
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
      {/* Invisible element to scroll into view */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
