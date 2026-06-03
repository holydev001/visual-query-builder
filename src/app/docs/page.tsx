import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  FileJson,
  GitBranch,
  Keyboard,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const overview = [
  {
    icon: Workflow,
    title: "Visual query construction",
    description:
      "Create rules and groups through an interface instead of writing raw query syntax manually.",
  },
  {
    icon: GitBranch,
    title: "Recursive nested logic",
    description:
      "Combine unlimited AND/OR groups to model advanced filtering logic.",
  },
  {
    icon: Code2,
    title: "Multi-format previews",
    description:
      "Generate SQL, MySQL, MongoDB, and GraphQL style output from the same query tree.",
  },
  {
    icon: PlayCircle,
    title: "Execution simulator",
    description:
      "Run the query against mock data and inspect matching results instantly.",
  },
];

const guide = [
  {
    title: "1. Choose a field",
    description:
      "Each rule starts with a schema field like name, age, status, country, or createdAt.",
  },
  {
    title: "2. Pick a valid operator",
    description:
      "Operators are restricted by field type. For example, numbers support greater_than and less_than, while strings support contains and starts_with.",
  },
  {
    title: "3. Enter a value",
    description:
      "Inputs adapt to the field type, including text inputs, number inputs, date inputs, and enum dropdowns.",
  },
  {
    title: "4. Group logic",
    description:
      "Wrap conditions inside AND/OR groups to build complex nested filters.",
  },
];

const architecture = [
  "Normalized query tree state",
  "Recursive component rendering",
  "Immutable tree updates",
  "Schema-driven operator control",
  "Validation engine",
  "Query generation engine",
  "Execution simulator",
  "LocalStorage persistence",
];

const shortcuts = [
  ["Ctrl / Cmd + Z", "Undo last query change"],
  ["Ctrl / Cmd + Y", "Redo previously undone change"],
  ["Ctrl / Cmd + S", "Save current query as preset"],
  ["Escape", "Clear current query"],
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#f8faf8] px-6 py-24 text-[#06110d] transition-colors duration-500 dark:bg-[#020807] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
            Documentation
          </p>

          <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
            QueryCraft Docs
          </h1>

          <p className="mt-6 text-lg leading-8 text-black/60 dark:text-white/60">
            QueryCraft is a visual query builder for constructing nested
            database/API filters, previewing generated query syntax, validating
            query logic, and executing filters against mock datasets.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 bg-emerald-500 px-5 py-3 font-semibold text-black"
            >
              Open Builder <ArrowRight size={18} />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-black/10 bg-white px-5 py-3 font-semibold dark:border-white/10 dark:bg-white/[0.04]"
            >
              Back Home
            </Link>
          </div>
        </div>

        <section className="mt-20 grid gap-5 md:grid-cols-2">
          {overview.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className=" border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="mb-5 grid size-11 place-items-center bg-emerald-500 text-black">
                  <Icon size={21} />
                </div>

                <h2 className="text-xl font-bold">{item.title}</h2>

                <p className="mt-3 leading-7 text-black/60 dark:text-white/60">
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-20 border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <Layers3 className="text-emerald-500" />
            <h2 className="text-3xl font-black">Core Concepts</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {guide.map((item) => (
              <div key={item.title} className="bg-black/[0.03] p-5 dark:bg-white/[0.04]">
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-black/60 dark:text-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className=" border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <Braces className="text-emerald-500" />
              <h2 className="text-3xl font-black">Example Query</h2>
            </div>

            <p className="mt-5 leading-8 text-black/60 dark:text-white/60">
              A user can visually build a nested query like this:
            </p>

            <pre className="mt-6 overflow-auto bg-[#f8faf8] text-black/60  dark:bg-white/[0.04] p-6 text-sm leading-7 dark:text-emerald-300">
{`(age > 18 AND country = "Nigeria")
OR
(status = "active" AND purchases > 10)`}
            </pre>
          </div>

          <div className="border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-500" />
              <h2 className="text-3xl font-black">Validation</h2>
            </div>

            <ul className="mt-6 space-y-4 text-black/60 dark:text-white/60">
              <li>• Prevents empty fields</li>
              <li>• Blocks invalid operators</li>
              <li>• Detects empty groups</li>
              <li>• Validates number values</li>
              <li>• Guards imported JSON</li>
            </ul>
          </div>
        </section>

        <section className="mt-20 border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <Database className="text-emerald-500" />
            <h2 className="text-3xl font-black">Architecture</h2>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {architecture.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-black/[0.03] p-4 dark:bg-white/[0.04]">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className=" border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-3">
              <Keyboard className="text-emerald-500" />
              <h2 className="text-3xl font-black">Shortcuts</h2>
            </div>

            <div className="mt-8 space-y-3">
              {shortcuts.map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-black/[0.03] p-4 dark:bg-white/[0.04]">
                  <kbd className="font-semibold">{key}</kbd>
                  <span className="text-black/60 dark:text-white/60">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-emerald-400/20 bg-emerald-500/10 p-8">
            <FileJson className="text-emerald-500" />

            <h2 className="mt-5 text-3xl font-black">Import & Export</h2>

            <p className="mt-5 leading-8 text-black/60 dark:text-white/60">
              QueryCraft supports exporting the query tree as JSON and importing
              it later. This makes it easy to share presets, restore work, or
              test complex query structures.
            </p>

            <Link
              href="/builder"
              className="mt-8 inline-flex items-center gap-3 bg-emerald-500 px-5 py-3 font-semibold text-black"
            >
              Try it now <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}