import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { isCustomNodeSelected } from "@/packages/core/helpers";

import { View } from "./view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    nodeblock: {
      setNodeBlock: (position?: number) => ReturnType;
    };
  }
}

export const Block = Node.create({
  name: "nodeblock",

  group: "nodeblock",

  content: "block",

  priority: 1000,

  inline: false,

  selectable: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: "div[data-type='node-block']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "node-block" }), 0];
  },

  addCommands() {
    return {
      setNodeBlock:
        (position) =>
        ({ state, chain }) => {
          const {
            selection: { from },
          } = state;

          const pos = position !== undefined || position !== null ? from : position;

          return chain()
            .insertContentAt(pos, {
              type: this.name,
              content: [{ type: "paragraph" }],
            })
            .focus(pos + 2)
            .run();
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setNodeBlock(),
      Enter: ({ editor }) => {
        const { selection, doc } = editor.state;
        const { $head, from, to } = selection;

        const parent = $head.node($head.depth - 1);

        if (
          parent.type.name !== "nodeblock" ||
          parent.textContent.startsWith("/") ||
          isCustomNodeSelected(editor, $head.parent)
        ) {
          return false;
        }

        let currentActiveNodeTo = -1;

        doc.descendants((node, pos) => {
          if (currentActiveNodeTo !== -1) return false;

          if (node.type.name === this.name) return;

          const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];

          if (nodeFrom <= from && to <= nodeTo) currentActiveNodeTo = nodeTo;

          return false;
        });

        const content = doc.slice(from, currentActiveNodeTo)?.toJSON().content;

        return editor
          .chain()
          .insertContentAt({ from, to: currentActiveNodeTo }, { type: this.name, content })
          .focus(from + 4)
          .run();
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
