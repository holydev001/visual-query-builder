"use client";

import Link from "next/link";
import { ArrowLeft, DatabaseZap } from "lucide-react";

import QueryControls from "./QueryControls";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function BuilderHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f8faf8]/90 backdrop-blur-xl transition-colors duration-500 dark:border-white/10 dark:bg-[#020807]/90">
      <div className="mx-auto max-w-full px-5 lg:px-8">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* left */}

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="
              grid
              size-10
              place-items-center

              border
              border-black/10

              bg-white

              transition

              hover:bg-[#f8faf8]

              dark:border-white/10
              dark:bg-white/[0.04]
              dark:text-white
              dark:hover:bg-white/[0.07]
              "
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center bg-emerald-500 text-black">
                <DatabaseZap size={20} />
              </div>

              <div>
                <h1 className="font-bold text-[#06110d] dark:text-white">
                  Query Builder
                </h1>

                <p className="text-xs text-black/50 dark:text-white/50">
                  Build, preview, validate, and execute queries
                </p>
              </div>
            </div>
          </div>

          {/* right */}

          <div className="flex flex-wrap items-center justify-end gap-3">
            <QueryControls />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
