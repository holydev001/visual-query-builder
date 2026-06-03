"use client";

import { useMemo, useState } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQueryStore } from "../../src/store/query-store";
import { generateSQL } from "../../src/lib/query-engine/generateSQL";
import { generateMongo } from "../../src/lib/query-engine/generateMongo";
import { generateGraphQL } from "../../src/lib/query-engine/generateGraphQL";

type PreviewType = "sql" | "mysql" | "mongo" | "graphql";

const previewOptions: { label: string; value: PreviewType }[] = [
  { label: "SQL", value: "sql" },
  { label: "MySQL", value: "mysql" },
  { label: "MongoDB", value: "mongo" },
  { label: "GraphQL", value: "graphql" },
];

export default function QueryPreview() {
  const root = useQueryStore((s) => s.root);
  const [previewType, setPreviewType] = useState<PreviewType>("sql");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (previewType === "mongo") return generateMongo(root);
    if (previewType === "graphql") return generateGraphQL(root);
    return generateSQL(root);
  }, [root, previewType]);

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="overflow-hidden border border-black/10 bg-white shadow-[0_20px_70px_rgba(6,17,13,0.06)] transition-colors duration-500 dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center bg-emerald-500 text-black">
            <FileCode2 size={19} />
          </div>

          <div>
            <h2 className="font-bold text-[#06110d] dark:text-white">
              Query Preview
            </h2>
            <p className="text-xs text-black/50 dark:text-white/50">
              Generated output updates in real time
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className=" border border-black/10 bg-[#f8faf8] p-1 dark:border-white/10 dark:bg-[#020807]">
            {previewOptions.map((option) => {
              const active = previewType === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => setPreviewType(option.value)}
                  className={`px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                    active
                      ? "bg-emerald-500 text-black shadow-[0_0_24px_rgba(16,185,129,0.25)]"
                      : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={copyOutput}
            className="inline-flex items-center gap-2 border border-black/10 bg-[#f8faf8] px-3 py-2 text-xs font-semibold text-black transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.07]"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="p-5 transition-colors duration-500 bg-[#f8faf8] dark:bg-[#020807]">
        <pre className="max-h-[420px] overflow-auto border border-black/10 bg-white p-5 text-sm leading-7 text-[#06110d] shadow-sm transition-colors duration-500 dark:border-emerald-400/15 dark:bg-black/30 dark:text-emerald-300">
          {output}
        </pre>
      </div>
    </motion.section>
  );
}