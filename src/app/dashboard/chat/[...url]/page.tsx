import Chat from "@/components/chat/chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
  console.log(baseUrl);

  return (
    <ResizablePanelGroup className="flex h-full" direction="horizontal">
      <ResizablePanel
        defaultSize={10}
        minSize={10}
        maxSize={10}
        className="rounded-r-md"
      >
        sidebar
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        minSize={40}
        defaultSize={45}
        className="h-[calc(100vh-3.5rem)] rounded-md border"
      >
        <iframe
          src={baseUrl}
          height="100%"
          width="100%"
          title="website iframe"
          className="resize-none"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        minSize={40}
        defaultSize={45}
        className="rounded-md border"
      >
        <Chat url={baseUrl + loaderType} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default page;
