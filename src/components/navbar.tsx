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

const Navbar = () => {
  return (
    <nav className="sticky w-full h-14 inset-x-0 top-0 z-30 transition-all grainy2">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between relative">
          <Link
            href="/"
            className=" flex z-40 font-[700] text-2xl tracking-wide text-secondary/80"
          >
            <span>WebChatAI</span>
          </Link>
          {/* TODO:mobile nav */}

          <aside className="flex gap-2 items-center">
            <ClerkLoading>
              <div className="w-16 h-8 bg-secondary rounded-md animate-pulse" />
              <div className="w-16 h-8 bg-secondary rounded-md animate-pulse" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <Button
                  asChild
                  variant="outline"
                  className="grainy2 text-secondary"
                >
                  <SignInButton
                    mode="modal"
                    fallbackRedirectUrl={"/auth-callback"}
                  />
                </Button>
                <Button variant="outline">
                  <SignUpButton
                    mode="modal"
                    fallbackRedirectUrl={"/auth-callback"}
                    
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
        <div className="wavy h-[3px] rounded-sm absolute bottom-0 inset-x-0 w-full" />
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
