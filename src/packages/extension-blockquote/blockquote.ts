import TiptapBlockquote from "@tiptap/extension-blockquote";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { View } from "./view";

export const Blockquote = TiptapBlockquote.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
