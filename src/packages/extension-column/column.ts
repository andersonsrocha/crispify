import { Node, mergeAttributes } from "@tiptap/core";

const styles = `
  overflow: auto;
  border-radius: 0.25rem;
  border: 2px dotted transparent;
  padding: 0.25rem;
  transition: border .16s cubic-bezier(.45,.05,.55,.95);
`;

export const Column = Node.create({
  name: "column",

  content: "block+",

  isolating: true,

  addAttributes() {
    return {
      position: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-position"),
        renderHTML: (attributes) => ({ "data-position": attributes.position }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "column", style: styles }), 0];
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
  },
});
