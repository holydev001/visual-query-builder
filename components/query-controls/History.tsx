"use client";

import { Database, History, Layers3, Clock3 } from "lucide-react";

import { useQueryStore } from "../../src/store/query-store";

const datasets = ["users", "orders", "events"] as const;

export default function WorkspacePanel() {
  const { selectedDataset, setDataset, presets, loadPreset, executionHistory } =
    useQueryStore();

  return (
    <section className="space-y-6">
      {/* datasets */}

      <div className="border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-2">
          <Database size={18} />

          <h3 className="font-bold">Dataset</h3>
        </div>

        <div className="space-y-2">
          {datasets.map((dataset) => {
            const active = selectedDataset === dataset;

            return (
              <button
                key={dataset}
                onClick={() => setDataset(dataset)}
                className={`
w-full
border
px-3
py-2
text-left
text-sm
transition

${
  active
    ? "border-emerald-500 bg-emerald-500 text-black"
    : "border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.04]"
}
`}
              >
                {dataset}
              </button>
            );
          })}
        </div>
      </div>

      {/* presets */}

      <div className="border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-2">
          <Layers3 size={18} />

          <h3 className="font-bold">Presets</h3>
        </div>

        <select
          className="
w-full
border
border-black/10
bg-white
p-3

dark:border-white/10
dark:bg-white/[0.04]
"
          onChange={(e) => loadPreset(Number(e.target.value))}
        >
          <option>Select preset</option>

          {presets.map((_, index) => (
            <option key={index} value={index}>
              Preset {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* history */}

      <div className="border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-2">
          <History size={18} />

          <h3 className="font-bold">Execution History</h3>
        </div>

        <div className="space-y-2 max-h-[340px] overflow-auto">
          {executionHistory.length === 0 && (
            <p className="text-sm text-black/50 dark:text-white/50">
              No executed queries yet
            </p>
          )}

          {executionHistory.map((item) => (
            <div
              key={item.id}
              className="
border
border-black/10
p-3

dark:border-white/10
"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.dataset}</span>

                <Clock3 size={14} className="opacity-50" />
              </div>

              <p className="mt-2 text-xs opacity-60">
                {item.resultCount} results
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
