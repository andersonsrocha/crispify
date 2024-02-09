import TiptapCode from "@tiptap/extension-code";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { View } from "./view";

export const Code = TiptapCode.extend({
  code: false,

  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});
