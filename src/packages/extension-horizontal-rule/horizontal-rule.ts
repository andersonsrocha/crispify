import TiptapHorizontalRule from "@tiptap/extension-horizontal-rule";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
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
        ({ chain }) => {
          return (
            chain()
              .insertContent({ type: this.name })
              // set cursor after horizontal rule
              .command(({ tr, dispatch }) => {
                if (dispatch) {
                  const { $to } = tr.selection;
                  const posAfter = $to.end();

                  if ($to.nodeAfter) {
                    if ($to.nodeAfter.isTextblock) {
                      tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1));
                    } else if ($to.nodeAfter.isBlock) {
                      tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
                    } else {
                      tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                    }
                  } else {
                    // add node after horizontal rule if it’s the end of the document
                    const node = $to.parent.type.contentMatch.defaultType?.create();

                    if (node) {
                      tr.insert(posAfter, node);
                      tr.setSelection(TextSelection.create(tr.doc, posAfter + 3));
                    }
                  }

                  tr.scrollIntoView();
                }

                return true;
              })
              .run()
          );
        },
    };
  },
});
