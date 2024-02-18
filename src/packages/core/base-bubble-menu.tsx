import React from "react";
import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";

import "tippy.js/animations/scale-subtle.css";

export const BaseBubbleMenu: React.FC<BubbleMenuProps> = ({ tippyOptions, ...rest }) => {
  return (
    <BubbleMenu
      className="ny-bg-colorBgElevated ny-shadow-xl ny-shadow-black/70 ny-border ny-border-solid ny-border-colorBorder ny-rounded-md"
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
