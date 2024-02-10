import { Transaction } from "@tiptap/pm/state";
import { CellSelection, TableMap } from "@tiptap/pm/tables";
import { findTable } from "./_internal_/findTable";

const select = (type: "row" | "column") => (index: number) => (tr: Transaction) => {
  const table = findTable(tr.selection);
  const isRowSelection = type === "row";

  if (table) {
    const map = TableMap.get(table.node);

    // Check if the index is valid
    if (index >= 0 && index < (isRowSelection ? map.height : map.width)) {
      const left = isRowSelection ? 0 : index;
      const top = isRowSelection ? index : 0;
      const right = isRowSelection ? map.width : index + 1;
      const bottom = isRowSelection ? index + 1 : map.height;

      const cellsInFirstRow = map.cellsInRect({
        left,
        top,
        right: isRowSelection ? right : left + 1,
        bottom: isRowSelection ? top + 1 : bottom,
      });

      const cellsInLastRow =
        bottom - top === 1
          ? cellsInFirstRow
          : map.cellsInRect({
              left: isRowSelection ? left : right - 1,
              top: isRowSelection ? bottom - 1 : top,
              right,
              bottom,
            });

      const head = table.start + cellsInFirstRow[0];
      const anchor = table.start + cellsInLastRow[cellsInLastRow.length - 1];
      const $head = tr.doc.resolve(head);
      const $anchor = tr.doc.resolve(anchor);

      return tr.setSelection(new CellSelection($anchor, $head));
    }
  }
  return tr;
};

export const selectColumn = select("column");

export const selectRow = select("row");
