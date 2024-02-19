import React from "react";
import { customClipboardPaste } from "@/packages/core/helpers";
import { StarterKit, StarterKitOptions } from "@/packages/extension-starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { ConfigProvider, theme } from "antd";
import _ from "lodash";

import { EditorHeader } from "./editor-header";
import { ImageMenu } from "../image-menu";
import { ColumnsMenu } from "../columns-menu";
import { TableMenu } from "../table-menu";
import { TableRowMenu } from "../table-row-menu";
import { TableColumnMenu } from "../table-column-menu";
import { TextMenu } from "../text-menu";
import { Provider } from "../providers";

import "@/main.css";

type NotyistProps = {
  editable?: boolean;
  bordered?: boolean;
  config?: Partial<StarterKitOptions>;
  mode?: "WYSIWYG" | "notion";
  content?: string;
  height?: string | number;
};

export const Notyist: React.FC<NotyistProps> = (props) => {
  const { bordered, config, editable = true, mode = "WYSIWYG", height = 350 } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { theme: current } = React.useContext(ConfigProvider.ConfigContext);
  const isDarkMode = _.isEqual(current?.algorithm, theme.darkAlgorithm);

  const editor = useEditor({
    autofocus: true,
    editable: editable,
    extensions: [StarterKit.configure(config)],
    content: props.content,
    editorProps: {
      attributes: {
        class: "focus:ny-outline-none",
        spellcheck: "false",
      },
      handlePaste: customClipboardPaste,
    },
  });

  const styles = {
    "--ny-editor-height": Number.isNaN(Number(height)) ? height : `${height}px`,
    "--ny-editor-border-width": bordered ? "1px" : "0px",
    "--ny-editor-border-top-width": bordered && mode !== "WYSIWYG" ? "1px" : "0px",
    overflow: "hidden",
  } as React.CSSProperties;

  return (
    <Provider nodeRef={containerRef}>
      <div
        style={styles}
        ref={containerRef}
        className="ny-editor__container"
        data-theme={isDarkMode ? "dark" : "light"}
      >
        {mode === "WYSIWYG" && <EditorHeader editor={editor} fullscreen={{ appendTo: containerRef }} />}

        <EditorContent editor={editor} className="ny-editor__content" />

        <TextMenu appendTo={containerRef} editor={editor} />

        <ColumnsMenu appendTo={containerRef} editor={editor} />

        <TableMenu appendTo={containerRef} editor={editor} />

        <TableRowMenu appendTo={containerRef} editor={editor} />

        <TableColumnMenu appendTo={containerRef} editor={editor} />

        <ImageMenu appendTo={containerRef} editor={editor} />
      </div>
    </Provider>
  );
};
