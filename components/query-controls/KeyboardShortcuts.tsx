"use client";

import { useEffect } from "react";
import { useQueryStore } from "../../src/store/query-store";

export default function KeyboardShortcuts() {
  const undo = useQueryStore((s) => s.undo);
  const redo = useQueryStore((s) => s.redo);
  const clearQuery = useQueryStore((s) => s.clearQuery);
  const savePreset = useQueryStore((s) => s.savePreset);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isTyping =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement;

      if (isTyping) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        savePreset();
      }

      if (event.key === "Escape") {
        clearQuery();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, clearQuery, savePreset]);

  return null;
}
