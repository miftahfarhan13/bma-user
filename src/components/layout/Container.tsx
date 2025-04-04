import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="p-4 md:p-5">
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
}
