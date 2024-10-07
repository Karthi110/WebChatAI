"use server";
import { db } from "./db";
import { and, desc, eq } from "drizzle-orm";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { compile } from "html-to-text";
import { currentUser } from "@clerk/nextjs/server";
import { getMetadataFromUrl, getRandomImage } from "../lib/utils";
import { pinecone, PINECONE_INDEX } from "../lib/pinecone";
import {
  chat,
  indexedUrls,
  message,
  newChat,
  newMessage,
  newUrl,
} from "./schema";

// AI ACTION

export const vectorizeData = async ({
  url,
  loaderType,
}: {
  url: string;
  loaderType: string;
}) => {
  try {
    //fetching url from indexedurls
    const fullUrl = url + loaderType;
    const isUrlAlreadyIndexed = await getUrl(fullUrl);
    const { userId } = await getCurrentUser();
    const metadata = await getMetadataFromUrl(url);
    const imageUrl = getRandomImage();

    // if found continue dont re-vectorize if not found vectorize
    if (!isUrlAlreadyIndexed) {
      // add url to the indexedurls
      await createIndexedUrl({ url: fullUrl });

      await createChat({
        userId,
        url: fullUrl,
        chatName: metadata?.title,
        chatImage: imageUrl,
      });

      const chatId = await getChatId({ url: fullUrl });

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
        namespace: chatId,
      });
      // add document into the vector store
      await vectorStore.addDocuments(doc_chunk);
      return { chatId: chatId };
    }

    await createChat({
      url: fullUrl,
      userId,
      chatName: metadata?.title,
      chatImage: imageUrl,
    });

    const chatId = await getChatId({ url: fullUrl });

    return { chatId: chatId };
  } catch (error) {
    return { chatId: undefined };
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

export const getChatId = async ({ url }: { url: string }) => {
  const { userId } = await getCurrentUser();

  const chats = await db.query.chat.findFirst({
    where: and(eq(chat.userId, userId), eq(chat.url, url)),
  });
  // make infinite query for message
  return chats?.id;
};

export const getChatById = async (chatId: string) => {
  const { userId } = await getCurrentUser();
  const data = await db.query.chat.findFirst({
    where: and(eq(chat.id, chatId), eq(chat.userId, userId)),
    with: { message: true },
  });
  return data;
};

export const createChat = async (data: newChat) => {
  try {
    const existingChat = await getChatId({
      url: data.url!,
    });
    if (!existingChat) {
      await db.insert(chat).values({
        userId: data.userId,
        url: data.url,
        chatImage: data.chatImage,
        chatName: data.chatName,
      });
    }
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

export const deleteChat = async ({ chatId }: { chatId: string }) => {
  try {
    const { userId } = await getCurrentUser();
    if (!userId) {
      throw new Error("user not found.");
    }
    const chatExisting = await getChatById(chatId);
    if (!chatExisting) {
      throw new Error("Chat does not exist.");
    }

    await db
      .delete(chat)
      .where(and(eq(chat.userId, userId), eq(chat.id, chatId)));
    return { success: true };
  } catch (error) {
    return new Error("Failed to delete chat");
  }
};

//Message

export const addMessage = async (data: newMessage) => {
  try {
    const chatExists = await getChatById(data.chatId!);
    if (!chatExists) {
      throw new Error("chat does not exist");
    }
    await db.insert(message).values(data);
    return { success: true };
  } catch (error) {
    return new Error("Failed to add message");
  }
};

export const getMessage = async ({ chatId }: { chatId: string }) => {
  const messages = await db
    .select()
    .from(message)
    .where(eq(message.chatId, chatId));
  return messages;
};

export const getMessageWithInfiniteQuery = async ({
  chatId,
  limit = 10,
  offset = 0,
}: {
  chatId: string;
  limit: number;
  offset: number;
}) => {
  const messages = await db
    .select()
    .from(message)
    .where(eq(message.chatId, chatId))
    .limit(limit) // Limit the number of messages to fetch
    .offset(offset) // Start from a specific point for pagination
    .orderBy(desc(message.createdAt));

  return messages;
};
