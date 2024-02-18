import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import generatePDF, { Resolution, Options } from "react-to-pdf";
import { message } from "@/packages/core";

import { Button } from "../button";

export interface PdfProps {
  /**
   * Reference of the container that will be used for export pdf.
   */
  appendTo: React.RefObject<HTMLDivElement>;
}

const MM_TO_PX = 3.77952755906;
const PAGE_HEIGHT = 300;

const options: Options = {
  filename: "Content.pdf",
  method: "open",
  resolution: Resolution.MEDIUM,
  page: {
    format: "A4",
    orientation: "portrait",
    margin: { left: 25, right: 15, top: 15, bottom: 15 },
  },
  canvas: {
    mimeType: "image/png",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      format: [300, 210],
    },
  },
};

const calcElemHeight = (offsetTop: number) => {
  const _page_height = PAGE_HEIGHT * MM_TO_PX;
  const _margin = 15 * MM_TO_PX * 2;
  let _offsetTop = offsetTop;

  const pageNumber = Math.ceil((_margin + _offsetTop) / _page_height);
  _offsetTop -= (_page_height - _margin) * (pageNumber - 1);

  return _page_height - _margin - _offsetTop;
};

export const Pdf: React.FC = () => {
  const { editor } = useCurrentEditor();

  const [loading, setLoading] = React.useState(false);

  const onExecCommand = async () => {
    if (!editor) return;

    setLoading(true);

    // generate temp element
    const temp = document.createElement("div");
    temp.style.setProperty("position", "absolute");
    temp.style.setProperty("left", "-10000px");
    temp.style.setProperty("max-width", "600px");
    temp.style.setProperty("margin", "0 auto");
    // add HTML
    temp.innerHTML += editor.getHTML();
    // add temp elemento to body
    document.body.appendChild(temp);
    // remove all data attributes and classes
    const elements = temp.querySelectorAll<HTMLElement>("*");
    elements.forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name.startsWith("data-")) {
          element.removeAttribute(attr.name);
        }
      });

      if (Array.from(element.attributes).some((attr) => attr.name === "page-break")) {
        const _remaining_height = calcElemHeight(element.offsetTop);
        element.style.height = `${_remaining_height}px`;
      }

      element.removeAttribute("class");
    });
    // generate
    generatePDF(() => temp, options).then(() => {
      message.success("Content exported to PDF!");
      document.body.removeChild(temp);
      temp.remove();
      setLoading(false);
    });
  };

  return (
    <React.Fragment>
      <Button
        icon={{
          name: loading ? "Loader2" : "FileType2",
          className: loading ? "ny-animate-spin" : "",
        }}
        tip="Export to PDF"
        onClick={onExecCommand}
      ></Button>
    </React.Fragment>
  );
};
