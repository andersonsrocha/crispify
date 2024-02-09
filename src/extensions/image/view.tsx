import React from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export const View: React.FC<NodeViewProps> = ({ editor, getPos, node }) => {
  const { align, src, width } = node.attrs;

  const onClick = React.useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  const styles: React.CSSProperties = {
    marginLeft: align === "left" ? 0 : "auto",
    marginRight: align === "right" ? 0 : "auto",
    marginBottom: "1rem",
  };

  return (
    <NodeViewWrapper>
      <div style={{ width: width, ...styles }}>
        <div contentEditable={false}>
          <img style={{ width: "100%" }} src={src} alt="" onClick={onClick} />
        </div>
      </div>
    </NodeViewWrapper>
  );
};
