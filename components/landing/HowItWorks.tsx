"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Database,
  Eye,
  MousePointer2,
  PlayCircle,
} from "lucide-react";

const steps = [
  {
    icon: Database,
    label: "Schema",
    title: "Pick your data shape",
    description:
      "Start from Users, Orders, or Events. Fields, input types, and valid operators adapt automatically.",
    preview: ["age:number", "status:enum", "createdAt:date"],
  },
  {
    icon: MousePointer2,
    label: "Canvas",
    title: "Design the logic visually",
    description:
      "Add conditions, nest groups, switch AND/OR logic, and reorder rules with drag-and-drop.",
    preview: ["age > 18", "AND country = Nigeria", "OR status = active"],
  },
  {
    icon: Braces,
    label: "Output",
    title: "Generate query syntax",
    description:
      "Preview SQL, MySQL, MongoDB, and GraphQL outputs from the same visual query tree.",
    preview: ["SQL", "MongoDB", "GraphQL"],
  },
  {
    icon: PlayCircle,
    label: "Runtime",
    title: "Execute and inspect",
    description:
      "Run the query manually, inspect matching rows, and restore executed queries from history.",
    preview: ["15 rows", "8 matched", "saved history"],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 mx-auto max-w-7xl px-6 py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1fr]"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
            Workflow
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#06110d] dark:text-white md:text-5xl">
            A query pipeline you can actually see.
          </h2>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-black/60 dark:text-white/60 lg:pt-10">
          QueryCraft turns filtering from a hidden string into a visible system:
          choose the data, design the logic, generate syntax, then execute the
          result.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-[72px] hidden h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent lg:block" />

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="relative border border-black/10 bg-white p-5 shadow-[0_20px_70px_rgba(6,17,13,0.05)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid size-12 place-items-center bg-emerald-500 text-black">
                    <Icon size={22} />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-500/70">
                    {step.label}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#06110d] dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 min-h-[112px] leading-7 text-black/60 dark:text-white/60">
                  {step.description}
                </p>

                <div className="mt-5 space-y-2 border border-black/10 bg-[#f8faf8] p-3 dark:border-white/10 dark:bg-[#020807]">
                  {step.preview.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-black/55 dark:text-white/55"
                    >
                      <span className="size-1.5 bg-emerald-500" />
                      {item}
                    </div>
                  ))}
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute -right-5 top-[58px] z-10 hidden size-10 place-items-center border border-emerald-500/30 bg-[#f8faf8] text-emerald-500 dark:bg-[#020807] lg:grid">
                    <ArrowRight size={18} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
        className="mt-8 border border-emerald-500/20 bg-emerald-500/10 p-6"
      >
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr_0.7fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 bg-emerald-500 px-3 py-2 text-sm font-bold text-black">
              <Eye size={16} />
              Visible logic
            </div>

            <h3 className="text-2xl font-black text-[#06110d] dark:text-white">
              Every query has a lifecycle.
            </h3>
          </div>

          <p className="leading-8 text-black/60 dark:text-white/60">
            Instead of writing one fragile query string, QueryCraft keeps the
            entire lifecycle editable: schema, rules, generated output, execution
            result, presets, and history.
          </p>

          <div className="grid grid-cols-3 border border-black/10 bg-white dark:border-white/10 dark:bg-[#020807]">
            {["Build", "Preview", "Run"].map((item) => (
              <div
                key={item}
                className="border-r border-black/10 p-4 text-center text-sm font-semibold last:border-r-0 dark:border-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}