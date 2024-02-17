import React from "react";
import { Dropdown } from "antd";
import { useCurrentEditor } from "@tiptap/react";
import { ChevronDown } from "lucide-react";

import { Button } from "../button";

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
  const { editor } = useCurrentEditor();

  const current = editor?.getAttributes("textStyle")?.fontFamily || "";
  const value = FONT_FAMILIES.find((x) => x.key == current);

  const onExecCommand = (font: string) => {
    const newFont = FONT_FAMILIES.find((x) => x.key === font)?.key;

    if (!newFont || newFont.length === 0) {
      return editor?.chain().focus().unsetFontFamily().run();
    }

    editor?.chain().focus().setFontFamily(newFont).run();
  };

  return (
    <Dropdown
      align={{ offset: [0, 12] }}
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
      <Button icon="Type">
        <ChevronDown size={14} />
      </Button>
    </Dropdown>
  );
};
