"use client";

import { useQueryStore } from "../../src/store/query-store";

export default function History() {
  const history = useQueryStore((s) => s.history);
  const future = useQueryStore((s) => s.future);
  const undo = useQueryStore((s) => s.undo);
  const redo = useQueryStore((s) => s.redo);

  return (
    <div className="rounded border p-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-medium">History</h3>
          <p>
            Past: {history.length} | Redo: {future.length}
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={undo} disabled={history.length < 2}>
            Undo
          </button>

          <button onClick={redo} disabled={future.length === 0}>
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}
