import QueryBuilder from "../../components/query-builder/QueryBuilder";

import QueryPreview from "../../components/query-preview/QueryPreview";

import QueryResults from "../../components/query-results/QueryResults";

export default function Home() {
  return (
    <div className="p-8 space-y-10">
      <QueryBuilder />

      <QueryPreview />

      <QueryResults />
    </div>
  );
}
