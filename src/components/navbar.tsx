import React from "react";
import { Button, buttonVariants } from "./ui/button";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

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

          <aside>
            <ul className=" flex items-center gap-4">
              {/* TODO:show tier only when logged in  */}
              <li
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                })}
              >
                tier:free
              </li>
              {/* TODO:if has paid subscription dont show pricing  */}
              <li>
                <Link
                  href="/"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Button size="sm">Login</Button>
              </li>
              <li>
                <Button variant="outline" size="sm">
                  Signup
                </Button>
              </li>
            </ul>
          </aside>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
