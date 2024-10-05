import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import { Message as TMessage } from "ai";

interface PageProps {
  message: TMessage;
}

const Message = ({ message }: PageProps) => {
  const isUserMessage = message.role === "user";
  return (
    <div className="w-full p-2">
      <div
        className={cn("flex items-center gap-0.5", {
          "justify-end": isUserMessage,
          "justify-start": !isUserMessage,
        })}
      >
        {isUserMessage ? (
          <div className="w-full flex items-start justify-end p-1 gap-x-0.5">
            <div className="flex items-start justify-center gap-1">
              <ReactMarkdown className="max-w-prose w-fit bg-green-100 p-1.5 tracking-wide border rounded-md text-sm text-left font-medium shadow-md">
                {message.content}
              </ReactMarkdown>
              <Button size="iconSm" className="rounded-xl">
                <User className="size-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-start justify-start p-1 gap-x-0.5">
            <div className="flex items-start justify-center gap-1 flex-row-reverse">
              <ReactMarkdown className="max-w-prose w-fit bg-fuchsia-100  p-1.5 tracking-wide border rounded-md text-sm text-left font-medium shadow-md">
                {message.content}
              </ReactMarkdown>
              <Button
                size="iconSm"
                className="bg-fuchsia-400 hover:bg-fuchsia-400/90 rounded-xl"
              >
                <Bot className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
