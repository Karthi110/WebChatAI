import Chat from "@/components/chat/chat";
import MessageNav from "@/components/chat/message-nav";
import Sidebar from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getChatByUrl } from "@/drizzle/action";
import { reconstructUrl } from "@/lib/utils";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

const page = async ({ params }: PageProps) => {
  const { baseUrl, loaderType } = reconstructUrl({
    url: params.url as string[],
  });
  const chat = await getChatByUrl({ url: baseUrl + loaderType });
  if (!chat) return <div>No chat exists</div>;

  return (
    <ResizablePanelGroup
      className="!h-[calc(100vh-3.5rem)]"
      direction="horizontal"
    >
      <ResizablePanel
        defaultSize={15}
        minSize={10}
        maxSize={20}
        className="rounded-r-md boder h-full bg-primary/30"
      >
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        minSize={80}
        defaultSize={75}
        className="rounded-md border w-full h-full bg-muted/30"
      >
        <MessageNav name={chat.chatName!} />
        <div className="max-w-xl mx-auto h-[calc(100vh-8rem)]">
          <Chat url={baseUrl + loaderType} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
