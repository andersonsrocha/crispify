import { Editor } from "@tiptap/react";

import { Button } from "../button";

export const Rule: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const onExecCommand = () => {
    editor?.chain().focus().setHorizontalRule().run();
  };

  return (
    <Button icon="Minus" tip="Horizontal rule" onClick={onExecCommand} disabled={!editor?.isActive("paragraph")} />
  );
};
