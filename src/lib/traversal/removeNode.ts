import { GroupNode } from "../../types/query";

export function removeNode(root: GroupNode, id: string): GroupNode {
  return {
    ...root,

    children: root.children

      .filter((child) => child.id !== id)

      .map((child) => {
        if (child.type === "group") {
          return removeNode(child, id);
        }

        return child;
      }),
  };
}
