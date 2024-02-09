import React from "react";
import { Dropdown } from "antd";
import { ChevronDown } from "lucide-react";

import { TextMenuContext } from "..";
import { Button } from "./button";

const FONT_FAMILIES = [
  { label: "Inter", key: "" },
  { label: "Arial", key: "Arial" },
  { label: "Helvetica", key: "Helvetica" },
  { label: "Times New Roman", key: "Times" },
  { label: "Garamond", key: "Garamond" },
  { label: "Georgia", key: "Georgia" },
  { label: "Courier", key: "Courier" },
  { label: "Courier New", key: "Courier New" },
];

export const Font: React.FC = () => {
  const { editor } = React.useContext(TextMenuContext);

  const current = editor?.getAttributes("textStyle")?.fontFamily || "";
  const value = FONT_FAMILIES.find((x) => x.key == current);

  if (!editor) return;

  const onExecCommand = (font: string) => {
    const newFont = FONT_FAMILIES.find((x) => x.key === font)?.key;

    if (!newFont || newFont.length === 0) {
      return editor.chain().focus().unsetFontFamily().run();
    }

    editor.chain().focus().setFontFamily(newFont).run();
  };

  return (
    <Dropdown
      menu={{
        selectable: true,
        selectedKeys: value && [value.key],
        onClick: ({ key }) => onExecCommand(key),
        items: FONT_FAMILIES.map((font) => ({
          ...font,
          label: <span style={{ fontFamily: font.key }}>{font.label}</span>,
        })),
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
