"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Messages from "./messages";
import MessageNav from "./message-nav";
import { useQuery } from "@tanstack/react-query";
import { getChatByUrl } from "@/drizzle/action";

export default function Chat({ url }: { url: string }) {
  // TODO:add messages and infinte query
  const { data, isLoading } = useQuery({
    // TODO:add userId for querykey
    queryKey: [`${url}`],
    queryFn: () => getChatByUrl({ url }),
  });
  let chatId = data?.id!;
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { url, chatId },
  });

  if (isLoading) return <div>Loading</div>;
  if (!data) return null;
  console.log(data.message);

  return (
    <div className="flex flex-col items-center h-full p-2 gap-1.5">
      <MessageNav name={data.chatName!} />
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
