"use client";

import { ConditionNode as ConditionType } from "../../src/types/query";

import { userSchema } from "../../src/mock/schema";

import { useQueryStore } from "../../src/store/query-store";

import { updateNode } from "../../src/lib/traversal/updateNode";

import ValueInput from "./ValueInput";

import { OPERATORS } from "../../src/lib/schema/operators";

interface Props {
  node: ConditionType;
}

export default function ConditionNode({ node }: Props) {
  const root = useQueryStore((s) => s.root);

  const updateRoot = useQueryStore((s) => s.updateRoot);

  const fieldData = userSchema.find((field) => field.name === node.field);

  function patch(updates: Partial<ConditionType>) {
    updateRoot((root) =>
      updateNode(root, node.id, (old: any) => ({
        ...old,

        ...updates,
      })),
    );
  }

  return (
    <div className="flex gap-2 border p-3 rounded">
      <select
        value={node.field}
        onChange={(e) =>
          patch({
            field: e.target.value,

            operator: "equals",

            value: "",
          })
        }
      >
        <option value="">Field</option>

        {userSchema.map((field) => (
          <option key={field.name} value={field.name}>
            {field.name}
          </option>
        ))}
      </select>

      <select
        value={node.operator}
        onChange={(e) =>
          patch({
            operator: e.target.value as any,
          })
        }
      >
        {fieldData &&
          OPERATORS[fieldData.type].map((operator) => (
            <option key={operator} value={operator}>
              {operator}
            </option>
          ))}
      </select>

      <ValueInput
        type={fieldData?.type ?? "string"}
        value={node.value}
        options={fieldData?.enumValues}
        onChange={(value) =>
          patch({
            value,
          })
        }
      />
    </div>
  );
}
