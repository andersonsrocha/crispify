import { Editor } from "@tiptap/react";
import { isNodeSelected } from "@/packages/core/helpers";

import { Button } from "../button";

export const Image: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const onExecCommand = () => {
    editor?.chain().focus().setImageUpload().run();
  };

  return <Button icon="Image" tip="Image" onClick={onExecCommand} disabled={isNodeSelected(editor, "image")} />;
};
