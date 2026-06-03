import { create } from "zustand";

import { GroupNode } from "../types/query";

import { createGroup } from "../lib/helpers/queryFactory";

interface QueryStore {
  root: GroupNode;

  history: GroupNode[];

  presets: GroupNode[];

  setRoot: (root: GroupNode) => void;

  updateRoot: (updater: (root: GroupNode) => GroupNode) => void;

  savePreset: () => void;

  loadPreset: (index: number) => void;

  clearQuery: () => void;

  future: GroupNode[];

  undo: () => void;

  redo: () => void;
}

export const useQueryStore = create<QueryStore>((set, get) => ({
  root: createGroup(),

  history: [],

  presets: [],

  future: [],

  setRoot: (root) => {
    set((state) => ({
      root,
      history: [...state.history.slice(-9), structuredClone(root)],
      future: [],
    }));
  },

  updateRoot: (updater) => {
    const next = updater(get().root);

    get().setRoot(next);
  },

  savePreset: () => {
    set((state) => ({
      presets: [...state.presets, structuredClone(state.root)],
    }));
  },

  loadPreset: (index) => {
    const preset = get().presets[index];

    if (preset) {
      get().setRoot(structuredClone(preset));
    }
  },

  clearQuery: () => {
    get().setRoot(createGroup());
  },

  undo: () => {
    const history = get().history;

    if (history.length < 2) return;

    const current = history[history.length - 1];
    const previous = history[history.length - 2];

    set({
      root: structuredClone(previous),
      history: history.slice(0, -1),
      future: [structuredClone(current), ...get().future],
    });
  },

  redo: () => {
    const future = get().future;

    if (future.length === 0) return;

    const next = future[0];

    set({
      root: structuredClone(next),
      history: [...get().history, structuredClone(next)],
      future: future.slice(1),
    });
  },
}));
