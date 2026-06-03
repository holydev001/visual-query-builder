"use client";

import { useMemo, useState } from "react";
import { useQueryStore } from "../../src/store/query-store";
import { generateSQL } from "../../src/lib/query-engine/generateSQL";
import { generateMongo } from "../../src/lib/query-engine/generateMongo";
import { generateGraphQL } from "../../src/lib/query-engine/generateGraphQL";

type PreviewType = "sql" | "mysql" | "mongo" | "graphql";

const previewOptions: {
  label: string;
  value: PreviewType;
}[] = [
  { label: "SQL", value: "sql" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongo" },
  { label: "GraphQL", value: "graphql" },
];

export default function QueryPreview() {
  const root = useQueryStore((s) => s.root);
  const [previewType, setPreviewType] = useState<PreviewType>("sql");

  const output = useMemo(() => {
    if (previewType === "mongo") return generateMongo(root);
    if (previewType === "graphql") return generateGraphQL(root);

    return generateSQL(root);
  }, [root, previewType]);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Query Preview</h2>

        <select
          value={previewType}
          onChange={(event) => setPreviewType(event.target.value as PreviewType)}
          className="rounded border px-3 py-2"
        >
          {previewOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <pre className="max-h-[420px] overflow-auto rounded border p-4 text-sm">
        {output}
      </pre>
    </section>
  );
}