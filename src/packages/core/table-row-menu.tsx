import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { isRowGripSelected } from "@/packages/core/helpers";
import { TextMenu } from "@/packages/core";
import { v4 as uuid } from "uuid";

import { BaseBubbleMenu } from "./base-bubble-menu";

import { MenuProps, ShouldShowProps } from "@/types";

export const TableRowMenu: React.FC<MenuProps> = ({ appendTo }) => {
  const { editor } = useCurrentEditor();

  const shouldShow = React.useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from || !editor) {
        return false;
      }

      return isRowGripSelected({ editor, view, state, from });
    },
    [editor]
  );

  const onAddRowBefore = React.useCallback(() => {
    editor?.chain().focus().addRowBefore().run();
  }, [editor]);

  const onAddRowAfter = React.useCallback(() => {
    editor?.chain().focus().addRowAfter().run();
  }, [editor]);

  const onDeleteRow = React.useCallback(() => {
    editor?.chain().focus().deleteRow().run();
  }, [editor]);

  if (!editor) return;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`TableRowMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        placement: "left",
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => appendTo.current,
      }}
    >
      <TextMenu.Wrapper direction="vertical">
        <TextMenu.Button center={false} icon="ArrowUpToLine" onClick={onAddRowBefore}>
          Add row before
        </TextMenu.Button>
        <TextMenu.Button center={false} icon="ArrowDownToLine" onClick={onAddRowAfter}>
          Add row after
        </TextMenu.Button>
        <TextMenu.Button center={false} icon="Trash2" onClick={onDeleteRow}>
          Delete row
        </TextMenu.Button>
      </TextMenu.Wrapper>
    </BaseBubbleMenu>
  );
};

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;
