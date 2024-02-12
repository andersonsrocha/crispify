import TiptapCode from "@tiptap/extension-code";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { View } from "./view";

export type { CodeOptions } from "@tiptap/extension-code";

export const Code = TiptapCode.extend({
  code: false,

  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
