"use client";

import { motion } from "framer-motion";
import { Boxes, History, Play, Shuffle, Sparkles, Workflow } from "lucide-react";

const features = [
  {
    title: "Recursive Builder",
    description: "Create deeply nested conditions using unlimited AND/OR groups.",
    icon: Workflow,
  },
  {
    title: "Drag & Drop",
    description: "Reorder conditions and groups visually without rebuilding logic.",
    icon: Shuffle,
  },
  {
    title: "Live Preview",
    description: "Switch between SQL, MySQL, MongoDB, and GraphQL output.",
    icon: Sparkles,
  },
  {
    title: "Query History",
    description: "Undo, redo, save presets, and restore previous query states.",
    icon: History,
  },
  {
    title: "Execution Engine",
    description: "Run queries against mock data and inspect matching results.",
    icon: Play,
  },
  {
    title: "Schema Driven",
    description: "Fields, operators, and inputs adapt based on your schema.",
    icon: Boxes,
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">
          Features
        </p>

        <h2 className="mt-4 text-4xl font-black tracking-tight text-[#06110d] dark:text-white md:text-5xl">
          Everything needed to build queries visually.
        </h2>

        <p className="mt-5 text-black/60 dark:text-white/60">
          Powerful enough for developers, simple enough for dashboard users.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group border border-black/10 bg-white/70 p-7 shadow-[0_20px_70px_rgba(6,17,13,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none dark:hover:bg-white/[0.06]"
            >
              <div className="mb-6 grid size-12 place-items-center bg-emerald-500 text-black shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                <Icon size={22} />
              </div>

              <h3 className="text-xl font-bold text-[#06110d] dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-black/60 dark:text-white/60">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}