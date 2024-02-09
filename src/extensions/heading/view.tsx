import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Typography } from "antd";

const View: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper>
      <Typography.Title level={node.attrs.level} style={{ ...node.attrs }}>
        <NodeViewContent />
      </Typography.Title>
    </NodeViewWrapper>
  );
};

export { View };
