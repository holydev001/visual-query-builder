import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GroupNode } from "../types/query";
import { createGroup } from "../lib/helpers/queryFactory";
import { executeQuery } from "../lib/query-engine/evaluateQuery";
import { validateQuery } from "../lib/validation/validateQuery";

import { users } from "../mock/users";
import { orders } from "../mock/orders";
import { events } from "../mock/events";

export type DatasetType = "users" | "orders" | "events";

interface ExecutionHistoryItem {
  id: string;
  timestamp: number;
  dataset: DatasetType;
  resultCount: number;
  query: GroupNode;
}

interface QueryStore {
  root: GroupNode;

  history: GroupNode[];
  future: GroupNode[];
  presets: GroupNode[];

  selectedDataset: DatasetType;

  executedResults: any[];
  hasExecuted: boolean;
  isExecuting: boolean;

  executionHistory: ExecutionHistoryItem[];

  setRoot: (root: GroupNode) => void;
  updateRoot: (updater: (root: GroupNode) => GroupNode) => void;

  undo: () => void;
  redo: () => void;
  clearQuery: () => void;

  savePreset: () => void;
  loadPreset: (index: number) => void;

  setDataset: (dataset: DatasetType) => void;
  executeCurrentQuery: () => void;
  loadExecutionHistory: (id: string) => void;
}

function getDataset(dataset: DatasetType) {
  if (dataset === "orders") return orders;
  if (dataset === "events") return events;

  return users;
}

export const useQueryStore = create<QueryStore>()(
  persist(
    (set, get) => ({
      root: createGroup(),

      history: [],
      future: [],
      presets: [],

      selectedDataset: "users",

      executedResults: [],
      hasExecuted: false,
      isExecuting: false,

      executionHistory: [],

      setRoot: (root) => {
        set((state) => ({
          root,
          history: [...state.history.slice(-19), structuredClone(root)],
          future: [],
        }));
      },

      updateRoot: (updater) => {
        const next = updater(get().root);
        get().setRoot(next);
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

      clearQuery: () => {
        get().setRoot(createGroup());

        set({
          executedResults: [],
          hasExecuted: false,
          isExecuting: false,
        });
      },

      savePreset: () => {
        set((state) => ({
          presets: [...state.presets, structuredClone(state.root)],
        }));
      },

      loadPreset: (index) => {
        const preset = get().presets[index];

        if (!preset) return;

        get().setRoot(structuredClone(preset));

        set({
          executedResults: [],
          hasExecuted: false,
          isExecuting: false,
        });
      },

      setDataset: (dataset) => {
        set({
          selectedDataset: dataset,
          executedResults: [],
          hasExecuted: false,
          isExecuting: false,
        });
      },

      executeCurrentQuery: () => {
        const root = get().root;
        const dataset = get().selectedDataset;
        const errors = validateQuery(root, dataset);

        if (root.children.length === 0 || errors.length > 0) return;

        set({ isExecuting: true });

        setTimeout(() => {
          const source = getDataset(dataset);
          const results = executeQuery(root, source);

          set((state) => ({
            executedResults: results,
            hasExecuted: true,
            isExecuting: false,
            executionHistory: [
              {
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                dataset,
                resultCount: results.length,
                query: structuredClone(root),
              },
              ...state.executionHistory,
            ].slice(0, 20),
          }));
        }, 500);
      },

      loadExecutionHistory: (id) => {
        const item = get().executionHistory.find((entry) => entry.id === id);

        if (!item) return;

        set({
          root: structuredClone(item.query),
          selectedDataset: item.dataset,
          executedResults: [],
          hasExecuted: false,
          isExecuting: false,
        });
      },
    }),
    {
      name: "visual-query-builder-storage",
    },
  ),
);
