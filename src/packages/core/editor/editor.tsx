import React from "react";
import { customClipboardPaste } from "@/packages/core/helpers";
import { StarterKit, StarterKitOptions } from "@/packages/extension-starter-kit";
import { EditorProvider } from "@tiptap/react";
import { ConfigProvider, theme } from "antd";
import cls from "classnames";
import _ from "lodash";

import { EditorHeader } from "./editor-header";
import { ImageMenu } from "../image-menu";
import { ColumnsMenu } from "../columns-menu";
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

export const Notyist: React.FC<React.PropsWithChildren<NotyistProps>> = (props) => {
  const { bordered, config, editable = true, mode = "WYSIWYG", height = 350 } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { theme: current } = React.useContext(ConfigProvider.ConfigContext);
  const isDarkMode = _.isEqual(current?.algorithm, theme.darkAlgorithm);

  const classNames = cls("ny-p-2 ny-overflow-y-auto ny-h-[var(--height)] focus:ny-outline-none", {
    "ny-border ny-border-solid ny-border-colorBorder": bordered,
    "ny-border-t-0": mode === "WYSIWYG",
  });

  const styles = {
    "--height": Number.isNaN(Number(height)) ? height : `${height}px`,
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
        <EditorProvider
          autofocus
          slotBefore={mode !== "notion" && <EditorHeader fullscreen={{ appendTo: containerRef }} />}
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
    </Provider>
  );
};
