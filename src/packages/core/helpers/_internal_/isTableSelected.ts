/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableMap } from "@tiptap/pm/tables";
import { isCellSelection } from "./isCellSelection";
import { isRectSelected } from "./isRectSelected";

export const isTableSelected = (selection: any) => {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1));

    return isRectSelected({
      left: 0,
      right: map.width,
      top: 0,
      bottom: map.height,
    })(selection);
  }

  return false;
};
