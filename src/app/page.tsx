import QueryBuilder from "../../components/query-builder/QueryBuilder";

import QueryPreview from "../../components/query-preview/QueryPreview";

import QueryResults from "../../components/query-results/QueryResults";

import QueryControls from "../../components/query-controls/QueryControls";

import History from "../../components/query-controls/History";

import KeyboardShortcuts from "../../components/query-controls/KeyboardShortcuts";

import ValidationPanel from "@/components/query-controls/ValidationPanel";

export default function Home() {
  return (
    <div className="p-8 space-y-10">
      <QueryControls />

      <ValidationPanel />

      <History />

      <KeyboardShortcuts />

      <QueryBuilder />

      <QueryPreview />

      <QueryResults />
    </div>
  );
}
