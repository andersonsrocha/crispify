import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { ColumnLayout } from "@/packages/extension-columns";
import { getRenderContainer } from "@/packages/core/helpers";
import { Action } from "@/components/ui/action";
import { Button } from "@/components/ui/button";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { BaseBubbleMenu } from "./base-bubble-menu";

import { MenuProps } from "@/types";

export const ColumnsMenu: React.FC<MenuProps> = ({ appendTo }) => {
  const { editor } = useCurrentEditor();

  const getReferenceClientRect = React.useCallback(() => {
    if (!editor) return new DOMRect(-1000, -1000, 0, 0);

    const renderContainer = getRenderContainer(editor, "columns");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = React.useCallback(() => {
    if (!editor) return false;

    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = React.useCallback(() => {
    editor?.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = React.useCallback(() => {
    editor?.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = React.useCallback(() => {
    editor?.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  const onDeleteColumns = React.useCallback(() => {
    editor?.chain().focus().deleteNode("columns").run();
  }, [editor]);

  if (!editor) return;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Action.Wrapper>
        <Button tip="Delete" icon="Trash2" onClick={onDeleteColumns} />

        <Action.Divider />

        <Button
          tip="Sidebar left"
          icon="PanelLeft"
          active={editor.isActive("columns", { layout: ColumnLayout.SidebarLeft })}
          onClick={onColumnLeft}
        />
        <Button
          tip="Two columns"
          icon="Columns2"
          active={editor.isActive("columns", { layout: ColumnLayout.TwoColumn })}
          onClick={onColumnTwo}
        />
        <Button
          tip="Sidebar right"
          icon="PanelRight"
          active={editor.isActive("columns", { layout: ColumnLayout.SidebarRight })}
          onClick={onColumnRight}
        />
      </Action.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;
