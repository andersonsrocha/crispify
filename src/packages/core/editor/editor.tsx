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
  editable?: boolean;
  bordered?: boolean;
  config?: Partial<StarterKitOptions>;
  mode?: "WYSIWYG" | "notion";
  content?: string;
  height?: string | number;
};

export const Notyist: React.FC<React.PropsWithChildren<NotyistProps>> = (props) => {
  const { bordered, config, editable = true, mode = "WYSIWYG", height = 350 } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { theme: current } = React.useContext(ConfigProvider.ConfigContext);
  const isDarkMode = _.isEqual(current?.algorithm, theme.darkAlgorithm);

  const classNames = cls("p-2 overflow-y-auto h-[var(--height)] focus:outline-none", {
    "border border-solid border-colorBorder": bordered,
    "border-t-0": mode === "WYSIWYG",
  });

  const styles = {
    "--height": Number.isNaN(Number(height)) ? height : `${height}px`,
    "--full-screen": "false",
    overflow: "hidden",
  } as React.CSSProperties;

  return (
    <ConfigProvider
      theme={{ inherit: true }}
      getTargetContainer={() => containerRef.current || document.body}
      getPopupContainer={() => containerRef.current || document.body}
    >
      <App>
        <div style={styles} ref={containerRef} id="editor_container" data-theme={isDarkMode ? "dark" : "light"}>
          <EditorProvider
            autofocus
            slotBefore={
              mode !== "notion" && <EditorHeader fullscreen={{ appendTo: containerRef, minHeight: height }} />
            }
            editable={editable}
            extensions={[StarterKit.configure(config)]}
            content={props.content}
            editorProps={{
              attributes: {
                class: classNames,
                spellcheck: "false",
              },
              handlePaste: customClipboardPaste,
            }}
          >
            {mode === "notion" && <TextMenu appendTo={containerRef} />}

            <ColumnsMenu appendTo={containerRef} />

            <TableRowMenu appendTo={containerRef} />

            <TableColumnMenu appendTo={containerRef} />

            <ImageMenu appendTo={containerRef} />
          </EditorProvider>
        </div>
        <Feedback />
      </App>
    </ConfigProvider>
  );
};
