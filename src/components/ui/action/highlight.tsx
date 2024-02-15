import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { ColorPicker } from "antd";

import { Button } from "../button";

export const Highlight: React.FC = () => {
  const { editor } = useCurrentEditor();

  const current = editor?.getAttributes("highlight")?.color;
  const [color, setColor] = React.useState(current);

  React.useEffect(() => {
    setColor(current || "#FFFFFF");
  }, [current]);

  const onExecCommand = (color: string) => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
      editor?.chain().setHighlight({ color }).run();
    }
  };

  const onExecClearCommand = () => {
    editor?.chain().unsetHighlight().run();
  };

  return (
    <ColorPicker
      allowClear
      value={color}
      destroyTooltipOnHide
      onChange={(value) => onExecCommand(value.toHexString())}
      onClear={onExecClearCommand}
    >
      <Button icon="Highlighter" tip="Highlight text" active={!!current} />
    </ColorPicker>
  );
};
