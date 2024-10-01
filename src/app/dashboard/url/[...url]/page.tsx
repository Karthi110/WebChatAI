import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import React from "react";

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

const UrlPage = async ({ params }: PageProps) => {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  const loader = new CheerioWebBaseLoader(reconstructedUrl);
  const docs = await loader.load();
  //   console.log(docs[0].pageContent);

  console.log(reconstructedUrl);
  return <div>UrlPage</div>;
};

export default UrlPage;
