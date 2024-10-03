"use server";
import { randomUUID } from "crypto";
import { db } from "./db";
import { indexedUrls, newUrl, newUser, user } from "./schema";
import { eq } from "drizzle-orm";
import { pinecone, PINECONE_INDEX } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { compile } from "html-to-text";

// AI ACTION

export const vectorizeData = async (url: string) => {
  try {
    const isUrlAlreadyIndexed = await findIndexedUrl(url);
    if (!isUrlAlreadyIndexed.indexed) {
      await createIndexedUrl({ url: url });
      const compiledConvert = compile({ wordwrap: false }); // returns (text: string) => string;

      const loader = new RecursiveUrlLoader(url, {
        extractor: compiledConvert,
        maxDepth: 0,
      });

      const docs = await loader.load();
      const splitter = new RecursiveCharacterTextSplitter({
        chunkOverlap: 50,
        chunkSize: 300,
      });

      const doc_chunk = await splitter.splitDocuments(docs);

      const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
      });

      const pineconeIndex = pinecone.index(PINECONE_INDEX);

      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        namespace: url,
      });
      await vectorStore.addDocuments(doc_chunk);
    }
    return;
  } catch (error) {
    return new Error("Failed to vectorize data");
  }
};

// USER ACTIONS
export const upsertUser = async (data: newUser) => {
  try {
    // TODO:wire up with clerk id
    const newId = randomUUID();
    const d = await db
      .insert(user)
      .values({
        name: "test",
        email: "fake@gmail.com",
        tier: "free",
      })
      .onConflictDoUpdate({ target: user.email, set: { id: newId } });
    console.log(data);
    return { message: "User Created!" };
  } catch (error) {
    return new Error("Failed to create User.");
  }
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

export const findIndexedUrl = async (url: string) => {
  const data = await db.query.indexedUrls.findFirst({
    where: eq(indexedUrls.url, url),
  });
  if (data) {
    return { indexed: true, data: data };
  }
  return { indexed: false, data: null };
};
