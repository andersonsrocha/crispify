import React from "react";
import { Button as AntButton, Tooltip, ButtonProps as AntButtonProps, TooltipProps, Typography } from "antd";
import { Icon, LucideIconNames } from "@/components";
import { icons } from "lucide-react";
import cls from "classnames";

import { Keyboard } from "@notion/types";

export type ButtonProps = Pick<AntButtonProps, "onClick"> & {
  tip?: React.ReactNode;
  placement?: TooltipProps["placement"];
  shortcut?: (LucideIconNames | Keyboard)[];
  active?: boolean;
  disabled?: boolean;
  icon?: LucideIconNames;
  children?: React.ReactNode;
  center?: boolean;
};

const { Text } = Typography;

export const Button: React.FC<ButtonProps> = (props) => {
  const { tip, placement, shortcut = [], active, icon, center = true, ...rest } = props;

  const renderIcons = React.useMemo(() => {
    if (!icon) return undefined;

    return <Icon name={icon} />;
  }, [icon]);

  const renderTooltip = React.useMemo(() => {
    if (!(tip || shortcut.length)) return;

    const nodes = shortcut
      .map((short) => {
        return (
          <Text keyboard key={short}>
            {short in icons ? <Icon name={short as LucideIconNames} size={9} /> : short}
          </Text>
        );
      })
      .reduce<React.ReactNode[] | null>((acc, v) => (acc === null ? [v] : [...acc, "+", v]), null);

    return (
      <span className="flex items-center gap-2">
        {tip}
        <div className="flex items-center">{nodes}</div>
      </span>
    );
  }, [shortcut, tip]);

  return (
    <Tooltip title={renderTooltip} placement={placement} trigger={["hover", "click"]}>
      <AntButton
        type="text"
        className={cls("flex items-center", {
          "bg-colorBgTextActive": active,
          "justify-center": center,
          "justify-start": !center,
        })}
        icon={renderIcons}
        {...rest}
      />
    </Tooltip>
  );
};
