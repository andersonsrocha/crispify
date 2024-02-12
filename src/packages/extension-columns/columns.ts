import { Node } from "@tiptap/core";

export enum ColumnLayout {
  SidebarLeft = "sidebar-left",
  SidebarRight = "sidebar-right",
  TwoColumn = "two-column",
}

const computedStyles = (layout: ColumnLayout) => `
  display: grid; 
  grid-template-columns: ${layout === "sidebar-left" ? "1fr" : "2fr"} ${layout === "sidebar-right" ? "1fr" : "2fr"};
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    columns: {
      setColumns: () => ReturnType;
      setLayout: (layout: ColumnLayout) => ReturnType;
    };
  }
}

export const Columns = Node.create({
  name: "columns",

  group: "block columns",

  content: "column column",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn,
      },
    };
  },

  addCommands() {
    return {
      setColumns:
        () =>
        ({ commands }) =>
          commands.insertContent(
            `<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`
          ),
      setLayout:
        (layout: ColumnLayout) =>
        ({ commands }) =>
          commands.updateAttributes("columns", { layout }),
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        "data-type": "columns",
        style: computedStyles(HTMLAttributes.layout),
        class: `layout-${HTMLAttributes.layout}`,
      },
      0,
    ];
  },

  parseHTML() {
    return [{ tag: 'div[data-type="columns"]' }];
  },
});

export default Columns;
