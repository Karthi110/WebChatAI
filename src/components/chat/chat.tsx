"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useQuery } from "@tanstack/react-query";
import Messages from "./messages";
import { getChatById } from "../../drizzle/action";

export default function Chat({ chatId,urlId }: { chatId: string,urlId:string }) {
  const { data, isLoading } = useQuery({
    queryKey: [`${chatId}`],
    queryFn: () => getChatById(chatId),
  });
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      body: { urlId },
      initialMessages: data?.message,
    });

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="size-5 animate-spin text-primary mr-1" />
        <p className="text-lg font-medium">Setting up...one moment.</p>
      </div>
    );
  if (!data) return null;

  return (
    <div className="flex flex-col items-center h-full gap-1.5">
      <Messages messages={messages} />
      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
          <Textarea
            rows={3}
            placeholder="start chatting...."
            autoFocus
            value={input}
            onChange={handleInputChange}
            className="bg-white"
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
                setInput("");
              }
            }}
          />
          <Button
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
