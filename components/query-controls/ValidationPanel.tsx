"use client";

import { useQueryStore } from "../../src/store/query-store";
import { validateQuery } from "../../src/lib/validation/validateQuery";

export default function ValidationPanel() {
  const root = useQueryStore((s) => s.root);
  const errors = validateQuery(root);

  if (errors.length === 0) {
    return (
      <div className="rounded border p-3 text-sm">
        Query is valid
      </div>
    );
  }

  return (
    <div className="rounded border p-3 text-sm">
      <p>Validation issues: {errors.length}</p>

      <ul className="mt-2 list-disc pl-5">
        {errors.map((error) => (
          <li key={`${error.nodeId}-${error.message}`}>
            {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}