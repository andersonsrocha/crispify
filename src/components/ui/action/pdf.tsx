import React from "react";
import { Editor } from "@tiptap/react";

import { Button } from "../button";

export const Pdf: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const onExecCommand = async () => {
    editor?.chain().addToPDF();
  };

  return (
    <React.Fragment>
      <Button icon="Printer" tip="Export to PDF" onClick={onExecCommand} />
    </React.Fragment>
  );
};
