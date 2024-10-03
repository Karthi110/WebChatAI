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
    //fetching url from indexedurls
    const isUrlAlreadyIndexed = await findIndexedUrl(url);

    // if found continue dont re-vectorize if not found vectorize
    if (!isUrlAlreadyIndexed.indexed) {
      // add url to the indexedurls
      await createIndexedUrl({ url: url });

      // reconstructing url for vector namespace
      const reconstructedUrl = url.replace("https://", "https:/");
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
export const upsertUser = async (data: newUser) => {
  try {
    // TODO:wire up with clerk id
    const newId = randomUUID();
    await db
      .insert(user)
      .values({
        name: "test",
        email: "fake@gmail.com",
        tier: "free",
      })
      .onConflictDoUpdate({ target: user.email, set: { id: newId } });
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
