"use client";

import { useQueryStore } from "../../src/store/query-store";

export default function History() {
  const history = useQueryStore((s) => s.history);

  return (
    <div>
      <h3>History</h3>

      <p>
        Snapshots:
        {history.length}
      </p>
    </div>
  );
}
