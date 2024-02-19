import React from "react";
import { Editor } from "@tiptap/react";
import { Action } from "@/components/ui/action";
import { FullScreenProps } from "@/components/ui/action/full-screen";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoDivider = React.memo(Action.Divider);
const MemoWrapper = React.memo(Action.Wrapper);
const MemoPdf = React.memo(Action.Pdf);
const MemoFullScreen = React.memo(Action.FullScreen);

export interface EditorHeaderProps {
  editor: Editor | null;
  /**
   * Options for defining fullscreen mode.
   */
  fullscreen: FullScreenProps;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({ editor, fullscreen }) => {
  return (
    <div className="ny-editor__header ny-bg-colorBgElevated ny-w-full ny-border ny-border-solid ny-border-colorBorder ny-rounded-t-md">
      <MemoWrapper>
        <Action.Mark editor={editor} type="bold" />
        <Action.Mark editor={editor} type="italic" />
        <Action.Mark editor={editor} type="underline" />
        <Action.Mark editor={editor} type="strike" />
        <Action.Mark editor={editor} type="blockquote" />
        <Action.Mark editor={editor} type="code" />
        <Action.Link editor={editor} />
        <Action.Highlight editor={editor} />
        <Action.Color editor={editor} />

        <MemoDivider />

        <Action.ContentType editor={editor} />
        <Action.Font editor={editor} />
        <Action.FontSize editor={editor} />

        <Action.Space />

        <Action.Undo editor={editor} />
        <Action.Redo editor={editor} />
      </MemoWrapper>
      <MemoWrapper>
        <Action.Mark editor={editor} type="subscript" />
        <Action.Mark editor={editor} type="superscript" />

        <MemoDivider />

        <Action.Align editor={editor} type="left" />
        <Action.Align editor={editor} type="center" />
        <Action.Align editor={editor} type="right" />
        <Action.Align editor={editor} type="justify" />

        <MemoDivider />

        <Action.Table editor={editor} />
        <Action.Image editor={editor} />
        <Action.Columns editor={editor} />

        <MemoDivider />

        <Action.Rule editor={editor} />
        <Action.Break editor={editor} type="hard" />
        <Action.Break editor={editor} type="page" />

        <MemoDivider />

        <MemoPdf editor={editor} />
        <MemoFullScreen {...fullscreen} />
      </MemoWrapper>
    </div>
  );
};
