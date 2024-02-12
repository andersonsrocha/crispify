import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { isColumnGripSelected } from "@/packages/core/helpers";
import { TextMenu } from "@/packages/core";
import { v4 as uuid } from "uuid";

import { BaseBubbleMenu } from "./base-bubble-menu";

import { MenuProps, ShouldShowProps } from "@/types";

export const TableColumnMenu: React.FC<MenuProps> = ({ appendTo }) => {
  const { editor } = useCurrentEditor();

  const shouldShow = React.useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!(state && editor)) {
        return false;
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 });
    },
    [editor]
  );

  const onAddColumnBefore = React.useCallback(() => {
    editor?.chain().focus().addColumnBefore().run();
  }, [editor]);

  const onAddColumnAfter = React.useCallback(() => {
    editor?.chain().focus().addColumnAfter().run();
  }, [editor]);

  const onDeleteColumn = React.useCallback(() => {
    editor?.chain().focus().deleteColumn().run();
  }, [editor]);

  if (!editor) return;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`tableColumnMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => appendTo.current,
      }}
    >
      <TextMenu.Wrapper direction="vertical">
        <TextMenu.Button center={false} icon="ArrowLeftToLine" onClick={onAddColumnBefore}>
          Add column before
        </TextMenu.Button>
        <TextMenu.Button center={false} icon="ArrowRightToLine" onClick={onAddColumnAfter}>
          Add column after
        </TextMenu.Button>
        <TextMenu.Button center={false} icon="Trash2" onClick={onDeleteColumn}>
          Delete column
        </TextMenu.Button>
      </TextMenu.Wrapper>
    </BaseBubbleMenu>
  );
};

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;
