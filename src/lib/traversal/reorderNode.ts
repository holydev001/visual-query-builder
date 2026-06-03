import { GroupNode } from "../../types/query";

export function reorderChildren(
  root: GroupNode,
  groupId: string,
  activeId: string,
  overId: string
): GroupNode {
  if (root.id === groupId) {
    const oldIndex = root.children.findIndex((child) => child.id === activeId);
    const newIndex = root.children.findIndex((child) => child.id === overId);

    if (oldIndex === -1 || newIndex === -1) return root;

    const updatedChildren = [...root.children];
    const [movedItem] = updatedChildren.splice(oldIndex, 1);
    updatedChildren.splice(newIndex, 0, movedItem);

    return {
      ...root,
      children: updatedChildren,
    };
  }

  return {
    ...root,
    children: root.children.map((child) => {
      if (child.type === "group") {
        return reorderChildren(child, groupId, activeId, overId);
      }

      return child;
    }),
  };
}