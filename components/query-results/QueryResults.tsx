"use client";

import { Database, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useQueryStore } from "../../src/store/query-store";

const datasetLabels = {
  users: "Users",
  orders: "Orders",
  events: "Events",
};

const fallbackColumns = {
  users: ["id", "name", "age", "country", "status"],
  orders: ["id", "customer", "amount", "status", "country", "createdAt"],
  events: ["id", "title", "category", "severity", "user", "createdAt"],
};

function formatHeader(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export default function QueryResults() {
  const results = useQueryStore((s) => s.executedResults);
  const hasExecuted = useQueryStore((s) => s.hasExecuted);
  const isExecuting = useQueryStore((s) => s.isExecuting);
  const selectedDataset = useQueryStore((s) => s.selectedDataset);

  const columns = useMemo(() => {
    if (results.length > 0) {
      return Object.keys(results[0]);
    }

    return fallbackColumns[selectedDataset];
  }, [results, selectedDataset]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="overflow-hidden border border-black/10 bg-white transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.035]"
    >
      <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center bg-emerald-500 text-black">
            <Database size={19} />
          </div>

          <div>
            <h2 className="font-bold text-[#06110d] dark:text-white">
              {datasetLabels[selectedDataset]} Results
            </h2>

            <p className="text-xs text-black/50 dark:text-white/50">
              {hasExecuted
                ? `${results.length} matching record${
                    results.length === 1 ? "" : "s"
                  }`
                : `Execute a ${selectedDataset} query to inspect results`}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {isExecuting && (
          <div className="flex min-h-[260px] items-center justify-center gap-3 text-black/55 dark:text-white/55">
            <Loader2 className="animate-spin text-emerald-500" size={20} />
            Executing query...
          </div>
        )}

        {!isExecuting && !hasExecuted && (
          <div className="flex min-h-[260px] items-center justify-center border border-dashed border-black/10 bg-[#f8faf8] p-6 text-center text-sm text-black/50 dark:border-white/10 dark:bg-[#020807] dark:text-white/50">
            Results will appear here after you click Execute Query.
          </div>
        )}

        {!isExecuting && hasExecuted && results.length === 0 && (
          <div className="flex min-h-[260px] items-center justify-center border border-dashed border-black/10 bg-[#f8faf8] p-6 text-center text-sm text-black/50 dark:border-white/10 dark:bg-[#020807] dark:text-white/50">
            No matching results found for this query.
          </div>
        )}

        {!isExecuting && hasExecuted && results.length > 0 && (
          <div className="overflow-auto border border-black/10 dark:border-white/10">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-[#f8faf8] text-black/55 dark:bg-[#020807] dark:text-white/55">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="whitespace-nowrap border-b border-black/10 p-3 dark:border-white/10"
                    >
                      {formatHeader(column)}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {results.map((row, index) => (
                  <tr
                    key={row.id ?? index}
                    className="transition hover:bg-black/[0.025] dark:hover:bg-white/[0.035]"
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row.id ?? index}-${column}`}
                        className="whitespace-nowrap border-b border-black/10 p-3 dark:border-white/10"
                      >
                        {formatValue(row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.section>
  );
}
