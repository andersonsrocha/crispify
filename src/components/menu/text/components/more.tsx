import React from "react";
import { Popover } from "antd";

import { Button } from "./button";

export const More: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Popover
      trigger="click"
      overlayInnerStyle={{ padding: 0 }}
      content={<div className="p-1 flex items-center gap-0.5">{children}</div>}
    >
      <Button icon="MoreVertical" tip="More options" />
    </Popover>
  );
};
