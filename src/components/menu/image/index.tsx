import React from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { TextMenu } from "@/components";
import { getRenderContainer } from "@/lib/util";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { MenuProps } from "@notion/types";
import { Slider } from "antd";

export const ImageMenu: React.FC<MenuProps> = ({ editor, appendTo }) => {
  const getReferenceClientRect = React.useCallback(() => {
    const renderContainer = getRenderContainer(editor, "node-image");
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = React.useCallback(() => {
    const isImage = editor.isActive("image");
    return isImage;
  }, [editor]);

  const onDeleteImage = React.useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).deleteSelection().run();
  }, [editor]);

  const onAlignLeft = React.useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageAlign("left").run();
  }, [editor]);

  const onAlignCenter = React.useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageAlign("center").run();
  }, [editor]);

  const onAlignRight = React.useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageAlign("right").run();
  }, [editor]);

  const onWidthChanged = React.useCallback(
    (width: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).setImageWidth(width).run();
    },
    [editor]
  );

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        maxWidth: "auto",
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
        <TextMenu.Button tip="Delete" icon="Trash2" onClick={onDeleteImage} />

        <TextMenu.Divider />

        <TextMenu.Button
          tip="Align image left"
          icon="AlignHorizontalDistributeStart"
          active={editor.isActive("image", { align: "left" })}
          onClick={onAlignLeft}
        />
        <TextMenu.Button
          tip="Align image center"
          icon="AlignHorizontalDistributeCenter"
          active={editor.isActive("image", { align: "center" })}
          onClick={onAlignCenter}
        />
        <TextMenu.Button
          tip="Align image right"
          icon="AlignHorizontalDistributeEnd"
          active={editor.isActive("image", { align: "right" })}
          onClick={onAlignRight}
        />

        <TextMenu.Divider />

        <Slider
          step={10}
          className="w-20 mr-3"
          onChange={onWidthChanged}
          tooltip={{ formatter: (v) => `${v}%` }}
          value={Number.parseInt(editor.getAttributes("image").width)}
        />
      </TextMenu.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageMenu;
