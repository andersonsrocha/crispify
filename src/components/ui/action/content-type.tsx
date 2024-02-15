import React from "react";
import { Editor, useCurrentEditor } from "@tiptap/react";
import { Dropdown, MenuProps } from "antd";
import { ChevronDown } from "lucide-react";
import { Icon, LucideIconNames } from "@/packages/core";
import _ from "lodash";

import { Button } from "../button";

type Level = 1 | 2 | 3 | 4 | 5;

type Option = {
  key: string;
  type?: "group";
  label: React.ReactNode;
  icon?: LucideIconNames;
  disabled?: boolean;
  children?: Option[];
};

const useContextTypes = (editor: Editor | null) => {
  const options = React.useMemo<Option[]>(
    () => [
      {
        key: "hierarchy",
        type: "group",
        label: <span className="text-xs">HIERARCHY</span>,
        children: [
          {
            label: "Paragraph",
            key: "paragraph",
            icon: "Pilcrow",
            disabled: !editor?.can().setParagraph(),
          },
          {
            label: "Heading 1",
            key: "1",
            icon: "Heading1",
            disabled: !editor?.can().setHeading({ level: 1 }),
          },
          {
            label: "Heading 2",
            key: "2",
            icon: "Heading2",
            disabled: !editor?.can().setHeading({ level: 2 }),
          },
          {
            label: "Heading 3",
            key: "3",
            icon: "Heading3",
            disabled: !editor?.can().setHeading({ level: 3 }),
          },
          {
            label: "Heading 4",
            key: "4",
            icon: "Heading4",
            disabled: !editor?.can().setHeading({ level: 4 }),
          },
          {
            label: "Heading 5",
            key: "5",
            icon: "Heading5",
            disabled: !editor?.can().setHeading({ level: 5 }),
          },
        ],
      },
      {
        key: "lists",
        type: "group",
        label: <span className="text-xs">LISTS</span>,
        children: [
          {
            label: "Bullet List",
            key: "bulletList",
            icon: "List",
          },
          {
            label: "Numbered list",
            key: "orderedList",
            icon: "ListOrdered",
          },
          {
            label: "Todo list",
            key: "taskList",
            icon: "ListTodo",
            disabled: !editor?.can().toggleTaskList(),
          },
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor, editor?.state]
  );

  return options;
};

export const ContentType: React.FC = () => {
  const { editor } = useCurrentEditor();

  const bulletListIsActive = editor?.isActive("bulletList");
  const orderedListIsActive = editor?.isActive("orderedList");
  const taskListIsActive = editor?.isActive("taskList");
  const paragraphIsActive =
    editor?.isActive("paragraph") && !(bulletListIsActive || orderedListIsActive || taskListIsActive);
  const active =
    paragraphIsActive || bulletListIsActive || orderedListIsActive || taskListIsActive || editor?.isActive("heading");
  // Current dropdown value
  const current =
    editor?.getAttributes("heading")?.level ??
    (paragraphIsActive
      ? "paragraph"
      : (bulletListIsActive && "bulletList") ||
        (orderedListIsActive && "orderedList") ||
        (taskListIsActive && "taskList") ||
        "");

  const categories = useContextTypes(editor);
  const options = categories.flatMap((opt) => (opt.children ? [opt.children] : [])).flat();
  const [value, setValue] = React.useState(options.find((x) => x.key == current));

  React.useEffect(() => {
    if (current != value?.key) {
      setValue(options.find((x) => x.key == current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, current]);

  const onExecCommand = (value: string) => {
    if (value === "paragraph") {
      editor?.chain().focus().lift("taskItem").liftListItem("listItem").setParagraph().run();
    } else if (_.isNaN(Number(value))) {
      switch (value) {
        case "bulletList":
          return editor?.chain().focus().toggleBulletList().run();
        case "orderedList":
          return editor?.chain().focus().toggleOrderedList().run();
        case "taskList":
          return editor?.chain().focus().toggleTaskList().run();
      }
    } else {
      const level = Number(value) as Level;
      editor?.chain().focus().lift("taskItem").liftListItem("listItem").setHeading({ level: level }).run();
    }
  };

  const dictionary = categories.reduce<NonNullable<MenuProps["items"]>>((acc, v) => {
    return [...acc, { ...v, children: v.children?.map((c) => ({ ...c, icon: c.icon && <Icon name={c.icon} /> })) }];
  }, []);

  return (
    <Dropdown
      menu={{
        selectable: true,
        selectedKeys: value && [value.key],
        onClick: ({ key }) => onExecCommand(key),
        items: dictionary,
      }}
    >
      <Button icon={value?.icon || "Pilcrow"} active={active} center={false}>
        <ChevronDown size={14} />
      </Button>
    </Dropdown>
  );
};
