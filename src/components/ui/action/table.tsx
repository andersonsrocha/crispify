import { useCurrentEditor } from "@tiptap/react";
import { isNodeSelected } from "@/packages/core/helpers";

import { Button } from "../button";

export const Table: React.FC = () => {
  const { editor } = useCurrentEditor();

  const onExecCommand = () => {
    editor?.chain().selectParentNode().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run();
  };

  return (
    <Button icon="Table" tip="Table" onClick={onExecCommand} disabled={isNodeSelected(editor, "columns", "image")} />
  );
};
