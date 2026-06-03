"use client";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { ConditionNode as ConditionType } from "../../src/types/query";
import { getSchema } from "../../src/mock/schema";
import { useQueryStore } from "../../src/store/query-store";
import { updateNode } from "../../src/lib/traversal/updateNode";
import { removeNode } from "../../src/lib/traversal/removeNode";
import { OPERATORS } from "../../src/lib/schema/operators";
import ValueInput from "./ValueInput";
import ThemedSelect from "../shared/ThemedSelect";

interface Props {
  node: ConditionType;
}

const inputClass =
  "h-10 min-w-[150px] border border-black/10 bg-[#f8faf8] px-3 text-sm text-[#06110d] outline-none transition focus:border-emerald-500 dark:border-white/10 dark:bg-[#020807] dark:text-white";

export default function ConditionNode({ node }: Props) {
  const root = useQueryStore((s) => s.root);
  const updateRoot = useQueryStore((s) => s.updateRoot);
  const selectedDataset = useQueryStore((s) => s.selectedDataset);
  const schema = getSchema(selectedDataset);
  const fieldData = schema.find((field) => field.name === node.field);

  function patch(updates: Partial<ConditionType>) {
    updateRoot((root) =>
      updateNode(root, node.id, (old: any) => ({
        ...old,
        ...updates,
      })),
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 border border-black/10 bg-white p-3 transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.035]"
    >
      <ThemedSelect
        value={node.field}
        options={schema.map((field) => ({
          label: field.name,
          value: field.name,
        }))}
        onChange={(value) =>
          patch({
            field: value,
            operator: "equals",
            value: "",
          })
        }
      />
      <ThemedSelect
        value={fieldData ? node.operator : ""}
        disabled={!fieldData}
        options={
          fieldData
            ? OPERATORS[fieldData.type].map((operator) => ({
                label: operator,
                value: operator,
              }))
            : []
        }
        onChange={(value) =>
          patch({
            operator: value as any,
          })
        }
      />

      <ValueInput
        type={fieldData?.type ?? "string"}
        value={node.value}
        options={fieldData?.enumValues}
        onChange={(value) =>
          patch({
            value,
          })
        }
        className={inputClass}
      />

      <button
        onClick={() => {
          updateRoot((root) => removeNode(root, node.id));
        }}
        className="grid h-10 w-10 place-items-center border border-red-500/20 bg-red-500/10 text-red-500 transition hover:bg-red-500/15"
        aria-label="Remove condition"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
}
