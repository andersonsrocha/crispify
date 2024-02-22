import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { Editor } from "@tiptap/react";

export * from "./command";
export * from "./extension";

/**
 * Represents the general options for Tiptap extensions.
 */
export interface GeneralOptions {
  /** Attributes HTML */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

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

export type Keyboard =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "."
  | ","
  | "Alt";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Generic = Record<string, any>;

export type MarkType =
  | "bold"
  | "code"
  | "highlight"
  | "italic"
  | "link"
  | "strike"
  | "subscript"
  | "superscript"
  | "textStyle"
  | "underline";

export type NodeType = "codeBlock" | "blockquote" | "redo" | "undo" | "columns" | "image" | "pdf" | "rule";

export type AlignType = "left" | "center" | "right" | "justify";
