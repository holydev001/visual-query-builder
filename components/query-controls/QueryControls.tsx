"use client";

import { Download, Upload, Save, Undo2, Redo2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useQueryStore } from "../../src/store/query-store";
import QueryJsonModal from "./QueryJsonModal";
import ThemedSelect from "@/components/shared/ThemedSelect";

export default function QueryControls() {
  const { savePreset, presets, loadPreset, clearQuery, undo, redo } =
    useQueryStore();

  const [modalMode, setModalMode] = useState<"import" | "export" | null>(null);

  const buttonClass =
    "inline-flex items-center justify-center gap-2 border border-black/10 bg-white px-2 py-2 text-sm font-medium text-black transition hover:bg-[#f8faf8] sm:px-3 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]";

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5">
        <button onClick={() => setModalMode("export")} className={buttonClass}>
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </button>

        <button onClick={() => setModalMode("import")} className={buttonClass}>
          <Upload size={16} />
          <span className="hidden sm:inline">Import</span>
        </button>

        <button onClick={savePreset} className={buttonClass}>
          <Save size={16} />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button onClick={undo} className={buttonClass}>
          <Undo2 size={16} />
          <span className="hidden sm:inline">Undo</span>
        </button>

        <button onClick={redo} className={buttonClass}>
          <Redo2 size={16} />
          <span className="hidden sm:inline">Redo</span>
        </button>

        <button onClick={clearQuery} className={buttonClass}>
          <Trash2 size={16} />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      <QueryJsonModal
        mode={modalMode ?? "export"}
        open={modalMode !== null}
        onClose={() => setModalMode(null)}
      />
    </>
  );
}
