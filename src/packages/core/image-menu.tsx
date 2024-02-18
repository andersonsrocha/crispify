import React from "react";
import { Slider } from "antd";
import { getRenderContainer } from "@/packages/core/helpers";
import { Button } from "@/components/ui/button";
import { Action } from "@/components/ui/action";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { BaseBubbleMenu } from "./base-bubble-menu";

import { MenuProps } from "@/types";

export const ImageMenu: React.FC<MenuProps> = ({ appendTo, editor }) => {
  const getReferenceClientRect = React.useCallback(() => {
    if (!editor) return new DOMRect(-1000, -1000, 0, 0);

    const renderContainer = getRenderContainer(editor, "node-image");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = React.useCallback(() => {
    if (!editor) return false;

    const isImage = editor.isActive("image");
    return isImage;
  }, [editor]);

  const onDeleteImage = React.useCallback(() => {
    editor?.chain().focus(undefined, { scrollIntoView: false }).deleteSelection().run();
  }, [editor]);

  const onAlignLeft = React.useCallback(() => {
    editor?.chain().focus(undefined, { scrollIntoView: false }).setImageAlign("left").run();
  }, [editor]);

  const onAlignCenter = React.useCallback(() => {
    editor?.chain().focus(undefined, { scrollIntoView: false }).setImageAlign("center").run();
  }, [editor]);

  const onAlignRight = React.useCallback(() => {
    editor?.chain().focus(undefined, { scrollIntoView: false }).setImageAlign("right").run();
  }, [editor]);

  const onWidthChanged = React.useCallback(
    (width: number) => {
      editor?.chain().focus(undefined, { scrollIntoView: false }).setImageWidth(width).run();
    },
    [editor]
  );

  if (!editor) return;

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
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
        <Button tip="Delete" icon="Trash2" onClick={onDeleteImage} />

        <Action.Divider />

        <Button
          tip="Align image left"
          icon="AlignHorizontalDistributeStart"
          active={editor.isActive("image", { align: "left" })}
          onClick={onAlignLeft}
        />
        <Button
          tip="Align image center"
          icon="AlignHorizontalDistributeCenter"
          active={editor.isActive("image", { align: "center" })}
          onClick={onAlignCenter}
        />
        <Button
          tip="Align image right"
          icon="AlignHorizontalDistributeEnd"
          active={editor.isActive("image", { align: "right" })}
          onClick={onAlignRight}
        />

        <Action.Divider />

        <Slider
          step={10}
          className="ny-w-20 ny-mr-3"
          onChange={onWidthChanged}
          tooltip={{ formatter: (v) => `${v}%` }}
          value={Number.parseInt(editor.getAttributes("image").width)}
        />
      </Action.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageMenu;
