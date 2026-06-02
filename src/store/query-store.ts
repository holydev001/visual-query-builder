import { create } from "zustand";

import { GroupNode } from "../types/query";

import { createGroup } from "../lib/helpers/queryFactory";

interface QueryStore {
  root: GroupNode;

  setRoot: (root: GroupNode) => void;

  updateRoot: (updater: (root: GroupNode) => GroupNode) => void;
}

export const useQueryStore = create<QueryStore>((set) => ({
  root: createGroup(),

  setRoot: (root) => set({ root }),

  updateRoot: (updater) =>
    set((state) => ({
      root: updater(state.root),
    })),
}));
