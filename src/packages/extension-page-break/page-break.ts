import { Node, mergeAttributes } from "@tiptap/core";

export interface PageBreakOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    pageBreak: {
      /**
       * Add a page break
       */
      setPageBreak: () => ReturnType;
      /**
       * Remove a page break
       */
      unsetPageBreak: () => ReturnType;
    };
  }
}

export const PageBreak = Node.create<PageBreakOptions>({
  name: "pageBreak",

  addOptions() {
    return {
      HTMLAttributes: {
        style: "page-break-after: always; margin-bottom: 0.5rem;",
        "page-break": true,
      },
    };
  },

  group: "block",

  parseHTML() {
    return [{ tag: "div[page-break='true']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name })];
  },

  addCommands() {
    return {
      setPageBreak:
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
      unsetPageBreak:
        () =>
        ({ chain }) => {
          return chain().deleteSelection().run();
        },
    };
  },
});
