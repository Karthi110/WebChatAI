import { vectorizeData } from "@/actions/action";
import Chat from "@/components/chat";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import React from "react";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodeComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  return decodeComponents.join("/");
}

const page = async ({ params }: PageProps) => {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });
  // await vectorizeData(reconstructedUrl);
  // const loader = new CheerioWebBaseLoader("https://ui.shadcn.com/docs", {
  //   // extractor: compiledConvert,
  //   // maxDepth: 1,
  // });
  // const docs = await loader.load();
  // const splitter = new RecursiveCharacterTextSplitter({
  //   chunkOverlap: 50,
  //   chunkSize: 1000,
  // });

  // const doc_chunk = await splitter.splitDocuments(docs);

  return (
    <div>
      <Chat url={reconstructedUrl} />
    </div>
  );
};

export default page;
