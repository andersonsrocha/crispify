import { Extension } from "@tiptap/core";
import generatePDF, { Options, Resolution } from "react-to-pdf";
import _ from "lodash";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    pdf: {
      addToPDF: () => ReturnType;
    };
  }
}

export interface PDFOptions extends Omit<Options, "overrides"> {
  page: Omit<Options["page"], "format"> & {
    format: [number, number];
    margin: NonNullable<NonNullable<Options["page"]>["margin"]>;
  };
  method: "open" | "save";
}

// convert from mm to pixel
const MM_TO_PX = 3.77952755906;

// total page height in mm.
const DEFAULT_PAGE_HEIGHT = 300;
// default value of margins.
const DEFAULT_PAGE_MARGIN = 15;

/**
 * Calculates the remaining space on the page to create a page break.
 *
 * @param options export configuration.
 * @param offsetTop distance of the element from the top of the page.
 * @returns remaining page height.
 */
const calcElemHeight = (options: PDFOptions, offsetTop: number) => {
  const { page } = options;
  // page dimensions
  const _page_format = page.format;
  // page margins
  const _page_margin_top = _.isNumber(page.margin) ? page.margin : page.margin["top"] || DEFAULT_PAGE_MARGIN;
  const _page_margin_bottom = _.isNumber(page.margin) ? page.margin : page.margin["bottom"] || DEFAULT_PAGE_MARGIN;
  // page height
  const _page_height = _page_format[0] * MM_TO_PX;
  // calculate page margins.
  const _margins = _page_margin_top * MM_TO_PX + _page_margin_bottom * MM_TO_PX;
  let _offsetTop = offsetTop;

  const pageNumber = Math.ceil((_margins + _offsetTop) / _page_height);
  _offsetTop -= (_page_height - _margins) * (pageNumber - 1);

  return _page_height - _margins - _offsetTop;
};

export const PDF = Extension.create<PDFOptions>({
  addOptions() {
    return {
      filename: "temp.pdf",
      method: "open",
      resolution: Resolution.MEDIUM,
      page: {
        format: [DEFAULT_PAGE_HEIGHT, 210],
        orientation: "portrait",
        margin: { left: 25, right: DEFAULT_PAGE_MARGIN, top: DEFAULT_PAGE_MARGIN, bottom: DEFAULT_PAGE_MARGIN },
      },
      canvas: {
        mimeType: "image/png",
        qualityRatio: 1,
      },
    };
  },

  addCommands() {
    return {
      addToPDF:
        () =>
        ({ editor }) => {
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
              const _remaining_height = calcElemHeight(this.options, element.offsetTop);
              element.style.height = `${_remaining_height}px`;
            }

            element.removeAttribute("class");
          });
          // generate
          generatePDF(() => temp, this.options).then(() => {
            document.body.removeChild(temp);
            temp.remove();
          });

          return true;
        },
    };
  },
});
