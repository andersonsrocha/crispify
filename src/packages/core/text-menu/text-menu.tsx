import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { isCustomNodeSelected, isTextSelected } from "@/packages/core/helpers";

import { MenuProps, ShouldShowProps } from "@/types";

import { Align } from "./components/align";
import { Color } from "./components/color";
import { ContentType } from "./components/content-type";
import { Divider } from "./components/divider";
import { Font } from "./components/font-family";
import { FontSize } from "./components/font-size";
import { Highlight } from "./components/highlight";
import { Link } from "./components/link";
import { Mark } from "./components/mark";
import { Wrapper } from "./components/wrapper";
import { Button } from "./components/button";
import { More } from "./components/more";
import { BaseBubbleMenu } from "../base-bubble-menu";

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoDivider = React.memo(Divider);
const MemoMark = React.memo(Mark);
const MemoAlign = React.memo(Align);
const MemoFont = React.memo(Font);
const MemoFontSize = React.memo(FontSize);
const MemoLink = React.memo(Link);
const MemoHighlight = React.memo(Highlight);
const MemoColor = React.memo(Color);
const MemoContentType = React.memo(ContentType);
const MemoWrapper = React.memo(Wrapper);
const MemoButton = React.memo(Button);
const MemoMore = React.memo(More);

type CompoundedComponent = React.FunctionComponent<React.PropsWithChildren<MenuProps>> & {
  Mark: typeof Mark;
  Align: typeof Align;
  Divider: typeof Divider;
  Font: typeof Font;
  FontSize: typeof FontSize;
  Link: typeof Link;
  Highlight: typeof Highlight;
  Color: typeof Color;
  ContentType: typeof ContentType;
  Wrapper: typeof Wrapper;
  Button: typeof Button;
  More: typeof More;
};

export const TextMenu: CompoundedComponent = ({ appendTo, children }) => {
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
      {children}
    </BaseBubbleMenu>
  );
};

TextMenu.Mark = MemoMark;
TextMenu.Align = MemoAlign;
TextMenu.Divider = MemoDivider;
TextMenu.Font = MemoFont;
TextMenu.FontSize = MemoFontSize;
TextMenu.Link = MemoLink;
TextMenu.Highlight = MemoHighlight;
TextMenu.Color = MemoColor;
TextMenu.ContentType = MemoContentType;
TextMenu.Wrapper = MemoWrapper;
TextMenu.Button = MemoButton;
TextMenu.More = MemoMore;
