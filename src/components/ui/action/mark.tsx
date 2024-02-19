import React from "react";
import { Editor } from "@tiptap/react";

import { LucideIconNames } from "../icon";
import { Button, ButtonProps } from "../button";

import { MarkType, CommandArgs, CommandMarkType } from "@/types";

type Types = Exclude<MarkType, "link" | "highlight" | "textStyle" | "highlight"> | "blockquote";

type MarkProps = { editor: Editor | null; type: Types };

const icons: Record<Types, LucideIconNames> = {
  bold: "Bold",
  code: "Code",
  italic: "Italic",
  strike: "Strikethrough",
  subscript: "Subscript",
  superscript: "Superscript",
  underline: "Underline",
  blockquote: "Quote",
};

const tips: Record<Types, string> = {
  bold: "Bold",
  code: "Code",
  italic: "Italic",
  strike: "Strikethrough",
  subscript: "Subscript",
  superscript: "Superscript",
  underline: "Underline",
  blockquote: "Blockquote",
};

const shortcuts: Record<Types, ButtonProps["shortcut"]> = {
  bold: ["Command", "B"],
  italic: ["Command", "I"],
  code: ["Command", "E"],
  strike: ["Command", "X"],
  subscript: ["Command", "."],
  superscript: ["Command", ","],
  underline: ["Command", "U"],
  blockquote: ["Command", "ArrowBigUp", "B"],
};

export const Mark: React.FC<MarkProps> = ({ editor, type }) => {
  const onExecCommand = <T extends Types>(mark: T, ...args: CommandArgs<Types, CommandMarkType>) => {
    const commands: Partial<Record<Types, keyof CommandMarkType>> = {
      bold: "toggleBold",
      code: "toggleCode",
      italic: "toggleItalic",
      strike: "toggleStrike",
      underline: "toggleUnderline",
      subscript: "toggleSubscript",
      superscript: "toggleSuperscript",
      blockquote: "toggleBlockquote",
    };

    const command = commands[mark];
    if (!command) return;

    const focus = editor?.chain().focus();
    focus?.[command](...args).run();
  };

  return (
    <Button
      tip={tips[type]}
      icon={icons[type]}
      shortcut={shortcuts[type]}
      active={editor?.isActive(type)}
      onClick={() => onExecCommand(type)}
    />
  );
};
