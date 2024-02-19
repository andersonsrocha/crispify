import React from "react";
import { isCustomNodeSelected, isTextSelected } from "@/packages/core/helpers";
import { Action } from "@/components/ui/action";

import { MenuProps, ShouldShowProps } from "@/types";

import { BaseBubbleMenu } from "./base-bubble-menu";
import { isCellSelection } from "./helpers/_internal_/isCellSelection";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoDivider = React.memo(Action.Divider);
const MemoWrapper = React.memo(Action.Wrapper);
const MemoMore = React.memo(Action.More);

export const TextMenu: React.FC<MenuProps> = ({ appendTo, editor }) => {
  const shouldShow = React.useCallback(
    ({ state, view, from }: ShouldShowProps) => {
      if (!state || !view || !editor) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor }) && !isCellSelection(state.selection);
    },
    [editor]
  );

  if (!editor) return;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        zIndex: 900,
        maxWidth: "auto",
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => appendTo.current!,
      }}
    >
      <MemoWrapper>
        <Action.ContentType editor={editor} />
        <Action.Font editor={editor} />
        <Action.FontSize editor={editor} />

        <MemoDivider />

        <Action.Mark editor={editor} type="bold" />
        <Action.Mark editor={editor} type="italic" />
        <Action.Mark editor={editor} type="underline" />
        <Action.Mark editor={editor} type="strike" />
        <Action.Mark editor={editor} type="code" />
        <Action.Mark editor={editor} type="blockquote" />
        <Action.Link editor={editor} />
        <Action.Highlight editor={editor} />
        <Action.Color editor={editor} />

        <MemoMore>
          <Action.Mark editor={editor} type="subscript" />
          <Action.Mark editor={editor} type="superscript" />

          <MemoDivider />

          <Action.Align editor={editor} type="left" />
          <Action.Align editor={editor} type="center" />
          <Action.Align editor={editor} type="right" />
          <Action.Align editor={editor} type="justify" />
        </MemoMore>
      </MemoWrapper>
    </BaseBubbleMenu>
  );
};
