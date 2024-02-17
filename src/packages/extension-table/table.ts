import TiptapTable from "@tiptap/extension-table";

export const Table = TiptapTable.extend({
  addAttributes() {
    return {
      /**
       * Add spacing between cells.
       */
      spacing: {
        default: "0",
        parseHTML: (element) => element.getAttribute("data-cellspacing"),
        // Add `cellspacing` properties for email and word compatibility.
        renderHTML: (attributes) => {
          return {
            "data-cellspacing": attributes.spacing,
            cellspacing: attributes.spacing,
          };
        },
      },
      /**
       * Add internal space to cells.
       */
      padding: {
        default: "2",
        parseHTML: (element) => element.getAttribute("data-cellpadding"),
        // Add `cellpadding` properties for email and word compatibility.
        renderHTML: (attributes) => {
          return {
            "data-cellpadding": attributes.padding,
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
            "data-border": attributes.border,
            border: attributes.border,
          };
        },
      },
    };
  },
}).configure({
  // TODO: fix https://github.com/ueberdosis/tiptap/issues/4572
  // resizable: true,
  lastColumnResizable: false,
});
