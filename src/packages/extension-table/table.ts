import TiptapTable from "@tiptap/extension-table";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tableExtends: {
      setTableBorder: () => ReturnType;
      unsetTableBorder: () => ReturnType;
    };
  }
}

export const Table = TiptapTable.extend({
  addAttributes() {
    return {
      type: {
        renderHTML: () => {
          return {
            "data-type": "table",
          };
        },
      },
      /**
       * Add spacing between cells.
       */
      spacing: {
        default: "0",
        parseHTML: (element) => element.getAttribute("data-cellspacing"),
        // Add `cellspacing` properties for email and word compatibility.
        renderHTML: (attributes) => {
          return {
            cellspacing: attributes.spacing,
          };
        },
      },
      /**
       * Add internal space to cells.
       */
      padding: {
        default: "0",
        parseHTML: (element) => element.getAttribute("data-cellpadding"),
        // Add `cellpadding` properties for email and word compatibility.
        renderHTML: (attributes) => {
          return {
            cellpadding: attributes.padding,
          };
        },
      },
      /**
       * Add border to table.
       */
      border: {
        default: "1",
        parseHTML: (element) => element.getAttribute("data-border"),
        // Add `border` properties for email and word compatibility.
        renderHTML: (attributes) => {
          return {
            border: attributes.border,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setTableBorder:
        () =>
        ({ chain }) =>
          chain().updateAttributes("table", { border: "1" }).run(),
      unsetTableBorder:
        () =>
        ({ chain }) =>
          chain().updateAttributes("table", { border: "0" }).run(),
    };
  },
}).configure({
  // TODO: fix https://github.com/ueberdosis/tiptap/issues/4572
  // resizable: true,
  lastColumnResizable: false,
});
