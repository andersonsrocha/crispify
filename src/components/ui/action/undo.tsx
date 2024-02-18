import { Editor } from "@tiptap/react";

import { Button } from "../button";

export const Undo: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const onExecCommand = () => {
    editor?.chain().undo().run();
  };

  return <Button icon="Undo" tip="Undo" onClick={onExecCommand} disabled={!editor?.can().undo()} />;
};
