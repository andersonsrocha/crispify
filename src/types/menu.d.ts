import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { Editor } from "@tiptap/react";

export type MenuProps = {
  editor: Editor | null;
  appendTo: React.RefObject<Element>;
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
