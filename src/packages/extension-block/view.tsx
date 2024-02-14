import React from "react";
import { Dropdown } from "antd";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ClipboardIcon, CopyIcon, RemoveFormattingIcon, Trash2 } from "lucide-react";
import { TextMenu, message } from "@/packages/core";
import cls from "classnames";

const View: React.FC<NodeViewProps> = ({ node, editor, getPos, deleteNode }) => {
  const [open, setOpen] = React.useState(false);

  const onAddNewNode = React.useCallback(() => {
    const pos = getPos() + node.nodeSize;

    editor
      .chain()
      .insertContentAt(pos, {
        type: "nodeblock",
        content: [{ type: "paragraph", content: [{ type: "text", text: "/" }] }],
      })
      .focus(pos + 3)
      .run();
  }, [editor, getPos, node.nodeSize]);

  const onUnsetNode = React.useCallback(() => {
    if (["columns", "image", "imageUpload"].includes(node.type.name)) return;

    editor.chain().setNodeSelection(getPos()).unsetAllMarks().run();
  }, [editor, getPos, node]);

  const onCopyNodeToClipboard = React.useCallback(() => {
    editor.chain().setNodeSelection(getPos()).run();
    navigator.clipboard.writeText(node.textContent);

    message.success("Copied to clipboard.");
  }, [editor, getPos, node.textContent]);

  const onDuplicateNode = React.useCallback(() => {
    editor
      .chain()
      .insertContentAt(getPos() + (node.nodeSize || 0), node.toJSON())
      .run();
  }, [editor, getPos, node]);

  return (
    <NodeViewWrapper as="div" className="group mx-auto w-full max-w-3xl my-1">
      <div className="flex gap-2">
        <div
          aria-label="left-menu"
          className={cls("flex gap-1 opacity-0 transition-opacity duration-300 ease-in-out", {
            "group-hover:opacity-100": !open,
            "opacity-100": open,
          })}
        >
          <TextMenu.Button onClick={onAddNewNode} icon="Plus" />
          <Dropdown
            open={open}
            className="flex justify-center items-center"
            onOpenChange={setOpen}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "clear_formatting",
                  onClick: onUnsetNode,
                  label: (
                    <div className="flex items-center gap-2">
                      <RemoveFormattingIcon size={14} />
                      <span>Clear formatting</span>
                    </div>
                  ),
                },
                {
                  key: "copy_clipboard",
                  onClick: onCopyNodeToClipboard,
                  label: (
                    <div className="flex items-center gap-2">
                      <ClipboardIcon size={14} />
                      <span>Copy to clipboard</span>
                    </div>
                  ),
                },
                {
                  key: "duplicate",
                  onClick: onDuplicateNode,
                  label: (
                    <div className="flex items-center gap-2">
                      <CopyIcon size={14} />
                      <span>Duplicate</span>
                    </div>
                  ),
                },
                {
                  type: "divider",
                },
                {
                  key: "delete",
                  danger: true,
                  onClick: deleteNode,
                  label: (
                    <div className="flex items-center gap-2">
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </div>
                  ),
                },
              ],
            }}
          >
            <TextMenu.Button icon="GripVertical" />
          </Dropdown>
          {/* Essa div corrige um bug ao tentar selecionar uma linha embaixo de um bloco customizado */}
          <div />
        </div>

        <NodeViewContent className="w-full" />
      </div>
    </NodeViewWrapper>
  );
};

export { View };
