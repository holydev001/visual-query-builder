"use client";

import { Play, Loader2 } from "lucide-react";
import { useQueryStore } from "../../src/store/query-store";
import { validateQuery } from "../../src/lib/validation/validateQuery";

export default function ExecuteQueryButton() {
  const root = useQueryStore((s) => s.root);
  const isExecuting = useQueryStore((s) => s.isExecuting);
  const executeCurrentQuery = useQueryStore((s) => s.executeCurrentQuery);

  const hasContent = root.children.length > 0;
  const selectedDataset = useQueryStore((s) => s.selectedDataset);
  const hasErrors =
    hasContent && validateQuery(root, selectedDataset).length > 0;
  const disabled = !hasContent || hasErrors || isExecuting;

  return (
    <button
      onClick={executeCurrentQuery}
      disabled={disabled}
      className="inline-flex h-11 items-center justify-center gap-2 border border-emerald-500/30 bg-emerald-500 px-5 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/10 disabled:text-black/35 dark:disabled:border-white/10 dark:disabled:bg-white/[0.05] dark:disabled:text-white/35"
    >
      {isExecuting ? (
        <Loader2 size={17} className="animate-spin" />
      ) : (
        <Play size={17} />
      )}
      {isExecuting ? "Executing..." : "Execute Query"}
    </button>
  );
}
