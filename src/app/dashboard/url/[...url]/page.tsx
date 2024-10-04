import Chat from "@/components/chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodeComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  const CompleteUrl = decodeComponents.join("/");
  const lastSlashIndex = CompleteUrl.lastIndexOf("/");
  const baseUrl = CompleteUrl.substring(0, lastSlashIndex);
  const loaderType = CompleteUrl.substring(lastSlashIndex + 1);
  return { baseUrl, loaderType };
}

const page = async ({ params }: PageProps) => {
  const { baseUrl, loaderType } = reconstructUrl({
    url: params.url as string[],
  });
  console.log(loaderType, baseUrl);

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
          // TODO:add reconstructed url
          src={baseUrl}
          height="100%"
          width="100%"
          title="website iframe"
          className="resize-none"
        ></iframe>
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
