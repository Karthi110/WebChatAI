import { ReactNode } from "react";
import { cn } from "../lib/utils";

const MaxWidthWrapper = ({
  classname,
  children,
}: {
  classname?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        " mx-auto w-full max-w-screen-xl px-2.5 md:px-12",
        classname
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
