import React from "react";
import { Dropdown } from "antd";
import { ChevronDown } from "lucide-react";

import { Button } from "./button";
import { TextMenuContext } from "..";

const FONT_SIZES = [
  { label: "Smaller", key: "12px" },
  { label: "Small", key: "14px" },
  { label: "Medium", key: "" },
  { label: "Large", key: "18px" },
  { label: "Extra Large", key: "24px" },
];

export const FontSize: React.FC = () => {
  const { editor } = React.useContext(TextMenuContext);

  const current = editor?.getAttributes("textStyle")?.fontSize || "";
  const value = FONT_SIZES.find((x) => x.key == current);

  if (!editor) return;

  const onApplyFontSize = (size: string) => {
    const newSize = FONT_SIZES.find((f) => f.key === size)?.key;

    if (!newSize || newSize.length === 0) {
      return editor.chain().focus().unsetFontSize().run();
    }

    editor.chain().focus().setFontSize(newSize).run();
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
          <span>{value?.label}</span>
          <ChevronDown size={14} />
        </div>
      </Button>
    </Dropdown>
  );
};
