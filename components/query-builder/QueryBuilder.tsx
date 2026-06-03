"use client";

import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import GroupNode from "./GroupNode";
import { useQueryStore } from "../../src/store/query-store";

export default function QueryBuilder() {
  const root = useQueryStore((state) => state.root);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-5"
    >
      <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
        <div>
          <h2 className="font-bold text-[#06110d] dark:text-white">
            Query Builder
          </h2>
          <p className="mt-1 text-sm text-black/55 dark:text-white/55">
            Add conditions, create nested groups, and define your logic.
          </p>
        </div>

        <div className="hidden items-center gap-2 text-xs text-black/45 dark:text-white/45 md:flex">
          <PlusCircle size={15} />
          Recursive editor
        </div>
      </div>

      <GroupNode node={root} depth={0} />
    </motion.section>
  );
}