import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { LucideIconNames } from "@/packages/core";

import { Button, ButtonProps } from "./button";

import { AlignType } from "@/types";

type MarkProps = { type: AlignType };

const icons: Record<AlignType, LucideIconNames> = {
  center: "AlignCenter",
  justify: "AlignJustify",
  left: "AlignLeft",
  right: "AlignRight",
};

const tips: Record<AlignType, string> = {
  center: "Align center",
  justify: "Justify",
  left: "Align left",
  right: "Align right",
};

const shortcuts: Record<AlignType, ButtonProps["shortcut"]> = {
  center: ["ArrowBigUp", "Command", "E"],
  justify: ["ArrowBigUp", "Command", "J"],
  left: ["ArrowBigUp", "Command", "L"],
  right: ["ArrowBigUp", "Command", "R"],
};

export const Align: React.FC<MarkProps> = ({ type }) => {
  const { editor } = useCurrentEditor();

  const onExecCommand = <T extends AlignType>(align: T) => {
    editor?.chain().focus().setTextAlign(align).run();
  };

  return (
    <Button
      tip={tips[type]}
      icon={icons[type]}
      shortcut={shortcuts[type]}
      onClick={() => onExecCommand(type)}
      active={editor?.isActive({ textAlign: type })}
    />
  );
};
