import React from "react";
import cls from "classnames";

type WrapperProps = {
  direction?: "horizontal" | "vertical";
};

export const Wrapper: React.FC<React.PropsWithChildren<WrapperProps>> = ({ children, direction = "horizontal" }) => {
  return (
    <div
      className={cls("overflow-hidden p-1 flex gap-0.5 flex-wrap", {
        "items-center": direction === "horizontal",
        "flex-col justify-center": direction === "vertical",
      })}
    >
      {children}
    </div>
  );
};
