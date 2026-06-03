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
}

export const useQueryStore = create<QueryStore>((set, get) => ({
  root: createGroup(),

  history: [],

  presets: [],

  setRoot: (root) => {
    set((state) => ({
      root,

      history: [...state.history.slice(-9), structuredClone(root)],
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
}));
