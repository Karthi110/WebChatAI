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
import { currentUser } from "@clerk/nextjs/server";
import { getMetadataFromUrl } from "@/lib/utils";

// AI ACTION

export const vectorizeData = async (url: string, loaderType: string) => {
  try {
    //fetching url from indexedurls
    const fullUrl = url + loaderType;
    const isUrlAlreadyIndexed = await getUrl(fullUrl);

    // if found continue dont re-vectorize if not found vectorize
    if (!isUrlAlreadyIndexed) {
      // add url to the indexedurls
      await createIndexedUrl({ url: fullUrl });
      const { userId } = await getCurrentUser();
      const metadata = await getMetadataFromUrl(url);

      await createChat({
        url: fullUrl,
        userId,
        chatName: metadata?.title,
        chatImage: metadata?.twitterImage,
      });

      // reconstructing url for vector namespace
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
        namespace: fullUrl,
      });
      // add document into the vector store
      await vectorStore.addDocuments(doc_chunk);
    }
    return true;
  } catch (error) {
    return new Error("Failed to vectorize data");
  }
};

// USER ACTIONS

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  return { userId: user.id };
};

// INDEXED URL ACTIONS
export const createIndexedUrl = async (data: newUrl) => {
  try {
    await db.insert(indexedUrls).values({ url: data.url });
    return { message: "Url indexed!" };
  } catch (error) {
    return new Error("Failed to insert url");
  }
};

export const getUrl = async (url: string) => {
  const data = await db.query.indexedUrls.findFirst({
    where: eq(indexedUrls.url, url),
  });
  if (!data) {
    return false;
  }
  return true;
};

//Chat

export const getChat = async ({ url }: { url: string }) => {
  const { userId } = await getCurrentUser();

  const chats = await db.query.chat.findFirst({
    where: and(eq(chat?.userId, userId), eq(chat?.url, url)),
  });
  // make infinite query for message
  return chats;
};

export const createChat = async (data: newChat) => {
  try {
    const existingMessages = await getChat({
      url: data.url!,
    });
    if (existingMessages) {
      return { message: "chat room already exists" };
    }
    await db.insert(chat).values(data);
    return;
  } catch (error) {
    return new Error("Failed to create chat room");
  }
};

export const getChats = async () => {
  const { userId } = await getCurrentUser();
  const chats = await db.query.chat.findMany({
    where: eq(chat.userId, userId),
  });
  return chats;
};
