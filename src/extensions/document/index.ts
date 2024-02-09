import TiptapDocument from "@tiptap/extension-document";

import { Generic } from "@notion/types";

export interface DocumentOptions {
  leftMenu: boolean;
  HTMLAttributes: Generic;
}

export const Document = TiptapDocument.extend<DocumentOptions>({
  addOptions() {
    return {
      leftMenu: false,
      HTMLAttributes: {},
    };
  },

  content() {
    return this.options.leftMenu ? "(nodeblock|nodeblock columns)+" : "(block|columns)+";
  },
});
