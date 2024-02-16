import { useCurrentEditor } from "@tiptap/react";

import { Button } from "../button";

export const Redo: React.FC = () => {
  const { editor } = useCurrentEditor();

  const onExecCommand = () => {
    editor?.chain().redo().run();
  };

  return <Button icon="Redo" tip="Redo" onClick={onExecCommand} disabled={!editor?.can().redo()} />;
};
