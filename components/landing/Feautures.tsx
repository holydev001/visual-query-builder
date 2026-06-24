"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Braces,
  DatabaseZap,
  History,
  Play,
  Shuffle,
  Sparkles,
  Workflow,
} from "lucide-react";

const features = [
  {
    title: "Recursive Builder",
    description: "Nest AND/OR groups without fighting raw syntax.",
    icon: Workflow,
    tag: "Logic",
  },
  {
    title: "Drag & Drop",
    description: "Reorder rules visually like arranging blocks.",
    icon: Shuffle,
    tag: "Flow",
  },
  {
    title: "Live Preview",
    description: "Generate SQL, MySQL, MongoDB, and GraphQL instantly.",
    icon: Sparkles,
    tag: "Output",
  },
  {
    title: "Query History",
    description: "Restore executed queries, save presets, and reuse logic.",
    icon: History,
    tag: "Memory",
  },
  {
    title: "Execution Engine",
    description: "Run queries against datasets and inspect matching rows.",
    icon: Play,
    tag: "Runtime",
  },
  {
    title: "Schema Driven",
    description: "Fields, inputs, and operators adapt to your dataset.",
    icon: Boxes,
    tag: "Schema",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-16 grid gap-8 lg:grid-cols-[0.85fr_1fr]"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#06110d] dark:text-white md:text-5xl">
            A query system that feels like designing logic.
          </h2>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-black/60 dark:text-white/60 lg:pt-10">
          QueryCraft combines a visual editor, schema-aware controls, multiple
          generated outputs, and manual execution into one workflow — so building
          complex filters feels structured instead of fragile.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative overflow-hidden border border-black/10 bg-white p-6 shadow-[0_20px_70px_rgba(6,17,13,0.06)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none"
        >
          <div className="absolute right-[-80px] top-[-80px] size-64 bg-emerald-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between border-b border-black/10 pb-5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center bg-emerald-500 text-black">
                <DatabaseZap size={21} />
              </div>

              <div>
                <h3 className="font-bold text-[#06110d] dark:text-white">
                  QueryCraft Engine
                </h3>
                <p className="text-xs text-black/50 dark:text-white/50">
                  Visual logic compiled into real query formats
                </p>
              </div>
            </div>

            <div className="hidden gap-2 sm:flex">
              {["SQL", "Mongo", "GraphQL"].map((item) => (
                <span
                  key={item}
                  className="border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
                Visual Rules
              </p>

              {[
                ["age", "greater_than", "18"],
                ["country", "equals", "Nigeria"],
                ["status", "equals", "active"],
              ].map(([field, operator, value], index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  className="grid grid-cols-[1fr_1.1fr_1fr] gap-2 border border-black/10 bg-[#f8faf8] p-3 text-xs dark:border-white/10 dark:bg-[#020807]"
                >
                  <span className="font-semibold text-[#06110d] dark:text-white">
                    {field}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-300">
                    {operator}
                  </span>
                  <span className="text-black/55 dark:text-white/55">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                <Braces size={16} />
                Generated Output
              </div>

              <pre className="overflow-hidden text-xs leading-6 text-black/65 dark:text-emerald-200">
{`{
  "$and": [
    { "age": { "$gt": 18 } },
    { "country": { "$eq": "Nigeria" } },
    { "status": { "$eq": "active" } }
  ]
}`}
              </pre>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                className="group border border-black/10 bg-white/70 p-5 transition-all duration-300 hover:border-emerald-400/50 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="grid size-10 place-items-center bg-emerald-500 text-black">
                    <Icon size={19} />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500/70">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="font-bold text-[#06110d] dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-black/60 dark:text-white/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}