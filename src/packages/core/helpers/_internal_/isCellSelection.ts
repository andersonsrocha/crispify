/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellSelection } from "@tiptap/pm/tables";

export const isCellSelection = (selection: any) => {
  return selection instanceof CellSelection;
};
