import QueryBuilder from "../../../components/query-builder/QueryBuilder";
import QueryPreview from "../../../components/query-preview/QueryPreview";
import QueryResults from "../../../components/query-results/QueryResults";
import KeyboardShortcuts from "../../../components/query-controls/KeyboardShortcuts";
import ValidationPanel from "../../../components/query-controls/ValidationPanel";
import BuilderHeader from "../../../components/query-controls/BuildHeader";
import WorkspacePanel from "../../../components/query-controls/WorkspacePanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#06110d] transition-colors duration-500 dark:bg-[#020807] dark:text-white">
      <KeyboardShortcuts />
      <BuilderHeader />

      <div className="mx-auto max-w-[1600px] p-6">
        <div className="relative z-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="relative z-20 space-y-6">
            <div className="border border-black/10 bg-white p-4 transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.035]">
              <WorkspacePanel />
            </div>
          </aside>

          <section className="space-y-6">
            <div className="border border-black/10 bg-white p-6 transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.035]">
              <QueryBuilder />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="space-y-4">
                <ValidationPanel />
                <QueryPreview />
              </div>

              <QueryResults />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
