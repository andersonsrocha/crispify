import { Editor } from "@tiptap/react";
import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

declare module "@notion/types" {
  export type MenuProps = {
    editor: Editor;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    appendTo?: React.RefObject<any>;
    shouldHide?: boolean;
  };

  export type ShouldShowProps = {
    editor?: CoreEditor;
    view: EditorView;
    state?: EditorState;
    oldState?: EditorState;
    from?: number;
    to?: number;
  };
}
