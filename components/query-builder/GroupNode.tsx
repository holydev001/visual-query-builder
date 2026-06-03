"use client";

import {
  ChevronDown,
  ChevronRight,
  FolderTree,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { GroupNode as GroupType } from "../../src/types/query";
import ConditionNode from "./ConditionNode";
import SortableNode from "./SortableNode";
import ThemedSelect from "../shared/ThemedSelect";

import {
  createCondition,
  createGroup,
} from "../../src/lib/helpers/queryFactory";
import { useQueryStore } from "../../src/store/query-store";
import { updateNode } from "../../src/lib/traversal/updateNode";
import { removeNode } from "../../src/lib/traversal/removeNode";
import { reorderChildren } from "../../src/lib/traversal/reorderNode";

interface Props {
  node: GroupType;
  depth?: number;
}

export default function GroupNode({ node, depth = 0 }: Props) {
  const root = useQueryStore((state) => state.root);
  const setRoot = useQueryStore((state) => state.setRoot);
  const isRoot = root.id === node.id;

  function addCondition() {
    setRoot(
      updateNode(root, node.id, (group: any) => ({
        ...group,
        children: [...group.children, createCondition()],
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

  function toggleCollapse() {
    setRoot(
      updateNode(root, node.id, (group: any) => ({
        ...group,
        collapsed: !group.collapsed,
      })),
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setRoot(reorderChildren(root, node.id, String(active.id), String(over.id)));
  }

  return (
    <motion.div
      layout
      className={`border-l transition-colors duration-500 ${
        depth === 0 ? "border-transparent pl-0" : "border-emerald-500/25 pl-4"
      }`}
    >
      <div className="border border-black/10 bg-[#f8faf8] p-4 transition-colors duration-500 dark:border-white/10 dark:bg-[#020807]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleCollapse}
              className="grid size-9 place-items-center border border-black/10 bg-white text-black transition hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]"
              aria-label="Toggle group"
            >
              {node.collapsed ? (
                <ChevronRight size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>

            <div className="grid size-9 place-items-center bg-emerald-500 text-black">
              <FolderTree size={17} />
            </div>

            <ThemedSelect
              value={node.logic}
              options={[
                { label: "AND", value: "AND" },
                { label: "OR", value: "OR" },
              ]}
              onChange={(value) => {
                setRoot(
                  updateNode(root, node.id, (group: any) => ({
                    ...group,
                    logic: value,
                  })),
                );
              }}
              className="min-w-[110px]"
            />

            <span className="text-xs text-black/45 dark:text-white/45">
              {node.children.length} item{node.children.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={addCondition}
              className="inline-flex h-9 items-center gap-2 border border-black/10 bg-white px-3 text-sm font-medium text-black transition hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]"
            >
              <Plus size={15} />
              Condition
            </button>

            <button
              onClick={addGroup}
              className="inline-flex h-9 items-center gap-2 border border-black/10 bg-white px-3 text-sm font-medium text-black transition hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]"
            >
              <Plus size={15} />
              Group
            </button>

            {!isRoot && (
              <button
                onClick={() => setRoot(removeNode(root, node.id))}
                className="grid h-9 w-9 place-items-center border border-red-500/20 bg-red-500/10 text-red-500 transition hover:bg-red-500/15"
                aria-label="Delete group"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {!node.collapsed && (
          <div className="mt-4">
            {node.children.length === 0 ? (
              <div className="border border-dashed border-black/10 bg-white/60 p-5 text-sm text-black/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/50">
                No rules yet. Add a condition or nested group to begin.
              </div>
            ) : (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={node.children.map((child) => child.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {node.children.map((child) => {
                      if (child.type === "group") {
                        return (
                          <SortableNode key={child.id} id={child.id}>
                            <GroupNode node={child} depth={depth + 1} />
                          </SortableNode>
                        );
                      }

                      return (
                        <SortableNode key={child.id} id={child.id}>
                          <ConditionNode node={child} />
                        </SortableNode>
                      );
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
