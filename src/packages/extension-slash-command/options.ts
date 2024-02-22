import { Option } from "./menu-list";

export const OPTIONS: Option[] = [
  {
    name: "format",
    title: "Format",
    commands: [
      {
        name: "heading1",
        label: "Heading 1",
        iconName: "Heading1",
        aliases: ["h1"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        name: "heading2",
        label: "Heading 2",
        iconName: "Heading2",
        aliases: ["h2"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        name: "heading3",
        label: "Heading 3",
        iconName: "Heading3",
        aliases: ["h3"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        name: "heading4",
        label: "Heading 4",
        iconName: "Heading4",
        aliases: ["h4"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 4 }).run();
        },
      },
      {
        name: "heading5",
        label: "Heading 5",
        iconName: "Heading5",
        aliases: ["h5"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 5 }).run();
        },
      },
      {
        name: "bulletList",
        label: "Bullet list",
        iconName: "List",
        aliases: ["ul"],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        name: "numberedList",
        label: "Numbered list",
        iconName: "ListOrdered",
        aliases: ["ol"],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        name: "taskList",
        label: "Task list",
        iconName: "ListTodo",
        aliases: ["todo"],
        action: (editor) => {
          editor.chain().focus().toggleTaskList().run();
        },
      },
      {
        name: "blockquote",
        label: "Blockquote",
        iconName: "Quote",
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
      },
      {
        name: "codeBlock",
        label: "Code block",
        iconName: "CodeSquare",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        },
      },
    ],
  },
  {
    name: "insert",
    title: "Insert",
    commands: [
      {
        name: "table",
        label: "Table",
        iconName: "Table",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().selectParentNode().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run();
        },
      },
      {
        name: "image",
        label: "Image",
        iconName: "Image",
        aliases: ["img"],
        action: (editor) => {
          editor.chain().focus().setImageUpload().run();
        },
      },
      {
        name: "columns",
        label: "Columns",
        iconName: "Columns2",
        aliases: ["cols"],
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head + 2)
            .run();
        },
      },
      {
        name: "horizontalRule",
        label: "Horizontal rule",
        iconName: "Minus",
        aliases: ["hr"],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
    ],
  },
];
