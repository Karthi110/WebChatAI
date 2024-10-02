"use server";

import { randomUUID } from "crypto";
import { db } from "./db";
import { user } from "./schema";

export const upsertUser = async () => {
  const newId = randomUUID();
  const data = await db
    .insert(user)
    .values({
      name: "test",
      email: "fake@gmail.com",
      tier: "free",
    })
    .onConflictDoUpdate({ target: user.email, set: { id: newId } });
  console.log(data);
  return;
};
