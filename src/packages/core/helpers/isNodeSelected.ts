import { Editor } from "@tiptap/react";

export const isNodeSelected = (editor: Editor | null, ...nodes: string[]) => {
  return nodes.some((type) => editor?.isActive(type));
};
