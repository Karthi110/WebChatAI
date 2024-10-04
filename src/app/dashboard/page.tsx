import ChatDisplay from "@/components/chat/chat-display-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import UrlDialog from "@/components/url-dialog";
import { getChats } from "@/drizzle/action";

const Dashboard = async () => {
  const chats = await getChats();
  return (
    <MaxWidthWrapper classname="flex flex-col items-center h-[calc(100vh-3.5rem)] gap-6">
      <div className="flex items-center w-full justify-between mt-10">
        <h1 className="text-2xl">Your chats</h1>
        <UrlDialog text="create new chat." />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {chats.length ? (
          chats.map((chat, i) => (
            <ChatDisplay
              key={i}
              name={chat.chatName!}
              imageUrl={chat.chatImage!}
              url={chat.url!}
            />
          ))
        ) : (
          <div>create new chat now</div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
