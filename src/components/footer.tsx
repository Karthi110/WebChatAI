import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import CustomSeparator from "./wave-seperator";

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <CustomSeparator classname="my-4 mt-20" />
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-14 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
            })}
          >
            WebChatAI
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WebChatAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
