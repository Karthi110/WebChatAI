import React from "react";
import { cn } from "@/lib/utils";

export default function CustomSeparator({ classname }: { classname?: string }) {
  return (
    <div className={cn("w-full my-8", classname)}>
      <div className="w-full h-1 squiggly"></div>
    </div>
  );
}
