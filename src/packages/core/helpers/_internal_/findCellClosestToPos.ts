import { Node, ResolvedPos } from "@tiptap/pm/model";
import { findParentNodeClosestToPos } from "./findParentNodeClosestToPos";

export const findCellClosestToPos = ($pos: ResolvedPos) => {
  const predicate = (node: Node) => node.type.spec.tableRole && /cell/i.test(node.type.spec.tableRole);

  return findParentNodeClosestToPos($pos, predicate);
};
