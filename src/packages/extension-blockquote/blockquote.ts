import TiptapBlockquote from "@tiptap/extension-blockquote";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { View } from "./view";

export type { BlockquoteOptions } from "@tiptap/extension-blockquote";

export const Blockquote = TiptapBlockquote.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});

export default Blockquote;
