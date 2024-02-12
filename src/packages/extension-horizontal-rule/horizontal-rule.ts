import TiptapHorizontalRule from "@tiptap/extension-horizontal-rule";
import { mergeAttributes } from "@tiptap/react";

export type { HorizontalRuleOptions } from "@tiptap/extension-horizontal-rule";

export const HorizontalRule = TiptapHorizontalRule.extend({
  renderHTML() {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, { "data-type": this.name, style: "margin-bottom: 1rem;" }),
      ["hr"],
    ];
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain, state }) => {
          const {
            selection: { $to: $originTo },
          } = state;

          const currentChain = chain();

          if ($originTo.parentOffset === 0) {
            currentChain.insertContentAt(Math.max($originTo.pos - 2, 0), { type: this.name });
          } else {
            currentChain.insertContent({ type: this.name });
          }

          return currentChain.focus($originTo.pos + 3).run();
        },
    };
  },
});
