import QueryBuilder from "../../components/query-builder/QueryBuilder";

import QueryPreview from "../../components/query-preview/QueryPreview";

import QueryResults from "../../components/query-results/QueryResults";

import QueryControls from "@/components/query-controls/QueryControls";

import History from "@/components/query-controls/History";

export default function Home() {
  return (
    <div className="p-8 space-y-10">

      <QueryControls />

      <History />

      <QueryBuilder />

      <QueryPreview />

      <QueryResults />
    </div>
  );
}
