"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Loader, Loader2, Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { getChatByUrl } from "@/drizzle/action";
import Messages from "./messages";

export default function Chat({ url }: { url: string }) {
  const { data, isLoading } = useQuery({
    queryKey: [`${url}`],
    queryFn: () => getChatByUrl({ url }),
  });
  let chatId = data?.id!;
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      body: { url, chatId },
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
