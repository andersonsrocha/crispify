import React from "react";
import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";

import "tippy.js/animations/scale-subtle.css";

export const BaseBubbleMenu: React.FC<BubbleMenuProps> = ({ tippyOptions, ...rest }) => {
  return (
    <BubbleMenu
      className="bg-colorBgElevated shadow-xl shadow-black/70 border border-solid border-colorBorder rounded-md"
      tippyOptions={{
        moveTransition: "transform 0.3s ease-in-out",
        animation: "scale-subtle",
        duration: 300,
        ...tippyOptions,
      }}
      {...rest}
    />
  );
};
