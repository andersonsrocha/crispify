import React from "react";
import { customClipboardPaste } from "@/packages/core/helpers";
import { StarterKit, StarterKitOptions } from "@/packages/extension-starter-kit";
import { EditorProvider } from "@tiptap/react";
import { App, ConfigProvider, theme } from "antd";
import cls from "classnames";
import _ from "lodash";

import { EditorHeader } from "./editor-header";
import { ImageMenu } from "../image-menu";
import { Feedback } from "../toast";
import { ColumnsMenu } from "../columns-menu";
import { TableRowMenu } from "../table-row-menu";
import { TableColumnMenu } from "../table-column-menu";
import { TextMenu } from "../text-menu";

import "@/main.css";

type NotyistProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuRef: React.RefObject<any>;
  editable?: boolean;
  bordered?: boolean;
  config?: Partial<StarterKitOptions>;
  mode?: "WYSIWYG" | "notion";
};

export const Notyist: React.FC<React.PropsWithChildren<NotyistProps>> = (props) => {
  const { menuRef, bordered, config, editable = true, mode = "WYSIWYG" } = props;

  const containerRef = React.useRef(null);

  const { theme: current } = React.useContext(ConfigProvider.ConfigContext);
  const isDarkMode = _.isEqual(current?.algorithm, theme.darkAlgorithm);

  const classNames = cls("focus:outline-none p-2", {
    "border border-solid border-colorBorder": bordered,
    "border-t-0": mode === "WYSIWYG",
  });

  return (
    <ConfigProvider
      theme={{ inherit: true }}
      getTargetContainer={() => containerRef.current || document.body}
      getPopupContainer={() => containerRef.current || document.body}
    >
      <App>
        <div key="editor-container" id="editor-container" ref={containerRef} data-theme={isDarkMode ? "dark" : "light"}>
          <EditorProvider
            autofocus
            slotBefore={mode !== "notion" && <EditorHeader />}
            editable={editable}
            extensions={[StarterKit.configure(config)]}
            content=""
            editorProps={{
              attributes: {
                class: classNames,
                spellcheck: "false",
              },
              handlePaste: customClipboardPaste,
            }}
          >
            <ImageMenu appendTo={menuRef} />

            <ColumnsMenu appendTo={menuRef} />

            <TableRowMenu appendTo={menuRef} />

            <TableColumnMenu appendTo={menuRef} />

            {mode === "notion" && (
              <TextMenu appendTo={menuRef}>
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
                  <TextMenu.Mark type="blockquote" />
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
            )}
          </EditorProvider>
        </div>
        <Feedback />
      </App>
    </ConfigProvider>
  );
};
