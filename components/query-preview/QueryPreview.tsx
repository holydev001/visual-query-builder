"use client";

import { useQueryStore } from "../../src/store/query-store";

import { generateSQL } from "../../src/lib/query-engine/generateSQL";

import { generateMongo } from "../../src/lib/query-engine/generateMongo";

export default function QueryPreview() {
  const root = useQueryStore((s) => s.root);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2>SQL</h2>

        <pre
          className="
border
p-4
rounded
overflow-auto
"
        >
          {generateSQL(root)}
        </pre>
      </div>    

      <div>
        <h2>Mongo</h2>

        <pre
          className="
border
p-4
rounded
overflow-auto
"
        >
          {generateMongo(root)}
        </pre>
      </div>
    </div>
  );
}
