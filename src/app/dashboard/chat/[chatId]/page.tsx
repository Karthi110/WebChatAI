import { Frown } from "lucide-react";
import Link from "next/link";
import Chat from "../../../../components/chat/chat";
import MessageNav from "../../../../components/chat/message-nav";
import { buttonVariants } from "../../../../components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../../../components/ui/resizable";
import UrlDialog from "../../../../components/url-dialog";
import { getChatById } from "../../../../drizzle/action";
import Sidebar from "../../../../components/sidebar";

interface PageProps {
  params: {
    chatId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const chat = await getChatById(params.chatId);
  const urlId=await getUrl(chat.url)
  if (!chat)
    return (
      <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center flex-col space-y-2">
        <p className="text-lg font-medium text-destructive flex items-center">
          <Frown className="size-5 mr-1" />
          No chat exists
        </p>
        <Link
          href="/dashboard"
          className={buttonVariants({
            variant: "link",
            size: "lg",
            className: "text-lg",
          })}
        >
          Go back to dashboard
        </Link>
        <p className="text-xl text-muted-foreground font-medium">Or</p>
        <UrlDialog text="create one now!" showIcon={false} size="lg" />
      </div>
    );

  return (
    <ResizablePanelGroup
      className="!h-[calc(100vh-3.5rem)] grainy2"
      direction="horizontal"
    >
      <ResizablePanel
        defaultSize={15}
        minSize={10}
        maxSize={20}
        className="h-full"
      >
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle className="grainy2" />
      <ResizablePanel
        minSize={80}
        defaultSize={75}
        className="w-full h-full border-l-2 rounded-tl-xl bg-white"
      >
        <MessageNav name={chat.chatName!} chatId={chat.id} />
        <div className="max-w-xl md:max-w-2xl mx-auto h-[calc(100vh-8rem)]">
          <Chat chatId={params.chatId} urlId={urlId!} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
