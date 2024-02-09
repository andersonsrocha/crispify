import React from "react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { Upload } from "antd";

import { RcFile } from "antd/es/upload";

const View: React.FC<NodeViewProps> = ({ getPos, editor }) => {
  const onUpload = React.useCallback(
    async (file: RcFile) => {
      if (!file) return "";

      const url = await new Promise<string>((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => res(String(reader.result));
        reader.onerror = rej;
      });

      if (url) {
        editor.chain().setImage({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run();
      }

      return url;
    },
    [getPos, editor]
  );

  return (
    <NodeViewWrapper as="div" data-type="imageUpload">
      <div data-drag-handle>
        <Upload.Dragger listType="text" maxCount={1} action={onUpload} accept="image/*">
          <div className="flex flex-col items-center gap-2 p-6">
            <ImageIcon />
            Drag and drop or upload an file
          </div>
        </Upload.Dragger>
      </div>
    </NodeViewWrapper>
  );
};

export { View };
