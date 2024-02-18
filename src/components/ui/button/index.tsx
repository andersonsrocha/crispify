import React from "react";
import { Button as AntButton, Tooltip, ButtonProps as AntButtonProps, TooltipProps, Typography } from "antd";
import { Icon, IconProps, LucideIconNames } from "@/packages/core";
import { icons } from "lucide-react";
import cls from "classnames";

import { Keyboard } from "@/types";

export type ButtonProps = Pick<AntButtonProps, "onClick"> & {
  tip?: React.ReactNode;
  placement?: TooltipProps["placement"];
  shortcut?: (LucideIconNames | Keyboard)[];
  active?: boolean;
  disabled?: boolean;
  icon?: LucideIconNames | IconProps;
  children?: React.ReactNode;
  center?: boolean;
};

const { Text } = Typography;

export const Button: React.FC<ButtonProps> = (props) => {
  const { tip, placement, shortcut = [], active, icon, center = true, ...rest } = props;

  const renderIcons = React.useMemo(() => {
    if (!icon) return undefined;

    if (typeof icon === "object") return <Icon {...icon} />;

    return <Icon name={icon} />;
  }, [icon]);

  const renderTooltip = React.useMemo(() => {
    if (!(tip || shortcut.length)) return;

    const nodes = shortcut
      .map((short) => {
        return (
          <Text keyboard key={short} className="ny-text-colorTextLightSolid">
            {short in icons ? <Icon name={short as LucideIconNames} size={9} /> : short}
          </Text>
        );
      })
      .reduce<React.ReactNode[] | null>((acc, v) => (acc === null ? [v] : [...acc, "+", v]), null);

    return (
      <span className="ny-flex ny-items-center ny-gap-2">
        {tip}
        <div className="ny-flex ny-items-center">{nodes}</div>
      </span>
    );
  }, [shortcut, tip]);

  return (
    <Tooltip title={renderTooltip} placement={placement} trigger={["hover", "click"]}>
      <AntButton
        type="text"
        className={cls("ny-flex ny-items-center", {
          "ny-bg-colorBgTextActive": active,
          "ny-justify-center": center,
          "ny-justify-start": !center,
        })}
        icon={renderIcons}
        {...rest}
      />
    </Tooltip>
  );
};
