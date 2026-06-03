"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useQueryStore } from "../../src/store/query-store";

interface Props {
  mode: "import" | "export";
  open: boolean;
  onClose: () => void;
}

export default function QueryJsonModal({ mode, open, onClose }: Props) {
  const root = useQueryStore((s) => s.root);
  const setRoot = useQueryStore((s) => s.setRoot);
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const exportValue = JSON.stringify(root, null, 2);

  async function handleCopy() {
    await navigator.clipboard.writeText(exportValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function handleImport() {
    try {
      const parsed = JSON.parse(value);
      setRoot(parsed);
      onClose();
      setValue("");
    } catch {
      alert("Invalid JSON");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl border border-black/10 bg-[#f8faf8] shadow-2xl dark:border-white/10 dark:bg-[#020807]">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div>
            <h2 className="font-bold text-[#06110d] dark:text-white">
              {mode === "export" ? "Export Query JSON" : "Import Query JSON"}
            </h2>
            <p className="text-sm text-black/50 dark:text-white/50">
              {mode === "export"
                ? "Copy your current query structure."
                : "Paste a valid QueryCraft JSON structure."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="grid size-9 place-items-center border border-black/10 bg-white text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <textarea
            value={mode === "export" ? exportValue : value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={mode === "export"}
            className="h-[360px] w-full resize-none border border-black/10 bg-white p-4 font-mono text-sm text-[#06110d] outline-none dark:border-white/10 dark:bg-black/30 dark:text-emerald-300"
          />

          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            >
              Cancel
            </button>

            {mode === "export" ? (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-emerald-500 px-5 py-3 text-sm font-semibold text-black"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "Copied" : "Copy JSON"}
              </button>
            ) : (
              <button
                onClick={handleImport}
                className="bg-emerald-500 px-5 py-3 text-sm font-semibold text-black"
              >
                Import Query
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}