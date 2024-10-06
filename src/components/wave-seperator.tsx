import React from "react";
import { cn } from "@/lib/utils";

export default function CustomSeparator({ classname }: { classname?: string }) {
  return (
    <div className="my-12 w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="20" // Reduced height
        viewBox="0 0 400 20" // Adjusted viewBox to increase horizontal space without stretching
      >
        <path
          d="M0,10 Q20,0 40,10 T80,10 T120,10 T160,10 T200,10 T240,10 T280,10 T320,10 T360,10 T400,10"
          fill="transparent"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
