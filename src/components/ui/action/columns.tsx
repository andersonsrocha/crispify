import { Editor } from "@tiptap/react";
import { isNodeSelected } from "@/packages/core/helpers";

import { Button } from "../button";

export const Columns: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const onExecCommand = () => {
    editor
      ?.chain()
      .focus()
      .setColumns()
      .focus(editor.state.selection.head + 2)
      .run();
  };

  return <Button icon="Columns2" tip="Columns" onClick={onExecCommand} disabled={isNodeSelected(editor, "image")} />;
};
