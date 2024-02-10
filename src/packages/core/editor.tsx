import React from "react";
import { ConfigProvider, App, theme } from "antd";
import { EditorContent, useEditor } from "@tiptap/react";
import { useExtensions } from "@/packages/extension-starter-kit";
import { ColumnsMenu, Feedback, ImageMenu, TableColumnMenu, TableRowMenu, TextMenu } from "@/packages/core";
import { customClipboardPaste } from "@/packages/core/helpers";
import _ from "lodash";

import "@/main.css";

export const Notion: React.FC = () => {
  const menuContainerRef = React.useRef(null);
  const { theme: current } = React.useContext(ConfigProvider.ConfigContext);
  const isDarkMode = _.isEqual(current?.algorithm, theme.darkAlgorithm);

  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
        spellcheck: "false",
      },
      handlePaste: customClipboardPaste,
    },
    extensions: useExtensions(),
    content: "",
  });

  return (
    <ConfigProvider
      theme={{ inherit: true }}
      getTargetContainer={() => document.getElementById("editor-container") || document.body}
      getPopupContainer={() => document.getElementById("editor-container") || document.body}
    >
      <App>
        <main id="editor-container" data-theme={isDarkMode ? "dark" : "light"}>
          <div className="bg-colorBgContainer min-h-screen w-full py-16">
            <div className="mx-auto flex flex-col gap-2">
              <div className="flex h-full" ref={menuContainerRef}>
                {editor && <ImageMenu editor={editor} appendTo={menuContainerRef} />}

                {editor && <ColumnsMenu editor={editor} appendTo={menuContainerRef} />}

                {editor && <TableRowMenu editor={editor} appendTo={menuContainerRef} />}

                {editor && <TableColumnMenu editor={editor} appendTo={menuContainerRef} />}

                <TextMenu editor={editor}>
                  <TextMenu.Wrapper>
                    <TextMenu.ContentType />
                    <TextMenu.Font />
                    <TextMenu.FontSize />

                    <TextMenu.Divider />

                    <TextMenu.Mark type="bold" />
                    <TextMenu.Mark type="italic" />
                    <TextMenu.Mark type="underline" />
                    <TextMenu.Mark type="strike" />
                    <TextMenu.Mark type="code" />
                    <TextMenu.Link />
                    <TextMenu.Highlight />
                    <TextMenu.Color />

                    <TextMenu.More>
                      <TextMenu.Mark type="subscript" />
                      <TextMenu.Mark type="superscript" />

                      <TextMenu.Divider />

                      <TextMenu.Align type="left" />
                      <TextMenu.Align type="center" />
                      <TextMenu.Align type="right" />
                      <TextMenu.Align type="justify" />
                    </TextMenu.More>
                  </TextMenu.Wrapper>
                </TextMenu>

                <EditorContent editor={editor} className="max-w-3xl mx-auto w-full" />
              </div>
            </div>
          </div>
        </main>
        <Feedback />
      </App>
    </ConfigProvider>
  );
};
