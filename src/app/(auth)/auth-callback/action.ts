"use server";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getAuthStatus = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser?.id || !clerkUser.emailAddresses[0].emailAddress) {
    throw new Error("Invalid user data");
  }

  const existingUser = await db.query.user.findFirst({
    where: eq(user.id, clerkUser.id),
  });

  if (!existingUser) {
    await db.insert(user).values({
      id: clerkUser.id,
      name: clerkUser.fullName,
      imageUrl: clerkUser.imageUrl,
      tier: "free",
      email: clerkUser.emailAddresses[0].emailAddress,
    });
  }

  return { success: true };
};
