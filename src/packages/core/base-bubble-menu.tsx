import React from "react";
import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";

export const BaseBubbleMenu: React.FC<BubbleMenuProps> = (props) => {
  return (
    <BubbleMenu
      className="bg-colorBgElevated shadow-xl shadow-black/20 border border-colorBorder rounded-md"
      {...props}
    />
  );
};
