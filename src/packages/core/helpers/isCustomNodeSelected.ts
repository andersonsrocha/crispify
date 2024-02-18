import { Editor } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";
import { CodeBlock } from "@/packages/extension-code-block";
import { Image } from "@/packages/extension-image";
import { ImageUpload } from "@/packages/extension-image-upload";

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn = container && container.querySelector && container.querySelector("a.grip-column.selected");
  const gripRow = container && container.querySelector && container.querySelector("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export function isCustomNodeSelected(editor: Editor, node: HTMLElement): boolean;
export function isCustomNodeSelected(editor: Editor, node: Node): boolean;
export function isCustomNodeSelected(editor: Editor, node: HTMLElement | Node) {
  const customNodes = [CodeBlock.name, ImageUpload.name, Image.name];

  return (
    customNodes.some((type) => editor.isActive(type)) || (node instanceof HTMLElement && isTableGripSelected(node))
  );
}

export default isCustomNodeSelected;
