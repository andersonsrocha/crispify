import React from "react";
import { LucideIconNames, TextMenuContext } from "@/packages/core";

import { Button, ButtonProps } from "./button";

import { MarkType, CommandArgs, CommandMarkType } from "@/types";

type MarkProps = { type: Exclude<MarkType, "link" | "highlight" | "textStyle" | "highlight"> };

const icons: Record<MarkProps["type"], LucideIconNames> = {
  bold: "Bold",
  code: "Code",
  italic: "Italic",
  strike: "Strikethrough",
  subscript: "Subscript",
  superscript: "Superscript",
  underline: "Underline",
};

const tips: Record<MarkProps["type"], string> = {
  bold: "Bold",
  code: "Code",
  italic: "Italic",
  strike: "Strikethrough",
  subscript: "Subscript",
  superscript: "Superscript",
  underline: "Underline",
};

const shortcuts: Record<MarkProps["type"], ButtonProps["shortcut"]> = {
  bold: ["Command", "B"],
  italic: ["Command", "I"],
  code: ["Command", "E"],
  strike: ["Command", "X"],
  subscript: ["Command", "."],
  superscript: ["Command", ","],
  underline: ["Command", "U"],
};

export const Mark: React.FC<MarkProps> = ({ type }) => {
  const { editor } = React.useContext(TextMenuContext);

  if (!editor) return;

  const onExecCommand = <T extends MarkType>(mark: T, ...args: CommandArgs<MarkType, CommandMarkType>) => {
    const commands: Partial<Record<MarkType, keyof CommandMarkType>> = {
      bold: "toggleBold",
      code: "toggleCode",
      italic: "toggleItalic",
      strike: "toggleStrike",
      underline: "toggleUnderline",
      subscript: "toggleSubscript",
      superscript: "toggleSuperscript",
    };

    const command = commands[mark];
    if (!command) return;

    const focus = editor.chain().focus();
    focus[command](...args).run();
  };

  return (
    <Button
      tip={tips[type]}
      icon={icons[type]}
      shortcut={shortcuts[type]}
      active={editor.isActive(type)}
      onClick={() => onExecCommand(type)}
    />
  );
};
