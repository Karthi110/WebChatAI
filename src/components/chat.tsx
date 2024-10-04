"use client";

import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, Trash } from "lucide-react";
import { Textarea } from "./ui/textarea";
import Messages from "./messages";

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
      <Messages messages={messages} />
      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
          <Textarea
            rows={3}
            placeholder="start chatting...."
            autoFocus
            value={input}
            onChange={handleInputChange}
          />
          <Button
            variant="outline"
            size="iconSm"
            className="absolute bottom-2 right-2"
            type="submit"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
