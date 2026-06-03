"use client";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function SortableNode({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`flex items-start gap-2 ${
        isDragging ? "z-20 opacity-60" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-1 grid h-10 w-8 shrink-0 cursor-grab place-items-center border border-black/10 bg-white text-black/40 transition hover:text-emerald-500 active:cursor-grabbing dark:border-white/10 dark:bg-white/[0.04] dark:text-white/40 dark:hover:text-emerald-400"
        aria-label="Drag item"
      >
        <GripVertical size={16} />
      </button>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}