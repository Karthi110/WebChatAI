"use client";

import { useChat } from "ai/react";
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
        {messages.length ? (
          <div>
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col">
                <p>{JSON.stringify(m)}</p>
                <span className="text-xs">{m.createdAt?.toDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <div>Get started with typing</div>
        )}
      </div>
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
