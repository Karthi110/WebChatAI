"use client";

import { useQuery } from "@tanstack/react-query";
import { MessageSquareDashed, PlusCircle } from "lucide-react";
import ChatDisplay from "../../components/chat/chat-display-card";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import UrlDialog from "../../components/url-dialog";
import { getChats } from "../../drizzle/action";

const Dashboard = () => {
  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(),
  });

  if (isLoading)
    return (
      <div className="h-[calc(100vh-3.5rem)] w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2.5">
          <MessageSquareDashed className="size-10 animate-bounce" />
          <h1 className="text-xl font-semibold">Loading chats...</h1>
        </div>
      </div>
    );

  if (!chats) return null;

  return (
    <MaxWidthWrapper classname="flex flex-col items-center h-[calc(100vh-3.5rem)] gap-6">
      <div className="flex items-center w-full justify-between mt-10">
        <h1 className="text-2xl font-semibold">Your chats</h1>
        <UrlDialog text="Create new chat." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
        {chats.length ? (
          chats.map((chat, i) => (
            <ChatDisplay
              key={i}
              chatId={chat.id}
              name={chat.chatName!}
              imageUrl={chat.chatImage!}
            />
          ))
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <Card className="w-[350px] h-[200px] grainy2">
              <CardContent>
                <CardHeader className="flex items-center justify-center">
                  <PlusCircle className="size-28 text-secondary" />
                  <UrlDialog
                    variant="outline"
                    text="create one"
                    showIcon={false}
                  />
                </CardHeader>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
