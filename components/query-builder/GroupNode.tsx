"use client";
import { GroupNode as GroupType } from "../../src/types/query";
import ConditionNode from "./ConditionNode";
import {
  createCondition,
  createGroup,
} from "../../src/lib/helpers/queryFactory";
import { useQueryStore } from "../../src/store/query-store";
import { updateNode } from "../../src/lib/traversal/updateNode";
import { removeNode } from "../../src/lib/traversal/removeNode";

interface Props {
  node: GroupType;
}

export default function GroupNode({ node }: Props) {
  const root = useQueryStore((state) => state.root);
  const setRoot = useQueryStore((state) => state.setRoot);

  function addCondition() {
    setRoot(
      updateNode(root, node.id, (group: any) => ({
        ...group,
        children: [...group.children, createCondition()],
      })),
    );
  }

  function toggleCollapse() {
    setRoot(
      updateNode(root, node.id, (group: any) => ({
        ...group,
        collapsed: !group.collapsed,
      })),
    );
  }

  function addGroup() {
    setRoot(
      updateNode(root, node.id, (group: any) => ({
        ...group,
        children: [...group.children, createGroup()],
      })),
    );
  }

  return (
    <div
      className="
relative
pl-4
mt-3
border-l
border-neutral-700
"
    >
      {/* Updated wrapper with wrapping, layout, and spacing classes */}
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <select
          value={node.logic}
          onChange={(e) => {
            setRoot(
              updateNode(root, node.id, (group: any) => ({
                ...group,
                logic: e.target.value,
              })),
            );
          }}
        >
          <option>AND</option>
          <option>OR</option>
        </select>

        <button onClick={addCondition}>+ Condition</button>

        <button onClick={addGroup}>+ Group</button>

        <button onClick={toggleCollapse}>
          {node.collapsed ? "Expand" : "Collapse"}
        </button>

        {/* Updated delete button structure and conditional rendering */}
        {root.id !== node.id && (
          <button onClick={() => setRoot(removeNode(root, node.id))}>
            Delete
          </button>
        )}
      </div>

      {!node.collapsed && (
        <div className="space-y-3 mt-4">
          {node.children.map((child) => {
            if (child.type === "group") {
              return <GroupNode key={child.id} node={child} />;
            }
            return <ConditionNode key={child.id} node={child} />;
          })}
        </div>
      )}
    </div>
  );
}
