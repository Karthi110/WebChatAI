import Chat from "@/components/chat/chat";
import MessageNav from "@/components/chat/message-nav";
import Sidebar from "@/components/sidebar";
import { buttonVariants } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import UrlDialog from "@/components/url-dialog";
import { getChatByUrl } from "@/drizzle/action";
import { reconstructUrl } from "@/lib/utils";
import { Frown } from "lucide-react";
import Link from "next/link";

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
      className="!h-[calc(100vh-3.5rem)] grainy3"
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
      <ResizableHandle withHandle />
      <ResizablePanel minSize={80} defaultSize={75} className="w-full h-full">
        <MessageNav name={chat.chatName!} chatId={chat.id} />
        <div className="max-w-xl md:max-w-2xl mx-auto h-[calc(100vh-8rem)]">
          <Chat url={baseUrl + loaderType} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
