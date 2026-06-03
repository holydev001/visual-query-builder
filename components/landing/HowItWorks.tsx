import { Braces, Database, Eye, PlayCircle } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Choose a schema",
    description: "Start with fields, types, and operators generated from your data model.",
  },
  {
    icon: Braces,
    title: "Build nested logic",
    description: "Create conditions and groups using AND/OR logic with unlimited nesting.",
  },
  {
    icon: Eye,
    title: "Preview output",
    description: "Switch between SQL, MySQL, MongoDB, and GraphQL previews instantly.",
  },
  {
    icon: PlayCircle,
    title: "Run and inspect",
    description: "Execute against mock data and inspect matching results in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
          Workflow
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-[#06110d] dark:text-white md:text-5xl">
          From schema to query in seconds.
        </h2>
        <p className="mt-5 text-black/60 dark:text-white/60">
          QueryCraft turns complex filtering logic into a visual, editable, and executable query flow.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className=" border border-black/10 bg-white/60 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="grid size-12 place-items-center bg-emerald-500 text-black">
                  <Icon size={22} />
                </div>

                <span className="text-5xl font-black text-emerald-500/15">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#06110d] dark:text-white">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-black/60 dark:text-white/60">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}