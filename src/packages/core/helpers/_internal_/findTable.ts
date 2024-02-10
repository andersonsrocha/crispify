import { findParentNode } from "@tiptap/core";
import { Selection } from "@tiptap/pm/state";

export const findTable = (selection: Selection) => {
  return findParentNode((node) => node.type.spec.tableRole && node.type.spec.tableRole === "table")(selection);
};
