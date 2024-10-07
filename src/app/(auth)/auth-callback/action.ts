"use server";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { db } from "../../../drizzle/db";
import { user } from "../../../drizzle/schema";

export const getAuthStatus = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser?.id || !clerkUser.emailAddresses[0].emailAddress) {
    throw new Error("Invalid user data");
  }

  const existingUser = await db.query.user.findFirst({
    where: and(
      eq(user.email, clerkUser.emailAddresses[0].emailAddress),
      eq(user.id, clerkUser.id)
    ),
  });

  if (!existingUser) {
    await db.insert(user).values({
      id: clerkUser.id,
      name: clerkUser.fullName,
      imageUrl: clerkUser.imageUrl,
      tier: "Free",
      email: clerkUser.emailAddresses[0].emailAddress,
    });
  }

  return { success: true };
};
