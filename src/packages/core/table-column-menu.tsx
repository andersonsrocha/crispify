import React from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { isColumnGripSelected } from "@/lib/util";
import { TextMenu } from "@/packages/core";
import { v4 as uuid } from "uuid";

import { MenuProps, ShouldShowProps } from "@/types";

export const TableColumnMenu: React.FC<MenuProps> = ({ editor, appendTo }) => {
  const shouldShow = React.useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false;
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 });
    },
    [editor]
  );

  const onAddColumnBefore = React.useCallback(() => {
    editor.chain().focus().addColumnBefore().run();
  }, [editor]);

  const onAddColumnAfter = React.useCallback(() => {
    editor.chain().focus().addColumnAfter().run();
  }, [editor]);

  const onDeleteColumn = React.useCallback(() => {
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

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
        appendTo: () => appendTo?.current,
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
