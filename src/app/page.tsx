import QueryBuilder from "../../components/query-builder/QueryBuilder";

import QueryPreview from "../../components/query-preview/QueryPreview";

export default function Home() {
  return (
    <div className="p-8 space-y-10">
      <QueryBuilder />

      <QueryPreview />
    </div>
  );
}
