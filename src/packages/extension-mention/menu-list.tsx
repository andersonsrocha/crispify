import React from "react";
import { Button } from "antd";
import { Editor } from "@tiptap/react";
import cls from "classnames";

import { GroupOption, Option } from "./mention";

export type Command = {
  id: string | number;
  label: string;
};

export type MenuListProps = {
  editor: Editor;
  items: GroupOption[] | Option[];
  command: (command: Command) => void;
};

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Anytime the groups change, i.e. the user types to narrow it down, we want to
  // reset the current selection to the first menu item
  React.useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedIndex(0);
  }, [props.items]);

  const selectItem = React.useCallback(
    (groupIndex: number, itemIndex: number) => {
      const group = props.items[groupIndex];
      const item = "children" in group ? group.children[itemIndex] : group;

      if (item) {
        props.command(item);
      }
    },
    [props]
  );

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        if (!props.items.length) {
          return false;
        }

        const groupOrItem = props.items[selectedGroupIndex];
        let newGroupIndex = selectedGroupIndex;
        let newItemIndex = selectedIndex - 1;

        if ("children" in groupOrItem) {
          if (newItemIndex < 0) {
            newGroupIndex = selectedGroupIndex - 1;
            newItemIndex = groupOrItem.children.length - 1 || 0;
          }

          if (newGroupIndex < 0) {
            newGroupIndex = props.items.length - 1;
            newItemIndex = groupOrItem.children.length - 1;
          }
        } else {
          newGroupIndex = newGroupIndex - 1;
          newItemIndex = 0;

          if (newGroupIndex < 0) {
            newGroupIndex = props.items.length - 1 || 0;
          }
        }

        setSelectedGroupIndex(newGroupIndex);
        setSelectedIndex(newItemIndex);

        return true;
      }

      if (event.key === "ArrowDown") {
        if (!props.items.length) {
          return false;
        }

        const groupOrItem = props.items[selectedGroupIndex];
        let newGroupIndex = selectedGroupIndex;
        let newItemIndex = selectedIndex + 1;

        if ("children" in groupOrItem) {
          if (groupOrItem.children.length - 1 < newItemIndex) {
            newItemIndex = 0;
            newGroupIndex = selectedGroupIndex + 1;
          }

          if (props.items.length - 1 < newGroupIndex) {
            newGroupIndex = 0;
          }
        } else {
          newGroupIndex = newGroupIndex + 1;
          newItemIndex = 0;

          if (props.items.length - 1 < newGroupIndex) {
            newGroupIndex = 0;
          }
        }

        setSelectedGroupIndex(newGroupIndex);
        setSelectedIndex(newItemIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (!props.items.length || selectedIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedIndex);
        return true;
      }

      return false;
    },
  }));

  React.useEffect(() => {
    if (scrollContainer.current) {
      const $command = scrollContainer.current.querySelector<HTMLButtonElement>(
        `button[data-option='group:${selectedGroupIndex}option:${selectedIndex}']`
      );
      if ($command) {
        $command.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedGroupIndex, selectedIndex]);

  const createCommandClickHandler = React.useCallback(
    (groupIndex: number, itemIndex: number) => {
      return () => {
        selectItem(groupIndex, itemIndex);
      };
    },
    [selectItem]
  );

  return (
    <div
      ref={scrollContainer}
      className="ny-bg-colorBgElevated ny-rounded-md ny-flex ny-flex-col ny-gap-4 ny-max-h-80 ny-overflow-y-auto ny-scrollbar-thumb-controlItemBgHover ny-scrollbar-thin ny-scrollbar-track-transparent ny-px-3 ny-py-4 ny-min-w-36"
    >
      {props.items.length && (
        <React.Fragment>
          {props.items.map((item, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {"children" in item ? (
                <div data-group={groupIndex} className="ny-flex ny-flex-col ny-gap-2">
                  <div className="ny-text-colorTextSecondary ny-uppercase ny-font-semibold ny-text-[0.65rem] ny-pl-1">
                    {item.label}
                  </div>

                  <div className="ny-flex ny-flex-col ny-gap-1">
                    {item.children.map((child, itemIndex: number) => (
                      <Button
                        block
                        type="text"
                        key={itemIndex}
                        data-option={`group:${groupIndex}option:${itemIndex}`}
                        onClick={createCommandClickHandler(groupIndex, itemIndex)}
                        className={cls("ny-flex ny-justify-start ny-items-center", {
                          "ny-bg-colorBgTextActive": selectedGroupIndex === groupIndex && selectedIndex === itemIndex,
                        })}
                      >
                        {child.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <Button
                  block
                  type="text"
                  key={groupIndex}
                  data-option={`group:${groupIndex}option:${0}`}
                  onClick={createCommandClickHandler(groupIndex, 0)}
                  className={cls("ny-flex ny-justify-start ny-items-center ny-pl-1 ny-rounded-[4px]", {
                    "ny-bg-colorBgTextActive": selectedGroupIndex === groupIndex && selectedIndex === 0,
                  })}
                >
                  {item.label}
                </Button>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}

      {!props.items.length && <div className="ny-text-center">No result</div>}
    </div>
  );
});
