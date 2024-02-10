/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableMap } from "@tiptap/pm/tables";
import { isCellSelection } from "./_internal_/isCellSelection";
import { isRectSelected } from "./_internal_/isRectSelected";

export const isRowSelected = (rowIndex: number) => (selection: any) => {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1));

    return isRectSelected({
      left: 0,
      right: map.width,
      top: rowIndex,
      bottom: rowIndex + 1,
    })(selection);
  }

  return false;
};
