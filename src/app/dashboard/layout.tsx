import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div className="bg-white">{children}</div>;
};

export default layout;
