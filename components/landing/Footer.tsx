import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-[#f2f7f4] px-6 py-12 text-sm dark:border-white/10 dark:bg-[#010504]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-lg bg-emerald-500 font-black text-black">
                Q
              </div>

              <h3 className="text-xl font-bold text-emerald-500">QueryCraft</h3>
            </div>

            <p className="mt-4 max-w-xs leading-7 text-black/55 dark:text-white/55">
              Build, preview, validate, and execute complex queries visually.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Product</h4>

            <div className="mt-4 flex flex-col gap-3 text-black/55 dark:text-white/55">
              <Link href="/builder">Builder</Link>
              <Link href="/docs">Documentation</Link>
              <a href="#features">Features</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Workflow</h4>

            <div className="mt-4 flex flex-col gap-3 text-black/55 dark:text-white/55">
              <a href="#how-it-works">How it works</a>
              <a href="#features">Query engine</a>
              <a href="#features">Validation</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Repository</h4>

            <a
              href="https://github.com/holydev001/visual-query-builder.git"
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 text-black/55 transition hover:text-emerald-500 dark:text-white/55"
            >
              <Code2 size={16} />
              Source code
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-6 text-xs text-black/45 dark:border-white/10 dark:text-white/45">
          <p>© 2026 QueryCraft.</p>
          <p>
            Built with Next.js, TypeScript, Zustand, DnD Kit, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
