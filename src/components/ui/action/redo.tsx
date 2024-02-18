import { Editor } from "@tiptap/react";

import { Button } from "../button";

export const Redo: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const onExecCommand = () => {
    editor?.chain().redo().run();
  };

  return <Button icon="Redo" tip="Redo" onClick={onExecCommand} disabled={!editor?.can().redo()} />;
};
