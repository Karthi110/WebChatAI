"use server";
import { db } from "./db";
import { chat, indexedUrls, newChat, newUrl } from "./schema";
import { and, eq } from "drizzle-orm";
import { pinecone, PINECONE_INDEX } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { compile } from "html-to-text";

// AI ACTION

export const vectorizeData = async (url: string, loaderType: string) => {
  try {
    const fullUrl = url + loaderType;
    //fetching url from indexedurls
    const isUrlAlreadyIndexed = await findIndexedUrl(fullUrl);

    // if found continue dont re-vectorize if not found vectorize
    if (!isUrlAlreadyIndexed.indexed) {
      // add url to the indexedurls
      await createIndexedUrl({ url: fullUrl });

      // reconstructing url for vector namespace
      const reconstructedUrl = fullUrl.replace("https://", "https:/");
      const compiledConvert = compile({ wordwrap: false }); // returns (text: string) => string;

      // Loading webbase document from url
      const loader = new RecursiveUrlLoader(url, {
        extractor: compiledConvert,

        // depth to indicate how the level of loading
        maxDepth: 0,
      });
      const docs = await loader.load();

      // splitting document for embedding
      const splitter = new RecursiveCharacterTextSplitter({
        chunkOverlap: 50,
        chunkSize: 300,
      });
      const doc_chunk = await splitter.splitDocuments(docs);

      // embeddings model
      const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
      });

      // Pinecone index
      const pineconeIndex = pinecone.index(PINECONE_INDEX);

      // store the vectorized data into Pinecone with namespace of reconstructed url
      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        namespace: reconstructedUrl,
      });

      // add document into the vector store
      await vectorStore.addDocuments(doc_chunk);
    }
    return;
  } catch (error) {
    return new Error("Failed to vectorize data");
  }
};

// USER ACTIONS

// INDEXED URL ACTIONS
export const createIndexedUrl = async (data: newUrl) => {
  try {
    await db.insert(indexedUrls).values({ url: data.url });
    return { message: "Url indexed!" };
  } catch (error) {
    return new Error("Failed to insert url");
  }
};

export const findIndexedUrl = async (url: string) => {
  const data = await db.query.indexedUrls.findFirst({
    where: eq(indexedUrls.url, url),
  });
  if (data) {
    return { indexed: true, data: data };
  }
  return { indexed: false, data: null };
};

//Messages
export const findMessages = async ({
  userId,
  urlId,
}: {
  userId: string;
  urlId: string;
}) => {
  const chats = await db.query.chat.findFirst({
    where: and(eq(chat?.userId, userId), eq(chat?.urlId, urlId)),
  });
  // make infinite query for message
  return "has";
};

export const createMessages = async (data: newChat) => {
  try {
    const existingMessages = await findMessages({
      urlId: data.urlId!,
      userId: data.userId,
    });
    if (existingMessages) {
      return { message: "chat room already exists" };
    }
    await db.insert(chat).values(data);
    return { message: "Chat room created" };
  } catch (error) {
    return new Error("Failed to create chat room");
  }
};
