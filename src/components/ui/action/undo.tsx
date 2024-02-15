import { useCurrentEditor } from "@tiptap/react";

import { Button } from "../button";

export const Undo: React.FC = () => {
  const { editor } = useCurrentEditor();

  const onExecCommand = () => {
    editor?.chain().undo().run();
  };

  return <Button icon="Undo" tip="Undo" onClick={onExecCommand} />;
};
