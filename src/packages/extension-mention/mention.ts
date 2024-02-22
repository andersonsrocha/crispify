import TiptapMention from "@tiptap/extension-mention";
import { ReactRenderer, mergeAttributes } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import { PluginKey } from "@tiptap/pm/state";
import tippy from "tippy.js";

import { MenuList } from "./menu-list";

import { GeneralOptions, Generic } from "@/types";

export type GroupOption = {
  label: string;
  children: Option[];
};

export type Option = {
  label: string;
  id: string | number;
};

export interface MentionOptions extends GeneralOptions {
  char: "@" | "[[" | "#";
  request({ query }: { query: string }): GroupOption[] | Option[] | Promise<GroupOption[] | Option[]>;
}

const extensionName = "mention";

export const MentionPluginKey = new PluginKey(extensionName);

export const Mention = TiptapMention.extend<MentionOptions>({
  name: "mention",

  priority: 1001,

  addOptions() {
    return {
      HTMLAttributes: {},
      char: "@",
      request: () => new Promise((res) => res([])),
    };
  },

  parseHTML() {
    return [{ tag: `span[data-type="${this.name}"]` }];
  },

  renderText({ node }) {
    return `${this.options.char}${node.attrs.label ?? node.attrs.id}`;
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name }),
      `${this.options.char}${node.attrs.label ?? node.attrs.id}`,
    ];
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              tr.insertText(this.options.char || "", pos, pos + node.nodeSize);

              return false;
            }
          });

          return isMention;
        }),
    };
  },

  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: this.options.char,
        pluginKey: MentionPluginKey,
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(" ");

          if (overrideSpace) {
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();

          window.getSelection()?.collapseToEnd();
        },

        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },

        items: ({ query }) => {
          return this.options.request({ query: query.toLowerCase() });
        },

        render: () => {
          let component: Generic;
          let popup: ReturnType<typeof tippy>;
          let scrollHandler: (() => void) | null = null;

          return {
            onStart: (props) => {
              component = new ReactRenderer(MenuList, {
                props,
                editor: props.editor,
              });

              const { view } = props.editor;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                let yPos = rect.y;

                if (rect.top + component.element.offsetHeight + 40 > window.innerHeight) {
                  const diff = rect.top + component.element.offsetHeight - window.innerHeight + 40;
                  yPos = rect.y - diff;
                }

                return new DOMRect(rect.x, yPos, rect.width, rect.height);
              };

              scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              popup = tippy("body", {
                getReferenceClientRect,
                appendTo: () => document.querySelector(".ny-editor__container") || document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
                onShown() {
                  popup?.[0].popper.focus();
                },
              });
            },

            onUpdate(props) {
              const { view } = props.editor;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                return new DOMRect(rect.x, rect.y, rect.width, rect.height);
              };

              const scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener("scroll", scrollHandler);

              props.editor.storage[extensionName].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  };
              popup?.[0].setProps({
                getReferenceClientRect,
              });
            },

            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup[0].hide();

                return true;
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show();
              }

              return component.ref?.onKeyDown(props);
            },

            onExit(props) {
              popup?.[0].hide();
              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener("scroll", scrollHandler);
              }
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});
