import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { isCustomNodeSelected, isTextSelected } from "@/packages/core/helpers";
import { Action } from "@/components/ui/action";

import { MenuProps, ShouldShowProps } from "@/types";

import { BaseBubbleMenu } from "./base-bubble-menu";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoDivider = React.memo(Action.Divider);
const MemoMark = React.memo(Action.Mark);
const MemoAlign = React.memo(Action.Align);
const MemoFont = React.memo(Action.Font);
const MemoFontSize = React.memo(Action.FontSize);
const MemoLink = React.memo(Action.Link);
const MemoHighlight = React.memo(Action.Highlight);
const MemoColor = React.memo(Action.Color);
const MemoContentType = React.memo(Action.ContentType);
const MemoWrapper = React.memo(Action.Wrapper);
const MemoMore = React.memo(Action.More);

export const TextMenu: React.FC<MenuProps> = ({ appendTo }) => {
  const { editor } = useCurrentEditor();

  const shouldShow = React.useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view || !editor) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor });
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
        zIndex: 100,
        maxWidth: "auto",
        moveTransition: "transform 0.2s ease-in-out",
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => appendTo.current,
      }}
    >
      <MemoWrapper>
        <MemoContentType />
        <MemoFont />
        <MemoFontSize />

        <MemoDivider />

        <MemoMark type="bold" />
        <MemoMark type="italic" />
        <MemoMark type="underline" />
        <MemoMark type="strike" />
        <MemoMark type="code" />
        <MemoMark type="blockquote" />
        <MemoLink />
        <MemoHighlight />
        <MemoColor />

        <MemoMore>
          <MemoMark type="subscript" />
          <MemoMark type="superscript" />

          <MemoDivider />

          <MemoAlign type="left" />
          <MemoAlign type="center" />
          <MemoAlign type="right" />
          <MemoAlign type="justify" />
        </MemoMore>
      </MemoWrapper>
    </BaseBubbleMenu>
  );
};
