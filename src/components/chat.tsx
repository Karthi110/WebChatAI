"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Trash } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function Chat({ url }: { url: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { url },
  });
  return (
    <div className="flex flex-col items-center h-full p-2 gap-1.5">
      <div className="h-9 flex items-center justify-between w-full border-b">
        <h1>chat name</h1>
        <Button variant="destructive" size="iconSm">
          <Trash className="size-4" />
        </Button>
      </div>
      <div className="h-full max-h-[calc(100vh-3.5rem-1rem-8rem)] overflow-y-auto text-start">
        messages goes here.
      </div>
      <div className="relative w-full">
        <Textarea rows={3} placeholder="start chatting...." autoFocus />
        <Button
          variant="outline"
          size="iconSm"
          className="absolute bottom-2 right-2"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
