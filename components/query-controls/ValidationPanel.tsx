"use client";

import { AlertTriangle, CheckCircle2, Info, Loader2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryStore } from "../../src/store/query-store";
import { validateQuery } from "../../src/lib/validation/validateQuery";

function hasQueryContent(root: { children: unknown[] }) {
  return root.children.length > 0;
}

export default function ValidationPanel() {
  const root = useQueryStore((s) => s.root);
  const isExecuting = useQueryStore((s) => s.isExecuting);
  const executeCurrentQuery = useQueryStore((s) => s.executeCurrentQuery);

  const hasContent = hasQueryContent(root);
  const selectedDataset = useQueryStore((s) => s.selectedDataset);
  const errors = hasContent ? validateQuery(root, selectedDataset) : [];
  const isValid = hasContent && errors.length === 0;
  const disabled = !hasContent || !isValid || isExecuting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="border border-black/10 bg-white px-5 py-4 transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.035]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`grid size-10 shrink-0 place-items-center ${
              !hasContent
                ? "bg-emerald-500/15 text-emerald-500"
                : isValid
                  ? "bg-emerald-500 text-black"
                  : "bg-red-500 text-white"
            }`}
          >
            {!hasContent ? (
              <Info size={20} />
            ) : isValid ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertTriangle size={20} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-[#06110d] dark:text-white">
              {!hasContent
                ? "Start building your query"
                : isValid
                  ? "Query is valid"
                  : `Validation issues: ${errors.length}`}
            </h3>

            <p className="mt-1 text-sm text-black/55 dark:text-white/55">
              {!hasContent
                ? "Add a condition or group to begin. Execution becomes available once the query is valid."
                : isValid
                  ? "Your query is ready. Execute it to inspect matching results."
                  : "Resolve the issues below before executing this query."}
            </p>

            {!isValid && hasContent && (
              <ul className="mt-3 space-y-2 text-sm text-black/65 dark:text-white/65">
                {errors.map((error) => (
                  <li
                    key={`${error.nodeId}-${error.message}`}
                    className="flex gap-2"
                  >
                    <span className="mt-[7px] size-1.5 shrink-0 bg-red-500" />
                    <span>{error.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          onClick={executeCurrentQuery}
          disabled={disabled}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-emerald-500/30 bg-emerald-500 px-5 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/10 disabled:text-black/35 dark:disabled:border-white/10 dark:disabled:bg-white/[0.05] dark:disabled:text-white/35"
        >
          {isExecuting ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Play size={17} />
          )}
          {isExecuting ? "Executing..." : "Execute Query"}
        </button>
      </div>
    </motion.div>
  );
}
