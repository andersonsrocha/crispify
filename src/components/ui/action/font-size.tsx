import React from "react";
import { Dropdown } from "antd";
import { ALargeSmall, ChevronDown } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

import { Button } from "../button";

const FONT_SIZES = [
  { label: "Smaller", key: "12px" },
  { label: "Small", key: "14px" },
  { label: "Medium", key: "" },
  { label: "Large", key: "18px" },
  { label: "Extra Large", key: "24px" },
];

export const FontSize: React.FC = () => {
  const { editor } = useCurrentEditor();

  const current = editor?.getAttributes("textStyle")?.fontSize || "";
  const value = FONT_SIZES.find((x) => x.key == current);

  const onApplyFontSize = (size: string) => {
    const newSize = FONT_SIZES.find((f) => f.key === size)?.key;

    if (!newSize || newSize.length === 0) {
      return editor?.chain().focus().unsetFontSize().run();
    }

    editor?.chain().focus().setFontSize(newSize).run();
  };

  return (
    <Dropdown
      menu={{
        selectable: true,
        items: FONT_SIZES,
        selectedKeys: value && [value.key],
        onClick: ({ key }) => onApplyFontSize(key),
      }}
    >
      <Button>
        <div className="flex items-center gap-2">
          <ALargeSmall />
          <ChevronDown size={14} />
        </div>
      </Button>
    </Dropdown>
  );
};
