import { Node } from "@tiptap/pm/model";
import { Selection } from "@tiptap/pm/state";
import { TableMap } from "@tiptap/pm/tables";
import { findTable } from "./_internal_/findTable";

export const getCellsInColumn = (columnIndex: number | number[]) => (selection: Selection) => {
  const table = findTable(selection);
  if (table) {
    const map = TableMap.get(table.node);
    const indexes = Array.isArray(columnIndex) ? columnIndex : Array.from([columnIndex]);

    return indexes.reduce((acc, index) => {
      if (index >= 0 && index <= map.width - 1) {
        const cells = map.cellsInRect({
          left: index,
          right: index + 1,
          top: 0,
          bottom: map.height,
        });

        return acc.concat(
          cells.map((nodePos) => {
            const node = table.node.nodeAt(nodePos);
            const pos = nodePos + table.start;

            return { pos, start: pos + 1, node };
          })
        );
      }

      return acc;
    }, [] as { pos: number; start: number; node: Node | null | undefined }[]);
  }
  return null;
};
