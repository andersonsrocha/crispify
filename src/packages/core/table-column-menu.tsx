import React from "react";
import { ColorPicker } from "antd";
import { isColumnGripSelected } from "@/packages/core/helpers";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";

import { BaseBubbleMenu } from "./base-bubble-menu";

import { MenuProps, ShouldShowProps } from "@/types";

export const TableColumnMenu: React.FC<MenuProps> = ({ appendTo, editor }) => {
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

  const onAddColorColumn = React.useCallback(
    (color: string) => {
      editor?.chain().focus().setCellAttribute("style", `background-color: ${color}`).run();
    },
    [editor]
  );

  const onUnsetColorColumn = React.useCallback(() => {
    editor?.chain().focus().setCellAttribute("style", "background-color: initial").run();
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
        zIndex: 900,
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        appendTo: () => appendTo.current!,
      }}
    >
      <Action.Wrapper direction="vertical">
        <Button center={false} icon="ArrowLeftToLine" onClick={onAddColumnBefore}>
          Add column before
        </Button>
        <Button center={false} icon="ArrowRightToLine" onClick={onAddColumnAfter}>
          Add column after
        </Button>
        <ColorPicker
          allowClear
          destroyTooltipOnHide
          value={editor?.getAttributes("textStyle")?.color || "#FFFFFF"}
          onChange={(value) => onAddColorColumn(value.toHexString())}
          onClear={onUnsetColorColumn}
        >
          <div className="ny-w-full">
            <Button block center={false} icon="Paintbrush2">
              Add color line
            </Button>
          </div>
        </ColorPicker>
        <Button center={false} icon="Trash2" onClick={onDeleteColumn}>
          Delete column
        </Button>
      </Action.Wrapper>
    </BaseBubbleMenu>
  );
};

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;
