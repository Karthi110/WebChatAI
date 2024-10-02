import { pinecone } from "@/lib/pinecone";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { compile } from "html-to-text";

export const vectorizeData = async (url: string) => {
  const compiledConvert = compile({ wordwrap: false }); // returns (text: string) => string;

  const loader = new CheerioWebBaseLoader(url, {
    // extractor: compiledConvert,
    // maxDepth: 1,
  });
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkOverlap: 50,
    chunkSize: 1000,
  });

  const doc_chunk = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const pineconeIndex = pinecone.index("indexedurls");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: url,
  });
  await vectorStore.addDocuments(doc_chunk);
  return;
};
