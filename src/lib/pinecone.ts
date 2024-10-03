import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

export const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_KEY!,
});

export const PINECONE_INDEX = "indexedurls" as const;
