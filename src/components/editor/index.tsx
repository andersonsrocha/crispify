import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useExtensions } from "@/extensions/extension-kit";
import { ColumnsMenu, ImageMenu, TableColumnMenu, TableRowMenu, TextMenu } from "@/components";
import { content } from "@/lib/data/content";

export const Notion: React.FunctionComponent = () => {
  const menuContainerRef = React.useRef(null);

  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
        spellcheck: "false",
      },
    },
    extensions: useExtensions(),
    content: content,
  });

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      {editor && <ImageMenu editor={editor} appendTo={menuContainerRef} />}

      {editor && <ColumnsMenu editor={editor} appendTo={menuContainerRef} />}

      {editor && <TableRowMenu editor={editor} appendTo={menuContainerRef} />}

      {editor && <TableColumnMenu editor={editor} appendTo={menuContainerRef} />}

      <TextMenu editor={editor}>
        <TextMenu.Wrapper>
          <TextMenu.ContentType />
          <TextMenu.Font />
          <TextMenu.FontSize />

          <TextMenu.Divider />

          <TextMenu.Mark type="bold" />
          <TextMenu.Mark type="italic" />
          <TextMenu.Mark type="underline" />
          <TextMenu.Mark type="strike" />
          <TextMenu.Mark type="code" />
          <TextMenu.Link />
          <TextMenu.Highlight />
          <TextMenu.Color />

          <TextMenu.More>
            <TextMenu.Mark type="subscript" />
            <TextMenu.Mark type="superscript" />

            <TextMenu.Divider />

            <TextMenu.Align type="left" />
            <TextMenu.Align type="center" />
            <TextMenu.Align type="right" />
            <TextMenu.Align type="justify" />
          </TextMenu.More>
        </TextMenu.Wrapper>
      </TextMenu>

      <EditorContent editor={editor} className="max-w-3xl mx-auto w-full" />
    </div>
  );
};
