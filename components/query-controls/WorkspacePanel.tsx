"use client";

import { Clock3, Database, History, Layers3 } from "lucide-react";
import { DatasetType, useQueryStore } from "../../src/store/query-store";
import ThemedSelect from "../shared/ThemedSelect";

const datasets: DatasetType[] = ["users", "orders", "events"];

export default function WorkspacePanel() {
  const selectedDataset = useQueryStore((s) => s.selectedDataset);
  const setDataset = useQueryStore((s) => s.setDataset);
  const presets = useQueryStore((s) => s.presets);
  const loadPreset = useQueryStore((s) => s.loadPreset);
  const executionHistory = useQueryStore((s) => s.executionHistory);
  const loadExecutionHistory = useQueryStore((s) => s.loadExecutionHistory);

  return (
    <section className="space-y-4">
      <div className="border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-2">
          <Database size={18} className="text-emerald-500" />
          <h3 className="font-bold">Datasets</h3>
        </div>

        <div className="space-y-2">
          {datasets.map((dataset) => {
            const active = selectedDataset === dataset;

            return (
              <button
                key={dataset}
                onClick={() => setDataset(dataset)}
                className={`w-full border px-3 py-2 text-left text-sm font-medium capitalize transition ${
                  active
                    ? "border-emerald-500 bg-emerald-500 text-black"
                    : "border-black/10 bg-[#f8faf8] text-black/65 hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65"
                }`}
              >
                {dataset}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-2">
          <Layers3 size={18} className="text-emerald-500" />
          <h3 className="font-bold">Presets</h3>
        </div>

        <ThemedSelect
          value={presets.length > 0 ? "0" : ""}
          disabled={presets.length === 0}
          options={
            presets.length > 0
              ? presets.map((_, index) => ({
                  label: `Preset ${index + 1}`,
                  value: String(index),
                }))
              : [
                  {
                    label: "No presets",
                    value: "",
                  },
                ]
          }
          className="w-full"
          onChange={(value) => {
            if (!value) return;

            loadPreset(Number(value));
          }}
        />

        {presets.length === 0 && (
          <p className="mt-3 text-xs text-black/50 dark:text-white/50">
            Saved presets will appear here.
          </p>
        )}
      </div>

      <div className="border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="mb-4 flex items-center gap-2">
          <History size={18} className="text-emerald-500" />
          <h3 className="font-bold">Execution History</h3>
        </div>

        <div className="max-h-[340px] space-y-2 overflow-auto">
          {executionHistory.length === 0 && (
            <p className="text-sm text-black/50 dark:text-white/50">
              No executed queries yet.
            </p>
          )}

          {executionHistory.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                console.log("clicked history", item.id);
                loadExecutionHistory(item.id);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  loadExecutionHistory(item.id);
                }
              }}
              className="relative z-10 w-full cursor-pointer border border-black/10 bg-[#f8faf8] p-3 text-left transition hover:border-emerald-500/50 hover:bg-emerald-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium capitalize text-[#06110d] dark:text-white">
                  {item.dataset}
                </span>

                <Clock3
                  size={14}
                  className="text-black/40 dark:text-white/40"
                />
              </div>

              <p className="mt-2 text-xs text-black/55 dark:text-white/55">
                {item.resultCount} result{item.resultCount === 1 ? "" : "s"}
              </p>

              <p className="mt-1 text-[11px] text-black/40 dark:text-white/40">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
