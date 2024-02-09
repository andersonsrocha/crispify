import React from "react";
import { Icon } from "@/components";
import { Button } from "antd";
import cls from "classnames";

import { MenuListProps, Command } from "@notion/types";

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = React.useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = React.useState(0);

  // Anytime the groups change, i.e. the user types to narrow it down, we want to
  // reset the current selection to the first menu item
  React.useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.items]);

  const selectItem = React.useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex];
      props.command(command);
    },
    [props]
  );

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowDown") {
        if (!props.items.length) {
          return false;
        }

        const commands = props.items[selectedGroupIndex].commands;

        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "ArrowUp") {
        if (!props.items.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1;
          newCommandIndex = props.items[newGroupIndex].commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  React.useEffect(() => {
    if (scrollContainer.current) {
      const $command = scrollContainer.current.querySelector<HTMLButtonElement>(
        `button[data-option='group:${selectedGroupIndex}option:${selectedCommandIndex}']`
      );
      if ($command) {
        $command.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = React.useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex);
      };
    },
    [selectItem]
  );

  if (!props.items.length) {
    return null;
  }

  return (
    <div
      ref={scrollContainer}
      className="bg-colorBgElevated rounded-md flex flex-col gap-1 max-h-80 overflow-y-auto scrollbar-thumb-controlItemBgHover scrollbar-thin scrollbar-track-transparent px-3 py-4"
    >
      {props.items.map((group, groupIndex: number) => (
        <div key={group.title} data-group={groupIndex} className="flex flex-col gap-1">
          <div className="text-colorTextSecondary uppercase font-semibold text-[0.65rem]">{group.title}</div>

          <div>
            {group.commands.map((command: Command, commandIndex: number) => (
              <Button
                block
                type="text"
                key={command.label}
                icon={<Icon name={command.iconName} />}
                data-option={`group:${groupIndex}option:${commandIndex}`}
                onClick={createCommandClickHandler(groupIndex, commandIndex)}
                className={cls("flex justify-start items-center", {
                  "bg-colorBgTextActive": selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex,
                })}
              >
                {command.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

MenuList.displayName = "MenuList";
