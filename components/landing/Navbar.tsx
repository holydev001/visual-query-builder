"use client";

import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current) return;

      if (!navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        fixed left-0 top-0 z-50 w-full transition-all duration-500
        ${
          scrolled || open
            ? "border-b border-black/10 bg-[#f8faf8]/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#020807]/90"
            : "border-b border-transparent bg-transparent"
        }
      `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="grid size-10 place-items-center rounded-xl bg-emerald-500 text-lg font-black text-black">
            Q
          </div>
          <span className="text-xl font-bold text-emerald-500 md:text-2xl">
            QueryCraft
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-medium text-black/60 lg:flex dark:text-white/70">
          <a href="#features" className="transition hover:text-emerald-500">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-emerald-500">
            How it works
          </a>
          <Link href="/docs" className="transition hover:text-emerald-500">
            Documentation
          </Link>
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <Link
            href="https://github.com/holydev001/visual-query-builder"
            target="_blank"
            className="grid size-11 place-items-center rounded-xl border border-black/10 bg-[#f8faf8]/80 text-black transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Repository"
          >
            <Code2 size={18} />
          </Link>

          <ThemeToggle />

          <Link
            href="/builder"
            className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_35px_rgba(16,185,129,0.35)] transition hover:bg-emerald-400"
          >
            Open Builder
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-xl border border-black/10 bg-[#f8faf8]/80 text-black transition dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -12, height: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-black/10 px-5 pb-5 pt-3 dark:border-white/10 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            >
              How it works
            </a>

            <Link
              href="/docs"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            >
              Documentation
            </Link>

            <Link
              href="https://github.com/YOUR_USERNAME/YOUR_REPO"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
            >
              <Code2 size={18} />
              Repository
            </Link>

            <Link
              href="/builder"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-black shadow-[0_0_35px_rgba(16,185,129,0.25)]"
            >
              Open Builder
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
