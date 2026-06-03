"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 pb-24 pt-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
        className="mx-auto max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mb-8 inline-flex rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-500 dark:text-emerald-300"
        >
          Visual • Intuitive • Powerful
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4 }}
          className="text-5xl font-black leading-[1.05] tracking-tight text-[#06110d] dark:text-white md:text-7xl"
        >
          Build complex queries visually.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            No code.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60 dark:text-white/65 md:text-xl"
        >
          QueryCraft helps you build, preview, validate, and run database
          queries with support for SQL, MySQL, MongoDB, and GraphQL.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/builder"
            className="bg-emerald-500 px-7 py-4 font-semibold text-black shadow-[0_0_35px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
          >
            Get Started →
          </Link>

          <Link
            href="/builder"
            className=" border border-emerald-400/25 bg-white/40 px-7 py-4 font-semibold text-[#06110d] backdrop-blur transition hover:bg-white/70 dark:bg-black/20 dark:text-white dark:hover:bg-white/5"
          >
            View Live Demo
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 text-sm text-black/50 dark:text-white/50"
        >
          Free to start.
        </motion.p>
      </motion.div>
    </section>
  );
}