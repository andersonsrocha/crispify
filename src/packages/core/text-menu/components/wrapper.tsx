import React from "react";
import cls from "classnames";

type WrapperProps = {
  direction?: "horizontal" | "vertical";
};

export const Wrapper: React.FC<React.PropsWithChildren<WrapperProps>> = ({ children, direction = "horizontal" }) => {
  return (
    <div
      className={cls(
        "bg-colorBgElevated shadow-xl shadow-black/20 border border-colorBorder rounded-lg overflow-hidden p-1 flex gap-0.5",
        { "items-center": direction === "horizontal", "flex-col justify-center": direction === "vertical" }
      )}
    >
      {children}
    </div>
  );
};
