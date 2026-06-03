"use client";

import { useQueryStore } from "../../src/store/query-store";

export default function QueryControls() {
  const {
    root,

    setRoot,

    savePreset,

    presets,

    loadPreset,

    clearQuery,

    undo,

    redo,
  } = useQueryStore();

  function exportJSON() {
    const data = JSON.stringify(root, null, 2);

    navigator.clipboard.writeText(data);

    alert("Copied");
  }

  function importJSON() {
    const input = prompt("Paste JSON");

    if (!input) return;

    try {
      const parsed = JSON.parse(input);

      setRoot(parsed);
    } catch {
      alert("Invalid JSON");
    }
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button onClick={exportJSON}>Export</button>

      <button onClick={importJSON}>Import</button>

      <button onClick={savePreset}>Save Preset</button>

      <button onClick={undo}>Undo</button>

      <button onClick={redo}>Redo</button>

      <button onClick={clearQuery}>Clear</button>

      <select onChange={(e) => loadPreset(Number(e.target.value))}>
        <option>Presets</option>

        {presets.map((_, index) => (
          <option key={index} value={index}>
            Preset {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
