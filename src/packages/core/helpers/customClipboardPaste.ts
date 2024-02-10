import { EditorProps } from "@tiptap/pm/view";
import { findParentNode } from "@tiptap/react";

export const customClipboardPaste: EditorProps["handlePaste"] = (view, _, slice) => {
  if (slice.content.firstChild?.type.name === "image") {
    const { schema, tr } = view.state;
    const isColumnsOrTable = findParentNode((node) => ["columns", "table"].includes(node.type.name))(tr.selection);
    if (isColumnsOrTable) {
      return;
    }

    const node = schema.nodes.nodeblock.create({}, slice.content);
    const transaction = tr.replaceSelectionWith(node);
    view.dispatch(transaction);

    return true;
  }

  return;
};
