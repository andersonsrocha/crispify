import React from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { TextMenu } from "@/components";
import { ColumnLayout } from "@/extensions/columns";
import { getRenderContainer } from "@/lib/util";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { MenuProps } from "@notion/types";

export const ColumnsMenu: React.FC<MenuProps> = ({ editor, appendTo }) => {
  const getReferenceClientRect = React.useCallback(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = React.useCallback(() => {
    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = React.useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = React.useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = React.useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

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
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <TextMenu.Wrapper>
        <TextMenu.Button
          tip="Sidebar left"
          icon="PanelLeft"
          active={editor.isActive("columns", { layout: ColumnLayout.SidebarLeft })}
          onClick={onColumnLeft}
        />
        <TextMenu.Button
          tip="Two columns"
          icon="Columns2"
          active={editor.isActive("columns", { layout: ColumnLayout.TwoColumn })}
          onClick={onColumnTwo}
        />
        <TextMenu.Button
          tip="Sidebar right"
          icon="PanelRight"
          active={editor.isActive("columns", { layout: ColumnLayout.SidebarRight })}
          onClick={onColumnRight}
        />
      </TextMenu.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;
