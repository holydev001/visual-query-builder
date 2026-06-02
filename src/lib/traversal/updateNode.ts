import { GroupNode } from "../../types/query";

export function updateNode(
  root: GroupNode,
  id: string,
  updater: (node: any) => any
): GroupNode {
  if (root.id === id) {
    return updater(root);
  }

  return {
    ...root,
    children: root.children.map((child) => {
      if (child.id === id) {
        return updater(child);
      }

      if (child.type === "group") {
        return updateNode(child, id, updater);
      }

      return child;
    }),
  };
}