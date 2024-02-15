import { useCurrentEditor } from "@tiptap/react";

import { Button } from "../button";

export const Rule: React.FC = () => {
  const { editor } = useCurrentEditor();

  const onExecCommand = () => {
    editor?.chain().focus().setHorizontalRule().run();
  };

  return (
    <Button icon="Minus" tip="Horizontal rule" onClick={onExecCommand} disabled={!editor?.isActive("paragraph")} />
  );
};
