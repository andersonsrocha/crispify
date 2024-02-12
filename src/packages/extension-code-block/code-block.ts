import TiptapCodeBlock from "@tiptap/extension-code-block";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { View } from "./view";

export type { CodeBlockOptions } from "@tiptap/extension-code-block";

export const CodeBlock = TiptapCodeBlock.extend({
  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
