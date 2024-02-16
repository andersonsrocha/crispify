import React from "react";
import { Action } from "@/components/ui/action";
import { FullScreenProps } from "@/components/ui/action/full-screen";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoDivider = React.memo(Action.Divider);
const MemoMark = React.memo(Action.Mark);
const MemoUndo = React.memo(Action.Undo);
const MemoRedo = React.memo(Action.Redo);
const MemoAlign = React.memo(Action.Align);
const MemoFont = React.memo(Action.Font);
const MemoFontSize = React.memo(Action.FontSize);
const MemoLink = React.memo(Action.Link);
const MemoHighlight = React.memo(Action.Highlight);
const MemoColor = React.memo(Action.Color);
const MemoBreak = React.memo(Action.Break);
const MemoImage = React.memo(Action.Image);
const MemoColumns = React.memo(Action.Columns);
const MemoTable = React.memo(Action.Table);
const MemoRule = React.memo(Action.Rule);
const MemoContentType = React.memo(Action.ContentType);
const MemoWrapper = React.memo(Action.Wrapper);
const MemoFullScreen = React.memo(Action.FullScreen);
const MemoPdf = React.memo(Action.Pdf);

export interface EditorHeaderProps {
  /**
   * Options for defining fullscreen mode.
   */
  fullscreen: FullScreenProps;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({ fullscreen }) => {
  return (
    <div id="editor_header" className="bg-colorBgElevated w-full border border-solid border-colorBorder rounded-t-md">
      <MemoWrapper>
        <MemoMark type="bold" />
        <MemoMark type="italic" />
        <MemoMark type="underline" />
        <MemoMark type="strike" />
        <MemoMark type="blockquote" />
        <MemoMark type="code" />
        <MemoLink />
        <MemoHighlight />
        <MemoColor />

        <MemoDivider />

        <MemoContentType />
        <MemoFont />
        <MemoFontSize />

        <Action.Space />

        <MemoUndo />
        <MemoRedo />
      </MemoWrapper>
      <MemoWrapper>
        <MemoMark type="subscript" />
        <MemoMark type="superscript" />

        <MemoDivider />

        <MemoAlign type="left" />
        <MemoAlign type="center" />
        <MemoAlign type="right" />
        <MemoAlign type="justify" />

        <MemoDivider />

        <MemoTable />
        <MemoImage />
        <MemoColumns />

        <MemoDivider />

        <MemoRule />
        <MemoBreak type="hard" />
        <MemoBreak type="page" />

        <MemoDivider />

        <MemoPdf />
        <MemoFullScreen {...fullscreen} />
      </MemoWrapper>
    </div>
  );
};
