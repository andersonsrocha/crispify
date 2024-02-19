import React from "react";
import { getRenderContainer, isColumnGripSelected, isRowGripSelected } from "@/packages/core/helpers";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { sticky } from "tippy.js";

import { BaseBubbleMenu } from "./base-bubble-menu";

import { MenuProps, ShouldShowProps } from "@/types";

export const TableMenu: React.FC<MenuProps> = ({ appendTo, editor }) => {
  const getReferenceClientRect = React.useCallback(() => {
    if (!editor) return new DOMRect(-1000, -1000, 0, 0);

    const renderContainer = getRenderContainer(editor, "table");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = React.useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from || !editor) {
        return false;
      }

      return (
        !(
          isRowGripSelected({ editor, view, state, from }) ||
          isColumnGripSelected({ editor, view, state, from: from || 0 })
        ) && editor.isActive("table")
      );
    },
    [editor]
  );

  const onToggleBorder = React.useCallback(() => {
    if (editor?.isActive("table", { border: "1" })) {
      return editor?.chain().focus().unsetTableBorder().run();
    }

    editor?.chain().focus().setTableBorder().run();
  }, [editor]);

  const onMergeCells = React.useCallback(() => {
    editor?.chain().focus().mergeOrSplit().run();
  }, [editor]);

  const onDeleteTable = React.useCallback(() => {
    editor?.chain().focus().deleteTable().run();
  }, [editor]);

  if (!editor) return;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`tableMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        placement: "bottom",
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo.current!,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Action.Wrapper>
        <Button tip="Delete" icon="Trash2" onClick={onDeleteTable} />

        <Action.Divider />

        <Button
          tip="Table border"
          icon="SquareDashedBottom"
          onClick={onToggleBorder}
          active={editor.isActive("table", { border: "1" })}
        />
        <Button icon="Table2" tip="Merge cells" onClick={onMergeCells} />
      </Action.Wrapper>
    </BaseBubbleMenu>
  );
};

TableMenu.displayName = "TableMenu";

export default TableMenu;
