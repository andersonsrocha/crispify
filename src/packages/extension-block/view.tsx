import React from "react";
import { Dropdown } from "antd";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ClipboardIcon, CopyIcon, RemoveFormattingIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { message } from "@/packages/core";
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
    <NodeViewWrapper as="div" className="ny-group ny-relative ny-w-full ny-my-1">
      <div className="ny-grid ny-grid-cols-[72px_1fr_72px] ny-w-full">
        <div
          aria-label="left-menu"
          className={cls("ny-flex ny-gap-1 ny-opacity-0 ny-transition-opacity ny-duration-300 ny-ease-in-out", {
            "group-hover:ny-opacity-100": !open,
            "ny-opacity-100": open,
          })}
        >
          <Button onClick={onAddNewNode} icon="Plus" />
          <Dropdown
            open={open}
            className="ny-flex ny-justify-center ny-items-center"
            onOpenChange={setOpen}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "clear_formatting",
                  onClick: onUnsetNode,
                  label: (
                    <div className="ny-flex ny-items-center ny-gap-2">
                      <RemoveFormattingIcon size={14} />
                      <span>Clear formatting</span>
                    </div>
                  ),
                },
                {
                  key: "copy_clipboard",
                  onClick: onCopyNodeToClipboard,
                  label: (
                    <div className="ny-flex ny-items-center ny-gap-2">
                      <ClipboardIcon size={14} />
                      <span>Copy to clipboard</span>
                    </div>
                  ),
                },
                {
                  key: "duplicate",
                  onClick: onDuplicateNode,
                  label: (
                    <div className="ny-flex ny-items-center ny-gap-2">
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
                    <div className="ny-flex ny-items-center ny-gap-2">
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </div>
                  ),
                },
              ],
            }}
          >
            <Button icon="GripVertical" />
          </Dropdown>
          {/* Essa div corrige um bug ao tentar selecionar uma linha embaixo de um bloco customizado */}
          <div />
        </div>

        <NodeViewContent className="ny-w-full ny-px-2" />
      </div>
    </NodeViewWrapper>
  );
};

export { View };
