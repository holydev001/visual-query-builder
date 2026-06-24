"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  Database,
  GitBranch,
  Layers3,
  Play,
  Sparkles,
  Workflow,
} from "lucide-react";

const querySteps = [
  { field: "age", operator: ">", value: "18" },
  { field: "country", operator: "=", value: "Nigeria" },
  { field: "status", operator: "=", value: "active" },
];

const outputs = ["SQL", "MongoDB", "GraphQL"];

export default function Hero() {
  return (
    <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-24 pt-32 lg:grid-cols-[1fr_560px]">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
        className="text-center lg:text-left"
      >
        <div className="mb-8 inline-flex items-center gap-2 border border-emerald-400/25 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-300">
          <Sparkles size={15} />
          Visual query intelligence
        </div>

        <h1 className="text-5xl font-black leading-[1.02] tracking-tight text-[#06110d] dark:text-white md:text-7xl">
          Don’t write filters.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            Design them.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60 dark:text-white/65 lg:mx-0 md:text-xl">
          QueryCraft turns database logic into an interactive visual workflow:
          build nested rules, preview multiple query formats, validate structure,
          and execute against datasets.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
          <Link
            href="/query-builder"
            className="inline-flex items-center gap-2 bg-emerald-500 px-7 py-4 font-semibold text-black shadow-[0_0_35px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
          >
            Open Builder
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/docs"
            className="border border-emerald-400/25 bg-white/40 px-7 py-4 font-semibold text-[#06110d] backdrop-blur transition hover:bg-white/70 dark:bg-black/20 dark:text-white dark:hover:bg-white/5"
          >
            Read Docs
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-black/55 dark:text-white/55 sm:grid-cols-3">
          {["Recursive logic", "Live previews", "Executable data"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 border border-black/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/[0.035] lg:justify-start"
              >
                <CheckCircle2 size={15} className="text-emerald-500" />
                {item}
              </div>
            ),
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 44, rotate: 1.5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
        className="relative mx-auto w-full max-w-[560px]"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative overflow-hidden border border-black/10 bg-white shadow-[0_30px_100px_rgba(6,17,13,0.12)] dark:border-white/10 dark:bg-[#020807]"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-300" />

          <div className="flex items-center justify-between border-b border-black/10 p-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center bg-emerald-500 text-black">
                <GitBranch size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#06110d] dark:text-white">
                  Visual Query Canvas
                </p>
                <p className="text-xs text-black/45 dark:text-white/45">
                  AND group · users dataset
                </p>
              </div>
            </div>

            <button className="grid size-10 place-items-center bg-emerald-500 text-black">
              <Play size={17} />
            </button>
          </div>

          <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1.05fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                <Workflow size={14} />
                Rules
              </div>

              {querySteps.map((step, index) => (
                <motion.div
                  key={step.field}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.7 + index * 0.15 }}
                  className="grid grid-cols-[1fr_48px_1fr] items-center gap-2 border border-black/10 bg-[#f8faf8] p-3 text-sm dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <span className="font-semibold text-[#06110d] dark:text-white">
                    {step.field}
                  </span>

                  <span className="bg-emerald-500/15 px-2 py-2 text-center font-bold text-emerald-600 dark:text-emerald-300">
                    {step.operator}
                  </span>

                  <span className="truncate text-black/60 dark:text-white/60">
                    {step.value}
                  </span>
                </motion.div>
              ))}

              <div className="border border-dashed border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-600 dark:text-emerald-300">
                + Add nested group
              </div>
            </div>

            <div className="border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                  <Braces size={16} />
                  Output
                </div>

                <div className="flex gap-1">
                  {outputs.map((output, index) => (
                    <span
                      key={output}
                      className={`px-2 py-1 text-[10px] font-bold ${
                        index === 1
                          ? "bg-emerald-500 text-black"
                          : "bg-white/60 text-black/50 dark:bg-black/20 dark:text-white/45"
                      }`}
                    >
                      {output}
                    </span>
                  ))}
                </div>
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

          <div className="grid grid-cols-3 border-t border-black/10 dark:border-white/10">
            {[
              { icon: Database, label: "15 rows" },
              { icon: Layers3, label: "3 rules" },
              { icon: Braces, label: "4 outputs" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-center gap-2 border-r border-black/10 px-3 py-4 text-xs font-semibold text-black/55 last:border-r-0 dark:border-white/10 dark:text-white/55"
                >
                  <Icon size={15} className="text-emerald-500" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-7 -left-5 hidden border border-black/10 bg-[#f8faf8] p-4 shadow-xl dark:border-white/10 dark:bg-[#020807] sm:block"
        >
          <p className="text-xs text-black/45 dark:text-white/45">
            Result match
          </p>
          <p className="mt-1 text-2xl font-black text-emerald-500">8 / 15</p>
        </motion.div>
      </motion.div>
    </section>
  );
}