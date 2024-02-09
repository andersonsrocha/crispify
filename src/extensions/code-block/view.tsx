import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Typography } from "antd";

const View: React.FC = () => {
  return (
    <NodeViewWrapper>
      <Typography.Paragraph>
        <pre className="!mt-0.5">
          <code>
            <NodeViewContent />
          </code>
        </pre>
      </Typography.Paragraph>
    </NodeViewWrapper>
  );
};

export { View };
