/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableMap } from "@tiptap/pm/tables";
import { isCellSelection } from "./_internal_/isCellSelection";
import { isRectSelected } from "./_internal_/isRectSelected";

export const isColumnSelected = (columnIndex: number) => (selection: any) => {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1));

    return isRectSelected({
      left: columnIndex,
      right: columnIndex + 1,
      top: 0,
      bottom: map.height,
    })(selection);
  }

  return false;
};
