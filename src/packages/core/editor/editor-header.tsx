import React from "react";
import { TextMenu } from "../text-menu";
import { useCurrentEditor } from "@tiptap/react";

export const EditorHeader: React.FC = () => {
  const { editor } = useCurrentEditor();

  const undo = React.useCallback(() => {
    editor?.chain().undo().run();
  }, [editor]);

  const redo = React.useCallback(() => {
    editor?.chain().redo().run();
  }, [editor]);

  const setTable = React.useCallback(() => {
    editor?.chain().selectParentNode().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run();
  }, [editor]);

  const setImage = React.useCallback(() => {
    editor?.chain().focus().setImageUpload().run();
  }, [editor]);

  const setColumns = React.useCallback(() => {
    editor
      ?.chain()
      .focus()
      .setColumns()
      .focus(editor.state.selection.head + 2)
      .run();
  }, [editor]);

  const setHorizontalRule = React.useCallback(() => {
    editor?.chain().focus().setHorizontalRule().run();
  }, [editor]);

  const setHardBreak = React.useCallback(() => {
    editor?.chain().focus().setHardBreak().run();
  }, [editor]);

  const setPageBreak = React.useCallback(() => {
    editor?.chain().focus().setPageBreak().run();
  }, [editor]);

  return (
    <div className="bg-colorBgElevated w-full border border-solid border-colorBorder rounded-t-md">
      <TextMenu.Wrapper>
        <TextMenu.Button icon="Undo" tip="Undo" onClick={undo} />
        <TextMenu.Button icon="Redo" tip="Redo" onClick={redo} />

        <TextMenu.Divider />

        <TextMenu.Mark type="bold" />
        <TextMenu.Mark type="italic" />
        <TextMenu.Mark type="underline" />
        <TextMenu.Mark type="strike" />
        <TextMenu.Mark type="blockquote" />
        <TextMenu.Mark type="code" />
        <TextMenu.Link />
        <TextMenu.Highlight />
        <TextMenu.Color />

        <TextMenu.Divider />

        <TextMenu.ContentType />
        <TextMenu.Font />
        <TextMenu.FontSize />

        <TextMenu.Divider />

        <TextMenu.Mark type="subscript" />
        <TextMenu.Mark type="superscript" />

        <TextMenu.Divider />

        <TextMenu.Align type="left" />
        <TextMenu.Align type="center" />
        <TextMenu.Align type="right" />
        <TextMenu.Align type="justify" />

        <TextMenu.Button icon="Table" onClick={setTable} tip="Table" disabled={!editor?.isActive("paragraph")} />
        <TextMenu.Button icon="Image" onClick={setImage} tip="Image" />
        <TextMenu.Button tip="Columns" icon="Columns2" onClick={setColumns} disabled={editor?.isActive("paragraph")} />

        <TextMenu.Divider />

        <TextMenu.Button
          icon="Minus"
          tip="Horizontal rule"
          onClick={setHorizontalRule}
          disabled={!editor?.isActive("paragraph")}
        />
        <TextMenu.Button
          icon="WrapText"
          tip="Hard break"
          onClick={setHardBreak}
          disabled={!editor?.isActive("paragraph")}
        />
        <TextMenu.Button
          icon="ScissorsLineDashed"
          tip="Page break"
          onClick={setPageBreak}
          disabled={!editor?.isActive("paragraph")}
        />
      </TextMenu.Wrapper>
    </div>
  );
};
