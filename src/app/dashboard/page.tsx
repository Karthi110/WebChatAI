import ChatDisplay from "@/components/chat/chat-display-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UrlDialog from "@/components/url-dialog";
import { getChats } from "@/drizzle/action";
import { Plus } from "lucide-react";
import React from "react";

export const runtime = "dynamic";

const Dashboard = async () => {
  const chats = await getChats();
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
              url={chat.url!}
            />
          ))
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <Card className="w-[300px] h-[180px]">
              <CardContent>
                <CardHeader className="flex items-center justify-center">
                  <Plus className="size-24 text-muted-foreground" />
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
