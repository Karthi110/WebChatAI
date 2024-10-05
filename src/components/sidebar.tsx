import { getChats } from "@/drizzle/action";
import React from "react";
import UrlDialog from "./url-dialog";
import Link from "next/link";
import { Separator } from "./ui/separator";

const Sidebar = async () => {
  const chats = await getChats();
  return (
    <div className="pt-6 px-1">
      {chats.length ? (
        <div className="flex flex-col items-center justify-center gap-y-1">
          <UrlDialog text="add new chat" />
          <Separator className="my-2" />
          <h1 className="font-semibold text-base">Chats</h1>
          {chats.map((chat, i) => {
            const correctedUrl =
              chat.url!.slice(0, -1) + "/" + chat.url!.slice(-1);
            return (
              <Link
                key={i}
                href={`/dashboard/chat/${correctedUrl}`}
                className="text-xs truncate p-1 rounded-sm w-full hover:bg-primary hover:text-secondary"
              >
                {chat.chatName}
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          <UrlDialog icon />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
