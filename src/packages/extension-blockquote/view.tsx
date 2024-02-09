import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { Typography } from "antd";

const View: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper>
      <Typography.Paragraph style={{ ...node.attrs }} editable={false}>
        <blockquote>
          <NodeViewContent />
        </blockquote>
      </Typography.Paragraph>
    </NodeViewWrapper>
  );
};

export { View };
