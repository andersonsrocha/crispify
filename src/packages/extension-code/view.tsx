import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Typography } from "antd";

const View: React.FC = () => {
  return (
    <NodeViewWrapper>
      <Typography.Text code>
        <NodeViewContent />
      </Typography.Text>
    </NodeViewWrapper>
  );
};

export { View };
