import React from "react";
import { Button, buttonVariants } from "./ui/button";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className=" sticky h-14 inset-x-0 top-0 z-30 border-b  border-gray-200 bg-white/75 backdrop-blur-lg transition-all shadow-sm">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className=" flex z-40 font-[700] text-2xl text-primary"
          >
            <span>WebChatAI.</span>
          </Link>
          {/* TODO:mobile nav */}

          <aside className="flex gap-2 items-center">
            <ClerkLoading>
              <div className="w-16 h-8 bg-secondary rounded-md animate-pulse" />
              <div className="w-16 h-8 bg-secondary rounded-md animate-pulse" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <Button asChild size="sm">
                  <SignInButton
                    mode="modal"
                    fallbackRedirectUrl={"/dashboard"}
                    signUpFallbackRedirectUrl={"/auth-callback"}
                  />
                </Button>
                <Button variant="outline" size="sm">
                  <SignUpButton
                    mode="modal"
                    signInFallbackRedirectUrl={"/auth-callback"}
                  />
                </Button>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className={buttonVariants({ variant: "link" })}
                >
                  Dashboard
                </Link>
                <UserButton />
              </SignedIn>
            </ClerkLoaded>
          </aside>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
