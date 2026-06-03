"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function SortableNode({ id, children }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="relative"
    >
      <button
        {...attributes}
        {...listeners}
        className="mr-2 cursor-grab rounded border px-2"
      >
        ::
      </button>

      {children}
    </div>
  );
}