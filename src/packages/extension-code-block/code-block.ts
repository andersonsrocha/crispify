import TiptapCodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { View } from "./view";

export type { CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";

export const CodeBlock = TiptapCodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),

      // exit node on triple enter
      Enter: ({ editor }) => {
        if (!this.options.exitOnTripleEnter) {
          return false;
        }

        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");

        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);

            return true;
          })
          .exitCode()
          .run();
      },
    };
  },
});
