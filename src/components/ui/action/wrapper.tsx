import React from "react";
import cls from "classnames";

type WrapperProps = {
  direction?: "horizontal" | "vertical";
};

export const Wrapper: React.FC<React.PropsWithChildren<WrapperProps>> = ({ children, direction = "horizontal" }) => {
  return (
    <div
      className={cls("ny-overflow-hidden ny-p-1 ny-flex ny-gap-0.5 ny-flex-wrap", {
        "ny-items-center": direction === "horizontal",
        "ny-flex-col ny-justify-center": direction === "vertical",
      })}
    >
      {children}
    </div>
  );
};
