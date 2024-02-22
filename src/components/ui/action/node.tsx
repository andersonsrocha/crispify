import { Editor } from "@tiptap/react";

import { Button, ButtonProps } from "../button";
import { LucideIconNames } from "../icon";

import { CommandArgs, CommandNodeType, NodeType } from "@/types";

type NodeProps = { editor: Editor | null; type: NodeType };

const icons: Record<NodeType, LucideIconNames> = {
  codeBlock: "CodeSquare",
  blockquote: "Quote",
  columns: "Columns2",
  image: "Image",
  pdf: "Printer",
  redo: "Redo",
  rule: "Minus",
  undo: "Undo",
};

const tips: Record<NodeType, string> = {
  codeBlock: "Code block",
  blockquote: "Blockquote",
  columns: "Columns",
  image: "Image",
  pdf: "Export to PDF",
  redo: "Redo",
  rule: "Horizontal rule",
  undo: "Undo",
};

const shortcuts: Record<NodeType, ButtonProps["shortcut"]> = {
  codeBlock: ["Command", "Alt", "C"],
  blockquote: ["Command", "ArrowBigUp", "B"],
  columns: [],
  image: [],
  pdf: ["Command", "P"],
  redo: ["ArrowBigUp", "Command", "Z"],
  rule: [],
  undo: ["Command", "Z"],
};

export const Node: React.FC<NodeProps> = ({ editor, type }) => {
  const onExecCommand = <T extends NodeType>(node: T, ...args: CommandArgs<NodeType, CommandNodeType>) => {
    const commands: Partial<Record<NodeType, keyof CommandNodeType>> = {
      codeBlock: "toggleCodeBlock",
      blockquote: "toggleBlockquote",
      columns: "setColumns",
      image: "setImageUpload",
      pdf: "addToPDF",
      redo: "redo",
      rule: "setHorizontalRule",
      undo: "undo",
    };

    const command = commands[node];
    if (!command) return;

    const focus = editor?.chain().focus();
    const exec = focus?.[command];

    if (typeof exec === "function") exec(...args).run();
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
