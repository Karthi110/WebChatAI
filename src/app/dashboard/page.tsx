import ChatDisplay from "@/components/chat-display-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import UrlDialog from "@/components/url-dialog";

const Dashboard = async () => {
  return (
    <MaxWidthWrapper classname="flex flex-col items-center h-[calc(100vh-3.5rem)] gap-6">
      <div className="flex items-center w-full justify-between mt-10">
        <h1 className="text-2xl">Your chats</h1>
        <UrlDialog />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <ChatDisplay />
        <ChatDisplay />
        <ChatDisplay />
        <ChatDisplay />
      </div>
      {/* TODO:Add card to display the webchats */}
    </MaxWidthWrapper>
  );
};

export default Dashboard;
