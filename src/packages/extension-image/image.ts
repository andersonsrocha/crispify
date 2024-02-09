import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes, Range } from "@tiptap/core";
import TiptapImage from "@tiptap/extension-image";

import { View } from "./view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageBlock: {
      setImage: (attributes: { src: string }) => ReturnType;
      setImageAt: (attributes: { src: string; pos: number | Range }) => ReturnType;
      setImageAlign: (align: "left" | "center" | "right") => ReturnType;
      setImageWidth: (width: number) => ReturnType;
    };
  }
}

export const Image = TiptapImage.extend({
  group: "block",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("data-width"),
        renderHTML: (attributes) => ({
          "data-width": attributes.width,
        }),
      },
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align"),
        renderHTML: (attributes) => ({
          "data-align": attributes.align,
        }),
      },
      alt: {
        default: undefined,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src*="tiptap.dev"]:not([src^="data:"]), img[src*="windows.net"]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name, attrs: { src: attrs.src } });
        },

      setImageAt:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContentAt(attrs.pos, { type: this.name, attrs: { src: attrs.src } });
        },

      setImageAlign:
        (align) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { align }),

      setImageWidth:
        (width) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { width: `${Math.max(0, Math.min(100, width))}%` }),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(View);
  },
});

export default Image;
