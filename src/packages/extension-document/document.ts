import TiptapDocument from "@tiptap/extension-document";

export interface DocumentOptions {
  leftMenu: boolean;
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
