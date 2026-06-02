"use client";

import { users } from "../../src/mock/users";

import { executeQuery } from "../../src/lib/query-engine/evaluateQuery";

import { useQueryStore } from "../../src/store/query-store";

export default function QueryResults() {
  const root = useQueryStore((s) => s.root);

  const results = executeQuery(root, users);

  return (
    <div className="space-y-4">
      <h2>
        Results:
        {results.length}
      </h2>

      <div className="border rounded">
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>

              <th>Name</th>

              <th>Age</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {results.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.name}</td>

                <td>{user.age}</td>

                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
